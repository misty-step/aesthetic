# Lab 004 lane contract

## Fence

Evolve Misty Step's complete design system, staying recognizably close to current Aesthetic while improving elegance, clarity, delight, and component craft.

Fixed:

- React authoring, shadcn open-code registry, Base UI behavior.
- Geist + Geist Mono only; near-black ink on paper-white, equal dark mode.
- Square geometry (`0px` radius), hairline structure, restrained or sanctioned depth only.
- Mobile-first at 390px, no horizontal body overflow.
- Glyph-led status, compact mono metadata, motion only as feedback.
- Shared neutral gallery: foundations, typography, button laboratory, 16 components, 10 states, motion, four compositions, four product dialects.
- The product must feel like an evolved Misty Step instrument, not a new unrelated brand.

Round seeds: Quiet Ledger, Field Notes, Quiet Atelier, Signal Loom, Signal Folio, Civic Instrument. Use these as evidence of operator taste, not as templates to clone.

Required repairs:

1. The system name is an unmistakable display header at 390 and desktop. It may use scale in this review specimen, but must remain disciplined and technical.
2. Buttons are the primary design problem. Every proposal defines a complete square button family that clearly separates action from navigation and looks intentional in primary, secondary, ghost, destructive, icon, loading, disabled, hover, focus, and pressed states.
3. No generic rounded shadcn costume, colored pill status, oversized marketing hero, serif display face, or decorative gradient.

Dials: VARIANCE medium-low; MOTION minimal and purposeful; DENSITY medium-high with one calm and one dense composition.

## Output schema

Write one lane module only. Export `SPECS` as an object or a default array of exactly three complete objects:

```js
{
  id, title, family, move, essence, dna: [three strings],
  dials: { color, type, density, shape, imagery },
  layout: 'rail'|'top'|'split'|'atlas'|'canvas'|'ledger',
  componentLayout: 'grid'|'bento'|'ledger'|'strips',
  button: {
    grammar, height, padding, weight,
    primary, secondary, ghost, destructive,
    focus, pressed, loading
  },
  tokens: {
    fontDisplay, fontBody, fontMono,
    radiusSm:'0px', radiusMd:'0px', radiusLg:'0px',
    border, shadow, space, control,
    light:{ canvas,surface,raised,ink,muted,line,accent,accentInk,success,warning,danger },
    dark:{ same keys }
  },
  products: {
    canary:{accent,secondary,note}, powder:{...}, crucible:{...}, landmark:{...}
  },
  css
}
```

The three proposals must be structurally distinct whole systems, not palette swaps. Product dialects must vary at least three of density, typography ratio, geometry/cadence, composition, imagery, and motion beyond hue. Candidate CSS may target only renderer hooks listed below.

## Renderer hooks

`.future-root`, `.future-hero`, `.future-nav`, `.future-section`, `.section-heading`, `.component-gallery`, `.component-card`, `.specimen`, `.button-lab`, `.button-board`, `.btn`, `.lab-button`, `.btn.primary`, `.btn.secondary`, `.btn.ghost`, `.btn.danger`, `.btn.icon-btn`, `.state-grid`, `.motion-grid`, `.composition-grid`, `.product-grid`, `.product-card`, `.product-canary`, `.product-powder`, `.product-crucible`, `.product-landmark`, `.token-swatch`, `.type-display`, `.type-title`, `.type-body`, `.table`.

Verify syntax, exact IDs, full token shape, square radii, Geist-only fonts, complete button object, and four products. Do not inspect any other lane file.
