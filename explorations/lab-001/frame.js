import {
  CSS as baselineCSS,
  SPECS as baselineSpecs,
} from './lanes/baseline.js';
import { CSS as tasteCSS, SPECS as tasteSpecs } from './lanes/taste.js';
import { CSS as minimalCSS, SPECS as minimalSpecs } from './lanes/minimal.js';
import { CSS as brutalCSS, SPECS as brutalSpecs } from './lanes/brutal.js';
import {
  CSS as anthropicCSS,
  SPECS as anthropicSpecs,
} from './lanes/anthropic.js';

const SPECS = {
  ...baselineSpecs,
  ...tasteSpecs,
  ...minimalSpecs,
  ...brutalSpecs,
  ...anthropicSpecs,
};
const params = new URLSearchParams(location.search);
const id = params.get('id') || 'BASE-1';
const app = params.get('app') === 'powder' ? 'powder' : 'crucible';
const mode = params.get('mode') === 'dark' ? 'dark' : 'light';
document.documentElement.classList.toggle('dark', mode === 'dark');
document.documentElement.style.colorScheme = mode;

const iconPaths = {
  grid: '<rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/>',
  receipt:
    '<path d="M6 3h12v18l-3-2-3 2-3-2-3 2V3Z"/><path d="M9 8h6M9 12h6"/>',
  settings:
    '<path d="M12 15.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7Z"/><path d="M19.4 15a1.7 1.7 0 0 0 .3 1.9l.1.1-2.8 2.8-.1-.1a1.7 1.7 0 0 0-1.9-.3 1.7 1.7 0 0 0-1 1.6v.2h-4V21a1.7 1.7 0 0 0-1-1.6 1.7 1.7 0 0 0-1.9.3l-.1.1L4.2 17l.1-.1a1.7 1.7 0 0 0 .3-1.9A1.7 1.7 0 0 0 3 14H2.8v-4H3a1.7 1.7 0 0 0 1.6-1 1.7 1.7 0 0 0-.3-1.9L4.2 7 7 4.2l.1.1a1.7 1.7 0 0 0 1.9.3A1.7 1.7 0 0 0 10 3V2.8h4V3a1.7 1.7 0 0 0 1 1.6 1.7 1.7 0 0 0 1.9-.3l.1-.1L19.8 7l-.1.1a1.7 1.7 0 0 0-.3 1.9A1.7 1.7 0 0 0 21 10h.2v4H21a1.7 1.7 0 0 0-1.6 1Z"/>',
  search: '<circle cx="11" cy="11" r="7"/><path d="m20 20-4-4"/>',
  chevron: '<path d="m9 18 6-6-6-6"/>',
  check: '<circle cx="12" cy="12" r="9"/><path d="m8 12 3 3 5-6"/>',
  alert: '<path d="M12 3 2 21h20L12 3Z"/><path d="M12 9v5M12 18h.01"/>',
};

function icon(name) {
  return `<svg class="lab-icon" viewBox="0 0 24 24" aria-hidden="true">${iconPaths[name] || iconPaths.chevron}</svg>`;
}
function brand() {
  const isCrucible = app === 'crucible';
  const mark = isCrucible
    ? '<path d="M14 2v6a2 2 0 0 0 .245.96l5.51 10.08A2 2 0 0 1 18 22H6a2 2 0 0 1-1.755-2.96l5.51-10.08A2 2 0 0 0 10 8V2"/><path d="M6.453 15h11.094"/><path d="M8.5 2h7"/>'
    : '<path d="m10 20-1.25-2.5L6 18"/><path d="M10 4 8.75 6.5 6 6"/><path d="m14 20 1.25-2.5L18 18"/><path d="m14 4 1.25 2.5L18 6"/><path d="m17 21-3-6h-4"/><path d="m17 3-3 6 1.5 3"/><path d="M2 12h6.5L10 9"/><path d="m20 10-1.5 2 1.5 2"/><path d="M22 12h-6.5L14 15"/><path d="m4 10 1.5 2L4 14"/><path d="m7 21 3-6-1.5-3"/><path d="m7 3 3 6h4"/>';
  const iconName = isCrucible ? 'flask-conical' : 'snowflake';
  const name = isCrucible ? 'CRUCIBLE' : 'POWDER';
  return `<a href="#0" class="ae-logo lab-brand" aria-label="${name} home"><span class="ae-app-mark" aria-hidden="true"><svg class="ae-icon" data-lucide="${iconName}" viewBox="0 0 24 24">${mark}</svg></span><span class="ae-name">${name}</span></a>`;
}
function command() {
  return `<button class="lab-command-trigger js-command" type="button">${icon('search')} Command <kbd>⌘K</kbd></button>`;
}

function crucibleContent() {
  return `<section class="lab-app-content" aria-label="Crucible eval content">
    <header class="lab-view-head"><div><p class="ae-chrome">EVAL / PROMPT BENCHMARK</p><h1 class="ae-strong">commit-message-quality-v1</h1><p class="ae-dim">Which model reads a diff well enough to choose the right Conventional Commits type?</p></div><span class="ae-tag">validated</span></header>
    <div class="lab-stats"><div class="lab-stat"><span class="ae-chrome">MEASURED TASKS</span><b>24</b></div><div class="lab-stat"><span class="ae-chrome">STORED RUNS</span><b>3</b></div><div class="lab-stat"><span class="ae-chrome">BEST SCORE</span><b>24 / 24</b></div></div>
    <div class="lab-table-wrap"><table class="ae-table"><thead><tr><th>model</th><th>passed</th><th>score</th><th>95% Wilson</th><th>status</th></tr></thead><tbody>
      <tr><td class="ae-item">z-ai/glm-5.2</td><td>24 / 24</td><td>1.000</td><td>0.862–1.000</td><td>${icon('check')} trusted</td></tr>
      <tr><td class="ae-item">deepseek/deepseek-v4-flash</td><td>21 / 24</td><td>0.875</td><td>0.690–0.957</td><td>${icon('check')} trusted</td></tr>
      <tr><td class="ae-item">qwen/qwen3-max</td><td>19 / 24</td><td>0.792</td><td>0.595–0.908</td><td>${icon('alert')} inspect</td></tr>
    </tbody></table></div><p class="ae-chrome">Snapshot: runs/local/commit-msg-v1/final.sqlite · current spec now declares 30 tasks.</p>
  </section>`;
}

function powderContent() {
  return `<section class="lab-app-content" aria-label="Powder board content">
    <header class="lab-view-head"><div><p class="ae-chrome">REPOSITORY / AESTHETIC</p><h1 class="ae-strong">Design-system queue</h1><p class="ae-dim">Current cards from the Powder ledger, 2026-07-09.</p></div><span class="ae-tag">44 cards</span></header>
    <div class="lab-board">
      <section class="lab-column"><h2 class="ae-h">RUNNING · 2</h2><article class="lab-card"><p class="ae-item">aesthetic-sidebar-design-lab</p><p class="ae-dim">Fleet navigation/sidebar design lab</p></article><article class="lab-card"><p class="ae-item">aesthetic-015</p><p class="ae-dim">Ship the law as a consumer-enforceable contract</p></article></section>
      <section class="lab-column"><h2 class="ae-h">READY · 8</h2><article class="lab-card"><p class="ae-item">aesthetic-926</p><p class="ae-dim">Shared generative-UI report system</p></article><article class="lab-card"><p class="ae-item">aesthetic-975</p><p class="ae-dim">Make text selection visible inside code blocks</p></article><article class="lab-card"><p class="ae-item">aesthetic-976</p><p class="ae-dim">Brand as a first-class kit citizen</p></article></section>
      <section class="lab-column"><h2 class="ae-h">BACKLOG · 15</h2><article class="lab-card"><p class="ae-item">aesthetic-017</p><p class="ae-dim">Rebuild the site as a per-primitive gallery</p></article><article class="lab-card"><p class="ae-item">aesthetic-020</p><p class="ae-dim">Name the motion vocabulary</p></article></section>
    </div>
  </section>`;
}

const ctx = {
  app,
  brand,
  content: () => (app === 'crucible' ? crucibleContent() : powderContent()),
  icon,
  command,
};
const spec = SPECS[id] || SPECS['BASE-1'];
const style = document.createElement('style');
style.textContent = [
  baselineCSS,
  tasteCSS,
  minimalCSS,
  brutalCSS,
  anthropicCSS,
].join('\n');
document.head.append(style);
document.querySelector('#mount').innerHTML =
  spec.render(ctx) +
  `<div class="lab-command" hidden><div class="lab-command-box" role="dialog" aria-modal="true" aria-label="Command menu"><input aria-label="Find a place or object" placeholder="Find a place or object"/><div class="lab-command-item"><span>${app === 'crucible' ? 'Open evals' : 'Open ready queue'}</span><kbd>↵</kbd></div><div class="lab-command-item"><span>${app === 'crucible' ? 'Open receipts' : 'Open active runs'}</span><kbd>R</kbd></div><div class="lab-command-item"><span>Close</span><kbd>Esc</kbd></div></div></div>`;

const palette = document.querySelector('.lab-command');
function setPalette(open) {
  palette.hidden = !open;
  if (open) palette.querySelector('input')?.focus();
}
document.addEventListener('click', (event) => {
  if (event.target.closest('.js-command')) setPalette(true);
  if (event.target === palette) setPalette(false);
});
document.addEventListener('keydown', (event) => {
  if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') {
    event.preventDefault();
    setPalette(true);
  }
  if (event.key === 'Escape') setPalette(false);
});
document
  .querySelectorAll('a[href^="#"]')
  .forEach((link) =>
    link.addEventListener('click', (event) => event.preventDefault()),
  );
window.__LAB_READY__ = {
  id: spec.id,
  app,
  optionCount: Object.keys(SPECS).length,
};
