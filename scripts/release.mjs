/* one command cuts a release: bump every pin, regenerate the built
   artifacts, format, commit, tag. Push is left to the operator:
   `git push --follow-tags`. */
import { execSync } from 'node:child_process';
import { readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const next = process.argv[2];
if (!/^\d+\.\d+\.\d+$/.test(next || '')) {
  console.error('usage: node scripts/release.mjs X.Y.Z');
  process.exit(1);
}

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const sh = (cmd) => execSync(cmd, { cwd: root, stdio: 'inherit' });

const pkg = JSON.parse(readFileSync(join(root, 'package.json'), 'utf8'));
const prev = pkg.version;
/* every surface that states the version, swept by anchored replacement.
   Only replaces version pins (vX.Y.Z or "X.Y.Z" or 'X.Y.Z'), not bare
   occurrences of the string in unrelated prose. */
const pinFiles = [
  'package.json',
  'aesthetic.css',
  'tokens.json',
  'README.md',
  'docs/ADOPTING.md',
  'site/index.html',
  'site/primitives.html',
];

const prevEsc = prev.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
const nextEsc = next.replace(/\$/g, '$$$$');
/* match: v2.6.0 (git tags, URLs), "2.6.0" (JSON), '2.6.0' (quoted),
   or 2.6.0 at a word boundary in CSS comments */
const versionRe = new RegExp(
  `(v${prevEsc})|"${prevEsc}"|'${prevEsc}'|(?<=\\b)${prevEsc}(?=\\b)`,
  'g',
);

for (const f of pinFiles) {
  const p = join(root, f);
  const before = readFileSync(p, 'utf8');
  const after = before.replace(versionRe, (m) =>
    m.startsWith('v')
      ? `v${nextEsc}`
      : m.startsWith('"')
        ? `"${nextEsc}"`
        : m.startsWith("'")
          ? `'${nextEsc}'`
          : nextEsc,
  );
  if (before !== after) writeFileSync(p, after);
}

sh('node scripts/build-recipes.mjs');
sh('node scripts/build-registry.mjs');
sh('node scripts/build-tokens.mjs');
sh('node scripts/build-feed.mjs');
sh('npx prettier --write . --log-level warn');
sh('npx prettier --check . --log-level warn');
sh('npx stylelint aesthetic.css site/site.css');
sh(`git add -A`);
sh(`git commit -m "release: v${next}"`);
sh(`git tag -a v${next} -m "v${next}"`);
console.log(`\nv${next} cut (was ${prev}). Push with: git push --follow-tags`);
