# Build the aesthetic site: marketing, catalog, lab, and guardrails

Priority: P0 · Status: in-progress · Estimate: L

## Goal

The system gets its own comprehensive first consumer: a site in this
repo — manifesto, primitive catalog, recipes, lab, and archetype
gauntlet — built solely with the system itself, riding HEAD, so every
change to aesthetic is exercised, rendered, and regression-checked the
moment it lands.

## Oracle

- [x] `site/` in this repo, deployed to aesthetic.mistystep.io via
      GitHub Pages, linked from the README.
- [x] Zero build step, zero framework: hand-written HTML consuming
      `aesthetic.css` and the recipes verbatim — view-source is
      documentation.
- [x] The site rides HEAD — the only consumer sanctioned to do so;
      stated in CLAUDE.md.
- [x] The landing screen states the law in the system's own voice
      (the manual homepage, v2.4.0).
- [ ] Every primitive has a catalog entry: rendered example,
      copy-paste markup, and its derivation from the law — including
      everything 007 children 3/4/5 land.
- [x] Lab work stays internal: `prototypes/` is local-only; the Pages
      workflow publishes only `site/`.
- [ ] Guardrails: stylelint + prettier in CI (shipped); Playwright
      screenshots of the stable pages (homepage + catalog +
      gauntlet, both modes) fail on unintended pixel change.
- [x] CLAUDE.md states the law, the release flow, and the site
      structure.

## Children

1. ~~Site skeleton + Pages deploy~~ — SHIPPED v2.3.0.
2. ~~Manual homepage~~ — SHIPPED v2.4.0.
3. Catalog entries for every primitive 007 lands (joint with 007
   child 7): rendered + markup + law derivation.
4. Archetype gauntlet pages — dashboard, docs, settings flow — joint
   with 007 child 6 and 009 (these pages ARE their acceptance test).
5. Playwright visual regression: screenshot the stable pages in both
   modes in CI; diffs fail the build. Keep the dependency dev-only;
   the site itself stays build-free.

## Notes

**Why (operator-requested, 2026-06-11):** iteration on the system
needs a consumer that exists to exercise all of it. Form-factor
decisions argued in-session: monorepo over separate repo, static-first
over framework, snapshot stable pages and exclude the lab.

2026-06-12 groom: children renumbered to what remains after v2.4.0
shipped the skeleton, homepage, and lab convention.
