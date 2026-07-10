export const SPECS = [
  {
    id: 'R2IMP-1',
    title: 'Index Standard',
    family: 'Impeccable · indexed instrument',
    move: 'Turn the Misty Step ledger into a crisp operating standard: a broad display masthead, numbered rules, and actions that read as physical controls rather than links.',
    essence:
      'A quiet reference manual made operational—authoritative, legible, and exact without feeling institutional.',
    dna: [
      'Paper-white fields are divided by hairlines and deliberate blank intervals, never nested cards.',
      'Geist carries the editorial voice while Geist Mono marks coordinates, state, and provenance.',
      'Ultramarine is reserved for the current locus and the one action that advances the task.',
    ],
    dials: {
      color: 'House ultramarine on neutral paper; status remains glyph-only.',
      type: 'Large 800-weight Geist specimen masthead, restrained 16px working register, 13px mono index.',
      density:
        'Measured editorial overview with a dense ruled ledger composition.',
      shape: 'Square plates, stepped rules, no floating containers.',
      imagery: 'Numbered technical plates and orthogonal index marks.',
    },
    layout: 'ledger',
    componentLayout: 'ledger',
    button: {
      grammar:
        'A 2px lower rule gives actions a pressable mechanical edge; links remain naked underlined ink. Primary spends ultramarine, secondary is ink-on-paper, ghost appears only inside toolbars, and danger is a dark red contained action.',
      height: '36px default, 32px compact, 36px square icon',
      padding: '0 14px; icon gap 7px',
      weight: '650 with -0.01em tracking',
      primary:
        'Ultramarine field, white ink, matching 2px lower rule; hover darkens without lifting.',
      secondary:
        'Paper field, ink border, ink lower rule; hover fills the neutral wash.',
      ghost:
        'Transparent with no resting border; hover gains wash and one inset hairline.',
      destructive:
        'Oxide field with white ink; destructive hue is never reused as decoration.',
      focus:
        '2px ultramarine outline with a 2px paper offset; never shadow-only.',
      pressed: 'TranslateY(1px), remove the lower rule, preserve dimensions.',
      loading:
        'Label remains stable; a leading ruled progress glyph replaces the icon without changing width.',
    },
    tokens: {
      fontDisplay: "'Geist', 'Helvetica Neue', Helvetica, Arial, sans-serif",
      fontBody: "'Geist', 'Helvetica Neue', Helvetica, Arial, sans-serif",
      fontMono: "'Geist Mono', ui-monospace, SFMono-Regular, Menlo, monospace",
      radiusSm: '0px',
      radiusMd: '0px',
      radiusLg: '0px',
      border: '1px solid var(--line)',
      shadow: '0 3px 7px rgba(21, 21, 21, 0.10)',
      space: '4px 8px 12px 16px 24px 32px 48px',
      control: '36px',
      light: {
        canvas: '#f7f7f5',
        surface: '#fcfcfc',
        raised: '#ffffff',
        ink: '#151515',
        muted: '#666666',
        line: '#d9d9d6',
        accent: '#2643d0',
        accentInk: '#ffffff',
        success: '#15714b',
        warning: '#76501f',
        danger: '#a13d35',
      },
      dark: {
        canvas: '#101010',
        surface: '#151515',
        raised: '#1b1b1b',
        ink: '#ededed',
        muted: '#a3a3a3',
        line: '#353535',
        accent: '#8c9eff',
        accentInk: '#101010',
        success: '#6fd2a8',
        warning: '#d0aa78',
        danger: '#ef8b82',
      },
    },
    products: {
      canary: {
        accent: '#15714b',
        secondary: '#2643d0',
        note: 'Tight 13px mono ratio, short status rows, monitor-wall composition, clipped state changes.',
      },
      powder: {
        accent: '#6d28d9',
        secondary: '#2643d0',
        note: 'Medium density, heavier task titles, ruled board cadence, direct cut between workflow states.',
      },
      crucible: {
        accent: '#2643d0',
        secondary: '#a13d35',
        note: 'High data density, dominant mono figures, split comparison plates, gentle one-shot result resolution.',
      },
      landmark: {
        accent: '#c2410c',
        secondary: '#2643d0',
        note: 'Calmer measure, editorial weight ratio, chronological document spine, sparse technical plates.',
      },
    },
    css: `
.future-root { border-inline-end: 1px solid var(--line); }
.future-hero { border-block: 1px solid var(--ink); padding-block: 2.75rem 1.5rem; }
.type-display { font-size: clamp(2.75rem, 8vw, 5.5rem); line-height: .88; letter-spacing: -.035em; font-weight: 800; max-width: 10ch; text-wrap: balance; }
.section-heading { border-top: 1px solid var(--ink); padding-top: .75rem; }
.component-gallery { gap: 0; border-top: 1px solid var(--line); }
.component-card { border-width: 0 0 1px 0; box-shadow: none; }
.button-lab { border: 1px solid var(--ink); }
.button-board { gap: .75rem; align-items: center; }
.btn { min-height: 36px; border-radius: 0; font-weight: 650; letter-spacing: -.01em; transition: color 160ms cubic-bezier(.23,1,.32,1), background-color 160ms cubic-bezier(.23,1,.32,1), transform 160ms cubic-bezier(.23,1,.32,1), box-shadow 160ms cubic-bezier(.23,1,.32,1); }
.lab-button { min-height: 36px; border-radius: 0; font-weight: 650; box-shadow: 0 2px 0 var(--ink); }
.btn.primary { box-shadow: 0 2px 0 color-mix(in srgb, var(--accent) 65%, black); }
.btn.secondary { box-shadow: 0 2px 0 var(--ink); }
.btn.ghost { box-shadow: none; }
.btn.danger { box-shadow: 0 2px 0 color-mix(in srgb, var(--danger) 65%, black); }
.btn.icon-btn { inline-size: 36px; padding: 0; }
.state-grid { border-block: 1px solid var(--line); }
.motion-grid { border-bottom: 1px solid var(--ink); }
.composition-grid { gap: 1px; background: var(--line); border: 1px solid var(--line); }
.product-grid { border-top: 1px solid var(--ink); }
.product-card { box-shadow: none; }
.token-swatch { border-color: var(--ink); }
.table { font-variant-numeric: tabular-nums; }
`,
  },
  {
    id: 'R2IMP-2',
    title: 'Signal Register',
    family: 'Impeccable · signal folio',
    move: 'Let the system read like a composed folio until action is required, then reveal a compact black-and-blue control grammar with unmistakable hierarchy.',
    essence:
      'Editorial calm with decisive instrument moments—the restrained sibling of a signal console.',
    dna: [
      'Wide blank margins and sparse horizontal rules establish a calm reading field.',
      'A black display header and mono running line make every specimen feel catalogued, not marketed.',
      'Actions use a two-part label-and-key anatomy, giving buttons a memorable Misty Step signature.',
    ],
    dials: {
      color: 'Neutral white and graphite with sharp cobalt action moments.',
      type: 'Disciplined large masthead, calm regular body, frequent mono control keys.',
      density:
        'Calm at system level, compact within controls and the workbench.',
      shape: 'Open strips, full-width rules, square keyed controls.',
      imagery: 'Signal traces, folio captions, and cropped technical diagrams.',
    },
    layout: 'top',
    componentLayout: 'strips',
    button: {
      grammar:
        'Every action is a square label cell; important actions may carry a narrow right-hand key cell separated by a hairline. The key may hold an arrow or shortcut, never decoration.',
      height: '40px default, 34px compact, 40px square icon',
      padding: '0 0 0 15px; keyed suffix receives 12px and a left hairline',
      weight: '600 label; 500 mono key',
      primary:
        'Near-black field and white label with cobalt key cell; primary is visually singular per action group.',
      secondary: 'White field, graphite border, separate neutral key cell.',
      ghost:
        'Text-and-glyph control with a persistent 1px transparent boundary to avoid layout shift.',
      destructive:
        'Near-black container with danger glyph and white label; never a broad red block.',
      focus:
        'Cobalt outer rule plus a visible inner white rule on dark controls.',
      pressed:
        'Inset 0 0 0 2px currentColor and a 1px label shift, with fixed box metrics.',
      loading:
        'Suffix key becomes a three-frame static progress mark while the verb stays readable.',
    },
    tokens: {
      fontDisplay: "'Geist', 'Helvetica Neue', Helvetica, Arial, sans-serif",
      fontBody: "'Geist', 'Helvetica Neue', Helvetica, Arial, sans-serif",
      fontMono: "'Geist Mono', ui-monospace, SFMono-Regular, Menlo, monospace",
      radiusSm: '0px',
      radiusMd: '0px',
      radiusLg: '0px',
      border: '1px solid var(--line)',
      shadow: '0 4px 8px rgba(16, 18, 22, 0.12)',
      space: '4px 8px 16px 24px 40px 64px',
      control: '40px',
      light: {
        canvas: '#f5f6f7',
        surface: '#fdfdfd',
        raised: '#ffffff',
        ink: '#111318',
        muted: '#62666f',
        line: '#d8dbe0',
        accent: '#2447d8',
        accentInk: '#ffffff',
        success: '#176b4a',
        warning: '#78531f',
        danger: '#a13e39',
      },
      dark: {
        canvas: '#0e1014',
        surface: '#13151a',
        raised: '#191c22',
        ink: '#f0f1f3',
        muted: '#a5a9b2',
        line: '#333741',
        accent: '#91a4ff',
        accentInk: '#0e1014',
        success: '#72cea7',
        warning: '#d3ae79',
        danger: '#ed8b85',
      },
    },
    products: {
      canary: {
        accent: '#176b4a',
        secondary: '#2447d8',
        note: 'Compact density, high mono ratio, horizontal signal strips, instant state feedback with persistent resolution.',
      },
      powder: {
        accent: '#6d28d9',
        secondary: '#2447d8',
        note: 'Medium density, weight-led task hierarchy, open three-lane board, short keyed transitions.',
      },
      crucible: {
        accent: '#2447d8',
        secondary: '#a13e39',
        note: 'Dense comparison cadence, tabular typography, paired evidence panes, restrained clip reveal for results.',
      },
      landmark: {
        accent: '#b94812',
        secondary: '#2447d8',
        note: 'Calm density, prose-forward ratio, folio chronology, large technical figure intervals and cut transitions.',
      },
    },
    css: `
.future-root { border-top: 3px solid var(--ink); }
.future-hero { min-height: 22rem; display: flex; flex-direction: column; justify-content: flex-end; border-bottom: 1px solid var(--ink); padding-block: 4rem 1.5rem; }
.type-display { font-size: clamp(3rem, 9vw, 6rem); line-height: .86; letter-spacing: -.04em; font-weight: 800; max-width: 9ch; text-wrap: balance; }
.future-nav { border-bottom: 1px solid var(--ink); }
.future-section { padding-block: 3rem; }
.section-heading { max-width: 22rem; }
.component-gallery { display: flex; flex-direction: column; gap: 0; }
.component-card { border-width: 1px 0 0 0; box-shadow: none; }
.specimen { border-top: 1px solid var(--line); }
.button-lab { border-block: 1px solid var(--ink); }
.button-board { gap: .5rem; }
.btn { min-height: 40px; border-radius: 0; font-weight: 600; position: relative; transition: background-color 160ms cubic-bezier(.23,1,.32,1), color 160ms cubic-bezier(.23,1,.32,1), box-shadow 160ms cubic-bezier(.23,1,.32,1), transform 160ms cubic-bezier(.23,1,.32,1); }
.lab-button { min-height: 40px; border-radius: 0; font-weight: 600; border-color: var(--ink); }
.btn.primary { background: var(--ink); color: var(--surface); box-shadow: inset -9px 0 0 var(--accent); padding-right: 25px; }
.btn.secondary { border-color: var(--ink); box-shadow: inset -9px 0 0 var(--line); padding-right: 25px; }
.btn.ghost { background: transparent; border-color: transparent; box-shadow: none; }
.btn.danger { background: var(--ink); color: var(--surface); box-shadow: inset -9px 0 0 var(--danger); padding-right: 25px; }
.btn.icon-btn { inline-size: 40px; padding: 0; box-shadow: inset 0 -3px 0 var(--accent); }
.state-grid { gap: 0; border-block: 1px solid var(--line); }
.motion-grid { border-top: 1px solid var(--ink); }
.composition-grid { border-block: 1px solid var(--ink); }
.product-grid { gap: 0; border: 1px solid var(--line); }
.product-card { border-width: 0 0 1px 0; box-shadow: none; }
.token-swatch { border-radius: 0; }
.table { border-block: 1px solid var(--ink); }
`,
  },
  {
    id: 'R2IMP-3',
    title: 'Civic Register',
    family: 'Impeccable · civic instrument',
    move: 'Refine the civic-tool character into a humane public instrument: clear jurisdiction bands, durable black controls, and a measured blue dispatch action.',
    essence:
      'The clarity of a public record desk with the tactility and precision of a well-made measuring device.',
    dna: [
      'A split masthead pairs the system name with a compact statement of authority and scope.',
      'Dense working regions alternate with open reading regions rather than enclosing everything in cards.',
      'Black action housings, blue dispatch controls, and tiny mono reference marks form a durable control language.',
    ],
    dials: {
      color:
        'Graphite civic neutral with ultramarine dispatch and reserved semantic glyphs.',
      type: 'Heavy Geist display slab effect through weight and width; plain Geist work text; mono references.',
      density:
        'Medium-high operational body with a deliberately calm public-record composition.',
      shape: 'Square jurisdiction bands, ruled bays, flush control groups.',
      imagery: 'Survey grids, registry stamps, and orthogonal service maps.',
    },
    layout: 'split',
    componentLayout: 'bento',
    button: {
      grammar:
        'Buttons are flush square housings with a 3px top datum. Black means ordinary action, blue means dispatch/commit, outline means secondary, and unboxed ink remains navigation.',
      height: '38px default, 32px compact, 38px square icon',
      padding: '0 13px; 8px label-to-glyph gap',
      weight: '700 for action verbs, 500 mono for shortcuts',
      primary:
        'Ultramarine housing, white ink, dark top datum; one commit action per region.',
      secondary: 'White housing, black hairline, black top datum.',
      ghost:
        'Transparent toolbar housing; top datum appears only on hover and focus.',
      destructive:
        'White housing with black label and danger glyph plus danger top datum; avoids alarm-red slabs.',
      focus:
        '3px offset outline in current action hue, plainly visible in both modes.',
      pressed:
        'Top datum expands inward to 5px while label moves down 1px; outer box never moves.',
      loading:
        'Top datum becomes a determinate left-to-right rule; action text stays fixed and readable.',
    },
    tokens: {
      fontDisplay: "'Geist', 'Helvetica Neue', Helvetica, Arial, sans-serif",
      fontBody: "'Geist', 'Helvetica Neue', Helvetica, Arial, sans-serif",
      fontMono: "'Geist Mono', ui-monospace, SFMono-Regular, Menlo, monospace",
      radiusSm: '0px',
      radiusMd: '0px',
      radiusLg: '0px',
      border: '1px solid var(--line)',
      shadow: '0 2px 6px rgba(20, 22, 24, 0.14)',
      space: '4px 8px 12px 20px 28px 40px 56px',
      control: '38px',
      light: {
        canvas: '#f4f5f5',
        surface: '#fbfcfc',
        raised: '#ffffff',
        ink: '#16191b',
        muted: '#62696d',
        line: '#d5d9da',
        accent: '#2345c7',
        accentInk: '#ffffff',
        success: '#146b49',
        warning: '#76521f',
        danger: '#a33d37',
      },
      dark: {
        canvas: '#101213',
        surface: '#151819',
        raised: '#1b1f20',
        ink: '#eff1f1',
        muted: '#a3aaad',
        line: '#34393b',
        accent: '#91a3ff',
        accentInk: '#101213',
        success: '#70cca4',
        warning: '#d0ab77',
        danger: '#ef8982',
      },
    },
    products: {
      canary: {
        accent: '#146b49',
        secondary: '#2345c7',
        note: 'High density, mono-heavy readings, jurisdiction-band monitor wall, instant status cuts and persistent success.',
      },
      powder: {
        accent: '#6d28d9',
        secondary: '#2345c7',
        note: 'Medium density, stronger title ratio, flush ruled work bays, brief state feedback and compact service-map marks.',
      },
      crucible: {
        accent: '#2345c7',
        secondary: '#a33d37',
        note: 'Highest density, tabular evidence emphasis, split adjudication bench, determinate result-rule motion.',
      },
      landmark: {
        accent: '#bd4614',
        secondary: '#2345c7',
        note: 'Calm density, prose-forward typography, public-record chronology, spacious survey plates with no ambient motion.',
      },
    },
    css: `
.future-root { border-inline: 1px solid var(--line); }
.future-hero { display: grid; grid-template-columns: minmax(0, 1.45fr) minmax(14rem, .55fr); gap: 2rem; align-items: end; min-height: 20rem; padding-block: 3.5rem 1.5rem; border-bottom: 3px solid var(--ink); }
.type-display { font-size: clamp(2.9rem, 7.5vw, 5.4rem); line-height: .9; letter-spacing: -.035em; font-weight: 800; max-width: 10ch; text-wrap: balance; }
.future-nav { border-block: 1px solid var(--line); }
.section-heading { border-bottom: 3px solid var(--ink); padding-bottom: .65rem; }
.component-gallery { gap: 1px; background: var(--line); border: 1px solid var(--line); }
.component-card { border: 0; box-shadow: none; }
.specimen { border-top: 1px solid var(--line); }
.button-lab { border-top: 3px solid var(--ink); border-bottom: 1px solid var(--ink); }
.button-board { gap: .6rem; }
.btn { min-height: 38px; border-radius: 0; font-weight: 700; position: relative; box-shadow: inset 0 3px 0 color-mix(in srgb, currentColor 65%, transparent); transition: color 160ms cubic-bezier(.23,1,.32,1), background-color 160ms cubic-bezier(.23,1,.32,1), box-shadow 160ms cubic-bezier(.23,1,.32,1); }
.lab-button { min-height: 38px; border-radius: 0; font-weight: 700; box-shadow: inset 0 3px 0 var(--ink); }
.btn.primary { box-shadow: inset 0 3px 0 color-mix(in srgb, var(--accent) 55%, black); }
.btn.secondary { border-color: var(--ink); box-shadow: inset 0 3px 0 var(--ink); }
.btn.ghost { border-color: transparent; box-shadow: inset 0 3px 0 transparent; }
.btn.danger { background: var(--surface); color: var(--ink); border-color: var(--ink); box-shadow: inset 0 3px 0 var(--danger); }
.btn.icon-btn { inline-size: 38px; padding: 0; }
.state-grid { border-top: 3px solid var(--ink); }
.motion-grid { border-bottom: 1px solid var(--ink); }
.composition-grid { gap: 1px; background: var(--ink); border: 1px solid var(--ink); }
.product-grid { border-top: 3px solid var(--ink); }
.product-card { box-shadow: none; }
.product-canary { border-top: 3px solid #146b49; }
.product-powder { border-top: 3px solid #6d28d9; }
.product-crucible { border-top: 3px solid #2345c7; }
.product-landmark { border-top: 3px solid #bd4614; }
.token-swatch { border-color: var(--ink); }
.table { border-top: 3px solid var(--ink); }
@media (max-width: 620px) { .future-hero { grid-template-columns: 1fr; min-height: 18rem; } }
`,
  },
];

export default SPECS;
