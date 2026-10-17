# hello-cli — product brief

A tiny command-line greeter used to demonstrate the orchestrator. It serves a developer who wants to see one approved plan flow through parallel tracks, independent review, merged PRs, a milestone audit, and a release handoff.

## Users and outcomes

- A shell user runs `node bin/hello.js <name>` and sees a greeting.
- A shell user runs `node bin/hello.js --shout <name>` and sees the greeting in upper case.
- Invalid usage exits non-zero with a usage message on stderr.

## Requirements (development acceptance)

| ID | Requirement | Acceptance |
| --- | --- | --- |
| FR-001 | Greet a named user from the command line | FR-001-AC1: `node bin/hello.js Ada` prints `Hello, Ada!` and exits 0 |
| FR-002 | Shout mode | FR-002-AC1: `node bin/hello.js --shout Ada` prints `HELLO, ADA!` and exits 0 |
| FR-003 | Usage errors | FR-003-AC1: running with no name exits 2 and prints a usage line to stderr |
| NFR-001 | Tests | NFR-001-AC1: `npm test` passes with at least one test per requirement |

## Exclusions

No localization, no configuration files, no network access, no production deployment (outside version one of this example).

## Post-launch outcomes (not verifiable by this run)

- SC-001: Developers adopt the greeter for demos (adoption is observed after launch, not by the orchestrator).
