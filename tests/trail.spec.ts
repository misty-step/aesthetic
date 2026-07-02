import { test, expect } from '@playwright/test';
import { assertLaw, collectConsoleErrors } from '../law/index.js';

/* .ae-trail holds the law as a standalone fixture (not the catalog —
   site/ is mid-reconcile). Register a catalog card once that lands;
   until then this is the primitive's only gated coverage. */

const MODES = ['light', 'dark'] as const;

for (const mode of MODES) {
  test(`.ae-trail fixture · ${mode} · the law holds`, async ({ page }) => {
    const errors = collectConsoleErrors(page);

    await page.addInitScript((m: string) => {
      localStorage.setItem('ae-mode', m);
    }, mode);
    await page.goto('/tests/fixtures/trail.html');
    await page.waitForLoadState('networkidle');

    await assertLaw(page, { consoleErrors: errors });

    // the spine renders with three entries, one marked active
    await expect(page.locator('.ae-trail-item')).toHaveCount(3);
    await expect(page.locator('.ae-trail-item.is-active')).toHaveCount(1);

    // .ae-trail is an <ol> — it must not carry the browser's default
    // numbered markers or list indent
    await expect(page.locator('.ae-trail')).toHaveCSS(
      'list-style-type',
      'none',
    );
    await expect(page.locator('.ae-trail')).toHaveCSS('padding-left', '0px');
  });
}
