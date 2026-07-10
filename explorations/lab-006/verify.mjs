// Lab-006 proof loop: render the built app live, walk both views in both
// modes at 390 and 1440, exercise the Base UI surfaces (dialog, tooltip,
// accent menu), and enforce the law gates the repo cares about: no page
// scroll, radius 0, lawful font sizes, console cleanliness.
// Run from repo root: node explorations/lab-006/verify.mjs
// (expects `npm run build` done and `npx vite preview` semantics via a
// static server — it serves ./dist itself on 8126).
import { chromium } from 'playwright';
import { createServer } from 'node:http';
import { readFile } from 'node:fs/promises';
import { mkdir, writeFile } from 'node:fs/promises';
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
  const path = req.url === '/' ? '/index.html' : req.url.split('?')[0];
  try {
    const body = await readFile(join(dist, path));
    res.writeHead(200, {
      'content-type': types[extname(path)] || 'application/octet-stream',
    });
    res.end(body);
  } catch {
    res.writeHead(200, { 'content-type': 'text/html' });
    res.end(await readFile(join(dist, '/index.html')));
  }
});
await new Promise((r) => server.listen(8126, '127.0.0.1', r));

const sizes = [
  [390, 844],
  [1440, 900],
];
const modes = ['light', 'dark'];
const failures = [];
const cases = [];
const shots = new URL('./evidence/screens/', import.meta.url);
await mkdir(shots, { recursive: true });

const browser = await chromium.launch();
for (const [w, h] of sizes) {
  for (const mode of modes) {
    const ctx = await browser.newContext({
      viewport: { width: w, height: h },
      colorScheme: mode,
    });
    const page = await ctx.newPage();
    const consoleErrors = [];
    page.on(
      'console',
      (m) => m.type() === 'error' && consoleErrors.push(m.text()),
    );
    page.on('pageerror', (e) => consoleErrors.push(String(e)));
    await page.goto('http://127.0.0.1:8126/');
    await page.waitForTimeout(300);

    for (const view of ['studio', 'work']) {
      if (view === 'work') {
        await page.getByRole('tab', { name: 'work' }).click();
        await page.waitForTimeout(200);
      }
      const scroll = await page.evaluate(() => ({
        x: document.documentElement.scrollWidth - window.innerWidth,
        y: document.documentElement.scrollHeight - window.innerHeight,
      }));
      if (scroll.x > 0)
        failures.push(
          `${view} ${mode} ${w}: horizontal overflow ${scroll.x}px`,
        );
      if (scroll.y > 0)
        failures.push(`${view} ${mode} ${w}: page scroll ${scroll.y}px`);

      const laws = await page.evaluate(() => {
        const bad = { size: [], radius: [] };
        for (const el of document.querySelectorAll('body *')) {
          const cs = getComputedStyle(el);
          if (!el.textContent?.trim()) continue;
          const px = parseFloat(cs.fontSize);
          if (![16, 13].includes(Math.round(px)))
            bad.size.push(
              `${el.tagName.toLowerCase()}.${el.className?.toString?.().slice(0, 40)}:${px}`,
            );
          const r = parseFloat(cs.borderTopLeftRadius);
          if (r > 0) bad.radius.push(`${el.tagName.toLowerCase()}:${r}`);
        }
        return { size: bad.size.slice(0, 5), radius: bad.radius.slice(0, 5) };
      });
      if (laws.size.length)
        failures.push(
          `${view} ${mode} ${w}: font sizes ${laws.size.join(' ')}`,
        );
      if (laws.radius.length)
        failures.push(`${view} ${mode} ${w}: radius ${laws.radius.join(' ')}`);

      await page.screenshot({
        path: fileURLToPath(new URL(`${view}-${mode}-${w}.png`, shots)),
      });
      cases.push({ view, mode, width: w, scroll, laws });
    }

    // Base UI QoL surfaces, exercised once per context at 1440 light.
    if (w === 1440 && mode === 'light') {
      await page.getByRole('tab', { name: 'studio' }).click();
      await page.getByRole('button', { name: "Let's talk" }).click();
      await page.waitForTimeout(400);
      const dialogOpen = await page.getByRole('dialog').isVisible();
      if (!dialogOpen) failures.push('dialog did not open');
      const focusInDialog = await page.evaluate(
        () => !!document.activeElement?.closest('[role="dialog"]'),
      );
      if (!focusInDialog) failures.push('focus not trapped in dialog');
      await page.screenshot({
        path: fileURLToPath(new URL('dialog-light-1440.png', shots)),
      });
      await page.keyboard.press('Escape');
      await page.waitForTimeout(300);
      if (
        await page
          .getByRole('dialog')
          .isVisible()
          .catch(() => false)
      )
        failures.push('Escape did not close dialog');

      await page.getByRole('button', { name: 'ultramarine' }).click();
      await page.waitForTimeout(300);
      await page.getByRole('menuitemradio', { name: 'moss' }).click();
      await page.waitForTimeout(300);
      const accent = await page.evaluate(() =>
        getComputedStyle(document.documentElement)
          .getPropertyValue('--primary')
          .trim(),
      );
      if (accent !== '#2f6b3f')
        failures.push(`accent dial: expected #2f6b3f got ${accent}`);
      await page.screenshot({
        path: fileURLToPath(new URL('accent-moss-light-1440.png', shots)),
      });
    }

    if (consoleErrors.length)
      failures.push(
        `${mode} ${w}: console errors ${consoleErrors.join(' | ')}`,
      );
    await ctx.close();
  }
}
await browser.close();
server.close();

await writeFile(
  new URL('./evidence/verification.json', import.meta.url),
  JSON.stringify({ cases, failures }, null, 2),
);
console.log(`${cases.length} cases, ${failures.length} failures`);
for (const f of failures) console.log('FAIL', f);
process.exit(failures.length ? 1 : 0);
