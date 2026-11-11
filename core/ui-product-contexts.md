# UI Product and Surface Contexts

Use this module when the product or surface type meaningfully shapes information structure, task flow, risk, or presentation. It complements [UI/UX principles](ui-ux-principles.md) and [UI design intelligence](ui-design-intelligence.md); it is not a required checklist for every CSS edit.

## Apply context without stereotypes

A product label narrows the questions to ask; it does not select a palette, layout, component, font, or motion style. Products often combine several contexts: a healthcare dashboard may be data-dense, a commerce site may be editorial, and a developer tool may include both monitoring and collaborative editing. Choose the lens from the actual surface and user goal. Keep assumptions explicit and verify consequential choices with product evidence.

For each relevant context, identify: user goal; frequency and urgency; content and data; consequences of error; information density; user expertise; environment and device; relevant product state; and the safest recovery path. Treat the patterns below as candidates to compare, not prescriptions.

## Context lenses

| Product or surface | Optimize for | Patterns to consider | Watch for |
|---|---|---|---|
| Enterprise operations and administration | Repeated work, role clarity, auditability, comparisons, and safe bulk actions | Dense tables, filters, saved views, staged forms, clear ownership and status | Default card grids, hidden permissions, destructive bulk actions without scope, or excessive whitespace that harms scanning |
| Analytics and monitoring | Finding change, exceptions, trends, data freshness, and the next investigation step | Summary plus trend, drill-down, filters, comparison, annotations, threshold context | Decorative KPI charts, misleading scales, stale live indicators, rainbow status color, or dashboards with no decision attached |
| Finance, billing, and payment | Amount and currency clarity, fees, terms, status, reconciliation, and confidence before commitment | Itemized totals, explicit units and periods, confirmations for consequential steps, receipts and history | Hidden fees, ambiguous precision, urgency without evidence, and red/green as the only meaning |
| Healthcare and wellbeing | Safe comprehension, privacy, clear urgency, continuity, and respectful language | Plain-language results, explicit next steps, medication/history context, accessible status and consent | Decorative reassurance, alarm color without text, unsupported diagnosis, inaccessible dense records, or casual exposure of sensitive information |
| Commerce and marketplaces | Evaluating fit, comparing options, total cost, availability, delivery, and return conditions | Product comparison, filters, descriptive media, stock/fulfillment details, clear checkout progression | Fake scarcity, hidden charges, fake reviews, image-only information, and interrupted comparison on mobile |
| Booking, scheduling, and logistics | Availability, time zones, location, sequence, conflict resolution, and recovery | Calendar or slot selection, timeline, maps when location matters, editable confirmation | Ambiguous local time, unexplained unavailable states, forced re-entry, and hard-to-correct bookings |
| Learning and training | Progress, understanding, practice, useful feedback, and resuming work | Short lessons, worked examples, practice, progress with a meaningful goal, optional help | Gamification without learning value, unexplained scores, jargon, and shame-based error feedback |
| Collaboration and community | People, authorship, shared state, visibility, response, moderation, and conflict handling | Activity context, comments near content, presence where useful, edit history, report/block controls | Confusing who can see or change content, notification overload, engagement metrics replacing user value, and missing safety tools |
| Creative and editing tools | Canvas focus, precise control, previews, exploration, and non-destructive revision | Direct manipulation, inspector/tool panels, history, undo/redo, keyboard alternatives | Controls that exist only on hover, destructive edits with no recovery, inaccessible canvas-only functionality, and tool chrome overwhelming the work |
| Marketing and product education | Fast understanding of the offer, credible evidence, fit, and a relevant next action | Narrative sections, real product views, case studies, comparison, focused calls to action | Generic feature grids, unsupported claims, fake customer proof, repeated hero patterns, and motion that blocks reading |
| Portfolio and case studies | Seeing the work, understanding decisions and constraints, and judging the author's role | Selected projects, process, real outcomes, media with context, clear authorship | Inflated results, unclear contribution, beautiful mockups without evidence, and navigation that hides the work |
| Editorial, documentation, and media | Reading, orientation, search, source trust, and moving between related material | Strong reading hierarchy, contents, metadata, related links, responsive media and captions | Truncated essential text, intrusive overlays, unlabelled media, and a reading layout designed only for a wide display |
| AI-assisted products | Knowing what the system did, what evidence it used, what remains uncertain, and how to review or undo | Source/provenance, editable drafts, progress/cancel/retry, confidence or limitation context, human approval for high-impact actions | Presenting generated output as fact, silent changes, fabricated completion, unreviewable bulk output, and unbounded autonomous action |
| Public and essential services | Clear eligibility, plain language, access across abilities and devices, and completion without unnecessary friction | Step-by-step services, save/resume, explicit requirements, alternatives and human support routes | Designing only for experienced users, removing access to reduce visual complexity, and separating digital instructions from real-world consequences |

## Cross-cutting context questions

- **Use intensity:** Is this a one-time guided task, occasional lookup, or high-frequency expert workspace? Match navigation, density, and shortcuts to observed use.
- **Consequence:** What can go wrong, who is affected, and can it be reversed? Add proportionate prevention, confirmation, history, and recovery.
- **Time sensitivity:** Does the user need live freshness, a timestamp, a stale-data warning, or a dependable offline state? Do not animate numbers to imply new data when nothing changed.
- **Privacy and visibility:** Who can see, edit, export, share, or infer sensitive content? Put permission and sharing context near consequential actions.
- **Content volatility:** Will labels, names, values, locale, or user-generated text exceed the happy-path mock? Design reflow and overflow from realistic content.
- **Assistive input:** Can the same goal be completed with keyboard, switch, touch, screen reader, voice, zoom, and text scaling where supported? Do not make precision dragging or hover the only path.
- **Platform and setting:** Is the product used while walking, on a large shared display, in a noisy environment, with one hand, or in a keyboard-heavy workflow? Device category alone does not answer this.

## Preserve the task boundary

Contextual design may restructure hierarchy, layout, and interaction presentation. It does not grant permission to invent workflows, data, business rules, eligibility, pricing, health guidance, permission semantics, or system capabilities. When a design direction requires one of those decisions, keep the uncertainty visible and resolve it with the project owner or source of truth.
