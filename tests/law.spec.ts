import { test, expect } from '@playwright/test';
import {
  assertLaw,
  collectConsoleErrors,
  checkRadius,
  checkFontSize,
} from '../law/index.js';

/* the law, mechanically: every stable page, both modes —
   · nothing renders larger than the one size (heavier, never larger)
   · radius is 0 everywhere
   · the page itself never scrolls (stages and desks scroll inside)
   · static text keeps the default cursor
   · the console stays clean
   Screenshots of every page×mode land in test-results/ as evidence.

   The five invariants live in law/ — the shipped consumer gate. This
   test dogfoods the same code consumers import via
   '@misty-step/aesthetic/law'. */

const PAGES = [
  { path: '/site/', name: 'manual' },
  { path: '/site/primitives.html', name: 'catalog' },
  { path: '/site/steering.html', name: 'steering' },
  { path: '/site/tokens.html', name: 'tokens' },
  { path: '/site/gauntlet/dashboard.html', name: 'dashboard' },
  { path: '/site/gauntlet/docs.html', name: 'docs' },
  { path: '/site/gauntlet/settings.html', name: 'settings' },
];

const MODES = ['light', 'dark'] as const;

for (const { path, name } of PAGES) {
  for (const mode of MODES) {
    test(`${name} · ${mode} · the law holds`, async ({ page }) => {
      const errors = collectConsoleErrors(page);

      await page.addInitScript((m: string) => {
        localStorage.setItem('ae-mode', m);
      }, mode);
      await page.goto(path);
      await page.waitForLoadState('networkidle');

      // the law (5 invariants from the shipped gate)
      await assertLaw(page, { consoleErrors: errors });

      // the mode actually resolved (aesthetic-specific, not a law invariant)
      const dark = await page.evaluate(() =>
        document.documentElement.classList.contains('dark'),
      );
      expect(dark).toBe(mode === 'dark');

      await page.screenshot({
        path: `test-results/screens/${name}-${mode}.png`,
        fullPage: false,
      });
    });
  }
}

// the v2.6 instrument routes are hash-routed detail views; the base catalog
// check skips hidden views for font size (the offsetParent guard), so the
// one-size law on each is otherwise unverified until it is the active route.
// Drive each route and assert the law on the now-visible view, both modes.
const INSTRUMENT_ROUTES = ['interval', 'plot', 'flow', 'report'];
for (const route of INSTRUMENT_ROUTES) {
  for (const mode of MODES) {
    test(`catalog #${route} · ${mode} · the law holds`, async ({ page }) => {
      const errors = collectConsoleErrors(page);

      await page.addInitScript((m: string) => {
        localStorage.setItem('ae-mode', m);
      }, mode);
      await page.goto(`/site/primitives.html#${route}`);
      await page.waitForLoadState('networkidle');
      await expect(page.locator(`[data-route="${route}"]`)).toBeVisible();

      await assertLaw(page, { consoleErrors: errors });
    });
  }
}

// the state matrices: each interactive primitive's detail view shows the
// control in every state (disabled / error / resolved / …). The gate runs
// against the whole fan, so an off-law state — a filled pill, a rounded box,
// a second size — fails. A catalog that only shows the happy path lets the
// drift land exactly where the gate never looks (012).
const STATE_ROUTES = [
  'buttons',
  'choice',
  'validation',
  'toast',
  'meter',
  'table',
  'settings',
  'waiting',
  'interval',
];
for (const route of STATE_ROUTES) {
  for (const mode of MODES) {
    test(`catalog #${route} states · ${mode} · the law holds`, async ({
      page,
    }) => {
      const errors = collectConsoleErrors(page);

      await page.addInitScript((m: string) => {
        localStorage.setItem('ae-mode', m);
      }, mode);
      await page.goto(`/site/primitives.html#${route}`);
      await page.waitForLoadState('networkidle');
      await expect(
        page.locator(`[data-route="${route}"] .states`),
      ).toBeVisible();

      // the matrix is actually a matrix — more than one state cell.
      // A regression to single-state happy-path would pass the law
      // checks but fail here, preventing the rubber-stamp the gate
      // exists to prevent.
      const stateCount = await page
        .locator(`[data-route="${route}"] .states .state`)
        .count();
      expect(stateCount, `${route} must show multiple states`).toBeGreaterThan(
        1,
      );

      await assertLaw(page, { consoleErrors: errors });
    });
  }
}

test('the state-matrix gate catches a planted off-law state', async ({
  page,
}) => {
  await page.goto('/site/primitives.html#buttons');
  await expect(page.locator('[data-route="buttons"] .states')).toBeVisible();
  // baseline: the fan is clean
  expect((await checkRadius(page)).pass).toBe(true);
  expect((await checkFontSize(page)).pass).toBe(true);

  // plant an off-law state into the fan: a rounded, oversized button
  await page.evaluate(() => {
    const demo = document.querySelector(
      '[data-route="buttons"] .state-demo',
    ) as HTMLElement;
    const bad = document.createElement('button');
    bad.className = 'ae-button';
    bad.style.borderRadius = '9px';
    bad.style.fontSize = '20px';
    bad.textContent = 'off-law';
    demo.appendChild(bad);
  });

  // the gate must now flag both violations — it is not theater
  expect((await checkRadius(page)).pass).toBe(false);
  expect((await checkFontSize(page)).pass).toBe(false);
});

test('the send moment resolves once and announces', async ({ page }) => {
  await page.goto('/site/');
  const email = page.locator('#email');
  await email.scrollIntoViewIfNeeded();
  await email.fill('reader@example.com');
  await page.locator('.ae-send').click();
  await expect(page.locator('.ae-send')).toBeDisabled();
  await expect(page.locator('.ae-send')).toHaveClass(/is-sent/);
  await expect(page.locator('.ae-sr[role="status"]')).toHaveText(/sent/i);
});

test('the catalog routes by hash and the toggle flips the mode', async ({
  page,
}) => {
  await page.goto('/site/primitives.html#meter');
  await expect(page.locator('[data-route="meter"]')).toBeVisible();
  await expect(page.locator('[data-route="index"]')).toBeHidden();

  await page.locator('.ae-mode').first().click();
  // the flip runs inside startViewTransition's async update callback —
  // poll rather than read immediately
  await expect
    .poll(() =>
      page.evaluate(() =>
        document.documentElement.classList.contains('dark')
          ? 'dark'
          : document.documentElement.classList.contains('light')
            ? 'light'
            : 'none',
      ),
    )
    .not.toBe('none');
});

test('the catalog copy button copies the clean canonical markup', async ({
  page,
  context,
}) => {
  await context.grantPermissions(['clipboard-read', 'clipboard-write']);
  await page.goto('/site/primitives.html#buttons');
  const view = page.locator('[data-route="buttons"]');
  await expect(view).toBeVisible();

  const btn = view.locator('.src-copy').first();
  await expect(btn).toHaveText('copy');
  await btn.click();
  await expect(btn).toHaveText('copied');

  // the clipboard holds the source block's text: real, unescaped markup with
  // the syntax-highlight wrappers flattened away (content spans stay)
  const code = (await view.locator('pre.src-code').first().textContent()) ?? '';
  const clip = await page.evaluate(() => navigator.clipboard.readText());
  expect(clip.trim()).toBe(code.trim());
  expect(clip).toContain('<button class="ae-button'); // unescaped, runnable
  expect(clip).not.toContain('&lt;'); // entities decoded
  expect(clip).not.toContain('class="t"'); // highlight wrappers gone

  // the ack resolves once, then reverts so it can copy again
  await expect(btn).toHaveText('copy', { timeout: 2500 });
});

test('the catalog index filters by query, and / focuses the field', async ({
  page,
}) => {
  await page.goto('/site/primitives.html');
  const field = page.locator('.idx-filter');
  await expect(field).toBeVisible(); // JS-injected; no-JS keeps the full table
  const rows = page.locator('.idx > tbody > tr');
  const total = await rows.count();

  // `/` focuses the filter from the index
  await page.keyboard.press('/');
  await expect(field).toBeFocused();

  // typing narrows the table
  await field.fill('meter');
  const hits = () =>
    rows.evaluateAll((trs) => trs.filter((t) => !t.hidden).length);
  const narrowed = await hits();
  expect(narrowed).toBeGreaterThan(0);
  expect(narrowed).toBeLessThan(total);

  // clearing restores every row
  await field.fill('');
  expect(await hits()).toBe(total);
});
