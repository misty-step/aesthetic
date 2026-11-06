# Misty Step brand lab

A small preview of the locked identity, deployed to https://misty-brand-lab.misty-step.workers.dev. It renders one page, the identity sheet, from `../demo/markup.mjs` against `@misty-step/brand` installed from `file:..`: both lockups, the mark and its files, the palette and type roles from `tokens.json`, every spine component and the social cards, in light and dark. `../demo/app.js` adds the theme toggle, the spine's behaviour and the page's copy buttons and toasts.

The lab chooses nothing. Until 0.3.0 it was a configurator with independently selectable marks, type, colour, layouts, heroes, motion and copy; the identity is locked, so those option modules, the Surfaces faces and the reference notes were removed and live in the repository's history.

## Run

```sh
npm install
npm run dev      # http://127.0.0.1:5173
npm run build    # type-check, then write dist/
npm run preview  # serve dist/
```

The lab shows what `identity/` holds. After a change to `../tokens.json` or `../src`, run `npm run identity` in `brand/` first.

Every file comes through the package's exports map: `src/main.ts` imports the stylesheets, `tokens.json`, the mark, the spine and each icon, mark and card by its public specifier, and `vite.config.ts` writes the package's `<html>` attributes and the pre-paint theme script from `@misty-step/brand/attrs`. `resolve.dedupe` lets `../demo/app.js` import the package by name from outside this root.

## Smoke gate

```sh
npm run build
npx playwright install --with-deps chromium
node scripts/smoke.mjs --out evidence
node scripts/smoke.mjs --url https://misty-brand-lab.misty-step.workers.dev --out evidence
```

Without `--url` it serves `dist/` itself. In light and dark at 390 and 1440 px it checks that the page loads with no error or failed request, carries `data-brand="misty-step"`, shows both lockups, every `tokens.json` colour and type role and the ranked rows, loads the three faces and every image, fits the viewport, takes its canvas from `tokens.json`, and that the toggle flips the theme. `--out` receives a full-page screenshot per state and `smoke.json`. Browsers never run on macOS here: run it on a Linux Boat worker.

## Deploy

This lab is never part of the repository's Pages deploy. Its own `wrangler.jsonc` targets only `misty-brand-lab` on workers.dev and serves `dist/` as static assets; `public/_headers` and `public/robots.txt` keep it out of search. Every push to master that touches `brand/` builds current master, runs the smoke gate and deploys (`.github/workflows/brand-lab-deploy.yml`).
