/* shared release-prepare logic: bump every version pin, regenerate the
   built artifacts, format. Used by both the landmark prepare hook
   (semantic-release decides the version, passes it via SR_NEXT_RELEASE_VERSION)
   and the manual release.mjs (version from argv). Does NOT commit or tag —
   the caller owns that (semantic-release via @semantic-release/git, or
   release.mjs via git directly). */
import { execSync } from 'node:child_process';
import { readFileSync, writeFileSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const sh = (cmd) => execSync(cmd, { cwd: root, stdio: 'inherit' });

/* every surface that states the version, swept by anchored replacement.
   Matches vX.Y.Z (git tags, URLs), "X.Y.Z" (JSON), 'X.Y.Z' (quoted),
   or bare X.Y.Z at a word boundary (CSS comments, install snippets).
   The bare branch has a negative lookbehind for range operators (>=, <=,
   ^, ~) so semver ranges are not corrupted. */
const pinFiles = [
  'package.json',
  'aesthetic.css',
  'tokens.json',
  'README.md',
  'docs/ADOPTING.md',
  'site/index.html',
  'site/primitives.html',
  'site/steering.html',
  'site/gauntlet/docs.html',
  'site/gauntlet/settings.html',
];

export function prepareRelease(next) {
  const pkg = JSON.parse(readFileSync(join(root, 'package.json'), 'utf8'));
  const prev = pkg.version;

  const prevEsc = prev.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const nextEsc = next;
  /* match only v-prefixed (v2.6.0, #v2.6.0, @v2.6.0) and quoted
     ("2.6.0" JSON, '2.6.0' single) pins. No bare-word branch: every
     version reference in the repo uses one of these forms, and dropping
     the bare branch eliminates any risk of corrupting semver ranges. */
  const versionRe = new RegExp(`(v${prevEsc})|"${prevEsc}"|'${prevEsc}'`, 'g');

  for (const f of pinFiles) {
    const p = join(root, f);
    const before = readFileSync(p, 'utf8');
    const after = before.replace(versionRe, (m) =>
      m.startsWith('v')
        ? `v${nextEsc}`
        : m.startsWith('"')
          ? `"${nextEsc}"`
          : `'${nextEsc}'`,
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

  return { prev, next };
}

/* when run directly (semantic-release prepare hook), read the version from
   the SR_NEXT_RELEASE_VERSION env var that @semantic-release/exec sets */
if (fileURLToPath(import.meta.url) === resolve(process.argv[1])) {
  const next = process.env.SR_NEXT_RELEASE_VERSION || process.argv[2];
  if (!next || !/^\d+\.\d+\.\d+$/.test(next)) {
    console.error(
      'usage: SR_NEXT_RELEASE_VERSION=X.Y.Z node scripts/prepare-release.mjs',
    );
    process.exit(1);
  }
  const { prev } = prepareRelease(next);
  console.log(`\nprepared v${next} (was v${prev})`);
}
