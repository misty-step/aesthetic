# aesthetic

This repository holds the Misty Step identity and its public catalog,
[aesthetic.mistystep.io](https://aesthetic.mistystep.io/). The identity serves
Misty Step's own surfaces, the studio and mistystack. It is not a mandate for
other products, which keep their own design.

Delivery, real-running-app verification, release gates, Boat slice lifecycle
and watchdog supervision follow the
[Mistystack method](https://github.com/misty-step/mistystack/blob/master/skills/misty/SKILL.md).
Design principles (UX/DX/AX; no layout captions) live in
[mistystack design](https://github.com/misty-step/mistystack/blob/master/skills/design/SKILL.md#principles);
point there, don't copy them.

## Where changes go

- `tokens.json` is the only home of identity values. After changing it, run
  `npm run build:design` and regenerate `brand/identity/` as `brand/README.md`
  describes.
- `DESIGN.md` is the identity in prose. Read it before visual work.
  `scripts/build-design.mjs` writes its frontmatter from `tokens.json`.
- `brand/` is `@misty-step/brand`, with its own checks, workflows and release.
- `aesthetic.css` only imports `brand/identity/brand.css` and `spine.css`.
  Root CSS never defines identity values; it uses the brand variables.
- `site/` is the catalog source. `npm run build:site` renders it into `_site/`
  with the identity's fonts, marks and icons. Never edit `_site/`.
- `tests/` proves the built site in a browser.
- `prototypes/`, `explorations/`, `CHANGELOG.md` and `docs/releases/` record
  the retired `@misty-step/aesthetic` design system. They are history, not
  authority.

## Verify and release

`npm run check` runs formatting, CSS lint, the `DESIGN.md` drift check and
`designmd lint`, the script tests and the site build. `npm run ci` adds the
browser tests. Prove a change on the built site in light, dark and at phone
width, then merge without CI or review. The `ci` workflow, dispatched by hand,
is the release gate; after it passes, dispatch `pages` to deploy. No CI runs on
pull requests or pushes. `brand-v*` tags release the brand package.
