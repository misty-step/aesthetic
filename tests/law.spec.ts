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
  { path: '/site/', name: 'gallery' },
  { path: '/site/tokens.html', name: 'tokens' },
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
      await page.goto(`/site/#${route}`);
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
      await page.goto(`/site/#${route}`);
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
  await page.goto('/site/#buttons');
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
  await page.goto('/site/#buttons');
  // the live demo form's control, not the static states-strip specimen
  const send = page.locator(
    '[data-route="buttons"] form[data-ae-demo] .ae-send',
  );
  await send.scrollIntoViewIfNeeded();
  await send.click();
  await expect(send).toBeDisabled();
  await expect(send).toHaveClass(/is-sent/);
  // two role="status" live regions exist on this page now: the send
  // recipe's own (no aria-live attribute — role="status" implies polite)
  // and the copy-button's ack (explicit aria-live="polite"). Disambiguate.
  await expect(
    page.locator('.ae-sr[role="status"]:not([aria-live])'),
  ).toHaveText(/sent/i);
});

test('the catalog routes by hash and the toggle flips the mode', async ({
  page,
}) => {
  await page.goto('/site/#meter');
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

test('the mode toggle stays enabled and honors rapid toggles', async ({
  page,
}) => {
  await page.addInitScript(() => {
    localStorage.setItem('ae-mode', 'light');
  });
  await page.goto('/site/#meter');

  const mode = page.locator('.ae-mode').first();
  await expect(mode).toBeEnabled();
  await expect(mode).not.toHaveAttribute('disabled', /.*/);

  const started = Date.now();
  await mode.evaluate((btn) => {
    (btn as HTMLButtonElement).click();
    (btn as HTMLButtonElement).click();
  });
  await expect(mode).toBeEnabled();

  await expect
    .poll(
      () =>
        page.evaluate(() => ({
          dark: document.documentElement.classList.contains('dark'),
          light: document.documentElement.classList.contains('light'),
          stored: localStorage.getItem('ae-mode'),
          easing:
            document.documentElement.classList.contains('ae-vt-mode') ||
            document.documentElement.classList.contains('ae-mode-easing'),
          disabled:
            document.querySelector('.ae-mode')?.hasAttribute('disabled') ??
            true,
        })),
      {
        timeout: 320,
        intervals: [40, 80, 120],
      },
    )
    .toMatchObject({
      dark: false,
      light: true,
      stored: 'light',
      easing: false,
      disabled: false,
    });
  expect(Date.now() - started).toBeLessThan(360);
});

test('the catalog copy button copies the clean canonical markup', async ({
  page,
  context,
}) => {
  await context.grantPermissions(['clipboard-read', 'clipboard-write']);
  await page.goto('/site/#buttons');
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

test('the specimen grid lists every primitive and navigates', async ({
  page,
}) => {
  await page.goto('/site/primitives.html');

  // the grid is the navigation: one live card per primitive
  const cards = page.locator('.gal-card[href^="#"]');
  await expect(cards).toHaveCount(33);

  // clicking a card swaps the desk to that plate, which carries
  // prev/next steps wired from the grid's own order
  await page.locator('.gal-card[href="#meter"]').click();
  await expect(page.locator('[data-route="meter"]')).toBeVisible();
  await expect(page.locator('[data-route="index"]')).toBeHidden();
  await expect(page.locator('[data-route="meter"] .plate-steps a')).toHaveCount(
    2,
  );
});
