// The demo pages' own script, as a consumer writes it: the package runtime (theme) and spine (components) by their
// public specifiers, plus what a site adds itself: copy buttons, its form checks and toasts. The static pages map
// the specifiers to identity/ with an import map that demo/build.mjs writes from the package's exports; the brand lab
// resolves them through its installed copy of the package. The page sends nothing.
import { startBrand } from '@misty-step/brand/runtime';
import { setInvalid, toast, wire } from '@misty-step/brand/spine';

startBrand();
wire();

const html = document.documentElement;
const tray = document.querySelector('[data-tray]');

async function copy(text) {
  try {
    await navigator.clipboard.writeText(text);
    toast(tray, 'Copied.', 'ok');
  } catch {
    toast(tray, 'Copying was refused. Select the text and copy it instead.', 'err');
  }
}

document.addEventListener('click', event => {
  const target = event.target.closest('[data-copy], [data-toast], [data-theme-choice]');
  if (!target) return;
  if (target.hasAttribute('data-copy')) void copy(target.dataset.copy);
  else if (target.hasAttribute('data-toast')) toast(tray, target.dataset.toast, 'ok');
  else html.setAttribute('data-theme', target.dataset.themeChoice);
});

// The Theme setting follows the page's theme, whichever control changed it.
const themeValue = document.querySelector('[data-theme-value]');
const showTheme = () => {
  const dark = (html.getAttribute('data-theme') ?? (matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light')) === 'dark';
  for (const choice of document.querySelectorAll('[data-theme-choice]')) choice.setAttribute('aria-checked', String((choice.dataset.themeChoice === 'dark') === dark));
  if (themeValue) themeValue.textContent = dark ? 'Dark' : 'Light';
};
new MutationObserver(showTheme).observe(html, { attributes: true, attributeFilter: ['data-theme'] });
matchMedia('(prefers-color-scheme: dark)').addEventListener('change', showTheme);
showTheme();

const request = document.querySelector('[data-request]');
if (request) {
  const email = request.elements.namedItem('email');
  email.addEventListener('input', () => {
    if (email.getAttribute('aria-invalid') === 'true') setInvalid(email, null);
  });
  request.addEventListener('submit', event => {
    event.preventDefault();
    const valid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value.trim());
    setInvalid(email, valid ? null : 'Enter your email address, such as you@company.com.');
    if (!valid) return email.focus();
    toast(tray, 'Ready to send. This demo page sends nothing.', 'ok');
  });
  document.getElementById('start-over').addEventListener('close', event => {
    if (event.target.returnValue !== 'clear') return;
    request.reset();
    setInvalid(email, null);
  });
}

const find = document.querySelector('[data-find]');
if (find) {
  const query = find.elements.namedItem('query');
  find.addEventListener('submit', event => {
    event.preventDefault();
    const empty = query.value.trim() === '';
    setInvalid(query, empty ? 'Describe the task in a few words.' : null);
    if (empty) return query.focus();
    toast(tray, 'The demo shows one fixed ranking.', 'ok');
  });
}
