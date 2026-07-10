export const SPECS = [
  {
    id: 'R2RED-1',
    title: 'Signal Loom',
    family: 'Misty Step / signal instrument',
    move: 'Turn the existing ruled interface into a more legible signal field: a decisive display register, woven alignment lines, and action controls that read as physical switches rather than navigation.',
    essence:
      'The current Misty Step instrument with its hierarchy tuned and its controls made unmistakable.',
    dna: [
      'Ink-first Swiss grid with ultramarine reserved for the live signal',
      'Hard-edged controls whose left keyline communicates action and priority',
      'Dense mono evidence woven through calm Geist reading surfaces',
    ],
    dials: {
      color:
        'Near-neutral paper and carbon with one electrical ultramarine signal',
      type: 'Geist display and body; Geist Mono for labels, coordinates, and evidence',
      density: 'Medium-high chrome around a calm central reading lane',
      shape:
        'Square modules, hairline seams, and occasional double-rule emphasis',
      imagery:
        'Orthogonal signal paths, registration ticks, and technical pen traces',
    },
    layout: 'top',
    componentLayout: 'strips',
    button: {
      grammar:
        'Action is a 36px square-edged block with an explicit 3px action keyline; navigation remains uncontained ink. Primary reverses to carbon, secondary stays paper with a ruled edge, ghost is underline-free and gains a wash only on intent.',
      height: '36px',
      padding: '0 15px 0 12px',
      weight: '600',
      primary:
        'Carbon field, paper ink, ultramarine left keyline; hover lifts ink density without floating',
      secondary:
        'Paper field, carbon hairline, carbon label, ultramarine keyline appears on hover',
      ghost:
        'No resting box; wash and left keyline appear on hover so it still reads as an action',
      destructive:
        'Carbon outline with danger glyph and danger left keyline; filled danger is reserved for confirmation',
      focus: '2px ultramarine outer rule with 2px paper separation',
      pressed:
        'TranslateY(1px), replace the left keyline with a full carbon inset rule',
      loading:
        'Label remains stable; a three-cell mono progress register advances at the leading edge',
    },
    tokens: {
      fontDisplay: '"Geist", sans-serif',
      fontBody: '"Geist", sans-serif',
      fontMono: '"Geist Mono", monospace',
      radiusSm: '0px',
      radiusMd: '0px',
      radiusLg: '0px',
      border: '1px solid var(--line)',
      shadow: '0 8px 24px rgba(21, 21, 21, 0.08)',
      space: '4px 8px 12px 20px 32px 52px',
      control: '36px',
      light: {
        canvas: '#f7f7f5',
        surface: '#fcfcfb',
        raised: '#ffffff',
        ink: '#151515',
        muted: '#676764',
        line: '#ddddda',
        accent: '#2643d0',
        accentInk: '#ffffff',
        success: '#287653',
        warning: '#a16712',
        danger: '#b33a32',
      },
      dark: {
        canvas: '#101111',
        surface: '#151616',
        raised: '#1b1c1c',
        ink: '#ededeb',
        muted: '#9b9b96',
        line: '#30312f',
        accent: '#8c9eff',
        accentInk: '#111216',
        success: '#69b893',
        warning: '#d2a557',
        danger: '#e17a72',
      },
    },
    products: {
      canary: {
        accent: '#287653',
        secondary: '#dcebe3',
        note: 'Airier vertical cadence, large reading lane, sparse trace imagery, and slow one-shot resolution ticks.',
      },
      powder: {
        accent: '#2643d0',
        secondary: '#dfe4fa',
        note: 'Compact board cadence, heavier mono ratio, clipped column seams, and immediate drag-state feedback.',
      },
      crucible: {
        accent: '#8a3f9e',
        secondary: '#eadff0',
        note: 'Dense comparison strips, narrow evidence columns, paired-score geometry, and no ambient motion.',
      },
      landmark: {
        accent: '#a16712',
        secondary: '#f0e5d1',
        note: 'Document-led composition, wider measure, numbered plate cadence, and sparse archival linework.',
      },
    },
    css: `
.future-root { --signal-keyline: 3px; }
.future-hero { border-top: 3px solid var(--ink); border-bottom: 1px solid var(--line); padding-top: 2rem; }
.future-hero .type-display { display: block; max-width: 12ch; font-size: clamp(2.15rem, 5.5vw, 4.8rem); line-height: .88; letter-spacing: -.065em; font-weight: 800; text-wrap: balance; }
.future-nav { border-bottom: 1px solid var(--line); }
.future-section { border-top: 1px solid var(--line); }
.section-heading { border-left: var(--signal-keyline) solid var(--accent); padding-left: .75rem; font-weight: 800; }
.component-gallery { gap: 0; border-top: 1px solid var(--line); }
.component-card { border-width: 0 0 1px 0; box-shadow: none; }
.specimen { background: color-mix(in srgb, var(--surface) 88%, var(--canvas)); border-left: 1px solid var(--line); }
.button-lab { border-top: 3px solid var(--ink); }
.button-board { gap: .625rem; }
.btn, .lab-button { min-height: 36px; border-radius: 0; font-weight: 600; letter-spacing: -.01em; transition: background-color 140ms ease, color 140ms ease, border-color 140ms ease, transform 70ms ease; }
.btn.primary { border-left: 3px solid var(--accent); background: var(--ink); color: var(--canvas); }
.btn.secondary { border: 1px solid var(--ink); border-left-width: 3px; background: var(--surface); color: var(--ink); }
.btn.ghost { border: 1px solid transparent; border-left: 3px solid transparent; background: transparent; }
.btn.danger { border: 1px solid var(--ink); border-left: 3px solid var(--danger); background: transparent; color: var(--ink); }
.btn.icon-btn { width: 36px; padding: 0; border: 1px solid var(--ink); }
.btn.primary:hover { background: color-mix(in srgb, var(--ink) 88%, var(--accent)); }
.btn.secondary:hover { border-left-color: var(--accent); background: var(--raised); }
.btn.ghost:hover { border-left-color: var(--accent); background: var(--canvas); }
.btn.danger:hover { background: color-mix(in srgb, var(--danger) 8%, var(--surface)); }
.btn:focus-visible, .lab-button:focus-visible { outline: 2px solid var(--accent); outline-offset: 2px; }
.btn:active, .lab-button:active { transform: translateY(1px); box-shadow: inset 0 0 0 1px var(--ink); }
.state-grid { gap: 1px; background: var(--line); }
.motion-grid { border-left: 3px solid var(--accent); }
.composition-grid { align-items: start; }
.product-grid { gap: 1px; background: var(--line); }
.product-card { border: 0; min-height: 14rem; }
.product-canary { padding: 2rem 1.25rem 2.5rem; }
.product-powder { padding: .75rem; font-family: var(--font-mono); }
.product-crucible { padding: .75rem 1rem; border-top: 3px solid currentColor; }
.product-landmark { padding: 1.5rem 2rem 2.25rem; }
@media (max-width: 620px) {
  .future-hero .type-display { font-size: clamp(2rem, 14vw, 3.25rem); }
  .product-landmark { padding-inline: 1rem; }
}
`,
  },
  {
    id: 'R2RED-2',
    title: 'Civic Instrument',
    family: 'Misty Step / public works',
    move: 'Give the current system the confidence of a well-made civic instrument: explicit section numbering, compact administrative chrome, and buttons built from label, key, and boundary rather than generic fill variants.',
    essence:
      'Serious public infrastructure, typeset with enough warmth to remain humane.',
    dna: [
      'Paper-white administrative surfaces organized by numbered rules',
      'A two-part button anatomy: action key plus stable label field',
      'Editorial breathing room held inside an efficient operator frame',
    ],
    dials: {
      color:
        'Warm institutional neutrals with ultramarine as the authorization mark',
      type: 'Geist throughout; mono reserved for indices, values, and control keys',
      density:
        'Compact rail and tables balanced by medium-spaced forms and documents',
      shape: 'Square framed fields, numbered gutters, and interrupted rules',
      imagery:
        'Survey marks, form indices, archive stamps, and orthogonal service maps',
    },
    layout: 'rail',
    componentLayout: 'ledger',
    button: {
      grammar:
        'Every action has a narrow mono key cell and a wider Geist label cell. Primary uses ink across both cells with an accent key; secondary uses ruled paper; ghost keeps the key cell visible so it cannot be mistaken for a link.',
      height: '38px',
      padding: '0 14px 0 10px',
      weight: '600',
      primary: 'Ink label field with ultramarine key cell and paper label',
      secondary:
        'Paper label field with ink key cell outlined by the same hairline',
      ghost: 'Transparent label field with a persistent hairline key cell',
      destructive:
        'Paper field with danger key cell and danger glyph; confirmation reverses the field',
      focus: 'Offset ultramarine rule plus a high-contrast inner hairline',
      pressed:
        'Key cell darkens and label shifts down one pixel; outer footprint never changes',
      loading:
        'Key cell cycles a static sequence mark while label changes to a specific present-tense action',
    },
    tokens: {
      fontDisplay: '"Geist", sans-serif',
      fontBody: '"Geist", sans-serif',
      fontMono: '"Geist Mono", monospace',
      radiusSm: '0px',
      radiusMd: '0px',
      radiusLg: '0px',
      border: '1px solid var(--line)',
      shadow: '0 10px 28px rgba(35, 32, 27, 0.09)',
      space: '4px 8px 13px 21px 34px 55px',
      control: '38px',
      light: {
        canvas: '#f4f3ef',
        surface: '#faf9f5',
        raised: '#fffefa',
        ink: '#191918',
        muted: '#6e6c65',
        line: '#d8d6cf',
        accent: '#2545c7',
        accentInk: '#ffffff',
        success: '#357454',
        warning: '#9b681a',
        danger: '#ae3f36',
      },
      dark: {
        canvas: '#121211',
        surface: '#181817',
        raised: '#1f1f1d',
        ink: '#efeee9',
        muted: '#aaa79d',
        line: '#33322e',
        accent: '#91a3ff',
        accentInk: '#101114',
        success: '#72b28d',
        warning: '#d3aa65',
        danger: '#df7d75',
      },
    },
    products: {
      canary: {
        accent: '#357454',
        secondary: '#dce8df',
        note: 'Wide incident narrative, generous row cadence, prominent time register, and a single resolving status stroke.',
      },
      powder: {
        accent: '#2545c7',
        secondary: '#dfe4f7',
        note: 'Narrower measure, compact numbered columns, dense mono ownership labels, and crisp state cuts.',
      },
      crucible: {
        accent: '#7d4a92',
        secondary: '#e9dfec',
        note: 'Symmetric evaluation ledger, paired evidence plates, high mono ratio, and deliberate comparison cadence.',
      },
      landmark: {
        accent: '#9b681a',
        secondary: '#eee3ce',
        note: 'Archive-first document composition, low mono ratio, wide text measure, and numbered release plates.',
      },
    },
    css: `
.future-root { counter-reset: civic-section; }
.future-hero { border-top: 1px solid var(--ink); border-bottom: 3px double var(--ink); padding-bottom: 2.25rem; }
.future-hero .type-display { display: block; max-width: 10ch; font-size: clamp(2.25rem, 5vw, 4.5rem); line-height: .92; letter-spacing: -.06em; font-weight: 800; text-wrap: balance; }
.future-nav { border-right: 1px solid var(--line); font-family: var(--font-mono); }
.future-section { counter-increment: civic-section; border-top: 1px solid var(--ink); }
.section-heading { display: grid; grid-template-columns: 2.5rem 1fr; align-items: baseline; font-weight: 800; }
.section-heading::before { content: "0" counter(civic-section); color: var(--muted); font-family: var(--font-mono); font-size: .75rem; font-weight: 500; letter-spacing: .08em; }
.component-gallery { border-top: 1px solid var(--line); }
.component-card { border-width: 0 0 1px 0; box-shadow: none; }
.specimen { border-left: 1px solid var(--line); }
.button-lab { border: 1px solid var(--ink); border-top-width: 3px; }
.button-board { gap: .5rem; }
.btn, .lab-button { min-height: 38px; border-radius: 0; font-weight: 600; box-shadow: inset 10px 0 0 color-mix(in srgb, currentColor 10%, transparent); transition: background-color 140ms ease, color 140ms ease, box-shadow 140ms ease, transform 70ms ease; }
.btn.primary { border: 1px solid var(--ink); border-left: 10px solid var(--accent); background: var(--ink); color: var(--canvas); }
.btn.secondary { border: 1px solid var(--ink); border-left-width: 10px; background: var(--surface); color: var(--ink); }
.btn.ghost { border: 1px solid transparent; border-left: 10px solid var(--line); background: transparent; color: var(--ink); }
.btn.danger { border: 1px solid var(--danger); border-left: 10px solid var(--danger); background: transparent; color: var(--ink); }
.btn.icon-btn { width: 38px; padding: 0; border: 1px solid var(--ink); border-top: 3px solid var(--accent); box-shadow: none; }
.btn.primary:hover { background: color-mix(in srgb, var(--ink) 88%, var(--accent)); }
.btn.secondary:hover { background: var(--raised); box-shadow: inset 10px 0 0 color-mix(in srgb, var(--accent) 20%, transparent); }
.btn.ghost:hover { border-color: var(--line); border-left-color: var(--accent); background: var(--surface); }
.btn.danger:hover { background: color-mix(in srgb, var(--danger) 9%, var(--surface)); }
.btn:focus-visible, .lab-button:focus-visible { outline: 2px solid var(--accent); outline-offset: 3px; box-shadow: inset 0 0 0 1px var(--canvas); }
.btn:active, .lab-button:active { transform: translateY(1px); box-shadow: inset 10px 0 0 color-mix(in srgb, currentColor 22%, transparent); }
.state-grid { gap: 0; border: 1px solid var(--line); }
.motion-grid { border-top: 3px double var(--ink); }
.composition-grid { gap: 1px; background: var(--line); }
.product-grid { gap: 0; border: 1px solid var(--line); }
.product-card { border-width: 0 1px 0 0; box-shadow: none; }
.product-canary { padding: 2rem 1.5rem; }
.product-powder { padding: .75rem; font-family: var(--font-mono); border-top: 4px solid currentColor; }
.product-crucible { padding: 1rem; font-variant-numeric: tabular-nums; }
.product-landmark { padding: 2rem; border-left: 2.5rem solid color-mix(in srgb, currentColor 8%, transparent); }
@media (max-width: 620px) {
  .future-hero .type-display { font-size: clamp(2.1rem, 13vw, 3.1rem); }
  .section-heading { grid-template-columns: 2rem 1fr; }
  .product-card { border-width: 0 0 1px 0; }
}
`,
  },
  {
    id: 'R2RED-3',
    title: 'Quiet Atelier',
    family: 'Misty Step / precision studio',
    move: 'Refine rather than decorate: warmer paper, more exact optical spacing, a confidently scaled system title, and a button family modeled on finely machined drafting controls.',
    essence:
      'Misty Step at its calmest: precise enough for operators, gracious enough for long attention.',
    dna: [
      "Quiet carbon on warm paper with ultramarine used like a proofreader's mark",
      'Optically tuned square controls with distinct face, edge, and press states',
      'Calm editorial fields opening into compact evidence instruments',
    ],
    dials: {
      color:
        'Soft paper and graphite neutrals with one disciplined ultramarine correction',
      type: 'Geist with assertive weight contrast; mono appears only where exactness matters',
      density:
        'Calm reading and form surfaces paired with one deliberately dense workbench',
      shape:
        'Square drafting blocks, fine graphite seams, and inset control faces',
      imagery:
        'Crop marks, specimen labels, measured diagrams, and sparse hatch studies',
    },
    layout: 'split',
    componentLayout: 'bento',
    button: {
      grammar:
        'A button is a machined face inside a one-pixel frame. Primary has an ink face and ultramarine lower datum; secondary is paper with a graphite face; ghost is typographic but retains a square hover field and action cursor.',
      height: '40px',
      padding: '0 16px',
      weight: '600',
      primary:
        'Carbon face with paper label and a 2px ultramarine datum along the lower edge',
      secondary:
        'Raised paper face with graphite boundary and a restrained inset highlight',
      ghost:
        'Transparent resting face; wash appears on hover with an ink lower datum',
      destructive:
        'Paper face, danger glyph, and danger lower datum; never a red slab until final confirmation',
      focus:
        'Ultramarine corner brackets expressed as a clean 2px outline with generous offset',
      pressed:
        'One-pixel downward travel, inset top rule darkens, lower datum compresses visually',
      loading:
        'A fixed-width leading register shows two alternating drafting ticks; label and width remain stable',
    },
    tokens: {
      fontDisplay: '"Geist", sans-serif',
      fontBody: '"Geist", sans-serif',
      fontMono: '"Geist Mono", monospace',
      radiusSm: '0px',
      radiusMd: '0px',
      radiusLg: '0px',
      border: '1px solid var(--line)',
      shadow: '0 12px 32px rgba(28, 27, 24, 0.07)',
      space: '5px 9px 14px 23px 37px 60px',
      control: '40px',
      light: {
        canvas: '#f5f4f0',
        surface: '#fbfaf6',
        raised: '#fffefa',
        ink: '#181817',
        muted: '#716f68',
        line: '#dedbd3',
        accent: '#2b45c5',
        accentInk: '#ffffff',
        success: '#3d7559',
        warning: '#9f6e24',
        danger: '#ad433b',
      },
      dark: {
        canvas: '#111211',
        surface: '#171817',
        raised: '#1d1e1c',
        ink: '#efeee9',
        muted: '#a7a49b',
        line: '#31322f',
        accent: '#95a5ff',
        accentInk: '#111218',
        success: '#77b092',
        warning: '#d1ab6d',
        danger: '#dc817a',
      },
    },
    products: {
      canary: {
        accent: '#3d7559',
        secondary: '#dfe9e2',
        note: 'Calmest cadence, broad telemetry field, faint hatch imagery, and a gentle once-only resolution mark.',
      },
      powder: {
        accent: '#2b45c5',
        secondary: '#e0e4f5',
        note: 'Tighter card rhythm, stronger mono ownership register, square cut-line columns, and immediate state feedback.',
      },
      crucible: {
        accent: '#81508f',
        secondary: '#e9e1eb',
        note: 'Dense split composition, tabular score spine, repeated evidence cadence, and static comparison marks.',
      },
      landmark: {
        accent: '#9f6e24',
        secondary: '#eee5d6',
        note: 'Most editorial ratio, wide document measure, low-density release plates, and archival crop-mark imagery.',
      },
    },
    css: `
.future-root { --atelier-datum: 2px; }
.future-hero { position: relative; border-top: 1px solid var(--ink); padding: 2.5rem 0 3.5rem; }
.future-hero::after { content: ""; position: absolute; left: 0; bottom: 0; width: 4.5rem; height: 3px; background: var(--accent); }
.future-hero .type-display { display: block; max-width: 11ch; font-size: clamp(2.3rem, 5.2vw, 4.65rem); line-height: .9; letter-spacing: -.065em; font-weight: 800; text-wrap: balance; }
.future-nav { border-bottom: 1px solid var(--line); }
.future-section { padding-block: 3rem 3.75rem; border-top: 1px solid var(--line); }
.section-heading { max-width: 20ch; font-weight: 800; letter-spacing: -.025em; }
.component-gallery { gap: .75rem; align-items: start; }
.component-card { border: 1px solid var(--line); box-shadow: none; }
.specimen { background: color-mix(in srgb, var(--surface) 86%, var(--canvas)); }
.button-lab { border: 1px solid var(--ink); padding: 1.25rem; }
.button-board { gap: .75rem; align-items: center; }
.btn, .lab-button { min-height: 40px; border-radius: 0; font-weight: 600; letter-spacing: -.012em; transition: background-color 160ms ease, color 160ms ease, box-shadow 160ms ease, transform 70ms ease; }
.btn.primary { border: 1px solid var(--ink); border-bottom: var(--atelier-datum) solid var(--accent); background: var(--ink); color: var(--canvas); box-shadow: inset 0 1px 0 color-mix(in srgb, var(--canvas) 16%, transparent); }
.btn.secondary { border: 1px solid var(--ink); border-bottom-width: 2px; background: var(--raised); color: var(--ink); box-shadow: inset 0 1px 0 color-mix(in srgb, var(--canvas) 70%, transparent); }
.btn.ghost { border: 1px solid transparent; border-bottom: 2px solid transparent; background: transparent; color: var(--ink); }
.btn.danger { border: 1px solid var(--ink); border-bottom: 2px solid var(--danger); background: var(--surface); color: var(--ink); }
.btn.icon-btn { width: 40px; padding: 0; border: 1px solid var(--ink); border-bottom: 2px solid var(--accent); }
.btn.primary:hover { background: color-mix(in srgb, var(--ink) 90%, var(--accent)); }
.btn.secondary:hover { background: var(--surface); border-bottom-color: var(--accent); }
.btn.ghost:hover { border-color: var(--line); border-bottom-color: var(--ink); background: var(--canvas); }
.btn.danger:hover { background: color-mix(in srgb, var(--danger) 8%, var(--surface)); }
.btn:focus-visible, .lab-button:focus-visible { outline: 2px solid var(--accent); outline-offset: 3px; }
.btn:active, .lab-button:active { transform: translateY(1px); box-shadow: inset 0 2px 0 color-mix(in srgb, var(--ink) 18%, transparent); }
.state-grid { gap: .75rem; }
.motion-grid { border-top: 1px solid var(--ink); border-bottom: 1px solid var(--line); }
.composition-grid { gap: 1.25rem; align-items: start; }
.product-grid { gap: .75rem; align-items: start; }
.product-card { border: 1px solid var(--line); box-shadow: none; }
.product-canary { padding: 2.25rem 1.5rem 3rem; }
.product-powder { padding: .75rem; font-family: var(--font-mono); border-bottom: 3px solid currentColor; }
.product-crucible { padding: 1rem; border-left: 2px solid currentColor; font-variant-numeric: tabular-nums; }
.product-landmark { padding: 2rem 2.25rem 3rem; border-top: 1px solid currentColor; }
@media (max-width: 620px) {
  .future-hero { padding-block: 2rem 3rem; }
  .future-hero .type-display { font-size: clamp(2.15rem, 13.5vw, 3.2rem); }
  .future-section { padding-block: 2.25rem 2.75rem; }
  .product-landmark { padding-inline: 1.25rem; }
}
`,
  },
];

export default SPECS;
