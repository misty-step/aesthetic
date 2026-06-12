# Generalize into a full design system without diluting the law

Priority: P0 · Status: ready · Estimate: XL

## Goal

Any future project — dashboard, docs site, checkout flow, landing page —
can be built entirely from this system and come out unmistakably ours:
the standard UI catalog and UX flows exist, each answered the aesthetic
way, while the identity laws hold everywhere.

**Ratified 2026-06-11:** the operator confirmed this is the mandate —
"covers anything and everything that any application built under
Misty Step would need" — and added two arcs: the agent-facing identity
prose (DESIGN.md, seeded same day) and a no-npm distribution path
(child 8, confirmed feasible).

## Oracle

- [ ] The law is stratified in writing (CSS header, README, DESIGN.md,
      tokens.json `law`): identity laws (ink/weight hierarchy, motion
      as feedback, buttons are not links, hairlines, radius 0, cursor
      law) apply everywhere; "viewport screens" and "one accent per
      view" are re-scoped as laws of the screen _archetype_, with the
      identity-level form "the accent is rationed." The operator
      explicitly questions the one-accent law (2026-06-11) — child 1
      ends with their sign-off on the final wording.
- [ ] Status inks exist: danger/success/warn pairs for both modes,
      designed ink-forward (text + hairline, never filled boxes), each
      passing AA in the backlog-004 contrast table.
- [ ] The standard catalog is covered against the shadcn-59 inventory
      (June 2026: 18 form controls, 10 overlays, 7 navigation, 10 data
      display, 8 feedback/status, 5 layout): select, checkbox, radio,
      switch, field validation, dialog, popover/dropdown, tooltip,
      toast, table, badge, skeleton/progress, empty state, tabs,
      accordion, breadcrumb — each either shipped with a written
      derivation from the law, or explicitly refused with the more
      aesthetic answer named (a badge may be weight, not a pill).
- [ ] At least three archetypes ship beyond the screen: document, app
      shell (chrome + sidebar + dense content), form flow.
- [ ] The demo gauntlet (extends backlog 003): a dashboard, a docs
      page, a settings/form flow, and the landing screen, both modes,
      built with zero law-breaking glue.
- [ ] The site splits into a marketing landing and a full catalog:
      the homepage argues the system (specimen stays its proof), the
      catalog page documents every primitive, token, and recipe.
- [ ] DESIGN.md stays true as the system grows: every new component's
      derivation lands there or in the catalog, and the image-language
      block survives unedited unless docs/IMAGES.md changes.
- [ ] Distribution: the one-CSS-file import path still works unchanged,
      and `npx shadcn@latest add @misty-step/aesthetic` (or the direct
      /r/aesthetic.json URL) installs the system into an empty
      directory with no npm account involved on either side.

## Children

1. Rewrite the accent law — VERDICT IN (2026-06-12 round 2):
   deprescribed. The operator rejected counting rules AND role
   doctrines: "you should just be able to define an accent color and
   use it… consumers will want to define some kind of color scheme;
   that's all there is to it." The law rewrite: accent leaves the law
   and becomes steering (define your scheme, use it with judgment;
   identity comes from ink/hairlines/type/motion, never from color
   policy). Rewrite the CSS header, README, tokens.json `law`, the
   site's ONE ACCENT cell, and DESIGN.md (done), ship as v2.4.0.
   steering-fan-3.html demonstrates the same screen under six
   consumer schemes. The rest of the stratification (identity vs
   screen-archetype laws; the display-register question is parked
   with dashboards) rides the same release. READY TO IMPLEMENT.
2. Status inks: design the danger/success/warn pairs (the hardest
   taste problem in the epic — restraint is the brand); extend the
   contrast table (backlog 004 merges into this child). Fan-and-pick
   in prototypes/, like the site.
3. Form completeness: select, checkbox, radio, switch, validation
   states — "a line, not a box" extended to choice controls.
4. Overlay components: dialog, popover/dropdown, tooltip, toast, each
   with its motion choreography (consumes backlog 001's vocabulary;
   behavior via backlog 005 recipes; React consumers style Base UI
   primitives rather than reinventing focus management).
5. Data & structure: table (dense = chrome register, codified), tabs
   generalized from `.ae-nav`, badge/status text, skeleton/progress,
   empty states, accordion/collapsible.
6. Archetypes: document, app shell, form flow; screen remains the
   flagship.
7. The site grows up: marketing landing (the argument, the feel, the
   install) + catalog page (every primitive with rendered specimen,
   canonical markup, and law derivation — the existing primitives
   page is the seed). Demo gauntlet pages hang off the catalog.
8. Registry distribution (folds backlog 002): serve
   `/r/registry.json` + `/r/aesthetic.json` as static files from the
   site (shadcn universal registry item, `type: registry:item`, files
   inlined with explicit `~/` targets — works in any project, no
   framework, no npm; precedent: tweakcn's CSS-only registry, v0's
   URL registry). A release script regenerates the JSON from
   aesthetic.css/tokens.json at tag time and bumps consumer pins —
   the one-command release oracle from 002 lands here. Namespace:
   `"@misty-step": "https://aesthetic.mistystep.io/r/{name}.json"`.
   Later children can ship per-component items (e.g.
   `@misty-step/send-moment` = CSS + recipe JS + markup snippet).

## Notes

**Why (premise-inversion + competitor lens, 2026-06-11 session; ratified
by the operator the same day):** the current law conflates identity laws
(generalize perfectly) with archetype laws (viewport screens, one accent
per view — true only of the portfolio/landing shape both consumers
share). Generalize by stratifying the law, never by diluting it. Steal
shadcn's architecture, not its aesthetics: registry distribution of
code you own, behavior/styling separation, small semantic token
vocabulary (shadcn's entire semantic surface is ~33 color variables +
a radius scale — ours is 7 color tokens per mode; staying smaller is
the point). Registry research (2026-06-11): no notable CSS-only design
system ships a shadcn-compatible registry today — the slot is open.
Guardrail against becoming Material: every component carries a written
derivation from the law; if it can't be derived, either the law gets an
explicit amendment or the component gets a more aesthetic answer.

Sequencing: child 1 (the law rewrite) gates everything; 2 (status inks)
is the next taste-critical session and wants the operator's eyes; 8
(registry) is independent and can ship any time; 001 and 005 proceed in
parallel as feeders. 004 folds into child 2; 002 folds into child 8
(both pending ratification — see those tickets).

**LAB state (2026-06-12, all three rounds closed — v2.4.0 shipped):**
every verdict lives in its fan's header comment. Shipped in v2.4.0:
child 1 (law rewrite — accent deprescribed to steering, status law
added), child 2 (status inks = glyph: --ae-ok/warn/err +
.ae-ok/.ae-warn/.ae-err), child 3's direction (settings rows that
open: .ae-settings/.ae-menu — full form completeness still open),
child 4's dialog (.ae-dialog panel costume — popover/tooltip/toast
still open), child 5's table (.ae-table figure+wash, .ae-plate —
tabs/badge/skeleton/empty still open), child 7's homepage (the
manual organization). Still open: rest of 3/4/5, 6 (archetypes),
8 (registry). PARKED: dashboard presence until a data-viz
vocabulary exists. Known gaps found by the operator: a compact
button scale for 13px contexts; a toggle that isn't grainy (rows
sidestep it for now). Rules codified: a column header shares its
column's alignment; mono in moderation; controls keep progressive
disclosure; no preemptive layout accommodation for overlays.
