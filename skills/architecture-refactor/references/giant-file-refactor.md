# Giant-File Refactor

## Before extraction

1. Identify the file's public entry point and all consumers.
2. Group code by responsibility and dependency, not by visual proximity.
3. Mark side effects, shared state, callbacks, error paths, and ordering constraints.
4. Choose a small first seam with a clear contract.

## Extraction rules

- Prefer intent-based names and narrow props/parameters.
- Keep domain-specific behavior near its feature/domain.
- Avoid a universal component with dozens of optional props.
- Avoid splitting every small function into a file merely to reduce line count.
- Keep structural, visual, and behavioral changes separately reviewable when possible.
- Migrate consumers before deleting the old path.
- Re-check imports for cycles and accidental cross-feature coupling.

## Completion signal

The original file should become a legible composition/orchestration layer, while extracted units have a responsibility that can be named, tested, and changed independently.
