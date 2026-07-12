import assert from 'node:assert/strict';
import { readFileSync, readdirSync } from 'node:fs';
import test from 'node:test';
import { join } from 'node:path';
import postcss from 'postcss';

const root = new URL('..', import.meta.url).pathname;

test('every generated registry CSS file parses', () => {
  const items = readdirSync(join(root, 'site/r'))
    .filter((name) => name.endsWith('.json'))
    .map((name) => JSON.parse(readFileSync(join(root, 'site/r', name), 'utf8')))
    .filter((item) => item.type === 'registry:item');

  for (const item of items) {
    for (const file of item.files ?? []) {
      if (!file.path.endsWith('.css')) continue;
      assert.doesNotThrow(
        () => postcss.parse(file.content, { from: file.path }),
        `${item.name}: ${file.path}`,
      );
    }
  }
});

test('selector extraction does not leak adapter peers across primitives', () => {
  const readItemCss = (name) => {
    const item = JSON.parse(
      readFileSync(join(root, 'site/r', `${name}.json`), 'utf8'),
    );
    return item.files.find((file) => file.path.endsWith('.css')).content;
  };

  assert.doesNotMatch(readItemCss('toast'), /\.ae-pop(?:-surface)?\b/);
  assert.doesNotMatch(readItemCss('pop'), /\.ae-toast\b/);
});
