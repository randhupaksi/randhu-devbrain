# Claude Code Adapter

Claude Code mendukung user instructions di `%USERPROFILE%\.claude\CLAUDE.md` dan project instructions di `CLAUDE.md`. Claude Code dapat mengimpor file lain dengan syntax `@path`; external imports dapat meminta approval pada penggunaan pertama.

## Instalasi lintas-device

1. Jalankan `install/install-bootstrap.ps1 -Tool Claude` dari repository DevBrain.
2. Installer mendeteksi `$HOME`, membuat backup, dan menggabungkan managed block ke global `CLAUDE.md` tanpa menimpa instruksi lain.
3. Approve external DevBrain import saat Claude Code meminta konfirmasi.
4. Pada repository yang memakai `AGENTS.md`, buat project `CLAUDE.md` yang mengimpor `@AGENTS.md` lalu tambahkan hanya kebutuhan Claude-specific.
5. Gunakan `/memory` untuk memeriksa file yang dimuat.

Jika bootstrap belum ada, Claude Code boleh melaporkan status dan menawarkan installer. Ia tidak boleh menulis `$HOME\.claude\CLAUDE.md` tanpa instruksi atau persetujuan pengguna.

Claude mengimpor full operational context pada setiap sesi baru. Source DOCX, adapter docs, templates, changelog, dan maintenance docs tetap tidak dimuat.
