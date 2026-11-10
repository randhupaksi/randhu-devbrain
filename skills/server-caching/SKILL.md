---
name: server-caching
description: Design or repair backend and shared-cache correctness, invalidation, stampede control, and tenant isolation. Use for server cache behavior; client query-cache ownership belongs to frontend state management.
---

# Server Caching

Own backend cache keys, freshness and consistency boundaries. Input: authoritative data/read contract, identity dimensions, cache topology, workload evidence and acceptable staleness. Follow project evidence and established tools; the requested outcome determines scope.

## Decisions and failure boundaries

- Establish the authoritative store, cache location, key dimensions, authorization boundary and freshness requirements. Include tenant/user/permission scope where responses differ; never cache a private result under a public/global key.
- Describe the consistency requirement before choosing cache-aside, write-through or invalidation. TTL bounds age under stated conditions; it does not prove immediate freshness or authorization revocation.
- Map write-versus-fill races. A read started before commit can refill old data after invalidation; use an appropriate version/generation, atomic validation, ordered coordination or avoid caching that path when correctness requires it.
- For stampedes, use bounded request coalescing or leases with expiry, failure recovery and ownership/fencing where needed. Prevent an expired lock holder from deleting a newer lease or overwriting newer data.
- Handle cache failure explicitly: fallback capacity, timeouts, retry budget, negative caching and eviction. Stale-while-revalidate is acceptable only where stale data is safe; do not apply it to access decisions or sensitive state by default.
- Measure hit/miss cost, load on the authoritative store, payload size and invalidation behavior under comparable conditions. Do not promise faster responses from hit ratio alone or introduce infrastructure without demonstrated need.

## Verify and deliver

Exercise cross-tenant requests, permission changes, simultaneous fills/writes, stale lock holders, eviction and cache outage with isolated fixtures. Compare result correctness before latency; never flush a live shared cache as a test.

A review or plan stays read-only; an implementation request includes its authorized changes and proportionate checks. Keep fixtures synthetic. Specific existing authorization remains valid; production data, destructive operations, security changes, deployment and external sends retain their protected boundaries. Continue safe preparation when a later execution step is not authorized. Report actual evidence and limits without claiming unrun checks.

## Conditional collaboration

- Consider `backend-feature-engineering` only for a distinct task; pass write/read semantics and invalidation ownership.
- Consider `database-query-optimization` only for a distinct task; pass measured authoritative-store cost.
- Consider `auth-security` only for a distinct task; pass cache identity dimensions and revocation requirements.

Collaborators are optional available specialists, not dependencies or an automatic pipeline. This skill works independently. Preserve the user's format and natural language; return a requested artifact directly.
