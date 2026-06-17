# The flexibility arc — from strong identity to world-class flexible

Priority: P1 · Status: in-progress · Estimate: XL

## Goal

aesthetic has world-class identity and a deliberately narrow application
surface. A full design evaluation (visual + architecture + external research)
found the system is "strict in the right places and silent in the channels
consumers actually need," so consumers escape the system and drift (rounded
cards, filled pills, multiple sizes — see 012). The fix is not less identity:
it is to **name and ship the variation channels** consumers currently hand-roll
— the Vignelli move (rigid about the band and grid, generous within the cell).

Three directions were prototyped and reviewed to a verdict in the LAB
(`prototypes/flex-*.html`, ROUND 4). This ticket carries the locked decisions
into the real product (`aesthetic.css`, `site/`, `tests/`, docs).

## The locked decisions (LAB verdicts)

- **Accent is not law.** Restraint is taste/judgment, never a counting or
  placement rule; the accent may ride buttons, active states, anywhere the
  product calls for it. (Shipped: `aesthetic.css` header/button comment,
  `DESIGN.md`. Still to sweep if any other surface implies otherwise.)
- **Density:** comfortable only. The compact/operator density dial was
  explored (flex-1) and dropped — not wanted.
- **Generative accent basis (flex-1):** an OKLCH ink ramp derived from a
  mode-set lightness pole + a steerable accent (L·C·H) is a promising
  _direction_ but remains a sketch — needs gamut-clamping and AA re-verification
  before it could replace the hand-tuned dark token block. Not committed yet.
- **Selected row (flex-2b):** F · PLAYHEAD — a full-height marker that animates
  once to the active row reads strongest in a dense arena. Ink by default;
  accent optional.
- **Evidence / inspector hierarchy (flex-2b):** A+B combined — a dominant
  header over hairline-ruled, aired sections that rest as a high-level contents
  and fold open to drill in (progressive disclosure). Ledger and accent-marker
  treatments rejected. An at-a-glance section summary is a consuming-app
  concern, not a system primitive.
- **Workbench archetype (flex-2):** the fourth archetype — a 3-pane shell
  (rail · tabbed desk · collapsible evidence inspector) with a compact toolbar
  and a sticky-thead scroll-table, all inside the viewport law (each pane
  scrolls itself; the page never does). Closes 012's headline ask.
- **Comparison matrix (flex-3b):** NUMERALS + WINNER is the default cell
  encoding — exact mono figure, status on a leading glyph, best-per-task in
  heavy weight, low scores lightened, **column headers right-aligned to match
  their numeric cells**. ACCENT-MARKS-THE-WINNER is shipped as an _exposed
  option_ for consumers (draw the eye to the per-task winner), not the default.
  Ink-heat / databar / dot-scale were rejected as too aggressive or noisy.
  (The reorder-by-difficulty lever is a nice-to-have.)

## Oracle

- [ ] Accent-not-law fully swept: no surface (`aesthetic.css`, `tokens.json`,
      `README.md`, `DESIGN.md`, `docs/ADOPTING.md`, `site/`) frames accent
      restraint or placement as a rule; the steering doctrine keeps it a dial.
- [ ] `.ae-workbench` (or equivalent) ships: a 3-pane shell built from the
      existing rail/desk vocabulary + a collapsible third pane, composing with
      `.ae-tabs` and a scroll-table that keeps a sticky `thead` while the page
      stays put. A `site/gauntlet/` page proves it in both modes from
      primitives alone (no inline-style escape hatches — the current
      `dashboard.html` needs 12 inline styles, the smell this fixes).
- [ ] A selected-row treatment (playhead) ships as a primitive + recipe glue,
      animating once, reduced-motion safe, keyboard-reachable.
- [ ] An evidence/inspector hierarchy is documented + demonstrated (dominant
      header, ruled/aired sections, progressive disclosure via `.ae-fold`).
- [ ] A comparison-matrix primitive ships: numerals + winner default,
      column-aligned headers, sticky header + sticky first column + horizontal
      scroll inside the viewport law; accent-winner exposed as an option. A
      site specimen proves it; status-on-glyph holds, no filled cells in the
      default.
- [ ] `tests/law.spec.ts` covers every new page (font sizes, radius 0, no page
      scroll, console clean, both modes).
- [ ] A "tag + status glyph" compound and the local/offline prototype import
      path (012's remaining oracle items) are documented.

## Foundation pass (table stakes underneath the above)

From the architecture audit — do first; each is law-respecting plumbing:

- [ ] Wrap `aesthetic.css` in `@layer aesthetic { … }` so consumer styles win
      predictably (no specificity wars; the documented override channel).
- [ ] Collapse the dark-mode token triplication (`@media` + `.dark` +
      `[data-ae-mode]`) to one assignment block driven from the `-dark` source
      vars, and drive component dark treatments off one `--ae-elevated-bg`
      token (removes the second, per-component duplication).
- [ ] Introduce a named `--ae-space-*` scale and refactor the ~46 ad-hoc `em`
      literals onto it (so dashboards/workbenches stop hand-rolling spacing).
- [ ] Add `--ae-z-*` tokens for the bare z-index literals (tooltip/toast).
- [ ] Ship a `dialog.js` recipe (initial focus, `aria-labelledby`, focus
      return) and arrow-key/roving-tabindex for `.ae-menu` in `pop.js`.
- [ ] `release.mjs`: replace only anchored version strings (not global
      `replaceAll`); guard `window.ae*` globals against double-inclusion.

## External validation (2026-06)

A `/research` sweep of the 2026 "LLM-safe design system" wave (Polar Orbit,
Builder.io, Atlassian DESIGN.md, Pandya, `stylelint-plugin-rhythmguard`)
independently confirms 013's premise: when an LLM is the author, prose rules
rot and the interface drifts toward "a thousand slightly different grays"
exactly where the system stays silent. Naming the channels (this ticket) is
the _positive_ fix; **epic 015** ships the _enforcement_ complement — the law
as a gate consumers run, not just prose they read. The foundation pass's
dark-token de-triplication doubles as the `light-dark()` modernization the
wave favors (Panda's automatic light/dark — it removes the "agent forgets
dark mode" bug class).

## Notes

The proof surfaces are the LAB files, each carrying its own VERDICT comment:
`flex-1-named-dials` (accent/mode dials), `flex-2-workbench` (the archetype),
`flex-2b-rows-evidence` (selected row + inspector), `flex-3-instrument-matrix`
and `flex-3b-matrix-encodings` (the cell language). Per repo law, these never
graduate by copy — the locked directions get rebuilt properly in `site/` and
`aesthetic.css`. Research catalog (Tufte · Bertin · Cleveland · Few ·
Vignelli) informed the matrix and the "name the channels" framing.

This is the system's own dogfood: if the canonical dashboard/workbench cannot
be built from primitives, no consumer can — that is the bar.
