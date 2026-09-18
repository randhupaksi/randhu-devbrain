# Foundation Pass

Use this workflow for a new project, broad inconsistency, or a meaningful frontend refactor. It is not a reason to redesign the entire application during a small task.

## Discover

- Read project instructions and identify the active outcome.
- Map theme/token sources, component library, shared directories, styling conventions, and screen precedents.
- Inventory primitives, repeated patterns, duplicate markup, and affected consumers.
- Record gaps in tokens, states, accessibility, responsiveness, or component boundaries.

## Decide

Classify each candidate as:

- **reuse**: existing component/token already fits;
- **extend**: a small variant/token/state is needed;
- **create**: a reusable primitive or pattern is genuinely missing;
- **local**: composition belongs to one feature/page;
- **defer**: valuable but not necessary for the active outcome.

Choose the smallest coherent set. Prioritize controls and patterns with real reuse, visible inconsistency, or high regression cost.

## Implement and verify

Preserve behavior and migrate in reviewable units. Audit changed visual values, all affected consumers, state coverage, responsive behavior, keyboard/focus, contrast, and runtime appearance when available. Run project validation and report what was changed, what was intentionally deferred, and what remains unverified.
