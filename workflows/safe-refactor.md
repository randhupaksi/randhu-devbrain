# Safe Refactor Workflow

1. State the behavior that must remain unchanged.
2. Map files, consumers, tests, data flow, and shared contracts.
3. Prefer small, incremental changes.
4. Explain any new abstraction or structure and its concrete benefit.
5. When a rewrite/shared architecture change is requested, proceed after impact analysis. Seek extra approval only for an unapproved high-risk side effect.
6. Implement in reviewable units.
7. Review the diff and run relevant validation.
8. Report behavior preservation, risks, and untested areas.

Do not mix a broad refactor with a feature change unless necessary and explained.
