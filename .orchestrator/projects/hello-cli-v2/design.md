# hello-cli v2 design

## Observed foundation and authority

Inspected package.json, bin/hello.js, src/greet.js, src/format.js, existing tests, README.md, the test workflow, repository configuration and existing planning materials. Workspace file search found no AGENTS.md or CLAUDE.md; the supplied AGENTS instructions apply. The manifest uses ESM with no dependencies; npm test runs node --test --test-reporter=spec. Existing tests use node:test, strict assertions and spawnSync. The workflow specifies Node 24. No project checks ran.

Observed source behavior: only an initial --shout is recognized, the first selected name is used, extra arguments are ignored, and missing/empty names report the old usage line with exit 2. Predictions about those invocations are source-derived, not executed evidence. The packet's Q-003 answer authorizes the three specified compatibility changes. The older plan-review report is historical evidence, not authority or proof that the revised package passes review. Its sole-check concern is addressed by keeping all behavioral checks inside npm test.

## Interfaces and data model

D-101: T1 owns args-contract in src/args.js. Export parseCliArgs(argv: string[]) returning either {ok:true, options:{name:string, shout:boolean, json:boolean, repeat:number}} or {ok:false, reason:'unknown-option'|'missing-name'|'invalid-repeat'}, plus USAGE. Arguments exclude the Node executable and script path. Use strict node:util parseArgs with allowPositionals and token inspection, or an equally small dependency-free implementation preserving this contract. Recognize shout/json booleans and repeat strings before or after the name. Validate every repeat occurrence, including overwritten values. Counts must match /^[0-9]+$/, convert to a safe integer, and be at least 1. Accept equals syntax and leading zeros; last valid count wins. Reject missing values and malformed boolean assignments. Duplicate boolean flags are idempotent. Respect -- as the option terminator. Choose the first positional name and ignore additional positionals, preserving legacy behavior; missing or empty first names fail. A name starting with an option prefix can be passed after --. Expected parsing failures return structured errors; unrelated defects must not be hidden as usage errors.

D-102: T2 owns format-contract. Preserve shout(text), add toJson(text) = JSON.stringify({greeting:text}). The transient output schema is {greeting:string}; no storage model is needed. Shout the greeting before serialization so the property name remains lowercase.

D-103: T3 owns process effects in bin/hello.js. Parse before output. On failure print USAGE once to stderr and set process.exitCode=2. On success compute greet(name), optionally shout, optionally serialize, then print the resulting string repeat times in a loop. Do not construct an array or concatenate the entire repeated output.

D-104: Exact USAGE is 'Usage: node bin/hello.js [--shout] [--json] [--repeat <n>] <name>'. Updating existing exact usage assertions is authorized by Q-003. No --help feature is introduced.

D-105: Preserve node:test and strict assertions. Parser tests cover defaults, positions, duplicates, every invalid repeat occurrence, equals syntax, leading zeros, safe-integer boundaries, empty/missing name, option terminator and extra positionals. Test the maximum safe count only in the pure parser, never by emitting that many greetings. Serializer tests cover escaping and round trips, including NUL at the pure function boundary. CLI tests use spawnSync(process.execPath, [entryPoint, ...args], {encoding:'utf8'}), assert spawn errors, status, exact stdout and stderr, and exercise small counts. Inspect changed test scripts before execution. npm test is the sole proposed executable check; no direct CLI probes or browser checks.

D-106: Retain existing ESM, dependency-free installation and Node 24 CI. No infrastructure task is needed. Implementation excludes README.md, package.json, src/greet.js, tests/greet.test.js, .github/** and .orchestrator/**. The packet baseline is c858777df3c0146bb45c9f783b054a98bd547489; this attempt did not independently verify HEAD or baseline test success.

## Incremental graph and ownership

T1 -> T3; T2 -> T3. T1 owns parser/usage and parser tests. T2 owns serialization and format tests. T3 consumes both interfaces, owns CLI integration/tests, and may make interface-preserving repairs in the two source modules. Changes to agreed interfaces require a structured planning request. Logical independence permits separate focused review cycles but grants no authority to spawn agents.

M1 acceptance: independent plan review completed; T1 and T2 delivered with unit coverage; bin/hello.js unchanged; the approved npm test check passes on the integrated target. This milestone prepares the interfaces without claiming new CLI functionality.

M2 acceptance: T3 integrated into the approved main target; all development criteria have mapped passing evidence; excluded files remain unchanged. The runner must supply authorized integration mechanics. This packet does not authorize remote Git operations or state mutation.

## Current boundary and missing evidence

This attempt permits workspace reading/search only. No executable project checks, writes, agents, remote operations or browser work were performed. The proposed future policy requires independent review and grants no present authority. Formal plan.v1 and output schemas were not supplied or found, so the package follows the existing plan structure without claiming schema validation. Read-only restrictions prevented writing the result or scratch artifacts.
