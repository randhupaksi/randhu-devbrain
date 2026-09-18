---
name: marketing-portfolio-ui-ux
description: Design, implement, or review clean, premium marketing websites, landing pages, portfolios, and case studies. Use for narrative and conversion surfaces, not data-heavy product UI.
---

# Marketing & Portfolio UI/UX

Build marketing and portfolio interfaces that feel intentional, clean, minimal, interactive, and memorable. Optimize for a visitor understanding the value, trusting the proof, and taking the next relevant action—not for operational data density.

## Scope and priority

- Use this skill for product marketing sites, landing pages, personal portfolios, agency sites, showcase pages, and case studies. Use `enterprise-ui-ux` for dashboards, internal tools, CRUD, and data-heavy product workflows.
- Follow the active user request first. Preserve the project's visual identity, tokens, shared components, conventions, content, and behavior unless the task explicitly changes them.
- Do not invent client logos, testimonials, metrics, awards, customers, project outcomes, or product claims. Use real supplied content, existing project content, or clearly marked placeholders.
- Do not add dependencies, replace the design system, or change API/auth/business behavior merely to make a page look better.

## Understand the page before styling

For new pages or meaningful redesigns, establish proportionately:

1. the audience, page goal, primary message, desired action, and credibility needed;
2. the product, person, project, service, or work being presented and what proof is available;
3. the project's Visual DNA: tokens, typography, brand, imagery, component patterns, motion language, responsive conventions, and screen precedents;
4. the content hierarchy: what must be understood immediately, explored next, and acted on last.

Use composition, typography, contrast, spacing, imagery, and interaction to make the story clear. Do not copy a familiar landing-page structure unless it supports the message and audience.

## Clean, premium, interactive direction

- Minimal means low visual noise, not empty space or missing information. Give each section a distinct job and visual reason to exist.
- Build hierarchy through type scale, alignment, grouping, rhythm, and contrast before reaching for gradients, cards, shadows, or decorative effects.
- Use the brand and project design system as the source of truth. If the project has no usable foundation, create only the small, reusable foundation needed by the active outcome.
- Make interaction feel responsive and purposeful: clear hover/focus states, restrained transitions, and motion that supports orientation or emphasis. Respect reduced-motion preferences.
- Reuse a primitive or section pattern when its structure and behavior are genuinely shared. Keep one-off editorial composition local to the page or feature.

## Story and conversion

- Make the first viewport answer the visitor's most important question: what this is, who it helps, and why it matters.
- Arrange sections as a coherent journey: proposition, explanation, proof, showcase, deeper detail, and an appropriate next action. The exact order is contextual.
- Let portfolio work demonstrate thinking and contribution, not only final screenshots. Case studies should distinguish problem, role, approach, and outcome when evidence exists.
- Use CTAs deliberately. A single primary action is often clearer than repeated competing buttons; secondary paths should have a real purpose.

## Avoid generic output

Do not default to gradients, glass, blobs, glow, floating cards, stock-like copy, oversized hero text, repetitive two-column sections, fake social proof, or motion for decoration. Every treatment must improve meaning, trust, hierarchy, recognition, or action.

- Read [references/anti-ai-slop.md](references/anti-ai-slop.md) for design/cleanup reviews and whenever the direction risks looking template-like.
- Read [references/marketing-patterns.md](references/marketing-patterns.md) for landing pages, product marketing, campaigns, and conversion surfaces.
- Read [references/portfolio-patterns.md](references/portfolio-patterns.md) for personal portfolios, selected work, and case studies.
- Read [references/visual-storytelling.md](references/visual-storytelling.md) for a new page or meaningful composition redesign.

## Implementation and review

- Use semantic HTML, descriptive controls, keyboard access, visible focus states, sufficient contrast, and responsive layouts that are intentionally recomposed—not merely shrunk.
- Keep page weight reasonable: use existing image/media optimization patterns, avoid heavy decorative assets, and do not let animation block content or interaction.
- Before finishing, check message clarity, visual hierarchy, authenticity of claims, CTA priority, section rhythm, responsive behavior, accessibility, and unnecessary decoration.

If an explicit design request would cause a serious usability or accessibility issue, state the concern and implement the closest safe interpretation rather than silently ignoring it.
