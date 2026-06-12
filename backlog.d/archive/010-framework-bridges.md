# Ship the framework bridges: Tailwind v4, React, next-themes

Priority: P0 · Status: shipped · Estimate: S

## Goal

A Tailwind/React consumer adopts aesthetic in minutes: utilities
resolve to --ae- tokens, fonts wire through next/font, and the mode
toggle plugs into next-themes — with zero divergent token systems.

## Oracle

- [ ] The canonical Tailwind v4 bridge exists in docs/ADOPTING.md and
      the README: an `@theme inline` block mapping --ae- tokens to
      Tailwind theme tokens (`--color-surface`, `--color-wash`,
      `--color-ink`, `--color-ink-muted`, `--color-ink-faint`,
      `--color-line`, `--color-accent`, `--color-ok/warn/err`,
      `--font-sans`, `--font-mono`, `--radius-*: 0`) so the
      `bg-surface text-ink border-line` utilities are the system.
- [ ] The Geist wiring is complete for next/font and plain `<link>`
      consumers (the README's variable-font pointer, finished with a
      worked next/font example).
- [ ] The mode story for React is written: next-themes
      (`attribute="class"`) compatibility verified against the
      pinned-mode blocks, the FOUC boot inline-script variant for
      app-router layouts, and the view-transition toggle recipe.
- [ ] At least one real consumer PR (chrondle or sploot, via 011)
      uses the bridge verbatim and ships no parallel color tokens.

## Notes

**Why (adoption-friction lens, 2026-06-12 survey):** four of the seven
UI adopters are Tailwind v4 + React (misty-step, chrondle, sploot,
linejam). Each currently hand-maps its own token layer; misty-step
already proves the `layer(base)` import works, but utilities like
`text-ink` don't exist without a bridge, so consumers keep inventing
them. One documented block kills the whole class of divergence. The
bridge is documentation, not a second artifact — the stylesheet
remains the product; the npm files allowlist stays CSS + tokens +
recipes.
