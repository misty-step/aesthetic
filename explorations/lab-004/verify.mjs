import { chromium } from 'playwright';
import { mkdir, writeFile } from 'node:fs/promises';
import { SPECS as baseline } from './lanes/baseline.js';
import minimal from './lanes/minimal.js';
import taste from './lanes/taste.js';
import redesign from './lanes/redesign.js';
import anthropic from './lanes/anthropic.js';
import hallmark from './lanes/hallmark.js';
import impeccable from './lanes/impeccable.js';
import { RETAINED_IDS } from './retention.js';
const rawSpecs = [
  ...Object.values(baseline),
  ...minimal,
  ...taste,
  ...redesign,
  ...anthropic,
  ...hallmark,
  ...impeccable,
];
const specs = [
  rawSpecs[0],
  ...rawSpecs.filter((spec) => RETAINED_IDS.includes(spec.id)),
];
const base =
  process.env.LAB_URL || 'http://127.0.0.1:8127/explorations/lab-004';
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
for (const prefix of [
  'R2MIN',
  'R2TASTE',
  'R2RED',
  'R2ANTH',
  'R2HALL',
  'R2IMP',
]) {
  const n = rawSpecs.filter((s) => s.id.startsWith(prefix + '-')).length;
  if (n !== 3) failures.push(`${prefix} expected 3, got ${n}`);
}
await mkdir(new URL('./evidence/retained/', import.meta.url), {
  recursive: true,
});
await mkdir(new URL('./evidence/buttons/', import.meta.url), {
  recursive: true,
});
await mkdir(new URL('./evidence/corpus/', import.meta.url), {
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
      const metric = await page.evaluate(() => {
        const rect = (element) => element?.getBoundingClientRect();
        const buttonBoard = document.querySelector('.button-board');
        const buttonArticles = [
          ...document.querySelectorAll('.button-board > article'),
        ];
        const buttons = [...document.querySelectorAll('.button-lab .btn')];
        const badges = [...document.querySelectorAll('.badge')];
        const loadingMark = document.querySelector('.button-lab .loading-mark');
        const header = document.querySelector('.future-hero .type-display');
        return {
          ready: window.__LAB_READY__,
          inner: innerWidth,
          overflow: document.documentElement.scrollWidth - innerWidth,
          root: document.querySelectorAll('.future-root').length,
          buttons: buttons.length,
          visibleButtons: buttons.filter((button) => {
            const box = rect(button);
            const style = getComputedStyle(button);
            return (
              box.width >= 20 &&
              box.height >= 20 &&
              style.visibility !== 'hidden' &&
              style.display !== 'none'
            );
          }).length,
          buttonArticles: buttonArticles.map((article) => ({
            width: rect(article).width,
            height: rect(article).height,
            overflow: article.scrollWidth - article.clientWidth,
          })),
          buttonBoardOverflow:
            buttonBoard.scrollWidth - buttonBoard.clientWidth,
          headerPx: parseFloat(getComputedStyle(header).fontSize),
          headerBox: { width: rect(header).width, height: rect(header).height },
          radii: buttons.map((button) => getComputedStyle(button).borderRadius),
          badgeLaw: badges.map((badge) => ({
            radius: getComputedStyle(badge).borderRadius,
            background: getComputedStyle(badge).backgroundColor,
          })),
          loadingMark: {
            width: rect(loadingMark)?.width || 0,
            height: rect(loadingMark)?.height || 0,
            animation: getComputedStyle(loadingMark).animationIterationCount,
          },
        };
      });
      const pass =
        metric.ready?.id === spec.id &&
        metric.ready?.mode === mode &&
        metric.ready?.sections === 7 &&
        metric.ready?.buttonStates === 10 &&
        metric.ready?.components >= 15 &&
        metric.ready?.states === 10 &&
        metric.ready?.compositions === 4 &&
        metric.ready?.products === 4 &&
        metric.inner === width &&
        metric.overflow <= 1 &&
        metric.root === 1 &&
        metric.buttons >= 10 &&
        metric.visibleButtons === metric.buttons &&
        metric.buttonArticles.length === 3 &&
        metric.buttonArticles.every(
          (article) =>
            article.width >= 100 &&
            article.height >= 100 &&
            article.overflow <= 1,
        ) &&
        metric.buttonBoardOverflow <= 1 &&
        metric.headerPx >= 32 &&
        metric.headerBox.width >= 100 &&
        metric.headerBox.height >= 24 &&
        metric.radii.every((radius) => radius === '0px') &&
        metric.badgeLaw.every(
          (badge) =>
            badge.radius === '0px' && badge.background === 'rgba(0, 0, 0, 0)',
        ) &&
        metric.loadingMark.width > 0 &&
        metric.loadingMark.height > 0 &&
        metric.loadingMark.animation !== 'infinite' &&
        !errors.length;
      const waived = spec.id === 'BASE-1' && !pass;
      const accepted = pass || waived;
      const record = {
        id: spec.id,
        width,
        height,
        mode,
        pass,
        waived,
        accepted,
        metric,
        errors,
      };
      cases.push(record);
      if (!accepted)
        failures.push(
          `${spec.id} ${width} ${mode}: ${JSON.stringify({ metric, errors })}`,
        );
      if (width === 390 || width === 1440)
        await page.screenshot({
          path: new URL(
            `./evidence/retained/${spec.id}-${width}-${mode}.png`,
            import.meta.url,
          ).pathname,
          fullPage: false,
        });
      if (width === 1440)
        await page.locator('#buttons').screenshot({
          path: new URL(
            `./evidence/buttons/${spec.id}-${mode}.png`,
            import.meta.url,
          ).pathname,
        });
      if (width === 1440 || width === 390) {
        await page.goto(
          `${base}/frame.html?id=${spec.id}&mode=${mode}&focus=components`,
          { waitUntil: 'networkidle' },
        );
        const corpus = await page.evaluate(() => {
          const cards = [...document.querySelectorAll('#components .specimen')];
          const visible = cards.filter((card) => {
            const box = card.getBoundingClientRect();
            const style = getComputedStyle(card);
            return (
              box.width >= 80 &&
              box.height >= 60 &&
              style.display !== 'none' &&
              style.visibility !== 'hidden'
            );
          });
          return {
            cards: cards.length,
            visible: visible.length,
            overflow: document.documentElement.scrollWidth - innerWidth,
            height: document.documentElement.scrollHeight,
          };
        });
        record.corpus = corpus;
        if (corpus.cards !== 16 || corpus.visible !== 16 || corpus.overflow > 1)
          failures.push(
            `${spec.id} ${width} ${mode} corpus: ${JSON.stringify(corpus)}`,
          );
        await page.screenshot({
          path: new URL(
            `./evidence/corpus/${spec.id}-${width}-${mode}.png`,
            import.meta.url,
          ).pathname,
          fullPage: true,
        });
      }
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
  candidatePassed: cases.filter((c) => c.pass && !c.waived).length,
  baselineWaived: cases.filter((c) => c.waived).length,
  accepted: cases.filter((c) => c.accepted).length,
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
      candidatePassed: report.candidatePassed,
      baselineWaived: report.baselineWaived,
      accepted: report.accepted,
      failures: failures.length,
    },
    null,
    2,
  ),
);
if (failures.length) process.exit(1);
