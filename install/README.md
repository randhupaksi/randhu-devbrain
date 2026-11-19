# DevBrain Installation

Run the source installer from this repository with PowerShell 5.1+ or PowerShell 7 as a regular user. It requires no Python, Node.js, or YAML package.

```powershell
.\install\install-bootstrap.ps1 -WhatIf
.\install\install-bootstrap.ps1
.\install\update-bootstrap.ps1 -WhatIf
.\install\update-bootstrap.ps1
```

Installation only runs when explicitly requested. An agent maintaining the repository does not install to a real home automatically. The installer reads the current checkout; see the [3.3 production delivery guide](../docs/v3.3-production-delivery.md) for package scope and validation limits.

## Install and update

Preview with `-WhatIf`, inspect the targets, then run the command without `-WhatIf` to apply it. For an existing installation, use the updater. The default `-Tool Both` writes the Codex and Claude Code integrations and copies all 36 managed skills. Start a fresh session afterward so each host can discover the updated loader and skill payload.

An existing loader points to this checkout and reads revised runtime guidance in a fresh session. Updating the installed skill payload is necessary when skills are added, removed, or changed. A checkout moved to a different location also requires updating the loader.

## Parameters and targets

- `DevBrainRoot`: defaults to the parent of `PSScriptRoot`.
- `UserHome`: defaults to `HOME`; may point to a test fixture home.
- `Tool`: `Codex`, `Claude`, or `Both` (default).
- `SkipSkills`: install/update only the bootstrap.
- `CodexHome`: explicit Codex profile; defaults to configured `CODEX_HOME` when present and `UserHome` is not overridden, otherwise `UserHome/.codex`.
- `CodexSkillsPath`: explicit skill location. New installs default to `UserHome/.agents/skills`; an existing DevBrain legacy install under `CodexHome/skills` is updated there.
- `WhatIf` and `Confirm`: PowerShell `ShouldProcess` behavior for each change. `WhatIf` creates no folders or backups.

Claude Code loaders and skills use `UserHome/.claude`. Concrete machine paths belong only in local installed output, not repository source.

## Update guarantees

Preflight checks source files, managed markers, and linked/reparse paths before writing. The manifest and skill catalog identify the 36 managed skill folders. Adapter templates are the loader source, reducing template/installer drift. Text outside a managed block is preserved; loader backups retain original bytes.

Skills are copied to staging and verified by hash/tree. The previous skill directory is backed up before staging becomes active. If activating staging fails, the installer attempts to restore the prior directory. An identical update makes no writes and creates no backup.

The installer does not change Git, registry, PATH, services, startup configuration, Codex `settings.json`, Claude configuration, `AGENTS.override.md`, or another project. Damaged or duplicate managed markers and symlinks are rejected rather than guessed or overwritten.

## Limits and recovery

Backup/swap operations are per file or skill, not one transaction for the entire installation. If I/O fails partway through, earlier components may already be updated. Inspect operation results and backups, then rerun after resolving the cause.

If old skills exist in two discovery locations, the installer does not silently delete either. Choose the intended location and review duplicates/backups separately. To roll back, restore a selected loader backup after checking for newer personal instructions, or remove only the managed block. For skills, move the active version into a new backup and restore the selected old directory. Do not delete unrelated skill folders.

Repository installer tests use simulated homes under ignored `local/`; they do not write to real host profiles. See the [evaluation guide](../evaluation/README.md). Successful copying proves file layout and integrity, not native host discovery or model behavior. The [CLI compatibility matrix](../evaluation/cli-host-matrix.yaml) tracks those observations separately.
