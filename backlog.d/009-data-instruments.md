# Build the data instruments: meter, numerals, delta, spark

Priority: P1 · Status: ready · Estimate: M

## Goal

Dense data surfaces — curb's spend gauges, doomscrum's ticker, every
future dashboard — compose from hairline ink instruments without
breaking the one-size law, and the dashboard archetype unparks.

## Oracle

- [ ] `.ae-meter`: a hairline track with an ink fill — radius 0, no
      filled pill, no gradient. The fill is ink by default; it takes a
      status ink only when the level IS the signal (curb's
      warn/kill thresholds). Optional `.ae-meter-mark` threshold ticks.
- [ ] `.ae-num`: tabular numerals (mono, `font-variant-numeric:
      tabular-nums`) so columns of figures align and tick without
      jitter. The display-register question gets its lawful answer,
      recorded in the catalog: a hero figure is weight 800 mono at the
      one size — never larger; the instrument reads loud through
      weight and isolation, not scale.
- [ ] `.ae-delta`: change indicators ride the glyph rule — the ▲/▼
      arrow (Lucide stroke) takes the status ink, the figure stays ink.
- [ ] `.ae-spark`: the inline sparkline convention — an SVG polyline,
      `stroke: currentColor`, 1.5px, no fill, no axes — documented
      with copy-paste markup; no charting framework.
- [ ] The dashboard gauntlet page (003 child 4) composes meters,
      tables, deltas, sparklines and tabular figures inside the app
      shell archetype, both modes, and reads unmistakably ours.
- [ ] Every instrument carries a written law derivation in the catalog.

## Notes

**Why (operator + consumer lens, 2026-06-12):** 007 parked "dashboard
presence until a data-viz vocabulary exists" — curb is that dashboard
today, hand-rolling gauges with soft tinted fills and rounded radii
that the system should own. The aesthetic answer to data viz is the
same as to type: ink, hairlines, weight. A gauge is a ruled line, not
a glowing pill; a trend is a pen stroke; a delta is a status glyph.
This vocabulary is also what doomscrum's ticker and any future
analytics surface need, so it lands as system primitives, not curb
one-offs.
