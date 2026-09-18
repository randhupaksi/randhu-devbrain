---
name: architecture-refactor
description: Safely refactor oversized or tangled frontend and backend/API code into clear, maintainable boundaries while preserving behavior and contracts. Use when pages, components, handlers, services, or modules have accumulated too many responsibilities.
metadata:
  short-description: Refactor frontend and API architecture safely
---

# Architecture Refactor

Use this skill when the requested outcome is structural clarity: decomposing giant files, separating responsibilities, reducing duplication, or establishing healthier frontend/API boundaries. It is not a reason to rewrite an entire project or redesign product behavior.

## Reference standard

The quality benchmark is a distilled architecture profile inspired by the user's Absensi CN project. Read [references/reference-architecture-profile.md](references/reference-architecture-profile.md) when choosing boundaries. It contains portable principles only; never assume its paths, domain names, stack, endpoints, colors, or business rules apply to the active project.

## Operating contract

- Read the active repository's `AGENTS.md`/`CLAUDE.md`, README, entry points, and relevant local conventions before editing.
- The active user request overrides default preferences; platform and repository safety rules remain authoritative.
- Preserve observable behavior, API contracts, authorization, data semantics, loading/error states, accessibility, and performance characteristics unless a change is explicitly in scope.
- Prefer incremental, reviewable extraction over a speculative rewrite.
- Be proactive with relevant, low-risk improvements to readability, reuse, testability, and maintainability. Do not invent product features, fields, endpoints, or business rules.
- Do not commit, push, rewrite history, alter deployment, migrate production data, or weaken auth/permission without explicit authorization.

## Workflow

### 1. Discover

Map the project before changing it: entry points, routes, feature/domain folders, shared components, hooks/state, API client/services, handlers, use-cases, repositories/data access, models/DTOs, tests, and configuration. Inspect consumers and import/dependency direction, not just the target file.

### 2. Diagnose

Classify each responsibility in a large or tangled unit: rendering/composition, interaction state, server state, validation, transport, business rules, authorization, persistence, infrastructure, or presentation. Identify duplicate behavior, hidden side effects, circular dependencies, and boundaries that are too broad or too fragmented.

### 3. Design the smallest coherent boundary

Choose deliberately among reuse, extend, create, local, or defer. Frontend pages should compose features; features own domain behavior; stable controls/patterns belong in shared layers; API calls belong behind the project's service/client convention. Backend HTTP handlers should remain thin, with business rules in services/use-cases and explicit DTOs/models. Adapt these ideas to the active stack rather than copying a folder tree.

Read only the relevant reference:

- Frontend boundaries: [references/frontend-boundaries.md](references/frontend-boundaries.md)
- Backend/API boundaries: [references/backend-boundaries.md](references/backend-boundaries.md)
- Giant-file decomposition: [references/giant-file-refactor.md](references/giant-file-refactor.md)
- Dependency direction: [references/dependency-direction.md](references/dependency-direction.md)
- Migration and safety: [references/safe-migration.md](references/safe-migration.md)

### 4. Implement incrementally

Extract cohesive units with intent-based APIs. Migrate consumers in small groups, preserve names and behavior where practical, and remove duplicate paths only after equivalent behavior is verified. Keep structural refactoring separate from unrelated visual redesign, API redesign, or cleanup outside scope.

### 5. Verify and report

Run the repository's proportional formatting, typecheck, lint, tests, build, and focused runtime checks. Review the final diff and affected consumers. Use [references/verification-checklist.md](references/verification-checklist.md) for the report. State what was changed, what behavior/contracts were preserved, what was intentionally deferred, validation results, and remaining risks.

## Stop and ask

Pause for explicit approval before destructive database/schema work, data rewrites, API contract changes, auth/permission changes, production configuration, secret handling, deployment, or Git history/remote operations. For ambiguous business behavior, make the smallest safe structural change and surface the ambiguity instead of guessing.
