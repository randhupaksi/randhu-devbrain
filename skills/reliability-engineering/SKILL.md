---
name: reliability-engineering
description: Design service reliability targets, failure behavior, capacity safeguards and recovery drills. Use observability debugging when the task is diagnosing an existing failure from telemetry.
---

# Reliability Engineering

Use a critical user journey, known failure domains, demand evidence, the service owner and actual recovery constraints. Mark missing targets as proposals for the owner to confirm.

- Define the service level indicator as an observable outcome. Record the eligible population, good events, measurement point and window. Keep a dependency's health distinct from whether a user completed the journey. If relevant, use the service level objective and its error budget to decide when releases or mitigation need attention.
- Bound time, retries and parallel work at dependency boundaries. Explain what degrades, how the user sees stale or incomplete results, and what must fail safely. Preserve data integrity and idempotency across transient failures and delayed recovery.
- Translate recovery time and acceptable data loss into separate objectives. Map backups and restore dependencies, then define proof of recovery such as restoring into an isolated target and reconciling a known record. State when rollback of code cannot recover data or reverse external effects.
- Compare capacity claims with observed demand, bottleneck or queue evidence and saturation behavior. Label assumptions and record a trigger for revisiting them. Use a tabletop or isolated fixture for drills unless a live exercise is separately authorized.

Deliver the journey metric, failure behavior and validation or drill record with owners, thresholds and unknowns. Hand measurable signals to `observability-debugging`, infrastructure recovery constraints to `cloud-infrastructure-engineering`, and rollout stop conditions to `ci-cd-release-engineering` when those are separate deliverables.
