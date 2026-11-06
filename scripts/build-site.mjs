/* Builds _site/, the artifact the pages workflow deploys. It copies site/,
   aesthetic.css and brand/identity/ (the identity's styles, fonts, marks,
   icons and scripts), fills each <!-- build:name --> marker in index.html
   from tokens.json and the brand exports, writes build.json, then fails if
   a page, stylesheet or script references a file the artifact does not
   contain. It needs no installed packages, so the pages workflow runs it
   without npm ci. */
import { createHash } from 'node:crypto';
import {
  cpSync,
  existsSync,
  mkdirSync,
  readFileSync,
  readdirSync,
  rmSync,
  statSync,
  writeFileSync,
} from 'node:fs';
import { dirname, extname, join, relative, resolve } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const identity = join(root, 'brand', 'identity');

const ENTITIES = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' };
const escape = (value) => String(value).replace(/[&<>"]/g, (c) => ENTITIES[c]);

/* What each built file can reference: href and src in pages, @import and
   url() in stylesheets, module specifiers in the site's own scripts. The
   brand's scripts are self-contained bundles, proved by brand/ itself. */
const PATTERNS = {
  '.html': [/\s(?:href|src)="([^"]*)"/g],
  '.css': [/@import\s+['"]([^'"]+)['"]/g, /url\(\s*['"]?([^'")]+)/g],
  '.js': [/\bfrom\s*['"]([^'"]+)['"]/g, /\bimport\s*\(\s*['"]([^'"]+)/g],
};
const BUNDLES = join('brand', 'identity');
const EXTERNAL = /^(?:[a-z][a-z\d+.-]*:|\/\/|#)/i;
const MARKER = /<!-- build:([a-z-]+)(?: ([a-z\d-]+))? -->/g;

function serves(dir, target) {
  if (relative(dir, target).startsWith('..')) return false;
  const stat = statSync(target, { throwIfNoEntry: false });
  if (stat?.isDirectory()) return existsSync(join(target, 'index.html'));
  return Boolean(stat?.isFile());
}

export function findMissingReferences(dir) {
  const missing = [];
  const paths = readdirSync(dir, { recursive: true }).map((p) => join(dir, p));
  for (const file of paths.filter((path) => statSync(path).isFile())) {
    const from = relative(dir, file);
    const patterns = PATTERNS[extname(file)] ?? [];
    if (extname(file) === '.js' && from.startsWith(BUNDLES)) continue;
    const source = readFileSync(file, 'utf8');
    for (const pattern of patterns) {
      for (const [, raw] of source.matchAll(pattern)) {
        const ref = raw.trim();
        if (EXTERNAL.test(ref)) continue;
        const path = decodeURI(ref.split(/[?#]/)[0]);
        if (!path) continue;
        const target = path.startsWith('/')
          ? join(dir, path)
          : resolve(dirname(file), path);
        if (!serves(dir, target)) {
          missing.push(`${from} → ${relative(dir, target)}`);
        }
      }
    }
  }
  return missing;
}

/* The brand exports the page is rendered from; a missing one stops the
   build rather than shipping a page without it. */
const EXPECTED = {
  'attrs.js': ['HTML_ATTRS', 'THEME_ATTR', 'THEME_STORAGE_ITEM'],
  'mark.js': ['lockup'],
  'spine.js': ['icon'],
};

async function loadBrand() {
  const brand = {};
  for (const [file, names] of Object.entries(EXPECTED)) {
    const loaded = await import(pathToFileURL(join(identity, file)).href);
    for (const name of names) {
      if (loaded[name] === undefined) {
        throw new Error(`brand/identity/${file} does not export ${name}.`);
      }
      brand[name] = loaded[name];
    }
  }
  return brand;
}

/* Applies the visitor's stored theme before first paint; the runtime keeps
   it current afterwards. Without a stored choice the page follows the
   system, as it also does when storage is unavailable. */
function themeScript({ THEME_ATTR, THEME_STORAGE_ITEM }) {
  const item = JSON.stringify(THEME_STORAGE_ITEM);
  const attr = JSON.stringify(THEME_ATTR);
  const apply = `document.documentElement.setAttribute(${attr},t)`;
  return (
    `<script>try{const t=localStorage.getItem(${item});` +
    `if(t==='light'||t==='dark')${apply}}catch{}</script>`
  );
}

const FACES = [
  ['Misty Step', 'Studio'],
  ['mistystack', 'Method'],
];

function lockups({ lockup }) {
  const faces = FACES.map(([name, face]) => {
    const tiles = [
      ['light', lockup(name)],
      ['ink', lockup(name)],
      ['ink', lockup(name, { variant: 'mono' })],
    ].map(([ground, art]) => `<div class="tile tile-${ground}">${art}</div>`);
    const caption = `<figcaption>${escape(face)}</figcaption>`;
    return `<figure class="lockup">${caption}${tiles.join('')}</figure>`;
  });
  return `<div class="lockups">${faces.join('')}</div>`;
}

const SYMBOLS = [
  ['marks/mark.svg', '16 px', 16],
  ['marks/mark.svg', '32 px', 32],
  ['marks/mark.svg', '64 px', 64],
  ['marks/mark-ink.svg', 'Ink', 32, 'light'],
  ['marks/mark-white.svg', 'White', 32, 'ink'],
  ['icons/favicon.svg', 'Favicon', 32],
  ['icons/app-180-ink.png', 'App icon', 64],
];

function symbols() {
  const figures = SYMBOLS.map(([file, caption, height, ground]) => {
    const style = `height: ${height}px`;
    const img = `<img src="brand/identity/${file}" alt="" style="${style}">`;
    const art = ground ? `<div class="tile tile-${ground}">${img}</div>` : img;
    return `<figure>${art}<figcaption>${caption}</figcaption></figure>`;
  });
  return `<div class="symbols">${figures.join('')}</div>`;
}

function palette({ colors }) {
  const swatch = ([key, hex]) => {
    const chip = `<span class="chip" style="background: var(--color-${key})">`;
    const name = `<span>${escape(key)}</span>`;
    return `<li class="swatch">${chip}</span>${name}<code>${hex}</code></li>`;
  };
  const group = (title, entries) => {
    const items = entries.map(swatch).join('');
    return `<h3>${title}</h3><ul class="swatches">${items}</ul>`;
  };
  const entries = Object.entries(colors);
  const light = entries.filter(([key]) => !key.startsWith('dark-'));
  const dark = entries.filter(([key]) => key.startsWith('dark-'));
  const groups = group('Light', light) + group('Dark', dark);
  return `<div class="palette">${groups}</div>`;
}

/* Each specimen is set in its role's brand variables, so the page shows
   what brand.css renders; the labels come from tokens.json. Wide roles
   shrink to fit a phone. */
function typeScale({ typography }) {
  const rows = Object.entries(typography).map(([role, type]) => {
    const style = [
      `font-family: var(--font-${role})`,
      `font-size: min(var(--${role}-size), 16vw)`,
      `font-weight: var(--${role}-weight)`,
      `line-height: var(--${role}-leading)`,
      `letter-spacing: var(--${role}-tracking, normal)`,
    ].join('; ');
    const { fontSize, lineHeight, fontWeight, letterSpacing } = type;
    const metrics = [`${fontSize} / ${lineHeight}`, fontWeight, letterSpacing];
    const label = escape(metrics.filter(Boolean).join(' · '));
    const family = escape(type.fontFamily);
    return (
      `<li class="type-row" data-role="${role}">` +
      `<p class="type-role">${role}</p>` +
      `<p class="type-specimen" style="${style}">${family}</p>` +
      `<code>${label}</code></li>`
    );
  });
  return `<ul class="type-scale">${rows.join('')}</ul>`;
}

/* The brand package's install line, as brand-release.yml publishes it. */
function codeSpecimen(version) {
  const release = `brand-v${version}/misty-step-brand-${version}.tgz`;
  const url = `https://github.com/misty-step/aesthetic/releases/download/${release}`;
  const line = `"@misty-step/brand": "${url}"`;
  return `<pre class="sp-code" tabindex="0"><code>${escape(line)}</code></pre>`;
}

async function render(html, { tokens, brandVersion }) {
  const brand = await loadBrand();
  const markers = {
    'theme-script': () => themeScript(brand),
    'header-lockup': () => brand.lockup('Misty Step', { href: './' }),
    lockups: () => lockups(brand),
    symbols: () => symbols(),
    palette: () => palette(tokens),
    type: () => typeScale(tokens),
    code: () => codeSpecimen(brandVersion),
    icon: (name) => {
      const svg = brand.icon(name);
      if (!svg?.startsWith('<svg')) throw new Error(`No brand icon ${name}.`);
      return svg;
    },
  };
  const open = '<html lang="en">';
  if (!html.includes(open)) throw new Error(`index.html must open ${open}.`);
  const attrs = Object.entries(brand.HTML_ATTRS)
    .map(([name, value]) => ` ${name}="${escape(value)}"`)
    .join('');
  const page = html
    .replace(open, `<html lang="en"${attrs}>`)
    .replace(MARKER, (marker, name, arg) => {
      if (!markers[name]) throw new Error(`Unknown marker ${marker}.`);
      return markers[name](arg);
    });
  const left = page.match(/<!-- build:[^>]*-->/);
  if (left) throw new Error(`Malformed marker ${left[0]}.`);
  return page;
}

async function buildSite(out) {
  const tokensFile = readFileSync(join(root, 'tokens.json'));
  const brandFile = readFileSync(join(root, 'brand', 'package.json'), 'utf8');
  const source = {
    tokens: JSON.parse(tokensFile.toString('utf8')),
    brandVersion: JSON.parse(brandFile).version,
  };
  rmSync(out, { recursive: true, force: true });
  cpSync(join(root, 'site'), out, { recursive: true });
  cpSync(join(root, 'aesthetic.css'), join(out, 'aesthetic.css'));
  mkdirSync(join(out, 'brand'));
  cpSync(identity, join(out, BUNDLES), { recursive: true });
  const page = join(out, 'index.html');
  writeFileSync(page, await render(readFileSync(page, 'utf8'), source));

  /* The release identity, read back from the live site after a deploy. The
     pages workflow supplies GITHUB_SHA; a worker build sets SOURCE_REVISION.
     A local build without either records null. */
  const revision = process.env.SOURCE_REVISION || process.env.GITHUB_SHA;
  const build = {
    sourceRevision: revision ?? null,
    brandVersion: source.brandVersion,
    tokensSha256: createHash('sha256').update(tokensFile).digest('hex'),
  };
  const json = JSON.stringify(build, null, 2);
  writeFileSync(join(out, 'build.json'), `${json}\n`);

  const missing = findMissingReferences(out);
  if (missing.length > 0) {
    const list = missing.map((entry) => `\n  ${entry}`).join('');
    throw new Error(`_site/ references files it does not contain:${list}`);
  }
}

if (resolve(process.argv[1] ?? '') === fileURLToPath(import.meta.url)) {
  await buildSite(join(root, '_site'));
  console.log('Built _site/ from site/, aesthetic.css and brand/identity/.');
}
