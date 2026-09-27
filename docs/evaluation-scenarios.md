# Evaluation Scenarios

The canonical v2 suite is in [evaluation/scenarios.yaml](../evaluation/scenarios.yaml), with procedure and rubric in [evaluation/README.md](../evaluation/README.md).

The v1 scenario that allowed additional features/APIs based only on relevance has been replaced: overdelivery now improves the requested requirement without inventing speculative business requirements. Safety, user override, and low/medium-risk autonomy are tested separately.

Six additional cases distinguish read-only audits from authorized implementation for `frontend-performance`, `accessibility-audit`, and `testing-strategy`. They also check that a focused task does not load unrelated skills. Structural validation checks suite shape; live Codex and Claude runs are needed to assess behavior.
