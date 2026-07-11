// Lab-006 gallery proof loop. Run after `npm run build` from the repo root:
//   node explorations/lab-006/verify-gallery.mjs
// It exercises the real Base UI primitives in one shared gallery implementation
// across the three composition directions, both modes, and mobile-first sizes.
import { chromium } from 'playwright';
import { createServer } from 'node:http';
import { readFile } from 'node:fs/promises';
import { extname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const dist = fileURLToPath(new URL('./dist', import.meta.url));
const types = {
  '.html': 'text/html',
  '.js': 'text/javascript',
  '.css': 'text/css',
  '.woff2': 'font/woff2',
  '.svg': 'image/svg+xml',
};
const server = createServer(async (req, res) => {
  const path = req.url === '/' ? '/gallery.html' : req.url.split('?')[0];
  try {
    const body = await readFile(join(dist, path));
    res.writeHead(200, {
      'content-type': types[extname(path)] || 'application/octet-stream',
    });
    res.end(body);
  } catch {
    res.writeHead(404);
    res.end('not found');
  }
});
await new Promise((resolve) => server.listen(8127, '127.0.0.1', resolve));

const sizes = [
  [390, 844],
  [1024, 768],
  [1440, 900],
];
const modes = ['light', 'dark'];
const directions = ['quiet', 'desk', 'book'];
const views = [
  'overview',
  'tokens',
  'components',
  'compositions',
  'migration seam',
];
const failures = [];
const cases = [];

async function checkLaw(page, label, consoleErrors) {
  const result = await page.evaluate(() => {
    const badRadius = [];
    let largest = 0;
    for (const el of document.querySelectorAll('body *')) {
      if (!(el instanceof HTMLElement)) continue;
      if (!el.offsetParent && el.tagName !== 'BODY') continue;
      const size = parseFloat(getComputedStyle(el).fontSize);
      largest = Math.max(largest, size);
      const radius = getComputedStyle(el).borderRadius;
      if (radius && radius !== '0px')
        badRadius.push(`${el.tagName}.${el.className}: ${radius}`);
    }
    return {
      width: window.innerWidth,
      height: window.innerHeight,
      pageWidth: document.documentElement.scrollWidth,
      pageHeight: document.documentElement.scrollHeight,
      largest,
      badRadius: badRadius.slice(0, 4),
    };
  });
  if (result.pageWidth > result.width)
    failures.push(
      `${label}: horizontal page overflow ${result.pageWidth - result.width}px`,
    );
  if (result.pageHeight > result.height)
    failures.push(
      `${label}: vertical page scroll ${result.pageHeight - result.height}px`,
    );
  if (result.largest > 16.01)
    failures.push(`${label}: largest font ${result.largest}px exceeds 16px`);
  if (result.badRadius.length)
    failures.push(`${label}: non-zero radius ${result.badRadius.join(' | ')}`);
  if (consoleErrors.length)
    failures.push(`${label}: console ${consoleErrors.join(' | ')}`);
  cases.push({ label, result });
}

const browser = await chromium.launch();
for (const [w, h] of sizes) {
  for (const mode of modes) {
    const context = await browser.newContext({
      viewport: { width: w, height: h },
      colorScheme: mode,
    });
    const page = await context.newPage();
    const consoleErrors = [];
    page.on('console', (message) => {
      if (message.type() === 'error') consoleErrors.push(message.text());
    });
    page.on('pageerror', (error) => consoleErrors.push(String(error)));
    await page.goto('http://127.0.0.1:8127/gallery.html');
    await page.waitForLoadState('networkidle');

    for (const direction of directions) {
      await page.getByRole('button', { name: direction, exact: true }).click();
      for (const view of views) {
        await page.getByRole('button', { name: view, exact: true }).click();
        await checkLaw(
          page,
          `${mode} ${w}x${h} ${direction} ${view}`,
          consoleErrors,
        );
      }
    }

    if (w === 1440 && mode === 'light') {
      await page
        .getByRole('button', { name: 'components', exact: true })
        .click();
      await page.getByRole('tab', { name: 'overlays' }).click();
      const dialogTrigger = page.getByRole('button', { name: 'open dialog' });
      await dialogTrigger.click();
      const dialog = page.getByRole('dialog');
      await dialog.waitFor({ state: 'visible' });
      await page.keyboard.press('Escape');
      await dialog.waitFor({ state: 'hidden' });
      const menuTrigger = page.getByRole('button', { name: 'open menu' });
      await menuTrigger.click();
      const menu = page.getByRole('menu', { name: 'open menu' });
      await menu.waitFor({ state: 'visible' });
      await menu.getByRole('menuitemradio', { name: 'open registry' }).click();
      await page.keyboard.press('Escape');
      const themeTrigger = page.getByRole('button', {
        name: 'ultramarine',
        exact: true,
      });
      await themeTrigger.click();
      await page.getByRole('menuitemradio', { name: 'moss' }).click();
      await page.keyboard.press('Escape');
      const accent = await page.evaluate(() =>
        getComputedStyle(document.documentElement)
          .getPropertyValue('--primary')
          .trim(),
      );
      if (accent !== '#2f6b3f')
        failures.push(`theme dial expected moss, got ${accent}`);
      await page.getByRole('button', { name: 'Switch to dark mode' }).click();
      if (
        !(await page.evaluate(() =>
          document.documentElement.classList.contains('dark'),
        ))
      )
        failures.push('mode toggle did not enter dark mode');
      await page.getByRole('button', { name: 'Switch to light mode' }).click();

      await page
        .getByRole('button', { name: 'compositions', exact: true })
        .click();
      for (const tab of [
        'app shell',
        'form flow',
        'instrument desk',
        'paper dossier',
      ]) {
        await page.getByRole('tab', { name: new RegExp(`^${tab}`) }).click();
        if (
          !(await page
            .getByRole('tabpanel', { name: new RegExp(`^${tab}`) })
            .isVisible())
        )
          failures.push(`composition tab ${tab} did not open`);
      }
    }
    await context.close();
  }
}
await browser.close();
server.close();
console.log(`${cases.length} gallery cases, ${failures.length} failures`);
for (const failure of failures) console.log(`FAIL ${failure}`);
process.exit(failures.length ? 1 : 0);
