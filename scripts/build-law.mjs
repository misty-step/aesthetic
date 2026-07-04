/* build law/dist: the compiled ESM form of the law gate, generated from
   law/index.ts + law/invariants.ts via tsc (law/tsconfig.json). Consumers
   import '@misty-step/aesthetic/law' — Node's ESM resolver refuses to
   load .ts from node_modules, so the package.json "./law" export points
   here, not at the source. The .ts source ships too (via the "law" entry
   in package.json's "files"), for consumers who vendor it verbatim.
   law/package.json ("type": "module") marks both the source and dist as
   ESM regardless of the root package's own (unset) type.
   `--check` verifies dist is the exact tsc output for the current source
   — CI runs that, the same contract as build-recipes/build-tokens. */
import { execFileSync } from 'node:child_process';
import {
  mkdtempSync,
  readFileSync,
  readdirSync,
  rmSync,
  statSync,
  writeFileSync,
} from 'node:fs';
import { tmpdir } from 'node:os';
import { dirname, join, relative } from 'node:path';
import { fileURLToPath } from 'node:url';
import * as prettier from 'prettier';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const lawDir = join(root, 'law');
const distDir = join(lawDir, 'dist');
const tscBin = join(root, 'node_modules', '.bin', 'tsc');

const listFiles = (dir) => {
  const out = [];
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const p = join(dir, entry.name);
    if (entry.isDirectory()) out.push(...listFiles(p));
    else out.push(p);
  }
  return out;
};

/* tsc's own output doesn't match this repo's prettier config — format it
   the same way build-tokens/build-registry format their generated output
   before writing, so `prettier --check .` covers dist too. */
const build = async (outDir) => {
  execFileSync(
    tscBin,
    ['-p', join('law', 'tsconfig.json'), '--outDir', outDir],
    { cwd: root, stdio: 'inherit' },
  );
  /* resolve config from a fixed path inside the repo, not the output file
     — outDir is sometimes a scratch tmpdir outside the repo tree during
     --check, where resolveConfig would find no .prettierrc and silently
     fall back to prettier's defaults (double quotes). */
  const config = await prettier.resolveConfig(join(lawDir, 'index.ts'));
  for (const file of listFiles(outDir)) {
    const source = readFileSync(file, 'utf8');
    const formatted = await prettier.format(source, {
      ...config,
      filepath: file,
    });
    if (formatted !== source) writeFileSync(file, formatted);
  }
};

if (process.argv.includes('--check')) {
  const tmp = mkdtempSync(join(tmpdir(), 'aesthetic-law-dist-'));
  try {
    await build(tmp);
    const expected = listFiles(tmp)
      .map((p) => relative(tmp, p))
      .sort();
    const actual = statSync(distDir, { throwIfNoEntry: false })
      ? listFiles(distDir)
          .map((p) => relative(distDir, p))
          .sort()
      : [];

    const problems = [];
    if (expected.join('\n') !== actual.join('\n')) {
      problems.push(
        `file list differs — expected [${expected.join(', ')}], found [${actual.join(', ')}]`,
      );
    }
    for (const rel of expected) {
      if (!actual.includes(rel)) continue;
      const want = readFileSync(join(tmp, rel), 'utf8');
      const got = readFileSync(join(distDir, rel), 'utf8');
      if (want !== got) problems.push(`${rel} is out of date`);
    }

    if (problems.length > 0) {
      console.error('law/dist is out of date — run: npm run build:law');
      for (const p of problems) console.error(`  - ${p}`);
      process.exit(1);
    }
    console.log('law/dist matches law/index.ts + law/invariants.ts.');
  } finally {
    rmSync(tmp, { recursive: true, force: true });
  }
} else {
  rmSync(distDir, { recursive: true, force: true });
  await build(distDir);
  console.log('law/dist built from law/index.ts + law/invariants.ts.');
}
