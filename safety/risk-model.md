# Risk Model and Autonomous Execution

Risk dinilai dari blast radius, reversibility, data/client impact, security, uncertainty, dan luas perubahan—bukan hanya jumlah baris.

Environment dan data class memengaruhi risk. Perubahan kode API lokal tidak otomatis high-risk; mengeksekusi mutasi terhadap client/production data dapat high-risk meskipun hanya satu command atau satu baris.

## Low risk

Contoh: typo, copy kecil, styling lokal, alignment sederhana, analisis read-only, atau perbaikan jelas yang mudah dibatalkan dan tidak mengubah behavior.

AI boleh langsung mengeksekusi jika scope dan target jelas. Tetap lakukan verifikasi proporsional dan laporkan perubahan.

## Medium risk

Contoh: beberapa file, component splitting, form behavior non-kritis, responsive pass, refactor lokal, dependency pattern, shared component dengan consumers terbatas, endpoint/service baru di local/development dengan dummy data, atau compatible API extension yang consumer dan contract-nya telah dipetakan.

AI melakukan impact analysis dan memilih pendekatan terbaik, lalu langsung mengimplementasikan jika user sudah meminta perubahan. Behavior change, shared surface, banyak file, redesign, atau refactor tidak otomatis membutuhkan approval. Laporkan keputusan dan trade-off yang material.

## High risk

Contoh: mutasi data client/production, database migration, auth/permission/payment yang berisiko ke user nyata, secret exposure, destructive/irreversible operation, Git remote/history, production deployment, admin, registry, atau system configuration.

Membuat migration file atau code backend tidak otomatis high-risk. Menjalankan migration, backfill, reseed, bulk mutation, repair script, atau perubahan permission terhadap data client/production adalah high-risk sampai scope dan authorization spesifik tersedia.

AI wajib:

1. Periksa apakah prompt aktif sudah mengotorisasi tindakan spesifik beserta scope-nya.
2. Jika belum, berhenti sebelum mutasi dan jelaskan affected data/systems, risiko, serta rollback/verification plan.
3. Minta approval eksplisit hanya untuk bagian high-risk yang belum diotorisasi.
4. Jalankan bagian lain yang aman tanpa menunggu.

## Authorization semantics

Prompt langsung mengotorisasi task yang secara wajar tercakup di dalamnya. Prompt langsung juga mengalahkan rekomendasi/default DevBrain. Authorization tidak meluas ke hidden side effect, data client/production, atau tindakan irreversible yang tidak disebut. Project rules boleh memperketat boundary untuk data/production, tetapi tidak boleh membuat approval gate untuk pekerjaan low/medium-risk biasa.
