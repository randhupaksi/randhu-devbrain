---
name: internationalization-localization
description: Implement locale routing, message resources, plural rules, formatting, fallback, and RTL behavior. Use for application language infrastructure; dedicated prose/voice editing belongs to humanize.
---

# Internationalization and Localization

Own locale selection, translation resources and internationalized application behavior. Input: supported locales, routing/product rules, message tooling, formatting and accessibility constraints. Follow project evidence and established tools; the requested outcome determines scope.

## Decisions and failure boundaries

- Inspect locale resolution, persisted preference, route structure, translation tooling and fallback ownership. Distinguish language, region and timezone rather than deriving them all from one locale code.
- Keep stable message keys and translator context. Preserve interpolation names, escaping, ICU variables and plural/select structure; translate full messages instead of concatenating fragments whose word order changes.
- Use runtime locale/CLDR-aware formatting supported by the project for numbers, currency, dates and plurals. Currency and units come from business data, not the UI language. Keep machine values unformatted in API/storage contracts.
- Avoid server/client locale and timezone mismatches during rendering/hydration. Define fallback for missing keys and unsupported locales without silently erasing required legal/accessibility text.
- Implement RTL through logical layout and reading order; mirror directional controls deliberately and preserve content that should keep its direction. Check mixed-direction identifiers, keyboard order and translated accessible names.
- Coordinate localized URL/canonical behavior only when public discovery is part of the task. Changing a locale route or resource key can affect consumers and deep links; map them before migration.

## Verify and deliver

Confirm whether a stored amount uses major units, minor units or a decimal representation before giving concrete converted examples. A locale switch must not change precision, scale, currency or stored values; never divide by a conventional factor without the amount contract.

Check the runtime formatter's resolved currency digits or verified currency metadata instead of inferring minor units from familiar display conventions. Do not hardcode zero decimal digits or round merely because a currency is commonly displayed that way. Keep an unknown amount scale/rounding policy explicit. Prefer a supported locale fallback through the existing formatter; do not invent hand-written currency grouping that can silently change precision or symbol meaning.

Check at least relevant plural branches, missing-key fallback, long expansion, RTL/mixed text, timezone boundaries and server/client rendering consistency. Mark machine-generated draft translations for linguistic review when appropriate; syntax validity does not establish translation quality.

A review or plan stays read-only; an implementation request includes its authorized changes and proportionate checks. Keep fixtures synthetic. Specific existing authorization remains valid; production data, destructive operations, security changes, deployment and external sends retain their protected boundaries. Continue safe preparation when a later execution step is not authorized. Report actual evidence and limits without claiming unrun checks.

## Conditional collaboration

- Consider `humanize` only for a distinct task; pass verified message meaning and target register for editorial review.
- Consider `technical-seo` only for a distinct task; pass localized public URL and alternate-language policy.
- Consider `accessibility-audit` only for a distinct task; pass observed directionality naming or reading-order barrier.

Collaborators are optional available specialists, not dependencies or an automatic pipeline. This skill works independently. Preserve the user's format and natural language; return a requested artifact directly.
