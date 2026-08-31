# Performance Philosophy

Performance mencakup metrik teknis dan perceived experience. Input delay, button response lambat, sidebar/modal berat, navigation tersendat, table lag, animation patah, loading tanpa feedback, dan UI freeze adalah masalah nyata meskipun fitur akhirnya berjalan.

## Evidence before optimization

Cari gejala dan penyebab sebelum mengubah struktur. Gunakan evidence seperti profiler, network activity, render behavior, bundle analysis, console, timing, atau reproducible observation. Jangan mengklaim improvement tanpa validasi.

## Tools secara proporsional

- Memoization untuk computation/identity yang terbukti menyebabkan render tidak perlu.
- Lazy loading/dynamic import untuk feature atau library berat yang tidak diperlukan saat initial load.
- Cache untuk data yang dapat digunakan ulang, dengan invalidation yang aman.
- Virtualization, pagination, atau batching bila volume data benar-benar membutuhkannya.

Jangan menambahkan optimization primitive hanya agar kode terlihat optimal. Maintainability dan correctness tetap dijaga.

Optimasi yang menyentuh fetching architecture, global state, shared component, atau banyak file harus melalui impact analysis dan validation plan. Jika optimasi tersebut memang diminta dan tidak melewati high-risk boundary, implementasikan tanpa approval tambahan.
