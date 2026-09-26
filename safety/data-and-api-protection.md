# Data and API Protection

## Principles

Backend security is not a reason to make the AI passive. Build requested features safely by understanding trust boundaries, protecting data, and validating behavior. Specific confirmation is required before an unauthorized high-risk change or execution, including authentication/permission/security-boundary changes, breaking APIs, destructive migrations, and client/production data operations.

## Trust boundaries

Treat client input, query strings, headers, webhooks, file uploads, external APIs, queue payloads, and external environment values as data that must be validated against the contract. Do not trust a client-supplied role, tenant ID, price, status, ownership, or permission without server-side verification.

## Privacy and secrets

- Never display, log, fixture, document, or commit real secrets, access tokens, passwords, private keys, cookies, credentials, or connection strings.
- Never use real client/user data as examples, test fixtures, or default seeds.
- Minimize sensitive fields in responses and errors; return only fields needed by that actor.
- Avoid raw request/response logs that may contain PII, tokens, or sensitive payloads.

## Authorization and isolation

- Enforce authentication and authorization server-side using project middleware/patterns.
- Check role, ownership, tenant/client scope, and permission on sensitive reads and writes.
- Do not add fallbacks that broaden access or temporary authentication bypasses for testing.
- Check queries and mutations to prevent one tenant/client from accessing another's data through a manipulated identifier.

## Mutation and migration safety

- Classify environment, data ownership, blast radius, reversibility, and rollback before mutation.
- Local/test/development with dummy/anonymized data may be used for proportionate validation.
- Staging/shared environments require awareness of other users and project procedures.
- Treat production/client data, bulk mutations, destructive deletion, irreversible migrations, reseeds, and repair scripts as high risk unless established otherwise.
- Safely prepare a required additive migration file, rollback plan, and synthetic tests. Destructive migrations/data rewrites require specific confirmation. Do not assume a dry-run tool is safe before checking its side effects.

## Secure implementation baseline

- Use the project stack's validation, parameterized queries/ORM patterns, escaping, upload limits, and error handling.
- Do not add custom cryptography, insecure randomness, hardcoded secrets, open redirects, permissive CORS, or debug endpoints without evidence of need and proportionate security review.
- Apply rate limiting, webhook signature validation, CSRF protection, file scanning, encryption, and audit logging according to the threat model and project stack; do not add them as ritual without a clear need.

## Handling security findings

If you find a likely exposed secret, authorization bypass, cross-tenant leak, unclear destructive-operation target, or production data risk, do not increase exposure. Stop the risky action, explain the minimum safe facts, and ask only for remediation direction or an unauthorized high-risk side effect.
