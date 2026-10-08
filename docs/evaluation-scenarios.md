# Evaluation Scenarios

The canonical v2 suite is in [evaluation/scenarios.yaml](../evaluation/scenarios.yaml), with procedure and rubric in [evaluation/README.md](../evaluation/README.md).

The v1 scenario that allowed additional features/APIs based only on relevance has been replaced: overdelivery now improves the requested requirement without inventing speculative business requirements. Safety, user override, and low/medium-risk autonomy are tested separately.

Six additional cases distinguish read-only audits from authorized implementation for `frontend-performance`, `accessibility-audit`, and `testing-strategy`. They also check that a focused task does not load unrelated skills. Structural validation checks suite shape; live Codex and Claude runs are needed to assess behavior.

V2.2 adds eight cases for scoped discovery, a small task that needs no broad discovery, implementation continuity, debugging intent and evidence, security-boundary fixes, and read-only completion review. V2.3 added eight cases for command/UI sources, latest-user decisions, API compatibility, authorization, equally applicable instructions, authorized documentation repair, and untrusted evidence, bringing that release's suite to 46. These counts record intended behavior, not observed passes.

V2.4 adds eight cases for handoff, authorized resume, changed worktree state, latest review intent, unsupported authorization claims, honest validation transfer, lightweight model switching, and missing task goals. The current suite contains 54 scenarios; structural validation is separate from observed native-host passes. See [the v2.4 evaluation guide](../evaluation/v2.4-behavior-guide.md).
