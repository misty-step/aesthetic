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
  ],
  retainedIds = ['CARRY-QR', 'CARRY-CF', 'PGM-1', 'PGA-1', 'PGR-1', 'PGI-1'],
  specs = allSpecs.filter((item) => retainedIds.includes(item.id)),
  registry = document.querySelector('#registry'),
  preview = document.querySelector('#preview'),
  shell = document.querySelector('#viewport-shell'),
  viewport = document.querySelector('#viewport'),
  modeButton = document.querySelector('#mode');
let selected = localStorage.getItem('lab005:selected') || 'CARRY-QR',
  mode = localStorage.getItem('lab005:mode') || 'light';
for (const spec of specs) {
  const b = document.createElement('button');
  b.className = 'option';
  b.dataset.id = spec.id;
  b.innerHTML = `<code>${spec.id}</code><span><b>${spec.title}</b><span>${spec.family}</span></span>`;
  b.onclick = () => select(spec.id);
  registry.append(b);
}
function select(id) {
  selected = specs.some((s) => s.id === id) ? id : specs[0].id;
  localStorage.setItem('lab005:selected', selected);
  document
    .querySelectorAll('.option')
    .forEach((b) => b.classList.toggle('active', b.dataset.id === selected));
  const spec = specs.find((s) => s.id === selected);
  preview.src = `frame.html?id=${selected}&mode=${mode}&v=5`;
  document.querySelector('#title').textContent = `${spec.id} · ${spec.title}`;
  document.querySelector('#note').textContent = spec.statusNote;
}
function resize() {
  if (viewport.value === 'fit') {
    shell.style.width = '100%';
    shell.style.height = '100%';
    preview.style.transform = 'none';
    preview.style.width = '100%';
    preview.style.height = '100%';
    return;
  }
  const [w, h] = viewport.value.split('x').map(Number),
    stage = document.querySelector('.stage').getBoundingClientRect(),
    scale = Math.min((stage.width - 30) / w, (stage.height - 54) / h, 1);
  shell.style.width = `${w * scale}px`;
  shell.style.height = `${h * scale}px`;
  preview.style.width = `${w}px`;
  preview.style.height = `${h}px`;
  preview.style.transform = `scale(${scale})`;
  preview.style.transformOrigin = 'top left';
}
viewport.onchange = resize;
window.onresize = resize;
modeButton.onclick = () => {
  mode = mode === 'light' ? 'dark' : 'light';
  localStorage.setItem('lab005:mode', mode);
  modeButton.textContent = mode === 'light' ? 'Dark' : 'Light';
  select(selected);
};
document.addEventListener('keydown', (e) => {
  if (!['ArrowUp', 'ArrowDown'].includes(e.key)) return;
  const i = specs.findIndex((s) => s.id === selected),
    d = e.key === 'ArrowDown' ? 1 : -1;
  select(specs[(i + d + specs.length) % specs.length].id);
});
modeButton.textContent = mode === 'light' ? 'Dark' : 'Light';
select(selected);
resize();
window.__LAB_REGISTRY__ = {
  count: specs.length,
  raw: allSpecs.length,
  ids: specs.map((s) => s.id),
  carried: 2,
  blind: 6,
};
