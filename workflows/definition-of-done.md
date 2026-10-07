# Adaptive Definition of Done

Use when a substantial task has unclear completion criteria or a final coverage review is needed. A small task uses the basic baseline workflow. Select relevant rows; this is not a mandatory checklist for every change. Project acceptance criteria and the latest user request define the outcome.

## Completion by task

| Task | Relevant completion evidence |
|---|---|
| UI/feature | Requested behavior and important states; project visual language; relevant viewports, keyboard/focus, and affected shared consumers |
| API/integration | Request/response/error compatibility; validation and affected security/data boundaries; relevant success and negative cases |
| Bug fix | Cause supported by evidence; original symptom rechecked; meaningful regression protection where useful; adjacent behavior preserved |
| Refactor | Responsibility improvement explained; behavior/contract invariants and affected consumers checked; no unrelated rewrite |
| Performance | Comparable baseline and follow-up observations; dominant cost addressed; tradeoffs and measurement limits reported |
| Accessibility | Affected semantics, keyboard, focus, states, and visual checks; automated evidence supplemented as needed; no unsupported conformance claim |
| Tests | Meaningful observable outcomes, deterministic synthetic fixtures, focused execution, and honest coverage limits |
| Documentation/context | Instructions and links match current behavior; examples and paths are portable; ownership and historical snapshots are clear |
| Audit/plan | Findings supported by evidence; requested scope covered; unknowns and next actions identified; no unauthorized mutation |

Use [verification and reporting](verification-reporting.md) for check selection and reporting detail. Choose evidence that can detect the risk rather than running every available command. Do not add a library, broad test suite, business capability, or unrelated cleanup solely to satisfy this document.

## Completion decision

Review explicit requirements, affected boundaries, material assumptions, diff, and actual verification. Distinguish implemented and verified, implemented but unverified, partially implemented, and blocked. A blocked check does not automatically invalidate all completed work, but must not be presented as a pass. A read-only completion review reports gaps; it does not silently implement them. An implementation task may address relevant authorized gaps and must respect uncovered high-risk boundaries.

Stop expanding once the outcome and material acceptance criteria are satisfied. Report remaining evidence gaps proportionately. Do not create a checklist file, task log, or persistent status record unless requested.
