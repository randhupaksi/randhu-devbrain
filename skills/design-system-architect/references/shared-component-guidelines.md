# Shared Component Guidelines

Shared components should make repeated UI safer and clearer, not hide important product decisions.

## Common controls

- **Button**: centralize semantic variants, size, loading, disabled, focus, icon alignment, and accessible naming. Do not let every page invent its own padding, radius, shadow, or hover transform.
- **Input and form field**: centralize label association, hint, error, required state, disabled state, and validation feedback while allowing domain-specific field composition.
- **Card/surface**: share surface roles and spacing only when the project uses a stable surface language. Do not wrap every section in a card.
- **Dialog/drawer**: share focus management, close/cancel semantics, responsive behavior, and destructive-action treatment.
- **Table/list**: share scanning, sorting/filter affordances, loading, empty, error, and responsive disclosure patterns without forcing every domain into identical columns.

## Migration

1. Inventory repeated markup and identify the visual/behavioral contract.
2. Compare consumers and decide which differences are real variants.
3. Define the shared API and preserve existing behavior.
4. Migrate coherent consumers, then remove duplicate paths only when equivalent behavior is verified.
5. Run static and runtime/regression checks relevant to all affected consumers.

If a user explicitly requests shared componentization, honor the intent and explain any portion that must remain feature-local because its behavior or structure is materially different.
