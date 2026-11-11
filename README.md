# DevBrain Update 3.0 — Connected Fullstack Skills

V2.9.0 remains the latest stable release for natural communication defaults, deep Humanize editing, and evidence-based project documentation. It adds two portable skills and updates the installer to nine skills. Synthetic Humanize scenarios 64–71 were observed on Codex and Claude; the broader native CLI compatibility matrix remains incomplete, and these runs do not establish full host parity. See the [Humanize guide and evidence](docs/humanize.md), [project-documentation skill](docs/project-documentation.md), [v2.8 project-context release](docs/v2.8-project-context.md), and [v2.7 CLI record](docs/v2.7-cli-compatibility.md).

DevBrain is Randhu's personal context and developer knowledge layer for Codex and Claude Code. It provides principles, safety, workflows, prompt compression, skills, and bootstrap instructions. It is not an AI model, a new agent, an assistant replacement, a background application, or one large prompt.

Engineering quality and ways of thinking stay consistent; each project keeps its own visual identity. Stack, theme, specific colors/fonts/tokens, target users, endpoints/payloads, business rules, permissions, deployment, and validation commands belong in the project's `AGENTS.md`, `CLAUDE.md`, or other project context.

DevBrain Update 3.0 is the unreleased fullstack expansion: it adds 21 skills and reinforces the existing nine, bringing the source to 30 skills and 113 scenario contracts. It also connects existing UI/UX skills through a human-centred quality hierarchy, task-ranked visual hierarchy, flexible composition patterns, product/surface lenses, an original style library, concrete palette and reference records, chart-selection guidance, platform adaptation, evidence-led critique, and visual QA; see the [Core index](core/00-index.md) for module ownership and [skill system](docs/skill-system.md) for validation limits.

## Get started

Clone the repository wherever you choose, then run PowerShell as a regular user:

```powershell
.\install\install-bootstrap.ps1 -WhatIf
.\install\install-bootstrap.ps1
```

The current source installer sets up the Codex/Claude loader and 30 custom skills. It detects the repository and user home. Review the preview before applying changes; personal instructions outside the managed block are preserved. Update with `install/update-bootstrap.ps1`. Options include `-Tool Codex|Claude|Both`, `-SkipSkills`, and path parameters for a custom profile. See the [installation guide](install/README.md) for backups, legacy skills, and rollback.

For an existing installation, use the updater when the checkout location or installed bootstrap/skill payload changes. Preview with `-WhatIf` first. A new session is needed to discover newly installed skills. V2.8 changed guidance without changing installer payloads; v2.9 brought the managed skill set to nine with Humanize and project documentation. DevBrain Update 3.0 adds 21 more skills, so an explicit updater run is needed to copy the current 30-skill payload to an existing profile. Existing loaders read runtime guidance in place; start a fresh session after updating the checkout, and do not reinstall solely for repository-only content changes.

## Context strategy

V2.8 adds a project-context ownership and progressive-disclosure contract: `AGENTS.md` owns instructions/commands/safety, `PROJECT-CONTEXT.md` provides a factual index, and optional Visual DNA/API Contract files own their domains. Five v2.8 scenarios extended the original suite; documentation, humanize, and fullstack skill additions bring the current suite to 113 cases. V2.5's [behavioral reliability evaluation](docs/v2.5-behavioral-reliability.md) still selects 12 representative cases, uses identical synthetic fixture pairs, and scores six dimensions; evaluations run only on request and add no normal startup context. A structural or scorecard pass does not prove universal Codex/Claude behavior.

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
| skills | 30 portable skills selected by outcome, with artifact-based collaboration |
| adapters | Codex/Claude bootstrap templates and discovery notes |
| project-templates | Optional project context templates, ownership rules, and selective domain references |
| install | User-level PowerShell installer/updater |
| docs | Architecture, maintenance, audit, and upgrade report |
| evaluation | Behavior scenarios and validation/installer tests |
| source | Generalized v2 conceptual DOCX; excluded from normal startup context |

The original nine task-specific skills cover product UI, marketing UI, design systems, refactoring, frontend performance, accessibility, testing, project documentation, and deep humanization. The current source adds 21 fullstack specialists, for 30 skills total. See the [skill-system guide](docs/skill-system.md) for ownership and handoffs, and the [catalog](skills/catalog.yaml) for the complete list. Skills activate only when their outcome is relevant; an audit-only request remains read-only.

V2.9's [Humanize system](docs/humanize.md) adds natural language defaults for responses, prose, and UI text, plus a focused editing skill. It requires no external humanizer service or runtime dependency. Its observed synthetic behavior is limited to the scenarios and host versions recorded in the evaluation guide.

V2.9's [project-documentation skill](docs/project-documentation.md) adds one combined expected format for 15 document roles without expanding the session baseline. Updating this checkout does not install skills to an existing host profile; use the installer for an explicitly requested profile update.

## Key boundaries

The latest prompt takes precedence over global preferences. Work on low-risk tasks directly; proceed on medium-risk tasks after impact analysis. Pause for specific confirmation only at an unapproved high-risk boundary. Overdelivery improves the requested outcome; it does not invent business features or contracts. Git command listings are text-only; Git operation permissions are separate.

There is no product CLI, executable, daemon, database, GUI, or notification system. Evaluation scripts are manual maintenance tools. The [evaluation guide](evaluation/README.md), [v2 audit](docs/v2-audit.md), and [upgrade report](docs/v2-upgrade-report.md) document evidence and verification limits.

Maintained DevBrain documentation, operational content, and the current conceptual DOCX use English. The original v0.1 DOCX remains in earlier Git history and is not loaded during normal coding.
