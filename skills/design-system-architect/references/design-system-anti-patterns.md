# Design-System Anti-Patterns

Avoid these failure modes during UI refactoring.

| Anti-pattern | Why it hurts | Better direction |
|---|---|---|
| Wrapper for every library component | Adds indirection without a project contract | Wrap only for semantic variants, accessibility, or stable project behavior |
| One giant universal component | Hides layout and creates impossible prop combinations | Split by stable responsibility and compose intentionally |
| Variant explosion | Makes a primitive a second styling language | Keep variants semantic and remove unused combinations |
| Arbitrary style escape hatch | Lets consumers bypass tokens and consistency | Provide the smallest meaningful extension point |
| Duplicate token systems | Creates competing sources of truth | Choose one authority and migrate incrementally |
| Global rewrite during local feature work | Increases blast radius and obscures intent | Make a proportional foundation pass or defer broader migration |
| Copy-pasted state handling | Causes inconsistent loading/error/accessibility behavior | Centralize repeated state contracts |
| Page-specific business logic in primitives | Couples the whole UI to one feature | Keep domain behavior in feature components |
| Componentizing for file count | Fragments readable composition | Extract only when responsibility or reuse improves |
