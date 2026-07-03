import { test, expect } from '@playwright/test';
import { assertLaw, collectConsoleErrors } from '../law/index.js';

/* .ae-list-row holds the incident-feed case as a fielded row:
   time, app, type, and status are separate scan targets instead of
   dot-separated prose. */

const MODES = ['light', 'dark'] as const;
const FIELDS = ['time', 'app', 'type', 'status'] as const;

for (const mode of MODES) {
  test(`.ae-list-row fixture · ${mode} · the law holds`, async ({ page }) => {
    const errors = collectConsoleErrors(page);

    await page.addInitScript((m: string) => {
      localStorage.setItem('ae-mode', m);
    }, mode);
    await page.goto('/tests/fixtures/list-row.html');
    await page.waitForLoadState('networkidle');

    await assertLaw(page, { consoleErrors: errors });

    const rows = page.locator('.ae-list-row');
    await expect(rows).toHaveCount(3);
    await expect(page.locator('.ae-list-rows')).toHaveCSS('display', 'grid');
    await expect(page.locator('.ae-list-rows')).toHaveCSS(
      'border-top-width',
      '1px',
    );
    await expect(rows.first()).toHaveCSS('display', 'grid');

    for (const field of FIELDS) {
      await expect(
        page.locator(`.ae-list-cell[data-field="${field}"]`),
      ).toHaveCount(3);
    }

    const firstColumns = await rows
      .first()
      .evaluate((el) => getComputedStyle(el).gridTemplateColumns.split(' '));
    expect(firstColumns.length).toBeGreaterThanOrEqual(4);

    const markedTypeCell = page
      .locator('.ae-list-cell[data-field="type"]')
      .first();
    const markedTextColumn = await markedTypeCell
      .locator('.ae-list-label')
      .evaluate((el) => getComputedStyle(el).gridColumnStart);
    expect(markedTextColumn).toBe('2');

    const unmarkedTypeCell = page
      .locator('.ae-list-cell[data-field="type"]')
      .nth(2);
    await expect(
      unmarkedTypeCell.locator('.ae-icon, .ae-app-mark'),
    ).toHaveCount(0);
    const unmarkedColumns = await unmarkedTypeCell.evaluate(
      (el) => getComputedStyle(el).gridTemplateColumns.split(' ').length,
    );
    const unmarkedTextColumn = await unmarkedTypeCell
      .locator('.ae-list-value')
      .evaluate((el) => getComputedStyle(el).gridColumnStart);
    expect(unmarkedColumns).toBe(1);
    expect(unmarkedTextColumn).toBe('1');

    await expect(page.locator('.ae-list-label').first()).toHaveCSS(
      'text-transform',
      'uppercase',
    );
    await expect(
      page.locator('.ae-list-time .ae-list-value').first(),
    ).toHaveCSS('font-size', '13px');
    await expect(page.locator('.ae-app-mark')).toHaveCount(3);

    const statusIcons = await page
      .locator('.ae-list-status .ae-icon')
      .evaluateAll((els) => els.map((el) => el.getAttribute('data-lucide')));
    expect(statusIcons).toEqual(['circle-x', 'triangle-alert', 'circle-check']);

    // Status color rides only the Lucide glyph. The status words remain ink.
    await expect(page.locator('.ae-list-status .ae-icon.ae-err')).toHaveCount(
      1,
    );
    await expect(page.locator('.ae-list-status .ae-icon.ae-warn')).toHaveCount(
      1,
    );
    await expect(page.locator('.ae-list-status .ae-icon.ae-ok')).toHaveCount(1);
    await expect(
      page.locator('.ae-list-status .ae-list-value.ae-err'),
    ).toHaveCount(0);
    await expect(
      page.locator('.ae-list-status .ae-list-value.ae-warn'),
    ).toHaveCount(0);
    await expect(
      page.locator('.ae-list-status .ae-list-value.ae-ok'),
    ).toHaveCount(0);

    const errIconColor = await page
      .locator('.ae-list-status .ae-icon.ae-err')
      .evaluate((el) => getComputedStyle(el).color);
    const errWordColor = await page
      .locator('.ae-list-status .ae-list-value')
      .first()
      .evaluate((el) => getComputedStyle(el).color);
    expect(errIconColor).not.toBe(errWordColor);

    const visibleText = await page.locator('body').innerText();
    expect(visibleText).not.toContain('·');
    expect(visibleText).not.toContain('14:43 canary probe failure down');
  });
}
