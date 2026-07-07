import { test } from 'node:test';
import assert from 'node:assert/strict';
import {
  createServer,
  getLaw,
  getPrimitive,
  getRecipe,
  getTokens,
  listPrimitives,
  searchRegistry,
} from './server.mjs';

test('getTokens returns the real tokens.json shape', () => {
  const tokens = getTokens();
  assert.ok(
    tokens.layout?.breakpoints,
    'tokens.json should carry layout.breakpoints',
  );
  assert.ok(tokens.color, 'tokens.json should carry the color block');
});

test('listPrimitives returns route/title/summary/classes for every primitive, no markup bloat', () => {
  const list = listPrimitives();
  assert.ok(list.length > 10);
  for (const entry of list) {
    assert.ok(entry.route);
    assert.ok(entry.title);
    assert.equal(
      entry.markup,
      undefined,
      'list_primitives should stay lightweight',
    );
  }
});

test('getPrimitive returns the full entry including markup for a known route', () => {
  const shell = getPrimitive('shell');
  assert.equal(shell.route, 'shell');
  assert.ok(shell.markup.includes('ae-screen'));
});

test('getPrimitive throws a helpful error for an unknown route', () => {
  assert.throws(
    () => getPrimitive('not-a-real-route'),
    /no primitive with route/,
  );
});

test('getRecipe returns real recipe source for a known name', () => {
  const source = getRecipe('dialog');
  assert.match(source, /function|const|export/);
});

test('getRecipe throws a helpful error listing known recipes', () => {
  assert.throws(() => getRecipe('not-a-real-recipe'), /Known recipes:/);
});

test('getLaw with no section returns every section', () => {
  const law = getLaw();
  assert.ok(law.motion);
  assert.ok(law.buttons);
});

test('getLaw with a section returns only that section', () => {
  const law = getLaw('motion');
  assert.deepEqual(Object.keys(law), ['motion']);
});

test('getLaw throws a helpful error for an unknown section', () => {
  assert.throws(() => getLaw('not-a-real-section'), /Known sections:/);
});

test('searchRegistry finds the dialog registry item by keyword', () => {
  const results = searchRegistry('dialog');
  assert.ok(results.some((r) => r.name === 'dialog'));
});

test('searchRegistry is case-insensitive and returns nothing for a nonsense query', () => {
  assert.deepEqual(searchRegistry('zzz-nonexistent-zzz'), []);
  assert.ok(searchRegistry('DIALOG').some((r) => r.name === 'dialog'));
});

test('createServer registers all six tools without throwing', () => {
  const server = createServer();
  assert.ok(server);
});
