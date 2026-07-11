const SPECS = {
  'ANTH-1': {
    id: 'ANTH-1',
    title: 'Field Notes',
    family: 'annotated field instrument',
    move: 'Turns every surface into a calm observation sheet where marginalia, ruled intervals, and one decisive mark carry the hierarchy.',
    essence:
      'Misty Step becomes recognizable through technical editorial discipline rather than a fixed costume: precise rules, legible evidence, and annotations that explain why a state matters.',
    dna: [
      'evidence lives beside the thing it describes',
      'structure is drawn with rules and intervals',
      'one decisive mark per task',
    ],
    dials: {
      color:
        'Products choose a mineral ink pair and the frequency of the decisive mark.',
      type: 'Products choose the display voice while retaining a compact annotation register.',
      density:
        'Products set the observation interval from spacious journal to tight logbook.',
      shape:
        'Products choose clipped, square, or lightly softened sheets; controls remain crisply bounded.',
      imagery:
        'Products choose a native evidence form: traces, specimen labels, proof plates, or route marks.',
    },
    layout: 'rail',
    componentLayout: 'strips',
    tokens: {
      fontDisplay:
        '"Iowan Old Style", "Palatino Linotype", Palatino, Georgia, serif',
      fontBody: 'Avenir, "Avenir Next", "Segoe UI", sans-serif',
      fontMono: '"SFMono-Regular", Consolas, "Liberation Mono", monospace',
      radiusSm: '2px',
      radiusMd: '4px',
      radiusLg: '6px',
      border: '1px',
      shadow: '0 10px 28px rgba(41, 48, 44, .08)',
      space: 1.12,
      control: '2.55rem',
      light: {
        canvas: '#edf0eb',
        surface: '#f9faf7',
        raised: '#ffffff',
        ink: '#202822',
        muted: '#667069',
        line: '#cbd1c9',
        accent: '#155f55',
        accentInk: '#f7fffc',
        success: '#26704d',
        warning: '#94651d',
        danger: '#a3403e',
      },
      dark: {
        canvas: '#151a17',
        surface: '#1c231f',
        raised: '#252d28',
        ink: '#edf3ee',
        muted: '#a1ada5',
        line: '#39443d',
        accent: '#78cbbb',
        accentInk: '#10221d',
        success: '#70c796',
        warning: '#e0b56b',
        danger: '#e58a84',
      },
    },
    products: {
      canary: {
        accent: '#c35b28',
        secondary: '#2e5f68',
        note: 'Weather-station skin: narrow display, compact intervals, sharp sheets, sparklines and threshold annotations.',
      },
      powder: {
        accent: '#76559a',
        secondary: '#b77b53',
        note: 'Workshop notebook: rounder sheets, relaxed spacing, humanist display, handwritten-style ownership marks.',
      },
      crucible: {
        accent: '#a43b35',
        secondary: '#263f63',
        note: 'Test ledger: squared geometry, mono-forward type, compressed rows, specimen plates and pass-fail stamps.',
      },
      landmark: {
        accent: '#24659a',
        secondary: '#8c6e34',
        note: 'Survey folio: serif-forward type, broad measure, clipped corners, route lines and coordinate marginalia.',
      },
    },
    css: `
      .future-hero { border-left: 3px solid var(--accent); padding-left: calc(1.4rem * var(--space)); }
      .future-hero::after { content: 'OBSERVATION / SYSTEM'; font: 600 .68rem var(--font-mono); letter-spacing: .13em; color: var(--muted); }
      .component-card { border-left-color: var(--accent); }
      .section-heading { font-family: var(--font-display); font-style: italic; }
      .token-swatch::before { content: 'FIELD'; font: 600 .6rem var(--font-mono); letter-spacing: .12em; color: var(--muted); }
    `,
  },
  'ANTH-2': {
    id: 'ANTH-2',
    title: 'Signal Loom',
    family: 'woven signal plane',
    move: 'Uses crossing bands, calibrated apertures, and directional rhythm to make relationships—not containers—the dominant visual material.',
    essence:
      'It keeps Misty Step exact and instrument-like while replacing the inherited technical-document metaphor with a flexible system of woven flows that can express every product differently.',
    dna: [
      'relationships are visible before decoration',
      'bands align across components and compositions',
      'motion travels along a single meaningful axis',
    ],
    dials: {
      color:
        'Products own one signal warp, one contextual weft, and the neutral field temperature.',
      type: 'Products vary display width and utility voice while retaining tabular alignment for evidence.',
      density:
        'Products tune band spacing and the ratio of open field to instrument clusters.',
      shape:
        'Products choose capsule, lozenge, or rectilinear apertures without changing the band grammar.',
      imagery:
        'Products express identity through flow maps, stitched timelines, dependency cords, or release tracks.',
    },
    layout: 'canvas',
    componentLayout: 'bento',
    tokens: {
      fontDisplay:
        '"Arial Narrow", "Avenir Next Condensed", "Roboto Condensed", sans-serif',
      fontBody: '"Trebuchet MS", "Segoe UI", sans-serif',
      fontMono: 'ui-monospace, "SFMono-Regular", Menlo, monospace',
      radiusSm: '8px',
      radiusMd: '14px',
      radiusLg: '22px',
      border: '1px',
      shadow:
        '0 1px 0 rgba(20, 26, 35, .08), 0 18px 48px rgba(33, 47, 67, .09)',
      space: 0.96,
      control: '2.75rem',
      light: {
        canvas: '#e9edf3',
        surface: '#f7f9fc',
        raised: '#ffffff',
        ink: '#172131',
        muted: '#657084',
        line: '#c7cfdb',
        accent: '#174ea6',
        accentInk: '#ffffff',
        success: '#227358',
        warning: '#a05f17',
        danger: '#a83e52',
      },
      dark: {
        canvas: '#0e1420',
        surface: '#151e2c',
        raised: '#1e293a',
        ink: '#eef4ff',
        muted: '#95a3b8',
        line: '#344156',
        accent: '#7ea8ff',
        accentInk: '#0d1a31',
        success: '#69c6a0',
        warning: '#e3aa65',
        danger: '#ef8093',
      },
    },
    products: {
      canary: {
        accent: '#f0a21f',
        secondary: '#28746b',
        note: 'Pulse weave: tight density, narrow display, pill apertures, diagonal incident traces and quick directional motion.',
      },
      powder: {
        accent: '#a35dc1',
        secondary: '#d88b5c',
        note: 'Task braid: medium density, friendly wide type, soft lozenges, ownership cords and gentle lateral handoffs.',
      },
      crucible: {
        accent: '#ec4d3d',
        secondary: '#4969b2',
        note: 'Trial matrix: dense bento rhythm, square apertures, mono-heavy labels, dependency wires and decisive snap transitions.',
      },
      landmark: {
        accent: '#3a78c2',
        secondary: '#b79243',
        note: 'Release track: broad spacing, condensed display, long capsules, milestone rails and measured forward reveals.',
      },
    },
    css: `
      .future-content { background-image: repeating-linear-gradient(90deg, transparent 0, transparent calc(25% - 1px), color-mix(in srgb, var(--line) 48%, transparent) calc(25% - 1px), color-mix(in srgb, var(--line) 48%, transparent) 25%); }
      .future-hero { position: relative; overflow: hidden; }
      .future-hero::after { content: ''; position: absolute; inset: auto 0 0; height: 5px; background: var(--accent); transform-origin: left; animation: loom-enter 700ms var(--ease, ease-out) both; }
      .component-card:nth-child(3n + 2) { transform: translateY(.55rem); }
      .section-heading { font-stretch: condensed; letter-spacing: -.035em; }
      @keyframes loom-enter { from { transform: scaleX(.08); opacity: .35; } to { transform: scaleX(1); opacity: 1; } }
      @media (prefers-reduced-motion: reduce) { .future-hero::after { animation: none; } }
    `,
  },
  'ANTH-3': {
    id: 'ANTH-3',
    title: 'Night Index',
    family: 'luminous archival index',
    move: 'Builds hierarchy from oversized indexing, deep matte fields, and small illuminated evidence windows rather than conventional card stacks.',
    essence:
      'Misty Step remains a family of trustworthy instruments, but gains ceremony and delight: products feel like distinct rooms in one nocturnal archive.',
    dna: [
      'the index is the navigation and the ornament',
      'evidence appears in lit windows against matte fields',
      'reveal is reserved for moments of orientation',
    ],
    dials: {
      color:
        'Products own the archive field, index ink, and one illuminated evidence color.',
      type: 'Products choose a display genre while retaining disciplined utility captions and numerals.',
      density:
        'Products set index scale and evidence-window frequency from gallery-calm to control-room dense.',
      shape:
        'Products choose framed square, shallow arch, or chamfered windows; the index grid stays stable.',
      imagery:
        'Products populate windows with oscilloscope traces, task artifacts, trial cross-sections, or release cartography.',
    },
    layout: 'split',
    componentLayout: 'ledger',
    tokens: {
      fontDisplay: 'Didot, "Bodoni MT", "Times New Roman", serif',
      fontBody: 'Optima, Candara, "Segoe UI", sans-serif',
      fontMono: '"SFMono-Regular", Consolas, monospace',
      radiusSm: '0px',
      radiusMd: '3px',
      radiusLg: '3px',
      border: '1px',
      shadow: '8px 10px 0 rgba(28, 25, 23, .12)',
      space: 1.22,
      control: '2.65rem',
      light: {
        canvas: '#e7e2db',
        surface: '#f2eee8',
        raised: '#fffdf8',
        ink: '#24211f',
        muted: '#716b65',
        line: '#c9c0b6',
        accent: '#513d85',
        accentInk: '#fffaff',
        success: '#3b7052',
        warning: '#91641e',
        danger: '#9e3d46',
      },
      dark: {
        canvas: '#0d0c10',
        surface: '#16151b',
        raised: '#211f28',
        ink: '#f2edf7',
        muted: '#a9a0b0',
        line: '#3b3644',
        accent: '#c2a9ff',
        accentInk: '#1a102c',
        success: '#80c39c',
        warning: '#d8ae66',
        danger: '#e7828c',
      },
    },
    products: {
      canary: {
        accent: '#ffc24b',
        secondary: '#538f87',
        note: 'Watch room: black field, compact index, hard frames, condensed labels, waveform windows and brisk single-step reveals.',
      },
      powder: {
        accent: '#d9a4ee',
        secondary: '#df8a70',
        note: 'Cabinet of work: plum field, roomier index, shallow arches, humanist text, artifact windows and soft crossfades.',
      },
      crucible: {
        accent: '#ff6a58',
        secondary: '#7e91df',
        note: 'Trial vault: graphite field, dense index, chamfered frames, mono captions, cross-section windows and sharp cuts.',
      },
      landmark: {
        accent: '#8ab7ff',
        secondary: '#d4b25a',
        note: 'Atlas archive: navy field, large index, square frames, high-contrast display, cartographic windows and measured wipes.',
      },
    },
    css: `
      .future-hero { min-height: 23rem; align-content: end; border-top: 6px solid var(--accent); }
      .future-hero h1 { font-size: clamp(3.6rem, 10vw, 8rem); line-height: .82; letter-spacing: -.07em; max-width: 8ch; }
      .future-hero::before { content: 'III'; position: absolute; right: 4%; top: 5%; font: 400 clamp(5rem, 15vw, 12rem)/1 var(--font-display); color: color-mix(in srgb, var(--accent) 18%, transparent); pointer-events: none; }
      .component-card { box-shadow: var(--shadow); }
      .section-heading { border-bottom: 1px solid var(--line); padding-bottom: .65rem; }
      .future-nav { font-family: var(--font-mono); text-transform: uppercase; letter-spacing: .1em; }
    `,
  },
};

export default Object.values(SPECS);
