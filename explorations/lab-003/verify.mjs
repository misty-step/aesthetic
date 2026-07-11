import { chromium } from 'playwright';
import { mkdir, writeFile } from 'node:fs/promises';
import { SPECS as baseline } from './lanes/baseline.js';
import { SPECS as minimal } from './lanes/minimal.js';
import { SPECS as soft } from './lanes/soft.js';
import { SPECS as brutal } from './lanes/brutal.js';
import anthropic from './lanes/anthropic.js';
import hallmark from './lanes/hallmark.js';
import impeccable from './lanes/impeccable.js';
import { RETAINED_IDS } from './retention.js';
const rawSpecs = [
  ...Object.values(baseline),
  ...Object.values(minimal),
  ...Object.values(soft),
  ...Object.values(brutal),
  ...anthropic,
  ...hallmark,
  ...impeccable,
];
const specs = [
  rawSpecs[0],
  ...rawSpecs.filter((spec) => RETAINED_IDS.includes(spec.id)),
];
const base =
  process.env.LAB_URL || 'http://127.0.0.1:8127/explorations/lab-003';
const sizes = [
    [390, 844],
    [768, 1024],
    [1440, 900],
  ],
  modes = ['light', 'dark'],
  failures = [],
  cases = [];
if (rawSpecs.length !== 19)
  failures.push(`raw registry expected 19, got ${rawSpecs.length}`);
if (specs.length < 13 || specs.length > 21)
  failures.push(
    `retained registry expected baseline plus 12–20, got ${specs.length}`,
  );
for (const prefix of ['MIN', 'SOFT', 'BRUT', 'ANTH', 'HALL', 'IMP']) {
  const n = rawSpecs.filter((s) => s.id.startsWith(prefix + '-')).length;
  if (n !== 3) failures.push(`${prefix} expected 3, got ${n}`);
}
await mkdir(new URL('./evidence/retained/', import.meta.url), {
  recursive: true,
});
const browser = await chromium.launch({ headless: true });
for (const spec of specs) {
  for (const [width, height] of sizes) {
    for (const mode of modes) {
      const page = await browser.newPage({ viewport: { width, height } }),
        errors = [];
      page.on('console', (m) => {
        if (m.type() === 'error') errors.push(m.text());
      });
      page.on('pageerror', (e) => errors.push(e.message));
      await page.goto(`${base}/frame.html?id=${spec.id}&mode=${mode}`, {
        waitUntil: 'networkidle',
      });
      const metric = await page.evaluate(() => ({
        ready: window.__LAB_READY__,
        inner: innerWidth,
        overflow: document.documentElement.scrollWidth - innerWidth,
        root: document.querySelectorAll('.future-root').length,
      }));
      const pass =
        metric.ready?.id === spec.id &&
        metric.ready?.mode === mode &&
        metric.ready?.sections === 6 &&
        metric.ready?.components >= 15 &&
        metric.ready?.states === 10 &&
        metric.ready?.compositions === 4 &&
        metric.ready?.products === 4 &&
        metric.inner === width &&
        metric.overflow <= 1 &&
        metric.root === 1 &&
        !errors.length;
      cases.push({ id: spec.id, width, height, mode, pass, metric, errors });
      if (!pass)
        failures.push(
          `${spec.id} ${width} ${mode}: ${JSON.stringify({ metric, errors })}`,
        );
      if ((width === 390 || width === 1440) && mode === 'light')
        await page.screenshot({
          path: new URL(
            `./evidence/retained/${spec.id}-${width}.png`,
            import.meta.url,
          ).pathname,
          fullPage: false,
        });
      await page.close();
    }
  }
}
await browser.close();
const report = {
  generatedAt: new Date().toISOString(),
  base,
  registry: {
    total: specs.length,
    baseline: 1,
    raw: rawSpecs.length - 1,
    retained: specs.length - 1,
    lanes: 6,
  },
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
