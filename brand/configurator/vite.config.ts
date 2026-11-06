import { HTML_ATTRS, THEME_ATTR, THEME_STORAGE_ITEM } from '@misty-step/brand/attrs';
import { defineConfig } from 'vite';

// The brand lab: one page, the identity sheet from ../demo/markup.mjs, built against the installed package
// (file:..). The page gets the package's <html> attributes and the stored theme before first paint, from attrs.
const attributes = Object.entries(HTML_ATTRS).map(([name, value]) => ` ${name}="${value}"`).join('');
const prepaint = `try{const t=localStorage.getItem(${JSON.stringify(THEME_STORAGE_ITEM)});if(t==='light'||t==='dark')document.documentElement.setAttribute(${JSON.stringify(THEME_ATTR)},t)}catch{}`;

export default defineConfig({
  // ../demo/app.js imports the package by name from outside this root: resolve it from here, the installed copy.
  resolve: { dedupe: ['@misty-step/brand'] },
  server: { fs: { allow: ['..'] } },
  plugins: [{
    name: 'brand-html',
    transformIndexHtml: html => html.replace('<html lang="en">', `<html lang="en"${attributes}>`).replace('</title>', `</title>\n<script>${prepaint}</script>`),
  }],
});
