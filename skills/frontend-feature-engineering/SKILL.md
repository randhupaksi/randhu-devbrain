---
name: frontend-feature-engineering
description: Implement a complete frontend feature over established contracts, connecting navigation, components, data, and user actions. Use when the working journey is the outcome.
---

# Frontend Feature Engineering

Follow the feature through its normal entry point to the user's confirmation or recovery path. Trace routing, shared primitives, request clients, identity context, and existing checks. Pull only the relevant slice of the project.

- Map URL, local interaction and server state to their owners. Use existing clients and query keys. Preserve established filters, navigation, types, endpoint semantics, and error mapping for adjacent consumers.
- Connect meaningful states to visible behavior. Distinguish first load from refresh, empty data from no filter matches, no access from a failed request, and rejected mutations from confirmed updates. Preserve input or confirmed data during recovery where appropriate.
- Wire the flow for keyboard and narrow layouts using project primitives. Keep feature orchestration near the feature and shared behavior in its established owner. Add a shared abstraction when it has a stable contract and real consumers.
- Check the actual route, action and fallback with relevant project commands or browser evidence when available. Report unavailable interaction checks explicitly.

Deliver the working feature and evidence for the journey. Visual direction belongs to the chosen UI skill when it is a separate objective. For a distinct race or cache correctness problem, hand state ownership and timing evidence to frontend-state-management. For an unresolved contract decision, hand the actual consumer needs to api-contracts.
