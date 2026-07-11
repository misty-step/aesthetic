/* Hallmark · pre-emit critique: P5 H5 E5 S5 R5 V4 */

export const SPECS = [
  {
    id: 'R2HALL-1',
    title: 'Quiet Register',
    family: 'Misty Step / ruled instrument',
    move: 'Tighten the existing Aesthetic into a more legible operating register: decisive headings, ruled cadence, and controls cut like physical keys.',
    essence:
      'The page is a record you can operate, not a stack of cards you can decorate.',
    dna: [
      'Current paper, ink, ultramarine, hairlines, square marks, and mono metadata remain immediately recognizable.',
      'Hierarchy is made by blackness, measure, and ruled placement; the specimen name alone gets review-scale display treatment.',
      'Actions are contained keys with explicit depth order; navigation remains underlined ink and never borrows the button costume.',
    ],
    dials: {
      color:
        'Ultramarine is spent on primary action, focus, and the one active record; status remains glyph-only.',
      type: 'Geist 820 display, Geist 450 prose, Geist Mono 650 metadata; compact labels and tabular figures carry the instrument voice.',
      density:
        'A medium-high ruled register, with calm document composition and compressed workbench composition.',
      shape:
        'Zero radius, single-pixel rules, square choice marks, and one sanctioned shallow panel depth.',
      imagery:
        'Numbered technical plates, orthogonal sparklines, and pen-stroke diagrams; no ambient illustration.',
    },
    layout: 'ledger',
    componentLayout: 'ledger',
    button: {
      grammar:
        'Contained square keys: fill identifies action rank, border identifies reversibility, and text links alone navigate.',
      height: '44px shared control line',
      padding: '0 18px; icon keys are 44 × 44',
      weight: '700 Geist with compact tracking',
      primary:
        'Ultramarine field, paper ink, one-pixel ultramarine edge; the sole chromatic action surface.',
      secondary:
        'Paper field, near-black rule and ink; equal geometry without competing fill.',
      ghost:
        'Transparent with no box at rest; hover reveals a wash and a one-pixel lower rule.',
      destructive:
        'Paper field with danger glyph and danger rule; fills danger only at irreversible confirmation.',
      focus:
        'Instant 2px ultramarine outline with a 2px paper separation; never animated.',
      pressed:
        'One-pixel downward travel plus inset upper rule; fill darkens without changing dimensions.',
      loading:
        'Leading 12px ruled spinner, label changes to present participle, width remains fixed.',
    },
    tokens: {
      fontDisplay: 'Geist, ui-sans-serif, system-ui, sans-serif',
      fontBody: 'Geist, ui-sans-serif, system-ui, sans-serif',
      fontMono: '"Geist Mono", ui-monospace, monospace',
      radiusSm: '0px',
      radiusMd: '0px',
      radiusLg: '0px',
      border: '1px',
      shadow: '0 10px 26px rgba(19, 24, 35, 0.08)',
      space: 0.88,
      control: '44px',
      light: {
        canvas: '#f7f7f5',
        surface: '#fcfcfb',
        raised: '#f1f1ee',
        ink: '#161719',
        muted: '#666a70',
        line: '#dedfdd',
        accent: '#2643d0',
        accentInk: '#ffffff',
        success: '#18784d',
        warning: '#9a6200',
        danger: '#b52b35',
      },
      dark: {
        canvas: '#111214',
        surface: '#151719',
        raised: '#1d1f22',
        ink: '#eeeeeb',
        muted: '#a2a6ab',
        line: '#303338',
        accent: '#8c9eff',
        accentInk: '#111214',
        success: '#69c99b',
        warning: '#e2b85e',
        danger: '#f08087',
      },
    },
    products: {
      canary: {
        accent: '#16735a',
        secondary: '#b8d8ce',
        note: 'Airier alert ledger; taller reading rows, stronger mono timestamps, single-column incident trail, and one-shot resolution cuts.',
      },
      powder: {
        accent: '#b04a27',
        secondary: '#e5c3b5',
        note: 'Compressed board cadence; narrow chrome, heavier column rules, terse labels, denser cards, and near-instant placement feedback.',
      },
      crucible: {
        accent: '#5c48b8',
        secondary: '#c9c2e6',
        note: 'Wide comparison plates; tabular type rises, paired evidence columns dominate, geometry repeats by experiment, and result motion resolves once.',
      },
      landmark: {
        accent: '#315f91',
        secondary: '#bfd0df',
        note: 'Calm document measure; generous vertical intervals, lower mono ratio, numbered release figures, and restrained cut-only navigation.',
      },
    },
    css: `
      .future-root .future-hero { border-bottom: var(--border) solid var(--line); padding-bottom: calc(3rem * var(--space)); }
      .future-root .future-hero .type-display { max-width: 10ch; font-size: clamp(3rem, 7.2vw, 6.6rem); line-height: .88; letter-spacing: -.075em; font-weight: 820; overflow-wrap: anywhere; min-width: 0; }
      .future-root .future-section { border-top: 0; }
      .future-root .section-heading { padding-bottom: .8rem; border-bottom: var(--border) solid var(--ink); }
      .future-root .section-heading h2 { font-weight: 780; letter-spacing: -.025em; }
      .future-root .component-gallery, .future-root .state-grid, .future-root .composition-grid { gap: 0; border-left: var(--border) solid var(--line); }
      .future-root .component-card, .future-root .specimen { border-top: var(--border) solid var(--line); }
      .future-root .button-board { grid-template-columns: 1.22fr 1fr 1fr; }
      .future-root .btn, .future-root .lab-button { min-height: 44px; padding: 0 18px; border-width: 1px; font-weight: 700; letter-spacing: -.01em; white-space: nowrap; }
      .future-root .btn.primary { border-color: var(--accent); background: var(--accent); color: var(--accent-ink); }
      .future-root .btn.primary:hover, .future-root .btn.primary.is-hover { border-color: var(--ink); background: var(--ink); color: var(--surface); }
      .future-root .btn.secondary { border-color: var(--ink); background: var(--surface); color: var(--ink); }
      .future-root .btn.secondary:hover { background: var(--raised); }
      .future-root .btn.ghost { border-color: transparent; border-bottom-color: transparent; background: transparent; color: var(--ink); }
      .future-root .btn.ghost:hover { border-bottom-color: var(--ink); background: var(--raised); }
      .future-root .btn.danger { border-color: var(--danger); background: var(--surface); color: var(--danger); }
      .future-root .btn.danger:hover { background: var(--danger); color: var(--surface); }
      .future-root .btn:focus-visible, .future-root .btn.is-focus { outline: 2px solid var(--accent); outline-offset: 2px; box-shadow: none; }
      .future-root .btn:active, .future-root .btn.is-pressed { transform: translateY(1px); box-shadow: inset 0 1px 0 var(--ink); }
      .future-root .btn.icon-btn { width: 44px; padding: 0; }
      .future-root .table { font-variant-numeric: tabular-nums; border-top: var(--border) solid var(--ink); }
      .future-root .product-grid { gap: 0; border: var(--border) solid var(--line); }
      .future-root .product-card { border: 0; border-right: var(--border) solid var(--line); }
      @media (max-width: 700px) {
        .future-root .button-board { grid-template-columns: 1fr; }
        .future-root .product-card { border-right: 0; border-bottom: var(--border) solid var(--line); }
      }
      @media (prefers-reduced-motion: reduce) { .future-root .btn { transition-duration: 0ms; } }
    `,
  },
  {
    id: 'R2HALL-2',
    title: 'Signal Desk',
    family: 'Misty Step / active diagram',
    move: 'Keep the quiet technical sheet, then make activity legible through a left-right signal cadence and a visibly engineered action key.',
    essence:
      'Every active thing declares its circuit; everything else rests as paper and ink.',
    dna: [
      'Aesthetic remains monochrome-first, square, sparse, and ruled, with ultramarine reserved for live paths and committed actions.',
      'The display name becomes an unmistakable compact masthead rather than body copy disguised by modest weight.',
      'Components align as horizontal strips, making states and relationships easier to compare than a conventional card gallery.',
    ],
    dials: {
      color:
        'Cool paper and blue-black ink; ultramarine marks live signals, while product dialects choose their own single circuit hue.',
      type: 'Geist 850 compressed-feeling display through tracking, Geist 430 prose, Geist Mono for all state and path labels.',
      density:
        'Medium density with compressed component strips and an unusually open document/detail view.',
      shape:
        'Zero radius, orthogonal joins, interrupted rules, square ticks, and no ornamental depth.',
      imagery:
        'Orthogonal flow paths, terminal ticks, ruled plots, and cropped technical diagrams drawn from the system vocabulary.',
    },
    layout: 'split',
    componentLayout: 'strips',
    button: {
      grammar:
        'Every action key carries a six-pixel square signal before its label; navigation never carries the signal or a container.',
      height: '42px compact control line',
      padding: '0 16px with 8px internal signal gap',
      weight: '720 Geist; sentence case; one line only',
      primary:
        'Blue-black fill and paper text with a small ultramarine action square; hover promotes the whole field to ultramarine.',
      secondary:
        'Hairline paper key with blue-black text and a hollow signal square.',
      ghost:
        'Uncontained ink label; a short rule grows only beneath the text on hover.',
      destructive:
        'Unfilled danger-rule key with a danger glyph; confirmation may invert, ordinary destructive entry does not.',
      focus:
        'Immediate three-pixel ultramarine block shadow offset to lower-right, plus retained black edge.',
      pressed:
        'The block shadow collapses and the key moves one pixel into its former depth.',
      loading:
        'Signal square becomes a four-frame step indicator; wording and total width remain stable.',
    },
    tokens: {
      fontDisplay: 'Geist, ui-sans-serif, system-ui, sans-serif',
      fontBody: 'Geist, ui-sans-serif, system-ui, sans-serif',
      fontMono: '"Geist Mono", ui-monospace, monospace',
      radiusSm: '0px',
      radiusMd: '0px',
      radiusLg: '0px',
      border: '1px',
      shadow: 'none',
      space: 0.82,
      control: '42px',
      light: {
        canvas: '#f4f6f7',
        surface: '#fbfcfc',
        raised: '#edf0f2',
        ink: '#13191e',
        muted: '#5f6870',
        line: '#d7dde1',
        accent: '#2450c7',
        accentInk: '#ffffff',
        success: '#197553',
        warning: '#99620a',
        danger: '#b72f39',
      },
      dark: {
        canvas: '#0e1317',
        surface: '#13191e',
        raised: '#1a2228',
        ink: '#edf1f3',
        muted: '#99a5ad',
        line: '#2a353d',
        accent: '#91a6ff',
        accentInk: '#0e1317',
        success: '#69c9a0',
        warning: '#dbb868',
        danger: '#ef858a',
      },
    },
    products: {
      canary: {
        accent: '#14745e',
        secondary: '#acd8cc',
        note: 'Vertical incident circuit; open breathing room, prominent glyph states, longer reading measure, and a single persistent resolution signal.',
      },
      powder: {
        accent: '#b24d28',
        secondary: '#e3bcaa',
        note: 'Horizontal workflow circuit; short labels, compact strips, hard column cadence, and 120ms placement feedback with no ambient movement.',
      },
      crucible: {
        accent: '#6048bc',
        secondary: '#c7bce8',
        note: 'Mirrored evaluation circuit; higher mono ratio, paired plots, symmetric comparison geometry, and one-time result-path illumination.',
      },
      landmark: {
        accent: '#2d628f',
        secondary: '#b9d0df',
        note: 'Linear release circuit; broad document measure, sparse controls, sequential plate rhythm, and cut transitions between release evidence.',
      },
    },
    css: `
      .future-root .future-hero { display: grid; grid-template-columns: minmax(0, 1.2fr) minmax(18rem, .8fr); align-items: end; column-gap: calc(3rem * var(--space)); border-bottom: var(--border) solid var(--ink); }
      .future-root .future-hero .type-display { grid-column: 1 / -1; max-width: 12ch; font-size: clamp(3.2rem, 7.6vw, 7rem); line-height: .9; letter-spacing: -.085em; font-weight: 850; overflow-wrap: anywhere; min-width: 0; }
      .future-root .future-hero blockquote { grid-column: 2; border-left-width: 1px; }
      .future-root .section-heading { display: grid; grid-template-columns: 4rem minmax(0, 1fr); border-bottom: var(--border) solid var(--line); padding-bottom: .75rem; }
      .future-root .component-gallery { display: grid; grid-template-columns: 1fr; }
      .future-root .component-card { display: grid; grid-template-columns: minmax(9rem, .32fr) minmax(0, 1fr); align-items: center; min-height: 7.4rem; border-top: var(--border) solid var(--line); }
      .future-root .button-board { grid-template-columns: 1fr; }
      .future-root .button-board > article { display: grid; grid-template-columns: minmax(10rem, .32fr) minmax(0, 1fr); min-height: auto; align-items: start; }
      .future-root .btn, .future-root .lab-button { min-height: 42px; padding: 0 16px; border-width: 1px; font-weight: 720; white-space: nowrap; position: relative; }
      .future-root .btn.primary { border-color: var(--ink); background: var(--ink); color: var(--surface); }
      .future-root .btn.primary::before, .future-root .btn.secondary::before { content: ''; width: 6px; height: 6px; margin-right: 2px; background: var(--accent); flex: 0 0 auto; }
      .future-root .btn.secondary::before { outline: 1px solid var(--accent); outline-offset: -1px; background: transparent; }
      .future-root .btn.primary:hover, .future-root .btn.primary.is-hover { border-color: var(--accent); background: var(--accent); color: var(--accent-ink); }
      .future-root .btn.secondary { border-color: var(--ink); background: var(--surface); color: var(--ink); }
      .future-root .btn.secondary:hover { background: var(--raised); }
      .future-root .btn.ghost { border-color: transparent; border-bottom-color: transparent; background: transparent; color: var(--ink); }
      .future-root .btn.ghost:hover { border-bottom-color: currentColor; background: transparent; }
      .future-root .btn.danger { border-color: var(--danger); background: transparent; color: var(--danger); }
      .future-root .btn.danger:hover { background: var(--danger); color: var(--surface); }
      .future-root .btn:focus-visible, .future-root .btn.is-focus { outline: 1px solid var(--ink); outline-offset: 0; box-shadow: 3px 3px 0 var(--accent); }
      .future-root .btn:active, .future-root .btn.is-pressed { transform: translate(1px, 1px); box-shadow: 1px 1px 0 var(--accent); }
      .future-root .btn.icon-btn { width: 42px; padding: 0; }
      .future-root .composition-grid { grid-template-columns: 1.2fr .8fr; }
      .future-root .product-grid { grid-template-columns: 1fr; }
      .future-root .product-card { display: grid; grid-template-columns: minmax(10rem, .28fr) minmax(0, 1fr); min-height: 11rem; }
      @media (max-width: 700px) {
        .future-root .future-hero { display: block; }
        .future-root .future-hero blockquote { margin-left: 0; }
        .future-root .section-heading, .future-root .component-card, .future-root .button-board > article, .future-root .product-card { grid-template-columns: 1fr; }
        .future-root .composition-grid { grid-template-columns: 1fr; }
      }
      @media (prefers-reduced-motion: reduce) { .future-root .btn { transition-duration: 0ms; transform: none; } }
    `,
  },
  {
    id: 'R2HALL-3',
    title: 'Civic Folio',
    family: 'Misty Step / public technical document',
    move: 'Refine Aesthetic as a world-class civic instrument: authoritative masthead, calm folio rhythm, and button families that feel typeset rather than templated.',
    essence: 'Institutional clarity without institutional coldness.',
    dna: [
      'Near-black ink, warm paper, square geometry, hairline divisions, and Geist preserve the Misty Step family at first glance.',
      'Broad margins and a folio-like hierarchy make the system elegant without importing luxury tropes or serif display type.',
      'Components form purposeful civic clusters: related tools share a field, but nested cards and decorative containers disappear.',
    ],
    dials: {
      color:
        'Warm neutral paper and restrained cobalt; product hues behave like departmental ink stamps rather than ambient brand paint.',
      type: 'Geist 800 display with visible scale, Geist 450 reading text, Geist Mono used sparingly for folios, dates, and public records.',
      density:
        'Medium overall: calm document and settings surfaces, dense table and workbench surfaces with unchanged control anatomy.',
      shape:
        'Zero radius, paired fine rules, occasional two-pixel action edge, and sanctioned depth only for modal decisions.',
      imagery:
        'Technical folios, index marks, line maps, and evidence plates with captions aligned to the reading grid.',
    },
    layout: 'top',
    componentLayout: 'bento',
    button: {
      grammar:
        'Typographic stamps with strict rectangular proportions: primary commits, secondary inspects, ghost exits, and links navigate.',
      height: '46px principal line; 38px compact table line',
      padding: '0 20px principal; 0 12px compact; icon keys remain square',
      weight: '680 Geist with neutral tracking',
      primary:
        'Cobalt stamp with white ink and two-pixel edge; no shadow, gloss, or gradient.',
      secondary:
        'Near-black stamp on light surfaces for high-authority neutral actions; paper variant inside dense tools.',
      ghost:
        'Ink-only action with paired upper and lower transparent rules that appear as a single lower rule on hover.',
      destructive:
        'Danger ink and rule on paper; solid danger is reserved for the final destructive step.',
      focus:
        'Two nested square rings: paper separation and cobalt outer line, both instantaneous.',
      pressed:
        'Inset one-pixel frame and a subtle wash; no scale and no spring.',
      loading:
        'Compact mono progress verb after the unchanged label, with a ruled spinner at the trailing edge.',
    },
    tokens: {
      fontDisplay: 'Geist, ui-sans-serif, system-ui, sans-serif',
      fontBody: 'Geist, ui-sans-serif, system-ui, sans-serif',
      fontMono: '"Geist Mono", ui-monospace, monospace',
      radiusSm: '0px',
      radiusMd: '0px',
      radiusLg: '0px',
      border: '1px',
      shadow: '0 14px 34px rgba(28, 29, 31, 0.09)',
      space: 1.04,
      control: '46px',
      light: {
        canvas: '#f3f2ee',
        surface: '#faf9f5',
        raised: '#ecebe5',
        ink: '#191918',
        muted: '#676761',
        line: '#d9d7cf',
        accent: '#2449bd',
        accentInk: '#ffffff',
        success: '#23744e',
        warning: '#95620d',
        danger: '#ae3037',
      },
      dark: {
        canvas: '#111210',
        surface: '#171816',
        raised: '#20211e',
        ink: '#efeee8',
        muted: '#aaa9a1',
        line: '#32332f',
        accent: '#91a5ff',
        accentInk: '#111210',
        success: '#74c79d',
        warning: '#dab766',
        danger: '#ef858a',
      },
    },
    products: {
      canary: {
        accent: '#21745c',
        secondary: '#bed8cf',
        note: 'Public-health folio cadence; generous alert reading space, visible glyph hierarchy, timeline composition, and persistent resolved states.',
      },
      powder: {
        accent: '#a84a2b',
        secondary: '#dec0b3',
        note: 'Municipal docket cadence; denser columns, stronger numeral hierarchy, clipped card geometry, and direct 120ms board feedback.',
      },
      crucible: {
        accent: '#5e4caf',
        secondary: '#c7c0df',
        note: 'Standards-laboratory cadence; symmetric evidence fields, elevated mono ratio, plate-index imagery, and one-time verdict resolution.',
      },
      landmark: {
        accent: '#37648b',
        secondary: '#c2d0db',
        note: 'Annual-report cadence; longest measure, calmest chrome, numbered document compositions, and motion reduced to cut-and-persist state changes.',
      },
    },
    css: `
      .future-root .future-nav { border-bottom: var(--border) solid var(--ink); }
      .future-root .future-hero { max-width: 76rem; padding-top: calc(2rem * var(--space)); padding-bottom: calc(5rem * var(--space)); }
      .future-root .future-hero .type-display { max-width: 9ch; font-size: clamp(3.1rem, 7vw, 6.5rem); line-height: .92; letter-spacing: -.07em; font-weight: 800; overflow-wrap: anywhere; min-width: 0; }
      .future-root .future-hero > p { max-width: 64ch; font-size: 1.05rem; }
      .future-root .section-heading { display: flex; flex-direction: column; gap: .35rem; padding-bottom: 1rem; border-bottom: 2px double var(--ink); }
      .future-root .section-heading > span { align-self: flex-start; }
      .future-root .component-gallery { grid-template-columns: repeat(4, minmax(0, 1fr)); }
      .future-root .component-card:nth-child(5n + 1) { grid-column: span 2; }
      .future-root .button-board { grid-template-columns: 1.1fr 1fr 1fr; border-top: 2px solid var(--ink); }
      .future-root .btn, .future-root .lab-button { min-height: 46px; padding: 0 20px; border-width: 1px; font-weight: 680; letter-spacing: 0; white-space: nowrap; }
      .future-root .btn.primary { border: 2px solid var(--accent); background: var(--accent); color: var(--accent-ink); }
      .future-root .btn.primary:hover, .future-root .btn.primary.is-hover { border-color: var(--ink); background: var(--ink); color: var(--surface); }
      .future-root .btn.secondary { border-color: var(--ink); background: var(--ink); color: var(--surface); }
      .future-root .btn.secondary:hover { background: var(--raised); color: var(--ink); }
      .future-root .btn.ghost { border-color: transparent; border-bottom-color: transparent; background: transparent; color: var(--ink); }
      .future-root .btn.ghost:hover { border-bottom-color: var(--ink); background: transparent; }
      .future-root .btn.danger { border-color: var(--danger); background: var(--surface); color: var(--danger); }
      .future-root .btn.danger:hover { background: var(--danger); color: var(--surface); }
      .future-root .btn:focus-visible, .future-root .btn.is-focus { outline: 2px solid var(--accent); outline-offset: 3px; box-shadow: 0 0 0 1px var(--surface); }
      .future-root .btn:active, .future-root .btn.is-pressed { transform: none; box-shadow: inset 0 0 0 1px var(--ink); background: var(--raised); color: var(--ink); }
      .future-root .btn.icon-btn { width: 46px; padding: 0; }
      .future-root .composition-grid { gap: calc(1.5rem * var(--space)); }
      .future-root .product-grid { gap: calc(1.5rem * var(--space)); }
      .future-root .product-card { border-top: 2px solid var(--product-accent); }
      .future-root .token-swatch { border-bottom: 2px solid var(--ink); }
      @media (max-width: 900px) { .future-root .component-gallery { grid-template-columns: repeat(2, minmax(0, 1fr)); } }
      @media (max-width: 700px) {
        .future-root .button-board, .future-root .component-gallery { grid-template-columns: 1fr; }
        .future-root .component-card:nth-child(5n + 1) { grid-column: auto; }
      }
      @media (prefers-reduced-motion: reduce) { .future-root .btn { transition-duration: 0ms; } }
    `,
  },
];

export default SPECS;
