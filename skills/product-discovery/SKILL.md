---
name: product-discovery
description: Turn an ambiguous product brief into a scoped user flow and observable acceptance criteria. Use when requirements or product tradeoffs are the deliverable.
---

# Product Discovery

Identify the actor, their job, the trigger, and what a successful outcome looks like. Use the supplied brief, existing behavior, and real constraints as evidence. Keep user facts, assumptions, and proposals distinct.

- Map the main path and the recovery or exception paths that change the outcome. Identify data ownership, decision points, and required inputs. Preserve known business rules and expose unresolved policy decisions.
- Define a first useful slice around a complete outcome. Separate required scope from later options. Where alternatives matter, describe who gains or loses and what would make the choice reversible.
- Write acceptance criteria as observable results with conditions. Include a meaningful failure or recovery case if applicable. Avoid vague criteria such as “fast” or “intuitive” unless the brief provides a way to judge them.
- Flag questions that materially change eligibility, permissions, data, or contract semantics. Continue drafting independent requirements and label safe assumptions so they can be replaced easily.

Deliver a concise brief or the requested PRD content with goal, users, scoped flow, acceptance criteria, exclusions, and open decisions. Hand an accepted interaction flow to the relevant UI owner, unresolved wire semantics to api-contracts, and assertions to testing-strategy when coverage design is separately requested. A discovery request preserves the planning boundary.
