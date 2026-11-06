import { expect, test, type Page } from '@playwright/test';
import { resolve, rgb, tokens } from './tokens';

/* Light and dark are equal; the page follows the system until the visitor
   picks one with the toggle, and remembers that pick. */

const LIGHT = rgb(tokens.colors.canvas);
const DARK = rgb(tokens.colors['dark-canvas']);
const STORAGE_ITEM =
  'import("/brand/identity/attrs.js").then((m) => m.THEME_STORAGE_ITEM)';

function ground(page: Page) {
  return page.evaluate(() => getComputedStyle(document.body).backgroundColor);
}

test('follows the system until the visitor chooses', async ({ page }) => {
  await page.emulateMedia({ colorScheme: 'dark' });
  await page.goto('/');
  await expect(page.locator('html')).not.toHaveAttribute('data-theme');
  await expect.poll(() => ground(page)).toBe(DARK);
  await page.emulateMedia({ colorScheme: 'light' });
  await expect.poll(() => ground(page)).toBe(LIGHT);
});

test('the toggle switches, remembers and survives a reload', async ({
  page,
}) => {
  await page.emulateMedia({ colorScheme: 'light' });
  await page.goto('/');
  const html = page.locator('html');
  const toggle = page.locator('[data-theme-toggle]');
  await expect(toggle).toHaveAttribute('aria-pressed', 'false');

  await toggle.click();
  await expect(html).toHaveAttribute('data-theme', 'dark');
  await expect(toggle).toHaveAttribute('aria-pressed', 'true');
  await expect.poll(() => ground(page)).toBe(DARK);

  await page.reload();
  await expect(html).toHaveAttribute('data-theme', 'dark');
  await expect(toggle).toHaveAttribute('aria-pressed', 'true');
  await expect.poll(() => ground(page)).toBe(DARK);

  await toggle.click();
  await expect(html).toHaveAttribute('data-theme', 'light');
  await expect.poll(() => ground(page)).toBe(LIGHT);
});

test('a stored choice applies before any script module runs', async ({
  page,
}) => {
  await page.emulateMedia({ colorScheme: 'dark' });
  await page.goto('/');
  const item = (await page.evaluate(STORAGE_ITEM)) as string;
  await page.evaluate((key) => localStorage.setItem(key, 'light'), item);
  await page.route('**/*.js', (route) => route.abort());
  await page.reload();
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'light');
  await expect.poll(() => ground(page)).toBe(LIGHT);
});

test('the dark theme wears the dark tokens', async ({ page }) => {
  await page.emulateMedia({ colorScheme: 'dark' });
  await page.goto('/');
  for (const [selector, name] of [
    ['body', 'page-dark'],
    ['.sp-card', 'card-dark'],
  ]) {
    const { backgroundColor, textColor } = tokens.components[name];
    const node = page.locator(selector).first();
    const background = rgb(resolve(backgroundColor));
    await expect(node).toHaveCSS('background-color', background);
    await expect(node).toHaveCSS('color', rgb(resolve(textColor)));
  }
  const code = page.locator('.sp-code').first();
  await expect(code).toHaveCSS(
    'background-color',
    rgb(tokens.colors['dark-surface']),
  );
});
