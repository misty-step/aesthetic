import { SPECS as BASELINE } from './lanes/baseline.js';
import { SPECS as MINIMAL } from './lanes/minimal.js';
import { SPECS as SOFT } from './lanes/soft.js';
import { SPECS as BRUTAL } from './lanes/brutal.js';
import anthropic from './lanes/anthropic.js';
import hallmark from './lanes/hallmark.js';
import impeccable from './lanes/impeccable.js';

const imported = { ...BASELINE };
for (const spec of [
  ...Object.values(MINIMAL),
  ...Object.values(SOFT),
  ...Object.values(BRUTAL),
  ...anthropic,
  ...hallmark,
  ...impeccable,
])
  imported[spec.id] = spec;

const params = new URLSearchParams(location.search);
const id = params.get('id') || 'BASE-1';
const mode = params.get('mode') === 'dark' ? 'dark' : 'light';
const fallback = BASELINE['BASE-1'];
const raw = imported[id] || fallback;
const spec = {
  ...fallback,
  ...raw,
  tokens: {
    ...fallback.tokens,
    ...raw.tokens,
    light: { ...fallback.tokens.light, ...raw.tokens?.light },
    dark: { ...fallback.tokens.dark, ...raw.tokens?.dark },
  },
  products: { ...fallback.products, ...raw.products },
};

const palette = spec.tokens[mode];
const vars = {
  '--canvas': palette.canvas,
  '--surface': palette.surface,
  '--raised': palette.raised,
  '--ink': palette.ink,
  '--muted': palette.muted,
  '--line': palette.line,
  '--accent': palette.accent,
  '--accent-ink': palette.accentInk,
  '--success': palette.success,
  '--warning': palette.warning,
  '--danger': palette.danger,
  '--font-display': spec.tokens.fontDisplay,
  '--font-body': spec.tokens.fontBody,
  '--font-mono': spec.tokens.fontMono,
  '--radius-sm': spec.tokens.radiusSm,
  '--radius-md': spec.tokens.radiusMd,
  '--radius-lg': spec.tokens.radiusLg,
  '--border': spec.tokens.border,
  '--shadow': spec.tokens.shadow,
  '--space': spec.tokens.space,
  '--control': spec.tokens.control,
};

const icon = (name) => {
  const paths = {
    grid: '<rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/>',
    check: '<path d="m5 12 4 4L19 6"/>',
    alert:
      '<path d="M12 9v4m0 4h.01"/><path d="M10.3 3.6 2.4 18a2 2 0 0 0 1.8 3h15.6a2 2 0 0 0 1.8-3L13.7 3.6a2 2 0 0 0-3.4 0Z"/>',
    search: '<circle cx="11" cy="11" r="7"/><path d="m20 20-4-4"/>',
    chevron: '<path d="m9 18 6-6-6-6"/>',
    dots: '<circle cx="5" cy="12" r="1"/><circle cx="12" cy="12" r="1"/><circle cx="19" cy="12" r="1"/>',
    activity: '<path d="M3 12h4l2-7 4 14 2-7h6"/>',
    close: '<path d="m6 6 12 12M18 6 6 18"/>',
    menu: '<path d="M4 7h16M4 12h16M4 17h16"/>',
  };
  return `<svg class="icon" viewBox="0 0 24 24" aria-hidden="true">${paths[name] || paths.grid}</svg>`;
};
const esc = (value = '') =>
  String(value).replace(
    /[&<>"']/g,
    (c) =>
      ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[
        c
      ],
  );
const productNames = {
  canary: 'Canary',
  powder: 'Powder',
  crucible: 'Crucible',
  landmark: 'Landmark',
};
const swatch = (name, value) =>
  `<div class="swatch"><span style="background:${value}"></span><b>${esc(name)}</b><code>${esc(value)}</code></div>`;
const specimen = (name, body, wide = '') =>
  `<article class="specimen component-card lab-card card ${wide}"><header><span>${esc(name)}</span><code>Base UI</code></header><div class="specimen-body component-demo">${body}</div></article>`;
const state = (name, cls, note) =>
  `<div class="state-row ${cls}"><button class="btn secondary">${esc(name)}</button><span>${esc(note)}</span></div>`;

const components = [
  specimen(
    'Button',
    '<div class="row wrap"><button class="btn primary">Create report</button><button class="btn secondary">Preview</button><button class="btn ghost">Dismiss</button><button class="btn danger">Remove</button><button class="btn icon-btn" aria-label="More">' +
      icon('dots') +
      '</button></div>',
  ),
  specimen(
    'Field + Input',
    '<label class="field"><span>Workspace name</span><input value="North observatory"><small>Visible to your operators.</small></label>',
  ),
  specimen(
    'Select',
    '<label class="field"><span>Evidence window</span><button class="select-trigger">Last 24 hours ' +
      icon('chevron') +
      '</button></label>',
  ),
  specimen(
    'Checkbox + Switch',
    '<div class="stack"><label class="check"><input type="checkbox" checked><span>' +
      icon('check') +
      '</span>Include acknowledged events</label><label class="switch-row"><span><b>Live updates</b><small>Refresh as evidence arrives</small></span><button class="switch" aria-pressed="true"><i></i></button></label></div>',
  ),
  specimen(
    'Tabs',
    '<div class="tabs" role="tablist"><button class="active">Overview</button><button>Evidence</button><button>Activity</button></div><div class="tab-panel">12 signals resolved this week.</div>',
  ),
  specimen(
    'Badges',
    '<div class="row wrap"><span class="badge accent">Running</span><span class="badge success">Healthy</span><span class="badge warning">Needs review</span><span class="badge danger">Blocked</span><span class="badge neutral">Draft</span></div>',
  ),
  specimen(
    'Alert',
    '<div class="alert warning">' +
      icon('alert') +
      '<span><b>Two checks need attention</b><small>Evidence is older than the configured window.</small></span></div>',
  ),
  specimen(
    'Card',
    '<div class="metric-card"><span>Resolution rate</span><strong>98.4%</strong><small><i>+4.2%</i> from prior window</small></div>',
  ),
  specimen(
    'Menu',
    '<div class="menu-demo"><button class="menu-trigger btn secondary">Actions ' +
      icon('chevron') +
      '</button><div class="menu-popover"><button>Open details <kbd>↵</kbd></button><button>Duplicate <kbd>⌘D</kbd></button><hr><button class="danger-text">Archive</button></div></div>',
  ),
  specimen(
    'Table',
    '<div class="table-wrap"><table><thead><tr><th>Signal</th><th>Status</th><th>Age</th></tr></thead><tbody><tr><td>API latency</td><td><span class="status-dot success"></span>Healthy</td><td>2m</td></tr><tr><td>Delivery queue</td><td><span class="status-dot warning"></span>Review</td><td>18m</td></tr><tr><td>Auth probe</td><td><span class="status-dot danger"></span>Failed</td><td>1h</td></tr></tbody></table></div>',
    'wide',
  ),
  specimen(
    'Dialog',
    '<div class="dialog-card"><div class="dialog-head"><b>Publish evidence?</b><button aria-label="Close">' +
      icon('close') +
      '</button></div><p>This creates a durable report for everyone in the workspace.</p><div class="row end"><button class="btn ghost">Cancel</button><button class="btn primary">Publish</button></div></div>',
  ),
  specimen(
    'Tooltip',
    '<div class="tooltip-demo"><button class="btn icon-btn">' +
      icon('activity') +
      '</button><span role="tooltip">View signal history</span></div>',
  ),
  specimen(
    'Toast',
    '<div class="toast"><span class="toast-icon">' +
      icon('check') +
      '</span><span><b>Report published</b><small>Evidence is now available.</small></span><button>' +
      icon('close') +
      '</button></div>',
  ),
  specimen(
    'Command',
    '<div class="command"><div class="command-search">' +
      icon('search') +
      '<span>Search commands…</span><kbd>⌘K</kbd></div><div class="command-group"><small>Suggested</small><button><span>' +
      icon('grid') +
      'Open dashboard</span><kbd>↵</kbd></button><button><span>' +
      icon('activity') +
      'Inspect latest signal</span><kbd>⌘I</kbd></button></div></div>',
    'wide',
  ),
  specimen(
    'Progress + Skeleton',
    '<div class="stack"><div class="progress"><i style="width:72%"></i></div><div class="skeleton-lines"><i></i><i></i><i></i></div></div>',
  ),
  specimen(
    'Empty state',
    '<div class="empty">' +
      icon('grid') +
      '<b>No saved views yet</b><small>Pin a filter to return to it quickly.</small><button class="btn secondary">Create view</button></div>',
  ),
];

const products = Object.entries(spec.products)
  .map(
    ([key, p]) =>
      `<article class="product-card product-${key}" data-product="${key}" style="--product-accent:${p.accent};--product-secondary:${p.secondary}"><div class="product-head"><span>${productNames[key]}</span><i></i></div><div class="product-body"><div class="product-viz ${key}"><b>${key === 'canary' ? '07' : key === 'powder' ? '24' : key === 'crucible' ? 'A/B' : 'v2.8'}</b><span></span><span></span><span></span></div><h3>${esc(p.note)}</h3><dl><div><dt>Accent</dt><dd>${esc(p.accent)}</dd></div><div><dt>Dialect</dt><dd>${esc(spec.dials?.imagery || 'product-owned')}</dd></div></dl></div></article>`,
  )
  .join('');

const html = `<main class="future-root lab-stage lab-spec layout-${spec.layout} components-${spec.componentLayout} mode-${mode}" data-id="${spec.id}" style="${Object.entries(
  vars,
)
  .map(([k, v]) => `${k}:${v}`)
  .join(';')}">
  <header class="system-bar"><a class="brand" href="#top"><span>${icon('grid')}</span><b>Misty Step</b></a><div><span class="substrate">React · shadcn · Base UI</span><span class="mode-label">${mode}</span></div></header>
  <nav class="future-nav" aria-label="Gallery sections"><div><small>${esc(spec.family)}</small><strong>${esc(spec.id)}</strong></div>${[
    ['foundations', 'Foundations'],
    ['components', 'Components'],
    ['states', 'States'],
    ['motion', 'Motion'],
    ['compositions', 'Compositions'],
    ['products', 'Products'],
  ]
    .map(([a, b]) => `<a href="#${a}">${b}</a>`)
    .join('')}</nav>
  <div class="future-scroll"><div class="future-content" id="top">
    <section class="hero future-hero"><div class="eyebrow">SYSTEM FUTURE · ${esc(spec.family)}</div><h1 class="type-display">${esc(spec.title)}</h1><p>${esc(spec.move)}</p><blockquote>${esc(spec.essence)}</blockquote><div class="hero-stats"><div><b>16</b><span>components</span></div><div><b>10</b><span>states</span></div><div><b>4</b><span>compositions</span></div><div><b>4</b><span>product dialects</span></div></div></section>
    <section id="foundations" class="section future-section foundations"><header class="section-title section-heading section-head"><span>01</span><div><h2>Foundations</h2><p>The full token grammar, not a moodboard.</p></div></header>
      <div class="foundation-grid"><article class="foundation-panel palette"><h3>Semantic color</h3><div class="swatches">${Object.entries(
        palette,
      )
        .map(([k, v]) => swatch(k, v))
        .join('')}</div></article>
      <article class="foundation-panel typography"><h3>Typography</h3><div class="type-sample type-display">Instrument intelligence.</div><div class="type-sample type-title">Operational clarity without sterility.</div><p class="type-body">Evidence should be calm enough to inspect and precise enough to trust. Product identity lives in the register, not in ornamental chrome.</p><code class="type-mono">status.resolved / 2026-07-09 14:32</code></article>
      <article class="foundation-panel spacing"><h3>Space + density</h3><div class="space-scale">${[1, 2, 3, 4, 6, 8].map((n) => `<div><i style="width:${n * 9}px"></i><code>${n}</code></div>`).join('')}</div><p>Base unit × ${spec.tokens.space}; controls ${spec.tokens.control}.</p></article>
      <article class="foundation-panel geometry"><h3>Shape + elevation</h3><div class="shape-row"><i></i><i></i><i></i></div><dl><div><dt>Small</dt><dd>${spec.tokens.radiusSm}</dd></div><div><dt>Medium</dt><dd>${spec.tokens.radiusMd}</dd></div><div><dt>Large</dt><dd>${spec.tokens.radiusLg}</dd></div><div><dt>Shadow</dt><dd>${esc(spec.tokens.shadow)}</dd></div></dl></article></div>
    </section>
    <section id="components" class="section future-section"><header class="section-title section-heading section-head"><span>02</span><div><h2>Component gallery</h2><p>Behavior belongs to Base UI; appearance belongs here.</p></div></header><div class="component-gallery grid">${components.join('')}</div></section>
    <section id="states" class="section"><header class="section-title"><span>03</span><div><h2>Interaction states</h2><p>Every state is part of the design language.</p></div></header><div class="state-grid">${state('Default', 'is-default', 'quiet affordance')}${state('Hover', 'is-hover', 'surface response')}${state('Focus', 'is-focus', 'keyboard-visible')}${state('Selected', 'is-selected', 'persistent choice')}${state('Open', 'is-open', 'disclosure active')}${state('Disabled', 'is-disabled', 'unavailable')}${state('Loading', 'is-loading', 'work underway')}${state('Error', 'is-error', 'action required')}${state('Success', 'is-success', 'resolved')}${state('Reduced motion', 'is-reduced', 'instant state change')}</div></section>
    <section id="motion" class="section"><header class="section-title"><span>04</span><div><h2>Motion grammar</h2><p>Purposeful transitions with a complete reduced-motion path.</p></div></header><div class="motion-grid"><article><div class="motion-demo enter"><i></i></div><h3>Enter</h3><p>Reveal hierarchy, never decorate.</p><code>opacity · translate</code></article><article><div class="motion-demo select"><i></i></div><h3>Selection</h3><p>Track direct manipulation.</p><code>color · position</code></article><article><div class="motion-demo disclose"><i></i></div><h3>Disclosure</h3><p>Preserve spatial continuity.</p><code>clip · scale</code></article><article><div class="motion-demo resolve"><i></i></div><h3>Resolution</h3><p>Confirm a state change once.</p><code>stroke · opacity</code></article></div></section>
    <section id="compositions" class="section"><header class="section-title"><span>05</span><div><h2>Composition stress test</h2><p>The same system across four neutral product archetypes.</p></div></header><div class="composition-grid">
      <article class="composition dashboard"><header><span>Operations overview</span><button>${icon('dots')}</button></header><div class="comp-kpis"><div><b>99.98%</b><small>availability</small></div><div><b>184ms</b><small>response</small></div><div><b>7</b><small>active signals</small></div></div><div class="chart"><i></i></div></article>
      <article class="composition settings"><header><span>Workspace settings</span><button class="btn primary">Save</button></header><label class="field"><span>Display name</span><input value="North observatory"></label><label class="field"><span>Default region</span><button class="select-trigger">Chicago '+icon('chevron')+'</button></label><label class="switch-row"><span><b>Public reports</b><small>Share read-only evidence</small></span><button class="switch"><i></i></button></label></article>
      <article class="composition document"><div class="doc-meta">REPORT / 0142</div><h3>Delivery evidence</h3><p>The release completed across all active regions. Two delayed probes recovered within the acceptance window.</p><blockquote>“The artifact should explain itself without the conversation that produced it.”</blockquote><div class="doc-sign"><span>Verified</span><b>09 JUL 2026</b></div></article>
      <article class="composition workbench"><header><span>Evidence queue</span><span class="badge accent">24 open</span></header><div class="work-rows">${[
        ['API regression', 'Critical', '4m'],
        ['Release note drift', 'Review', '18m'],
        ['Visual delta', 'Ready', '31m'],
        ['Cold-start sample', 'Running', '1h'],
      ]
        .map(
          ([a, b, c], i) =>
            `<div><span><i class="status-dot ${i === 0 ? 'danger' : i === 1 ? 'warning' : i === 2 ? 'success' : 'accent'}"></i>${a}</span><b>${b}</b><code>${c}</code></div>`,
        )
        .join('')}</div></article>
    </div></section>
    <section id="products" class="section"><header class="section-title"><span>06</span><div><h2>Product identity dials</h2><p>Family resemblance without product sameness.</p></div></header><div class="dial-strip">${Object.entries(
      spec.dials || {},
    )
      .map(([k, v]) => `<div><b>${esc(k)}</b><span>${esc(v)}</span></div>`)
      .join('')}</div><div class="product-grid">${products}</div></section>
    <footer><span>${esc(spec.id)} · ${esc(spec.title)}</span><span>Fixed substrate: React / shadcn / Base UI</span></footer>
  </div></div>
</main><style>${spec.css || ''}</style>`;

document.documentElement.dataset.mode = mode;
document.getElementById('mount').innerHTML = html;
document
  .querySelectorAll('.section')
  .forEach((element) => element.classList.add('future-section'));
document
  .querySelectorAll('.section-title')
  .forEach((element) =>
    element.classList.add('section-heading', 'section-head'),
  );
document
  .querySelectorAll('.btn')
  .forEach((element) => element.classList.add('lab-button'));
document
  .querySelectorAll('input')
  .forEach((element) => element.classList.add('lab-input'));
document
  .querySelectorAll('.select-trigger')
  .forEach((element) => element.classList.add('lab-select'));
document
  .querySelectorAll('.swatch')
  .forEach((element) => element.classList.add('token-swatch'));
document
  .querySelectorAll('table')
  .forEach((element) => element.classList.add('table'));
document.querySelectorAll('.switch').forEach((button) =>
  button.addEventListener('click', () => {
    const next = button.getAttribute('aria-pressed') !== 'true';
    button.setAttribute('aria-pressed', next);
    button.classList.toggle('on', next);
  }),
);
document.querySelectorAll('.tabs').forEach((tabs) =>
  tabs.addEventListener('click', (event) => {
    if (event.target.tagName !== 'BUTTON') return;
    tabs
      .querySelectorAll('button')
      .forEach((b) => b.classList.remove('active'));
    event.target.classList.add('active');
  }),
);
document
  .querySelectorAll('.menu-trigger')
  .forEach((button) =>
    button.addEventListener('click', () =>
      button.parentElement.classList.toggle('open'),
    ),
  );
window.__LAB_READY__ = {
  id: spec.id,
  mode,
  sections: 6,
  components: components.length,
  states: 10,
  compositions: 4,
  products: 4,
  title: spec.title,
};
