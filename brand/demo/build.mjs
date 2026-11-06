#!/usr/bin/env node
// npm run demo: prove the package resolves as a consumer sees it, then write demo/dist/index.html (the identity
// sheet), studio.html and stack.html against the package alone.
// 1. Every export resolves through the package's own exports map (Node's self-reference) to a file npm packs.
// 2. The pages use only those exports: HTML_ATTRS on <html>, lockup(), the mark, icon() and statusIcon() on the
//    server; brand.css, spine.css, the icons and cards by their resolved URLs; and an import map from the exports,
//    so demo/app.js imports @misty-step/brand/runtime and /spine exactly as a site does.
// Serve brand/ (for example `python3 -m http.server 4190 --bind 127.0.0.1`) and open /demo/dist/. On a Linux
// worker, demo/proof.mjs drives the pages in Chromium.
import { execFileSync } from 'node:child_process';
import { existsSync } from 'node:fs';
import { mkdir, readdir, writeFile } from 'node:fs/promises';
import { relative } from 'node:path';
import { fileURLToPath } from 'node:url';
import { sheet, stack, studio } from './markup.mjs';

const ROOT = fileURLToPath(new URL('../', import.meta.url));
const dist = new URL('./dist/', import.meta.url);
const NAME = '@misty-step/brand';

// What npm would publish, without packing anything.
const [packed] = JSON.parse(execFileSync('npm', ['pack', '--dry-run', '--json', '--ignore-scripts'], { cwd: ROOT, encoding: 'utf8' }));
const published = new Set(packed.files.map(file => file.path));

/** A subpath resolved through the exports map, checked to exist and to be published; returns its path in brand/. */
function resolveExport(subpath) {
  const path = fileURLToPath(import.meta.resolve(`${NAME}/${subpath}`));
  const file = relative(ROOT, path).split('\\').join('/');
  if (!existsSync(path)) throw new Error(`${NAME}/${subpath} resolves to ${file}, which does not exist: run npm run identity`);
  if (!published.has(file)) throw new Error(`${NAME}/${subpath} resolves to ${file}, which npm pack leaves out`);
  return file;
}
const url = subpath => `/${resolveExport(subpath)}`;

const entries = ['brand.css', 'spine.css', 'tokens.json', 'attrs', 'runtime', 'mark', 'spine', 'package.json'];
for (const entry of entries) resolveExport(entry);
const assets = {};
for (const dir of ['fonts', 'icons', 'marks', 'og']) {
  for (const file of await readdir(new URL(`../identity/${dir}/`, import.meta.url))) assets[`${dir}/${file}`] = url(`identity/${dir}/${file}`);
}
console.log(`demo: ${entries.length} exports and ${Object.keys(assets).length} files resolve through the exports map and are published`);

const { HTML_ATTRS, THEME_ATTR, THEME_STORAGE_ITEM } = await import(`${NAME}/attrs`);
const { lockup, MARK_SVG } = await import(`${NAME}/mark`);
const { icon, statusIcon } = await import(`${NAME}/spine`);
const { default: tokens } = await import(`${NAME}/tokens.json`, { with: { type: 'json' } });
const { default: manifest } = await import(`${NAME}/package.json`, { with: { type: 'json' } });

const pages = { sheet: 'index.html', studio: 'studio.html', stack: 'stack.html' };
const pkg = {
  version: manifest.version, tokens, lockup, MARK_SVG, icon, statusIcon,
  asset: path => {
    if (!assets[path]) throw new Error(`demo: ${path} is not a published asset`);
    return assets[path];
  },
  links: Object.fromEntries(Object.entries(pages).map(([page, file]) => [page, `./${file}`])),
};
const importMap = { imports: Object.fromEntries(['runtime', 'spine', 'attrs', 'mark'].map(entry => [`${NAME}/${entry}`, url(entry)])) };
// The visitor's stored theme before first paint: the same item and attribute startBrand() uses.
const prepaint = `try{const t=localStorage.getItem(${JSON.stringify(THEME_STORAGE_ITEM)});if(t==='light'||t==='dark')document.documentElement.setAttribute(${JSON.stringify(THEME_ATTR)},t)}catch{}`;
const attributes = Object.entries(HTML_ATTRS).map(([name, value]) => ` ${name}="${value}"`).join('');

const document = ({ title, card, body }) => `<!doctype html>
<html lang="en"${attributes}>
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${title}</title>
<script>${prepaint}</script>
<link rel="icon" href="${pkg.asset('icons/favicon.svg')}" type="image/svg+xml">
<link rel="icon" href="${pkg.asset('icons/favicon-32.png')}" sizes="32x32" type="image/png">
<link rel="apple-touch-icon" href="${pkg.asset('icons/app-180-ink.png')}">
<meta property="og:image" content="${pkg.asset(`og/${card}.png`)}">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<link rel="stylesheet" href="${url('brand.css')}">
<link rel="stylesheet" href="${url('spine.css')}">
<link rel="stylesheet" href="/demo/demo.css">
<script type="importmap">${JSON.stringify(importMap)}</script>
<script type="module" src="/demo/app.js"></script>
</head>
<body>
${body}
</body>
</html>
`;

await mkdir(dist, { recursive: true });
const written = {
  sheet: document({ title: 'Misty Step identity', card: 'studio', body: sheet(pkg) }),
  studio: document({ title: 'Misty Step', card: 'studio', body: studio(pkg) }),
  stack: document({ title: 'mistystack', card: 'stack', body: stack(pkg) }),
};
for (const [page, html] of Object.entries(written)) {
  await writeFile(new URL(pages[page], dist), html);
  console.log(`wrote demo/dist/${pages[page]}`);
}
