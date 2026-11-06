#!/usr/bin/env node
// Browser proof for the package on the demo pages: every page in both themes at 390 and 1440 px loads its fonts and
// files without an error and fits the viewport; the tokens resolve per theme; the primary button keeps Indigo under
// its white label in both themes; the runtime's toggle flips, stores and restores the theme and destroy() lets go;
// and the spine's dialog, menu, tabs, settings row, toasts, field validation and ranked rows behave.
// Headless Chromium on a Linux worker only (no browser runs on a Mac). From brand/, after `npm ci && npm run demo`
// and with the configurator's dependencies installed (it uses their Playwright):
//   node demo/proof.mjs [out-dir]
// It serves brand/ itself, writes screenshots and proof.json to out-dir (default demo/proof), and exits 1 on a failure.
import { once } from 'node:events';
import { existsSync } from 'node:fs';
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { createServer } from 'node:http';
import { createRequire } from 'node:module';
import { platform } from 'node:os';
import { extname, join, normalize } from 'node:path';
import { fileURLToPath } from 'node:url';

if (platform() === 'darwin') {
  console.error('demo/proof.mjs drives a browser and refuses to run on macOS: run it on a Linux Boat worker.');
  process.exit(2);
}
const { chromium } = createRequire(new URL('../configurator/package.json', import.meta.url))('playwright');
const ROOT = fileURLToPath(new URL('../', import.meta.url));
const out = process.argv[2] ?? join(ROOT, 'demo', 'proof');
const tokens = JSON.parse(await readFile(join(ROOT, 'identity', 'tokens.json'), 'utf8'));
if (!existsSync(join(ROOT, 'demo', 'dist', 'index.html'))) {
  console.error('demo/dist is missing: run npm run demo first.');
  process.exit(1);
}

const TYPES = { '.html': 'text/html; charset=utf-8', '.js': 'text/javascript', '.css': 'text/css', '.json': 'application/json', '.woff2': 'font/woff2', '.svg': 'image/svg+xml', '.png': 'image/png' };
const server = createServer(async (request, response) => {
  let path = new URL(request.url, 'http://127.0.0.1').pathname;
  if (path.endsWith('/')) path += 'index.html';
  const file = normalize(join(ROOT, decodeURIComponent(path)));
  if (!file.startsWith(ROOT) || !existsSync(file)) {
    response.writeHead(404);
    response.end();
    return;
  }
  response.writeHead(200, { 'content-type': TYPES[extname(file)] ?? 'application/octet-stream' });
  response.end(await readFile(file));
});
server.listen(0, '127.0.0.1');
await once(server, 'listening');
const base = `http://127.0.0.1:${server.address().port}/demo/dist/`;

const results = [];
function check(name, pass, detail) {
  results.push({ name, pass: Boolean(pass), detail });
  console.log(`${pass ? 'PASS' : 'FAIL'} ${name}${detail === undefined ? '' : ` ${JSON.stringify(detail)}`}`);
}
const rgb = hex => `rgb(${[1, 3, 5].map(i => parseInt(hex.slice(i, i + 2), 16)).join(', ')})`;

const browser = await chromium.launch({ headless: true });
async function open(page, { theme = 'light', width = 1440, height = 900 } = {}) {
  const context = await browser.newContext({ viewport: { width, height }, deviceScaleFactor: 1, colorScheme: theme, permissions: ['clipboard-read', 'clipboard-write'] });
  const tab = await context.newPage();
  const errors = [];
  tab.on('pageerror', error => errors.push(String(error)));
  tab.on('console', message => { if (message.type() === 'error' || message.type() === 'warning') errors.push(message.text()); });
  tab.on('response', response => { if (response.status() >= 400) errors.push(`${response.status()} ${response.url()}`); });
  tab.on('requestfailed', request => errors.push(`failed ${request.url()}`));
  await tab.goto(base + page, { waitUntil: 'load' });
  await tab.evaluate(() => document.fonts.ready);
  return { tab, context, errors };
}
try {
  await mkdir(out, { recursive: true });
  // Every page, both themes, phone and desktop.
  for (const page of ['index.html', 'studio.html', 'stack.html']) {
    for (const theme of ['light', 'dark']) {
      for (const width of [390, 1440]) {
        const { tab, context, errors } = await open(page, { theme, width });
        const state = await tab.evaluate(() => ({
          fonts: [...document.fonts].filter(face => face.status === 'loaded').map(face => face.family.replaceAll('"', '')),
          overflow: document.documentElement.scrollWidth - innerWidth,
          canvas: getComputedStyle(document.documentElement).getPropertyValue('--canvas').trim(),
          button: (s => ({ background: s.backgroundColor, color: s.color }))(getComputedStyle(document.querySelector('.demo-nav .sp-button'))),
          stop: getComputedStyle(document.querySelector('.ms-stop')).color,
          primary: getComputedStyle(document.documentElement).getPropertyValue('--primary').trim(),
          h1: getComputedStyle(document.querySelector('h1')).fontFamily,
        }));
        const label = `${page} ${theme} ${width}`;
        const families = [tokens.typography.display.fontFamily, tokens.typography.body.fontFamily, tokens.typography.mono.fontFamily];
        check(`${label}: loads with no errors`, errors.length === 0, errors);
        check(`${label}: Hedvig Letters Serif, Uncut Sans and Commit Mono load`, families.every(family => state.fonts.includes(family)), state.fonts);
        check(`${label}: fits the viewport`, state.overflow <= 0, state.overflow);
        check(`${label}: the ${theme} canvas and primary come from tokens.json`, state.canvas === (theme === 'dark' ? tokens.colors['dark-canvas'] : tokens.colors.canvas) && state.primary === (theme === 'dark' ? tokens.colors['dark-primary'] : tokens.colors.primary), state);
        check(`${label}: the primary button is Indigo with a white label`, state.button?.background === rgb(tokens.colors.primary) && state.button?.color === rgb(tokens.colors['on-primary']), state.button);
        check(`${label}: the headline's full stop takes the primary`, state.stop === rgb(state.primary), state.stop);
        check(`${label}: the headline sets ${tokens.typography.display.fontFamily}`, state.h1.startsWith(`"${tokens.typography.display.fontFamily}"`), state.h1);
        await tab.screenshot({ path: join(out, `${page.replace('.html', '')}-${theme}-${width}.png`), fullPage: true });
        await context.close();
      }
    }
  }

  // The runtime: the toggle flips, stores and restores the theme; the system setting drives it until a choice exists.
  {
    const { tab, context } = await open('index.html', { theme: 'dark' });
    check('runtime: with no stored choice the toggle follows the system (dark)', await tab.evaluate(() => !document.documentElement.hasAttribute('data-theme') && document.querySelector('[data-theme-toggle]').getAttribute('aria-pressed') === 'true'));
    await tab.click('[data-theme-toggle]');
    const flipped = await tab.evaluate(() => ({ theme: document.documentElement.dataset.theme, pressed: document.querySelector('[data-theme-toggle]').getAttribute('aria-pressed'), stored: localStorage.getItem('misty-step-theme'), canvas: getComputedStyle(document.documentElement).getPropertyValue('--canvas').trim() }));
    check('runtime: a click turns the page light, stores it and releases the toggle', flipped.theme === 'light' && flipped.pressed === 'false' && flipped.stored === 'light' && flipped.canvas === tokens.colors.canvas, flipped);
    await tab.reload({ waitUntil: 'load' });
    check('runtime: the stored choice returns on reload, ahead of the system', await tab.evaluate(() => document.documentElement.dataset.theme === 'light' && document.querySelector('[data-theme-toggle]').getAttribute('aria-pressed') === 'false'));
    await tab.evaluate(async () => (await import('@misty-step/brand/runtime')).startBrand().destroy());
    await tab.click('[data-theme-toggle]');
    check('runtime: destroy() lets the toggle go', await tab.evaluate(() => document.documentElement.dataset.theme === 'light'));
    await context.close();
  }

  // The spine on the identity sheet.
  {
    const { tab, context, errors } = await open('index.html');
    const focused = selector => tab.waitForFunction(s => document.activeElement === document.querySelector(s), selector, { timeout: 2000 }).then(() => true, () => false);
    await tab.click('[data-sp-dialog="#start-over"]');
    check('spine: the dialog opens as a modal', await tab.evaluate(() => document.getElementById('start-over').open));
    await tab.keyboard.press('Escape');
    check('spine: Escape closes the dialog and focus returns to its opener', !(await tab.evaluate(() => document.getElementById('start-over').open)) && await focused('[data-sp-dialog="#start-over"]'));

    await tab.click('[popovertarget="share"]');
    check('spine: the menu opens with its first item focused', await focused('#share .sp-menu-item'));
    await tab.keyboard.press('ArrowDown');
    check('spine: ArrowDown moves through the menu', await tab.evaluate(() => document.activeElement === document.querySelectorAll('#share .sp-menu-item')[1]));
    await tab.keyboard.press('Escape');
    check('spine: Escape closes the menu and focus returns to its button', await focused('[popovertarget="share"]'));

    await tab.click('#tab-stack');
    check('spine: a tab shows its panel and hides the other', await tab.evaluate(() => !document.getElementById('panel-stack').hidden && document.getElementById('panel-studio').hidden));
    await tab.keyboard.press('ArrowLeft');
    check('spine: ArrowLeft selects the previous tab', await tab.evaluate(() => document.getElementById('tab-studio').getAttribute('aria-selected') === 'true' && document.activeElement.id === 'tab-studio'));

    await tab.click('.sp-setting');
    check('spine: a settings row folds its chooser open', await tab.evaluate(() => document.querySelector('.sp-setting').getAttribute('aria-expanded') === 'true'));
    await tab.click('[data-theme-choice="dark"]');
    check('spine: choosing writes the value, folds the row and the page follows', await tab.evaluate(() => document.querySelector('.sp-setting-value').textContent === 'Dark' && document.querySelector('.sp-setting').getAttribute('aria-expanded') === 'false' && document.documentElement.dataset.theme === 'dark'));
    check('spine: in dark the primary button keeps Indigo under white', JSON.stringify(await tab.evaluate(() => { const s = getComputedStyle(document.querySelector('.sp-button')); return [s.backgroundColor, s.color]; })) === JSON.stringify([rgb(tokens.colors.primary), rgb(tokens.colors['on-primary'])]));

    await tab.click('[data-toast="Built."]');
    check('spine: a toast appears in the tray', await tab.waitForFunction(() => [...document.querySelectorAll('[data-tray] .sp-toast')].some(t => t.textContent.includes('Built.')), null, { timeout: 2000 }).then(() => true, () => false));
    await tab.click('[data-tray] .sp-toast .sp-close');
    check('spine: its close button dismisses it', await tab.waitForFunction(() => !document.querySelector('[data-tray] .sp-toast'), null, { timeout: 2000 }).then(() => true, () => false));

    await tab.click('[data-request] [type="submit"]');
    const invalid = await tab.evaluate(() => ({ invalid: document.getElementById('request-email').getAttribute('aria-invalid'), shown: !document.getElementById('request-email-error').hidden, focused: document.activeElement.id }));
    check('spine: setInvalid marks the field, shows its note and the page refocuses it', invalid.invalid === 'true' && invalid.shown && invalid.focused === 'request-email', invalid);
    await tab.fill('#request-email', 'you@company.com');
    check('spine: typing clears the error', await tab.evaluate(() => !document.getElementById('request-email').hasAttribute('aria-invalid') && document.getElementById('request-email-error').hidden));

    const meters = await tab.evaluate(() => [...document.querySelectorAll('.sp-closeness')].map(row => ({ value: Number(row.querySelector('meter').value), text: row.querySelector('span').textContent, width: row.querySelector('meter').getBoundingClientRect().width })));
    check('spine: each ranked row draws its closeness from <meter value> and prints the same percent', meters.length > 0 && meters.every(m => `${Math.round(m.value * 100)}%` === m.text && m.width > 0), meters);
    check('spine: no errors while driving the sheet', errors.length === 0, errors);
    await context.close();
  }
} finally {
  await browser.close();
  server.close();
}
await writeFile(join(out, 'proof.json'), JSON.stringify(results, null, 2) + '\n');
const failed = results.filter(result => !result.pass);
console.log(`${results.length - failed.length}/${results.length} passed; screenshots and proof.json in ${out}`);
process.exit(failed.length ? 1 : 0);
