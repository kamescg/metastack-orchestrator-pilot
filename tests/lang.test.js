import { test } from 'node:test';
import assert from 'node:assert/strict';
import { GREETING_PREFIXES, isLanguage } from '../src/lang.js';

test('FR-202: GREETING_PREFIXES holds exactly the four supported translations', () => {
  assert.deepEqual(GREETING_PREFIXES, {
    en: 'Hello',
    es: 'Hola',
    fr: 'Bonjour',
    de: 'Hallo',
  });
});

test('FR-202: GREETING_PREFIXES is frozen', () => {
  assert.equal(Object.isFrozen(GREETING_PREFIXES), true);
  assert.throws(() => {
    GREETING_PREFIXES.en = 'Hi';
  }, TypeError);
  assert.equal(GREETING_PREFIXES.en, 'Hello');
});

for (const code of ['en', 'es', 'fr', 'de']) {
  test(`FR-202: isLanguage accepts supported code ${code}`, () => {
    assert.equal(isLanguage(code), true);
  });
}

for (const [label, code] of [
  ['unknown code', 'zz'],
  ['empty string', ''],
  ['upper-case code', 'EN'],
  ['padded code', ' en'],
  ['undefined', undefined],
  ['null', null],
  ['number', 1],
  ['prototype key constructor', 'constructor'],
  ['prototype key toString', 'toString'],
  ['prototype key __proto__', '__proto__'],
  ['prototype key hasOwnProperty', 'hasOwnProperty'],
]) {
  test(`FR-202: isLanguage rejects ${label}`, () => {
    assert.equal(isLanguage(code), false);
  });
}
