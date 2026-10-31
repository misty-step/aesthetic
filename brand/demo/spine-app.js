// The spine demo page's own script, on the package's spine module alone: wire() runs the components, and this page
// adds what a site adds, its form check, its theme setting and its copy actions. demo/app.js (loaded first) owns
// the theme toggle and starts the runtime. The page sends nothing.
import { setInvalid, toast, wire } from '/identity/spine.js';

wire();
const html = document.documentElement;
const tray = document.querySelector('[data-tray]');
const form = document.querySelector('[data-request]');
const email = form.elements.namedItem('email');

form.addEventListener('input', event => {
  if (event.target === email && email.getAttribute('aria-invalid') === 'true') setInvalid(email, null);
});
form.addEventListener('submit', event => {
  event.preventDefault();
  const valid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value.trim());
  setInvalid(email, valid ? null : 'Enter your email address, such as you@company.com.');
  if (!valid) return email.focus();
  toast(tray, 'Ready to send. This demo page sends nothing.', 'ok');
});
document.getElementById('start-over').addEventListener('close', event => {
  if (event.target.returnValue !== 'clear') return;
  form.reset();
  setInvalid(email, null);
});

// The Theme setting follows data-theme, whichever control changed it.
const value = document.querySelector('[data-theme-value]');
const choices = [...document.querySelectorAll('[data-theme-choice]')];
const showTheme = () => {
  const theme = html.getAttribute('data-theme') === 'dark' ? 'dark' : 'light';
  for (const choice of choices) choice.setAttribute('aria-checked', String(choice.dataset.themeChoice === theme));
  value.textContent = choices.find(choice => choice.dataset.themeChoice === theme).textContent;
};
new MutationObserver(showTheme).observe(html, { attributes: true, attributeFilter: ['data-theme'] });
showTheme();

async function copy(text, done) {
  try {
    await navigator.clipboard.writeText(text);
    toast(tray, done, 'ok');
  } catch {
    toast(tray, 'Copying was refused. Select the text and copy it instead.', 'err');
  }
}
document.addEventListener('click', event => {
  const target = event.target.closest('[data-theme-choice], [data-copy-code], [data-copy-link]');
  if (!target) return;
  if (target.dataset.themeChoice) html.setAttribute('data-theme', target.dataset.themeChoice);
  else if (target.hasAttribute('data-copy-code')) {
    const panel = target.closest('section').querySelector('[role="tabpanel"]:not([hidden])');
    void copy(panel.querySelector('code').textContent, `Copied the ${document.getElementById(panel.getAttribute('aria-labelledby')).textContent} commands.`);
  } else void copy(new URL(target.dataset.copyLink, location.href).href, 'Copied the link.');
});
