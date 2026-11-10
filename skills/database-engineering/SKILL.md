---
name: database-engineering
description: Design schemas, constraints, transactions, and staged migrations using the project database. Use for data-model correctness; use query optimization for an evidenced query bottleneck.
---

# Database Engineering

Own data integrity, schema evolution, and transaction correctness. Start with the requested outcome, the active project instructions, and the smallest relevant implementation/consumer slice. Use the project's stack and conventions; a skill name does not mandate a library or architecture.

## Work from evidence

- Inspect the database engine/version, migration tool, schema owner, access patterns, and existing constraints. Do not infer production state from a development schema.
- Define invariants first: ownership, uniqueness, nullability, referential integrity, lifecycle, and concurrent writers. Put essential integrity at the database boundary where appropriate.
- For live-compatible evolution, separate expand, backfill, reader/writer transition, and contract stages. Evaluate locks, table rewrites, index construction, and engine-specific transactional DDL using authoritative versioned documentation.
- Prepare bounded, restartable backfills with progress checkpoints and validation queries. Do not label a destructive down migration a safe rollback if it loses newly written data.
- Separate preparing migration files from executing them. Establish environment, data ownership, affected rows, recovery and execution authorization before any real mutation.

## Verify the outcome

Never call DDL nonblocking or safe on most engines without engine/version and workload evidence. Check whether the target column already exists before proposing an addition. Public identifiers may have references or business rules; duplicate-resolution and slug changes are proposals requiring the relevant product decision. Close the concurrent-writer window before concluding that a zero-duplicate precheck makes constraint creation safe.

An application check-then-insert and a second duplicate scan cannot guarantee uniqueness under concurrent writes. Name the durable reservation/constraint or coordinated writer exclusion that closes that window. Dropping a constraint can reopen invalid writes even without deleting data; do not call that rollback safe without considering the integrity guarantee and concurrent consumers.

Use a disposable database or synthetic fixture to check constraints, duplicate/concurrent inserts, rollback and restart behavior when available. Static SQL review does not prove operational safety or engine compatibility.

Review and audit requests produce findings without edits. Implementation requests include the authorized change and proportionate verification. Use synthetic fixtures; never copy secrets or client data into artifacts. Existing authorization for a specific target/scope remains valid, while destructive data operations, security-boundary changes, deployment, external sends and Git mutations retain their protected boundaries. Do not stop safe analysis or preparation merely because a later execution boundary needs approval.

## Collaborate by artifact

- Consider `database-query-optimization` only for a distinct requested subtask; pass schema constraints and representative access patterns.
- Consider `backend-feature-engineering` only for a distinct requested subtask; pass transaction and uniqueness invariants.

These are optional handoffs to available skills, not dependencies or an automatic chain. Keep ordinary supporting work within this skill. Report the changed behavior, actual evidence, relevant assumptions and remaining limits in the requested format; do not announce a plan or score for a text-only deliverable.
