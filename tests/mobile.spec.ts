import { test, expect } from '@playwright/test';
import { assertLaw, collectConsoleErrors } from '../law/index.js';

const MODES = ['light', 'dark'] as const;

for (const mode of MODES) {
  test(`mobile responsive fixture · 390px · ${mode}`, async ({ page }) => {
    const errors = collectConsoleErrors(page);

    await page.setViewportSize({ width: 390, height: 844 });
    await page.addInitScript((m: string) => {
      localStorage.setItem('ae-mode', m);
    }, mode);
    await page.goto('/tests/fixtures/mobile-responsive.html');
    await page.waitForLoadState('networkidle');

    await assertLaw(page, { consoleErrors: errors });

    await expect(page.locator('.ae-rail')).toBeVisible();
    await expect(page.locator('.ae-rail')).toHaveCSS('display', 'flex');
    await expect(page.locator('.ae-rail')).toHaveCSS('border-top-width', '1px');
    await expect(page.locator('.ae-rail')).toHaveCSS(
      'border-right-width',
      '0px',
    );

    const railBox = await page.locator('.ae-rail').boundingBox();
    const deskBox = await page.locator('.ae-desk').boundingBox();
    expect(railBox?.y ?? 0).toBeGreaterThan(deskBox?.y ?? 0);

    const modeUtility = page.getByTestId('mode-utility');
    await expect(modeUtility).toBeVisible();
    const modeBox = await modeUtility.boundingBox();
    expect((modeBox?.x ?? 0) + (modeBox?.width ?? 0)).toBeLessThanOrEqual(390);
    const navCapacity = await page.locator('.ae-rail-nav').evaluate((el) => ({
      clientWidth: el.clientWidth,
      scrollWidth: el.scrollWidth,
    }));
    expect(navCapacity.scrollWidth).toBeGreaterThan(navCapacity.clientWidth);
    const activeBox = await page
      .locator('.ae-rail-nav [aria-current="page"]')
      .boundingBox();
    expect(activeBox?.x ?? -1).toBeGreaterThanOrEqual(0);
    expect((activeBox?.x ?? 0) + (activeBox?.width ?? 0)).toBeLessThanOrEqual(
      390,
    );

    await expect
      .poll(() =>
        page
          .locator('.ae-list-row')
          .first()
          .evaluate(
            (el) => getComputedStyle(el).gridTemplateColumns.split(' ').length,
          ),
      )
      .toBe(1);
    await expect(page.locator('.ae-list-value').nth(2)).toHaveCSS(
      'white-space',
      'normal',
    );

    await expect(page.locator('.ae-table thead')).toHaveCSS('display', 'none');
    await expect(page.locator('.ae-table td').first()).toHaveCSS(
      'display',
      'grid',
    );
    const firstLabel = await page
      .locator('.ae-table td')
      .first()
      .evaluate((el) => getComputedStyle(el, '::before').content);
    expect(firstLabel).toContain('endpoint');

    const columns = page.locator('.ae-column');
    await expect(columns).toHaveCount(2);
    const firstColumn = await columns.nth(0).boundingBox();
    const secondColumn = await columns.nth(1).boundingBox();
    expect(secondColumn?.y ?? 0).toBeGreaterThan(firstColumn?.y ?? 0);

    const overflow = await page.evaluate(
      () => document.documentElement.scrollWidth - window.innerWidth,
    );
    expect(overflow).toBeLessThanOrEqual(1);
  });
}

test('responsive fixture · 768px keeps bottom rail and two-up rows', async ({
  page,
}) => {
  await page.setViewportSize({ width: 768, height: 900 });
  await page.goto('/tests/fixtures/mobile-responsive.html');
  await page.waitForLoadState('networkidle');

  await expect(page.locator('.ae-rail')).toBeVisible();
  await expect(page.locator('.ae-rail')).toHaveCSS('border-top-width', '1px');
  await expect
    .poll(() =>
      page
        .locator('.ae-list-row')
        .first()
        .evaluate(
          (el) => getComputedStyle(el).gridTemplateColumns.split(' ').length,
        ),
    )
    .toBe(2);
});

test('v0.25 direct-link rail stays horizontally reachable at 390px', async ({
  page,
}) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/tests/fixtures/mobile-responsive.html');
  await page.evaluate(() => {
    const nav = document.querySelector('.ae-rail-nav')!;
    nav.replaceWith(...nav.children);
  });

  const rail = page.locator('.ae-rail');
  await expect(rail).toHaveCSS('overflow-x', 'auto');
  await rail.evaluate((el) => {
    el.scrollLeft = el.scrollWidth;
  });
  const utility = page.getByTestId('mode-utility');
  await expect(utility).toBeVisible();
  const utilityBox = await utility.boundingBox();
  expect(utilityBox?.x ?? -1).toBeGreaterThanOrEqual(0);
  expect((utilityBox?.x ?? 0) + (utilityBox?.width ?? 0)).toBeLessThanOrEqual(
    390,
  );
});
