# Frontend Boundaries

Use this reference for frontend refactors.

## Boundary guide

| Boundary | Owns | Keep out |
|---|---|---|
| App shell/route | providers, routing, guards, global recovery | feature business rules |
| Page | task composition and route-level coordination | reusable controls and deep transport details |
| Feature | domain UI, domain state orchestration, feature interactions | unrelated domains |
| Pattern | repeated composition and shared states | one-off editorial markup |
| Primitive | stable visual/interaction/accessibility contract | domain fetching or business rules |
| Hook/query | reusable state or server-state behavior | unrelated rendering decisions |
| Service/client | transport, serialization, response mapping | page rendering and authorization assumptions |

Extract only when reuse, a stable contract, a known repeated mistake, or explicit user intent justifies it. Keep a component local when consumers genuinely diverge or extraction would require speculative props. Preserve query keys, invalidation, cancellation, optimistic behavior, and error semantics.
