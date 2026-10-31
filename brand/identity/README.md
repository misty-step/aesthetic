# @misty-step/brand

The Misty Step identity that mistystep.io and stack.mistystep.io both use. It provides one stylesheet, the `<html>` attributes that stylesheet expects, a small runtime, the Mist sign, icons and social cards, and the spine's components in the studio face for inner pages.

Everything here is generated from the brand configurator's `Locked` preset, which Phaedrus locked on 29 October 2026:

- mark `r2-a-mist` (Mist sign)
- type `industrial-condensed`
- colour `mono`
- layout `editorial`
- hero `horizon`
- motion `r2-mist-ground` (Ground fog) at its default params

The preset's copy, `r2-cut`, does not ship here. Each site keeps its own words.

The spine's components come from the brand lab's Surfaces modules, in the studio face, which is the Locked preset. See [Spine components](#spine-components).

## Install

```json
"@misty-step/brand": "https://github.com/misty-step/aesthetic/releases/download/brand-v0.2.0/misty-step-brand-0.2.0.tgz"
```

npm and pnpm both install a release tarball. Every file is committed, so installing runs no build step. The package's source is `brand/` in [misty-step/aesthetic](https://github.com/misty-step/aesthetic/tree/master/brand).

## Exports

| Specifier | What it is |
|---|---|
| `@misty-step/brand/brand.css` | The whole look in one stylesheet: the OFL faces (`@font-face`, relative `url(./fonts/...)`), type and colour tokens for both themes, the configurator's base styles, and the editorial layout, horizon hero, Ground fog entrance and interaction, and Mist sign lockup CSS. The selectors match the configurator's, such as `html[data-layout="editorial"]` and `html[data-theme="dark"]`. |
| `@misty-step/brand/attrs` | `HTML_ATTRS`, the six `<html>` data attributes the stylesheet expects; `THEME_ATTR` (`'data-theme'`); and `twoLineLength(headline)`, the hero title's `--h2` value. |
| `@misty-step/brand/runtime` | `startBrand(options?) => { destroy() }`. See [Runtime](#runtime). |
| `@misty-step/brand/mark` | `MARK_16`, `MARK_32` and `MARK_FULL`: SVG strings in `currentColor`, one drawing per size. `lockup(name, opts?)`: the nav lockup. `FAVICON_SVG`: the 16 px drawing in light and dark, chosen by `prefers-color-scheme`. |
| `@misty-step/brand/spine.css` | The spine's components in the studio face: the face's own values for both themes, then links, buttons, fields, choices, settings rows, menus, dialogs, toasts, tabs, code, tables, status lines, empty and loading states and panels. Load it after brand.css. See [Spine components](#spine-components). |
| `@misty-step/brand/spine` | `wire()`, the components' behaviour; `openDialog`, `toast` and `setInvalid` for script; `icon` and `statusIcon`, the glyphs as SVG strings. See [Behaviour](#behaviour). |
| `@misty-step/brand/identity/icons/*` | `favicon.svg` (light and dark), `favicon-32.png`, `apple-touch-icon.png` (180 px), `icon-192.png`, `icon-512.png`. The PNGs are the light drawing; PNG cannot follow the system theme. |
| `@misty-step/brand/identity/og/*` | `studio.png` and `stack.png`: 1200 x 630 social cards with the lockup, the page's headline and a Ground fog still. |

## The html element

Spread `HTML_ATTRS` onto `<html>`:

```html
<html lang="en" data-type="industrial-condensed" data-color="mono" data-layout="editorial" data-hero="horizon" data-mark="r2-a-mist" data-motion="r2-mist-ground">
```

The runtime adds two attributes and keeps them current:

- `data-reduced-motion` (`1` or `0`), from `prefers-reduced-motion`.
- `data-paused` (`1` or `0`), from the pause control.

Until the runtime has run, brand.css follows `prefers-reduced-motion` directly: entrances are finished and nothing animates.

## Theme

The site owns `data-theme` (`light` or `dark`):

- Set it from the visitor's stored choice, or from the system setting.
- Without the attribute, brand.css follows `prefers-color-scheme`. A page can therefore leave it unset until the visitor chooses, and needs no inline script to avoid a flash of the wrong theme.
- The runtime watches `data-theme` and the system setting. It re-colours the Ground fog field in place, without a remount.
- `meta[name="theme-color"]` and the toggle's label belong to the site.

## Markup

For the home pages, the contract is the configurator renderer's markup: the "Markup the renderer emits" section of [configurator/README.md](https://github.com/misty-step/aesthetic/blob/master/brand/configurator/README.md), plus the additions listed there. This is the skeleton with the horizon hero:

```html
<body id="top">
  <div class="bg" data-motion-root aria-hidden="true"></div>
  <a class="skip" href="#main">Skip to content</a>
  <header class="nav">
    <a class="brand" href="/" aria-label="Misty Step"><!-- lockup('MISTY STEP') --></a>
    <nav class="nav-links" aria-label="Primary"><a class="link" href="#process">…</a></nav>
    <div class="nav-actions"><button class="theme-toggle" aria-label="Switch to dark theme"><svg …></svg></button><a class="btn btn-primary btn-sm" href="…">…</a></div>
  </header>
  <main id="main" tabindex="-1">
    <section class="hero" data-hero-root>
      <div class="hero-motion-host" aria-hidden="true"></div>
      <div class="hz-copy">
        <h1 class="hero-title" data-enter style="--h2:22">…</h1>
        <div class="hz-row">
          <p class="hero-sub" data-enter>…</p>
          <div class="actions" data-enter><a class="btn btn-primary" href="…">…</a><a class="btn btn-quiet" href="…">…</a></div>
        </div>
      </div>
      <p class="hero-proof" data-enter>…</p>
    </section>
    <nav class="toc" aria-label="Contents">…</nav>
    <section class="s s-steps" id="process">…</section>
  </main>
  <footer class="foot"><p class="foot-line">…</p><nav class="foot-links" aria-label="Footer">…</nav></footer>
  <button class="motion-toggle" aria-pressed="false">Pause motion</button>
</body>
```

- **`--h2`.** Set `--h2` to `twoLineLength(headline)`. It sizes the headline so that it always breaks into at most two lines.
- **Entrance order.** brand.css sets `--enter-i` on `.hero-title` (0), `.hero-sub` (1), `.actions` (2) and `.hero-proof` (3). An inline value wins.
- **Strict CSP.** Under `style-src` without `'unsafe-inline'`, the browser refuses style attributes. Put `--h2` and the evidence bars' `--v` in your own stylesheet, for example `.hero-title{--h2:22}` and `.bar:nth-child(2) .bar-fill{--v:5/6}`.
- **Motion host.** Render `.hero-motion-host` yourself, so the server HTML is final. If it is missing, the runtime prepends one and removes it again on `destroy()`.
- **Toc.** `.toc` is hidden in the editorial layout. Emit it or leave it out.
- **Other pages.** Use the tokens and the editorial section primitives where they fit: `.s`, `.s-head`, `.s-title`, `.s-intro`, `.s-items`, `.item`, `.btn`, `.btn-primary`, `.btn-quiet`, `a.link`, `pre.code` and `.foot`. For forms, dialogs, menus, tabs, tables and the rest, use the [spine components](#spine-components).
- **Reference.** [demo/markup.mjs](https://github.com/misty-step/aesthetic/blob/master/brand/demo/markup.mjs) writes both home pages against this package alone. Its renders match the configurator's.

## Spine components

Every Misty Step surface shares one spine, and each product keeps its own face ([issue #36](https://github.com/misty-step/aesthetic/issues/36)). This package ships the spine in the studio face, the Locked preset: the components, anatomy and behaviour of the brand lab's [Surfaces page](https://misty-brand-lab.misty-step.workers.dev/surfaces), generated from its source. Use them on inner pages: forms, settings, dialogs, menus, toasts, tabs, code, tables and status lines.

```js
import '@misty-step/brand/brand.css';
import '@misty-step/brand/spine.css'; // after brand.css
import { wire } from '@misty-step/brand/spine';

wire(); // once, in the browser
```

```html
<body id="top" data-face="studio">
```

- **The face root.** `data-face="studio"` marks the element whose descendants use the components: `<body>`, or a container such as `<main>`. Never put it on `<html>`: the face root sets its own font size, which on the root element would rescale every `rem` in brand.css. Outside a face root, spine.css changes nothing but its own `sp-` classes, so a site can load it on every page, home pages included.
- **What the root sets.** The face's own values for both themes: corner radii, rule widths, the control height, the strong weight, feedback timing and the ok, warn and error inks. It also sets the ground and the body type, the selection colour, a `--focus` ring on every focusable element inside it, the strong weight on `strong` and `b`, and instant motion under `prefers-reduced-motion`.
- **Theme.** The values follow brand.css's theme rules: `data-theme` on `<html>`, else `prefers-color-scheme`.
- **Motion.** Feedback motion resolves once. It still plays while the runtime's pause control holds the Ground fog (`data-paused="1"`), so a dialog, menu or toast never stays hidden.
- **Layout stays the page's.** The spine styles components, never the layout around them: give a form its own gap between fields, and use brand.css's `.actions` for a row of buttons. In an editorial `.s` section every direct child takes a top margin, so group a tablist with its panels in one element, and keep a dialog, a menu and the toast tray outside the section, for example at the end of `<body>`.
- **Strict CSP.** spine.js needs no inline script, makes no requests and uses no eval. It writes one inline style, an open menu's position, through CSSOM, which CSP allows.
- **Reference.** [demo/spine.mjs](https://github.com/misty-step/aesthetic/blob/master/brand/demo/spine.mjs) and [demo/spine-app.js](https://github.com/misty-step/aesthetic/blob/master/brand/demo/spine-app.js) build an inner page from these exports alone: a form, a dialog, a menu, tabs, a table, a settings row and toasts.

### Behaviour

`wire()` installs every component's behaviour once, as listeners on the document, so markup rendered later, after client-side navigation too, needs nothing more. Calling it again does nothing. In Next.js, call it in the client component that starts the runtime; in Astro, in the page's script.

| Export | What it does |
|---|---|
| `wire()` | Dialog openers and closers, menus, tabs, settings rows and toast dismissal, as each component below describes. |
| `openDialog(dialog, invoker)` | Opens a dialog from script, as `data-sp-dialog` does from markup. |
| `toast(tray, message, status?)` | Appends a toast with `role="status"` to a `.sp-toasts` tray and returns it. It stays until dismissed; a fifth pushes the oldest out. |
| `setInvalid(input, message)` | Writes the message into the input's `#<id>-error` note, sets `aria-invalid` and adds the note to `aria-describedby`; `null` clears them. It throws when the note is missing. |
| `icon(name, cls?)`, `statusIcon(status)` | The glyphs as SVG strings, safe to call on the server. `IconName` lists the glyphs; `statusIcon` draws `ok`, `warn` or `err` in its status ink, and the words beside it stay ink. |

### Markup

A link navigates and a button acts:

```html
<a class="sp-link" href="/guide/">Read the guide</a>
<button class="sp-button" type="submit">Send request</button>
<button class="sp-button sp-quiet" type="button">Start over</button>
<button class="sp-button sp-quiet sp-icon-only" type="button" aria-label="Copy"><!-- icon('copy') --></button>
```

A field holds its label, the control, a hint and the note `setInvalid` fills. A `<textarea>` takes the same `sp-input` class.

```html
<div class="sp-field">
  <label class="sp-label" for="email">Your email</label>
  <input class="sp-input" id="email" name="email" type="email" autocomplete="email" aria-describedby="email-hint">
  <p class="sp-hint" id="email-hint">We confirm the time by email.</p>
  <p class="sp-field-note" id="email-error" hidden></p>
</div>
```

Each choice is a mark beside its words, in one control row:

```html
<fieldset class="sp-choices">
  <legend>Preferred time</legend>
  <label class="sp-choice"><input class="sp-radio" type="radio" name="time" value="morning">Morning</label>
  <label class="sp-choice"><input class="sp-radio" type="radio" name="time" value="afternoon" checked>Afternoon</label>
</fieldset>
<label class="sp-choice"><input class="sp-check" type="checkbox" name="copy">Email me a copy</label>
<label class="sp-choice"><input class="sp-switch" type="checkbox" role="switch">Auto-deploy</label>
```

A settings row folds its chooser open. Choosing writes the item's `data-value`, or its text, into the row's value and folds the row; Escape folds it and returns focus to the row.

```html
<div class="sp-settings">
  <button class="sp-setting" type="button" aria-expanded="false" aria-controls="theme-chooser">Theme <span class="sp-setting-value">Light</span></button>
  <div class="sp-chooser" id="theme-chooser"><div><div class="sp-menu" role="menu" aria-label="Theme">
    <button class="sp-menu-item" type="button" role="menuitemradio" aria-checked="true">Light</button>
    <button class="sp-menu-item" type="button" role="menuitemradio" aria-checked="false">Dark</button>
  </div></div></div>
</div>
```

A menu is a native popover. It opens beside its invoker with the checked or first item focused, takes ArrowUp, ArrowDown, Home and End, and closes on Escape or a choice, returning focus to the invoker.

```html
<button class="sp-button sp-quiet" type="button" popovertarget="share" aria-haspopup="menu" aria-expanded="false">Share</button>
<div class="sp-pop" id="share" popover>
  <div class="sp-menu" role="menu" aria-label="Share">
    <button class="sp-menu-item" type="button" role="menuitem">Copy a link to this section</button>
    <hr class="sp-menu-sep" role="separator">
    <button class="sp-menu-item" type="button" role="menuitem">Copy a link to this page</button>
  </div>
</div>
```

A dialog is a native `<dialog>`, opened as a modal. `data-sp-dialog` names it by selector. `data-sp-close` closes it, and its value becomes `dialog.returnValue`, which the dialog's `close` event can read; Escape closes it with an empty value. Tab stays inside, and focus returns to the opener however it closes. A `<button class="sp-close" type="button" data-sp-close aria-label="Close">` holding `icon('x')`, placed as the dialog's direct child, sits in its corner.

```html
<button class="sp-button sp-quiet" type="button" data-sp-dialog="#start-over">Start over</button>
<dialog class="sp-dialog" id="start-over" aria-labelledby="start-over-title">
  <h2 class="sp-dialog-title" id="start-over-title">Start over?</h2>
  <div class="sp-dialog-body"><p>This clears the form.</p></div>
  <div class="sp-dialog-actions">
    <button class="sp-button sp-quiet" type="button" data-sp-close>Keep editing</button>
    <button class="sp-button" type="button" data-sp-close="clear">Clear the form</button>
  </div>
</dialog>
```

A toast is news at the edge that stays until it is dismissed. Render the tray once, then call `toast`:

```html
<div class="sp-toasts" data-tray></div>
```

```js
toast(document.querySelector('[data-tray]'), 'Copied the link.', 'ok');
```

Tabs are an ARIA tablist. `wire()` answers every `[role="tab"]` on the document, so a page that keeps its own tab script must not run both over the same tabs. Each change dispatches a bubbling `sp-tab` event from the tab.

```html
<div class="sp-tabs" role="tablist" aria-label="Choose your harness">
  <button class="sp-tab" type="button" role="tab" id="tab-omp" aria-controls="panel-omp" aria-selected="true" tabindex="0">OMP</button>
  <button class="sp-tab" type="button" role="tab" id="tab-pi" aria-controls="panel-pi" aria-selected="false" tabindex="-1">pi</button>
</div>
<div class="sp-tabpanel" role="tabpanel" id="panel-omp" aria-labelledby="tab-omp"><pre class="sp-code" tabindex="0"><code>…</code></pre></div>
<div class="sp-tabpanel" role="tabpanel" id="panel-pi" aria-labelledby="tab-pi" hidden>…</div>
```

Code, a table in its plate, and a status line:

```html
<pre class="sp-code" tabindex="0"><code>npm ci</code></pre>
<p>Run it in <code class="sp-code-inline">brand/</code>.</p>

<figure class="sp-plate">
  <table class="sp-table">
    <caption>Tasks passed, one run per task</caption>
    <thead><tr><th scope="col">Arm</th><th scope="col" class="num">Passed</th><th scope="col" class="num">Tasks</th></tr></thead>
    <tbody><tr><th scope="row">…</th><td class="num">…</td><td class="num">…</td></tr></tbody>
  </table>
  <figcaption class="sp-hint">…</figcaption>
</figure>

<p class="sp-status"><!-- statusIcon('ok') --><span>Saved</span></p>
```

Waiting, absence and panels:

```html
<p class="sp-skeleton">Loading title</p>
<div class="sp-empty">
  <p class="sp-empty-title">No projects yet.</p>
  <p class="sp-empty-note">The first one you archive lands here.</p>
  <button class="sp-button sp-quiet" type="button">New project</button>
</div>
<section class="sp-panel sp-panel-feature">…</section>
<aside class="sp-panel sp-panel-aside">…</aside>
```

- **Skeleton.** A still wash, never a shimmer. Pair it with a `role="status"` line that says what is loading.
- **Panels.** `.sp-panel-feature` frames a page's primary task; in the studio face it carries a heavy ink rule on top. `.sp-panel-aside` supports it.
- **Helpers.** `.sp-sr` hides text from sight and keeps it for screen readers. `.sp-skip` is a skip link.

## Runtime

```js
import { startBrand } from '@misty-step/brand/runtime';
const brand = startBrand(); // after hydration
brand.destroy();            // before the page goes away
```

`startBrand` takes these options:

- `root` (`Document`): the document to manage. Default: the global document.
- `motion` (`boolean`): `false` mounts no field. Default: `true`.
- `params` (`Partial<GroundFogParams>`): overrides for the field's Locked values (screen, cell, inks, density, height, depth, wind, turbulence, travel, step). The field clamps each one to its range.

It owns this behaviour:

- **Entrances.** Each `[data-enter]` element gets `.is-in` as it scrolls into view. Under reduced motion, or while paused, all of them get it at once.
- **Ground fog field.** After first paint, it loads `field.js` and mounts the field into the hero's `.hero-motion-host`, but only while the hero is visible. The field stops offscreen and in hidden tabs.
- **Still frame.** Under reduced motion or Save-Data, the field draws one finished still frame and stops. Without the WebGL API, the runtime never loads the field. If a browser has the API but cannot create a context (a blocklisted GPU), the field draws nothing. In each case nothing loops and the pause control stays hidden.
- **Pause control.** The `.motion-toggle` sets `aria-pressed`, its label and `data-paused`, and remembers the choice in localStorage (`brand-motion-paused`). It is hidden while there is nothing to pause. At 700 px and narrower it moves into a `.hero-motion-controls` row inside the hero, so it never covers copy. Above 700 px, and on `destroy()`, it returns to where the page rendered it.
- **Theme.** A change to `data-theme` re-colours the field in place.
- **Mark.** The Mist sign plays its entrance on `.brand-mark` once per page load. It never plays under reduced motion.
- **`destroy()`.** It stops the field, releases its GL context and canvas, and disconnects every observer and listener. Calling `startBrand()` again also destroys the previous handle, which makes the runtime safe after client-side navigation.

The runtime uses no eval, needs no inline script and makes no external requests. It writes inline styles only on the field's own elements (its wrapper and canvas), through CSSOM, which CSP allows.

### Next.js App Router

```tsx
// app/layout.tsx
import '@misty-step/brand/brand.css';
import { HTML_ATTRS } from '@misty-step/brand/attrs';
import { Brand } from './brand';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" {...HTML_ATTRS} suppressHydrationWarning>
      <body id="top">
        {children}
        <button className="motion-toggle" aria-pressed="false">Pause motion</button>
        <Brand />
      </body>
    </html>
  );
}
```

```tsx
// app/brand.tsx
'use client';
import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { startBrand } from '@misty-step/brand/runtime';

export function Brand() {
  const pathname = usePathname();
  useEffect(() => {
    const brand = startBrand();
    return () => brand.destroy();
  }, [pathname]);
  return null;
}
```

- Keep the pause button in the root layout, so it outlives navigation.
- `suppressHydrationWarning` covers the attributes that a theme script and the runtime add to `<html>`.

### Astro

```astro
---
import '@misty-step/brand/brand.css';
import { HTML_ATTRS } from '@misty-step/brand/attrs';
import { lockup } from '@misty-step/brand/mark';
---
<html lang="en" {...HTML_ATTRS}>
  <body id="top">
    <header class="nav"><a class="brand" href="/" aria-label="mistystack" set:html={lockup('MISTYSTACK')} /></header>
    <slot />
    <button class="motion-toggle" aria-pressed="false">Pause motion</button>
    <script>
      import { startBrand } from '@misty-step/brand/runtime';
      startBrand();
    </script>
  </body>
</html>
```

With view transitions, start and destroy the runtime on Astro's events:

```js
let brand;
document.addEventListener('astro:page-load', () => { brand = startBrand(); });
document.addEventListener('astro:before-swap', () => brand?.destroy());
```

## Icons and social cards

Import the files through the package exports, or copy them into your public directory at build:

```html
<link rel="icon" href="/favicon.svg" type="image/svg+xml">
<link rel="icon" href="/favicon-32.png" sizes="32x32" type="image/png">
<link rel="apple-touch-icon" href="/apple-touch-icon.png">
<meta property="og:image" content="https://mistystep.io/og/studio.png">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
```

`icon-192.png` and `icon-512.png` are for a web app manifest.

## Weight

- **CSS.** brand.css and spine.css together stay well under the 40 KB gzip budget.
- **Runtime.** runtime.js is the only script on the first load.
- **Field.** field.js holds the field: about 11 KB gzip, loaded after first paint.
- **Spine.** spine.js loads only where a page imports it: about 4 KB gzip, the icon licences included.
- **Fonts.** The fonts are unhinted Latin subsets. Each loads only when a page uses it; Kode Mono, for example, loads only for code.

## Licences

Code is MIT: `LICENSE` sits at the repository root, and npm includes it in the package. The fonts are SIL Open Font License 1.1, with their licence texts beside them:

- `fonts/OFL-SofiaSans.txt`: Sofia Sans and Sofia Sans Extra Condensed (Lettersoup: Botio Nikoltchev, Ani Petrova)
- `fonts/OFL-KodeMono.txt`: Kode Mono (Isa Ozler)

Keep each licence file beside its font if you copy the fonts.

The spine's glyphs are Lucide icons (ISC), several of them derived from Feather (MIT). Both notices close `spine.js`.

## Regenerate

The configurator's option modules and its Surfaces modules (`configurator/src/surfaces/`) are the only source. Nothing in this directory is edited by hand, except this README. From the repository root:

```sh
npm ci
npm run identity        # regenerate identity/ from the Locked preset in configurator/src/presets.ts
npm run identity:check  # change nothing; fail when a committed file is stale, missing or extra (CI runs this)
npm run identity:og     # Linux worker only: render og/*.png in headless Chromium (needs configurator/ dependencies)
```

| File | Generated from |
|---|---|
| `brand.css` | The type option (faces, tokens), the colour option (both themes), `configurator/src/preview/base.css`, and the layout, hero, motion (entrance and interaction) and mark CSS |
| `runtime.js` | `scripts/identity/runtime.ts`, the configurator's `MotionLifecycle` (`configurator/src/preview/motion.ts`) and the mark's `animateIn` |
| `field.js` | The motion option and its `_r2-mist` engine |
| `attrs.js` | The preset's picks, and `twoLineLength` from `configurator/options/hero/shared.ts` |
| `mark.js` | The mark's drawings at 16, 32 and 160 px, its drawn capitals for both names, and the themed favicon |
| `icons/*.png` | The mark, rasterised by @resvg/resvg-js |
| `og/*.png` | The card template in `scripts/identity/lib.mjs`, rendered in Chromium on a Linux worker |
| `spine.css` | The studio face's values in `configurator/src/surfaces/faces.ts`, read from the Locked layout and motion by `locked.ts`, then `configurator/src/surfaces/components.css` |
| `spine.js` | `scripts/identity/spine.ts`: `configurator/src/surfaces/behaviour.ts` and `icons.ts` |
| `spine.d.ts` | The glyph names and statuses in `icons.ts`; `scripts/identity/exports.test-d.ts` holds its types equal to the sources |
| `manifest.json` | Source hashes of the rendered images, so the check catches a stale PNG without re-rendering it |

To change the identity:

1. Change the preset or the option module.
2. Run `npm run identity` and, for the cards, `npm run identity:og` on a worker.
3. Commit the result and tag a new version.
