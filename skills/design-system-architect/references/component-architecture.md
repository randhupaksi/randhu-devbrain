# Component Architecture

Use the smallest boundary that makes responsibility, reuse, and change impact clear.

## Levels

| Level | Owns | Example | Avoid |
|---|---|---|---|
| Primitive | Stable interaction and visual contract | Button, Input, Dialog, Badge | Domain fetching or page-specific business rules |
| Pattern | Repeated composition and shared states | FilterBar, FormSection, EmptyState | A wrapper used once with no stable contract |
| Feature | Domain behavior and feature-specific UI | AttendanceTable, CheckoutForm | Pretending different domain behavior is generic |
| Page | Task-oriented composition | AttendancePage, ProjectOverview | A monolithic file holding every reusable detail |

## Extraction test

Extract when at least one of these is true:

- the same structure and behavior already appears in two or more contexts;
- the component is a core control whose states must remain consistent everywhere;
- a stable contract will prevent a known class of repeated mistakes;
- a requested design-system refactor explicitly requires a shared boundary.

Keep it local when markup is genuinely editorial or one-off, the consumer requirements diverge, or extraction would require many speculative props. A local component can still consume shared primitives and tokens.

## API shape

Name props by intent (`variant`, `size`, `loading`, `disabled`, `tone`) and keep invalid combinations difficult to express. Prefer semantic variants over arbitrary style props. Preserve keyboard behavior, focus treatment, accessible names, and state feedback as part of the component contract.
