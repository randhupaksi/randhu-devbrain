# Data and API Protection

## Prinsip

Keamanan backend bukan alasan untuk membuat AI pasif. AI harus mengembangkan feature secara aman dengan membaca trust boundary, menjaga data, dan memvalidasi behavior. Strict confirmation hanya diperlukan sebelum side effect high-risk yang belum diotorisasi, terutama pada data client/production dan security-sensitive operation.

## Trust boundaries

Anggap input dari client, query string, header, webhook, file upload, external API, queue payload, dan environment external sebagai data yang perlu divalidasi sesuai contract. Jangan mempercayai role, tenant ID, price, status, ownership, atau permission yang datang dari client tanpa server-side verification.

## Privacy and secrets

- Jangan menampilkan, log, fixture-kan, dokumentasikan, atau commit secret, access token, password, private key, cookie, credential, atau connection string nyata.
- Jangan memakai data client/user nyata sebagai contoh, test fixture, atau seed default.
- Minimalkan data sensitif pada response dan error; kembalikan hanya field yang diperlukan actor tersebut.
- Hindari log request/response mentah bila dapat membawa PII, token, atau payload sensitif.

## Authorization and isolation

- Terapkan auth dan authorization di server-side sesuai middleware/pattern project.
- Periksa role, ownership, tenant/client scope, dan permission pada read maupun write yang sensitif.
- Jangan membuat fallback yang memperluas akses atau bypass sementara demi testing.
- Periksa query dan mutation agar tenant/client tidak dapat mengakses data lain melalui identifier yang dimanipulasi.

## Mutation and migration safety

- Klasifikasikan environment, ownership data, blast radius, reversibility, dan rollback sebelum mutasi.
- Local/test/development dengan dummy/anonymized data boleh dipakai untuk validasi proporsional.
- Staging/shared environment memerlukan awareness terhadap pengguna lain dan prosedur project.
- Production/client data, bulk mutation, destructive delete, irreversible migration, reseed, dan repair script adalah high-risk sampai terbukti sebaliknya.
- Migration file, rollback plan, dry-run, dan test dapat dibuat tanpa menjalankan migration pada data nyata.

## Secure implementation baseline

- Gunakan validation, parameterized query/ORM pattern, escaping, upload limits, dan error handling dari stack project.
- Jangan menambah crypto buatan sendiri, insecure random, hardcoded secret, open redirect, permissive CORS, atau debug endpoint tanpa bukti kebutuhan dan review keamanan yang proporsional.
- Rate limiting, webhook signature validation, CSRF, file scanning, encryption, dan audit logging diterapkan sesuai threat model serta stack project; jangan ditambahkan secara ritual tanpa kebutuhan yang jelas.

## Security finding handling

Jika AI menemukan indikasi secret terekspos, authorization bypass, cross-tenant leak, destructive operation target yang tidak jelas, atau production data risk, jangan memperluas exposure. Hentikan action berisiko, jelaskan fakta minimum yang aman, dan minta arahan hanya untuk remediation atau side effect high-risk yang belum diotorisasi.
