# aesthetic — agent contract

One CSS file is the product. `aesthetic.css` ships to production
consumers who pin git tags; everything else in this repo exists to
develop, prove, and publish that file.

## The law

The canonical statement lives in the header of `aesthetic.css` and in
`tokens.json` (`law`). Never violate it in any surface this repo
renders: one font size (13px chrome register is the one exception),
nine registers from three inks × three weights, exactly one accent
instance per view, viewport screens that never scroll, motion as
feedback only (resolves once, persists), buttons are not links.

## Repo shape

- `aesthetic.css` + `tokens.json` — the package (npm `files` allowlist).
- `DESIGN.md` — the identity in prose, for agents generating anything
  visual (views, components, images). Read it before visual work;
  `docs/IMAGES.md` is the extended image-language canon.
- `site/` — the public site (specimen landing + primitives catalog),
  built only with the system itself: zero build step, zero framework.
  It is the ONLY consumer that rides HEAD; `site/aesthetic.css` is a
  symlink to the root file. View-source is documentation — keep markup
  canonical.
- `site/recipes.js` — canonical behavior glue (mode toggle, nav
  indicator, send moment). The seed of backlog 005.
- `prototypes/` — design experiments (LAB convention). Local only:
  committed for history, NEVER deployed; the Pages workflow stages
  `site/` exclusively. Prototype files never graduate by copy — the
  locked direction gets rebuilt properly in `site/`.
- `backlog.d/` — tickets; see `004`–`007` for current arcs.

## Gates

Run before any commit that touches CSS/HTML/JS:

```sh
npx prettier --check .
npx stylelint aesthetic.css site/site.css
```

CI (`.github/workflows/ci.yml`) enforces both on every push. Do not
loosen `.stylelintrc.json` to get green; the disabled rules there are
deliberate house-style calibrations, documented by their grouping.

## Release flow

1. Land changes on master (site rides HEAD, so the deploy follows).
2. Version: semver in `package.json` + the `aesthetic.css` header +
   README/site pin references (`#vX.Y.Z`).
3. Tag `vX.Y.Z`, push with tags. Consumers (vanity site, misty-step)
   pin tags and upgrade deliberately — never bump them implicitly.
4. Pages deploys `site/` automatically on push to master
   (`.github/workflows/pages.yml`).

## Verification

The site is the proof surface: serve the repo root
(`python3 -m http.server`) and walk `site/` in a browser — both modes,
the send moment, the nav indicator, a catalog detail route. Tests pass
≠ verified; render it.
