---
name: frontend-performance
description: Diagnose and improve slow frontend loading, rendering, interaction, and bundle behavior using evidence. Use for a performance investigation or requested optimization, not routine visual polish.
metadata:
  short-description: Diagnose and improve frontend performance
---

# Frontend Performance

Use this skill when performance is the requested outcome or a demonstrated blocker to that outcome. Work across product and marketing interfaces without imposing a framework, metric target, or optimization technique on every project. For server, database, or API bottlenecks, inspect the relevant contract and use the project's backend guidance instead of treating every delay as a frontend render problem.

## Task mode and scope

- An audit, explanation, or measurement request is read-only. Report reproducible findings, evidence, and the next useful measurement.
- An optimize, fix, or implement request includes making the relevant code changes and checking the result. Do not stop after an audit when implementation is authorized and the cause is clear.
- Read project instructions, affected routes/components, existing performance conventions, and the available runtime evidence. Keep investigation proportionate; do not profile unrelated pages or load every reference.

## Investigate before changing code

1. Define the affected user journey and symptom: initial load, navigation, input response, scrolling, a table, an image, or a particular operation. Record the device, data volume, and conditions that matter to the report.
2. Establish a baseline with the project's tools or a reproducible observation. Inspect the relevant network, browser timeline, component rendering, assets, or bundle output to locate the dominant cost.
3. Separate loading delay, JavaScript work, excessive rendering, layout work, media weight, and server/API latency. Follow the evidence rather than adding memoization, lazy loading, caching, or virtualization by habit.
4. Choose the smallest change that addresses the cause. For multi-route state, cache, or shared component changes, map consumers and invalidation before implementation.

Read [references/measurement-and-fixes.md](references/measurement-and-fixes.md) when the bottleneck is unclear or several possible optimizations need comparison. It is not a prerequisite for a small, well-understood fix.

## Implement and verify

Preserve behavior, data correctness, accessibility, project visual identity, and API contracts. Do not hide a slow operation with a misleading loading state, drop required content, or weaken validation to make a metric look better. Use project dependencies and patterns; add a new dependency only when its concrete benefit outweighs its cost.

Repeat the relevant measurement under comparable conditions. Check the affected journey, loading and error states, and any consumers of a changed shared boundary. Report the baseline, change, observed result, and measurement limits. If a reliable before/after measurement is unavailable, describe the technical change without claiming a quantified gain.

## Authorization and selective use

Follow system and project instructions and the latest user request. Low-risk fixes can proceed directly; analyze medium-risk shared changes and proceed within scope. Authentication, permission, breaking API, client or production data, destructive migration, deployment, secrets, Git commit/push/history, and hard-to-reverse actions require their own specific authorization. Do not invent business features to solve a performance complaint. Load this skill only when its description matches the task; do not load its reference by default.
