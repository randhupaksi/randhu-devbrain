---
name: ci-cd-release-engineering
description: Prepare or repair build, test, artifact, and rollout pipelines with explicit environment and recovery boundaries. Pipeline files are editable within scope; deployment or remote mutations need their existing authorization.
---

# CI/CD Release Engineering

Own reproducible pipeline artifacts, rollout readiness, and recovery plans. Start with the requested outcome, the active project instructions, and the smallest relevant implementation/consumer slice. Use the project's stack and conventions; a skill name does not mandate a library or architecture.

## Work from evidence

- Inspect actual pipeline files, supported runtime/package manager, lockfiles, build outputs and environment targets. Do not infer a successful deploy from a syntactically valid workflow.
- Keep jobs reproducible and privileges minimal. Treat pull-request code and artifacts as untrusted; isolate secrets from untrusted jobs and verify how artifacts cross trust boundaries.
- Key caches by meaningful dependency/tool inputs and avoid caching secrets or cross-tenant outputs. Separate reusable build artifacts from environment-specific secrets and configuration.
- Map compatibility and deployment order across app, workers and schema. Plan rollout, health evidence, failure thresholds and recovery; rollback can be unsafe after an irreversible data change.
- Implement requested pipeline configuration and validate locally or in permitted fixtures. Running remote workflows, publishing artifacts, changing secrets, deploying or rolling back needs explicit authorization for that target and scope.

## Verify the outcome

A trigger name is not a trust boundary. Privileged follow-up workflows and base-branch PR triggers can still execute untrusted head code or artifacts. Trace checkout revision, scripts, cache/artifact provenance and credential exposure before recommending any privileged trigger. A digest identifies bytes but does not establish that their producer or contents are trusted.

Check syntax plus job dependencies, trust permissions, cache behavior, artifact identity and failure handling. Record local versus actual CI execution and environment-specific checks still required.

Review and audit requests produce findings without edits. Implementation requests include the authorized change and proportionate verification. Use synthetic fixtures; never copy secrets or client data into artifacts. Existing authorization for a specific target/scope remains valid, while destructive data operations, security-boundary changes, deployment, external sends and Git mutations retain their protected boundaries. Do not stop safe analysis or preparation merely because a later execution boundary needs approval.

## Collaborate by artifact

- Consider `database-engineering` only for a distinct requested subtask; pass schema compatibility and irreversible recovery limits.
- Consider `browser-e2e-testing` only for a distinct requested subtask; pass permitted preview smoke journey.
- Consider `observability-debugging` only for a distinct requested subtask; pass rollout health and failure signals.

These are optional handoffs to available skills, not dependencies or an automatic chain. Keep ordinary supporting work within this skill. Report the changed behavior, actual evidence, relevant assumptions and remaining limits in the requested format; do not announce a plan or score for a text-only deliverable.

For a distinct dependency-upgrades task, pass runtime and package compatibility migration scope to an available `dependency-upgrades` skill; do not load it for routine supporting work.
