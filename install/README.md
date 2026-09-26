# DevBrain v2 Installer

Run from the repository with PowerShell 5.1+ or PowerShell 7 as a regular user. Installation does not require Python, Node.js, or a YAML package.

```powershell
.\install\install-bootstrap.ps1 -WhatIf
.\install\install-bootstrap.ps1
.\install\update-bootstrap.ps1 -WhatIf
.\install\update-bootstrap.ps1
```

The installer runs only when explicitly requested by the user. An agent editing DevBrain does not install it to the real home automatically.

## Parameters and targets

- `DevBrainRoot`: defaults to the parent of `PSScriptRoot`.
- `UserHome`: defaults to `HOME`; can point to a test fixture home.
- `Tool`: Codex, Claude, or Both (default).
- `SkipSkills`: install/update only the bootstrap; also supported by the updater.
- `CodexHome`: explicit Codex profile; defaults to configured `CODEX_HOME` when present and `UserHome` is not overridden, otherwise `UserHome/.codex`.
- `CodexSkillsPath`: explicit skill location. New installs default to `UserHome/.agents/skills`; an existing DevBrain legacy install under `CodexHome/skills` is updated there.
- `WhatIf`/`Confirm`: PowerShell `ShouldProcess` for each change; `WhatIf` creates no folders or backups.

Claude loaders/skills use `UserHome/.claude`. Concrete paths appear only in local installed output, not repository source. Account name, drive, and clone location are unrestricted; no DevBrain-specific environment variable is required.

## Update guarantees

Preflight checks source, markers, and linked/reparse paths before writing. Only the four named DevBrain skills are managed. Adapter templates are the loader source, preventing template/installer drift. Text outside a managed block is preserved exactly; loader backups retain original bytes.

Skills are copied to staging and verified by hash/tree, then the old directory is moved to `devbrain-backups` and staging becomes active. This fixes the v1 nested-copy bug and removes stale discovered references without losing customization: the complete old tree remains in backup. If moving staging fails, the installer attempts to restore the old directory. Backups use a timestamp and unique suffix. An identical update makes no writes and creates no backup.

The installer shows targets through `ShouldProcess`/operation results. It does not change Git, registry, PATH, services, startup, `settings.json`, `config.toml`, `AGENTS.override.md`, or another project. Duplicate/damaged markers and symlinks are rejected rather than guessed or overwritten.

## Limits and recovery

Backup/swap operations are per file/skill, not one transaction for the full installation. If I/O fails partway through, earlier parts may already be updated; inspect operation results and backups, then rerun after resolving the cause.

An old loader that places DevBrain text outside the managed block remains intact. V2 provides a compatibility entry so legacy instructions to `full-context.md` still reach the baseline. Review cleanup of text outside the block separately to avoid deleting personal instructions.

If old skills exist in two discovery locations, the installer does not silently delete either. Select a location explicitly and review duplicates/backups separately.

To roll back, restore a selected loader backup after checking for newer personal instructions, or remove only the managed block. For skills, move the active version into a new backup and restore the selected old directory. Do not empty the whole loader or delete other skill folders.

Test installation, update, alternate clone, simulated username, backup, parity, and `WhatIf` using the [evaluation guide](../evaluation/README.md).
