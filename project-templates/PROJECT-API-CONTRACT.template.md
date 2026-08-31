# Project API and Backend Contract

> Isi fakta backend/API project ini. File ini melengkapi `AGENTS.md`/`PROJECT-CONTEXT.md`; jangan menyalin DevBrain global. Hapus placeholder yang belum diketahui atau tandai `Unknown`.

## Architecture and sources of truth

- API documentation/spec location:
- Route/module registration:
- Backend stack, framework, ORM, and database:
- Layer/module convention (handler/service/repository/domain/etc.):
- Request validation and schema location:
- Type/DTO/model convention:
- Error response envelope and status-code convention:
- Logging/tracing/error reporting convention:

## Contract rules

- Authentication and session mechanism:
- Role/permission/ownership/tenant isolation rules:
- Pagination/filter/sort/search convention:
- Date/time, locale, currency, and serialization rules:
- Idempotency/retry/webhook rules:
- External integrations and timeout/retry convention:
- Existing consumers and compatibility constraints:

## Data and migration safety

- Sensitive entities/fields and PII handling:
- Data access/repository convention:
- Transaction/concurrency/unique-constraint pattern:
- Migration tool and location:
- Local dummy-data migration procedure:
- Staging/shared environment procedure:
- Client/production migration, backfill, and bulk-operation restrictions:
- Backup/rollback/dry-run expectations:

## Verification

- Unit/integration/contract test locations and commands:
- Required negative cases:
- Required local/manual integration checks:
- Endpoints or flows needing extra security review:
