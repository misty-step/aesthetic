// Lab-006 proof loop, catalog edition: serve the built app, walk every
// rendered lane (A theme-map, B reskin, C aesthetic-native, D hybrid)
// in both views, both modes, at 390 and 1440; enforce the law gates (no
// page scroll, radius 0, lawful font sizes, console cleanliness) and
// exercise the Base UI surfaces (dialog trap/escape, accent dial) per
// lane. Run from repo root after `npm run build`:
//   node explorations/lab-006/verify.mjs
import { chromium } from 'playwright';
import { createServer } from 'node:http';
import { mkdir, readFile, writeFile } from 'node:fs/promises';
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
    res.writeHead(404);
    res.end('not found');
  }
});
await new Promise((r) => server.listen(8126, '127.0.0.1', r));

const lanes = [
  { id: 'a', accentAttr: '--primary', moss: '#2f6b3f' },
  { id: 'b', accentAttr: '--primary', moss: '#2f6b3f' },
  { id: 'c', accentAttr: '--ae-accent', moss: '#2f6b3f' },
  { id: 'd', accentAttr: '--ae-accent', moss: '#2f6b3f' },
];
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
for (const lane of lanes) {
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
      await page.goto(`http://127.0.0.1:8126/${lane.id}.html`);
      await page.waitForTimeout(350);

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
            `${lane.id} ${view} ${mode} ${w}: horizontal overflow ${scroll.x}px`,
          );
        if (scroll.y > 0)
          failures.push(
            `${lane.id} ${view} ${mode} ${w}: page scroll ${scroll.y}px`,
          );

        const laws = await page.evaluate(() => {
          const bad = { size: [], radius: [] };
          for (const el of document.querySelectorAll('body *')) {
            const cs = getComputedStyle(el);
            if (!el.textContent?.trim()) continue;
            const px = parseFloat(cs.fontSize);
            if (![16, 13].includes(Math.round(px)))
              bad.size.push(
                `${el.tagName.toLowerCase()}.${el.className
                  ?.toString?.()
                  .slice(0, 40)}:${px}`,
              );
            const r = parseFloat(cs.borderTopLeftRadius);
            if (r > 0) bad.radius.push(`${el.tagName.toLowerCase()}:${r}`);
          }
          return { size: bad.size.slice(0, 5), radius: bad.radius.slice(0, 5) };
        });
        if (laws.size.length)
          failures.push(
            `${lane.id} ${view} ${mode} ${w}: font sizes ${laws.size.join(' ')}`,
          );
        if (laws.radius.length)
          failures.push(
            `${lane.id} ${view} ${mode} ${w}: radius ${laws.radius.join(' ')}`,
          );

        await page.screenshot({
          path: fileURLToPath(
            new URL(`${lane.id}-${view}-${mode}-${w}.png`, shots),
          ),
        });
        cases.push({ lane: lane.id, view, mode, width: w, scroll, laws });
      }

      // Base UI QoL surfaces, exercised once per lane at 1440 light.
      if (w === 1440 && mode === 'light') {
        await page.getByRole('tab', { name: 'studio' }).click();
        await page.getByRole('button', { name: "Let's talk" }).click();
        await page.waitForTimeout(400);
        const dialogOpen = await page.getByRole('dialog').isVisible();
        if (!dialogOpen) failures.push(`${lane.id}: dialog did not open`);
        const focusInDialog = await page.evaluate(
          () => !!document.activeElement?.closest('[role="dialog"]'),
        );
        if (!focusInDialog)
          failures.push(`${lane.id}: focus not trapped in dialog`);
        await page.screenshot({
          path: fileURLToPath(
            new URL(`${lane.id}-dialog-light-1440.png`, shots),
          ),
        });
        await page.keyboard.press('Escape');
        await page.waitForTimeout(300);
        if (
          await page
            .getByRole('dialog')
            .isVisible()
            .catch(() => false)
        )
          failures.push(`${lane.id}: Escape did not close dialog`);

        await page.getByRole('button', { name: 'ultramarine' }).click();
        await page.waitForTimeout(300);
        await page.getByRole('menuitemradio', { name: 'moss' }).click();
        await page.waitForTimeout(300);
        const accent = await page.evaluate(
          (prop) =>
            getComputedStyle(document.documentElement)
              .getPropertyValue(prop)
              .trim(),
          lane.accentAttr,
        );
        if (accent !== lane.moss)
          failures.push(
            `${lane.id}: accent dial expected ${lane.moss} got ${accent}`,
          );
        await page.screenshot({
          path: fileURLToPath(
            new URL(`${lane.id}-accent-moss-light-1440.png`, shots),
          ),
        });
      }

      if (consoleErrors.length)
        failures.push(
          `${lane.id} ${mode} ${w}: console errors ${consoleErrors.join(' | ')}`,
        );
      await ctx.close();
    }
  }
}

// The catalog shell itself: loads, lists five lanes, swaps the frame.
{
  const ctx = await browser.newContext({
    viewport: { width: 1440, height: 900 },
  });
  const page = await ctx.newPage();
  const consoleErrors = [];
  page.on('pageerror', (e) => consoleErrors.push(String(e)));
  await page.goto('http://127.0.0.1:8126/index.html');
  await page.waitForTimeout(300);
  const options = await page.locator('.option').count();
  if (options !== 5) failures.push(`catalog: expected 5 lanes, got ${options}`);
  await page.locator('.option[data-id="C"]').click();
  await page.waitForTimeout(600);
  const src = await page.locator('#preview').getAttribute('src');
  if (!src?.includes('c.html'))
    failures.push(`catalog: lane C swap got ${src}`);
  await page.screenshot({
    path: fileURLToPath(new URL('catalog-1440.png', shots)),
  });
  if (consoleErrors.length)
    failures.push(`catalog: console errors ${consoleErrors.join(' | ')}`);
  await ctx.close();
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
