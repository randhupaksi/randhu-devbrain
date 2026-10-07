# DevBrain v2 — Upgrade Report

Historical record of the original v2 upgrade and later semantic repairs. Its inventories, counts and test results describe those snapshots. For the current release, use the [documentation index](README.md), [adoption guide](v2.3-context-reconciliation.md) and [validation report](v2.3-validation.md).

Status: the repository upgrade is complete. No commit, push, reset, rebase, amend, registry/admin operation, database/production access, other-project change, or real-home reinstallation was performed. Test fixtures, clones, logs, and validation dependencies remain under ignored `local/`.

## 1. Condition before the upgrade

The initial working tree was clean with 76 tracked files. Global principles, Visual DNA, contract-first backend guidance, safety, workflows, and four skills were already strong. Startup loaded a full runtime containing nearly every operational module. The available historical DOCX matched the repository snapshot by SHA-256. See the [full audit](v2-audit.md).

## 2. Main problems

The runtime monolith and compact copy could drift; a selective-loading manifest did not reduce startup. Adjacent business/API expansion was too broad. Precedence and approval language conflicted. Installer updates created nested skills on both hosts, the updater lacked `SkipSkills`, loader text and templates were separate, and some `commands.yaml` scalars were invalid. Testing also found that a default parameter could not use `PSScriptRoot` in PowerShell 5.1; resolution was moved into the script body.

## 3. V2 architecture

One session baseline → selective task map → domain core/workflow → skill and reference as needed. Project context owns technical, business, and visual facts. Markdown/YAML remain canonical. There is no model binding, daemon, database, GUI, notification system, or product CLI. Evaluation scripts are manual maintenance tools.

## 4. Files created

The inventory below is cumulative: initial v2 upgrade, English translation, and semantic audit. It describes the current uncommitted result, not just the first implementation pass.

- `AGENTS.md`
- `CLAUDE.md`
- `docs/english-semantic-audit.md`
- `docs/v2-audit.md`
- `docs/v2-git-commands.md`
- `docs/v2-upgrade-report.md`
- `evaluation/README.md`
- `evaluation/scenarios.yaml`
- `evaluation/test-installer.ps1`
- `evaluation/validate-content.cjs`
- `evaluation/validate-repository.ps1`
- `runtime/session-baseline.md`
- `runtime/task-map.md`

## 5. Files changed

- `CHANGELOG.md`
- `README.md`
- `adapters/README.md`
- `adapters/claude-code/CLAUDE.global.template.md`
- `adapters/claude-code/README.md`
- `adapters/claude-code/bootstrap.md`
- `adapters/codex/AGENTS.global.template.md`
- `adapters/codex/README.md`
- `core/00-index.md`
- `core/ai-collaboration.md`
- `core/api-backend-intelligence.md`
- `core/design-system-intelligence.md`
- `core/developer-profile.md`
- `core/engineering-principles.md`
- `core/frontend-and-fullstack.md`
- `core/performance.md`
- `core/ui-ux-principles.md`
- `devbrain.yaml`
- `docs/architecture.md`
- `docs/bootstrap-installation.md`
- `docs/context-precedence.md`
- `docs/evaluation-scenarios.md`
- `docs/maintenance.md`
- `docs/source-mapping.md`
- `install/README.md`
- `install/install-bootstrap.ps1`
- `install/update-bootstrap.ps1`
- `project-templates/AGENTS.template.md`
- `project-templates/CLAUDE.template.md`
- `project-templates/PROJECT-API-CONTRACT.template.md`
- `project-templates/PROJECT-CONTEXT.template.md`
- `project-templates/PROJECT-VISUAL-DNA.template.md`
- `prompts/README.md`
- `prompts/commands.yaml`
- `runtime/core-compact.md`
- `runtime/full-context.md`
- `safety/data-and-api-protection.md`
- `safety/policy.md`
- `safety/risk-model.md`
- `skills/architecture-refactor/SKILL.md`
- `skills/architecture-refactor/references/reference-architecture-profile.md`
- `skills/architecture-refactor/references/safe-migration.md`
- `skills/design-system-architect/SKILL.md`
- `skills/enterprise-ui-ux/SKILL.md`
- `skills/marketing-portfolio-ui-ux/SKILL.md`
- `skills/marketing-portfolio-ui-ux/references/portfolio-patterns.md`
- `source/README.md`
- `workflows/api-feature.md`
- `workflows/git-command-listing.md`
- `workflows/safe-data-migration.md`
- `workflows/safe-refactor.md`
- `workflows/standard-task.md`
- `workflows/ui-foundation-pass.md`
- `workflows/ui-task.md`
- `workflows/verification-reporting.md`

## 6. Files preserved

- `.gitignore`
- `skills/architecture-refactor/agents/openai.yaml`
- `skills/architecture-refactor/references/backend-boundaries.md`
- `skills/architecture-refactor/references/dependency-direction.md`
- `skills/architecture-refactor/references/frontend-boundaries.md`
- `skills/architecture-refactor/references/giant-file-refactor.md`
- `skills/architecture-refactor/references/verification-checklist.md`
- `skills/design-system-architect/agents/openai.yaml`
- `skills/design-system-architect/references/component-architecture.md`
- `skills/design-system-architect/references/design-system-anti-patterns.md`
- `skills/design-system-architect/references/foundation-pass.md`
- `skills/design-system-architect/references/shared-component-guidelines.md`
- `skills/design-system-architect/references/token-audit.md`
- `skills/enterprise-ui-ux/agents/openai.yaml`
- `skills/enterprise-ui-ux/references/anti-ai-slop.md`
- `skills/enterprise-ui-ux/references/enterprise-patterns.md`
- `skills/marketing-portfolio-ui-ux/agents/openai.yaml`
- `skills/marketing-portfolio-ui-ux/references/anti-ai-slop.md`
- `skills/marketing-portfolio-ui-ux/references/marketing-patterns.md`
- `skills/marketing-portfolio-ui-ux/references/visual-storytelling.md`
- `source/Randhu_Developer_Specification_DevBrain_v0.1.docx`

The source DOCX and its historical hash, Codex skill metadata, and useful references remain intact. No tracked file was deleted. Real home loaders and installed skills were inspected read-only during the original audit; they have not been reinstalled. The semantic audit found all 26 skill files and both installer scripts byte-identical to the saved pre-translation v2 fixture.

## 7. Runtime

The initial v1 working-tree runtime measured 94,112 UTF-8 bytes, 94,016 characters, 11,519 words, and about 23,504 tokens using characters/4. Current English measurements are:

| Entry | UTF-8 bytes | Characters | Words | Estimated tokens |
|---|---:|---:|---:|---:|
| `runtime/session-baseline.md` | 8357 | 8319 | 1108 | 2080 |
| `runtime/task-map.md` | 2533 | 2533 | 286 | 634 |
| `runtime/full-context.md` | 539 | 537 | 79 | 135 |
| `runtime/core-compact.md` | 320 | 318 | 43 | 80 |

The baseline uses about **91.1% fewer characters/tokens** than that initial runtime. These are text estimates, not measured session token consumption. Project instructions, skill metadata, and task evidence add context. The v1 Git-HEAD text has slightly different line endings: 93,976 bytes, 93,880 characters, and 23,470 estimated tokens.

The task map loads only when useful. Legacy full-context and compact entries point to the baseline instead of duplicating policy; a legacy loader incurs the pointer's additional context. The semantic audit corrected the repository AGENTS/CLAUDE loading path without expanding the session baseline.

## 8. Bootstrap

Codex and Claude share the same template, rendered by the installer. The bootstrap instructs the host to read the baseline/runtime once per coding session, reuse context, avoid scanning all skills, load references selectively, and prioritize the active prompt after system/platform policy. The legacy full-context path remains a compatibility entry.

Existing personal instructions outside an installed managed block are preserved, even when they contain legacy wording. That preservation concerns installed home loaders; it does not require copying a global loader into this repository's `AGENTS.md`.

## 9. Installer

Supports fresh install/update, `Tool`, `SkipSkills`, `WhatIf`, `UserHome`, `CodexHome`, and `CodexSkillsPath`. It resolves repository root from the script and home from the user or explicit parameter. Preflight checks happen before writes; invalid/duplicate/reversed markers and linked paths are rejected. Loader backups preserve original bytes and text outside managed blocks. Skills are staged/hash-verified, the previous full tree is backed up, and the staged tree is swapped in. Idempotent updates do not create backup churn.

## 10. Skills

`enterprise-ui-ux` remains scoped to product/operational UI; `marketing-portfolio-ui-ux` to narrative/conversion; `design-system-architect` to tokens/shared UI contracts; and `architecture-refactor` to responsibility/dependency/data boundaries. Skills define autonomy, when to ask, progressive disclosure, and when not to rewrite. References are selective. Marketing avoids unsupported proof/placeholders; design-system follows project arbitrary-value policy. Standalone safety paragraphs intentionally match across all four skills; Codex metadata remains intact.

## 11. Precedence

System/platform → latest explicit user instruction → applicable project `AGENTS.md`/`CLAUDE.md` → DevBrain safety → global principles → adapter defaults → earlier AI recommendations. A newer choice replaces the earlier one for the changed scope. Do not repeat a still-valid, specific high-risk confirmation; “don't ask” is not hidden authorization for data/security/contract changes.

## 12. Creative autonomy

Implement low-risk work directly. For medium risk, analyze impact/consumers and proceed without extra approval. Relevant improvements to composition, hierarchy, states, responsiveness, accessibility, feedback, naming, and architecture are allowed. Overdelivery completes the requested requirement; it does not speculate about business features, endpoints, fields, flows, database, authentication/permissions, or data semantics.

## 13. Frontend guidance

Use project Visual DNA and theme/tokens/components as the foundation. Responsibility guide: shell → route/page → feature → pattern/primitive, with hooks/queries → service/API client for state/transport. This is not an import chain that requires primitives to fetch data. There is no global theme and no shared extraction merely because markup looks similar.

## 14. Backend/API guidance

Responsibility guide: router → middleware → handler/controller → service/use case → data access → model, with DTO/validation at transport boundaries. Preserve contracts, consumers, payload/response/error/status, auth/tenant scope, transactions, idempotency, and compatibility. Authorization stays server-side. Breaking API/auth/security/destructive migration remains high risk even in local code.

## 15. Portability

Repository source uses no laptop/username hardcoded path. Install-time root/home resolution writes a concrete absolute path only to the local loader. New Codex installs use its documented user skill location; legacy updates preserve their current location to avoid duplicate discovery. Explicit parameters support different profiles. A clone with spaces and a simulated alternate home was tested. This is a `UserHome` simulation, not a new OS account or physical-device/drive test. PowerShell 5.1 and 7 were tested.

## 16. Token/context strategy

Always-loaded context is the session baseline and applicable project instructions. UI, design system, frontend/backend, performance, migrations, refactoring, testing, detailed security, Git listings, and prompt commands are selective. DOCX, changelog, adapter/maintenance docs, templates, and evaluation are excluded from normal coding.

Safety, precedence, latest-user override, risk, approval boundaries, privacy, Git restrictions, context lifecycle, project boundaries, autonomy, and honest validation stay in the baseline. Savings come from routing and removing duplicate copies, not dropping safety.

## 17. Evaluation suite

The suite has 24 scenarios: all 21 requested cases plus prior authorization, typo/context-minimal, and additive migration preparation. Each specifies prompt, context, active/unneeded skills, autonomy, approval, expected files, validation, and forbidden behavior. See the [suite and rubric](../evaluation/README.md).

Live behavioral evaluation in separate Codex/Claude sessions has **not** been run. YAML/schema/routing checks validate suite structure, not model compliance. No model API or new task agent was created.

## 18. Validation

The initial v2 implementation reported 1,019 content checks across 88 tracked/proposed files, seven YAML files, four skills, and 24 scenarios; 29 installer assertions on PowerShell 5.1 and 29 on PowerShell 7; PowerShell parsing; YAML/frontmatter/metadata/module/link checks; portable-path and machine-username scans; secret-like filename/content heuristic scans; duplicate-instruction review; `git diff --check`; Git status/staged-state checks; and diff review. The DOCX package XML/relationships were also inspected for path/key candidates. Heuristic secret scanning is not a forensic guarantee.

After English normalization, `evaluation/validate-repository.ps1` passed 1,022 structural checks across 88 files, seven YAML files, and 24 scenarios; parsed all four PowerShell scripts; checked DOCX package paths/keys; and passed `git diff --check`. A targeted Indonesian-language scan over maintained Markdown/YAML/PowerShell/JSON found no hits. This linguistic scan is a keyword check, not a full semantic language detector. Installer behavior was not rerun for the language-only changes.

Historical setup issues resolved during the original v2 upgrade included an unusable Python alias and unavailable PyYAML (an isolated `js-yaml` parser was used), a sandbox-denied npm download (dependencies were installed as a regular user under `local/`), source-clone ownership restrictions (tests ran as the repository owner without global Git configuration), a URL false positive in the path scanner, and PowerShell 5.1 parameter initialization. The PowerShell 5.1 execution-policy option applied only to the test process; no registry or system policy was changed. These are historical results, not newly rerun operations.

The follow-up [English semantic audit](english-semantic-audit.md) compares the translation with the retained pre-translation v2 fixture, records specific regressions and repairs, and distinguishes manual semantic review from automated checks. Its current inventory is 13 new files, 55 modified tracked files, and 21 unchanged tracked files, including the audit document itself.

Fresh validation after the semantic repairs passed 1,027 structural checks across 89 files, seven YAML files, and 24 scenarios; parsed all four PowerShell scripts; checked DOCX package paths/keys; and passed `git diff --check`. The separate snapshot comparison passed 190 checks. A targeted Indonesian-keyword scan found no matches; no files were staged. Installer integration tests were not rerun because installer code, templates, and skill artifacts are unchanged. Live host behavior remains untested.

## 19. Remaining risks

Native loader/skill discovery in a new session on both hosts remains untested. The real home remains on its previous version until the user runs the updater; nested legacy copies there remain. Duplicated skills in two discovery locations need separate review.

The installer is not a transaction across the entire installation: an I/O failure after partial work may leave a partial update. Backups and reruns are available. Power loss, disk-full, and crash recovery were not simulated. Symlink/reparse source/targets are rejected; symlink-based installation is unsupported.

## 20. Assumptions

The latest upgrade prompt replaces historical approval and expansive-business-autonomy rules. Architecture benchmarks came only from user-provided principles and DevBrain references; no other project was accessed. The DOCX remains historical truth but does not override the latest prompt. There is no GPT-6/Astra-specific binding so DevBrain remains portable across assistants. Maintained repository content is now English; the historical DOCX remains in its original language.

## 21. Git commands — text only

The exact proposed file list and commit/push command are in [v2-git-commands.md](v2-git-commands.md). No mutating Git command has been run. The original upgrade was treated as one logical change because the manifest, runtime, templates, installer, tests, and docs refer to one another; splitting it would produce an incomplete release snapshot.

The inspected branch was `main`, upstream `origin/main`. Recheck status and staged scope before using the proposed commands if anything has changed.
