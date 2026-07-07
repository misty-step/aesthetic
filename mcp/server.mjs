#!/usr/bin/env node
// aesthetic's MCP face (aesthetic-931, five-faces gap): lets an adopting
// agent query tokens/recipes/primitives/law without vendoring knowledge or
// grepping site/r/*.json by hand. Every tool reads an already-built
// registry file straight off disk -- no regeneration, no judgment, the
// same "declare it once, read it everywhere" contract `scripts/build-*.mjs`
// already keeps for the site itself.

import { readFileSync, readdirSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import { z } from 'zod';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = path.resolve(HERE, '..');
const RECIPES_DIR = path.join(REPO_ROOT, 'recipes');

function readJson(relativePath) {
  return JSON.parse(readFileSync(path.join(REPO_ROOT, relativePath), 'utf8'));
}

// ---- pure query functions (unit-tested directly, no MCP machinery) ----

export function getTokens() {
  return readJson('tokens.json');
}

export function listPrimitives() {
  const { primitives } = readJson('site/r/primitives.json');
  return primitives.map(({ route, title, summary, classes }) => ({
    route,
    title,
    summary,
    classes,
  }));
}

export function getPrimitive(route) {
  const { primitives } = readJson('site/r/primitives.json');
  const found = primitives.find((p) => p.route === route);
  if (!found) {
    const known = primitives.map((p) => p.route);
    throw new Error(
      `no primitive with route ${JSON.stringify(route)}. Known routes: ${known.join(', ')}`,
    );
  }
  return found;
}

export function getRecipe(name) {
  const file = path.join(RECIPES_DIR, `${name}.js`);
  try {
    return readFileSync(file, 'utf8');
  } catch {
    const known = readdirSync(RECIPES_DIR)
      .filter((f) => f.endsWith('.js'))
      .map((f) => f.replace(/\.js$/, ''));
    throw new Error(
      `no recipe named ${JSON.stringify(name)}. Known recipes: ${known.join(', ')}`,
    );
  }
}

export function getLaw(section) {
  const { law } = readJson('site/r/primitives.json');
  if (!section) return law;
  if (!(section in law)) {
    throw new Error(
      `no law section named ${JSON.stringify(section)}. Known sections: ${Object.keys(law).join(', ')}`,
    );
  }
  return { [section]: law[section] };
}

export function searchRegistry(query) {
  const { items } = readJson('site/r/registry.json');
  const needle = query.toLowerCase();
  return items
    .filter((item) =>
      [item.name, item.title, item.description].some((field) =>
        (field ?? '').toLowerCase().includes(needle),
      ),
    )
    .map((item) => ({
      name: item.name,
      title: item.title,
      description: item.description,
    }));
}

// ---- MCP wiring: every tool is a thin try/catch around a pure function ----

function textResult(value) {
  const text =
    typeof value === 'string' ? value : JSON.stringify(value, null, 2);
  return { content: [{ type: 'text', text }] };
}

function wrap(fn) {
  return async (args) => {
    try {
      return textResult(fn(args));
    } catch (err) {
      return { content: [{ type: 'text', text: err.message }], isError: true };
    }
  };
}

export function createServer() {
  const server = new McpServer({ name: 'aesthetic', version: '1.0.0' });

  server.registerTool(
    'get_tokens',
    {
      title: 'Get design tokens',
      description:
        'Return tokens.json -- the machine-exact source of truth for every color, space, radius, and type value in the kit (light/dark pairs).',
    },
    wrap(getTokens),
  );

  server.registerTool(
    'list_primitives',
    {
      title: 'List primitives',
      description:
        'List every primitive route with its title, one-line summary, and CSS classes -- use before get_primitive to find the right route.',
    },
    wrap(listPrimitives),
  );

  server.registerTool(
    'get_primitive',
    {
      title: 'Get one primitive',
      description:
        'Return the full entry for one primitive route (summary, classes, canonical markup, and which recipe files it uses) from primitives.json.',
      inputSchema: {
        route: z
          .string()
          .describe('Primitive route, e.g. "dialog", "shell", "table"'),
      },
    },
    wrap(({ route }) => getPrimitive(route)),
  );

  server.registerTool(
    'get_recipe',
    {
      title: 'Get a recipe',
      description:
        'Return the real JS source of a named recipe file from recipes/ (e.g. "dialog" -> recipes/dialog.js) -- the runnable behavior a primitive markup snippet pairs with.',
      inputSchema: {
        name: z
          .string()
          .describe(
            'Recipe name without the .js extension, e.g. "dialog", "toast", "theme"',
          ),
      },
    },
    wrap(({ name }) => getRecipe(name)),
  );

  server.registerTool(
    'get_law',
    {
      title: 'Get the design law',
      description:
        'Return the structured law object (size, registers, accent, status, layout, motion, modes, steering, buttons) from primitives.json -- use to check whether a proposed design honors an invariant. Omit `section` for the whole object.',
      inputSchema: {
        section: z
          .string()
          .optional()
          .describe(
            'One law section name, e.g. "motion" or "buttons"; omit for all sections',
          ),
      },
    },
    wrap(({ section }) => getLaw(section)),
  );

  server.registerTool(
    'search_registry',
    {
      title: 'Search the registry',
      description:
        'Search every registry item (name, title, description) for a keyword -- the entry point for "what covers X" style questions ("what has the recipe for a dialog", "what primitive renders a table").',
      inputSchema: {
        query: z
          .string()
          .describe('Keyword or phrase to search for, case-insensitive'),
      },
    },
    wrap(({ query }) => searchRegistry(query)),
  );

  return server;
}

async function main() {
  const server = createServer();
  const transport = new StdioServerTransport();
  await server.connect(transport);
}

if (import.meta.url === `file://${process.argv[1]}`) {
  main().catch((err) => {
    process.stderr.write(`aesthetic-mcp: ${err.stack ?? err}\n`);
    process.exitCode = 1;
  });
}
