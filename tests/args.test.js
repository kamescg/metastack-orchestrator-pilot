import { test } from 'node:test';
import assert from 'node:assert/strict';
import { parseCliArgs, USAGE } from '../src/args.js';

const success = (overrides = {}) => ({
  ok: true,
  options: { name: 'Ada', shout: false, json: false, repeat: 1, ...overrides },
});

test('FR-105: exact authorized usage and default options', () => {
  assert.equal(USAGE, 'Usage: node bin/hello.js [--shout] [--json] [--repeat <n>] <name>');
  assert.deepEqual(parseCliArgs(['Ada']), success());
});

for (const argv of [[], ['--shout'], ['--json'], ['--repeat', '2'], [''], ['', 'Ada'], ['--json', '', 'Ada']]) {
  test(`FR-105: missing or empty first name ${JSON.stringify(argv)}`, () => {
    assert.deepEqual(parseCliArgs(argv), { ok: false, reason: 'missing-name' });
  });
}

for (const value of ['1', '2', '3', '0002', '9007199254740990', '9007199254740991', '0009007199254740991']) {
  for (const argv of [['--repeat', value, 'Ada'], [`--repeat=${value}`, 'Ada']]) {
    test(`FR-101: valid repeat ${JSON.stringify(argv)}`, () => {
      assert.deepEqual(parseCliArgs(argv), success({ repeat: Number(value) }));
    });
  }
}

for (const value of ['0', '000', '-1', 'abc', '1.5', '', '1e3', '9007199254740992', '9007199254740993', '9'.repeat(400), '+1', ' 2', '2 ', '0x10', 'Infinity', 'NaN', '2\n', '--json', '--']) {
  for (const argv of [['--repeat', value, 'Ada'], [`--repeat=${value}`, 'Ada']]) {
    test(`FR-102: invalid repeat ${JSON.stringify(argv)}`, () => {
      assert.deepEqual(parseCliArgs(argv), { ok: false, reason: 'invalid-repeat' });
    });
  }
}

for (const argv of [['--repeat'], ['Ada', '--repeat'], ['--repeat', 'Ada'], ['--repeat', '--json', 'Ada']]) {
  test(`FR-102: missing repeat value ${JSON.stringify(argv)}`, () => {
    assert.deepEqual(parseCliArgs(argv), { ok: false, reason: 'invalid-repeat' });
  });
}

test('FR-101: last valid repeat occurrence wins across syntaxes and positions', () => {
  assert.deepEqual(parseCliArgs(['--repeat', '3', 'Ada', '--repeat=2', '--repeat', '0001']), success());
});

for (const argv of [
  ['--repeat', '0', '--repeat', '2', 'Ada'],
  ['--repeat=abc', 'Ada', '--repeat=2'],
  ['--repeat', '--repeat=2', 'Ada'],
  ['--repeat=2', 'Ada', '--repeat=0'],
  ['Ada', '--repeat=2', '--repeat'],
]) {
  test(`FR-102: validate every repeat occurrence ${JSON.stringify(argv)}`, () => {
    assert.deepEqual(parseCliArgs(argv), { ok: false, reason: 'invalid-repeat' });
  });
}

for (const argv of [
  ['--json', '--repeat', '2', '--shout', 'Ada'],
  ['Ada', '--repeat', '2', '--json', '--shout'],
  ['--json', 'Ada', '--repeat=2', '--shout'],
]) {
  test(`FR-104: options before, after and around name ${JSON.stringify(argv)}`, () => {
    assert.deepEqual(parseCliArgs(argv), success({ json: true, shout: true, repeat: 2 }));
  });
}

test('FR-104: trailing booleans compose and duplicates are idempotent', () => {
  assert.deepEqual(parseCliArgs(['Ada', '--json', '--shout']), success({ json: true, shout: true }));
  assert.deepEqual(parseCliArgs(['--json', '--shout', 'Ada', '--shout', '--json']), success({ json: true, shout: true }));
});

for (const option of ['--verbose', '-v', '--help', '--json=true', '--json=false', '--json=', '--shout=true', '--shout=false', '--shout=', '--repeat-count=2']) {
  for (const argv of [[option, 'Ada'], ['Ada', option], ['Ada', 'extra', option]]) {
    test(`FR-106: reject unknown or malformed option ${JSON.stringify(argv)}`, () => {
      assert.deepEqual(parseCliArgs(argv), { ok: false, reason: 'unknown-option' });
    });
  }
}

test('FR-105: ignore extra positionals while continuing to parse options', () => {
  assert.deepEqual(parseCliArgs(['Ada', 'extra']), success());
  assert.deepEqual(parseCliArgs(['Ada', '', 'extra', '--shout']), success({ shout: true }));
});

test('D-101: terminator makes remaining arguments positional', () => {
  assert.deepEqual(parseCliArgs(['--', '--json', '--shout']), success({ name: '--json' }));
  assert.deepEqual(parseCliArgs(['--shout', '--', '-Ada']), success({ name: '-Ada', shout: true }));
  assert.deepEqual(parseCliArgs(['Ada', '--', '--verbose', '--repeat=0']), success());
  assert.deepEqual(parseCliArgs(['--', '--']), success({ name: '--' }));
  assert.deepEqual(parseCliArgs(['--']), { ok: false, reason: 'missing-name' });
  assert.deepEqual(parseCliArgs(['--', '', 'Ada']), { ok: false, reason: 'missing-name' });
});
