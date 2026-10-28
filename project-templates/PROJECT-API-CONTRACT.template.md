# Project API and Backend Contract

> API/data-specific contracts for this project. General purpose and broad stack overview live in `PROJECT-CONTEXT.md`; repository commands, safety instructions, and required checks live in `AGENTS.md`. Read this file only for API, backend, or data work. Remove unknown placeholders or label them `Unknown`.

## Contract sources and architecture

- API specification and source-of-truth locations:
- Route/module registration:
- Backend framework/ORM details that affect API behavior:
- Layer boundaries (router, middleware, handler, service, data access, model):
- Validation/schema and DTO locations:
- Error envelope, status-code, and serialization rules:
- Existing consumers and compatibility constraints:

## Authorization and behavior

- Authentication/session model:
- Roles, permissions, ownership, and tenant isolation:
- Pagination/filter/search/date-time/idempotency conventions:
- Sensitive business flows and invariants:
- External integrations, webhook, timeout, and retry rules:
- Transaction/concurrency/data-access conventions:
- Logging/tracing and PII/secret-redaction rules:

## Data and migration boundaries

- Sensitive entities/fields and data classifications by environment:
- Safe local dummy/anonymized data procedure:
- Migration tool/location and compatibility requirements:
- Client/production data mutation restrictions:
- Backup, dry-run, rollback, and approval expectations:

## Contract verification

- Unit/integration/contract test locations:
- Required negative/security cases:
- Endpoints or flows needing additional review:
