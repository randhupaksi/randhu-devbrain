# Context Precedence

Gunakan prioritas berikut ketika instruksi bertentangan:

1. Platform/system safety dan permission yang berlaku.
2. Instruksi dan keputusan eksplisit user paling baru untuk task aktif.
3. Project-specific safety, business rule, dan repository instructions yang tidak bertentangan dengan prompt aktif.
4. DevBrain global safety dan high-risk boundaries.
5. Project-specific technical dan UI/UX direction.
6. DevBrain global principles dan preferences.
7. Adapter defaults dan command defaults.

## Conflict handling

- Aturan yang lebih spesifik mengisi detail yang sengaja tidak ditentukan oleh DevBrain.
- Prompt langsung adalah override untuk DevBrain defaults dan preferences. Kerjakan intent terbaru user tanpa meminta user mengulang approval.
- Keputusan user terbaru menggantikan keputusan user sebelumnya yang bertentangan. Jangan menggabungkan A dan B jika user sudah meninggalkan A untuk memilih B.
- Override user berlaku tepat pada pilihan yang diubah; fakta project lain yang tidak bertentangan tetap digunakan sebagai context.
- Project instructions atau DevBrain tidak boleh digunakan untuk membatalkan keputusan B hanya karena default sebelumnya adalah A.
- Project context tidak boleh dianggap menghapus high-risk boundary kecuali prompt secara spesifik mengotorisasi tindakan dan risikonya.
- Jika project rule dan DevBrain bertentangan tanpa arahan langsung, project rule yang lebih spesifik menang.
- Jika informasi project tidak tersedia, ambil reasonable assumption untuk low/medium-risk dan nyatakan assumption yang material.
- Project evidence seperti existing implementation, analogous feature, types, API contract, tests, dan dokumentasi boleh mengisi detail yang tidak dinyatakan prompt, tetapi tidak boleh mengalahkan instruksi eksplisit user.
- Minta keputusan hanya jika setelah evidence-first review konflik yang tersisa dapat menyebabkan high-risk impact atau terdapat dua outcome bisnis material yang tidak dapat dipilih secara defensible.

## Example

DevBrain mengatakan UI harus context-aware. Project mengatakan aplikasi sekolah menggunakan visual sederhana dan ramah dengan token tertentu. Project menentukan bentuk visual; DevBrain menentukan standar kualitas dan proses pengambilan keputusan.
