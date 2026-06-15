# Daedalus instrument channels — plotting, uncertainty, flow, report

Priority: P1 · Status: open · Estimate: L

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
   parts; making the *system* legible needs nodes + connectors. The kit has no
   node/edge/port/wire vocabulary at all, so a schematic view must leave
   entirely (grid background, custom routing). In-idiom answer: hairline-framed
   nodes (radius 0), orthogonal ink connectors, the current stage in the accent,
   locked stages dashed-faint, mono port labels. The gate spine and lineage
   spine Daedalus hand-rolled are the 1D degenerate case of this.

4. **Document → a report/dossier register.** The document archetype carries
   prose, but a *generated* artifact — a foundry report, a launch packet, a
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
The reusable proof that the kit can serve a *lab* (not just a dashboard) is the
same bar 013 sets: if Daedalus's comparison screen cannot be built from
primitives — plot, intervals, matrix, and all — the channels are still
missing. Daedalus's `lab.css` is the consumer-side sketch of 1–3 and should be
read as a proposal, then rebuilt properly here per repo law (never graduate by
copy).
