import { test, expect } from '@playwright/test';
import { assertLaw, collectConsoleErrors } from '../law/index.js';

/* Icon-forward patterns prove the operator verdict without relaxing
   the status law: Lucide SVGs carry hue; labels stay ink. */

const MODES = ['light', 'dark'] as const;

for (const mode of MODES) {
  test(`icon-forward fixture · ${mode} · the law holds`, async ({ page }) => {
    const errors = collectConsoleErrors(page);

    await page.addInitScript((m: string) => {
      localStorage.setItem('ae-mode', m);
    }, mode);
    await page.goto('/tests/fixtures/icon-forward.html');
    await page.waitForLoadState('networkidle');

    await assertLaw(page, { consoleErrors: errors });

    await expect(page.locator('.ae-status')).toHaveCount(5);
    await expect(page.locator('.ae-icon-row')).toHaveCount(3);
    await expect(page.locator('.ae-logo')).toHaveCount(2);
    await expect(page.locator('.ae-app-mark')).toHaveCount(2);

    const statusIcons = await page
      .locator('.ae-status .ae-icon')
      .evaluateAll((els) => els.map((el) => el.getAttribute('data-lucide')));
    expect(statusIcons).toEqual([
      'circle-check',
      'triangle-alert',
      'circle-x',
      'info',
      'clock',
    ]);

    // Status colors ride only the SVG glyphs; no colored-word status.
    await expect(page.locator('.ae-status-label.ae-ok')).toHaveCount(0);
    await expect(page.locator('.ae-status-label.ae-warn')).toHaveCount(0);
    await expect(page.locator('.ae-status-label.ae-err')).toHaveCount(0);
    await expect(page.locator('.ae-status .ae-icon.ae-ok')).toHaveCount(1);
    await expect(page.locator('.ae-status .ae-icon.ae-warn')).toHaveCount(1);
    await expect(page.locator('.ae-status .ae-icon.ae-err')).toHaveCount(1);

    const visibleText = await page.locator('body').innerText();
    expect(visibleText).not.toContain('✓');
    expect(visibleText).not.toContain('×');
    expect(visibleText).not.toContain('!');

    await expect(page.locator('.ae-logo').first()).toHaveCSS('display', 'flex');
    await expect(page.locator('.ae-app-mark').first()).toHaveCSS(
      'border-top-width',
      '1px',
    );
    await expect(page.locator('.ae-list-icon').first()).toHaveCSS(
      'flex-shrink',
      '0',
    );
  });
}
