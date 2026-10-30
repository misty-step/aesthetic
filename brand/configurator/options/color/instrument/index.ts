import type { ColorOption } from '../../../src/contract';

// Strategy: the aesthetic package's ink on paper with Landmark's ember as the one fill. The colour of the
// instrument face in Surfaces (src/surfaces/faces.ts); usable in the configurator like any palette.
// SOURCE records every value the instrument face takes from the aesthetic package at the repository root:
// tokens.json (colour, ember, motion, radius) and three aesthetic.css declarations. `node scripts/surfaces.mjs
// --static` compares SOURCE with both files and fails on any drift. Adjusted for this lab's guarantees
// (options/color/README.md), every adjustment named:
//   ink-2 is ink-muted darkened from #737373 to #6e6e6e, which reads 4.5:1 on the wash (tokens.json records 4.27).
//   ink-3 meets ink-2 by day: the package's faint ink (#a3a3a3) is decoration only, and the lab's faint ink is text.
//   By day bg-2 sits a step above the surface and bg-3 is the wash. By night the wash is raised and the well sinks
//   below the surface, because the lab orders bg-3 < bg < bg-2 in both themes.
//   line-2, selection and fields are new: the package has no strong rule, selects with the wash and has no motion.
// accent is ember (themes.ember), the fill for primary actions and selected states. accent-2 and focus stay ink,
// as the package keeps links and the focus ring in ink.
// contrast:begin (written by options/color/check.mjs --write; WCAG 2 ratios, 8-bit sRGB)
// light on bg, bg-2, bg-3: ink 17.80 18.11 16.46; ink-2 4.97 5.06 4.60; ink-3 4.97 5.06 4.60; accent-2 17.80 18.11 16.46
//       accent-ink on accent 5.05; accent on bg, bg-2, bg-3 5.05 5.13 4.67; line-2 on bg, bg-2 3.15 3.21; line 1.18 1.20 1.09; ink on selection 14.23
//       fields vs bg 1.04 1.07 1.10; ink on fields 17.19 16.60 16.17; ink-2 on fields 4.80 4.64 4.51; focus on bg, bg-2, bg-3, fields 17.80 18.11 16.46 17.19 16.60 16.17
// dark  on bg, bg-2, bg-3: ink 16.00 14.71 16.60; ink-2 5.79 5.33 6.01; ink-3 5.43 4.99 5.63; accent-2 16.00 14.71 16.60
//       accent-ink on accent 8.07; accent on bg, bg-2, bg-3 8.07 7.42 8.37; line-2 on bg, bg-2 3.52 3.23; line 1.24 1.14 1.28; ink on selection 10.79
//       fields vs bg 1.06 1.14 1.25; ink on fields 15.17 14.08 12.76; ink-2 on fields 5.49 5.10 4.62; focus on bg, bg-2, bg-3, fields 16.00 14.71 16.60 15.17 14.08 12.76
// contrast:end
export const SOURCE = {
  tokens: {
    version: '0.25.0',
    color: {
      light: { surface: '#fcfcfc', wash: '#f3f3f3', ink: '#151515', 'ink-muted': '#737373', 'ink-faint': '#a3a3a3', line: '#e9e9e9', ok: '#15714b', warn: '#8a5f32', err: '#a84138' },
      dark: { surface: '#121212', wash: '#1b1b1b', ink: '#ededed', 'ink-muted': '#8f8f8f', 'ink-faint': '#5c5c5c', line: '#262626', ok: '#6fd2a8', warn: '#c49d72', err: '#e58379' },
    },
    ember: { light: '#c2410c', dark: '#ff8a5c' },
    motion: { ease: 'cubic-bezier(0.23, 1, 0.32, 1)', quick: '160ms', soft: '240ms', gentle: '480ms' },
    radius: '0',
  },
  css: {
    '.ae-panel': { 'box-shadow': '0 1px 2px rgba(0, 0, 0, 0.04), 0 8px 28px rgba(0, 0, 0, 0.06)' },
    'dialog.ae-dialog': { 'box-shadow': '0 1px 2px rgba(0, 0, 0, 0.05), 0 12px 36px rgba(0, 0, 0, 0.09)' },
    '.ae-button': { 'min-height': '44px' },
  },
} as const;

const { light: L, dark: D } = SOURCE.tokens.color;
const EMBER = SOURCE.tokens.ember;

export default {
  id: 'instrument',
  layer: 'color',
  label: 'Instrument (product face)',
  summary: 'The aesthetic package\'s ink on paper with Landmark\'s ember as the one fill: near-black on #fcfcfc by day, warm grey on #121212 by night, hairline rules and an ink focus ring.',
  origin: 'new',
  refs: [
    { name: 'aesthetic tokens.json', url: 'https://github.com/misty-step/aesthetic/blob/master/tokens.json', what: 'The surface, wash, ink, muted ink and line in both modes, the status inks and themes.ember (#c2410c by day, #ff8a5c by night), with its contrast table: muted ink reads 4.62:1 on the surface and 4.27:1 on the wash, so this palette darkens it.' },
    { name: 'Landmark', url: 'https://landmark.mistystep.io/changelog.html', what: 'The product site that pins the ember theme: ink text and hairlines on paper, the accent spent on decisive actions and never on the page.' },
  ],
  light: {
    '--bg': L.surface,
    '--bg-2': '#fefefe',
    '--bg-3': L.wash,
    '--ink': L.ink,
    '--ink-2': '#6e6e6e',
    '--ink-3': '#6e6e6e',
    '--line': L.line,
    '--line-2': '#8f8f8f',
    '--accent': EMBER.light,
    '--accent-ink': L.surface,
    '--accent-2': L.ink,
    '--focus': L.ink,
    '--selection': '#e3e3e3',
    '--field-1': '#f8f8f8',
    '--field-2': '#f4f4f4',
    '--field-3': '#f1f1f1',
  },
  dark: {
    '--bg': D.surface,
    '--bg-2': D.wash,
    '--bg-3': '#0d0d0d',
    '--ink': D.ink,
    '--ink-2': D['ink-muted'],
    '--ink-3': '#8a8a8a',
    '--line': D.line,
    '--line-2': '#6b6b6b',
    '--accent': EMBER.dark,
    '--accent-ink': D.surface,
    '--accent-2': D.ink,
    '--focus': D.ink,
    '--selection': '#333333',
    '--field-1': '#181818',
    '--field-2': '#1f1f1f',
    '--field-3': '#272727',
  },
} satisfies ColorOption;
