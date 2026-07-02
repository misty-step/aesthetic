import { test, expect } from '@playwright/test';
import { assertLaw, collectConsoleErrors } from '../law/index.js';

/* .ae-stat-badges holds the law as a standalone fixture. It exists
   for the canary-header case: summary stats need hierarchy and
   containers, not a plain-text run of dot-separated counts. */

const MODES = ['light', 'dark'] as const;

for (const mode of MODES) {
  test(`.ae-stat-badges fixture · ${mode} · the law holds`, async ({
    page,
  }) => {
    const errors = collectConsoleErrors(page);

    await page.addInitScript((m: string) => {
      localStorage.setItem('ae-mode', m);
    }, mode);
    await page.goto('/tests/fixtures/stat-badge.html');
    await page.waitForLoadState('networkidle');

    await assertLaw(page, { consoleErrors: errors });

    const badges = page.locator('.ae-stat-badge');
    await expect(badges).toHaveCount(5);
    await expect(page.locator('.ae-stat-badges')).toHaveCSS('display', 'flex');
    await expect(badges.first()).toHaveCSS('display', 'flex');
    await expect(badges.first()).toHaveCSS('border-top-width', '1px');
    await expect(badges.first()).toHaveCSS('border-top-style', 'solid');
    await expect(page.locator('.ae-stat-value')).toHaveText([
      '9',
      '7',
      '2',
      '2',
      '3',
    ]);
    await expect(page.locator('.ae-stat-label')).toHaveText([
      'apps',
      'up',
      'down',
      'open incidents',
      'errors/24h',
    ]);

    // Status hue belongs only to the optional glyph slot, never the
    // value or label text.
    await expect(page.locator('.ae-stat-badge .ae-ok')).toHaveCount(1);
    await expect(page.locator('.ae-stat-badge .ae-err')).toHaveCount(2);
    await expect(page.locator('.ae-stat-value.ae-ok')).toHaveCount(0);
    await expect(page.locator('.ae-stat-label.ae-err')).toHaveCount(0);

    const valueWeight = await page
      .locator('.ae-stat-value')
      .first()
      .evaluate((el) => getComputedStyle(el).fontWeight);
    const labelColor = await page
      .locator('.ae-stat-label')
      .first()
      .evaluate((el) => getComputedStyle(el).color);
    const valueColor = await page
      .locator('.ae-stat-value')
      .first()
      .evaluate((el) => getComputedStyle(el).color);
    expect(Number(valueWeight)).toBeGreaterThanOrEqual(550);
    expect(labelColor).not.toBe(valueColor);
  });
}
