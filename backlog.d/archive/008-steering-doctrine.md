# Write the volume knob: steering doctrine for loud consumers

Priority: P0 · Status: shipped · Estimate: M

## Goal

Any consumer — calm tool or maximalist toy — can define its scheme and
personality inside written invariants, and the result is recognizably
misty-step at every volume.

## Oracle

- [ ] The README's Steering section grows into the doctrine, naming
      the two strata explicitly. **Invariants** (what makes it ours,
      never steered): one size per surface + the 13px chrome register,
      nine registers from three inks × three weights, hairlines and
      radius 0, motion as feedback that resolves once, status rides
      the glyph, buttons are not links, the cursor law, light and dark
      as equals. **Dials** (what makes it yours): the accent scheme —
      one hue or several, named as project tokens; the status triplet;
      surface/wash tint within the contrast contract (004); motion
      amplitude within the feedback law; the mono ratio; density
      (measure choice, chrome register usage).
- [ ] DESIGN.md carries the same stratification for agents generating
      visuals.
- [ ] `docs/ADOPTING.md` exists: the step-by-step adoption guide
      (stylesheet link, Geist loading, mode boot, steering block,
      recipes) with a copy-paste steering-block template.
- [ ] The catalog gains a steering section demonstrating one screen
      under at least four real consumer schemes — chrondle's scholar
      green, curb's instrument triad, sploot's cyan/coral/violet,
      doomscrum's acid — proving in-family across volume levels.
      (steering-fan-3.html is the prototype precedent.)
- [ ] Each of the seven adopters has a written steering block,
      checked into docs/ADOPTING.md as worked examples and reused
      verbatim by the 011 PRs.

## Notes

**Why (consumer-survey lens, 2026-06-12):** the v2.4.0 law rewrite
deprescribed accent counting ("define your scheme, use it with
judgment") but the system never showed how. sploot (cyan/coral/violet/
lime), doomscrum (acid/pink/cyan), and chrondle (four game-mode hues)
have nowhere written to put hue #2..#4, so each invented a parallel
token system — exactly the divergence aesthetic exists to kill. The
operator's mandate names this directly: affordances for fast-and-loose
applications that remain clearly misty-step. Kenya Hara stays the
core; the doctrine writes down which dials turn and which never do.

Extra hues are _project tokens_ (e.g. `--sploot-coral`), spent under
the same judgment as the accent; they ride content (type, glyphs,
illustration), never replace ink hierarchy or fill pills. A loud
project turns up hue count and accent frequency — never radius, size
scale, or ambient motion.
