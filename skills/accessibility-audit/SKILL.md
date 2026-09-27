---
name: accessibility-audit
description: Audit and improve web interface accessibility across keyboard use, semantics, forms, focus, contrast, and motion. Use when accessibility is the requested outcome or a material defect, not for every UI polish task.
metadata:
  short-description: Audit and improve accessible interfaces
---

# Accessibility Audit

Use this skill for a dedicated accessibility review or fix in a product, marketing, or portfolio interface. Follow the active project's users, component system, visual identity, and any stated accessibility target. Ordinary UI work already considers accessibility; this focused skill is selected when accessibility itself needs investigation or implementation.

## Task mode and scope

- For an audit or explanation, inspect and report without changing files.
- For a fix, improvement, or implementation request, inspect, repair the relevant barriers, and verify the affected interactions. Do not return only a checklist when the requested outcome includes working changes.
- Scope the review to the named screen, component, flow, and meaningful states. Expand to shared consumers only when a shared change affects them.

## Inspect the real interaction

1. Understand the user's task and the interface states, including loading, errors, validation, disabled controls, dialogs, navigation, and permission-limited views.
2. Inspect document structure and accessible names. Follow keyboard order, visible focus, escape/close behavior, form labels and instructions, error association, status announcements, contrast, zoom/reflow, and reduced motion where relevant.
3. Use automated checks to find candidates, then manually verify the affected flow with the tools available. A clean scan does not establish that the flow is usable or conformant.
4. Prioritize blockers that prevent task completion, then confusing interactions and visual issues. Explain any limitation when a screen reader, browser, or device check was unavailable.

Read [references/interaction-checks.md](references/interaction-checks.md) for a complex form, modal, dynamic state, or multi-step flow. Do not load the reference for a narrow, obvious label fix.

## Implement and verify

Prefer semantic controls and the project's established accessible primitives. Fix the root behavior instead of adding decorative ARIA attributes. Preserve business rules, data meaning, the visual language, and required interactions. A focus or contrast fix may adjust styling, but a dedicated accessibility task does not authorize a product redesign or permission change.

Recheck the affected keyboard path, focus restoration, labels, error feedback, and relevant viewport or zoom behavior. Run available automated checks as supporting evidence, not as the sole proof. Report barriers fixed, remaining findings, checks actually performed, and any claim of conformance only when the required standard and evidence support it.

## Authorization and selective use

Follow system and project instructions and the latest user request. Implement low-risk fixes directly; map consumers for medium-risk shared components. Authentication, permission, breaking API, client or production data, destructive migration, deployment, secrets, Git commit/push/history, and hard-to-reverse actions require specific authorization. Do not load enterprise and marketing skills solely to run this audit; add another skill only for a distinct design task.
