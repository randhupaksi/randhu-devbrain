---
name: database-query-optimization
description: Diagnose query latency, N+1 access, indexing, and query plans from measured database evidence. Use for a database bottleneck, not speculative indexing or frontend rendering work.
---

# Database Query Optimization

Own database query cost and result-preserving optimization. Start with the requested outcome, the active project instructions, and the smallest relevant implementation/consumer slice. Use the project's stack and conventions; a skill name does not mandate a library or architecture.

## Work from evidence

- Identify the exact query, parameters, row distribution, authorization predicates, concurrency, and workload. Redact values while retaining enough shape to reproduce the plan.
- Read the plan and timings before suggesting an index. Separate scans, cardinality misestimates, joins, sorts, lock waits, network round trips, and application hydration.
- EXPLAIN ANALYZE may execute the query, including writes on some engines. Establish a permitted isolated environment before executing it; use supplied plans for read-only analysis.
- Choose a targeted fix: projection, query shape, pagination, batching or an index justified by selectivity and access order. Consider write cost, storage, redundant indexes and maintenance.
- Preserve row membership, ordering, counts, transaction semantics and tenant filters. Verify deterministic pagination with ties and concurrent writes; do not remove predicates to improve a benchmark.

## Verify the outcome

Compare results and plans under comparable synthetic workloads, with cold/warm conditions and representative cardinalities noted. Distinguish estimated plan improvement from measured latency change.

Review and audit requests produce findings without edits. Implementation requests include the authorized change and proportionate verification. Use synthetic fixtures; never copy secrets or client data into artifacts. Existing authorization for a specific target/scope remains valid, while destructive data operations, security-boundary changes, deployment, external sends and Git mutations retain their protected boundaries. Do not stop safe analysis or preparation merely because a later execution boundary needs approval.

## Collaborate by artifact

- Consider `database-engineering` only for a distinct requested subtask; pass index migration and lock implications.
- Consider `frontend-performance` only for a distinct requested subtask; pass measured server contribution to the user journey.

These are optional handoffs to available skills, not dependencies or an automatic chain. Keep ordinary supporting work within this skill. Report the changed behavior, actual evidence, relevant assumptions and remaining limits in the requested format; do not announce a plan or score for a text-only deliverable.
