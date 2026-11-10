---
name: technical-seo
description: Audit or implement crawlability, indexing signals, canonical URLs, metadata, structured data, and rendering for public websites. Use for search-facing technical behavior; visual marketing design has a separate owner.
---

# Technical SEO

Own public url discovery, rendering and indexing-signal consistency. Input: public route inventory, intended indexability, rendering evidence, canonical and locale policies. Follow project evidence and established tools; the requested outcome determines scope.

## Decisions and failure boundaries

- Establish which pages should be public/indexed and which are private, faceted, duplicate or intentionally excluded. Inspect actual response status, redirects, rendered HTML, link graph, robots directives and sitemap evidence.
- Robots crawl restrictions are not access controls and may prevent a crawler from observing a noindex directive. Never expose private content to make it crawlable; preserve server-side authorization.
- Align canonical, redirects, internal links and sitemap URLs with the chosen URL owner. Canonicals are indexing hints, not guarantees. Avoid canonicalizing materially different content or pagination pages indiscriminately to page one.
- For localized pages, verify real alternate URLs, reciprocal language annotations and the canonical policy. Do not manufacture translation routes or language versions.
- Ensure important content, metadata and links exist in the intended render path; inspect server HTML and permitted browser rendering as needed. Distinguish build output from what a deployed crawler actually receives.
- Generate structured data only for facts visible and supported by the page. Use current official search-engine/schema documentation for required properties; do not fabricate ratings, prices or availability and do not promise rankings/rich results.

## Verify and deliver

Check representative status/redirect chains, canonical targets, robots/noindex interaction, sitemap membership and rendered content. An automated score is supporting evidence; report local versus deployed observations and indexing uncertainty.

A review or plan stays read-only; an implementation request includes its authorized changes and proportionate checks. Keep fixtures synthetic. Specific existing authorization remains valid; production data, destructive operations, security changes, deployment and external sends retain their protected boundaries. Continue safe preparation when a later execution step is not authorized. Report actual evidence and limits without claiming unrun checks.

## Conditional collaboration

- Consider `marketing-portfolio-ui-ux` only for a distinct task; pass verified public content hierarchy and crawlable navigation needs.
- Consider `internationalization-localization` only for a distinct task; pass supported localized route and alternate policy.
- Consider `frontend-performance` only for a distinct task; pass measured rendering/loading barrier affecting the public journey.

Collaborators are optional available specialists, not dependencies or an automatic pipeline. This skill works independently. Preserve the user's format and natural language; return a requested artifact directly.
