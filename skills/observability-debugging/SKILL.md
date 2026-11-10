---
name: observability-debugging
description: Diagnose cross-service failures and improve logs, metrics, traces, and actionable alerts from evidence. Routine local debugging uses the existing workflow; instrumentation work selects this skill.
---

# Observability and Debugging

Own cross-boundary diagnosis and useful operational telemetry. Start with the requested outcome, the active project instructions, and the smallest relevant implementation/consumer slice. Use the project's stack and conventions; a skill name does not mandate a library or architecture.

## Work from evidence

- Define the symptom, affected journey, time window, environment and available evidence. Distinguish observed failures from instrumentation gaps and guesses.
- Follow request/job correlation across boundaries. Separate transport, application, dependency, queue and database timings instead of attributing every slow response to one layer.
- Add telemetry at decision/failure boundaries using project conventions. Avoid logging tokens, raw request bodies, sensitive identifiers or unbounded high-cardinality metric labels.
- Record useful context such as operation, safe correlation identifier, error category and retry state. Sampling and aggregation should preserve the incident signal without overwhelming storage.
- Define alert conditions tied to an actionable failure or user outcome, with owner, diagnostic link and recovery check. A single synthetic trace does not establish an SLO or production baseline.

## Verify the outcome

Use synthetic failures to verify error categorization, correlation, redaction and signal emission. Compare comparable observation windows; instrumenting a suspected cause does not prove it was the root cause.

Review and audit requests produce findings without edits. Implementation requests include the authorized change and proportionate verification. Use synthetic fixtures; never copy secrets or client data into artifacts. Existing authorization for a specific target/scope remains valid, while destructive data operations, security-boundary changes, deployment, external sends and Git mutations retain their protected boundaries. Do not stop safe analysis or preparation merely because a later execution boundary needs approval.

## Collaborate by artifact

- Consider `database-query-optimization` only for a distinct requested subtask; pass database timing and supplied redacted query plan.
- Consider `external-service-integrations` only for a distinct requested subtask; pass provider uncertainty and retry evidence.
- Consider `background-jobs-queues` only for a distinct requested subtask; pass lag failure and lease evidence.

These are optional handoffs to available skills, not dependencies or an automatic chain. Keep ordinary supporting work within this skill. Report the changed behavior, actual evidence, relevant assumptions and remaining limits in the requested format; do not announce a plan or score for a text-only deliverable.
