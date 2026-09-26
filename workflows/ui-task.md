# UI/UX Task Workflow

## Analyze

- Identify the page goal, target user, primary task, data density, and existing visual language.
- Discover the design system: inspect Project Visual DNA, theme/token source, styling conventions, UI library, shared primitives/patterns, and screen precedent.
- Decide whether reuse is enough, a small foundation extension is needed, a shared component is justified, or the work should remain feature-local.
- Inspect the project's design system, shared components, responsive rules, state/API dependencies, and affected screens.
- Treat screenshots or subjective language as evidence, not permission to guess business behavior.

## Define direction

Explain the visual/UX problem, improvement direction, changed areas, preserved behavior, responsive strategy, and foundation to reuse/extend/create. Derive visual direction from project context, not an AI template.

Map every new visual value to project tokens or another source of truth. If a shared component must change, map consumers and preserve its contract.

## Implement

UI changes may cover layout, hierarchy, styling, component presentation, interaction feedback, loading/empty/error states, and responsiveness. Prefer existing primitives/patterns. Create or extend a shared component when reuse or cross-feature consistency is real; keep one-off feature-specific elements local to avoid over-abstraction. Do not change APIs, payloads, business rules, authentication, permissions, or data flow unless the task requests it.

Use substantial creative freedom while staying consistent with the project's design system and theme. Do not stop at cosmetic changes when the real issue calls for better hierarchy, composition, responsive structure, or experience states.

Explore composition and hierarchy creatively toward the outcome. Add relevant supporting UI, responsive adaptation, and state feedback. Run a foundation pass only when needed. Do not add business features, endpoints, fields, or backend flows to a redesign that did not request them.

## Verify

Check relevant normal/loading/empty/error/disabled/permission-limited states; relevant desktop/tablet/mobile sizes; overflow; focus/keyboard; touch targets; contrast/readability; console errors; each new visual value's token compliance; and regressions in shared components.

When a browser/runtime is available and the task makes meaningful visual changes, inspect the real page at relevant viewports. Compare it with the design goal and do not infer visual quality from lint/typecheck alone. If the runtime cannot be run, state that visual verification was not performed.
