import { chromium } from '@playwright/test';
import { createServer } from 'node:http';
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { extname, join, normalize } from 'node:path';

const repo = new URL('../../', import.meta.url).pathname.replace(/\/$/, '');
const labUrl = 'http://127.0.0.1:8125/explorations/lab-002/';
const types = {
  '.html': 'text/html',
  '.js': 'text/javascript',
  '.mjs': 'text/javascript',
  '.css': 'text/css',
  '.json': 'application/json',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
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

await new Promise((resolve) => server.listen(8125, '127.0.0.1', resolve));
const browser = await chromium.launch();
const page = await browser.newPage({
  viewport: { width: 1680, height: 1120 },
  deviceScaleFactor: 1,
});
const consoleErrors = [];
page.on('console', (message) => {
  if (message.type() === 'error') consoleErrors.push(message.text());
});
page.on('pageerror', (error) => consoleErrors.push(error.message));
const results = [];

async function selectedReady(id) {
  await page.waitForFunction(
    (expected) =>
      document.querySelector('#screen')?.contentWindow?.__LAB_READY__?.id ===
      expected,
    id,
  );
}

async function galleryMetrics() {
  return page
    .locator('#screen')
    .contentFrame()
    .locator('#gallery')
    .contentFrame()
    .locator('html')
    .evaluate(() => {
      const all = [...document.querySelectorAll('body *')];
      const nonzeroRadii = all
        .map((element) => getComputedStyle(element).borderRadius)
        .filter((value) => value !== '0px');
      const oversized = all
        .map((element) => Number.parseFloat(getComputedStyle(element).fontSize))
        .filter((value) => value > 16.1);
      return {
        width: innerWidth,
        height: innerHeight,
        scrollWidth: document.documentElement.scrollWidth,
        bodyScrollWidth: document.body.scrollWidth,
        cards: document.querySelectorAll('.gal-card[href^="#"]').length,
        routes: document.querySelectorAll('.ae-view[data-route]').length,
        visibleViews: document.querySelectorAll('.ae-view.is-on').length,
        nonzeroRadii: [...new Set(nonzeroRadii)],
        oversized: [...new Set(oversized)],
        option: document.documentElement.dataset.labOption,
        mode: document.documentElement.classList.contains('dark')
          ? 'dark'
          : 'light',
      };
    });
}

try {
  await page.goto(labUrl, { waitUntil: 'networkidle' });
  await page.waitForFunction(
    () =>
      Array.isArray(window.__LAB_OPTIONS__) &&
      window.__LAB_OPTIONS__.length >= 13 &&
      Array.isArray(window.__LAB_RAW_OPTIONS__) &&
      window.__LAB_RAW_OPTIONS__.length === 18,
  );
  const options = await page.evaluate(() => window.__LAB_OPTIONS__);
  const rawCandidates = await page.evaluate(() => window.__LAB_RAW_OPTIONS__);
  const candidates = options.filter((option) => option.id !== 'BASE-1');
  const laneCounts = Object.groupBy(
    rawCandidates,
    (option) => option.id.split('-')[0],
  );
  if (candidates.length < 12 || candidates.length > 20)
    throw new Error(`retained candidate count: ${candidates.length}`);
  if (new Set(candidates.map((option) => option.id.split('-')[0])).size !== 6)
    throw new Error('retained catalog does not represent all six lanes');
  if (Object.keys(laneCounts).length !== 6)
    throw new Error(`lane count: ${Object.keys(laneCounts).length}`);
  for (const [lane, entries] of Object.entries(laneCounts)) {
    if (entries.length !== 3)
      throw new Error(`${lane} raw proposals: ${entries.length}`);
  }
  if (
    new Set(candidates.map((option) => option.title)).size !== candidates.length
  )
    throw new Error('candidate titles are not unique');

  const focusIndicator = await page
    .locator('[data-index="0"]')
    .evaluate((button) => {
      button.focus();
      const style = getComputedStyle(button);
      return {
        outlineStyle: style.outlineStyle,
        outlineWidth: style.outlineWidth,
      };
    });
  if (
    focusIndicator.outlineStyle !== 'solid' ||
    Number.parseFloat(focusIndicator.outlineWidth) < 2
  )
    throw new Error('registry focus indicator failed');

  await mkdir(new URL('./evidence/retained/', import.meta.url), {
    recursive: true,
  });
  for (const viewport of ['390x844', '1440x900']) {
    await page.selectOption('#viewport', viewport);
    const expectedWidth = Number(viewport.split('x')[0]);
    for (const mode of ['light', 'dark']) {
      const modeButton = page.locator('#mode');
      if ((await modeButton.textContent()) !== `mode: ${mode}`)
        await modeButton.click();
      for (const [index, option] of options.entries()) {
        await page.click(`[data-index="${index}"]`);
        await selectedReady(option.id);
        const metrics = await galleryMetrics();
        const pass =
          metrics.width === expectedWidth &&
          metrics.scrollWidth <= metrics.width &&
          metrics.bodyScrollWidth <= metrics.width &&
          metrics.cards >= 33 &&
          metrics.routes === metrics.cards + 1 &&
          metrics.visibleViews === 1 &&
          metrics.nonzeroRadii.length === 0 &&
          metrics.oversized.length === 0 &&
          metrics.option === option.id &&
          metrics.mode === mode;
        results.push({ option: option.id, viewport, mode, pass, metrics });
        if (!pass)
          throw new Error(
            `render gate ${option.id} ${viewport} ${mode}: ${JSON.stringify(metrics)}`,
          );
        await page.locator('#screen').screenshot({
          path: new URL(
            `./evidence/retained/${option.id}-${expectedWidth}-${mode}.png`,
            import.meta.url,
          ).pathname,
        });
      }
    }
  }

  await page.selectOption('#viewport', '1440x900');
  if ((await page.locator('#mode').textContent()) !== 'mode: light')
    await page.locator('#mode').click();
  await page.click('[data-index="1"]');
  await selectedReady(options[1].id);
  const galleryFrame = page
    .locator('#screen')
    .contentFrame()
    .locator('#gallery')
    .contentFrame();
  const firstHref = await galleryFrame
    .locator('.gal-card')
    .first()
    .getAttribute('href');
  await galleryFrame.locator('.gal-card').first().click();
  await galleryFrame
    .locator(`.ae-view[data-route="${firstHref.slice(1)}"]`)
    .waitFor({ state: 'visible' });
  await page.screenshot({
    path: new URL('./evidence/catalog-desktop.png', import.meta.url).pathname,
  });
  await page.selectOption('#viewport', '390x844');
  await page.click(`[data-index="${options.length - 1}"]`);
  await selectedReady(options.at(-1).id);
  await page.screenshot({
    path: new URL('./evidence/catalog-phone.png', import.meta.url).pathname,
  });

  const report = {
    generated_at: new Date().toISOString(),
    lab_url: labUrl,
    option_count: options.length,
    raw_candidate_count: rawCandidates.length,
    candidate_count: candidates.length,
    lanes: Object.fromEntries(
      Object.entries(laneCounts).map(([lane, entries]) => [
        lane,
        entries.length,
      ]),
    ),
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
    `${JSON.stringify(report, null, 2)}\n`,
  );
  if (!report.passed)
    throw new Error(`console errors: ${consoleErrors.join(' | ')}`);
  console.log(
    JSON.stringify(
      {
        option_count: options.length,
        raw_candidate_count: rawCandidates.length,
        candidate_count: candidates.length,
        lanes: report.lanes,
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
