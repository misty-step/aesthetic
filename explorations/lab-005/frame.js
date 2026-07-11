import carry from './lanes/carry.js';
import minimal from './lanes/minimal.js';
import hallmark from './lanes/hallmark.js';
import taste from './lanes/taste.js';
import anthropic from './lanes/anthropic.js';
import redesign from './lanes/redesign.js';
import impeccable from './lanes/impeccable.js';

const allSpecs = [
  ...carry,
  ...[minimal, hallmark, taste, anthropic, redesign, impeccable].flatMap(
    (item) => (Array.isArray(item) ? item : [item]),
  ),
];
const retainedIds = [
  'CARRY-QR',
  'CARRY-CF',
  'PGM-1',
  'PGA-1',
  'PGR-1',
  'PGI-1',
];
const specs = allSpecs.filter((item) => retainedIds.includes(item.id));
const params = new URLSearchParams(location.search),
  id = params.get('id') || 'CARRY-QR',
  mode = params.get('mode') === 'dark' ? 'dark' : 'light';
const spec = specs.find((item) => item.id === id) || specs[0],
  palette = spec.tokens[mode];
const vars = Object.entries({
  '--canvas': palette.canvas,
  '--surface': palette.surface,
  '--wash': palette.wash,
  '--ink': palette.ink,
  '--muted': palette.muted,
  '--line': palette.line,
  '--accent': palette.accent,
  '--success': palette.success,
  '--warning': palette.warning,
  '--danger': palette.danger,
})
  .map(([k, v]) => `${k}:${v}`)
  .join(';');
const brand =
  '<svg viewBox="0 0 24 24"><path d="M4 19 19 4M8 4h11v11M4 10v10h10"/></svg><span>MISTY STEP</span>';
const paths = {
  'cut-square': [
    'M4 12h5l3-8v16l3-8h5',
    'M4 5h16v14H4z M8 12h8',
    'M5 5l14 14M19 5 5 19',
    'M4 12h16 M12 4v16',
    'M5 5h14v14H5z',
  ],
  'corner-mark': [
    'M4 10V4h6 M14 4h6v6 M20 14v6h-6 M10 20H4v-6',
    'M4 4h7 M4 4v7 M20 20h-7 M20 20v-7',
    'M4 4h6M4 4v6M20 20h-6M20 20v-6M8 8l8 8',
    'M4 12h16 M12 4v16',
    'M4 4h5M4 4v5M20 20h-5M20 20v-5',
  ],
  bracketed: [
    'M7 4H4v16h3M17 4h3v16h-3M8 12l3 3 5-7',
    'M7 4H4v16h3M17 4h3v16h-3M8 12h8',
    'M7 4H4v16h3M17 4h3v16h-3M9 8l6 8M15 8l-6 8',
    'M7 4H4v16h3M17 4h3v16h-3M8 12h4',
    'M7 4H4v16h3M17 4h3v16h-3',
  ],
  'register-tick': [
    'M7 4v16M7 8h10M7 12h6M7 16h10',
    'M7 4v16M7 8h6M7 12h10M7 16h6',
    'M7 4v16M7 8h10M7 16h10M11 8l6 8',
    'M7 4v16M7 12h10',
    'M7 4v16',
  ],
  'split-glyph': [
    'M4 4h7v16H4zM13 4h7v7h-7z',
    'M4 4h7v7H4zM13 13h7v7h-7z',
    'M4 4h7v16H4zM13 4h7v16h-7zM7 8l10 8',
    'M4 4h7v7H4zM13 4h7v7h-7z',
    'M4 4h7v7H4z',
  ],
  'signal-cell': [
    'M4 4h7v7H4zM13 13h7v7h-7z',
    'M4 4h7v7H4zM13 4h7v7h-7z',
    'M4 4h7v7H4zM13 13h7v7h-7zM5 19 19 5',
    'M4 13h7v7H4zM13 13h7v7h-7z',
    'M4 4h7v7H4z',
  ],
};
const statuses = [
  ['healthy', 'healthy'],
  ['attention', 'attention'],
  ['failed', 'failed'],
  ['pending', 'pending'],
  ['unknown', 'unknown'],
];
const statusSvg = (state, index) =>
  `<span class="status-mark"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="${paths[spec.statusStyle][index]}"/></svg></span><span>${state}</span>`;
const statusPlate = `<aside class="status-plate" aria-label="Status language">${statuses.map(([state], i) => `<div class="status-item" data-state="${state}">${statusSvg(state, i)}</div>`).join('')}</aside>`;
const projects = [
  [
    'RS',
    'roster',
    'the agent registry: identities, prompts, model policy, and harness materialization',
  ],
  [
    'BB',
    'bitterblossom',
    'event plane for agent workloads: tasks, triggers, budgets, and remote runs',
  ],
  [
    'PW',
    'powder',
    'agent-friendly backlog and kanban board for cards, claims, runs, and handoffs',
  ],
  [
    'CN',
    'canary',
    'agent-facing observability for errors, health probes, and incident context',
  ],
  [
    'LM',
    'landmark',
    'release intelligence from commits to changelogs, notes, plans, and evidence',
  ],
];
const studio = `<section class="page studio"><div class="offer"><p class="kicker">Software consulting · agentic systems</p><h1>You know AI could help. We know where to start.</h1><p class="lede">We look at how your company actually runs, from operations to product to support, and show you where AI pays off. The conversation is free, and you leave with a plan either way.</p><button class="action">Let's talk</button></div>${statusPlate}</section>`;
const work = `<section class="page work"><header class="work-head"><div><p class="kicker">Selected work</p><h1>Factory systems.</h1></div><p>Operational software for agents and the people responsible for them.</p></header><div class="work-list">${projects.map(([mark, name, desc]) => `<a class="work-row" href="#0"><span class="work-mark">${mark}</span><b>${name}</b><span>${desc}</span></a>`).join('')}</div>${statusPlate}</section>`;
document.getElementById('mount').innerHTML =
  `<main class="site layout-${spec.layout} mode-${mode}" data-id="${spec.id}" style="${vars}"><header class="site-header"><a class="brand" href="#0">${brand}</a><nav class="view-nav"><button aria-current="page" data-view="studio">studio</button><button data-view="work">work</button></nav></header><div id="page">${studio}</div><footer class="site-footer"><span>${spec.title} · ${spec.statusNote}</span><span>GitHub · hello@mistystep.io · privacy</span></footer></main><style>${spec.css || ''}</style><style>.site{width:100%!important;height:100%!important;max-width:100vw!important;max-height:100vh!important;overflow:hidden!important;grid-template-rows:auto minmax(0,1fr) auto!important}.site-header,.site-footer{max-width:100%!important}.site #page{min-width:0!important;min-height:0!important;max-width:100%!important;max-height:100%!important;overflow:hidden!important}.site .page{width:100%!important;height:100%!important;min-width:0!important;min-height:0!important;max-width:100%!important;max-height:100%!important;margin:0!important;overflow:hidden!important}.site .offer,.site .work,.site .work-list{min-width:0!important;min-height:0!important;max-width:100%!important;max-height:100%!important}.site .work-row>*{min-width:0!important}.site .status-plate{max-width:100%!important}@media(max-width:620px){.site .studio{grid-template-columns:1fr!important}.site .studio:before{display:none!important}.site .offer{padding:1rem!important}.site .status-plate{display:grid!important;grid-template-columns:repeat(2,minmax(0,1fr))!important;overflow:visible!important}.site .status-item{min-width:0!important;padding:.35rem!important}.site .status-item:last-child{grid-column:1/-1!important}}</style>`;
document
  .querySelectorAll('a[href="#0"]')
  .forEach((a) => a.addEventListener('click', (e) => e.preventDefault()));
document.querySelectorAll('[data-view]').forEach((button) =>
  button.addEventListener('click', () => {
    document
      .querySelectorAll('[data-view]')
      .forEach((b) => b.removeAttribute('aria-current'));
    button.setAttribute('aria-current', 'page');
    document.querySelector('#page').innerHTML =
      button.dataset.view === 'studio' ? studio : work;
  }),
);
window.__LAB_READY__ = {
  id: spec.id,
  mode,
  pages: 2,
  statuses: 5,
  projects: 5,
  statusStyle: spec.statusStyle,
};
