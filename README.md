# DevBrain 3.5

DevBrain 3.7.0 is Randhu's portable developer knowledge layer for Codex and Claude Code. It gives an agent project-independent engineering principles, safety boundaries, task workflows, and focused specialist skills. The host model still performs the reasoning and coding. DevBrain supplies context and a routing structure for that work.

The package contains 40 portable skills and 139 task behavior contracts. Version 3.7 adds per-host skill coverage, a focused benchmark and manifest-driven installation. Version 3.6 adds a dedicated Git Command Listing skill for worktree-grounded command proposals split by feature or logical change. Version 3.5 added Creative UI/UX: a cross-surface method for distinctive visual direction and expressive interaction that applies to dashboards as well as public-facing pages. Enterprise UI/UX and Marketing & Portfolio UI/UX continue to own their task and narrative outcomes. See the [skill-system guide](docs/skill-system.md) for current skill ownership and evidence.

## Start here

At the start of a coding session, read the [session baseline](runtime/session-baseline.md) once. Read the active project's `AGENTS.md` or `CLAUDE.md` for its stack, product behavior, visual identity, APIs, business rules, permissions, deployment, and validation commands. Use the [task map](runtime/task-map.md) to select only the DevBrain modules relevant to the requested outcome. Reload the baseline after material context loss, a DevBrain or repository update, or when the active rules are uncertain.

For a mixed request, start with the result the user needs and select one primary owner. Add another skill only when it has a distinct artifact or decision to produce. The [skill catalog](skills/catalog.yaml) records each specialist's inputs, outputs, and conditional handoffs. These handoffs guide responsibility; they do not create a mandatory pipeline or expand authorization.

To connect Codex and/or Claude Code to this checkout, preview and then run the installer from PowerShell:

```powershell
.\install\install-bootstrap.ps1 -WhatIf
.\install\install-bootstrap.ps1
```

Use `install/update-bootstrap.ps1` to update an existing installation. Review [installation and recovery](install/README.md) before applying changes. Repository maintenance does not install to a real host profile.

## How DevBrain works

DevBrain uses progressive context. The baseline carries global precedence, collaboration, safety, autonomy, and communication rules. The task map routes to core principles, safety analysis, or a workflow. A selected skill provides specialist guidance, and its references are opened only when the task needs them. Project instructions remain the source of project-specific facts.

```text
Host loader → session baseline + project instructions
                        ↓
                 task map and outcome
                        ↓
            relevant core, safety, workflow
                        ↓
        one skill, optional references or handoff
                        ↓
             implementation and evidence
```

This is a decision model, not a requirement to read every module in sequence. A routine task may need only the baseline and project instructions. A high-impact or cross-domain task may need additional owners and evidence. See [architecture](docs/architecture.md) for lifecycle, ownership, and host boundaries.

## How the repository is organized

| Area | Responsibility |
|---|---|
| `runtime/` | Session baseline, selective task routing, compatibility entry points |
| `core/` | Global engineering, collaboration, and UI/UX decision frameworks |
| `safety/` | Cross-cutting safeguards and deeper risk analysis |
| `workflows/` | Task procedures, handoffs, debugging, project context, and delivery |
| `prompts/` | Short commands with intent, mode, and routing |
| `skills/` | 40 portable specialists selected by outcome |
| `adapters/` and `install/` | Codex/Claude loader templates and explicit installer/updater |
| `project-templates/` | Optional project context documents with clear ownership |
| `evaluation/` | Behavior contracts, package checks, and maintenance-only evaluation tools |
| `docs/` | Current usage guides, architecture, release evidence, and history |

The skill system is organized around ownership and handoffs. The [skill catalog](skills/catalog.yaml) defines inputs, outputs, and conditional collaborators; the [skill-system guide](docs/skill-system.md) explains routing, portability, and how to extend the package. Skills are self-contained for installation, and DevBrain does not require a third-party skill package or humanizer service.

## Project context and scope

DevBrain stores reusable methods and engineering judgment. The active repository stores its own technology versions, product rules, API contracts, visual identity, data permissions, file ownership, and verification commands. Optional files under `project-templates/` help organize that context when the project needs them. They are examples to adapt, not required files or global DevBrain rules.

The latest user instruction controls the task after platform and safety requirements. DevBrain does not authorize a deployment, a data migration, a host installation, or an external side effect by itself. The agent checks the requested scope and applicable project instructions before acting.

## Quality and evidence

DevBrain separates package checks from observed model behavior. Repository validation checks source structure and links. Skill tests check catalog, routing, and packaging contracts. Simulated installer tests check target layout and preservation. Scenario files define behavioral cases. Native comparisons require fresh Codex or Claude sessions with matched prompts and recorded evidence. Passing a structural check does not establish that a host loaded the files or that every model response follows them.

See the [3.7 evaluation guide](docs/v3.7-evaluation.md) for skill coverage and the six-case comparison. The full benchmark contains 22 cases.

## Current guidance and evidence

- [Documentation index](docs/README.md): current guides and clearly identified historical records.
- [3.5 Creative UI/UX guide](docs/v3.5-creative-ui-ux.md)
- [Architecture](docs/architecture.md) and [module ownership](docs/module-ownership.md): canonical sources and boundaries.
- [3.4 agent engineering guide](docs/v3.4-agent-engineering.md)
- [3.3 production delivery guide](docs/v3.3-production-delivery.md)
- [3.2 delivery guide](docs/v3.2-delivery.md): new capabilities, benchmark method, and validation limits.
- [Evaluation procedure](evaluation/README.md): package validation and optional behavior evaluation.
- [Changelog](CHANGELOG.md): dated release history.

Older release reports preserve the scope and results observed at their original dates. They are historical evidence, not current setup instructions or proof of present-day host behavior. Native Codex/Claude behavior must be evaluated separately; structural checks cannot establish universal model quality or host parity.

## Operating boundaries

The latest user instruction takes precedence over DevBrain preferences after platform and safety requirements. Low-risk work proceeds directly; medium-risk work proceeds after impact analysis; specific confirmation is needed only at an unapproved high-risk boundary. Improve the requested outcome without inventing product requirements or contracts. Git command listings are text only; they do not authorize Git operations.

Markdown and YAML are the maintained operational source of truth. No source DOCX or optional product-guide DOCX is maintained in this release. The historical DOCX records remain available only in earlier Git history.
