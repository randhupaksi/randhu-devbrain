---
name: testing-strategy
description: Plan and implement focused tests for changed behavior, fragile flows, or missing coverage using the project's existing tools. Use when test strategy or test implementation is the task, not for routine validation alone.
metadata:
  short-description: Choose and implement meaningful tests
---

# Testing Strategy

Use this skill when the developer asks for a test plan, meaningful coverage, test implementation, or repair of unreliable tests. A normal coding task still receives proportionate verification through its workflow; it does not need this skill simply because a test command exists.

## Task mode and scope

- A review or plan request produces findings and a proposed test approach without editing files.
- A request to add, improve, or fix tests includes implementation and execution where the project environment permits. Complete the requested coverage rather than stopping at a strategy document.
- Read the active project's test commands, framework, patterns, target behavior, and existing tests. Do not install a second framework or reorganize the whole suite without a demonstrated need.

## Choose evidence for the behavior

1. Identify the observable behavior, contracts, invariants, failure modes, and risk of the change. Separate code that needs a meaningful test from trivial or already covered detail.
2. Choose the lowest-cost layer that can catch the relevant failure: focused unit tests for isolated logic, integration tests for collaborating modules, contract tests for consumer-visible API behavior, and end-to-end checks for a critical user flow. A combination is justified only when each layer catches a distinct risk.
3. Design cases from inputs and outcomes, including important negative, boundary, error, permission, retry, or concurrency behavior where applicable. Avoid tests that merely repeat the implementation's branches or snapshot every incidental markup detail.
4. Use deterministic synthetic fixtures. Keep real client, production, personal, or secret data out of tests and logs.

Read [references/test-selection.md](references/test-selection.md) when selecting layers for a broad feature, API, or flaky suite. For a narrow behavior fix with an obvious existing pattern, work directly.

## Implement and verify

Follow the repository's established test style and run the focused checks available. If a test fails, determine whether the expectation, fixture, environment, or product behavior is wrong; do not alter production behavior solely to make a weak test pass. Check affected consumers and contracts when coverage spans shared code. Report what behavior is covered, which tests ran, failures and limits, and any important risk that remains untested.

## Authorization and selective use

Follow system and project instructions and the latest user request. Low-risk test additions can proceed directly; analyze medium-risk harness or shared fixture changes before implementation. Tests do not authorize authentication or permission changes, breaking APIs, client or production data mutations, destructive migrations, deployment, secrets, Git commit/push/history, or other hard-to-reverse actions. Keep this skill selective; routine lint, build, or test execution alone does not trigger it.
