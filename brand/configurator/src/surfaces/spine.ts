// The spine: what every Misty Step surface shares (issue #36). This file names every token the components
// (components.css) and the screens (screens.css) read, with its meaning. A face gives each one a value
// (faces.ts); nothing else differs between faces. scripts/surfaces.mjs --static fails when either stylesheet
// reads a token that is not named here.

export type Theme = 'light' | 'dark';
export const THEMES: Theme[] = ['light', 'dark'];

/** Supplied by the face's colour option (ColorTokens in src/contract.ts; guarantees in options/color/README.md). */
export const COLOR = {
  '--bg': 'Page ground.',
  '--bg-2': 'Raised surface: fields, panels, dialogs, menus and toasts. Lighter than --bg.',
  '--bg-3': 'Sunken surface: code, wells, skeletons and the switch track. Darker than --bg.',
  '--ink': 'Text and icons. 4.5:1 on every surface.',
  '--ink-2': 'Secondary text: hints, values and metadata. 4.5:1 on every surface.',
  '--ink-3': 'Faint text: placeholders and markers. Still 4.5:1.',
  '--line': 'Decorative hairline between groups and rows.',
  '--line-2': 'Control borders and strong rules. 3:1 on --bg and --bg-2.',
  '--accent': 'The one fill: primary action, selected tab bar, checked mark, switch on. 3:1 on --bg.',
  '--accent-ink': 'Text and glyphs on --accent. 4.5:1.',
  '--accent-2': 'Link ink. 4.5:1 on every surface.',
  '--focus': 'Keyboard focus ring. 3:1 on every surface.',
  '--selection': 'Selected text behind --ink. 4.5:1 with it.',
} as const;

/** Supplied by the face's type option (TypeOption tokens in src/contract.ts). */
export const TYPE = {
  '--font-display': 'Headings, titles and the room code.',
  '--font-body': 'Reading text.',
  '--font-ui': 'Controls, labels, captions and navigation.',
  '--font-mono': 'Code.',
  '--display-weight': 'Weight of the display face.',
  '--display-tracking': 'Letter spacing of display text.',
  '--display-leading': 'Line height of display text.',
  '--display-transform': 'Case of page titles (h1 only).',
  '--body-weight': 'Weight of reading text.',
  '--body-leading': 'Line height of reading text.',
  '--measure': 'Longest comfortable line of reading text.',
  '--step--1': 'Small: hints, captions, tables, toasts and chrome.',
  '--step-0': 'Body: reading text and every control.',
  '--step-1': 'Lead text and third-level headings.',
  '--step-2': 'Section and dialog titles.',
  '--step-3': 'Page titles.',
  '--step-4': 'Large titles.',
  '--step-5': 'Entrance headlines.',
} as const;

/** Supplied by the face itself (faces.ts). */
export const FACE = {
  '--radius': 'Corner of controls: buttons, fields, menus and tabs.',
  '--radius-2': 'Corner of surfaces: dialogs, panels and toasts. Also rounds portraits and radio marks, capped at a circle.',
  '--rule': 'Border and hairline width.',
  '--rule-2': 'Strong rule: the selected tab bar, the focus ring and the press distance.',
  '--shadow-1': 'Depth of raised panels. May be none.',
  '--shadow-2': 'Depth of overlays: dialogs, menus and toasts. May be none.',
  '--control-h': 'Minimum height of buttons, fields, tabs, choice rows and setting rows. At least 44px at phone widths.',
  '--dur-1': 'Feedback: hover, press, toggle and leaving.',
  '--dur-2': 'A small surface arriving: menu, toast, chooser fold.',
  '--dur-3': 'A decision arriving: the dialog.',
  '--ease': 'The easing of every feedback motion.',
  '--ok': 'Success glyph. 4.5:1 on --bg and --bg-2. Status rides the glyph; the words stay ink.',
  '--warn': 'Warning glyph. 4.5:1 on --bg and --bg-2.',
  '--err': 'Error glyph and an invalid field\'s border. 4.5:1 on --bg and --bg-2.',
} as const;

/** Optional, face-scoped decoration. Read with neutral fallbacks; never anatomy or behaviour. */
export const FACE_EXTRAS = {
  '--face-rule-style': 'Line style of chrome separators. Default solid.',
  '--face-band': 'Colour of the feature surface\'s top band. Default --line.',
  '--face-band-w': 'Width of that band. Default --rule.',
  '--face-feature': 'Fill of the feature surface, the one that frames a screen\'s primary task. Default --bg-2. Carries --ink at 4.5:1.',
  '--face-aside': 'Fill of a supporting surface. Default --bg-3. Carries --ink at 4.5:1.',
  '--face-button-edge': 'A printed edge under the primary button. Default none.',
} as const;

export const SPINE = { ...COLOR, ...TYPE, ...FACE } as const;
export type ColorToken = keyof typeof COLOR;
export type TypeToken = keyof typeof TYPE;
export type FaceToken = keyof typeof FACE;
export type FaceExtra = keyof typeof FACE_EXTRAS;
export type SpineToken = keyof typeof SPINE;
