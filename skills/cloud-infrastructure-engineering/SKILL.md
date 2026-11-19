---
name: cloud-infrastructure-engineering
description: Design or prepare hosted runtime infrastructure and infrastructure as code when topology, environment isolation, or resource lifecycle is the outcome. Use CI/CD for pipeline and rollout work.
---

# Cloud Infrastructure Engineering

Start from the runtime contract and the existing infrastructure repository, provider versions, state ownership, environment boundaries, workload identity and resource owners. If evidence is missing, state what would change the topology or block an environment-specific recommendation.

- Trace ingress, compute, persistence and outbound dependencies through their trust boundaries. Record public and private exposure, workload identity, secret references, ownership, and data location where required.
- Choose the smallest topology that meets the workload's isolation and availability needs. Identify lifecycle coupling, shared resources, quota and cost drivers, and consequences of losing a dependency. Keep environment addresses and account identifiers in project context.
- Review infrastructure changes by resource identity and lifecycle. Distinguish in-place updates from imports, renames, replacements and deletions. Treat state migration and replacement of persistent resources as explicit decisions. Protect state and unredacted plan output as sensitive.
- Separate preparing configuration from operations against a real environment. Establish which tooling steps access remote state, account data, or credentials before invoking them. Use local validation or synthetic plan evidence when only preparation is authorized. Require specific authorization for live mutations and confirm the target and rollback limits before execution.

Deliver the proposed topology or scoped patch, ownership and environment boundaries, replacement and data risks, and observed validation. Hand runtime and artifact requirements to `ci-cd-release-engineering` when rollout needs separate work. Hand failure domains and recovery constraints to `reliability-engineering` for a distinct reliability design.
