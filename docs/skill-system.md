# DevBrain Update 3.0 — Fullstack Skill System

DevBrain Update 3.0 is the unreleased expansion on the stable v2.9 base. It contains 30 source skills: 21 new fullstack specialists and nine reinforced existing skills. It is a portable instruction system for the host model, not additional training. No third-party skill package or service is required. New operational guidance can improve the decisions and checks an agent makes, but a package validation result cannot establish a general quality gain.

## Ownership and collaboration

The [catalog](../skills/catalog.yaml) is the maintenance owner of each skill's responsibility, input/output artifact and conditional collaborators. [Task routing](../runtime/task-map.md) selects an owner; [skill selection](../runtime/skill-selection.md) resolves mixed outcomes. The baseline remains the sole startup module and is unchanged by this expansion. A skill remains usable when installed alone: collaborator names are optional suggestions, not imports or required tools.

| Area | Skills |
|---|---|
| Interface and voice | enterprise-ui-ux, marketing-portfolio-ui-ux, design-system-architect, accessibility-audit, humanize |
| Application implementation | architecture-refactor, backend-feature-engineering, frontend-state-management, forms-validation, realtime-systems |
| Contracts and data | api-contracts, database-engineering, database-query-optimization, server-caching |
| Trust boundaries | auth-security, application-security-review |
| External and asynchronous work | external-service-integrations, background-jobs-queues, file-storage-uploads |
| Evidence and delivery | frontend-performance, testing-strategy, browser-e2e-testing, code-review, observability-debugging, ci-cd-release-engineering, project-documentation |
| Localization and public discovery | internationalization-localization, technical-seo |
| Toolchain and local readiness | dependency-upgrades, developer-environment |

Choose the owner by the requested result. For a backend use case, an accepted contract and database invariants are inputs to implementation. A distinct contract-design decision can go to api-contracts; a schema change can go to database-engineering. A durable post-commit event can then become the worker's input. These are responsibility boundaries, not a mandatory sequence or permission to expand the task.

For a slow dashboard, frontend-performance first locates the dominant cost. A supplied database plan can justify database-query-optimization; browser rendering evidence can keep the work in frontend-performance. Ordinary debugging does not automatically load observability-debugging. Similarly, code-review reports supported findings without automatically invoking every security/testing skill or editing the reviewed code.

## Strengthening the original nine

Each existing skill retains its established references and purpose. Its collaboration section now states a concrete input, output, optional handoff, and a failure check particular to its domain: selection semantics for product UI; authentic claims and CTA outcomes for marketing; theme/consumer compatibility for design systems; side-effect timing during refactors; comparable performance measurements; async focus/announcements; deterministic concurrency tests; proposed-versus-current documentation; and localization structure versus translatable copy.

Shared experience quality remains in `core/ui-ux-principles.md`; task-ranked visual hierarchy, direction, and critique live in `core/ui-design-intelligence.md`; composition/style vocabulary and product-context lenses load only when relevant. Chart and platform decisions route to their dedicated modules. These canonical core modules provide the operating guidance and trust boundaries. This deepens the three existing UI skills without adding a thirty-first skill or third-party runtime.

Project instructions and active user intent still determine the stack, product semantics, and authorization. Skills use established tooling and explain unavailable checks. Reviews stay read-only; implementation requests proceed within their existing scope. Preparing a migration or pipeline does not authorize running it against a real environment.

## Packaging and evaluation

The manifest and source installer enumerate all 30 skills. Simulated-home installer tests check exact source/Codex/Claude payload parity, updates, idempotency and preservation of user instructions. Repository changes do not install into real host profiles. The published manifest version remains 2.9.0; Update 3.0 stays unreleased until its release status is explicitly changed.

Cases 72–101 add one positive task and one boundary task for each new skill, bringing the suite at that stage to 101 cases. They are evaluation contracts, with expectations outside agent context. Two boundary cases intentionally need no skill: a routine syntax fix uses debugging guidance, and a Git command list uses the text-only Git workflow.

Run `node evaluation/test-skill-system.cjs` with the documented YAML prerequisite for source/manifest/installer/catalog consistency, relationship targets, metadata and coverage. Run the repository validator, content regressions and simulated installer integration using the [evaluation guide](../evaluation/README.md). These checks do not run a model.

## Observed evidence — 2026-11-10

- Source/manifest/catalog/installer contract checks: 281 passed for all 24 skills.
- Five intentional regressions were rejected in an isolated copy: unknown collaborator, missing installer skill, missing route, inappropriate specialist activation and catalog forced into startup. Clean/restored copies passed.
- Existing content regressions passed 22 assertions, rejecting twenty intentional regressions.
- Simulated-home installer integration passed 69 assertions, including full-file source/Codex/Claude parity for all 24 skill payloads. No real host installation was performed.
- Repository validation passed 3,499 checks covering frontmatter, YAML, local links, portable paths, PowerShell parsing and whitespace. Its current output is retained in ignored local/skill-system-validation.log. The baseline is unchanged at 9,976 characters and about 2,494 estimated tokens; host discovery metadata still grows with the catalog.

An independent evaluator performed three synthetic tasks using only the named skill and raw artifacts: code-review on a zero-quantity regression, background-jobs-queues on a crash after a provider effect, and auth-security on a multi-tenant invoice lookup. Actual answers are in ignored local/skill-system-forward-test.md. The answers distinguished a reproduced branch regression, durable idempotent recovery and a conditional cross-tenant exposure needing enforcement evidence.

Native read-only design/review samples used Codex CLI 0.167.0 and Claude Code 2.1.319, requesting gpt-5.6-sol and claude-sonnet-5 respectively; backend identities were not independently verified. Each fixture contained the baseline and only the explicitly selected skill. Thirty initial responses covered all 15 additions on both hosts. Eighteen focused follow-ups, six final API/backend/database checks and two final security-evidence checks produced 56 completed responses. The native runner never received rubric expectations. These samples do not test automatic routing, project implementation, all 101 suite scenarios or behavior of all nine old skills.

| Observed issue | Source correction and follow-up |
|---|---|
| Enqueue-first suggested as a transactional alternative | Reject reorder-only atomicity; follow-up used durable outbox and separated HTTP retry identity from consumer delivery identity |
| Cursor mode gated only by token presence | Specify first-page capability negotiation independent of continuation token; final outputs included first-page selection and cache separation |
| DDL safety and uniqueness overstatements | Require engine evidence, coordinated writers/durable reservation and integrity-aware rollback; final outputs addressed races, but a Claude sample still implied nonblocking index creation without engine evidence |
| Security risk stated as confirmed with missing controls | Require conditional first finding when source/egress enforcement is unknown; final two-host source-free proxy reviews classified SSRF as conditional |
| Arbitrary browser delay and transient-loader dependency | Supply actual synthetic test; use enabled readiness and avoid requiring the loader to appear; follow-up proposed readiness assertions with unknown success targets labeled as examples |
| Generated review severity/consequences exceeded supplied code | Require reachable impact and conditional unseen branch effects; Claude qualified branch consequences, while a Codex sample still inferred rejection and high severity from limited context |
| Privileged CI trigger treated as sufficient trust | Require revision, script, cache and artifact provenance; follow-up distinguished trigger names and artifact digests from trusted execution |

The native status is deliberately **mixed and limited**, not all-pass. Remaining overstatements show why high-impact conclusions still need project evidence and review. Other useful samples preserved zero-valued form input, stable provider idempotency keys, query ownership, queue recovery and the distinction between queue wait and worker execution time. No before/after control or blind quality benchmark was performed, so no general improvement percentage or universal Codex/Claude parity is claimed.

Raw native results are retained in ignored local/fullstack-native-1794323642290/, local/fullstack-native-1794324013978/, local/fullstack-native-1794324146422/ and local/fullstack-native-1794324217326/. Codex captures include progress messages as well as the final artifact; substantive assessment uses the actual proposal/findings rather than counting narration as a claim of execution. Tests did not connect to a database, deploy, send external integration requests or alter production data. The skill-creator Python quick validator could not be run because a usable Python launcher was unavailable; repository YAML/frontmatter and metadata validation provided the corresponding structural checks.

## Six-skill extension — 2026-11-10

The six additional owners are realtime-systems, server-caching, internationalization-localization, technical-seo, dependency-upgrades and developer-environment. Cases 102–113 add six positive and six boundary tasks, bringing the current suite to 113. Their input/output and conditional relationships are in the catalog. Existing state, backend, copy, marketing, CI and documentation owners now provide an incoming handoff where needed.

The key failure checks are replay-window expiry and snapshot races; tenant-scoped cache keys and stale refill; currency versus display locale; robots versus authorization; unsupported peer dependencies despite passing typecheck; and local resource ownership before cleanup. This extension adds no baseline startup content or runtime service.

Observed checks for the 30-skill source: 3,775 repository checks, 371 skill-system contracts, five intentional validator regressions rejected, 22 existing content-regression assertions, and 81 simulated-home installer assertions passed. Historical counts above belong to the preceding 24-skill snapshot. Current structural output is retained in ignored local/six-skills-validation.log and installer output in local/six-skills-installer.log.

Twelve read-only native responses covered the six positive tasks on Codex CLI 0.167.0 and Claude Code 2.1.319 with the same requested model identifiers and isolation used above. The responses identified snapshot resynchronization after replay expiry, identity dimensions missing from a shared cache, preservation of currency across locale changes, robots directives as crawler guidance, incompatible peer dependencies despite passing typecheck, and preservation of unknown local resources/volumes. Severity labels and incidental examples remain context-dependent; this is not a production review or an automatic-routing test.

The initial localization examples chose decimal display policy without an established amount-scale contract and one suggested manual currency grouping. Instructions were refined to inspect runtime/currency metadata, keep scale and rounding uncertainty explicit, and retain the established formatter for fallback. Two additional native responses followed those constraints and identified the missing scale/rounding/locale policies. They still supplied illustrative assumptions, so those examples require project confirmation. No comparative control establishes a general model-quality gain.

Raw results are retained in ignored local/fullstack-native-1794324836203/ and local/fullstack-native-1794324944134/. The 14 responses exercise explicit invocation and reasoning from synthetic facts; actual application implementation, all 12 new scenario contracts, automatic discovery and repeated consistency were not fully tested. The existing mixed native status for the preceding skills remains applicable. No real host profile, dependency environment, database, cache or production service was installed or modified by these evaluations.
