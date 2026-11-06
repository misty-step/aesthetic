#!/usr/bin/env node
// The brand lab's smoke gate: the built (or deployed) lab renders the locked identity in both themes at 390 and
// 1440 px. Each state loads with no error or failed request, sets the package's three faces, shows both lockups,
// every tokens.json colour and type role, loads every image, fits the viewport, takes its canvas from tokens.json,
// and flips theme from the toggle. Screenshots and smoke.json go to --out.
// Headless Chromium on a Linux worker only (no browser runs on a Mac):
//   npm run build && npx playwright install --with-deps chromium
//   node scripts/smoke.mjs [--url https://misty-brand-lab.misty-step.workers.dev] [--out evidence]
// Without --url it serves dist/ itself.
import { once } from 'node:events';
import { existsSync } from 'node:fs';
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { createServer } from 'node:http';
import { createRequire } from 'node:module';
import { platform } from 'node:os';
import { extname, join, normalize } from 'node:path';
import { fileURLToPath } from 'node:url';
import { chromium } from 'playwright';

if (platform() === 'darwin') {
  console.error('scripts/smoke.mjs drives a browser and refuses to run on macOS: run it on a Linux Boat worker.');
  process.exit(2);
}
const args = process.argv.slice(2);
const option = name => {
  const at = args.indexOf(name);
  return at < 0 ? undefined : args.splice(at, 2)[1];
};
const remote = option('--url');
const out = option('--out') ?? 'evidence';
if (args.length) {
  console.error(`smoke: unknown arguments ${args.join(' ')}; expected [--url <origin>] [--out <dir>]`);
  process.exit(2);
}
const HERE = fileURLToPath(new URL('../', import.meta.url));
const DIST = join(HERE, 'dist');
const tokens = createRequire(import.meta.url)('@misty-step/brand/tokens.json');

let server;
let base = remote?.replace(/\/$/, '');
if (!base) {
  if (!existsSync(join(DIST, 'index.html'))) {
    console.error('smoke: dist/ is missing: run npm run build first.');
    process.exit(1);
  }
  const TYPES = { '.html': 'text/html; charset=utf-8', '.js': 'text/javascript', '.css': 'text/css', '.woff2': 'font/woff2', '.svg': 'image/svg+xml', '.png': 'image/png', '.txt': 'text/plain' };
  server = createServer(async (request, response) => {
    let path = new URL(request.url, 'http://127.0.0.1').pathname;
    if (path.endsWith('/')) path += 'index.html';
    const file = normalize(join(DIST, decodeURIComponent(path)));
    if (!file.startsWith(DIST) || !existsSync(file)) {
      response.writeHead(404);
      response.end();
      return;
    }
    response.writeHead(200, { 'content-type': TYPES[extname(file)] ?? 'application/octet-stream' });
    response.end(await readFile(file));
  });
  server.listen(0, '127.0.0.1');
  await once(server, 'listening');
  base = `http://127.0.0.1:${server.address().port}`;
}

const results = [];
function check(name, pass, detail) {
  results.push({ name, pass: Boolean(pass), detail });
  console.log(`${pass ? 'PASS' : 'FAIL'} ${name}${detail === undefined ? '' : ` ${JSON.stringify(detail)}`}`);
}
const families = [...new Set(Object.values(tokens.typography).map(style => style.fontFamily))];

await mkdir(out, { recursive: true });
const browser = await chromium.launch({ headless: true });
try {
  for (const theme of ['light', 'dark']) {
    for (const width of [390, 1440]) {
      const context = await browser.newContext({ viewport: { width, height: 900 }, deviceScaleFactor: 1, colorScheme: theme });
      const page = await context.newPage();
      const errors = [];
      page.on('pageerror', error => errors.push(String(error)));
      page.on('console', message => { if (message.type() === 'error' || message.type() === 'warning') errors.push(message.text()); });
      page.on('response', response => { if (response.status() >= 400) errors.push(`${response.status()} ${response.url()}`); });
      page.on('requestfailed', request => errors.push(`failed ${request.url()}`));
      await page.goto(`${base}/`, { waitUntil: 'networkidle' });
      await page.waitForSelector('.demo-nav .ms-lockup');
      await page.evaluate(async () => {
        await document.fonts.ready;
        await Promise.all([...document.images].map(image => image.decode().catch(() => undefined)));
      });
      const state = await page.evaluate(() => ({
        brand: document.documentElement.getAttribute('data-brand'),
        names: [...new Set([...document.querySelectorAll('.ms-lockup .ms-name')].map(name => name.textContent))],
        swatches: document.querySelectorAll('.demo-swatches li').length,
        roles: document.querySelectorAll('.demo-type > div').length,
        ranked: document.querySelectorAll('.sp-ranked-result').length,
        fonts: [...document.fonts].filter(face => face.status === 'loaded').map(face => face.family.replaceAll('"', '')),
        broken: [...document.images].filter(image => !image.complete || image.naturalWidth === 0).map(image => image.src),
        overflow: document.documentElement.scrollWidth - innerWidth,
        clippedLockups: [...document.querySelectorAll('.demo-tile .ms-lockup')].filter(lockup => {
          const tile = lockup.closest('.demo-tile');
          const frame = tile.getBoundingClientRect();
          const art = lockup.getBoundingClientRect();
          const style = getComputedStyle(tile);
          return art.left < frame.left + parseFloat(style.paddingLeft) - 1 ||
            art.right > frame.right - parseFloat(style.paddingRight) + 1;
        }).map(lockup => lockup.textContent),
        canvas: getComputedStyle(document.documentElement).getPropertyValue('--canvas').trim(),
      }));
      const label = `${theme} ${width}`;
      check(`${label}: loads with no errors or failed requests`, errors.length === 0, errors);
      check(`${label}: <html> carries data-brand="misty-step"`, state.brand === 'misty-step', state.brand);
      check(`${label}: both lockups render`, ['Misty Step', 'mistystack'].every(name => state.names.includes(name)), state.names);
      check(`${label}: every tokens.json colour and type role shows`, state.swatches === Object.keys(tokens.colors).length && state.roles === Object.keys(tokens.typography).length, { swatches: state.swatches, roles: state.roles });
      check(`${label}: the ranked rows render`, state.ranked > 0, state.ranked);
      check(`${label}: ${families.join(', ')} load`, families.every(family => state.fonts.includes(family)), state.fonts);
      check(`${label}: every image loads`, state.broken.length === 0, state.broken);
      check(`${label}: fits the viewport`, state.overflow <= 0, state.overflow);
      check(`${label}: every lockup fits its card`, state.clippedLockups.length === 0, state.clippedLockups);
      check(`${label}: the canvas is tokens.json's ${theme} canvas`, state.canvas === (theme === 'dark' ? tokens.colors['dark-canvas'] : tokens.colors.canvas), state.canvas);
      await page.screenshot({ path: join(out, `lab-${theme}-${width}.png`), fullPage: true });
      await page.click('[data-theme-toggle]');
      const flipped = await page.evaluate(() => ({ theme: document.documentElement.getAttribute('data-theme'), canvas: getComputedStyle(document.documentElement).getPropertyValue('--canvas').trim() }));
      const other = theme === 'dark' ? 'light' : 'dark';
      check(`${label}: the toggle turns the page ${other}`, flipped.theme === other && flipped.canvas === (other === 'dark' ? tokens.colors['dark-canvas'] : tokens.colors.canvas), flipped);
      await context.close();
    }
  }
} finally {
  await browser.close();
  server?.close();
}
await writeFile(join(out, 'smoke.json'), JSON.stringify({ base, results }, null, 2) + '\n');
const failed = results.filter(result => !result.pass);
console.log(`${results.length - failed.length}/${results.length} passed; screenshots and smoke.json in ${out}`);
process.exit(failed.length ? 1 : 0);
