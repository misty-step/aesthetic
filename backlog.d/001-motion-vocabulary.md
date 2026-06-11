# Grow the motion vocabulary into real delight

Priority: P1 · Status: pending · Estimate: M

## Goal

Make every interaction in the system feel deliberately crafted: each
user action gets a small, eased acknowledgment, and nothing moves
without one.

## Oracle

- [ ] View switches choreograph exit and entrance (old view eases out,
      new one eases in), not just an entrance on remount.
- [ ] The nav's active state moves (weight/ink change eased, or a small
      indicator) instead of snapping.
- [ ] Mode toggle cross-fades surface and ink over ~240ms instead of
      flashing instantly.
- [ ] Form submit has a success moment: the submit line resolves into
      the confirmation without a layout jump.
- [ ] Under prefers-reduced-motion every one of the above is instant,
      and a demo page proves both paths.

## Children

1. Exit/enter view choreography (CSS-only if possible; document the
   pattern consumers need, e.g. a `data-leaving` hook).
2. Mode-change crossfade (transition on color/background scoped to the
   change, without transitioning everything always).
3. Form feedback choreography for `.ae-input` / `.ae-button`.
4. Demo page exercising all of it (see backlog 003).

## Notes

**Why (delight lens, operator-requested):** v2.0.1 has only an entrance
animation and hover eases; the operator asked for "deep design thinking
about how to leverage animations and feedback to create more delightful
subtle experiences." Motion stays feedback, never decoration: every
animation must name the user action it acknowledges.
