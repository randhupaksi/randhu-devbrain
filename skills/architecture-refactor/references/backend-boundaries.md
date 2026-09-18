# Backend and API Boundaries

Use this reference for backend/API refactors.

## Boundary guide

| Boundary | Owns | Keep out |
|---|---|---|
| Router | route registry and middleware composition | business decisions |
| Middleware | cross-cutting auth, limits, recovery, observability | domain mutation logic |
| Handler/controller | HTTP parsing, validation handoff, response mapping | database orchestration |
| Service/use-case | business rules, authorization scope, transactions, orchestration | HTTP framework details |
| Repository/data access | persistence queries and mapping | user-facing response policy |
| DTO/schema | explicit transport contracts and validation shape | hidden persistence side effects |
| Model/domain type | durable/domain representation | arbitrary transport formatting |

Do not force a repository layer if the project has a deliberate service-to-ORM convention. Preserve status codes, error envelopes, payload names, auth/scope checks, transaction boundaries, idempotency, and side-effect ordering. Treat schema or data changes as a separate risk decision.
