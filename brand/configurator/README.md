# Misty Step brand configurator

The working brand lab for Misty Step, in `brand/configurator/` of `misty-step/aesthetic`. It renders the real studio and stack home-page content through seven independently selectable layers. The aesthetic package at the repository root is a separate system; its one-size/no-scroll law does not apply to this lab.

## Run

```sh
cd configurator
npm install
npm run dev
# http://127.0.0.1:5173
npm run build
```

Browser verification runs only on Linux Boat workers, one gate at a time. No browser of any kind may run on this Mac, including bundled headless shells; the smoke script rejects macOS before launching anything. Builders use builds/type checks/source review and remote render jobs. On a worker, `npm run smoke` serves the production build with Playwright's bundled headless shell, or `--url` targets a deployed build. The gate covers every option against the plain baseline on both pages, 390/1440, light/dark; motion options also run reduced and paused states. Every motion must show its h1, subtitle and primary action at opacity greater than 0.9, fully in the viewport, within 1.5 seconds and after settling. Entrance targets must reach `.is-in`. Console errors, overflow, missing/hidden hero content, offscreen drawing, or reduced/paused drawing fail the run. Evidence goes to `evidence/smoke.json` or `--out`.

### Off-Mac WebGL proof

From a clean Ubuntu box, in the `configurator/` directory:

```sh
npm ci
npx playwright install --with-deps chromium
node scripts/smoke.mjs --url https://misty-brand-lab.misty-step.workers.dev --webgl --out shots
```

`--url` selects the deployed origin (default: local production preview). `--webgl` adds SwiftShader flags only to Playwright's bundled headless shell. All browser modes are rejected on macOS; run them on a Linux Boat worker. `--out` writes `smoke.json` plus a 1440px and a 390px screenshot per motion option and declared preset, after about 2.5 seconds. WebGL-declared options must create a canvas and a successful GL context, paint a frame, stop offscreen, and render a non-running reduced/paused still. Intentional static and Canvas2D options are reported as such, not given fabricated WebGL passes. The result records renderer/context/draw counts and hero-readiness measurements per state; it is a software-renderer proof, not a physical-device GPU trace.

For rapid review deployments, run `node scripts/smoke.mjs --webgl --quick` on the Linux worker first. This tests every layout on both pages at 390/1440 in light mode, every motion's hero-visibility and lifecycle gates (including phone reduced/paused), the shell, and all presets on both pages and sizes. It omits the 2.5-second capture delay unless `--out` is requested. Deploy after that subset is green, then run the full `--webgl --out` matrix immediately after deployment. The full result is reported separately; a quick pass is not a full-matrix pass.

## Add an option

Create `options/<layer>/<id>/index.ts`, default-exporting the corresponding option type from `src/contract.ts`. The id must equal its directory. The Vite registry discovers it lazily with `import.meta.glob('/options/*/*/index.ts')`. Keep assets and font licence files beside the option. Helpers may live inside your layer directory without an `index.ts` at that depth. Do not modify another layer or the renderer. Branch from `origin/feat/lab-007`, use your own worktree, push your branch, and report `ready: <branch> <sha> <ids>` to LabCore.

All options consume tokens, not another option's choices. CSS scopes under `html[data-<layer>="<id>"]`. Layout and hero never set font families or literal colours. Layout defines static geometry and colours; motion owns transition lists and press transforms. Every option names references and explains what it learns. Baselines are intentionally plain controls, not directions.

Layout-to-hero alignment uses six layout-owned root tokens: `--page-max` (content-column width), `--gutter` (minimum side margin), `--edge` (`max(var(--gutter), calc((100% - var(--page-max)) / 2))`, optionally including a panel inset), `--radius` (corner radius), `--rule` (border width, not shorthand) and `--nav-h` (nav height, with a phone override). All are lengths. Layouts leave main full-width and unpadded; heroes apply `padding-inline: var(--edge)` themselves. A type option may supply an optional measured, dimensionless `--display-advance` (average display-character advance in em at its chosen settings) to fit two-line headlines. Its default is `.5`, and the renderer clears it on type swaps. Keep canonical types unchanged by declaring that option as `TypeOption & { tokens: TypeOption['tokens'] & { '--display-advance'?: string } }`.

Copy imports `src/content/facts.ts`. It is the single home for the offer, five project descriptions and hosts, current native install commands, current core, and reported historical trial. Facts were read from the private studio source and public stack master on 2026-10-29. The trial is the draft PR #607 record, not a current-adapter evaluation: current 4/6, kernel 5/6, no injected guidance 2/6, with limits retained. Commands are displayed verbatim, not run into a live profile. Grok Bot has a setup brief, not an invented install command.

Reference notes live in `references/<site>.md`, indexed in [references/README.md](references/README.md). Record dated source URLs, concrete per-layer lessons and caveats. Commit text and links only: no third-party screenshots, logos or proprietary font files. Reference branches may change only `configurator/references/` and report their ready SHA to LabCore.

## Runtime and markup

`preview.html` takes the same encoded JSON hash as the shell. Page, theme, reduced motion, pause, full-preview mode, every selected option and layer locks travel in the URL. Section hash links scroll without replacing that configuration. The shell's shortlist and notes stay in localStorage. Alt+R shuffles unlocked layers, Alt+S saves, Alt+L copies the share link. Native select controls support keyboard navigation; dialogs and full-preview mode close with Escape. The compact rail keeps every layer on one line; select its name to expand the summary and references. At a 1440px shell the desktop preview occupies more than 65% of the viewport, beside a 240px-wide phone frame. Full preview hides the controls. Frame sizing responds only to user/layout events, with no ResizeObserver or animation loop. Page and option changes start at scroll position zero.

The renderer emits the contract below. Additions: stable tab/panel ids and ARIA relationships; `id="top"` on body; `tabindex="-1"` on main so the skip link can move focus; an explicit brand-link accessible name; `data-paused` on html; external links open a new tab with `rel="noopener noreferrer"`; full-hero backgrounds use an aria-hidden `.hero-motion-host` (the motion lifecycle reuses one the page already rendered as a direct child of the hero, and removes only hosts it created when it is destroyed; the identity runtime in `scripts/identity/` depends on both); panel heroes without a motion slot receive `.hero-visual[data-motion-slot]`. The optional mark extension `css?: string` is restricted to `.brand`, `.brand-mark`, `.brand-name`, scoped under its data-mark id; authors may use `MarkOption & { css: string }`. Mark colours may use `currentColor`, `--ink*`, `--accent`, and the approved text-safe `--accent-2` highlight token. The renderer resolves these tokens into the 16px themed SVG favicon.

The renderer also emits `<nav class="toc" aria-label="Contents"><ol><li><a class="link" href="#section-id">Section title</a></li>…</ol></nav>` immediately after the hero. It is hidden by default; book/ledger layouts may opt in. Shared navigation, footer, diagram and contents links have 44px minimum targets.

Type faces use local `@font-face` with swap and the declared weight/style/range. Color and type tokens are injected into the root. Theme-only updates call the existing motion handle's `update()`; option/page swaps destroy it. Backgrounds lazy-load after semantic first paint, mount at the hero's requested host, stop offscreen/hidden/paused, and receive `dprCap: 1.5`. Reduced motion shows the final still state. One entrance observer adds `.is-in` to `[data-enter]`. The motion toggle pauses all CSS animation and the background.

Approved motion contract extension: `renderer?: 'webgl'|'canvas2d'|'none'`. If omitted it derives from `background` presence (`webgl` when present, `none` otherwise). A Canvas2D signature must declare it explicitly. The off-Mac proof reads this metadata, never option-id exemptions.

Pause is shown only for ambient WebGL-background options, not static/Canvas2D-only options or reduced motion. At phone widths the renderer places it in a normal-flow `.hero-motion-controls` row inside the hero, so it cannot cover copy, code or actions; desktop keeps the separate control. Theme controls use an inline SVG rather than a font glyph. Section/item/node headings keep hyphenated compounds in `.nowrap` spans. Code blocks preserve command lines and scroll internally instead of wrapping at hyphens. Favicon SVGs carry resolved light/dark variants selected by embedded `prefers-color-scheme`, independently of the page toggle, to stay visible on the browser tab.

The shell is the single state owner. Programmatic iframe updates are one-way; previews report only actual theme/pause control deltas, so the two frames cannot echo stale configurations back and forth. Spec export includes layout geometry tokens resolved independently in the desktop and phone frames, as well as type/colour tokens, font licences and motion capability/budget.

With no hash the shell starts from the first house preset. Plain baseline remains a chip. The selected preset is highlighted and its chip says “modified” after a layer diverges; the preset anchor is stored in the hash. The eight directions and three previous-round presets are separate groups. At 1600px and above the rail widens to 260px; layer select accessible names always include the full option label.

On phones the motion control is an in-flow hero row. Heroes with empty explicit grid rows must place `.hero-motion-controls` in a row after the copy, and it must not stretch over the field.

Core-file excerpts wrap at spaces in every layout; install commands preserve preformatted lines and scroll internally. Formatted node links keep one `.link-text` label child so `.nowrap` compounds do not turn into separate flex columns.

## Motion tuner

A motion option may declare `params?: MotionParam[]` (`src/contract.ts`): `{ key, label, min, max, step, value, options? }`, where `value` is the option's default and `options` names each integer value of a choice. When the selected motion has params, the shell shows a Tune panel under the layer rail: a slider per number, a select per choice, and Reset. Overrides live in `LabState.tune[<motion id>][<key>]`, so they travel in the share link and in saved combinations, survive switching to another motion and back, and Reset clears them for the current motion; a value moved back to its default is dropped. `decode()` keeps only finite numbers under known motion ids. The preview hands the current motion's overrides to its background as `MotionCtx.tune`; a tune-only change calls the existing handle's `update()` without a remount, and the background clamps each value to its param's range. Spec export adds `motionParams`, the resolved values. The `r2-mist-*` options use it; their shared engine is described in `options/motion/_r2-mist/README.md`.

## Markup the renderer emits (layouts and heroes style exactly this)
```html
<html data-page data-theme data-reduced-motion data-mark data-type data-color data-layout data-hero data-motion data-copy>
<body>
  <div class="bg" data-motion-root aria-hidden="true"></div>
  <a class="skip" href="#main">Skip to content</a>
  <header class="nav">
    <a class="brand" href="#top"><span class="brand-mark">[mark svg]</span><span class="brand-name">[brand or custom wordmark]</span></a>
    <nav class="nav-links" aria-label="Primary"><a class="link">..</a>...</nav>
    <div class="nav-actions"><button class="theme-toggle" aria-label="..">..</button><a class="btn btn-primary btn-sm">[navCta]</a></div>
  </header>
  <main id="main">
    <section class="hero" data-hero-root>[hero option html]</section>
    <section class="s s-steps" id="..">
      <div class="s-head" data-enter><h2 class="s-title">..</h2><p class="s-intro">..</p></div>
      <ol class="s-items"><li class="item" data-enter><span class="item-label">..</span><h3 class="item-title">..</h3><p class="item-terms">..</p><p class="item-body">..</p></li>...</ol>
    </section>
    <section class="s s-work"> s-head; <div class="group"><h3 class="group-label">..</h3><ul class="s-items"><li class="item" data-enter><a class="item-link" href><span class="item-title">..</span><span class="item-body">..</span><span class="item-host">..</span></a></li></ul></div></section>
    <section class="s s-points"> s-head; <ul class="s-items"><li class="item" data-enter><h3 class="item-title"/><p class="item-body"/></li></ul></section>
    <section class="s s-diagram"> s-head; <ol class="diagram"><li class="node" data-node="core|misty|playbooks|skills|principles|oracle" data-enter><span class="node-count"/><h3 class="node-label"/><p class="node-body"/></li></ol></section>
    <section class="s s-install"> s-head; <div class="tabs" role="tablist"><button role="tab" class="tab" aria-selected/>..</div><div class="tabpanel" role="tabpanel"><pre class="code"><code>..</code></pre><button class="copy">Copy</button><p class="note"/></div></section>
    <section class="s s-evidence"> s-head; <div class="bars"><div class="bar" data-highlight><span class="bar-label"/><span class="bar-track"><span class="bar-fill" style="--v:5/6"/></span><span class="bar-value">5/6</span></div>..</div><ul class="limits"><li/></ul><a class="link" href>..</a></section>
    <section class="s s-code"> s-head; <figure class="codefig"><pre class="code"><code>..</code></pre><figcaption/></figure></section>
    <section class="s s-cta"> <h2 class="s-title"/><p class="s-intro"/><div class="actions"><a class="btn btn-primary"/><a class="btn btn-quiet"/></div></section>
  </main>
  <footer class="foot"><p class="foot-line"/><nav class="foot-links"><a class="link"/></nav></footer>
  <button class="motion-toggle" aria-pressed="false">Pause motion</button>
</body></html>
```
Buttons: `.btn`, `.btn-primary`, `.btn-quiet`, `.btn-sm`. Text links: `a.link`. Code: `pre.code > code`. The renderer adds `.is-in` to `[data-enter]` via IntersectionObserver (immediately when reduced motion). LabCore may add elements but never rename these; additions go in the README.

## Surfaces and the spine contract

[Issue #36](https://github.com/misty-step/aesthetic/issues/36): every Misty Step surface shares one spine, and each product keeps its own face. `/surfaces.html` (noindex, like `marks.html`) shows that decision on real pages so its details can be chosen. It has a theme switch and a Faces switch (Own faces, Locked everywhere), both in the URL: `/surfaces.html?theme=light|dark&faces=own|locked`.

- **Spine.** What every surface shares: the token contract, component anatomy and behaviour, accessibility floors, motion and voice. `src/surfaces/spine.ts` names every token the components read, with its meaning: the colour option's roles, the type option's tokens, and the face's own `--radius`, `--radius-2`, `--rule`, `--rule-2`, `--shadow-1`, `--shadow-2`, `--control-h`, `--dur-1` to `--dur-3`, `--ease`, `--ok`, `--warn` and `--err`. Optional `--face-*` tokens carry decoration only (a chrome rule style, the feature surface's band and fill, an aside fill, a printed button edge), each read with a neutral fallback.
- **Faces.** `src/surfaces/faces.ts` holds three faces as data, each naming its type option, its colour option and its spine values for both themes. `studio` is the Locked preset: its type and colour are the preset's picks, and `src/surfaces/locked.ts` reads its radius, rule, button height and feedback timing from the preset's layout and motion modules when it loads, so nothing is copied. `instrument` is the aesthetic package with Landmark's ember accent; `options/color/instrument` records every value it takes from the root `tokens.json` and `aesthetic.css` in `SOURCE`. `poppycock` follows Poppycock's DESIGN.md and `app/globals.css` at 904a8df; its dark theme is a proposal, and the page says so. The type options `instrument` and `poppycock` are built through `options/type/_build` and appear in the pickers as product faces.
- **Components.** `src/surfaces/components.css` is the one stylesheet for every face: link, primary and quiet buttons, text field with hint and validation, checkbox, radio and switch, settings rows with a chooser, dialog, menu, toast, tabs, code, table, status line, empty and loading states, panels and portraits. It reads only spine tokens and sets no literal colour, font family or font size. Behaviour in `src/surfaces/behaviour.ts` is ported from the root `recipes/` (dialog, pop, toast, settings) and this lab's tab keys.
- **Screens.** `/surface.html?screen=docs|changelog|lobby&face=studio|instrument|poppycock&theme=light|dark[&step=entrance|table]` renders one real screen at whatever width it is given; the Surfaces page frames each at 1440 (scaled) and 390. Docs is `skills/misty/SKILL.md` in stack.mistystep.io's docs chrome, Release notes is Landmark's changelog, and Lobby is Poppycock's entrance and waiting room. Content is verbatim from each source at the SHA recorded in `src/surfaces/content/`; players are neutral stand-ins, never Poppycock's characters.
- **Gate.** `node scripts/surfaces.mjs --static` runs anywhere: it fails when `tokens.json` or `aesthetic.css` drift from the instrument face's `SOURCE`, or when a Surfaces stylesheet reads a token that is not in the spine or sets a literal colour, font or size. Without `--static` it also runs the browser checks, on Linux only like smoke: every screen in both face modes and themes at 390 and 1440, and the page itself, with no horizontal overflow, no console, page, request or font errors, a visible focus ring on the first focusable control, and the colour guarantees on the painted tokens (status inks at 4.5:1 on `--bg` and `--bg-2`); then dialog, menu, tabs, toast, settings and validation in every face column, the lobby's create and leave paths, and reduced motion. `--out <dir>` writes `surfaces.json` and a screenshot per state.

## Preview deployment

This lab is never part of the repository's Pages deploy. Its separate `wrangler.jsonc` targets only `misty-brand-lab` on workers.dev and serves static assets. HTML and assets carry `X-Robots-Tag: noindex, nofollow`; a robots file also excludes crawling.

Pull requests and master pushes that touch `brand/` run `.github/workflows/brand.yml`: the configurator build and the quick WebGL smoke gate (`node scripts/smoke.mjs --webgl --quick`). Deployment is automatic: on every master push that touches `brand/`, `.github/workflows/brand-lab-deploy.yml` builds current master, runs the same gate, deploys only `misty-brand-lab` and checks that the live shell serves that build. A failed gate deploys nothing; a newer run replaces an older one.

The full matrix (`node scripts/smoke.mjs --url https://misty-brand-lab.misty-step.workers.dev --webgl --out evidence`) runs on a Linux Boat worker when a change needs it. It refuses macOS.
