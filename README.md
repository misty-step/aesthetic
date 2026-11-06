# aesthetic

The Misty Step identity and its public catalog,
[aesthetic.mistystep.io](https://aesthetic.mistystep.io/).

One identity serves Misty Step's own surfaces: the studio at
[mistystep.io](https://mistystep.io) and
[mistystack](https://stack.mistystep.io), its open method for coding agents.
It is not a mandate for other products. Each product keeps its own design.

## What is here

- [`tokens.json`](tokens.json): every identity value, from colour and type to
  corner radii, spacing and component tokens.
- [`DESIGN.md`](DESIGN.md): the identity described for people and agents. Its
  frontmatter is generated from `tokens.json`.
- [`brand/`](brand/README.md): `@misty-step/brand`, the stylesheet, components,
  marks, fonts and icons that Misty Step's sites install.
- [`aesthetic.css`](aesthetic.css): the brand stylesheet and its components in
  one import.
- [`site/`](site/): the catalog of lockups, symbol, palette, type and
  components, in light and dark.

## Build and preview

```sh
npm ci
npm run build:site
python3 -m http.server 8642 --directory _site
```

`npm run build:site` writes `_site/`, a self-contained copy of the site with
the identity's fonts, marks and icons. It fails if a page, a stylesheet or the
site's script references a file the copy lacks. After changing `tokens.json`, run
`npm run build:design` to regenerate the frontmatter of `DESIGN.md`.

## Check

```sh
npm run check # formatting, CSS lint, DESIGN.md drift and lint, script tests, site build
npm run ci    # check, then browser tests of the built site
```

The browser tests need Chromium: `npx playwright install chromium`.

## Release

The `ci` workflow is the release gate: run it by hand on the candidate. Then
run the `pages` workflow, which builds `_site/` and deploys it to GitHub Pages.
Neither runs on pull requests or pushes. The brand package releases from
`brand-v*` tags; see [brand/README.md](brand/README.md).

Every build writes `build.json` beside the page: the source revision (from
`SOURCE_REVISION`, else `GITHUB_SHA`, else `null`), the brand version and the
SHA-256 of `tokens.json`. Read
[aesthetic.mistystep.io/build.json](https://aesthetic.mistystep.io/build.json)
to confirm what is live.

## History

Until November 2026 this repository published `@misty-step/aesthetic`, a design
system with its own rules: one font size, square corners and screens that never
scroll. That system is retired and its rules no longer apply. The `v0.24.0` and
`v0.25.0` tags still install it unchanged. [CHANGELOG.md](CHANGELOG.md) and
`docs/releases/` record its releases; `prototypes/` and `explorations/` keep its
design experiments.
