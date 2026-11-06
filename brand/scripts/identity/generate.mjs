#!/usr/bin/env node
// npm run identity: regenerate identity/ from the root tokens.json and brand/src, and render its PNGs with resvg.
// npm run identity:check: change nothing; fail when any owned file is stale, missing or extra, when a hand-written
// stylesheet spends a value that is not a token, or when a font differs from its upstream pin.
// PNGs are checked by their recorded source hash (rasterisers differ in the last bit across platforms) and by
// their own recorded hash, so the check gives the same answer on every machine.
import { existsSync } from 'node:fs';
import { mkdir, readdir, readFile, rm, writeFile } from 'node:fs/promises';
import { dirname, join, relative } from 'node:path';
import { OUT, outputs, rasterise, sha256 } from './lib.mjs';

const check = process.argv.includes('--check');
const KEEP = new Set(['README.md']); // written by hand, never generated
const MANIFEST = 'manifest.json';

const { files, rasters, problems } = await outputs();
if (problems.length) {
  console.error(`identity: the sources break the identity's rules\n- ${problems.join('\n- ')}`);
  process.exit(1);
}

const manifestPath = join(OUT, MANIFEST);
const recorded = existsSync(manifestPath) ? JSON.parse(await readFile(manifestPath, 'utf8')).rasters ?? {} : {};
const stale = [];
const write = async (file, contents, verb) => {
  await mkdir(dirname(join(OUT, file)), { recursive: true });
  await writeFile(join(OUT, file), contents);
  console.log(`${verb} identity/${file}`);
};

const rendered = {};
for (const [file, { source, hash }] of rasters) {
  const path = join(OUT, file);
  const was = recorded[file];
  const current = existsSync(path) && was?.source === hash && was.png === sha256(await readFile(path));
  if (current) {
    rendered[file] = was;
    continue;
  }
  if (check) {
    stale.push(`${file} is stale (its source changed, or the PNG differs from the one recorded)`);
    continue;
  }
  const png = rasterise(source);
  await write(file, png, 'rendered');
  rendered[file] = { source: hash, png: sha256(png) };
}
files.set(MANIFEST, JSON.stringify({
  note: 'Hashes of each PNG\'s SVG source and of the PNG resvg rendered from it. npm run identity:check compares both.',
  rasters: rendered,
}, null, 2) + '\n');

for (const [file, contents] of files) {
  const path = join(OUT, file);
  if (existsSync(path) && Buffer.compare(await readFile(path), Buffer.from(contents)) === 0) continue;
  if (check) stale.push(`${file} is stale`);
  else await write(file, contents, 'wrote');
}

const owned = new Set([...files.keys(), ...rasters.keys(), ...KEEP]);
async function* walk(dir) {
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const path = join(dir, entry.name);
    if (entry.isDirectory()) yield* walk(path);
    else yield relative(OUT, path);
  }
}
for await (const file of existsSync(OUT) ? walk(OUT) : []) {
  if (owned.has(file)) continue;
  if (check) stale.push(`${file} is not generated`);
  else {
    await rm(join(OUT, file));
    console.log(`removed identity/${file}`);
  }
}
if (!check) {
  // Directories emptied by removed files.
  for (const entry of await readdir(OUT, { withFileTypes: true })) {
    if (entry.isDirectory() && (await readdir(join(OUT, entry.name))).length === 0) await rm(join(OUT, entry.name), { recursive: true });
  }
}

if (stale.length) {
  console.error(`identity:check: ${stale.length} problem${stale.length > 1 ? 's' : ''}\n- ${stale.join('\n- ')}\nRun npm run identity, then commit identity/.`);
  process.exit(1);
}
console.log(check ? 'identity:check: identity/ matches tokens.json and brand/src' : 'identity: up to date');
