# Lab 006 — the adoption catalog

One identity, five ways to marry it to shadcn/Base UI. Content and
tokens are held fixed (`tokens.json` verbatim, DESIGN.md law); only the
substrate strategy varies. Lanes A–D are rendered side by side in the
catalog shell (`index.html`); lane E is a distribution strategy, not a
surface. All lanes pass the same law gates in `verify.mjs`.

## The lanes

### A — Theme mapping

Stock shadcn components; the identity lives entirely in CSS variables
(`src/index.css`). One component edit total (dialog overlay blur —
glassmorphism law).

- **Owns:** nothing but a theme block.
- **Gets free:** every future registry component lands near-on-law
  automatically; upgrades are re-runs of `npx shadcn add`.
- **Costs:** the last 10% of idiom is out of reach — the segmented
  `TabsList` wash, accent-colored primary buttons. Stock components can
  only be as quiet as their classes allow.
- **Fits:** a new React app that wants the aesthetic mood with maximum
  velocity and minimum maintenance.

### B — Registry reskin

The same theme layer, but the five components are owned copies with the
aesthetic idiom baked into their code: ink-fill `.ae-button` shapes,
`.ae-nav` text tabs with the 2px ink indicator, the panel dialog over a
paper dim, hairline menu slips, chrome-register tips.

- **Owns:** the component code (the shadcn copy-paste contract working
  as designed).
- **Gets free:** Base UI behavior under fully bespoke skins.
- **Costs:** each owned component is now ours to maintain; new registry
  additions arrive stock and need the same reskin pass.
- **Fits:** a product that lives in React and wants the full idiom, not
  an approximation.

### C — aesthetic.css native

No Tailwind, no theme mapping. The shipped `aesthetic.css` is the whole
styling layer; Base UI primitives replace `recipes.js` as the behavior
layer, wearing the `.ae-*` costumes directly. `glue.css` is the entire
countable cost, and each rule is a finding:

- `dialog.ae-dialog` is element-qualified and leans on native `<dialog>`
  centering → the costume is restated for Base UI's div anatomy
  (`.aeb-dialog`, `.aeb-backdrop`).
- `.ae-pop` assumes the native popover top layer → restated minus
  positioning (`.aeb-pop`).
- `[data-ae-tip]` is a CSS-only `::after` → restated as a real element
  class (`.aeb-tip`).
- Base UI triggers render real `<button>`s; without a preflight the UA
  chrome leaks → `button.ae-status` undress rule.
- fontsource registers `'Geist Variable'`; the kit asks for `'Geist'` →
  two font-variable overrides.
- **Fits:** consumers already on the kit who want React + accessible
  behavior without adopting Tailwind; also the clearest statement that
  the CSS file remains the product.

### D — Floating-surface hybrid

Pages wear `aesthetic.css` exactly as lane C; every floating surface
(dialog, menu, tooltip) is the stock shadcn component from lane A. One
toggle drives both theme systems (`.dark` is shared; the accent dial
sets `data-ae-theme` for the page and `data-accent` for the floats).
Coexistence warts found and countable in `d/glue.css`:

- Tailwind preflight strips the prose margins the kit's rhythm assumes.
- The kit's content-link underline bleeds into shadcn buttons rendered
  as anchors — "buttons are not links" violated at the seam.
- **Fits:** existing aesthetic.css consumers who want the Base UI
  behavior layer incrementally, without re-clothing pages.

### E — Registry distribution (strategy, not a surface)

The aesthetic publishes its own shadcn-compatible registry: consumers
run `npx shadcn add https://aesthetic.mistystep.io/r/<item>.json` and
own the code from there. Backlog 019 already ships the per-primitive
data tier; this lane adds lane-B-style React components as registry
items on top of it. Any of lanes A–D can be _delivered_ this way — E is
the distribution axis, orthogonal to the styling axis.

## The matrix

|                        | A theme-map   | B reskin      | C native         | D hybrid                |
| ---------------------- | ------------- | ------------- | ---------------- | ----------------------- |
| Styling layer          | Tailwind vars | Tailwind vars | aesthetic.css    | both                    |
| Component code owned   | none          | 5 files       | none (glue only) | none                    |
| Idiom fidelity         | ~90%          | full          | full             | full pages, ~90% floats |
| shadcn upgrades        | free          | re-skin pass  | n/a              | floats free             |
| Tailwind required      | yes           | yes           | no               | yes                     |
| aesthetic.css shipped  | no            | no            | yes              | yes                     |
| Glue/edit cost         | 1 edit        | 5 owned files | ~60 lines glue   | ~10 lines glue          |
| Law gates (verify.mjs) | pass          | pass          | pass             | pass                    |

## What every lane gets from Base UI, verified

Dialog focus trap, Escape-to-close, focus return, aria wiring; tooltip
positioning and delay-grouping; menu keyboard navigation and
radio-group semantics; tabs arrow-key navigation. Exercised live per
lane in `verify.mjs`, not assumed.

## Reading the catalog

```sh
cd explorations/lab-006 && npm install && npm run build
npx vite preview        # or: cd ../.. && node explorations/lab-006/verify.mjs
```

Open the preview root for the shell: lanes in the left rail, viewport
presets top right, mode toggled inside each lane's own footer.
Evidence: `evidence/screens/` (32 law cases + dialog/accent exercises +
the shell), `evidence/verification.json`.
