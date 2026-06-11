# The image language

How aesthetic surfaces get artwork. Two rules above all: **code first,
generation second**, and **one aesthetic everywhere**.

## The DNA (from the operator's mood board, 2026-06)

Technical drawing meets engraving. Every reference shares:

- **Ink line on quiet ground.** Hairline strokes, stipple, cross-hatch,
  halftone and dither fields — never gradients-as-paint, never glossy 3D,
  never stock photography.
- **The diagram register.** Exploded views, leader lines, mono-type
  annotations, figure numbers. Images that explain something, or
  pretend to.
- **Particle and constellation fields.** Forms dissolving into dots and
  connected points; the space between structure and scatter.
- **Classical-meets-technical.** Engraved figures and radiating line
  fields are in bounds when treated as ink on the working ground.
- **One working color.** Monochrome ink plus at most one saturated
  accent — ours is the kit accent (#2643d0 / #8c9eff) — or a full
  ultramarine ground with white ink as the inversion.

## Code first

Prefer **live, code-rendered art** (SVG or canvas) over generated
rasters: it inherits the kit's tokens (ink, wash, accent, both modes),
costs nothing to regenerate, and can move. Motion rules follow the kit
law — feedback-gentle, slow (20s+ drifts), never aggressive, and frozen
to a static frame under `prefers-reduced-motion`.

The working vocabulary of plates (see lab implementations):

- `constellation` — drifting points, hairline links by proximity, one
  accent node
- `stipple` — dot-density forms with a barely perceptible shimmer
- `rays` — radiating hairlines from an origin, near-still rotation
- `halftone` — a dot grid breathed through by a slow wave
- static plates — arcs, fields, orbits, stacks for small slots

## Generation (gpt-image-2), when raster art earns its place

Use OpenAI's image models for hero artwork the code vocabulary can't
reach (figurative, engraved, photographic-grain). Practices that hold
(per OpenAI's image-gen prompting guide, 2026):

- Keep **one canonical style block** and repeat it verbatim across every
  image in a series; vary only the subject clause.
- Structure the prompt: subject → style → palette → composition →
  texture → negative space. Structured prompts beat prose for series
  consistency.
- For strict series consistency, pass a previous accepted image as a
  **style reference** and ask for style transfer onto the new subject.
- Generate flat, exact hex backgrounds so rasters sit seamlessly on
  `--ae-surface` / `--ae-wash`; request generous negative space so the
  layout, not the image, decides the crop.

### The canonical style block

> Technical pen-and-ink illustration in the style of a vintage
> engineering manual: fine hairline linework, stipple and cross-hatch
> shading, halftone dot textures. Monochrome dark-gray ink (#3a3a3a) on
> an off-white ground (#f3f3f3), with exactly one element in saturated
> ultramarine blue (#2643d0). Flat, matte, print-like; no gradients, no
> gloss, no 3D rendering, no photography. Generous negative space,
> off-center composition.

### Articulations to steer with

1. **The diagram** — "…drawn as an annotated exploded diagram with
   leader lines and small monospaced labels, like a figure from a
   reference manual."
2. **The constellation** — "…a form dissolving into a field of stippled
   dots and fine connected lines, half structure, half scatter."
3. **The engraving** — "…rendered as a classical copperplate engraving,
   dense parallel hatching, set against radiating hairlines." For the
   inversion: white ink on a full ultramarine (#2643d0) ground.

### Dark mode

Generate the light-ground version, then a counterpart on #121212 with
ink #8f8f8f and accent #8c9eff — or keep rasters to light-mode slots
and let code-rendered plates (which adapt automatically) carry dark
mode.
