# Lab 006 — the established aesthetic on shadcn/Base UI

Direction change from labs 003–005: no more futures. Those labs fanned
blind philosophy lanes and drifted the palette; this pass holds the
established identity fixed — `tokens.json` verbatim, DESIGN.md law —
and makes exactly one move: the substrate becomes React + shadcn
(whose foundation is now Base UI, `@base-ui/react`), so the behavior
layer comes for free. A substrate switch, not a redesign.

## What it is

The two real `mistystep.io` pages (Studio offer, Work registry) plus
the five-state fleet status plate, rebuilt from stock shadcn
components: Button, Dialog, DropdownMenu, Tabs, Tooltip, Separator.
Scaffolded with `npx shadcn init -b base -p nova` (Nova preset =
Lucide/Geist, already our stack).

## The delta ledger — everything that isn't stock

**Theme layer (`src/index.css`), where the whole identity lives:**

1. Palette → `tokens.json` verbatim (surface/wash/ink/ink-muted/line/
   accent/ok/warn/err, both modes). The aesthetic accent rides
   `--primary` and `--ring`; shadcn's `--accent` is its hover-wash
   slot, not ours. `--chart-*` left stock (unused).
2. `--radius: 0` — every derived radius step collapses with it.
3. Type-scale clamp: `--text-xs` → 13px (the chrome register);
   `--text-sm/base/lg` → 16px. Stock components land on the
   one-size law without edits.
4. Weight snap: `medium`/`semibold` → 550, `bold` → 800 — the nine
   registers survive Tailwind's names.
5. `--font-mono` → Geist Mono Variable (fontsource, self-hosted).
6. The accent dial: `[data-accent]` themes for ultramarine / moss /
   ember / violet repoint `--primary`/`--ring`, per DESIGN.md's
   "the accent is the consumer's."
7. Base layer: cursor law (`body { cursor: default }`), viewport law
   (`html, body, #root` never scroll; long content scrolls inside the
   stage), reduced-motion-instant.

**Component edits: one.** `dialog.tsx` overlay drops
`backdrop-blur-xs` (glassmorphism is on the Never list) for a plain
`bg-black/25` scrim. Everything else in `src/components/ui/` is what
the registry shipped, untouched except repo-wide Prettier formatting.

## What Base UI buys for free

Verified live in `verify.mjs`, not assumed: dialog focus trap, Escape
to close, focus return, aria wiring; tooltip positioning and provider
delay-grouping; menu keyboard navigation and radio-group semantics
(the accent dial); tabs arrow-key navigation with correct roles. None
of this exists in the zero-build `recipes/` layer without hand
maintenance.

## Verification

```sh
cd explorations/lab-006 && npm install && npm run build
cd ../.. && node explorations/lab-006/verify.mjs
```

Eight cases (studio/work × light/dark × 390/1440) gate: no page
scroll either axis, radius 0 everywhere, only 16px/13px font sizes,
console cleanliness; plus live dialog trap/escape and the accent
dial readback. Screens land in `evidence/screens/`, machine results
in `evidence/verification.json`.

## Standing caveats

- `tw-animate-css` powers open/close fades — feedback motion, brief,
  and the reduced-motion clamp makes it instant; ambient motion stays
  impossible because nothing animates unprompted.
- The stock `TabsList` segmented wash is the one surface that reads
  more shadcn than aesthetic; it stays because it is stock behavior
  wearing the theme, which is the experiment.
- LAB convention: local only, never deployed, never graduates by
  copy. If the direction locks, the adoption path is the theme block
  above landing in consumer repos that already run shadcn — not this
  prototype shipping.
