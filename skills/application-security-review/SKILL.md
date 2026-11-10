---
name: application-security-review
description: Review application trust boundaries and exploitable weaknesses, then harden specifically authorized scope. Use for vulnerability analysis; identity-policy work belongs to auth security.
---

# Application Security Review

Own evidence-backed vulnerability findings and scoped hardening. Start with the requested outcome, the active project instructions, and the smallest relevant implementation/consumer slice. Use the project's stack and conventions; a skill name does not mandate a library or architecture.

## Work from evidence

- Identify untrusted inputs, privileged operations, sensitive assets, and the boundaries between them. Trace data from source to dangerous sink rather than flagging strings or dependency names alone.
- Assess relevant attack paths: injection, unsafe rendering, SSRF, path traversal, unsafe deserialization, upload handling, authorization bypass and secret exposure. Select by actual reachability.
- For each finding establish attacker capability, entry point, missing control, impact, and a minimal synthetic reproduction. Separate demonstrated vulnerability from an unverified hypothesis.
- Use existing parameterization, encoding, validation and safe library primitives. Do not disable validation, certificate checks or authorization to bypass a failing test.
- Keep audits read-only. Hardening authorization must cover the affected security boundary. Avoid live exploit traffic, real payload exfiltration and recording secrets; continue source review safely.

## Verify the outcome

Do not turn absent evidence into a confirmed missing control or assume an endpoint is anonymous. With only a design description, explain conditional attack paths and required evidence; unverified generic concerns belong in checks, not a list of demonstrated vulnerabilities. A check item does not become a finding merely because the pattern often has that weakness.

For a source-free image-proxy description, unknown egress controls and destination validation mean internal reachability is unverified. Label the first finding sentence conditional; accepting URLs and following redirects alone does not confirm an exploitable internal fetch. Reserve confirmed for a reachable path supported by actual control/source or permitted reproduction evidence.

Verify the exploit condition is blocked and a legitimate flow still works. A dependency scan or absence of one payload is not proof the whole application is secure.

Review and audit requests produce findings without edits. Implementation requests include the authorized change and proportionate verification. Use synthetic fixtures; never copy secrets or client data into artifacts. Existing authorization for a specific target/scope remains valid, while destructive data operations, security-boundary changes, deployment, external sends and Git mutations retain their protected boundaries. Do not stop safe analysis or preparation merely because a later execution boundary needs approval.

## Collaborate by artifact

- Consider `auth-security` only for a distinct requested subtask; pass identity or tenant-policy finding requiring policy review.
- Consider `file-storage-uploads` only for a distinct requested subtask; pass reachable file trust-boundary finding.
- Consider `code-review` only for a distinct requested subtask; pass verified vulnerability with source location and reproduction.

These are optional handoffs to available skills, not dependencies or an automatic chain. Keep ordinary supporting work within this skill. Report the changed behavior, actual evidence, relevant assumptions and remaining limits in the requested format; do not announce a plan or score for a text-only deliverable.
