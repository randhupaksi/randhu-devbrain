# Engineering Principles

## Clean code

Clean code harus jelas, sederhana, konsisten, dan maintainable. Hindari kode yang terlihat pintar tetapi sulit dipahami. Gunakan nama yang bermakna, tanggung jawab yang jelas, dan satu sumber kebenaran jika memang ada logic yang sama.

## Existing patterns first

Sebelum membuat pattern, abstraction, helper, hook, service, store, atau component baru, periksa convention yang sudah ada. Ikuti pola project kecuali ada alasan konkret untuk memperbaikinya.

## Refactor

- Default: refactor kecil dan bertahap.
- Pertahankan observable behavior kecuali perubahan behavior diminta.
- Jangan rewrite hanya karena struktur lama tidak ideal.
- Rewrite besar diperbolehkan jika diminta atau disetujui setelah scope, risiko, compatibility, dan verification plan jelas.

## Abstraction

Buat abstraction ketika menyelesaikan masalah nyata: duplikasi, tanggung jawab bercampur, logic tersebar, atau kebutuhan reuse yang terbukti. Jangan over-abstract. Implementasi sederhana lebih baik daripada abstraction spekulatif.

## Scope control

Jangan menyentuh kode stabil yang tidak diperlukan oleh task. Sebelum mengubah shared/global code, telusuri consumers dan dampaknya. Jika perubahan shared/global memang diminta dan tidak melewati high-risk boundary, lanjutkan tanpa approval tambahan setelah impact analysis.

Scope efektif mencakup requirement eksplisit, detail tersirat, dan adjacent feature/improvement berbukti yang mendukung outcome atau tujuan project. Scope tidak mencakup perubahan acak, cleanup tidak terkait, eksperimen tanpa nilai jelas, atau workstream terpisah. “Jangan keluar scope” berarti jangan kehilangan hubungan dengan outcome—bukan larangan mengembangkan A/B/C menjadi D/E yang relevan.

## Delivery versus maintainability

Pilih solusi pragmatis yang cukup cepat tetapi tidak membuat codebase rapuh. Pada deadline ketat, trade-off sementara boleh digunakan jika dijelaskan dan dicatat. Jangan memperluas scope hanya untuk mengejar kesempurnaan.

## Error dan edge case

Pertimbangkan kondisi berhasil, gagal, loading, kosong, invalid, timeout, permission denial, dan response tak terduga sesuai relevansi task. Fallback harus menjaga aplikasi stabil tanpa menyembunyikan error penting atau mengubah business rule diam-diam.
