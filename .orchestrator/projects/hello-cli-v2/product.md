# hello-cli v2 product brief

## Users and required behavior

The software serves shell users requesting repeated greetings and script authors consuming structured greetings. FR-101 adds repetition; FR-102 validates counts; FR-103 adds JSON; FR-104 composes both options with shout; FR-105 preserves the remaining existing behavior; FR-106 rejects unknown options. NFR-101 requires dependency-free automated coverage. Exact acceptance scenarios are in plan.requirements.

The supplied answer to Q-003 explicitly authorizes rejecting unknown options, recognizing options before or after the name, and updating usage to list every option. Those changes supersede the draft's compatibility gate. Existing greeting text, shout transformation, and no-name failure behavior remain intact. Extra positional arguments remain ignored because the source does so and the answer does not authorize changing that behavior.

Defaults: compact JSON, one object per repetition, repeat count 1 when omitted, decimal digits with leading zeros accepted, and only positive safe integer counts supported. Every repeat occurrence is validated; the last valid supplied count wins. These are reviewable implementation defaults rather than additional user answers.

## Exclusions

No new dependencies, installation mechanism, network service, persistence, telemetry, localization, deployment, README changes, workflow changes, or browser work. Preserve src/greet.js and the existing shout implementation. No new infrastructure is required.

## Development acceptance and evidence

| Criteria | Delivering tasks | Required future evidence |
| --- | --- | --- |
| FR-101-AC1–AC3 | T1, T3 | Parser unit cases and exact CLI output, exit status and stderr assertions |
| FR-102-AC1–AC3 | T1, T3 | Separate invalid/missing count cases, each asserting no stdout, exit 2 and exact usage stderr |
| FR-103-AC1–AC2 | T2, T3 | Compact output assertion and JSON round trips for quotes, backslashes, newline and tab |
| FR-104-AC1–AC4 | T1, T2, T3 | CLI composition matrix and representative option positions around the name |
| FR-105-AC1–AC3 | T1, T3 | Existing greeting and no-name cases retained, with authorized usage update |
| FR-105-AC4 | T2, T3 | Existing greet/shout tests pass; source comparison confirms implementations unchanged |
| FR-105-AC5 | T1, T3 | Extra-positionals regression, trailing shout recognition and exact usage assertion |
| FR-106-AC1 | T1, T3 | Unknown-option cases before and after the name, including malformed boolean values |
| NFR-101-AC1 | T1, T2, T3 | Observed successful npm test on integrated main and criterion-to-test coverage review |
| NFR-101-AC2 | T1, T2, T3 | Read-only comparison confirms package.json and excluded paths unchanged |

All executable evidence above comes from the proposed sole check, npm test. T1 and T2 are enabling modules: they can be verified independently before T3 exposes the new CLI behavior. Their dependency graph does not authorize spawning agents in this planning attempt.

## Failure, security, installation and operation

Validate all arguments before printing a greeting. Usage errors produce empty stdout, exit 2 and one exact usage line on stderr. Covered successful invocations exit 0 with empty stderr. JSON.stringify escapes user-provided text; tests spawn Node directly without a shell. Plain output retains existing raw name behavior. JSON emits one physical line per repetition for supported newline/tab-containing names; NUL cannot be transported through process arguments and should be tested only at the serializer boundary.

Use the existing direct Node entry point. The manifest has no dependencies and CI specifies Node 24; local runtime availability has not been checked. Repetition uses a loop without allocating an array or a full repeated output string. Very large valid counts can take substantial time and produce substantial output; no smaller arbitrary cap is proposed. New broken-pipe handling is outside scope.

## Business outcomes

SC-101 remains an optional post-launch observation inherited from the draft. An owner may observe demo use of JSON output, but adoption is not a delivery gate. No telemetry or adoption measurement work is included.
