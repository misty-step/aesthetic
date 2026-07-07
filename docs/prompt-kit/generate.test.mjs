import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { generate } from './generate.mjs';

const HERE = path.dirname(fileURLToPath(import.meta.url));
// Frozen CI fixture -- see README.md's "Usage" section for why this is
// never generate.mjs's own default schema source.
const SCHEMA = JSON.parse(
  readFileSync(
    path.join(HERE, 'example', 'catalog.schema.snapshot.json'),
    'utf8',
  ),
);

const VALID_DOC = {
  catalog_version: 'aesthetic-catalog-001',
  components: [
    {
      type: 'hero',
      title: 'Fleet retro — daily',
      summary: [{ type: 'text', text: '24h window.' }],
    },
    {
      type: 'table',
      heading: 'Repo activity',
      columns: [{ key: 'repo', label: 'repo' }],
      rows: [],
      empty_note: 'nothing swept this window',
    },
  ],
};

test('accepts a model response that validates on the first attempt', async () => {
  const result = await generate({
    context: 'irrelevant for this test',
    schema: SCHEMA,
    retries: 2,
    dryRunResponses: [JSON.stringify(VALID_DOC)],
  });
  assert.equal(result.ok, true);
  assert.equal(result.attempts.length, 1);
  assert.equal(result.attempts[0].errors.length, 0);
});

test('unwraps a markdown-fenced response', async () => {
  const result = await generate({
    context: 'irrelevant for this test',
    schema: SCHEMA,
    retries: 0,
    dryRunResponses: [`\`\`\`json\n${JSON.stringify(VALID_DOC)}\n\`\`\``],
  });
  assert.equal(result.ok, true);
});

test('repairs a schema violation on retry using the validator error', async () => {
  const broken = {
    catalog_version: 'aesthetic-catalog-001',
    components: [{ type: 'hero', title: 'Missing summary' }], // summary is required
  };
  const result = await generate({
    context: 'irrelevant for this test',
    schema: SCHEMA,
    retries: 2,
    dryRunResponses: [JSON.stringify(broken), JSON.stringify(VALID_DOC)],
  });
  assert.equal(result.ok, true);
  assert.equal(result.attempts.length, 2);
  assert.ok(result.attempts[0].errors.length > 0);
  assert.match(result.attempts[0].errors.join(' '), /summary/);
});

test('rejects explicitly -- never emits -- after exhausting retries', async () => {
  const broken = {
    catalog_version: 'aesthetic-catalog-001',
    components: [{ type: 'hero', title: 'Still missing summary' }],
  };
  const result = await generate({
    context: 'irrelevant for this test',
    schema: SCHEMA,
    retries: 1,
    dryRunResponses: [JSON.stringify(broken), JSON.stringify(broken)],
  });
  assert.equal(result.ok, false);
  assert.equal(result.doc, undefined);
  assert.equal(result.attempts.length, 2);
});

test('catches the Rust-only table.empty_note rule the JSON Schema cannot express', async () => {
  const doc = {
    catalog_version: 'aesthetic-catalog-001',
    components: [
      {
        type: 'table',
        heading: 'Repo activity',
        columns: [{ key: 'repo', label: 'repo' }],
        rows: [],
        // empty_note deliberately omitted
      },
    ],
  };
  const result = await generate({
    context: 'irrelevant for this test',
    schema: SCHEMA,
    retries: 0,
    dryRunResponses: [JSON.stringify(doc)],
  });
  assert.equal(result.ok, false);
  assert.match(result.attempts[0].errors.join(' '), /empty_note/);
});

test('catches the Rust-only disclosure-nesting rule the JSON Schema cannot express', async () => {
  const doc = {
    catalog_version: 'aesthetic-catalog-001',
    components: [
      {
        type: 'disclosure',
        heading: 'Details',
        children: [
          {
            type: 'hero',
            title: 'Nested hero',
            summary: [{ type: 'text', text: 'x' }],
          },
        ],
      },
    ],
  };
  const result = await generate({
    context: 'irrelevant for this test',
    schema: SCHEMA,
    retries: 0,
    dryRunResponses: [JSON.stringify(doc)],
  });
  assert.equal(result.ok, false);
  assert.match(
    result.attempts[0].errors.join(' '),
    /nested hero or disclosure/,
  );
});

test('rejects the wrong catalog_version even when components validate', async () => {
  const doc = { ...VALID_DOC, catalog_version: 'wrong-version' };
  const result = await generate({
    context: 'irrelevant for this test',
    schema: SCHEMA,
    retries: 0,
    dryRunResponses: [JSON.stringify(doc)],
  });
  assert.equal(result.ok, false);
  assert.match(result.attempts[0].errors.join(' '), /catalog_version/);
});
