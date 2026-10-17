import { test } from 'node:test';
import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const entryPoint = fileURLToPath(new URL('../bin/hello.js', import.meta.url));

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
  assert.equal(result.stderr, 'Usage: node bin/hello.js <name>\n');
});
