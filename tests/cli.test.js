import { test } from 'node:test';
import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import { greet } from '../src/greet.js';

const entryPoint = fileURLToPath(new URL('../bin/hello.js', import.meta.url));
const usage = 'Usage: node bin/hello.js [--shout] [--json] [--repeat <n>] <name>\n';

function runCli(argv) {
  const result = spawnSync(process.execPath, [entryPoint, ...argv], { encoding: 'utf8' });
  assert.ifError(result.error);
  assert.equal(result.signal, null);
  return result;
}

function assertSuccess(argv, stdout) {
  const result = runCli(argv);
  assert.equal(result.status, 0);
  assert.equal(result.stdout, stdout);
  assert.equal(result.stderr, '');
}

for (const [criterion, argv, stdout] of [
  ['FR-101-AC1', ['--repeat', '3', 'Ada'], 'Hello, Ada!\nHello, Ada!\nHello, Ada!\n'],
  ['FR-101-AC2', ['--repeat', '1', 'Ada'], 'Hello, Ada!\n'],
  ['FR-101-AC3', ['--repeat=2', 'Ada'], 'Hello, Ada!\nHello, Ada!\n'],
  ['FR-103-AC1', ['--json', 'Ada'], '{"greeting":"Hello, Ada!"}\n'],
  ['FR-104-AC1', ['--shout', '--json', 'Ada'], '{"greeting":"HELLO, ADA!"}\n'],
  ['FR-104-AC2', ['--shout', '--repeat', '2', 'Ada'], 'HELLO, ADA!\nHELLO, ADA!\n'],
  ['FR-104-AC3', ['--json', '--repeat', '2', '--shout', 'Ada'], '{"greeting":"HELLO, ADA!"}\n{"greeting":"HELLO, ADA!"}\n'],
  ['FR-104-AC3', ['--json', '--repeat', '2', 'Ada'], '{"greeting":"Hello, Ada!"}\n{"greeting":"Hello, Ada!"}\n'],
  ['FR-105-AC5', ['Ada', 'extra'], 'Hello, Ada!\n'],
  ['FR-105-AC5', ['Ada', '--shout'], 'HELLO, ADA!\n'],
  ['D-101', ['--repeat=0002', 'Ada', '--repeat', '1'], 'Hello, Ada!\n'],
  ['D-101', ['--json', 'Ada', '--json'], '{"greeting":"Hello, Ada!"}\n'],
  ['D-101', ['--', '--json'], 'Hello, --json!\n'],
]) {
  test(`${criterion}: CLI success ${JSON.stringify(argv)}`, () => {
    assertSuccess(argv, stdout);
  });
}

for (const [criterion, argv] of [
  ...['0', '-1', 'abc', '1.5', '', '1e3', '9007199254740992'].flatMap(value => [
    ['FR-102-AC1/AC2', ['--repeat', value, 'Ada']],
    ['FR-102-AC1/AC2', [`--repeat=${value}`, 'Ada']],
  ]),
  ...[['--repeat', 'Ada'], ['Ada', '--repeat'], ['--repeat', '--json', 'Ada']]
    .map(argv => ['FR-102-AC3', argv]),
  ...[[], ['--shout'], ['--json'], ['--repeat', '2'], [''], ['', 'Ada'], ['--json', '', 'Ada']]
    .map(argv => ['FR-105-AC3', argv]),
  ...['--verbose', '--json=true', '--shout=true'].flatMap(option => [
    ['FR-106-AC1', [option, 'Ada']],
    ['FR-106-AC1', ['Ada', option]],
  ]),
  ['D-101', ['--repeat', '0', '--repeat', '2', 'Ada']],
  ['D-101', ['--repeat', '2', 'Ada', '--repeat=0']],
]) {
  test(`${criterion}: CLI rejects ${JSON.stringify(argv)} before output`, () => {
    const result = runCli(argv);
    assert.equal(result.status, 2);
    assert.equal(result.stdout, '');
    assert.equal(result.stderr, usage);
  });
}

for (const [optionsFirst, variants, stdout] of [
  [['--json', '--shout', 'Ada'], [
    ['Ada', '--json', '--shout'],
    ['--json', 'Ada', '--shout'],
  ], '{"greeting":"HELLO, ADA!"}\n'],
  [['--repeat', '2', '--json', '--shout', 'Ada'], [
    ['Ada', '--repeat', '2', '--json', '--shout'],
    ['--repeat', '2', 'Ada', '--json', '--shout'],
    ['--json', 'Ada', '--repeat=2', '--shout'],
  ], '{"greeting":"HELLO, ADA!"}\n{"greeting":"HELLO, ADA!"}\n'],
]) {
  test(`FR-104-AC4: CLI option positions match ${JSON.stringify(optionsFirst)}`, () => {
    assertSuccess(optionsFirst, stdout);
    for (const argv of variants) assertSuccess(argv, stdout);
  });
}

for (const [label, name] of [
  ['quotes', 'A"da'],
  ['backslashes', 'A\\da'],
  ['newline', 'A\nda'],
  ['tab', 'A\tda'],
]) {
  test(`FR-103-AC2: CLI escapes ${label} in each repeated JSON line`, () => {
    const result = runCli(['--json', '--repeat', '2', name]);
    assert.equal(result.status, 0);
    assert.equal(result.stderr, '');
    assert.equal(result.stdout, `${JSON.stringify({ greeting: greet(name) })}\n`.repeat(2));
    const lines = result.stdout.split('\n');
    assert.equal(lines.pop(), '');
    assert.equal(lines.length, 2);
    for (const line of lines) assert.deepEqual(JSON.parse(line), { greeting: greet(name) });
  });
}

test('FR-001: CLI greets a named user and exits successfully', () => {
  const result = spawnSync(process.execPath, [entryPoint, 'Ada'], { encoding: 'utf8' });

  assert.ifError(result.error);
  assert.equal(result.status, 0);
  assert.equal(result.stdout, 'Hello, Ada!\n');
  assert.equal(result.stderr, '');
});

test('FR-003: CLI reports missing name on stderr and exits 2', () => {
  const result = spawnSync(process.execPath, [entryPoint], { encoding: 'utf8' });

  assert.ifError(result.error);
  assert.equal(result.status, 2);
  assert.equal(result.stdout, '');
  assert.equal(result.stderr, 'Usage: node bin/hello.js [--shout] [--json] [--repeat <n>] <name>\n');
});

test('FR-002: CLI upper-cases the greeting in shout mode and exits successfully', () => {
  const result = spawnSync(process.execPath, [entryPoint, '--shout', 'Ada'], { encoding: 'utf8' });

  assert.ifError(result.error);
  assert.equal(result.status, 0);
  assert.equal(result.stdout, 'HELLO, ADA!\n');
  assert.equal(result.stderr, '');
});

test('FR-003: shout mode still requires a name', () => {
  const result = spawnSync(process.execPath, [entryPoint, '--shout'], { encoding: 'utf8' });

  assert.ifError(result.error);
  assert.equal(result.status, 2);
  assert.equal(result.stdout, '');
  assert.equal(result.stderr, 'Usage: node bin/hello.js [--shout] [--json] [--repeat <n>] <name>\n');
});
