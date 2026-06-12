# Grow the motion vocabulary into real delight

Priority: P1 · Status: shipped · Estimate: M

Shipped in v2.4.0 after three LAB rounds. View choreography resolved
as a deliberate CUT ("keep it simple, loop back later" — the tuned
tempos live in view-motion-fan-3.html for that day); everything else
landed.

## Goal

Make every interaction in the system feel deliberately crafted: each
user action gets a small, eased acknowledgment, and nothing moves
without one.

## Oracle

- [x] View switches: LOCKED as a simple cut (2026-06-12 round 3) —
      choreography deliberately declined for now; revisit welcome.
- [x] The nav's active state moves: `.ae-nav-ind` sliding underline
      shipped in v2.1.
- [x] Mode change: one soft 700ms view-transition breath (480ms
      uniform ease fallback), shipped v2.4.0 in recipes.js +
      .ae-vt-mode/.ae-mode-easing CSS.
- [x] Form submit has a success moment: `.ae-send` shipped in v2.2.0.
- [x] Under prefers-reduced-motion all of the above are instant
      (recipes.js gates VT and anticipation; the stylesheet's global
      reduce rule kills the rest); the manual homepage demos the
      moments live.

## Children

1. Exit/enter view choreography — the easing vocabulary lives here;
   the canonical `data-leaving` hook consumers wire up belongs to the
   recipes layer (backlog 005). LAB round 2 (2026-06-12): breathe
   solid at 1×, crossfade strong at half speed, cascade maybe at
   half; drift killed (scrollbar mid-swap), page turn killed (goofy
   swipe). view-motion-fan-3.html offers the tuned tempos
   (breathe 560/640, crossfade 800, cascade 1200). Operator taste:
   slow and soft, never rushed — but breathe was already almost too
   slow at 1×, so there is a floor.
2. Mode-change crossfade — LOCKED (2026-06-12 round 2):
   document.startViewTransition at 700ms with --ae-ease (VT400 the
   close second), falling back to a 480ms uniform color transition
   where unsupported; both page turns died (fuzzy edge). Ready to
   implement as the canonical mode-change recipe (recipes layer,
   backlog 005) and the site's own toggle.
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
   FINAL (round 3): COMBINED locked — label + line warm together
   toward ink, 60% cap, 120ms lag — shipped v2.4.0 as the opt-in
   [data-ae-anticipate] recipe.

## Notes

**Why (delight lens, operator-requested):** v2.0.1 has only an entrance
animation and hover eases; the operator asked for "deep design thinking
about how to leverage animations and feedback to create more delightful
subtle experiences." Motion stays feedback, never decoration: every
animation must name the user action it acknowledges.
