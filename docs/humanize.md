# Humanize: Defaults and Deep Editing

DevBrain v2.9 introduces original guidance for natural responses, generated prose, and UI text, plus a ninth portable skill for deeper editorial work. It uses the existing host model. The feature has no third-party humanizer package, remote service, model download, or training step. Existing maintenance tooling still has its documented prerequisites.

## Ownership and activation

| Owner | Responsibility |
|---|---|
| [Session baseline](../runtime/session-baseline.md) | Concise default for every response, writing task, and UI text task |
| [AI collaboration](../core/ai-collaboration.md) | Context, tone, precision, and communication decisions when deeper guidance is needed |
| [UI principles](../core/ui-ux-principles.md) and [UI workflow](../workflows/ui-task.md) | Useful language grounded in the real product states/actions |
| [Task map](../runtime/task-map.md) | Select the focused skill for dedicated or substantial humanization |
| [Humanize skill](../skills/humanize/SKILL.md) | Writing, rewriting, audits, voice matching, and deeper UI copy editing |

Routine responses, copy generation, and normal UI/document work use the defaults without loading another skill. The skill can be selected for an explicit humanize request, deep editorial pass, voice matching, or a substantial task whose main outcome is prose/copy quality. Its description does not request activation on every response. Project language, brand voice, domain terminology, and the latest user instruction remain authoritative within existing safety boundaries.

The existing UI and documentation skills carry their normal prose responsibility independently. Humanize does not require them, and they remain portable without Humanize. A mixed task may use a UI skill for layout and Humanize for a separate deep editorial subtask.

## Use

After an authorized installation and new host session, ask in ordinary language:

- 'Humanize this draft. Keep the facts and uncertainty intact; return only the revised text.'
- 'Audit this copy for clarity and natural tone. Do not edit files.'
- 'Rewrite these messages in the project's existing Indonesian voice. Preserve placeholders.'
- 'Write this announcement from the supplied facts, using this sample as a voice reference.'
- 'Humanize the empty, validation, and error states in this form. Follow the existing behavior and localization setup.'

Hosts may also expose `$humanize` in Codex and `/humanize` in Claude Code. These are host skill invocations; DevBrain does not add a standalone executable or implement a flag parser. Skill discovery is host-dependent and must be observed before claiming live activation.

Write mode starts from facts and purpose. Rewrite mode preserves the existing voice unless another is requested. Audit mode reports actionable findings without mutation. The skill adapts editing depth to the request; it does not impose an audit table, score, multiple alternatives, or a before/after report on every run. Voice samples remain in the current task unless saving a profile is requested.

## Meaning and interface integrity

Natural tone can be formal or technical. A style pattern is a prompt for editorial judgment, not evidence of authorship. Keep accurate facts, qualifications, consent, consequences, citations, and required technical repetition. No fake anecdotes, deliberate errors, human-percentage scores, or detector-evasion promises are part of this feature.

UI copy must reflect the actual action/state and supported next steps. 'Queued', 'saved', 'sent', and 'completed' are distinct. Preserve localization keys, placeholders, plural forms, accessible names, and required wording. Do not invent retry buttons, email delivery, access rights, free plans, or reversibility. File edits remain within the requested scope; publishing and sending require their existing authorization.

The skill's references contain original editorial examples, language/voice guidance, and a UI text guide. They are read selectively. There is no blanket word blacklist or punctuation ban, and no regex score presented as proof of writing quality.

## Installation and verification

The manifest and existing installer now manage nine source skill folders. Follow the [installation guide](../install/README.md) for an explicitly requested installation/update. Maintenance checks use simulated homes inside ignored local/. Editing repository content does not install the new skill into a real host profile. Existing loaders read the default from this checkout after context reload or a new session.

[Behavioral scenarios](../evaluation/scenarios.yaml) cover default responses, default prose/UI copy without skill loading, deep rewrite fidelity, audit scope, voice samples, and localization integrity. The [humanize evaluation guide](../evaluation/humanize-guide.md) records the observed synthetic Codex/Claude runs and their limits. Content checks, skill metadata validation, and installer fixtures establish repository contracts and packaged payloads. They do not prove universal host parity or consistent results on every prompt. Other behavioral cases remain unrun until evaluated.

### Maintenance evidence, 2026-11-09

Repository content validation passed 2,767 checks, including skill frontmatter/metadata, local links, YAML, PowerShell syntax, and diff whitespace checks. Installer integration passed 39 assertions with simulated homes under `local/`, including the ninth skill payload. Content regressions passed 22 assertions, rejecting twenty intentional regressions.

Native synthetic behavior was observed on Codex CLI 0.167.0 and Claude Code 2.1.319. The final full matrix covered scenarios 64–71 on both hosts; a final two-host recheck of scenario 65 made its uncertainty-preservation requirement explicit. Requested model identifiers were `gpt-5.6-sol` and `claude-sonnet-5`; the CLI-reported backend identity was not independently verified. Output review found concise defaults, preserved technical claims and ICU structure, neutral missing-fact placeholders, scoped voice matching, and unchanged effective formal copy. Earlier runs exposed instruction and harness weaknesses that were corrected before the final matrix.

The full results are retained in ignored `local/humanize-native-2026-11-09T14-10-52-518Z/`; the release-note recheck is in `local/humanize-native-2026-11-09T14-13-11-939Z/`. Runs used isolated synthetic projects with read-only tools. No real Codex/Claude profile was installed or changed, and no third-party humanizer was installed. These are observed synthetic outcomes, not a blind before/after comparison, a guarantee of repeated consistency, or proof of universal host parity or a general writing-quality improvement.
