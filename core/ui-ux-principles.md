# UI/UX Principles

## What quality means

There is no universally perfect interface. Usability belongs to specified people pursuing specified goals in a real context. Judge whether they can reach the right outcome accurately, with reasonable effort, confidence, and satisfaction in that context; also consider risk, accessibility, and coverage of the contexts the product actually supports. A polished screenshot is evidence of appearance at one state and viewport, not proof of a successful experience.

UI is the perceivable and operable interface layer. UX includes the wider journey around using the product: expectations, content, navigation, interaction, feedback, recovery, performance, trust, and the conditions in which people use it. Strong visual design supports a useful experience; it cannot compensate for false information, broken task flow, inaccessible controls, or unsafe consequences.

### Quality priority

Use this order to diagnose trade-offs and decide what to fix first. Accessibility and safety are gates across every layer, not lower-priority polish.

1. **Truth and safety:** content, data, permissions, cost, risk, and action consequences are accurate and visible; the UI does not imply capabilities the product lacks.
2. **User outcome:** the surface solves a real need and lets the intended user complete the primary task.
3. **Comprehension:** information architecture, labels, hierarchy, terminology, and current system state make the next step understandable.
4. **Control and recovery:** controls behave predictably; the user can prevent, cancel, correct, undo, or recover from consequential mistakes where the system supports it.
5. **Inclusive access:** perception, operation, understanding, and compatibility work across supported abilities, assistive technologies, input methods, text sizes, languages, and device contexts.
6. **Efficiency and comfort:** repeated work, density, response time, cognitive load, and physical effort fit the use frequency and environment.
7. **Product identity and visual craft:** composition, typography, color, imagery, interaction, and motion make the product coherent and recognisable while strengthening the task.
8. **Finishing detail:** precise spacing, icon alignment, transitions, and micro-feedback refine an already sound experience.

Do not average away a serious failure in truth, safety, access, or core task completion because a page scores well on visual polish. Conversely, a quiet or plain visual style can be excellent when it fits the product and helps people work.

## Human-centred design loop

For meaningful work, use an iterative loop proportional to impact:

1. **Understand:** identify likely users, their goals, current workarounds, environment, frequency, constraints, and consequences of error. Inspect existing research, support issues, analytics, and product behavior before inventing a persona.
2. **Define:** describe the user problem and success condition without prescribing a UI solution. Separate known facts, direct observations, assumptions, and unknowns.
3. **Explore:** compare flow and structure options, reuse platform and product conventions where they help, and prototype the risky or unfamiliar interaction.
4. **Implement:** use the project’s real stack and design system; keep content, behavior, semantic structure, and visual presentation aligned.
5. **Evaluate:** inspect actual task flows, rendered states, accessibility, responsive behavior, errors, and performance. Use user evidence for claims about comprehension or satisfaction; code and screenshots answer only the questions they can actually show.
6. **Iterate:** keep, adjust, or remove design decisions based on observed results. State the limits when users, runtime, or assistive technology were not available for validation.

An agent often cannot interview users during a coding task. It must not pretend it did. Use available product evidence, make a clearly labeled low-risk assumption, and design the result so it can be evaluated. Ask when a consequential requirement cannot be inferred safely.

## Interaction principles

- **Show status:** acknowledge input promptly and distinguish idle, processing, queued, complete, partial, stale, offline, and failed states where they exist.
- **Use the user’s concepts:** prefer domain language people recognize; expose unfamiliar terms when they are necessary and provide context.
- **Preserve agency:** make exits, back, cancel, undo, pause, and destructive consequences clear. Do not make a decorative confirmation the only protection against a high-cost error.
- **Prevent and recover from errors:** constrain invalid input where appropriate, preserve entered values, identify the field or issue, explain a useful correction, and keep recovery local to the failed action.
- **Favor recognition:** keep needed options, context, units, and prior selections visible or retrievable instead of relying on memory.
- **Be consistent with purpose:** use the same labels, colors, controls, and interaction patterns for the same meaning. Follow platform conventions unless a clear user need justifies a different pattern.
- **Support expertise without burdening newcomers:** provide efficient shortcuts and dense views when they help; keep essential paths discoverable and offer sensible defaults that do not silently change business meaning.
- **Make help timely:** place optional guidance near the point of need; keep it searchable and actionable. Avoid blocking experienced users with repeated tutorials.
- **Treat content as interface:** instructions, labels, prices, units, permissions, empty states, errors, and confirmation copy shape task success. Never invent proof, guarantees, records, or product capability.

These are diagnostic heuristics, not a mechanical checklist. A finding still needs evidence from the affected interface and its actual context.

## Accessibility is foundational

Use the project’s required conformance target and specialist skill for a dedicated audit. For ordinary UI work, preserve semantic elements and accessible names; keyboard and non-pointer access; visible, unobscured focus; meaningful reading and focus order; text alternatives for informative visuals; captions or transcripts for relevant media; sufficient contrast; reflow and zoom; text scaling and localization; clear validation and status announcements; and reduced motion. Do not rely on color, shape, sound, hover, drag, or animation alone for essential information or action.

Apply the relevant platform and WCAG guidance to the actual control and context. Do not label a design “WCAG compliant” from a visual impression or a static checklist. For complex data graphics, give people an equivalent summary or data representation, not only a short decorative label.

## Avoid generic AI output without flattening design

“Anti-slop” means removing decisions with no product, content, or interaction reason; it does not mean removing personality. Review common defaults as candidates: identical card grids on every page, one oversized hero regardless of product, repeated three-column feature blocks, decorative KPI tiles, fake customer proof, icons in every label, purple/blue gradients on every surface, translucent panels with unreadable text, excessive pills, artificial urgency, generic marketing copy, hover-only affordances, autoplay motion, and the same spacing or typography rhythm everywhere.

Keep any treatment that expresses the real brand, clarifies hierarchy, represents content, provides feedback, or supports a task. Do not change an intentional system merely because a heuristic or style detector dislikes it. Do not add ornament to make a page look “designed”; improve its content structure, information hierarchy, visual rhythm, interaction quality, and responsive behavior first.

## Evaluation evidence

Separate what is **implemented**, **visible in a rendered state**, **observed in a user task**, and **assumed**. Prefer actual task evidence over aesthetic preference. A source review can establish a token or semantic contract; a screenshot can establish visual presentation for that state and viewport; interaction testing can establish specific behavior; user research is needed for confidence about real comprehension, trust, and satisfaction. Heuristic and accessibility reviews find risks but do not prove overall usability.

Report the checks that matter for the requested surface. A severity label, quality score, or “polished” claim needs an evidence note. Do not hide a blocker by averaging dimensions or reporting only successful checks.

## Global quality

UI should be clean, polished, professional, context-aware, easy to understand, and unlike a generic template. These are quality standards, not one universal visual style.

“Premium” means considered design decisions: strong hierarchy, comfortable spacing, refined typography, controlled color, consistent components, and subtle interaction. It does not mean visual noise, abundant gradients, heavy shadows, glassmorphism, or excessive animation.

“Clean” means low visual noise without emptiness. Every element has a purpose, information is easy to scan, and important actions are easy to find.

## Project identity

Derive the visual direction from project context and the existing product. Do not globally prescribe a dark/light theme, brand colors or fonts, spacing/radius/shadow/density, a dashboard layout, an icon/component library, or an enterprise, playful, friendly, brutalist, or other style.

Enterprise, consumer, school, healthcare, point-of-sale, SaaS, and portfolio products can look different. What stays consistent is polish, clarity, usability, and awareness of context.

## Design-system-first

Before meaningful UI changes, find the project's visual source of truth: theme/tokens, component library, shared components, existing patterns, and Project Visual DNA when available. Build new features on that foundation; do not create a beautiful page outside the product's visual language.

When the foundation is absent or inconsistent, build only what the active outcome needs: necessary semantic tokens, reusable primitives/patterns, and important UX states. This is not permission to create a large design system or replace the whole product UI without a real need. See [UI Design Intelligence](ui-design-intelligence.md) for context-aware visual direction and evidence-led critique, and `design-system-intelligence.md` plus `workflows/ui-foundation-pass.md` for implementation guidance.

## Decision framework

Before a substantial redesign or UI change:

1. Understand the page goal, target user, role, data, primary action, and existing flow.
2. Inspect component structure, shared dependencies, state, API usage, permissions, and responsive behavior.
3. Find real issues in hierarchy, density, spacing, typography, calls to action, navigation, tables/forms/modals, feedback states, or responsiveness.
4. Rank the content and actions before styling, then choose a direction from project context rather than AI habits. Use [UI Design Intelligence](ui-design-intelligence.md) for its task-priority hierarchy method and deliberate visual-direction reasoning.
5. Explain visual scope, preserved behavior, trade-offs, and risks.
6. When a requested major redesign or shared-layout change is involved, proceed after impact analysis; extra approval is needed only if a high-risk boundary is affected.

When target users or business needs are undocumented, review the available evidence first. For low- and medium-risk work, use and state a reasonable assumption, then proceed. Ask only when unresolved ambiguity could cause a material business outcome that cannot be chosen defensibly or affects a high-risk boundary.

Visual prominence should express task importance, relationships, state, and available action. Do not treat size, color, position, cards, or motion as a universal ranking system; choose cues that fit the product's visual style while preserving semantic meaning and access.

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

## Human interface language

Treat UI text as part of task design. Use the project's voice and language; choose concrete labels, helpful constraints, and honest loading, empty, error, success, and permission messages. Distinguish a queued action from completion and no search matches from no records. Offer actions only when the role and implementation support them. Preserve consequences, consent, accessibility names, translation keys, variables, and plural syntax. Avoid generic marketing filler, blame, invented guarantees, and implementation details that do not help the person decide what to do. Routine copy follows these principles without an additional skill; use [humanize](../skills/humanize/SKILL.md) for a dedicated or substantial editorial pass.
