import { SPECS as baseline } from './lanes/baseline.js';
import { SPECS as minimal } from './lanes/minimal.js';
import { SPECS as impeccable } from './lanes/impeccable.js';
import { SPECS as taste } from './lanes/taste.js';
import { SPECS as anthropic } from './lanes/anthropic.js';
import { SPECS as soft } from './lanes/soft.js';
import { SPECS as hallmark } from './lanes/hallmark.js';

const SPECS = {
  ...baseline,
  ...minimal,
  ...impeccable,
  ...taste,
  ...anthropic,
  ...soft,
  ...hallmark,
};
const params = new URLSearchParams(location.search);
const id = params.get('id') || 'BASE-1';
const mode = params.get('mode') === 'dark' ? 'dark' : 'light';
const spec = SPECS[id] || SPECS['BASE-1'];
const gallery = document.querySelector('#gallery');

document.documentElement.classList.toggle('dark', mode === 'dark');
document.documentElement.style.colorScheme = mode;
document.querySelector('#frame-id').textContent = spec.id;
document.querySelector('#frame-title').textContent = spec.title;
document.querySelector('#frame-thesis').textContent = spec.thesis;

document.querySelector('#frame-info').addEventListener('click', (event) => {
  const open = event.currentTarget.getAttribute('aria-expanded') === 'true';
  event.currentTarget.setAttribute('aria-expanded', String(!open));
  document.querySelector('#frame-thesis').textContent = open
    ? spec.thesis
    : `${spec.move} ${spec.thesis}`;
});

gallery.addEventListener('load', () => {
  const doc = gallery.contentDocument;
  const win = gallery.contentWindow;
  if (!doc || !win) return;
  doc.documentElement.classList.remove('light', 'dark');
  doc.documentElement.classList.add(mode);
  doc.documentElement.style.colorScheme = mode;
  doc.documentElement.dataset.labOption = spec.id;
  const style = doc.createElement('style');
  style.dataset.labOption = spec.id;
  style.textContent = spec.css || '';
  doc.head.append(style);
  if (typeof spec.apply === 'function') spec.apply(doc);
  const cards = doc.querySelectorAll('.gal-card[href^="#"]');
  const routes = doc.querySelectorAll('.ae-view[data-route]');
  window.__LAB_READY__ = {
    ready: true,
    id: spec.id,
    mode,
    cards: cards.length,
    routes: routes.length,
    galleryPath: 'site/primitives.html',
  };
});

gallery.src = `../../site/primitives.html?lab=${encodeURIComponent(spec.id)}&v=1`;
