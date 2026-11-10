---
name: external-service-integrations
description: Integrate provider APIs and inbound webhooks with explicit timeout, retry, signature, and idempotency behavior. Use for external boundaries; internal endpoint implementation has a separate backend owner.
---

# External Service Integrations

Own provider adapters and reliable inbound/outbound integration semantics. Start with the requested outcome, the active project instructions, and the smallest relevant implementation/consumer slice. Use the project's stack and conventions; a skill name does not mandate a library or architecture.

## Work from evidence

- Read current official provider documentation and the existing adapter/configuration without exposing credentials. Record sandbox/live environment and provider contract versions.
- Define timeouts, retry budget, rate limits, cancellation and error mapping. Retry only when the operation is safe or a durable idempotency contract makes uncertain outcomes recoverable.
- Treat a network timeout after a write as an unknown outcome, not proof of failure. Reconcile provider state before issuing another non-idempotent operation.
- For webhooks, verify authenticity using the provider-supported raw-body scheme and key handling; check replay/age policy and deduplicate durable event identifiers. Preserve asynchronous and out-of-order delivery semantics.
- Acknowledge only after durable acceptance where required. Keep provider payloads behind an adapter; avoid leaking internal exceptions or personal data into logs. Configuration work does not authorize sending messages, charging accounts or switching live endpoints.

## Verify the outcome

Verify the provider's idempotency scope, retention period and replay behavior. If an unknown outcome outlives key retention, stop automatic resending and reconcile; a new key can duplicate the effect. Treat identifiers and request fingerprints as stable across job retries and replay.

Use synthetic/sandbox fixtures for timeout-after-acceptance, duplicate/out-of-order events, invalid signature, throttling and provider errors. Never claim a live integration was exercised from a mocked adapter.

Review and audit requests produce findings without edits. Implementation requests include the authorized change and proportionate verification. Use synthetic fixtures; never copy secrets or client data into artifacts. Existing authorization for a specific target/scope remains valid, while destructive data operations, security-boundary changes, deployment, external sends and Git mutations retain their protected boundaries. Do not stop safe analysis or preparation merely because a later execution boundary needs approval.

## Collaborate by artifact

- Consider `background-jobs-queues` only for a distinct requested subtask; pass durable accepted event and replay/deduplication contract.
- Consider `api-contracts` only for a distinct requested subtask; pass provider-to-internal compatibility mapping.
- Consider `observability-debugging` only for a distinct requested subtask; pass redacted correlation and error taxonomy.

These are optional handoffs to available skills, not dependencies or an automatic chain. Keep ordinary supporting work within this skill. Report the changed behavior, actual evidence, relevant assumptions and remaining limits in the requested format; do not announce a plan or score for a text-only deliverable.
