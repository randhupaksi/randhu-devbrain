# Behavior Scenario Overview

The maintained suite lives in [evaluation/scenarios.yaml](../evaluation/scenarios.yaml). Its procedure, scoring rubric, prerequisites, and limitations are documented in the [evaluation guide](../evaluation/README.md). The current suite has 130 scenarios.

## What the suite covers

The scenarios exercise global instruction precedence, scope and approval boundaries, safety, selective context discovery, debugging and completion, handoff/resume, project context, humanize behavior, documentation maintenance, specialist skill routing, and owner boundaries. Positive cases check that the appropriate guidance can be selected. Boundary cases check that unrelated skills or unauthorized work are not introduced.

Cases 114–123 extend the 3.2 suite with technical research, product discovery, frontend feature engineering, AI application engineering, and greenfield fullstack delivery. They cover activation, distinct ownership, and the difference between a planning request and implementation authorization. The [3.2 delivery guide](v3.2-delivery.md) describes the additions and benchmark setup.

Cases 124–130 cover infrastructure and reliability routing, production readiness, software supply chain assessment and rollout handoff. See the [3.3 comparison cases](v3.3-production-delivery.md#benchmark).

## Reading results correctly

Scenario definitions are behavior contracts, not observed model passes. Repository validators check structural consistency and selected regression conditions. Live Codex or Claude Code runs require actual host evidence and should be reported with the host, effective model when observable, mode, prompt, context, and limitations.

The separate CLI host matrix covers loader discovery, instruction families, skill visibility, session modes, and host permissions. Matrix cases do not increase the 130 task-scenario count. A blocked prerequisite is not a successful model result. See the [3.1 reliability report](v3.1-reliability.md) for the benchmark comparison method and the [documentation index](README.md) for dated release records.
