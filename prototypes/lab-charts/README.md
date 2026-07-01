# lab-charts — chart library evaluation

LAB prototype. Local only, never deployed. Evaluates wrapping a real
chart library the way the kit already wraps an icon library: vendor a
file, skin it hard, ship a thin recipe on top.

## Candidates considered

| library             | visual malleability                                                                                                                                                                            | zero-build                                                       | size (min)                                    | coverage                                                                                                                          | theming                                                                                                                                    | a11y                                                                                                                              |
| ------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------- | --------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------ | --------------------------------------------------------------------------------------------------------------------------------- |
| **Observable Plot** | high — emits real SVG (`rect`/`circle`/`path`/`text`) with predictable structure; every mark is a CSS-selectable DOM node, so hairlines/no-radius/mono-ticks are plain CSS + a JS color object | yes — single UMD file + d3 peer dep, both vendorable, no bundler | 208K (+276K d3 peer)                          | line, bar (`barY`/`barX`), scatter (`dot`), frontier (`line`), range bands (`rectY`/`ruleY`), area, and more via composable marks | JS style props read from CSS custom properties at render time + CSS overrides on the emitted SVG                                           | marks support `aria-label`/`title`; chart itself needs a wrapping `role="img"` + description, same discipline as `.ae-plot` today |
| uPlot               | medium — canvas-drawn series/axes/grid, so every stroke is a JS option, not a CSS override; only the legend is real DOM                                                                        | yes — single IIFE file, ~52K, no dependency                      | 52K                                           | line/area/bars-via-plugin; no native scatter or declarative range-band mark, would need custom canvas draw calls                  | JS options only; can still source colors from custom properties via `getComputedStyle`, but there's no CSS escape hatch for stroke styling | canvas output is invisible to a11y tree; needs a manual data-table fallback for every chart                                       |
| Chart.js            | low — rounded bar corners, default shadows/gradients, built-in legend chrome, animated-by-default; all strippable but fights the defaults constantly                                           | yes — single UMD, no dependency                                  | ~200K                                         | line, bar, scatter; no native Pareto-frontier or CI-band mark (would compose from line+scatter)                                   | JS options object; some cascade via canvas font family only                                                                                | canvas-based, same fallback problem as uPlot                                                                                      |
| Apache ECharts      | low–medium                                                                                                                                                                                     | yes — single file, but heavy                                     | 500K–1MB depending on build                   | broadest coverage of any candidate                                                                                                | JS theme object, most complete theming API of the bunch, but everything still renders to canvas                                            | canvas-based; ECharts ships an ARIA plugin but it's bolted on                                                                     |
| d3 (direct)         | total control                                                                                                                                                                                  | yes, but no framework at all — every chart is written by hand    | ~90K (d3 core) or fetch only the modules used | unlimited, at the cost of authoring every scale/axis/mark yourself                                                                | total — it's just SVG you wrote                                                                                                            | whatever you build                                                                                                                |

**Pick: Observable Plot.** It is the only candidate whose default
output — real SVG nodes — continues the pattern the kit already
uses for `.ae-spark`, `.ae-plot`, and `.ae-flow` ("the kit dresses a
consumer-authored SVG"). A Plot chart is CSS-stylable the same way
those hand-drawn instruments are, and its declarative marks
(`line`, `barY`, `dot`, `rectY`/`ruleY`, `text`) map close to
1:1 onto the primitives the law already names (trend, bar, plot,
CI). The 208K + 276K d3 peer dependency is irrelevant for a
vendored, cached asset and is smaller than ECharts by 2–5x.

**Runner-up: uPlot.** Keep it in reserve for a future need Plot
can't serve well — dense or live-updating time series (thousands of
points, sub-second redraw) where canvas throughput beats SVG DOM
cost. Its 52K footprint and zero dependencies make it the right
tool the day the kit needs a real-time telemetry chart; it is the
wrong tool for the four instrument shapes evaluated here because
canvas strokes can't be reached by CSS, which breaks the "dress a
consumer SVG" pattern this system leans on everywhere else.

Chart.js and ECharts were ruled out primarily on (a): both ship
opinionated chrome (rounded bars, drop shadows, animated legends,
tooltips with box-shadows) that has to be actively fought rather
than simply not opted into, and both render to canvas, losing the
CSS-theming continuity Plot offers for free.

## What's in this prototype

`index.html` — four side-by-side comparisons, CSS-only instrument
next to the same data rendered by Plot, in both modes (toggle
button flips `.light`/`.dark` on `<html>`, matching the site's own
mechanism, and re-renders the charts by re-reading `--ae-*` custom
properties):

1. **trend** — `.ae-spark` (no axis, one pen stroke) vs. `Plot.line`
   (two named series, ticked axis, hover tip).
2. **bar** — five stacked `.ae-meter`s standing in for a bar chart
   today (no shared baseline) vs. `Plot.barY` (real category axis,
   status ink over threshold).
3. **scatter + frontier** — `.ae-plot`'s hand-authored SVG vs. the
   same visual grammar (dashed frontier, accent pick, dominated
   fade) produced by `Plot.dot` + `Plot.line` + `Plot.text`, with
   Plot computing the projection instead of the consumer.
4. **interval / range band** — `.ae-ci` (one interval per row/track)
   vs. `rectY`/`ruleY`/`dot` sharing one scale, so several
   intervals become directly comparable instead of stacked rows.

Screenshots (1440×900, both modes, Playwright, zero console errors):

- `/private/tmp/claude-501/-Users-phaedrus-Development-aesthetic/d877a0be-4e56-4209-8e48-03c83fd40511/scratchpad/shots-charts/lab-charts--light.png`
- `/private/tmp/claude-501/-Users-phaedrus-Development-aesthetic/d877a0be-4e56-4209-8e48-03c83fd40511/scratchpad/shots-charts/lab-charts--dark.png`

`vendor/` — the pinned files this prototype loads locally
(`plot.umd.min.js` 208K, `d3.min.js` 276K peer dep, `uPlot.iife.min.js`

- `uPlot.min.css` kept for reference/future use, unused by this page).

## The skin, in full

Everything needed to make Plot disappear into the system lives in
two places:

- a `base` Plot options object built from `--ae-ink`,
  `--ae-ink-muted`, `--ae-ink-faint`, `--ae-line`, `--ae-accent`,
  `--ae-err`, and `Geist Mono` for every tick/label/tip — read via
  `getComputedStyle(document.documentElement)` at render time, so a
  mode flip just means "call render again";
- ~20 lines of CSS (`.aeplot-fig …`) that reach into the emitted SVG
  to restyle Plot's built-in `tip` mark (its default is a
  drop-shadowed rounded rect) into a hairline-bordered, surface-backed
  box matching `.ae-ci-detail`'s hover readout, and to force every
  text node onto the mono register.

No rounded marks, no gradient fills, no legend swatches, no
box-shadow tooltip survive contact with that skin — see the
screenshots. One entrance: charts fade in once (240ms, the kit's
`--ae-soft`) and skip the fade entirely under
`prefers-reduced-motion`; nothing loops or re-animates on data
change beyond that first paint.

## What should stay CSS-only

`.ae-meter` and `.ae-flow` should **not** move to Plot:

- `.ae-meter` is a single-value gauge inline with prose/table cells
  — reaching for an SVG chart library for a 4px bar is the wrong
  tool, and the CSS version's "width is a state resolution" motion
  contract (`transition: width`) has no clean Plot equivalent.
- `.ae-flow` is a diagram (nodes + orthogonal wires with
  done/active/locked/failed frame states), not a data chart — it has
  no axes, no scale, nothing Plot's mark vocabulary buys you.

`.ae-spark` and `.ae-ci` are worth keeping as the CSS-only default
for their existing single-value use (an inline trend glance, one
interval on its own row) and _promoting_ to a Plot-backed recipe
only when the surface needs what CSS can't give — multiple series,
a shared scale across several intervals, ticks, or a hover readout.
That mirrors what the two `trend` and `interval` comparisons above
show: the CSS version isn't wrong, it's a smaller instrument for a
smaller job.

## Proposed recipe API

A single recipe function per chart kind, matching the
`recipes/*.js` dependency-free-snippet convention but requiring the
vendored Plot (+ d3 peer) as an explicit, documented exception — the
same shameless-reuse posture the icon set already takes:

```js
// recipes/chart.js (sketch — not implemented by this prototype)
import * as Plot from '../vendor/plot.js'; // consumer vendors or npm-installs

export function aeChart(el, { kind, data, ...opts }) {
  const theme = aeChartTheme(); // reads --ae-ink/--ae-line/--ae-accent/... once
  const plot = chartKinds[kind](data, theme, opts); // 'trend' | 'bar' | 'scatter' | 'interval'
  el.replaceChildren(plot);
  return plot; // caller can el.replaceChildren(aeChart(...)) again on data/mode change
}
```

- `kind: 'trend'` → `Plot.line` (+ optional `Plot.dot` for the last
  point, matching the light/dark screenshots above).
- `kind: 'bar'` → `Plot.barY`, with a `threshold`/`statusFn` option
  so a bar can take `--ae-err`/`--ae-warn` the way `.ae-meter-fill`
  does today.
- `kind: 'scatter'` → `Plot.dot` + optional `frontier: true` to add
  the dashed `Plot.line` and `is-chosen`/`is-dominated` fill split,
  reusing the exact rules `.ae-plot` documents today.
- `kind: 'interval'` → `rectY`/`ruleY`/`dot`, one row per named
  interval, replacing `.ae-ci` only when ≥2 intervals need a shared
  scale.

`aeChartTheme()` is the one function that has to be re-run on a mode
flip (see `renderCharts()` in `index.html` for the working version);
the recipe should own re-render-on-mode-change as a documented
contract, since Plot bakes colors into the SVG at construction time
rather than reading CSS custom properties live like the CSS-only
instruments do.

## Integration cost

- **Package footprint**: `aesthetic.css` itself does not grow —
  Plot is a JS-side dependency, not a CSS one. The `recipes/`
  directory would gain one file (~150–250 LOC) plus a documented
  peer dependency on `@observablehq/plot` (and its `d3` peer),
  vendorable the same way the icon SVGs are, or left as an npm
  peerDependency for consumers who already bundle.
- **Build**: none required — Plot's UMD + d3's UMD both run from
  `<script>` tags with no bundler, matching the site's zero-build
  constraint proven in this prototype.
- **Recipe surface**: one new file, `recipes/chart.js`, combined
  into `recipes/recipes.js` by the existing `build:recipes` step.
- **Docs**: `DESIGN.md` §7 gains one sentence pointing "data is
  drawn in ink" readers at `aeChart()` for multi-series/ticked
  surfaces, without changing the existing `.ae-spark`/`.ae-ci`/
  `.ae-plot` prose — those stay the single-value/hand-authored
  defaults.
- **Risk**: Plot bakes SVG at construction time, so every consumer
  of `aeChart()` must re-call it on a mode flip (documented above);
  this is a real behavioral difference from the current CSS-custom-
  property-driven instruments and needs to be called out loudly in
  the recipe's own comment header, not just this README, or a
  consumer will ship a chart frozen in the mode it first rendered in.
- **Residual**: this prototype hand-writes the theme object per
  chart call; the real recipe should memoize `aeChartTheme()` per
  render and expose a `data-ae-mode`/`prefers-color-scheme`
  listener so `aeChart()` consumers don't have to wire re-render
  themselves — that wiring is not built here and is the main gap
  before `chart.js` could ship.
