import { readFileSync } from 'node:fs';
import { test, expect } from '@playwright/test';
import { assertLaw, collectConsoleErrors } from '../law/index.js';

const THEMES = {
  ultramarine: { light: '#2643d0', dark: '#8c9eff' },
  moss: { light: '#2f6b3f', dark: '#80d98e' },
  ember: { light: '#c2410c', dark: '#ff8a5c' },
  violet: { light: '#6d28d9', dark: '#c4a3ff' },
} as const;

const MODES = ['light', 'dark'] as const;

for (const [theme, accents] of Object.entries(THEMES)) {
  for (const mode of MODES) {
    test(`${theme} theme · ${mode} · resolves tokens and holds the law`, async ({
      page,
    }) => {
      const errors = collectConsoleErrors(page);

      await page.addInitScript((m: string) => {
        localStorage.setItem('ae-mode', m);
      }, mode);
      await page.goto('/tests/fixtures/theme.html');
      await page.evaluate((name) => {
        document.documentElement.dataset.aeTheme = name;
      }, theme);

      await expect(page.locator('html')).toHaveAttribute(
        'data-ae-theme',
        theme,
      );
      await expect
        .poll(() =>
          page.evaluate(() =>
            getComputedStyle(document.documentElement)
              .getPropertyValue('--ae-accent')
              .trim(),
          ),
        )
        .toBe(accents[mode]);

      await assertLaw(page, { consoleErrors: errors });
    });
  }
}

test('theme recipe restores a saved user theme and switches choices', async ({
  page,
}) => {
  await page.addInitScript(() => {
    localStorage.setItem('ae-theme', 'ember');
  });
  await page.goto('/tests/fixtures/theme.html');

  await expect(page.locator('html')).toHaveAttribute('data-ae-theme', 'ember');
  await expect(page.locator('[data-ae-theme-choice="ember"]')).toHaveAttribute(
    'aria-pressed',
    'true',
  );

  await page.locator('[data-ae-theme-choice="violet"]').click();
  await expect(page.locator('html')).toHaveAttribute('data-ae-theme', 'violet');
  await expect(page.locator('[data-ae-theme-choice="ember"]')).toHaveAttribute(
    'aria-pressed',
    'false',
  );
  await expect(page.locator('[data-ae-theme-choice="violet"]')).toHaveAttribute(
    'aria-pressed',
    'true',
  );
  await expect
    .poll(() => page.evaluate(() => localStorage.getItem('ae-theme')))
    .toBe('violet');
});

test('tokens.json exposes the shipped named themes without renaming tokens', () => {
  const tokens = JSON.parse(readFileSync('tokens.json', 'utf8'));

  expect(Object.keys(tokens.themes)).toEqual([
    'ultramarine',
    'moss',
    'ember',
    'violet',
  ]);
  for (const theme of Object.values(tokens.themes) as Array<{
    light: Record<string, string>;
    dark: Record<string, string>;
  }>) {
    expect(Object.keys(theme.light)).toContain('accent');
    expect(Object.keys(theme.dark)).toContain('accent');
    expect(Object.keys(theme.light)).not.toContain('primary');
    expect(Object.keys(theme.dark)).not.toContain('primary');
  }
});
