---
name: aesthetic
description: |
  Use when an agent needs to adopt, verify, or generate Misty Step UI with
  Aesthetic: tokens, recipes, static registry, design law, page/specimen
  routes, or rendered-interface checks. Trigger phrases: "Aesthetic",
  "Misty Step design system", "design law", "tokens", "recipes", "law gate".
argument-hint: '[adopt|audit|tokens|recipes|law|registry]'
---

# Aesthetic

Aesthetic is the Misty Step design system: one CSS artifact, token contract,
recipes, static registry, and law gate. Use it before inventing one-off UI
vocabulary for Misty Step-facing products, docs, dashboards, artifacts, or
internal tools.

Read `DESIGN.md` before visual work. Read `docs/ADOPTING.md` before adding
Aesthetic to another repo.

## Route

| Need                                       | Surface                                                                                   |
| ------------------------------------------ | ----------------------------------------------------------------------------------------- |
| Install or upgrade the package             | `@misty-step/aesthetic` pinned by version or git tag                                      |
| Understand invariants vs consumer dials    | `docs/ADOPTING.md`                                                                        |
| Generate visuals that feel like Misty Step | `DESIGN.md`                                                                               |
| Use tokens programmatically                | `tokens.json`                                                                             |
| Use behavior snippets                      | `recipes/` and `recipes/recipes.js`                                                       |
| Read machine-facing registry data          | `site/r/*.json`                                                                           |
| Query tokens/recipes/primitives/law live   | `mcp/server.mjs` (`npx -p @misty-step/aesthetic aesthetic-mcp`, or `npm run mcp` in-repo) |
| Verify rendered law compliance             | `npm run ci`                                                                              |

## Operating Rules

- Aesthetic owns the vocabulary. Do not add a second design system beside it.
- Raw colors, radii, type scales, shadows, and motion curves need a named reason
  when a repo already consumes Aesthetic.
- Rendered output is the proof surface. Passing source lint is not enough when
  a page, artifact, or dashboard can be opened.
- Keep consumer steering in the consumer repo. Aesthetic provides invariants
  and dials; products choose brand accents and local layout needs.
- Do not copy prototype files into production. Rebuild the locked direction
  with package tokens, recipes, and registry references.

## MCP server (aesthetic-931)

`mcp/server.mjs` is the fifth face: a stdio MCP server so an adopting agent
can query tokens/recipes/primitives/law without vendoring knowledge or
grepping `site/r/*.json` by hand. Six tools, each a thin read over an
already-built registry file (no regeneration, no judgment):

- `get_tokens` -- the full `tokens.json`.
- `list_primitives` -- every route + title + summary + classes (lightweight).
- `get_primitive` -- one route's full entry (markup, recipes used).
- `get_recipe` -- the real JS source of one `recipes/*.js` file.
- `get_law` -- the structured law object, whole or by section.
- `search_registry` -- keyword search across every registry item's
  name/title/description.

Run it: `npm run mcp` (stdio) or `npx -p @misty-step/aesthetic aesthetic-mcp`
from a consumer. Tests: `node --test mcp/*.test.mjs` (also covered by
`npm run ci`).

**API/CLI waived, recorded here per the five-faces audit:** Aesthetic ships
as a single CSS artifact + static registry, not a running service --
there is no request/response boundary a REST API would front, and no
imperative workflow a CLI would drive beyond the build scripts
(`scripts/build-*.mjs`) already exposed via `npm run build:*`. The MCP
server is the query face; a bespoke HTTP API or CLI on top of the same
read-only registry lookups would be a second, redundant face for the same
four query shapes.

## Verification

In the Aesthetic repo:

```sh
npm run ci
```

For consumer repos, run that repo's native gate plus the rendered law or visual
check it has adopted. If no gate exists, that is the integration gap to fix.
