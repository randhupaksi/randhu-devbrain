# DevBrain v2 Architecture

DevBrain is a file-based knowledge system with three loading levels:

1. **Session baseline:** concise identity, precedence, global/project boundary, risk/approval, safety, autonomy, context lifecycle, and basic workflow. Read once per session.
2. **Task modules:** the task map selects core, detailed safety, or workflow content that affects the active decision. Do not load every module when the decision is already clear.
3. **Skill/reference:** select a skill by outcome and read its references only when needed. Skills are self-contained so Codex/Claude copies work without repository-relative links.

Project instructions are the source of technical, business, and visual facts. Core contains no client identity, universal theme, endpoint, schema, single-project stack, or laptop path.

## Canonical ownership

| Concern | Source |
|---|---|
| Cross-task rules and precedence | `runtime/session-baseline.md` |
| Selective routing | `runtime/task-map.md` |
| Domain principles | `core/` |
| Deeper risk analysis | `safety/` |
| Task procedures | `workflows/` |
| Short command intent | `prompts/commands.yaml` |
| Portable skills | Each skill under `skills/` |
| Installed bootstrap | Adapter templates rendered by the installer |
| Project facts | The project's `AGENTS.md`/`CLAUDE.md` |
| Conceptual reference and provenance | Generalized v2 source DOCX and `docs/source-mapping.md` |
| Acceptance and regression | `evaluation/` |

The baseline carries safety rules that must always be available; safety modules provide case-specific detail. Minimal repetition of boundaries in standalone skills is intentional because each skill is installed independently. Do not copy all principles into skills, loaders, or projects.

## Compatibility and portability

V2.2 adds discovery, debugging, and completion; v2.3 adds context reconciliation; v2.4 adds conversational handoff and current-state resume through session continuity. The task map/commands select them only when relevant without changing the baseline. Existing loaders read repository modules in place, and the seven standalone skills retain their scope. The conceptual DOCX remains a v2.2 reference; maintained Markdown/YAML governs current operational behavior. Handoffs remain task context rather than automatic global/project memory.

`runtime/full-context.md` and `runtime/core-compact.md` point to the baseline so legacy loaders remain usable. There is no generated monolith to rebuild. The installer uses the same template for both tools and injects a concrete local root only into the installed result.

The installer stages and verifies skills before replacing the destination directory. It backs up the previous version, including nested copies or customization, so only one active tree remains without stale references. An identical update does not write files or create another backup. Loaders are managed only inside markers; invalid markers are rejected before mutation.

There is no daemon, model binding, database, or product CLI. Validators are manually run maintenance scripts, not assistant runtime dependencies.
