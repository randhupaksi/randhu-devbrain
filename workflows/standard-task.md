# Standard Task Workflow

## 1. Analyze

- Konfirmasi workspace, branch, target, dan scope.
- Baca DevBrain mandatory modules dan project instructions.
- Periksa relevant files, dependencies, existing conventions, dan dirty state.
- Untuk frontend/UI, temukan design-system source of truth, shared component/pattern, dan Visual DNA project sebelum memilih solusi.
- Untuk backend/API, temukan contract source of truth, route/module convention, consumer, auth/tenant boundary, environment/data class, dan migration impact sebelum memilih solusi.
- Klasifikasikan risk dan uncertainty.
- Jika requirement ambigu, lakukan evidence-first resolution: prompt -> project instructions -> existing implementation -> analogous feature -> types/API/tests/docs.
- Pisahkan requirement eksplisit, detail tersirat yang dibutuhkan, quality improvement yang aman, dan fitur baru spekulatif.
- Untuk API/backend/data, klasifikasikan environment, data ownership, operation type, dan exposure sebelum mutasi.

## 2. Plan

Untuk task yang tidak trivial, jelaskan outcome, pendekatan, file/area terdampak, behavior yang dipertahankan, risiko, dan validation plan.

## 3. Approve

Low/medium-risk berjalan otomatis jika task sudah meminta implementasi. Ukuran perubahan, jumlah file, redesign, atau refactor tidak otomatis membutuhkan approval. Minta approval hanya untuk high-risk boundary yang belum diotorisasi secara spesifik, terutama risiko data client/production, security, irreversible external state, atau destructive operation.

Ambiguity bukan approval gate otomatis. Jika satu interpretasi paling kuat dapat dibuktikan dari project dan perubahan reversible, lanjutkan serta laporkan asumsi. Tanyakan hanya ambiguity material yang tersisa setelah evidence review.

## 4. Implement

- Pilih solusi yang lengkap, matang, dan proporsional terhadap outcome, bukan diff terkecil yang menghasilkan underdelivery atau perubahan besar yang tidak memberi nilai nyata.
- Ikuti pattern project.
- Untuk UI, gunakan/reuse foundation project; extend atau buat primitive/pattern baru hanya ketika evidence reuse dan konsistensinya kuat.
- Untuk backend/API, gunakan/reuse module, schema, validation, middleware, error, dan persistence pattern project; extend contract secara compatible atau buat module baru hanya ketika outcome memerlukannya.
- Pertahankan hubungan setiap perubahan dengan scope efektif; jangan memasukkan cleanup atau workstream yang tidak terkait.
- Selesaikan detail tersirat yang diperlukan agar outcome tidak setengah jadi, selama didukung precedent project dan tidak menciptakan requirement bisnis baru.
- Tambahkan feature C/D/E atau improvement lanjutan yang memenuhi controlled feature expansion; pisahkan requirement utama dan proactive additions dalam laporan.
- Terapkan diminishing-value stop rule agar proactive expansion berhenti ketika nilai tambah tidak lagi proporsional.
- Pertahankan API, data, dan behavior yang tidak diminta berubah.

## 5. Verify

- Review diff.
- Jalankan lint/typecheck/test/build atau validasi khusus yang relevan dan tersedia.
- Gunakan package manager dan command project yang existing.
- Lakukan pemeriksaan UI/runtime bila task memerlukannya.

## 6. Summarize

Laporkan outcome, file berubah, behavior, validasi, risiko/catatan, dan manual check tersisa.
