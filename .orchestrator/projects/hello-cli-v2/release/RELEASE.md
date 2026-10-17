# Release report — hello-cli-v2

- Run: `run_mvbtiscgc6489da220` — status **RELEASE_READY pending this documentation merge (all other conditions held when generated)**
- Phase: release-docs; generated 2026-10-17T03:29:16.342Z
- Baseline `8cf8f6858035` → target `main`; plan revision `3bb7ab853578`

## Objective

Add --repeat <n> and --json, composing with --shout, preserving existing behavior except the compatibility changes explicitly authorized by Q-003, and add tests.

## Scope: approved vs delivered

7 of 7 development requirements fully met in the final audit.

Post-launch outcomes (not verifiable by a coding run):
- SC-101: Optional inherited post-launch observation of demo consumption of JSON output, not an approved delivery commitment.

## Requirement evidence

| Requirement | Criterion | Audit | Delivering tasks |
| --- | --- | --- | --- |
| FR-101 | FR-101-AC1: --repeat 3 Ada exits 0 with stdout exactly Hello, Ada! followed by newline three times, and empty stderr. | met | T1 (merged 89395ff089), T3 (merged 2851055a5b) |
| FR-101 | FR-101-AC2: --repeat 1 Ada exits 0 with stdout exactly 'Hello, Ada!\n' and empty stderr. | met | T1 (merged 89395ff089), T3 (merged 2851055a5b) |
| FR-101 | FR-101-AC3: --repeat=2 Ada exits 0 with stdout exactly 'Hello, Ada!\nHello, Ada!\n' and empty stderr. | met | T1 (merged 89395ff089), T3 (merged 2851055a5b) |
| FR-102 | FR-102-AC1: --repeat 0 Ada exits 2 with empty stdout and exactly USAGE plus newline on stderr. | met | T1 (merged 89395ff089), T3 (merged 2851055a5b) |
| FR-102 | FR-102-AC2: Separate repeat-value cases for -1, abc, 1.5, empty string, 1e3 and 9007199254740992 exit 2 with empty stdout and exactly USAGE plus newline on stderr. | met | T1 (merged 89395ff089), T3 (merged 2851055a5b) |
| FR-102 | FR-102-AC3: --repeat Ada, Ada --repeat and --repeat --json Ada each exit 2 with empty stdout and exactly USAGE plus newline on stderr. | met | T1 (merged 89395ff089), T3 (merged 2851055a5b) |
| FR-103 | FR-103-AC1: --json Ada exits 0 with stdout exactly '{"greeting":"Hello, Ada!"}\n' and empty stderr. | met | T2 (merged 875baa4819), T3 (merged 2851055a5b) |
| FR-103 | FR-103-AC2: Names containing quotes, backslashes, newline and tab produce valid JSON whose greeting equals greet(name), with one physical line per emission; serializer unit tests additionally cover NUL. | met | T2 (merged 875baa4819), T3 (merged 2851055a5b) |
| FR-104 | FR-104-AC1: --shout --json Ada exits 0 with stdout exactly '{"greeting":"HELLO, ADA!"}\n' and empty stderr. | met | T1 (merged 89395ff089), T2 (merged 875baa4819), T3 (merged 2851055a5b) |
| FR-104 | FR-104-AC2: --shout --repeat 2 Ada exits 0 with stdout exactly 'HELLO, ADA!\nHELLO, ADA!\n' and empty stderr. | met | T1 (merged 89395ff089), T2 (merged 875baa4819), T3 (merged 2851055a5b) |
| FR-104 | FR-104-AC3: --json --repeat 2 --shout Ada emits exactly two compact shouted greeting object lines; --json --repeat 2 Ada emits exactly two compact unshouted greeting object lines. Both exit 0 with empty stderr. | met | T1 (merged 89395ff089), T2 (merged 875baa4819), T3 (merged 2851055a5b) |
| FR-104 | FR-104-AC4: Table-driven CLI cases place options before, after and around the name, including Ada --json --shout and Ada --repeat 2 --json --shout, and assert results equal their corresponding options-first invocations. | met | T1 (merged 89395ff089), T2 (merged 875baa4819), T3 (merged 2851055a5b) |
| FR-105 | FR-105-AC1: Ada exits 0 with stdout exactly 'Hello, Ada!\n' and empty stderr. | met | T1 (merged 89395ff089), T2 (merged 875baa4819), T3 (merged 2851055a5b) |
| FR-105 | FR-105-AC2: --shout Ada exits 0 with stdout exactly 'HELLO, ADA!\n' and empty stderr. | met | T1 (merged 89395ff089), T2 (merged 875baa4819), T3 (merged 2851055a5b) |
| FR-105 | FR-105-AC3: No arguments, --shout alone, --json alone, --repeat 2 without a name, and an empty first name exit 2 with empty stdout and exactly USAGE plus newline on stderr. | met | T1 (merged 89395ff089), T2 (merged 875baa4819), T3 (merged 2851055a5b) |
| FR-105 | FR-105-AC4: Existing greet and shout cases remain passing; greet(name) and shout(text) implementations remain unchanged. | met | T1 (merged 89395ff089), T2 (merged 875baa4819), T3 (merged 2851055a5b) |
| FR-105 | FR-105-AC5: Ada extra still greets Ada once; Ada --shout now shouts as authorized; usage is exactly 'Usage: node bin/hello.js [--shout] [--json] [--repeat <n>] <name>'. | met | T1 (merged 89395ff089), T2 (merged 875baa4819), T3 (merged 2851055a5b) |
| FR-106 | FR-106-AC1: --verbose Ada, Ada --verbose and malformed boolean assignments such as --json=true Ada each exit 2 with empty stdout and exactly USAGE plus newline on stderr. | met | T1 (merged 89395ff089), T3 (merged 2851055a5b) |
| NFR-101 | NFR-101-AC1: After approved integration at M2, observed npm test on main passes with zero failures and each development criterion has mapped test evidence; CLI behavior uses spawnSync. | met | T1 (merged 89395ff089), T2 (merged 875baa4819), T3 (merged 2851055a5b) |
| NFR-101 | NFR-101-AC2: Read-only comparison confirms package.json and excluded paths unchanged, with no new dependencies. | met | T1 (merged 89395ff089), T2 (merged 875baa4819), T3 (merged 2851055a5b) |
| SC-101 | SC-101-AC1: If an owner elects to observe adoption, record whether a demo consumes JSON output within 30 days of release; do not gate development completion on this. | manual check not recorded | — |

## Merged pull requests

- T1: https://github.com/kamescg/metastack-orchestrator-pilot/pull/8 → `89395ff089fc` (risk elevated)
- T2: https://github.com/kamescg/metastack-orchestrator-pilot/pull/7 → `875baa4819be` (risk elevated)
- T3: https://github.com/kamescg/metastack-orchestrator-pilot/pull/9 → `2851055a5b0d` (risk standard)

## Decisions and amendments

- D-101 Parser contract and approved compatibility: T1 owns parseCliArgs(argv) and USAGE in src/args.js. Apply the supplied Q-003 answer: reject unknown options and recognize options before or after the name. Use strict dependency-free parsing with positional support and per-occurrence validation. Repeat defaults to 1; require decimal digits and a positive safe integer; accept leading zeros and equals syntax; validate every occurrence and use the last valid count. Duplicate booleans are idempotent. Respect --. Use the first positional name and ignore extras; missing/empty first names fail. Return the documented structured success/failure contract.
- D-102 JSON formatting: T2 adds toJson(text) = JSON.stringify({greeting:text}); preserve shout(text). Shout before serializing. Default to compact JSON and one object per repetition.
- D-103 CLI process effects: T3 validates before stdout output. Failure prints USAGE once to stderr and sets exitCode 2. Success computes greeting, optional shout, optional JSON, then emits using a repeat loop without a repeated-output array or full repeated string.
- D-104 Authorized usage update: Q-003 authorizes USAGE = 'Usage: node bin/hello.js [--shout] [--json] [--repeat <n>] <name>'. Update existing exact usage assertions accordingly.
- D-105 Verification boundary: Retain node:test, strict assertions and spawnSync CLI tests. Add parser and serializer unit tests and mapped CLI cases. npm test is the sole proposed future executable check. Inspect changed test commands before execution. No checks are authorized or executed in this planning attempt; no browser work or direct CLI spot probes.
- D-106 Existing infrastructure and scope: Retain ESM, dependency-free manifest and Node 24 CI. No infrastructure work. Exclude README.md, package.json, src/greet.js, tests/greet.test.js, .github/** and .orchestrator/** from implementation writes. Supplied baseline is c858777df3c0146bb45c9f783b054a98bd547489; host runtime and baseline test success remain unverified.
- Amendment AM_mvbu4ne395d758fa69 (invalid, rejected): audit AU_mvbu4mjyac1a7072ea of milestone:M2 found gaps: NFR-101-AC1

## Checks and waivers

| Check | Commit | Result | pass/fail/skip |
| --- | --- | --- | --- |
| test | 62f71548a35d | pass | 15/0/0 |
| test | 5a8d36befe80 | pass | 114/0/0 |
| test | c2af424a60b6 | pass | 121/0/0 |
| test | fa61322b9170 | pass | 172/0/0 |

No waivers.

## Resource consumption

- Model invocations: 14 of 30
- Active time: 0.16 h of 8 h
- Tokens: 2134878 in / 29599 out; reported cost: unknown
- Attempts with unknown usage: 0

## Release notes

- T1 (FR-101, FR-102, FR-104, FR-105, FR-106, NFR-101): Implement parser and exact USAGE under the resolved Q-003 contract. Unit-test defaults, missing/empty name, every invalid/missing repeat value, leading zeros, safe-integer boundaries, equals syntax, repeated counts including invalid overwritten values, option positions, unknown options, malformed boolean assignments, duplicate booleans, -- terminator and ignored extra positionals. This enabling module is independently verifiable before CLI wiring.
- T2 (FR-103, FR-104, FR-105, NFR-101): Add toJson(text) and unit cases for compact serialization, shout-before-serialization and escaping/round trips for quotes, backslashes, newline, tab and NUL. Retain existing shout implementation and tests. This enabling formatter is independently verifiable before CLI wiring.
- T3 (FR-101, FR-102, FR-103, FR-104, FR-105, FR-106, NFR-101): Wire parser, usage, greeting, optional shout, JSON and repeat loop into bin/hello.js. Add spawnSync cases for every CLI acceptance criterion, including JSON plus repeat without shout, option positions, unknown options, empty name, extra positionals and escaping. Preserve existing regression coverage with the authorized usage change. Allow only interface-preserving integration repairs in parser/formatter source modules. Verify through the approved npm test check and read-only scope comparison; route broader changes through a structured request.

## Operating instructions

Merged revision: target branch `main` at audited commit `2851055a5b0d2e272e2cea24d915fbd7ac7ce2ce`.
Verify locally with the approved checks:
  - test: `npm test`
Setup, migration, and rollback instructions specific to the product live in the product/design documents and the merged code; rollback is a reviewed revert PR, never an unrecorded reset.

## Exceptions

- [resolved] audit_blocked:milestone:M1: audit of milestone:M1 could not verify: M1-EVIDENCE-TEST, M1-EVIDENCE-REVIEW-SCOPE → Provide the missing evidence or amend the verification approach, then `orchestrator resume` (the audit is repeated once).
- [resolved] review_blocked:T3: review could not establish required evidence: Runner request: provide the authorized npm test execution record tied to integrated main containing fa61322b91704c89d7c341cf023a076f79c22502, including command, revision and zero-failure result. This is the remaining NFR-101-AC1 gate; no implementation repair identified. → Provide the missing evidence or amend the verification plan.
- [resolved] amendment_pending:AM_mvbu4ne395d758fa69: corrective amendment is invalid: task C-1 declares no write scope → Amend the plan manually.

## Manual checks

- SC-101-AC1 (optional): If an owner elects to observe adoption, record whether a demo consumes JSON output within 30 days of release; do not gate development completion on this. — not performed by the runner

## Limitations and risks

- RELEASE_READY means the approved development scope is complete and the release package is prepared; production was not deployed and no real traffic was observed.
- No browser or manual UI review was performed by the runner unless explicitly authorized in policy.
- Runner check evidence is local to the orchestrator host; GitHub required checks were authoritative for merges.
- No project code was executed during this audit because permittedCommands is empty. Behavioral execution evidence comes from the supplied runner observations for the verified identical final tree.
- The workspace is read-only, so no scratch artifact or resultPath file was written; the result is returned in this envelope.
- No browser work or production observation occurred. No manual acceptance criteria were assigned.
