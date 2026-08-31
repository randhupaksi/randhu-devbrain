# Changelog

## 2026-08-31 — Cross-device Bootstrap Foundation

- Tambah installer dan updater PowerShell yang portable untuk menghubungkan DevBrain ke Codex dan Claude pada device baru.
- Installer mendeteksi repository root dan `$HOME`, membuat backup, serta mempertahankan instruksi di luar managed block.
- Dokumentasikan `-Tool`, `-WhatIf`, update workflow, dan batas bahwa konfigurasi global tidak boleh diubah diam-diam.
- Selaraskan README, manifest, runtime, arsitektur, dan adapter documentation.

## 2026-08-27 — Session Context Lifecycle

- Menetapkan DevBrain runtime dimuat sekali pada awal coding session dan dipakai sebagai active context pada turn berikutnya.
- Menambahkan reload trigger: permintaan eksplisit, context compaction/material loss, update DevBrain, perpindahan project/repository, atau aturan aktif tidak pasti.
- Menyelaraskan bootstrap Codex dan Claude agar tidak membaca ulang runtime setiap pesan.

## 2026-08-27 — Feature-Based Git Command Listing

- Tambah workflow `git-command-listing.md` untuk output Git text-only yang dipecah per feature/perubahan logis.
- Menetapkan `git add --` dengan path spesifik, Conventional Commit bahasa Inggris yang menyebut domain/outcome, dan satu `git push` teks di akhir listing.
- Menegaskan bahwa “list command Git” bukan izin menjalankan add/commit/push dan authorization Git berlaku per operasi.

## 2026-08-27 — Backend & API Intelligence Upgrade

- Tambah `core/api-backend-intelligence.md` untuk contract discovery, consumer compatibility, architecture, validation/error, authorization, integrity data, resilience, observability, dan testing.
- Tambah `safety/data-and-api-protection.md` untuk secret/PII, server-side authorization, tenant isolation, mutation, migration, dan secure implementation boundary.
- Tambah workflow `api-feature.md` dan `safe-data-migration.md` agar coding, migration preparation, dan eksekusi data berisiko tidak tercampur.
- Tambah template `PROJECT-API-CONTRACT.template.md` serta perluas project template API/backend.
- Tambah compressed commands `api-feature`, `backend-module`, `contract-impact-check`, `api-hardening`, `data-safety-audit`, `migration-plan`, dan `integration-test`.

## 2026-08-27 — Frontend Intelligence Upgrade

- Tambah `core/design-system-intelligence.md` untuk Visual DNA, design-system discovery, token discipline, component architecture, dependency policy, dan frontend quality gate.
- Tambah `workflows/ui-foundation-pass.md` agar AI tahu kapan harus reuse, extend, create, atau menjaga UI tetap feature-local.
- Tambah template `PROJECT-VISUAL-DNA.template.md` dan perluas project template untuk menyimpan identitas serta source of truth UI per project.
- Tambah compressed commands `design-system-scan`, `visual-dna-init`, `ui-foundation`, `componentize-ui`, dan `premium-feature-ui`.
- Perjelas bahwa solusi harus lengkap, matang, dan proporsional; bukan sekadar diff minimal ataupun redesign sistem tanpa kebutuhan.

## 2026-07-02 - latest user decision authority

- Menetapkan DevBrain sebagai baseline default, bukan aturan yang mengalahkan keputusan user aktif.
- Menegaskan bahwa keputusan user terbaru menggantikan default DevBrain, rekomendasi AI, preference project yang diubah, dan keputusan user sebelumnya yang bertentangan.
- Menambahkan contoh A ke B serta larangan meminta konfirmasi ulang hanya karena user berubah keputusan.
- Memperjelas bahwa override berlaku pada pilihan yang berubah; context project lain tetap digunakan.
- Menghapus wording lama yang membatasi kreativitas pada perubahan tanpa behavior/API.
- Mengubah ambiguity redesign low/medium-risk menjadi evidence-first assumption, bukan approval gate.

## 2026-07-02 - policy consolidation and operational status

- Menghapus konflik antara presentation-only UI dan proactive API/backend expansion.
- Mendefinisikan scope efektif sebagai requirement plus adjacent expansion yang evidence-backed.
- Menambahkan diminishing-value stop rule untuk mencegah feature bloat.
- Menambahkan environment/data gate untuk membedakan local dummy data dari client/production data.
- Memperbarui safe-fix menjadi smallest complete solution.
- Menetapkan Markdown/YAML sebagai canonical operational source dan DOCX v0.1 sebagai historical foundation.
- Mengubah manifest dari foundation menjadi operational.
- Menyelaraskan compact fallback, evaluation scenarios, source mapping, dan bootstrap documentation.

## 2026-07-02 - expansive creativity with client-data boundary

- Mengizinkan AI mengembangkan requirement A/B/C sampai D/E bila relevan dan meningkatkan produk.
- Mengizinkan proactive product, workflow, integration, API, dan backend improvement untuk low/medium-risk.
- Mengubah API caution dari larangan menjadi contract-first analysis dan compatibility discipline.
- Memusatkan strict approval boundary pada data client/production, tenant/security, destructive migration, dan high-risk impact lain.
- Tetap melarang fitur acak, perubahan business rule diam-diam, dan penambahan tanpa hubungan defensible dengan project.

## 2026-07-02 - maximum UI creativity and API boundary

- Menaikkan creative authority UI/UX menjadi maksimum selama tetap mengikuti konteks dan design system project.
- Mengizinkan restrukturisasi layout/composition serta supporting UI tanpa instruksi mikro satu per satu.
- Memisahkan kebebasan presentation layer dari perubahan API contract dan data semantics.
- Menambahkan API caution protocol berbasis contract, consumers, compatibility, side effect, dan validation.
- Menegaskan bahwa integration fix low/medium-risk tetap autonomous; approval hanya untuk high-risk impact yang belum diotorisasi.

## 2026-07-02 - high-autonomy quality update

- Menambahkan intent classification agar audit, diagnosis, plan, dan implementasi tidak tercampur.
- Mengizinkan controlled feature expansion dari A+B ke C untuk task low/medium-risk yang evidence-based dan reversible.
- Menetapkan creative freedom UI yang tinggi tetapi tetap mengikuti tema, design system, dan behavior project.
- Mengganti prinsip minimum diff menjadi smallest complete and proportional solution.
- Membatasi approval hanya pada high-risk boundary, bukan perubahan material biasa.
- Menambahkan visual verification untuk perubahan UI bermakna dan adaptive final reporting.
- Memindahkan aturan client-specific PT Matik keluar dari core global.
- Membersihkan encoding rusak dan catatan adapter Claude yang kedaluwarsa.

## 2026-07-01 - evidence-first decision update

- Menambahkan ambiguity-resolution ladder sebelum AI meminta klarifikasi.
- Menegaskan bahwa precedent project dapat mengisi detail tersirat untuk task low/medium-risk yang reversible.
- Membedakan requirement eksplisit, detail tersirat, quality improvement, dan speculative product scope.
- Menetapkan preferensi controlled overdelivery dibanding underdelivery, tanpa mengizinkan feature speculation.
- Menambahkan requirement-coverage audit dan pelaporan evidence/assumption.
- Menegaskan bahwa ukuran atau jumlah file bukan approval gate.

## 2026-07-01 - full operational context

- Menambahkan keseimbangan antara proactive quality improvement dan larangan speculative business scope.
- Menambahkan diff-level compliance audit terhadap aturan project.
- Memisahkan prerequisite validation cleanup dari scope utama.
- Memperjelas bahwa read-only melarang mutasi, bukan diagnostic inspection.
- Mengubah startup mode dari compact-only menjadi full operational context.

## 2026-07-01 - compact runtime

- Menambahkan `runtime/core-compact.md` sebagai satu-satunya always-loaded module.
- Mengubah enam mandatory modules menjadi on-demand routing.
- Melarang full-tree scan DevBrain pada sesi coding biasa.
- Membatasi pemuatan DOCX/source hanya untuk `devbrain-sync`.
- Menyiapkan bootstrap global Codex dan Claude yang ringkas serta reversible.

## 2026-07-01 - autonomy policy update

- Menjadikan AI autonomous by default untuk task low/medium-risk.
- Menghapus approval gate untuk redesign, refactor, dan perubahan multi-file yang sudah diminta secara eksplisit dan tidak melewati protected boundary.
- Menegaskan prompt langsung pada sesi aktif mengalahkan default DevBrain.
- Mempertahankan approval untuk risiko data client/production dan tindakan high-risk atau irreversible yang belum diotorisasi secara spesifik.

## 2026-07-01

- Membentuk knowledge layer DevBrain dari Developer Specification milik Randhu.
- Memisahkan prinsip global dari aturan project-specific.
- Menambahkan risk classification dan approval gate yang eksplisit.
- Menambahkan routing konteks agar modul hanya dibaca saat relevan.
- Menambahkan adapter awal untuk Codex dan Claude Code.
- Menambahkan command compression tanpa membuat CLI.
- Menunda notification system, logs, daily summary, GUI, dan CLI.
