# Measurement and Fix Selection

Use this reference when the cause of a frontend performance problem is unclear or several remedies compete. Adapt measurements to the project's stack and available tools; do not invent a global score target.

## Establish comparable evidence

- Reproduce the actual slow journey with representative, non-sensitive data. Record whether the measurement is a cold load, warm navigation, local build, or deployed preview.
- Separate network transfer, server response, script execution, rendering, and layout work. Check whether a slow action is waiting for an API or is blocked in the browser.
- When possible, repeat measurements under the same device, viewport, data size, cache state, and network conditions. Single runs are noisy; state uncertainty if only an observation is available.
- Use the project's existing profiler, network view, build report, or timing instrumentation. Avoid adding permanent logging that exposes user data.

## Match remedy to cause

| Evidence | Possible direction | Check before using it |
|---|---|---|
| Large initial JavaScript for a rarely used feature | Route or feature-level code splitting | Loading fallback, navigation, bundle boundaries |
| Heavy image or font transfer | Correct sizing, format, loading priority, or asset reuse | Visual fidelity and layout stability |
| Repeated expensive component work | Narrow subscriptions, stable data flow, or measured memoization | Correct state updates and stale data |
| Large rendered collections | Pagination or virtualization | Keyboard access, selection, search, and item height |
| Repeated requests or stale cache | Query ownership and safe invalidation | Data freshness, permissions, and error behavior |
| Slow server response | Inspect API timing and contract with backend guidance | Avoid hiding latency behind speculative frontend changes |

Prefer the remedy that removes the measured bottleneck with the least complexity. A smaller bundle does not prove faster interaction, and fewer renders do not prove a better user experience. Verify the journey the developer actually cares about.
