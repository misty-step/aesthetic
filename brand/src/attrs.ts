// The <html> contract of @misty-step/brand: generate.mjs bundles this into identity/attrs.js and scopes every
// token and base rule in brand.css to HTML_ATTRS. Its published types live in lib.mjs (attrs.d.ts);
// exports.test-d.ts holds them equal to this source.

/** The one attribute brand.css needs on <html>. */
export const HTML_ATTRS: { readonly 'data-brand': 'misty-step' } = /* @__PURE__ */ Object.freeze({ 'data-brand': 'misty-step' });
/** The theme attribute on <html>: 'light' or 'dark'. Without it, brand.css follows prefers-color-scheme. */
export const THEME_ATTR = 'data-theme';
/** The localStorage item where startBrand() keeps the visitor's theme choice. */
export const THEME_STORAGE_ITEM = 'misty-step-theme';
export type Theme = 'light' | 'dark';
