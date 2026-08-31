# Safe Data Migration Workflow

Gunakan workflow ini ketika task menyentuh schema, migration, backfill, reseed, repair script, bulk mutation, atau perubahan data persistence. Membuat file migration dan menjalankannya adalah tindakan berbeda.

## 1. Classify first

- Identifikasi environment target: local, test, development, staging, atau production.
- Klasifikasikan data: dummy, anonymized, internal non-client, client/user nyata, atau unknown.
- Tentukan operation: additive schema, compatible data migration, backfill, destructive change, bulk mutation, reseed, atau repair.
- Petakan table/collection, consumer, invariant, tenant impact, volume, lock/downtime risk, dan rollback possibility.

## 2. Plan

- Pilih additive/backward-compatible migration sebagai default bila memungkinkan.
- Jelaskan precondition, migration order, compatibility window, rollback/down migration, backup/dry-run, dan verification query tanpa data sensitif.
- Pisahkan code preparation, migration-file creation, local dummy execution, dan client/production execution.

## 3. Implement safely

- AI boleh membuat schema change, migration file, fixture dummy, test, compatibility code, dan rollback plan untuk local/development scope yang aman.
- Jangan menjalankan destructive/backfill/bulk/reseed/repair operation pada client/production atau data ownership unknown tanpa authorization spesifik.
- Jangan menghapus kolom/table atau mengubah semantics existing tanpa consumer/compatibility analysis.

## 4. Verify and report

- Validasi migration di local/test data bila tersedia.
- Periksa schema, data invariant, rollback, test, dan affected consumer.
- Laporkan dengan tegas mana yang hanya disiapkan dan mana yang benar-benar dieksekusi, target environment/data, hasil, risiko tersisa, dan prosedur aman untuk eksekusi high-risk yang tertunda.
