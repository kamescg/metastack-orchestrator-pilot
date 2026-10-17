import { test } from 'node:test';
import assert from 'node:assert/strict';
import { shout } from '../src/format.js';
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
