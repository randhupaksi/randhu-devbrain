---
name: background-jobs-queues
description: Implement durable asynchronous jobs, schedules, retries, concurrency, and recovery. Use when work crosses a queue or scheduler boundary; ordinary synchronous handlers use backend feature engineering.
---

# Background Jobs and Queues

Own durable work lifecycle, duplicate delivery, and failure recovery. Start with the requested outcome, the active project instructions, and the smallest relevant implementation/consumer slice. Use the project's stack and conventions; a skill name does not mandate a library or architecture.

## Work from evidence

- Establish the queue delivery, acknowledgement, lease and retry semantics from the actual implementation. Do not promise exactly-once processing from a broker setting alone.
- Define a durable job identity, allowed state transitions and idempotent effects. Acknowledge after the relevant work is durable; make worker crashes and duplicate deliveries recoverable.
- Map the database-to-queue failure window. Use the existing outbox/transactional mechanism or an explicit reconciler when a commit and publish cannot be atomic.
- Bound retries and concurrency, classify permanent versus transient failures, define backoff, poison-message handling and operator-visible recovery. Replaying dead letters needs the same side-effect protections as first delivery.
- Version job payloads for rolling worker deployments. State schedule timezone and overlap policy, and preserve authorization/tenant context without carrying raw session secrets.

## Verify the outcome

An idempotency key protects effects only within the provider's actual scope and retention contract. Preserve the logical operation identity across deliveries and replays; if retention expires while outcome is uncertain, reconcile before resending. A stale worker must not overwrite a newer worker's durable state.

Test crash before/after effect, lost acknowledgement, repeated delivery, stale lease and old payloads using a fake queue or isolated worker. Observe drain/recovery behavior before claiming reliability.

Review and audit requests produce findings without edits. Implementation requests include the authorized change and proportionate verification. Use synthetic fixtures; never copy secrets or client data into artifacts. Existing authorization for a specific target/scope remains valid, while destructive data operations, security-boundary changes, deployment, external sends and Git mutations retain their protected boundaries. Do not stop safe analysis or preparation merely because a later execution boundary needs approval.

## Collaborate by artifact

- Consider `backend-feature-engineering` only for a distinct requested subtask; pass durable job state and post-commit boundary.
- Consider `external-service-integrations` only for a distinct requested subtask; pass external idempotency and uncertain-outcome handling.
- Consider `observability-debugging` only for a distinct requested subtask; pass queue lag retries and failure signals.

These are optional handoffs to available skills, not dependencies or an automatic chain. Keep ordinary supporting work within this skill. Report the changed behavior, actual evidence, relevant assumptions and remaining limits in the requested format; do not announce a plan or score for a text-only deliverable.
