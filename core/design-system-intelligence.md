# Design System Intelligence

## Tujuan

Untuk pekerjaan frontend, AI harus berpikir seperti product-minded frontend engineer: membuat pengalaman yang matang, konsisten, dan mudah dikembangkan. Hasil bukan sekadar halaman yang terlihat bagus pada satu screenshot, melainkan UI yang tetap konsisten saat fitur bertambah, state berubah, dan screen digunakan pada ukuran perangkat berbeda.

DevBrain tidak menentukan warna, font, radius, library, atau gaya visual universal. AI harus menemukan identitas dan sumber kebenaran visual dari project aktif terlebih dahulu.

## Design-system-first discovery

Sebelum membuat atau mengubah UI yang bermakna, periksa secara proporsional:

1. project instruction, Project Visual DNA, screenshot, dan layar existing yang menjadi acuan;
2. theme, token, CSS variables, Tailwind config, design-system package, atau file style source of truth;
3. shared component, primitive, pattern feature, dan component library yang sudah digunakan;
4. product purpose, target user, primary task, density data, platform, dan responsive behavior;
5. state yang harus terlihat: normal, loading, empty, error, disabled, permission-limited, success, dan data parsial bila relevan.

Jangan membangun UI dari selera default AI jika bukti project tersedia. Jika design system sudah ada, gunakan dan perluas dengan bahasa visual yang sama. Jika belum ada atau terlalu terpecah, bentuk fondasi ringan yang benar-benar dibutuhkan oleh outcome aktif.

## Project Visual DNA

Setiap project perlu memiliki karakter visual yang dapat dijelaskan, bukan hanya daftar warna. AI harus menyimpulkan atau membaca:

- siapa pengguna dan konteks mereka memakai produk;
- rasa produk yang tepat, misalnya tenang, cepat, formal, ramah, padat data, atau eksploratif;
- hierarchy informasi dan action utama;
- mode warna, brand, typography, density, radius, elevation, iconography, dan motion;
- visual anti-pattern yang tidak cocok untuk produk;
- layar atau fitur existing yang menjadi precedent utama.

Bila Visual DNA belum terdokumentasi tetapi project sudah memiliki UI, gunakan implementation existing yang paling matang sebagai precedent. Bila project baru tanpa arah visual yang cukup, AI boleh membuat usulan Visual DNA yang ringkas dan implementasi foundation low/medium-risk yang konsisten dengan tujuan produk. Jangan mengklaim bahwa keputusan awal tersebut adalah brand final.

## Token dan visual consistency

Gunakan source of truth yang sudah ada untuk warna, typography, spacing, radius, shadow, border, z-index, breakpoint, dan motion. Nilai visual tidak boleh dibuat acak hanya demi menyelesaikan satu halaman.

Jika project belum memiliki token:

- gunakan convention atau library existing bila tersedia;
- buat token/foundation kecil hanya ketika dipakai berulang atau diperlukan untuk menjaga konsistensi;
- pilih semantic naming yang menjelaskan peran, bukan nama halaman atau angka tanpa konteks;
- jangan membuat token dump besar sebelum kebutuhan nyata muncul.

Jika project memiliki aturan token yang ketat, audit setiap nilai visual baru per properti. Jangan menyebut suatu perubahan token-compliant hanya karena sebagian properti telah memakai token. Untuk perubahan kecil, gunakan token terdekat yang tersedia; untuk kebutuhan berulang yang jelas, tambahkan token yang tepat dan laporkan alasannya.

## Arsitektur komponen

Gunakan empat level yang jelas:

1. **Primitive**: Button, Input, Badge, Card, Dialog, Tooltip, Skeleton, dan elemen lintas fitur dengan API stabil.
2. **Pattern**: PageHeader, FilterBar, DataTable shell, EmptyState, FormSection, StatCard, atau toolbar yang dipakai berulang dengan struktur serupa.
3. **Feature component**: gabungan UI dan behavior yang khusus untuk satu domain atau area produk.
4. **Page composition**: menyusun pattern dan feature component berdasarkan tujuan halaman; hindari menyimpan seluruh detail UI dalam satu file page jika sudah mengganggu readability.

Gunakan atau buat shared component ketika ada reuse nyata pada dua atau lebih konteks, atau ketika primitive/pattern tersebut jelas merupakan bahasa UI inti project. Tetap biarkan komposisi satu kali yang benar-benar spesifik berada dekat dengan feature/page. Jangan memecah satu layar menjadi banyak file kecil hanya agar terlihat "componentized".

Wrapper atas component library hanya layak jika memberi nilai project-specific yang nyata: semantic variant, accessibility behavior, visual contract, konsistensi state, atau API yang lebih aman. Jangan membuat wrapper kosong untuk setiap komponen library.

## Componentization decision

Sebelum membuat shared component baru, jawab:

- apakah pattern ini sudah muncul atau akan jelas dipakai lintas layar/fitur?
- apakah semua consumer membutuhkan struktur, state, dan API yang cukup serupa?
- apakah component baru menyederhanakan page atau justru menyembunyikan layout penting?
- apakah existing primitive/library dapat dipakai langsung dengan konfigurasi kecil?
- apakah perubahan pada shared component aman bagi semua consumer yang sudah ada?

Jika jawabannya belum kuat, implementasikan sebagai feature-local component yang rapi. Extract nanti ketika reuse terbukti. Jika shared component memang diperlukan, map consumer terdampak, pertahankan compatibility, dan lakukan visual/regression check pada consumer relevan.

## Product-quality UI

AI bebas meningkatkan UI secara luas pada low/medium-risk, termasuk hierarchy, page composition, empty/loading/error state, responsive pattern, interaction feedback, accessibility affordance, copy pendukung, dan micro-interaction. Prioritasnya adalah membuat primary task lebih jelas dan lebih nyaman, bukan menambah dekorasi.

Untuk menghindari hasil generik:

- mulai dari tugas pengguna, data density, dan konteks produk;
- gunakan contrast, typography, spacing, grouping, and progressive disclosure untuk hierarchy;
- pilih component, motion, dan surface treatment yang memiliki fungsi;
- jangan meniru dashboard/landing-page template tanpa hubungan dengan product;
- jangan menggunakan gradient, glass, shadow, animation, rounded card, atau icon secara otomatis;
- hindari semua halaman memiliki hero, kartu KPI, dan CTA yang sama bila konteksnya berbeda.

## Dependency and library policy

Gunakan stack, component library, icon set, utility, dan token system yang sudah ada terlebih dahulu. Jangan memasang UI library baru bila project sudah memiliki fondasi UI yang jelas dan library baru hanya menduplikasi kemampuan.

Tambahkan dependency hanya jika manfaatnya spesifik, kompatibel dengan stack, dirawat dengan baik, tidak menambah overlap besar, dan lebih aman daripada membangun sendiri. Untuk perubahan dependency yang berdampak luas atau menyentuh client/production, jelaskan alasan, footprint, compatibility, dan validation yang diperlukan. Dependency bukan pengganti pemahaman design system.

## Foundation pass dan batas scope

Saat task UI menunjukkan foundation yang tidak konsisten atau belum ada, AI boleh melakukan foundation pass yang proporsional: inventarisasi, memilih source of truth, merapikan primitive/pattern yang benar-benar diperlukan, lalu membangun feature dengan foundation tersebut.

Jangan mengubah seluruh UI project atau memigrasikan semua consumer hanya karena satu task membutuhkan satu tombol. Perbaiki fondasi sejauh memberikan nilai langsung pada outcome aktif, reuse yang terbukti, atau mencegah inkonsistensi yang nyata. Perubahan yang lebih luas boleh dilanjutkan bila memenuhi controlled feature expansion dan tetap di bawah high-risk boundary.

## Definition of done untuk UI foundation

Sebuah hasil frontend matang bila, sesuai relevansi task:

- identitas visual project dan source of truth telah digunakan;
- repeated UI memakai primitive/pattern yang tepat, tanpa abstraction spekulatif;
- page-specific layout tetap mudah dibaca;
- state normal, loading, empty, error, disabled, dan permission-aware ditangani bila relevan;
- desktop, tablet, dan mobile dipertimbangkan pada viewport yang relevan;
- keyboard, focus, touch target, contrast, semantic label, dan feedback interaksi tidak diabaikan;
- business logic, API contract, auth, permission, dan data semantics tetap aman;
- diff diperiksa dari hardcoded visual values, duplicate pattern, dan regression shared consumer;
- visual verification dilakukan jika runtime tersedia dan perubahan visual bermakna.
