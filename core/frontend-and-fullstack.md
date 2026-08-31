# Frontend and Fullstack Guidelines

## Component boundaries

Pecah component saat tanggung jawab, ukuran, atau kompleksitas mengganggu readability dan maintenance. Pisahkan berdasarkan fungsi nyata, bukan demi menambah file. Jangan membuat fragmentasi berlebihan untuk component sederhana yang hanya dipakai sekali.

## State model

- Local state untuk interaction lokal.
- Server-state tooling untuk data API jika project sudah menggunakannya.
- Global state hanya untuk data yang benar-benar lintas area seperti session, auth, permission, atau application-wide preference.
- Hindari prop drilling berlebihan, tetapi jangan membuat global store tanpa kebutuhan.

Ikuti state-management pattern existing project.

## Frontend system thinking

Sebelum membangun page/feature UI, identifikasi token, theme, library, shared primitive, feature pattern, dan folder convention yang telah ada. Gunakan component architecture yang membedakan primitive lintas fitur, pattern reusable, feature component, dan page composition.

Default-nya adalah reuse existing system. Buat shared component ketika pattern/behavior benar-benar dipakai lintas konteks atau jelas menjadi bahasa UI inti project. Untuk layout yang hanya spesifik pada satu feature, tetap local agar page tidak kehilangan kejelasan dan sistem tidak over-abstract.

Jika shared component diubah, periksa consumer, variant contract, accessibility, responsive behavior, dan regression visual. Componentization tidak boleh mengubah data flow atau business behavior tanpa alasan yang jelas.

## Styling and UI dependencies

Ikuti source of truth styling project: design token, CSS variable, theme object, utility convention, atau component-library variant. Hindari nilai visual ad-hoc, duplicate markup, dan inline style yang melompati system tanpa alasan.

Gunakan UI dependency yang sudah ada terlebih dahulu. Library/dependency baru hanya ditambahkan jika manfaat dan compatibility-nya nyata, tidak menduplikasi foundation existing, dan dapat divalidasi secara proporsional. Untuk dependency yang memengaruhi banyak screen atau production/client surface, jelaskan impact sebelum menambahkannya.

## Data fetching dan cache

Ikuti API client dan fetching pattern yang sudah ada. Periksa endpoint, method, query params, payload, response, auth, error shape, type/interface, cache, refetch, dan invalidation.

Cache harus meningkatkan UX tanpa menyesatkan pengguna. Data transaksi, pembayaran, attendance, invoice, status, dan data client membutuhkan stale time dan invalidation yang hati-hati.

## API contract

Jangan menebak contract jika service, type, docs, backend code, atau contoh response tersedia. Jika backend/API tidak tersedia di workspace, asumsi sementara diperbolehkan hanya jika dinyatakan dengan jelas dan dibuat mudah dikoreksi.

Untuk task yang benar-benar presentation-only, pertahankan endpoint, payload, auth header, permission, dan business validation. Jika outcome atau proactive feature yang relevan membutuhkan perubahan integration/API/backend, perubahan tersebut boleh dilakukan melalui API caution protocol selama repository berada dalam scope dan tidak melewati high-risk boundary yang belum diotorisasi.

### API caution protocol

Membaca dan menelusuri API secara read-only selalu diperbolehkan. Sebelum mengubah API integration atau backend contract:

1. identifikasi endpoint, method, params/payload, response/error shape, auth, permission, cache, dan consumers;
2. tentukan apakah perubahan hanya frontend mapping, backward-compatible extension, atau breaking contract;
3. periksa efek pada data client/production, tenant isolation, migration, dan existing callers;
4. pertahankan compatibility jika perubahan kontrak tidak diminta;
5. validasi success, failure, unauthorized/forbidden, empty, dan stale/refetch behavior yang relevan.

AI boleh langsung memperbaiki atau mengembangkan integration/API/backend low/medium-risk yang jelas, relevan, reversible, dan dapat divalidasi—termasuk endpoint atau contract baru—jika repository dan area tersebut termasuk scope kerja. Gunakan compatibility, migration strategy, tests, dan non-production data bila diperlukan. Kehati-hatian API adalah kewajiban analisis, bukan larangan kreativitas. Untuk mutation data client/production, tenant/security risk, destructive migration, atau high-risk impact lain yang belum diotorisasi, berhenti pada boundary tersebut dan minta konfirmasi spesifik.

Untuk pekerjaan API/backend yang bermakna, gunakan `api-backend-intelligence.md` dan `workflows/api-feature.md`. Modul tersebut memperdalam contract discovery, consumer impact, backend layering, validation, error semantics, authorization, integrity data, concurrency, observability, dan test. Detail framework serta contract project tetap ditentukan oleh repository aktif.

### Environment and data gate

Sebelum menjalankan mutasi API/backend/data, klasifikasikan:

- environment: local, test, development, staging, atau production;
- data: dummy/fixture, anonymized, internal non-client, client/user nyata, atau unknown;
- operation: read-only, reversible write, migration, bulk mutation, destructive, atau irreversible;
- exposure: isolated/local, shared team environment, client-facing, atau public production.

Local/test/development dengan dummy atau anonymized data dapat diperlakukan low/medium-risk sesuai blast radius. Staging/shared environment memerlukan impact awareness dan koordinasi bila dapat mengganggu pengguna lain. Production, client/user data, unknown data ownership, destructive migration, tenant isolation, atau security-sensitive operation adalah high-risk sampai terbukti sebaliknya.

Jangan menyamakan menjalankan server lokal, membuat migration file, atau menulis endpoint dengan menjalankan migration/mutasi terhadap database client. Kode dapat disiapkan dan diuji secara aman tanpa mengeksekusi side effect high-risk.

## Backend boundary

Backend adalah area sensitif, tetapi bukan area terlarang secara default. AI boleh membangun atau memperbaiki module/backend/API local/development yang termasuk scope setelah contract, data class, consumer, dan risiko dipahami. Aturan client/company tertentu—termasuk larangan menyentuh backend—harus berada di project `AGENTS.md`/`CLAUDE.md`, bukan DevBrain global.

## Environment dan validation

Environment variable adalah konfigurasi sensitif. Jangan mengekspos secret. Env baru harus dijelaskan tujuan, scope public/secret, environment target, placeholder, dan dokumentasinya.

Frontend validation meningkatkan UX; backend tetap sumber validasi untuk permission, auth, role, dan business rule. Error handling harus menjaga state dan integritas data, bukan sekadar menelan error.
