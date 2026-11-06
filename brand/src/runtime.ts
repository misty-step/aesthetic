// The identity runtime: the visitor's light or dark choice. generate.mjs bundles it into identity/runtime.js. Its
// published types live in lib.mjs (runtime.d.ts); exports.test-d.ts holds them equal to this source.
// brand.css follows prefers-color-scheme until <html> carries data-theme; the runtime applies a stored choice,
// answers every [data-theme-toggle] button and keeps their aria-pressed true while the page is dark.
import { THEME_ATTR, THEME_STORAGE_ITEM, type Theme } from './attrs';

export interface StartBrandOptions {
  /** The document to manage. Default: the global document. */
  root?: Document;
}
export interface BrandHandle {
  /** Disconnects every listener and observer. The theme stays as it is. */
  destroy(): void;
}

const TOGGLE = '[data-theme-toggle]';
let active: BrandHandle | undefined;

const isTheme = (value: string | null): value is Theme => value === 'light' || value === 'dark';

function storedTheme(view: Window): Theme | null {
  try {
    const value = view.localStorage.getItem(THEME_STORAGE_ITEM);
    return isTheme(value) ? value : null;
  } catch {
    return null; // storage refused (private mode, blocked cookies): follow the page
  }
}

/**
 * Applies the visitor's stored theme, then keeps every [data-theme-toggle] in step: a click flips the page between
 * light and dark and stores the choice. Call it in the browser after hydration, and again after client-side
 * navigation; starting again destroys the previous handle.
 */
export function startBrand(options: StartBrandOptions = {}): BrandHandle {
  const doc = options.root ?? globalThis.document;
  if (!doc) throw new Error('startBrand needs a document: call it in the browser, after hydration');
  active?.destroy();
  const view = doc.defaultView ?? window;
  const html = doc.documentElement;
  const system = view.matchMedia('(prefers-color-scheme: dark)');
  const current = (): Theme => {
    const theme = html.getAttribute(THEME_ATTR);
    return isTheme(theme) ? theme : system.matches ? 'dark' : 'light';
  };
  const sync = () => {
    const dark = String(current() === 'dark');
    for (const toggle of doc.querySelectorAll(TOGGLE)) toggle.setAttribute('aria-pressed', dark);
  };
  const onClick = (event: Event) => {
    if (!(event.target as Element | null)?.closest?.(TOGGLE)) return;
    const next: Theme = current() === 'dark' ? 'light' : 'dark';
    html.setAttribute(THEME_ATTR, next);
    try {
      view.localStorage.setItem(THEME_STORAGE_ITEM, next);
    } catch {
      // storage refused: the choice holds for this page only
    }
  };

  const stored = storedTheme(view);
  if (stored) html.setAttribute(THEME_ATTR, stored);
  sync();
  // The site may set data-theme too; the toggles follow whichever control changed it.
  const themes = new MutationObserver(sync);
  themes.observe(html, { attributes: true, attributeFilter: [THEME_ATTR] });
  system.addEventListener('change', sync);
  doc.addEventListener('click', onClick);

  let dead = false;
  const handle: BrandHandle = {
    destroy() {
      if (dead) return;
      dead = true;
      if (active === handle) active = undefined;
      themes.disconnect();
      system.removeEventListener('change', sync);
      doc.removeEventListener('click', onClick);
    },
  };
  active = handle;
  return handle;
}
