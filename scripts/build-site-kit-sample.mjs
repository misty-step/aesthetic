import {
  cpSync,
  existsSync,
  mkdirSync,
  readFileSync,
  readdirSync,
  rmSync,
  statSync,
  writeFileSync,
} from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = dirname(dirname(fileURLToPath(import.meta.url)));
const scaffold = join(root, 'site-kit', 'scaffold', 'site');
const out = join(root, '_site-kit-sample');
const check = process.argv.includes('--check');

const required = [
  join(scaffold, 'index.html'),
  join(scaffold, 'changelog.html'),
  join(scaffold, 'marketing.css'),
  join(scaffold, 'marketing.js'),
  join(root, 'site-kit', 'DESIGN.template.md'),
  join(root, 'site-kit', 'scaffold', '.github', 'workflows', 'pages.yml'),
  join(root, 'aesthetic.css'),
  join(root, 'recipes', 'mode.js'),
  join(root, 'recipes', 'theme.js'),
];

for (const path of required) {
  if (!existsSync(path)) {
    throw new Error(`site-kit sample missing required file: ${path}`);
  }
}

function assertNoExternalAssets(path) {
  const text = readFileSync(path, 'utf8');
  const externalAssetPatterns = [
    /<script[^>]+src=["']https?:\/\//i,
    /<link[^>]+rel=["']stylesheet["'][^>]+href=["']https?:\/\//i,
    /<link[^>]+href=["']https?:\/\/[^"']+["'][^>]+rel=["']stylesheet["']/i,
    /url\(\s*["']?https?:\/\//i,
  ];
  for (const pattern of externalAssetPatterns) {
    if (pattern.test(text)) {
      throw new Error(`external asset reference found in ${path}`);
    }
  }
}

function scaffoldFiles(dir) {
  return readdirSync(dir)
    .flatMap((name) => {
      const path = join(dir, name);
      return statSync(path).isDirectory() ? scaffoldFiles(path) : [path];
    })
    .filter((path) => /\.(css|html|js|svg)$/.test(path));
}

for (const file of scaffoldFiles(scaffold)) {
  assertNoExternalAssets(file);
}

rmSync(out, { recursive: true, force: true });
mkdirSync(out, { recursive: true });
cpSync(scaffold, out, { recursive: true });
cpSync(join(root, 'aesthetic.css'), join(out, 'aesthetic.css'));
cpSync(join(root, 'recipes', 'mode.js'), join(out, 'mode.js'));
cpSync(join(root, 'recipes', 'theme.js'), join(out, 'theme.js'));
writeFileSync(
  join(out, 'build-manifest.json'),
  `${JSON.stringify(
    {
      artifact: 'site-kit-sample',
      source: 'site-kit/scaffold/site',
      includes: [
        'aesthetic.css',
        'mode.js',
        'theme.js',
        'index.html',
        'changelog.html',
      ],
      check,
    },
    null,
    2,
  )}\n`,
);

console.log(`built ${out}`);
