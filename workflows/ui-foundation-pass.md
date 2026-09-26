# UI Foundation Pass Workflow

Use this workflow for a new frontend feature, a substantial redesign, or a UI with no coherent foundation. It does not require building a large design system for every small task.

## 1. Discover

- Read project instructions, Project Visual DNA when available, target page, and user goal.
- Map theme/token sources, component library, shared component directory, styling approach, icon set, and screen precedent.
- Inventory existing primitives and patterns before creating new ones.
- Identify visual gaps that actually block the feature: inconsistent tokens, missing states, repeated markup, weak hierarchy, responsive issues, or accessibility gaps.

## 2. Choose foundation scope

- **Reuse:** an existing component/token already fits.
- **Extend:** a small variant/token/pattern is needed for the outcome.
- **Create:** a missing primitive/pattern has demonstrated reuse.
- **Local:** composition belongs to this feature and need not be extracted.

Prefer the smallest coherent system over a quick page with arbitrary values or an unnecessary new UI framework.

## 3. Define implementation

- Set visual direction from the product, not global preference.
- Plan hierarchy, density, responsive behavior, states, action feedback, and accessibility.
- Map every new visual value to the applicable token/source of truth.
- For shared components, identify consumers, contract/variants, behavior invariants, and migration impact.
- Keep APIs, data flow, authentication, permissions, and business rules unchanged unless the active outcome includes them and the API caution protocol has been followed.

## 4. Build

- Implement the foundation supported by evidence, then build the feature/page on it.
- Use shared components for repeated behavior/structure; keep page-specific styling out of global primitives.
- Add relevant supporting UI: states, helper content, empty treatments, feedback, responsive adaptation, or accessibility affordances.
- Avoid hardcoded visual values that violate the project's source of truth, duplicate markup, and one-off variants that should be shared patterns.

## 5. Verify

- Review changed lines against token rules, reusable-pattern decisions, and project visual direction.
- Check consumers of changed shared components.
- Run relevant lint/typecheck/test/build commands.
- When a runtime is available, inspect real pages at relevant viewports; check normal/loading/empty/error/disabled states, overflow, focus, keyboard, touch, contrast, and console.
- Report when visual inspection could not be run; lint/typecheck does not prove visual quality.

## 6. Report

Clearly distinguish shared foundation/token/component changes, feature/page-specific composition, proactive quality improvements, API/behavior intentionally preserved, and validation/manual visual checks still outstanding.
