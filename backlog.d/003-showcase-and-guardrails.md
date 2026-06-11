# Build the aesthetic site: marketing, catalog, lab, and guardrails

Priority: P0 · Status: pending · Estimate: L

## Goal

The system gets its own comprehensive first consumer: a site in this
repo — manifesto, primitive catalog, recipes, lab, and archetype
gauntlet — built solely with the system itself, riding HEAD, so every
change to aesthetic is exercised, rendered, and regression-checked the
moment it lands.

## Oracle

- [ ] `site/` in this repo, deployed to a stable URL (GitHub Pages
      first; custom domain is an operator call later), linked from the
      README.
- [ ] Zero build step, zero framework: hand-written HTML consuming
      `aesthetic.css` and the backlog-005 recipes verbatim, so every
      page is view-source-able canonical markup. A generator (e.g.
      11ty) may be adopted later only when page count makes shared
      chrome painful — never a JS framework.
- [ ] The site rides HEAD — the only consumer sanctioned to do so;
      production consumers keep pinning tags. Stated in CLAUDE.md.
- [ ] The landing screen states the law in the system's own voice (the
      CSS header is the draft), composed as one `.ae-screen`.
- [ ] Every primitive has a catalog entry: rendered example,
      copy-paste markup, and its derivation from the law (the README's
      decision-register pattern, made public).
- [ ] A `/lab` section hosts in-progress motion and component work
      (LAB 001/002 precedent), explicitly excluded from visual
      regression.
- [ ] CI: stylelint + prettier fail on violations; Playwright
      screenshots of the stable pages (catalog + archetypes, both
      modes) fail on unintended pixel change.
- [ ] CLAUDE.md states the law, the release flow, and the site
      structure, so a cold agent can contribute safely.

## Children

1. Site skeleton: `site/index.html` (the manifesto screen) +
   `site/primitives.html`, GitHub Pages deploy, README link.
2. Catalog entries for every shipped primitive: rendered + markup +
   law derivation.
3. Recipes wired verbatim once backlog 005 lands them; until then the
   skeleton may carry minimal inline glue marked `TODO(005)`.
4. `/lab`: the motion work of backlog 001 develops here.
5. Archetype gauntlet pages — dashboard, docs, settings, landing —
   joint with backlog 007 child 7 (these pages ARE its acceptance
   test).
6. Guardrails: stylelint + prettier + CI, Playwright visual diff of
   stable pages in both modes, CLAUDE.md.

## Notes

**Why (operator-requested, 2026-06-11 session):** the two production
consumers exercise one narrow archetype each and cannot be the
comprehensive showcase; iteration on the system needs a consumer that
exists to exercise all of it. Form-factor decisions argued in-session:
monorepo over separate repo (the site must ride HEAD — a repo boundary
reintroduces the tag-bump friction 002 exists to kill; the npm `files`
allowlist already keeps `site/` out of the package), and static-first
over framework (the marketing site for "one stylesheet, no build step"
must itself prove the claim; view-source is the reference docs; the
React path is proven by production consumers and 007's registry
child). The lab/regression tension resolves by scope: snapshot stable
pages, exclude `/lab`.

Grown from the original "demo page + CI guardrails" ticket in the
2026-06-11 groom; promoted P1 → P0 as the iteration substrate for
001, 005, and 007. Earlier note (2026-06-11 morning) on the P2 → P1
promotion is superseded by this rewrite.
