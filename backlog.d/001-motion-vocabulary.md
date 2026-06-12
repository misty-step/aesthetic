# Grow the motion vocabulary into real delight

Priority: P1 · Status: pending · Estimate: M

## Goal

Make every interaction in the system feel deliberately crafted: each
user action gets a small, eased acknowledgment, and nothing moves
without one.

## Oracle

- [ ] View switches choreograph exit and entrance (old view eases out,
      new one eases in), not just an entrance on remount.
- [x] The nav's active state moves: `.ae-nav-ind` sliding underline
      shipped in v2.1.
- [ ] Mode change cross-fades surface and ink over ~240ms instead of
      flashing instantly (the toggle's own sun/moon crossfade shipped
      in v2.2; the page-wide surface/ink flash remains).
- [x] Form submit has a success moment: `.ae-send` shipped in v2.2.0.
- [ ] Under prefers-reduced-motion every one of the above is instant,
      and a demo page proves both paths.

## Children

1. Exit/enter view choreography — the easing vocabulary lives here;
   the canonical `data-leaving` hook consumers wire up belongs to the
   recipes layer (backlog 005). LAB: round-1 fan was unjudgeable
   (variants rendered identically); view-motion-fan-2.html reruns it
   with slower timings and a speed control. Operator taste on motion:
   slow and soft, never rushed.
2. Mode-change crossfade (transition on color/background scoped to the
   change, without transitioning everything always). LAB verdict
   (2026-06-12): view-transition "nice and soft"; wipe only if slowed
   to a page-turn; uniform/cut harsh — mode-crossfade-fan-2.html
   explores the slow end.
3. ~~Form feedback choreography~~ — shipped as the send moment, v2.2.0.
4. Demo page exercising all of it (see backlog 003).
5. LAB: input anticipation. A focus affordance that ramps in as the
   pointer approaches (`intent = max(0, 1 - d/180)^2`), operator-fed
   (2026-06-11). As written it breaks the law twice — it precedes the
   interaction and never resolves — so it enters as a prototypes/ LAB
   with a verdict, not a recipe. Lawful constraints if it survives:
   opacity only (no translate/scale/magnetism), ramp the hairline ink
   and cap below the committed hover state, nearest-edge winner-take-
   all so exactly one target responds per view, snap to the real
   focus/hover state on contact, listener only under
   `(hover: hover) and (pointer: fine)`, off under reduced motion,
   single passive pointermove writing one `--intent` custom property
   per rAF. Prior art: Apple iPadOS pointer magnetism (withheld from
   hover elements on purpose), Rauno Freiberg's "inferring intent,"
   TanStack/ForesightJS invisible prefetch. Verdict bias going in:
   marketing-site tell, expect FAIL — but it is the strongest test of
   whether "anticipation is feedback about intent" earns a law
   carve-out. LAB verdict (2026-06-12): label warming is the lone
   keeper ("kind of nice"); ring, hairline, magnetic, glow, and
   commit all killed. anticipation-fan-2.html refines warming only.

## Notes

**Why (delight lens, operator-requested):** v2.0.1 has only an entrance
animation and hover eases; the operator asked for "deep design thinking
about how to leverage animations and feedback to create more delightful
subtle experiences." Motion stays feedback, never decoration: every
animation must name the user action it acknowledges.
