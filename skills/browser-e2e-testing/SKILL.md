---
name: browser-e2e-testing
description: Implement and repair browser tests for real user flows, deterministic fixtures, and flaky interactions using existing project tools. General test-layer selection remains with testing strategy.
---

# Browser End-to-End Testing

Own browser journey evidence and maintainable end-to-end checks. Start with the requested outcome, the active project instructions, and the smallest relevant implementation/consumer slice. Use the project's stack and conventions; a skill name does not mandate a library or architecture.

## Work from evidence

- Read the existing runner, app startup contract, test isolation and selectors. Choose a critical journey and its user-visible success/failure outcome before scripting clicks.
- Use synthetic accounts/data and isolated storage. Avoid real payments, messages or production mutations; inspect network side effects before invoking a flow.
- Prefer accessible role/name or established test identifiers. Wait for meaningful UI/network state instead of arbitrary sleeps, and preserve failures rather than hiding them with retries.
- Control nondeterministic dependencies where the test contract permits. Distinguish a mocked boundary from an end-to-end exercised service and disclose which layers are real.
- Capture traces/screenshots only as needed, redact sensitive state, and clean up resources created by this run within the permitted workspace. Do not kill unrelated servers or delete shared data.

## Verify the outcome

Do not require a transient loading indicator to become visible merely to reach a ready state: fast/cached responses may skip an observable loading frame. Assert readiness directly. Test the loading state separately with a controlled response delay only when that state is part of the requirement.

Run the targeted flow repeatedly only when flakiness is the concern; check its important failure/recovery state. A passing click script does not establish visual quality, accessibility conformance, or all-browser compatibility.

Review and audit requests produce findings without edits. Implementation requests include the authorized change and proportionate verification. Use synthetic fixtures; never copy secrets or client data into artifacts. Existing authorization for a specific target/scope remains valid, while destructive data operations, security-boundary changes, deployment, external sends and Git mutations retain their protected boundaries. Do not stop safe analysis or preparation merely because a later execution boundary needs approval.

## Collaborate by artifact

- Consider `testing-strategy` only for a distinct requested subtask; pass browser evidence and remaining lower-layer coverage gap.
- Consider `accessibility-audit` only for a distinct requested subtask; pass demonstrated keyboard or naming barrier.
- Consider `frontend-state-management` only for a distinct requested subtask; pass reproducible asynchronous state failure.

These are optional handoffs to available skills, not dependencies or an automatic chain. Keep ordinary supporting work within this skill. Report the changed behavior, actual evidence, relevant assumptions and remaining limits in the requested format; do not announce a plan or score for a text-only deliverable.
