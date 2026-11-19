# DevBrain 3.3

DevBrain 3.3.0 is a portable knowledge layer for Codex and Claude Code: it routes an agent to the relevant principles, workflow, safety guidance, or specialist skill for the requested outcome. It is not a model, agent runtime, or product application.

The current package contains 36 skills and 130 behavior scenarios. Version 3.3 adds cloud infrastructure and reliability engineering, an optional production readiness review, and guidance for evaluating third-party tooling. See the [3.3 production delivery guide](docs/v3.3-production-delivery.md).

## Start here

Read the [session baseline](runtime/session-baseline.md) once at the start of a coding session. Read the active project's `AGENTS.md` or `CLAUDE.md`, then use the [task map](runtime/task-map.md) to load only the modules and skills relevant to the task. Project instructions own stack, product behavior, visual identity, APIs, business rules, permissions, deployment, and validation commands.

To connect Codex and/or Claude Code to this checkout, preview and then run the installer from PowerShell:

```powershell
.\install\install-bootstrap.ps1 -WhatIf
.\install\install-bootstrap.ps1
```

Use `install/update-bootstrap.ps1` to update an existing installation. Review [installation and recovery](install/README.md) before applying changes. Repository maintenance does not install to a real host profile.

## How the system is organized

| Area | Responsibility |
|---|---|
| `runtime/` | Session baseline, selective task routing, compatibility entry points |
| `core/` | Global engineering, collaboration, and UI/UX decision frameworks |
| `safety/` | Cross-cutting safeguards and deeper risk analysis |
| `workflows/` | Task procedures, handoffs, debugging, project context, and delivery |
| `prompts/` | Short commands with intent, mode, and routing |
| `skills/` | 34 portable specialists selected by outcome |
| `adapters/` and `install/` | Codex/Claude loader templates and explicit installer/updater |
| `project-templates/` | Optional project context documents with clear ownership |
| `evaluation/` | Behavior contracts, package checks, and maintenance-only evaluation tools |
| `docs/` | Current usage guides, architecture, release evidence, and history |

The skill system is organized around ownership and handoffs, not a mandatory chain. The [skill catalog](skills/catalog.yaml) defines inputs, outputs, and conditional collaborators; the [skill-system guide](docs/skill-system.md) explains how to route mixed work. Skills are portable, and no third-party skill package or humanizer service is required.

## Current guidance and evidence

- [Documentation index](docs/README.md): current guides and clearly identified historical records.
- [Architecture](docs/architecture.md) and [module ownership](docs/module-ownership.md): canonical sources and boundaries.
- [3.3 production delivery guide](docs/v3.3-production-delivery.md)
- [3.2 delivery guide](docs/v3.2-delivery.md): new capabilities, benchmark method, and validation limits.
- [Evaluation procedure](evaluation/README.md): package validation and optional behavior evaluation.
- [Changelog](CHANGELOG.md): dated release history.

Older release reports preserve the scope and results observed at their original dates. They are historical evidence, not current setup instructions or proof of present-day host behavior. Native Codex/Claude behavior must be evaluated separately; structural checks cannot establish universal model quality or host parity.

## Operating boundaries

The latest user instruction takes precedence over DevBrain preferences after platform and safety requirements. Low-risk work proceeds directly; medium-risk work proceeds after impact analysis; specific confirmation is needed only at an unapproved high-risk boundary. Improve the requested outcome without inventing product requirements or contracts. Git command listings are text only; they do not authorize Git operations.

Markdown and YAML are the maintained operational source of truth. No source DOCX or optional product-guide DOCX is maintained in this release. The historical DOCX records remain available only in earlier Git history.
