# Lab 006 — adoption catalog: the established aesthetic on shadcn/Base UI

Direction change from labs 003–005: no more futures. The established
identity is held fixed — `tokens.json` verbatim, DESIGN.md law — and
the lab catalogs the _ways to adopt_ shadcn (whose foundation is now
Base UI, `@base-ui/react`) as the substrate, so the behavior layer
comes for free. Substrate strategies, not redesigns.

## The catalog

`index.html` is the shell: five lanes in a rail, the same two real
`mistystep.io` pages (Studio offer, Work registry) plus the five-state
status plate rendered per lane. Full lane briefs and the comparison
matrix: **[ADOPTION.md](./ADOPTION.md)**.

- **A — Theme mapping** (`a.html`): stock shadcn, identity entirely in
  CSS variables. One component edit (dialog overlay blur).
- **B — Registry reskin** (`b.html`): owned component copies with the
  aesthetic idiom in the code — ink buttons, `.ae-nav` tabs, panel
  dialog, hairline slips.
- **C — aesthetic.css native** (`c.html`): the shipped CSS file is the
  whole styling layer; Base UI replaces `recipes.js`. `c/glue.css` is
  the countable cost.
- **D — Floating-surface hybrid** (`d.html`): aesthetic.css pages,
  stock shadcn floats; one toggle drives both theme systems.
- **E — Registry distribution**: strategy card in ADOPTION.md; ships
  any of the above via our own shadcn registry (backlog 019).

## The shared theme layer (lanes A/B/D)

`src/index.css` maps the identity onto shadcn's variables:

1. Palette → `tokens.json` verbatim, both modes; the aesthetic accent
   rides `--primary`/`--ring` (shadcn's `--accent` is its hover-wash
   slot).
2. `--radius: 0` — every derived radius collapses.
3. Type-scale clamp: `--text-xs` → 13px chrome register;
   `--text-sm/base/lg` → 16px. Stock components land on the one-size
   law without edits.
4. Weight snap: `medium`/`semibold` → 550, `bold` → 800.
5. Geist + Geist Mono self-hosted via fontsource.
6. Accent dial: `[data-accent]` themes repoint `--primary`/`--ring`
   (lanes C/D use the kit's own `data-ae-theme`).
7. Base layer: cursor law, viewport law, reduced-motion-instant.

## Verification

```sh
cd explorations/lab-006 && npm install && npm run build
cd ../.. && node explorations/lab-006/verify.mjs
```

32 cases (4 lanes × studio/work × light/dark × 390/1440) gate: no page
scroll either axis, radius 0, only 16px/13px font sizes, console
cleanliness — plus, per lane, the live dialog focus trap, Escape, and
the accent-dial readback; plus the catalog shell itself. Screens land
in `evidence/screens/`, machine results in
`evidence/verification.json`.

## Standing caveats

- `tw-animate-css` powers open/close fades in the Tailwind lanes —
  feedback motion, brief; the reduced-motion clamp makes it instant.
- Lane A's segmented `TabsList` is the one surface that reads more
  shadcn than aesthetic; it stays because stock-wearing-the-theme is
  that lane's premise (lane B shows the owned alternative).
- LAB convention: local only, never deployed, never graduates by copy.
  A locked lane's adoption path is its theme block / owned components /
  glue landing in consumer repos — not this prototype shipping.
