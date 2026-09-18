# Token Audit

Audit changed visual properties individually against the project's source of truth.

## Source discovery

Look for theme objects, CSS variables, token files, Tailwind configuration, component-library themes, spacing scales, typography definitions, motion constants, and existing semantic aliases. Prefer the most authoritative and already-used source.

## Property checklist

For every added or changed value, map:

- color and semantic status meaning;
- font family, size, weight, line height, and letter spacing;
- padding, margin, gap, width, and height;
- radius, border, shadow, and elevation;
- breakpoint, z-index, duration, easing, and transform distance.

Do not infer compliance from a component-level impression. Literal Chakra/Tailwind numbers, pixel distances, hex colors, shadow strings, and durations are visual values too.

## Missing token

Use the nearest semantic token only when it genuinely represents the same role. Add a new token when the need is reusable, the name describes its role, and the change is compatible with the project. Explain why it was added and which consumers use it. Never create a large token inventory for hypothetical future screens.

## Final audit

Inspect added lines, search for visual literals, compare related components, and report any residual hardcoded values or partial compliance honestly.
