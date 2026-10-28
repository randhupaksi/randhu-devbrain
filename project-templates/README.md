# Project Context Templates

Use these as optional starting points when a project needs clearer AI-facing context. They are examples, not files that every repository must adopt. Keep existing project instructions and customizations; add only the pieces that solve a real discovery or duplication problem.

## File ownership

| File | Owns | Load when |
|---|---|---|
| `AGENTS.template.md` | Shared agent instructions, repository scope/safety, commands, validation, and pointers | The host needs repository instructions; normally auto-discovered |
| `CLAUDE.template.md` | Claude-only additions; imports `AGENTS.md` for shared context | Only when Claude behavior differs in a project-specific way |
| `PROJECT-CONTEXT.template.md` | Factual product and technical index, source-of-truth map, and pointers | A task needs product/architecture orientation beyond the concise `AGENTS.md` |
| `PROJECT-VISUAL-DNA.template.md` | Project-specific visual identity, tokens, UI patterns, and visual checks | A task changes or reviews UI |
| `PROJECT-API-CONTRACT.template.md` | API, authorization, data, compatibility, and migration facts | A task changes or reviews backend/API/data behavior |

## Progressive setup

1. Treat one `AGENTS.md` as the concise shared instruction entrypoint where supported. Keep `CLAUDE.md` as an import plus only Claude-specific rules; do not copy the shared rules into both files.
2. Add `PROJECT-CONTEXT.md` when the repository needs a factual map that would make `AGENTS.md` too long. Link it from `AGENTS.md`; do not repeat its facts there.
3. Add Visual DNA and API Contract only if that domain has enough project-specific rules to help. Link each from `PROJECT-CONTEXT.md` and `AGENTS.md` as appropriate. Load only the applicable specialist file for a task.
4. Use one canonical owner per fact. `AGENTS.md` owns commands, validation, scope, safety and approval rules; `PROJECT-CONTEXT.md` owns product/technical overview; Visual DNA owns UI decisions; API Contract owns backend/API/data decisions.
5. When a project keeps all facts directly in `AGENTS.md`, the optional context files may be omitted. Do not create parallel copies just to match this template set.
6. Derive facts from project instructions, manifests, source, tests, and designated specs. Mark uncertain details `Unknown`; never infer secrets, client data, or production behavior.

For an explicit project-context setup or maintenance request, follow [the project-context workflow](../workflows/project-context-setup.md). Ordinary project discovery remains read-only. These templates do not belong in DevBrain global runtime/core and add no startup reads by themselves.
