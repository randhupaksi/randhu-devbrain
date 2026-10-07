# Verification and Reporting

## Verification

For substantial tasks with uncertain completion criteria, select relevant checks from [definition of done](definition-of-done.md). For reported defects, use [debugging](debugging.md) to distinguish hypotheses from confirmed causes. Reuse active modules; do not load these for every small change.

Choose checks based on project and risk:

- Review the diff for every change.
- Use lint/typecheck for static correctness.
- Use unit/integration/end-to-end tests for behavior.
- Build to check integration/bundling.
- Use browser/runtime/console/network checks for UI and APIs.
- Require performance evidence for optimization claims.
- Manually check visual feel or flows that cannot be automated.

Audit every added/changed line against active project rules. Check compliance per property/contract; do not infer it for an entire component/file. If only part of a change follows the rules, report partial compliance and identify remaining violations.

For frontend/UI, also check the visual source of truth, hardcoded values, repeated markup, component boundaries, shared-consumer impact, UX states, responsive behavior, accessibility, and Project Visual DNA fit. Lint/typecheck alone does not prove polish or design-system compliance; perform visual/runtime verification when available.

For backend/API, check each request/response/error contract, validation, authentication/permissions/tenant scope, consumer compatibility, data invariants, relevant transactions/idempotency/concurrency, secret/privacy exposure, migration boundaries, and test coverage. A happy-path request alone does not prove an endpoint is safe; use proportionate negative and integration evidence.

Audit requirement coverage:

- Mark every explicit requirement implemented, partially implemented, blocked, or intentionally unchanged.
- Check implied details against the precedent used.
- State assumptions that affect the result.
- Separate additional quality improvements from the main requirement.
- Ensure no unsupported business capability was introduced.
- In UI reports, distinguish shared foundations (tokens/primitives/patterns) from feature-local composition.
- In backend reports, distinguish prepared code/migrations from data side effects actually executed.

Do not fix existing out-of-scope issues merely to make validation appear successful. When local cleanup is truly needed to validate the change, treat it as prerequisite cleanup and report it separately. Distinguish existing failures from regressions caused by the change.

Read-only means no mutation. Relevant diagnostic inspection—reading files, search, `git status`, `git diff`, non-mutating lint, and inspection commands—is still allowed.

Do not claim a validation that was not run. Record failed commands and distinguish existing failures from regressions.

## Final report

Adapt reporting to the task. A small task needs only the outcome, changed files, and validation. A complex/high-risk task should include behavior, evidence, assumptions, risk, and remaining manual checks. Do not make a report long just to appear thorough.

Use these fields as needed: outcome; changed files and summary by file/group; behavior changes or what was preserved; validation commands/checks and results; risks, assumptions, and remaining manual checks; evidence/precedent used to resolve material ambiguity; commit message only if requested.

For a Git command listing, separate each feature/logical change, list exact files to stage, and use a Conventional Commit message that names the domain and outcome. State that commands are text-only and never claim a commit/push occurred.

Distinguish changed files from files only read and follow-up recommendations when it helps review.
