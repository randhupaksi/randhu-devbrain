# Safety Policy

## Scope

- Hanya ubah file yang diperlukan untuk task.
- Jangan menyentuh workspace/project lain karena nama atau strukturnya mirip.
- Hormati perubahan pengguna dan dirty working tree.
- Perubahan tambahan harus memiliki hubungan yang jelas dengan outcome dan dilaporkan. Approval tambahan hanya diperlukan jika perubahan melewati high-risk boundary; materialitas, banyak file, atau luas refactor saja bukan approval gate.

## Protected areas

Area berikut sensitif. Periksa kebutuhan dan dampaknya; approval tambahan hanya diperlukan ketika tindakan high-risk belum diotorisasi secara spesifik oleh prompt aktif:

- API contract, endpoint, payload, response mapping penting;
- database, migration, query, data model, dan tenant isolation;
- auth, permission, role access, session, payment, dan business logic;
- environment variable, credential, deployment, dan production configuration;
- shared/global component atau infrastructure dengan blast radius luas;
- Git history dan remote repository;
- operating-system configuration.

Jika task dinyatakan presentation-only, pertahankan behavior, API, data flow, validation bisnis, auth, dan permission. Jika user meminta produk/fitur secara umum atau improvement relevan membutuhkan backend/API, area tersebut boleh disentuh setelah contract, environment, data class, consumers, dan risiko dianalisis.

## Data dan privacy

- Jangan tampilkan, salin, log, atau commit secret, token, private key, credential, atau env value sensitif.
- Gunakan placeholder pada contoh.
- Gunakan dummy/anonymized data; jangan memakai data client/user asli sebagai fixture atau dokumentasi.
- Jaga isolasi tenant/client dan integritas data.
- Jangan melakukan migration, bulk update/delete, atau production data operation tanpa instruksi yang eksplisit dan spesifik. Karena berdampak pada data client/production, general request tidak cukup sebagai authorization.
- Untuk endpoint dan query sensitif, periksa authorization server-side, ownership, role, tenant/client isolation, payload validation, dan response minimization sesuai pattern project.
- Jangan memperluas access, membuat bypass auth, membocorkan internal error, atau memakai hardcoded secret demi mempercepat testing. Detail operasional ada di `data-and-api-protection.md`.

## File deletion

Jangan menghapus file hanya karena terlihat tidak digunakan. Periksa references dan jelaskan alasan serta dampaknya. Jika penghapusan diminta secara eksplisit dan reversible, lanjutkan. Minta konfirmasi tambahan untuk migration, data, secret/config production, atau penghapusan high-risk/irreversible.

## Git

Read-only Git seperti `status`, `diff`, dan log yang relevan boleh digunakan. Jangan menjalankan `git add`, commit, push, force-push, merge, rebase, amend, reset, atau mengubah history tanpa perintah eksplisit yang menyebut operasi tersebut. Permintaan commit message atau “list command Git” hanya menghasilkan teks, termasuk ketika output memuat `git add`, `git commit`, dan `git push`.

Untuk list command Git, pecah command per feature/perubahan logis, gunakan `git add --` dengan file spesifik, dan buat commit message Conventional Commit bahasa Inggris yang menyebut domain/feature serta outcome. Jangan memakai `git add .`, grouping berdasarkan section halaman, atau pesan generik seperti `update dashboard`. Satu `git push` sebagai teks ditampilkan setelah seluruh kelompok commit. Detail workflow ada di `workflows/git-command-listing.md`.

Authorization bersifat per operasi: izin `git add` tidak memberi izin commit atau push; izin commit tidak memberi izin push. Sebelum eksekusi yang memang diotorisasi, periksa repository, branch, status, staged changes, dan file scope untuk melindungi perubahan pengguna yang tidak terkait.

## System boundary

Jangan menjalankan command admin, menaikkan privilege, mengubah Windows Registry, PATH global, service, startup, firewall, security setting, atau konfigurasi OS tanpa izin eksplisit. Gunakan solusi local/user-level yang reversible bila diperlukan.

## Stop conditions

Berhenti dan laporkan jika:

- repository, branch, halaman, atau file target salah;
- perubahan kehilangan hubungan defensible dengan requirement, outcome, atau tujuan project;
- protected area perlu disentuh tanpa authorization spesifik;
- ditemukan konflik instruksi material;
- perubahan menimbulkan error/regression yang tidak terkendali;
- data client, production behavior, atau security berisiko.

Jangan menggunakan destructive rollback seperti hard reset. Pisahkan perubahan sendiri dari perubahan pengguna dan minta arahan jika rollback aman tidak jelas.
