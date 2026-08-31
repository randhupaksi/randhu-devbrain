# Bootstrap Installation

Installed target files on the active device:

- Codex: `<USER_HOME>\.codex\AGENTS.md`
- Claude Code: `<USER_HOME>\.claude\CLAUDE.md`

## Device-portable installation

The canonical repository can be cloned to any Windows device. From the repository root, run:

```powershell
.\install\install-bootstrap.ps1
```

Use `-Tool Codex` or `-Tool Claude` for a single adapter and `-WhatIf` to preview. The installer derives paths from the active repository and `$HOME`; it does not assume Randhu's current username. It backs up existing loaders and preserves content outside the managed block. After pulling a DevBrain update, run `install\update-bootstrap.ps1`.

README and AI instructions may explain or offer this process, but they must not silently modify global configuration. No administrator permission is required.

## Stability profile

Bootstrap hanya menggunakan Markdown. Tidak ada service, daemon, scheduled task, hook, executable, registry edit, PATH change, admin permission, atau background process.

Codex menerima loader kecil melalui global `AGENTS.md`, lalu membaca `runtime/full-context.md` sebelum pekerjaan substansial. Claude Code global `CLAUDE.md` mengimpor `runtime/full-context.md` secara langsung. Tidak ada program atau background process.

## Original state on 2026-07-01

- Codex global `AGENTS.md`: existed and empty (0 bytes).
- Codex `AGENTS.override.md`: did not exist.
- Claude global `CLAUDE.md`: did not exist.

Tidak ada content pengguna yang ditimpa.

## Verification

Mulai sesi baru dari repository dan minta AI menjelaskan full operational DevBrain rules serta project instructions yang aktif. Claude Code dapat meminta approval sekali untuk external import dari Documents.

## Rollback

Untuk menonaktifkan tanpa menghapus DevBrain:

- Kosongkan atau hapus DevBrain content dari Codex global `AGENTS.md`.
- Hapus Claude global `CLAUDE.md` yang hanya berisi import DevBrain.

Restart/new session diperlukan agar instruction chain dibangun ulang.
