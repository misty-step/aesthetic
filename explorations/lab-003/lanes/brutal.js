export const SPECS = {
  'BRUT-1': {
    id: 'BRUT-1',
    title: 'Datum Press',
    family: 'Swiss industrial calibration atlas',
    move: 'Turn every surface into a numbered calibration sheet whose rules, folios, and oversized datum marks make structure visible.',
    essence:
      'Misty Step becomes a precise publishing instrument: editorial, inspectable, unmistakable at any product density, and expressive without ornamental chrome.',
    dna: [
      'numbered plate grammar',
      'asymmetric rule-built grid',
      'weight and whitespace establish hierarchy',
    ],
    dials: {
      color:
        'Each product owns one signal ink plus a pale proofing stock used only for selection and diagrams.',
      type: 'Each product chooses a condensed, grotesque, or mono-forward register while keeping the same plate hierarchy.',
      density:
        'Each product sets its folio cadence, cell packing, and ratio of blank proofing field to data.',
      shape:
        'All geometry is rectilinear; products vary rule weight, crop-mark frequency, and solid-versus-outline controls.',
      imagery:
        'Products own a technical print process: halftone plots, punched job slips, specimen grids, or revision stamps.',
    },
    layout: 'atlas',
    componentLayout: 'grid',
    tokens: {
      fontDisplay: '"Arial Narrow", "Helvetica Neue", Arial, sans-serif',
      fontBody: '"Helvetica Neue", Helvetica, Arial, sans-serif',
      fontMono: '"IBM Plex Mono", "Courier New", monospace',
      radiusSm: '0',
      radiusMd: '0',
      radiusLg: '0',
      border: '1px',
      shadow: 'none',
      space: 1.08,
      control: '2.5rem',
      light: {
        canvas: '#e9e7df',
        surface: '#f7f5ee',
        raised: '#ffffff',
        ink: '#11110f',
        muted: '#66645d',
        line: '#171713',
        accent: '#e1261c',
        accentInk: '#ffffff',
        success: '#17633a',
        warning: '#9a5b00',
        danger: '#c51b12',
      },
      dark: {
        canvas: '#11110f',
        surface: '#191916',
        raised: '#24231f',
        ink: '#f0eee6',
        muted: '#aaa79d',
        line: '#d8d5ca',
        accent: '#ff493d',
        accentInk: '#11110f',
        success: '#65c98b',
        warning: '#efb34f',
        danger: '#ff6258',
      },
    },
    products: {
      canary: {
        accent: '#e1261c',
        secondary: '#f2cf3a',
        note: 'Alarm-red inspection sheet; dense check cells, diagonal quarantine hatching, and condensed uppercase labels.',
      },
      powder: {
        accent: '#1455c0',
        secondary: '#dce6f5',
        note: 'Blue job-ticket board; wider writing fields, punched folio numerals, and bold ownership bars.',
      },
      crucible: {
        accent: '#e85d04',
        secondary: '#151515',
        note: 'Orange proof press; split before/after plates, heavier specimen rules, and mono measurement captions.',
      },
      landmark: {
        accent: '#176b4d',
        secondary: '#d9dfcf',
        note: 'Archive-green release index; generous folio fields, edition stamps, and bookish revision gutters.',
      },
    },
    css: `
      .lab-spec { background-image: linear-gradient(var(--line) 1px, transparent 1px), linear-gradient(90deg, var(--line) 1px, transparent 1px); background-size: 100% 4rem, 25% 100%; }
      .lab-spec [data-region] { border-inline-start: var(--border) solid var(--line); }
      .lab-spec [data-region]::before { content: attr(data-index); font: 700 clamp(2.5rem, 12vw, 8rem)/.82 var(--font-display); letter-spacing: -.06em; }
      .lab-spec :is(button, input, select, [role='tab']) { text-transform: uppercase; letter-spacing: .055em; }
    `,
  },
  'BRUT-2': {
    id: 'BRUT-2',
    title: 'Night Watch',
    family: 'tactical telemetry ledger',
    move: 'Organize every interaction as an addressable telemetry row, with a persistent command rail and explicit machine-state framing.',
    essence:
      'Misty Step reads as trusted operational equipment: dense but legible, behavior-first, and calm under pressure rather than theatrically futuristic.',
    dna: [
      'addressable ledger rows',
      'single phosphor signal channel',
      'persistent command-and-state framing',
    ],
    dials: {
      color:
        'Each product owns one phosphor channel and one low-luminance sector tint; severity remains a separate glyph channel.',
      type: 'Each product sets its ratio of mono telemetry to compact technical sans and chooses its numeral treatment.',
      density:
        'Each product owns row pitch, metadata columns, and how much diagnostic context is expanded by default.',
      shape:
        'All corners stay hard; products vary bracket style, crosshair scale, and whether actions invert or outline.',
      imagery:
        'Products own an instrument trace: heartbeat raster, queue tape, evaluation waveform, or release checksum field.',
    },
    layout: 'rail',
    componentLayout: 'ledger',
    tokens: {
      fontDisplay: '"Arial Narrow", "Roboto Condensed", sans-serif',
      fontBody: '"IBM Plex Sans", "Helvetica Neue", sans-serif',
      fontMono: '"JetBrains Mono", "SFMono-Regular", Consolas, monospace',
      radiusSm: '0',
      radiusMd: '0',
      radiusLg: '0',
      border: '1px',
      shadow: 'none',
      space: 0.84,
      control: '2.125rem',
      light: {
        canvas: '#dfe1dc',
        surface: '#f0f1ec',
        raised: '#fafbf5',
        ink: '#121712',
        muted: '#586158',
        line: '#283128',
        accent: '#b21e16',
        accentInk: '#ffffff',
        success: '#1c6537',
        warning: '#8a5a00',
        danger: '#ad211b',
      },
      dark: {
        canvas: '#080b09',
        surface: '#101411',
        raised: '#171c18',
        ink: '#dce5dc',
        muted: '#7f9081',
        line: '#344237',
        accent: '#ff3b30',
        accentInk: '#080b09',
        success: '#54d879',
        warning: '#e8ae45',
        danger: '#ff5047',
      },
    },
    products: {
      canary: {
        accent: '#ff3b30',
        secondary: '#1d2a20',
        note: 'Interrupt console; shortest row pitch, heartbeat raster, loud fault brackets, and immediate inverted acknowledgements.',
      },
      powder: {
        accent: '#f0b429',
        secondary: '#272316',
        note: 'Dispatch terminal; medium row pitch, assignee address blocks, queue-tape separators, and keycap-forward actions.',
      },
      crucible: {
        accent: '#35c2ff',
        secondary: '#14252c',
        note: 'Evaluation scope; paired result rows, waveform traces, scientific numerals, and comparison crosshairs.',
      },
      landmark: {
        accent: '#b5ff45',
        secondary: '#1d2815',
        note: 'Release checksum desk; spacious ledger groups, hash fields, sealed-state brackets, and build lineage rails.',
      },
    },
    css: `
      .lab-spec { background-image: repeating-linear-gradient(0deg, transparent 0 3px, color-mix(in srgb, var(--line) 16%, transparent) 3px 4px); }
      .lab-spec [data-region] { border-block-end: var(--border) solid var(--line); }
      .lab-spec [data-region]::before { content: '[ ' attr(data-index) ' ]'; font: 600 .6875rem/1 var(--font-mono); letter-spacing: .12em; color: var(--muted); }
      .lab-spec :is(button, [role='tab'], .badge) { text-transform: uppercase; font-family: var(--font-mono); letter-spacing: .08em; }
      .lab-spec :focus-visible { outline: 1px solid var(--accent); outline-offset: 3px; }
    `,
  },
  'BRUT-3': {
    id: 'BRUT-3',
    title: 'Service Book',
    family: 'industrial field-manual strips',
    move: 'Compose interfaces as stacked service procedures: labeled bands, margin annotations, and decisive black action slabs.',
    essence:
      'Misty Step gains a humane industrial voice—direct, teachable, and durable—while preserving the family’s technical editorial discipline.',
    dna: [
      'procedure-band composition',
      'annotated service margin',
      'solid action slabs against paper fields',
    ],
    dials: {
      color:
        'Each product owns a cover stock and one stencil ink, applied to section bands, diagrams, and active mechanisms.',
      type: 'Each product chooses the tension between heavy stencil headings, readable grotesque instructions, and mono callouts.',
      density:
        'Each product owns step depth, annotation frequency, and whether reference material sits inline or in the margin.',
      shape:
        'All forms are cut square; products vary band depth, perforation marks, tab notches, and control fill weight.',
      imagery:
        'Products own a manual illustration dialect: wiring schematic, routing card, test rig plate, or exploded release assembly.',
    },
    layout: 'split',
    componentLayout: 'strips',
    tokens: {
      fontDisplay: 'Impact, Haettenschweiler, "Arial Narrow Bold", sans-serif',
      fontBody: '"Franklin Gothic Medium", "Arial Narrow", Arial, sans-serif',
      fontMono: '"Courier Prime", "Courier New", monospace',
      radiusSm: '0',
      radiusMd: '0',
      radiusLg: '0',
      border: '2px',
      shadow: 'none',
      space: 1.18,
      control: '2.75rem',
      light: {
        canvas: '#d8d2c3',
        surface: '#eee9dc',
        raised: '#f8f3e6',
        ink: '#171713',
        muted: '#696457',
        line: '#24231d',
        accent: '#d43b22',
        accentInk: '#fffaf0',
        success: '#34613f',
        warning: '#936309',
        danger: '#b6291d',
      },
      dark: {
        canvas: '#12110e',
        surface: '#1d1b16',
        raised: '#29261f',
        ink: '#eee8d9',
        muted: '#aaa28f',
        line: '#d2c9b6',
        accent: '#f05b3d',
        accentInk: '#12110e',
        success: '#78bd85',
        warning: '#e5b35d',
        danger: '#ff6a55',
      },
    },
    products: {
      canary: {
        accent: '#d43b22',
        secondary: '#f0c24d',
        note: 'Emergency service bulletin; compact diagnostic steps, hazard chevrons, wiring traces, and black acknowledge slabs.',
      },
      powder: {
        accent: '#315da8',
        secondary: '#c8d2c0',
        note: 'Routing-card binder; writable task bands, owner tabs, perforated handoff edges, and medium-density instructions.',
      },
      crucible: {
        accent: '#b14bd1',
        secondary: '#e6d2b6',
        note: 'Test-rig handbook; wide specimen bays, numbered fixture plates, paired verdict bands, and dense mono tolerances.',
      },
      landmark: {
        accent: '#3f704d',
        secondary: '#c9b98d',
        note: 'Maintenance logbook; roomy chapters, exploded assembly figures, revision thumb tabs, and archival sign-off blocks.',
      },
    },
    css: `
      .lab-spec [data-region] { border-block-start: var(--border) solid var(--line); padding-block: calc(1rem * var(--space)); }
      .lab-spec [data-region]::before { content: 'SECTION ' attr(data-index) ' ///'; display: block; font: 700 .75rem/1 var(--font-mono); letter-spacing: .1em; margin-block-end: .75rem; }
      .lab-spec :is(button, [role='tab'][aria-selected='true']) { background: var(--ink); color: var(--surface); border-color: var(--ink); text-transform: uppercase; }
      .lab-spec :is(input, select, textarea) { border-width: 0 0 var(--border); background: transparent; }
    `,
  },
};
