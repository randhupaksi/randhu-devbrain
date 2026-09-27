# Test Selection

Use this reference when a task spans several behaviors or the right test layer is unclear. Begin with the failure the test must detect; choose tools already used by the project.

| Behavior at risk | Useful evidence | Avoid |
|---|---|---|
| Pure transform, formatter, or rule | Focused unit cases around inputs, outputs, and boundaries | Repeating each source branch as a test |
| Component interaction and state | Component or integration flow with visible feedback and accessibility state | Brittle snapshots of incidental markup |
| API request or response contract | Contract and route tests for status, payload, validation, and errors | Only testing the happy path |
| Data access or transaction | Isolated integration test with synthetic records and rollback | Real client or production data |
| Critical user journey | A small end-to-end flow through the actual UI | Duplicating every unit scenario end to end |
| Retry, concurrency, or idempotency | Controlled repeated or parallel requests with invariant checks | Non-deterministic timing assertions |

For an existing flaky test, reproduce the failure, locate unstable data, clocks, ordering, network, or shared state, then correct that cause. Increasing timeouts or retries can mask the issue; use them only when they reflect a genuine environmental limit. Keep fixtures small and synthetic. When a requested test needs a protected system or real data, identify the boundary and use a safe local substitute until specific authorization exists.
