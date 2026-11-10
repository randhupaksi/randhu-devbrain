---
name: dependency-upgrades
description: Plan or implement package/framework upgrades using versioned migration evidence, lockfile integrity, and consumer checks. Use for dependency transitions; routine feature work does not trigger an upgrade.
---

# Dependency Upgrades

Own dependency compatibility transition and reproducible resolution. Input: package manager/runtime constraints, current lockfile, dependency graph, consumers and target-version requirements. Follow project evidence and established tools; the requested outcome determines scope.

## Decisions and failure boundaries

- Read the actual package manager, workspace layout, runtime engines, manifests, lockfile and affected dependency graph. Establish the current and target versions; consult official versioned changelogs/migration guides rather than guessing current APIs.
- Separate direct/transitive and development/runtime exposure. Check peer constraints, plugins, generated clients, config changes and deployment runtimes; a successful install is not proof those contracts remain compatible.
- Choose the smallest justified upgrade set. Keep the existing package manager and lockfile workflow; do not delete the lockfile, force incompatible peers, or disable failing checks merely to finish resolution.
- Map removed/deprecated APIs and apply required source/config migrations to affected consumers. Preserve auth, serialization, timezone and data semantics even when typechecking still passes.
- Treat registry/install scripts and dependency provenance according to project policy. Preparation can inspect metadata without running untrusted scripts; new installs and network operations follow active environment permissions. Never publish or alter remote release settings from an upgrade request alone.
- Make recovery concrete: preserve the previous resolution and runtime compatibility assumptions. A Git revert does not undo data migrations or externally changed state performed by a dependency.

## Verify and deliver

Verify lockfile/manifest agreement, reproducible installation where permitted, type/build checks and targeted runtime/consumer behavior. Report vulnerability fixes only against verified version/advisory evidence and actual reachability; a scanner pass is not a full security review.

A review or plan stays read-only; an implementation request includes its authorized changes and proportionate checks. Keep fixtures synthetic. Specific existing authorization remains valid; production data, destructive operations, security changes, deployment and external sends retain their protected boundaries. Continue safe preparation when a later execution step is not authorized. Report actual evidence and limits without claiming unrun checks.

## Conditional collaboration

- Consider `code-review` only for a distinct task; pass bounded migration diff and compatibility risks.
- Consider `ci-cd-release-engineering` only for a distinct task; pass new runtime/package-manager constraints and verified artifact checks.
- Consider `application-security-review` only for a distinct task; pass reachable advisory needing focused risk assessment.

Collaborators are optional available specialists, not dependencies or an automatic pipeline. This skill works independently. Preserve the user's format and natural language; return a requested artifact directly.
