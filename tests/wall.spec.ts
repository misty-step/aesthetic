import { test, expect } from '@playwright/test';
import { assertLaw, collectConsoleErrors } from '../law/index.js';

/* .ae-wall holds the law as a standalone fixture (not the catalog —
   see tests/trail.spec.ts for why). Register a catalog card once
   site/primitives.html gets its next pass. */

const MODES = ['light', 'dark'] as const;

for (const mode of MODES) {
  test(`.ae-wall fixture · ${mode} · the law holds`, async ({ page }) => {
    const errors = collectConsoleErrors(page);

    await page.addInitScript((m: string) => {
      localStorage.setItem('ae-mode', m);
    }, mode);
    await page.goto('/tests/fixtures/wall.html');
    await page.waitForLoadState('networkidle');

    await assertLaw(page, { consoleErrors: errors });

    // the grid renders three cards, status on the glyph not a filled tile
    await expect(page.locator('.ae-wall-card')).toHaveCount(3);
    await expect(page.locator('.ae-wall-mark.ae-err')).toHaveCount(2);
    await expect(page.locator('.ae-wall-mark.ae-ok')).toHaveCount(1);
  });
}
