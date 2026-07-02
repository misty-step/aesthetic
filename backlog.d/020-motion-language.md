# Motion language — name the vocabulary, not just three durations

Priority: P2 · Status: open · Estimate: S

## Goal

`tokens.json`'s `motion` block is three durations (`quick` 160ms, `soft`
240ms, `gentle` 480ms) and one easing curve. The _law_ around motion is
real and well-stated in prose (`DESIGN.md`, `README.md`'s send-moment
section, the mode-transition breath) — feedback only, resolves once, never
rewound, nothing changes size while animating, instant under
reduced-motion — but it lives entirely in sentences a consumer or an
agent has to have read, not in named tokens or a documented choreography
grammar a new primitive's motion can be checked against. This ticket
promotes motion from "three durations" to a named layer: which duration
means what, which easing applies where, and the small vocabulary of
choreography shapes (resolve-once, draw-in, cross-fade breath) the kit
already uses inconsistently across primitives.

## Oracle

- [ ] `tokens.json`'s `motion` block gains named roles, not just raw
      values: e.g. `feedback` (state resolutions — today's `gentle`),
      `micro` (hover/focus — today's `quick`), `transition` (the 700ms
      mode breath, currently undocumented as a token at all — audit and
      add it). Every primitive's animation in `aesthetic.css` is audited
      against this list; any duration not on the list is either folded in
      or justified in a comment.
- [ ] The choreography grammar is written down once (a `## Motion` section
      in `DESIGN.md` or a new `docs/MOTION.md`, consumer's choice which):
      the 3–4 shapes the kit actually uses (state-resolves-once,
      draw-in-from-origin — used by `.ae-ci`'s draw-in per 014, cross-fade
      breath — the mode toggle) named and given their invariant (reduced-
      motion behavior, "never rewound," "nothing resizes while animating").
- [ ] Every existing animated primitive (send moment, mode toggle, toast,
      `.ae-ci` draw-in, view entrance, nav indicator slide) is mapped to
      one of the named shapes — proves the vocabulary is exhaustive against
      what's shipped, not aspirational.
- [ ] `law/invariants.ts` (or a new invariant) can check "no animation
      duration outside the named token set" the same way it checks font
      size and radius today — motion joins the enforceable law, not just
      the documented one. If out of scope for this ticket's estimate,
      record it explicitly as the next child rather than silently dropping
      it.
- [ ] `npx stylelint` and `npm run check` pass unchanged; no visual
      regression in `site/` (render-verify both modes per the repo's
      standard verification step).

## Notes

**Why this is its own epic and not folded into 018.** 018 is the
semantic/brand _token_ split (color/type/space primarily); motion is
named as its own row in the layer model precisely because it's
cross-cutting DNA (never a brand dial) rather than a themable value —
giving it a dedicated pass keeps 018 from growing an unrelated animation
audit inside a token-schema ticket.

**Scope discipline:** this is naming and enforcing what exists, not
inventing new motion. No new easing curves, no spring physics, no
per-primitive bespoke timing — the vision's "no ambient motion, ever"
non-goal holds. If the audit surfaces a primitive using an un-sanctioned
duration, the fix is to conform it to the nearest named role, not to add
a fourth duration to accommodate it.
