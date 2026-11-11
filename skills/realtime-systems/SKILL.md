---
name: realtime-systems
description: Implement or diagnose client-facing WebSocket/SSE subscriptions, reconnection, event ordering, and resynchronization. Use for live connection correctness; durable background execution belongs to queue engineering.
---

# Realtime Systems

Own live subscription lifecycle and loss/duplicate recovery. Input: transport and event schemas, snapshot/version model, session lifecycle, reconnect and ordering guarantees. Follow project evidence and established tools; the requested outcome determines scope.

## Decisions and failure boundaries

- Trace connection setup, subscription authorization, snapshot fetch, event delivery, reconnect and teardown. Do not assume the transport gives durable replay or exactly-once effects.
- Define event identity, ordering scope, version and snapshot relationship. Close the snapshot/subscribe race: use a consistent snapshot watermark and replay boundary, or detect a gap and resynchronize from the authoritative state.
- On reconnect, preserve the last acknowledged/processed position only under the actual replay contract. Deduplicate repeated events and reject stale versions; a successful socket reconnect does not establish that missed events were recovered.
- Revalidate subscriptions on identity, role or tenant changes. Unsubscribe and clear private state on logout or tenant switch; UI hiding and a connection opened earlier do not preserve authorization indefinitely.
- Bound reconnect backoff, buffered events, slow-consumer queues and heartbeat resources. Define what happens when the replay window expires or the client cannot keep up: signal stale state and fetch a fresh snapshot rather than silently dropping updates.
- Use project transport libraries and current official protocol/provider documentation for exact semantics. Do not replace a working polling flow with sockets merely because realtime is mentioned.

## Verify and deliver

Use deterministic synthetic event sequences: event between snapshot and subscribe, duplicate replay, out-of-order delivery, disconnect gap, expired replay, tenant switch and component cleanup. Verify state convergence, not just an open socket.

A review or plan stays read-only; an implementation request includes its authorized changes and proportionate checks. Keep fixtures synthetic. Specific existing authorization remains valid; production data, destructive operations, security changes, deployment and external sends retain their protected boundaries. Continue safe preparation when a later execution step is not authorized. Report actual evidence and limits without claiming unrun checks.

## Conditional collaboration

- Consider `frontend-state-management` only for a distinct task; pass snapshot/version and subscription state ownership.
- Consider `auth-security` only for a distinct task; pass subscription actor-resource policy and revocation boundary.
- Consider `observability-debugging` only for a distinct task; pass connection gaps lag and bounded recovery evidence.

Collaborators are optional available specialists, not dependencies or an automatic pipeline. This skill works independently. Preserve the user's format and natural language; return a requested artifact directly.
