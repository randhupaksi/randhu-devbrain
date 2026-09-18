# Verification and Report

Check proportionally:

- changed imports and public exports;
- typecheck, lint, formatting, focused tests, and build as supported;
- affected route or endpoint behavior;
- loading, empty, error, disabled, retry, and accessibility states;
- auth, permission, scope, and error mapping;
- query invalidation, transaction/idempotency, and side-effect order;
- dependency cycles and unintended files in the diff.

Report:

1. architectural problem found;
2. boundary and migration decision;
3. files added, changed, or removed;
4. consumers migrated;
5. behavior/contracts preserved;
6. validations actually run and results;
7. deferred work and remaining risks.
