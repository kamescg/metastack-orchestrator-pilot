import { greet } from '../src/greet.js';
import { shout, toJson } from '../src/format.js';
import { parseCliArgs, USAGE } from '../src/args.js';

const parsed = parseCliArgs(process.argv.slice(2));

if (!parsed.ok) {
  console.error(USAGE);
  process.exitCode = 2;
} else {
  const { name, shout: shoutMode, json, repeat } = parsed.options;
  let output = greet(name);
  if (shoutMode) output = shout(output);
  if (json) output = toJson(output);
  for (let index = 0; index < repeat; index += 1) {
    console.log(output);
  }
}
