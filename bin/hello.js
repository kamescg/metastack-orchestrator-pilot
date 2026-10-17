import { greet } from '../src/greet.js';

const name = process.argv[2];

if (!name) {
  console.error('Usage: node bin/hello.js <name>');
  process.exitCode = 2;
} else {
  console.log(greet(name));
}
