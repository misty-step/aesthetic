import { startBrand } from './brand/identity/runtime.js';
import { toast, wire } from './brand/identity/spine.js';

startBrand();
wire();

const tray = document.querySelector('[data-toasts]');

document.addEventListener('click', async (event) => {
  const button = event.target.closest('[data-copy]');
  if (!button) return;
  const code = button.closest('.sp-command').querySelector('code');
  try {
    await navigator.clipboard.writeText(code.textContent);
    toast(tray, `Copied ${code.textContent}`, 'ok');
  } catch (error) {
    toast(tray, `Could not copy ${code.textContent}: ${error.message}`, 'err');
  }
});
