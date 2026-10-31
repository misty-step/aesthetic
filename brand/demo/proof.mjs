#!/usr/bin/env node
// Behaviour proof for the package on the demo pages: the field runs, pauses, follows the theme without a remount,
// stops offscreen and in hidden tabs, draws one still frame under reduced motion and Save-Data, keeps the pause
// control in the hero on phones, keeps the hero order without inline styles, and destroy() releases everything.
// On the spine page: the studio face's values, the focus ring, validation, the toast, the dialog, the menu, tabs,
// the settings row, motion paused and reduced, and both themes at 390 and 1440.
// Headless Chromium on a Linux worker only (no browser runs on a Mac). From the repository root, with the
// configurator's dependencies installed and the root served (python3 -m http.server 4190 --bind 127.0.0.1):
//   node demo/proof.mjs http://127.0.0.1:4190 proof.json
import { writeFile } from 'node:fs/promises';
import { createRequire } from 'node:module';
import { platform } from 'node:os';

if (platform() === 'darwin') {
  console.error('demo/proof.mjs drives a browser and refuses to run on macOS: run it on a Linux Boat worker.');
  process.exit(2);
}
const { chromium } = createRequire(new URL('../configurator/package.json', import.meta.url))('playwright');
const base = (process.argv[2] ?? 'http://127.0.0.1:4190').replace(/\/$/, '');
const out = process.argv[3] ?? 'proof.json';
const GL = ['--use-angle=swiftshader', '--enable-unsafe-swiftshader', '--ignore-gpu-blocklist'];
const results = [];
function check(name, pass, detail) {
  results.push({ name, pass: Boolean(pass), detail });
  console.log(`${pass ? 'PASS' : 'FAIL'} ${name}${detail === undefined ? '' : ` ${JSON.stringify(detail)}`}`);
}

// Counts requested animation frames: a stopped field requests none.
function countFrames() {
  const request = window.requestAnimationFrame.bind(window);
  window.__frames = 0;
  window.requestAnimationFrame = callback => {
    window.__frames++;
    return request(callback);
  };
}
async function open(browser, path, { width = 1440, height = 900, reduce = false, theme = 'light', init, permissions } = {}) {
  const context = await browser.newContext({ viewport: { width, height }, deviceScaleFactor: 1, colorScheme: theme, reducedMotion: reduce ? 'reduce' : 'no-preference', permissions });
  const page = await context.newPage();
  const errors = [];
  page.on('pageerror', error => errors.push(String(error)));
  page.on('console', message => { if (message.type() === 'error' || message.type() === 'warning') errors.push(message.text()); });
  await page.addInitScript(countFrames);
  if (init) await page.addInitScript(init);
  await page.goto(base + path, { waitUntil: 'load' });
  return { page, context, errors };
}
const drawn = page => page.waitForFunction(() => document.querySelector('.hero-motion-host canvas')?.style.opacity === '1', null, { timeout: 20000 });
async function framesIn(page, ms) {
  const before = await page.evaluate(() => window.__frames);
  await page.waitForTimeout(ms);
  return (await page.evaluate(() => window.__frames)) - before;
}
async function fieldClip(page) {
  const box = await page.locator('.hero-motion-host').boundingBox();
  return { x: box.x, y: box.y + box.height * 0.55, width: box.width, height: box.height * 0.45 };
}
async function changes(page, ms) {
  const clip = await fieldClip(page);
  const a = await page.screenshot({ clip });
  await page.waitForTimeout(ms);
  return Buffer.compare(a, await page.screenshot({ clip })) !== 0;
}
/**
 * Lightest and darkest channel value in the fog, sampled where no words or controls sit: between the hero
 * proof (left) and the pause control (right), below the actions.
 */
async function levels(page) {
  const box = await page.locator('.hero-motion-host').boundingBox();
  const clip = { x: box.x + box.width * 0.28, y: box.y + box.height * 0.62, width: box.width * 0.58, height: box.height * 0.3 };
  const png = await page.screenshot({ clip });
  return page.evaluate(async b64 => {
    const bitmap = await createImageBitmap(await (await fetch(`data:image/png;base64,${b64}`)).blob());
    const canvas = new OffscreenCanvas(bitmap.width, bitmap.height);
    const ctx = canvas.getContext('2d');
    ctx.drawImage(bitmap, 0, 0);
    const data = ctx.getImageData(0, 0, bitmap.width, bitmap.height).data;
    let min = 255, max = 0;
    for (let i = 0; i < data.length; i += 4) { min = Math.min(min, data[i]); max = Math.max(max, data[i]); }
    return { min, max };
  }, png.toString('base64'));
}
const toggleState = page => page.evaluate(() => {
  const button = document.querySelector('.motion-toggle');
  return { paused: document.documentElement.dataset.paused, pressed: button.getAttribute('aria-pressed'), text: button.textContent, hidden: button.hidden, stored: localStorage.getItem('brand-motion-paused'), parent: button.parentElement.className || button.parentElement.tagName };
});
/** Pause and resume from the keyboard; true when both presses toggle the state and focus never leaves the control. */
async function keyboardToggle(page) {
  await page.focus('.motion-toggle');
  const steps = [];
  for (const expected of ['1', '0']) {
    await page.keyboard.press('Enter');
    steps.push(await page.evaluate(want => document.documentElement.dataset.paused === want && document.activeElement === document.querySelector('.motion-toggle'), expected));
  }
  return steps.every(Boolean);
}

/** The spine on demo/dist/spine.html: the package's spine.css and spine.js alone, under the page's own script. */
async function spine(browser) {
  const path = '/demo/dist/spine.html';
  const opener = '[data-sp-dialog="#start-over"]';
  const isOpen = id => document.getElementById(id).matches('[open], :popover-open');
  const focusOn = (page, selector) => page.waitForFunction(sel => document.activeElement === document.querySelector(sel), selector, { timeout: 2000 }).then(() => true, () => false);
  const toastSays = (page, text) => page.waitForFunction(words => [...document.querySelectorAll('[data-tray] .sp-toast')].some(t => t.textContent.includes(words)), text, { timeout: 3000 }).then(() => true, () => false);
  {
    const { page, context, errors } = await open(browser, path, { permissions: ['clipboard-read', 'clipboard-write'] });
    const face = await page.evaluate(() => {
      const button = getComputedStyle(document.querySelector('[data-request] .sp-button')), tab = getComputedStyle(document.querySelector('.sp-tab'));
      return { height: button.minHeight, weight: button.fontWeight, radius: button.borderTopLeftRadius, tabWeight: tab.fontWeight, ok: getComputedStyle(document.body).getPropertyValue('--ok').trim() };
    });
    check('spine: the studio face resolves on the package (52px controls, weight 600, radius 4px, status inks)', face.height === '52px' && face.weight === '600' && face.radius === '4px' && face.tabWeight === '600' && face.ok !== '', face);
    await page.focus('#request-email');
    const ring = await page.evaluate(() => { const s = getComputedStyle(document.activeElement); return { style: s.outlineStyle, width: s.outlineWidth, offset: s.outlineOffset }; });
    check('spine: a focused field shows the face\'s 2px focus ring', ring.style === 'solid' && ring.width === '2px', ring);

    await page.click('[data-request] [type="submit"]');
    const invalid = await page.evaluate(() => {
      const input = document.getElementById('request-email'), note = document.getElementById('request-email-error');
      return { invalid: input.getAttribute('aria-invalid'), described: input.getAttribute('aria-describedby'), shown: !note.hidden, text: note.textContent, glyph: getComputedStyle(note.querySelector('.sp-icon')).color, words: getComputedStyle(note).color, focused: document.activeElement === input };
    });
    check('spine: a missing email is marked, described and focused, and its glyph carries the error ink', invalid.invalid === 'true' && invalid.described.includes('request-email-error') && invalid.shown && invalid.focused && invalid.glyph !== invalid.words, invalid);
    await page.fill('#request-email', 'phaedrus@mistystep.io');
    const cleared = await page.evaluate(() => ({ invalid: document.getElementById('request-email').getAttribute('aria-invalid'), hidden: document.getElementById('request-email-error').hidden }));
    check('spine: typing clears the error', cleared.invalid === null && cleared.hidden, cleared);

    const toasts = page.locator('[data-tray] .sp-toast');
    await page.click('[data-request] [type="submit"]');
    await toasts.first().waitFor();
    const sent = await toasts.first().evaluate(el => ({ role: el.getAttribute('role'), text: el.textContent.trim(), glyph: getComputedStyle(el.querySelector('.sp-ok')).color, words: getComputedStyle(el).color }));
    await page.waitForTimeout(4000);
    const stays = await toasts.count();
    await toasts.first().locator('.sp-close').click();
    const gone = await page.waitForFunction(() => !document.querySelector('[data-tray] .sp-toast'), null, { timeout: 3000 }).then(() => true, () => false);
    check('spine: a valid request shows a status toast that stays until dismissed', sent.role === 'status' && sent.glyph !== sent.words && stays === 1 && gone, { ...sent, stays, gone });

    await page.fill('#request-name', 'Phaedrus');
    await page.click(opener);
    await page.waitForFunction(isOpen, 'start-over');
    const inside = await page.evaluate(() => document.getElementById('start-over').contains(document.activeElement));
    for (let i = 0; i < 3; i++) await page.keyboard.press('Tab');
    const kept = await page.evaluate(() => document.getElementById('start-over').contains(document.activeElement));
    await page.keyboard.press('Escape');
    await page.waitForFunction(id => !document.getElementById(id).open, 'start-over');
    const returned = await focusOn(page, opener);
    const named = await page.evaluate(() => document.getElementById('start-over').getAttribute('aria-labelledby'));
    check('spine: the dialog takes focus, keeps Tab inside, closes on Escape and returns focus to its opener', inside && kept && returned && named === 'start-over-title', { inside, kept, returned, named });
    await page.click(opener);
    await page.click('#start-over [data-sp-close="clear"]');
    await page.waitForFunction(id => !document.getElementById(id).open, 'start-over');
    // The dialog's close event arrives as a task after close(); the page resets the form there.
    const emptied = await page.waitForFunction(() => document.getElementById('request-name').value === '' && document.getElementById('request-email').value === '', null, { timeout: 2000 }).then(() => true, () => false);
    const reset = await page.evaluate(() => ({ returnValue: document.getElementById('start-over').returnValue, name: document.getElementById('request-name').value, email: document.getElementById('request-email').value }));
    check('spine: Clear the form closes the dialog with its value and resets the form', emptied && reset.returnValue === 'clear', reset);

    const items = page.locator('#share .sp-menu-item');
    await page.click('[popovertarget="share"]');
    await page.waitForFunction(isOpen, 'share');
    const first = await focusOn(page, '#share .sp-menu-item');
    await page.keyboard.press('ArrowDown');
    const down = await items.nth(1).evaluate(el => el === document.activeElement);
    await page.keyboard.press('Home');
    const home = await items.nth(0).evaluate(el => el === document.activeElement);
    const expanded = await page.getAttribute('[popovertarget="share"]', 'aria-expanded');
    await page.keyboard.press('Escape');
    await page.waitForFunction(id => !document.getElementById(id).matches(':popover-open'), 'share');
    const back = await focusOn(page, '[popovertarget="share"]');
    check('spine: the menu opens on its first item, takes ArrowDown and Home, and Escape returns focus', first && down && home && expanded === 'true' && back, { first, down, home, expanded, back });
    await page.click('[popovertarget="share"]');
    await page.click('#share [data-copy-link="#install"]');
    const link = { toast: await toastSays(page, 'Copied the link.'), clipboard: await page.evaluate(() => navigator.clipboard.readText()), open: await page.evaluate(isOpen, 'share') };
    check('spine: a menu item acts, closes the menu and confirms in a toast', link.toast && link.clipboard.endsWith('/demo/dist/spine.html#install') && !link.open, link);

    const tabs = page.locator('.sp-tab');
    await tabs.nth(0).focus();
    await page.keyboard.press('ArrowRight');
    const right = await page.evaluate(() => { const tab = document.activeElement; return { name: tab.textContent, selected: tab.getAttribute('aria-selected'), panel: !document.getElementById(tab.getAttribute('aria-controls')).hidden, shown: document.querySelectorAll('.sp-tabpanel:not([hidden])').length }; });
    await page.keyboard.press('End');
    const end = await tabs.last().evaluate(el => el === document.activeElement && el.getAttribute('aria-selected') === 'true');
    await page.keyboard.press('Home');
    const start = await tabs.first().evaluate(el => el === document.activeElement && el.getAttribute('aria-selected') === 'true');
    check('spine: tabs follow ArrowRight, End and Home, and show only their own panel', right.selected === 'true' && right.panel && right.shown === 1 && end && start, { ...right, end, start });
    await page.click('[data-copy-code]');
    const copied = await toastSays(page, 'Copied the OMP commands.');
    const commands = await page.evaluate(() => navigator.clipboard.readText());
    check('spine: Copy commands copies the selected tab\'s commands and says so', copied && commands.startsWith('omp plugin marketplace add'), { copied, commands });
    for (const close of await page.locator('[data-tray] .sp-toast .sp-close').all()) await close.click();
    await page.waitForFunction(() => !document.querySelector('[data-tray] .sp-toast'), null, { timeout: 3000 });

    const row = page.locator('.sp-setting');
    await row.click();
    const unfolded = await row.getAttribute('aria-expanded');
    await page.click('#theme-chooser [data-theme-choice="dark"]');
    const chosen = await page.evaluate(() => ({ theme: document.documentElement.dataset.theme, value: document.querySelector('[data-theme-value]').textContent, expanded: document.querySelector('.sp-setting').getAttribute('aria-expanded'), focused: document.activeElement === document.querySelector('.sp-setting') }));
    await row.click();
    await page.locator('#theme-chooser .sp-menu-item').first().focus();
    await page.keyboard.press('Escape');
    const folded = await page.evaluate(() => ({ expanded: document.querySelector('.sp-setting').getAttribute('aria-expanded'), focused: document.activeElement === document.querySelector('.sp-setting') }));
    check('spine: the Theme setting folds open, sets the theme, writes its value and folds on Escape', unfolded === 'true' && chosen.theme === 'dark' && chosen.value === 'Dark' && chosen.expanded === 'false' && chosen.focused && folded.expanded === 'false' && folded.focused, { unfolded, chosen, folded });
    await page.click('.theme-toggle');
    const synced = await page.evaluate(() => ({ theme: document.documentElement.dataset.theme, value: document.querySelector('[data-theme-value]').textContent }));
    check('spine: the theme toggle and the Theme setting agree', synced.theme === 'light' && synced.value === 'Light', synced);
    check('no console errors (spine)', errors.length === 0, errors);
    await context.close();
  }
  {
    // A visitor who paused the fog anywhere on the site carries data-paused="1" onto every page.
    const { page, context, errors } = await open(browser, path, { init: () => localStorage.setItem('brand-motion-paused', 'true') });
    await page.click(opener);
    await page.waitForTimeout(500);
    const dialog = await page.evaluate(() => ({ paused: document.documentElement.dataset.paused, opacity: getComputedStyle(document.getElementById('start-over')).opacity }));
    await page.keyboard.press('Escape');
    await page.fill('#request-email', 'phaedrus@mistystep.io');
    await page.click('[data-request] [type="submit"]');
    await page.waitForTimeout(500);
    const toast = await page.evaluate(() => getComputedStyle(document.querySelector('[data-tray] .sp-toast')).opacity);
    await page.click('[popovertarget="share"]');
    await page.waitForTimeout(500);
    const menu = await page.evaluate(() => getComputedStyle(document.getElementById('share')).opacity);
    check('spine: with motion paused, the dialog, the toast and the menu still appear', dialog.paused === '1' && dialog.opacity === '1' && toast === '1' && menu === '1', { ...dialog, toast, menu });
    check('no console errors (spine, motion paused)', errors.length === 0, errors);
    await context.close();
  }
  {
    const { page, context, errors } = await open(browser, path, { reduce: true });
    await page.click(opener);
    const motion = await page.evaluate(() => [getComputedStyle(document.getElementById('start-over')).animationDuration, getComputedStyle(document.querySelector('.sp-button')).transitionDuration]);
    check('spine: reduced motion makes dialog and button motion instant', motion.every(d => d.split(',').every(x => parseFloat(x) === 0)), motion);
    check('no console errors (spine, reduced motion)', errors.length === 0, errors);
    await context.close();
  }
  for (const theme of ['light', 'dark']) for (const width of [390, 1440]) {
    const { page, context, errors } = await open(browser, path, { width, height: width === 390 ? 844 : 900, theme });
    const shape = await page.evaluate(() => ({ theme: document.documentElement.dataset.theme, overflow: document.documentElement.scrollWidth - innerWidth, failedFonts: [...document.fonts].filter(f => f.status === 'error').map(f => f.family) }));
    check(`spine: ${theme} ${width}: no horizontal overflow, no failed font, no console errors`, shape.theme === theme && shape.overflow <= 0 && !shape.failedFonts.length && !errors.length, { ...shape, errors });
    await context.close();
  }
}

const browser = await chromium.launch({ headless: true, args: GL });
try {
  {
    const { page, context, errors } = await open(browser, '/demo/dist/studio.html');
    await drawn(page);
    check('field mounts in the server-rendered .hero-motion-host', await page.evaluate(() => document.querySelectorAll('.hero-motion-host').length === 1 && document.querySelectorAll('canvas').length === 1));
    check('field animates', (await framesIn(page, 1000)) > 10 && (await changes(page, 700)));
    check('keyboard: Enter on the pause control pauses and resumes it, and focus stays on it', await keyboardToggle(page));
    await page.click('.motion-toggle');
    const paused = await toggleState(page);
    check('Pause sets data-paused, aria-pressed, label and storage', paused.paused === '1' && paused.pressed === 'true' && paused.text === 'Resume motion' && paused.stored === 'true', paused);
    await page.waitForTimeout(300);
    check('Pause stops the field (no frames, no pixel change)', (await framesIn(page, 1000)) <= 1 && !(await changes(page, 800)));
    const light = await levels(page);
    await page.evaluate(() => { window.__canvas = document.querySelector('.hero-motion-host canvas'); });
    await page.click('.theme-toggle');
    await page.waitForTimeout(400);
    const dark = await levels(page);
    const same = await page.evaluate(() => window.__canvas === document.querySelector('.hero-motion-host canvas') && window.__canvas.isConnected && document.querySelectorAll('canvas').length === 1);
    check('theme flip re-colours the field without a remount', same && light.min < 230 && dark.max < 128 && dark.max > dark.min, { light, dark, sameCanvas: same });
    await page.click('.motion-toggle');
    const resumed = await toggleState(page);
    check('Resume restarts the field', resumed.paused === '0' && resumed.stored === 'false' && (await framesIn(page, 1000)) > 10, resumed);
    await page.evaluate(() => window.scrollTo(0, document.documentElement.scrollHeight));
    await page.waitForTimeout(500);
    check('field stops offscreen', (await framesIn(page, 1000)) <= 1);
    await page.evaluate(() => window.scrollTo(0, 0));
    await page.waitForTimeout(500);
    check('field restarts on screen', (await framesIn(page, 1000)) > 10);
    await page.evaluate(() => {
      Object.defineProperty(document, 'hidden', { configurable: true, get: () => true });
      document.dispatchEvent(new Event('visibilitychange'));
    });
    await page.waitForTimeout(300);
    check('field stops in a hidden tab', (await framesIn(page, 1000)) <= 1);
    await page.evaluate(() => {
      delete document.hidden;
      document.dispatchEvent(new Event('visibilitychange'));
    });
    await page.waitForTimeout(300);
    const released = await page.evaluate(() => {
      const canvas = document.querySelector('.hero-motion-host canvas');
      const gl = canvas.getContext('webgl');
      window.brand.destroy();
      return { connected: canvas.isConnected, lost: gl.isContextLost(), canvases: document.querySelectorAll('canvas').length, hostChildren: document.querySelector('.hero-motion-host').childElementCount, toggle: document.querySelector('.motion-toggle').parentElement.tagName };
    });
    check('destroy() releases the canvas and its GL context', !released.connected && released.lost && released.canvases === 0 && released.hostChildren === 0 && released.toggle === 'BODY', released);
    check('nothing runs after destroy()', (await framesIn(page, 1000)) === 0);
    await page.evaluate(() => { window.brand = window.startBrand(); });
    await drawn(page);
    check('startBrand() runs again after destroy (client-side navigation)', await page.evaluate(() => document.querySelectorAll('canvas').length === 1));
    check('no console errors (studio, motion)', errors.length === 0, errors);
    await context.close();
  }
  {
    const { page, context, errors } = await open(browser, '/demo/dist/studio.html', { reduce: true });
    await drawn(page);
    await page.waitForTimeout(600);
    const state = await page.evaluate(() => ({ reduced: document.documentElement.dataset.reducedMotion, hidden: document.querySelector('.motion-toggle').hidden, settled: [...document.querySelectorAll('[data-enter]')].every(el => el.classList.contains('is-in')) }));
    check('reduced motion: one still frame, entrances settled, no pause control', state.reduced === '1' && state.hidden && state.settled && (await framesIn(page, 1000)) <= 1 && !(await changes(page, 1000)), state);
    check('no console errors (reduced motion)', errors.length === 0, errors);
    await context.close();
  }
  {
    const init = () => Object.defineProperty(navigator, 'connection', { configurable: true, get: () => ({ saveData: true }) });
    const { page, context, errors } = await open(browser, '/demo/dist/studio.html', { init });
    await drawn(page);
    await page.waitForTimeout(600);
    const hidden = await page.evaluate(() => document.querySelector('.motion-toggle').hidden);
    check('Save-Data: one still frame, no pause control', hidden && (await framesIn(page, 1000)) <= 1 && !(await changes(page, 1000)), { hidden });
    check('no console errors (Save-Data)', errors.length === 0, errors);
    await context.close();
  }
  {
    const { page, context, errors } = await open(browser, '/demo/dist/studio.html', { width: 390, height: 844 });
    await drawn(page);
    const phone = await page.evaluate(() => {
      const button = document.querySelector('.motion-toggle');
      return { holder: button.parentElement.className, inHero: button.parentElement.parentElement.matches('[data-hero-root]'), visible: !button.hidden && !button.parentElement.hidden };
    });
    check('phone: the pause control sits in the hero row', phone.holder === 'hero-motion-controls' && phone.inHero && phone.visible, phone);
    check('phone keyboard: Enter on the pause control keeps focus on it', await keyboardToggle(page));
    const after = await page.evaluate(() => {
      window.brand.destroy();
      return { parent: document.querySelector('.motion-toggle').parentElement.tagName, holders: document.querySelectorAll('.hero-motion-controls').length };
    });
    check('phone: destroy() puts the control back where the page rendered it', after.parent === 'BODY' && after.holders === 0, after);
    check('no console errors (phone)', errors.length === 0, errors);
    await context.close();
  }
  {
    const { page, context, errors } = await open(browser, '/demo/dist/stack.html');
    const order = await page.evaluate(() => ['.hero-title', '.hero-sub', '.actions', '.hero-proof'].map(sel => getComputedStyle(document.querySelector(`.hero ${sel}`)).getPropertyValue('--ma-i').trim()));
    check('strict-CSP hero (no inline --enter-i) keeps the entrance order', order.join() === '0,1,2,3', order);
    await drawn(page);
    check('no console errors (stack)', errors.length === 0, errors);
    await context.close();
  }
  await spine(browser);
} finally {
  await browser.close();
}
{
  const browser = await chromium.launch({ headless: true, args: ['--disable-webgl', '--disable-3d-apis'] });
  try {
    const { page, context, errors } = await open(browser, '/demo/dist/studio.html');
    await page.waitForTimeout(2500);
    const state = await page.evaluate(() => ({ title: document.querySelector('h1.hero-title')?.getBoundingClientRect().height > 0, drawnCanvas: document.querySelector('.hero-motion-host canvas')?.style.opacity === '1', webglApi: typeof WebGLRenderingContext === 'function', pauseHidden: document.querySelector('.motion-toggle').hidden }));
    check('without WebGL: the page renders, the field draws nothing, nothing loops, no pause control', state.title && !state.drawnCanvas && state.pauseHidden && (await framesIn(page, 1000)) <= 1, state);
    check('no console errors (no WebGL)', errors.length === 0, errors);
    await context.close();
  } finally {
    await browser.close();
  }
}
await writeFile(out, JSON.stringify(results, null, 1));
const failed = results.filter(result => !result.pass);
console.log(`${results.length - failed.length}/${results.length} passed`);
process.exit(failed.length ? 1 : 0);
