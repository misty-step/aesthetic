# aesthetic

The Misty Step design system. One package, imported by every project, used
religiously.

The package name is deliberately unopinionated: the *system* is permanent,
the *language* it ships will evolve. The v1 language is **TACET**, chosen
through ten design-catalog rounds in June 2026.

## The law (v1: TACET)

- **One size.** Exactly one font size on every surface, including the
  headline, which is heavier and blacker, never larger.
- **Nine registers.** Three inks (ink, muted, faint) by three weights
  (400, 550, 800). Hierarchy comes from ink, weight, position, and space.
- **One accent instance per viewport.** The single action that matters now.
  Everything else is ink.
- **Zero animation.** State changes are instant, like a terminal. The
  stylesheet enforces this with a global kill rule.
- **One column, vast space.** Max 38em. No rules, no cards, no boxes;
  whitespace is the only divider.
- **Geist / Geist Mono.** 16px, line-height 1.8, radius 0.

## Install

As a dependency (any bundler or PostCSS pipeline):

```bash
pnpm add github:misty-step/aesthetic#v1.0.0
```

```css
/* plain */
@import '@misty-step/aesthetic';

/* Tailwind v4: import into the base layer so utilities stay composable */
@import '@misty-step/aesthetic' layer(base);
```

No build step (static HTML):

```html
<link
  rel="stylesheet"
  href="https://cdn.jsdelivr.net/gh/misty-step/aesthetic@v1.0.0/aesthetic.css"
/>
```

Fonts are the consumer's job: load Geist and Geist Mono however your stack
prefers (Google Fonts link, `next/font`, self-hosted) and, if the family is
exposed through a variable, point the kit at it:

```css
:root {
  --ae-font: var(--font-geist), 'Helvetica Neue', sans-serif;
  --ae-font-mono: var(--font-geist-mono), ui-monospace, monospace;
}
```

## Steering

Every token is a CSS custom property, but downstream projects are
sanctioned to override exactly one pair, and that is how a project gets its
personality:

```css
:root {
  --ae-accent: #0e7a4d; /* light-mode accent */
  --ae-accent-dark: #6fd2a8; /* dark-mode accent */
}
```

Everything else is the shared identity. Override it and you have left the
system.

## Dark mode

Tokens follow `prefers-color-scheme` automatically. A site that pins a mode
sets `.dark` / `.light` (next-themes compatible) or
`data-ae-mode="dark|light"` on the root element.

## Primitives

| Class | Role |
| --- | --- |
| `.ae-page` | The page: one 38em column in vast space |
| `.ae-name` | The name: weight 800, letterspaced, never large |
| `.ae-lede` | The page's whole argument, plainly |
| `.ae-group` | A section: whitespace is the only divider |
| `.ae-h` | Group heading: muted, spaced, medium |
| `.ae-item` | An item that matters: medium ink |
| `.ae-dim` | Supporting matter: muted ink |
| `.ae-accent` | THE accent: exactly one instance per viewport |
| `.ae-label` / `.ae-input` | Forms as lines, not boxes |
| `.ae-button` | The submit as the accent instance |

## Versioning

Semver, tagged. The law itself only changes with a major version and an
operator verdict; tokens and primitives that do not change the law are
minor. Consumers pin a tag and upgrade deliberately.
