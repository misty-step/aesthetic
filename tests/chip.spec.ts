import { test, expect } from '@playwright/test';
import { assertLaw, collectConsoleErrors } from '../law/index.js';

/* .ae-chip holds the law as a standalone fixture (not the catalog —
   see tests/trail.spec.ts for why). Register a catalog card once
   site/primitives.html gets its next pass. */

const MODES = ['light', 'dark'] as const;
const THEMES = ['ultramarine', 'moss', 'ember', 'violet'] as const;

const luminance = (value: string) => {
  const channels = (value.match(/[\d.]+/g) || [])
    .slice(0, 3)
    .map(Number)
    .map((channel) => {
      const normalized = channel / 255;
      return normalized <= 0.04045
        ? normalized / 12.92
        : ((normalized + 0.055) / 1.055) ** 2.4;
    });
  return 0.2126 * channels[0] + 0.7152 * channels[1] + 0.0722 * channels[2];
};

const contrast = (a: string, b: string) => {
  const [lighter, darker] = [luminance(a), luminance(b)].sort((x, y) => y - x);
  return (lighter + 0.05) / (darker + 0.05);
};

for (const theme of THEMES) {
  for (const mode of MODES) {
    test(`.ae-chip fixture · ${theme} · ${mode} · the law holds`, async ({
      page,
    }) => {
      const errors = collectConsoleErrors(page);

      await page.addInitScript((m: string) => {
        localStorage.setItem('ae-mode', m);
      }, mode);
      await page.goto('/tests/fixtures/chip.html');
      await page.evaluate((name) => {
        document.documentElement.dataset.aeTheme = name;
      }, theme);
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

      const surface = await page.evaluate(
        () => getComputedStyle(document.body).backgroundColor,
      );
      for (const [index, color] of colors.entries()) {
        expect(
          contrast(color, surface),
          `${theme}/${mode} category ${index} must be AA text`,
        ).toBeGreaterThanOrEqual(4.5);
      }
      const subColors = await page
        .locator('.ae-chip-sub')
        .evaluateAll((els) => els.map((el) => getComputedStyle(el).color));
      for (const color of subColors) {
        expect(contrast(color, surface)).toBeGreaterThanOrEqual(4.5);
      }
    });
  }
}
