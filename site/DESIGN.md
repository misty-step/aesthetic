# Aesthetic DESIGN.md

This file is the product's public-site brand contract. Keep it short and exact:
agents and humans should be able to update `site/` from this file without
inventing a second design system.

## Deliberate deviation from the site-kit template

Aesthetic does not use the `site-kit/scaffold/site` marketing template. The
design system's own live catalog (`site/index.html`, `site/tokens.html`, the
`site/r/` registry) already IS the demo — every primitive on the page is the
real stylesheet, unmodified, not a screenshot or a mockup of one. Overwriting
it with the generic marketing scaffold would replace a better, purpose-built
demo with a worse, generic one. This file adopts the site-kit's shared
CONTRACT pieces (this DESIGN.md, a real changelog page, the footer link
rule, mobile floor) onto the existing site instead of replacing it.

## Brand Voice

- Plain-spoken, concrete, and operator-facing.
- Lead with the user outcome, then the proof.
- Avoid marketing fog, mascot language, and decorative claims.
- The pitch is structural, not written: "every primitive on the page is the
  stylesheet, unmodified" is a fact a visitor can verify by opening dev tools,
  not a claim to take on faith.

## Pitch One-Liner

`Aesthetic is the Misty Step design system — one stylesheet, thirty-three primitives, rendered live by the same file that documents them.`

## Lucide Mark

- No mark. The site's wordmark is `AESTHETIC` in the header (`.ae-name`),
  not an icon — this is the shared design system every other product's mark
  gets rendered through, so it doesn't wear one of its own primitives as a
  logo. Rule still applies for every OTHER product's site: inline Lucide SVG
  inside `.ae-app-mark`, no bespoke marks.

## Palette Hooks

No override. The site runs the system's own default tokens, unsteered —
the whole point is showing the shared identity, not a brand variant of it.
Named themes (`ultramarine`, `moss`, `ember`, `violet`) are demonstrated
live via the theme switcher on the tokens page, not pinned as this site's
own brand.

## Screenshot Inventory

No screenshot gallery. The site itself is the live instance — a visitor
interacts with the real primitives directly (hover, focus, dark/light,
copy-to-clipboard), which is strictly better evidence than a static capture
of the same thing. Adding a redundant gallery of screenshots of a page the
visitor is already looking at would be worse evidence, not more of it.

## Footer Links

- Misty Step: `https://mistystep.io` (present, `site/index.html` and
  `site/tokens.html` footers).
- GitHub: `https://github.com/misty-step/aesthetic` (present, header nav —
  public repo).
- No Weave link — Aesthetic is the shared design system every product
  consumes, not a Weave-family execution-plane app itself.

## Release Notes Rule

`site/changelog.html` is generated from real tagged releases via Landmark's
`docs/releases/*.md` export (`docs/releases/releases.json` is the source of
truth) — never hand-written marketing copy, never invented version numbers.
Update it when a new version ships; pull the real `New Features`/`Bug Fixes`
sections from the matching `docs/releases/vX.Y.Z.md` file.
