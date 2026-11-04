# Expected documentation format

One combined blueprint for human-readable and AI-readable project documentation. All names below are examples of roles, not mandatory artifacts. Shared files appear once; specialist files remain separate where they explain distinct contracts. Preserve equivalent existing documents and link to their canonical owners.

## Inventory and selection

| Example file | Owns | Select when |
|---|---|---|
| AGENTS.md | Shared contributor/agent operating instructions | Repository instructions are requested |
| CLAUDE.md | Shared-guide delegation and Claude-specific additions | Claude project support is requested or already present |
| README.md | Product overview, local setup, quick orientation | Public or contributor entrypoint is needed |
| docs/INDEX.md | Selective navigation and document status | Several topic documents need a map |
| docs/ARCHITECTURE.md | Ownership, routes, state/data/runtime flow, extension points | System structure needs explanation |
| docs/DESIGN.md | Visual identity, foundations, patterns, interaction, accessibility | A UI has meaningful conventions |
| docs/TESTING.md | Verification commands, layers, ownership, evidence limits | Validation requires more than a short README section |
| docs/LEARNING_MODEL.md | Curriculum/content contracts and learner state | The product actually provides learning experiences |
| docs/RUNTIME_SAFETY.md | Trust, execution, storage/privacy, and threat limits | Runtime or data boundaries need dedicated explanation |
| docs/CATALOG_AND_MOTION.md | Catalog schema, rendering, choreography, authoring | A curated motion/content catalog exists |
| docs/PREVIEW_AND_EXPORT.md | Preview protocol, lifecycle, source generation, export | The product previews or exports runnable artifacts |
| docs/SEO_AND_DEPLOYMENT.md | Metadata, route artifacts, hosting and external operations | Discovery and deployment contracts are substantive |
| docs/PRD.md | Product intent, scope, acceptance criteria, decisions | A product specification is requested or already exists |
| docs/quality-audit.md | Dated UX/accessibility findings, changes, evidence | Such an audit was actually conducted |
| docs/animation-behavior-audit.md | Dated motion decisions and coverage limitations | Such a motion audit was actually conducted |

This inventory covers Markdown documentation, not every source/configuration file. Manifests, CI, route declarations, styles, schemas, test files, and deployment config provide evidence and link targets; do not create documentation copies of those files. Other Markdown, such as API contracts or decision records, follows the same ownership approach when the project needs it.

## AGENTS.md

Suggested order:

1. Product purpose and contribution priorities in one short paragraph.
2. Start-here path: preserve worktree, select relevant context, inspect source and consumers.
3. Task / read / implementation table for architecture, domain content, UI, runtime/API, tests, and deployment as applicable.
4. Commands with supported runtime, package manager, lockfile policy, and important prerequisites.
5. Architecture boundaries and stable contracts: responsibility ownership, lazy boundaries, identifiers, persistence, localization, shared controls.
6. Safety/privacy constraints specific to this repository.
7. Finishing checks and documentation update triggers.

Keep detailed token values, protocol schemas, and product inventories in their topic owner. Commands may have a short quick-start summary here; TESTING owns the longer explanation and evidence selection. Do not invent Git authority or replace personal instructions with a generic safety block.

## CLAUDE.md

Use a short title, supported shared-guide import/delegation, and only necessary Claude-specific behavior. For a host verified to support file imports, the body may use `@AGENTS.md`; otherwise retain the project's documented mechanism and state its limits. Link to docs/INDEX.md for selective topic reading. A pointer is not evidence that a host loaded its target in a native session.

## README.md

Suggested order:

1. Product name, purpose, audience, and current scope.
2. Documentation entrypoints for contributors and topic readers.
3. Local setup: supported runtime, package manager, exact install/dev commands, required configuration names without secret values.
4. Primary experiences and routes, including recovery paths.
5. Important product behavior and reusable output, where applicable.
6. Small responsibility-oriented project tree.
7. Verification quick reference with prerequisites and writing commands identified.
8. Runtime isolation, privacy, accessibility, and known limits, summarized with links.
9. Hosting/build/CI overview, distinguishing repository settings from provider state.
10. Dependencies, notices, license status, and authoritative references where relevant.

Keep explanations scannable. Move a long feature catalog, detailed flow, or protocol to its owner. Do not describe absent backend/account infrastructure as required setup or assert licensing from technical export capability.

## docs/INDEX.md

Open with human setup and contributor entrypoints. Provide a table with document, purpose/task, source area, and maintained/historical status when useful. State how to cross boundaries: domain additions may also need runtime, routes/deployment, and testing context.

Separate maintained guides from historical PRDs/audits. Mention inspection dates only when supported and useful. A date establishes an observation point, not a guarantee that every later change has been reflected. Route the reader to the owner and then relevant source; do not prescribe reading every document.

## docs/ARCHITECTURE.md

Suggested order:

1. Runtime shape and actual services or explicit absence of them.
2. Entry point, providers, shell, route ownership, errors, and lazy loading.
3. Responsibility table: area / owns / main implementation.
4. Route table: route / purpose / owner, including missing routes.
5. Data and state flow: static/server inputs, validation, URL state, shared state, persistence and failure behavior.
6. Core execution flow in ordered steps or a small diagram.
7. Loading, failure, cleanup, and cancellation boundaries.
8. Extension table: requested change / owner / affected consumers / useful checks.

Link detailed domain semantics, trust/protocol details, UI rules, and test mapping to their owners. Explain separation and dependency direction without prescribing a foreign folder tree. Backend projects should map transport, authorization, use cases, persistence, and transaction boundaries from actual source.

## docs/DESIGN.md

This merged design format combines visual intent with implementation and behavior:

1. **Visual language:** intended character, audience/task, density, composition, and existing identity. Derive it from the project rather than assigning a universal palette.
2. **Source of visual truth:** actual token/theme/style files, layer order, component library, icons, typography, semantic roles, and any deliberate exceptions.
3. **Foundation table:** foundation / intent / source. Include themes, color roles, spacing, type, borders, focus, motion, and breakpoints only as useful.
4. **Interface patterns:** shell/navigation, forms/filters, dialogs, content panels, controls, tables/cards, source/editor surfaces as applicable. Identify shared owners and usage constraints.
5. **Interaction and states:** feedback, selected/open/active, disabled, loading/skeleton, empty, error/retry, and success. Explain focus placement/restoration and state ownership where important.
6. **Localization:** supported languages, default, source, untranslated areas, long-label behavior, accessible-name consistency.
7. **Motion:** device preference, override, pause/replay/manual/static behavior, decorative versus meaningful motion, cleanup and feedback constraints.
8. **Accessibility and responsive review:** semantics, keyboard/focus, touch, contrast, announcement behavior, reading order, narrow layouts, deliberate local scrolling, both themes/locales where supported.
9. **Visual change review:** primary task clarity, distinguishable states, overflow/clipping, focus order, recovery, meaningful reduced-motion result, and actual evidence limits.

Do not copy palette, typeface, controls, viewport values, or aesthetic bans from the example into another project. Connect this guide to ARCHITECTURE for ownership, TESTING for validation, and relevant runtime/domain docs when behavior crosses those boundaries. Historical accessibility evidence belongs to its dated audit.

## docs/TESTING.md

Suggested order:

1. Commands and environment: exact scripts, versions/constraints from configuration, build prerequisites, browser requirements, ports, cache/artifact locations and cleanup behavior.
2. Verification layers: layer / what it detects / when useful.
3. Test ownership: relevant file or suite / contract covered.
4. Change-to-evidence matrix: change / useful checks / remaining manual review.
5. Browser expectations: journeys, persistence, keyboard, responsive, reduced motion, runtime/export where applicable.
6. CI triggers, command order, permissions, artifacts, and whether it deploys.
7. Evidence reporting and limits: available coverage versus executed checks; static/JSDOM versus real browser; automated accessibility versus human assessment.

Do not claim current suite totals or PASS results without checking them. Known process-shutdown or environment issues should be reported honestly, not described as clean command exits. Link to actual test/config sources and domain contracts; keep dated run results separate from enduring command documentation.

## docs/LEARNING_MODEL.md

Use only for a learning product. Explain audience/prerequisites; curriculum shape and lesson types; objective → explanation/prediction → runnable practice → feedback → challenge/hints → recap; localized content contracts; stable IDs/deep links; saved drafts/progress and fallback; lesson versus challenge completion; recommendation/resume rules; and steps to add a valid lesson.

Describe actual implemented semantics rather than imposing this learning arc on every product. Link curriculum schema/source, state owner, preview safety, DESIGN, and TESTING. Counts are current observations, not permanent limits.

## docs/RUNTIME_SAFETY.md

Describe local and remote data, persistence and deletion implications, telemetry/network behavior, trust boundaries, permitted execution, message validation, payload/resource limits, known threat limits, and safe change checks. For an iframe product, map host/frame ownership, source/origin/token/schema checks, stale frames, CSP, and capability restrictions from both sides of the implementation.

State what isolation does and does not establish. A bounded educational preview is not automatically a hardened hostile-code service. Link protocol/execution source, PREVIEW_AND_EXPORT for lifecycle if present, ARCHITECTURE for flow, and TESTING for negative cases. Keep one owner for security details rather than reproducing them in every preview guide.

## docs/CATALOG_AND_MOTION.md

Explain catalog composition and schema; accepted field values; stable IDs/slugs and order-derived identifiers; descriptions/localization; renderer registry and deterministic geometry; paint/resource identity; choreography module ownership and hooks; authored versus animated transforms; lifecycle registration; physical/subject context; complete static reduced-motion state; and adding/changing an item.

An authoring sequence should connect metadata → renderer → behavior → parameters → route/export integration → relevant tests → visual inspection. Link PREVIEW_AND_EXPORT, DESIGN, SEO_AND_DEPLOYMENT, and TESTING only where relevant. Do not require motion metadata for a non-motion catalog.

## docs/PREVIEW_AND_EXPORT.md

Explain the generator and shared-source ownership; host-to-preview startup/ready handshake; timeout/retry/cancellation/stale-frame handling; parameter and language updates; playback eligibility; lifecycle API and destroy behavior; source-viewer ownership and lazy formatting; copy/download failure recovery; output modes and file dependencies; offline/hosting restrictions; privacy/CSP/licensing boundaries.

Document actual parity limits. A shared generator alone does not prove live parameter changes rebuild geometry identically to export. Distinguish editable execution from read-only viewing, one-file copy from multi-file/ZIP output, and localized controls from fully localized output. Keep detailed trust checks in RUNTIME_SAFETY when that owner exists; link protocol and lifecycle tests.

## docs/SEO_AND_DEPLOYMENT.md

Explain canonical origin and its configuration owner; route metadata, query variants, missing routes, robots/noindex, locale URLs, structured data; client-rendered versus pre-rendered metadata; sitemap/404 generation and route parity; hosting rewrites and headers; build/runtime setup; CI versus deployment; provider/DNS/HTTPS settings; release checks and indexing limitations.

Link build scripts, metadata source, route config, TESTING and runtime safety. Repository configuration does not prove provider integration, DNS ownership, successful deployment, search indexing, or ranking. Document operations; do not execute external changes as documentation cleanup.

## docs/PRD.md

When requested, structure a product brief with purpose/status/date/audience, product summary, vision/principles, users and needs, in/out of scope, content/data concepts, routes/journeys, visual direction, interaction/accessibility, runtime/output contracts, technical constraints, architecture guidance, privacy/security, performance targets, validation/deployment expectations, acceptance criteria, implementation sequence, risks, decisions/open questions, and sources.

Targets and proposals must remain distinguishable from observed implementation. Prefer semantic Markdown headings, real tables, and correctly closed code fences. Preserve an existing historical brief; add a clearly dated status note or link to current guides instead of replacing its original acceptance scope silently. Never claim an initial brief was reconstructed from evidence that is unavailable.

## docs/quality-audit.md

Only write findings supported by an actual audit. Include date/scope/method, user journey reviewed, finding / user impact / response / status, affected contracts, verification coverage, recorded commands/results, unresolved findings, and manual/device/assistive-technology limits. Separate proposed fixes from implemented ones and static inspection from browser interaction. Link current DESIGN/TESTING and relevant implementation without updating old PASS results to a new date.

## docs/animation-behavior-audit.md

Only write findings supported by actual motion inspection. Include scope/date/method; subject or item / observed problem / decision / status / evidence; loop/replay/reset, connected body parts, lifecycle and reduced-motion behavior; catalog/runtime coverage versus visual sample coverage; unresolved concerns and review limits. Do not infer that runtime coverage means every animation was visually observed through every cycle. Link current CATALOG_AND_MOTION, PREVIEW_AND_EXPORT, DESIGN and TESTING.

## Relationship and maintenance contract

Use this graph as navigation intent, not an instruction to load every node:

```text
README -> docs/INDEX -> selected maintained topic -> implementation + checks
AGENTS -> docs/INDEX and concise task-specific topic pointers
CLAUDE -> shared AGENTS instructions through the supported host mechanism
ARCHITECTURE -> domain/runtime guides for detailed contracts
DESIGN -> TESTING for UI evidence; runtime/domain guides for relevant behavior
domain/runtime/export -> each other's contract owner when boundaries cross
TESTING -> contract owners and actual tests/configuration
INDEX -> historical PRD/audits, explicitly labeled
historical records -> current owner without implying fresh validation
```

Each maintained topic should be reachable from an entrypoint and offer a useful path onward. Avoid duplicated facts and dense every-to-every link graphs. If facts live in PROJECT-CONTEXT, PROJECT-VISUAL-DNA, or PROJECT-API-CONTRACT, reuse those owners rather than creating parallel versions. A narrow update follows only affected inbound summaries and outgoing dependencies.

## Example of the expected result

The following fictional excerpts demonstrate the expected writing and relationships. Paths and behavior are illustrative, not facts to assume about a repository. Generate real relative Markdown links only after verifying their targets and anchors.

**AGENTS.md — selected task route**

| Task | Read | Implementation |
|---|---|---|
| Persistence | Architecture: State and data flow | Preference provider and storage validation |
| Controls and loading | Design: Interaction and states | Shared controls and route loading boundary |
| Preview messages | Runtime safety: Message boundary | Host receiver and embedded bridge |

**ARCHITECTURE.md — State and data flow**

The preference provider owns saved display settings. Route-local filters remain in the URL. The provider validates saved values and falls back to in-memory defaults when storage is unavailable. Components request updates through the provider rather than writing storage directly. The Testing guide identifies the reload and storage-failure checks; the Design guide owns visible recovery behavior.

**DESIGN.md — Loading and recovery**

Route skeletons reflect the destination's real sections. Decorative placeholders are hidden from assistive technology while the status label is announced. Loading preserves access to the skip link. Preview errors offer retry without replacing the application shell. The token source owns colors and focus styling; the Architecture guide owns loading boundaries. The Testing guide maps keyboard, narrow-layout, and reduced-motion checks to these behaviors.

**TESTING.md — change-to-evidence excerpt**

| Change | Useful evidence | Limit |
|---|---|---|
| Saved settings | Validation tests and browser reload/storage-failure journey | Unit tests alone do not establish browser persistence |
| Preview messages | Protocol negative cases and focused browser handshake | A source review does not establish CSP enforcement |
| Loading controls | First-Tab keyboard check, state inspection, narrow layout | Automated accessibility checks do not prove full conformance |

These excerpts illustrate depth and ownership. A completed delivery supplies evidence-based content for each selected file, working relative links, source/check pointers, an updated index, and a report of actual validation. It leaves unsupported domains absent and unknown facts explicit.
