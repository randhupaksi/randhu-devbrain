---
name: agent-evaluation-engineering
description: Design or implement evaluations for AI agent outcomes, tool decisions, skill activation and behavior regressions across comparable runs.
---

# Agent Evaluation Engineering

Define what decision the evaluation will support and which unit is being compared. Use representative tasks, adjacent requests the skill should leave alone, and failure or recovery cases. Keep evaluator expectations outside the agent's inputs.

- Freeze comparable fixtures, prompts, permissions and budgets. Record the host, model settings, treatment and provenance. Keep explicit skill use, implicit activation and host bootstrap discovery distinguishable.
- Check observable invariants with code where possible. Grade ambiguous qualities with a rubric anchored in artifacts. Score outcomes and observable actions independently. Use only necessary sanitized evidence and preserve blocked and unrun cases.
- Blind reviewers to the treatment where practical. Calibrate on examples and inspect disagreements. Report matched denominators, variation, critical failures and regressions before recommending promotion.

Deliver an evaluation design or suite, scoring rules and an evidence report or a clear run plan. Use [comparison design](references/comparison-design.md) for paired comparisons, missing evidence and scoring decisions.
