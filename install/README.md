# DevBrain v2.2 Installation

Run from the repository with PowerShell 5.1+ or PowerShell 7 as a regular user. Installation does not require Python, Node.js, or a YAML package.

```powershell
.\install\install-bootstrap.ps1 -WhatIf
.\install\install-bootstrap.ps1
.\install\update-bootstrap.ps1 -WhatIf
.\install\update-bootstrap.ps1
```

The installer runs only when explicitly requested by the user. An agent editing DevBrain does not install it to the real home automatically.

V2.2 adds repository workflows for project discovery, debugging and completion. Existing managed loaders already reference this checkout's baseline and task map, so updating that checkout makes the workflows available without reinstalling skills. Start a new session or explicitly reload DevBrain after updating to refresh active context. A moved/new checkout or changes to bootstrap/skill files still require the appropriate installer/update procedure. See [the v2.2 adoption guide](../docs/v2.2-workflows.md).

For an existing installation, run the updater with `-WhatIf` first, then run it without `-WhatIf` when the targets are correct. With the default `-Tool Both`, Codex and Claude receive the same seven source skill folders. Start a new coding session afterward so each host can discover the new skill names. The new skills have focused purposes: `frontend-performance` measures and improves slow browser behavior; `accessibility-audit` reviews and fixes interface barriers; `testing-strategy` chooses and implements meaningful tests. A review-only request stays read-only, while a fix request includes implementation.

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

Preflight checks source, markers, and linked/reparse paths before writing. Only the seven named DevBrain skills are managed: `enterprise-ui-ux`, `marketing-portfolio-ui-ux`, `design-system-architect`, `architecture-refactor`, `frontend-performance`, `accessibility-audit`, and `testing-strategy`. Adapter templates are the loader source, preventing template/installer drift. Text outside a managed block is preserved exactly; loader backups retain original bytes.

Skills are copied to staging and verified by hash/tree, then the old directory is moved to `devbrain-backups` and staging becomes active. This fixes the v1 nested-copy bug and removes stale discovered references without losing customization: the complete old tree remains in backup. If moving staging fails, the installer attempts to restore the old directory. Backups use a timestamp and unique suffix. An identical update makes no writes and creates no backup.

The installer shows targets through `ShouldProcess`/operation results. It does not change Git, registry, PATH, services, startup, `settings.json`, `config.toml`, `AGENTS.override.md`, or another project. Duplicate/damaged markers and symlinks are rejected rather than guessed or overwritten.

## Limits and recovery

Backup/swap operations are per file/skill, not one transaction for the full installation. If I/O fails partway through, earlier parts may already be updated; inspect operation results and backups, then rerun after resolving the cause.

An old loader that places DevBrain text outside the managed block remains intact. V2 provides a compatibility entry so legacy instructions to `full-context.md` still reach the baseline. Review cleanup of text outside the block separately to avoid deleting personal instructions.

If old skills exist in two discovery locations, the installer does not silently delete either. Select a location explicitly and review duplicates/backups separately.

To roll back, restore a selected loader backup after checking for newer personal instructions, or remove only the managed block. For skills, move the active version into a new backup and restore the selected old directory. Do not empty the whole loader or delete other skill folders.

Test installation, update, alternate clone, simulated username, backup, parity, and `WhatIf` using the [evaluation guide](../evaluation/README.md).

To check an existing installation without running the updater again, compare each managed skill folder's files with the corresponding `skills/<name>/` folder in the repository. The installer uses exact source copies and skips an identical update. Check the Codex and Claude loader files separately: their managed blocks point to the same DevBrain baseline, while personal text outside the blocks is preserved.
