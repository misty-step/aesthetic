# Adopt aesthetic across every misty-step surface

Priority: P0 · Status: in-progress · Estimate: XL

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

## Census update (2026-07-02) — this is now the consolidated fleet epic

The 2026-06-12 survey above named 7 in-scope + 5 not-applicable = 12
repos. Grepping every `~/Development/*/backlog.d/` for the standard
`NNN-adopt-misty-step-comic-ops-aesthetic.md` ticket finds **18 repos**
carrying it: bb-dashboard, caesar-in-a-year, cerberus, chrondle,
conviction, curb, daedalus, doomscrum, harness-kit, laboratory, landmark,
linejam, memory-engine, ponder, vanity, vibe-machine, web-presence,
workbench. (sploot carries a differently-named
`032-adopt-design-system-and-landing-pass.md` — same intent, different
slug; misty-step's own ticket predates this convention.) This section
reconciles that gap; it does not replace the children above (still the
right sequencing for the original 7), it adds the rest of the fleet as
tracked scope of the same epic, per the operator's "consolidate into one
epic" instruction.

**Two findings worth flagging before more PRs land:**

1. **The ticket title itself is stale.** All 18 files are still named
   `*-adopt-misty-step-comic-ops-aesthetic.md`, a name from the comic-ops
   pivot (commit `9bbe0f9`) that was reverted 2026-07-01 (see 017) — the
   repo is back on the minimalist v2.8.1 system these tickets were
   written before. Any repo picking up its ticket cold will orient on
   the wrong visual target unless it also reads current `README.md`/
   `DESIGN.md`. Rename-on-touch, not a mass rename (18 repos' git history
   isn't this repo's to rewrite).
2. **bb-dashboard's ticket pins a fully reverted target.** Its oracle
   requires "the noir-ledger comic-ops flavor" and "commit `9bbe0f9` or
   later" — that commit's lineage is now `archive/comic-ops-pivot`, not
   `master`. As written, satisfying the ticket literally means adopting a
   flavor this repo no longer ships on its default branch. Needs a
   correction in bb-dashboard's own backlog before anyone executes it;
   flagging here since aesthetic is the source of truth the ticket cites.
3. **Two "not-applicable" repos still carry open tickets in their own
   backlogs** (daedalus, memory-engine) — their local tickets were never
   closed when this epic's 2026-06-12 survey excluded them. Not this
   repo's file to edit, but worth a note back to those repos so the
   tickets don't sit open forever chasing a target that was declared
   out-of-scope here.

**First live customers to convert (per operator direction), concretely:**

- **bb-dashboard** — fix finding #2 above first (re-scope the ticket off
  the reverted comic-ops flavor onto current `README.md`/`DESIGN.md`),
  then execute: it is bitterblossom's UI surface (bitterblossom itself,
  the Rust event plane, correctly stays not-applicable), so this is a
  real dashboard consumer, not a duplicate of the excluded repo.
- **powder** — has no adoption ticket in `~/Development/powder/backlog.d/`
  at all despite carrying a real UI surface (`006-kanban-ui.md`, a
  kanban board). Gap, not oversight: file the standard adoption ticket in
  powder's own backlog (numbered per its local sequence) before treating
  it as in-scope here. Once filed, it joins the STRAIGHTFORWARD tier
  (kanban board ≈ curb's dashboard shape: cards, status, a rail).

Both are named explicitly because they're small enough to land fast and
prove the registry-tier (019) and skill-face (021) work lands before the
harder substantial rewrites (sploot, vanity, linejam) spend the steering
doctrine.

**Per-repo checklist (applies to every repo in the 18, in addition to the
oracle above):** ticket references current `README.md`/`DESIGN.md`, not a
stale flavor name — [ ]; ticket pins a real aesthetic tag (not a commit
sha on a branch that no longer exists) — [ ]; PR includes before/after
screenshots both modes — [ ]; repo's own gate is green — [ ]; if the repo
also has a `law/` render-gate wired into its own CI, note it (this is the
015 "law travels" proof this epic can supply for free once any one PR
does it — see 015).
