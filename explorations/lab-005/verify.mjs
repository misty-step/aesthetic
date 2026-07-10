import { chromium } from 'playwright';
import { mkdir, writeFile } from 'node:fs/promises';
import carry from './lanes/carry.js';
import minimal from './lanes/minimal.js';
import hallmark from './lanes/hallmark.js';
import taste from './lanes/taste.js';
import anthropic from './lanes/anthropic.js';
import redesign from './lanes/redesign.js';
import impeccable from './lanes/impeccable.js';
const allSpecs = [
    ...carry,
    ...[minimal, hallmark, taste, anthropic, redesign, impeccable].flatMap(
      (x) => (Array.isArray(x) ? x : [x]),
    ),
  ],
  retainedIds = ['CARRY-QR', 'CARRY-CF', 'PGM-1', 'PGA-1', 'PGR-1', 'PGI-1'],
  specs = allSpecs.filter((item) => retainedIds.includes(item.id)),
  base = process.env.LAB_URL || 'http://127.0.0.1:8127/explorations/lab-005',
  sizes = [
    [390, 844],
    [1440, 900],
  ],
  modes = ['light', 'dark'],
  cases = [],
  failures = [];
await mkdir(new URL('./evidence/screens/', import.meta.url), {
  recursive: true,
});
if (allSpecs.length !== 8)
  failures.push(`expected 8 raw options, got ${allSpecs.length}`);
if (specs.length !== 6)
  failures.push(`expected 6 retained options, got ${specs.length}`);
const browser = await chromium.launch({ headless: true });
for (const spec of specs)
  for (const [width, height] of sizes)
    for (const mode of modes) {
      const page = await browser.newPage({ viewport: { width, height } }),
        errors = [];
      page.on('console', (m) => m.type() === 'error' && errors.push(m.text()));
      page.on('pageerror', (e) => errors.push(e.message));
      await page.goto(`${base}/frame.html?id=${spec.id}&mode=${mode}`, {
        waitUntil: 'networkidle',
      });
      for (const view of ['studio', 'work']) {
        if (view === 'work') await page.locator('[data-view="work"]').click();
        const metric = await page.evaluate(() => {
          const site = document.querySelector('.site'),
            marks = [...document.querySelectorAll('.status-mark path')],
            labels = [
              ...document.querySelectorAll('.status-item>span:last-child'),
            ];
          return {
            ready: window.__LAB_READY__,
            view: document.querySelector('[data-view][aria-current]')?.dataset
              .view,
            overflow: document.documentElement.scrollWidth - innerWidth,
            scroll: document.documentElement.scrollHeight - innerHeight,
            statuses: marks.length,
            unique: new Set(marks.map((p) => p.getAttribute('d'))).size,
            labelsInk: labels.every(
              (label) =>
                getComputedStyle(label).color === getComputedStyle(site).color,
            ),
            projects: document.querySelectorAll('.work-row').length,
            actionRadius: getComputedStyle(
              document.querySelector('.action') || document.body,
            ).borderRadius,
          };
        });
        const pass =
          metric.ready?.id === spec.id &&
          metric.ready?.mode === mode &&
          metric.view === view &&
          metric.overflow <= 1 &&
          metric.scroll <= 1 &&
          metric.statuses === 5 &&
          metric.unique === 5 &&
          metric.labelsInk &&
          (view === 'studio' || metric.projects === 5) &&
          (view !== 'studio' || metric.actionRadius === '0px') &&
          !errors.length;
        cases.push({
          id: spec.id,
          width,
          height,
          mode,
          view,
          pass,
          metric,
          errors,
        });
        if (!pass)
          failures.push(
            `${spec.id} ${width} ${mode} ${view}: ${JSON.stringify({ metric, errors })}`,
          );
        if (mode === 'light' || width === 1440)
          await page.screenshot({
            path: new URL(
              `./evidence/screens/${spec.id}-${width}-${mode}-${view}.png`,
              import.meta.url,
            ).pathname,
          });
      }
      await page.close();
    }
await browser.close();
const report = {
  generatedAt: new Date().toISOString(),
  registry: { total: specs.length, raw: allSpecs.length, carried: 2, blind: 6 },
  cases: cases.length,
  passed: cases.filter((c) => c.pass).length,
  failures,
  cases,
};
await writeFile(
  new URL('./evidence/verification.json', import.meta.url),
  JSON.stringify(report, null, 2),
);
console.log(
  JSON.stringify(
    {
      registry: report.registry,
      cases: report.cases.length,
      passed: report.passed,
      failures: failures.length,
    },
    null,
    2,
  ),
);
if (failures.length) process.exit(1);
