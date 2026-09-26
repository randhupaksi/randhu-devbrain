# Risk Model

The [session baseline](../runtime/session-baseline.md#risk-and-approval-boundaries) always carries three risk levels. Use this module when more detailed impact analysis is needed.

| Level | Examples | Action |
|---|---|---|
| Low | UI polish, responsive/accessibility, states, isolated cleanup/refactoring, naming, docs, relevant tests, evidence-based performance | Implement within the active intent; validate proportionately |
| Medium | Multi-file refactoring, shared UI across features, page/service/query boundaries, compatible API integration, feature redesign | Map consumers, behavior, reversibility, and validation; proceed without extra approval |
| High | Client/production data, destructive migration/data rewrite, authentication/permission/security boundary, payment, deployment, secrets, breaking API, risky database change, commit/push/history, OS/admin/registry, irreversible action | Stop before the action if specific confirmation of target/scope/risk is missing; complete safe work |

Diff size is not the main measure. Authentication/security/breaking-contract changes remain high risk even when they are local code or a one-line change. Reading contracts, auditing permissions, and planning without mutation do not cross a boundary.

Before a data operation, classify environment, data ownership/class, operation type, exposure, blast radius, and rollback. Unknown data ownership does not permit using that data for tests. Use isolated synthetic fixtures.

A requested compatible additive migration file may be prepared after analysis; executing a risky migration is a separate decision. Destructive migrations or data rewrites require specific confirmation. Do not use “it is only local” to bypass contract or security risk.

Authorization is per action. Specific confirmation for the same scope remains valid; a general task/overdelivery request does not cover a hidden high-risk side effect. If the user requests read-only work, do not mutate anything, even if low risk.
