# Claude Code Adapter

The loader lives at `UserHome/.claude/CLAUDE.md`; skills live under `.claude/skills`. The installer uses the same Markdown skills as Codex. `agents/openai.yaml` metadata is preserved as an inert file for hosts that do not use it. See the [official skills documentation](https://code.claude.com/docs/en/skills).

The v2 bootstrap explicitly instructs the host to read the baseline path, like Codex, instead of eagerly importing a monolith. This reduces loader-content differences and avoids import-path escaping. Reading still depends on host file access; if access is denied, report that boundary and request specific read permission.

Project `CLAUDE.md` can import `AGENTS.md` as a single source of truth. Native `AGENTS.md` discovery depends on version and the Project instructions setting; in the default mode, the presence of project `CLAUDE.md` files can select the CLAUDE family instead. Verify the effective source in the live session. See the [official memory documentation](https://code.claude.com/docs/en/memory). Do not change global memory configuration to force parity.

After installation, start a new session and inspect the active memory/instruction sources and one relevant skill. Project templates are not copied to other projects automatically.

For Codex/Claude CLI session-mode, skill-disclosure, auto-memory, and permission checks, use the [v2.7 CLI compatibility matrix](../../evaluation/cli-host-matrix.yaml). A simulated Claude install is not a live Claude behavior result.
