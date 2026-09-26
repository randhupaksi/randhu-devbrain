# Adapters

Adapters connect AI-agnostic context to each tool's instruction discovery. Both use the same baseline, task routing, and Markdown skills; loader/discovery locations differ.

Codex and Claude templates are intentionally identical. The installer reads the template directly, injects the local root, and changes only the managed block. Adapter policy never overrides the active user prompt or project instructions.

See [Codex](codex/README.md), [Claude](claude-code/README.md), and the [installer](../install/README.md). A user home is touched only when the user runs or explicitly requests the installer.
