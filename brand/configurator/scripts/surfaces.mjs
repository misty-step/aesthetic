// Surfaces gate (issue #36). Browser checks run on Linux only, like scripts/smoke.mjs.
//
//   node scripts/surfaces.mjs [--static] [--url <origin>] [--out <dir>] [--root <aesthetic checkout>]
//
// Static checks (any platform; --static runs only these):
//   drift   the instrument face's SOURCE (options/color/instrument) against the repository root's tokens.json and
//           aesthetic.css, so a change there cannot pass unseen;
//   tokens  components.css, screens.css and page.css read only spine tokens (src/surfaces/spine.ts) and variables
//           they declare, and set no literal colour, font family or font size.
// Browser checks (Linux; serves dist/ unless --url): every screen (docs, release notes, lobby entrance and waiting
// room) in both face modes (own faces, Locked everywhere) and both themes at 390 and 1440, and /surfaces.html in the
// same modes, each asserting no horizontal overflow, no console, page or request errors, no failed font, a visible
// focus ring on the first focusable control, and the contrast guarantees on the painted tokens (spine.ts and
// options/color/README.md; status inks 4.5:1 on --bg and --bg-2). Then the components' behaviour in every column:
// dialog, menu, tabs, toast, settings and validation, and the lobby's create, leave and reduced-motion paths.
// --out writes surfaces.json and a screenshot per state.
import { readFile, mkdir, writeFile } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const here = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const config = { static: false, url: null, out: null, root: path.resolve(here, '..', '..') };
for (let i = 2; i < process.argv.length; i++) {
  const flag = process.argv[i];
  if (flag === '--static') config.static = true;
  else if (['--url', '--out', '--root'].includes(flag)) {
    const value = process.argv[++i];
    if (!value || value.startsWith('--')) throw new Error(`${flag} needs a value`);
    config[flag.slice(2)] = value;
  } else throw new Error(`Unknown flag ${flag}. Usage: node scripts/surfaces.mjs [--static] [--url <origin>] [--out <dir>] [--root <aesthetic checkout>]`);
}
const results = [];
const record = (label, errors, extra = {}) => {
  results.push({ label, pass: errors.length === 0, ...(errors.length ? { errors } : {}), ...extra });
  console.log(`${errors.length ? 'FAIL' : 'PASS'} ${label}${errors.length ? ' ' + errors.join('; ') : ''}`);
};

// ---- Static: drift ----
async function drift() {
  const errors = [];
  const tokensPath = path.join(config.root, 'tokens.json'), cssPath = path.join(config.root, 'aesthetic.css');
  if (!existsSync(tokensPath) || !existsSync(cssPath)) throw new Error(`No tokens.json and aesthetic.css under ${config.root}; pass --root <aesthetic checkout>.`);
  const tokens = JSON.parse(await readFile(tokensPath, 'utf8'));
  const { SOURCE } = await import(pathToFileURL(path.join(here, 'options/color/instrument/index.ts')).href);
  const same = (where, recorded, live) => { if (recorded !== live) errors.push(`${where} is ${JSON.stringify(live)} in the root, ${JSON.stringify(recorded)} in the instrument face`); };
  for (const theme of ['light', 'dark']) for (const [key, value] of Object.entries(SOURCE.tokens.color[theme])) same(`tokens.json color.${theme}.${key}`, value, tokens.color?.[theme]?.[key]);
  for (const theme of ['light', 'dark']) same(`tokens.json themes.ember.${theme}.accent`, SOURCE.tokens.ember[theme], tokens.themes?.ember?.[theme]?.accent);
  for (const [key, value] of Object.entries(SOURCE.tokens.motion)) same(`tokens.json motion.${key}`, value, tokens.motion?.[key]);
  same('tokens.json layout.radius', SOURCE.tokens.radius, tokens.layout?.radius);
  const css = (await readFile(cssPath, 'utf8')).replace(/\/\*[\s\S]*?\*\//g, '');
  for (const [selector, declarations] of Object.entries(SOURCE.css)) {
    const rule = topLevelRule(css, selector);
    if (!rule) { errors.push(`aesthetic.css has no top-level "${selector}" rule`); continue; }
    for (const [property, value] of Object.entries(declarations)) same(`aesthetic.css ${selector} { ${property} }`, value, rule[property]);
  }
  record(`drift: instrument face against ${path.relative(process.cwd(), tokensPath) || 'tokens.json'} ${tokens.version} and aesthetic.css`, errors);
}
function topLevelRule(css, selector) {
  let depth = 0, start = 0;
  for (let i = 0; i < css.length; i++) {
    if (css[i] === '{') {
      if (depth === 0 && css.slice(start, i).trim() === selector) {
        const body = css.slice(i + 1, css.indexOf('}', i));
        return Object.fromEntries([...body.matchAll(/([\w-]+)\s*:\s*([^;]+)/g)].map(m => [m[1], m[2].replace(/\s+/g, ' ').trim()]));
      }
      depth++;
    } else if (css[i] === '}') { depth--; if (depth === 0) start = i + 1; }
    else if (css[i] === ';' && depth === 0) start = i + 1;
  }
  return null;
}

// ---- Static: tokens and literals ----
async function audit() {
  const spine = await import(pathToFileURL(path.join(here, 'src/surfaces/spine.ts')).href);
  const known = new Set([...Object.keys(spine.SPINE), ...Object.keys(spine.FACE_EXTRAS)]);
  const COLOR_WORDS = /\b(white|black|red|green|blue|gray|grey|silver|orange|yellow|purple|pink|brown|navy|teal|maroon|olive|lime|aqua|fuchsia)\b/i;
  for (const file of ['components.css', 'screens.css', 'page.css']) {
    const css = (await readFile(path.join(here, 'src/surfaces', file), 'utf8')).replace(/\/\*[\s\S]*?\*\//g, '');
    const local = new Set([...css.matchAll(/(--[\w-]+)\s*:/g)].map(m => m[1]));
    const errors = [];
    for (const [, name] of css.matchAll(/var\((--[\w-]+)/g)) if (!known.has(name) && !local.has(name)) errors.push(`reads ${name}, which is not a spine token`);
    for (const [, property, value] of css.matchAll(/(?:^|[;{\s])([\w-]+)\s*:\s*([^;{}]+)/g)) {
      if (property.startsWith('--')) continue;
      const v = value.trim();
      if (/#[0-9a-f]{3,8}\b|\b(?:rgba?|hsla?|hwb|lab|lch|oklab|oklch|color)\(/i.test(v)) errors.push(`${property}: ${v} sets a literal colour`);
      else if (/^(?:color|background(?:-color)?|border(?:-[a-z]+)*-color|outline-color|fill|stroke|text-decoration-color|caret-color|accent-color)$/.test(property) && COLOR_WORDS.test(v.replace(/var\([^)]*\)/g, ''))) errors.push(`${property}: ${v} sets a named colour`);
      if (property === 'font-family' && !/^(?:var\(--font-[\w-]+\)|inherit)$/.test(v)) errors.push(`font-family: ${v} is not a type token`);
      if (property === 'font' && v !== 'inherit') errors.push(`font: ${v} is not inherit`);
      if (property === 'font-size' && !/var\(--step-|^inherit$/.test(v)) errors.push(`font-size: ${v} is not a type step`);
    }
    record(`tokens: src/surfaces/${file} reads only spine tokens and sets no literal colour, font or size`, [...new Set(errors)]);
  }
}

await drift();
await audit();

// ---- Browser ----
if (!config.static) {
  if (process.platform === 'darwin') throw new Error('All browser verification is forbidden on this Mac. Run the surfaces gate on a Linux Boat worker (or pass --static); no browser was launched.');
  const { chromium } = await import('playwright');
  const { preview } = await import('vite');
  const server = config.url ? null : await preview({ root: here, preview: { host: '127.0.0.1', port: 4178, strictPort: true } });
  const base = (config.url ?? 'http://127.0.0.1:4178').replace(/\/$/, '');
  const out = config.out ? path.resolve(config.out) : null;
  if (out) await mkdir(out, { recursive: true });
  const browser = await chromium.launch({ headless: true });
  try {
    await browserChecks(browser, base, out);
  } catch (error) {
    record('runner', [error.message]);
  } finally {
    await browser.close();
    await server?.close();
  }
}

const failed = results.filter(r => !r.pass);
const summary = { at: new Date().toISOString(), platform: process.platform, static: config.static, checks: results.length, passed: results.length - failed.length, failed: failed.length, results };
if (config.out) {
  await mkdir(config.out, { recursive: true });
  await writeFile(path.join(config.out, 'surfaces.json'), JSON.stringify(summary, null, 2) + '\n');
}
console.log(JSON.stringify({ checks: summary.checks, passed: summary.passed, failed: summary.failed, ...(config.out ? { out: path.resolve(config.out) } : {}) }));
if (failed.length) process.exitCode = 1;

// In-page: paint a colour into a 1x1 canvas and read it back, then measure WCAG 2 contrast on what was painted.
function measure(selector) {
  const canvas = document.createElement('canvas');
  canvas.width = canvas.height = 1;
  const ctx = canvas.getContext('2d', { willReadFrequently: true });
  const lum = c => { const s = c / 255; return s <= 0.04045 ? s / 12.92 : ((s + 0.055) / 1.055) ** 2.4; };
  const out = [];
  for (const root of document.querySelectorAll(selector)) {
    const probe = document.createElement('i');
    probe.hidden = false;
    probe.style.cssText = 'position:absolute;width:0;height:0;overflow:hidden';
    (root === document.documentElement ? document.body : root).append(probe);
    const paint = token => {
      probe.style.color = `var(${token})`;
      const css = getComputedStyle(probe).color;
      ctx.clearRect(0, 0, 1, 1);
      ctx.fillStyle = '#000';
      ctx.fillStyle = css;
      ctx.fillRect(0, 0, 1, 1);
      const [r, g, b] = ctx.getImageData(0, 0, 1, 1).data;
      return 0.2126 * lum(r) + 0.7152 * lum(g) + 0.0722 * lum(b);
    };
    const defined = token => getComputedStyle(root).getPropertyValue(token).trim() !== '';
    const ratio = (a, b) => { const [x, y] = [paint(a), paint(b)].sort((p, q) => q - p); return (x + 0.05) / (y + 0.05); };
    const errors = [], need = (fg, bgs, min) => { for (const bg of bgs) { const r = ratio(fg, bg); if (r < min) errors.push(`${fg} on ${bg} ${r.toFixed(2)} < ${min}`); } };
    need('--ink', ['--bg', '--bg-2', '--bg-3'], 4.5);
    need('--ink-2', ['--bg', '--bg-2', '--bg-3'], 4.5);
    need('--ink-3', ['--bg', '--bg-2', '--bg-3'], 4.5);
    need('--accent-2', ['--bg', '--bg-2', '--bg-3'], 4.5);
    need('--line-2', ['--bg', '--bg-2'], 3);
    need('--focus', ['--bg', '--bg-2', '--bg-3'], 3);
    need('--accent-ink', ['--accent'], 4.5);
    need('--accent', ['--bg'], 3);
    need('--ink', ['--selection'], 4.5);
    for (const status of ['--ok', '--warn', '--err']) need(status, ['--bg', '--bg-2'], 4.5);
    if (defined('--face-feature')) { need('--ink', ['--face-feature'], 4.5); need('--ink-2', ['--face-feature'], 4.5); }
    if (defined('--face-aside')) need('--ink', ['--face-aside'], 4.5);
    probe.remove();
    out.push({ face: root.dataset.face, theme: root.dataset.theme, errors });
  }
  return out;
}

// In-page: the focused element's ring, its visibility, and its contrast with what lies behind it.
function ringOf() {
  const el = document.activeElement;
  if (!el || el === document.body) return { ok: false, why: 'nothing took focus' };
  const s = getComputedStyle(el), r = el.getBoundingClientRect();
  const visible = r.width > 0 && r.height > 0 && r.bottom > 0 && r.right > 0 && r.top < innerHeight && r.left < innerWidth && s.visibility !== 'hidden';
  const width = parseFloat(s.outlineWidth);
  let behind = el.parentElement, bg = 'rgba(0, 0, 0, 0)';
  while (behind && (bg = getComputedStyle(behind).backgroundColor).match(/^rgba\(.*, 0\)$|transparent/)) behind = behind.parentElement;
  const canvas = document.createElement('canvas'); canvas.width = canvas.height = 1;
  const ctx = canvas.getContext('2d', { willReadFrequently: true });
  const lum = css => { ctx.clearRect(0, 0, 1, 1); ctx.fillStyle = '#000'; ctx.fillStyle = css; ctx.fillRect(0, 0, 1, 1); const [a, b, c] = ctx.getImageData(0, 0, 1, 1).data; const f = v => { v /= 255; return v <= 0.04045 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4; }; return 0.2126 * f(a) + 0.7152 * f(b) + 0.0722 * f(c); };
  const [x, y] = [lum(s.outlineColor), lum(bg)].sort((p, q) => q - p);
  const contrast = (x + 0.05) / (y + 0.05);
  const label = `${el.tagName.toLowerCase()}${el.className ? '.' + String(el.className).split(' ').join('.') : ''} "${(el.textContent || el.getAttribute('aria-label') || '').trim().slice(0, 40)}"`;
  return { ok: visible && s.outlineStyle !== 'none' && width >= 2 && contrast >= 3, label, visible, outline: `${s.outlineStyle} ${s.outlineWidth} ${s.outlineColor}`, contrast: Number(contrast.toFixed(2)) };
}

async function visit(browser, base, url, { width, theme, reduced = false }) {
  const context = await browser.newContext({
    viewport: { width, height: width === 390 ? 844 : 900 }, deviceScaleFactor: width === 390 ? 2 : 1,
    isMobile: width === 390, hasTouch: width === 390, colorScheme: theme, reducedMotion: reduced ? 'reduce' : 'no-preference',
  });
  const page = await context.newPage();
  const errors = [];
  page.on('pageerror', error => errors.push(`page error: ${error.message}`));
  page.on('console', message => { if (message.type() === 'error') errors.push(`console: ${message.text()}`); });
  page.on('requestfailed', request => errors.push(`request failed: ${request.url()} ${request.failure()?.errorText}`));
  page.on('response', response => { if (response.status() >= 400 && response.url().startsWith(base)) errors.push(`HTTP ${response.status()}: ${response.url()}`); });
  await page.goto(base + url, { waitUntil: 'load' });
  return { context, page, errors };
}

async function shared(page, errors) {
  const shape = await page.evaluate(() => ({
    overflow: document.documentElement.scrollWidth > innerWidth + 1 ? `${document.documentElement.scrollWidth} > ${innerWidth}` : null,
    fontErrors: [...document.fonts].filter(f => f.status === 'error').map(f => f.family),
    fonts: [...new Set([...document.fonts].filter(f => f.status === 'loaded').map(f => f.family))],
  }));
  if (shape.overflow) errors.push(`horizontal overflow ${shape.overflow}`);
  if (shape.fontErrors.length) errors.push(`fonts failed: ${shape.fontErrors.join(', ')}`);
  await page.keyboard.press('Tab');
  const ring = await page.evaluate(ringOf);
  if (!ring.ok) errors.push(`focus ring on the first focusable control: ${JSON.stringify(ring)}`);
  return { fonts: shape.fonts, ring };
}

async function browserChecks(browser, base, out) {
  const screens = [['docs', null, 'studio'], ['changelog', null, 'instrument'], ['lobby', 'entrance', 'poppycock'], ['lobby', 'table', 'poppycock']];
  for (const [screen, step, own] of screens) for (const mode of ['own', 'locked']) for (const theme of ['light', 'dark']) for (const width of [390, 1440]) {
    const face = mode === 'locked' ? 'studio' : own;
    const url = `/surface.html?screen=${screen}&face=${face}&theme=${theme}${step ? `&step=${step}` : ''}`;
    const label = `screen ${screen}${step ? '/' + step : ''} ${mode} (${face}) ${theme} ${width}`;
    const { context, page, errors } = await visit(browser, base, url, { width, theme });
    let evidence = {};
    try {
      await page.waitForFunction(() => window.__SURFACE__?.ready, null, { timeout: 15000 });
      await page.waitForTimeout(400);
      const shot = out ? `${screen}${step ? '-' + step : ''}-${mode}-${theme}-${width}.png` : null;
      if (shot) await page.screenshot({ path: path.join(out, shot) });
      const contrast = await page.evaluate(measure, 'html[data-face]');
      for (const c of contrast) errors.push(...c.errors.map(e => `contrast ${c.face} ${c.theme}: ${e}`));
      evidence = { url, ...(await shared(page, errors)), ...(shot ? { screenshot: shot } : {}) };
    } catch (error) { errors.push(error.message); }
    await context.close();
    record(label, errors, { evidence });
  }

  for (const faces of ['own', 'locked']) for (const theme of ['light', 'dark']) for (const width of [390, 1440]) {
    const url = `/surfaces.html?theme=${theme}&faces=${faces}`;
    const { context, page, errors } = await visit(browser, base, url, { width, theme });
    let evidence = {};
    try {
      await page.waitForFunction(() => window.__SURFACES__?.ready, null, { timeout: 20000 });
      await page.waitForTimeout(400);
      const shot = out ? `surfaces-${faces}-${theme}-${width}.png` : null;
      if (shot) await page.screenshot({ path: path.join(out, shot) });
      const contrast = await page.evaluate(measure, '.sf-col[data-face]');
      if (contrast.length !== 3) errors.push(`expected three face columns, found ${contrast.length}`);
      for (const c of contrast) errors.push(...c.errors.map(e => `contrast ${c.face} ${c.theme}: ${e}`));
      const frames = await page.evaluate(() => [...document.querySelectorAll('.sf-screen iframe')].map(f => f.getAttribute('src')));
      const want = faces === 'locked' ? /face=studio/ : null;
      if (frames.length !== 8) errors.push(`expected 8 screen frames, found ${frames.length}`);
      if (want && frames.some(src => !want.test(src))) errors.push(`Locked everywhere left a frame in another face: ${frames.join(' ')}`);
      if (frames.some(src => !src.includes(`theme=${theme}`))) errors.push('a frame does not follow the theme');
      evidence = { url, frames, ...(await shared(page, errors)), ...(shot ? { screenshot: shot } : {}) };
    } catch (error) { errors.push(error.message); }
    await context.close();
    record(`surfaces page ${faces} ${theme} ${width}`, errors, { evidence });
  }

  await behaviour(browser, base);
}

async function behaviour(browser, base) {
  const { context, page, errors: pageErrors } = await visit(browser, base, '/surfaces.html?theme=light&faces=own', { width: 1440, theme: 'light' });
  await page.waitForFunction(() => window.__SURFACES__?.ready, null, { timeout: 20000 });
  const focused = () => page.evaluate(() => { const el = document.activeElement; return el ? `${el.tagName.toLowerCase()}#${el.id}|${(el.textContent || '').trim().slice(0, 40)}` : ''; });
  for (const face of ['studio', 'instrument', 'poppycock']) {
    const col = `.sf-col[data-face="${face}"]`;
    const errors = [];
    const step = async (what, fn) => {
      try { await fn(); } catch (error) { errors.push(`${what}: ${error.message.split('\n')[0]}`); }
      await page.evaluate(() => { document.querySelectorAll(':popover-open').forEach(p => p.hidePopover()); document.querySelectorAll('dialog[open]').forEach(d => d.close()); });
      await page.waitForTimeout(100);
    };
    await step('dialog opens, Escape closes, focus returns', async () => {
      const opener = page.locator(`${col} [data-sp-dialog]`);
      await opener.click();
      await page.waitForFunction(id => document.getElementById(id).open, `${face}-leave`);
      if (!(await page.evaluate(id => document.getElementById(id).contains(document.activeElement), `${face}-leave`))) throw new Error('focus did not move into the dialog');
      await page.keyboard.press('Escape');
      await page.waitForFunction(id => !document.getElementById(id).open, `${face}-leave`);
      await page.waitForFunction(id => document.activeElement === document.querySelector(`[data-sp-dialog="#${id}"]`), `${face}-leave`, { timeout: 2000 }).catch(async () => { throw new Error(`focus went to ${await focused()}`); });
    });
    await step('menu opens on its first item, arrows move, Escape returns focus', async () => {
      const button = page.locator(`${col} [popovertarget]`);
      await button.click();
      await page.waitForFunction(id => document.getElementById(id).matches(':popover-open'), `${face}-options`);
      const items = page.locator(`#${face}-options .sp-menu-item`);
      await page.waitForFunction(id => document.activeElement === document.querySelector(`#${id} .sp-menu-item`), `${face}-options`, { timeout: 2000 }).catch(async () => { throw new Error(`first item not focused: ${await focused()}`); });
      await page.keyboard.press('ArrowDown');
      if (!(await items.nth(1).evaluate(el => el === document.activeElement))) throw new Error('ArrowDown did not move to the second item');
      await page.keyboard.press('End');
      if (!(await items.nth(2).evaluate(el => el === document.activeElement))) throw new Error('End did not reach the last item');
      await page.keyboard.press('Escape');
      await page.waitForFunction(id => !document.getElementById(id).matches(':popover-open'), `${face}-options`);
      await page.waitForFunction(id => document.activeElement === document.querySelector(`[popovertarget="${id}"]`), `${face}-options`, { timeout: 2000 }).catch(async () => { throw new Error(`focus went to ${await focused()}`); });
    });
    await step('tabs follow the arrow keys', async () => {
      const tabs = page.locator(`${col} [role="tab"]`);
      await tabs.nth(0).focus();
      await page.keyboard.press('ArrowRight');
      if (await tabs.nth(1).getAttribute('aria-selected') !== 'true') throw new Error('ArrowRight did not select the second tab');
      if (!(await tabs.nth(1).evaluate(el => el === document.activeElement))) throw new Error('ArrowRight did not move focus');
      const panel = await tabs.nth(1).getAttribute('aria-controls');
      if (await page.locator(`#${panel}`).isHidden()) throw new Error('the selected tab\'s panel is hidden');
      await page.keyboard.press('Home');
      if (await tabs.nth(0).getAttribute('aria-selected') !== 'true') throw new Error('Home did not select the first tab');
    });
    await step('a toast stays until it is dismissed', async () => {
      const toasts = page.locator(`${col} .sp-toast`);
      await page.locator(`${col} [data-sheet-toast]`).click();
      if (await toasts.count() !== 2) throw new Error(`expected 2 toasts, found ${await toasts.count()}`);
      await page.waitForTimeout(4000);
      if (await toasts.count() !== 2) throw new Error('a toast left on its own');
      await toasts.nth(1).locator('.sp-close').click();
      await page.waitForFunction(sel => document.querySelectorAll(sel).length === 1, `${col} .sp-toast`, { timeout: 3000 });
    });
    await step('a setting folds open, writes its value and folds on Escape', async () => {
      const row = page.locator(`${col} .sp-setting`).first();
      await row.click();
      if (await row.getAttribute('aria-expanded') !== 'true') throw new Error('the row did not open');
      await page.locator(`${col} .sp-chooser.is-open .sp-menu-item`).nth(2).click();
      if ((await row.locator('.sp-setting-value').textContent()) !== 'dark') throw new Error('the chosen value was not written');
      if (await row.getAttribute('aria-expanded') !== 'false') throw new Error('choosing did not fold the row');
      await row.click();
      await page.locator(`${col} .sp-chooser.is-open .sp-menu-item`).first().focus();
      await page.keyboard.press('Escape');
      if (await row.getAttribute('aria-expanded') !== 'false') throw new Error('Escape did not fold the row');
      if (!(await row.evaluate(el => el === document.activeElement))) throw new Error('Escape did not return focus to the row');
    });
    await step('validation marks the field and its glyph carries the error ink', async () => {
      const name = page.locator(`#${face}-name`), code = page.locator(`#${face}-code`);
      if (await code.getAttribute('aria-invalid') !== 'true') throw new Error('the room code does not start invalid');
      await page.locator(`${col} [data-sheet-form] [type="submit"]`).click();
      if (await name.getAttribute('aria-invalid') !== 'true') throw new Error('an empty name was accepted');
      const glyph = await page.locator(`#${face}-name-error .sp-icon`).evaluate(el => [getComputedStyle(el).color, getComputedStyle(el.parentElement).color]);
      if (glyph[0] === glyph[1]) throw new Error('the glyph does not carry its own ink');
      await name.fill('Phaedrus');
      if (await name.getAttribute('aria-invalid') === 'true') throw new Error('typing did not clear the error');
      await code.fill('k7pm');
      await page.locator(`${col} [data-sheet-form] [type="submit"]`).click();
      if (!(await page.locator(`#${face}-code-error`).textContent()).includes('No table has that room code')) throw new Error('a well-formed code did not meet the app\'s no-table error');
    });
    record(`behaviour ${face} column: dialog, menu, tabs, toast, settings, validation`, errors);
  }
  record('behaviour page errors', pageErrors);
  await context.close();

  const lobby = await visit(browser, base, '/surface.html?screen=lobby&face=poppycock&theme=light', { width: 390, theme: 'light' });
  const errors = [];
  try {
    const p = lobby.page;
    await p.waitForFunction(() => window.__SURFACE__?.ready, null, { timeout: 15000 });
    await p.locator('#panel-create [type="submit"]').click();
    if (await p.locator('#name-create').getAttribute('aria-invalid') !== 'true') errors.push('Create table accepted an empty name');
    await p.locator('#name-create').fill('Phaedrus');
    await p.locator('#panel-create [type="submit"]').click();
    await p.waitForSelector('#room-title');
    if (!(await p.locator('.lobby-player').textContent()).includes('Phaedrus')) errors.push('the waiting room does not list the new host');
    if (!(await p.locator('.lobby-start .sp-button').isDisabled())) errors.push('Start game is enabled with one player');
    await p.locator('[popovertarget="table-options"]').click();
    await p.locator('#table-options .sp-menu-item', { hasText: 'Leave table' }).click();
    await p.waitForFunction(() => document.getElementById('leave-dialog').open);
    await p.locator('#leave-dialog [data-sp-close=""]').click();
    await p.waitForFunction(() => !document.getElementById('leave-dialog').open);
    if (!(await p.waitForFunction(() => document.activeElement === document.querySelector('[popovertarget="table-options"]'), null, { timeout: 2000 }).then(() => true, () => false))) errors.push('Stay did not return focus to Table options');
    await p.locator('[popovertarget="table-options"]').click();
    await p.locator('#table-options .sp-menu-item', { hasText: 'Leave table' }).click();
    await p.locator('#leave-dialog [data-sp-close="leave"]').click();
    await p.waitForSelector('#entrance-title');
  } catch (error) { errors.push(error.message.split('\n')[0]); }
  errors.push(...lobby.errors);
  await lobby.context.close();
  record('lobby: create a table, stay, then leave', errors);

  const reduced = await visit(browser, base, '/surfaces.html?theme=dark&faces=own', { width: 1440, theme: 'dark', reduced: true });
  const still = [];
  try {
    await reduced.page.waitForFunction(() => window.__SURFACES__?.ready, null, { timeout: 20000 });
    await reduced.page.locator('.sf-col[data-face="poppycock"] [data-sp-dialog]').click();
    const motion = await reduced.page.evaluate(() => [getComputedStyle(document.getElementById('poppycock-leave')).animationDuration, getComputedStyle(document.querySelector('.sf-col[data-face="poppycock"] .sp-button')).transitionDuration]);
    if (motion.some(d => d.split(',').some(x => parseFloat(x) !== 0))) still.push(`motion under reduced motion: ${motion.join(' / ')}`);
  } catch (error) { still.push(error.message.split('\n')[0]); }
  still.push(...reduced.errors);
  await reduced.context.close();
  record('reduced motion: dialog and button motion are instant', still);
}
