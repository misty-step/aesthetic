# The explorer — the catalog becomes a world-class, zero-build component + token reference

Priority: P1 · Status: shipped · Estimate: L

## Closeout (2026-06-17)

Children #1–5 are shipped and live in prod — the catalog is now a world-class,
zero-build explorer: state matrices, a rendered token reference, copy-to-
clipboard, a machine composition feed, and index search. The epic's goal is
met. **#6** (editable steering preview + a consolidated register reference) was
always marked deferred/optional; it did not earn its place in this arc — split
it to its own ticket if a consumer need appears. The remaining cross-epic
threads (013's `--ae-space-*` feeding the token page's deferred space row, 015's
machine-spec complementing the feed) live in those epics, not here.

## Goal

The catalog (`site/`) graduates from a good single-file catalog into a
world-class, **zero-build** explorer: every primitive in every state, the
tokens rendered as a reference, the canonical markup one action from a
consumer's clipboard, and a machine feed an agent composes from without
scraping HTML — delivering the _jobs_ of Storybook with none of its machinery.

## The design read (`/design`)

- **Surface kind:** developer/agent reference — the product's own proof
  surface, not marketing. It must itself be exemplary in-law (it is the
  dogfood: if the explorer needs an escape hatch, the law is incomplete).
- **Audience:** the pinning developer and the adopting agent (see
  `docs/vision.md`). Both read it cold; neither should have to infer.
- **Desired feel:** instrument-panel restraint. The same hairlines, one size,
  ink-and-weight hierarchy, and radius-0 the catalog already wears. New
  affordances (copy button, filter field, token swatches) are chrome-register
  (13px) and quiet — they must not become the loudest thing on the page.
- **Dials:** VARIANCE low (it is a reference; consistency is the point),
  MOTION low (feedback only — a copy "done" resolves once), DENSITY
  comfortable (the catalog measure, `.ae-wide` where a matrix needs it).
- **The reframe (the whole epic in one line):** the catalog already _is_ the
  component library; the primitives _are_ the components; view-source _is_ the
  API. This epic makes that library **findable, copyable, state-complete, and
  token-visible** — it does not adopt a docs toolchain or ship framework
  components.

## Oracle

- [x] Every interactive primitive's detail view shows its full **state
      matrix** (default / disabled / error / resolved / … as applicable) as
      live specimens — not one happy-path specimen. The law gate runs against
      the state fan, so an off-law error state (a filled pill, a rounded box,
      a second size) fails. — _shipped 2026-06-17: `.states` blocks on
      #buttons / #choice / #validation / #toast; #status's specimen is already
      its triplet matrix; a falsifier proves the gate catches a planted
      off-law state._
- [x] A **rendered token reference** ships in `site/`, generated from
      `tokens.json` (the `scripts/build-*.mjs` codegen pattern, no new build
      category): light+dark palette swatches, the type register, the
      motion durations, and the already-computed `contrast` table surfaced as
      an `.ae-table` plate. Built only with the system; view-source is
      documentation; the law holds in both modes. — _shipped 2026-06-17:
      `site/tokens.html` via `scripts/build-tokens.mjs`; the `--ae-space-*`
      scale row is the one deferred piece (blocked on 013)._
- [x] **Copy-to-clipboard** on every source block yields clean, runnable
      markup, with a quiet chrome-register affordance and a resolve-once
      "copied" confirmation (reduced-motion safe). — _shipped 2026-06-17._
- [x] The **machine registry** (`site/r/`) carries a per-primitive
      composition feed — canonical markup + the recipe(s) it needs + the law
      clauses that bind it — so an agent composes a view from JSON without
      scraping `primitives.html`. Generated from the same source the catalog
      renders (no second source of truth). — _shipped 2026-06-17:
      `site/r/primitives.json` via `scripts/build-feed.mjs`; a round-trip
      proof composed an in-law view from the feed alone._
- [x] Client-side **search/filter** over the 42-row index, keyboard-focusable
      (`/`), pure progressive enhancement (works without it). — _shipped
      2026-06-17._
- [ ] `tests/law.spec.ts` covers every new route/surface (font sizes, radius
      0, no page scroll, console clean, both modes); the state-matrix and
      token-reference surfaces are in the gate, not exempt.

## Verification System

- Claim: the catalog delivers the jobs of a world-class explorer with zero
  build step and zero framework, and is itself fully in-law.
- Falsifier: (a) a planted off-law state in a matrix (rounded disabled
  button, filled error pill) passes the gate → the matrix/gate is theater;
  (b) the token page or any new surface introduces a build step, a framework,
  or a law violation in either mode; (c) copy yields the `…`-elided markup
  instead of runnable markup; (d) the registry still forces HTML scraping to
  recover a primitive's markup.
- Driver: serve the repo root, walk the new routes in both modes; run
  `npm run test` (law spec) and the new `scripts/build-*` generators in
  `--check` mode; round-trip one registry item into a scratch view.
- Grader: the law spec's offender list + the generator `--check` exit codes +
  a visual walk (screenshots both modes) + one agent composing a view from
  `site/r/` alone.
- Evidence packet: screenshots of the token reference and a state matrix in
  both modes; a copy-then-paste of one specimen showing clean markup; the
  registry item an agent consumed; the law-spec run.
- Cadence: per child PR, then in CI (the generators get a `--check` gate like
  `build-recipes`).

## Children

Ordered by adoption leverage (the swarm's consensus), not by ease:

1. **State matrices per interactive primitive.** ✅ _Shipped 2026-06-17._ A
   `.states` block on #buttons (default / disabled / resolved), #choice
   (checked / unchecked / disabled), #validation (resting / invalid /
   disabled), and #toast (success / failure / neutral slips) — live specimens
   by class/attribute, with the live pseudo-states (hover / active / focus)
   noted, never faked. #status's main specimen is already its ok/warn/err
   matrix. `tests/law.spec.ts` gates each state route in both modes, and a
   falsifier proves the gate catches a planted rounded/oversized button — so
   the catalog can't show a happy path the gate never checks. Built as catalog
   markup (no JS state); the one behavior add is a neutral toast trigger.
2. **Rendered token reference.** ✅ _Shipped 2026-06-17._
   `scripts/build-tokens.mjs` → `site/tokens.html`: palette swatches both
   modes, the nine-register type grid, motion durations, layout, and the
   `contrast` plate (zero new computation — the data is in
   `tokens.json:contrast`, rendered with the green ✓ riding each AA pass and
   the by-contract failures faint). Generated + prettier-formatted + byte-exact
   `--check` (wired into `npm run check`, CI, and `release.mjs`); linked from
   the catalog index; covered by `tests/law.spec.ts` both modes. The dual of
   the primitives catalog: primitives = how to compose; tokens = what the
   values are. **Remaining:** the `--ae-space-*` scale row, deferred until 013
   lands the scale (the page notes it inline).
3. **Copy-to-clipboard.** ✅ _Shipped 2026-06-17._ A dependency-free button
   per source block (`site/primitives.html` inline glue + `.src-copy` in
   `site/site.css`) copies the `.src-code` `textContent` — clean, unescaped
   markup with the syntax-highlight wrappers flattened — with a resolve-once
   "copied" ack that reverts. **Reasoned reversal of the plan:** shipped as
   site glue, not a `copy.js` recipe (the `.src-code` blocks exist only in the
   catalog, so it stays out of the npm-shipped `recipes/`), and it copies the
   curated source block rather than serializing the live specimen DOM — the
   live DOM is a structural mock for shell/scroll/nav, so the authored source
   is the correct "what you ship." Covered by `tests/law.spec.ts` (clipboard
   equals the unescaped source, both modes).
4. **Per-primitive composition feed in `site/r/`.** ✅ _Shipped 2026-06-17._
   `scripts/build-feed.mjs` parses `site/primitives.html` (the catalog is the
   single source of truth) → `site/r/primitives.json`: one entry per primitive
   with route / title / summary / classes / **role** / since / **markup** (the
   same clean text the copy button yields) / **recipes** (inferred from the
   markup's trigger classes) / an optional **note**, plus the global **law**
   manifest.
   The machine dual of copy (#3): copy serves humans, this serves the adopting
   agent (011). Proven by a round-trip — a page composed from the feed's markup
   alone rendered in-law (font ≤ 16, radius 0, recipes resolved). Byte-exact
   `--check` wired into `npm run check`, CI, and `release.mjs`; linked from the
   catalog index. Found + fixed a real wrinkle: a teaching snippet's `//` note +
   loose variant are split out so the `markup` field stays naive-composable.
5. **Client-side search/filter** ✅ _Shipped 2026-06-17._ A JS-injected
   `.ae-input` above the index filters rows by class/role text as you type; `/`
   focuses it from anywhere on the index. Injected by JS, so no-JS users keep
   the full static table (true progressive enhancement). Completes "findable";
   covered by a functional law-spec test.
6. **(Deferred, optional) Editable steering preview + consolidated register
   reference.** `steering.html` today ships a six-scheme _static_ gallery
   (`.s-house`/`.s-chrondle`/…); an editable `--ae-accent` / status-triplet
   field that re-resolves one canonical fragment live would close the
   "paste-and-see" gap. Plus a single 3×3 ink×weight register grid and the
   full status-glyph set in one place (today scattered across
   `#registers`/`#status`/`#validation`/`#toast`/`#tag`). Land only if it
   earns its place after 1–5.

## Notes

**Why (evidence lanes — GLM 5.2 swarm 2026-06-17 + lead investigation):**

- **The reframe** (skeptic lane + lead): of ~12 "Storybook" jobs, ~6 are
  already native (per-component pages, live specimen + view-source, versioned
  index, shadcn `add` distribution, composed gauntlet canvases, the steering
  gallery), 4 have trivial in-law substitutes (this epic), and 2 are REJECT
  (MDX docs pipeline, live-edit/addons) — plus the framework component library
  which is **Bet A in disguise** and stays rejected (`docs/vision.md`, 015).
  No job here requires a build step or a framework.
- **State matrices #1** (consumer lane, strongest single finding): the catalog
  shows only happy paths, so 015's render-gate only ever sees happy paths and
  cannot catch the drift it exists for. 012 measured that drift (rounded
  cards, filled pills, multi-size) — it lands precisely in the _unshown_
  states. Matrices + gate together close the loop; this is the anti-drift
  surface in visual form.
- **Token reference #2** (token-system lane + lead): the single biggest
  "design-token-system" gap. `tokens.json`'s palette, type, motion, and the
  rich `contrast` table are never _shown_ — and "view-source is documentation"
  demands they be. Owned by neither 013 (channels) nor 015 (gate/format);
  this is the rendered, human-facing half. 015 owns the machine-readable
  half (DTCG). Clean split by surface: **016 renders, 015 packages.**
- **Copy #3** (consumer + explorer lanes; caveat from the explorer-architect
  lane): the keystone bridge from "documentation" to "adoption." Must
  serialize the live specimen DOM — some `.src-code` blocks carry `…`
  placeholders and drag-selecting picks up highlight `<span>`s, so naive
  `<pre>`-copy yields unrunnable markup.
- **Registry feed #4** (consumer lane): `site/r/` ships two blob items
  (the stylesheet + recipes); an agent gets zero per-primitive markup and must
  scrape HTML — the exact anti-pattern a registry exists to prevent. shadcn's
  contract is one item per component.

**Boundary with 013/014/015:** 016 is the _human-facing rendered explorer_.
013 names the channels (workbench, matrix, foundation incl. `--ae-space-*`,
which #2 depends on). 014 is the lab instruments (mostly shipped). 015 is the
_machine-facing_ package: the render-gate #1 wires into, and the DTCG/machine
spec #4 complements. No surface is owned twice.

**Explicit non-goal — token tiering.** The token-system lane proposed
restructuring `tokens.json` into primitive→semantic→component alias tiers.
Deferred, not adopted: it is a semver-conscious break against a deliberately
flat, intent-named token set, with no consumer yet needing alias-recoloring.
Revisit only if 011 adoption surfaces real demand. (The `$description`-carries-
the-law idea from the same lane is kept — it lands in 015's DTCG child.)

**First pickup:** child #2 (token reference) or #1 (state matrices). #2 is the
most legible win and the literal answer to "a proper set of design tokens";
#1 is the highest-leverage for anti-drift. Either can be `/design`+built
behind 013's `--ae-space-*` (only #2 depends on it). Sequence the explorer
ahead of 011's substantial adoptions (sploot/vanity/linejam) so those PRs
adopt against a world-class catalog.
