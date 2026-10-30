import type { ColorOption } from '../../../src/contract';

// Strategy: Poppycock's lilac room, grape ink and one grape action. The colour of the poppycock face in Surfaces
// (src/surfaces/faces.ts); usable in the configurator like any palette. Its party colours (marigold, mint, coral)
// are decoration and live in the face, not here.
// Light is Poppycock's own palette at 904a8df (DESIGN.md frontmatter and app/globals.css), with three adjustments
// for this lab's guarantees (options/color/README.md): the white card is #fefcff because no surface here is pure
// #fff; ink-3 is new, the faint text floor between on-muted and the input border; fields are new, a lilac ramp
// toward the ink.
// Dark is a proposal: Poppycock ships a light theme only. The room turns to grape at night (L 0.18), its lilac
// becomes the ink, the action keeps grape's hue lifted to a light fill with night text, and focus stays blue so it
// never reads as a selection.
// contrast:begin (written by options/color/check.mjs --write; WCAG 2 ratios, 8-bit sRGB)
// light on bg, bg-2, bg-3: ink 13.30 14.54 12.35; ink-2 6.00 6.56 5.57; ink-3 5.31 5.80 4.93; accent-2 6.80 7.44 6.32
//       accent-ink on accent 7.59; accent on bg, bg-2, bg-3 6.80 7.44 6.32; line-2 on bg, bg-2 3.62 3.96; line 1.33 1.45 1.23; ink on selection 10.29
//       fields vs bg 1.08 1.18 1.27; ink on fields 12.32 11.27 10.44; ink-2 on fields 5.56 5.09 4.71; focus on bg, bg-2, bg-3, fields 5.23 5.72 4.85 4.84 4.43 4.10
// dark  on bg, bg-2, bg-3: ink 16.99 15.10 17.61; ink-2 10.69 9.51 11.09; ink-3 8.69 7.73 9.01; accent-2 9.87 8.78 10.23
//       accent-ink on accent 7.88; accent on bg, bg-2, bg-3 7.88 7.01 8.17; line-2 on bg, bg-2 4.74 4.21; line 1.43 1.27 1.48; ink on selection 7.66
//       fields vs bg 1.05 1.14 1.29; ink on fields 16.21 14.96 13.14; ink-2 on fields 10.21 9.42 8.27; focus on bg, bg-2, bg-3, fields 7.64 6.79 7.91 7.29 6.72 5.90
// flag: light: probe reads --accent as violet/indigo (HSL hue 262)
// flag: light: probe reads --accent-2 as violet/indigo (HSL hue 262)
// flag: dark: probe reads --accent as violet/indigo (HSL hue 256)
// flag: dark: probe reads --accent-2 as violet/indigo (HSL hue 254)
// contrast:end
export default {
  id: 'poppycock',
  layer: 'color',
  label: 'Poppycock (product face)',
  summary: 'Poppycock\'s party palette: a lilac room, grape ink and one grape action, with a blue focus ring that never reads as a selection. The night theme is a proposal; the game ships a light one.',
  origin: 'new',
  refs: [
    { name: 'Poppycock DESIGN.md', url: 'https://github.com/misty-step/poppycock/blob/904a8df433b9684dd749e5ba81b865f928c67e68/DESIGN.md', what: 'Colour roles: grape #6537B5 anchors the one primary action, party lilac #F6F0FF is the room, white paper carries content, on-muted #67566F is muted text, input #887992 bounds fields and focus #0F62C8 is blue on purpose.' },
    { name: 'Poppycock globals.css', url: 'https://github.com/misty-step/poppycock/blob/904a8df433b9684dd749e5ba81b865f928c67e68/app/globals.css', what: 'The same tokens as CSS variables, ::selection in marigold #FFD166 behind the foreground, and color-scheme: light, the only theme the game ships.' },
  ],
  light: {
    '--bg': '#f6f0ff',
    '--bg-2': '#fefcff',
    '--bg-3': '#eee8f4',
    '--ink': '#302044',
    '--ink-2': '#67566f',
    '--ink-3': '#6f5e78',
    '--line': '#dbd0e5',
    '--line-2': '#887992',
    '--accent': '#6537b5',
    '--accent-ink': '#ffffff',
    '--accent-2': '#6537b5',
    '--focus': '#0f62c8',
    '--selection': '#ffd166',
    '--field-1': '#f0e6fd',
    '--field-2': '#e8dbfb',
    '--field-3': '#e1d2f8',
  },
  dark: {
    '--bg': 'oklch(0.18 0.04 300)',
    '--bg-2': 'oklch(0.235 0.045 300)',
    '--bg-3': 'oklch(0.155 0.035 300)',
    '--ink': 'oklch(0.965 0.02 305)',
    '--ink-2': 'oklch(0.82 0.045 305)',
    '--ink-3': 'oklch(0.76 0.045 305)',
    '--line': 'oklch(0.31 0.04 300)',
    '--line-2': 'oklch(0.6 0.05 300)',
    '--accent': 'oklch(0.74 0.13 295)',
    '--accent-ink': 'oklch(0.18 0.04 300)',
    '--accent-2': 'oklch(0.8 0.1 295)',
    '--focus': 'oklch(0.72 0.14 255)',
    '--selection': 'oklch(0.42 0.075 80)',
    '--field-1': 'oklch(0.205 0.045 300)',
    '--field-2': 'oklch(0.24 0.05 300)',
    '--field-3': 'oklch(0.285 0.055 300)',
  },
} satisfies ColorOption;
