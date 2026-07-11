const SPECS = {
  'IMP-1': {
    id: 'IMP-1',
    title: 'Signal Folio',
    family: 'editorial evidence system',
    move: 'Treat every interface as a composed evidence folio: open fields, ruled records, and decisive typographic cuts replace card-heavy chrome.',
    essence:
      'Misty Step remains an exacting instrument, but its precision comes from editorial measure, ink hierarchy, and visible provenance rather than one rigid costume.',
    dna: [
      'Evidence is spatially legible: source, state, and action never collapse into one treatment.',
      'Hairline rules and deliberate whitespace establish rhythm before boxes do.',
      'Motion marks a completed state change, then gets out of the operator’s way.',
    ],
    dials: {
      color:
        'Products choose one evidence ink plus one supporting data hue; inactive structure stays neutral.',
      type: 'Products choose the serif-to-sans ratio: editorial products lead with serif, operational products reserve it for documents.',
      density:
        'Products tune folio measure, row cadence, and metadata compression from calm reading to compact triage.',
      shape:
        'Products choose between nearly square records and lightly softened controls within the shared restrained radius scale.',
      imagery:
        'Products choose technical plates, data traces, or no imagery; decoration never substitutes for evidence.',
    },
    layout: 'split',
    componentLayout: 'strips',
    tokens: {
      fontDisplay:
        '"Newsreader", "Iowan Old Style", "Palatino Linotype", Georgia, serif',
      fontBody:
        'Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
      fontMono: '"IBM Plex Mono", "SFMono-Regular", Consolas, monospace',
      radiusSm: '2px',
      radiusMd: '6px',
      radiusLg: '12px',
      border: '1px',
      shadow: '0 2px 8px rgba(18, 28, 45, .08)',
      space: 1.08,
      control: '2.5rem',
      light: {
        canvas: '#f4f6f8',
        surface: '#ffffff',
        raised: '#e9eef4',
        ink: '#17202e',
        muted: '#59677a',
        line: '#c9d2de',
        accent: '#174ea6',
        accentInk: '#ffffff',
        success: '#176b4d',
        warning: '#8a5413',
        danger: '#9c2d35',
      },
      dark: {
        canvas: '#11161d',
        surface: '#171e27',
        raised: '#202a36',
        ink: '#edf2f8',
        muted: '#a4b1c2',
        line: '#364354',
        accent: '#8ab4f8',
        accentInk: '#101721',
        success: '#6dd6aa',
        warning: '#e4b873',
        danger: '#f19aa0',
      },
    },
    products: {
      canary: {
        accent: '#0f766e',
        secondary: '#d7f3ee',
        note: 'Compressed sans-led incident folios, squared controls, tight telemetry rows, and trace plates prioritize scan speed.',
      },
      powder: {
        accent: '#7c3aed',
        secondary: '#eee5ff',
        note: 'Humanist board labels, medium density, six-pixel records, and grouped work chapters make coordination feel social but exact.',
      },
      crucible: {
        accent: '#b42318',
        secondary: '#fee9e7',
        note: 'Mono-forward evaluation sheets, hard two-pixel geometry, compact comparison rows, and diff-first plates sharpen judgment.',
      },
      landmark: {
        accent: '#b54708',
        secondary: '#fff0d5',
        note: 'Serif-led release narratives, broad document measure, twelve-pixel feature panels, and sparse milestone rhythm reward reading.',
      },
    },
    css: `
      .future-root { letter-spacing: -0.006em; }
      .future-root h1, .future-root h2 { text-wrap: balance; }
      .future-root p { text-wrap: pretty; }
    `,
  },

  'IMP-2': {
    id: 'IMP-2',
    title: 'Chromatic Relay',
    family: 'state-forward operations system',
    move: 'Build the system around calm neutral infrastructure and sharply bounded chromatic zones that make active state, ownership, and handoff instantly readable.',
    essence:
      'It preserves Misty Step’s operator-grade clarity while expanding color from a single accent into a disciplined, semantic relay language.',
    dna: [
      'Color always names an active relationship—selection, ownership, handoff, or result.',
      'Components share one compact geometric construction across sparse and dense compositions.',
      'Transitions move attention between stable states without ambient spectacle.',
    ],
    dials: {
      color:
        'Products select a primary relay hue, a quiet secondary field, and domain data colors from a contrast-checked role palette.',
      type: 'Products choose geometric or humanist emphasis inside one sans family; mono is reserved for identity, time, and measures.',
      density:
        'Products tune control height, column count, and information compression while preserving the same state geometry.',
      shape:
        'Products tune a 4–14px radius band: sharper for instrumentation, softer for collaborative work.',
      imagery:
        'Products use live diagrams, heat fields, or categorical marks; photographic and decorative imagery stay outside the task surface.',
    },
    layout: 'atlas',
    componentLayout: 'bento',
    tokens: {
      fontDisplay:
        '"Space Grotesk", Inter, ui-sans-serif, system-ui, sans-serif',
      fontBody: '"Space Grotesk", Inter, ui-sans-serif, system-ui, sans-serif',
      fontMono: '"Berkeley Mono", "SFMono-Regular", Consolas, monospace',
      radiusSm: '4px',
      radiusMd: '10px',
      radiusLg: '14px',
      border: '1px',
      shadow: '0 4px 8px rgba(26, 20, 55, .10)',
      space: 0.9,
      control: '2.25rem',
      light: {
        canvas: '#f2f1f7',
        surface: '#fbfbfd',
        raised: '#e7e5f0',
        ink: '#211d2d',
        muted: '#625d70',
        line: '#cbc7d7',
        accent: '#5b3fd1',
        accentInk: '#ffffff',
        success: '#087a55',
        warning: '#96600a',
        danger: '#b22547',
      },
      dark: {
        canvas: '#121019',
        surface: '#191622',
        raised: '#252033',
        ink: '#f2eff8',
        muted: '#b1aabd',
        line: '#40384f',
        accent: '#a995ff',
        accentInk: '#171221',
        success: '#59d4a5',
        warning: '#eac16d',
        danger: '#ff8ca4',
      },
    },
    products: {
      canary: {
        accent: '#00897b',
        secondary: '#d9f4ef',
        note: 'Tight atlas density, four-pixel geometry, mono timestamps, and teal state bands turn monitoring into a rapid scan field.',
      },
      powder: {
        accent: '#6d4aff',
        secondary: '#ece7ff',
        note: 'Roomier bento groups, fourteen-pixel collaboration surfaces, geometric labels, and violet ownership zones support handoffs.',
      },
      crucible: {
        accent: '#db3a34',
        secondary: '#ffe6e3',
        note: 'Harder corners, maximum density, mono-heavy score cells, and red comparison relays make experimental outcomes unmistakable.',
      },
      landmark: {
        accent: '#d86f00',
        secondary: '#fff0d8',
        note: 'Wider rhythm, ten-pixel modules, prose-friendly sans settings, and amber progression zones organize release narratives.',
      },
    },
    css: `
      .future-root { font-variant-numeric: tabular-nums; }
      .future-root button, .future-root input, .future-root select { transition-timing-function: cubic-bezier(.22, 1, .36, 1); }
    `,
  },

  'IMP-3': {
    id: 'IMP-3',
    title: 'Civic Instrument',
    family: 'public-service technical system',
    move: 'Combine trustworthy civic typography, explicit structural bands, and tactile control geometry so complex software feels accountable rather than austere.',
    essence:
      'Misty Step becomes recognizable through procedural clarity, disciplined alignment, and humane state language—a family resemblance that survives very different product voices.',
    dna: [
      'Every action exposes consequence, status, and recovery in plain visual language.',
      'Strong horizontal bands establish place and procedure without filling the screen with cards.',
      'Tactile controls and exact data typography make the system feel operated, not merely viewed.',
    ],
    dials: {
      color:
        'Products own one institutional anchor, one service color, and domain statuses; large surfaces remain true neutral.',
      type: 'Products tune the ratio of sturdy grotesque to tabular mono while keeping labels familiar and highly legible.',
      density:
        'Products choose generous service rhythm, balanced administrative rhythm, or compact control-room rhythm.',
      shape:
        'Products choose 0–8px geometry by task consequence; destructive and high-precision controls stay squarest.',
      imagery:
        'Products choose maps, procedural diagrams, release stamps, or measurement plots built from shared line and label grammar.',
    },
    layout: 'top',
    componentLayout: 'ledger',
    tokens: {
      fontDisplay:
        '"IBM Plex Sans", "Arial Nova", Arial, ui-sans-serif, system-ui, sans-serif',
      fontBody:
        '"IBM Plex Sans", "Arial Nova", Arial, ui-sans-serif, system-ui, sans-serif',
      fontMono: '"IBM Plex Mono", "SFMono-Regular", Consolas, monospace',
      radiusSm: '0px',
      radiusMd: '3px',
      radiusLg: '8px',
      border: '2px',
      shadow: 'none',
      space: 1.22,
      control: '2.75rem',
      light: {
        canvas: '#eef1f3',
        surface: '#ffffff',
        raised: '#dfe5e9',
        ink: '#14212b',
        muted: '#4e5f6c',
        line: '#9eabb4',
        accent: '#8c2f39',
        accentInk: '#ffffff',
        success: '#146c43',
        warning: '#805d00',
        danger: '#a12631',
      },
      dark: {
        canvas: '#11171b',
        surface: '#182126',
        raised: '#263239',
        ink: '#f1f4f5',
        muted: '#aebbc2',
        line: '#53616a',
        accent: '#ee8e97',
        accentInk: '#271316',
        success: '#74d6a5',
        warning: '#e0c06c',
        danger: '#ff929b',
      },
    },
    products: {
      canary: {
        accent: '#006c67',
        secondary: '#d5efed',
        note: 'Compact control-room rhythm, zero-radius high-consequence controls, mono telemetry, and persistent procedural bands.',
      },
      powder: {
        accent: '#5940a8',
        secondary: '#e8e2f7',
        note: 'Balanced administrative density, three-pixel controls, friendly grotesque labels, and wide ownership ledgers.',
      },
      crucible: {
        accent: '#9c2d35',
        secondary: '#f5dcde',
        note: 'Dense two-column evidence ledger, square comparison controls, high mono ratio, and explicit pass/fail procedure rows.',
      },
      landmark: {
        accent: '#9a4b00',
        secondary: '#f4e3ce',
        note: 'Generous service rhythm, eight-pixel narrative panels, lower mono ratio, and release stamps anchoring horizontal chapters.',
      },
    },
    css: `
      .future-root { font-feature-settings: "tnum" 1, "ss01" 1; }
      .future-root h1, .future-root h2, .future-root h3 { letter-spacing: -0.018em; }
    `,
  },
};

export default [SPECS['IMP-1'], SPECS['IMP-2'], SPECS['IMP-3']];
