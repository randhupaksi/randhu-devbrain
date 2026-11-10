---
name: code-review
description: Review diffs for actionable bugs, regressions, contract violations, and security impact using source evidence. Review requests stay read-only; cosmetic preferences alone are not defects.
---

# Code Review

Own actionable findings on a bounded change and its consumers. Start with the requested outcome, the active project instructions, and the smallest relevant implementation/consumer slice. Use the project's stack and conventions; a skill name does not mandate a library or architecture.

## Work from evidence

- Establish the requested branch/diff scope and staged versus unstaged state. Read the changed code plus enough callers, types and tests to establish reachability and intended behavior.
- Prioritize correctness and impact: changed conditions, state transitions, error handling, compatibility, authorization, concurrency and resource lifecycle. Do not turn a small review into an unrelated audit.
- A finding needs a concrete trigger, evidence-backed failure path, user/system consequence and precise source location. Separate confidence and severity; do not manufacture findings to fill a quota.
- Check whether a test actually exercises the failure and whether a migration or deployment ordering assumption is satisfied. Avoid treating missing tests alone as proof of a product bug.
- Return findings first with affected file/line and a concise explanation, then material open questions and test limits. If no actionable defect is found, say so and identify the scope reviewed. Fixes require implementation intent.

## Verify the outcome

When only an operator or condition is supplied, describe the demonstrable branch change and keep downstream effects conditional. Do not invent an error, data loss or default assignment from an unseen branch, and scale severity to the actual reachable impact.

When safe, use focused reproduction or existing tests for disputed findings. Report whether a claim is reproduced, inferred or unresolved. Never claim the entire application is correct because the inspected diff has no findings.

Review and audit requests produce findings without edits. Implementation requests include the authorized change and proportionate verification. Use synthetic fixtures; never copy secrets or client data into artifacts. Existing authorization for a specific target/scope remains valid, while destructive data operations, security-boundary changes, deployment, external sends and Git mutations retain their protected boundaries. Do not stop safe analysis or preparation merely because a later execution boundary needs approval.

## Collaborate by artifact

- Consider `application-security-review` only for a distinct requested subtask; pass reachable suspected vulnerability needing focused threat analysis.
- Consider `testing-strategy` only for a distinct requested subtask; pass concrete missing regression scenario.
- Consider `project-documentation` only for a distinct requested subtask; pass verified stale public contract documentation.

These are optional handoffs to available skills, not dependencies or an automatic chain. Keep ordinary supporting work within this skill. Report the changed behavior, actual evidence, relevant assumptions and remaining limits in the requested format; do not announce a plan or score for a text-only deliverable.
