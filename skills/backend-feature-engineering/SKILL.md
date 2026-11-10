---
name: backend-feature-engineering
description: Implement requested backend use cases across handlers, services, persistence, and transaction boundaries. Follow established contracts; select API Contracts when contract design is the main outcome.
---

# Backend Feature Engineering

Own backend use-case implementation and transaction/side-effect boundaries. Start with the requested outcome, the active project instructions, and the smallest relevant implementation/consumer slice. Use the project's stack and conventions; a skill name does not mandate a library or architecture.

## Work from evidence

- Trace a comparable use case through request validation, identity, authorization, business rules, data access, and response mapping. Reuse the project boundary instead of imposing a repository pattern.
- Write down state transitions and failure semantics before changing a multi-step operation. Define which writes must commit together and which effects occur after commit.
- Keep external I/O out of long transactions where possible. An email, webhook, or queue send cannot be rolled back by a database transaction; use an existing outbox or explicit recovery design when needed.
- Treat retryable mutations as duplicate-delivery problems. Locate the durable idempotency or uniqueness boundary rather than relying on a disabled submit button.
- Implement the required vertical slice, including validation, consumer-visible errors, and affected callers. Preserve authorization and tenant predicates through every lookup.

## Verify the outcome

Reordering enqueue before the database write does not make them atomic: a consumer can observe a job with no committed entity, and rollback cannot undo accepted external work. Reject that as a safe substitute for durable coordination. Keep proposed implementation states separate from supplied business states; do not invent confirmation transitions, response codes or schema fields as established product facts.

A newly generated entity ID is not an HTTP retry identity when each retry generates another ID. Deduplicating request creation needs a stable client/request identity and durable mapping; deduplicating an outbox/consumer effect is a separate boundary.

Exercise success, business rejection, rollback, duplicate requests, and partial external failure with isolated fixtures. Report untested concurrency or infrastructure behavior rather than assuming it.

Review and audit requests produce findings without edits. Implementation requests include the authorized change and proportionate verification. Use synthetic fixtures; never copy secrets or client data into artifacts. Existing authorization for a specific target/scope remains valid, while destructive data operations, security-boundary changes, deployment, external sends and Git mutations retain their protected boundaries. Do not stop safe analysis or preparation merely because a later execution boundary needs approval.

## Collaborate by artifact

- Consider `api-contracts` only for a distinct requested subtask; pass unresolved wire or semantic compatibility decision.
- Consider `database-engineering` only for a distinct requested subtask; pass required integrity and transaction invariants.
- Consider `background-jobs-queues` only for a distinct requested subtask; pass post-commit work and deduplication key.

These are optional handoffs to available skills, not dependencies or an automatic chain. Keep ordinary supporting work within this skill. Report the changed behavior, actual evidence, relevant assumptions and remaining limits in the requested format; do not announce a plan or score for a text-only deliverable.

For a distinct server-caching task, pass authoritative write and invalidation contract to an available `server-caching` skill; do not load it for routine supporting work.
