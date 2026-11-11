# UI/UX Task Workflow

## Analyze

- Identify the page goal, target user, primary task, data density, and existing visual language.
- For a new page, substantial redesign, or hierarchy critique, use `core/ui-design-intelligence.md` to rank the task content/actions and form a concise, evidence-based direction. A small UI fix does not need a separate design brief.
- Discover the actual route/component, Project Visual DNA, theme/token source, styling conventions, UI library, shared primitives/patterns, responsive rules, relevant state/API dependencies, affected consumers, and screen precedents.
- Decide whether reuse is enough, a small foundation extension is needed, a shared component is justified, or the work should remain feature-local.
- Treat screenshots or subjective language as evidence, not permission to guess business behavior.

## Define direction

Explain the visual/UX problem, task-priority order, evidence behind the design direction, changed areas, preserved behavior, responsive strategy, and foundation to reuse/extend/create. Keep style, composition, and theme as distinct choices. Derive visual direction from project context, not an AI template. State a defensible assumption and proceed for low- or medium-risk choices; do not add an approval pause unless a material product decision remains unresolved.

Map every new visual value to project tokens or another source of truth. If a shared component must change, map consumers and preserve its contract.

## Implement

UI changes may cover layout, hierarchy, styling, component presentation, interaction feedback, loading/empty/error states, and responsiveness. Prefer existing primitives/patterns. Create or extend a shared component when reuse or cross-feature consistency is real; keep one-off feature-specific elements local to avoid over-abstraction. Do not change APIs, payloads, business rules, authentication, permissions, or data flow unless the task requests it.

Use substantial creative freedom while staying consistent with the project's design system and theme. Do not stop at cosmetic changes when the real issue calls for better hierarchy, composition, responsive structure, or experience states.

Explore composition and hierarchy creatively toward the outcome. Add relevant supporting UI, responsive adaptation, and state feedback. Run a foundation pass only when needed. Do not add business features, endpoints, fields, or backend flows to a redesign that did not request them.

Review user-facing strings with their actual states and actions. Keep terminology, product voice, localization variables, accessible labels, and consequences consistent. Natural copy must accurately describe what the implementation supports. Dedicated copy or voice work can select humanize; ordinary UI work uses the default language principles.

## Verify

Check relevant normal/loading/empty/error/disabled/permission-limited states; relevant desktop/tablet/mobile sizes; long or localized content where relevant; overflow; focus/keyboard; touch targets; contrast/readability; console errors; each new visual value's token compliance; and regressions in shared components. Treat screenshot and detector findings as evidence only for what they actually show.

When a browser/runtime is available and the task makes meaningful visual changes, inspect the real page at relevant wide and narrow viewports. Compare it with the design goal and do not infer visual quality from lint/typecheck or an anti-slop detector alone. If the runtime cannot be run, state that visual verification was not performed.

Keep browser profiles, caches and screenshots inside the authorized workspace. Use existing validation tools rather than automatically installing packages. If sandbox restrictions block rendering, report the limitation; do not disable the browser sandbox, expand filesystem access or repeat equivalent failing launches to obtain a screenshot.

Clean up only verified generated artifacts within that workspace. If cleanup is denied, report the remaining artifacts; do not move them to external TEMP directories or another location to bypass the boundary.
