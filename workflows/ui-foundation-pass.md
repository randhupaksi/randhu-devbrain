# UI Foundation Pass Workflow

Gunakan workflow ini untuk membangun feature frontend baru, redesign yang cukup besar, atau ketika UI project terlihat belum memiliki dasar konsisten. Workflow ini bukan kewajiban membuat design system besar pada setiap task kecil.

## 1. Discover

- Baca project instruction, Project Visual DNA bila ada, target page, dan tujuan pengguna.
- Petakan theme/token source, component library, shared component directory, styling approach, icon set, dan screen precedent.
- Inventarisasi primitive dan pattern yang sudah tersedia sebelum membuat yang baru.
- Identifikasi visual gap yang benar-benar menghambat feature: inconsistent token, missing state, repeated markup, weak hierarchy, responsive issue, atau accessibility gap.

## 2. Decide foundation scope

Pisahkan pekerjaan menjadi:

- **reuse**: component/token existing sudah cocok;
- **extend**: variant/token/pattern kecil perlu ditambahkan untuk outcome;
- **create**: primitive/pattern baru belum ada dan reuse-nya terbukti;
- **local**: komposisi hanya milik feature ini dan tidak perlu diekstrak.

Utamakan solusi terkecil yang membentuk sistem coherent, bukan halaman cepat dengan banyak nilai acak dan bukan framework UI baru yang belum diperlukan.

## 3. Define implementation

- Tentukan visual direction berdasarkan produk, bukan preference global.
- Tentukan hierarchy, density, responsive behavior, state, action feedback, dan accessibility.
- Buat mapping untuk setiap nilai visual baru ke token/source of truth yang berlaku.
- Untuk shared component, tentukan consumers, contract/variant, behavior invariant, dan migration impact.
- Tetapkan batas: API, data flow, auth, permission, dan business rule tetap tidak berubah kecuali outcome aktif memang mencakupnya dan API caution protocol telah dilalui.

## 4. Build

- Implementasikan foundation yang disetujui oleh evidence lalu susun feature/page di atasnya.
- Pakai shared component untuk repeated behavior/structure; jangan menyimpan style page-specific ke primitive global.
- Tambahkan supporting UI yang relevan: state, helper, empty treatment, feedback, responsive adaptation, atau accessibility affordance.
- Hindari hardcoded visual values yang melanggar source of truth project, duplicated markup, dan one-off variants yang seharusnya menjadi pattern.

## 5. Verify

- Review added/changed line terhadap token rule, reusable-pattern decision, dan project visual direction.
- Periksa consumer dari shared component yang berubah.
- Jalankan lint/typecheck/test/build yang relevan.
- Jika runtime tersedia, periksa halaman nyata pada viewport relevan; cek normal/loading/empty/error/disabled, overflow, focus, keyboard, touch, contrast, dan console.
- Laporkan jika visual check belum dapat dijalankan; lint/typecheck bukan bukti visual quality.

## 6. Report

Bedakan dengan jelas:

- foundation atau token/component bersama yang dibuat/diubah;
- komposisi khusus feature/page;
- quality improvement proaktif;
- API/behavior yang sengaja dipertahankan;
- validation dan manual visual check yang tersisa.
