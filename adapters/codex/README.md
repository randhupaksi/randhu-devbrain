# Codex Adapter

Codex membaca global instructions dari `%USERPROFILE%\.codex\AGENTS.md` dan project instructions dari `AGENTS.md` repository. File yang lebih dekat ke working directory dapat memberi aturan yang lebih spesifik.

## Instalasi lintas-device

1. Jalankan `install/install-bootstrap.ps1 -Tool Codex` dari repository DevBrain.
2. Installer mendeteksi `$HOME`, membuat backup, dan menggabungkan managed block ke global `AGENTS.md` tanpa menimpa instruksi lain.
3. Pada project, gunakan `project-templates/AGENTS.template.md` untuk fakta khusus repository.
4. Mulai sesi baru dan minta Codex menyebutkan instruction sources serta DevBrain modules yang aktif.

Jika bootstrap belum ada, Codex boleh melaporkan status dan menawarkan installer. Ia tidak boleh menulis `$HOME\.codex\AGENTS.md` tanpa instruksi atau persetujuan pengguna.

Codex global bootstrap tetap kecil agar project `AGENTS.md` tidak terdorong keluar dari instruction discovery limit. Bootstrap kemudian meminta Codex membaca `runtime/full-context.md` sebagai file eksternal sebelum pekerjaan substansial. Ini memberi full operational understanding tanpa menyalin file 30 KB ke global `AGENTS.md`.
