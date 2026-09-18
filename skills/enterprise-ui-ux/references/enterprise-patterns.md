# Enterprise Patterns

Use the project's existing component and interaction patterns first. The guidance below helps choose or review a pattern; it does not replace project conventions.

| Pattern | Use when | Avoid or common mistake | Accessibility and mobile |
|---|---|---|---|
| Table | Users compare, scan, sort, filter, or bulk-act on records | Replacing it with large cards for appearance | Label sortable headers; keep column priority, horizontal scroll, or detail disclosure intentional |
| Card | An entity, summary, or actionable unit needs containment | Wrapping every section or nesting cards | Preserve heading order; avoid hiding essential actions in hover-only controls |
| Form | Users create or update structured data | Placeholder-only labels, long ungrouped forms, unnecessary wizard | Use labels, input types, inline errors, logical tab order; stack fields on narrow screens |
| Search, filter, sorting | Users repeatedly find or narrow data | Hiding frequent filters in a modal or making reset unclear | Label controls, expose active filters, preserve context; collapse advanced filters deliberately |
| Pagination | Result sets are large or bounded navigation matters | Infinite scroll for precise operational work | Announce result changes; keep page and total context visible |
| Bulk action | Users act on multiple selected records | Showing destructive actions without selection or consequence | Clear selection count, keyboard access, and proportional confirmation |
| Toolbar | A list has frequent contextual controls | A huge filter panel for a few controls | Group by frequency; allow wrapping or overflow without losing key actions |
| Tabs | Views share context but differ by closely related state | Using tabs as primary site navigation or hiding too many | Use clear selected state and keyboard navigation; make overflow intentional |
| Sidebar and breadcrumb | App has many sections or genuine hierarchy | Experimental navigation or mechanical breadcrumb everywhere | Mark current location; ensure keyboard navigation and mobile collapse behavior |
| Modal and drawer | A focused, short, contextual task is needed | Long workflows, large management screens, or nested modals | Trap focus, provide close/cancel, restore focus; use fullscreen or page flow when needed on mobile |
| Command palette and dropdown | Fast access to many known actions or compact menus | Hiding frequent primary actions behind vague menus | Searchable actions need keyboard support; menus need labels and focus management |
| Destructive action | An action is irreversible or has material impact | Confirming every reversible action or vague consequences | State impact clearly; distinguish destructive styling and support keyboard escape/cancel |
| Notification | A transient global outcome needs acknowledgement | Toasting every click or using toast for inline validation | Make messages concise and non-blocking; preserve relevant inline feedback |
| Loading, empty, error | Data or action state changes the surface | Full-page spinner for a local update; motivational empty copy | Keep layout stable, explain recovery, associate errors with controls, preserve entered data |
| Responsive and mobile data | Space or input mode changes | Simply shrinking desktop or turning every row into a huge card | Decide priorities, stacking, scroll, disclosure, touch target, and mobile dialog behavior |
| Dashboard and chart | Users monitor decisions, trends, exceptions, or workload | Welcome hero, decorative KPI grid, chart without a decision | Make status and labels clear; provide non-color cues and avoid data overload |
| Role-based action | Permissions or responsibility alter available work | Showing inaccessible actions without explanation or leaking restricted data | Enforce access in behavior, not only UI; explain unavailable actions where useful |
| Dense layout | Expert users need frequent scanning and throughput | Cramped rows, tiny targets, or whitespace-heavy layout | Keep readable type, row focus, and touch-safe controls; allow priority adaptation on small screens |

## Default checks for data-heavy screens

Confirm the user can identify their current context, inspect key data, find common actions, understand active filters and selection, recover from loading/error/empty states, and complete the main task without decorative friction.
