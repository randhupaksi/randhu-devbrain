# Architecture

DevBrain menggunakan empat context layers:

1. **Global core**: identitas, engineering, UI/UX, design-system intelligence, API/backend intelligence, performance, dan collaboration principles.
2. **Operational policy**: safety, risk, approval, workflow, dan reporting.
3. **Tool adapter**: discovery/bootstrap untuk Codex atau Claude Code.
4. **Project context**: fakta, constraints, visual direction, dan business rules repository aktif.

## Runtime model

DevBrain tidak memiliki daemon atau background process. Laptop menyimpan file; AI coding assistant membacanya satu kali ketika coding session dimulai, lalu memakai active context untuk turn berikutnya. Pemuatan ulang hanya terjadi pada trigger eksplisit atau lifecycle boundary yang ditentukan manifest.

Bootstrap lintas-device menggunakan installer PowerShell sederhana di `install/`. Installer dijalankan satu kali pada device baru atau setelah update DevBrain; ia membuat loader dengan path runtime aktual, backup, dan managed block. README tidak dapat memasang loader dengan sendirinya. AI hanya boleh mendeteksi kebutuhan dan meminta persetujuan sebelum menjalankan installer.

## Progressive loading

`runtime/full-context.md` adalah operational profile yang dimuat sekali pada awal session. File ini menggabungkan seluruh core, safety, workflow, context precedence, dan command contracts agar nuance developer tidak hilang selama session. AI tidak perlu membaca ulang file ini di setiap turn. Source DOCX, adapter docs, project templates, architecture/maintenance docs, dan changelog tetap dikecualikan karena tidak dibutuhkan untuk keputusan coding harian.

Project instructions tetap dibaca oleh tool melalui mekanisme native. DevBrain tidak boleh disalin ke setiap project karena akan menduplikasi context. Mode full operational context menggunakan context lebih besar sebagai trade-off untuk pemahaman developer profile yang lebih lengkap.

`core/design-system-intelligence.md` memberi AI cara berpikir frontend lintas project: menemukan Visual DNA, source of truth token/theme, component architecture, dan batas componentization. Visual DNA, warna brand, typography, stack/library, serta token konkret tetap berada di project context. `workflows/ui-foundation-pass.md` mengarahkan kapan foundation kecil perlu dibuat atau diperluas tanpa mengubah setiap task menjadi redesign sistem penuh.

`core/api-backend-intelligence.md` memberi AI cara berpikir contract-first: menemukan source of truth API, consumer, layer backend, validation, authorization, integrity data, resilience, dan test. `safety/data-and-api-protection.md` menjaga secret, PII, tenant isolation, serta boundary mutation. Detail route, framework, schema, error envelope, dan aturan bisnis tetap berada di project context. `workflows/api-feature.md` dan `workflows/safe-data-migration.md` memisahkan coding/preparation aman dari eksekusi side effect data berisiko.

`workflows/git-command-listing.md` memisahkan listing command dari eksekusi Git. Permintaan list command menghasilkan teks yang dikelompokkan per feature dengan file staging spesifik dan commit message yang meaningful; operasi Git tetap membutuhkan instruksi eksekusi eksplisit per operasi.

Session context lifecycle sengaja menukar pembacaan berulang dengan retensi active context. Jika context terkena compaction, DevBrain berubah, project berganti, atau user meminta reload, AI memuat ulang full runtime atau modul domain yang diperlukan.

## Non-goals saat ini

- Tidak ada model AI baru.
- Tidak ada CLI, executable, server, registry, atau admin setup. Installer PowerShell sederhana untuk bootstrap lintas-device adalah pengecualian terkontrol.
- Tidak ada automatic mutation dari DOCX ke core.
- Tidak ada universal UI theme atau universal technical stack.
- Tidak ada notification, logs, daily summary, atau GUI pada fondasi awal.
