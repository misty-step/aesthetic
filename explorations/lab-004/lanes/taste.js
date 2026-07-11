export const SPECS = [
  {
    id: 'R2TASTE-1',
    title: 'Quiet Instrument',
    family: 'Misty Step / calibrated editorial instrument',
    move: 'Turn the current ink-on-paper system into a more legible instrument panel, with a decisive title register and action plates keyed by a narrow accent rule.',
    essence:
      'Quiet enough for documents, exact enough for operations, and visibly Misty Step before the product accent appears.',
    dna: [
      'Paper, ink, and hairlines establish hierarchy before color does.',
      'Every action is a square plate; every navigation affordance remains uncontained ink.',
      'Display scale is reserved for the system name while working UI stays in the compact Geist register.',
    ],
    dials: {
      color:
        'Near-black and warm paper with one ultramarine action key; product hues remain sparse.',
      type: 'Geist display weight against compact Geist Mono annotations and tabular readings.',
      density:
        'Measured editorial spacing around a medium-dense component and data register.',
      shape:
        'Square planes, single hairlines, and a 2px action key on the leading edge.',
      imagery:
        'Off-center technical plates, ruled diagrams, and sparse pen-and-ink callouts.',
    },
    layout: 'rail',
    componentLayout: 'ledger',
    button: {
      grammar:
        'Action plate with a narrow accent key at the leading edge; links never inherit a plate or fill.',
      height: '36px standard / 32px compact / 36px square icon',
      padding: '0 14px, with 17px on the keyed leading edge',
      weight: '650 label, 0.01em tracking, sentence case',
      primary:
        'Near-black fill, paper ink, 2px ultramarine leading key; the default decisive action.',
      secondary:
        'Paper surface, ink hairline, no key; equal geometry with deliberately quieter contrast.',
      ghost:
        'Transparent until hover reveals the wash; used only for low-risk local actions.',
      destructive:
        'Ink surface with a 2px danger key; danger is carried by the glyph and edge, not a red slab.',
      focus:
        '2px accent outline separated by 2px of canvas, visible in both themes.',
      pressed:
        'Translate down 1px and replace the lower hairline with an inset ink edge; no scale change.',
      loading:
        'Label remains stable while a restrained inline progress rule advances once beneath it.',
    },
    tokens: {
      fontDisplay: 'Geist, sans-serif',
      fontBody: 'Geist, sans-serif',
      fontMono: 'Geist Mono, monospace',
      radiusSm: '0px',
      radiusMd: '0px',
      radiusLg: '0px',
      border: '1px solid',
      shadow: '0 12px 32px rgba(21, 21, 21, 0.08)',
      space: '4px base; 8 / 12 / 20 / 32 / 52 cadence',
      control: '36px action plate; 32px dense instrument control',
      light: {
        canvas: '#f7f7f4',
        surface: '#fcfcfa',
        raised: '#ffffff',
        ink: '#171715',
        muted: '#686861',
        line: '#ddddda',
        accent: '#2643d0',
        accentInk: '#ffffff',
        success: '#287154',
        warning: '#9b641a',
        danger: '#a33b32',
      },
      dark: {
        canvas: '#111210',
        surface: '#171816',
        raised: '#1d1e1b',
        ink: '#eeeeea',
        muted: '#a2a29a',
        line: '#30312d',
        accent: '#91a0ff',
        accentInk: '#121315',
        success: '#72b997',
        warning: '#d9a35e',
        danger: '#dc8178',
      },
    },
    products: {
      canary: {
        accent: '#287154',
        secondary: '#dcebe4',
        note: 'Tighter 32px cadence, mono-forward readings, narrow two-column watchboard, waveform plates, and one-shot acknowledgement motion.',
      },
      powder: {
        accent: '#a85f2b',
        secondary: '#f0e2d7',
        note: 'Roomier 40px actions, stronger text ratio, ruled horizontal board cadence, ticket-stamp imagery, and direct cut transitions.',
      },
      crucible: {
        accent: '#8b3c49',
        secondary: '#eadce0',
        note: 'Dense mono evidence register, paired comparison geometry, split-pane composition, calibration-plot imagery, and persistent result resolution.',
      },
      landmark: {
        accent: '#3d5f95',
        secondary: '#dce4ef',
        note: 'Calm editorial density, larger prose ratio, chronological spine composition, archival plate imagery, and restrained disclosure motion.',
      },
    },
    css: `
.future-root { letter-spacing: -0.006em; }
.future-hero { border-bottom: 1px solid var(--line); padding-block: clamp(32px, 6vw, 76px); }
.type-display { font-size: clamp(2.4rem, 6.2vw, 5.4rem); line-height: .9; letter-spacing: -.065em; font-weight: 760; max-width: 9ch; }
.section-heading { border-top: 1px solid var(--ink); padding-top: 10px; }
.component-gallery { gap: 0; border-top: 1px solid var(--line); }
.component-card { border-width: 0 0 1px; box-shadow: none; }
.button-board { border: 1px solid var(--line); padding: 18px; }
.btn, .lab-button { min-height: 36px; border-radius: 0; font-weight: 650; letter-spacing: .01em; transition: transform 120ms cubic-bezier(.2,.8,.2,1), background-color 120ms cubic-bezier(.2,.8,.2,1), border-color 120ms cubic-bezier(.2,.8,.2,1); }
.btn.primary, .lab-button.primary { border-left: 3px solid var(--accent); box-shadow: inset 0 -1px 0 color-mix(in srgb, var(--canvas) 24%, transparent); }
.btn.secondary, .lab-button.secondary { background: var(--surface); border-color: var(--ink); color: var(--ink); }
.btn.ghost, .lab-button.ghost { border-color: transparent; background: transparent; }
.btn.danger, .lab-button.danger { background: var(--ink); color: var(--canvas); border-left: 3px solid var(--danger); }
.btn.icon-btn, .lab-button.icon-btn { width: 36px; padding-inline: 0; }
.state-grid { gap: 0; border: 1px solid var(--line); }
.motion-grid { border-left: 3px solid var(--accent); }
.product-grid { gap: 1px; background: var(--line); border: 1px solid var(--line); }
.product-card { border: 0; box-shadow: none; }
.table { font-variant-numeric: tabular-nums; }
`,
  },
  {
    id: 'R2TASTE-2',
    title: 'Signal Register',
    family: 'Misty Step / operational signal folio',
    move: "Give Signal Folio's clarity a sharper operational cadence: a strong masthead, horizontal ruled strips, and buttons whose physical lower edge makes action tactile.",
    essence:
      'A compact field console built from type, rules, and deliberate pressure rather than cards or chrome.',
    dna: [
      'Information runs in horizontal registers that scan quickly at operator density.',
      'Primary actions are saturated signal blocks with a visible mechanical lower edge.',
      'The masthead is emphatic; every supporting register is disciplined and quiet.',
    ],
    dials: {
      color:
        'Cool paper, carbon ink, and a slightly tempered signal blue with glyph-only status colors.',
      type: 'Wide, heavy Geist masthead; mono labels and figures; body kept terse.',
      density:
        'Medium-high by default, using ruled strips instead of nested containers.',
      shape:
        'Hard rectangles with 1px rules and a functional 2px lower action edge.',
      imagery:
        'Orthogonal signal maps, trace lines, numbered plates, and narrow spark registers.',
    },
    layout: 'top',
    componentLayout: 'strips',
    button: {
      grammar:
        'Pressure key: a square action block rests on a 2px structural edge and moves onto it when pressed.',
      height: '38px standard / 32px dense / 38px icon',
      padding: '0 15px',
      weight: '700 label, 0.025em tracking, compact sentence case',
      primary:
        'Signal-blue fill with high-contrast ink and a dark 2px lower edge.',
      secondary:
        'Canvas fill with carbon border and lower edge; visibly actionable without competing.',
      ghost:
        'Unboxed ink action with a persistent 1px underline offset from navigational text.',
      destructive:
        'Carbon block, danger glyph, and danger lower edge; never a full ambient red field.',
      focus:
        'High-contrast 2px signal outline at 2px offset plus visible glyph/label contrast.',
      pressed:
        'Translate down exactly 2px, removing the lower edge so the key appears physically seated.',
      loading:
        'Freeze width; replace the leading glyph with three sequential square ticks that resolve once.',
    },
    tokens: {
      fontDisplay: 'Geist, sans-serif',
      fontBody: 'Geist, sans-serif',
      fontMono: 'Geist Mono, monospace',
      radiusSm: '0px',
      radiusMd: '0px',
      radiusLg: '0px',
      border: '1px solid',
      shadow: '0 14px 34px rgba(18, 22, 28, 0.09)',
      space: '4px base; 6 / 10 / 16 / 24 / 40 strip cadence',
      control: '38px pressure key; 32px dense row control',
      light: {
        canvas: '#f4f6f7',
        surface: '#fafbfb',
        raised: '#ffffff',
        ink: '#15191e',
        muted: '#65707a',
        line: '#d7dde1',
        accent: '#2656bf',
        accentInk: '#ffffff',
        success: '#27725a',
        warning: '#95651f',
        danger: '#aa3d3b',
      },
      dark: {
        canvas: '#101316',
        surface: '#161a1e',
        raised: '#1c2126',
        ink: '#edf0f2',
        muted: '#9ca7b0',
        line: '#2c343b',
        accent: '#86a7ff',
        accentInk: '#11151a',
        success: '#70bea0',
        warning: '#d6a65d',
        danger: '#e0807e',
      },
    },
    products: {
      canary: {
        accent: '#27725a',
        secondary: '#dbece5',
        note: 'Highest density, mono-dominant type, vertical signal-strip composition, trace-map imagery, and one-shot alert settlement.',
      },
      powder: {
        accent: '#aa642a',
        secondary: '#eee0d5',
        note: 'Medium density, balanced body/mono ratio, broad lane geometry, stamped-card imagery, and clipped horizontal relocation feedback.',
      },
      crucible: {
        accent: '#924052',
        secondary: '#eadde1',
        note: 'Compact controls, numerically dominant typography, mirrored evaluation strips, calibration imagery, and persistent pass/fail reveals.',
      },
      landmark: {
        accent: '#3a639a',
        secondary: '#dae4ef',
        note: 'Calmest density, prose-forward ratio, single chronological register, archival linework, and instant period-to-period cuts.',
      },
    },
    css: `
.future-root { letter-spacing: -.004em; }
.future-nav { border-bottom: 1px solid var(--ink); }
.future-hero { padding-block: clamp(28px, 5vw, 64px); border-bottom: 3px double var(--line); }
.type-display { font-size: clamp(2.65rem, 7vw, 6.25rem); line-height: .84; letter-spacing: -.075em; font-weight: 800; max-width: 10ch; }
.section-heading { display: flex; border-bottom: 1px solid var(--ink); padding-bottom: 8px; }
.component-gallery { gap: 0; }
.component-card { border-width: 0 0 1px; box-shadow: none; padding-block: 14px; }
.button-lab { border-top: 1px solid var(--ink); border-bottom: 1px solid var(--ink); }
.button-board { padding-block: 20px; }
.btn, .lab-button { min-height: 38px; border-radius: 0; font-weight: 700; letter-spacing: .025em; box-shadow: 0 2px 0 var(--ink); transition: transform 100ms cubic-bezier(.2,.8,.2,1), box-shadow 100ms cubic-bezier(.2,.8,.2,1), background-color 100ms cubic-bezier(.2,.8,.2,1); }
.btn.primary, .lab-button.primary { background: var(--accent); color: var(--accent-ink); border-color: var(--accent); box-shadow: 0 2px 0 color-mix(in srgb, var(--accent) 52%, var(--ink)); }
.btn.secondary, .lab-button.secondary { background: var(--canvas); color: var(--ink); border-color: var(--ink); }
.btn.ghost, .lab-button.ghost { background: transparent; border-width: 0 0 1px; box-shadow: none; }
.btn.danger, .lab-button.danger { background: var(--ink); color: var(--canvas); border-color: var(--ink); box-shadow: 0 2px 0 var(--danger); }
.btn.icon-btn, .lab-button.icon-btn { width: 38px; padding-inline: 0; }
.state-grid { gap: 0; border-block: 1px solid var(--line); }
.motion-grid { gap: 0; border-bottom: 1px solid var(--line); }
.composition-grid { gap: 0; border: 1px solid var(--line); }
.product-grid { border-top: 1px solid var(--ink); }
.product-card { box-shadow: none; border-width: 0 0 1px; }
.table { font-size: .8125rem; font-variant-numeric: tabular-nums; }
`,
  },
  {
    id: 'R2TASTE-3',
    title: 'Atelier Index',
    family: 'Misty Step / composed technical atelier',
    move: 'Refine Quiet Atelier without softening it: pair a poised indexed masthead with double-rule work surfaces and unusually well-resolved machined controls.',
    essence:
      'A calm working room where every line has purpose and every action feels cut from the same sheet of material.',
    dna: [
      'Generous breathing room is held together by indexed rules rather than floating cards.',
      'Controls use a double-line frame and an inset action field to feel fabricated, not default.',
      'The strong title register gives way immediately to modest document typography.',
    ],
    dials: {
      color:
        'Warm-white stock, graphite ink, ultramarine index marks, and softened categorical pigments.',
      type: 'A composed Geist display title, regular Geist reading surface, and sparse mono indexing.',
      density:
        'Calm outer composition with a dense, highly aligned working core.',
      shape:
        'Square double rules, inset action fields, and disciplined off-axis alignment.',
      imagery:
        'Technical folios, registration marks, cross-hatched material studies, and numbered specimens.',
    },
    layout: 'split',
    componentLayout: 'bento',
    button: {
      grammar:
        'Machined frame: an outer hairline holds an inset action field, making the button read as a tool rather than a generic rectangle.',
      height: '40px standard / 34px compact / 40px icon',
      padding: '3px outer frame plus 0 13px inner field',
      weight: '620 label, -0.005em tracking, sentence case',
      primary:
        'Ink outer frame with a paper label field and a 3px ultramarine datum at the top; high distinction without a loud fill.',
      secondary:
        'Paper outer frame and wash inner field separated by a second hairline.',
      ghost:
        'No frame at rest; a bracket-like top and bottom rule enters only on hover/focus.',
      destructive:
        'Ink frame with danger datum and danger glyph; label remains neutral for semantic restraint.',
      focus:
        'Accent datum extends across the full top edge while a 2px external outline encloses the frame.',
      pressed:
        'Inner field translates down 1px inside a stationary outer frame, preserving layout and tactile depth.',
      loading:
        'Inner field locks; a thin datum travels once left-to-right and persists as a success edge.',
    },
    tokens: {
      fontDisplay: 'Geist, sans-serif',
      fontBody: 'Geist, sans-serif',
      fontMono: 'Geist Mono, monospace',
      radiusSm: '0px',
      radiusMd: '0px',
      radiusLg: '0px',
      border: '1px solid',
      shadow: '0 18px 42px rgba(31, 29, 25, 0.08)',
      space: '4px base; 8 / 14 / 22 / 36 / 64 atelier cadence',
      control: '40px framed action; 34px compact document control',
      light: {
        canvas: '#f5f3ef',
        surface: '#fbfaf7',
        raised: '#fffefa',
        ink: '#1c1b18',
        muted: '#706d66',
        line: '#dedbd3',
        accent: '#314dcc',
        accentInk: '#ffffff',
        success: '#347159',
        warning: '#95671f',
        danger: '#a54139',
      },
      dark: {
        canvas: '#121210',
        surface: '#191916',
        raised: '#20201c',
        ink: '#efeee8',
        muted: '#aaa79e',
        line: '#34342e',
        accent: '#95a4ff',
        accentInk: '#151519',
        success: '#78b79b',
        warning: '#d2a25e',
        danger: '#dd827a',
      },
    },
    products: {
      canary: {
        accent: '#347159',
        secondary: '#dce9e2',
        note: 'Compact framed controls, mono-heavy figures, asymmetric monitoring wall, fine trace imagery, and single-settlement status motion.',
      },
      powder: {
        accent: '#a1632f',
        secondary: '#eee0d4',
        note: 'Broader spacing, body-forward labels, stepped board composition, ticket-folio imagery, and short positional feedback cuts.',
      },
      crucible: {
        accent: '#904354',
        secondary: '#eadce1',
        note: 'Tight evidence density, equal mono/body ratio, paired specimen geometry, test-plate imagery, and persistent verdict datum motion.',
      },
      landmark: {
        accent: '#48618d',
        secondary: '#dde3eb',
        note: 'Generous reading measure, prose-dominant type, vertical archive composition, indexed manuscript imagery, and quiet instant disclosure.',
      },
    },
    css: `
.future-root { letter-spacing: -.008em; }
.future-hero { padding-block: clamp(40px, 8vw, 96px); border-bottom: 1px solid var(--ink); }
.type-display { font-size: clamp(2.8rem, 7.4vw, 6.7rem); line-height: .86; letter-spacing: -.08em; font-weight: 720; max-width: 8ch; }
.type-title { letter-spacing: -.035em; font-weight: 680; }
.section-heading { border-top: 3px double var(--ink); padding-top: 12px; }
.component-gallery { gap: 12px; }
.component-card { box-shadow: none; border: 3px double var(--line); }
.specimen { border-top: 1px solid var(--line); }
.button-lab { border: 3px double var(--ink); }
.button-board { padding: 22px; }
.btn, .lab-button { min-height: 40px; border-radius: 0; padding: 3px 15px; font-weight: 620; letter-spacing: -.005em; background: var(--surface); box-shadow: inset 0 0 0 2px var(--surface), inset 0 0 0 3px var(--line); transition: transform 140ms cubic-bezier(.2,.8,.2,1), box-shadow 140ms cubic-bezier(.2,.8,.2,1), border-color 140ms cubic-bezier(.2,.8,.2,1); }
.btn.primary, .lab-button.primary { color: var(--ink); background: var(--surface); border-color: var(--ink); box-shadow: inset 0 3px 0 var(--accent), inset 0 0 0 3px var(--ink), inset 0 0 0 4px var(--surface); }
.btn.secondary, .lab-button.secondary { color: var(--ink); background: var(--surface); border-color: var(--line); box-shadow: inset 0 0 0 3px var(--wash, var(--canvas)), inset 0 0 0 4px var(--line); }
.btn.ghost, .lab-button.ghost { background: transparent; border-color: transparent; box-shadow: inset 0 1px 0 transparent, inset 0 -1px 0 transparent; }
.btn.danger, .lab-button.danger { color: var(--ink); background: var(--surface); border-color: var(--ink); box-shadow: inset 0 3px 0 var(--danger), inset 0 0 0 3px var(--ink), inset 0 0 0 4px var(--surface); }
.btn.icon-btn, .lab-button.icon-btn { width: 40px; padding-inline: 3px; }
.state-grid { gap: 12px; }
.motion-grid { border: 3px double var(--line); }
.composition-grid { gap: 12px; }
.product-grid { gap: 12px; }
.product-card { box-shadow: none; border: 3px double var(--line); }
.token-swatch { border: 3px double var(--line); }
.table { border-top: 3px double var(--ink); border-bottom: 1px solid var(--ink); font-variant-numeric: tabular-nums; }
`,
  },
];

export default SPECS;
