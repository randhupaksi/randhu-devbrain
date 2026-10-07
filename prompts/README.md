# Prompt Compression

Short commands are contracts for intent and routing, not a CLI or hidden oversized prompts. Read their definitions in [`commands.yaml`](commands.yaml), load relevant modules, and follow project context and the risk model.

Commands do not expand authorization. For example, `premium-ui` does not authorize API changes, and `commit-msg` does not authorize a Git commit. The active prompt, project instructions, and risk boundaries still apply.

V2.2 connects `project-scan` to selective project discovery and `safe-fix` to evidence-based debugging. `done-check` performs a read-only completion review. A diagnosis-only prompt overrides the implementation default of `safe-fix`; a request to fix a defect includes correction when evidence and authorization permit it. These names are instruction shorthand, not shell commands.

V2.3 adds `context-check` for a read-only review of materially conflicting or possibly stale sources. An explicit request to repair context authorizes focused supported edits; the command alone does not. Reuse baseline precedence and fact-specific evidence; do not resolve an API/security disagreement by silently changing behavior.
