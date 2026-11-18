# Maintenance and Evolution

DevBrain's maintained operating rules live in Markdown and YAML. The active project's instructions and latest user request outrank DevBrain preferences, subject to platform rules and safety. This repository is a personal developer knowledge layer; changes should improve reusable agent behavior without embedding one project's private facts.

## Change workflow

1. Classify the request as a principle, safety rule, workflow, skill, adapter, documentation, evaluation contract, or project-specific fact.
2. Inspect the worktree and identify the canonical owner before editing. Preserve unrelated user changes.
3. Audit requests are read-only. An explicit maintenance request authorizes relevant low- and medium-risk updates; ask only at an unapproved high-risk boundary.
4. Update the canonical owner, selective routing, affected callers, and current documentation together. Keep the session baseline concise.
5. Change evaluation contracts when behavior changes. Add scenarios for supported gaps or observed failures, not to inflate coverage.
6. Run repository content validation for Markdown/YAML/link or routing changes. Run installer fixtures only when packaging or install behavior changes; all fixture writes stay under ignored `local/`.
7. Review the final diff, record meaningful changes in the changelog, and label observed results with their date and scope.
8. Preserve completed release reports as historical evidence. Update current guides when their procedure changes; do not rewrite an old result as though it were rerun.
9. Run an installer against a real user profile only when specifically requested. Repository maintenance never implies a real-host update.

## Ownership and evidence

Use the [module ownership map](module-ownership.md), [documentation index](README.md), and [architecture guide](architecture.md) to locate current sources. Project facts belong in the project context, not global DevBrain policy. A collaborator skill should activate only when its distinct decision or artifact is needed.

The [evaluation guide](../evaluation/README.md) separates structural checks, installer integration, behavior contracts, native host observations, and benchmark comparisons. Parsers and fixture checks prove only their stated package contracts. A live host result needs fresh, reviewable evidence; a blocked prerequisite is not a model result. Keep evaluator expectations outside tested prompts and avoid claims broader than the observed scope.

The current CLI workflow and [host matrix](../evaluation/cli-host-matrix.yaml) describe compatibility checks. Older reports record earlier Codex/Claude versions and decisions; use them as dated evidence, not as current compatibility claims. Likewise, earlier smoke/result schemas keep their original meaning; prepare a fresh batch for current observations.

## Documentation hygiene

Keep one detailed owner for each fact. Link current docs to that owner, mark historical reports clearly, and remove obsolete guides when no supported workflow depends on them. Do not keep an outdated DOCX as a parallel policy source; Markdown/YAML is canonical. Preserve old evidence when it explains a decision, but do not let it appear as current setup guidance.
