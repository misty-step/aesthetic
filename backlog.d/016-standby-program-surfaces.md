# 016 — Standby program surfaces

## Problem

Standby needs aesthetic to support a local-first meeting command surface:
live transcript, capture health, explicit proposal approval, worker execution,
speaker attribution, and receipts. Existing primitives can sketch the product,
but several useful compositions are still lab glue instead of named system
vocabulary.

## Evidence

- `prototypes/program-standby-compositions.html`
- Existing adjacent primitives: `.ae-shell`, `.ae-rail`, `.ae-desk`,
  `.ae-table`, `.ae-plate`, `.ae-meter`, `.ae-flow`, `.ae-settings`,
  `.ae-button`, `.ae-tag`.

## Gaps Exposed

- A bounded transcript feed row: timestamp, speaker, utterance, segment id,
  newest-first, readable in one viewport.
- A speaker-lane row: source label, status glyph, audio meter, alias action,
  evidence count.
- An approval card that is not a generic card: proposal title, cited spans,
  editable prompt, deterministic approve/ignore actions.
- A worker receipt line: profile, sandbox boundary, progress/status, artifact
  or failure reason.
- A compact event-ledger row for append-only product surfaces.
- A three-pane workbench variant that is common enough to name:
  rail, bounded desk, inspector.

## Constraints

- Do not weaken the law: one size, radius 0, hairlines, status on glyphs,
  buttons are not links, motion as feedback only, no filled status pills.
- Do not add Standby-specific classes to the package. Any core addition must be
  useful for other operator tools.
- Keep `aesthetic.css` tiny. Prefer composition docs and canonical markup before
  new primitives.

## Acceptance Sketch

- Pick one or two reusable compositions from the Standby fan.
- Rebuild the winner in `site/` as a canonical gauntlet/proof page.
- Add only the minimum CSS needed, if the composition cannot be expressed
  clearly with existing primitives.
- Playwright law gates still pass in both modes.
