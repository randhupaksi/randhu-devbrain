# UI/UX Task Workflow

## Analyze

- Tentukan tujuan halaman, target user, primary task, data density, dan visual language existing.
- Jalankan design-system discovery: periksa Project Visual DNA, theme/token source, styling convention, UI library, shared primitive/pattern, dan screen precedent.
- Tentukan apakah task cukup dengan reuse, perlu extension foundation kecil, membutuhkan shared component baru, atau sebaiknya tetap feature-local.
- Periksa project design system, shared components, responsive rules, state/API dependency, dan affected screens.
- Gunakan screenshot atau bahasa feel sebagai evidence, bukan sebagai izin menebak business behavior.

## Define direction

Jelaskan masalah visual/UX, arah perbaikan, bagian yang berubah, behavior yang dipertahankan, responsive strategy, dan foundation yang akan di-reuse/extend/create. Arah visual harus berasal dari project context, bukan template AI.

Untuk nilai visual baru, gunakan mapping ke token atau source of truth project. Bila diperlukan perubahan shared component, petakan consumer dan contract yang harus tetap aman.

## Implement

Perubahan UI dapat mencakup layout, hierarchy, styling, component presentation, interaction feedback, loading/empty/error state, dan responsiveness. Reuse existing primitive/pattern lebih dahulu. Buat atau perluas shared component jika reuse nyata atau konsistensi lintas feature memerlukannya; pertahankan elemen one-off yang spesifik pada feature agar tidak terjadi over-abstraction. Jangan mengubah API, payload, business rule, auth, permission, atau data flow jika task tidak meminta.

Gunakan creative freedom yang tinggi selama hasil tetap konsisten dengan design system dan tema project. Jangan berhenti pada perubahan kosmetik jika masalah sebenarnya membutuhkan perbaikan hierarchy, composition, responsive structure, atau experience state.

Default-kan eksplorasi pada kualitas hasil, bukan konservatisme layout. Perombakan visual besar, supporting UI, serta feature C/D/E boleh langsung dilakukan jika relevan. Jika pola UI project belum memiliki foundation yang cukup, jalankan `ui-foundation-pass.md` secara proporsional. Jika solusi terbaik membutuhkan API/backend baru, AI boleh mengembangkannya ketika repository berada dalam scope dan risikonya low/medium; gunakan API caution protocol dan jangan menyentuh data client/production atau high-risk boundary tanpa authorization.

## Verify

Periksa state normal/loading/empty/error/disabled/permission-limited yang relevan, desktop/tablet/mobile yang relevan, overflow, focus/keyboard, touch target, contrast/readability, console error, token compliance per nilai visual baru, dan regression pada shared component.

Jika browser/runtime tersedia dan task mengubah visual yang bermakna, lakukan visual verification pada halaman nyata. Bandingkan hasil dengan tujuan desain, periksa screenshot atau viewport relevan, dan jangan menyimpulkan kualitas visual hanya dari lint/typecheck. Jika runtime tidak dapat dijalankan, nyatakan bahwa visual verification belum dilakukan.
