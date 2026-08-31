# Git Command Listing Workflow

Gunakan workflow ini ketika Randhu meminta “list command Git”, “kasih command Git”, “buat command add commit push”, atau permintaan sejenis. Permintaan tersebut berarti **buat daftar command sebagai teks**, bukan izin untuk menjalankan `git add`, `git commit`, `git push`, atau mutasi Git lain.

## 1. Inspect read-only

- Periksa repository, branch, `git status`, diff, dan perubahan staged bila relevan.
- Bedakan perubahan milik task aktif dari perubahan pengguna yang tidak terkait atau belum dapat dipahami.
- Jangan mengubah staging area atau file saat menyiapkan daftar command.

## 2. Group by logical change

Pecah command berdasarkan feature, bug fix, refactor, test, documentation, atau perubahan logis yang independen. Satu kelompok commit harus dapat dijelaskan sebagai satu perubahan yang coherent dan dapat direview sendiri.

Gunakan domain/feature sebagai pengelompokan, bukan nama halaman atau section teknis. Contoh yang baik:

- `attendance` untuk alur check-in/check-out;
- `attendance-report` untuk export laporan absensi;
- `outlet-export` untuk export data outlet;
- `auth` untuk perubahan login/registration;
- `payment` untuk flow pembayaran.

Jangan memakai label terlalu umum seperti `dashboard`, `page`, `section`, `misc`, `update`, atau nama file kecuali memang domain produknya hanya itu. Jika satu perubahan tidak dapat dipisah tanpa membuat code rusak, letakkan seluruh file pendukung dalam satu commit feature yang sama dan jelaskan alasannya secara singkat.

## 3. Build command list

Untuk setiap kelompok, output harus memuat:

1. nomor dan nama feature/perubahan dalam bahasa yang mudah dibaca;
2. ringkasan satu kalimat tentang behavior/outcome yang berubah;
3. `git add --` dengan **path file spesifik** yang hanya milik kelompok tersebut;
4. `git commit -m` dengan Conventional Commit berbahasa Inggris yang spesifik.

Gunakan `git add -- <file...>`, bukan `git add .`, `git add -A`, atau wildcard luas. Jangan memasukkan file tidak terkait hanya agar seluruh worktree menjadi bersih.

Commit subject harus menyebut tipe, domain/feature, dan outcome. Gunakan bentuk imperative dan spesifik, misalnya:

```powershell
git commit -m "feat(attendance): add employee check-in and check-out flow"
git commit -m "fix(attendance): prevent duplicate daily check-ins"
git commit -m "feat(outlet-export): export filtered outlet records"
git commit -m "refactor(payment): isolate invoice status mapping"
```

Pilih tipe commit yang tepat: `feat`, `fix`, `refactor`, `test`, `docs`, `perf`, `chore`, atau tipe yang sudah ditetapkan project. Jangan memakai pesan seperti `update dashboard`, `fix page`, `changes`, atau `final update`.

Setelah semua kelompok commit, tampilkan satu `git push` sebagai command teks. Satu push di akhir biasanya cukup karena akan mengirim seluruh commit yang baru dibuat. Jika branch/upstream belum dapat dipastikan, nyatakan kondisi itu; jangan menebak remote atau branch.

## 4. Execution semantics

- “List command Git” selalu text-only, walaupun daftar tersebut berisi `git add`, `git commit`, dan `git push`.
- “Buat commit message” atau `commit-msg` juga text-only.
- Izin untuk satu operasi tidak otomatis mengizinkan operasi berikutnya. Izin menjalankan `git add` tidak mengizinkan commit atau push; izin commit tidak mengizinkan push.
- AI hanya menjalankan Git mutating command bila prompt aktif memakai kata kerja eksekusi yang jelas dan menyebut operasi yang diizinkan, misalnya “jalankan git add dan commit”, atau “jalankan git add, commit, lalu push”.
- Bahkan saat ada izin eksekusi, periksa status, target repository, branch, staged files, dan scope sebelum bertindak. Jangan menambahkan perubahan pengguna yang tidak terkait.
- `git push`, remote/history changes, force push, merge, rebase, amend, reset, dan operasi destruktif tetap memerlukan instruksi eksplisit yang sesuai. Jangan menganggap permintaan coding, “selesaikan task”, atau “list command” sebagai izin.

## 5. Output format

Gunakan format berikut saat diminta listing:

```powershell
# 1. Attendance — employee check-in and check-out flow
git add -- src/modules/attendance/AttendanceForm.tsx src/services/attendance.service.ts
git commit -m "feat(attendance): add employee check-in and check-out flow"

# 2. Attendance — prevent duplicate daily check-ins
git add -- src/modules/attendance/attendance.validation.ts src/services/attendance.service.ts
git commit -m "fix(attendance): prevent duplicate daily check-ins"

# Push all completed feature commits
git push
```

Tambahkan catatan singkat bila ada file tidak dapat dikelompokkan dengan aman, perubahan pengguna yang tidak terkait, validation yang belum dilakukan, atau upstream yang belum dikonfigurasi. Jangan menjalankan command tersebut.
