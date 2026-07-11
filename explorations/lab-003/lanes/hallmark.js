/* Hallmark · pre-emit critique: P5 H5 E4 S5 R5 V5 */

const SPECS = [
  {
    id: 'HALL-1',
    title: 'Field Ledger',
    family: 'ruled operational editorial',
    move: 'Turns every surface into a continuously ruled working ledger whose hierarchy comes from alignment, register, and decisive ink cuts.',
    essence:
      'It keeps Misty Step precise and machine-legible while replacing the current single-size austerity with a disciplined editorial scale and much stronger operational rhythm.',
    dna: [
      'hairline rules do the work usually assigned to nested cards',
      'one vermilion signal is spent only on the current decision or live state',
      'tabular evidence and plain-language actions share one strict baseline grid',
    ],
    dials: {
      color:
        'products choose one signal ink plus a low-chroma paper tint; status roles stay universal',
      type: 'products tune the ratio of compact grotesk to tabular mono without changing the scale',
      density:
        'products select field, desk, or command spacing and corresponding row cadence',
      shape:
        'products choose rule weight and corner notching; controls remain rectilinear',
      imagery:
        'products select cartographic lines, proof marks, test traces, or release stamps',
    },
    layout: 'ledger',
    componentLayout: 'ledger',
    tokens: {
      fontDisplay: '"Arial Narrow", "Helvetica Neue", Arial, sans-serif',
      fontBody: '"Helvetica Neue", Arial, sans-serif',
      fontMono: '"SFMono-Regular", Consolas, "Liberation Mono", monospace',
      radiusSm: '0',
      radiusMd: '0',
      radiusLg: '0',
      border: '1px',
      shadow: 'none',
      space: 0.9,
      control: '2.25rem',
      light: {
        canvas: '#f1efe9',
        surface: '#fbfaf6',
        raised: '#ffffff',
        ink: '#171714',
        muted: '#68665f',
        line: '#cbc8be',
        accent: '#c43a24',
        accentInk: '#ffffff',
        success: '#237052',
        warning: '#9b6712',
        danger: '#b52828',
      },
      dark: {
        canvas: '#11110f',
        surface: '#181815',
        raised: '#22221e',
        ink: '#f1efe8',
        muted: '#a4a198',
        line: '#3b3a34',
        accent: '#ff6a4d',
        accentInk: '#1a0b07',
        success: '#69c69b',
        warning: '#dfad51',
        danger: '#ff7770',
      },
    },
    products: {
      canary: {
        accent: '#d33d25',
        secondary: '#f0b44c',
        note: 'fast field density · pulse traces · heavier live rule · compressed grotesk bias',
      },
      powder: {
        accent: '#6a57c8',
        secondary: '#d7c9ff',
        note: 'desk density · ticket folios · column notches · balanced grotesk and mono',
      },
      crucible: {
        accent: '#167567',
        secondary: '#9fd5c9',
        note: 'command density · evidence grids · double test rules · mono-forward typography',
      },
      landmark: {
        accent: '#245fa8',
        secondary: '#a8c7e8',
        note: 'field density · release stamps · wide document measure · grotesk-forward typography',
      },
    },
    css: `
      .future-root { letter-spacing: .005em; }
      .future-hero { border-block: var(--border) solid var(--line); }
      .future-section { border-top: var(--border) solid var(--line); }
      .component-card { box-shadow: inset 3px 0 0 transparent; }
      .component-card:hover { box-shadow: inset 3px 0 0 var(--accent); }
      .future-nav a[aria-current="true"] { box-shadow: inset 3px 0 0 var(--accent); }
    `,
  },
  {
    id: 'HALL-2',
    title: 'Quiet Index',
    family: 'archival humanist index',
    move: 'Organizes the system as a calm reading room: generous indexed sections, slim folio tabs, and tactile paper layers with almost no decorative chrome.',
    essence:
      'Misty Step remains an exact technical instrument, but feels humane and enduring enough for documents, settings, and patient investigative work.',
    dna: [
      'an upright humanist serif carries meaning while a neutral sans handles action',
      'folio tabs and fine keylines reveal location without enclosing every object',
      'muted mineral color appears as paper stock before it appears as interface paint',
    ],
    dials: {
      color:
        'products own a mineral paper cast, one binding color, and an optional annotation ink',
      type: 'products tune serif presence across titles, documents, and data labels',
      density:
        'products choose reading, working, or review measure with matching sectional cadence',
      shape:
        'products choose square, clipped, or subtly eased folio corners within a narrow range',
      imagery:
        'products choose marginalia, botanical gauges, docket marks, or chronological plates',
    },
    layout: 'split',
    componentLayout: 'strips',
    tokens: {
      fontDisplay: 'Georgia, "Times New Roman", serif',
      fontBody: 'Avenir, "Avenir Next", "Segoe UI", sans-serif',
      fontMono: '"SFMono-Regular", Consolas, "Liberation Mono", monospace',
      radiusSm: '2px',
      radiusMd: '4px',
      radiusLg: '6px',
      border: '1px',
      shadow: '0 10px 30px rgba(38, 34, 24, 0.08)',
      space: 1.18,
      control: '2.65rem',
      light: {
        canvas: '#ece9df',
        surface: '#f8f6ef',
        raised: '#fffdf7',
        ink: '#26251f',
        muted: '#747064',
        line: '#d7d1c2',
        accent: '#415e55',
        accentInk: '#ffffff',
        success: '#3f7257',
        warning: '#9a6b21',
        danger: '#a13e38',
      },
      dark: {
        canvas: '#151613',
        surface: '#1d1e1a',
        raised: '#292a25',
        ink: '#efede4',
        muted: '#aaa69a',
        line: '#3f4039',
        accent: '#9cc2b4',
        accentInk: '#10211b',
        success: '#8ac69f',
        warning: '#dbb46d',
        danger: '#e68b82',
      },
    },
    products: {
      canary: {
        accent: '#b24a3e',
        secondary: '#e8c29c',
        note: 'working measure · alert marginalia · clipped folios · sans-forward live readings',
      },
      powder: {
        accent: '#74609c',
        secondary: '#d4c9e7',
        note: 'review measure · docket tabs · eased folios · equal serif and sans voice',
      },
      crucible: {
        accent: '#3f665c',
        secondary: '#b8d0c6',
        note: 'working measure · proof annotations · square folios · mono-forward evidence',
      },
      landmark: {
        accent: '#3d6280',
        secondary: '#bfd0dc',
        note: 'reading measure · chronology plates · eased folios · serif-forward release narrative',
      },
    },
    css: `
      .future-hero h1, .section-head h2 { font-family: var(--font-display); font-weight: 600; letter-spacing: -.025em; }
      .future-section { padding-block: calc(var(--section-space) * 1.15); }
      .component-card { border-inline: 0; }
      .component-card::before { content: ""; display: block; width: 2.5rem; border-top: 2px solid var(--accent); }
      .swatch { border-radius: 50% 50% 4px 4px; }
    `,
  },
  {
    id: 'HALL-3',
    title: 'Signal Loom',
    family: 'spatial technical canvas',
    move: 'Weaves controls, evidence, and narrative into an asymmetric field of anchored modules connected by a restrained coordinate grammar.',
    essence:
      'It gives Misty Step a more contemporary, delightful spatial voice without surrendering the family traits of exact state, editorial clarity, and technical illustration.',
    dna: [
      'every module has an explicit coordinate role rather than falling into a generic card grid',
      'a luminous-but-flat signal pair separates action from context without gradients or glow',
      'motion follows paths between related states and resolves once',
    ],
    dials: {
      color:
        'products own a signal pair and canvas temperature while semantic state remains stable',
      type: 'products choose wide, neutral, or compact grotesk display cuts over a shared readable body',
      density:
        'products set module span, seam width, and information depth rather than merely shrinking gaps',
      shape:
        'products choose a corner cut, inset keyline, or square seam as their construction signature',
      imagery:
        'products choose waveform, board topology, evaluation plane, or release constellation',
    },
    layout: 'canvas',
    componentLayout: 'bento',
    tokens: {
      fontDisplay: '"Arial Black", "Helvetica Neue", Arial, sans-serif',
      fontBody: '"Helvetica Neue", Arial, sans-serif',
      fontMono: '"SFMono-Regular", Consolas, "Liberation Mono", monospace',
      radiusSm: '3px',
      radiusMd: '7px',
      radiusLg: '12px',
      border: '1px',
      shadow: '0 14px 42px rgba(19, 22, 31, 0.12)',
      space: 1.02,
      control: '2.5rem',
      light: {
        canvas: '#e9ecf0',
        surface: '#f6f7f8',
        raised: '#ffffff',
        ink: '#171a21',
        muted: '#626977',
        line: '#cdd2da',
        accent: '#3159d8',
        accentInk: '#ffffff',
        success: '#197458',
        warning: '#9a6816',
        danger: '#b73547',
      },
      dark: {
        canvas: '#0f1219',
        surface: '#171b24',
        raised: '#202634',
        ink: '#eef1f7',
        muted: '#9ba4b4',
        line: '#343c4c',
        accent: '#83a0ff',
        accentInk: '#101733',
        success: '#65cda5',
        warning: '#e3b65f',
        danger: '#f07c8c',
      },
    },
    products: {
      canary: {
        accent: '#de4d3d',
        secondary: '#ffc85e',
        note: 'tight signal spans · waveform seams · cut corners · compact display for rapid scan',
      },
      powder: {
        accent: '#7656dc',
        secondary: '#d0c0ff',
        note: 'medium board spans · topology seams · inset keylines · neutral display for deliberation',
      },
      crucible: {
        accent: '#00a285',
        secondary: '#8de2cd',
        note: 'dense evidence spans · evaluation planes · square seams · wide display versus mono data',
      },
      landmark: {
        accent: '#2877bd',
        secondary: '#9bcbed',
        note: 'broad narrative spans · release constellations · inset keylines · wide display for milestones',
      },
    },
    css: `
      .future-root { background-image: none; }
      .future-hero { border: var(--border) solid var(--line); box-shadow: var(--shadow); }
      .component-card:nth-child(3n + 1) { grid-column: span 2; }
      .component-card { position: relative; overflow: clip; }
      .component-card::after { content: ""; position: absolute; inline-size: 2.5rem; block-size: 2px; inset: 0 0 auto auto; background: var(--accent); transform-origin: right; }
      .component-card:hover::after { transform: scaleX(.45); }
      @media (max-width: 620px) { .component-card:nth-child(3n + 1) { grid-column: span 1; } }
    `,
  },
];

export default SPECS;
