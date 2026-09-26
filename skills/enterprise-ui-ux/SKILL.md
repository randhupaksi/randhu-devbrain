---
name: enterprise-ui-ux
description: Design, implement, or review enterprise application UI for dashboards, admin panels, internal tools, CRUD, and data-heavy products. Use for product interfaces, not marketing or landing-page art direction.
---

# Enterprise UI/UX

Build working software interfaces that feel intentional, efficient, readable, and production-ready. Favor task completion, information hierarchy, usability, accessibility, and project consistency over decoration.

## Scope and priority

- This skill serves web applications, dashboards, admin panels, management systems, SaaS products, operational tools, LMS, and data-heavy workflows. It is not a default style guide for marketing pages or cinematic landing pages.
- Follow the active user request first. Preserve the project's visual identity, tokens, component system, conventions, and behavior unless the task explicitly changes them.
- Do not install libraries or invent a new design system when the project already has a usable one. Do not change API contracts, data semantics, authorization, or business flows merely for UI convenience.

## Decide before styling

For new UI or a meaningful redesign, establish proportionately:

1. the user role, primary job, important data, primary action, and secondary actions;
2. which information must remain visible, searchable, comparable, or progressively disclosed;
3. normal, loading, empty, error, disabled, permission-limited, and destructive-action states that matter;
4. the project's tokens, shared primitives, existing screen precedents, responsive behavior, and accessibility conventions.

Start with task flow and information architecture. Choose a table, form, card, modal, drawer, toolbar, or page composition because it supports that task—not because it is fashionable.

## Enterprise interface principles

- Be minimal, not empty: preserve useful density while keeping grouping, spacing, and scanning comfortable.
- Use typography, alignment, spacing, grouping, contrast, borders, and layout for hierarchy before adding shadows, color, or containers.
- Make action hierarchy explicit: primary, secondary, tertiary, and destructive actions must not compete.
- Treat tables as first-class interfaces when users compare, filter, scan, sort, or act on many records. Do not convert them to cards by default.
- Use color semantically for status, priority, interaction, and brand. Neutral surfaces should carry most structure; avoid rainbow KPI treatments.
- Use motion only as subtle feedback or continuity. Preserve focus states and support reduced motion.
- Reuse project primitives and extract a shared pattern only when reuse or a stable UI contract is evident. Keep one-off composition feature-local.

## Avoid generic AI output

Do not default to card grids, nested rounded containers, large greeting banners, oversized headings, decorative icons, random gradients, glass effects, excessive shadows, pills, whitespace, charts, or marketing copy. Each visual treatment must clarify a task, state, relationship, or priority.

Read [references/anti-ai-slop.md](references/anti-ai-slop.md) for a design or cleanup review. Read [references/enterprise-patterns.md](references/enterprise-patterns.md) when selecting or implementing a specific product pattern.

## Implementation and review

- Use semantic HTML, visible labels, keyboard access, useful focus treatment, sufficient contrast, descriptive control names, and status feedback that does not rely on color alone.
- Design responsive behavior intentionally: decide what stacks, collapses, scrolls, stays visible, or becomes detail disclosure. Do not merely shrink desktop UI.
- After meaningful UI work, review alignment, rhythm, hierarchy, interaction states, responsive behavior, accessibility, information density, and unnecessary decoration. Remove visual elements with no clear contribution.

If an explicit design request creates a serious usability or accessibility problem, state the concern and implement the closest safe interpretation; do not silently ignore the request.

## Autonomy and selective context

Read this skill only when its scope matches the task. References are optional decision aids: open only the ones needed for the current decision, never the entire references directory. Reuse context already loaded. Read-only requests remain read-only.

For relevant low-risk work, proceed; for medium-risk work, map impact and consumers, then implement without an extra approval gate. Creative composition, supporting states, accessibility, naming, and maintainability improvements are welcome within the requested outcome. Do not invent business capabilities, API fields/endpoints, data semantics, or workflows. Do not rewrite merely to match a preferred architecture.

Ask only when unresolved ambiguity changes the business outcome or a high-risk boundary. Before changing auth/permission/security, breaking API contracts, destructive migrations/data rewrites, client/production data, payment, deployment, secrets, or Git history/remote state, require specific authorization for that action and scope. Do not ask again when that authorization is already explicit. Continue independent safe work.
