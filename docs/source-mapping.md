# Historical Source Mapping

The historical DOCX is preserved unchanged. The v2 audit read OOXML paragraphs/tables in read-only form for conceptual principles; it did not modify or render the DOCX layout because that was outside the upgrade scope. The available historical DOCX and repository snapshot had matching SHA-256 hashes according to the manifest.

| Historical concept | V2 owner |
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

## V2 decisions on historical gaps

The DOCX requested broader approval for multi-file changes, APIs, redesigns, and material changes. The latest upgrade prompt explicitly authorized low/medium-risk work after analysis. Precision and user control remain through high-risk confirmation and reporting.

An earlier operational version later allowed adjacent business/API expansion too broadly. V2 again separates quality overdelivery from new business requirements. Data/client/security protections remain mandatory; local code does not make authentication or breaking-contract changes automatically safe.

Stack preferences, client/work history, and visual examples in the source are historical context, not global rules. The requested architecture benchmark was used only for separation of concerns, thin pages/handlers, DTOs, service/client boundaries, validation, lazy loading, and testing boundaries. No other benchmark repository was accessed or copied.

Notifications, logs/daily summary, CLI, GUI, and auto-sync remain deferred. The source is not loaded during normal coding.
