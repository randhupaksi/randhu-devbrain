---
name: file-storage-uploads
description: Implement file upload/download lifecycles, object storage, access checks, and safe processing. Use for file trust boundaries and storage behavior; decorative image styling belongs to UI work.
---

# File Storage and Uploads

Own file validation, ownership, storage lifecycle, and protected delivery. Start with the requested outcome, the active project instructions, and the smallest relevant implementation/consumer slice. Use the project's stack and conventions; a skill name does not mandate a library or architecture.

## Work from evidence

- Map upload initiation, transfer, validation, processing, persistence and download. Define who owns the object and which state makes it safe and available.
- Treat filename, extension, MIME declaration, content and size as separate evidence. Enforce limits at the actual boundary and use safe server-generated object keys instead of trusting client paths.
- Bind signed operations to expected object, owner, method and expiry using the provider mechanism. An opaque key or signed URL is not a substitute for application access checks.
- Keep untrusted content quarantined where required; processing failures must not mark it available. Control served content type/disposition and isolate active content according to the application threat model.
- Handle abandoned multipart uploads, orphaned objects, database/object-store partial failure, retention and deletion races. Preparing lifecycle rules does not authorize deleting live objects or changing bucket access.

## Verify the outcome

Choose severity from actual asset sensitivity, attacker reachability and surrounding controls. Redact denied object keys, signed URLs and owner identifiers in telemetry; raw rejected input may itself expose sensitive data. Missing source evidence should stay conditional in the finding.

Check mismatched type, oversized input, traversal-like names, cross-tenant object access, expired signatures and processing failures with synthetic files. Never fetch real private objects as fixtures.

Review and audit requests produce findings without edits. Implementation requests include the authorized change and proportionate verification. Use synthetic fixtures; never copy secrets or client data into artifacts. Existing authorization for a specific target/scope remains valid, while destructive data operations, security-boundary changes, deployment, external sends and Git mutations retain their protected boundaries. Do not stop safe analysis or preparation merely because a later execution boundary needs approval.

## Collaborate by artifact

- Consider `auth-security` only for a distinct requested subtask; pass object ownership and download authorization policy.
- Consider `application-security-review` only for a distinct requested subtask; pass untrusted active-content processing path.
- Consider `background-jobs-queues` only for a distinct requested subtask; pass file processing state and durable retry identity.

These are optional handoffs to available skills, not dependencies or an automatic chain. Keep ordinary supporting work within this skill. Report the changed behavior, actual evidence, relevant assumptions and remaining limits in the requested format; do not announce a plan or score for a text-only deliverable.
