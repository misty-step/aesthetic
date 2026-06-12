import { test, expect, type Page } from '@playwright/test';

/* the law, mechanically: every stable page, both modes —
   · nothing renders larger than the one size (heavier, never larger)
   · radius is 0 everywhere
   · the page itself never scrolls (stages and desks scroll inside)
   · static text keeps the default cursor
   · the console stays clean
   Screenshots of every page×mode land in test-results/ as evidence. */

const PAGES = [
  { path: '/site/', name: 'manual' },
  { path: '/site/primitives.html', name: 'catalog' },
  { path: '/site/steering.html', name: 'steering' },
  { path: '/site/gauntlet/dashboard.html', name: 'dashboard' },
  { path: '/site/gauntlet/docs.html', name: 'docs' },
  { path: '/site/gauntlet/settings.html', name: 'settings' },
];

const MODES = ['light', 'dark'] as const;

const maxFontPx = (page: Page) =>
  page.evaluate(() => {
    let max = 0;
    for (const el of document.querySelectorAll('body *')) {
      if (!(el instanceof HTMLElement)) continue;
      if (!el.offsetParent && el.tagName !== 'BODY') continue; // unrendered
      const size = parseFloat(getComputedStyle(el).fontSize);
      if (size > max) max = size;
    }
    return max;
  });

const nonZeroRadii = (page: Page) =>
  page.evaluate(() => {
    const offenders: string[] = [];
    for (const el of document.querySelectorAll('body *')) {
      const r = getComputedStyle(el).borderRadius;
      if (r && r !== '0px') {
        offenders.push(`${el.tagName.toLowerCase()}.${el.className} → ${r}`);
        if (offenders.length > 5) break;
      }
    }
    return offenders;
  });

for (const { path, name } of PAGES) {
  for (const mode of MODES) {
    test(`${name} · ${mode} · the law holds`, async ({ page }) => {
      const errors: string[] = [];
      page.on('console', (msg) => {
        if (msg.type() === 'error') errors.push(msg.text());
      });
      page.on('pageerror', (err) => errors.push(String(err)));

      await page.addInitScript((m) => {
        localStorage.setItem('ae-mode', m);
      }, mode);
      await page.goto(path);
      await page.waitForLoadState('networkidle');

      // one size: nothing larger than 16px, anywhere
      expect(await maxFontPx(page)).toBeLessThanOrEqual(16.01);

      // radius 0 everywhere
      expect(await nonZeroRadii(page)).toEqual([]);

      // the page never scrolls; inner stages do
      const pageScrolls = await page.evaluate(
        () =>
          document.scrollingElement!.scrollHeight >
          document.scrollingElement!.clientHeight + 1,
      );
      expect(pageScrolls, 'page-level scroll is outlawed').toBe(false);

      // static text: no I-beam
      await expect(page.locator('body')).toHaveCSS('cursor', 'default');

      // the mode actually resolved
      const dark = await page.evaluate(() =>
        document.documentElement.classList.contains('dark'),
      );
      expect(dark).toBe(mode === 'dark');

      // clean console
      expect(errors).toEqual([]);

      await page.screenshot({
        path: `test-results/screens/${name}-${mode}.png`,
        fullPage: false,
      });
    });
  }
}

test('the send moment resolves once and announces', async ({ page }) => {
  await page.goto('/site/');
  const email = page.locator('#email');
  await email.scrollIntoViewIfNeeded();
  await email.fill('reader@example.com');
  await page.locator('.ae-send').click();
  await expect(page.locator('.ae-send')).toBeDisabled();
  await expect(page.locator('.ae-send')).toHaveClass(/is-sent/);
  await expect(page.locator('.ae-sr[role="status"]')).toHaveText(/sent/i);
});

test('the catalog routes by hash and the toggle flips the mode', async ({
  page,
}) => {
  await page.goto('/site/primitives.html#meter');
  await expect(page.locator('[data-route="meter"]')).toBeVisible();
  await expect(page.locator('[data-route="index"]')).toBeHidden();

  await page.locator('.ae-mode').first().click();
  const pinned = await page.evaluate(() =>
    document.documentElement.classList.contains('dark')
      ? 'dark'
      : document.documentElement.classList.contains('light')
        ? 'light'
        : 'none',
  );
  expect(pinned).not.toBe('none');
});
