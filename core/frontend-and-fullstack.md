# Frontend and Full-Stack Guidelines

## Component boundaries

Responsibility guide: app shell → route/page → feature → pattern → primitive; hooks/queries and services/API clients own state and transport alongside the UI. This is not a mandatory import chain: primitives never fetch domain data. Adapt boundaries to the active project.

Split a component when its responsibilities, size, or complexity harms readability or maintenance. Split around real responsibilities, not to increase file count. Avoid fragmenting a simple component used only once.

## State model

- Use local state for local interactions.
- Use server-state tooling for API data when the project already has it.
- Use global state only for data shared across areas, such as session, authentication, permissions, or application-wide preferences.
- Avoid excessive prop drilling, but do not create a global store without need.

Follow the project's existing state-management patterns.

## Frontend system thinking

Before building a page or UI feature, identify existing tokens, theme, libraries, shared primitives, feature patterns, and folder conventions. Use an architecture that distinguishes cross-feature primitives, reusable patterns, feature components, and page composition.

Prefer reuse of the existing system. Create a shared component when a pattern/behavior is truly used across contexts or clearly forms part of the project's UI language. Keep feature-specific layouts local so pages remain clear and the system does not become over-abstracted.

When changing a shared component, inspect consumers, variant contracts, accessibility, responsive behavior, and visual regressions. Componentization must not change data flow or business behavior without a clear reason.

## Styling and UI dependencies

Follow the project's styling source of truth: design tokens, CSS variables, theme objects, utility conventions, or component-library variants. Avoid ad hoc visual values, duplicate markup, and inline styles that bypass the system without a reason.

Prefer existing UI dependencies. Add a library/dependency only when its benefit and compatibility are clear, it does not duplicate the existing foundation, and it can be validated proportionately. Explain broad-impact or production/client-surface dependencies before adding them.

## Data fetching and cache

Follow existing API clients and data-fetching patterns. Check the endpoint, method, query parameters, payload, response, authentication, error shape, types/interfaces, cache, refetching, and invalidation.

Cache should improve UX without misleading users. Transaction, payment, attendance, invoice, status, and client data require careful stale-time and invalidation choices.

## API contracts

Do not guess the contract when service code, types, documentation, backend code, or response examples exist. If no contract is available, continue presentation-only work with clearly labeled synthetic fixtures when appropriate. Do not present an assumed payload as a real contract; ask about details that change the contract or business outcome.

For presentation-only work, preserve endpoints, payloads, auth headers, permissions, business validation, and data semantics. Change an integration/API only when it is part of the requirement; UI overdelivery does not authorize a new endpoint or contract.

### API caution protocol

Read-only API inspection is always allowed. Before changing integration or backend contracts:

1. Identify endpoint, method, parameters/payload, response/error shape, authentication, permissions, cache, and consumers.
2. Decide whether the change is only frontend mapping, a backward-compatible extension, or a breaking contract.
3. Check effects on client/production data, tenant isolation, migrations, and existing callers.
4. Preserve compatibility when a contract change was not requested.
5. Validate relevant success, failure, unauthorized/forbidden, empty, and stale/refetch behavior.

Fix low- or medium-risk integration/API work that is part of the requirement after understanding consumers and compatibility. Use synthetic tests. A breaking contract, authentication/permission/security change, destructive migration, or client/production mutation needs specific confirmation; local code is not an exception to these boundaries.

For substantial API/backend work, use `api-backend-intelligence.md` and `workflows/api-feature.md`. They add contract discovery, consumer impact, backend layering, validation, error semantics, authorization, data integrity, concurrency, observability, and testing guidance. The active repository determines framework details and contracts.

### Environment and data gate

Before running API/backend/data mutations, classify the environment (local, test, development, staging, production); data (dummy/fixture, anonymized, internal non-client, real client/user, unknown); operation (read-only, reversible write, migration, bulk mutation, destructive, irreversible); and exposure (isolated/local, shared team environment, client-facing, public production).

Local/test/development with dummy or anonymized data may be low or medium risk according to blast radius. Staging/shared environments require impact awareness and coordination when other users may be affected. Production, client/user data, unknown data ownership, destructive migrations, tenant isolation, or security-sensitive operations are high risk unless established otherwise.

Do not equate running a local server, creating a migration file, or writing an endpoint with executing a migration or mutation against client data. Code can be prepared and tested safely without executing a high-risk side effect.

## Backend boundary

Backend work is sensitive, but not forbidden by default. The AI may build or fix scoped local/development backend/API modules after understanding contracts, data classification, consumers, and risk. Client/company-specific restrictions—including a rule against backend access—belong in the project `AGENTS.md`/`CLAUDE.md`, not global DevBrain.

## Environment and validation

Environment variables are sensitive configuration. Do not expose secrets. Explain the purpose, public/secret scope, target environment, placeholder, and documentation for any new variable.

Frontend validation improves UX; the backend remains the source of truth for permissions, authentication, roles, and business rules. Error handling should protect state and data integrity, not merely swallow errors.
