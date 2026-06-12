# Adopt aesthetic across every misty-step surface

Priority: P0 · Status: ready · Estimate: XL

## Goal

Every active UI-bearing project in phrazzld/misty-step consumes
aesthetic as its primary design system — steered to its own
personality, visibly improved, recognizably family — via open PRs
with before/after evidence.

## Oracle

- [ ] Seven adoption PRs are open, one per UI consumer, each: a
      branch with conventional commits, the latest aesthetic tag
      pinned, a steering block from docs/ADOPTING.md, hand-rolled
      glue replaced by recipes where applicable, repo gates green,
      and before/after screenshots of key views in both modes in the
      PR body, arguing the improvement.
- [ ] The five no-UI projects (canary, memory-engine, daedalus,
      landfall, bitterblossom) are recorded below as not-applicable —
      no forced adoption, revisit if they grow surfaces.
- [ ] The invariants hold in every PR: one size per surface, ink
      hierarchy, hairlines, radius 0, status on the glyph, motion as
      feedback, buttons are not links.
- [ ] Loud consumers stay loud: sploot and doomscrum read playful at
      a glance AND unmistakably misty-step (the 008 doctrine is the
      test).

## Children

1. **misty-step** (upgrade, TRIVIAL): bump the pin v2.2.1 → latest;
   swap hand-rolled glue for recipes; verify the intake band and
   contact flow.
2. **curb** (STRAIGHTFORWARD): the dashboard reference consumer.
   --ae- tokens replace the local set; Geist; radius 6/9/13 → 0;
   spend gauge becomes `.ae-meter`; ok/warn/kill becomes the steered
   status triplet; light/dark via the recipes.
3. **chrondle** (STRAIGHTFORWARD): scholar green steering block;
   Tailwind bridge (010); buttons/inputs/dialogs/settings to ae
   primitives; per-game-mode hues become project tokens under the
   008 doctrine.
4. **doomscrum** (STRAIGHTFORWARD mechanically, loud steering): the
   acid scheme becomes a steering block (acid/pink/cyan as project
   tokens on a true ae dark surface); Impact → Geist 800; scanlines
   and jitter retired — energy comes from the scheme, the ticker,
   and density; status stickers become tags + status glyphs.
5. **sploot** (SUBSTANTIAL): keep cyan/coral/violet as project
   tokens; Bebas display → Geist 800 discipline; Radix primitives
   wear ae costumes (dialog, menu, toast, tabs, tooltip); masonry
   gallery keeps its shape inside the app-shell archetype; Tailwind
   bridge.
6. **vanity** (SUBSTANTIAL): re-ground on aesthetic — it drifted to
   three hand-rolled themes. The portfolio becomes an ae screen
   composition; the Lattice canvas survives as the one generative
   element; theme variety re-expressed as a steering choice, not a
   parallel system.
7. **linejam** (SUBSTANTIAL): its Kenya theme is already our
   philosophy — make aesthetic the substrate (tokens, type, controls,
   dialogs), re-express the tactile stamp/washi identity as steering
   - project tokens; the four-theme system collapses to ae light/dark
     plus steering (argued in the PR; operator decides on merge).

Not applicable (no UI surface, 2026-06-12 survey): canary (Rust API,
agents are the UI), memory-engine (Rust kernel/CLI), daedalus (Python
CLI), landfall (GitHub Action), bitterblossom (Rust event plane).

## Notes

**Why (the mandate):** the system exists to be adopted; its success
metric is the family resemblance across the fleet. Sequenced
easy → hard so the steering doctrine and bridges harden on friendly
consumers before the substantial redesigns spend them. Each PR is
reviewable by the operator independently; nothing merges itself.
