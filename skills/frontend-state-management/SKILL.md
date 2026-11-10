---
name: frontend-state-management
description: Implement or repair client, server, URL, and asynchronous frontend state with correct cache ownership and race handling. Use for state behavior; visual layout and structural extraction have separate owners.
---

# Frontend State Management

Own state ownership, asynchronous lifecycle, and client cache correctness. Start with the requested outcome, the active project instructions, and the smallest relevant implementation/consumer slice. Use the project's stack and conventions; a skill name does not mandate a library or architecture.

## Work from evidence

- Classify each value as server-owned data, URL/navigation state, durable client state, or transient interaction state. Choose one authority per value and derive the rest.
- Trace query keys, tenant/user identity, cancellation, stale responses, optimistic updates and mutation invalidation. Clear or partition sensitive caches when the identity boundary changes.
- Model loading, refresh, empty, error, partial and success states separately. A cached value during revalidation is different from a first load; preserve meaningful data without hiding failures.
- For optimistic changes, define conflict and rollback behavior, including out-of-order responses and multiple pending writes. Do not overwrite newer state with an old snapshot.
- Use the existing framework/store/query conventions. Avoid adding a global store for local UI state or copying server data into a second mutable store without an explicit synchronization contract.

## Verify the outcome

Use the query/store library's established ownership and cancellation guarantees before adding a second request-ID or mirrored-state mechanism. From a symptom alone, describe likely causes as hypotheses until the callback/cache path is inspected; avoid announcing a specific implementation defect as observed without source evidence.

Reproduce rapid filter changes, navigation back/forward, overlapping requests, failed mutations and account switches as relevant. Check state correctness before claiming rendering performance benefits.

Review and audit requests produce findings without edits. Implementation requests include the authorized change and proportionate verification. Use synthetic fixtures; never copy secrets or client data into artifacts. Existing authorization for a specific target/scope remains valid, while destructive data operations, security-boundary changes, deployment, external sends and Git mutations retain their protected boundaries. Do not stop safe analysis or preparation merely because a later execution boundary needs approval.

## Collaborate by artifact

- Consider `forms-validation` only for a distinct requested subtask; pass submission state and server validation mapping.
- Consider `enterprise-ui-ux` only for a distinct requested subtask; pass available states and interaction requirements.
- Consider `architecture-refactor` only for a distinct requested subtask; pass proven structural ownership problem.

These are optional handoffs to available skills, not dependencies or an automatic chain. Keep ordinary supporting work within this skill. Report the changed behavior, actual evidence, relevant assumptions and remaining limits in the requested format; do not announce a plan or score for a text-only deliverable.

For a distinct realtime-systems task, pass snapshot/replay boundary and event ownership to an available `realtime-systems` skill; do not load it for routine supporting work.
