const lanes = [
  {
    id: 'A',
    href: 'a.html',
    title: 'Theme mapping',
    family: 'stock shadcn, identity in CSS variables',
    note: 'Zero component ownership; one dialog-overlay edit.',
  },
  {
    id: 'B',
    href: 'b.html',
    title: 'Registry reskin',
    family: 'owned components, aesthetic idiom in the code',
    note: 'Ink buttons, .ae-nav tabs, panel dialog — copy-paste ownership.',
  },
  {
    id: 'C',
    href: 'c.html',
    title: 'aesthetic.css native',
    family: 'the shipped CSS + Base UI behavior, no Tailwind',
    note: 'recipes.js replaced by Base UI; glue.css is the countable cost.',
  },
  {
    id: 'D',
    href: 'd.html',
    title: 'Floating-surface hybrid',
    family: 'aesthetic.css pages, stock shadcn floats',
    note: 'The path for existing consumers; one toggle drives both systems.',
  },
  {
    id: 'E',
    href: null,
    title: 'Registry distribution',
    family: 'strategy card — ships via our own shadcn registry',
    note: 'See ADOPTION.md and backlog 019.',
  },
];

const registry = document.querySelector('#registry');
const preview = document.querySelector('#preview');
const shell = document.querySelector('#shell');
const docNote = document.querySelector('#doc-note');
const laneNote = document.querySelector('#lane-note');
const sizes = document.querySelector('#sizes');
let selected = localStorage.getItem('lab006:lane') || 'A';
let size = localStorage.getItem('lab006:size') || 'fit';

for (const lane of lanes) {
  const b = document.createElement('button');
  b.className = 'option';
  b.dataset.id = lane.id;
  b.innerHTML = `<code>${lane.id}</code><b>${lane.title}</b><small>${lane.family}</small>`;
  b.onclick = () => select(lane.id);
  registry.append(b);
}

function select(id) {
  const lane = lanes.find((l) => l.id === id) || lanes[0];
  selected = lane.id;
  localStorage.setItem('lab006:lane', selected);
  document
    .querySelectorAll('.option')
    .forEach((b) => b.classList.toggle('active', b.dataset.id === selected));
  laneNote.textContent = lane.note;
  const rendered = Boolean(lane.href);
  shell.hidden = !rendered;
  docNote.hidden = rendered;
  if (rendered) preview.src = lane.href;
  resize();
}

function resize() {
  document
    .querySelectorAll('#sizes button')
    .forEach((b) => b.classList.toggle('active', b.dataset.size === size));
  const well = document.querySelector('.well').getBoundingClientRect();
  if (size === 'fit') {
    shell.style.width = `${well.width - 32}px`;
    shell.style.height = `${well.height - 32}px`;
    preview.style.transform = 'none';
    preview.style.width = '100%';
    preview.style.height = '100%';
    return;
  }
  const [w, h] = size.split('x').map(Number);
  const scale = Math.min((well.width - 32) / w, (well.height - 32) / h, 1);
  shell.style.width = `${w * scale}px`;
  shell.style.height = `${h * scale}px`;
  preview.style.width = `${w}px`;
  preview.style.height = `${h}px`;
  preview.style.transform = `scale(${scale})`;
  preview.style.transformOrigin = 'top left';
}

sizes.addEventListener('click', (e) => {
  const b = e.target.closest('button');
  if (!b) return;
  size = b.dataset.size;
  localStorage.setItem('lab006:size', size);
  resize();
});
window.addEventListener('resize', resize);

document.addEventListener('keydown', (e) => {
  if (!['ArrowUp', 'ArrowDown'].includes(e.key)) return;
  const i = lanes.findIndex((l) => l.id === selected);
  const d = e.key === 'ArrowDown' ? 1 : -1;
  select(lanes[(i + d + lanes.length) % lanes.length].id);
});

select(selected);
