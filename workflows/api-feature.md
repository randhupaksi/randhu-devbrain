# API Feature Workflow

Gunakan workflow ini untuk endpoint baru, perubahan contract, integrasi frontend-backend, service/domain feature, atau perbaikan API yang bermakna.

## 1. Discover

- Baca project instructions, API docs/spec, route/module convention, types/schema, middleware, dan analogous endpoint.
- Petakan consumer: frontend, mobile, worker, webhook, third-party, test, atau service lain yang relevan.
- Pahami actor, business goal, auth/role/tenant scope, invariant, dan data yang dibaca/ditulis.
- Klasifikasikan environment, data ownership, operation, reversibility, dan blast radius sebelum mutation.

## 2. Map the contract

Tulis atau simpulkan:

- route/method dan actor;
- request params/body/query/header;
- response success dan error/status;
- validation, default, normalization, pagination/filter/sort bila relevan;
- authorization, ownership, tenant scope;
- compatibility consumer existing;
- idempotency, transaction, concurrency, retry, dan side effect bila relevan.

Gunakan source of truth project. Jika contract baru harus dibuat, pilih bentuk yang konsisten dan mudah dikoreksi; nyatakan assumption material.

## 3. Decide scope

Pisahkan:

- **reuse**: route/service/repository/schema/middleware existing sudah cocok;
- **extend**: field, variant, validation, or compatible behavior perlu ditambah;
- **create**: module/endpoint/contract baru memang diperlukan oleh outcome;
- **high-risk execution**: migration, production/client mutation, permission user nyata, payment, atau side effect lain yang memerlukan authorization spesifik.

Jangan membuat endpoint, database table, queue, cache, atau abstraction tambahan hanya karena mungkin berguna. Boleh membuat supporting backend/API yang evidence-backed dan meningkatkan outcome secara nyata.

## 4. Implement

- Ikuti layering dan naming project.
- Validasi request pada server boundary dan jaga business invariant di layer yang tepat.
- Terapkan authorization dan tenant scope server-side.
- Pertahankan compatibility kecuali contract change memang diminta dan migration plan jelas.
- Tangani error secara konsisten; jangan membocorkan internal detail atau data sensitif.
- Tambahkan test/fixture dummy/contract documentation lokal bila relevan.
- Untuk migration, gunakan `safe-data-migration.md`.

## 5. Verify

- Review contract dan consumer impacted.
- Uji success, validation failure, unauthorized/forbidden, not found, conflict, empty, dan failure dependency yang relevan.
- Uji transaction/idempotency/concurrency bila operation berisiko request ganda atau partial failure.
- Jalankan test, lint, typecheck, build, atau local integration check yang tersedia.
- Pastikan log/response tidak mengekspos secret atau data tidak perlu.

## 6. Report

Laporkan contract/behavior yang dibuat atau dipertahankan, consumer yang dipetakan, data/environment boundary, validation yang dijalankan, assumption, compatibility/migration note, dan side effect yang sengaja tidak dieksekusi.
