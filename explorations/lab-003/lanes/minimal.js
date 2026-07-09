export const SPECS = {
  'MIN-1': {
    id: 'MIN-1',
    title: 'Quiet Ledger',
    family: 'editorial operations ledger',
    move: 'Turn every surface into a continuous ruled record where hierarchy comes from column rhythm, ink weight, and deliberate interruptions.',
    essence:
      'Misty Step becomes a calm operating record: exact, inspectable, and unmistakably technical without inheriting the current system’s square single-register costume.',
    dna: [
      'continuous hairline structure',
      'tabular evidence beside human prose',
      'state changes resolve once and remain visible',
    ],
    dials: {
      color:
        'Products choose one archival ink and one pale annotation stock; color marks ownership and intervention, never ambient decoration.',
      type: 'Products tune the ratio of humanist sans prose to mono evidence, with display weight reserved for decisive summaries.',
      density:
        'Products choose row cadence and column count: Canary breathes, Powder compacts, Crucible compares, Landmark sequences.',
      shape:
        'Products choose rule emphasis and inset depth within a shared crisp 2/6/10px corner family.',
      imagery:
        'Products choose an evidence form: pulse trace, card slips, comparison plots, or release stamps.',
    },
    layout: 'ledger',
    componentLayout: 'ledger',
    tokens: {
      fontDisplay: "'Newsreader', 'Iowan Old Style', Georgia, serif",
      fontBody: "'Geist Sans', 'Avenir Next', 'Helvetica Neue', sans-serif",
      fontMono: "'Geist Mono', 'SFMono-Regular', Consolas, monospace",
      radiusSm: '2px',
      radiusMd: '6px',
      radiusLg: '10px',
      border: '1px',
      shadow: '0 2px 12px rgba(35, 31, 24, 0.035)',
      space: 0.9,
      control: '2.25rem',
      light: {
        canvas: '#f4f1ea',
        surface: '#fbfaf6',
        raised: '#ffffff',
        ink: '#24231f',
        muted: '#706d65',
        line: '#ddd8ce',
        accent: '#325b57',
        accentInk: '#ffffff',
        success: '#39704d',
        warning: '#956d24',
        danger: '#9a443e',
      },
      dark: {
        canvas: '#171816',
        surface: '#1e201d',
        raised: '#252724',
        ink: '#eeede7',
        muted: '#a4a69e',
        line: '#343831',
        accent: '#8fbcb3',
        accentInk: '#14201d',
        success: '#82bd91',
        warning: '#d2ad65',
        danger: '#d98980',
      },
    },
    products: {
      canary: {
        accent: '#397868',
        secondary: '#dcebe4',
        note: 'Airy watch ledger: tall pulse rows, generous exception notes, waveform and check-in imagery.',
      },
      powder: {
        accent: '#9a5b36',
        secondary: '#f0e0d4',
        note: 'Compact dispatch ledger: shallow rows, owner gutters, clipped task slips, and fast keyboard scanning.',
      },
      crucible: {
        accent: '#765b9b',
        secondary: '#e7dff0',
        note: 'Paired trial ledger: mirrored result columns, confidence intervals, verdict margins, and mono-heavy evidence.',
      },
      landmark: {
        accent: '#315f8c',
        secondary: '#dce8f1',
        note: 'Release folio: chronological signatures, broad editorial summaries, stamped milestones, and restrained density.',
      },
    },
    css: `
      .specimen { background-image: linear-gradient(to bottom, transparent calc(2.75rem - 1px), var(--line) 2.75rem); background-size: 100% 2.75rem; }
      .card, .table, .menu { box-shadow: none; }
      .card { border-inline: 0; }
    `,
  },
  'MIN-2': {
    id: 'MIN-2',
    title: 'Field Notes',
    family: 'annotated utilitarian canvas',
    move: 'Compose the product as a spacious working sheet with offset notes, clipped evidence blocks, and a single decisive action edge.',
    essence:
      'This is Misty Step as an expert’s marked-up notebook: restrained and precise, but more tactile, flexible, and product-expressive than a rigid instrument panel.',
    dna: [
      'paper-and-ink restraint',
      'annotation is a first-class information layer',
      'interaction motion is brief and causal',
    ],
    dials: {
      color:
        'Products own a washed paper tint plus a saturated editorial mark used for selections, annotations, and the action edge.',
      type: 'Products choose serif emphasis for interpretation and sans/mono emphasis for operation, while preserving a common compact UI register.',
      density:
        'Products set the proportion of open reading space to clipped evidence blocks rather than globally scaling every control.',
      shape:
        'Products steer between clipped rectangles and softly bound note cards inside a 4/10/16px family.',
      imagery:
        'Products use distinct marginalia: sensor traces, task tickets, test diagrams, or release colophons.',
    },
    layout: 'canvas',
    componentLayout: 'bento',
    tokens: {
      fontDisplay: "'Instrument Serif', 'Newsreader', Georgia, serif",
      fontBody: "'Switzer', 'Avenir Next', 'Helvetica Neue', sans-serif",
      fontMono: "'JetBrains Mono', 'SFMono-Regular', monospace",
      radiusSm: '4px',
      radiusMd: '10px',
      radiusLg: '16px',
      border: '1px',
      shadow: '0 3px 18px rgba(49, 42, 30, 0.045)',
      space: 1.16,
      control: '2.625rem',
      light: {
        canvas: '#f7f3ea',
        surface: '#fffdf8',
        raised: '#ffffff',
        ink: '#28251f',
        muted: '#777166',
        line: '#e3dccf',
        accent: '#b34e37',
        accentInk: '#ffffff',
        success: '#47725a',
        warning: '#9a6d21',
        danger: '#a4433c',
      },
      dark: {
        canvas: '#191815',
        surface: '#211f1b',
        raised: '#292620',
        ink: '#f2eee5',
        muted: '#aaa398',
        line: '#3a362f',
        accent: '#e58972',
        accentInk: '#261510',
        success: '#8ab89a',
        warning: '#d5ad61',
        danger: '#df8179',
      },
    },
    products: {
      canary: {
        accent: '#327565',
        secondary: '#dcebe2',
        note: 'Observation sheet: wide breathing room, vertical sensor traces, sparse alert annotations, and calm resolution cards.',
      },
      powder: {
        accent: '#b25337',
        secondary: '#f3ded2',
        note: 'Pinned worktable: overlapping ticket rhythm, compact assignment blocks, tactile selection marks, and stronger action edge.',
      },
      crucible: {
        accent: '#6d55a2',
        secondary: '#e7e0f2',
        note: 'Lab notebook: diagram-led cards, paired hypotheses, handwritten-style marginal verdicts, and denser evidence insets.',
      },
      landmark: {
        accent: '#2e628c',
        secondary: '#dce8f1',
        note: 'Publication proof: broad reading measure, release colophons, change annotations, and chapter-like milestone spacing.',
      },
    },
    css: `
      .card:nth-child(3n + 1) { transform: translateY(0.35rem); }
      .card { border-color: color-mix(in srgb, var(--line) 88%, var(--accent)); }
      .badge { border-radius: var(--radius-sm); text-transform: uppercase; letter-spacing: .07em; }
    `,
  },
  'MIN-3': {
    id: 'MIN-3',
    title: 'Index Atlas',
    family: 'modular editorial index',
    move: 'Organize the interface as a responsive atlas of numbered modules whose scale and adjacency explain priority before color does.',
    essence:
      'Misty Step gains a flexible system for dashboards and workbenches: still quiet and inspectable, but memorable through typographic indexing and asymmetrical composition.',
    dna: [
      'numbered modules create navigable memory',
      'asymmetry carries hierarchy without spectacle',
      'ink, rules, and state remain semantically disciplined',
    ],
    dials: {
      color:
        'Products choose a categorical accent pair: one for active index marks and one pale field for domain-specific module types.',
      type: 'Products tune display compression and mono index prominence while body copy remains highly legible.',
      density:
        'Products choose atlas granularity—large observatory modules, medium boards, dense comparison tiles, or long-form release plates.',
      shape:
        'Products control module softness and keyline weight within a 3/8/12px family; adjacency, not floating shadows, groups content.',
      imagery:
        'Products own one diagram grammar: radial status map, queue topology, evaluation matrix, or release dependency map.',
    },
    layout: 'atlas',
    componentLayout: 'grid',
    tokens: {
      fontDisplay: "'Geist Sans', 'Arial Narrow', 'Helvetica Neue', sans-serif",
      fontBody: "'Geist Sans', 'Avenir Next', 'Helvetica Neue', sans-serif",
      fontMono: "'Geist Mono', 'IBM Plex Mono', monospace",
      radiusSm: '3px',
      radiusMd: '8px',
      radiusLg: '12px',
      border: '1px',
      shadow: 'none',
      space: 1.02,
      control: '2.375rem',
      light: {
        canvas: '#f2f3f0',
        surface: '#fafbf8',
        raised: '#ffffff',
        ink: '#202420',
        muted: '#697069',
        line: '#d9ddd7',
        accent: '#3b4f87',
        accentInk: '#ffffff',
        success: '#39734d',
        warning: '#956d24',
        danger: '#9c403d',
      },
      dark: {
        canvas: '#151716',
        surface: '#1c1f1d',
        raised: '#242725',
        ink: '#eef0ec',
        muted: '#9ea59e',
        line: '#333834',
        accent: '#98a8d9',
        accentInk: '#17203c',
        success: '#82bd91',
        warning: '#d4ad64',
        danger: '#dc7d77',
      },
    },
    products: {
      canary: {
        accent: '#2f7866',
        secondary: '#d8ebe3',
        note: 'Observatory atlas: fewer large modules, radial service map, pulse-led numerals, and quiet health summaries.',
      },
      powder: {
        accent: '#a35332',
        secondary: '#efdfd4',
        note: 'Queue atlas: many medium modules, lane adjacency, bold owner indices, and high-frequency keyboard affordances.',
      },
      crucible: {
        accent: '#6c56a4',
        secondary: '#e4def0',
        note: 'Evaluation atlas: dense paired tiles, matrix adjacency, prominent experiment IDs, and confidence-first plots.',
      },
      landmark: {
        accent: '#31638c',
        secondary: '#dbe7ef',
        note: 'Release atlas: long horizontal plates, dependency cartography, edition numbering, and editorial change summaries.',
      },
    },
    css: `
      .card { position: relative; box-shadow: none; }
      .card::before { content: attr(data-index); color: var(--accent); font-family: var(--font-mono); font-size: .7rem; letter-spacing: .08em; }
      .grid { grid-auto-flow: dense; }
    `,
  },
};
