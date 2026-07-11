import { SPECS as baseline } from './lanes/baseline.js';
import minimal from './lanes/minimal.js';
import taste from './lanes/taste.js';
import redesign from './lanes/redesign.js';
import anthropic from './lanes/anthropic.js';
import hallmark from './lanes/hallmark.js';
import impeccable from './lanes/impeccable.js';
import { RETAINED_IDS } from './retention.js';
const rawSpecs = [
  ...Object.values(baseline),
  ...minimal,
  ...taste,
  ...redesign,
  ...anthropic,
  ...hallmark,
  ...impeccable,
];
const specs = [
  rawSpecs[0],
  ...rawSpecs.filter((spec) => RETAINED_IDS.includes(spec.id)),
];
const registry = document.querySelector('#registry'),
  preview = document.querySelector('#preview'),
  shell = document.querySelector('#viewport-shell'),
  viewport = document.querySelector('#viewport'),
  modeButton = document.querySelector('#mode');
let selected = localStorage.getItem('lab004:selected') || 'BASE-1',
  mode = localStorage.getItem('lab004:mode') || 'light';
for (const family of [...new Set(specs.map((s) => s.family))]) {
  const label = document.createElement('div');
  label.className = 'family-label';
  label.textContent = family;
  registry.append(label);
  for (const spec of specs.filter((s) => s.family === family)) {
    const b = document.createElement('button');
    b.className = 'option';
    b.dataset.id = spec.id;
    b.innerHTML = `<code>${spec.id}</code><span><b>${spec.title}</b><span>${spec.essence}</span></span>`;
    b.onclick = () => select(spec.id);
    registry.append(b);
  }
}
function select(id) {
  selected = specs.some((s) => s.id === id) ? id : 'BASE-1';
  localStorage.setItem('lab004:selected', selected);
  document
    .querySelectorAll('.option')
    .forEach((b) => b.classList.toggle('active', b.dataset.id === selected));
  const spec = specs.find((s) => s.id === selected);
  preview.src = `frame.html?id=${encodeURIComponent(selected)}&mode=${mode}&v=4`;
  document.querySelector('#caption-title').textContent =
    `${spec.id} · ${spec.title}`;
  document.querySelector('#caption-meta').textContent =
    `${spec.family} · ${spec.layout} / ${spec.componentLayout}`;
  document.querySelector('#caption-copy').textContent = spec.move;
}
function resize() {
  if (viewport.value === 'fit') {
    shell.style.width = '100%';
    shell.style.height = '100%';
  } else {
    const [w, h] = viewport.value.split('x');
    const stage = document.querySelector('.stage').getBoundingClientRect(),
      scale = Math.min((stage.width - 32) / w, (stage.height - 86) / h, 1);
    shell.style.width = `${w * scale}px`;
    shell.style.height = `${h * scale}px`;
    preview.style.width = `${w}px`;
    preview.style.height = `${h}px`;
    preview.style.transform = `scale(${scale})`;
    preview.style.transformOrigin = 'top left';
    return;
  }
  preview.style.width = '100%';
  preview.style.height = '100%';
  preview.style.transform = 'none';
}
viewport.onchange = resize;
window.onresize = resize;
modeButton.onclick = () => {
  mode = mode === 'light' ? 'dark' : 'light';
  localStorage.setItem('lab004:mode', mode);
  modeButton.textContent = mode === 'light' ? 'Dark' : 'Light';
  select(selected);
};
document.addEventListener('keydown', (e) => {
  if (!['ArrowDown', 'ArrowUp'].includes(e.key)) return;
  const i = specs.findIndex((s) => s.id === selected),
    d = e.key === 'ArrowDown' ? 1 : -1;
  select(specs[(i + d + specs.length) % specs.length].id);
  document
    .querySelector('.option.active')
    ?.scrollIntoView({ block: 'nearest' });
});
modeButton.textContent = mode === 'light' ? 'Dark' : 'Light';
select(selected);
resize();
window.__LAB_REGISTRY__ = {
  count: specs.length,
  baseline: 1,
  raw: rawSpecs.length - 1,
  retained: specs.length - 1,
  lanes: 6,
  ids: specs.map((s) => s.id),
};
