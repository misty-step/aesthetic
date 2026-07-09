export const SPECS = {
  'SOFT-1': {
    id: 'SOFT-1',
    title: 'Margin Folio',
    family: 'editorial folio system',
    move: 'Treat every product surface as a numbered folio: a narrow annotation margin indexes a broad, quietly typeset working field.',
    essence:
      'Misty Step becomes recognizable through exact baselines, marginal evidence, restrained ink, and state changes that feel like editorial corrections rather than decoration.',
    dna: [
      'numbered marginalia as navigation and provenance',
      'serif-to-grotesk tension held to a strict baseline',
      'rules and paper depth replace nested card chrome',
    ],
    dials: {
      color:
        'Products own one ink wash plus a sparingly spent editorial mark color.',
      type: 'Products choose display-serif frequency: rare for Canary, narrative for Landmark, nearly absent in dense Crucible views.',
      density:
        'Products set the ratio between annotation margin and reading field, plus the cadence of ruled sections.',
      shape:
        'Products choose clipped tickets, square plates, or softly bound sheets while controls retain precise rectangular geometry.',
      imagery:
        'Products own an evidence mode: oscilloscope traces, task stamps, calibration diagrams, or archival maps.',
    },
    layout: 'split',
    componentLayout: 'strips',
    tokens: {
      fontDisplay:
        '"Newsreader", "Iowan Old Style", "Palatino Linotype", serif',
      fontBody: '"Geist", "Avenir Next", "Segoe UI", sans-serif',
      fontMono: '"Berkeley Mono", "SFMono-Regular", Consolas, monospace',
      radiusSm: '0.125rem',
      radiusMd: '0.25rem',
      radiusLg: '0.5rem',
      border: '1px',
      shadow:
        '0 18px 50px rgba(57, 47, 34, 0.08), 0 1px 0 rgba(57, 47, 34, 0.06)',
      space: 1.12,
      control: '2.625rem',
      light: {
        canvas: '#eeeae1',
        surface: '#fbf8f1',
        raised: '#fffdf8',
        ink: '#24211d',
        muted: '#716b61',
        line: '#d9d2c5',
        accent: '#b23a2b',
        accentInk: '#fffaf2',
        success: '#28715a',
        warning: '#a16816',
        danger: '#a53632',
      },
      dark: {
        canvas: '#171613',
        surface: '#201e1a',
        raised: '#292620',
        ink: '#f1ebdf',
        muted: '#aaa297',
        line: '#3b3730',
        accent: '#ef8069',
        accentInk: '#21130f',
        success: '#76bba0',
        warning: '#d8a955',
        danger: '#e57d76',
      },
    },
    products: {
      canary: {
        accent: '#d24b36',
        secondary: '#6e806f',
        note: 'Terse incident folios: compressed margin, live trace imagery, tabular timestamps, and decisive red proofreading marks.',
      },
      powder: {
        accent: '#a85a25',
        secondary: '#7b6aa6',
        note: 'A dispatch broadsheet: wider assignment margin, clipped task tickets, condensed labels, and stamp-like claim states.',
      },
      crucible: {
        accent: '#255e78',
        secondary: '#bc6b36',
        note: 'A calibration journal: dense ruled matrices, monospaced evidence blocks, plotted specimen diagrams, and minimal display serif.',
      },
      landmark: {
        accent: '#3e6d5d',
        secondary: '#a26b34',
        note: 'An archival gazette: generous reading measure, release chapters, cartographic line imagery, and prominent serif wayfinding.',
      },
    },
    css: `
      .lab-stage { background-image: linear-gradient(90deg, transparent 0, transparent 4.75rem, color-mix(in srgb, var(--line) 76%, transparent) 4.75rem, color-mix(in srgb, var(--line) 76%, transparent) calc(4.75rem + 1px), transparent calc(4.75rem + 1px)); }
      .lab-card { border-left-width: 0; border-right-width: 0; }
      .lab-card:hover { transform: translateY(-2px); transition: transform 520ms cubic-bezier(.22,.74,.18,1); }
      @media (prefers-reduced-motion: reduce) { .lab-card:hover { transform: none; transition: none; } }
    `,
  },

  'SOFT-2': {
    id: 'SOFT-2',
    title: 'Quiet Atelier',
    family: 'machined atelier system',
    move: 'Build interfaces as fitted instruments: slim datum rails, nested control bezels, and one uninterrupted workpiece instead of a dashboard of cards.',
    essence:
      'It preserves Misty Step precision and editorial restraint while adding tactile fabrication cues—a credible shared chassis whose product fixtures can vary radically.',
    dna: [
      'datum rails align every control and reading',
      'nested bezels appear only at interactive or decision boundaries',
      'motion has damped mechanical mass and resolves once',
    ],
    dials: {
      color:
        'Products own an anodized metal tone, a signal enamel, and the proportion of warm to cool neutral surfaces.',
      type: 'Products tune wide grotesk labels against compact mono instrumentation and may introduce a product-specific numeral character.',
      density:
        'Products choose bench spacing, control pitch, and whether secondary readings sit inline or in a side instrument rail.',
      shape:
        'Products choose chamfered, softly milled, grooved, or gasketed fixtures without changing concentric bezel logic.',
      imagery:
        'Products own a material evidence vocabulary: waveforms, paper slips, test coupons, or engraved route plates.',
    },
    layout: 'rail',
    componentLayout: 'ledger',
    tokens: {
      fontDisplay: '"Satoshi", "Avenir Next", "Century Gothic", sans-serif',
      fontBody: '"Geist", "Avenir Next", "Segoe UI", sans-serif',
      fontMono: '"IBM Plex Mono", "SFMono-Regular", Consolas, monospace',
      radiusSm: '0.375rem',
      radiusMd: '0.75rem',
      radiusLg: '1.125rem',
      border: '1px',
      shadow:
        '0 1px 1px rgba(30, 38, 42, 0.08), 0 14px 36px rgba(30, 38, 42, 0.07), inset 0 1px 0 rgba(255,255,255,0.42)',
      space: 0.9,
      control: '2.375rem',
      light: {
        canvas: '#dfe2e1',
        surface: '#eef0ef',
        raised: '#f8f9f7',
        ink: '#182023',
        muted: '#667075',
        line: '#c4cac9',
        accent: '#126a72',
        accentInk: '#f6ffff',
        success: '#2c7358',
        warning: '#9c6818',
        danger: '#a43d3d',
      },
      dark: {
        canvas: '#101416',
        surface: '#181d1f',
        raised: '#22292b',
        ink: '#e9efee',
        muted: '#98a4a4',
        line: '#343d3f',
        accent: '#62c9cc',
        accentInk: '#092123',
        success: '#72c39b',
        warning: '#d5a34f',
        danger: '#e47a76',
      },
    },
    products: {
      canary: {
        accent: '#d84a3a',
        secondary: '#234b52',
        note: 'A live signal console: gasketed status sockets, narrow waveform rail, urgent numeral face, and tight alarm-to-action pitch.',
      },
      powder: {
        accent: '#c56c2c',
        secondary: '#665a8f',
        note: 'A dispatch workbench: chamfered claim fixtures, paper-slip task rows, broader touch pitch, and owner initials as physical routing tabs.',
      },
      crucible: {
        accent: '#19737c',
        secondary: '#9c6530',
        note: 'A test stand: grooved specimen trays, dense calibration ledger, technical numeral emphasis, and coupon-like comparison imagery.',
      },
      landmark: {
        accent: '#55744d',
        secondary: '#a77b3e',
        note: 'A route engraver: long-form plates, spacious milestone intervals, etched topology maps, and quiet index controls along the rail.',
      },
    },
    css: `
      .lab-card { outline: 5px solid color-mix(in srgb, var(--surface) 72%, var(--line)); outline-offset: 1px; }
      .lab-button, .lab-input, .lab-select { box-shadow: inset 0 1px 0 color-mix(in srgb, white 42%, transparent), 0 1px 2px rgba(24,32,35,.08); }
      .lab-button { transition: transform 420ms cubic-bezier(.2,.8,.2,1), box-shadow 420ms cubic-bezier(.2,.8,.2,1); }
      .lab-button:active { transform: scale(.985); }
      @media (prefers-reduced-motion: reduce) { .lab-button { transition: none; } }
    `,
  },

  'SOFT-3': {
    id: 'SOFT-3',
    title: 'Civic Field',
    family: 'soft structural atlas system',
    move: 'Organize the product as a field atlas: broad zones, inset observation plots, and unmistakable spatial landmarks make complex work navigable at a glance.',
    essence:
      'Misty Step’s technical clarity expands into a warmer, more humane spatial system where hierarchy comes from territory, rhythm, and evidence—not generic app-shell furniture.',
    dna: [
      'large tonal fields establish place before components',
      'observation plots carry data and state inside each field',
      'landmark typography and indexed coordinates make every view orienting',
    ],
    dials: {
      color:
        'Products own a landscape pair—ground and marker—plus how often fields shift tone across a composition.',
      type: 'Products tune landmark scale, label compactness, and mono coordinate frequency within a controlled three-register hierarchy.',
      density:
        'Products choose plot packing and field size: watchfloor, board, evaluation atlas, or reading map.',
      shape:
        'Products choose topographic soft corners, survey cuts, pinned sheets, or stepped terraces while maintaining nested field logic.',
      imagery:
        'Products own an abstract cartography: pulse terrain, assignment parcels, evaluation contours, or release routes.',
    },
    layout: 'atlas',
    componentLayout: 'bento',
    tokens: {
      fontDisplay:
        '"Clash Display", "Arial Narrow", "Avenir Next Condensed", sans-serif',
      fontBody: '"Plus Jakarta Sans", "Avenir Next", "Segoe UI", sans-serif',
      fontMono: '"JetBrains Mono", "SFMono-Regular", Consolas, monospace',
      radiusSm: '0.5rem',
      radiusMd: '1rem',
      radiusLg: '1.75rem',
      border: '1px',
      shadow:
        '0 24px 64px rgba(54, 61, 50, 0.09), 0 2px 8px rgba(54, 61, 50, 0.05)',
      space: 1.24,
      control: '2.875rem',
      light: {
        canvas: '#e9eadf',
        surface: '#f4f3e9',
        raised: '#fdfbf2',
        ink: '#20251f',
        muted: '#697064',
        line: '#d0d3c4',
        accent: '#315f58',
        accentInk: '#f7fffb',
        success: '#387557',
        warning: '#a06b20',
        danger: '#a8463d',
      },
      dark: {
        canvas: '#121613',
        surface: '#1b201c',
        raised: '#252b26',
        ink: '#edf0e8',
        muted: '#a0a99d',
        line: '#394139',
        accent: '#7fc3b3',
        accentInk: '#10211d',
        success: '#7bc39c',
        warning: '#d9ad61',
        danger: '#e4877e',
      },
    },
    products: {
      canary: {
        accent: '#c9483c',
        secondary: '#4b7770',
        note: 'A pulse terrain: compact watch fields, sharp alert landmarks, contour traces, and a bottom event horizon on mobile.',
      },
      powder: {
        accent: '#b5652e',
        secondary: '#75659b',
        note: 'A parcel board: medium assignment fields, pinned-sheet task plots, humanist labels, and ownership expressed as spatial adjacency.',
      },
      crucible: {
        accent: '#2d6983',
        secondary: '#ae7440',
        note: 'An evaluation contour map: tightly packed plots, cut-corner specimen zones, mono coordinates, and confidence bands as terrain.',
      },
      landmark: {
        accent: '#55794f',
        secondary: '#b08342',
        note: 'A release route atlas: expansive chapter fields, stepped terraces, bold destination landmarks, and route-line chronology.',
      },
    },
    css: `
      .lab-stage { background-image: radial-gradient(circle at 1px 1px, color-mix(in srgb, var(--line) 62%, transparent) 1px, transparent 0); background-size: 22px 22px; }
      .lab-card { border-color: color-mix(in srgb, var(--line) 70%, transparent); }
      .lab-card:hover { transform: translate3d(0,-3px,0); transition: transform 620ms cubic-bezier(.16,.84,.2,1); }
      .lab-button { transition: transform 480ms cubic-bezier(.16,.84,.2,1); }
      .lab-button:active { transform: scale(.98); }
      @media (prefers-reduced-motion: reduce) { .lab-card:hover, .lab-button:active { transform: none; transition: none; } }
    `,
  },
};
