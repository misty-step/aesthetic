import { chromium } from '@playwright/test';
import { createServer } from 'node:http';
import { readFile, mkdir, writeFile } from 'node:fs/promises';
import { extname, join, normalize } from 'node:path';

const repo = new URL('../../', import.meta.url).pathname.replace(/\/$/, '');
const labUrl = 'http://127.0.0.1:8124/explorations/lab-001/';
const types = {
  '.html': 'text/html',
  '.js': 'text/javascript',
  '.mjs': 'text/javascript',
  '.css': 'text/css',
  '.json': 'application/json',
  '.svg': 'image/svg+xml',
};
const server = createServer(async (request, response) => {
  try {
    const pathname = decodeURIComponent(new URL(request.url, labUrl).pathname);
    const relative =
      pathname === '/' ? 'index.html' : pathname.replace(/^\//, '');
    const safe = normalize(join(repo, relative));
    if (!safe.startsWith(repo)) throw new Error('outside repo');
    const file = safe.endsWith('/') ? join(safe, 'index.html') : safe;
    response.writeHead(200, {
      'Content-Type': types[extname(file)] || 'application/octet-stream',
      'Cache-Control': 'no-store',
    });
    response.end(await readFile(file));
  } catch (error) {
    response.writeHead(404, {
      'Content-Type': 'text/plain',
      'Cache-Control': 'no-store',
    });
    response.end(String(error));
  }
});

await new Promise((resolve) => server.listen(8124, '127.0.0.1', resolve));
const browser = await chromium.launch();
const page = await browser.newPage({
  viewport: { width: 1600, height: 1100 },
  deviceScaleFactor: 1,
});
const consoleErrors = [];
page.on('console', (message) => {
  if (message.type() === 'error') consoleErrors.push(message.text());
});
page.on('pageerror', (error) => consoleErrors.push(error.message));

const results = [];
try {
  await page.goto(labUrl, { waitUntil: 'networkidle' });
  await page.waitForFunction(
    () =>
      Array.isArray(window.__LAB_OPTIONS__) &&
      window.__LAB_OPTIONS__.length >= 6,
  );
  const options = await page.evaluate(() => window.__LAB_OPTIONS__);
  if (options.length < 6 || options.length > 20)
    throw new Error(`Design Labs Law count failed: ${options.length}`);
  const focusIndicator = await page
    .locator('[data-index="0"]')
    .evaluate((button) => {
      button.focus();
      const style = getComputedStyle(button);
      return {
        outlineStyle: style.outlineStyle,
        outlineWidth: style.outlineWidth,
        outlineColor: style.outlineColor,
      };
    });
  if (
    focusIndicator.outlineStyle !== 'solid' ||
    Number.parseFloat(focusIndicator.outlineWidth) < 2
  )
    throw new Error(
      `registry focus indicator failed: ${JSON.stringify(focusIndicator)}`,
    );

  for (const viewport of ['1440x900', '390x844']) {
    await page.selectOption('#viewport', viewport);
    for (const app of ['crucible', 'powder']) {
      await page.click(`[data-app="${app}"]`);
      for (const mode of ['light', 'dark']) {
        const modeButton = page.locator('#mode');
        if ((await modeButton.textContent()) !== `mode: ${mode}`)
          await modeButton.click();
        for (const [index, option] of options.entries()) {
          await page.click(`[data-index="${index}"]`);
          const iframe = page.locator('#screen');
          await page.waitForFunction(
            (id) =>
              document.querySelector('#screen')?.contentWindow?.__LAB_READY__
                ?.id === id,
            option.id,
          );
          const metrics = await iframe
            .contentFrame()
            .locator('html')
            .evaluate(() => {
              const all = [...document.querySelectorAll('body *')];
              const radii = all
                .map((element) => getComputedStyle(element).borderRadius)
                .filter((value) => value !== '0px');
              const oversized = all
                .map((element) =>
                  Number.parseFloat(getComputedStyle(element).fontSize),
                )
                .filter((value) => value > 16.1);
              return {
                width: innerWidth,
                height: innerHeight,
                scrollWidth: document.documentElement.scrollWidth,
                scrollHeight: document.documentElement.scrollHeight,
                radii: [...new Set(radii)],
                oversized: [...new Set(oversized)],
                mark: document.querySelector('.lab-brand [data-lucide]')
                  ?.dataset.lucide,
              };
            });
          const expected = viewport.split('x').map(Number);
          const expectedMark =
            app === 'crucible' ? 'flask-conical' : 'snowflake';
          const pass =
            metrics.width === expected[0] &&
            metrics.height === expected[1] &&
            metrics.scrollWidth <= metrics.width &&
            metrics.scrollHeight <= metrics.height &&
            metrics.radii.length === 0 &&
            metrics.oversized.length === 0 &&
            (metrics.mark == null || metrics.mark === expectedMark);
          results.push({
            option: option.id,
            app,
            viewport,
            mode,
            pass,
            metrics,
          });
          if (!pass)
            throw new Error(
              `render gate failed ${option.id} ${app} ${viewport} ${mode}: ${JSON.stringify(metrics)}`,
            );
        }
      }
    }
  }

  if ((await page.locator('#mode').textContent()) !== 'mode: light')
    await page.locator('#mode').click();
  await page.selectOption('#viewport', '1440x900');
  await page.click('[data-app="crucible"]');
  await page.click('[data-index="0"]');
  await page.waitForFunction(
    () =>
      document.querySelector('#screen')?.contentWindow?.__LAB_READY__?.id ===
      'BASE-1',
  );
  await mkdir(new URL('./evidence/', import.meta.url), { recursive: true });
  await page.screenshot({
    path: new URL('./evidence/catalog-desktop.png', import.meta.url).pathname,
  });
  await page.selectOption('#viewport', '390x844');
  await page.click('[data-app="powder"]');
  const targetIndex = options.findIndex((option) => option.id === 'BRUT-2');
  await page.click(
    `[data-index="${targetIndex >= 0 ? targetIndex : options.length - 1}"]`,
  );
  await page.waitForFunction(
    () =>
      document.querySelector('#screen')?.contentWindow?.__LAB_READY__?.id ===
      'BRUT-2',
  );
  await page.screenshot({
    path: new URL('./evidence/catalog-phone.png', import.meta.url).pathname,
  });

  const commandFrame = page.locator('#screen').contentFrame();
  await commandFrame.locator('.js-command').click();
  if (
    (await commandFrame.locator('.lab-command').getAttribute('hidden')) !== null
  )
    throw new Error('command palette did not open');
  await commandFrame.locator('body').press('Escape');
  if (
    (await commandFrame.locator('.lab-command').getAttribute('hidden')) === null
  )
    throw new Error('command palette did not close');

  const report = {
    generated_at: new Date().toISOString(),
    lab_url: labUrl,
    option_count: options.length,
    options,
    cases: results.length,
    passed:
      results.every((result) => result.pass) && consoleErrors.length === 0,
    focus_indicator: focusIndicator,
    console_errors: consoleErrors,
    results,
  };
  await writeFile(
    new URL('./evidence/verify.json', import.meta.url),
    JSON.stringify(report, null, 2) + '\n',
  );
  if (!report.passed)
    throw new Error(`console errors: ${consoleErrors.join(' | ')}`);
  console.log(
    JSON.stringify(
      {
        option_count: options.length,
        cases: results.length,
        passed: report.passed,
        console_errors: consoleErrors.length,
      },
      null,
      2,
    ),
  );
} finally {
  await browser.close();
  await new Promise((resolve) => server.close(resolve));
}
