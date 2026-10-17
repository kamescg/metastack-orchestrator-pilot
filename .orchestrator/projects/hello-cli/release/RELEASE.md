# Release report — hello-cli

- Run: `run_mvbnjj9a24a14f7987` — status **RUNNING** (resumed)
- Phase: release-docs; generated 2026-10-17T00:35:18.722Z
- Baseline `7c753f6df0b9` → target `main`; plan revision `0bf832af5325`

## Objective

Ship a tiny greeter CLI with a shout mode, usage errors, and tests

## Scope: approved vs delivered

4 of 4 development requirements fully met in the final audit.

Post-launch outcomes (not verifiable by a coding run):
- SC-001: Developers adopt the greeter for demos

## Requirement evidence

| Requirement | Criterion | Audit | Delivering tasks |
| --- | --- | --- | --- |
| FR-001 | FR-001-AC1: node bin/hello.js Ada prints Hello, Ada! and exits 0 | met | T1 (merged 13628ba865) |
| FR-002 | FR-002-AC1: node bin/hello.js --shout Ada prints HELLO, ADA! and exits 0 | met | T3 (merged 9c277d7ea3) |
| FR-003 | FR-003-AC1: running with no name exits 2 and prints a usage line to stderr | met | T1 (merged 13628ba865) |
| NFR-001 | NFR-001-AC1: npm test passes with at least one test per functional requirement | met | T1 (merged 13628ba865), T2 (merged f4e67d7c0e), T3 (merged 9c277d7ea3) |
| SC-001 | SC-001-AC1: At least 3 demos use it within 30 days of launch | manual check not recorded | — |

## Merged pull requests

- T1: https://github.com/kamescg/metastack-orchestrator-pilot/pull/2 → `13628ba86548` (risk standard)
- T2: https://github.com/kamescg/metastack-orchestrator-pilot/pull/1 → `f4e67d7c0e35` (risk elevated)
- T3: https://github.com/kamescg/metastack-orchestrator-pilot/pull/3 → `9c277d7ea3cc` (risk standard)

## Decisions and amendments

- D-001 Entry point: bin/hello.js parses argv and owns exit codes; src/greet.js stays pure
- D-002 Shout formatting: src/format.js exports shout(text); the CLI composes shout(greet(name))
- D-003 Tests: node --test under tests/; the approved check is npm test
- Amendment AM_mvbnobet9aa01d77c0 (operational, applied): @/private/tmp/claude-501/pilot/amend-t2.json

## Checks and waivers

| Check | Commit | Result | pass/fail/skip |
| --- | --- | --- | --- |
| test | 8f977a1e2727 | pass | 4/0/0 |
| test | c2b987d1f309 | pass | 3/0/0 |
| test | 4bf2a7763761 | pass | 6/0/0 |
| test | dd35d090148e | pass | 8/0/0 |

No waivers.

## Resource consumption

- Model invocations: 16 of 30
- Active time: 0.19 h of 8 h
- Tokens: 1131270 in / 75651 out; reported cost: $6.81 (provider estimate)
- Attempts with unknown usage: 0

## Release notes

- T1 (FR-001, FR-003, NFR-001): Add bin/hello.js that greets a named user and reports usage errors
- T2 (NFR-001): Add src/format.js with shout(text) and its tests (the --shout CLI behavior is delivered by T3)
- T3 (FR-002, NFR-001): Wire --shout through bin/hello.js using shout()

## Operating instructions

Merged revision: target branch `main` at audited commit `9c277d7ea3ccaa0c8d5f3bde6a724842e69a6a35`.
Verify locally with the approved checks:
  - test: `npm test`
Setup, migration, and rollback instructions specific to the product live in the product/design documents and the merged code; rollback is a reviewed revert PR, never an unrecorded reset.

## Exceptions

- [resolved] review_blocked:T2: review could not establish required evidence: Direct execution of `npm test` at head 8f977a1 (relied on runner evidence EV_mvbnkd0idfc6d5701e).; Direct execution of `node bin/hello.js --shout Ada` (impossible at this head: file absent). → Provide the missing evidence or amend the verification plan.

## Manual checks

- SC-001-AC1 (optional): At least 3 demos use it within 30 days of launch — not performed by the runner

## Limitations and risks

- RELEASE_READY means the approved development scope is complete and the release package is prepared; production was not deployed and no real traffic was observed.
- No browser or manual UI review was performed by the runner unless explicitly authorized in policy.
- Runner check evidence is local to the orchestrator host; GitHub required checks were authoritative for merges.
- No commands were permitted, so no test, CLI, or git command was executed; all verdicts are from reading the source at the frozen snapshot.
- Tool set in this attempt had no file-writing capability, so result.json was not written to resultPath and no scratch artifacts were produced.
- Git history shows two consecutive commits with the identical T3 message (dd35d09 and 9c277d7); this is a process observation from the supplied status snapshot, not inspected further and not a product gap.
- Node.js engine compatibility (18+ for node:test) is assumed; package.json declares no engines constraint.
