# Project API and Backend Contract

> Record this project's backend/API facts here. This file supplements `AGENTS.md`/`PROJECT-CONTEXT.md`; do not copy global DevBrain rules into it. Remove unknown placeholders or mark them `Unknown`.

## Architecture and sources of truth

- API documentation/specification location:
- Route/module registration:
- Backend stack, framework, ORM, and database:
- Layer/module conventions (handler/service/repository/domain/etc.):
- Request validation and schema location:
- Type/DTO/model conventions:
- Error response envelope and status-code conventions:
- Logging/tracing/error-reporting conventions:

## Contract rules

- Authentication and session mechanism:
- Role/permission/ownership/tenant-isolation rules:
- Pagination/filter/sort/search conventions:
- Date/time, locale, currency, and serialization rules:
- Idempotency/retry/webhook rules:
- External integrations and timeout/retry conventions:
- Existing consumers and compatibility constraints:

## Data and migration safety

- Sensitive entities/fields and PII handling:
- Data-access/repository conventions:
- Transaction/concurrency/unique-constraint patterns:
- Migration tool and location:
- Local dummy-data migration procedure:
- Staging/shared-environment procedure:
- Client/production migration, backfill, and bulk-operation restrictions:
- Backup/rollback/dry-run expectations:

## Verification

- Unit/integration/contract test locations and commands:
- Required negative cases:
- Required local/manual integration checks:
- Endpoints or flows requiring additional security review:
