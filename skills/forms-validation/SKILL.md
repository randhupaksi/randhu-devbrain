---
name: forms-validation
description: Implement complex form behavior, shared validation, async checks, and server error mapping. Use for submission and data correctness; ordinary form styling stays with the UI skill.
---

# Forms and Validation

Own form data, validation, submission, and error recovery. Start with the requested outcome, the active project instructions, and the smallest relevant implementation/consumer slice. Use the project's stack and conventions; a skill name does not mandate a library or architecture.

## Work from evidence

- Read the input schema, API validation, default values, edit/create differences and user-visible constraints. Server validation remains authoritative; client checks improve feedback.
- Distinguish missing, empty, zero, false and null; preserve numeric precision, locale parsing, time zones and units. Do not coerce invalid input into an apparently valid default.
- Model dirty/touched state, dependencies between fields, dynamic arrays, async validation and pending submission. Cancel or ignore outdated async results.
- Map field and form-level server errors without losing user input. Preserve labels, error associations, keyboard behavior, focus to relevant errors and announcement timing.
- Prevent accidental duplicate submission while retaining server-side idempotency when required. Handle file fields, hidden conditional fields, reset and edit concurrency according to the established contract.

## Verify the outcome

Associate a server response with its submission and field versions. Keep a snapshot for reconciliation, but never restore it over edits the user made while the request was pending. Treat normalization, numeric coercion and null-as-clear semantics as contract decisions rather than choosing fallback values by convenience.

Check boundary values, cross-field failures, stale async checks, server rejection, partial input preservation and keyboard correction flows. Do not loosen validation merely to make a form submit.

Review and audit requests produce findings without edits. Implementation requests include the authorized change and proportionate verification. Use synthetic fixtures; never copy secrets or client data into artifacts. Existing authorization for a specific target/scope remains valid, while destructive data operations, security-boundary changes, deployment, external sends and Git mutations retain their protected boundaries. Do not stop safe analysis or preparation merely because a later execution boundary needs approval.

## Collaborate by artifact

- Consider `api-contracts` only for a distinct requested subtask; pass unresolved request semantics or error mapping.
- Consider `frontend-state-management` only for a distinct requested subtask; pass cross-route draft or server cache lifecycle.
- Consider `accessibility-audit` only for a distinct requested subtask; pass material focus or announcement barrier.

These are optional handoffs to available skills, not dependencies or an automatic chain. Keep ordinary supporting work within this skill. Report the changed behavior, actual evidence, relevant assumptions and remaining limits in the requested format; do not announce a plan or score for a text-only deliverable.
