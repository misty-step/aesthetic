import { readFileSync } from 'node:fs';
import { test, expect, type Page } from '@playwright/test';
import { assertLaw, collectConsoleErrors } from '../law/index.js';

const MODES = ['light', 'dark'] as const;
const VIEWPORTS = [
  { name: 'phone', width: 390, height: 844 },
  { name: 'desktop', width: 1440, height: 900 },
] as const;

const rgb = (value: string) =>
  (value.match(/[\d.]+/g) || []).slice(0, 3).map(Number);

const luminance = (value: string) => {
  const channels = rgb(value).map((channel) => {
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

const PRIMITIVE_ROUTES = (
  JSON.parse(readFileSync('site/r/primitives.json', 'utf8')) as {
    primitives: Array<{ route: string }>;
  }
).primitives.map(({ route }) => route);

const semanticContrastViolations = (page: Page) =>
  page.evaluate(() => {
    const parse = (value: string) => {
      const values = (value.match(/[\d.]+/g) || []).map(Number);
      return {
        rgb: values.slice(0, 3),
        alpha: values.length > 3 ? values[3] : 1,
      };
    };
    const luminance = (color: number[]) => {
      const channels = color.map((channel) => {
        const normalized = channel / 255;
        return normalized <= 0.04045
          ? normalized / 12.92
          : ((normalized + 0.055) / 1.055) ** 2.4;
      });
      return 0.2126 * channels[0] + 0.7152 * channels[1] + 0.0722 * channels[2];
    };
    const ratio = (a: number[], b: number[]) => {
      const values = [luminance(a), luminance(b)].sort((x, y) => y - x);
      return (values[0] + 0.05) / (values[1] + 0.05);
    };
    const background = (element: Element) => {
      let current: Element | null = element;
      while (current) {
        const parsed = parse(getComputedStyle(current).backgroundColor);
        if (parsed.alpha > 0) return parsed.rgb;
        current = current.parentElement;
      }
      return parse(getComputedStyle(document.body).backgroundColor).rgb;
    };
    const visible = (element: Element) => {
      const style = getComputedStyle(element);
      const box = element.getBoundingClientRect();
      return (
        style.display !== 'none' &&
        style.visibility !== 'hidden' &&
        opacity(element) > 0.01 &&
        box.width > 0 &&
        box.height > 0
      );
    };
    const opacity = (element: Element) => {
      let value = 1;
      let current: Element | null = element;
      while (current) {
        value *= Number(getComputedStyle(current).opacity);
        current = current.parentElement;
      }
      return value;
    };

    return [...document.querySelectorAll('body *')]
      .filter(visible)
      .filter((element) =>
        [...element.childNodes].some(
          (node) =>
            node.nodeType === Node.TEXT_NODE &&
            Boolean(node.textContent?.trim()),
        ),
      )
      .filter((element) => {
        const style = getComputedStyle(element);
        return (
          parse(element instanceof SVGTextElement ? style.fill : style.color)
            .alpha > 0.01
        );
      })
      .map((element) => {
        const style = getComputedStyle(element);
        const foreground = parse(
          element instanceof SVGTextElement ? style.fill : style.color,
        ).rgb;
        const bg = background(element);
        const alpha = opacity(element);
        const composite = foreground.map(
          (channel, index) => channel * alpha + bg[index] * (1 - alpha),
        );
        return {
          element: `${element.tagName.toLowerCase()}.${[...element.classList].join('.')}`,
          text: element.textContent?.trim().slice(0, 48),
          ratio: ratio(composite, bg),
        };
      })
      .filter(({ ratio: value }) => value < 4.5);
  });

const horizontalClippingViolations = (page: Page) =>
  page.evaluate(() =>
    [...document.querySelectorAll('body *')]
      .filter((element) => {
        const style = getComputedStyle(element);
        const box = element.getBoundingClientRect();
        return (
          style.display !== 'none' &&
          style.visibility !== 'hidden' &&
          box.width > 0 &&
          box.height > 0
        );
      })
      .filter((element) => {
        const hasText = [...element.childNodes].some(
          (node) =>
            node.nodeType === Node.TEXT_NODE &&
            Boolean(node.textContent?.trim()),
        );
        return hasText || element.matches('button, [aria-current]');
      })
      .filter((element) => {
        const scroller = element.closest('.ae-rail-nav, .ae-flow-viewport');
        return !scroller || element.matches('[aria-current]');
      })
      .map((element) => {
        const box = element.getBoundingClientRect();
        return {
          element: `${element.tagName.toLowerCase()}.${[...element.classList].join('.')}`,
          text: element.textContent?.trim().slice(0, 48),
          left: box.left,
          right: box.right,
        };
      })
      .filter(({ left, right }) => left < -1 || right > window.innerWidth + 1),
  );

for (const mode of MODES) {
  for (const viewport of VIEWPORTS) {
    test(`operator fixture · ${viewport.name} · ${mode}`, async ({ page }) => {
      const errors = collectConsoleErrors(page);
      await page.setViewportSize(viewport);
      await page.addInitScript((m: string) => {
        localStorage.setItem('ae-mode', m);
      }, mode);
      await page.goto('/tests/fixtures/operator-app.html');
      await page.waitForLoadState('networkidle');

      await assertLaw(page, { consoleErrors: errors });

      const utility = page.getByTestId('operator-mode');
      await expect(utility).toBeVisible();
      const utilityBox = await utility.boundingBox();
      expect(utilityBox?.x ?? -1).toBeGreaterThanOrEqual(0);
      expect(
        (utilityBox?.x ?? 0) + (utilityBox?.width ?? 0),
      ).toBeLessThanOrEqual(viewport.width);

      await expect(
        page.locator('.ae-rail [aria-current="page"]'),
      ).toBeVisible();

      const flow = page.locator('.ae-flow-viewport');
      const label = page.locator('.ae-node-label').first();
      const labelBox = await label.boundingBox();
      expect(labelBox?.height ?? 0).toBeGreaterThanOrEqual(12);

      const progress = page.locator('.ae-status .ae-progress');
      const progressLabel = page.locator('.ae-status-label');
      const statusColors = await page.evaluate(() => {
        const probe = document.createElement('span');
        probe.style.color = 'var(--ae-accent)';
        document.body.appendChild(probe);
        const accent = getComputedStyle(probe).color;
        probe.style.color = 'var(--ae-ink)';
        const ink = getComputedStyle(probe).color;
        probe.remove();
        const glyph = getComputedStyle(
          document.querySelector('.ae-status .ae-progress')!,
        );
        const label = getComputedStyle(
          document.querySelector('.ae-status-label')!,
        );
        return {
          accent,
          ink,
          glyph: glyph.color,
          label: label.color,
        };
      });
      await expect(progress).toBeVisible();
      await expect(progressLabel).toBeVisible();
      expect(statusColors.glyph).toBe(statusColors.accent);
      expect(statusColors.label).toBe(statusColors.ink);

      if (viewport.name === 'phone') {
        const navCapacity = await page
          .locator('.ae-rail-nav')
          .evaluate((el) => ({
            clientWidth: el.clientWidth,
            scrollWidth: el.scrollWidth,
          }));
        expect(navCapacity.scrollWidth).toBeGreaterThan(
          navCapacity.clientWidth,
        );

        const flowCapacity = await flow.evaluate((el) => ({
          clientWidth: el.clientWidth,
          scrollWidth: el.scrollWidth,
        }));
        expect(flowCapacity.scrollWidth).toBeGreaterThan(
          flowCapacity.clientWidth,
        );
      }

      const bodyOverflow = await page.evaluate(
        () => document.documentElement.scrollWidth - window.innerWidth,
      );
      expect(bodyOverflow).toBeLessThanOrEqual(1);
      expect(await horizontalClippingViolations(page)).toEqual([]);

      await page.screenshot({
        path: `test-results/screens/operator-${viewport.name}-${mode}.png`,
        fullPage: false,
      });

      if (viewport.name === 'phone') {
        await flow.scrollIntoViewIfNeeded();
        await expect(flow).toBeInViewport();
        await page.screenshot({
          path: `test-results/screens/operator-phone-route-${mode}.png`,
          fullPage: false,
        });
      }
    });
  }
}

for (const mode of MODES) {
  test(`semantic text never uses faint ink · ${mode}`, async ({ page }) => {
    await page.addInitScript((m: string) => {
      localStorage.setItem('ae-mode', m);
    }, mode);

    await page.goto('/tests/fixtures/operator-app.html');
    const tokens = await page.evaluate(() => {
      const probe = document.createElement('span');
      probe.style.color = 'var(--ae-ink-muted)';
      document.body.appendChild(probe);
      const muted = getComputedStyle(probe).color;
      probe.style.color = 'var(--ae-surface)';
      const surface = getComputedStyle(probe).color;
      probe.remove();
      return {
        muted,
        surface,
      };
    });
    expect(contrast(tokens.muted, tokens.surface)).toBeGreaterThanOrEqual(4.5);
    await expect(page.locator('.ae-list-label').first()).toHaveCSS(
      'color',
      tokens.muted,
    );
    await expect(page.locator('.ae-node-kicker').first()).toHaveCSS(
      'fill',
      tokens.muted,
    );
    await expect(page.locator('.ae-node-label.is-locked')).toHaveCSS(
      'fill',
      tokens.muted,
    );

    await page.goto('/tests/fixtures/mobile-responsive.html');
    await expect(page.locator('.ae-plate-note')).toHaveCSS(
      'color',
      tokens.muted,
    );
    const generatedLabel = await page
      .locator('.ae-table td')
      .first()
      .evaluate((el) => getComputedStyle(el, '::before').color);
    expect(generatedLabel).toBe(tokens.muted);

    await page.goto('/site/primitives.html#toast');
    await page.evaluate(() => {
      (
        window as typeof window & { aeToast: (message: string) => void }
      ).aeToast('Contrast probe');
    });
    await expect(page.locator('.ae-toast-x').first()).toHaveCSS(
      'color',
      tokens.muted,
    );
    await page.goto('/site/primitives.html#interval');
    await expect(page.locator('.ae-ci-bound').first()).toHaveCSS(
      'color',
      tokens.muted,
    );
    await page.goto('/site/primitives.html#plot');
    await expect(page.locator('.ae-plot-ticklabel').first()).toHaveCSS(
      'fill',
      tokens.muted,
    );
    await page.goto('/site/primitives.html#report');
    await expect(page.locator('.ae-pull-by')).toHaveCSS('color', tokens.muted);
  });

  test(`canonical gallery semantic text is AA · ${mode}`, async ({ page }) => {
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await page.addInitScript((m: string) => {
      localStorage.setItem('ae-mode', m);
    }, mode);

    for (const route of PRIMITIVE_ROUTES) {
      await page.goto(`/site/primitives.html#${route}`);
      await expect(page.locator(`[data-route="${route}"]`)).toBeVisible();
      expect(
        await semanticContrastViolations(page),
        `${route}/${mode} semantic text contrast`,
      ).toEqual([]);
    }
  });
}
