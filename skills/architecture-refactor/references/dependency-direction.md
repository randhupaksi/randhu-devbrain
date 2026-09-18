# Dependency Direction

Prefer a one-way flow appropriate to the project:

```text
app/route → page → feature → shared UI
                         ↓
                    hook/query → service/client → API
```

For backend code, prefer:

```text
router → middleware → handler → service/use-case → data access → model
```

Shared primitives must not import feature business logic. Services should not import page components. Features should not reach into another feature's private files; use an explicit public boundary when cross-domain collaboration is real. Watch for barrel-file cycles, hidden globals, duplicated caches, and utilities that reverse the intended dependency direction.
