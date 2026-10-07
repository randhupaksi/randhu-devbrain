# DevBrain v2 Read-only Audit

Historical record of the original v2 audit. Counts and findings below describe that snapshot. For maintained guidance and observed validation, use the [current documentation index](README.md).

This audit was completed before implementation with a clean initial working tree. Scope included the README/manifest, operational folders, all four skills with references/metadata, installer/updater, adapters, templates, docs/changelog, and historical DOCX. No repository `AGENTS.md` existed at the time of the initial audit; global bootstrap guidance was provided by the session. Existing home loaders/skills were inspected read-only. No other benchmark repository was opened.

## What was already strong

- DevBrain was already framed as an AI-agnostic knowledge layer, separate from project facts.
- Visual DNA, token discovery, UI states, shared-consumer impact, API contracts, tenant scope, transaction/idempotency, and verification were represented.
- The four skills had separate frontmatter/references, and Codex metadata enabled implicit use.
- The installer used `PSScriptRoot`/`HOME`, managed blocks, and backups; the initial source scan found no hardcoded laptop paths.
- The historical DOCX was excluded from normal coding, and its repository snapshot was preserved.

## Initial issues, conflicts, and redundancy

| Initial finding | Impact | V2 decision |
|---|---|---|
| Full runtime was 94,112 bytes / 11,519 words / 94,016 characters. | Every session loaded core, safety, workflow, precedence, and all commands: about 23,504 tokens at characters/4. | One baseline plus task routing. |
| Full and compact runtime kept duplicate policy copies. | Drift risk; compact described a temporary fallback while routing appeared selective. | Both became compatibility pointers. |
| Manifest `load_when` repeated modules already included in runtime. | Progressive loading existed only nominally. | Manifest points to the canonical task map. |
| AI collaboration allowed adjacent capabilities, exports/imports, workflows, and new endpoints. | Overdelivery could turn into new business requirements. | Keep quality autonomy high; new capabilities must be required. |
| UI workflow prohibited API changes but allowed relevant new backend work. | A visual task could expand into business/backend scope. | Align with requirement/contract boundaries. |
| Authentication/permission risk was sometimes limited to real users. | Local security changes could escape confirmation. | Boundary changes remain high-risk even locally. |
| Precedence placed project technical direction below DevBrain safety as a separate level. | Project instructions appeared at two conflicting levels. | Use the seven levels requested in the upgrade prompt. |
| Protected-area stop wording was too broad. | Reading an API/shared component could be mistaken for an approval gate. | Distinguish review, compatible implementation, and high-risk changes. |
| Scope/creativity/API cautions repeated in core, workflows, and both runtimes. | Context bloat and update conflicts. | Concise baseline, canonical domain owners, selective references. |
| Installer copied source into an existing skill directory. | Nested copies appeared for all four skills in both tool homes. | Stage, verify, back up the whole tree, then swap. |
| Updater lacked `SkipSkills`. | Users could not update only the loader. | Forward the parameter consistently. |
| Loader text was separate from adapter templates. | Template/loader drift. | Render canonical templates in the installer. |
| Rollback docs suggested emptying/deleting a loader. | Could remove personal instructions. | Restore only the managed block or a reviewed selected backup. |
| Some `commands.yaml` scalars had unquoted colons. | YAML parsing failed and the command catalog was invalid. | Quote intent/output/reason strings. |
| Evaluation was prose without expected context/files/validation. | Routing, autonomy, and safety were hard to evaluate consistently. | Add 24 structured scenarios and a rubric. |

The largest irrelevant-context risk came from the runtime monolith, not skill references. Useful references did not need to be deleted just to shrink the repository.

## Audit of the four skills

| Skill | Strengths | Gaps | V2 adjustment |
|---|---|---|---|
| `enterprise-ui-ux` | Clear operational/CRUD/data-heavy scope; strong state/accessibility and anti-slop guidance. | Autonomy/when-to-ask was implicit; some aesthetic guidance could read as absolute. | Clarify boundaries/selective loading and project identity. |
| `marketing-portfolio-ui-ux` | Separates narrative/conversion and portfolio proof from enterprise UI. | Placeholder guidance could become final copy; approval behavior was implicit. | Exclude unsupported claims; clarify autonomy/approval. |
| `design-system-architect` | Strong tokens, primitives, consumers, and reuse guidance. | “Frontend refactors” overlapped architecture; every visual value could trigger references; token rules were too absolute. | Scope to visual/shared contracts; load detailed audits as needed; follow project arbitrary-value policy. |
| `architecture-refactor` | Thin pages/handlers, DTO/service/data boundaries, incremental refactoring. | Discovery was too broad; API contract approval was blanket; report reference was mandatory. | Inspect affected areas; distinguish compatible from breaking changes; make checklists conditional. |

All skills retain progressive disclosure, project sources of truth, behavior preservation, and no rewrite without reason. Architecture references preserve benchmark quality principles without stack/endpoint/folder/client identity. Three matching standalone boundary paragraphs remain in each of the four skills so each host copy is safe on its own; they are not loaded together at startup.

## Historical DOCX gap

The available external historical DOCX matched the repository snapshot by SHA-256. Its OOXML paragraph/table text was read without modification; it was not rendered or exported as a new prompt.

Precision, context, maintainability, UI quality, data safety, project/global separation, and AI-agnostic modularity were represented. The DOCX requested broader approval for redesign/API/multi-file changes; the latest upgrade prompt explicitly replaced that with low/medium-risk autonomy. A later operational version allowed adjacent business expansion too broadly; v2 corrected that without restricting visual creativity. See [source mapping](source-mapping.md).

## Codex and Claude differences

Before v2, Codex read files through loader instructions while Claude eagerly imported the full runtime. Templates differed from installer hardcoded text. Both homes had root skills matching source plus nested duplicates. The global Codex loader had several runtime references, including user text outside the managed block; deleting them automatically would violate user-text preservation.

V2 uses the same template and explicit baseline read for both tools. Native discovery remains host-owned; installer parity does not guarantee session behavior. New installs use the Codex user skill location documented during the audit; legacy updates preserve the current location. See official sources in the [Codex adapter](../adapters/codex/README.md) and [Claude adapter](../adapters/claude-code/README.md).

## Implemented architecture recommendation

The baseline carries safety and cross-task decisions; the task map selects core/workflow/skill content; references load only for specific decisions. Project facts remain in project templates/instructions. The old full-context entry remains as a compatibility pointer. Installer updates should be idempotent, write nothing under `WhatIf`, preserve personal text, and be tested in isolated clone/home fixtures. Structural evaluation is distinct from live model behavior.

There is no need for a product CLI, database, daemon, registry, administrator operation, GUI, notification system, or model-specific hardcoding.
