# English Translation Semantic Audit

Historical record of the earlier v2 English-normalization audit. The comparison snapshot and validation counts below remain historical evidence. Current v2.2 behavior and documentation are indexed in [the documentation guide](README.md).

Date: 2026-09-26

## Result

The English translation preserved the central v2 policy, but it was not entirely language-only. Review found a repository loader regression, a lost Claude import, omitted explanations, softened wording, and reporting/history omissions. These have been corrected in English. The existing translation was retained where its meaning matched the source.

## Evidence and comparison boundary

The comparison used the pre-translation v2 working-tree snapshot retained by the latest completed installer fixture under ignored `local/`. That fixture was created by cloning the repository and overlaying the then-current uncommitted files. It is a closer comparison than Git HEAD, which still represents v1.

Of the 88 files present when this audit began, 86 existed in that snapshot. Thirty-six were byte-identical, including all 26 files across the four skills, both bootstrap templates, both installer scripts, the installer test, the content validator, project loader templates, and historical DOCX. Fifty differed: 49 translated text/configuration files and one pre-existing validation-wrapper adjustment. That wrapper's process-local `core.safecrlf=false` option was preserved; it was already present before this audit and is not a translation regression.

The snapshot does not contain `v2-upgrade-report.md` or `v2-git-commands.md`, which were written later. Their earlier Indonesian contents are available in this conversation. Reporting omissions were checked against that evidence, and their final inventories were reconciled with the current working tree. This audit does not claim a filesystem snapshot comparison for those two files.

A separate copy of all 88 files as they stood before this audit was saved inside ignored `local/semantic-audit/pre-audit/`. No external project or real user-home configuration was changed.

## Findings and corrections

| Finding | Effect | Correction |
|---|---|---|
| Repository `AGENTS.md` acquired a copied global/legacy loader, managed markers, and an unresolved root placeholder. | Added duplicate loading instructions and mixed installed-loader responsibilities into repository maintenance instructions. | Restore the short repository-specific instructions, direct baseline reference, and honest-validation rule. |
| `CLAUDE.md` lost its `@AGENTS.md` import. | A Markdown link is not equivalent to the original native import directive. | Restore the exact import syntax and translate only the explanatory sentence. |
| `core/00-index.md` lost its boundary test. | Removed the explicit test for deciding which facts belong globally versus in project context. | Restore the rule and all six categories of project facts. |
| `prompts/README.md` was reduced to a general catalog link. | Lost the explanation of compressed intent/routing and concrete examples showing that commands do not add authorization. | Restore those explanations and the `premium-ui`/`commit-msg` examples. |
| Maximum project-anchored UI creativity became merely “strong” authority. | Weakened a stated developer preference. | Restore “maximum” within the existing low/medium-risk scope and safety boundaries. |
| Collaboration guidance omitted a casual tone and flattened the four requirement categories. | Lost a communication preference and reduced clarity about mandatory requirements versus new capabilities. | Restore the tone and explicit category list. |
| A subjective design example was translated as “don't flatten it.” | Could suggest removing visual depth rather than avoiding squashed proportions. | Use “don't squash the proportions.” |
| Evaluation case 04 referred to toolbar filters rather than filter toolbars; case 22 narrowed generic auth to authentication. | Shifted the target unit of extraction and potentially narrowed the authorized security task. | Restore filter toolbars and the original generic auth scope. |
| Historical changelog entries softened adjacent/controlled feature expansion into generic improvements. | Obscured the historical policy change that v2 later superseded. | Restore the historical expansion statements and exact command identifiers. These remain historical, not active policy. |
| Upgrade-report file inventories, runtime detail, and troubleshooting provenance were shortened; the Git command list omitted files changed by translation. | Reduced reviewability and left the proposed commit list incomplete. | Restore explicit current inventories, relevant runtime measurements, and historical troubleshooting notes; reconcile the text-only command list. |

## Semantic coverage

The review checked obligations, prohibitions, exceptions, approval conditions, routing, concrete examples, and reporting claims, rather than treating word count or successful parsing as semantic equivalence.

| Area | Review outcome |
|---|---|
| Session baseline and task map | Seven-level precedence, latest-user override, loading lifecycle, project/global separation, three risk levels, Git permissions, quality autonomy, and selective loading retained. |
| Core modules | Frontend/backend responsibility boundaries, Visual DNA, reuse/abstraction criteria, contract compatibility, data/security protections, performance evidence, and scope limits retained; the specific omissions above corrected. |
| Safety modules | Approval conditions, read-only distinctions, client/production protection, local-code caveats, and per-operation Git authorization retained. |
| Workflows | Discovery, impact analysis, implementation scope, verification, and honest reporting retained across API, migration, refactoring, UI, Git listings, and standard tasks. |
| Prompt catalog | All 27 command identifiers, modes, approval fields, module paths, and forbidden-operation fields preserved. Human-readable intents/outputs reviewed against their source. |
| Evaluation suite | All 24 case identifiers, skill selections/exclusions, autonomy/approval values, and module paths preserved. Prompts, file expectations, validation expectations, and forbidden behaviors reviewed; cases 04 and 22 corrected. |
| Project templates, adapters, install guide | Project-fact fields, portable path strategy, backup/update boundaries, discovery limitations, and real-home installation restrictions retained. |
| Documentation, source mapping, history | V1 history remains distinguishable from active v2 policy. Reporting omissions repaired; the source DOCX and its hash remain unchanged. |
| Skills and executable installer logic | Byte-identical to the pre-translation fixture; no retranslation or code rewrite was needed. |

## Validation and limitations

A one-off comparison under ignored `local/semantic-audit/` passed 190 checks covering structured command/scenario controls, unchanged skill and installer artifacts, the restored loader/import, and heading-link targets. The complete comparison output is retained locally for inspection. These checks support the manual semantic review; they do not automatically prove prose equivalence.

Fresh repository validation passed 1,027 structural checks across 89 tracked/proposed files, seven YAML files, and 24 scenarios; parsed all four PowerShell scripts; checked DOCX package paths/keys; and passed `git diff --check`. A targeted Indonesian-keyword scan found no matches, and the staged-file count was zero. The keyword scan is not proof of complete linguistic or semantic equivalence. Installer integration tests were not rerun because the executable installer, templates, and skill artifacts are unchanged.

Live Codex/Claude behavioral sessions and real-home discovery were not exercised by this semantic audit. No commit, push, reset, rebase, amend, or history mutation was performed.
