# DESIGN.md — the aesthetic, in words

The agent-facing identity file. Machine-exact values live in
`tokens.json`; canonical markup lives in `site/`; this file is the
prose that makes new artifacts — views, components, images — come out
unmistakably ours. Read it before generating anything visual, and copy
the relevant block into prompts for tools that cannot read the repo.

## The feel

Instrument-panel restraint. Ink on paper: near-black text on
paper-white (or warm-gray ink on near-black), hairline rules, hard 90°
corners, generous negative space, a Swiss-typographic grid. Everything
is quiet, precise, and editorial — the page reads like a beautifully
set technical document, never like a brochure. One saturated
ultramarine accent appears where it matters and nowhere else. Nothing
glows, nothing floats, nothing bounces.

## The law

- One font size per surface. 16px content; the 13px chrome register
  (footers, utility links, metadata) is the only exception. Hierarchy
  comes from ink and weight, never from scale.
- Nine registers: three inks (ink, muted, faint) by three weights
  (400, 550, 800). The headline is heavier and blacker, not larger.
- The accent is scarce, role-justified, and never decorative: when
  ultramarine appears it must mean something nameable — the active
  place, the live thing, the primary action — applied consistently to
  that role, never coloring for its own sake. (The exact doctrine is
  being settled in the LAB; the old "exactly one instance per view"
  rule is retired.)
- Screens, not pages: every view fits the viewport. Long documents
  scroll inside the stage; the chrome never moves.
- Motion is feedback, never decoration: small, brief, eased. State
  resolutions are gentler (480ms) and resolve exactly once — success
  persists, it is never rewound. Nothing changes size while it
  animates. Reduced motion makes everything instant.
- Buttons are not links: links are inked text that navigates; buttons
  are contained ink shapes that act. They never share a costume.
- Light and dark are equals, defaulting to the system preference.

## Never

- No drop shadows as decoration (the panel's soft depth is the lone
  sanctioned use), no gradients-as-paint, no glassmorphism.
- No rounded corners. Radius is 0 everywhere.
- No second accent, no colored badges, no traffic-light pills.
- No font-size hierarchy, no oversized hero type.
- No ambient or looping animation; nothing moves unprompted.
- No link-styled buttons or button-styled links.
- No I-beam cursor on static text; pointer and text cursors are
  earned by interactive elements only.
- No stock photography, glossy 3D renders, or emoji-as-interface.

## Composing a view

1. Decide what the accent means on this surface (the live thing, the
   primary action, wayfinding) and spend it only on that role;
   everything else is ink.
2. Build hierarchy with registers: 800 ink for the one loud thing,
   550 for items that matter, 400 for prose; muted for support, faint
   for whispers.
3. Structure with whitespace and hairlines (`--ae-line`), never with
   boxes around boxes.
4. Forms are lines, not boxes; submission gets a send moment that
   resolves once and persists.
5. The canonical markup for every primitive is in `site/` —
   view-source is documentation.

## The image language

The copy-paste style block for image models (vary only the subject
clause; full canon, plate vocabulary, and dark-mode practice live in
`docs/IMAGES.md`):

> Technical pen-and-ink illustration in the style of a vintage
> engineering manual: fine hairline linework, stipple and cross-hatch
> shading, halftone dot textures. Monochrome dark-gray ink (#3a3a3a)
> on an off-white ground (#f3f3f3), with exactly one element in
> saturated ultramarine blue (#2643d0). Flat, matte, print-like; no
> gradients, no gloss, no 3D rendering, no photography. Generous
> negative space, off-center composition.

## Exact values

`tokens.json` is the source of truth. The ones a mock or image prompt
needs most: surface `#fcfcfc` / `#121212`, wash `#f3f3f3` / `#1b1b1b`,
ink `#151515` / `#ededed`, line `#e9e9e9` / `#262626`, accent
`#2643d0` / `#8c9eff`, type Geist + Geist Mono.
