# UI/UX Principles

## Global quality

UI should be clean, polished, professional, context-aware, easy to understand, and unlike a generic template. These are quality standards, not one universal visual style.

“Premium” means considered design decisions: strong hierarchy, comfortable spacing, refined typography, controlled color, consistent components, and subtle interaction. It does not mean visual noise, abundant gradients, heavy shadows, glassmorphism, or excessive animation.

“Clean” means low visual noise without emptiness. Every element has a purpose, information is easy to scan, and important actions are easy to find.

## Project identity

Derive the visual direction from project context and the existing product. Do not globally prescribe a dark/light theme, brand colors or fonts, spacing/radius/shadow/density, a dashboard layout, an icon/component library, or an enterprise, playful, friendly, brutalist, or other style.

Enterprise, consumer, school, healthcare, point-of-sale, SaaS, and portfolio products can look different. What stays consistent is polish, clarity, usability, and awareness of context.

## Design-system-first

Before meaningful UI changes, find the project's visual source of truth: theme/tokens, component library, shared components, existing patterns, and Project Visual DNA when available. Build new features on that foundation; do not create a beautiful page outside the product's visual language.

When the foundation is absent or inconsistent, build only what the active outcome needs: necessary semantic tokens, reusable primitives/patterns, and important UX states. This is not permission to create a large design system or replace the whole product UI without a real need. See `design-system-intelligence.md` and `workflows/ui-foundation-pass.md` for implementation guidance.

## Decision framework

Before a substantial redesign or UI change:

1. Understand the page goal, target user, role, data, primary action, and existing flow.
2. Inspect component structure, shared dependencies, state, API usage, permissions, and responsive behavior.
3. Find real issues in hierarchy, density, spacing, typography, calls to action, navigation, tables/forms/modals, feedback states, or responsiveness.
4. Choose a direction from project context rather than AI habits.
5. Explain visual scope, preserved behavior, trade-offs, and risks.
6. When a requested major redesign or shared-layout change is involved, proceed after impact analysis; extra approval is needed only if a high-risk boundary is affected.

When target users or business needs are undocumented, review the available evidence first. For low- and medium-risk work, use and state a reasonable assumption, then proceed. Ask only when unresolved ambiguity could cause a material business outcome that cannot be chosen defensibly or affects a high-risk boundary.

## Visual tools

- Use color to clarify brand, hierarchy, and status; maintain contrast and avoid noise.
- Icons should aid understanding; keep style, size, stroke, alignment, labels, and tooltips coherent.
- Let radius follow the project's character and remain consistent.
- Use shadows for meaningful depth/separation, not on every component.
- Animation should provide feedback or continuity; keep it light, natural, and unobtrusive.
- Set spacing based on density, content relationships, form factor, target device, and page goal—not a universal number.

## Required experience states

For relevant surfaces, consider normal, loading, empty, error, incomplete-data, disabled, success, and permission-limited states. Judge quality beyond the happy path or a full-data screenshot.

## Creative freedom

For low- and medium-risk UI/UX tasks, use substantial creative freedom in composition, hierarchy, layout, responsive adaptation, component presentation, interaction feedback, micro-interactions, and supporting states. Anchor creativity in the page goal, target user, project theme, design system, tokens, component patterns, and existing behavior.

Make substantial visual changes without extra approval when the redesign is requested or clearly part of the outcome. Do not replace project identity with generic AI taste, mix incompatible visual languages, or change business behavior for design reasons.

Randhu's default is maximum project-anchored creative authority within the low/medium-risk scope and boundaries above. Do not preserve a composition or layout merely because it already exists. Restructure sections, information hierarchy, navigation presentation, card/table/form/modal composition, responsive behavior, feedback states, and interaction patterns when that produces a more mature result that fits the product.

Add relevant supporting UI when useful: summaries, contextual actions, status treatments, helper content, progressive disclosure, skeleton/empty/error states, accessibility affordances, or micro-interactions. This freedom does not permit silent changes to API contracts, data semantics, authentication, permissions, or business rules.

Frontend creativity also includes improving composition and component architecture. Turn repeated markup into a shared primitive/pattern when reuse or consistency is real; do not invent abstractions for one-off elements.

Consider loading, empty, error, incomplete-data, disabled, and submit states. Use skeletons when the initial content structure should remain visible. A local spinner can suit a refresh/filter operation on an already populated area. Do not replace the whole page with a loading screen when only one region is updating.

Consider responsive behavior from the start. Check overflow, tables, modals, navigation, touch targets, safe areas, readability, and action accessibility at relevant screen sizes.
