# Generalize into a full design system without diluting the law

Priority: P1 · Status: pending · Estimate: XL

## Goal

Any future project — dashboard, docs site, checkout flow, landing page —
can be built entirely from this system and come out unmistakably ours:
the standard UI catalog and UX flows exist, each answered the aesthetic
way, while the identity laws hold everywhere.

## Oracle

- [ ] The law is stratified in writing (CSS header, README, tokens.json
      `law` block): identity laws (ink/weight hierarchy, motion as
      feedback, buttons are not links, hairlines, radius 0, cursor law)
      apply everywhere; "viewport screens" and "one accent per view"
      are re-scoped as laws of the screen *archetype*, with accent
      generalized to "rationed: one per region."
- [ ] Status inks exist: danger/success/warn pairs for both modes,
      designed ink-forward (text + hairline, never filled boxes), each
      passing AA in the backlog-004 contrast table.
- [ ] The standard catalog is covered: select, checkbox, radio, switch,
      field validation/error, dialog, popover/dropdown, tooltip, toast,
      table, badge, skeleton/progress, empty state — each with a
      written rationale deriving it from the law (the decision-register
      pattern the README already uses for links).
- [ ] At least three archetypes ship beyond the screen: document, app
      shell (chrome + sidebar + dense content), form flow.
- [ ] The demo gauntlet (extends backlog 003): a dashboard, a docs
      page, a settings/form flow, and the landing screen, both modes,
      built with zero law-breaking glue.
- [ ] Distribution: the one-CSS-file import path still works unchanged
      for the simple case, and components are also installable via a
      shadcn-compatible registry (`npx shadcn add @misty-step/...`,
      Universal Registry Items so it is framework-agnostic).

## Children

1. Stratify the law: identity vs archetype, written into the CSS
   header, README, and tokens.json; "accent is rationed" replaces
   "one accent per view" at system level.
2. Status inks: design the danger/success/warn pairs (the hardest
   taste problem in the epic — restraint is the brand); extend the
   contrast table (backlog 004 merges into this child).
3. Form completeness: select, checkbox, radio, switch, validation
   states — "a line, not a box" extended to choice controls.
4. Overlay components: dialog, popover/dropdown, tooltip, toast, each
   with its motion choreography (consumes backlog 001's vocabulary;
   behavior via backlog 005 recipes; React consumers style Base UI
   primitives rather than reinventing focus management).
5. Data & structure: table (dense = chrome register, codified), tabs
   generalized from `.ae-nav`, badge/status text, skeleton/progress,
   empty states.
6. Archetypes: document, app shell, form flow; screen remains the
   flagship.
7. Demo gauntlet: dashboard + docs + settings + landing (grows
   backlog 003's demo into the acceptance test).
8. Registry distribution: shadcn-compatible registry.json + built
   items, layered on the unchanged single-file CSS core; npm publish
   (backlog 002) folds into this child when credentials land.

## Notes

**Why (premise-inversion + competitor lens, 2026-06-11 session):** the
operator asked for exactly this — general enough for arbitrary
projects, opinionated enough to stay ours. Diagnosis: the current law
conflates identity laws (generalize perfectly) with archetype laws
(viewport screens, one accent per view — true only of the
portfolio/landing shape both consumers share). Generalize by
stratifying the law, never by diluting it. Steal shadcn's
architecture, not its aesthetics: registry distribution of code you
own, behavior/styling separation, small semantic token vocabulary
(verified current 2026: Universal Registry Items are
framework-agnostic; `npx shadcn create` offers Base UI — by the
Radix/Floating UI/MUI teams — as the primitive layer). Guardrail
against becoming Material: every component must carry a written
derivation from the law; if it can't be derived, either the law gets
an explicit amendment or the component gets a more aesthetic answer
(e.g. a badge might be weight, not a colored pill).

Sequencing: 006 (color-scheme fix) and 003's site skeleton first, then
child 1 (the law rewrite) gates everything; 001 and 005 proceed in
parallel as feeders. 002 and 004 fold into children 8 and 2.
