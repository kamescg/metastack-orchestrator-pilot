# hello-cli — design

- **D-001 Entry point**: `bin/hello.js` parses `process.argv`, delegates to `src/greet.js`, and owns exit codes. Rationale: keep formatting pure and testable.
- **D-002 Shout formatting**: `src/format.js` exports `shout(text)`; the CLI composes `shout(greet(name))`. Rationale: independent track with a narrow interface (`shout(string): string`).
- **D-003 Tests**: `node --test` under `tests/`, no extra dependencies. The approved check is `npm test`.

Interface contract between tracks: `src/format.js` exports `shout(text: string): string`. The CLI (track `cli`) consumes it; the formatting track owns it.
