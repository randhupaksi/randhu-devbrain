# DevBrain v2.8 Documentation

V2.8.0 is stable for its project-context architecture after repository, regression, harness, installer, and smoke-fixture checks. The scoped v2.7 native CLI matrix remains incomplete: Codex and Claude have partial bootstrap captures, not full host parity evidence. Markdown/YAML defines operational behavior. The generalized DOCX remains a v2.2 conceptual reference, excluded from startup. Read these documents for maintenance or onboarding.

| Reader need | Current document |
|---|---|
| Product overview and quick start | [Repository README](../README.md) |
| Architecture and canonical ownership | [Architecture](architecture.md) |
| Instruction priority | [Context precedence](context-precedence.md) |
| Project context setup and optional template ownership | [V2.8 stable project-context architecture](v2.8-project-context.md) and [template guide](../project-templates/README.md) |
| Installing, updating, previewing and recovering | [Installation guide](../install/README.md) and [bootstrap notes](bootstrap-installation.md) |
| Discovery, debugging and completion workflows | [V2.2 adoption guide](v2.2-workflows.md) |
| Context reconciliation and conflicting evidence | [V2.3 adoption guide](v2.3-context-reconciliation.md) |
| Handoff and interrupted-task recovery | [V2.4 adoption guide](v2.4-session-continuity.md) |
| Repeatable behavior evaluation and evidence scoring | [V2.5 adoption guide](v2.5-behavioral-reliability.md) |
| Native preflight, provenance and calibration | [V2.6 candidate guide](v2.6-native-validation.md) |
| V2.6 scoped validation record | [V2.6 candidate evidence](v2.6-validation.md) |
| Codex/Claude CLI discovery, sessions, skills, and permissions | [V2.7 CLI compatibility candidate](v2.7-cli-compatibility.md) and [host matrix](../evaluation/cli-host-matrix.yaml) |
| Evaluation procedure and scenario definitions | [Evaluation guide](../evaluation/README.md) and [scenario overview](evaluation-scenarios.md) |
| Source specification and mapping | [Source reference](../source/README.md) and [source mapping](source-mapping.md) |
| Maintaining modules and documentation | [Maintenance](maintenance.md) |
| Release history | [Changelog](../CHANGELOG.md) |

## Historical records

[Original v2 audit](v2-audit.md), [original v2 upgrade report](v2-upgrade-report.md), [English semantic audit](english-semantic-audit.md), and [original Git command snapshot](v2-git-commands.md) describe earlier states. Their counts, validation results and file lists are historical evidence. They do not supersede the current task map, manifest or installation guide. Generate Git command lists from the current worktree.

[V2.2 validation](v2.2-validation.md) retains that release's observed results. The v2.2 workflow adoption guide remains applicable to discovery/debugging/completion.

[V2.3 validation](v2.3-validation.md) retains its original dated checks and worktree snapshot. Its context-reconciliation guidance remains applicable.

[V2.4 validation](v2.4-validation.md) retains its original dated checks. Its session-continuity workflow remains applicable; current evaluation uses the v2.5 smoke pack and result contract.

[V2.5 validation](v2.5-validation.md) retains its completed dated evidence. The current candidate uses result schema version 2; old records must not be relabeled as newly observed sessions.
