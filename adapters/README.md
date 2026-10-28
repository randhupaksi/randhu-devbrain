# Adapters

Adapters connect AI-agnostic context to each tool's instruction discovery. Both use the same baseline, task routing, and Markdown skills; loader/discovery locations differ.

Codex and Claude templates are intentionally identical. The installer reads the template directly, injects the local root, and changes only the managed block. Adapter policy never overrides the active user prompt or project instructions.

The two hosts still have different instruction discovery, skill catalogs, and session modes. Codex's AGENTS chain and Claude's CLAUDE/AGENTS selection must be checked in the host itself; shared template text does not establish runtime parity. Use the selective [CLI compatibility workflow](../workflows/cli-compatibility.md) and [v2.7 host matrix](../evaluation/cli-host-matrix.yaml) for those checks.

V2.2's discovery, debugging and completion procedures are repository modules reached through the task map, not additional installed skills. Both adapters use the same updated modules when their loader points to this checkout. Refresh active session context after an update; native-host behavior still needs independent evaluation.

See [Codex](codex/README.md), [Claude](claude-code/README.md), and the [installer](../install/README.md). A user home is touched only when the user runs or explicitly requests the installer.
