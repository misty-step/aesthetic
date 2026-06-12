# Build the aesthetic site: marketing, catalog, lab, and guardrails

Priority: P0 · Status: shipped · Estimate: L

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
- [x] Every primitive has a catalog entry: rendered example,
      copy-paste markup, and its derivation from the law — thirty-eight
      entries as of v2.5.0.
- [x] Lab work stays internal: `prototypes/` is local-only; the Pages
      workflow publishes only `site/`.
- [x] Guardrails: stylelint + prettier + recipes-freshness in CI;
      Playwright LAW gates (tests/law.spec.ts) assert the law itself
      on every stable page in both modes — max font size, radius 0,
      no page scroll, cursor law, clean console, mode resolution, the
      send announcement — with screenshots uploaded as CI artifacts.
      (Decided 2026-06-12: law assertions over pixel diffs — they
      catch the violation class directly and need no platform-bound
      baselines; pixel diffs can still come later if drift appears.)
- [x] CLAUDE.md states the law, the release flow, and the site
      structure.

## Children

1. ~~Site skeleton + Pages deploy~~ — SHIPPED v2.3.0.
2. ~~Manual homepage~~ — SHIPPED v2.4.0.
3. ~~Catalog entries for every primitive~~ — SHIPPED v2.5.0.
4. ~~Archetype gauntlet pages~~ — SHIPPED v2.5.0 (dashboard, docs,
   settings + the steering page).
5. ~~CI guardrails~~ — SHIPPED v2.5.0 as the Playwright law gates.

## Notes

**Why (operator-requested, 2026-06-11):** iteration on the system
needs a consumer that exists to exercise all of it. Form-factor
decisions argued in-session: monorepo over separate repo, static-first
over framework, snapshot stable pages and exclude the lab.

2026-06-12 groom: children renumbered to what remains after v2.4.0
shipped the skeleton, homepage, and lab convention.
