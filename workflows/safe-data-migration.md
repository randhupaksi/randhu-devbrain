# Safe Data Migration Workflow

Use this workflow for schema, migration, backfill, reseed, repair-script, bulk-mutation, or persistence-data changes. Creating a migration file and running it are different actions.

## 1. Classify first

- Identify the target environment: local, test, development, staging, or production.
- Classify the data: dummy, anonymized, internal non-client, real client/user, or unknown.
- Identify the operation: additive schema, compatible migration, backfill, destructive change, bulk mutation, reseed, or repair.
- Map tables/collections, consumers, invariants, tenant impact, volume, lock/downtime risk, and rollback options.

## 2. Plan

- Prefer additive/backward-compatible migrations where possible.
- Explain preconditions, migration order, compatibility window, rollback/down migration, backup/dry-run, and verification queries that expose no sensitive data.
- Keep code preparation, migration-file creation, local dummy-data execution, and client/production execution distinct.

## 3. Implement safely

- The AI may prepare required additive/compatible migration files, synthetic fixtures, tests, compatibility code, and rollback plans. Destructive migrations/data rewrites require specific confirmation, even when only a local file is being created.
- Do not run destructive/backfill/bulk/reseed/repair operations on client/production data or data with unknown ownership without specific confirmation. “Local” is not an exception for destructive migrations/data rewrites.
- Do not remove columns/tables or change existing semantics without consumer/compatibility analysis.

## 4. Verify and report

- Validate the migration against local/test data when available.
- Check schema, data invariants, rollback, tests, and affected consumers.
- Clearly state what was only prepared versus actually executed, the target environment/data, results, remaining risks, and a safe procedure for any deferred high-risk execution.
