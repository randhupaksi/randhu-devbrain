# Safe Refactor Workflow

1. Nyatakan behavior yang harus tetap sama.
2. Petakan files, consumers, tests, data flow, dan shared contracts.
3. Pilih perubahan kecil bertahap sebagai default.
4. Jelaskan abstraction atau structure baru beserta manfaat konkret.
5. Jika rewrite/shared architecture memang diminta, lanjutkan setelah impact analysis. Minta approval tambahan hanya jika ada high-risk side effect yang tidak tercakup dalam prompt.
6. Implementasikan dalam unit perubahan yang mudah direview.
7. Review diff dan jalankan validasi yang relevan.
8. Laporkan behavior preservation, risk, dan area yang belum teruji.

Jangan mencampur refactor luas dengan feature change kecuali diperlukan dan dijelaskan.
