# DevBrain Documentation

DevBrain 3.7.0 contains 40 portable skills and 139 task behavior contracts. Markdown and YAML are the maintained operational sources. This index routes users and maintainers to the current owner for each question and keeps dated evidence attached to the release that produced it.

## Choose a starting point

| Need | Start here |
|---|---|
| Understand DevBrain and begin a coding session | [Repository overview](../README.md), [session baseline](../runtime/session-baseline.md) |
| Understand loading, host integration, or source ownership | [Architecture](architecture.md), [module ownership](module-ownership.md) |
| Select or add a specialist skill | [Skill system](skill-system.md), [task map](../runtime/task-map.md), [skill catalog](../skills/catalog.yaml) |
| Prepare a feature-split Git command list | [Git Command Listing skill](../skills/git-command-listing/SKILL.md), [Git safety policy](../safety/policy.md) |
| Connect Codex or Claude Code to this checkout | [Installation, update, and recovery](../install/README.md) |
| Start a full-stack project from a brief | [3.2 delivery guide](v3.2-delivery.md), [greenfield workflow](../workflows/greenfield-fullstack-delivery.md) |
| Review hosted runtime or service recovery | [3.3 production delivery guide](v3.3-production-delivery.md) |
| Set up project instructions or optional context | [Project context workflow](../workflows/project-context-setup.md), [templates](../project-templates/README.md) |
| Understand a verification command or behavior evaluation | [Evaluation procedure](../evaluation/README.md), [scenario overview](evaluation-scenarios.md) |
| Review deep editing or natural UI text | [Humanize guidance](humanize.md) |
| Create distinctive art direction across product surfaces | [Creative UI/UX skill](../skills/creative-ui-ux/SKILL.md), [creative direction playbook](../skills/creative-ui-ux/references/creative-direction-playbook.md), and [3.5 guide](v3.5-creative-ui-ux.md) |
| Design a creative landing page and its supporting visitor routes | [3.5 Creative UI/UX guide](v3.5-creative-ui-ux.md), [public-experience reference](../skills/marketing-portfolio-ui-ux/references/creative-public-experiences.md), and [marketing and portfolio skill](../skills/marketing-portfolio-ui-ux/SKILL.md) |
| Maintain project documentation | [Project documentation guidance](project-documentation.md) |
| Resolve instruction conflicts | [Context precedence](context-precedence.md) |
| Find a release's scope and historical evidence | [Changelog](../CHANGELOG.md), then the corresponding report below |

## Maintained source and supporting documentation

| Question | Canonical source |
|---|---|
| What is globally loaded and when should it reload? | `runtime/session-baseline.md` |
| Which guidance should a task load? | `runtime/task-map.md` and `runtime/skill-selection.md` |
| What does each skill own and hand off? | `skills/catalog.yaml` |
| Which skill folders are packaged? | `devbrain.yaml` and the installer source |
| How do safety and authorization boundaries work? | `runtime/session-baseline.md` and `safety/` |
| What behavior should the package demonstrate? | `evaluation/scenarios.yaml` and the benchmark suite |
| What checks actually passed for a release? | Its dated delivery or validation report |

The documentation describes operational sources. It does not replace them. When a summary and source differ, use the current manifest, task map, catalog, installer, and evaluation files, then update only the affected summaries.

## Dated release evidence

Release records preserve their original dates, package scope, and evidence. Their validation counts are specific to those revisions and environments. Earlier reports are not current command references or proof of behavior in a later host version.

- **3.7:** [Skill coverage, matched comparison, and installation evidence](v3.7-evaluation.md).
- **3.6:** [Git command listing skill](../skills/git-command-listing/SKILL.md) and its source/package evidence in the [skill-system guide](skill-system.md). Native Codex/Claude behavior validation remains pending.
- **3.5:** [Creative UI/UX guidance](v3.5-creative-ui-ux.md). Native Codex/Claude behavior validation remains pending.
- **3.4:** [Agent engineering and comparison evidence](v3.4-agent-engineering.md).
- **3.3:** [Production delivery and package evidence](v3.3-production-delivery.md). Inputs for 204 matched slots are prepared; native Codex and Claude results remain `NOT_RUN`.
- **3.2:** [Delivery and benchmark plan](v3.2-delivery.md). The 3.2 native comparison remains pending in its original release record.
- **3.1:** [Reliability and benchmark evidence](v3.1-reliability.md).
- **3.0:** [Skill-system expansion and observed evidence](skill-system.md).
- **2.8:** [Project-context architecture](v2.8-project-context.md).
- **2.7:** [CLI compatibility candidate](v2.7-cli-compatibility.md).
- **2.6:** [Native-validation candidate](v2.6-native-validation.md) and [validation record](v2.6-validation.md).
- **2.5:** [Behavioral reliability adoption](v2.5-behavioral-reliability.md) and [validation record](v2.5-validation.md).
- **2.4:** [Session continuity](v2.4-session-continuity.md).
- **2.3:** [Context reconciliation](v2.3-context-reconciliation.md).
- **2.2:** [Discovery, debugging, and completion workflows](v2.2-workflows.md) and [validation record](v2.2-validation.md).
- **Original audit:** [v2 audit](v2-audit.md), [upgrade report](v2-upgrade-report.md), [English semantic audit](english-semantic-audit.md), and [Git command snapshot](v2-git-commands.md).

The old DOCX product guides and v2.2 conceptual source specification are absent from the current package. Current policy lives in Markdown and YAML.
