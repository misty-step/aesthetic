import { test, expect } from '@playwright/test';
import { assertLaw, collectConsoleErrors } from '../law/index.js';

const MODES = [
  {
    name: 'light',
    setup: async (page) => {
      await page.addInitScript(() => {
        localStorage.setItem('ae-mode', 'light');
      });
    },
    expected: {
      panel: 'rgb(252, 252, 252)',
      backdrop: 'rgba(252, 252, 252, 0.4)',
      surface: 'rgb(252, 252, 252)',
    },
  },
  {
    name: 'dark',
    setup: async (page) => {
      await page.addInitScript(() => {
        localStorage.setItem('ae-mode', 'dark');
      });
    },
    expected: {
      panel: 'rgb(27, 27, 27)',
      backdrop: 'rgba(18, 18, 18, 0.4)',
      surface: 'rgb(27, 27, 27)',
    },
  },
  {
    name: 'automatic-dark',
    setup: async (page) => {
      await page.emulateMedia({ colorScheme: 'dark' });
    },
    expected: {
      panel: 'rgb(27, 27, 27)',
      backdrop: 'rgba(18, 18, 18, 0.4)',
      surface: 'rgb(27, 27, 27)',
    },
  },
] as const;

for (const mode of MODES) {
  test(`Base UI anatomy wears Aesthetic · ${mode.name}`, async ({ page }) => {
    const errors = collectConsoleErrors(page);
    await mode.setup(page);
    await page.goto('http://127.0.0.1:8643/');
    await page.waitForLoadState('networkidle');

    await assertLaw(page, { consoleErrors: errors });

    const panel = page.locator('.ae-dialog-panel');
    await expect(panel).toBeVisible();
    await expect(panel).toHaveCSS('position', 'fixed');
    await expect(panel).toHaveCSS('border-radius', '0px');
    await expect(panel).toHaveCSS('z-index', '41');
    await expect(panel).toHaveCSS('background-color', mode.expected.panel);
    await expect(panel).toHaveCSS(
      'box-shadow',
      mode.name === 'light'
        ? 'rgba(0, 0, 0, 0.05) 0px 1px 2px 0px, rgba(0, 0, 0, 0.09) 0px 12px 36px 0px'
        : 'none',
    );

    const backdrop = page.locator('.ae-dialog-backdrop');
    await expect(backdrop).toHaveCSS('position', 'fixed');
    await expect(backdrop).toHaveCSS('z-index', '40');
    await expect(backdrop).toHaveCSS(
      'background-color',
      mode.expected.backdrop,
    );

    const pop = page.locator('.ae-pop-surface');
    await expect(pop).toHaveCSS('border-top-width', '1px');
    await expect(pop).toHaveCSS('z-index', '50');
    await expect(pop).toHaveCSS('background-color', mode.expected.surface);

    const tip = page.locator('.ae-tip-surface');
    await expect(tip).toHaveCSS('font-size', '13px');
    await expect(tip).toHaveCSS('z-index', '60');
    await expect(tip).toHaveCSS('background-color', mode.expected.surface);

    const status = page.locator('button.ae-status');
    await expect(status).toHaveCSS('background-color', 'rgba(0, 0, 0, 0)');
    await expect(status).toHaveCSS('border-top-width', '0px');
    await expect(status).toHaveCSS('padding-top', '0px');

    const nativePseudoColors = await page.evaluate(() => ({
      backdrop: getComputedStyle(
        document.querySelector('[data-testid="native-dialog"]'),
        '::backdrop',
      ).backgroundColor,
      tip: getComputedStyle(
        document.querySelector('[data-testid="native-tip"]'),
        '::after',
      ).backgroundColor,
    }));
    expect(nativePseudoColors).toEqual({
      backdrop: mode.expected.backdrop,
      tip: mode.expected.surface,
    });

    expect(
      await page.evaluate(() => {
        const layer = (selector) =>
          Number(getComputedStyle(document.querySelector(selector)).zIndex);
        return [
          layer('.ae-dialog-backdrop'),
          layer('.ae-dialog-panel'),
          layer('.ae-pop-surface'),
          layer('.ae-tip-surface'),
          layer('.ae-toasts'),
        ];
      }),
    ).toEqual([40, 41, 50, 60, 100]);
    await expect(page.locator('.ae-pop-positioner')).toHaveCSS('z-index', '50');
    await expect(page.locator('.ae-tip-positioner')).toHaveCSS('z-index', '60');

    const popBox = await pop.boundingBox();
    expect(popBox).not.toBeNull();
    const popIsTopmost = await page.evaluate(
      ({ x, y }) =>
        document.elementFromPoint(x, y)?.closest('.ae-pop-surface') !== null,
      {
        x: popBox.x + popBox.width / 2,
        y: popBox.y + popBox.height / 2,
      },
    );
    expect(popIsTopmost).toBe(true);

    const menuItem = page.getByRole('menuitem', { name: 'Rename' });
    await expect(menuItem).toHaveJSProperty('tagName', 'DIV');
    await expect(menuItem).toHaveCSS('font-size', '13px');
    await expect(menuItem).toHaveCSS('cursor', 'pointer');
    await expect(menuItem).toHaveCSS('padding-left', '14.3px');
  });
}

test('real Base UI menu closes on Escape and returns focus', async ({
  page,
}) => {
  await page.goto('http://127.0.0.1:8643/');
  const trigger = page.getByRole('button', { name: 'Actions' });
  const menu = page.getByRole('menu');
  await expect(menu).toBeVisible();
  await page.keyboard.press('Escape');
  await expect(menu).toBeHidden();
  await expect(trigger).toBeFocused();
});
