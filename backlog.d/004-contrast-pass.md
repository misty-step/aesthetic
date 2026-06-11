# Fix contrast where faint ink labels controls

Priority: P1 · Status: ready · Estimate: S

## Goal

Every piece of interactive text meets WCAG AA contrast in both modes;
faint ink is reserved for decoration.

## Oracle

- [ ] `.ae-mode` (interactive label) renders at >= 4.5:1 against the
      surface in light and dark (today it uses --ae-ink-faint: #a3a3a3
      on #fcfcfc is roughly 2.5:1, a fail).
- [ ] Input placeholders are either >= 4.5:1 or explicitly documented as
      decorative supplements to always-visible labels (they are; say so).
- [ ] tokens.json gains a contrast table: each ink against each surface,
      with the AA verdict, so future token changes re-check mechanically.

## Notes

**Why (a11y lens):** computed during groom: ink-faint fails AA on both
surfaces; it currently styles the mode toggle's resting state. Simplest
fix: `.ae-mode` rests at --ae-ink-muted (#737373, ~4.6:1 light) instead
of faint. Hover already goes to full ink.
