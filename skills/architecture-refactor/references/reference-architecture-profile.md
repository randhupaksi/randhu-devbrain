# Reference Architecture Profile

This profile captures the portable architectural qualities the user values. It is a benchmark, not a template to copy literally.

## Frontend qualities

- A small application shell owns providers, routing, guards, and global recovery behavior.
- Routes lazy-load page-level entry points where the stack supports it.
- Pages are task-oriented composition layers, not containers for every query, modal, form, and business rule.
- Features are grouped by domain and own their domain-specific UI and behavior.
- Shared primitives and patterns provide stable contracts for repeated controls, states, and accessibility.
- API access is centralized behind a client/service convention; pages do not scatter transport details.
- Types, validation schemas, auth helpers, configuration, and utilities have explicit homes.
- Server state, local interaction state, and form state are intentionally distinguished.

## Backend qualities

- Router and middleware define transport, cross-cutting policy, and authorization boundaries.
- Handlers translate HTTP input/output and remain thin.
- Services/use-cases own business rules, transactions, and orchestration.
- DTOs make request/response contracts explicit; models represent persistence/domain data as appropriate.
- Shared response and error conventions are applied consistently.
- Scope, role, idempotency, side effects, and sensitive data are treated as first-class concerns.

## Success test

The result should be easier to navigate, reason about, test, and change without broad unrelated edits. A developer should be able to trace a user action from page/route to feature, service, and API boundary without opening one giant file. The benchmark never overrides active project instructions or justifies changing behavior for aesthetic symmetry.
