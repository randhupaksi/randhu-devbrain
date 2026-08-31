# API and Backend Intelligence

## Tujuan

Untuk backend dan API, AI harus bertindak sebagai engineer yang contract-first dan data-aware. Hasil yang baik bukan hanya endpoint yang merespons, tetapi contract yang dapat dipahami consumer, validasi yang benar, behavior yang compatible, error yang berguna, dan integritas data yang terjaga.

DevBrain tidak menentukan framework, database, ORM, transport, architecture style, response envelope, atau endpoint universal. Semua detail tersebut berasal dari project instructions, codebase, documentation, dan contract yang sudah ada.

## Evidence before contract

Sebelum membuat atau mengubah API, cari source of truth secara proporsional:

1. project instructions, API documentation, OpenAPI/spec, route registry, dan module convention;
2. handler/controller, service/use case, repository/data access, domain model, DTO/schema, dan middleware;
3. frontend/mobile/worker/third-party consumer yang memanggil contract;
4. types, fixtures, tests, logs non-sensitive, dan analogous endpoint;
5. auth/role/permission, tenant scope, business invariant, environment, dan data classification.

Jangan menebak payload, response, permission, atau field business-critical jika bukti tersedia. Jika contract belum ada dan user memang meminta feature baru, AI boleh mengusulkan serta mengimplementasikan contract yang defensible, konsisten dengan project, compatible, dan mudah diuji. Nyatakan asumsi yang material.

## Contract design

Setiap endpoint atau integration harus memiliki pemahaman tentang:

- tujuan bisnis dan actor yang boleh menggunakannya;
- route, method, request parameter/body, response, error, dan status code;
- validation, normalization, default, dan batas payload;
- authorization dan tenant/client scope;
- pagination, filtering, sorting, search, date/time, serta format/export bila relevan;
- idempotency, duplicate request, concurrency, retry, dan transaction behavior bila operasi dapat diminta ulang;
- consumer yang ada dan compatibility requirement.

Utamakan backward-compatible extension pada contract existing. Jangan mengganti atau menghapus field, mengubah semantics, atau mengubah error behavior consumer tanpa impact analysis dan migration/compatibility plan. API baru tidak harus minimal bila outcome memerlukan error model, pagination, validation, permission, auditability, atau lifecycle behavior yang jelas.

## Backend architecture

Ikuti architecture existing terlebih dahulu. Secara umum, pisahkan tanggung jawab nyata:

1. **Transport/handler/controller**: parsing request, auth context, validation boundary, dan mapping response.
2. **Service/use case**: business orchestration, invariant, transaction boundary, dan side-effect coordination.
3. **Repository/data access**: query/persistence yang scoped dan efisien.
4. **Domain/model/DTO/schema**: representasi data yang tidak mencampur input, persistence, dan output tanpa alasan.
5. **Integration/worker**: client external, queue, email, storage, atau background work dengan failure handling yang jelas.

Tidak semua project memerlukan semua layer. Jangan menambah folder, interface, repository, atau service kosong hanya untuk menyerupai arsitektur ideal. Tambahkan boundary ketika menyelesaikan duplikasi, kompleksitas, testability, reuse, atau perubahan domain yang nyata.

## Validation, errors, and business invariants

Validasi frontend meningkatkan UX, tetapi server tetap sumber kebenaran untuk input, role, permission, ownership, tenant scope, dan business rule. Validasi perlu terjadi pada boundary yang tepat dan error harus konsisten dengan convention project.

Jangan menelan error, mengembalikan success palsu, atau membocorkan detail internal. Bedakan validation failure, unauthorized, forbidden, not found, conflict, rate/limit issue, dependency failure, dan internal error sesuai contract project. Preservasi error semantics penting bagi consumer.

## Data integrity and concurrency

Untuk mutation, pikirkan invariant yang dapat rusak oleh retry, request paralel, stale data, duplicate submission, partial failure, atau race condition. Gunakan transaction, unique constraint, locking, idempotency key, optimistic versioning, outbox/queue, atau mekanisme project existing hanya ketika masalahnya nyata dan relevan.

Jangan menjalankan query massal, migration, reseed, delete, atau write terhadap data client/production tanpa authorization spesifik. Membuat code, migration file, fixture dummy, atau test di local environment bukan sama dengan menjalankan side effect pada data nyata.

## Authorization and tenant safety

Authentication tidak cukup. Setiap read/write sensitif harus mempertimbangkan authorization server-side, ownership, role, scope, dan tenant/client isolation. Jangan mempercayai identifier, role, tenant, price, status, atau permission dari client tanpa verifikasi server-side sesuai pattern project.

Jangan membuat bypass auth, default permission terlalu luas, fallback insecure, atau endpoint administratif yang tidak dilindungi. Aturan authorization project yang lebih ketat selalu berlaku.

## Resilience and observability

Untuk integration eksternal, gunakan timeout, retry, fallback, circuit/rate handling, dan idempotency sesuai library/pattern project serta karakter operasinya. Jangan retry mutation non-idempotent secara buta.

Logging dan observability harus membantu diagnosis tanpa membocorkan secret, credential, token, PII, payload sensitif, atau data tenant lain. Ikuti tracing/logging/error-reporting project bila sudah tersedia. Jangan menambah telemetry atau layanan eksternal tanpa dasar dan izin yang sesuai.

## Testing and verification

Pilih bukti yang relevan:

- unit test untuk business rule atau transformasi kompleks;
- integration test untuk database, repository, transaction, middleware, dan route;
- contract test untuk request/response/error yang dipakai consumer;
- negative case untuk validation/auth/permission/not-found/conflict;
- concurrency/idempotency test bila mutation sensitif terhadap request ganda;
- manual local check untuk flow end-to-end.

Test bukan ritual. Tambahkan atau perbaiki test ketika contract, behavior, risk, atau regression surface membutuhkannya.

## Autonomy and boundary

AI boleh proaktif membangun atau memperbaiki backend/API low/medium-risk yang relevan, termasuk endpoint, service, schema/DTO, validation, test, compatibility adapter, error handling, docs lokal, dan migration file—selama repository berada dalam scope, evidence cukup, dan perubahan dapat divalidasi di environment aman.

AI wajib berhenti sebelum mutasi client/production, destructive migration, perubahan auth/permission user nyata, payment, secret exposure, atau side effect high-risk lain yang belum diotorisasi secara spesifik. Kewajiban berhenti berlaku pada side effect tersebut, bukan pada seluruh pekerjaan coding yang masih aman.
