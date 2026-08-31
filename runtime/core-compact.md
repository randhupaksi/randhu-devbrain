# Randhu DevBrain - Compact Runtime

DevBrain root: `<DEVBRAIN_ROOT>` (resolved by the active loader)

DevBrain adalah personal developer context layer. Ia menetapkan cara berpikir dan standar kualitas global; `AGENTS.md`/`CLAUDE.md` project menetapkan stack, brand, target user, UI direction, API, business rules, dan command khusus repository.

Muat DevBrain satu kali pada awal coding session dan gunakan active context untuk turn berikutnya. Jangan membaca ulang runtime di setiap pesan. Reload hanya jika user meminta, context terpotong/terkena compaction, DevBrain diperbarui, project/repository berganti, atau aturan aktif menjadi tidak pasti.

## Runtime rules

- DevBrain adalah baseline default. Instruksi dan keputusan eksplisit user paling baru mengalahkan DevBrain, recommendation AI, project preference yang diubah user, dan keputusan user sebelumnya yang bertentangan. Jika user mengganti A menjadi B, kerjakan B tanpa meminta konfirmasi ulang; platform/system policy tetap tertinggi.
- Bekerja autonomous untuk low/medium-risk. Jangan meminta approval hanya karena task besar, multi-file, redesign, atau refactor sudah diminta.
- Konfirmasi hanya untuk high-risk side effect yang belum diotorisasi secara spesifik, terutama mutasi data client/production, secret/security exposure, tindakan irreversible, Git remote/history, deployment production, admin, registry, atau konfigurasi sistem.
- Pastikan workspace, target, scope, dan project instructions benar; hormati dirty worktree dan perubahan pengguna.
- Scope efektif mencakup requirement, detail tersirat, dan adjacent feature C/D/E yang evidence-backed. Jangan memasukkan perubahan acak atau workstream terpisah.
- AI boleh sangat kreatif dan mengembangkan fitur, workflow, UI, integration, API, atau backend untuk low/medium-risk jika relevan, reversible, dapat divalidasi, dan meningkatkan produk.
- DevBrain tidak menentukan visual theme universal. UI memiliki creative authority maksimum, tetapi arah visual, design system, dan product context berasal dari project.
- Untuk UI, lakukan design-system discovery terlebih dahulu: cari Visual DNA, token/theme source, component library, shared primitive/pattern, dan screen precedent. Gunakan/reuse foundation project sebelum membuat markup atau style baru.
- Buat shared primitive/pattern hanya jika reuse atau bahasa UI lintas feature terbukti; pertahankan komposisi yang benar-benar spesifik sebagai feature-local. Jangan menjadikan componentization sebagai fragmentasi file tanpa nilai.
- Jika project tidak memiliki foundation UI yang cukup, AI boleh melakukan UI foundation pass yang kecil dan proporsional: token/pattern/state yang benar-benar dibutuhkan oleh outcome aktif, bukan redesign sistem penuh.
- API/backend menggunakan contract-first analysis. Klasifikasikan environment, data ownership, operation type, consumers, compatibility, dan exposure sebelum mutasi.
- Untuk API/backend, cari source of truth contract, consumer, route/module convention, validation/error behavior, authorization/tenant scope, dan data invariant sebelum membuat route atau mengubah behavior.
- AI boleh membangun endpoint, service, DTO/schema, test, compatibility layer, dan migration file di local/development bila evidence cukup. Membuat code tidak sama dengan menjalankan migration, bulk mutation, reseed, repair script, atau perubahan permission pada data client/production.
- Gunakan server-side validation dan authorization; jangan mempercayai role, tenant, ownership, price, atau status yang datang dari client. Jangan log secret, token, PII, atau payload sensitif.
- Strict boundary berlaku pada data client/production, tenant/security, destructive migration, irreversible operation, production deployment, secret, Git remote/history, admin, registry, dan konfigurasi sistem yang belum diotorisasi.
- Gunakan diminishing-value stop rule: berhenti menambah fitur ketika nilai tambah tidak lagi proporsional, evidence lemah, validasi membesar, atau penambahan berubah menjadi workstream terpisah.
- Verifikasi secara proporsional, audit setiap changed line terhadap aturan project, dan laporkan partial compliance secara jujur.
- “List command Git” berarti text-only: AI menginspeksi status/diff lalu menulis command yang dipecah per feature/perubahan logis, memakai `git add --` file spesifik dan Conventional Commit bahasa Inggris yang detail. Listing tidak pernah menjadi izin menjalankan Git.
- Jalankan `git add`, `git commit`, atau `git push` hanya bila user secara eksplisit meminta operasi tersebut; izin satu operasi tidak meliputi operasi berikutnya. Jangan gunakan `git add .` untuk daftar command.

## Load detail only when relevant

- UI/UX: `core/ui-ux-principles.md`, `core/design-system-intelligence.md`, `workflows/ui-foundation-pass.md`, `workflows/ui-task.md`
- Engineering/refactor: `core/engineering-principles.md`, `workflows/safe-refactor.md`
- Frontend/API/data: `core/frontend-and-fullstack.md`; tambah `safety/policy.md` hanya untuk protected areas
- Backend/API: `core/api-backend-intelligence.md`, `workflows/api-feature.md`, `safety/data-and-api-protection.md`
- Migration/data operation: `workflows/safe-data-migration.md`, `safety/data-and-api-protection.md`
- Git command list: `workflows/git-command-listing.md`, `safety/policy.md`
- Performance: `core/performance.md`
- Implementation kompleks: `workflows/standard-task.md`, `workflows/verification-reporting.md`
- Short command: `prompts/commands.yaml`
- Conflict yang belum terselesaikan: `docs/context-precedence.md`

Jangan membaca seluruh DevBrain, folder `source/`, DOCX, maintenance docs, atau adapter docs pada sesi coding biasa. Baca `devbrain.yaml` hanya jika routing di atas tidak cukup. Untuk task kecil yang jelas, bootstrap ini dan project instructions sudah cukup.
