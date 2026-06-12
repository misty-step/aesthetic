/* build the combined recipes file from the singles. The combined file
   is what the site runs (site/recipes.js is a symlink to it); the
   singles are the copy-paste units. `--check` verifies the combined
   file is the exact concatenation — CI runs that. */
import { readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const ORDER = [
  'mode.js',
  'nav.js',
  'views.js',
  'send.js',
  'settings.js',
  'anticipate.js',
  'toast.js',
  'pop.js',
];

const banner = `/* aesthetic recipes — the canonical behavior glue, combined.
   Generated from recipes/*.js by scripts/build-recipes.mjs; edit the
   singles, then \`npm run build:recipes\`. Each section is
   self-contained — copy what you need, or take this whole file. */

`;

const combined =
  banner +
  ORDER.map((f) => readFileSync(join(root, 'recipes', f), 'utf8')).join('\n');

const target = join(root, 'recipes', 'recipes.js');

if (process.argv.includes('--check')) {
  const current = readFileSync(target, 'utf8');
  if (current !== combined) {
    console.error(
      'recipes/recipes.js is out of date — run: npm run build:recipes',
    );
    process.exit(1);
  }
  console.log('recipes/recipes.js matches its singles.');
} else {
  writeFileSync(target, combined);
  console.log(`recipes/recipes.js built from ${ORDER.length} singles.`);
}
