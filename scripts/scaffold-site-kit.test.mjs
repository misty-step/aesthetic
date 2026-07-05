import {
  existsSync,
  mkdirSync,
  mkdtempSync,
  readFileSync,
  rmSync,
  writeFileSync,
} from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { after, test } from 'node:test';
import assert from 'node:assert/strict';
import { plan, scaffoldSiteKit } from './scaffold-site-kit.mjs';

const dirs = [];
function freshDir() {
  const dir = mkdtempSync(join(tmpdir(), 'aesthetic-scaffold-'));
  dirs.push(dir);
  return dir;
}

after(() => {
  for (const dir of dirs) rmSync(dir, { recursive: true, force: true });
});

test('scaffolds every planned file into an empty target', () => {
  const target = freshDir();
  const written = scaffoldSiteKit(target);

  assert.ok(written.length > 5);
  assert.ok(written.includes(join(target, 'site', 'DESIGN.md')));
  assert.ok(written.includes(join(target, 'site', 'index.html')));
  assert.ok(
    !written.includes(join(target, 'DESIGN.md')),
    'must not write a root DESIGN.md',
  );
  for (const path of written) {
    assert.ok(readFileSync(path, 'utf8').length > 0);
  }
});

test('a pre-existing root DESIGN.md is never a collision — the scaffold never writes there', () => {
  // this is the aesthetic-911 regression: a repo's own unrelated root
  // DESIGN.md (e.g. bitterblossom's noir-ledger UI design system) must
  // survive scaffolding untouched, because the kit writes to site/DESIGN.md.
  const target = freshDir();
  writeFileSync(
    join(target, 'DESIGN.md'),
    'unrelated pre-existing design system, do not touch',
  );

  const written = scaffoldSiteKit(target);

  assert.ok(written.includes(join(target, 'site', 'DESIGN.md')));
  assert.ok(!written.includes(join(target, 'DESIGN.md')));
  assert.equal(
    readFileSync(join(target, 'DESIGN.md'), 'utf8'),
    'unrelated pre-existing design system, do not touch',
  );
});

test('refuses to overwrite a pre-existing site/DESIGN.md and writes nothing else', () => {
  const target = freshDir();
  mkdirSync(join(target, 'site'), { recursive: true });
  writeFileSync(
    join(target, 'site', 'DESIGN.md'),
    'already-adopted brand contract',
  );

  assert.throws(() => scaffoldSiteKit(target), /already exist/);
  assert.ok(!existsSync(join(target, 'site', 'index.html')));
  assert.equal(
    readFileSync(join(target, 'site', 'DESIGN.md'), 'utf8'),
    'already-adopted brand contract',
  );
});

test('refuses to overwrite a pre-existing site/index.html', () => {
  const target = freshDir();
  mkdirSync(join(target, 'site'), { recursive: true });
  writeFileSync(join(target, 'site', 'index.html'), 'hand-authored, keep me');

  assert.throws(
    () => scaffoldSiteKit(target),
    /site.index\.html|already exist/,
  );
  assert.equal(
    readFileSync(join(target, 'site', 'index.html'), 'utf8'),
    'hand-authored, keep me',
  );
});

test('plan() targets site/DESIGN.md, never a root DESIGN.md', () => {
  const target = freshDir();
  const pairs = plan(target);
  const destinations = pairs.map(([, dest]) => dest);
  assert.ok(destinations.includes(join(target, 'site', 'DESIGN.md')));
  assert.ok(!destinations.includes(join(target, 'DESIGN.md')));
});
