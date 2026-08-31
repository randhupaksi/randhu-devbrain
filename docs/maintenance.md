# Maintenance and Sync

Developer Specification DOCX v0.1 adalah historical foundation dan snapshot intent awal. Markdown/YAML DevBrain adalah canonical operational source yang dibaca AI dan boleh berkembang berdasarkan feedback penggunaan tanpa mengubah DOCX.

## Update workflow

1. Terima feedback langsung, pengalaman penggunaan, atau DOCX terbaru bila user memang menyediakan revisi dokumen.
2. Bandingkan input baru dengan DevBrain aktif; gunakan source snapshot hanya untuk traceability bila relevan.
3. Klasifikasikan perubahan sebagai global principle, preference, safety, workflow, adapter, atau project-specific.
4. Laporkan added/changed/removed/ambiguous/conflicting items.
5. Usulkan exact target files dan dampaknya.
6. Jika user meminta update DevBrain secara langsung, permintaan tersebut menjadi authorization untuk perubahan low/medium-risk. Tampilkan proposal terlebih dahulu hanya untuk perubahan high-risk, penghapusan safety penting, atau perubahan yang maknanya ambigu.
7. Terapkan perubahan, validasi routing dan cross-file consistency, lalu bangun ulang `runtime/full-context.md`. Perbarui `runtime/core-compact.md` bila perubahan mengubah baseline fallback.
8. Pastikan bootstrap dan dokumentasi session lifecycle tetap menyatakan load sekali per session; jangan mengubahnya menjadi reread setiap turn.
9. Perbarui changelog dan runtime. Perbarui source snapshot hanya jika user memberikan source document baru atau secara eksplisit meminta revisi DOCX.

Jangan melakukan sinkronisasi otomatis yang menimpa core. Informasi project-specific yang ditemukan di DOCX harus diarahkan ke project template/context, bukan dipromosikan menjadi global rule.

## Review triggers

- Preferensi atau workflow berubah signifikan.
- Kesalahan AI yang sama muncul berulang.
- Rule terlalu kaku, terlalu umum, atau membuat UI generik.
- Adapter tidak lagi sesuai perilaku tool.
- Review berkala setelah penggunaan nyata.
