export const USAGE = 'Usage: node bin/hello.js [--shout] [--json] [--repeat <n>] <name>';

export function parseCliArgs(argv) {
  const options = { name: undefined, shout: false, json: false, repeat: 1 };
  let positionalOnly = false;

  for (let index = 0; index < argv.length; index += 1) {
    const argument = argv[index];
    if (!positionalOnly && argument === '--') {
      positionalOnly = true;
    } else if (!positionalOnly && (argument === '--shout' || argument === '--json')) {
      options[argument.slice(2)] = true;
    } else if (!positionalOnly && (argument === '--repeat' || argument.startsWith('--repeat='))) {
      const value = argument === '--repeat' ? argv[++index] : argument.slice('--repeat='.length);
      if (value === undefined || value.length === 0 || /[^0-9]/.test(value)) {
        return { ok: false, reason: 'invalid-repeat' };
      }
      const repeat = Number(value);
      if (!Number.isSafeInteger(repeat) || repeat < 1) {
        return { ok: false, reason: 'invalid-repeat' };
      }
      options.repeat = repeat;
    } else if (!positionalOnly && argument.startsWith('-')) {
      return { ok: false, reason: 'unknown-option' };
    } else if (options.name === undefined) {
      options.name = argument;
    }
  }

  if (options.name === undefined || options.name === '') {
    return { ok: false, reason: 'missing-name' };
  }
  return { ok: true, options };
}
