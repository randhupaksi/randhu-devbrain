# API Feature Workflow

Use this workflow for a new endpoint, contract change, frontend/backend integration, service/domain feature, or substantial API fix.

## 1. Discover

- Read project instructions, API docs/specification, route/module conventions, types/schemas, middleware, and analogous endpoints.
- Map relevant consumers: frontend, mobile, workers, webhooks, third parties, tests, or other services.
- Understand the actor, business goal, authentication/role/tenant scope, invariants, and data read or written.
- Before mutation, classify the environment, data ownership, operation, reversibility, and blast radius.

## 2. Map the contract

Write down or infer the route/method and actor; request parameters/body/query/headers; success and error responses/status codes; validation, defaults, normalization, and relevant pagination/filter/sort; authorization, ownership, and tenant scope; compatibility with existing consumers; and relevant idempotency, transactions, concurrency, retries, and side effects.

Use the project's source of truth. When a new contract is required, choose a consistent form that is easy to revise and state material assumptions.

## 3. Decide scope

- **Reuse:** an existing route/service/repository/schema/middleware already fits.
- **Extend:** a field, variant, validation rule, or compatible behavior must be added.
- **Create:** the outcome requires a new module/endpoint/contract.
- **High-risk boundary:** breaking contracts, authentication/permission/security changes, destructive migrations/data rewrites, client/production mutations, payment, deployment, or secrets require specific confirmation before the related change/execution.

Do not add an endpoint, database table, queue, cache, or abstraction just because it might be useful. Add backend/API support only when required by the requested outcome; relevance alone does not authorize a business capability.

## 4. Implement

- Follow project layering and naming.
- Validate requests at the server boundary and preserve business invariants in the proper layer.
- Enforce authorization and tenant scope server-side.
- Preserve compatibility. A breaking contract requires specific confirmation covering target, consumer impact, and migration plan before implementation.
- Handle errors consistently; do not expose internal details or sensitive data.
- Add relevant tests, dummy fixtures, or local contract documentation.
- For migrations, use `safe-data-migration.md`.

## 5. Verify

- Review the contract and affected consumers.
- Test relevant success, validation failure, unauthorized/forbidden, not-found, conflict, empty, and dependency-failure cases.
- Test transaction/idempotency/concurrency when duplicate requests or partial failure matter.
- Run available tests, lint, typecheck, build, or local integration checks.
- Ensure logs/responses do not expose secrets or unnecessary data.

## 6. Report

Report the contract/behavior created or preserved, mapped consumers, data/environment boundary, validation run, assumptions, compatibility/migration notes, and side effects intentionally not executed.
