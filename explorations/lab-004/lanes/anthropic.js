export const SPECS = [
  {
    id: 'R2ANTH-1',
    title: 'Calibration Desk',
    family: 'Misty Step / calibrated instrument',
    move: 'Turn the existing ink-and-rule language into a measured work surface with an explicit action-key grammar.',
    essence:
      'A quiet calibration bench: generous where decisions need attention, tightly ruled where evidence accumulates.',
    dna: [
      'An unmistakable black-weight display register anchored to a calibration rule',
      'Primary actions read as physical instrument keys; navigation remains uncontained ink',
      'Split compositions pair a calm decision field with dense, mono evidence plates',
    ],
    dials: {
      color:
        'Paper, graphite, and one measured ultramarine signal; product color appears only at active evidence and action points.',
      type: 'Geist 800 for the display register, Geist 400/550 for prose, and Geist Mono for calibration marks and data.',
      density:
        'Measured medium density with high-density evidence plates and a deliberately calm settings composition.',
      shape:
        'Zero-radius plates, hairline subdivisions, and a two-line action-key edge.',
      imagery:
        'Orthogonal calibration marks, sparse pen-line plots, and numbered evidence plates rather than illustration.',
    },
    layout: 'split',
    componentLayout: 'strips',
    button: {
      grammar:
        'Action key: a contained square plate with a decisive ink face and a 2px lower datum. Links remain bare ink with no border or fill.',
      height: '36px',
      padding: '0 15px',
      weight: '650',
      primary:
        'Ink face, paper label, ultramarine lower datum; reserved for the single committing action.',
      secondary:
        'Paper face, ink hairline, graphite label; equal geometry without competing tonal mass.',
      ghost:
        'Transparent face with an inset left datum on hover; never used for navigation.',
      destructive:
        'Ink face with danger-colored lower datum and a danger glyph; the label stays paper-white.',
      focus:
        'A 2px outer ultramarine focus frame separated from the button by 2px of paper.',
      pressed:
        'Translate down 1px and exchange the lower datum for a top datum; dimensions never change.',
      loading:
        'Keep label width fixed, replace the leading action glyph with a stepped mono progress mark, and disable repeat activation.',
    },
    tokens: {
      fontDisplay: '"Geist", ui-sans-serif, system-ui, sans-serif',
      fontBody: '"Geist", ui-sans-serif, system-ui, sans-serif',
      fontMono: '"Geist Mono", ui-monospace, monospace',
      radiusSm: '0px',
      radiusMd: '0px',
      radiusLg: '0px',
      border: '1px',
      shadow: '0 10px 30px rgba(21, 21, 21, 0.08)',
      space: '4px',
      control: '36px',
      light: {
        canvas: '#f7f7f5',
        surface: '#fcfcfb',
        raised: '#ffffff',
        ink: '#141516',
        muted: '#6c6e70',
        line: '#dedfdd',
        accent: '#2643d0',
        accentInk: '#ffffff',
        success: '#20764d',
        warning: '#a66309',
        danger: '#b4232d',
      },
      dark: {
        canvas: '#101112',
        surface: '#151617',
        raised: '#1b1c1e',
        ink: '#eeeeec',
        muted: '#9b9d9f',
        line: '#303235',
        accent: '#8c9eff',
        accentInk: '#101112',
        success: '#62c693',
        warning: '#e4a84f',
        danger: '#f07780',
      },
    },
    products: {
      canary: {
        accent: '#1f6e50',
        secondary: '#9ab8aa',
        note: 'Narrow watch rail, compact 13px health cadence, glyph-led incidents, and one resolving check motion; instrument density is highest.',
      },
      powder: {
        accent: '#7b4eb2',
        secondary: '#c5b1d9',
        note: 'Four ruled work lanes, medium card cadence, heavier task titles, and static square ownership marks; composition carries identity.',
      },
      crucible: {
        accent: '#b54b2e',
        secondary: '#d6aa9d',
        note: 'Mono-forward comparison plates, tighter vertical rhythm, paired score columns, and a single once-resolving verdict transition.',
      },
      landmark: {
        accent: '#2643d0',
        secondary: '#aab4e7',
        note: 'Wide release folio, calmer line spacing, bold Geist findings, and off-center changelog composition with no ambient motion.',
      },
    },
    css: `
.future-root { letter-spacing: -0.006em; }
.future-hero { border-left: 3px solid var(--accent); padding-left: clamp(18px, 4vw, 42px); }
.type-display { font-size: clamp(34px, 5vw, 58px); line-height: .9; font-weight: 800; letter-spacing: -.055em; max-width: 12ch; }
.section-heading { border-top: 1px solid var(--line); padding-top: 10px; }
.component-gallery { gap: 1px; background: var(--line); }
.component-card { border: 0; background: var(--surface); }
.button-board { border-block: 1px solid var(--line); padding-block: 18px; }
.btn, .lab-button { min-height: 36px; padding-inline: 15px; font-weight: 650; border: 1px solid var(--ink); letter-spacing: -.01em; transition: transform 90ms ease, box-shadow 90ms ease, background-color 90ms ease; }
.btn.primary { background: var(--ink); color: var(--canvas); box-shadow: inset 0 -2px 0 var(--accent); }
.btn.secondary { background: var(--surface); color: var(--ink); box-shadow: none; }
.btn.ghost { border-color: transparent; background: transparent; color: var(--ink); }
.btn.ghost:hover { box-shadow: inset 3px 0 0 var(--accent); background: var(--raised); }
.btn.danger { background: var(--ink); color: var(--canvas); box-shadow: inset 0 -2px 0 var(--danger); }
.btn:focus-visible, .lab-button:focus-visible { outline: 2px solid var(--accent); outline-offset: 3px; }
.btn:active, .lab-button:active { transform: translateY(1px); box-shadow: inset 0 2px 0 var(--accent); }
.btn.icon-btn { width: 36px; padding: 0; }
.composition-grid { grid-template-columns: minmax(0, 1.35fr) minmax(0, .65fr); }
.product-canary { border-top: 3px solid var(--product-accent); }
.product-powder { border-left: 3px solid var(--product-accent); }
.product-crucible { border-bottom: 3px solid var(--product-accent); }
.product-landmark { border-right: 3px solid var(--product-accent); }
@media (max-width: 620px) { .composition-grid { grid-template-columns: 1fr; } .type-display { font-size: 34px; } }
`,
  },
  {
    id: 'R2ANTH-2',
    title: 'Control Folio',
    family: 'Misty Step / editorial control surface',
    move: 'Preserve the technical-document character but give commands, records, and reading distinct visual registers.',
    essence:
      'A controlled folio whose broad margins make consequential actions legible without softening the instrument.',
    dna: [
      'A compact but unmistakable uppercase display masthead framed by paired hairlines',
      'Buttons use a bracketed command grammar derived from technical annotation, never navigation styling',
      'Ledger compositions alternate full-measure reading bands with compressed utility indices',
    ],
    dials: {
      color:
        'Cool paper and blue-black ink with an ultramarine editorial mark; product accents behave like proofing pencil.',
      type: 'Geist display weight with deliberate tracking contrast; Geist Mono becomes the folio index and command register.',
      density:
        'Calm reading measure at the page level, dense ledgers and controls inside ruled folio bands.',
      shape:
        'Square folio leaves, double rules at major boundaries, and bracket edges on actions.',
      imagery:
        'Margin notes, index marks, proof lines, and compact monochrome diagrams.',
    },
    layout: 'ledger',
    componentLayout: 'ledger',
    button: {
      grammar:
        'Bracket command: square controls have a strong left command bar and a fine enclosing rule; navigation has neither containment nor command bar.',
      height: '38px',
      padding: '0 16px 0 19px',
      weight: '700',
      primary:
        'Ultramarine command bar on a blue-black ink plate with paper label.',
      secondary: 'Ultramarine command bar on paper with an ink enclosure.',
      ghost:
        'No enclosure at rest, but retains a one-pixel command bar so it still reads as an action.',
      destructive:
        'Danger command bar, ink plate, danger glyph; no filled red field.',
      focus:
        'Two offset hairline frames: inner ink and outer accent, with high contrast in both modes.',
      pressed:
        'The command bar widens from 3px to 6px while the control remains dimensionally fixed.',
      loading:
        'Command bar becomes a three-step static progress ruler; label changes to the exact ongoing verb.',
    },
    tokens: {
      fontDisplay: '"Geist", ui-sans-serif, system-ui, sans-serif',
      fontBody: '"Geist", ui-sans-serif, system-ui, sans-serif',
      fontMono: '"Geist Mono", ui-monospace, monospace',
      radiusSm: '0px',
      radiusMd: '0px',
      radiusLg: '0px',
      border: '1px',
      shadow: '0 14px 34px rgba(14, 20, 30, 0.07)',
      space: '5px',
      control: '38px',
      light: {
        canvas: '#f4f5f5',
        surface: '#fbfcfc',
        raised: '#ffffff',
        ink: '#111820',
        muted: '#68717a',
        line: '#d9dddf',
        accent: '#2544ca',
        accentInk: '#ffffff',
        success: '#24734e',
        warning: '#9e650d',
        danger: '#b12835',
      },
      dark: {
        canvas: '#0f1317',
        surface: '#14191e',
        raised: '#1a2026',
        ink: '#edf0f2',
        muted: '#98a1a9',
        line: '#2e363d',
        accent: '#93a5ff',
        accentInk: '#0f1317',
        success: '#67c996',
        warning: '#e3ab56',
        danger: '#f17a85',
      },
    },
    products: {
      canary: {
        accent: '#167153',
        secondary: '#9dc8b9',
        note: 'A compact edge index, narrow uptime folios, equal-weight status labels with colored glyphs, and instant cut transitions between incidents.',
      },
      powder: {
        accent: '#7852ad',
        secondary: '#c0aed7',
        note: 'Broad board folios, compressed mono metadata, staggered column cadence, and ownership marks that behave like margin annotations.',
      },
      crucible: {
        accent: '#ad4c31',
        secondary: '#d7ad9f',
        note: 'Dense paired ledgers, elevated mono ratio, repeating evidence geometry, and one soft 480ms verdict resolution after scoring.',
      },
      landmark: {
        accent: '#2544ca',
        secondary: '#a8b3e6',
        note: 'Calm document measure, wider section cadence, dominant 800-weight release headings, and sparse proof-line imagery at key milestones.',
      },
    },
    css: `
.future-root { letter-spacing: -.004em; }
.future-hero { border-block: 3px double var(--ink); padding-block: clamp(22px, 5vw, 52px); }
.type-display { font-size: clamp(31px, 4.3vw, 50px); line-height: .92; font-weight: 800; letter-spacing: .045em; text-transform: uppercase; max-width: 15ch; }
.future-section { border-top: 3px double var(--line); }
.section-heading { font-family: var(--font-mono); letter-spacing: .08em; text-transform: uppercase; }
.component-gallery { display: block; }
.component-card { border-inline: 0; border-bottom: 1px solid var(--line); }
.specimen { border-left: 1px solid var(--line); padding-left: clamp(14px, 3vw, 32px); }
.button-lab { border: 1px solid var(--ink); }
.button-board { padding: 20px; }
.btn, .lab-button { min-height: 38px; padding: 0 16px 0 19px; border: 1px solid var(--ink); font-weight: 700; box-shadow: inset 3px 0 0 var(--accent); transition: box-shadow 100ms ease, background-color 100ms ease; }
.btn.primary { background: var(--ink); color: var(--canvas); }
.btn.secondary { background: var(--surface); color: var(--ink); }
.btn.ghost { border-color: transparent; background: transparent; color: var(--ink); box-shadow: inset 1px 0 0 var(--accent); }
.btn.ghost:hover { border-color: var(--line); background: var(--raised); box-shadow: inset 3px 0 0 var(--accent); }
.btn.danger { background: var(--ink); color: var(--canvas); box-shadow: inset 3px 0 0 var(--danger); }
.btn:focus-visible, .lab-button:focus-visible { outline: 1px solid var(--accent); outline-offset: 4px; }
.btn:active, .lab-button:active { box-shadow: inset 6px 0 0 var(--accent); }
.btn.icon-btn { width: 38px; padding: 0; }
.state-grid { gap: 0; border: 1px solid var(--line); }
.product-grid { gap: 1px; background: var(--line); }
.product-card { border: 0; background: var(--surface); }
.product-canary { border-left: 2px solid var(--product-accent); }
.product-powder { border-top: 2px solid var(--product-accent); }
.product-crucible { border-left: 5px double var(--product-accent); }
.product-landmark { border-top: 5px double var(--product-accent); }
@media (max-width: 620px) { .type-display { font-size: 31px; letter-spacing: .025em; } .button-board { padding: 14px; } }
`,
  },
  {
    id: 'R2ANTH-3',
    title: 'Relay Board',
    family: 'Misty Step / signal-routing workbench',
    move: 'Organize the system as a visible relay of state, evidence, and decision without adding ambient motion or dashboard gloss.',
    essence:
      'A precise relay board where every rule carries a relationship and every action key closes a circuit.',
    dna: [
      'A large black display block paired with a thin mono route legend',
      'High-contrast keycap buttons use a visible terminal edge and dimensional press feedback',
      'An atlas of connected strips lets dense operator products and calm document products share one family',
    ],
    dials: {
      color:
        'Neutral electrical paper, carbon ink, and ultramarine active routes; product hues identify circuits, never severity.',
      type: 'Geist 800 creates the terminal header; Geist Mono carries routes, coordinates, and dense operational context.',
      density:
        'Medium-high by default, with deliberate open circuit breaks around decisions and explanatory copy.',
      shape:
        'Hard terminal blocks, orthogonal strip cadence, and emphatic 2px button edges within a hairline system.',
      imagery:
        'Orthogonal signal diagrams, node ticks, and sparse circuit legends drawn entirely as rules and glyphs.',
    },
    layout: 'atlas',
    componentLayout: 'bento',
    button: {
      grammar:
        'Terminal key: every action has a 2px terminal edge and compact keycap proportions; navigation remains a one-line ink label with an active route mark.',
      height: '34px',
      padding: '0 13px',
      weight: '700',
      primary:
        'Ultramarine face, accent-ink label, and a black terminal edge on the right.',
      secondary:
        'Raised paper face with a 2px ink terminal edge and hairline enclosure.',
      ghost:
        'Transparent face with a persistent terminal edge only; hover adds a neutral wash.',
      destructive:
        'Ink face with a 2px danger terminal and danger glyph; red never fills the control.',
      focus:
        'A square accent frame at 3px offset plus an inner high-contrast hairline.',
      pressed:
        'Translate 1px toward the terminal edge and invert the terminal from right to left; no scale animation.',
      loading:
        'Terminal edge advances through three discrete positions once, then persists at completion; text width is reserved.',
    },
    tokens: {
      fontDisplay: '"Geist", ui-sans-serif, system-ui, sans-serif',
      fontBody: '"Geist", ui-sans-serif, system-ui, sans-serif',
      fontMono: '"Geist Mono", ui-monospace, monospace',
      radiusSm: '0px',
      radiusMd: '0px',
      radiusLg: '0px',
      border: '1px',
      shadow: '0 12px 28px rgba(12, 14, 18, 0.09)',
      space: '4px',
      control: '34px',
      light: {
        canvas: '#f5f6f5',
        surface: '#fbfcfb',
        raised: '#ffffff',
        ink: '#121416',
        muted: '#666b70',
        line: '#dadddc',
        accent: '#2446d8',
        accentInk: '#ffffff',
        success: '#20764f',
        warning: '#9f670c',
        danger: '#b52932',
      },
      dark: {
        canvas: '#0f1112',
        surface: '#151718',
        raised: '#1b1e20',
        ink: '#eff0ed',
        muted: '#9a9ea1',
        line: '#303437',
        accent: '#91a3ff',
        accentInk: '#0f1112',
        success: '#65c996',
        warning: '#e1ab55',
        danger: '#f17a82',
      },
    },
    products: {
      canary: {
        accent: '#177252',
        secondary: '#8fbbaa',
        note: 'Tight vertical signal strips, low body-to-mono ratio, square health nodes, and a single gentle route confirmation when service returns.',
      },
      powder: {
        accent: '#7850b5',
        secondary: '#bba7d8',
        note: 'Horizontal ownership relays, medium card rhythm, alternating lane widths, and no motion beyond drag, drop, and resolved placement feedback.',
      },
      crucible: {
        accent: '#b34e2e',
        secondary: '#d4a594',
        note: 'Dense matrix atlas, maximal mono use, repeated terminal geometry, and discrete step transitions between evaluation phases.',
      },
      landmark: {
        accent: '#2446d8',
        secondary: '#a4b1eb',
        note: 'Open horizontal release routes, heavier document prose, sparse node imagery, and static milestones that trade density for scanning calm.',
      },
    },
    css: `
.future-root { letter-spacing: -.008em; }
.future-hero { display: grid; grid-template-columns: minmax(0, 1.4fr) minmax(180px, .6fr); gap: clamp(20px, 5vw, 64px); border-bottom: 2px solid var(--ink); }
.type-display { font-size: clamp(36px, 5.5vw, 64px); line-height: .86; font-weight: 800; letter-spacing: -.065em; max-width: 10ch; }
.future-nav { border-right: 1px solid var(--line); }
.section-heading { border-left: 2px solid var(--accent); padding-left: 10px; }
.component-gallery { gap: 8px; }
.component-card { border-width: 1px 1px 2px 1px; }
.button-lab { border-top: 2px solid var(--ink); border-bottom: 1px solid var(--line); }
.button-board { padding-block: 16px; }
.btn, .lab-button { min-height: 34px; padding: 0 13px; font-weight: 700; border: 1px solid var(--ink); box-shadow: inset -2px 0 0 var(--ink); transition: transform 80ms ease, box-shadow 80ms ease, background-color 80ms ease; }
.btn.primary { background: var(--accent); color: var(--accent-ink); border-color: var(--accent); box-shadow: inset -2px 0 0 var(--ink); }
.btn.secondary { background: var(--raised); color: var(--ink); box-shadow: inset -2px 0 0 var(--ink); }
.btn.ghost { background: transparent; color: var(--ink); border-color: transparent; box-shadow: inset -2px 0 0 var(--ink); }
.btn.ghost:hover { background: var(--raised); border-color: var(--line); }
.btn.danger { background: var(--ink); color: var(--canvas); box-shadow: inset -2px 0 0 var(--danger); }
.btn:focus-visible, .lab-button:focus-visible { outline: 2px solid var(--accent); outline-offset: 3px; }
.btn:active, .lab-button:active { transform: translateX(1px); box-shadow: inset 2px 0 0 var(--accent); }
.btn.icon-btn { width: 34px; padding: 0; }
.motion-grid { gap: 1px; background: var(--line); }
.composition-grid { gap: 8px; }
.product-card { border-top: 1px solid var(--line); border-right: 2px solid var(--product-accent); }
.product-canary { border-left: 1px solid var(--product-accent); }
.product-powder { border-bottom: 3px double var(--product-accent); }
.product-crucible { border-top: 3px double var(--product-accent); }
.product-landmark { border-left: 6px double var(--product-accent); }
@media (max-width: 620px) { .future-hero { grid-template-columns: 1fr; } .type-display { font-size: 36px; } }
`,
  },
];

export default SPECS;
