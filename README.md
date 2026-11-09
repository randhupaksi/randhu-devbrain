# DevBrain v2.9 — Natural Communication and Writing Workflows

V2.9.0 is stable for natural communication defaults, deep Humanize editing, and evidence-based project documentation. It adds two portable skills and updates the installer to nine skills. Synthetic Humanize scenarios 64–71 were observed on Codex and Claude; the broader native CLI compatibility matrix remains incomplete, and these runs do not establish full host parity. See the [Humanize guide and evidence](docs/humanize.md), [project-documentation skill](docs/project-documentation.md), [v2.8 project-context release](docs/v2.8-project-context.md), and [v2.7 CLI record](docs/v2.7-cli-compatibility.md).

DevBrain is Randhu's personal context and developer knowledge layer for Codex and Claude Code. It provides principles, safety, workflows, prompt compression, skills, and bootstrap instructions. It is not an AI model, a new agent, an assistant replacement, a background application, or one large prompt.

Engineering quality and ways of thinking stay consistent; each project keeps its own visual identity. Stack, theme, specific colors/fonts/tokens, target users, endpoints/payloads, business rules, permissions, deployment, and validation commands belong in the project's `AGENTS.md`, `CLAUDE.md`, or other project context.

## Get started

Clone the repository wherever you choose, then run PowerShell as a regular user:

```powershell
.\install\install-bootstrap.ps1 -WhatIf
.\install\install-bootstrap.ps1
```

One installer sets up the Codex/Claude loader and nine custom skills. It detects the repository and user home. Review the preview before applying changes; personal instructions outside the managed block are preserved. Update with `install/update-bootstrap.ps1`. Options include `-Tool Codex|Claude|Both`, `-SkipSkills`, and path parameters for a custom profile. See the [installation guide](install/README.md) for backups, legacy skills, and rollback.

For an existing installation, use the updater when the checkout location or installed bootstrap/skill payload changes. Preview with `-WhatIf` first. A new session is needed to discover newly installed skills. The v2.8 project-context release changed guidance and evaluation without changing installer destinations or bootstrap payloads; v2.9 adds the Humanize and project-documentation skill payloads. Existing loaders read runtime in place, so start a fresh session after updating the checkout; do not reinstall solely for repository-only content changes.

## Context strategy

V2.8 adds a project-context ownership and progressive-disclosure contract: `AGENTS.md` owns instructions/commands/safety, `PROJECT-CONTEXT.md` provides a factual index, and optional Visual DNA/API Contract files own their domains. Five v2.8 scenarios extended the original suite; subsequent documentation and humanize additions bring the current suite to 71 cases. V2.5's [behavioral reliability evaluation](docs/v2.5-behavioral-reliability.md) still selects 12 representative cases, uses identical synthetic fixture pairs, and scores six dimensions; evaluations run only on request and add no normal startup context. A structural or scorecard pass does not prove universal Codex/Claude behavior.

V2.4 adds [session continuity](workflows/session-continuity.md): conversational handoff and evidence-based resume for substantial interrupted work or missing task context. `handoff` summarizes the goal, decisions, file state, actual checks, pending boundaries and next step. `resume-task` reconciles the summary with current instructions, workspace and latest intent, then continues the authorized task. A model switch with sufficient active context needs no extra workflow. See [the adoption guide](docs/v2.4-session-continuity.md). V2.3 [context reconciliation](workflows/context-reconciliation.md) remains available for material contradictions.

The [documentation index](docs/README.md) identifies current guides and historical records. See the [v2.8 project-context release](docs/v2.8-project-context.md), [v2.7 CLI compatibility record](docs/v2.7-cli-compatibility.md), and [v2.6 record](docs/v2.6-validation.md) for their scoped evidence; [v2.5 validation](docs/v2.5-validation.md) retains that completed release's results.

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
| skills | Nine portable, task-specific skills with progressive disclosure |
| adapters | Codex/Claude bootstrap templates and discovery notes |
| project-templates | Optional project context templates, ownership rules, and selective domain references |
| install | User-level PowerShell installer/updater |
| docs | Architecture, maintenance, audit, and upgrade report |
| evaluation | Behavior scenarios and validation/installer tests |
| source | Generalized v2 conceptual DOCX; excluded from normal startup context |

Skills: `enterprise-ui-ux` for operational applications; `marketing-portfolio-ui-ux` for narrative/conversion surfaces; `design-system-architect` for tokens/shared UI; `architecture-refactor` for responsibility/dependency boundaries; `frontend-performance` for measured speed improvements; `accessibility-audit` for accessibility reviews and fixes; `testing-strategy` for focused test planning and implementation; [project-documentation](docs/project-documentation.md) for accurate, connected project Markdown; and [humanize](docs/humanize.md) for deep prose and UI copy editing. Each skill activates only when its outcome is relevant; an audit-only request remains read-only.

V2.9's [Humanize system](docs/humanize.md) adds natural language defaults for responses, prose, and UI text, plus a focused editing skill. It requires no external humanizer service or runtime dependency. Its observed synthetic behavior is limited to the scenarios and host versions recorded in the evaluation guide.

V2.9's [project-documentation skill](docs/project-documentation.md) adds one combined expected format for 15 document roles without expanding the session baseline. Updating this checkout does not install skills to an existing host profile; use the installer for an explicitly requested profile update.

## Key boundaries

The latest prompt takes precedence over global preferences. Work on low-risk tasks directly; proceed on medium-risk tasks after impact analysis. Pause for specific confirmation only at an unapproved high-risk boundary. Overdelivery improves the requested outcome; it does not invent business features or contracts. Git command listings are text-only; Git operation permissions are separate.

There is no product CLI, executable, daemon, database, GUI, or notification system. Evaluation scripts are manual maintenance tools. The [evaluation guide](evaluation/README.md), [v2 audit](docs/v2-audit.md), and [upgrade report](docs/v2-upgrade-report.md) document evidence and verification limits.

Maintained DevBrain documentation, operational content, and the current conceptual DOCX use English. The original v0.1 DOCX remains in earlier Git history and is not loaded during normal coding.
