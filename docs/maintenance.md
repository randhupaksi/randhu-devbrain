# Maintenance and Evolution

The generalized v2 DOCX is a conceptual reference; Markdown/YAML files are the operational source. The latest explicit prompt overrides earlier preferences. Revise the DOCX only for an explicit source-document update, and do not copy it wholesale into runtime. The original v0.1 revision remains in earlier Git history.

1. Classify feedback as global principle, safety, workflow, skill, adapter, or project fact.
2. Audit existing instructions and working-tree state; find the canonical owner.
3. When an audit is requested, report findings before implementation. An update request authorizes relevant low/medium-risk changes; seek confirmation only for an unapproved high-risk boundary.
4. Update the owner, routing, and affected callers. Do not merge all core content into runtime.
5. Run content/frontmatter/link/path validation, the PowerShell parser, installer fixtures when relevant, and a diff review.
6. Update evaluation scenarios when behavior changes; valid YAML alone does not prove behavior.
7. Record meaningful changes in the changelog. Preserve provenance and explain when a current source document supersedes an earlier one.
8. Run the updater against a real home only when the user requests that installation. Repository maintenance does not authorize global configuration changes.

Review after repeated interpretation failures, scope drift, generic-feeling UI, excessive approval requests, or boundaries that are too permissive. Avoid adding a universal rule for a project-specific incident.
