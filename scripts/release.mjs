/* one command cuts a local release: prepare (bump pins, regenerate
   artifacts, format) + commit + tag.  Push is left to the operator:
   `git push --follow-tags`.  For automated releases, landmark's
   semantic-release pipeline calls prepare-release.mjs as its prepare
   hook and handles the commit/tag itself. */
import { execSync } from 'node:child_process';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { prepareRelease } from './prepare-release.mjs';

const next = process.argv[2];
if (!/^\d+\.\d+\.\d+$/.test(next || '')) {
  console.error('usage: node scripts/release.mjs X.Y.Z');
  process.exit(1);
}

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const sh = (cmd) => execSync(cmd, { cwd: root, stdio: 'inherit' });

const { prev } = prepareRelease(next);
sh(`git add -A`);
sh(`git commit -m "release: v${next}"`);
sh(`git tag -a v${next} -m "v${next}"`);
console.log(`\nv${next} cut (was v${prev}). Push with: git push --follow-tags`);
