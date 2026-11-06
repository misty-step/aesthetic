# @misty-step/brand

The Misty Step identity, locked on 6 November 2026 (MIS-866, shipped in MIS-931), for Misty Step's own surfaces: mistystep.io, stack.mistystep.io and the brand lab. It is not a mandate for the products, which keep their own faces.

One identity serves two names: **Misty Step**, the studio, and **mistystack**, its open method for coding agents. They share the step mark, the palette and the type; only the wordmark changes. The package ships the tokens, one stylesheet, the mark and both lockups, icons and social cards, a small theme runtime and the spine's components.

Every file here is generated from the repository's root `tokens.json`, the only value source, and the hand-written sources in `brand/src`. See [Regenerate](#regenerate).

## Install

```json
"@misty-step/brand": "https://github.com/misty-step/aesthetic/releases/download/brand-v0.3.0/misty-step-brand-0.3.0.tgz"
```

npm and pnpm both install a release tarball. Every file is committed, so installing runs no build step. 0.3.0 breaks 0.2.0 throughout; see [Migrating from 0.2.0](#migrating-from-020).

## Exports

| Specifier | What it is |
|---|---|
| `@misty-step/brand/brand.css` | The three faces (`@font-face`, relative `url(./fonts/...)`), every token as a custom property on `html[data-brand="misty-step"]` for both themes, zero-specificity defaults for plain elements, the lockup and the headline's full stop. |
| `@misty-step/brand/tokens.json` | A byte copy of the root `tokens.json`, for code that needs values outside CSS, such as a social card renderer. |
| `@misty-step/brand/attrs` | `HTML_ATTRS` (`{ 'data-brand': 'misty-step' }`), `THEME_ATTR` (`'data-theme'`), `THEME_STORAGE_ITEM` (`'misty-step-theme'`) and the `Theme` type. |
| `@misty-step/brand/runtime` | `startBrand({ root? }) => { destroy() }`: the stored theme and every theme toggle. See [Theme](#theme). |
| `@misty-step/brand/mark` | `MARK_SVG` (colour), `MONO_MARK_SVG` (`currentColor`), `FAVICON_SVG` and `lockup(name, opts?)`. See [Mark and lockups](#mark-and-lockups). |
| `@misty-step/brand/spine.css` | The spine's components. Load it after brand.css. See [Spine components](#spine-components). |
| `@misty-step/brand/spine` | `wire()`, `openDialog`, `toast`, `setInvalid`, `icon` and `statusIcon`. See [Behaviour](#behaviour). |
| `@misty-step/brand/identity/fonts/*` | The three faces as upstream woff2 files, each with its OFL licence. |
| `@misty-step/brand/identity/marks/*` | `mark.svg` (Indigo and Violet), `mark-ink.svg` and `mark-white.svg`. |
| `@misty-step/brand/identity/icons/*` | `favicon.svg`, `favicon-16.png`, `favicon-32.png`, and the app icons `app-180-*.png` and `app-1024-*.png` in four variants. See [Icons and social cards](#icons-and-social-cards). |
| `@misty-step/brand/identity/og/*` | `studio.png` and `stack.png`: 1200 x 630 social cards. |

attrs.js, mark.js and spine.js touch no DOM when imported, so a server or a build step can import them in Node.

## The html element

Spread `HTML_ATTRS` onto `<html>`:

```html
<html lang="en" data-brand="misty-step">
```

brand.css scopes every token and default to that attribute, so a page without it is untouched. `data-theme` (`light` or `dark`) is optional: without it, brand.css follows `prefers-color-scheme`.

## Tokens

brand.css declares these custom properties, all generated from `tokens.json`:

- **Colour, theme-aware:** `--canvas`, `--surface`, `--border`, `--ink`, `--muted`, `--primary`, `--secondary`, `--on-primary`, `--button-primary-background`, `--code-background`, `--code-text`. In dark, `--muted` is Steel (Graphite never sits on dark surfaces) and `--primary` is dark-primary for links, focus and the full stop. `--button-primary-background` stays Indigo in both themes, so the white label keeps its contrast.
- **Colour, raw:** `--color-<name>` for every `tokens.json` colour, the same in both themes, for example `--color-ink` and `--color-dark-primary`.
- **Type**, for each role `display`, `heading`, `title`, `body`, `label` and `mono`: `--font-<role>` (the family with its generic fallback), `--<role>-size`, `--<role>-weight`, `--<role>-leading`, `--<role>-tracking`, and `--type-<role>`, the `font` shorthand (`font: var(--type-label)`).
- **Radii:** `--radius-sm` (6px), `--radius-control` (8px, controls), `--radius-card` (12px, cards), `--radius-pill`.
- **Spacing:** `--space-xs`, `--space-sm`, `--space-md`, `--space-lg`, `--space-xl`, `--space-section`.
- **Component padding:** `--control-padding` (buttons and inputs), `--tag-padding`, `--card-padding`, `--code-padding`.

The defaults for plain elements sit at zero specificity (`:where`), so any rule a site writes wins: the canvas and ink on `<html>` and `<body>`, the body type, Hedvig Letters Serif on `h1` to `h3`, Indigo links, Commit Mono for `code`, `kbd`, `samp` and `pre`, hairline `hr`, a 2px Indigo focus ring and the selection. `h1` steps from `--heading-size` up to `--display-size` with the viewport (`clamp(var(--heading-size), 8vw, var(--display-size))`, full size at the 1200px content width); `h2` steps from `--title-size` to `--heading-size` the same way. Layout stays the site's: a 12-column grid with 24px gutters, content up to 1200px, sections `--space-section` apart (DESIGN.md).

## Theme

```js
import { startBrand } from '@misty-step/brand/runtime';
const brand = startBrand(); // in the browser, after hydration
brand.destroy();            // before the page goes away
```

- **Stored choice.** `startBrand` reads `localStorage['misty-step-theme']` (`THEME_STORAGE_ITEM`) and, when it holds `light` or `dark`, sets `data-theme` on `<html>`.
- **Toggles.** Every `[data-theme-toggle]` button flips the page between light and dark and stores the choice. The runtime keeps each toggle's `aria-pressed` true while the page is dark, whether the site, the system or a toggle made it so. The label is the site's; keep it constant, for example `aria-label="Dark theme"`.
- **No flash.** To apply a stored choice before first paint, put this in `<head>` before the stylesheets (it is what `demo/build.mjs` writes):

  ```html
  <script>try{const t=localStorage.getItem("misty-step-theme");if(t==='light'||t==='dark')document.documentElement.setAttribute("data-theme",t)}catch{}</script>
  ```

  Without it the page follows the system until the runtime starts. Under a strict CSP, hash that script or skip it.
- **`destroy()`** disconnects the runtime's listener and observers and leaves the theme as it is. Calling `startBrand()` again destroys the previous handle, so it is safe after client-side navigation.
- `meta[name="theme-color"]` stays the site's.

The runtime has no motion, makes no requests, uses no eval and writes no inline style.

## Mark and lockups

The step mark is two sharp parallelograms whose sides lean 60° from the horizontal, the trailing one a fixed step down and to the right. Indigo (`#5B5BF0`) leads and Violet (`#8B5CF6`) trails; a single-colour mark is Ink or white. Never rotate, outline, round, restretch or recolour it, and keep one parallelogram's height clear on every side.

```js
import { lockup, MARK_SVG, MONO_MARK_SVG } from '@misty-step/brand/mark';

lockup('Misty Step', { href: '/' });           // <a class="ms-lockup" href="/"><svg class="ms-mark">…</svg><span class="ms-name">Misty Step</span></a>
lockup('mistystack', { variant: 'mono' });      // <span class="ms-lockup">…</span>, the mark in currentColor
lockup('Misty Step', { href: '/', label: 'Misty Step home' });
```

- `name` is `'Misty Step'` or `'mistystack'`; anything else throws.
- `variant`: `'color'` (default) keeps the mark Indigo and Violet; `'mono'` draws it in `currentColor`, like the name. On Ink, set `color: var(--color-dark-text)` or white on the lockup and use `'mono'`.
- `label` sets the link's `aria-label` when it should say more than the name; the name is the link text otherwise.
- brand.css styles `.ms-lockup` in Hedvig Letters Serif at `--title-size`, the name inheriting the colour. The mark stands 1.25 times the capital height, centred on the capitals. Set `font-size` on `.ms-lockup` to scale it.
- `MARK_SVG` and `MONO_MARK_SVG` are decorative (`aria-hidden`); size them with CSS. For an image with meaning, use `identity/marks/*.svg` with `alt` text.

## Headlines

A headline ends with its full stop in Indigo:

```html
<h1>A method for coding agents<span class="ms-stop">.</span></h1>
```

## Spine components

The spine is the shared component set for Misty Step's own pages: buttons, fields, choices, settings rows, menus, dialogs, toasts, tabs, code, commands, tags, cards, ranked results, tables, status lines, empty and loading states and panels. Each `sp-` class carries its whole look from the tokens, so components need no wrapper.

```js
import '@misty-step/brand/brand.css';
import '@misty-step/brand/spine.css'; // after brand.css
import { wire } from '@misty-step/brand/spine';

wire(); // once, in the browser
```

- **Flat.** Surface on Canvas with a 1px Border; the one shadow sits under a floating menu.
- **Status.** The palette has no status hues: status rides the glyph's shape (circle-check, triangle-alert, circle-x). A confirmation takes Indigo; a warning and an error take full ink, and an invalid field gets a 2px ink frame. A site may set `--ok`, `--warn` and `--err` on `<html>` to change them.
- **Motion.** Only feedback moves (a menu, dialog or toast arriving, a settings row folding), once; under `prefers-reduced-motion` nothing does.
- **Layout stays the page's.** The spine styles components, never the layout around them.
- **Strict CSP.** spine.js needs no inline script, makes no requests and uses no eval. It writes one inline style, an open menu's position, through CSSOM, which CSP allows. The ranked row's bar is a `<meter>`, so it needs no style attribute.
- **Reference.** [demo/markup.mjs](https://github.com/misty-step/aesthetic/blob/master/brand/demo/markup.mjs) and [demo/app.js](https://github.com/misty-step/aesthetic/blob/master/brand/demo/app.js) build the identity sheet and both home pages from these exports alone.

### Behaviour

`wire()` installs every component's behaviour once, as listeners on the document, so markup rendered later, after client-side navigation too, needs nothing more. Calling it again does nothing.

| Export | What it does |
|---|---|
| `wire()` | Dialog openers and closers, menus, tabs, settings rows and toast dismissal, as each component below describes. |
| `openDialog(dialog, invoker)` | Opens a dialog from script, as `data-sp-dialog` does from markup. |
| `toast(tray, message, status?)` | Appends a toast with `role="status"` to a `.sp-toasts` tray and returns it. It stays until dismissed; a fifth pushes the oldest out. |
| `setInvalid(input, message)` | Writes the message into the input's `#<id>-error` note, sets `aria-invalid` and adds the note to `aria-describedby`; `null` clears them. It throws when the note is missing. |
| `icon(name, cls?)`, `statusIcon(status)` | The glyphs as SVG strings, safe to call on the server. `IconName` lists the glyphs; `statusIcon` draws `ok`, `warn` or `err` with its status class. |

### Buttons, fields and choices

A link navigates and a button acts. `.sp-button` is the view's one primary action, solid Indigo with a white label in both themes; `.sp-secondary` is Surface with a Border; `.sp-ghost` is Indigo text. Each stands alone or modifies `.sp-button`.

```html
<a class="sp-link" href="/guide/">Read the guide</a>
<button class="sp-button" type="submit">Send request</button>
<button class="sp-secondary" type="button">Share</button>
<button class="sp-ghost" type="button">More</button>
<button class="sp-ghost sp-icon-only" type="button" aria-label="Copy"><!-- icon('copy') --></button>
```

A field holds its label, the control, a hint and the note `setInvalid` fills. Inputs share the secondary button's frame and set the body type; a `<textarea>` takes the same `sp-input` class.

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

### Tags, cards, code and commands

```html
<span class="sp-tag">Agents</span>
<article class="sp-card"><h3>Shape with grilling</h3><p>…</p></article>
<pre class="sp-code" tabindex="0"><code>npm ci</code></pre>
<p>Run it in <code class="sp-code-inline">brand/</code>.</p>
<div class="sp-command"><code>omp plugin install mistystack@mistystack</code><button class="sp-ghost sp-icon-only" type="button" aria-label="Copy the install command"><!-- icon('copy') --></button></div>
```

Code blocks are Ink on light pages and Dark Surface on dark pages. The command's copy button is the site's to wire; `wire()` adds no copying.

### Ranked results

A ranked result shows the name, a closeness bar in Indigo with its percent in mono, a one-line description, the source as a tag and a copyable command. `<meter value>` draws the bar; the percent beside it is the text a screen reader reads. Keep the rows in `.sp-ranked`: below 36rem of its width each row stacks.

```html
<ol class="sp-ranked">
  <li class="sp-ranked-result">
    <h3 class="sp-ranked-name">retro</h3>
    <p class="sp-closeness"><meter min="0" max="1" value="0.98" aria-hidden="true"></meter><span>98%</span></p>
    <p class="sp-ranked-description">Conduct a retrospective on a coding session.</p>
    <div class="sp-ranked-source">
      <span class="sp-tag">pocock 4ae2317</span>
      <div class="sp-command"><code>/skill:retro</code><button class="sp-ghost sp-icon-only" type="button" aria-label="Copy /skill:retro"><!-- icon('copy') --></button></div>
    </div>
  </li>
</ol>
```

### Settings rows, menus and dialogs

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
<button class="sp-secondary" type="button" popovertarget="share" aria-haspopup="menu" aria-expanded="false">Share</button>
<div class="sp-pop" id="share" popover>
  <div class="sp-menu" role="menu" aria-label="Share">
    <button class="sp-menu-item" type="button" role="menuitem">Copy a link to this section</button>
    <hr class="sp-menu-sep">
    <button class="sp-menu-item" type="button" role="menuitem">Copy a link to this page</button>
  </div>
</div>
```

A dialog is a native `<dialog>`, opened as a modal. `data-sp-dialog` names it by selector. `data-sp-close` closes it, and its value becomes `dialog.returnValue`, which the dialog's `close` event can read; Escape closes it with an empty value. Tab stays inside, and focus returns to the opener however it closes. A `<button class="sp-close" type="button" data-sp-close aria-label="Close">` holding `icon('x')`, placed as the dialog's direct child, sits in its corner.

```html
<button class="sp-secondary" type="button" data-sp-dialog="#start-over">Start over</button>
<dialog class="sp-dialog" id="start-over" aria-labelledby="start-over-title">
  <h2 class="sp-dialog-title" id="start-over-title">Start over?</h2>
  <div class="sp-dialog-body"><p>This clears the form.</p></div>
  <div class="sp-dialog-actions">
    <button class="sp-secondary" type="button" data-sp-close>Keep editing</button>
    <button class="sp-button" type="button" data-sp-close="clear">Clear the form</button>
  </div>
</dialog>
```

### Toasts and tabs

A toast is news at the edge that stays until it is dismissed. Render the tray once, then call `toast`:

```html
<div class="sp-toasts" data-tray></div>
```

```js
toast(document.querySelector('[data-tray]'), 'Copied the link.', 'ok');
```

Tabs are an ARIA tablist. `wire()` answers every `[role="tab"]` on the document, so a page that keeps its own tab script must not run both over the same tabs. Each change dispatches a bubbling `sp-tab` event from the tab.

```html
<div class="sp-tabs" role="tablist" aria-label="Social cards">
  <button class="sp-tab" type="button" role="tab" id="tab-studio" aria-controls="panel-studio" aria-selected="true" tabindex="0">Misty Step</button>
  <button class="sp-tab" type="button" role="tab" id="tab-stack" aria-controls="panel-stack" aria-selected="false" tabindex="-1">mistystack</button>
</div>
<div class="sp-tabpanel" role="tabpanel" id="panel-studio" aria-labelledby="tab-studio">…</div>
<div class="sp-tabpanel" role="tabpanel" id="panel-stack" aria-labelledby="tab-stack" hidden>…</div>
```

### Tables, status, waiting, absence and panels

```html
<figure class="sp-plate">
  <table class="sp-table">
    <caption>App icons</caption>
    <thead><tr><th scope="col">File</th><th scope="col" class="num">Size (px)</th></tr></thead>
    <tbody><tr><th scope="row">app-180-ink.png</th><td class="num">180</td></tr></tbody>
  </table>
</figure>

<p class="sp-status"><!-- statusIcon('ok') --><span>Saved</span></p>

<p class="sp-skeleton" aria-hidden="true">Loading title</p>
<div class="sp-empty">
  <p class="sp-empty-title">No projects yet.</p>
  <p class="sp-empty-note">The first one you archive lands here.</p>
  <button class="sp-secondary" type="button">New project</button>
</div>
<section class="sp-panel sp-panel-feature">…</section>
<aside class="sp-panel sp-panel-aside">…</aside>
```

- **Numbers** in `.num` cells set in Commit Mono, right-aligned. Pair each with its unit in the header.
- **Skeleton.** A still wash, never a shimmer. Pair it with a `role="status"` line that says what is loading.
- **Panels.** `.sp-panel` is a card; `.sp-panel-feature` frames a page's primary task in ink; `.sp-panel-aside` recedes to Canvas.
- **Helpers.** `.sp-sr` hides text from sight and keeps it for screen readers. `.sp-skip` is a skip link. `.sp-portrait` is a neutral stand-in for a person.

## Icons and social cards

```html
<link rel="icon" href="/favicon.svg" type="image/svg+xml">
<link rel="icon" href="/favicon-32.png" sizes="32x32" type="image/png">
<link rel="apple-touch-icon" href="/app-180-ink.png">
<meta property="og:image" content="https://mistystep.io/og/studio.png">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
```

| File | Ground | Mark |
|---|---|---|
| `favicon.svg`, `favicon-16.png`, `favicon-32.png` | transparent | Indigo and Violet |
| `app-180-ink.png`, `app-1024-ink.png` | Ink | Indigo and Violet |
| `app-180-indigo.png`, `app-1024-indigo.png` | Indigo | white |
| `app-180-black.png`, `app-1024-black.png` | white | Ink |
| `app-180-white.png`, `app-1024-white.png` | Ink | white |

- The favicons fill their square; their horizontal edges land on whole pixels.
- The app icons are square and opaque with the mark's clear space around it, because iOS, macOS and Android round their own corners. Use `app-180-ink.png` as the touch icon and `app-1024-*.png` in a web app manifest.
- `og/studio.png` (Misty Step, "Two weeks to see what’s worth building.", mistystep.io) and `og/stack.png` (mistystack, "A method for coding agents.", stack.mistystep.io) put the lockup, the headline with its Indigo stop, the address in mono and the colour mark on the canvas. For another page's card, use the template in `scripts/identity/og.mjs` (a new entry in `CARDS`), or `tokens.json` and the fonts in your own renderer.

## Next.js App Router

```tsx
// app/layout.tsx
import '@misty-step/brand/brand.css';
import '@misty-step/brand/spine.css';
import { HTML_ATTRS } from '@misty-step/brand/attrs';
import { Brand } from './brand';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" {...HTML_ATTRS} suppressHydrationWarning>
      <body>
        {children}
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
import { wire } from '@misty-step/brand/spine';

export function Brand() {
  const pathname = usePathname();
  useEffect(() => {
    wire();
    const brand = startBrand();
    return () => brand.destroy();
  }, [pathname]);
  return null;
}
```

`suppressHydrationWarning` covers the `data-theme` that the pre-paint script or the runtime adds to `<html>`.

## Astro

```astro
---
import '@misty-step/brand/brand.css';
import '@misty-step/brand/spine.css';
import { HTML_ATTRS } from '@misty-step/brand/attrs';
import { lockup } from '@misty-step/brand/mark';
---
<html lang="en" {...HTML_ATTRS}>
  <body>
    <header><Fragment set:html={lockup('mistystack', { href: '/' })} /></header>
    <slot />
    <script>
      import { startBrand } from '@misty-step/brand/runtime';
      import { wire } from '@misty-step/brand/spine';
      wire();
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

## Migrating from 0.2.0

0.3.0 replaces the 29 October identity (Mist sign, industrial condensed type, Ground fog) with the locked 6 November one. Nothing old is kept under a new name.

| 0.2.0 | 0.3.0 |
|---|---|
| `HTML_ATTRS`: six `data-*` layer attributes | `{ 'data-brand': 'misty-step' }` |
| `twoLineLength(headline)` and the hero's `--h2` | Removed with the horizon hero. Headlines balance with `text-wrap: balance`. |
| `MARK_16`, `MARK_32`, `MARK_FULL` | `MARK_SVG` (colour) and `MONO_MARK_SVG` (`currentColor`); one drawing at every size |
| `lockup('MISTY STEP')`, `lockup('MISTYSTACK')`; `.brand`, `.brand-mark`, `.brand-name` | `lockup('Misty Step')`, `lockup('mistystack')`, with `href`, `label` and `variant`; `.ms-lockup`, `.ms-mark`, `.ms-name` |
| `FAVICON_SVG`: light and dark drawings | The colour mark, the same in both themes |
| `startBrand({ root, motion, params })`, `GroundFogParams`, `field.js` | `startBrand({ root })`: theme only. The fog, its parameters, the entrances (`data-enter`), the pause control (`.motion-toggle`, `data-paused`, `data-reduced-motion`) and the mark's entrance are gone. |
| A site-owned theme toggle | `[data-theme-toggle]` buttons, answered by the runtime; `data-theme` stays settable by the site |
| brand.css layout, hero and section classes (`.nav`, `.hero`, `.s`, `.item`, `.btn`, `.btn-primary`, `.btn-quiet`, `a.link`, `pre.code`, `.foot`) | Removed. Use the spine's components, and your own layout on the tokens. |
| spine.css under `data-face="studio"` | No face root: every `sp-` class styles itself on `html[data-brand]` |
| `.sp-button.sp-quiet` | `.sp-secondary`; new `.sp-ghost`, `.sp-tag`, `.sp-card`, `.sp-command`, `.sp-ranked`, `.sp-ranked-result`, `.sp-closeness` |
| Status inks `--ok`, `--warn`, `--err` in three hues | Status by glyph shape; ok takes Indigo, warn and err take ink |
| `apple-touch-icon.png`, `icon-192.png`, `icon-512.png` | `app-180-ink.png`, `app-1024-*.png` |
| Sofia Sans, Sofia Sans Extra Condensed, Kode Mono | Hedvig Letters Serif, Uncut Sans, Commit Mono |

## Weight

- **CSS.** brand.css is about 2 KB gzip and spine.css about 5 KB.
- **Script.** runtime.js is under 1 KB gzip; spine.js about 4 KB with the icon licences, and only where a page imports it.
- **Fonts.** The upstream variable files, unmodified: Hedvig Letters Serif 47 KB, Uncut Sans 76 KB, Commit Mono 85 KB. Each loads only when a page uses it; Commit Mono, for example, only for code and numbers.

## Licences

Code is MIT: `LICENSE` sits beside `package.json`, and npm includes it in the package. The fonts are the upstream files, unmodified, under the SIL Open Font License 1.1, with their licence texts beside them; keep each licence with its font if you copy the fonts.

| Font | File | Licence | Upstream |
|---|---|---|---|
| Hedvig Letters Serif (Kanon Foundry) | `fonts/HedvigLettersSerif-opsz.woff2`, optical sizes 12 to 24 | `fonts/OFL-HedvigLetters.txt` | [KanonFoundry/HedvigLetters](https://github.com/KanonFoundry/HedvigLetters/blob/d05ac773fd287039be44147027a3787188ddb859/fonts/HedvigLettersSerif/webfonts/HedvigLettersSerif%5Bopsz%5D.woff2), renamed from `HedvigLettersSerif[opsz].woff2` |
| Uncut Sans (Kasper Nordkvist) | `fonts/UncutSans-Variable.woff2`, weights 300 to 700 | `fonts/OFL-UncutSans.txt` | [kaspernordkvist/uncut_sans](https://github.com/kaspernordkvist/uncut_sans/blob/b3b42467781e3bd98c68f2d70eba325196e7d9c5/Webfonts/UncutSans-Variable.woff2) |
| Commit Mono (Eigil Nikolajsen) | `fonts/CommitMonoV143-VF.woff2`, weights 200 to 700 | `fonts/OFL-CommitMono.txt` | [eigilnikolajsen/commit-mono](https://github.com/eigilnikolajsen/commit-mono/blob/d407cd2bf8e01ca1db70544052fbbb9606406c3b/src/fonts/fontlab/CommitMonoV143-VF.woff2) |

The spine's glyphs are Lucide icons (ISC), several of them derived from Feather (MIT). Both notices close `spine.js`.

## Regenerate

The root `tokens.json` is the only value source; `brand/src` holds the hand-written sources. Nothing in this directory is edited by hand except this README. From `brand/`:

```sh
npm ci
npm run identity        # regenerate identity/ and render its PNGs with resvg
npm run identity:check  # change nothing; fail when a file is stale, missing or extra (CI runs this)
npm run demo            # resolve every export as a consumer does, then write demo/dist
```

| File | Generated from |
|---|---|
| `tokens.json` | The root `tokens.json`, byte for byte |
| `brand.css` | The faces in `src/fonts`, every token as a custom property per theme (the mapping in `scripts/identity/lib.mjs`), `src/brand.css`, and the lockup rules from `scripts/identity/mark.mjs` and the display face's capital height |
| `spine.css` | `src/spine.css` |
| `attrs.js`, `runtime.js`, `spine.js` | `src/attrs.ts`, `src/runtime.ts`, and `src/spine.ts` with `src/behaviour.ts` and `src/icons.ts`, bundled by esbuild |
| `*.d.ts` | Written by `lib.mjs`; `scripts/identity/exports.test-d.ts` holds them equal to the sources (`npx tsc -p scripts/identity`) |
| `mark.js`, `marks/*.svg`, `icons/favicon.svg` | The geometry in `scripts/identity/mark.mjs` and the colours in `tokens.json` |
| `icons/*.png` | The same, rasterised by @resvg/resvg-js |
| `og/*.png` | The card template in `scripts/identity/og.mjs`: every word outlined from the package's own fonts (fontkit), rasterised by @resvg/resvg-js with no browser and no system fonts |
| `fonts/*` | `src/fonts`, refused unless each file matches its upstream hash in `lib.mjs` |
| `manifest.json` | Each PNG's source hash and its own hash. Rasterisers differ in the last bit across platforms, so the check compares the recorded hashes and gives the same answer on every machine. |

The check also refuses a hand-written stylesheet that sets a colour literal, names a font family, uses a `var()` that brand.css does not declare, or scopes to another `data-brand`, and a `tokens.json` whose components disagree with the radius, padding and type role each spine component uses.

To change the identity, change `tokens.json` (and DESIGN.md's prose with it) or `brand/src`, run `npm run identity`, commit `identity/`, and release a new version.
