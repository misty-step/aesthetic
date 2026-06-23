# aesthetic

The Misty Step design system. One CSS file: tokens, base styles, and a
small set of primitives. Import it and the project looks like ours.

Live at [aesthetic.mistystep.io](https://aesthetic.mistystep.io/) —
the system demonstrating itself: every primitive on the page is the
stylesheet, unmodified.

## Why

- **Consistent.** Every project that imports it shares the same surfaces,
  type, spacing, and discipline. No per-project CSS archaeology.
- **Tiny.** A single stylesheet, no build step required, no JavaScript.
- **Opinionated.** One font size everywhere (hierarchy comes from ink and
  weight), viewport-sized screens instead of scrolling pages, motion only
  as feedback, status on the glyph instead of colored pills.
- **Steerable.** The accent is yours: downstream projects define their
  scheme (`--ae-accent` / `--ae-accent-dark`, and the status triplet when
  the domain needs it) and use it with judgment — identity comes from
  ink, hairlines, type, and motion, not from a color-counting rule.

## Install

With a package manager:

```bash
pnpm add github:misty-step/aesthetic#v2.7.0
```

```css
/* plain CSS */
@import '@misty-step/aesthetic';

/* Tailwind v4: import into the base layer so utilities stay composable */
@import '@misty-step/aesthetic' layer(base);
```

Without a build step:

```html
<link
  rel="stylesheet"
  href="https://cdn.jsdelivr.net/gh/misty-step/aesthetic@v2.7.0/aesthetic.css"
/>
```

Or through the registry — no npm account on either side:

```bash
npx shadcn@latest add https://aesthetic.mistystep.io/r/aesthetic.json
```

The full adoption guide — Geist wiring, the mode boot, the Tailwind v4
bridge, steering blocks, recipes — is
[docs/ADOPTING.md](docs/ADOPTING.md).

Load Geist and Geist Mono however your stack prefers (Google Fonts,
`next/font`, self-hosted). If the family comes through a variable, point
the kit at it:

```css
:root {
  --ae-font: var(--font-geist), 'Helvetica Neue', sans-serif;
  --ae-font-mono: var(--font-geist-mono), ui-monospace, monospace;
}
```

## Layout

Pages are screens, not scrolls. Compose:

```html
<div class="ae-screen">
  <header class="ae-bar">
    <a class="ae-name" href="/">NAME</a>
    <nav class="ae-nav">…view buttons…</nav>
    <button class="ae-mode" aria-label="toggle color mode">
      <svg class="ae-icon ae-sun">…sun…</svg>
      <svg class="ae-icon ae-moon">…moon…</svg>
    </button>
  </header>
  <main class="ae-stage">
    <div class="ae-view">…one screenful of content…</div>
  </main>
  <footer class="ae-bar"><p class="ae-dim">…</p></footer>
</div>
```

`.ae-screen` is exactly one viewport tall and never scrolls. If content
cannot fit one screen, split it into views and swap them with `.ae-nav`
(remounting `.ae-view` replays its entrance). For genuinely long
documents (legal pages), use `.ae-stage-scroll`: the document scrolls
inside the stage, the chrome stays put.

Two more archetypes compose from the same parts:

- **The app shell** (`.ae-shell` > `.ae-rail` + `.ae-desk`): one
  viewport, hairline-divided — a 13px rail for places (group headings,
  links, an `.ae-rail-foot` pinned to the bottom for the mode toggle),
  a desk for the work. The desk scrolls inside itself.
- **The document** (`.ae-doc`): long-form prose where rendered
  markdown drops in unclassed — headings are weight, never size;
  rules are hairlines; quotes are inset. Put the article in a
  scrolling stage or a desk.

## Modes

Light and dark ship together and default to the system preference. A
toggle sets `.dark` / `.light` (next-themes compatible) or
`data-ae-mode="dark|light"` on the root element; style the control with
`.ae-mode`.

## Steering

Define your scheme to give a project its personality:

```css
:root {
  --ae-accent: #0e7a4d;
  --ae-accent-dark: #6fd2a8;
  /* and, when the domain needs different status hues:
     --ae-ok / --ae-warn / --ae-err (+ their -dark pairs) */
}
```

Use the accent wherever judgment says — there is no counting rule.
Everything else is the shared identity. The doctrine has two strata:
**invariants** (one size + the chrome register, nine registers,
hairlines, radius 0, motion as feedback, status on the glyph, buttons
are not links, the cursor law) are never steered; **dials** (the
accent — one hue or several, extra hues as project tokens spent on
content; the status triplet; density; the mono ratio) are yours. A
loud project turns up hue count and accent frequency — never radius,
size scale, or ambient motion. Worked steering blocks for every
misty-step consumer: [docs/ADOPTING.md](docs/ADOPTING.md); rendered
side by side: the site's steering page.

## Status

Status rides the glyph: color the icon (`✕ ✓ !` as Lucide strokes),
never the sentence, never a filled pill.

```html
<p><svg class="ae-icon ae-err">…x…</svg> Not a valid address.</p>
<p><svg class="ae-icon ae-ok">…check…</svg> Deploy complete.</p>
<p><svg class="ae-icon ae-warn">…triangle…</svg> Certificate expires soon.</p>
```

`--ae-ok` / `--ae-warn` / `--ae-err` pass AA on both surfaces and are
steerable per project.

## Dialogs

A decision is asked in the panel costume, in the top layer:
`<dialog class="ae-dialog">` + `showModal()`. Soft depth over a whisper
of paper dim; `.ae-dialog-title` and `.ae-dialog-acts` (quiet cancel,
solid confirm) complete the shape. Escape declines.

## Data

Tables are instruments: `.ae-table` is 13px mono with lowercase headers
on a wash band and hairline row rules. A column header always shares its
column's alignment (`.num` on the `th` and its `td`s). Frame a table as
a numbered figure with `.ae-plate` + `.ae-plate-cap` ("TABLE 1 · …") +
`.ae-plate-note`.

## Settings rows

Choice controls keep progressive disclosure: each setting rests as one
hairline row (`.ae-settings` > `.ae-setting` button with an
`.ae-setting-val`), and activating it folds open an `.ae-setting-panel`
holding an `.ae-menu` of options — the same quiet list answers selects
of any length. Behavior glue lives in `recipes/settings.js`.

## Input anticipation

Opt-in (`<form data-ae-anticipate>`): the nearest field's label and line
warm toward ink as the pointer approaches — color only, capped at 60%,
mouse-only, instant off under reduced motion. Focus always snaps to the
committed state. The driver lives in `recipes/anticipate.js`.

## Choice marks

Squares, since radius is 0 everywhere — a circle would be the only
curve in the system, so there isn't one. The checkbox (`.ae-check`)
fills with ink and draws its check in surface; the radio (`.ae-radio`)
holds an ink core; the switch (`.ae-switch`) slides an ink thumb along
a hairline channel — state reads from position and fill, never from a
green pill. Wrap each control and its words in a `.ae-choice` label.

Validation keeps the status law: set `aria-invalid="true"` and the
field's own line confesses in the danger hue; the message rides an
`.ae-field-note` whose glyph carries the color while the sentence
stays ink.

## Tags, tips, and toasts

- **The tag** (`.ae-tag`) is the badge, refused: a mono word in the
  plate-caption voice, hairline at most, never a filled pill. Status
  joins as a glyph beside the word. `.ae-tag-bare` drops the hairline.
- **The tip** (`data-ae-tip="…"`) is a whisper that answers hover —
  chrome-register words in a hairline slip, pure CSS, patient on
  hover and instant on focus.
- **The popover** (`.ae-pop`) is a slip of surface anchored to its
  invoker; the native `popover` attribute owns the top layer and
  light dismiss, `recipes/pop.js` does the geometry. A popover holding
  only an `.ae-menu` collapses its padding.
- **The toast** (`.ae-toast`, stacked in `.ae-toasts`) arrives at the
  edge and waits to be read — it persists until dismissed or pushed
  out, never an anxious timer by default. `recipes/toast.js` ships
  `aeToast('Saved.', { status: 'ok' })`.

## Tabs, folds, and crumbs

`.ae-tabs` is the nav instrument pointed at panels: same quiet words,
same sliding underline, `aria-selected` marks the open one. `.ae-fold`
is disclosure as a hairline row — native `<details>` in the settings
costume, the mono plus quarter-turning into a close. `.ae-crumbs` is
the path in the chrome register: here is ink, the way back is muted,
separators are faint.

## Waiting and absence

Waiting is still wash, never a shimmer (`.ae-skeleton` holds the
layout; the words go to a chrome-register `role="status"` line) —
motion is feedback and waiting is not an action. Absence is an honest
sentence (`.ae-empty`): muted words and one quiet action, no
illustration party. Indeterminate spinners are refused for the same
reason; ongoing work is a status line.

## Instruments

Data is drawn in ink. `.ae-meter` is a gauge as a ruled line — wash
channel, ink fill, hairline threshold ticks (`.ae-meter-mark`); the
fill takes a status ink only when the level is the signal. `.ae-num`
sets tabular numerals that tick without jitter; the hero figure is
`.ae-strong` (weight 800) and isolated — never larger. `.ae-delta`
puts the status hue on the arrow while the figure stays ink;
`.ae-spark` is a pen-stroke trend, no axes, no area fill.

## Behavior (recipes)

Every JS-implying primitive has one canonical, dependency-free recipe
in [`recipes/`](recipes/): `mode.js`, `nav.js`, `views.js`, `send.js`
(announces the resolved state to screen readers via an `.ae-sr` live
region), `settings.js`, `anticipate.js`, `toast.js`, `pop.js`
(geometry + roving tabindex for `.ae-menu`), `dialog.js` (focus trap,
focus restoration, `aria-labelledby` wiring) — and `recipes.js`, the
combined file the site itself runs. Load it without a build step from
jsDelivr, copy the singles into your project, or port them to your
framework; they are documentation that happens to execute.

## Primitives

| Class                                                   | Role                                                                                         |
| ------------------------------------------------------- | -------------------------------------------------------------------------------------------- |
| `.ae-screen` / `.ae-bar` / `.ae-stage`                  | Viewport shell: chrome bars and a centered stage                                             |
| `.ae-wide`                                              | Screen modifier: the 68rem measure for catalog, specimen, and dashboard shapes               |
| `.ae-stage-scroll`                                      | Inner scroll for long documents; the page still never scrolls                                |
| `.ae-view`                                              | One screenful of content with a quiet entrance                                               |
| `.ae-nav` + `.ae-nav-ind`                               | View switcher with a sliding ink underline (the site positions the indicator on view change) |
| `.ae-row-link`                                          | List rows where the whole row is the link (kills cursor strobing between rows)               |
| `.ae-chrome` / `.ae-foot`                               | The 13px chrome register; hairline-topped two-end footer                                     |
| `.ae-icon`                                              | Lucide icon sizing: 1.5px stroke, round caps, rides with text                                |
| `.ae-mode`                                              | Icon mode toggle: sun/moon rotate-crossfade                                                  |
| `.ae-panel`                                             | Soft depth for dense content: light shadow in light mode, wash in dark, radius 0             |
| `.ae-name`                                              | The name: weight 800, letterspaced, never large                                              |
| `.ae-lede`                                              | The argument, plainly                                                                        |
| `.ae-group` / `.ae-h`                                   | A section and its muted heading                                                              |
| `.ae-item` / `.ae-dim`                                  | Medium ink / muted ink                                                                       |
| `.ae-accent`                                            | The accent: yours to define and spend with judgment                                          |
| `.ae-ok` / `.ae-warn` / `.ae-err`                       | Status inks for glyphs: the icon carries the hue, the word stays ink                         |
| `.ae-label` / `.ae-input`                               | Form fields as lines, not boxes                                                              |
| `.ae-button` / `.ae-button-quiet`                       | Buttons are not links: solid ink primary, hairline secondary                                 |
| `.ae-send`                                              | The send moment: label resolves to "Sent ✓" once, then the button rests disabled             |
| `.ae-dialog`                                            | The decision panel: `<dialog>` in the panel costume over a paper-dim backdrop                |
| `.ae-table` / `.ae-plate`                               | The data instrument: 13px mono, wash header band; framed as a numbered figure                |
| `.ae-settings` / `.ae-menu`                             | Settings rows that open: label · value lines unfolding a quiet chooser                       |
| `[data-ae-anticipate]`                                  | Opt-in input anticipation: the nearest field warms as the pointer nears                      |
| `.ae-choice` / `.ae-check` / `.ae-radio` / `.ae-switch` | Choice marks: ink-filled squares and a hairline-channel slide                                |
| `.ae-field-note` + `[aria-invalid]`                     | Validation: the line confesses, the glyph carries the hue, words stay ink                    |
| `.ae-button-compact`                                    | The chrome-register button scale for toolbars, rows, and rails                               |
| `.ae-tabs`                                              | The nav instrument pointed at panels; `aria-selected` marks the open one                     |
| `.ae-tag` / `.ae-tag-bare`                              | The badge, refused: a mono word, hairline at most, never a filled pill                       |
| `[data-ae-tip]`                                         | The tip: chrome-register whisper on hover/focus, pure CSS                                    |
| `.ae-pop`                                               | The popover slip: native `popover` + `recipes/pop.js` geometry                               |
| `.ae-toasts` / `.ae-toast`                              | News at the edge: persists until dismissed, status on the glyph                              |
| `.ae-fold`                                              | Disclosure as a hairline row: native `<details>`, mono plus turns to close                   |
| `.ae-crumbs`                                            | The path in the chrome register: here is ink, the way back muted                             |
| `.ae-skeleton` / `.ae-empty`                            | Waiting as still wash (no shimmer); absence as an honest sentence                            |
| `.ae-meter` / `.ae-meter-mark`                          | The gauge as a ruled line: wash channel, ink fill, hairline ticks                            |
| `.ae-num` / `.ae-strong` / `.ae-delta` / `.ae-spark`    | Tabular figures, the 800 register, glyph-borne deltas, pen-stroke trends                     |
| `.ae-shell` / `.ae-rail` / `.ae-desk`                   | The app shell: a 13px rail for places beside the working desk                                |
| `.ae-doc`                                               | The document: rendered markdown drops in unclassed                                           |
| `.ae-sr`                                                | Present to assistive tech, invisible on paper                                                |

## Cursor law

Static text never shows the I-beam (`body { cursor: default }`); the
pointer appears only on interactive elements, and the text cursor only in
inputs. In lists, use `.ae-row-link` so the cursor never strobes across
dead bands between rows.

## Link treatment

Locked: ink at rest with a faint underline, warming to the accent on
hover. Approved alternates, kept here so changing is one decision away:

- **Marker sweep** — a wash highlight eases across the link
  (`background-image` gradient, `background-size 0% → 100%`).
- **Draw on hover** — no underline at rest (weight 550 marks the link),
  a 1px underline draws left-to-right on hover.

## Buttons and the send moment

Links navigate; buttons act — they never share a costume. `.ae-button` is
the solid-ink primary, `.ae-button-quiet` the hairline secondary; both are
contained shapes with radius 0 and a small press.

State resolutions run at `--ae-gentle` (480ms) — slower than feedback,
never abrupt — and resolve exactly once: success persists and the control
disables; it is never rewound. Nothing changes size while it animates, and
status icons sit after the word ("Sent ✓"). The shipped choreography:

```html
<button class="ae-button ae-send">
  <span class="ae-send-label">Send message</span>
  <span class="ae-send-done" aria-hidden="true"
    >Sent <svg class="ae-icon">…check…</svg></span
  >
</button>
<!-- on success: button.classList.add('is-sent'); button.disabled = true -->
```

Forms stay naked on the stage: a couple of line fields need no panel.
Reserve `.ae-panel` for genuinely dense content.

## Icons

Lucide (ISC), inlined as SVG `<symbol>` sprites per site, styled by
`.ae-icon`. Ubiquitous but clean; revisit if a more distinct voice is
worth the trade later.

## Versioning

Semver, tagged. Consumers pin a tag and upgrade deliberately.
