import { execFileSync } from 'node:child_process';
import { test, expect } from '@playwright/test';
import { assertLaw, collectConsoleErrors } from '../law/index.js';

const MODES = ['light', 'dark'] as const;

test.describe.configure({ mode: 'serial' });

test.beforeAll(() => {
  execFileSync('node', ['scripts/build-site-kit-sample.mjs'], {
    cwd: process.cwd(),
    stdio: 'inherit',
  });
});

for (const mode of MODES) {
  test(`site kit sample home · ${mode} · the law holds`, async ({ page }) => {
    const errors = collectConsoleErrors(page);

    await page.addInitScript((m: string) => {
      localStorage.setItem('ae-mode', m);
    }, mode);
    await page.goto('/_site-kit-sample/');
    await page.waitForLoadState('networkidle');

    await assertLaw(page, { consoleErrors: errors });
    await expect(page.locator('html')).toHaveAttribute('data-ae-theme', 'moss');
    await expect
      .poll(() =>
        page.evaluate(() =>
          getComputedStyle(document.documentElement)
            .getPropertyValue('--ae-accent')
            .trim(),
        ),
      )
      .toBe(mode === 'dark' ? '#80d98e' : '#2f6b3f');
    await expect(page.locator('.ae-app-mark .ae-icon')).toHaveAttribute(
      'data-lucide',
      'kanban',
    );
    await expect(page.locator('.msk-shot')).toHaveCount(3);
    await expect(page.locator('[data-footer-link="misty-step"]')).toBeVisible();
    await expect(page.locator('[data-footer-link="github"]')).toBeVisible();
    await expect(page.locator('[data-footer-link="weave"]')).toBeVisible();

    await page.screenshot({
      path: `test-results/screens/site-kit-home-${mode}.png`,
      fullPage: false,
    });
  });

  test(`site kit release notes · ${mode} · the law holds`, async ({ page }) => {
    const errors = collectConsoleErrors(page);

    await page.addInitScript((m: string) => {
      localStorage.setItem('ae-mode', m);
    }, mode);
    await page.goto('/_site-kit-sample/changelog.html');
    await page.waitForLoadState('networkidle');

    await assertLaw(page, { consoleErrors: errors });
    await expect(page.locator('h1')).toHaveText('Release notes');
  });
}

test('site kit gallery opens a click-to-zoom dialog', async ({ page }) => {
  await page.goto('/_site-kit-sample/');
  await page.locator('.msk-shot').first().click();

  const dialog = page.locator('dialog.msk-zoom');
  await expect(dialog).toHaveAttribute('open', '');
  await expect(page.locator('#zoom-title')).toHaveText('Overview');
  await expect(page.locator('.msk-zoom-img')).toHaveAttribute(
    'src',
    'assets/screenshots/01-overview.svg',
  );
  await page.locator('[data-zoom-close]').click();
  await expect(dialog).not.toHaveAttribute('open', '');
});
