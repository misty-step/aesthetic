# Generalize into a full design system without diluting the law

Priority: P0 · Status: in-progress · Estimate: XL

## Goal

Any future project — dashboard, docs site, checkout flow, landing page —
can be built entirely from this system and come out unmistakably ours:
the standard UI catalog and UX flows exist, each answered the aesthetic
way, while the identity laws hold everywhere.

**Ratified 2026-06-11:** the operator confirmed this is the mandate —
"covers anything and everything that any application built under
Misty Step would need." **Re-ratified 2026-06-12:** the consumer survey
of all twelve misty-step projects (see 011) confirms the component
inventory below is what the fleet actually needs.

## Oracle

- [x] The law is stratified in writing — shipped v2.4.0: accent
      deprescribed to steering; status law added; CSS header, README,
      tokens.json `law`, DESIGN.md all carry the rewrite.
- [x] Status inks exist: --ae-ok/warn/err pairs, glyph-borne, shipped
      v2.4.0. (Contrast table codification remains — backlog 004.)
- [ ] The standard catalog is covered against the shadcn-59 inventory:
      every entry either shipped with a written derivation from the
      law, or explicitly refused with the more aesthetic answer named.
      Shipped so far: dialog, table/plate, settings rows, menu, send
      moment, nav, mode toggle, panel, status glyphs. Open: select
      (the settings row IS the answer — codify), checkbox, radio,
      switch, field validation, popover/dropdown, tooltip, toast,
      tabs, badge (the refusal: a tag is mono chrome text, never a
      filled pill), skeleton/progress, empty state, accordion,
      breadcrumb.
- [ ] At least three archetypes ship beyond the screen: document, app
      shell (chrome + sidebar + dense content), form flow.
- [ ] The demo gauntlet (extends backlog 003): a dashboard, a docs
      page, a settings/form flow, and the landing screen, both modes,
      built with zero law-breaking glue.
- [x] The site splits into a marketing landing and a full catalog —
      shipped v2.4.0 (the manual homepage + primitives catalog).
- [ ] DESIGN.md stays true as the system grows: every new component's
      derivation lands there or in the catalog.
- [ ] Distribution: the one-CSS-file import path still works unchanged,
      and the registry path (child 8) installs the system with no npm
      account on either side.

## Children

1. ~~Rewrite the accent law~~ — SHIPPED v2.4.0.
2. ~~Status inks~~ — SHIPPED v2.4.0 (contrast table → backlog 004).
3. Form completeness: checkbox, radio, switch, field validation —
   "a line, not a box" extended to choice controls. The settings row
   (.ae-settings) is already the long-select answer; codify that
   derivation. Known gaps from the lab: a compact control scale for
   13px chrome contexts; a switch that isn't grainy (the operator
   rejected earlier toggles — keep it hairline and inky).
4. Overlay components: popover/dropdown, tooltip, toast — each with
   its motion choreography (feedback, resolves once; toasts enter
   soft, persist until dismissed or replaced — no anxious timers as
   default). Dialog shipped v2.4.0. React consumers style Base UI /
   Radix primitives rather than reinventing focus management; the CSS
   classes must be framework-agnostic costumes.
5. Data & structure: tabs generalized from `.ae-nav`, the tag (badge
   refusal: mono chrome-register text, hairline at most, never a
   filled pill), skeleton/progress, empty states,
   accordion/collapsible (the settings-row fold generalized),
   breadcrumb (chrome-register path with muted separators).
6. Archetypes: document, app shell, form flow; screen remains the
   flagship. The app shell carries the dense register: a chrome
   sidebar (13px), a working canvas, hairline divisions — curb is the
   reference consumer.
7. The site grows up — homepage manual SHIPPED v2.4.0; the catalog
   absorbs every child above as it lands (rendered specimen, canonical
   markup, law derivation). Demo gauntlet pages hang off the catalog
   (joint with 003).
8. Registry distribution (absorbed backlog 002): serve
   `/r/registry.json` + `/r/aesthetic.json` as static files from the
   site (shadcn universal registry item, files inlined). A release
   script regenerates the JSON from aesthetic.css/tokens.json at tag
   time — the one-command release oracle from 002 lands here.
   Namespace: `"@misty-step": "https://aesthetic.mistystep.io/r/{name}.json"`.

## Notes

**Why (premise-inversion + competitor lens, 2026-06-11; consumer-survey
lens 2026-06-12):** generalize by stratifying the law, never by
diluting it. Steal shadcn's architecture, not its aesthetics: registry
distribution of code you own, behavior/styling separation, a token
vocabulary that stays tiny on purpose. Guardrail against becoming
Material: every component carries a written derivation from the law;
if it can't be derived, either the law gets an explicit amendment or
the component gets a more aesthetic answer.

Consumer demand (2026-06-12 survey): curb needs the app shell + dense
register; sploot needs toast/tabs/tooltip/skeleton/empty/progress;
linejam needs tag/avatar answers; doomscrum needs toast/tag/ticker;
chrondle needs dialog (shipped) + progress + settings. The
display-register question unparks via backlog 009 (data instruments).

Sequencing: 3/4/5 are the stylesheet build, 6 composes them, 7
documents as it goes, 8 ships last with the release. 008 (steering
doctrine) and 010 (framework bridges) ride alongside; 011 (adoption)
consumes the result.

**LAB state (2026-06-12, three rounds closed — v2.4.0 shipped):**
verdicts live in each fan's header comment. Rules codified: a column
header shares its column's alignment; mono in moderation; controls
keep progressive disclosure; no preemptive layout accommodation for
overlays.
