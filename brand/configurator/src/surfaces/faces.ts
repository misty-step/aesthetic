// The three faces, as data. Each names its type option, its colour option and its spine values (spine.ts FACE)
// for both themes, plus any face-scoped decoration (spine.ts FACE_EXTRAS). A face never changes anatomy or
// behaviour: components.css and screens.css are the same for every face.
import { SOURCE as AESTHETIC } from '../../options/color/instrument/index';
import type { LockedValues } from './locked';
import { LOCKED } from './locked';
import type { FaceExtra, FaceToken, Theme } from './spine';

export type FaceId = 'studio' | 'instrument' | 'poppycock';
/** A studio value read from a Locked option module when the face loads (locked.ts), never copied. */
export interface LockedRead { read: keyof LockedValues }
export type FaceValue = string | LockedRead;
export type FaceValues = Record<FaceToken, FaceValue> & Partial<Record<FaceExtra, string>>;
export interface Source { label: string; href: string }
export interface Face {
  id: FaceId;
  name: string;
  summary: string;
  type: string;  // options/type/<id>
  color: string; // options/color/<id>
  values: Record<Theme, FaceValues>;
  sources: Source[];
  proposals: string[]; // values this face proposes rather than takes from its source; shown on the page
}

const read = (value: keyof LockedValues): LockedRead => ({ read: value });
const REPO = 'https://github.com/misty-step/aesthetic/blob/master';
const POPPYCOCK = 'https://github.com/misty-step/poppycock/blob/904a8df433b9684dd749e5ba81b865f928c67e68';
// Poppycock's party colours (DESIGN.md colors: primary, accent, secondary, mint and party-coral) and their night
// counterparts in this lab's dark proposal.
const PARTY = { grape: '#6537b5', marigold: '#ffd166', lilac: '#e8dcfa', mint: '#bfe8d4', coral: '#ffab96' } as const;
const PARTY_NIGHT = { lilac: 'oklch(0.32 0.06 300)', mint: 'oklch(0.33 0.055 165)', coral: 'oklch(0.34 0.075 30)' } as const;

// Studio: the Locked preset. Geometry, the button weight and feedback motion are the preset's own; derived values
// are expressions of them. Locked is flat (the editorial layout sets no shadow) and has no status hue, so status
// inks follow the focus ring's rule: a functional hue on the glyph only.
const STUDIO = {
  '--radius': read('radius'),
  '--radius-2': 'var(--radius)',
  '--rule': read('rule'),
  '--rule-2': 'calc(var(--rule) * 2)',
  '--shadow-1': 'none',
  '--shadow-2': 'none',
  '--control-h': read('controlH'),
  '--strong-weight': read('weight'),
  '--dur-1': read('duration'),
  '--dur-2': 'var(--dur-1)',
  '--dur-3': 'calc(var(--dur-1) * 2)',
  '--ease': read('easing'),
  '--face-band': 'var(--ink)',
  '--face-band-w': 'var(--rule-2)',
} as const;

// Instrument: the aesthetic package (tokens.json and aesthetic.css, recorded in AESTHETIC) with Landmark's ember.
const T = AESTHETIC.tokens;
const INSTRUMENT = {
  '--radius': `${Number(T.radius)}px`,
  '--radius-2': 'var(--radius)',
  '--rule': '1px',
  '--rule-2': '2px',
  '--control-h': AESTHETIC.css['.ae-button']['min-height'],
  '--strong-weight': String(T.weights.medium),
  '--dur-1': T.motion.quick,
  '--dur-2': T.motion.soft,
  '--dur-3': T.motion.gentle,
  '--ease': T.motion.ease,
} as const;

// Poppycock: DESIGN.md and app/globals.css at 904a8df. Controls 12px, surfaces 24px; printed depth (flat offsets,
// no blur) on the feature surface and the primary action; transitions 150ms on Tailwind's default curve, which the
// game's transition utilities use.
const POPPYCOCK_SHARED = {
  '--radius': '12px',
  '--radius-2': '24px',
  '--rule': '1px',
  '--rule-2': '2px',
  '--control-h': '48px',
  // Labels and controls are bold: DESIGN.md typography.label 700, and the Button and Tabs components' font-bold.
  '--strong-weight': '700',
  '--dur-1': '150ms',
  '--dur-2': '150ms',
  '--dur-3': '150ms',
  '--ease': 'cubic-bezier(0.4, 0, 0.2, 1)',
  '--face-rule-style': 'dashed',
  '--face-band': PARTY.marigold,
  '--face-band-w': '8px',
} as const;

export const FACES: Record<FaceId, Face> = {
  studio: {
    id: 'studio',
    name: 'Studio',
    summary: 'The Locked preset: industrial condensed type, mono colour and editorial geometry, read from its own option modules.',
    type: LOCKED.type,
    color: LOCKED.color,
    values: {
      light: { ...STUDIO, '--ok': 'oklch(0.52 0.13 150)', '--warn': 'oklch(0.53 0.11 65)', '--err': 'oklch(0.54 0.19 27)' },
      dark: { ...STUDIO, '--ok': 'oklch(0.78 0.15 152)', '--warn': 'oklch(0.82 0.13 75)', '--err': 'oklch(0.72 0.16 25)' },
    },
    sources: [
      { label: 'Locked preset', href: `${REPO}/brand/configurator/src/presets.ts` },
      { label: 'brand.css', href: `${REPO}/brand/identity/brand.css` },
    ],
    proposals: [
      'Status hues: Locked has none, so ok, warn and error take a functional hue on the glyph only, as focus takes its blue.',
      'Menu, toast and fold timing reuse Locked\'s colour step; the dialog takes two steps.',
    ],
  },
  instrument: {
    id: 'instrument',
    name: 'Instrument',
    summary: 'The aesthetic package with Landmark\'s ember accent: Geist at one size, ink on paper, hairlines and square corners.',
    type: 'instrument',
    color: 'instrument',
    values: {
      light: {
        ...INSTRUMENT,
        '--shadow-1': AESTHETIC.css['.ae-panel']['box-shadow'],
        '--shadow-2': AESTHETIC.css['dialog.ae-dialog']['box-shadow'],
        '--ok': T.color.light.ok, '--warn': T.color.light.warn, '--err': T.color.light.err,
      },
      dark: {
        ...INSTRUMENT,
        '--shadow-1': 'none',
        '--shadow-2': 'none',
        '--ok': T.color.dark.ok, '--warn': T.color.dark.warn, '--err': T.color.dark.err,
      },
    },
    sources: [
      { label: `tokens.json ${T.version}`, href: `${REPO}/tokens.json` },
      { label: 'aesthetic.css', href: `${REPO}/aesthetic.css` },
    ],
    proposals: [
      'Muted ink darkened to read 4.5:1 on the wash; faint ink meets it, since the spine\'s faint ink is text.',
      'Dark wells sit below the page, because the spine orders sunken, page and raised in both themes.',
      'Fields are boxed, not underlined: one field anatomy for every face, with a 3:1 boundary.',
    ],
  },
  poppycock: {
    id: 'poppycock',
    name: 'Poppycock',
    summary: 'Poppycock\'s own look: a lilac room, grape action, Fredoka titles over Atkinson Hyperlegible, printed depth and party colours.',
    type: 'poppycock',
    color: 'poppycock',
    values: {
      light: {
        ...POPPYCOCK_SHARED,
        '--shadow-1': `0 6px 0 color-mix(in srgb, ${PARTY.grape} 12%, transparent)`,
        '--shadow-2': '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
        '--ok': '#276348',
        '--warn': 'oklch(0.5 0.1 70)',
        '--err': '#a52f3b',
        '--face-feature': `color-mix(in srgb, ${PARTY.marigold} 28%, #ffffff)`,
        '--face-aside': PARTY.coral,
        '--face-button-edge': `0 3px 0 color-mix(in srgb, ${PARTY.grape} 65%, #302044)`,
        '--face-chip-1': PARTY.lilac,
        '--face-chip-2': PARTY.mint,
        '--face-chip-3': PARTY.coral,
      },
      dark: {
        ...POPPYCOCK_SHARED,
        '--shadow-1': '0 6px 0 rgb(0 0 0 / 0.4)',
        '--shadow-2': '0 10px 15px -3px rgb(0 0 0 / 0.5), 0 4px 6px -4px rgb(0 0 0 / 0.5)',
        '--ok': 'oklch(0.8 0.12 160)',
        '--warn': 'oklch(0.85 0.13 85)',
        '--err': 'oklch(0.76 0.13 20)',
        '--face-feature': 'oklch(0.29 0.045 80)',
        '--face-aside': PARTY_NIGHT.coral,
        '--face-button-edge': '0 3px 0 oklch(0.52 0.12 295)',
        '--face-chip-1': PARTY_NIGHT.lilac,
        '--face-chip-2': PARTY_NIGHT.mint,
        '--face-chip-3': PARTY_NIGHT.coral,
      },
    },
    sources: [
      { label: 'DESIGN.md at 904a8df', href: `${POPPYCOCK}/DESIGN.md` },
      { label: 'globals.css at 904a8df', href: `${POPPYCOCK}/app/globals.css` },
    ],
    proposals: [
      'The dark theme: Poppycock ships light only. The lilac room turns grape at night and grape lifts to a light fill.',
      'The warning ink: the game has none, so it takes marigold\'s hue at text strength.',
      'Atkinson Hyperlegible Mono for code, which the game does not set.',
    ],
  },
};

export const FACE_IDS = Object.keys(FACES) as FaceId[];
