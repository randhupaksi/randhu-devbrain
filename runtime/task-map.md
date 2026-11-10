# Selective Task Map

Paths are relative to the DevBrain root. Read only relevant rows, then only the needed files; this table is not a required checklist. Reuse modules already active. Workflows describe steps; core describes rationale and decision frameworks. Choose one primary skill by outcome; add another only for a genuinely different subtask.

| Task / need | Modules to select | Primary skill when relevant |
|---|---|---|
| Unfamiliar project or unclear task boundaries | `workflows/project-discovery.md` | Match the outcome only if needed |
| Create, update, or organize project Markdown documentation | Select relevant references from the skill; use `workflows/project-context-setup.md` and `project-templates/README.md` only for instruction/context files | `project-documentation`; an audit or discussion stays read-only |
| Material context disagreement or staleness affecting the active decision | `workflows/context-reconciliation.md` | Match the outcome only if needed |
| Requested handoff or substantial interrupted task with missing context | `workflows/session-continuity.md` | Match the resumed outcome only if needed |
| Codex/Claude CLI setup, loader discovery, session modes, or host compatibility | `workflows/cli-compatibility.md` | None; use the host-specific matrix for maintenance evaluation |
| Bug diagnosis or correction | `workflows/debugging.md` | No extra skill for routine debugging |
| Substantial task completion/coverage review | `workflows/definition-of-done.md`, `workflows/verification-reporting.md` | None unless a specialized subtask requires it |
| Explicit or substantial humanization, voice matching, prose or UI copy editing | `core/ai-collaboration.md`; select only relevant skill references | `humanize`; ordinary responses and routine UI text use baseline defaults |
| Deeper identity/requirement interpretation | `core/developer-profile.md`, `core/ai-collaboration.md` | None needed |
| Engineering, abstraction, maintainability | `core/engineering-principles.md` | Not needed for small cleanup |
| Product UI, dashboard, CRUD | `core/ui-ux-principles.md`, `workflows/ui-task.md` | `enterprise-ui-ux` |
| Landing page, portfolio, case study | `core/ui-ux-principles.md`, `workflows/ui-task.md` | `marketing-portfolio-ui-ux` |
| Dedicated accessibility audit or fix | `core/ui-ux-principles.md`, `workflows/verification-reporting.md` | `accessibility-audit` |
| Tokens, primitives, shared patterns, design-system migration | `core/design-system-intelligence.md`, `workflows/ui-foundation-pass.md` | `design-system-architect` |
| Frontend state/query correctness | `core/frontend-and-fullstack.md` | `frontend-state-management`; structural extraction uses `architecture-refactor` |
| Giant file, responsibility, dependency refactoring | `core/engineering-principles.md`, `workflows/safe-refactor.md` | `architecture-refactor` |
| Requested backend/API feature | `core/api-backend-intelligence.md`, `workflows/api-feature.md`, `safety/data-and-api-protection.md` | `backend-feature-engineering`; external provider boundaries use `external-service-integrations` |
| Schema, transactions, migrations | `workflows/safe-data-migration.md`, `safety/data-and-api-protection.md` | `database-engineering`; execution keeps its existing approval boundary |
| Frontend performance investigation or optimization | `core/performance.md`, `workflows/verification-reporting.md` | `frontend-performance` |
| Testing strategy, coverage, or test repair as the outcome | `workflows/verification-reporting.md` | `testing-strategy` |
| Routine validation of another task | `workflows/verification-reporting.md` only when needed | No extra skill |
| Action risk/approval analysis | `safety/policy.md`, `safety/risk-model.md`, `safety/data-and-api-protection.md` | None needed; application vulnerability review uses `application-security-review`, identity/access policy uses `auth-security` |
| Git command listing | `workflows/git-command-listing.md` | None needed |
| Compressed prompt command | `prompts/commands.yaml`, `prompts/README.md` | Match the outcome |
| Complex task coordination | `workflows/standard-task.md` | Match the outcome |

Read skill references only when a specific decision requires them. Do not load enterprise and marketing skills together for one surface; use both only for distinct product/marketing subtasks. Design-system work owns visual/shared-UI contracts; architecture-refactor owns responsibility/data/dependency boundaries. Frontend performance, accessibility audit, and testing strategy are primary only when those outcomes are requested or a concrete blocker makes them material. Routine UI polish and validation do not load all three.

## Focused fullstack outcomes

For a mixed task, use [skill selection](skill-selection.md) to resolve ownership. The catalog is maintenance evidence, not another startup read.

| Requested outcome | Primary skill |
|---|---|
| API shapes, compatibility decisions, and producer-consumer acceptance examples | `api-contracts` |
| Database query cost and result-preserving optimization | `database-query-optimization` |
| Identity, session lifecycle, access policy, and tenant isolation | `auth-security` |
| Evidence-backed vulnerability findings and scoped hardening | `application-security-review` |
| Form data, validation, submission, and error recovery | `forms-validation` |
| Provider adapters and reliable inbound/outbound integration semantics | `external-service-integrations` |
| Durable work lifecycle, duplicate delivery, and failure recovery | `background-jobs-queues` |
| File validation, ownership, storage lifecycle, and protected delivery | `file-storage-uploads` |
| Browser journey evidence and maintainable end-to-end checks | `browser-e2e-testing` |
| Actionable findings on a bounded change and its consumers | `code-review` |
| Cross-boundary diagnosis and useful operational telemetry | `observability-debugging` |
| Reproducible pipeline artifacts, rollout readiness, and recovery plans | `ci-cd-release-engineering` |
| Live subscription lifecycle and loss/duplicate recovery | `realtime-systems` |
| Backend cache keys, freshness and consistency boundaries | `server-caching` |
| Locale selection, translation resources and internationalized application behavior | `internationalization-localization` |
| Public URL discovery, rendering and indexing-signal consistency | `technical-seo` |
| Dependency compatibility transition and reproducible resolution | `dependency-upgrades` |
| Reproducible local setup, service readiness and owned resource lifecycle | `developer-environment` |
