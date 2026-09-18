---
name: design-system-architect
description: Plan, audit, and implement maintainable frontend design systems, shared components, and UI refactors with token consistency. Use when repeated or hardcoded UI should become a coherent reusable architecture.
---

# Design System Architect

Build frontend foundations that stay coherent as a product grows. Treat the design system as a product-quality and code-architecture concern: visual consistency, reusable behavior, readable composition, accessibility, and safe evolution matter together.

## Scope and priority

- Use this skill for design-system discovery, token audits, shared component work, componentization, UI architecture, and frontend refactors.
- Follow the active user request first, then project-specific instructions and the project's existing source of truth. DevBrain provides quality and decision principles; it does not choose a project's colors, typeface, library, density, or visual style.
- Prefer shared components for recurring or core controls such as buttons, inputs, badges, dialogs, and table primitives. If a pattern is truly one-off, keep the composition feature-local while still using the same tokens and primitives.
- Do not change API contracts, data semantics, auth, permissions, business rules, or unrelated screens merely to make the design system cleaner.

## Discover before changing

Inspect proportionately before creating or refactoring a foundation:

1. project instructions, Visual DNA, screen precedents, and current task outcome;
2. theme/token source, CSS variables, Tailwind or styling configuration, component library, and icon system;
3. existing primitives, patterns, feature components, repeated markup, and their consumers;
4. state, responsive behavior, accessibility conventions, and tests relevant to the affected components.

Identify the current source of truth and the smallest foundation change that improves the active outcome. Do not invent a replacement system when a usable project system already exists.

## Component architecture

Keep boundaries legible:

- **Primitive**: stable cross-feature controls such as Button, Input, Badge, Dialog, Tooltip, Skeleton, and foundational layout utilities.
- **Pattern**: repeated structures such as PageHeader, FilterBar, FormSection, DataTable shell, EmptyState, or StatCard.
- **Feature component**: domain-specific UI and behavior with a clear owner.
- **Page composition**: arranges patterns and features around a user task; it should not hide every layout decision behind generic wrappers.

Extract a shared component when reuse is real or clearly imminent, the structure and states are sufficiently alike, and a stable API reduces duplication. Before changing one, map consumers, variants, behavior invariants, responsive behavior, and regression risk.

## Token and quality discipline

Use the project's visual source of truth for color, typography, spacing, radius, border, shadow, z-index, breakpoint, and motion. Audit every added visual property individually. A component is not fully token-compliant merely because some of its values use tokens.

If a needed token does not exist, use a semantically appropriate existing token or add a small, reusable token with a documented reason. Never introduce arbitrary visual literals just to finish one screen. Keep component variants semantic and avoid exposing unrestricted style escape hatches by default.

## Refactor behavior

- Preserve observable behavior, data flow, validation, API integration, and permission behavior unless the user explicitly requests a change.
- Separate structural cleanup, component extraction, and visual changes conceptually so the diff remains reviewable.
- Migrate repeated markup in coherent units. Do not leave old and new versions with subtly different states or semantics.
- Keep component APIs small, named by meaning, and consistent with the project. Avoid prop combinations that permit impossible states.
- Handle relevant loading, empty, error, disabled, success, focus, keyboard, permission-limited, and responsive states at the correct level.

## Routing references

- Read [references/component-architecture.md](references/component-architecture.md) when deciding boundaries or API shape.
- Read [references/token-audit.md](references/token-audit.md) whenever adding or reviewing visual values.
- Read [references/shared-component-guidelines.md](references/shared-component-guidelines.md) when extracting or migrating buttons, forms, cards, dialogs, tables, or other repeated UI.
- Read [references/design-system-anti-patterns.md](references/design-system-anti-patterns.md) when a refactor risks over-abstraction, duplicate systems, or component sprawl.
- Read [references/foundation-pass.md](references/foundation-pass.md) for a new project, broad inconsistency, or a meaningful foundation pass.

## Verification and report

Review the diff and all affected consumers. Run the relevant lint, typecheck, test, build, and visual/runtime checks available in the project. Verify token compliance per changed property, state coverage, responsive behavior, accessibility, and behavior preservation.

Report the foundation or shared components changed, feature-local composition changed, consumers checked, behavior preserved, proactive improvements, validation results, assumptions, and remaining manual checks. Do not claim full consistency from a partial audit.
