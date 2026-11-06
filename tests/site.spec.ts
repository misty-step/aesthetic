import { createHash } from 'node:crypto';
import { readFileSync } from 'node:fs';
import { expect, test, type Page } from '@playwright/test';
import { firstFamily, resolve, rgb, tokens } from './tokens';

/* The built catalog in _site/, as the pages workflow deploys it. */

test.use({ colorScheme: 'light' });

const COMPONENTS = [
  ['.sp-button', 'button-primary'],
  ['.sp-secondary', 'button-secondary'],
  ['.sp-input', 'input'],
  ['.sp-tag', 'tag'],
  ['.sp-card', 'card'],
  ['.sp-code', 'code'],
];
const MARK_SHAPES = 'header .ms-mark :is(path, polygon)';
const ICON_LINKS = 'link[rel~="icon"], link[rel="apple-touch-icon"]';

function computed(page: Page, selector: string) {
  return page.$eval(selector, (element) => {
    const style = getComputedStyle(element);
    return {
      background: style.backgroundColor,
      color: style.color,
      radius: style.borderTopLeftRadius,
      border: style.borderTopWidth,
      shadow: style.boxShadow,
      family: style.fontFamily,
      size: style.fontSize,
      weight: style.fontWeight,
    };
  });
}

/* What a component token promises, in the terms getComputedStyle uses. */
function promised(name: string) {
  const component = tokens.components[name];
  const promise: Record<string, string> = {
    background: rgb(resolve(component.backgroundColor)),
    color: rgb(resolve(component.textColor)),
  };
  if (component.rounded) promise.radius = resolve(component.rounded);
  if (component.typography) {
    const type = resolve(component.typography);
    promise.family = type.fontFamily;
    promise.size = type.fontSize;
    promise.weight = String(type.fontWeight);
  }
  return promise;
}

async function columns(page: Page, selector: string) {
  const lefts = await page.$$eval(selector, (items) =>
    items.map((item) => Math.round(item.getBoundingClientRect().left)),
  );
  return new Set(lefts).size;
}

test('loads without console errors or failed requests', async ({ page }) => {
  const problems: string[] = [];
  page.on('console', (message) => {
    if (message.type() === 'error') problems.push(message.text());
  });
  page.on('pageerror', (error) => problems.push(error.message));
  page.on('requestfailed', (request) => problems.push(request.url()));
  page.on('response', (response) => {
    if (response.status() >= 400) problems.push(response.url());
  });
  await page.goto('/');
  await page.waitForLoadState('networkidle');
  expect(problems).toEqual([]);
});

test('publishes its release identity in build.json', async ({ request }) => {
  const build = await (await request.get('/build.json')).json();
  const brand = JSON.parse(readFileSync('brand/package.json', 'utf8'));
  const hash = createHash('sha256').update(readFileSync('tokens.json'));
  const revision = process.env.SOURCE_REVISION || process.env.GITHUB_SHA;
  expect(build).toEqual({
    sourceRevision: revision ?? null,
    brandVersion: brand.version,
    tokensSha256: hash.digest('hex'),
  });
});

test('serves the three faces and sets each role in its face', async ({
  page,
}) => {
  const origins = new Set<string>();
  page.on('response', (response) => {
    if (response.request().resourceType() !== 'font') return;
    origins.add(new URL(response.url()).origin);
  });
  await page.goto('/');
  await page.evaluate(() => document.fonts.ready.then(() => undefined));
  const loaded = await page.evaluate(() =>
    [...document.fonts]
      .filter((face) => face.status === 'loaded')
      .map((face) => face.family.replace(/^["']|["']$/g, '')),
  );
  for (const [role, type] of Object.entries(tokens.typography)) {
    const selector = `.type-row[data-role="${role}"] .type-specimen`;
    const specimen = await computed(page, selector);
    expect(loaded, role).toContain(type.fontFamily);
    expect(firstFamily(specimen.family), role).toBe(type.fontFamily);
    expect(specimen.size, role).toBe(type.fontSize);
    expect(specimen.weight, role).toBe(String(type.fontWeight));
  }
  expect([...origins]).toEqual([new URL(page.url()).origin]);

  const roles = { h1: 'display', body: 'body', '.sp-code': 'mono' };
  for (const [selector, role] of Object.entries(roles)) {
    const { family } = await computed(page, selector);
    expect(firstFamily(family), selector).toBe(
      tokens.typography[role].fontFamily,
    );
  }
});

test('components wear their component tokens', async ({ page }) => {
  await page.goto('/');
  for (const [selector, name] of COMPONENTS) {
    const style = await computed(page, selector);
    const actual = { ...style, family: firstFamily(style.family) };
    expect(actual, selector).toMatchObject(promised(name));
  }
  const ghost = await computed(page, '.specimen .sp-ghost');
  expect(ghost.radius).toBe(tokens.rounded.md);
  const percent = await computed(page, '.sp-closeness span');
  expect(firstFamily(percent.family)).toBe(tokens.typography.mono.fontFamily);
});

test('surfaces are flat, edged by one hairline', async ({ page }) => {
  await page.goto('/');
  for (const selector of ['.sp-card', '.sp-secondary', '.sp-input']) {
    const style = await computed(page, selector);
    expect(style.shadow, selector).toBe('none');
    expect(style.border, selector).toBe('1px');
  }
});

test('ends the headline with an indigo full stop', async ({ page }) => {
  await page.goto('/');
  const stop = page.locator('h1 .ms-stop');
  await expect(stop).toHaveText('.');
  await expect(stop).toHaveCSS('color', rgb(tokens.colors.primary));
});

test('draws both lockups and serves every mark and icon', async ({
  page,
  request,
}) => {
  await page.goto('/');
  const fills = await page.$$eval(MARK_SHAPES, (shapes) =>
    shapes.map((shape) => getComputedStyle(shape).fill),
  );
  expect(fills).toEqual([
    rgb(tokens.colors.primary),
    rgb(tokens.colors.secondary),
  ]);
  for (const name of ['Misty Step', 'mistystack']) {
    const lockup = page.locator('.lockups .ms-name', { hasText: name });
    await expect(lockup.first()).toBeVisible();
  }

  const undecoded = await page.$$eval('img', async (images) => {
    const failed = [];
    for (const image of images as HTMLImageElement[]) {
      await image.decode().catch(() => failed.push(image.src));
    }
    return failed;
  });
  expect(undecoded).toEqual([]);

  const icons = await page.$$eval(ICON_LINKS, (links) =>
    links.map((link) => (link as HTMLLinkElement).href),
  );
  expect(icons.length).toBeGreaterThan(0);
  for (const href of icons) {
    const response = await request.get(href);
    expect(response.ok(), href).toBe(true);
    expect(response.headers()['content-type'], href).toMatch(/^image\//);
  }
});

test('copies a ranked command and says so', async ({ page, context }) => {
  await context.grantPermissions(['clipboard-read', 'clipboard-write']);
  await page.goto('/');
  await page.getByRole('button', { name: 'Copy /skill:retro' }).click();
  const toasts = page.locator('.sp-toasts');
  await expect(toasts).toContainText('Copied /skill:retro');
  const copied = await page.evaluate(() => navigator.clipboard.readText());
  expect(copied).toBe('/skill:retro');
});

test('keeps a wide page within 1200px, specimens side by side', async ({
  page,
}) => {
  await page.setViewportSize({ width: 1600, height: 1000 });
  await page.goto('/');
  const main = await page.locator('main').boundingBox();
  expect(main?.width).toBeLessThanOrEqual(1200);
  expect(await columns(page, '.specimen')).toBeGreaterThan(1);
});

test.describe('on a phone', () => {
  test.use({ viewport: { width: 390, height: 844 } });

  test('fits the width and stacks the catalog', async ({ page }) => {
    await page.goto('/');
    const overflow = await page.evaluate(
      () => document.documentElement.scrollWidth - window.innerWidth,
    );
    expect(overflow).toBeLessThanOrEqual(0);
    await expect(page.locator('header .ms-lockup')).toBeInViewport();
    await expect(page.locator('[data-theme-toggle]')).toBeInViewport();
    expect(await columns(page, '.specimen')).toBe(1);
  });
});
