# DevBrain bootstrap installer

Installer ini dipakai satu kali pada setiap device untuk menghubungkan repository DevBrain dengan Codex dan/atau Claude Code. Installer bersifat Windows/PowerShell-native, mendeteksi `$HOME` device aktif, membuat backup loader dan skill yang sudah ada, memasang skill custom dari `skills/`, dan hanya mengelola blok bertanda `DEVBRAIN-BOOTSTRAP`.

## Instalasi device baru

Setelah repository berada di device tersebut, jalankan dari folder repository:

```powershell
.\install\install-bootstrap.ps1
```

Perintah tersebut memasang bootstrap dan skill custom DevBrain ke kedua agent secara default. Gunakan `-SkipSkills` jika hanya ingin memperbarui bootstrap:

```powershell
.\install\install-bootstrap.ps1 -SkipSkills
```

Pilih satu tool bila perlu:

```powershell
.\install\install-bootstrap.ps1 -Tool Codex
.\install\install-bootstrap.ps1 -Tool Claude
```

Gunakan `-WhatIf` untuk preview tanpa menulis file. Installer tidak membutuhkan hak administrator, tidak mengubah registry, dan tidak menjalankan Git add/commit/push.

Skill disalin dari `DevBrain\skills\` ke `$HOME\.codex\skills\` dan `$HOME\.claude\skills\`. Folder source tidak dimuat otomatis oleh runtime; skill hanya dibaca saat task relevan atau dipanggil secara eksplisit. Backup skill lama disimpan di folder `devbrain-backups` agar tidak muncul sebagai skill aktif.

## Update

Setelah `git pull` pada repository DevBrain, jalankan:

```powershell
.\install\update-bootstrap.ps1
```

Update hanya mengganti managed block milik DevBrain. Instruksi pribadi di luar block dipertahankan. Jika loader sebelumnya ada, backup bertimestamp dibuat sebelum perubahan.

## Batas keamanan

README atau instruksi repository tidak boleh diam-diam mengubah `$HOME\.codex\AGENTS.md` atau `$HOME\.claude\CLAUDE.md`. AI boleh mendeteksi bootstrap belum ada dan menawarkan installer, tetapi eksekusi instalasi harus diminta atau disetujui pengguna karena dampaknya global untuk semua project pada device tersebut.

## Device portability

Jangan hardcode username atau path device ke template. Installer mengisi path runtime berdasarkan lokasi repository dan `$HOME` device aktif. Untuk repository private, pastikan autentikasi GitHub sudah tersedia sebelum melakukan clone atau pull.
