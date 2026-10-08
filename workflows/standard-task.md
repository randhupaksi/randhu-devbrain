# Standard Task Workflow

For nontrivial tasks. Small tasks use the basic workflow in the [baseline](../runtime/session-baseline.md).

1. **Discover:** Confirm workspace, target, intent, project instructions, and working-tree state. Read only relevant files/modules. Find Visual DNA for UI; contracts/consumers/data boundaries for APIs. Use [project discovery](project-discovery.md) when the project or boundaries are unfamiliar. If material disagreement or evidence of staleness affects the next decision, use [context reconciliation](context-reconciliation.md), then continue the authorized task.
2. **Interpret:** Separate requirements, implied details, quality improvements, and new capabilities. Look for evidence before asking. Make low-risk detail assumptions; ask about ambiguity that changes business outcomes/contracts/data/security.
3. **Analyze impact:** Map consumers, behavior invariants, risk, reversibility, and validation. For medium risk, briefly explain the approach and proceed. Without specific confirmation, stop only at an unapproved high-risk boundary.
4. **Implement:** Follow project conventions and deliver a complete, proportionate solution. Reuse/extend before adding abstractions. Improve UI quality and structure without speculatively inventing business/API/schema requirements.
5. **Verify:** Review the diff and run relevant project commands. Check consumers/state/runtime according to impact. Use [definition of done](definition-of-done.md) when completion criteria need a fuller review. Do not mix unrelated fixes in just to make checks pass.
6. **Report:** Describe outcome, changed files, behavior, actual validation, assumptions, and remaining risks. Distinguish prepared code from side effects actually executed.

A plan is not an automatic approval gate; file count or a requested redesign is not a reason to stop low- or medium-risk work.

Use [session continuity](session-continuity.md) when a handoff is requested or substantial interrupted work cannot continue safely from active context. Verify the relevant current state before resuming; a model switch alone does not require this workflow or a new context file.
