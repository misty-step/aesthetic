# Codify the faint-ink contract with a contrast table

Priority: P2 · Status: ready · Estimate: S

## Goal

Faint ink is mechanically guaranteed decorative-only: every ink/surface
pair carries a computed AA verdict in tokens.json, and the README states
the placeholder contract.

## Oracle

- [ ] tokens.json gains a contrast table: each ink against each surface
      with ratio and AA verdict, so future token changes re-check
      mechanically. Computed 2026-06-11: muted passes (4.62 light /
      5.79 dark on surface); faint fails everywhere (2.46 / 2.80);
      light muted on wash is 4.27 — flag as not-for-text.
- [ ] README (or the CSS token block) states the contract: faint ink is
      decoration only — input placeholders supplement always-visible
      `.ae-label`s, and the link underline at rest is decorative.
- [ ] No interactive text rests at faint: `grep ink-faint aesthetic.css`
      shows only the placeholder and the link underline (true today;
      keep it true).

## Notes

**Why (a11y lens):** rewritten in the 2026-06-11 groom. The original
premise — `.ae-mode` resting at faint ink, an AA fail — was fixed by
v2.2's icon toggle, which rests at `--ae-ink-muted` (aesthetic.css,
`.ae-mode`), and as a non-text icon control it needs only 3:1 anyway.
What survives is the codification: the table and the documented
contract, so the next token tweak can't silently reintroduce the fail.
Demoted P1 → P2 accordingly: no live AA violation remains.
