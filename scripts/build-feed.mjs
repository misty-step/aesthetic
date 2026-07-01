/* build the composition feed: site/r/primitives.json — every catalog
   primitive with its canonical markup, the recipes it needs, and the law it
   must hold, so an adopting agent composes a view from JSON without scraping
   HTML. Derived from site/primitives.html — the catalog is the single source
   of truth; the markup here is the same text the copy button yields. The
   machine dual of copy-to-clipboard (016 child 3). `--check` keeps it in
   step; CI runs that, the same contract as build-recipes / build-tokens. */
import { readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import * as prettier from 'prettier';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const read = (p) => readFileSync(join(root, p), 'utf8');
const html = read('site/primitives.html');
const tokens = JSON.parse(read('tokens.json'));
const { version } = JSON.parse(read('package.json'));

/* .src-code holds escaped, syntax-highlighted markup; flatten the highlight
   spans and decode the entities back to runnable markup (what textContent —
   and so the copy button — yields). */
const decode = (s) =>
  s
    .replace(/<span class="t">/g, '')
    .replace(/<\/span>/g, '')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&amp;/g, '&');

const text = (s) =>
  s
    .replace(/<[^>]+>/g, '')
    .replace(/\s+/g, ' ')
    .trim();

const first = (body, re) => {
  const m = body.match(re);
  return m ? m[1] : '';
};

/* each detail view is headed by the primitive's real name; the selectors it
   composes from ride just below in .gal-cls — that line is the feed's
   `classes` (one combined selector string, or none for conceptual primitives
   like the registers). */
const classesOf = (body) => {
  const m = body.match(/<p class="gal-cls">([\s\S]*?)<\/p>/);
  return m ? [text(m[1])] : [];
};

/* the recipe a primitive needs is inferred from its own markup — the trigger
   class/attribute that the behavior glue binds to. No parallel hand-kept map. */
const RECIPE_SIGNALS = [
  [/\bae-send\b/, 'send.js'],
  [/\bae-toast\b|aeToast/, 'toast.js'],
  [/\bae-pop\b|\bae-menu\b/, 'pop.js'],
  [/\bae-settings\b/, 'settings.js'],
  [/\bae-nav\b/, 'nav.js'],
  [/\bae-mode\b/, 'mode.js'],
  [/data-ae-anticipate/, 'anticipate.js'],
  [/\bae-view\b/, 'views.js'],
];

const primitives = [];
const views = html.matchAll(
  /<div class="ae-view[^"]*"[^>]*\bdata-route="([^"]+)"[^>]*>([\s\S]*?)(?=<div class="ae-view|<\/main>)/g,
);
for (const [, route, body] of views) {
  if (route === 'index') continue;
  const code = first(
    body,
    /<pre[^>]*class="[^"]*\bsrc-code\b[^"]*"[^>]*>\s*<code>([\s\S]*?)<\/code><\/pre>/,
  );
  let markup = decode(code).trim();
  let note = '';
  /* the .src-code teaches the primary markup, then sometimes a // note and a
     variant excerpt. Keep the primary element as `markup`; move the trailing
     teaching note to its own field, so a loose fragment (e.g. an absolutely-
     positioned .ae-meter-fill variant) can't escape layout when the markup is
     composed verbatim. Snippets that are all-comment (toast's recipe calls)
     have no HTML element, so they stay whole. */
  if (/<[a-z]/i.test(markup)) {
    const lines = markup.split('\n');
    const cut = lines.findIndex((l) => l.trim().startsWith('//'));
    if (cut > 0) {
      note = lines
        .slice(cut)
        .join('\n')
        .replace(/^\s*\/\/\s?/gm, '')
        .trim();
      markup = lines.slice(0, cut).join('\n').trim();
    }
    // any // line still in HTML markup is a teaching artifact, never
    // composable markup — fold it into the note (covers a note-led snippet)
    const stray = markup.split('\n').filter((l) => l.trim().startsWith('//'));
    if (stray.length) {
      const extra = stray.map((l) => l.replace(/^\s*\/\/\s?/, '')).join('\n');
      note = [note, extra].filter(Boolean).join('\n');
      markup = markup
        .split('\n')
        .filter((l) => !l.trim().startsWith('//'))
        .join('\n')
        .trim();
    }
  }
  const entry = {
    route,
    title: text(first(body, /<h2 class="ae-h">([\s\S]*?)<\/h2>/)),
    summary: text(first(body, /<p class="ae-dim">([\s\S]*?)<\/p>/)),
    classes: classesOf(body),
    role: '',
    since: '',
    recipes: RECIPE_SIGNALS.filter(([re]) => re.test(markup + note)).map(
      ([, r]) => r,
    ),
    markup,
  };
  if (note) entry.note = note;
  primitives.push(entry);
}

const feed = {
  name: '@misty-step/aesthetic',
  version,
  note: 'The composition feed: every catalog primitive with its canonical markup, the recipes it needs, and the law it must hold. Generated from site/primitives.html (the catalog is the source of truth). To compose a view: include aesthetic.css + recipes/recipes.js, paste the markup you need, steer --ae-accent, and never violate the law below.',
  law: tokens.law,
  primitives,
};

const target = join(root, 'site', 'r', 'primitives.json');
const out = await prettier.format(JSON.stringify(feed), {
  ...(await prettier.resolveConfig(target)),
  parser: 'json',
});

if (process.argv.includes('--check')) {
  if (read('site/r/primitives.json') !== out) {
    console.error(
      'site/r/primitives.json is out of date — run: npm run build:feed',
    );
    process.exit(1);
  }
  console.log(
    `site/r/primitives.json matches the catalog (${primitives.length}).`,
  );
} else {
  writeFileSync(target, out);
  console.log(
    `site/r/primitives.json: ${primitives.length} primitives (v${version}).`,
  );
}
