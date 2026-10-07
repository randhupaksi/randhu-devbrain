# DevBrain v2.2

DevBrain is Randhu's personal context and developer knowledge layer for Codex and Claude Code. It provides principles, safety, workflows, prompt compression, skills, and bootstrap instructions. It is not an AI model, a new agent, an assistant replacement, a background application, or one large prompt.

Engineering quality and ways of thinking stay consistent; each project keeps its own visual identity. Stack, theme, specific colors/fonts/tokens, target users, endpoints/payloads, business rules, permissions, deployment, and validation commands belong in the project's `AGENTS.md`, `CLAUDE.md`, or other project context.

## Get started

Clone the repository wherever you choose, then run PowerShell as a regular user:

```powershell
.\install\install-bootstrap.ps1 -WhatIf
.\install\install-bootstrap.ps1
```

One installer sets up the Codex/Claude loader and seven custom skills. It detects the repository and user home. Review the preview before applying changes; personal instructions outside the managed block are preserved. Update with `install/update-bootstrap.ps1`. Options include `-Tool Codex|Claude|Both`, `-SkipSkills`, and path parameters for a custom profile. See the [installation guide](install/README.md) for backups, legacy skills, and rollback.

For an existing installation, run `./install/update-bootstrap.ps1 -WhatIf` and then `./install/update-bootstrap.ps1` to install the new skill set for both hosts. A new session is needed for Codex or Claude to discover newly installed skills.

## Context strategy

V2.2 adds three selective workflows: [project discovery](workflows/project-discovery.md) for unfamiliar repositories or unclear task boundaries, [debugging](workflows/debugging.md) for evidence-based diagnosis and fixes, and [definition of done](workflows/definition-of-done.md) for proportionate completion reviews. They extend the task map and existing workflow; no additional skill is installed. See [the adoption guide](docs/v2.2-workflows.md) for examples and boundaries.

The [documentation index](docs/README.md) identifies current guides and historical records. See [the validation report](docs/v2.2-validation.md) for checks actually executed and remaining live-host evaluation.

1. Read the [session baseline](runtime/session-baseline.md) once at the start of a coding session.
2. Read the active project's instructions and only relevant evidence.
3. Use the [task map](runtime/task-map.md) to select modules and skills when needed.
4. Read skill references only when the decision requires their detail.

Do not load the full skills directory, source DOCX, changelog, adapter docs, project templates, evaluation, or maintenance docs during normal coding. Reload only at a context lifecycle boundary, after material context loss, a DevBrain update, or a user request. The v1 runtime path remains as a compatibility pointer.

## Structure

| Folder | Responsibility |
|---|---|
| core | Global identity and domain decision frameworks |
| runtime | Baseline, task routing, and compatibility entry points |
| safety | Policy and deeper risk/data/security analysis |
| workflows | Task procedures loaded when relevant |
| prompts | Short commands with intent, mode, routing, and approval boundaries |
| skills | Seven portable, task-specific skills with progressive disclosure |
| adapters | Codex/Claude bootstrap templates and discovery notes |
| project-templates | Project facts, Visual DNA, and API contracts |
| install | User-level PowerShell installer/updater |
| docs | Architecture, maintenance, audit, and upgrade report |
| evaluation | Behavior scenarios and validation/installer tests |
| source | Generalized v2 conceptual DOCX; excluded from normal startup context |

Skills: `enterprise-ui-ux` for operational applications; `marketing-portfolio-ui-ux` for narrative/conversion surfaces; `design-system-architect` for tokens/shared UI; `architecture-refactor` for responsibility/dependency boundaries; `frontend-performance` for measured speed improvements; `accessibility-audit` for accessibility reviews and fixes; and `testing-strategy` for focused test planning and implementation. Each skill activates only when its outcome is relevant; an audit-only request remains read-only.

## Key boundaries

The latest prompt takes precedence over global preferences. Work on low-risk tasks directly; proceed on medium-risk tasks after impact analysis. Pause for specific confirmation only at an unapproved high-risk boundary. Overdelivery improves the requested outcome; it does not invent business features or contracts. Git command listings are text-only; Git operation permissions are separate.

There is no product CLI, executable, daemon, database, GUI, or notification system. Evaluation scripts are manual maintenance tools. The [evaluation guide](evaluation/README.md), [v2 audit](docs/v2-audit.md), and [upgrade report](docs/v2-upgrade-report.md) document evidence and verification limits.

Maintained DevBrain documentation, operational content, and the current conceptual DOCX use English. The original v0.1 DOCX remains in earlier Git history and is not loaded during normal coding.
