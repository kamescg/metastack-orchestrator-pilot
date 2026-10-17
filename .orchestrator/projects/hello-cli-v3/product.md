# hello-cli v3

The software serves shell users requesting named greetings and script authors consuming JSON. It must provide discoverable usage through --help, select English, Spanish, French or German greetings, and compose language selection with existing shout, JSON and repetition behavior.

FR-201 defines help: valid help invocations emit exactly one usage line to stdout, exit 0 and emit no greeting, including when no name is supplied. FR-202 defines exact translated greetings and backward-compatible greet(name). FR-203 defines usage errors: missing or unsupported language codes produce empty stdout, exit 2 and usage on stderr. FR-204 defines composition and JSON language metadata. NFR-201 preserves unaffected behavior and the approved change boundary. Measurable scenarios are specified under these stable IDs in the plan.

The supplied answer to Q-201 resolves the observed compatibility conflict: update only existing assertions directly superseded by help recognition, the expanded usage line, parser options and CLI JSON lang metadata. Preserve all other regression assertions. The supplied answer to Q-202 establishes that option validation takes precedence over help; help waives only the name requirement.

Exclusions are dependencies, README and workflow changes, unrelated parser cleanup, deployment, persistence, network services, telemetry, browser QA and new installation mechanisms. Existing direct execution through node bin/hello.js remains the operational entry point. No infrastructure prerequisite is identified from the inspected source and package manifest.

Development evidence: T1 delivers FR-202-AC1 through translation and greet unit tests. T2 integrates the complete feature and delivers FR-201-AC1/AC2, FR-202-AC2, FR-203-AC1/AC2, FR-204-AC1/AC2 and NFR-201-AC1/AC2 through parser/module tests, direct child-process CLI tests, the proposed test check and change-scope review. T2 is the point where all complete requirements are observable.

Business outcomes are easier help discovery and useful multilingual greetings. These require post-launch observation and are not development acceptance gates. No adoption target or collection of telemetry is authorized.

This attempt inspected source and tests but ran no project checks. Future acceptance requires observed passing results, not this planning assessment.
