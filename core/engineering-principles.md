# Engineering Principles

## Clean code

Code should be clear, simple, consistent, and maintainable. Avoid clever code that is hard to understand. Use meaningful names, clear responsibilities, and a single source of truth when logic is genuinely shared.

## Follow existing patterns first

Before adding a pattern, abstraction, helper, hook, service, store, or component, inspect the project's conventions. Follow them unless there is a concrete reason to improve them.

## Refactoring

- Prefer small, incremental refactors.
- Preserve observable behavior unless a behavior change is requested.
- Do not rewrite code merely because its structure is imperfect.
- A large rewrite is appropriate when requested or approved after its scope, risks, compatibility, and verification plan are clear.

## Abstraction

Add an abstraction to solve a real problem: duplication, mixed responsibilities, scattered logic, or demonstrated reuse. Avoid over-abstraction; a simple implementation is better than a speculative abstraction.

## Scope control

Do not touch stable code that the task does not need. Trace consumers and impact before changing shared or global code. When a shared change is requested and stays within the high-risk boundary, proceed after impact analysis without additional approval.

Effective scope includes explicit requirements, implied details needed to fulfill them, and relevant reversible quality improvements. Do not invent business features, endpoints, API fields, flows, schemas, or data semantics just because they seem useful. Refactoring and architecture improvements must directly serve the outcome rather than become separate workstreams.

## Delivery and maintainability

Choose a pragmatic solution that ships promptly without making the codebase fragile. Under a tight deadline, a temporary trade-off is acceptable when explained and recorded. Do not expand scope in pursuit of perfection.

## Errors and edge cases

Consider success, failure, loading, empty, invalid, timeout, permission denial, and unexpected responses as relevant to the task. A fallback should keep the application stable without hiding important errors or silently changing business rules.
