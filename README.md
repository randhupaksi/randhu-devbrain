# DevBrain

DevBrain adalah personal developer knowledge layer milik Randhu Paksi untuk AI coding assistant. DevBrain bukan model AI, agent baru, atau satu prompt besar. DevBrain menyimpan prinsip global, decision framework, workflow, dan safety boundary yang relatif stabil agar AI memahami cara Randhu bekerja tanpa mengulang prompt panjang di setiap sesi.

DevBrain tidak menyimpan identitas visual atau aturan teknis khusus satu project. Warna brand, stack, target user, business rules, API contract, layout density, dan design token tetap berada di `AGENTS.md`, `CLAUDE.md`, atau project context repository yang bersangkutan.

## Cara membaca

1. Muat `runtime/full-context.md` sebagai operational profile lengkap.
2. Baca instruksi project yang aktif untuk fakta dan constraint repository.
3. Gunakan modul canonical individual hanya saat perlu memeriksa sumber atau melakukan update DevBrain.

Runtime dimuat satu kali pada awal coding session dan dipakai kembali selama session tersebut. Minta reload hanya jika context terpotong, DevBrain berubah, project berganti, atau kamu ingin AI memahami ulang DevBrain secara eksplisit.

## Instalasi lintas-device

Clone repository tidak otomatis memasang loader ke Codex atau Claude. Pada device baru, jalankan satu kali:

```powershell
.\install\install-bootstrap.ps1
```

Installer mendeteksi lokasi repository dan `$HOME` device aktif, membuat backup loader lama, memasang skill custom dari folder `skills/`, serta hanya mengelola managed block DevBrain pada konfigurasi global Codex dan Claude. Setelah update repository, jalankan `install\update-bootstrap.ps1`. AI boleh mendeteksi bootstrap yang belum terpasang dan menawarkan setup, tetapi tidak boleh mengubah konfigurasi global secara diam-diam.

Full operational context mencakup seluruh core, safety, workflow, precedence, dan prompt command. Folder `source/`, DOCX, adapter documentation, project templates, serta maintenance docs tidak dimuat karena bukan aturan keputusan coding runtime.

## Skills

Source skill custom yang version-controlled berada di `skills/`:

- `enterprise-ui-ux`: dashboard, admin, CRUD, dan aplikasi enterprise;
- `marketing-portfolio-ui-ux`: landing page, portfolio, dan marketing surface;
- `design-system-architect`: design system, token, dan shared component;
- `architecture-refactor`: refactor struktur frontend dan backend/API.

Jangan menyalin isi skill ke `runtime/full-context.md`. Bootstrap hanya mengarahkan agent ke runtime global; skill dipakai secara selektif agar context tetap efisien.

## Prinsip inti

- Context first: pahami project, task, dan kondisi existing sebelum bertindak.
- Safety first: lindungi data client, business logic, API, auth, permission, Git, dan sistem operasi.
- Quality first: hasil harus benar, maintainable, dan matang sesuai konteks.
- Project identity first: konsistensi ada pada kualitas dan cara berpikir, bukan template visual yang sama.
- Design-system-first: untuk pekerjaan UI, AI menemukan Visual DNA, token/theme, dan component pattern project sebelum membangun halaman; foundation dibentuk secara proporsional ketika memang diperlukan.
- Contract-first backend: untuk API/backend, AI menemukan contract, consumer, authorization, data boundary, dan architecture project sebelum mengubah behavior; coding local/development tetap otonom, sedangkan mutation data client/production tetap terlindungi.
- Git explicit by default: list command Git selalu berupa teks yang dipisah per feature dengan file spesifik dan commit message meaningful; `add`, `commit`, dan `push` hanya dieksekusi jika user memberi instruksi eksplisit untuk operasi tersebut.
- Autonomous by default: low/medium-risk berjalan tanpa approval tambahan; approval hanya untuk batas high-risk atau dampak yang belum diotorisasi secara eksplisit.

## Status operasional

DevBrain aktif menggunakan Markdown dan YAML sebagai canonical operational source. Developer Specification DOCX v0.1 tetap menjadi historical foundation. CLI, notification system, logs/daily summary, dan GUI sengaja belum dibuat.

## Lokasi

Lokasi canonical personal:

`<DEVBRAIN_ROOT>`

Path canonical ditentukan oleh lokasi repository pada device aktif. Jangan hardcode username, drive letter, atau folder laptop tertentu pada template maupun runtime.
