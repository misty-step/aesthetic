import assert from 'node:assert/strict';
import { mkdirSync, mkdtempSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import test from 'node:test';
import { findMissingReferences } from './build-site.mjs';

test('names every file the staged site references but lacks', () => {
  const dir = mkdtempSync(join(tmpdir(), 'build-site-'));
  try {
    mkdirSync(join(dir, 'fonts'));
    writeFileSync(
      join(dir, 'index.html'),
      [
        '<link rel="stylesheet" href="site.css" />',
        '<link rel="stylesheet" href="../outside.css" />',
        '<script type="module" src="app.js"></script>',
        '<a href="./">Home</a> <a href="#main">Skip</a>',
        '<a href="https://mistystep.io">Studio</a>',
        '<img src="icons/app.png?v=1" alt="" />',
      ].join('\n'),
    );
    writeFileSync(
      join(dir, 'site.css'),
      [
        "@import './base.css';",
        "@font-face { src: url('fonts/present.woff2'); }",
        '@font-face { src: url(fonts/absent.woff2); }',
        ".chip { background: url('data:image/svg+xml,%3Csvg%3E'); }",
      ].join('\n'),
    );
    writeFileSync(join(dir, 'base.css'), '');
    writeFileSync(join(dir, 'fonts', 'present.woff2'), '');
    writeFileSync(join(dir, 'app.js'), "import { toast } from './spine.js';");

    assert.deepEqual(findMissingReferences(dir).sort(), [
      'app.js → spine.js',
      'index.html → ../outside.css',
      'index.html → icons/app.png',
      'site.css → fonts/absent.woff2',
    ]);
  } finally {
    rmSync(dir, { recursive: true, force: true });
  }
});
