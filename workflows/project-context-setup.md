# Project Context Setup and Maintenance

Use only when the user explicitly asks to create, improve, or maintain project instructions/context. This workflow can produce edits within that authorized task. It does not change the read-only behavior of [project discovery](project-discovery.md), and it does not authorize changes to product behavior or protected boundaries.

## Inspect proportionately

1. Confirm the repository root, applicable `AGENTS.md`/`CLAUDE.md`, current worktree state, and requested outcome. Preserve staged and unstaged user changes.
2. Read the existing project context and only enough manifests, code, tests, and designated specs to verify requested facts. Do not scan dependency/build output, `.env` files, credentials, client/production data, personal files, or unrelated project directories.
3. Classify each useful fact as shared instruction, product/technical overview, UI identity, API/data contract, or host-specific addendum. Distinguish confirmed evidence from unknown or inferred details.
4. Reuse current files and conventions where they already work. Do not create templates or broad inventories solely for symmetry.

## Assign one canonical owner

- `AGENTS.md`: concise shared agent instructions, commands, required checks, repository scope, safety, and approval boundaries.
- `CLAUDE.md`: import `AGENTS.md` where supported; add only Claude-specific project behavior. Do not duplicate shared context.
- `PROJECT-CONTEXT.md`: product and broad technical map, source-of-truth map, and pointers to scoped context. It is factual context, not a second instruction hierarchy.
- `PROJECT-VISUAL-DNA.md`: UI identity, design-system sources, component conventions, responsive priorities, and visual checks.
- `PROJECT-API-CONTRACT.md`: API contracts, consumers, authorization/data boundaries, migrations, and contract checks.

These specialist files are optional. Projects may keep facts in an existing `AGENTS.md`; do not force the template layout when it adds overhead. Avoid maintaining duplicate copies of the same decision. If an existing project convention requires another layout, document its source of truth instead of renaming files mechanically.

## Make the requested update

1. For each proposed statement, record the evidence source mentally or with a concise source pointer when future maintainers need it. Do not state a guess as fact.
2. Put a fact in its canonical owner and link to it from concise entrypoints. Keep instructions auto-loaded by Codex/Claude short; put details behind task-specific references.
3. Leave irrelevant domains unloaded: UI work does not need the API contract by default; API/data work does not need Visual DNA by default. The project index is selective orientation, not a requirement to read every referenced file.
4. Keep project-specific facts in the project repository. Never promote a project's stack, brand, endpoint, business rule, user data, private path, or client detail into DevBrain global core/runtime.
5. Do not change API, data semantics, authentication, permission, migration, deployment, or production behavior as part of context cleanup. Stop for the required specific authorization if the requested documentation edit would cross such a boundary.

## Verify and report

- Check links and referenced files, exact commands against repository scripts, and that no duplicate fact owner or contradictory instruction was introduced.
- Review the diff and preserve pre-existing edits. Run the relevant documentation/content checks available in the project.
- Report which context files changed, which facts remain unknown, validation actually performed, and any remaining project-specific decision that needs an owner.
