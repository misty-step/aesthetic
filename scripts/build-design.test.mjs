import assert from 'node:assert/strict';
import { mkdtemp, mkdir, readFile, rm, writeFile, copyFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { spawnSync } from 'node:child_process';
import test from 'node:test';

const root = new URL('../', import.meta.url);

test('token drift rejects a stale handoff without writing, then regeneration repairs it', async () => {
  const fixture = await mkdtemp(join(tmpdir(), 'aesthetic-design-'));
  try {
    await mkdir(join(fixture, 'scripts'));
    for (const file of ['tokens.json', 'DESIGN.md', 'scripts/build-design.mjs']) {
      await copyFile(new URL(file, root), join(fixture, file));
    }
    const run = (...args) =>
      spawnSync(process.execPath, ['scripts/build-design.mjs', ...args], {
        cwd: fixture,
        encoding: 'utf8',
      });
    const original = await readFile(join(fixture, 'DESIGN.md'), 'utf8');
    const tokens = JSON.parse(await readFile(join(fixture, 'tokens.json'), 'utf8'));
    tokens.colors.primary = '#112233';
    await writeFile(join(fixture, 'tokens.json'), JSON.stringify(tokens));

    const stale = run('--check');
    assert.equal(stale.status, 1, stale.stdout + stale.stderr);
    assert.equal(await readFile(join(fixture, 'DESIGN.md'), 'utf8'), original);

    const regenerate = run();
    assert.equal(regenerate.status, 0, regenerate.stdout + regenerate.stderr);
    const repaired = await readFile(join(fixture, 'DESIGN.md'), 'utf8');
    assert.match(repaired, /primary: "#112233"/);
    const body = (document) => document.split(/^---\s*$/m).slice(2).join('---');
    assert.equal(body(repaired), body(original));
    const fresh = run('--check');
    assert.equal(fresh.status, 0, fresh.stdout + fresh.stderr);
  } finally {
    await rm(fixture, { recursive: true, force: true });
  }
});
