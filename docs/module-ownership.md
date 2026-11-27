# DevBrain Module Ownership

This map describes the maintained DevBrain 3.7 sources. Markdown and YAML define current behavior; no DOCX is needed to interpret or update the system.

| Concern | Current owner |
|---|---|
| Developer identity and engineering quality | `core/developer-profile.md`; `core/engineering-principles.md` |
| UI/UX quality, design direction, and visual review | `core/ui-ux-principles.md`; `core/ui-design-intelligence.md`; `workflows/ui-task.md` |
| Cross-surface creative art direction and expressive interaction | `skills/creative-ui-ux/SKILL.md`; `skills/creative-ui-ux/references/creative-direction-playbook.md` |
| Creative public landing pages and supporting visitor journeys | `skills/marketing-portfolio-ui-ux/SKILL.md`; `skills/marketing-portfolio-ui-ux/references/creative-public-experiences.md`; `core/ui-product-contexts.md` |
| Design system and component consistency | `core/design-system-intelligence.md`; `design-system-architect` |
| Frontend and fullstack boundaries | `core/frontend-and-fullstack.md`; `core/api-backend-intelligence.md` |
| Performance and evidence | `core/performance.md`; `frontend-performance` |
| Collaboration and natural communication | `core/ai-collaboration.md`; `humanize` for deep writing or voice work |
| Safety and sensitive data | `safety/` plus concise always-available baseline boundaries |
| Hosted runtime and production readiness | `cloud-infrastructure-engineering`, `reliability-engineering`, and `workflows/production-readiness-review.md` |
| MCP tool contracts and agent comparisons | `mcp-server-engineering` and `agent-evaluation-engineering` |
| Feature-grouped, text-only Git command proposals | `skills/git-command-listing/SKILL.md`; `safety/policy.md` retains mutation authorization |
| Third-party software trust decisions | `safety/software-supply-chain.md` |
| Product context and project facts | Project `AGENTS.md`/`CLAUDE.md`; optional files under `project-templates/` |
| Prompt shortcuts and routing | `prompts/commands.yaml`; `runtime/task-map.md` |
| Specialist ownership, artifacts, and conditional handoffs | `skills/catalog.yaml`; `runtime/skill-selection.md` |
| Host integration | `adapters/` templates; `install/` implementation and documentation |
| Evaluation contracts and observed evidence | `evaluation/`; dated release reports in `docs/` |

## How the pieces fit

1. The host loader points the session to DevBrain's baseline and applicable project instructions.
2. The baseline defines global precedence and safety. The task map routes the requested outcome to selective guidance.
3. Core principles explain reusable reasoning. A workflow explains a task procedure. A skill owns a specialist result and can link to detail that is needed only in that case.
4. The project's instructions and context own project-specific facts. They can override DevBrain preferences when the change is within platform and safety requirements.
5. Evaluation separates package structure, installer behavior, scenario expectations, and observed native model sessions.

This is an ownership map, not a required chain of files. A focused task usually needs only a subset.

## Current package facts

The manifest owns the package version and 40-skill inventory in v3.7.0. The suite has 139 task contracts and 22 benchmark cases, six of which form the focused 3.7 comparison. See the [3.7 evaluation guide](v3.7-evaluation.md) for the reference revision and evidence status.

## Relationship model

Skills are selected by the outcome they own. A collaborator is conditional: use it when a distinct decision or artifact belongs to that owner, not merely because two subjects are nearby. For example, implementing a backend use case may consume an accepted API contract and database constraints; redesigning those contracts is separate work unless requested.

Shared principles belong in `core/`, task procedures in `workflows/`, and specialist implementation details in the relevant skill. Project-specific stack choices, visual identity, product rules, endpoints, and commands remain in project context. Evaluation data tests these boundaries but does not become runtime policy.

## Historical context

Older audit and release documents describe the decisions and evidence available at their recorded dates. The original conceptual DOCX and optional v3.0 product-guide DOCX files were removed from the current tree because they were obsolete; historical copies remain only in earlier Git history. They are not operational sources and should not be restored as current guidance.
