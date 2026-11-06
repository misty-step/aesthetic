import { readFile, writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';

const root = new URL('../', import.meta.url);
const tokens = JSON.parse(await readFile(new URL('tokens.json', root), 'utf8'));
const path = new URL('DESIGN.md', root);
const current = await readFile(path, 'utf8');
const frontmatter = /^---\r?\n[\s\S]*?\r?\n---\r?\n/.exec(current);
if (!frontmatter) throw new Error('DESIGN.md must start with YAML frontmatter.');

function yaml(object, depth = 0) {
  return Object.entries(object)
    .map(([key, value]) => {
      const prefix = `${'  '.repeat(depth)}${key}:`;
      return value !== null && typeof value === 'object'
        ? `${prefix}\n${yaml(value, depth + 1)}`
        : `${prefix} ${typeof value === 'string' ? JSON.stringify(value) : value}`;
    })
    .join('\n');
}

const generated = `---\n${yaml(tokens)}\n---\n${current.slice(frontmatter[0].length)}`;
if (process.argv.includes('--check')) {
  if (current !== generated) {
    console.error('DESIGN.md frontmatter is stale. Run npm run build:design.');
    process.exitCode = 1;
  } else {
    console.log('DESIGN.md frontmatter matches tokens.json.');
  }
} else {
  await writeFile(path, generated);
  console.log(`Generated ${fileURLToPath(path)} frontmatter from tokens.json.`);
}
