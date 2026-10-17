import { test } from 'node:test';
import assert from 'node:assert/strict';
import { greet } from '../src/greet.js';

test('greets by name', () => {
  assert.equal(greet('Ada'), 'Hello, Ada!');
});

test('FR-202-AC1: one-argument greet and explicit en produce the same English greeting', () => {
  assert.equal(greet('Ada'), 'Hello, Ada!');
  assert.equal(greet('Ada', 'en'), 'Hello, Ada!');
  assert.equal(greet('Ada', undefined), 'Hello, Ada!');
});

for (const [lang, expected] of [
  ['en', 'Hello, Ada!'],
  ['es', 'Hola, Ada!'],
  ['fr', 'Bonjour, Ada!'],
  ['de', 'Hallo, Ada!'],
]) {
  test(`FR-202-AC1: greet('Ada', '${lang}') returns '${expected}'`, () => {
    assert.equal(greet('Ada', lang), expected);
  });
}

for (const [label, lang] of [
  ['unknown code', 'zz'],
  ['empty string', ''],
  ['upper-case code', 'EN'],
  ['null', null],
  ['prototype key constructor', 'constructor'],
  ['prototype key __proto__', '__proto__'],
]) {
  test(`FR-202: greet throws RangeError for unsupported explicit language (${label})`, () => {
    assert.throws(() => greet('Ada', lang), RangeError);
  });
}
