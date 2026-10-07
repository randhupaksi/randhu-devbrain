# Project Discovery

Use when entering an unfamiliar project, investigating missing context, or starting a substantial task whose affected boundaries are unclear. Reuse facts already active. A small, understood change needs only its target, applicable instructions, and relevant checks.

## Mode and scope

Discovery itself is read-only. A project-scan request ends with findings; discovery within an implementation request leads into the authorized work without an extra approval gate. Do not generate project instructions, rewrite documentation, install dependencies, or start services merely to inspect a repository.

## Follow the task outward

1. Confirm the workspace, requested outcome, read-only versus implementation intent, and working-tree/staged state. Preserve user changes.
2. Read applicable project and scoped instructions. Inspect the relevant manifest and scripts; distinguish documented facts, implementation evidence, and unknowns.
3. Trace the target's entry point to its direct dependencies and consumers. Find one or two useful precedents before inventing structure. For UI, locate Visual DNA, tokens, states, and shared components; for APIs, locate contracts, validation, authorization, data ownership, and consumers.
4. Identify the commands and prerequisites needed to validate this task. Inspect command definitions before execution: tests, builds, setup scripts, and dev servers can write files, contact services, or mutate data. A read-only request permits only non-mutating diagnostics; use synthetic isolated fixtures for later authorized verification.
5. Identify material uncertainty and protected boundaries. Resolve routine details from project evidence; ask only when the unresolved choice affects business outcome, contracts, client data, security, or irreversible effects.

Stop discovery when the affected path, conventions, consumers, risks, and validation are sufficiently understood to take the next step. Broaden inspection only when a concrete dependency or uncertainty requires it. Avoid scanning generated outputs, dependency trees, private files, unrelated features, or the full DevBrain library.

## Result

For a standalone scan, report the relevant structure, evidence sources, risk/context gaps, available validation, and recommended next step. For implementation, summarize only material findings and continue. Treat a discovery map as session context; persist a project document only when requested. Recheck changed facts after a repository switch, material context loss, or contradictory evidence.
