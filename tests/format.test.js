import { test } from 'node:test';
import assert from 'node:assert/strict';
import { shout, toJson } from '../src/format.js';
import { greet } from '../src/greet.js';

test('upper-cases a greeting for shout mode', () => {
  assert.equal(shout(greet('Ada')), 'HELLO, ADA!');
});

test('preserves punctuation and digits while upper-casing text', () => {
  assert.equal(shout('Hello, user 42!'), 'HELLO, USER 42!');
});

test('accepts an empty string', () => {
  assert.equal(shout(''), '');
});

test('FR-103: serializes a greeting as a compact JSON object', () => {
  assert.equal(toJson(greet('Ada')), '{"greeting":"Hello, Ada!"}');
  assert.equal(toJson(''), '{"greeting":""}');
});

test('FR-104: applies shout before JSON serialization', () => {
  assert.equal(toJson(shout(greet('Ada'))), '{"greeting":"HELLO, ADA!"}');
});

for (const [label, name, escapedName] of [
  ['quotes', 'A"da', 'A\\"da'],
  ['backslashes', 'A\\da', 'A\\\\da'],
  ['newline', 'A\nda', 'A\\nda'],
  ['tab', 'A\tda', 'A\\tda'],
  ['NUL', 'A\0da', 'A\\u0000da'],
]) {
  test(`FR-103: escapes and round-trips ${label} in a single JSON line`, () => {
    const greeting = greet(name);
    const serialized = toJson(greeting);

    assert.equal(serialized, `{"greeting":"Hello, ${escapedName}!"}`);
    assert.deepEqual(JSON.parse(serialized), { greeting });
    assert.equal(serialized.includes('\n'), false);
    assert.equal(serialized.includes('\r'), false);
  });
}
