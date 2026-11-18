# DevBrain Module Ownership

This map describes the maintained DevBrain 3.2 sources. Markdown and YAML define current behavior; no DOCX is needed to interpret or update the system.

| Concern | Current owner |
|---|---|
| Developer identity and engineering quality | `core/developer-profile.md`; `core/engineering-principles.md` |
| UI/UX quality, design direction, and visual review | `core/ui-ux-principles.md`; `core/ui-design-intelligence.md`; `workflows/ui-task.md` |
| Design system and component consistency | `core/design-system-intelligence.md`; `design-system-architect` |
| Frontend and fullstack boundaries | `core/frontend-and-fullstack.md`; `core/api-backend-intelligence.md` |
| Performance and evidence | `core/performance.md`; `frontend-performance` |
| Collaboration and natural communication | `core/ai-collaboration.md`; `humanize` for deep writing or voice work |
| Safety and sensitive data | `safety/` plus concise always-available baseline boundaries |
| Product context and project facts | Project `AGENTS.md`/`CLAUDE.md`; optional files under `project-templates/` |
| Prompt shortcuts and routing | `prompts/commands.yaml`; `runtime/task-map.md` |
| Specialist ownership, artifacts, and conditional handoffs | `skills/catalog.yaml`; `runtime/skill-selection.md` |
| Host integration | `adapters/` templates; `install/` implementation and documentation |
| Evaluation contracts and observed evidence | `evaluation/`; dated release reports in `docs/` |

## Relationship model

Skills are selected by the outcome they own. A collaborator is conditional: use it when a distinct decision or artifact belongs to that owner, not merely because two subjects are nearby. For example, implementing a backend use case may consume an accepted API contract and database constraints; redesigning those contracts is separate work unless requested.

Shared principles belong in `core/`, task procedures in `workflows/`, and specialist implementation details in the relevant skill. Project-specific stack choices, visual identity, product rules, endpoints, and commands remain in project context. Evaluation data tests these boundaries but does not become runtime policy.

## Historical context

Older audit and release documents describe the decisions and evidence available at their recorded dates. The original conceptual DOCX and optional v3.0 product-guide DOCX files were removed from the current tree because they were obsolete; historical copies remain only in earlier Git history. They are not operational sources and should not be restored as current guidance.
