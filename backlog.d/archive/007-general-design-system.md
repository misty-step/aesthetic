# Generalize into a full design system without diluting the law

Priority: P0 · Status: shipped · Estimate: XL

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
- [x] The standard catalog is covered — SHIPPED v2.5.0: checkbox,
      radio, switch, validation, compact buttons, popover, tooltip,
      toast, tabs, fold (accordion), crumbs (breadcrumb), skeleton
      (shimmer refused), empty state, meter (progress), tag (the
      badge refused: a mono word, never a filled pill), kbd — each
      with a catalog entry and law derivation; select stays answered
      by the settings row/menu, indeterminate spinners refused (a
      status line is the aesthetic answer).
- [x] Three archetypes beyond the screen — SHIPPED v2.5.0: app shell
      (.ae-shell/.ae-rail/.ae-desk), document (.ae-doc), form flow
      (the settings gauntlet composition).
- [x] The demo gauntlet — SHIPPED v2.5.0: dashboard, docs, settings
      gauntlet pages + the steering page, both modes, law-gated in CI.
- [x] The site splits into a marketing landing and a full catalog —
      shipped v2.4.0 (the manual homepage + primitives catalog).
- [x] DESIGN.md stays true — the volume knob and the v2.5 vocabulary
      landed in DESIGN.md and the catalog together.
- [x] Distribution — SHIPPED v2.5.0: the one-file import is unchanged;
      site/r/ serves the shadcn-compatible registry (registry.json +
      aesthetic.json + recipes.json), regenerated at release time by
      scripts/release.mjs (the one-command release, landed).

## Children

1. ~~Rewrite the accent law~~ — SHIPPED v2.4.0.
2. ~~Status inks~~ — SHIPPED v2.4.0 (contrast table → backlog 004).
3. ~~Form completeness~~ — SHIPPED v2.5.0. Was: checkbox, radio, switch, field validation —
   "a line, not a box" extended to choice controls. The settings row
   (.ae-settings) is already the long-select answer; codify that
   derivation. Known gaps from the lab: a compact control scale for
   13px chrome contexts; a switch that isn't grainy (the operator
   rejected earlier toggles — keep it hairline and inky).
4. ~~Overlay components~~ — SHIPPED v2.5.0 (popover/tip/toast). Was: popover/dropdown, tooltip, toast — each with
   its motion choreography (feedback, resolves once; toasts enter
   soft, persist until dismissed or replaced — no anxious timers as
   default). Dialog shipped v2.4.0. React consumers style Base UI /
   Radix primitives rather than reinventing focus management; the CSS
   classes must be framework-agnostic costumes.
5. ~~Data & structure~~ — SHIPPED v2.5.0. Was: tabs generalized from `.ae-nav`, the tag (badge
   refusal: mono chrome-register text, hairline at most, never a
   filled pill), skeleton/progress, empty states,
   accordion/collapsible (the settings-row fold generalized),
   breadcrumb (chrome-register path with muted separators).
6. ~~Archetypes~~ — SHIPPED v2.5.0. Was: document, app shell, form flow; screen remains the
   flagship. The app shell carries the dense register: a chrome
   sidebar (13px), a working canvas, hairline divisions — curb is the
   reference consumer.
7. ~~The site grows up~~ — SHIPPED v2.5.0 — homepage manual SHIPPED v2.4.0; the catalog
   absorbs every child above as it lands (rendered specimen, canonical
   markup, law derivation). Demo gauntlet pages hang off the catalog
   (joint with 003).
8. ~~Registry distribution~~ — SHIPPED v2.5.0 (absorbed backlog 002): serve
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
