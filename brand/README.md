# Misty Step brand

`brand/` holds `@misty-step/brand`, the identity package for Misty Step's own surfaces, and the brand lab that previews it.

Phaedrus locked the identity on 6 November 2026 (MIS-866; shipped in MIS-931): the step mark, two parallelograms at 60° in Indigo and Violet; Hedvig Letters Serif, Uncut Sans and Commit Mono; a warm canvas, near-black ink and one Indigo accent; flat hairlines and light and dark themes. The repository's root `tokens.json` is the only source of its values and DESIGN.md describes it. The identity serves the studio (Misty Step) and its open method (mistystack); it is not a mandate for the products.

## The identity package

`brand/` is the package `@misty-step/brand`. Each `brand-v*` tag publishes a GitHub release whose tarball the sites install (`.github/workflows/brand-release.yml`):

```json
"@misty-step/brand": "https://github.com/misty-step/aesthetic/releases/download/brand-v0.3.0/misty-step-brand-0.3.0.tgz"
```

`identity/` is what ships: the tokens, the stylesheet, the html attributes, the theme runtime, the mark and lockups, the fonts, icons and social cards, and the spine's components. A script generates every file there from `tokens.json` and the hand-written sources in `src/`; nothing in it is copied by hand. [identity/README.md](identity/README.md) covers install, the exports, tokens, theme, lockups, the spine, Next.js and Astro, the migration from 0.2.0, licences and regeneration.

```sh
npm ci
npm run identity        # regenerate identity/ from ../tokens.json and src/, PNGs included (resvg, no browser)
npm run identity:check  # change nothing; fail when identity/ is stale, missing or extra (CI and release run it)
npx tsc -p scripts/identity  # the sources and the published declarations type-check and agree
npm run demo            # resolve every export as a consumer does and write demo/dist
```

| Path | What it is |
|---|---|
| `src/` | Hand-written sources: `brand.css` (defaults for plain elements), `spine.css` (components), `attrs.ts`, `runtime.ts`, `spine.ts` with `behaviour.ts` and `icons.ts`, and `fonts/`, the upstream woff2 files and their OFL licences, pinned by hash. |
| `scripts/identity/` | The generator: `lib.mjs` (tokens to CSS, bundles, declarations, the owned file list and the stylesheet rules), `mark.mjs` (the mark's geometry), `og.mjs` (the social card template), `generate.mjs` (write or check) and `exports.test-d.ts`. |
| `identity/` | The published package files. |
| `demo/` | The package's proof fixture, outside the published files. `npm run demo` checks that every export resolves through the exports map to a file npm packs, then writes the identity sheet and both home pages against the package alone. On a Linux worker, `demo/proof.mjs` drives them in Chromium. |
| `configurator/` | The brand lab, a Vite page that renders the identity sheet against the installed package. See [configurator/README.md](configurator/README.md). |

## Release

1. Bump `version` in `brand/package.json` and its lockfile, run `npm run identity` so the generated headers carry it, prove the running consumer, and merge the PR. A breaking change before 1.0 bumps the minor version, as 0.3.0 did.
2. Run the manual `ci` and `brand` release gates and the release's critical-correctness/security assessment. Push `brand-v<version>` on the merge commit. The release workflow refuses a tag that disagrees with `package.json`, stale DESIGN.md frontmatter, or stale `identity/`, then publishes the `npm pack` tarball and checks that the published copy downloads byte for byte.
3. Move the sites to the new tarball URL.

## The brand lab

```sh
cd configurator
npm install
npm run dev
```

The lab installs this package from `file:..` and shows the locked identity: both lockups, the mark and its files, the palette, the type roles, every component in both themes and the social cards. Its build and smoke gate are in [configurator/README.md](configurator/README.md); `.github/workflows/brand-lab-deploy.yml` deploys it to https://misty-brand-lab.misty-step.workers.dev.

`brand/` lives in `misty-step/aesthetic`, the home for Misty Step brand development since 30 October 2026. It moved here as one commit from `misty-step/brand`, whose history stays readable in that archived repository. The option modules that chose the 29 October preset, the Surfaces faces and the reference notes live in this repository's history before 0.3.0.

## Licences

Code is MIT ([LICENSE](LICENSE)). Every font is SIL Open Font License 1.1, unmodified from upstream, and its licence file sits beside it. The spine's glyphs are Lucide icons (ISC), several derived from Feather (MIT); both notices sit in `src/icons.ts` and close `identity/spine.js`.
