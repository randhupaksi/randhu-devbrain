---
name: auth-security
description: Design or review authentication, sessions, authorization, role policies, and tenant isolation. Use when identity or access behavior is the outcome; broad vulnerability reviews use application security review.
---

# Auth Security

Own identity, session lifecycle, access policy, and tenant isolation. Start with the requested outcome, the active project instructions, and the smallest relevant implementation/consumer slice. Use the project's stack and conventions; a skill name does not mandate a library or architecture.

## Work from evidence

- Map actors, resources, tenant membership, authentication mechanism, and server-side policy enforcement. Separate being authenticated from permission to act on a particular object.
- Trace session creation, rotation, expiry, logout and revocation across server and client. Match cookie, token, CSRF and origin protections to the actual transport and threat model.
- Enforce ownership and tenant filters at every resource lookup, including background work, exports and signed downloads. Client-hidden controls are not enforcement.
- For OAuth/OIDC, use the project provider/library and current official documentation. Check redirect validation, state/nonce, PKCE where applicable, issuer/audience and callback handling; do not invent token-validation code.
- Prepare policy changes with an explicit actor-resource-action matrix and migration impact. Read-only review can proceed; actual security-boundary changes need specific authorization already covering the target and scope.

## Verify the outcome

A missing filter in a snippet is a conditional exposure until middleware, query scoping and database policies are traced. State that condition in the finding itself; do not assert that every authenticated user can access other tenants solely from an incomplete snippet. Follow the project's non-disclosure and forbidden/not-found response policy rather than mandating 404 or 403 universally.

Check anonymous, wrong role, wrong tenant, revoked/expired session, cross-object access and concurrent session transitions in isolated tests. Do not test real accounts or copy tokens into fixtures.

Review and audit requests produce findings without edits. Implementation requests include the authorized change and proportionate verification. Use synthetic fixtures; never copy secrets or client data into artifacts. Existing authorization for a specific target/scope remains valid, while destructive data operations, security-boundary changes, deployment, external sends and Git mutations retain their protected boundaries. Do not stop safe analysis or preparation merely because a later execution boundary needs approval.

## Collaborate by artifact

- Consider `application-security-review` only for a distinct requested subtask; pass identity trust boundaries and suspected exploit path.
- Consider `backend-feature-engineering` only for a distinct requested subtask; pass approved actor-resource-action matrix.

These are optional handoffs to available skills, not dependencies or an automatic chain. Keep ordinary supporting work within this skill. Report the changed behavior, actual evidence, relevant assumptions and remaining limits in the requested format; do not announce a plan or score for a text-only deliverable.
