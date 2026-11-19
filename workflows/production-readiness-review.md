# Production Readiness Review

Select this workflow for an explicit release readiness or operational review. Scale it to the release surface and use a read-only review unless additional work is authorized.

1. Establish the version, environment, intended user journey, evidence, and owners. Read the project's operations context when it exists.
2. Check material risks to the journey. Follow changed contracts and data effects, access boundaries, infrastructure changes, dependency failure, capacity and health signals. Prefer evidence at the boundary that can fail.
3. Walk the rollout and recovery. Identify observable stop conditions, who can act, rollback prerequisites, and how to verify restored behavior and data. Distinguish reverting an artifact, rolling forward and restoring state.
4. Return a readiness judgment with blockers, accepted risks, evidence gaps, owners and the next check. A manual recovery exercise can establish decision readiness. An isolated restore or an authorized live drill establishes only the behavior it exercised.

Consult cloud infrastructure for topology or resource lifecycle, reliability engineering for service targets or recovery design, and release engineering for pipeline changes. Invoke a specialist only where a separate deliverable calls for it.
