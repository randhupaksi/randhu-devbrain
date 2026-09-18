# Safe Migration

- Capture a baseline: current behavior, validation status, route/API consumers, and known warnings.
- Make one coherent extraction or boundary change at a time.
- Preserve public exports temporarily when they reduce migration risk.
- Keep request/response shapes, query keys, auth checks, and side-effect order stable.
- Use adapters only as temporary, documented migration seams.
- Remove compatibility code only after all consumers and checks pass.
- Do not combine a structural refactor with a speculative feature or destructive cleanup.
- Stop before data migration, contract change, security-boundary change, or production mutation and request approval.
