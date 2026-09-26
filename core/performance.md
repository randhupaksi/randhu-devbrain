# Performance Principles

Performance includes technical metrics and perceived experience. Input delay, slow buttons, heavy sidebars or modals, stalled navigation, lagging tables, choppy animation, loading without feedback, and a frozen UI are real problems even if a feature eventually works.

## Evidence before optimization

Find the symptom and its cause before changing structure. Use evidence such as a profiler, network activity, render behavior, bundle analysis, console output, timings, or reproducible observations. Do not claim an improvement without validation.

## Proportionate tools

- Use memoization when a measured computation or identity causes unnecessary rendering.
- Use lazy loading or dynamic imports for heavy features or libraries that are not needed at initial load.
- Cache reusable data with safe invalidation.
- Use virtualization, pagination, or batching when the data volume warrants it.

Do not add optimization primitives just to make code look optimized. Preserve maintainability and correctness.

Optimizations affecting fetch architecture, global state, shared components, or many files require impact analysis and a validation plan. When requested and within the high-risk boundary, implement them without extra approval.
