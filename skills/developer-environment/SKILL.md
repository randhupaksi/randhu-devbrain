---
name: developer-environment
description: Prepare or repair reproducible local runtime, package-manager, container, service and configuration setup. Use for local development lifecycle; hosted pipeline/deployment work belongs to CI/CD release engineering.
---

# Developer Environment

Own reproducible local setup, service readiness and owned resource lifecycle. Input: project runtime/lockfiles, local startup contracts, configuration examples and existing service topology. Follow project evidence and established tools; the requested outcome determines scope.

## Decisions and failure boundaries

- Read setup scripts, runtime pins, lockfiles, container/compose definitions and documented startup before changing the environment. Distinguish host processes, container services and production endpoints; do not guess database ownership.
- Use sanitized example configuration and project-scoped settings. Do not copy real secrets, overwrite user configuration or turn a setup task into a machine-wide runtime/admin installation.
- Resolve service DNS, host/container ports, bind addresses, volumes, healthchecks and readiness. Started/created containers are not necessarily ready; use a service-specific health/readiness contract before seeding or starting consumers.
- Preserve data and resource ownership. Reuse a healthy existing service only if compatible and authorized; do not kill arbitrary port owners, prune volumes or run down -v to fix a conflict. Track processes/resources started by this task for targeted cleanup.
- For local data initialization, use disposable synthetic services and explicit environment checks. A local connection string can still point to shared/client data; distinguish preparing a script from executing a mutation.
- Document a minimal cold-start path and recovery from partial startup, keeping the existing toolchain. Containers are optional where the project already has a simpler reproducible setup.

## Verify and deliver

Check version resolution, config availability, connection routing, dependency readiness and a minimal startup/teardown in permitted isolated fixtures. Report steps actually run, resources left active and unavailable prerequisites; editing Compose does not prove a working environment.

A review or plan stays read-only; an implementation request includes its authorized changes and proportionate checks. Keep fixtures synthetic. Specific existing authorization remains valid; production data, destructive operations, security changes, deployment and external sends retain their protected boundaries. Continue safe preparation when a later execution step is not authorized. Report actual evidence and limits without claiming unrun checks.

## Conditional collaboration

- Consider `ci-cd-release-engineering` only for a distinct task; pass verified local toolchain and service readiness contract.
- Consider `project-documentation` only for a distinct task; pass working cold-start commands and known environment limits.
- Consider `database-engineering` only for a distinct task; pass disposable schema initialization and data boundary.

Collaborators are optional available specialists, not dependencies or an automatic pipeline. This skill works independently. Preserve the user's format and natural language; return a requested artifact directly.
