# Context Precedence

The canonical order is in the [session baseline](../runtime/session-baseline.md#precedence-and-decisions):

1. System/platform safety, instructions, and permissions.
2. The user's latest explicit instruction.
3. Applicable project-specific `AGENTS.md` or `CLAUDE.md`.
4. DevBrain safety.
5. DevBrain global principles.
6. Adapter defaults.
7. Earlier AI recommendations.

When the user changes A to B, use B for the affected decision. Do not combine A and B without a basis or ask for confirmation merely because a preference changed. Other project facts remain active. Existing code is evidence, not an instruction that overrides the user.

A high-risk boundary still requires specific confirmation if it is not already authorized. “Don't ask” or “be creative” does not authorize changes to authentication, client data, breaking contracts, deployment, or Git. Do not ask again for specific confirmation already given for the same action and scope.

When global and project instructions differ, project details determine stack, visual identity, contracts, and business rules. If material ambiguity remains after reviewing evidence, ask only about that decision and continue safe work.
