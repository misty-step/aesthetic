---
version: "alpha"
name: "Misty Step"
description: "One identity for the Misty Step studio and mistystack, its open method for coding agents. Locked 2026-11-06 (MIS-866)."
colors:
  primary: "#5B5BF0"
  secondary: "#8B5CF6"
  ink: "#0E0F13"
  graphite: "#646A77"
  steel: "#A7ABB8"
  canvas: "#F7F6F3"
  surface: "#FFFFFF"
  border: "#E4E3DF"
  on-primary: "#FFFFFF"
  dark-canvas: "#0B0C10"
  dark-surface: "#15171D"
  dark-border: "#262833"
  dark-text: "#F7F6F3"
  dark-primary: "#7C7CF5"
typography:
  display:
    fontFamily: "Hedvig Letters Serif"
    fontSize: "96px"
    fontWeight: 400
    lineHeight: 0.92
    letterSpacing: "-0.02em"
  heading:
    fontFamily: "Hedvig Letters Serif"
    fontSize: "48px"
    fontWeight: 400
    lineHeight: 0.94
    letterSpacing: "-0.02em"
  title:
    fontFamily: "Hedvig Letters Serif"
    fontSize: "24px"
    fontWeight: 400
    lineHeight: 1.2
    letterSpacing: "-0.02em"
  body:
    fontFamily: "Uncut Sans"
    fontSize: "18px"
    fontWeight: 400
    lineHeight: 1.5
  label:
    fontFamily: "Uncut Sans"
    fontSize: "14px"
    fontWeight: 500
    lineHeight: 1.4
  mono:
    fontFamily: "Commit Mono"
    fontSize: "14px"
    fontWeight: 400
    lineHeight: 1.4
rounded:
  sm: "6px"
  md: "8px"
  lg: "12px"
  full: "9999px"
spacing:
  xs: "4px"
  sm: "8px"
  md: "16px"
  lg: "24px"
  xl: "48px"
  section: "96px"
components:
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.on-primary}"
    typography: "{typography.label}"
    rounded: "{rounded.md}"
    padding: "12px"
  button-secondary:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.ink}"
    typography: "{typography.label}"
    rounded: "{rounded.md}"
    padding: "12px"
  input:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.ink}"
    typography: "{typography.body}"
    rounded: "{rounded.md}"
    padding: "12px"
  tag:
    backgroundColor: "{colors.canvas}"
    textColor: "{colors.graphite}"
    typography: "{typography.label}"
    rounded: "{rounded.full}"
    padding: "8px"
  card:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.ink}"
    rounded: "{rounded.lg}"
    padding: "24px"
  code:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.canvas}"
    typography: "{typography.mono}"
    rounded: "{rounded.md}"
    padding: "16px"
  page-dark:
    backgroundColor: "{colors.dark-canvas}"
    textColor: "{colors.dark-text}"
  card-dark:
    backgroundColor: "{colors.dark-surface}"
    textColor: "{colors.dark-text}"
    rounded: "{rounded.lg}"
    padding: "24px"
  link-dark:
    backgroundColor: "{colors.dark-canvas}"
    textColor: "{colors.dark-primary}"
  divider:
    backgroundColor: "{colors.border}"
  divider-dark:
    backgroundColor: "{colors.dark-border}"
  caption-dark:
    backgroundColor: "{colors.dark-surface}"
    textColor: "{colors.steel}"
    typography: "{typography.mono}"
---

# Misty Step

## Overview

One identity serves two faces: **Misty Step**, the studio that reimagines business processes with AI and ships its own games and tools, and **mistystack**, its open method for coding agents. The symbol is two parallel slanted parallelograms offset like a step. The studio and the method share the symbol, palette and type; only the wordmark changes.

The feel is precise, light-first and calm: warm canvas, near-black ink, one indigo accent, hairline borders and generous space. Light and dark are equal; pages default to the system setting. The mark is the only gradient (indigo to violet). Reference renders and the decision live in [MIS-866](https://linear.app/misty-step/issue/MIS-866).

`tokens.json` is the value authority. `npm run build:design` generates this document's frontmatter. `npm run check` rejects drift.

## Colors

- **Indigo** (`primary`): primary actions, links, focus rings and the leading parallelogram. Never a background wash.
- **Violet** (`secondary`): the trailing parallelogram and the mark gradient only.
- **Ink**, **Graphite**, **Steel**: text, secondary text and quiet UI, in that order of emphasis.
- **Canvas** and **Surface**: the light page and raised cards; **Border** draws hairlines.
- **Dark theme**: `dark-canvas` page, `dark-surface` cards, `dark-border` hairlines, `dark-text`, and `dark-primary` for links and actions where Indigo lacks contrast.

## Typography

Hedvig Letters Serif carries display, headings and titles at regular weight, tightened to -2% tracking. Uncut Sans carries body, labels and UI, body at 18px with 1.5 leading. Commit Mono carries commands, metadata, versions, hashes and numbers in data rows. All three are SIL Open Font License faces, self-hosted with the brand package; Misty Step does not buy typefaces (owner, 2026-11-06). One system serves both sites. Hierarchy comes from size and weight; never from colour alone. Headlines end with a full stop in Indigo.

## Layout

A 12-column grid with 24px gutters, content up to 1200px, sections 96px apart. Pages lead with one headline, one sentence and one primary action. Tools (Find a skill, the library) use a two-column split: input left, results right; on phones they stack.

## Elevation & Depth

Flat. Depth comes from Surface on Canvas and a 1px Border, not shadows. One soft shadow is allowed on floating menus only.

## Shapes

Corners are 8px on controls and 12px on cards; tags are pills. The symbol's parallelograms keep sharp corners at every size.

## Components

Primary buttons are solid Indigo with white labels; secondary buttons are Surface with a Border. Inputs share the secondary button's frame. Ranked results show the name, a closeness bar in Indigo with its percent in mono, a one-line description, a source chip and a copyable command. Code blocks are Ink on light pages and Dark Surface on dark pages.

## Do's and Don'ts

- Do use Indigo for the one primary action per view.
- Do pair every numeric result with its unit or provenance in mono.
- Do keep the symbol's two parallelograms in a fixed offset; never rotate, outline or recolour them outside Indigo, Violet, Ink or white.
- Don't add gradients, glows or blurred backgrounds beyond the mark.
- Don't use eyebrow labels or helper text that repeats the heading.
- Don't place Graphite text on Dark Surface; use Steel or dark-text.
