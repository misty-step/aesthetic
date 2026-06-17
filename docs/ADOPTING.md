# Adopting aesthetic

The step-by-step guide for making a project recognizably misty-step.
Four steps for a static page; six for a React app. The stylesheet is
the product; everything here is wiring.

## 1 · Link the stylesheet

Without a build step:

```html
<link
  rel="stylesheet"
  href="https://cdn.jsdelivr.net/gh/misty-step/aesthetic@v2.6.0/aesthetic.css"
/>
```

With a package manager:

```bash
pnpm add github:misty-step/aesthetic#v2.6.0
```

```css
@import '@misty-step/aesthetic';
```

Pin the tag. Consumers upgrade deliberately; only the aesthetic site
itself rides HEAD.

## 2 · Load Geist

```html
<link
  rel="stylesheet"
  href="https://fonts.googleapis.com/css2?family=Geist:wght@100..900&family=Geist+Mono:wght@100..900&display=swap"
/>
```

Or with next/font, point the kit at the variables:

```tsx
// app/layout.tsx
import { Geist, Geist_Mono } from 'next/font/google';
const geist = Geist({ subsets: ['latin'], variable: '--font-geist' });
const mono = Geist_Mono({ subsets: ['latin'], variable: '--font-geist-mono' });
// <html className={`${geist.variable} ${mono.variable}`}>
```

```css
:root {
  --ae-font: var(--font-geist), 'Helvetica Neue', sans-serif;
  --ae-font-mono: var(--font-geist-mono), ui-monospace, monospace;
}
```

## 3 · Boot the mode

Inline in `<head>`, before first paint, so the page never flashes the
wrong mode:

```html
<script>
  try {
    var m = localStorage.getItem('ae-mode');
    if (m === 'dark' || m === 'light') {
      document.documentElement.classList.add(m);
      document.documentElement.style.colorScheme = m;
    }
  } catch (e) {}
</script>
```

Then give the toggle its behavior: copy `recipes/mode.js` (or load the
combined `recipes/recipes.js`). React apps using next-themes keep
`attribute="class"` — the `.dark` / `.light` classes match — and skip
the recipe.

## 4 · Steer the scheme

This is the volume knob. The doctrine in one breath:

**Invariants — what makes it ours; never steered.** One font size per
surface plus the 13px chrome register. Nine registers from three inks
× three weights. Hairlines and radius 0. Motion as feedback that
resolves once. Status rides the glyph. Buttons are not links. The
cursor law. Light and dark as equals.

**Dials — what makes it yours.** The accent (one hue or several — see
project tokens below). The status triplet, when your domain reads
differently. Density: the measure, the chrome register, the app shell.
The mono ratio. How loudly and how often you spend color.

A calm tool turns every dial down. A loud one turns hue count and
accent frequency up — never radius, size scale, or ambient motion.
That asymmetry is what keeps the family resemblance.

```css
:root {
  --ae-accent: #1f7a55; /* your hue, AA on #fcfcfc */
  --ae-accent-dark: #6ee7b7; /* its dark counterpart, AA on #121212 */
  /* and, when the domain needs different status hues:
     --ae-ok / --ae-warn / --ae-err (+ their -dark pairs) */
}
```

Extra hues are **project tokens** — name them yours (`--sploot-coral`),
spend them under the same judgment as the accent, and keep them on
content: type you've checked for contrast, glyphs, illustration. They
never replace ink hierarchy and never fill pills.

### Worked steering blocks

The seven misty-step adopters, as real examples (every pair passes AA
on the system surfaces):

```css
/* misty-step · the house ultramarine — no overrides */

/* chrondle · the scholar's green */
:root {
  --ae-accent: #1f7a55;
  --ae-accent-dark: #6ee7b7;
}

/* curb · steering can be zero — identity through composition:
   the app shell, meters, and the house status triplet ARE the look */

/* sploot · loud: cyan accent + coral/violet project tokens */
:root {
  --ae-accent: #0c6a84;
  --ae-accent-dark: #00f0ff;
  --sploot-coral: #b91c1c;
  --sploot-coral-dark: #ff6b6b;
  --sploot-violet: #6d28d9;
  --sploot-violet-dark: #a855f7;
}

/* doomscrum · acid, pinned dark (html class="dark") */
:root {
  --ae-accent: #4d6b00;
  --ae-accent-dark: #b6ff2e;
  --doom-pink: #ff2ea6;
  --doom-cyan: #2ee6ff;
}

/* vanity · the mint signature */
:root {
  --ae-accent: #0e7a4d;
  --ae-accent-dark: #77f0b8;
}

/* linejam · the persimmon stamp */
:root {
  --ae-accent: #c2410c;
  --ae-accent-dark: #ff8a5c;
}
```

See them rendered side by side: the steering page on the site
(`site/steering.html`).

## 5 · Tailwind v4 bridge (React apps)

Import the system into the base layer, then map its tokens into
Tailwind's theme so utilities resolve to aesthetic — and no parallel
color system ever grows:

```css
/* globals.css */
@import 'tailwindcss';
@import '@misty-step/aesthetic' layer(base);

@theme inline {
  --color-surface: var(--ae-surface);
  --color-wash: var(--ae-wash);
  --color-ink: var(--ae-ink);
  --color-ink-muted: var(--ae-ink-muted);
  --color-ink-faint: var(--ae-ink-faint);
  --color-line: var(--ae-line);
  --color-accent: var(--ae-accent);
  --color-ok: var(--ae-ok);
  --color-warn: var(--ae-warn);
  --color-err: var(--ae-err);
  --font-sans: var(--ae-font);
  --font-mono: var(--ae-font-mono);
  --radius-*: initial; /* radius is 0; the scale should not exist */
}
```

Now `bg-surface text-ink border-line text-ink-muted` are the system.
Compose layouts with utilities; keep components in the `ae-` costumes.
Delete the Tailwind palette you were using — the bridge is complete
only when no `#hex` color survives outside the steering block.

## 6 · Behavior

Each JS-implying primitive has one canonical recipe in `recipes/`:

| Behavior                       | Recipe          |
| ------------------------------ | --------------- |
| Mode toggle (breath + persist) | `mode.js`       |
| Nav / tabs indicator           | `nav.js`        |
| Hash-routed view swap          | `views.js`      |
| Send moment (+ SR announce)    | `send.js`       |
| Settings rows                  | `settings.js`   |
| Input anticipation (opt-in)    | `anticipate.js` |
| Toasts (`aeToast`)             | `toast.js`      |
| Popover placement              | `pop.js`        |

No build step: load the combined file —

```html
<script src="https://cdn.jsdelivr.net/gh/misty-step/aesthetic@v2.6.0/recipes/recipes.js"></script>
```

React apps: treat the recipes as reference implementations — port the
ones you need into components, or style Base UI / Radix primitives
with the `ae-` classes and let them own focus management.

## The adoption checklist

- [ ] Stylesheet pinned to a tag; no second design system imported.
- [ ] Geist + Geist Mono load; `--ae-font` wired if via variables.
- [ ] Mode boots before paint; toggle present; both modes walked.
- [ ] One steering block; every other hardcoded color deleted.
- [ ] Tailwind bridge in place (if Tailwind); palette utilities gone.
- [ ] Hand-rolled glue replaced by recipes (or ported verbatim).
- [ ] The law holds on every screen: one size per surface, hairlines,
      radius 0, status on glyphs, motion as feedback, buttons ≠ links.
