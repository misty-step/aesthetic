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
pnpm add github:misty-step/aesthetic#v2.0.0
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
  href="https://cdn.jsdelivr.net/gh/misty-step/aesthetic@v2.0.0/aesthetic.css"
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
| `.ae-nav` | View switcher: muted words, active is ink |
| `.ae-mode` | Light/dark toggle styling |
| `.ae-name` | The name: weight 800, letterspaced, never large |
| `.ae-lede` | The argument, plainly |
| `.ae-group` / `.ae-h` | A section and its muted heading |
| `.ae-item` / `.ae-dim` | Medium ink / muted ink |
| `.ae-accent` | THE accent: one per view |
| `.ae-label` / `.ae-input` / `.ae-button` | Forms as lines, not boxes |

## Versioning

Semver, tagged. Consumers pin a tag and upgrade deliberately.
