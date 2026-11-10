---
name: api-contracts
description: Design or evolve producer-consumer API contracts, compatibility, errors, and versioning. Use when the contract itself is the outcome; ordinary implementation follows the existing contract.
---

# API Contracts

Own api shapes, compatibility decisions, and producer-consumer acceptance examples. Start with the requested outcome, the active project instructions, and the smallest relevant implementation/consumer slice. Use the project's stack and conventions; a skill name does not mandate a library or architecture.

## Work from evidence

- Read actual routes, schemas, generated clients, validators, and affected consumers; distinguish observed behavior from intended changes.
- Specify success and failure shapes, null versus absent fields, identifiers, dates, pagination order, and idempotency only where the operation needs them. Preserve field meaning across transport and persistence.
- Classify every change for wire and semantic compatibility. Additive fields can still break strict decoders or expose data; map consumers before calling a change compatible.
- For a breaking change, prepare a version or staged migration with deprecation and consumer acceptance criteria. Contract design does not authorize switching consumers or deploying.
- Use the existing schema owner; avoid parallel handwritten types that can silently drift. Show representative valid and invalid requests and responses without private data.

## Verify the outcome

Treat named fields, routes, status codes and negotiation mechanisms as proposals until project evidence establishes them. Do not infer a decoder library's behavior from its name, invent transition flags, or promise zero compatibility risk without checking strict consumers, intermediary caches and version negotiation. Keep one authoritative end-of-list representation unless a real consumer needs another.

The first cursor-mode request has no continuation token yet. Its capability/version negotiation must therefore work independently of cursor presence; otherwise the new client cannot discover the first next-page token. Check first-page discovery and cache separation as well as subsequent pages.

Compare producer validation and consumer parsing for omitted/null values, unknown fields, error envelopes and pagination boundaries. A schema parse alone does not establish consumer compatibility.

Review and audit requests produce findings without edits. Implementation requests include the authorized change and proportionate verification. Use synthetic fixtures; never copy secrets or client data into artifacts. Existing authorization for a specific target/scope remains valid, while destructive data operations, security-boundary changes, deployment, external sends and Git mutations retain their protected boundaries. Do not stop safe analysis or preparation merely because a later execution boundary needs approval.

## Collaborate by artifact

- Consider `backend-feature-engineering` only for a distinct requested subtask; pass accepted contract and consumer acceptance cases.
- Consider `external-service-integrations` only for a distinct requested subtask; pass provider constraints and failure contract.

These are optional handoffs to available skills, not dependencies or an automatic chain. Keep ordinary supporting work within this skill. Report the changed behavior, actual evidence, relevant assumptions and remaining limits in the requested format; do not announce a plan or score for a text-only deliverable.
