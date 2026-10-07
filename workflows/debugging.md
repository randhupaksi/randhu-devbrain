# Evidence-Based Debugging

Use for a reported defect, unexpected behavior, or failing flow. A diagnosis/review request stays read-only. A fix request includes investigation, a complete focused correction, and proportionate verification. Follow the active scope and [baseline risk boundaries](../runtime/session-baseline.md).

## Establish the failure

Record expected versus observed behavior, affected journey, conditions, frequency, and safe reproduction inputs. Read the relevant code, contracts, recent diff, and existing tests. Use [project discovery](project-discovery.md) only if the target or conventions are unclear.

Reproduce only within the authorized environment. A read-only diagnosis must not run tests or scripts that write artifacts, start mutating services, alter state, or send data. Never reproduce destructive or security-sensitive actions against real client/production data. Inspect traces with secrets and personal data excluded.

## Test a hypothesis

1. Trace the failure across the relevant UI, state/query, service, API, or data boundary; distinguish the symptom from its possible cause.
2. Form a small set of evidence-backed hypotheses. Select the cheapest safe observation that separates them, such as a call path, request count, state transition, or focused existing test.
3. Update the hypothesis from the result. Avoid changing multiple unrelated variables, speculative rewrites, broad logging, or suppressing errors simply to hide the symptom.
4. If evidence contradicts the hypothesis or the investigation stops producing information, narrow or revise the approach. Request only the missing fact that would materially unblock it; keep useful independent work moving.

## Correct and verify

When implementation is authorized and evidence supports the cause, fix it at the responsible boundary while preserving unrelated behavior and contracts. Medium-risk changes proceed after consumer/impact analysis; stop at an uncovered high-risk boundary, including auth/permission changes, even when the defect seems obvious.

Use an existing regression test or add a focused test when it can meaningfully catch recurrence. Load testing-strategy only when test design or repair becomes a substantial subtask. Do not replace the project's test framework or weaken product behavior to satisfy a test.

Recheck the original failure and relevant neighboring behavior under comparable conditions. Use [definition of done](definition-of-done.md) for unresolved completion questions. Report the cause and supporting evidence, correction, actual verification, and limits. If reproduction or verification is unavailable, state what is known and what remains a hypothesis; do not claim a confirmed root cause or resolved bug without sufficient evidence.
