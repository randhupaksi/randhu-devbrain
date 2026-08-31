# UI/UX Principles

## Prinsip global

UI harus clean, matang, profesional, context-aware, mudah dipahami, dan tidak terasa seperti template generik. Ini adalah standar kualitas, bukan satu visual style universal.

"Premium" berarti keputusan desain terasa disengaja: hierarchy kuat, spacing nyaman, typography rapi, warna terkendali, komponen konsisten, dan interaction halus. Premium tidak berarti ramai, banyak gradient, shadow kuat, glassmorphism, atau animation berlebihan.

"Clean" berarti rendah visual noise tetapi tidak kosong. Setiap elemen memiliki fungsi, informasi mudah discan, dan action penting mudah ditemukan.

## Project identity

AI wajib memperoleh arah visual spesifik dari project context dan existing product. Jangan menentukan secara global:

- dark/light theme;
- brand color atau font;
- spacing, radius, shadow, atau density tertentu;
- layout dashboard tertentu;
- icon library atau component library;
- gaya enterprise, playful, friendly, brutalist, atau gaya visual lain sebagai default universal.

Enterprise, consumer, sekolah, kesehatan, POS, SaaS, dan portfolio dapat memiliki hasil berbeda. Yang konsisten adalah kematangan, clarity, usability, dan context awareness.

## Design-system-first

Sebelum mengubah UI secara bermakna, AI harus menemukan visual source of truth project: theme/token, component library, shared component, pattern existing, dan Product Visual DNA bila tersedia. Gunakan foundation tersebut untuk membangun feature baru; jangan menghasilkan page cantik yang hidup di luar bahasa UI project.

Jika foundation belum ada atau tidak konsisten, AI boleh membangun dasar ringan yang relevan dengan outcome aktif: token semantic yang diperlukan, primitive/pattern reusable, dan state UX penting. Ini bukan izin membuat design system besar atau mengganti seluruh UI project tanpa kebutuhan nyata. Detail operasional ada di `design-system-intelligence.md` dan `workflows/ui-foundation-pass.md`.

## Decision framework

Sebelum redesign atau perubahan UI besar:

1. Pahami tujuan halaman, target user, role, data, action utama, dan flow existing.
2. Baca component structure, shared dependencies, state, API usage, permission, dan responsive behavior.
3. Temukan masalah nyata pada hierarchy, density, spacing, typography, CTA, navigation, table/form/modal, feedback state, atau responsiveness.
4. Tentukan arah desain dari konteks project, bukan kebiasaan AI.
5. Jelaskan scope visual, behavior yang dipertahankan, trade-off, dan risiko.
6. Jika redesign besar atau shared layout memang diminta, lanjutkan setelah impact analysis; approval tambahan hanya diperlukan bila high-risk boundary ikut terdampak.

Jika target user atau kebutuhan bisnis tidak dapat ditemukan, jalankan evidence-first review. Untuk low/medium-risk, gunakan reasonable assumption dan lanjutkan redesign dengan asumsi yang dinyatakan. Tanyakan hanya jika ambiguity yang tersisa dapat menghasilkan outcome bisnis material yang tidak dapat dipilih secara defensible atau menyentuh high-risk boundary.

## Visual tools

- Warna memperjelas brand, hierarchy, dan status; jaga kontras dan hindari noise.
- Icon harus membantu pemahaman; jaga style, ukuran, stroke, alignment, label, atau tooltip.
- Radius mengikuti karakter project dan harus terasa satu keluarga.
- Shadow digunakan untuk depth/separation yang bermakna, bukan pada semua komponen.
- Animation memberi feedback atau continuity; harus ringan, natural, dan tidak mengganggu.
- Spacing mengikuti density, hubungan konten, form factor, target device, dan tujuan halaman—not angka global.

## Required experience states

Untuk surface yang relevan, pikirkan normal, loading, empty, error, incomplete data, disabled, success, dan permission-limited state. Kualitas UI tidak dinilai hanya dari happy path atau screenshot data penuh.

## Creative freedom

Untuk task UI/UX low/medium-risk, AI memiliki creative freedom yang tinggi pada composition, hierarchy, layout, responsive adaptation, component presentation, interaction feedback, micro-interaction, dan supporting states. Kreativitas harus tetap anchored pada tujuan halaman, target user, tema project, design system, token, component pattern, dan behavior existing.

AI boleh melakukan perubahan visual besar tanpa approval tambahan ketika redesign diminta atau jelas tercakup dalam outcome. Jangan mengganti identitas project dengan selera generik AI, mencampur visual language yang tidak konsisten, atau mengubah business behavior hanya demi desain.

Default Randhu adalah maximum project-anchored creative authority. AI tidak perlu mempertahankan composition atau layout existing hanya karena sudah ada. AI boleh merestrukturisasi section, information hierarchy, navigation presentation, card/table/form/modal composition, responsive behavior, feedback state, dan interaction pattern apabila hasilnya lebih matang dan tetap sesuai konteks produk.

AI juga boleh menambahkan elemen UI pendukung yang relevan—seperti summary, contextual action, status treatment, helper content, progressive disclosure, skeleton/empty/error state, accessibility affordance, atau micro-interaction—tanpa menunggu instruksi satu per satu. Kebebasan ini tidak mengizinkan perubahan API contract, data semantics, auth, permission, atau business rule secara diam-diam.

Untuk feature atau redesign frontend, kreativitas juga mencakup merapikan composition dan component architecture. AI boleh mengubah markup berulang menjadi primitive/pattern bersama jika reuse atau konsistensinya nyata; jangan membuat abstraction spekulatif untuk elemen satu kali pakai.

Pertimbangkan loading, empty, error, incomplete data, disabled, and submit state. Gunakan skeleton ketika struktur konten awal perlu dipertahankan. Spinner lokal dapat digunakan untuk refresh/filter pada area yang sudah memiliki data. Jangan mengganti seluruh halaman dengan loading section jika hanya satu region yang sedang memperbarui data.

Responsive behavior dipikirkan sejak awal. Periksa overflow, table, modal, navigation, touch target, safe area, readability, dan action accessibility pada ukuran layar yang relevan.
