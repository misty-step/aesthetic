const geist = 'Geist, sans-serif';
const geistMono = 'Geist Mono, monospace';

export const SPECS = [
  {
    id: 'R2MIN-1',
    title: 'Margin Ledger',
    family: 'Misty Step / editorial instrument',
    move: 'Give the existing quiet ledger a working margin: one ruled rail for orientation, one immaculate page for the instrument.',
    essence:
      'A calm technical folio whose restraint is broken only by decisive ink actions and a single ultramarine registration mark.',
    dna: [
      'A black, unmistakable display header sits on the same baseline grid as compact mono folio marks.',
      'Hairlines organize the page as rules and margins, never as nested card decoration.',
      'Action controls are filled or framed square instruments; navigation remains uncontained ink.',
    ],
    dials: {
      color:
        'Paper-white, carbon ink, ultramarine registration marks; status stays on glyphs.',
      type: 'Geist at deliberate 800/550/400 registers; Geist Mono for folios, measures, and control metadata.',
      density:
        'Calm reading field with a compact rail and one dense ledger composition.',
      shape:
        'Zero-radius sheets, rules, square choice marks, and inset registration ticks.',
      imagery:
        'Optional technical plate assembled from hairlines, labels, and one blue datum.',
    },
    layout: 'rail',
    componentLayout: 'ledger',
    button: {
      grammar:
        '32px square-edged action blocks. Primary is carbon, secondary is a ruled paper control, ghost is an unfilled action with a persistent left registration tick, destructive is dark ink with a danger glyph/rule rather than a red tile. Text links never inherit this silhouette.',
      height: '32px',
      padding: '0 14px',
      weight: '650',
      primary:
        'Carbon fill, paper label, 1px carbon border; hover lifts ink one register lighter.',
      secondary:
        'Paper fill, carbon label, 1px mid-gray rule; hover changes the rule to carbon.',
      ghost:
        'Transparent, carbon label, 2px transparent left registration tick; hover reveals wash and the tick.',
      destructive:
        'Paper fill, carbon label, danger-colored leading glyph and bottom rule; never a red filled slab.',
      focus:
        '2px ultramarine outer keyline with 2px paper separation; visible in both modes.',
      pressed:
        'No scale or layout shift; inset 2px carbon registration line and darker wash.',
      loading:
        'Label holds width while a 12px static ruled loader replaces the leading glyph; reduced motion is identical.',
    },
    tokens: {
      fontDisplay: geist,
      fontBody: geist,
      fontMono: geistMono,
      radiusSm: '0px',
      radiusMd: '0px',
      radiusLg: '0px',
      border: '1px solid #e4e4e2',
      shadow: '0 14px 36px rgba(21,21,21,.08)',
      space: '4px',
      control: '32px',
      light: {
        canvas: '#f7f7f5',
        surface: '#fcfcfb',
        raised: '#ffffff',
        ink: '#151515',
        muted: '#6d6d68',
        line: '#e4e4e2',
        accent: '#2643d0',
        accentInk: '#ffffff',
        success: '#237a4b',
        warning: '#9a6500',
        danger: '#b6322c',
      },
      dark: {
        canvas: '#101010',
        surface: '#141414',
        raised: '#1a1a1a',
        ink: '#ededeb',
        muted: '#9b9b95',
        line: '#2b2b29',
        accent: '#8c9eff',
        accentInk: '#101010',
        success: '#69c58e',
        warning: '#d7a748',
        danger: '#f07870',
      },
    },
    products: {
      canary: {
        accent: '#2643d0',
        secondary: '#eef1ff',
        note: 'Tighter alert cadence, mono-dominant readings, ruled uptime wall, and one resolving check-glyph motion.',
      },
      powder: {
        accent: '#8a4f18',
        secondary: '#f5eee5',
        note: 'Wider work lanes, heavier task verbs, ledger-card cadence, and tactile paper-index marks with no ambient motion.',
      },
      crucible: {
        accent: '#6f3cc3',
        secondary: '#f1ecf8',
        note: 'Dense comparison plates, expanded mono ratio, paired-result composition, and abrupt state cuts for model runs.',
      },
      landmark: {
        accent: '#176b54',
        secondary: '#eaf3ef',
        note: 'Calmer document measure, larger whitespace intervals, chronological release spine, and restrained technical plate imagery.',
      },
    },
    css: `
.future-root { letter-spacing: -.008em; }
.future-nav { border-right: 1px solid var(--line); background: var(--surface); }
.future-hero { border-bottom: 1px solid var(--ink); padding-top: clamp(32px, 7vw, 88px); padding-bottom: 24px; }
.type-display { font-family: var(--font-display); font-size: clamp(38px, 7vw, 78px); line-height: .9; font-weight: 800; letter-spacing: -.065em; max-width: 12ch; }
.section-heading { border-top: 1px solid var(--ink); padding-top: 9px; font-family: var(--font-mono); text-transform: uppercase; letter-spacing: .1em; }
.component-gallery { gap: 0; border-top: 1px solid var(--line); }
.component-card { border: 0; border-bottom: 1px solid var(--line); }
.component-card + .component-card { border-left: 1px solid var(--line); }
.button-lab { border: 1px solid var(--ink); background: var(--surface); }
.button-board { gap: 8px; }
.btn, .lab-button { min-height: 32px; border-radius: 0; font-weight: 650; letter-spacing: -.01em; box-shadow: none; transition: color 120ms ease, background-color 120ms ease, border-color 120ms ease, outline-color 120ms ease; }
.btn.primary, .lab-button.primary { background: var(--ink); color: var(--canvas); border: 1px solid var(--ink); }
.btn.primary:hover, .lab-button.primary:hover { background: color-mix(in srgb, var(--ink) 84%, var(--canvas)); }
.btn.secondary, .lab-button.secondary { background: var(--surface); color: var(--ink); border: 1px solid var(--muted); }
.btn.secondary:hover, .lab-button.secondary:hover { border-color: var(--ink); }
.btn.ghost, .lab-button.ghost { background: transparent; color: var(--ink); border: 1px solid transparent; border-left: 2px solid transparent; }
.btn.ghost:hover, .lab-button.ghost:hover { background: var(--raised); border-left-color: var(--accent); }
.btn.danger, .lab-button.danger { background: var(--surface); color: var(--ink); border: 1px solid var(--line); border-bottom-color: var(--danger); }
.btn.icon-btn, .lab-button.icon-btn { inline-size: 32px; padding: 0; }
.btn:focus-visible, .lab-button:focus-visible { outline: 2px solid var(--accent); outline-offset: 2px; }
.btn:active, .lab-button:active { box-shadow: inset 2px 0 0 var(--accent); background-color: var(--raised); }
.btn:disabled, .lab-button:disabled { opacity: .42; cursor: not-allowed; }
.table { border-top: 1px solid var(--ink); border-bottom: 1px solid var(--ink); }
.product-grid { border-top: 1px solid var(--ink); gap: 0; }
.product-card { border: 0; border-bottom: 1px solid var(--line); }
`,
  },
  {
    id: 'R2MIN-2',
    title: 'Survey Folio',
    family: 'Misty Step / annotated field system',
    move: 'Turn Field Notes into a precise survey folio: observations in the broad field, controls indexed along a hard top datum.',
    essence:
      'A measured, humane instrument that feels annotated by a careful operator without imitating a notebook or softening its geometry.',
    dna: [
      'The display name is a disciplined two-line typographic plate, not a marketing hero.',
      'Section numbers, keyed notes, and asymmetrical whitespace create a field-report cadence.',
      'Buttons use a square cap-and-rule anatomy that cannot be confused with inline navigation.',
    ],
    dials: {
      color:
        'Warm survey paper, graphite ink, sparse cobalt notation, glyph-only semantic color.',
      type: 'Geist body with a broad 800 display register; Geist Mono behaves like survey notation.',
      density:
        'Airy annotated sections alternate with a tightly keyed component index.',
      shape:
        'Hard-edged folios, clipped rules, square marks; zero curvature everywhere.',
      imagery:
        'Pen-plot diagrams, coordinate crosses, numbered captions, and sparse halftone fields.',
    },
    layout: 'top',
    componentLayout: 'bento',
    button: {
      grammar:
        '34px cap-and-rule controls: every action has a 3px leading cap, compact verb, and hard trailing edge. Primary fills the cap and body in ink; secondary keeps only the cap in ink; ghost retains a visible bottom action rule; destructive keeps paper but swaps the cap to danger.',
      height: '34px',
      padding: '0 15px 0 12px',
      weight: '700',
      primary:
        'Ink block plus paper text and a 3px accent cap for the default action.',
      secondary:
        'Paper body, ink keyline, solid ink cap; remains clearly actionable without competing.',
      ghost:
        'Transparent body with a persistent hairline bottom rule and compact action verb.',
      destructive:
        'Paper body, ink label, danger cap and danger glyph; confirmation remains a separate decision state.',
      focus:
        'Offset cobalt keyline on all four sides, outside the control silhouette.',
      pressed:
        'Cap broadens visually through an inset strip while the 34px footprint never changes.',
      loading:
        'Cap becomes a three-step static progress register; label and overall width remain fixed.',
    },
    tokens: {
      fontDisplay: geist,
      fontBody: geist,
      fontMono: geistMono,
      radiusSm: '0px',
      radiusMd: '0px',
      radiusLg: '0px',
      border: '1px solid #deded9',
      shadow: '0 18px 44px rgba(31,30,27,.09)',
      space: '5px',
      control: '34px',
      light: {
        canvas: '#f3f2ed',
        surface: '#fbfaf6',
        raised: '#ffffff',
        ink: '#181817',
        muted: '#70706b',
        line: '#deded9',
        accent: '#2e49bf',
        accentInk: '#ffffff',
        success: '#2d7650',
        warning: '#9b690b',
        danger: '#b83c35',
      },
      dark: {
        canvas: '#11110f',
        surface: '#171715',
        raised: '#1e1e1b',
        ink: '#efeee8',
        muted: '#a09f98',
        line: '#302f2a',
        accent: '#91a4ff',
        accentInk: '#11110f',
        success: '#77c49a',
        warning: '#d8aa52',
        danger: '#f07d76',
      },
    },
    products: {
      canary: {
        accent: '#2e49bf',
        secondary: '#e9edff',
        note: 'Compressed vertical readings, strong coordinate markers, chart-first composition, and a single settle-once trace response.',
      },
      powder: {
        accent: '#a05220',
        secondary: '#f2e9df',
        note: 'Board composition with wider annotation gutters, verb-heavy controls, index-card cadence, and rough ruled plate imagery.',
      },
      crucible: {
        accent: '#7442bb',
        secondary: '#eee8f6',
        note: 'Narrow dense grid, high mono ratio, keyed experiment cells, and immediate comparison-state cuts.',
      },
      landmark: {
        accent: '#216b58',
        secondary: '#e6f0ec',
        note: 'Longer calm measure, report-led composition, numbered release figures, and sparse pen-plot illustration.',
      },
    },
    css: `
.future-root { letter-spacing: -.006em; background: var(--canvas); }
.future-nav { border-bottom: 1px solid var(--ink); background: var(--surface); }
.future-hero { min-height: 52vh; display: grid; align-content: end; border-bottom: 1px solid var(--ink); padding-block: clamp(40px, 9vw, 104px) 28px; }
.type-display { font-family: var(--font-display); font-size: clamp(42px, 7.6vw, 86px); line-height: .88; font-weight: 800; letter-spacing: -.075em; max-width: 9ch; }
.type-title { font-weight: 700; letter-spacing: -.025em; }
.section-heading { font-family: var(--font-mono); border-left: 3px solid var(--accent); padding-left: 10px; text-transform: uppercase; letter-spacing: .09em; }
.future-section { border-bottom: 1px solid var(--line); }
.component-gallery { grid-template-columns: repeat(12, minmax(0, 1fr)); gap: 0; border: 1px solid var(--line); }
.component-card { grid-column: span 4; border: 0; border-right: 1px solid var(--line); border-bottom: 1px solid var(--line); }
.component-card:nth-child(5n) { grid-column: span 8; }
.button-lab { background: var(--surface); border: 1px solid var(--ink); border-left: 3px solid var(--accent); }
.button-board { gap: 9px; }
.btn, .lab-button { min-height: 34px; border-radius: 0; font-weight: 700; border: 1px solid transparent; border-left-width: 3px; box-shadow: none; transition: background-color 130ms ease, border-color 130ms ease, box-shadow 130ms ease; }
.btn.primary, .lab-button.primary { background: var(--ink); color: var(--canvas); border-color: var(--ink); border-left-color: var(--accent); }
.btn.primary:hover, .lab-button.primary:hover { background: color-mix(in srgb, var(--ink) 86%, var(--canvas)); }
.btn.secondary, .lab-button.secondary { background: var(--surface); color: var(--ink); border-color: var(--ink); border-left-color: var(--ink); }
.btn.secondary:hover, .lab-button.secondary:hover { border-left-color: var(--accent); }
.btn.ghost, .lab-button.ghost { background: transparent; color: var(--ink); border-bottom-color: var(--muted); }
.btn.ghost:hover, .lab-button.ghost:hover { border-bottom-color: var(--ink); border-left-color: var(--accent); }
.btn.danger, .lab-button.danger { background: var(--surface); color: var(--ink); border-color: var(--line); border-left-color: var(--danger); }
.btn.icon-btn, .lab-button.icon-btn { inline-size: 34px; padding: 0; }
.btn:focus-visible, .lab-button:focus-visible { outline: 2px solid var(--accent); outline-offset: 3px; }
.btn:active, .lab-button:active { box-shadow: inset 4px 0 0 var(--accent); }
.btn:disabled, .lab-button:disabled { opacity: .4; cursor: not-allowed; }
.composition-grid { gap: 1px; background: var(--line); border: 1px solid var(--line); }
.product-card { border-top: 3px solid var(--ink); }
@media (max-width: 700px) { .component-card, .component-card:nth-child(5n) { grid-column: 1 / -1; } }
`,
  },
  {
    id: 'R2MIN-3',
    title: 'Index Desk',
    family: 'Misty Step / dense operator index',
    move: 'Compress the signal-led favorites into an indexed desk: fast scanning, explicit selection, and no visual softness.',
    essence:
      'A world-class operator surface that stays editorial through its strict grid, quiet paper field, and disciplined use of black and blue.',
    dna: [
      'A full-width display masthead gives the system a name before the dense index begins.',
      'Alternating ruled strips replace generic cards and keep high-density information readable.',
      'Buttons are keyed command tiles with an action edge, never pills or disguised text links.',
    ],
    dials: {
      color:
        'Neutral white and ink dominate; blue marks selection, not decoration.',
      type: 'Geist 800 masthead and compact 550 UI; Geist Mono dominates metadata and measurements.',
      density:
        'High-density strips and tables balanced by a quiet masthead and document composition.',
      shape:
        'Square command tiles, hard index tabs, one-pixel row bands, no shadows except sanctioned overlays.',
      imagery:
        'Orthogonal system diagrams, signal traces, and numbered equipment plates.',
    },
    layout: 'atlas',
    componentLayout: 'strips',
    button: {
      grammar:
        '30px keyed command tiles. A 1px frame and 3px bottom action edge persist in every enabled variant. Primary is ink with blue edge; secondary is paper with ink edge; ghost is transparent but keeps the action edge; destructive uses danger only on edge and glyph.',
      height: '30px',
      padding: '0 12px',
      weight: '700',
      primary:
        'Ink tile, paper label, accent bottom action edge; the strongest command in a cluster.',
      secondary:
        'Raised-paper tile, ink frame and bottom edge; explicit but subordinate.',
      ghost:
        'Transparent tile, open side borders, persistent bottom action edge; remains an action, never navigation.',
      destructive:
        'Paper tile, ink label, danger glyph and bottom edge; no ambient red surface.',
      focus:
        'Accent keyline plus an external square corner marker, represented without changing control size.',
      pressed:
        'Raised surface cuts to canvas and bottom edge becomes an inset top rule; no translation or scale.',
      loading:
        'Fixed-width mono progress cell replaces the icon while the verb stays visible; no looping shimmer.',
    },
    tokens: {
      fontDisplay: geist,
      fontBody: geist,
      fontMono: geistMono,
      radiusSm: '0px',
      radiusMd: '0px',
      radiusLg: '0px',
      border: '1px solid #dfdfdf',
      shadow: '0 12px 28px rgba(15,15,15,.1)',
      space: '3px',
      control: '30px',
      light: {
        canvas: '#f5f5f4',
        surface: '#fcfcfc',
        raised: '#ffffff',
        ink: '#111111',
        muted: '#686868',
        line: '#dfdfdf',
        accent: '#2445d5',
        accentInk: '#ffffff',
        success: '#20764a',
        warning: '#946000',
        danger: '#b72e2b',
      },
      dark: {
        canvas: '#0e0e0e',
        surface: '#131313',
        raised: '#191919',
        ink: '#f0f0f0',
        muted: '#9c9c9c',
        line: '#2a2a2a',
        accent: '#91a3ff',
        accentInk: '#0e0e0e',
        success: '#70c895',
        warning: '#d5a74e',
        danger: '#f17b75',
      },
    },
    products: {
      canary: {
        accent: '#2445d5',
        secondary: '#e9edff',
        note: 'Maximum reading density, narrow strip cadence, high mono ratio, orthogonal trace imagery, and one-shot incident resolution.',
      },
      powder: {
        accent: '#8f501c',
        secondary: '#f2e9e0',
        note: 'Broader lane geometry, task-first verbs, moderate mono ratio, ruled board composition, and tactile index tabs.',
      },
      crucible: {
        accent: '#7040bd',
        secondary: '#eee8f7',
        note: 'Twelve-column comparison cadence, compact controls, mono-heavy evidence tables, and instant run-state transitions.',
      },
      landmark: {
        accent: '#1c6b55',
        secondary: '#e7f0ed',
        note: 'Reduced density, document-first composition, larger paragraph measure, numbered release plates, and no motion beyond disclosure feedback.',
      },
    },
    css: `
.future-root { letter-spacing: -.01em; }
.future-nav { border-bottom: 1px solid var(--line); background: var(--surface); }
.future-hero { border-bottom: 3px solid var(--ink); padding-block: clamp(28px, 6vw, 72px) 18px; }
.type-display { font-family: var(--font-display); font-size: clamp(40px, 8vw, 92px); line-height: .84; font-weight: 800; letter-spacing: -.075em; max-width: none; }
.section-heading { display: flex; align-items: center; min-height: 30px; border-bottom: 1px solid var(--ink); font-family: var(--font-mono); text-transform: uppercase; letter-spacing: .08em; }
.component-gallery { display: block; border-top: 1px solid var(--ink); }
.component-card { display: grid; grid-template-columns: minmax(126px, .38fr) 1fr; align-items: center; min-height: 76px; border: 0; border-bottom: 1px solid var(--line); }
.component-card:nth-child(even) { background: var(--raised); }
.specimen { border-left: 1px solid var(--line); }
.button-lab { border-top: 3px solid var(--ink); border-bottom: 1px solid var(--ink); background: var(--surface); }
.button-board { gap: 6px; }
.btn, .lab-button { min-height: 30px; border-radius: 0; font-family: var(--font-body); font-weight: 700; border: 1px solid transparent; border-bottom-width: 3px; box-shadow: none; transition: background-color 100ms ease, border-color 100ms ease, box-shadow 100ms ease; }
.btn.primary, .lab-button.primary { color: var(--canvas); background: var(--ink); border-color: var(--ink); border-bottom-color: var(--accent); }
.btn.primary:hover, .lab-button.primary:hover { background: color-mix(in srgb, var(--ink) 85%, var(--canvas)); }
.btn.secondary, .lab-button.secondary { color: var(--ink); background: var(--raised); border-color: var(--ink); }
.btn.secondary:hover, .lab-button.secondary:hover { border-bottom-color: var(--accent); }
.btn.ghost, .lab-button.ghost { color: var(--ink); background: transparent; border-left-color: transparent; border-right-color: transparent; border-top-color: transparent; border-bottom-color: var(--muted); }
.btn.ghost:hover, .lab-button.ghost:hover { background: var(--raised); border-bottom-color: var(--accent); }
.btn.danger, .lab-button.danger { color: var(--ink); background: var(--surface); border-color: var(--line); border-bottom-color: var(--danger); }
.btn.icon-btn, .lab-button.icon-btn { inline-size: 30px; padding: 0; }
.btn:focus-visible, .lab-button:focus-visible { outline: 2px solid var(--accent); outline-offset: 2px; }
.btn:active, .lab-button:active { box-shadow: inset 0 3px 0 var(--accent); background: var(--canvas); }
.btn:disabled, .lab-button:disabled { opacity: .38; cursor: not-allowed; }
.state-grid, .motion-grid { gap: 0; border: 1px solid var(--line); }
.composition-grid { grid-template-columns: 1.4fr .8fr; gap: 1px; background: var(--line); border: 1px solid var(--line); }
.product-grid { gap: 0; border-top: 3px solid var(--ink); }
.product-card { border: 0; border-bottom: 1px solid var(--line); }
@media (max-width: 700px) { .component-card { grid-template-columns: 1fr; } .specimen { border-left: 0; border-top: 1px solid var(--line); } .composition-grid { grid-template-columns: 1fr; } }
`,
  },
];

export default SPECS;
