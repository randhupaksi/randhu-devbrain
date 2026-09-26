# Source Mapping

The current `source/DevBrain_v2_Developer_Context_Specification.docx` is a generalized English conceptual reference for v2. Markdown/YAML modules remain authoritative for operational behavior. The earlier personal v0.1 DOCX was read during the original v2 audit and is retained only in earlier Git history; its historical audit findings below explain the design decisions made at that time. Source documents are not loaded during normal coding.

| Concept | V2 owner |
|---|---|
| Developer DNA and quality | `core/developer-profile.md`; concise identity in the baseline |
| Clean code, abstraction, refactoring, scope | `core/engineering-principles.md` |
| UI feel, hierarchy, states, context-aware identity | `core/ui-ux-principles.md`; `workflows/ui-task.md` |
| Design-system discovery and reuse | `core/design-system-intelligence.md`; `design-system-architect` skill |
| Frontend/state/API boundaries | `core/frontend-and-fullstack.md` |
| Full-stack/contract/data discipline | `core/api-backend-intelligence.md`; `safety/data-and-api-protection.md` |
| Performance evidence | `core/performance.md` |
| Collaboration, requirements, creativity | `core/ai-collaboration.md` |
| Safety/Git | Baseline; `safety/`; `workflows/git-command-listing.md` |
| Prompt compression | `prompts/commands.yaml` |
| Project facts/Visual DNA/contracts | `project-templates/` |
| AI-agnostic modularity and adapters | `runtime/task-map.md`; `adapters/`; `install/` |
| Review/evolution | `docs/maintenance.md`; `evaluation/` |

## V2 decisions on gaps in the original source

The original v0.1 DOCX requested broader approval for multi-file changes, APIs, redesigns, and material changes. The v2 upgrade prompt explicitly authorized low/medium-risk work after analysis. Precision and user control remain through high-risk confirmation and reporting. The current generalized DOCX reflects that v2 decision.

An earlier operational version later allowed adjacent business/API expansion too broadly. V2 again separates quality overdelivery from new business requirements. Data/client/security protections remain mandatory; local code does not make authentication or breaking-contract changes automatically safe.

Stack preferences, client/work history, and visual examples in the original source were historical context, not global rules; they are omitted from the current generalized DOCX. The requested architecture benchmark was used only for separation of concerns, thin pages/handlers, DTOs, service/client boundaries, validation, lazy loading, and testing boundaries. No other benchmark repository was accessed or copied.

Notifications, logs/daily summary, CLI, GUI, and auto-sync remain deferred. The source is not loaded during normal coding.
