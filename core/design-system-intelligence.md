# Design System Intelligence

## Purpose

For frontend work, think like a product-minded frontend engineer: create a polished, consistent experience that is easy to evolve. A good UI is not merely attractive in one screenshot; it stays coherent as features grow, states change, and screens adapt to different devices.

DevBrain does not prescribe universal colors, fonts, radii, libraries, or visual styles. First discover the active project's visual identity and source of truth.

## Discover the design system first

Before meaningful UI work, inspect what is relevant:

1. Project instructions, Project Visual DNA, screenshots, and existing screens that provide precedent.
2. Theme, tokens, CSS variables, Tailwind configuration, design-system package, or style source of truth.
3. Shared components, primitives, feature patterns, and component libraries already in use.
4. Product purpose, target user, primary task, data density, platform, and responsive behavior.
5. Relevant states: normal, loading, empty, error, disabled, permission-limited, success, and partial data.

Do not apply the AI's default visual taste when project evidence exists. Reuse and extend an existing design system in its own visual language. If there is no system or it is fragmented, create only the lightweight foundation the active outcome needs.

## Project Visual DNA

Each project should have a describable visual character, not merely a color list. Read or infer the users and their product context; appropriate product feel (calm, fast, formal, friendly, data-dense, exploratory, for example); information hierarchy and primary actions; color mode, brand, typography, density, radius, elevation, iconography, and motion; visual anti-patterns that do not fit; and the existing screens or features that provide the strongest precedent.

When Visual DNA is undocumented but a UI exists, use its most mature implementation as precedent. For a new project without sufficient direction, propose a concise Visual DNA and a consistent low- or medium-risk foundation. Do not present an initial proposal as a finalized brand.

## Tokens and visual consistency

Use the existing source of truth for color, typography, spacing, radius, shadow, borders, z-index, breakpoints, and motion. Do not choose unrelated visual values merely to finish a page.

If the project has no tokens, follow an existing convention or library when possible. Add a small foundation only when repeated use or consistency requires it. Choose semantic names that express purpose, not page names or contextless numbers. Do not create a large token catalog before a real need appears.

For projects with strict token rules, audit each new visual property. A change is not fully token-compliant just because some properties use tokens. For a small change, use the nearest existing token; when a clear recurring need exists, add an appropriate token and explain why.

## Component architecture

Use four clear levels:

1. **Primitive:** stable cross-feature elements such as Button, Input, Badge, Card, Dialog, Tooltip, and Skeleton.
2. **Pattern:** repeated structures such as PageHeader, FilterBar, DataTable shell, EmptyState, FormSection, StatCard, or toolbar.
3. **Feature component:** UI and behavior specific to a product domain or area.
4. **Page composition:** combines patterns and feature components around the page goal; avoid keeping all UI detail in one page file once readability suffers.

Use or create a shared component when it has real reuse in two or more contexts or is clearly part of the project's core UI language. Keep truly one-off compositions near their feature/page. Do not split one screen into many tiny files just to appear componentized.

A wrapper around a component library is useful only when it adds real project value: semantic variants, accessibility behavior, a visual contract, consistent states, or a safer API. Do not create empty wrappers for every library component.

## Decide whether to extract a component

Before creating a shared component, ask whether the pattern already exists or is clearly needed across screens/features; whether consumers need sufficiently similar structure, state, and API; whether the abstraction simplifies pages or hides important layout; whether an existing primitive/library can be configured directly; and whether changing the shared component is safe for current consumers.

When evidence is weak, keep it as a clean feature-local component and extract it once reuse is proven. When a shared component is justified, map affected consumers, preserve compatibility, and visually/regression-test relevant consumers.

## Product-quality UI

For low- and medium-risk work, freely improve hierarchy, page composition, empty/loading/error states, responsive patterns, interaction feedback, accessibility affordances, supporting copy, and micro-interactions. Prioritize clarity and comfort for the primary task, not decoration.

To avoid generic results, start with the user's task, data density, and product context; use contrast, typography, spacing, grouping, and progressive disclosure to establish hierarchy; choose components, motion, and surfaces for a purpose; avoid unrelated dashboard/landing-page templates; and do not automatically use gradients, glass, shadows, animation, rounded cards, or icons. Do not give every page the same hero, KPI cards, and CTA when their contexts differ.

## Dependencies and libraries

Prefer the project's stack, component library, icon set, utilities, and token system. Do not install another UI library when the project already has a clear foundation and the new library would duplicate it.

Add a dependency only when its benefit is specific, it fits the stack, is maintained, adds little overlap, and is safer than building the capability. For broad or client/production-impacting changes, explain the rationale, footprint, compatibility, and validation. A dependency is not a substitute for understanding the design system.

## Foundation pass and scope

When a UI task reveals an inconsistent or missing foundation, make a proportionate foundation pass: inventory what exists, choose a source of truth, refine only the needed primitives/patterns, then build the feature on that foundation.

Do not redesign the entire product or migrate all consumers because one task needs a button. Improve the foundation only as far as it directly serves the active outcome, demonstrated reuse, or a real inconsistency. Broader work may proceed when required by the task, impact is mapped, and no unapproved high-risk boundary is crossed.

## UI foundation completion criteria

When relevant to the task, a mature frontend result uses the project's visual identity and source of truth; repeated UI uses suitable primitives/patterns without speculative abstraction; page-specific layout remains readable; relevant normal, loading, empty, error, disabled, and permission-aware states are handled; desktop, tablet, and mobile are considered at relevant viewports; keyboard, focus, touch targets, contrast, semantic labels, and interaction feedback are addressed; business logic, API contracts, authentication, permissions, and data semantics stay safe; the diff is checked for hardcoded visual values, duplicate patterns, and shared-consumer regressions; and meaningful visual changes receive visual verification when a runtime is available.
