# Changelog

## 2.4.0 — 2026-10-08

- Added selective session continuity for requested conversational handoffs and substantial interrupted work with missing context.
- Added `handoff` and `resume-task` contracts, current-state checks, latest-intent precedence, evidence freshness and authorization verification without growing the baseline or creating automatic task logs.
- Extended the evaluation suite with eight continuity cases, totaling 54, and added clone-isolated negative contract tests plus a two-phase host evaluation guide.
- Kept model switches with sufficient active context lightweight; source DOCX remains the v2.2 conceptual reference.

## 2.3.0 — 2026-10-07

- Added selective context reconciliation for material disagreement or stale context, with fact-specific evidence and the existing baseline precedence.
- Connected `context-check`, task routing, discovery, and standard work without expanding the baseline or installing new skills.
- Extended project templates with source-of-truth/conflict fields and the suite with eight scenarios, totaling 46.
- Covered command wrappers, active UI sources, latest-user choices, public contracts, authorization, equal-scope instructions, authorized context repair, and untrusted diagnostic content.
- Kept the source DOCX as a v2.2 conceptual reference; current Markdown/YAML defines v2.3 behavior.

## 2.2.0 — 2026-09-28

- Added selective project discovery, evidence-based debugging, and adaptive definition-of-done workflows.
- Connected task routing, standard verification, and compressed commands without expanding the session baseline or installing new skills.
- Extended behavioral scenarios for discovery scope, diagnosis/fix intent, uncertain evidence, high-risk fixes, and completion reviews; documented adoption and evaluation limits.
- Aligned current documentation and the conceptual specification with v2.2, indexed historical records, and recorded observed validation separately from independent host behavior.

## 2.1.0 — 2026-09-27

- Added focused frontend performance, accessibility, and testing skills that can audit or implement according to the active request.
- Routed the skills selectively, extended the installer and evaluation suite, and updated installation and conceptual documentation.

## Source specification revision — 2026-09-26

- Replaced the current-tree personal v0.1 DOCX with a generalized English v2 conceptual specification in third-person language.
- Expanded the v2 specification with session examples, module routing, risk decisions, frontend and API guidance, installation flow, and evaluation limits.
- Updated the source manifest, hash, mapping, and documentation; the original file remains in earlier Git history.
- Kept Markdown/YAML as the operational source and the DOCX outside normal startup context.

## 2.0.0 — 2026-09-26

- Replaced monolithic startup context with a session baseline and selective task routing while keeping legacy entry points compatible.
- Aligned precedence, low/medium-risk autonomy, and high-risk boundaries; quality overdelivery no longer invents business requirements.
- Clarified the scope of all four skills and progressive disclosure; Codex and Claude use the same source content.
- Made the installer render canonical bootstrap templates; added idempotent updates, `SkipSkills`/`WhatIf`, backups, and nested-skill repair.
- Added an evaluation suite, structural validator, installer integration tests, audit, and upgrade report.
- Kept upgrade changes inside the repository; did not reinstall to the real user home.
- Standardized maintained DevBrain documentation and operational content on English. The historical DOCX remains unchanged in its original language.
- Audited the English translation against the saved pre-translation v2 snapshot; restored the repository loader/import, omitted boundaries, and original autonomy wording, and corrected historical/reporting omissions. See [the semantic audit](docs/english-semantic-audit.md).

Earlier entries record v1 history; active rules live in the v2 baseline/modules.

## 2026-08-31 — Cross-device Bootstrap Foundation

- Added a portable PowerShell installer/updater to connect DevBrain to Codex and Claude on another device.
- Detect the repository root and `$HOME`, create backups, and preserve instructions outside the managed block.
- Document `-Tool`, `-WhatIf`, the update workflow, and the rule against silently changing global configuration.
- Align the README, manifest, runtime, architecture, and adapter documentation.

## 2026-08-27 — Session Context Lifecycle

- Load DevBrain runtime once at the start of a coding session and reuse it in later turns.
- Add reload triggers for explicit requests, context compaction/material loss, DevBrain updates, repository changes, and uncertainty about active rules.
- Align Codex and Claude bootstrap behavior to avoid rereading runtime on every message.

## 2026-08-27 — Feature-based Git Command Listing

- Add `git-command-listing.md` for text-only Git command output grouped by feature/logical change.
- Specify `git add --` with exact paths, English Conventional Commit messages naming domain/outcome, and one final `git push` command.
- Clarify that a request to list Git commands does not authorize add/commit/push; Git authorization is per operation.

## 2026-08-27 — Backend and API Intelligence

- Add `core/api-backend-intelligence.md` for contract discovery, consumer compatibility, architecture, validation/errors, authorization, data integrity, resilience, observability, and testing.
- Add `safety/data-and-api-protection.md` for secrets/PII, server-side authorization, tenant isolation, mutations, migrations, and secure implementation boundaries.
- Add `api-feature.md` and `safe-data-migration.md` to distinguish coding, migration preparation, and risky data execution.
- Add the API/backend contract template and expand project context fields.
- Add compressed commands `api-feature`, `backend-module`, `contract-impact-check`, `api-hardening`, `data-safety-audit`, `migration-plan`, and `integration-test`.

## 2026-08-27 — Frontend Intelligence

- Add `core/design-system-intelligence.md` for Visual DNA, design-system discovery, token discipline, component architecture, dependency policy, and frontend quality gates.
- Add `ui-foundation-pass.md` to guide when to reuse, extend, create, or keep UI feature-local.
- Add the Project Visual DNA template and project-specific UI identity/source-of-truth fields.
- Add compressed commands `design-system-scan`, `visual-dna-init`, `ui-foundation`, `componentize-ui`, and `premium-feature-ui`.
- Clarify that solutions should be complete, polished, and proportionate—not merely minimal diffs or unnecessary system-wide redesigns.

## 2026-07-02 — Latest User Decision Authority

- Make DevBrain a default baseline, not a rule that overrides the active user decision.
- Clarify that the latest user decision replaces conflicting DevBrain defaults, AI recommendations, changed project preferences, and earlier user decisions.
- Add the A-to-B example and prohibit repeated confirmation merely because the user changed a decision.
- Limit an override to the changed choice; preserve other project context.
- Remove wording that limited creativity to changes without behavior/API impact.
- Resolve low/medium-risk redesign ambiguity through evidence-based assumptions rather than an approval gate.

## 2026-07-02 — Policy Consolidation and Operational Status

- Resolve the conflict between presentation-only UI and proactive API/backend expansion.
- Define effective scope as the requirement plus evidence-backed adjacent expansion.
- Add a diminishing-value stop rule to prevent feature bloat.
- Add an environment/data gate distinguishing local dummy data from client/production data.
- Define safe fixes as the smallest complete solution.
- Make Markdown/YAML the canonical operational source and DOCX v0.1 the historical foundation.
- Mark the manifest operational and align compact fallback, evaluation scenarios, source mapping, and bootstrap docs.

## 2026-07-02 — Creativity with Client-Data Boundaries

- Earlier policy allowed expanding requirements from A/B/C to D/E when relevant and product-improving, including proactive product/workflow/integration/API/backend changes for low/medium risk.
- Replace API prohibition with contract-first analysis and compatibility discipline.
- Center strict approval on client/production data, tenant/security, destructive migrations, and other high-risk impacts.
- Continue to prohibit random features, silent business-rule changes, and additions without a defensible project connection.

## 2026-07-02 — UI Creativity and API Boundaries

- Maximize UI/UX creative authority within project context and design system.
- Allow layout/composition restructuring and relevant supporting UI without one-by-one micro-instructions.
- Separate presentation-layer freedom from API-contract and data-semantics changes.
- Add an API caution protocol covering contracts, consumers, compatibility, side effects, and validation.
- Keep requested low/medium-risk integration fixes autonomous; reserve approval for unauthorized high-risk impact.

## 2026-07-02 — High-autonomy Quality Update

- Add intent classification to separate audit, diagnosis, planning, and implementation.
- Allow controlled feature expansion from A+B to C for evidence-based, reversible low/medium-risk tasks.
- Set high UI creative freedom within the project's theme, design system, and behavior.
- Replace minimum diff with the smallest complete, proportionate solution.
- Limit approval gates to high-risk boundaries, not ordinary material changes.
- Add visual verification for meaningful UI changes and adaptive final reporting.
- Remove client-specific PT Matik rules from global core.
- Fix encoding and outdated Claude adapter notes.

## 2026-07-01 — Evidence-first Decisions

- Add an ambiguity-resolution ladder before asking for clarification.
- Use project precedent to resolve implied details for reversible low/medium-risk work.
- Separate explicit requirements, implied details, quality improvements, and speculative product scope.
- Prefer controlled overdelivery over underdelivery without permitting feature speculation.
- Add requirement-coverage review and evidence/assumption reporting.
- Clarify that file count/size is not an approval gate.

## 2026-07-01 — Full Operational Context

- Balance proactive quality improvements with the prohibition on speculative business scope.
- Add diff-level compliance checks against project rules.
- Separate prerequisite validation cleanup from the main scope.
- Clarify that read-only prohibits mutation, not diagnostic inspection.
- Change startup from compact-only to full operational context.

## 2026-07-01 — Compact Runtime

- Add `runtime/core-compact.md` as the only always-loaded module.
- Replace six mandatory modules with on-demand routing.
- Prohibit full-tree DevBrain scans during normal coding.
- Restrict DOCX/source loading to `devbrain-sync`.
- Prepare concise, reversible Codex and Claude global bootstraps.

## 2026-07-01 — Autonomy Policy

- Make the AI autonomous by default for low/medium-risk tasks.
- Remove approval gates for explicitly requested redesigns, refactors, and multi-file changes that stay within protected boundaries.
- Make the active session prompt override DevBrain defaults.
- Keep approval for unauthorized high-risk/irreversible actions and client/production data risks.

## 2026-07-01 — Initial DevBrain Foundation

- Build the DevBrain knowledge layer from Randhu's Developer Specification.
- Separate global principles from project-specific rules.
- Add explicit risk classification and approval gates.
- Route context so modules load only when relevant.
- Add initial Codex and Claude Code adapters and prompt compression without a CLI.
- Defer notifications, logs, daily summaries, GUI, and CLI.
