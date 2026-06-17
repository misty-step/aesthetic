# Daedalus instrument channels — plotting, uncertainty, flow, report

Priority: P1 · Status: in-progress · Estimate: L

## Goal

Extend the flexibility arc (013) with the variation channels a measurement
**lab** needs that the workbench/matrix work does not yet name. Driven by
Daedalus's operator UI (012): four design directions for the candidate-
comparison screen were built, then rebuilt strictly in-kit. Rebuilding three
of them (a dense operator screen, a generated report, a pipeline diagram)
forced escapes from aesthetic — each escape is a channel the kit is silent in.
Same framing as 013: not less identity, but **name the channels consumers
hand-roll**, in the house idiom (hairlines, ink, one size, status on the
glyph). Off-kit evidence lives in
`daedalus/docs/daedalus-ui-lab/round-2/{terminal,atlas,schematic}-offkit.html`
(what we wanted) vs the in-kit rebuilds at the same names (what the kit could
express).

## The gaps (each is a place the kit is silent, not wrong)

1. **2D plot — the single biggest gap.** The kit draws one dimension: the
   spark (a trend) and the meter (a level). A lab lives on the **cost × quality
   plane** — an XY scatter with a Pareto frontier — and there is no primitive
   for it, so the consumer hand-rolls SVG. In-idiom answer: hairline L+B axes,
   mono tick labels, ink stipple dots, a dashed frontier guide, exactly one
   accent for the chosen point, an open ring for a reference (oracle/incumbent),
   faint for dominated. Round marks are the pen (cf. the spark's round caps);
   radius-0 still governs rectangles.

2. **Uncertainty — eval trust has no mark.** "The lead is inside the spread"
   is the most important sentence on an eval screen, and the kit cannot draw
   it. Needs an interval/error-bar primitive: a ruled track carrying a mean
   tick + a faint range band (a meter that shows a point and its spread), and
   error whiskers for scatter points. Answers "is this score solid or noisy"
   and "do these two intervals overlap" — the certification question.

3. **Flow / diagram — the kit cannot draw a system.** A foundry is a pipeline
   (task → arena → search → gates → launch) and a candidate is a composition of
   parts; making the _system_ legible needs nodes + connectors. The kit has no
   node/edge/port/wire vocabulary at all, so a schematic view must leave
   entirely (grid background, custom routing). In-idiom answer: hairline-framed
   nodes (radius 0), orthogonal ink connectors, the current stage in the accent,
   locked stages dashed-faint, mono port labels. The gate spine and lineage
   spine Daedalus hand-rolled are the 1D degenerate case of this.

4. **Document → a report/dossier register.** The document archetype carries
   prose, but a _generated_ artifact — a foundry report, a launch packet, a
   comparison dossier meant to be read and shared — wants numbered figures with
   captions, an abstract/lede, and a findings/recommendation block, and it
   wants to stay scannable over a full page. The one-size law (right for a
   screen) makes a long report monotonous: there is no sanctioned lede/abstract
   register, no figure-number+caption convention beyond `.ae-plate-cap`.
   Decide: does `.ae-doc` gain a thin "report" sub-register (lede, figure
   caption, pull-quote — all by weight/space, never a serif display face), or
   are reports declared a consumer concern?

5. **Density, re-raised by the eval grid (evidence, not a re-litigation).**
   013 explored the compact/operator dial and dropped it — "comfortable only."
   Daedalus's comparison is the hard counterexample: a 6-candidate × 8-task
   matrix + the cost/quality plot + the read + the gate row genuinely want to
   coexist in one viewport, and at comfortable density they spill. The locked
   answer (comfortable + horizontal scroll inside the workbench) may well hold;
   logging the case so the decision is made against the densest real surface,
   not re-opened by default. The in-kit "operator screen" rebuild is the
   artifact to judge it against.

## Oracle

- [ ] A 2D plot primitive ships (`.ae-plot` / `.ae-scatter`): hairline axes,
      mono ticks, ink point marks with frontier/dominated/chosen/reference
      states, one accent, both modes. A `site/` specimen proves a cost×quality
      frontier from primitives; the law holds (radius 0 on rectangles, one
      accent, status on the glyph not the fill).
- [ ] An uncertainty primitive ships: a mean+range interval track and scatter
      error whiskers, expressing "overlapping intervals = not separable."
- [ ] A flow/diagram primitive ships (`.ae-flow` nodes + connectors): hairline
      nodes, orthogonal ink wires, accent for the active stage, dashed-faint for
      locked; a `site/` specimen draws a small pipeline. (The existing gate/
      lineage spines fold in as the 1D case.)
- [ ] The document archetype's report needs are resolved: either a documented
      lede/figure-caption/pull-quote register (weight + space only) or an
      explicit "reports are a consumer concern" note in ADOPTING.md.
- [ ] The density decision is recorded against the densest real surface (the
      Daedalus operator screen), with the in-kit artifact linked as evidence;
      keep or revisit "comfortable only" on that basis.

## Notes

Sequence: this rides behind 013's foundation pass + workbench + matrix (those
are table stakes; 1–2 here build directly on the matrix/meter idiom). Items
1–3 are genuinely new vocabulary; 4–5 are decisions, not necessarily new code.
The reusable proof that the kit can serve a _lab_ (not just a dashboard) is the
same bar 013 sets: if Daedalus's comparison screen cannot be built from
primitives — plot, intervals, matrix, and all — the channels are still
missing. Daedalus's `lab.css` is the consumer-side sketch of 1–3 and should be
read as a proposal, then rebuilt properly here per repo law (never graduate by
copy).

## Build evidence — friction from the in-kit rebuilds (2026-06-15)

Four directions were rebuilt strictly in-kit; each lane was told to STOP and log
friction rather than hand-roll. What the kit could not express, by gap:

**Gap 1–2 (plot / uncertainty).** The report figure wanted confidence whiskers
ON the scatter points; `.ae-scatter` has dots + a frontier line but no native
uncertainty mark, so whiskers became faint absolutely-positioned spans. → a
`.ae-dot-whisker` / scatter error-bar belongs alongside `.ae-ci`.

**Gap 3 (flow / diagram) — strongest, fully confirmed.** The system view had to
hand-roll the whole diagram: nodes were `.ae-plate` + inline padding with ad-hoc
border-color/style for current-vs-locked (no `.ae-node` with
`is-current`/`is-locked`); every connector was an absolute inline `<svg>` with a
viewBox guessed to the row box (no `.ae-wire` straight/elbow + reached/locked/
accent variants); wires attach to invented coordinates (no PORT/anchor model, so
node and wire geometry drift on reflow); there is no flow/canvas container; chip
role states (leader/delivery/dominated/ref) were `.ae-tag` border overrides (no
`.ae-chip`).

**Gap 4 (report register) — fully confirmed.** No display/headline register (h1
= body, only weight separates, so the masthead opens flat); no lede lift (a
small-caps/rule opening device that isn't size-based); no figure-number
primitive (`Figure 1`/`Table 1` hand-typed into `.ae-plate-cap`; wanted
`figure`/`figcaption` + CSS counters); no break-out width utility
(figures-break-wide-then-return needs `.ae-wide` + per-block inline
`max-width:var(--ae-measure)` on every prose section — wanted an `.ae-bleed`/
measure toggle); no lawful row-emphasis in `.ae-table` (marking the subject/
delivery row needed a soft `color-mix` fill the law avoids — `.ae-table` wants
the `mx-pick` equivalent).

**Gap 5 (density) — confirmed against the densest surface.** The in-kit operator
screen (`terminal.html`) holds the scatter + the 8×8 matrix + the read + the gate
row in one dark viewport only by letting the matrix scroll inside `.mx-scroll`;
at comfortable density it is genuinely tight. The locked-density cost, made
visible — keep or revisit "comfortable only" against this artifact, not in the
abstract.

**Belongs to 013 (workbench plumbing), surfaced here.** No command/status-bar
primitive (`.ae-statusbar` — the operator strip is hand-strung `.lab-bar` + flex
glue); no desk-fills-viewport layout class (every operator screen re-derives
`height:100vh; overflow; flex; min-height:0`); the winner-bold matrix cell
(`is-best`/`is-fail`, the flex-3b encoding) lives in `lab.css` but not yet in
`aesthetic.css`. (`kbd` already exists — use it for keyboard hints instead of
bordered chrome.)

Artifacts (in-kit rebuilds vs off-kit originals), in
`daedalus/docs/daedalus-ui-lab/round-2/`: `comparison.html` (shell),
`terminal.html` (dark operator), `atlas.html` (report), `schematic.html` (flow).
The `*-offkit.html` siblings are the leave-the-kit versions, kept as each
friction's "before".

## ROUND 5 lab verdicts (2026-06-16)

LAB proofs: `prototypes/inst-1-plot`, `inst-2-uncertainty`, `inst-3-flow`,
`inst-4-report` (six treatments each, both modes, law-abiding).

**The framing correction (load-bearing).** These instruments ship as
**composable, un-opinionated primitives + one tasteful default each** — the
consumer composes. The treatment-fans are a menu and a proof of what the
primitives must express, NOT a bracket to crown one winner. The kit holds one
opinion per instrument (its default); which treatment beyond that is the
consumer's call. Same DNA as accent-not-law. Spend kit effort on the parts a
consumer cannot hand-roll: the building blocks, a clean composition API, the
micro-interactions, and the default.

- **inst-1 plot.** Legend spacing needs work (esp. the frontier legend row).
  Reference-rings decent. **Drop dominated-wash** — a filled region the kit
  needn't support. Bare / labeled / frontier / reference-rings / status-marks
  are all consumer-composable from the same primitive (axes + dot marks +
  frontier line + ref-ring + status glyph). Kit default: lean **frontier**;
  the default may be domain-flavored (the demo is math-reasoning).
- **inst-2 uncertainty.** Spread-on-glyph reads poorly — weak. **Band + tick
  and whiskers are the strong pair** (default candidates), but the band must
  read **clearer**. Needs the interaction layer the consumer can't trivially
  hand-roll: **subtle micro-animation + a hover state that reveals the detailed
  numbers.** Box / forest / scatter-whiskers are less compelling but still
  surfaced as options.
- **inst-3 flow.** Fine; branching-DAG / swimlane fine. Mostly consumer-
  composable from `.ae-node` + `.ae-wire` + ports. Default: **spine**.
- **inst-4 report.** Plain reads reasonable; the lede / figure / findings /
  pull-quote registers are opt-in (weight + space only). Mostly the consumer's;
  the kit supplies the registers, not a prescribed dossier.

Next move: stop fanning treatments — define the actual composable primitive set
(`.ae-scatter` + `.ae-ci`/`.ae-dot-whisker`, `.ae-node`/`.ae-wire`/ports, the
report registers) and the per-instrument defaults, then graduate into the
013/014 build.

Lab refinements applied (round 5, committed): inst-1 dropped dominated-wash +
dead code, renumbered to five, widened the frontier legend; inst-2 gave the band
a bounded-hairline clarity pass, a draw-in-from-the-mean micro-animation, and a
hover that reveals the exact mean + CI. Both VERDICTs reframed to "one primitive

- a default." inst-3 / inst-4 unchanged (verdicts = fine / mostly consumer's).

## Build contract — the composable primitive API (round 5 → build)

The lean API each instrument graduates into. Per primitive: the class(es), the
state modifiers, the kit DEFAULT (its one opinion), and the consumer-composes
boundary. Purely-additive where possible (new classes can't break pinned
consumers); the `@layer` + token work is the semver-conscious exception.

- **Plot — `.ae-plot` (frame + axes) · `.ae-pt` (round dot mark) ·
  `.ae-frontier` (dashed guide).** Modifiers on the mark: `is-chosen` (accent),
  `is-dominated` (faint), `is-ref` (open ring), failed → a status glyph at the
  point. DEFAULT = frontier (axes + dots + dashed frontier + accent chosen +
  faint dominated). Consumer composes bare / labeled / reference / status by
  toggling parts. Dominated-wash is NOT in the kit.
- **Uncertainty — `.ae-ci` (interval on a track: bounded band + mean tick) ·
  `.ae-dot-whisker` (scatter error bar).** Interaction is part of the primitive:
  draw-in resolves from the mean (once, reduced-motion safe), hover reveals the
  exact mean + CI. Modifier `is-lead` (accent); separability glyph ✓/⚠/✗.
  DEFAULT = band + mean tick; whiskers the alt. Forest is a composed view
  (sort + a reference line), not a separate primitive. Spread-on-glyph dropped.
- **Flow — `.ae-node` (square hairline node) · `.ae-wire` (orthogonal
  connector) · ports (anchors so geometry survives reflow) · an optional flow
  canvas.** Node states `is-current` (accent) / `is-locked` (dashed-faint) /
  `is-done` (✓) / `is-failed` (✗); wire variants straight / elbow ·
  reached / locked / accent. DEFAULT = spine (row + orthogonal wires + accent
  current + dashed locked). Consumer composes stations / ported / DAG /
  swimlane / schematic; the schematic grid is opt-in, off by default.
- **Report — `.ae-doc` opt-in sub-registers, weight + space ONLY (no new size,
  no serif):** `.ae-lede` (standfirst — weight + leading + a hairline rule),
  `figure`/`figcaption` + CSS counters (FIG n), `.ae-findings` (hairline summary
  box, not a filled card), `.ae-pull` (pull-quote — weight + space + a margin
  rule). DEFAULT = plain `.ae-doc` unchanged; every register is opt-in. The kit
  supplies registers, never a prescribed dossier.

Plus, from the build-evidence above: `.ae-chip`, `.ae-statusbar`, and the
winner-bold matrix cell (`is-best`/`is-fail`) graduate alongside.

**Sequence + risk.** Ride behind 013's foundation pass (`@layer aesthetic{}` is
the semver-significant one — it changes the cascade for consumers, so it lands
as a deliberate version bump, not a silent patch). Build additive primitives
first (plot, `.ae-ci`, nodes/wires, report registers) each with a `site/`
specimen + `tests/law.spec.ts` coverage, render-verified both modes, before the
cascade-affecting foundation work. One primitive end-to-end as the pattern, then
fan out.
