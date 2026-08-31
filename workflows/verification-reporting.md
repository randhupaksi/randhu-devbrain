# Verification and Reporting

## Verification

Pilih validasi berdasarkan risiko dan project:

- review diff untuk setiap perubahan;
- lint/typecheck untuk static correctness;
- unit/integration/e2e test untuk behavior;
- build untuk integration/bundling;
- browser/runtime/console/network check untuk UI dan API;
- performance evidence untuk klaim optimasi;
- manual check untuk visual feel atau flow yang tidak terotomasi.

Audit setiap added/changed line terhadap aturan project yang aktif. Compliance harus diperiksa per property/contract, bukan disimpulkan dari komponen atau file secara umum. Jika hanya sebagian perubahan mengikuti aturan, laporkan sebagai partial compliance dan sebutkan residual violation.

Untuk frontend/UI, audit juga source of truth visual, hardcoded values, repeated markup, component boundary, shared-consumer impact, state UX, responsive behavior, accessibility, dan kecocokan dengan Project Visual DNA. Jangan mengklaim hasil premium atau design-system compliant hanya dari lint/typecheck; lakukan visual/runtime verification bila tersedia.

Untuk backend/API, audit contract per request/response/error, validation, auth/permission/tenant scope, consumer compatibility, data invariant, transaction/idempotency/concurrency yang relevan, secret/privacy exposure, migration boundary, dan test coverage. Jangan menyebut endpoint aman hanya karena menerima happy-path request; gunakan negative and integration evidence yang proporsional.

Audit juga requirement coverage:

- tandai setiap requirement eksplisit sebagai implemented, partially implemented, blocked, atau intentionally unchanged;
- verifikasi detail tersirat terhadap precedent yang digunakan;
- sebutkan assumption yang memengaruhi output;
- pisahkan quality improvement tambahan dari requirement utama;
- pastikan tidak ada capability bisnis baru yang masuk tanpa dasar.
- pisahkan foundation shared (token/primitive/pattern) dari komposisi feature-local dalam laporan UI.
- pisahkan code/migration yang disiapkan dari side effect data yang benar-benar dieksekusi dalam laporan backend.

Jangan memperbaiki masalah existing di luar scope hanya agar validation terlihat lulus. Jika cleanup lokal benar-benar diperlukan agar perubahan dapat divalidasi, pisahkan secara konseptual dan laporkan sebagai prerequisite cleanup. Bedakan failure existing dari regression akibat perubahan.

Read-only berarti tanpa mutasi. Diagnostic read-only seperti membaca file, search, `git status`, `git diff`, lint non-mutating, dan inspection command tetap diperbolehkan jika relevan.

Jangan mengklaim sukses untuk validasi yang tidak dijalankan. Catat command gagal dan bedakan failure existing dari regression akibat perubahan.

## Final report

Gunakan reporting yang adaptif. Task kecil cukup dengan outcome, file berubah, dan validation. Task kompleks/high-risk harus menyertakan behavior, evidence, assumption, risk, serta manual check. Jangan membuat laporan panjang hanya untuk terlihat lengkap.

Field yang tersedia sesuai kebutuhan:

- Outcome.
- Files changed dan ringkasan per file/kelompok.
- Behavior changes atau pernyataan behavior dipertahankan.
- Validation commands/checks dan hasil.
- Risks, assumptions, dan manual checks tersisa.
- Evidence/precedent yang digunakan untuk menyelesaikan ambiguity material.
- Commit message hanya jika diminta.

Jika user meminta list command Git, pisahkan setiap feature/perubahan logis, tampilkan file yang akan di-stage secara spesifik, dan gunakan commit message Conventional Commit yang menjelaskan domain serta outcome. Nyatakan bahwa command adalah text-only dan jangan mengklaim commit/push telah dilakukan.

Bedakan file yang diubah, file yang hanya dibaca, dan rekomendasi lanjutan bila informasi itu membantu review.
