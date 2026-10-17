import { greet } from '../src/greet.js';
import { shout } from '../src/format.js';

const shoutMode = process.argv[2] === '--shout';
const name = process.argv[shoutMode ? 3 : 2];

if (!name) {
  console.error('Usage: node bin/hello.js <name>');
  process.exitCode = 2;
} else {
  console.log(shoutMode ? shout(greet(name)) : greet(name));
}
