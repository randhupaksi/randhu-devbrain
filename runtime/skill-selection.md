# Skill Selection and Collaboration

Select by the requested result and the current bottleneck, not by every technology mentioned. Routine tasks can use the baseline without a skill. Read metadata first, then one primary skill and only its needed references. This guide is selected for genuinely mixed tasks, never loaded at every startup.

Use an adjacent skill only when its distinct deliverable is needed. Pass the accepted facts, implementation locations, contracts that must survive, open decisions, artifact produced, and verification actually performed. A handoff does not expand execution authorization. Ordinary supporting work does not require a new skill.

| Boundary | Owner decision |
|---|---|
| API contract vs implementation | api-contracts owns wire/semantic decisions; backend-feature-engineering implements the accepted use case |
| Database correctness vs speed | database-engineering owns invariants/evolution; database-query-optimization needs a query bottleneck and preserves results |
| Auth vs broad security review | auth-security owns identity/access policy; application-security-review traces exploitable trust-boundary paths |
| UI vs state/forms | UI skills own composition; frontend-state-management owns state/cache lifecycles; forms-validation owns input/submission semantics |
| Design system vs refactor | design-system-architect owns shared visual contracts; architecture-refactor owns responsibilities/dependency direction |
| Testing vs browser implementation | testing-strategy selects useful coverage; browser-e2e-testing implements actual browser journeys |
| Debugging vs telemetry | ordinary bugs use debugging workflow; observability-debugging handles cross-service telemetry/evidence gaps |
| Review vs fix | code-review produces supported findings; implementation follows only when requested |
| Docs vs copy | project-documentation verifies source/ownership; humanize edits dedicated prose/voice while preserving facts |
| Realtime vs jobs | realtime-systems owns client subscription/replay convergence; background-jobs-queues owns durable server execution |
| Server vs client cache | server-caching owns shared/backend consistency and isolation; frontend-state-management owns client query state |
| Localization vs prose | internationalization-localization owns locale infrastructure and formatting; humanize owns editorial voice |
| SEO vs marketing | technical-seo owns crawl/index/render signals; marketing-portfolio-ui-ux owns visual narrative and conversion |
| Upgrade vs release | dependency-upgrades owns version/consumer compatibility; ci-cd-release-engineering owns pipeline/artifact rollout |
| Local vs hosted setup | developer-environment owns reproducible local services; ci-cd-release-engineering owns hosted delivery |

For an order flow, an accepted API contract can feed backend implementation; schema invariants feed persistence; a durable post-commit event feeds a worker. Load each owner only if that deliverable is actually part of the task. Do not turn the example into a mandatory multi-skill pipeline.

The maintenance-only [catalog](../skills/catalog.yaml) records all 30 owners, output artifacts and conditional handoffs. Skills remain independently portable: collaboration names are optional, not required file imports.
