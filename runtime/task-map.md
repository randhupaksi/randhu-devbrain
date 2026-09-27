# Selective Task Map

Paths are relative to the DevBrain root. Read only relevant rows, then only the needed files; this table is not a required checklist. Reuse modules already active. Workflows describe steps; core describes rationale and decision frameworks. Choose one primary skill by outcome; add another only for a genuinely different subtask.

| Task / need | Modules to select | Primary skill when relevant |
|---|---|---|
| Deeper identity/requirement interpretation | `core/developer-profile.md`, `core/ai-collaboration.md` | None needed |
| Engineering, abstraction, maintainability | `core/engineering-principles.md` | Not needed for small cleanup |
| Product UI, dashboard, CRUD | `core/ui-ux-principles.md`, `workflows/ui-task.md` | `enterprise-ui-ux` |
| Landing page, portfolio, case study | `core/ui-ux-principles.md`, `workflows/ui-task.md` | `marketing-portfolio-ui-ux` |
| Dedicated accessibility audit or fix | `core/ui-ux-principles.md`, `workflows/verification-reporting.md` | `accessibility-audit` |
| Tokens, primitives, shared patterns, design-system migration | `core/design-system-intelligence.md`, `workflows/ui-foundation-pass.md` | `design-system-architect` |
| Frontend state/query/service boundaries | `core/frontend-and-fullstack.md` | `architecture-refactor` only for structural refactoring |
| Giant file, responsibility, dependency refactoring | `core/engineering-principles.md`, `workflows/safe-refactor.md` | `architecture-refactor` |
| Requested backend/API integration or feature | `core/api-backend-intelligence.md`, `workflows/api-feature.md`, `safety/data-and-api-protection.md` | None unless structural refactoring is involved |
| Migration/data | `workflows/safe-data-migration.md`, `safety/data-and-api-protection.md` | None needed |
| Frontend performance investigation or optimization | `core/performance.md`, `workflows/verification-reporting.md` | `frontend-performance` |
| Testing strategy, coverage, or test repair as the outcome | `workflows/verification-reporting.md` | `testing-strategy` |
| Routine validation of another task | `workflows/verification-reporting.md` only when needed | No extra skill |
| Security/risk analysis | `safety/policy.md`, `safety/risk-model.md`, `safety/data-and-api-protection.md` | None needed |
| Git command listing | `workflows/git-command-listing.md` | None needed |
| Compressed prompt command | `prompts/commands.yaml`, `prompts/README.md` | Match the outcome |
| Complex task coordination | `workflows/standard-task.md` | Match the outcome |

Read skill references only when a specific decision requires them. Do not load enterprise and marketing skills together for one surface; use both only for distinct product/marketing subtasks. Design-system work owns visual/shared-UI contracts; architecture-refactor owns responsibility/data/dependency boundaries. Frontend performance, accessibility audit, and testing strategy are primary only when those outcomes are requested or a concrete blocker makes them material. Routine UI polish and validation do not load all three.
