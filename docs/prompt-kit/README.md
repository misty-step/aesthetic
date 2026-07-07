# Prompt kit — catalog-conformant spec JSON from raw context

Child of [aesthetic-926](../CATALOG.md) (`docs/CATALOG.md`). Where CATALOG.md
is the prose identity of the two-tier component catalog, this directory is
its prompting half: a documented contract that reliably gets a model to emit
JSON conforming to `glance-catalog`'s schema from raw, unstructured evidence
— with a validate/repair loop, never a silent best-effort emit.

**This is a model call over raw context, not a hand-built extraction
pipeline.** The prompt is the contract; the schema is the ground truth both
the model and the validator are held to; the repair loop is the only
deterministic code in the path.

## The contract

The system prompt lives in [`SYSTEM_PROMPT.md`](SYSTEM_PROMPT.md). It:

- Points the model directly at `glance-catalog`'s schema
  (`crates/glance-catalog/catalog/catalog.schema.json` in
  [misty-step/glance](https://github.com/misty-step/glance),
  `crates/glance-catalog`) rather than restating a bespoke, hand-maintained
  copy of the field list. A prompt kit that drifts from the schema it targets
  is worse than no prompt kit; the source of truth is one file, read fresh
  at call time (`generate.mjs` loads it from a sibling checkout — see
  below — or a path given by `--schema`).
- States the envelope exactly: `{"catalog_version": "aesthetic-catalog-001",
"components": [...]}`, one `Component` per array element, tagged by
  `"type"`.
- Enumerates the 13 kind names in the same fixed order
  `glance_catalog::component::KIND_NAMES` declares them (leaf tier: markdown,
  code, diff, terminal, image, mermaid, metric, callout; structural tier:
  hero, narrative, table, timeline, disclosure) — "the single source both
  the JSON schema and any future prompt kit should enumerate from," per that
  constant's own doc comment.
- Ships four few-shot exemplars (hero, narrative, table, callout) covering
  both tiers and the narrative's `unavailable` status branch, so the model
  sees a real structural composition, not just leaf primitives in isolation.
- Names the two validation layers explicitly, because JSON Schema alone
  cannot express either: (1) `Table.empty_note` is required only when `rows`
  is empty (enforced in Rust's `Table::validate`, not the schema); (2)
  `Disclosure.children` cannot contain a nested `hero` or `disclosure`
  (enforced in `Disclosure::validate`). The prompt tells the model both
  rules directly since a schema-only description would under-specify them.

## The repair/reject loop

`generate.mjs` never emits non-conformant JSON silently:

1. Call the model with the system prompt + few-shot exemplars + raw context.
2. Validate the response against `catalog.schema.json` (Ajv, draft
   2020-12 — the schema's own `$schema`).
3. On failure, retry (default 2 extra attempts) with the validator's exact
   error list appended to the prompt as a correction turn — the model sees
   what it got wrong, not just "try again."
4. If every attempt fails, **reject explicitly**: nonzero exit, the last
   validator error printed to stderr, no output file written. There is no
   fallback template and no "close enough" partial emit — a consumer
   (fleet-retro's synthesis stage, Glass's per-agent state block, the deck)
   that gets no file knows to fall back to its own deterministic path; a
   consumer that gets a file can trust it validated clean.

Schema-shape validation (Ajv) catches everything the JSON Schema expresses;
the two Rust-only rules above are out of reach for a Node script and are
instead checked at the render step by `Component::validate()` in the worked
example below — the full validation is schema (Ajv, this script) + semantic
(Rust, the render step), matching how `glance-catalog` itself splits the two
concerns.

## Usage

```sh
# from a checkout with ../glance beside this repo (the schema is read
# directly from crates/glance-catalog/catalog/catalog.schema.json, never
# copied — see "Usage" below for the --schema override)
export OPENROUTER_API_KEY=...   # or point --api-base/--model at any OpenAI-compatible chat endpoint
node docs/prompt-kit/generate.mjs \
  --context docs/prompt-kit/example/raw-context.txt \
  --out /tmp/emitted.json
```

`--schema <path>` overrides the default sibling-checkout lookup
(`../glance/crates/glance-catalog/catalog/catalog.schema.json`), matching
the same "assume a sibling checkout, let a flag override it" convention
`scripts/scaffold-site-kit.mjs` already uses for `../aesthetic`.

[`example/catalog.schema.snapshot.json`](example/catalog.schema.snapshot.json)
is a frozen copy of `catalog.schema.json` at `aesthetic-catalog-001`,
vendored **only** so `generate.test.mjs` can exercise the repair loop
deterministically in CI without a sibling `glance` checkout or network
access. It is never `generate.mjs`'s default — real invocations always read
the live schema (sibling checkout or `--schema`) — so there is no drift risk
in the actual contract, only in this one CI fixture, and the fixture's name
says exactly what it is.

## Worked example

[`example/raw-context.txt`](example/raw-context.txt) is **real** fleet-retro
evidence — 23 items (commits + repo-sweeps) from a live
`fleet-retro --no-synthesis --no-publish` run over a 24h window across six
fleet repos, not synthesized or hand-written. [`example/emitted.json`](example/emitted.json)
is that context run through `generate.mjs` once, unedited: a `hero` +
`narrative` + `table` + `timeline` composition that validated clean against
`catalog.schema.json` on the first attempt (zero repair rounds needed).

An earlier run over the same context caught a real bug this way: the model's
`hero.stats` entries validated clean against Ajv but the Rust deserializer
rejected them (`unknown field 'type', expected 'label' or 'value'`) —
`catalog.schema.json`'s `hero.stats.items` pointed at the tagged `metric` def
(the one used for a standalone `Component::Metric`), but `Hero.stats:
Vec<Metric>` deserializes a bare struct with no `"type"` field. Fixed
upstream in `glance-catalog` by splitting a `metric_bare` def for that one
context (see that repo's own commit); `SYSTEM_PROMPT.md`'s hero example was
corrected to match. This is exactly the value of testing against the real
Rust validator instead of Ajv alone — it caught a schema/struct drift Ajv
had no way to see.

Render it through the real crate:

```sh
git clone https://github.com/misty-step/glance
cargo run --example prompt_kit_demo -p glance-catalog -- \
  path/to/aesthetic/docs/prompt-kit/example/emitted.json > /tmp/rendered.html
```

`prompt_kit_demo.rs` (in `glance-catalog/examples/`) deserializes the JSON
into `Vec<Component>`, calls `.validate()` on every element (the two
Rust-only rules above), then `render_component()` — the same two calls
`glance-catalog`'s real consumers (glance-next, fleet-retro) make. Rendered
HTML is a build artifact of that crate, not something this repo or
`glance-catalog`'s own source tree commits (`glance-next`'s own `AGENTS.md`:
"generated HTML belongs in sister repos, never in a source repository") —
run the command above for the live render.
