#!/usr/bin/env node
// generate.mjs -- the prompt kit's validate/repair loop (aesthetic-929).
//
// Calls a model with SYSTEM_PROMPT.md + raw context, validates the response
// against glance-catalog's own catalog.schema.json (read fresh, never
// copied), retries with the validator's exact errors on failure, and
// rejects explicitly -- never silently -- if every attempt fails. See
// README.md for the full contract.
//
// Usage:
//   node generate.mjs --context <file> --out <file> [--schema <path>]
//                      [--model <id>] [--retries <n>] [--dry-run <file>]
//
// --dry-run <file> skips the model call and validates a pre-recorded
// response instead (used by tests/prompt-kit.test.mjs so the gate never
// needs network access or an API key).

import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import Ajv2020 from 'ajv/dist/2020.js';
import addFormats from 'ajv-formats';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = path.resolve(HERE, '..', '..');
const DEFAULT_SCHEMA_PATH = path.resolve(
  REPO_ROOT,
  '..',
  'glance',
  'crates',
  'glance-catalog',
  'catalog',
  'catalog.schema.json',
);
const CATALOG_VERSION = 'aesthetic-catalog-001';
const DEFAULT_MODEL = 'openai/gpt-4o-mini';
const DEFAULT_RETRIES = 2;

function parseArgs(argv) {
  const args = { retries: DEFAULT_RETRIES, model: DEFAULT_MODEL };
  for (let i = 0; i < argv.length; i += 1) {
    const flag = argv[i];
    if (flag === '--context') args.context = argv[++i];
    else if (flag === '--out') args.out = argv[++i];
    else if (flag === '--schema') args.schema = argv[++i];
    else if (flag === '--model') args.model = argv[++i];
    else if (flag === '--retries') args.retries = Number(argv[++i]);
    else if (flag === '--dry-run') args.dryRun = argv[++i];
    else throw new Error(`unrecognized argument: ${flag}`);
  }
  if (!args.context) throw new Error('--context <file> is required');
  return args;
}

function loadSchema(schemaPath) {
  const resolved = schemaPath ? path.resolve(schemaPath) : DEFAULT_SCHEMA_PATH;
  if (!existsSync(resolved)) {
    throw new Error(
      `catalog.schema.json not found at ${resolved} -- pass --schema, or ` +
        `check out misty-step/glance beside this repo (expects ` +
        `../glance/crates/glance-catalog/catalog/catalog.schema.json)`,
    );
  }
  return JSON.parse(readFileSync(resolved, 'utf8'));
}

function buildValidator(schema) {
  const ajv = new Ajv2020({ allErrors: true, strict: false });
  addFormats(ajv);
  return ajv.compile(schema);
}

/** Structural rules the JSON Schema itself cannot express (component.rs /
 * structural.rs's `validate()` methods) -- checked here so a Node-only
 * caller gets the same fail-closed guarantee the Rust render step gives
 * a Rust caller, without needing a Rust toolchain to call `generate.mjs`. */
function checkSemanticRules(doc, errors) {
  const walk = (component, atDisclosure) => {
    if (
      component.type === 'table' &&
      component.rows.length === 0 &&
      !component.empty_note
    ) {
      errors.push(
        `table "${component.heading}": empty_note is required when rows is empty`,
      );
    }
    if (component.type === 'disclosure') {
      for (const child of component.children) {
        if (child.type === 'hero' || child.type === 'disclosure') {
          errors.push(
            `disclosure "${component.heading}": children cannot contain a nested hero or disclosure`,
          );
        }
        walk(child, true);
      }
    }
  };
  for (const component of doc.components ?? []) walk(component, false);
}

function extractJson(text) {
  const fenced = text.match(/```(?:json)?\s*([\s\S]*?)```/i);
  const candidate = fenced ? fenced[1] : text;
  return JSON.parse(candidate.trim());
}

async function callModel({ model, systemPrompt, context, correction }) {
  const apiKey = process.env.OPENROUTER_API_KEY;
  if (!apiKey) {
    throw new Error(
      'OPENROUTER_API_KEY is not set (required unless --dry-run is used)',
    );
  }
  const messages = [
    { role: 'system', content: systemPrompt },
    { role: 'user', content: `Raw context:\n\n${context}` },
  ];
  if (correction) {
    messages.push({
      role: 'user',
      content: `Your previous response failed validation with these errors:\n${correction}\n\nFix exactly these fields and re-emit the full JSON object.`,
    });
  }
  const response = await fetch(
    'https://openrouter.ai/api/v1/chat/completions',
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model,
        messages,
        temperature: 0.2,
        max_tokens: 4000,
      }),
    },
  );
  if (!response.ok) {
    throw new Error(
      `model call failed: ${response.status} ${await response.text()}`,
    );
  }
  const payload = await response.json();
  return payload.choices[0].message.content;
}

export async function generate({
  context,
  schema,
  model,
  retries,
  dryRunResponses,
}) {
  const validate = buildValidator(schema);
  const systemPrompt = readFileSync(
    path.join(HERE, 'SYSTEM_PROMPT.md'),
    'utf8',
  );
  const attempts = [];
  let correction = null;

  for (let attempt = 0; attempt <= retries; attempt += 1) {
    const raw = dryRunResponses
      ? dryRunResponses[attempt]
      : await callModel({ model, systemPrompt, context, correction });
    if (raw === undefined) {
      break; // dry-run responses exhausted
    }

    let doc;
    let errors = [];
    try {
      doc = extractJson(raw);
    } catch (err) {
      errors = [`response was not valid JSON: ${err.message}`];
    }

    if (doc) {
      if (doc.catalog_version !== CATALOG_VERSION) {
        errors.push(
          `catalog_version must be "${CATALOG_VERSION}", got ${JSON.stringify(doc.catalog_version)}`,
        );
      }
      if (!validate(doc)) {
        for (const e of validate.errors) {
          errors.push(`${e.instancePath || '(root)'}: ${e.message}`);
        }
      }
      checkSemanticRules(doc, errors);
    }

    attempts.push({ attempt, errors: [...errors] });
    if (errors.length === 0) {
      return { ok: true, doc, attempts };
    }
    correction = errors.join('\n');
  }

  return { ok: false, attempts };
}

async function main() {
  const args = parseArgs(process.argv.slice(2));
  const context = readFileSync(args.context, 'utf8');
  const schema = loadSchema(args.schema);
  const dryRunResponses = args.dryRun
    ? JSON.parse(readFileSync(args.dryRun, 'utf8'))
    : undefined;

  const result = await generate({
    context,
    schema,
    model: args.model,
    retries: args.retries,
    dryRunResponses,
  });

  if (!result.ok) {
    const last = result.attempts.at(-1);
    process.stderr.write(
      `generate.mjs: rejected after ${result.attempts.length} attempt(s). Last errors:\n${last.errors.join('\n')}\n`,
    );
    process.exitCode = 1;
    return;
  }

  const json = JSON.stringify(result.doc, null, 2);
  if (args.out) {
    writeFileSync(args.out, json + '\n');
    process.stderr.write(
      `generate.mjs: wrote ${args.out} (${result.attempts.length} attempt(s), 0 unrepaired violations)\n`,
    );
  } else {
    process.stdout.write(json + '\n');
  }
}

if (import.meta.url === `file://${process.argv[1]}`) {
  main().catch((err) => {
    process.stderr.write(`generate.mjs: ${err.message}\n`);
    process.exitCode = 1;
  });
}
