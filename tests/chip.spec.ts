import { test, expect } from '@playwright/test';
import { assertLaw, collectConsoleErrors } from '../law/index.js';

/* .ae-chip holds the law as a standalone fixture (not the catalog —
   see tests/trail.spec.ts for why). Register a catalog card once
   site/primitives.html gets its next pass. */

const MODES = ['light', 'dark'] as const;

for (const mode of MODES) {
  test(`.ae-chip fixture · ${mode} · the law holds`, async ({ page }) => {
    const errors = collectConsoleErrors(page);

    await page.addInitScript((m: string) => {
      localStorage.setItem('ae-mode', m);
    }, mode);
    await page.goto('/tests/fixtures/chip.html');
    await page.waitForLoadState('networkidle');

    await assertLaw(page, { consoleErrors: errors });

    // eight chips, eight distinguishable hues — not status, so no
    // .ae-ok/.ae-warn/.ae-err collision, and each category is unique
    const chips = page.locator('.ae-chip');
    await expect(chips).toHaveCount(8);

    const colors = await chips.evaluateAll((els) =>
      els.map((el) => getComputedStyle(el).color),
    );
    expect(new Set(colors).size).toBe(8);
  });
}
