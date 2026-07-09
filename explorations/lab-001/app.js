import { SPECS as baselineSpecs } from './lanes/baseline.js';
import { SPECS as tasteSpecs } from './lanes/taste.js';
import { SPECS as minimalSpecs } from './lanes/minimal.js';
import { SPECS as brutalSpecs } from './lanes/brutal.js';
import { SPECS as anthropicSpecs } from './lanes/anthropic.js';

const laneNames = {
  BASE: 'shipped baseline',
  TASTE: 'leon taste',
  MIN: 'leon minimalist',
  BRUT: 'leon brutalist',
  ANTH: 'anthropic frontend',
};
const allOptions = Object.values({
  ...baselineSpecs,
  ...tasteSpecs,
  ...minimalSpecs,
  ...brutalSpecs,
  ...anthropicSpecs,
});
const retainedIds = new Set([
  'BASE-1',
  'TASTE-2',
  'MIN-2',
  'BRUT-2',
  'ANTH-1',
  'ANTH-2',
]);
const options = allOptions.filter((option) => retainedIds.has(option.id));
const state = {
  index: Math.max(
    0,
    Math.min(
      options.length - 1,
      Number(localStorage.getItem('ae-nav-lab-index') || 0),
    ),
  ),
  app:
    localStorage.getItem('ae-nav-lab-app') === 'powder' ? 'powder' : 'crucible',
  mode: localStorage.getItem('ae-nav-lab-mode') === 'dark' ? 'dark' : 'light',
  viewport: localStorage.getItem('ae-nav-lab-viewport') || '390x844',
};
const registry = document.querySelector('#registry');
const frame = document.querySelector('#viewport-frame');
const screen = document.querySelector('#screen');
const stage = document.querySelector('.lab-stage');
const readout = document.querySelector('#readout');
const viewport = document.querySelector('#viewport');
const widthInput = document.querySelector('#width');
const heightInput = document.querySelector('#height');

for (const [index, option] of options.entries()) {
  const prefix = option.id.split('-')[0];
  const li = document.createElement('li');
  li.className = 'lab-option';
  li.innerHTML = `<button type="button" data-index="${index}"><span class="lab-option-id">${option.id}</span><span class="lab-option-copy"><span class="lab-option-title">${option.title}</span><span class="lab-option-move">${option.move}</span><span class="lab-badge">${laneNames[prefix] || prefix}</span></span></button>`;
  registry.append(li);
}

function dimensions() {
  if (state.viewport === 'fit')
    return {
      width: Math.max(320, stage.clientWidth - 24),
      height: Math.max(320, stage.clientHeight - 24),
      fit: true,
    };
  const [width, height] = state.viewport.split('x').map(Number);
  return { width: width || 390, height: height || 844, fit: false };
}

function sizeFrame() {
  const target = dimensions();
  const availableWidth = Math.max(1, stage.clientWidth - 24);
  const availableHeight = Math.max(1, stage.clientHeight - 24);
  const scale = target.fit
    ? 1
    : Math.min(
        1,
        availableWidth / target.width,
        availableHeight / target.height,
      );
  frame.style.width = `${target.width}px`;
  frame.style.height = `${target.height}px`;
  frame.style.transform = `scale(${scale})`;
  readout.textContent = `${target.width}×${target.height} · ${Math.round(scale * 100)}%`;
  widthInput.value = target.width;
  heightInput.value = target.height;
}

function render() {
  const option = options[state.index];
  document
    .querySelectorAll('.lab-option button')
    .forEach((button, index) =>
      button.setAttribute('aria-current', String(index === state.index)),
    );
  document
    .querySelectorAll('[data-app]')
    .forEach((button) =>
      button.setAttribute(
        'aria-pressed',
        String(button.dataset.app === state.app),
      ),
    );
  document.querySelector('#mode').textContent = `mode: ${state.mode}`;
  viewport.value = [...viewport.options].some(
    (option) => option.value === state.viewport,
  )
    ? state.viewport
    : 'fit';
  screen.src = `frame.html?id=${encodeURIComponent(option.id)}&app=${state.app}&mode=${state.mode}&v=2`;
  localStorage.setItem('ae-nav-lab-index', state.index);
  localStorage.setItem('ae-nav-lab-app', state.app);
  localStorage.setItem('ae-nav-lab-mode', state.mode);
  localStorage.setItem('ae-nav-lab-viewport', state.viewport);
  sizeFrame();
}

registry.addEventListener('click', (event) => {
  const button = event.target.closest('[data-index]');
  if (!button) return;
  state.index = Number(button.dataset.index);
  render();
});
document.querySelector('.lab-segment').addEventListener('click', (event) => {
  const button = event.target.closest('[data-app]');
  if (!button) return;
  state.app = button.dataset.app;
  render();
});
document.querySelector('#mode').addEventListener('click', () => {
  state.mode = state.mode === 'light' ? 'dark' : 'light';
  render();
});
viewport.addEventListener('change', () => {
  state.viewport = viewport.value;
  render();
});
function customSize() {
  const width = Math.max(320, Number(widthInput.value));
  const height = Math.max(320, Number(heightInput.value));
  if (width && height) {
    state.viewport = `${width}x${height}`;
    render();
  }
}
widthInput.addEventListener('change', customSize);
heightInput.addEventListener('change', customSize);
window.addEventListener('resize', sizeFrame);
window.addEventListener('keydown', (event) => {
  if (['INPUT', 'SELECT'].includes(event.target.tagName)) return;
  if (event.key === 'ArrowRight' || event.key === 'ArrowDown') {
    state.index = (state.index + 1) % options.length;
    render();
  }
  if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') {
    state.index = (state.index - 1 + options.length) % options.length;
    render();
  }
});
window.__LAB_OPTIONS__ = options.map(({ id, title, move }) => ({
  id,
  title,
  move,
}));
render();
