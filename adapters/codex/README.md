# Codex Adapter

The default loader is `UserHome/.codex/AGENTS.md`. The installer also accepts `CodexHome`; when `UserHome` is not overridden, it uses configured `CODEX_HOME` if present. No DevBrain-specific environment variable is required.

The bootstrap requests a one-time read of `session-baseline.md`, followed by selective modules. Project/scoped `AGENTS.md` files are still read. `AGENTS.override.md` may affect discovery; the installer does not change it. After installation, start a new session and inspect the instruction sources actually loaded. See the [official instruction-discovery documentation](https://learn.chatgpt.com/docs/agent-configuration/agents-md).

New skill installs use `UserHome/.agents/skills` according to the [official skill locations](https://learn.chatgpt.com/docs/build-skills). For legacy DevBrain installs with custom skills under `CodexHome/skills`, the updater preserves that location rather than creating a second discovery copy. `CodexSkillsPath` can specify a location when the host differs. The legacy location was verified in this audit; support is not guaranteed for every host version.

The installer does not disable other skills or edit `config.toml`. If both discovery locations already contain the custom skills, review duplicates separately; do not silently remove user instructions or skills.
