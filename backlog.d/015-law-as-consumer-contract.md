# Ship the law as a consumer-enforceable contract

Priority: P1 · Status: pending · Estimate: L

## Goal

A consumer of `@misty-step/aesthetic` can mechanically prove the law holds on
their own surfaces — the law travels as an enforceable gate and a
machine-readable spec, not only as CSS and prose.

## Oracle

- [ ] The npm package `files` ships the law gate: a consumer runs one
      documented command and gets pass/fail on the invariants (one size
      ≤ 16px, radius 0, status-on-glyph not filled pills, no page scroll on
      screen surfaces) — against their own rendered routes (render-gate)
      and/or their authored CSS (token-guard).
- [ ] An off-law page fails and an on-law page passes: a planted rounded
      card / 18px heading / filled pill is named as the offender, not waved
      through. (If an off-law page passes, the gate is theater.)
- [ ] `tokens.json` is consumable as DTCG (`$type` / `$value`) — Style
      Dictionary or a consuming agent ingests it without a bespoke parser;
      the existing `law` and `contrast` blocks are preserved or linked.
- [ ] `docs/ADOPTING.md` documents the gate as an adoption/steering step, and
      at least one 011 adoption PR uses the gate output as its "invariants
      hold in every PR" evidence in place of a manual eyeball.
- [ ] No divergence between what this repo enforces and what it ships: the
      consumer gate is the extracted, packaged form of `tests/law.spec.ts`,
      and this repo's own CI runs it as the dogfood.

## Verification System

- Claim: a consumer can prove the law on their own app with a shipped command.
- Falsifier: install the published tag into a scratch repo, point the gate at
  an off-law fixture (rounded card, 18px heading, filled status pill) → it
  must FAIL and name the offender; point it at an on-law page → it must PASS.
- Driver: `npm pack` the tag, install into a throwaway consumer, run the
  documented gate against one on-law and one planted off-law fixture.
- Grader: exit code plus the named violation (which element broke which
  invariant — the offender list `law.spec.ts` already emits).
- Evidence packet: the pack `files` listing, both gate runs (pass + fail with
  offender), and a DTCG token round-trip through Style Dictionary.
- Cadence: on the packaging PR, then in CI thereafter.

## Children

1. **Portable render-gate (the crown jewel).** Extract `law.spec.ts`'s law
   assertions (max font ≤ 16, radius 0, no page scroll, default cursor,
   status-on-glyph) into a consumer-runnable Playwright helper the consumer
   aims at their own routes; add it to the package `files`. Render-time is
   framework-agnostic by construction — it catches the violation in the DOM
   regardless of how it was authored (React, Vue, Tailwind, hand-typed),
   which is the same property that lets aesthetic stay one zero-build CSS
   file. This is aesthetic's differentiated answer to the 2026 wave, which
   lints _source_; aesthetic gates _render_.
2. **Source token-guard.** Ship a stylelint config consumers extend: no raw
   hex outside the token set, radius must be 0, no authored `font-size` > 16px,
   spacing on the `--ae-space-*` scale (depends on 013's scale landing). For
   consumer repos with no live surface to render-gate. Prior art:
   `stylelint-plugin-rhythmguard`, `stylelint-design-token-guard`, Discourse's
   `require-design-tokens.mjs`.
3. **Machine-readable spec export.** DTCG-format tokens (`$type` / `$value` /
   `$description`) plus a DESIGN.md-format machine block, so Stitch / MCP /
   Style-Dictionary consumers ingest the law natively instead of re-deriving
   it. `tokens.json` is already intent-named with `law` + `contrast`
   manifests — this is a schema view, not new decisions. **Author a
   `$description` on every token carrying its invariant-or-dial status** (e.g.
   `--ae-radius`: "0 — invariant; round marks are SVG circles, never CSS
   border-radius"; `--ae-ink-faint`: "decoration only; fails AA 4.5:1; never
   interactive"; `--ae-accent`: "the consumer's dial; steer freely"). This is
   how the law survives the trip into Figma / Stitch / an LLM consumer —
   prose rots, a token description travels with the value (the whole premise
   of the 2026 wave). While restructuring, collapse the `tokens.json`
   `color.light` / `color.dark` parallel key sets into DTCG `$value: {light,
dark}` form — the data-layer twin of 013's CSS de-triplication (close the
   013↔015 seam deliberately). The _rendered_ token reference a human walks is
   **016's** job (016 renders, 015 packages); this child ships the
   machine-readable source that 016's page reads.
4. **Wire into ADOPTING + 011.** Document the gate in `docs/ADOPTING.md`;
   make "run the gate" the mechanical form of 011's "invariants hold in every
   PR" oracle.

## Notes

**Why (evidence lane — `/research` + the 2026-06 assessment):** A cresting
2026 wave — Polar Orbit, Builder.io ("Make AI Agents Follow Your Design
System"), Atlassian DESIGN.md, Hardik Pandya, framingui, designproject's
"agentic design system", `stylelint-plugin-rhythmguard` — converges on one
mechanism: do not _document_ the design rule; ship a _deterministic gate_ that
fails the build on off-system values, plus golden examples and a
machine-readable token spec. The driver is that prose rules rot and a model
weights nearby examples over a buried instruction, so the interface drifts
toward "a thousand slightly different grays" exactly where the system is
silent. aesthetic already embodies four of five pillars (intent-named tokens,
the `law` manifest, the `site/` golden directory rendered in CI, the law
spec). **The gap:** the law is enforced only on the surfaces _this_ repo
renders — `files` is `["aesthetic.css","tokens.json","recipes","README.md",
"LICENSE"]`, so consumers get zero mechanical enforcement. The product is "the
law"; the law must travel as something a consumer's CI (and a consuming agent)
can run.

**Differentiated edge:** the field lints _source_ (framework-locked,
authoring-time). aesthetic can ship the _render_ gate (framework-agnostic,
output-time) — the same property that lets it be one zero-build file. This is
the portable form almost nobody else ships; lean into it.

**Non-goal (rejected mechanism — "Bet A"):** the StyleX / typed-`<Box>`-prop /
compiler / ban-the-`<div>` approach (Orbit's authoring-time enforcement) is
explicitly _not_ adopted — it detonates the zero-build single-file identity,
and 2026 evidence puts StyleX adoption "limited but meaningful" outside Meta
(Tailwind ~12M weekly downloads vs StyleX ~100–300K). A typed React wrapper
(`@misty-step/aesthetic-react`) is a _possible future companion package_ only
if consumer demand appears — out of scope here.

**Relationships:** serves **011** (makes its "invariants hold in every PR"
oracle mechanically checkable) and complements **013** (013 _names the
channels_ so consumers need not escape; this _catches them_ when they do — the
positive and negative halves of the same anti-drift goal). Builds on the
existing `tests/law.spec.ts` and `tokens.json` — packaging existing IP, not
green-field.

**Status note:** raw-but-evidenced. The exact packaging API (Playwright
fixture vs an `npx` bin vs a documented copy path; how a consumer declares
their routes) needs a `/shape` pass before promotion to `Status: ready`.
