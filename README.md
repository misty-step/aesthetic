# aesthetic

The Misty Step design system. One CSS file: tokens, base styles, and a
small set of primitives. Import it and the project looks like ours.

## Why

- **Consistent.** Every project that imports it shares the same surfaces,
  type, spacing, and discipline. No per-project CSS archaeology.
- **Tiny.** A single stylesheet, no build step required, no JavaScript.
- **Opinionated.** One font size everywhere (hierarchy comes from ink and
  weight), one accent per view, viewport-sized screens instead of
  scrolling pages, motion only as feedback.
- **Steerable.** Downstream projects override one token pair, the accent,
  to get their own personality without forking the system.

## Install

With a package manager:

```bash
pnpm add github:misty-step/aesthetic#v2.1.0
```

```css
/* plain CSS */
@import '@misty-step/aesthetic';

/* Tailwind v4: import into the base layer so utilities stay composable */
@import '@misty-step/aesthetic' layer(base);
```

Without a build step:

```html
<link
  rel="stylesheet"
  href="https://cdn.jsdelivr.net/gh/misty-step/aesthetic@v2.1.0/aesthetic.css"
/>
```

Load Geist and Geist Mono however your stack prefers (Google Fonts,
`next/font`, self-hosted). If the family comes through a variable, point
the kit at it:

```css
:root {
  --ae-font: var(--font-geist), 'Helvetica Neue', sans-serif;
  --ae-font-mono: var(--font-geist-mono), ui-monospace, monospace;
}
```

## Layout

Pages are screens, not scrolls. Compose:

```html
<div class="ae-screen">
  <header class="ae-bar">
    <a class="ae-name" href="/">NAME</a>
    <nav class="ae-nav">…view buttons…</nav>
    <button class="ae-mode">dark</button>
  </header>
  <main class="ae-stage">
    <div class="ae-view">…one screenful of content…</div>
  </main>
  <footer class="ae-bar"><p class="ae-dim">…</p></footer>
</div>
```

`.ae-screen` is exactly one viewport tall and never scrolls. If content
cannot fit one screen, split it into views and swap them with `.ae-nav`
(remounting `.ae-view` replays its entrance). For genuinely long
documents (legal pages), use `.ae-stage-scroll`: the document scrolls
inside the stage, the chrome stays put.

## Modes

Light and dark ship together and default to the system preference. A
toggle sets `.dark` / `.light` (next-themes compatible) or
`data-ae-mode="dark|light"` on the root element; style the control with
`.ae-mode`.

## Steering

Override exactly one pair to give a project its personality:

```css
:root {
  --ae-accent: #0e7a4d;
  --ae-accent-dark: #6fd2a8;
}
```

Everything else is the shared identity.

## Primitives

| Class | Role |
| --- | --- |
| `.ae-screen` / `.ae-bar` / `.ae-stage` | Viewport shell: chrome bars and a centered stage |
| `.ae-stage-scroll` | Inner scroll for long documents; the page still never scrolls |
| `.ae-view` | One screenful of content with a quiet entrance |
| `.ae-nav` + `.ae-nav-ind` | View switcher with a sliding ink underline (the site positions the indicator on view change) |
| `.ae-row-link` | List rows where the whole row is the link (kills cursor strobing between rows) |
| `.ae-chrome` / `.ae-foot` | The 13px chrome register; hairline-topped two-end footer |
| `.ae-icon` | Lucide icon sizing: 1.5px stroke, round caps, rides with text |
| `.ae-mode` | Icon mode toggle: sun/moon rotate-crossfade |
| `.ae-panel` | Soft depth for dense content: light shadow in light mode, wash in dark, radius 0 |
| `.ae-name` | The name: weight 800, letterspaced, never large |
| `.ae-lede` | The argument, plainly |
| `.ae-group` / `.ae-h` | A section and its muted heading |
| `.ae-item` / `.ae-dim` | Medium ink / muted ink |
| `.ae-accent` | THE accent: one per view |
| `.ae-label` / `.ae-input` / `.ae-button` | Forms as lines, not boxes |

## Cursor law

Static text never shows the I-beam (`body { cursor: default }`); the
pointer appears only on interactive elements, and the text cursor only in
inputs. In lists, use `.ae-row-link` so the cursor never strobes across
dead bands between rows.

## Link treatment

Locked: ink at rest with a faint underline, warming to the accent on
hover. Approved alternates, kept here so changing is one decision away:

- **Marker sweep** — a wash highlight eases across the link
  (`background-image` gradient, `background-size 0% → 100%`).
- **Draw on hover** — no underline at rest (weight 550 marks the link),
  a 1px underline draws left-to-right on hover.

## Icons

Lucide (ISC), inlined as SVG `<symbol>` sprites per site, styled by
`.ae-icon`. Ubiquitous but clean; revisit if a more distinct voice is
worth the trade later.

## Versioning

Semver, tagged. Consumers pin a tag and upgrade deliberately.
