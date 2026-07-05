#!/usr/bin/env node
// Copies the marketing site-kit scaffold into a product repo. Refuses to
// write anything if a single destination path already exists — this repo
// learned the hard way (aesthetic-911) that a silent `cp` step can clobber a
// product's own root DESIGN.md.
import {
  copyFileSync,
  existsSync,
  mkdirSync,
  readdirSync,
  statSync,
} from 'node:fs';
import { dirname, join, relative } from 'node:path';
import { fileURLToPath } from 'node:url';

const kitRoot = dirname(dirname(fileURLToPath(import.meta.url)));

function listFiles(dir) {
  return readdirSync(dir).flatMap((name) => {
    const path = join(dir, name);
    return statSync(path).isDirectory() ? listFiles(path) : [path];
  });
}

// Every (source, destination-relative-to-target) pair the scaffold writes.
// site/DESIGN.md — not a root DESIGN.md — is the brand contract's one home;
// see site-kit/README.md's "DESIGN.md location" section for why.
export function plan(targetDir) {
  const scaffoldSiteDir = join(kitRoot, 'site-kit', 'scaffold', 'site');
  const pairs = listFiles(scaffoldSiteDir).map((src) => [
    src,
    join(targetDir, 'site', relative(scaffoldSiteDir, src)),
  ]);
  pairs.push(
    [join(kitRoot, 'aesthetic.css'), join(targetDir, 'site', 'aesthetic.css')],
    [join(kitRoot, 'recipes', 'mode.js'), join(targetDir, 'site', 'mode.js')],
    [join(kitRoot, 'recipes', 'theme.js'), join(targetDir, 'site', 'theme.js')],
    [
      join(kitRoot, 'site-kit', 'DESIGN.template.md'),
      join(targetDir, 'site', 'DESIGN.md'),
    ],
    [
      join(
        kitRoot,
        'site-kit',
        'scaffold',
        '.github',
        'workflows',
        'pages.yml',
      ),
      join(targetDir, '.github', 'workflows', 'pages.yml'),
    ],
  );
  return pairs;
}

export function scaffoldSiteKit(targetDir) {
  const pairs = plan(targetDir);
  const collisions = pairs
    .map(([, dest]) => dest)
    .filter((dest) => existsSync(dest));

  if (collisions.length > 0) {
    throw new Error(
      `refusing to scaffold: ${collisions.length} destination file(s) already exist:\n` +
        collisions.map((path) => `  ${path}`).join('\n'),
    );
  }

  for (const [src, dest] of pairs) {
    mkdirSync(dirname(dest), { recursive: true });
    copyFileSync(src, dest);
  }

  return pairs.map(([, dest]) => dest);
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const targetDir = process.argv[2] ?? process.cwd();
  try {
    const written = scaffoldSiteKit(targetDir);
    console.log(`scaffolded ${written.length} file(s) into ${targetDir}`);
    for (const path of written) console.log(`  ${path}`);
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
}
