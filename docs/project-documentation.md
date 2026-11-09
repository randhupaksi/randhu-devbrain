# Project documentation skill

[project-documentation](../skills/project-documentation/SKILL.md) creates and maintains repository Markdown from source evidence. It executes requested documentation work; audit and discussion requests stay read-only. It does not refactor application code or install itself as part of documenting a repository.

## Usage and context

Example request: "Use $project-documentation to document this repository. Inspect current source and existing docs, create only useful guides, and connect instructions, architecture, design, domain behavior, and validation."

For a focused update, name the owner or outcome: "Update the architecture guide after this routing change and repair affected documentation links." A small incidental README correction does not need this skill.

The [task map](../runtime/task-map.md) selects the skill. Its single [expected format](../skills/project-documentation/references/expected-documentation-format.md) combines 15 document roles, detailed content order, navigation relationships, and synthetic output excerpts. Read only the sections relevant to the task. A complete documentation request may need broader source inspection; routine startup does not load this reference.

## Canonical ownership

The [project-context workflow](../workflows/project-context-setup.md) covers the instruction/context subset, and [optional templates](../project-templates/README.md) remain reusable starting points. Existing architecture, design, or API guides may already fulfill PROJECT-* context roles. The skill connects these owners rather than introducing a parallel set.

README or AGENTS leads to the documentation index; the index routes to maintained topics and labels historical records; topics link to actual implementation, checks, and adjacent contracts. Shared facts have one detailed owner. CLAUDE uses the supported delegation/import mechanism; a Markdown link alone is not proof of automatic loading.

## Installation and validation scope

The v2.9 manifest and installer include this eighth skill in the nine-skill payload. Repository maintenance does not install it to a real home. Installer integration uses simulated homes inside ignored `local/` and checks identical source, Codex, and Claude payloads. Its four behavior scenarios remain contracts; the observed Humanize runs do not constitute native evaluation of this documentation skill.

The [evaluation suite](../evaluation/scenarios.yaml) includes documentation creation, audit-only behavior, preservation of historical evidence, and minimal-project selection. These are behavior contracts, not completed live runs. Follow the [evaluation guide](../evaluation/README.md) for actual evidence collection.

## Observed maintenance checks — 2026-11-04

- Repository validation checked YAML/frontmatter/metadata, document file links, portable paths, secret-like candidates, PowerShell parsing, and whitespace. The baseline remains 8,433 characters, 1,125 words, approximately 2,109 tokens.
- Content regressions passed 22 assertions, including rejection of 20 intentional regressions.
- Installer integration passed 37 assertions, including WhatIf, backup/update, relocated source, and full-file source/Codex/Claude parity for eight skills in simulated homes.
- A read-only comparison with the two authorized reference documentation inventories confirmed coverage of all 15 unique Markdown roles. The new skill payload contains neither reference project identity.
- The skill-creator Python quick validator was not run because the available Python executable was an inaccessible app alias. Repository validation provides YAML/frontmatter/metadata checks; it does not prove native behavior.

No live Codex/Claude behavioral run was performed. The four new scenario contracts remain unexecuted; real-home installation is deferred. The expected format is approximately 4,710 tokens if loaded in full; its sections are selected by task. The skill entrypoint is approximately 1,577 tokens when selected. These are character-based estimates, not measured model usage.
