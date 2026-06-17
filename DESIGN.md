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
- The accent is the consumer's: define your accent (your color
  scheme) and use it with judgment. The system carries any hue
  without losing its identity — ink, hairlines, type, and motion do
  the identifying. There is no counting rule and no placement rule;
  there is taste: spend the accent where it earns its place — buttons,
  active states, anywhere the product calls for it — and keep it from
  becoming ambient filler. Restraint is judgment, never law.
- Screens, not pages: every view fits the viewport. Long documents
  scroll inside the stage; the chrome never moves.
- Motion is feedback, never decoration: small, brief, eased. State
  resolutions are gentler (480ms) and resolve exactly once — success
  persists, it is never rewound. Nothing changes size while it
  animates. Reduced motion makes everything instant.
- Buttons are not links: links are inked text that navigates; buttons
  are contained ink shapes that act. They never share a costume.
- Status rides the glyph: danger, success, and warning color the icon
  (✕ ✓ !), never the sentence, never a filled pill.
- Light and dark are equals, defaulting to the system preference. The
  change itself is one soft 700ms breath (view transition).

## The volume knob

Steering has two strata. **Invariants** are never steered: one size
per surface (+ the 13px chrome register), nine ink-and-weight
registers, hairlines and radius 0, motion as feedback that resolves
once, status on the glyph, buttons are not links, the cursor law,
light and dark as equals. **Dials** are the project's: the accent —
one hue or several, extra hues named as project tokens
(`--sploot-coral`) and spent on content, never on pills or hierarchy;
the status triplet; density (measure, chrome register, app shell);
the mono ratio. A calm tool turns every dial down; a loud one turns
up hue count and accent frequency — never radius, size scale, or
ambient motion. Worked examples: `docs/ADOPTING.md`.

## Never

- No drop shadows as decoration (the panel/dialog/toast soft depth is
  the lone sanctioned family), no gradients-as-paint, no
  glassmorphism.
- No rounded corners. Radius is 0 everywhere.
- No filled colored pills or badges: status color rides glyphs and
  words, never boxes.
- No font-size hierarchy, no oversized hero type.
- No ambient or looping animation; nothing moves unprompted.
- No link-styled buttons or button-styled links.
- No I-beam cursor on static text; pointer and text cursors are
  earned by interactive elements only.
- No stock photography, glossy 3D renders, or emoji-as-interface.

## Composing a view

1. Decide how this surface uses its accent and apply it consistently;
   the hierarchy itself is built from ink, not color.
2. Build hierarchy with registers: 800 ink for the one loud thing,
   550 for items that matter, 400 for prose; muted for support, faint
   for whispers.
3. Structure with whitespace and hairlines (`--ae-line`), never with
   boxes around boxes.
4. Forms are lines, not boxes; submission gets a send moment that
   resolves once and persists. Choice controls keep progressive
   disclosure: settings rest as label · value rows that fold open a
   quiet chooser (`.ae-settings`).
5. A decision is asked in the panel costume (`.ae-dialog`); a menu
   floats as a hairline slip (`.ae-pop`); news waits at the edge
   (`.ae-toast`); hints whisper (`[data-ae-tip]`); tables are 13px
   mono instruments framed as numbered plates (`.ae-table`,
   `.ae-plate`); view swaps are a simple cut.
6. Choice marks are squares — checkbox fills with ink, radio holds an
   ink core, the switch slides along a hairline channel
   (`.ae-choice`). A badge is a mono word (`.ae-tag`), never a filled
   pill. Waiting is still wash (`.ae-skeleton`), never a shimmer.
7. Data is drawn in ink: gauges are ruled lines (`.ae-meter`), figures
   are tabular numerals (`.ae-num`, loud by weight via `.ae-strong`),
   deltas put the hue on the arrow (`.ae-delta`), trends are pen
   strokes (`.ae-spark`), an interval is a level and its spread
   (`.ae-ci` — a range band, a mean tick, hover for the exact figures),
   and a field is a plane (`.ae-plot` — cost against quality, the
   Pareto frontier dashed, the pick in accent), and a system is a
   diagram (`.ae-flow` — hairline nodes, orthogonal wires, the running
   stage in accent).
8. Three archetypes beyond the screen: the app shell (`.ae-shell` —
   a 13px rail beside the working desk), the document (`.ae-doc` —
   markdown drops in unclassed), and the form flow (settings rows,
   choice marks, one send moment).
9. The canonical markup for every primitive is in `site/` —
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
