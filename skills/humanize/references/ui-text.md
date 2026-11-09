# Human UI Text

Read the actual screen, nearby strings, project voice/locales, and relevant state or action contract. Copy should help a person recognize their situation and make the next decision. Preserve domain terminology, permission distinctions, and material consequences. Routine copy quality belongs in UI implementation; invoke this skill for a dedicated or substantial copy pass.

| Surface | Write for the actual interaction |
|---|---|
| Buttons and links | Name the specific action or destination; keep repeated actions consistent |
| Field labels | Use stable visible labels; placeholders provide examples rather than replacing labels |
| Helper text | Explain a real format, constraint, or consequence before the reader encounters it |
| Validation | Identify the field problem and a supported correction without blaming the user |
| Empty states | Distinguish no records, no search matches, unavailable data, and restricted access; offer only available actions |
| Loading/progress | Describe the current operation without invented completion times or background guarantees |
| Errors | Say what failed and what the user can actually do; avoid exposing implementation or sensitive details |
| Success | Confirm the established result; distinguish queued, saved, sent, and completed |
| Destructive confirmations | Name the target, consequence, reversibility, and real action; preserve required consent wording |
| Permission states | Explain available next steps without claiming the user can grant themselves access |

Return only the requested copy fields by default. If the request names a key, placeholder, accessible name, status, or other field that must be preserved, include that field in the requested output format exactly; do not silently discard it as metadata. Do not add an implementation rationale to user-visible strings or to a text-only request unless the user requests explanation.

Keep status copy focused on what happened and the next useful action. Do not mention absent channels or unavailable actions (for example, no email or no retry) unless that limitation changes the reader's decision or the user explicitly asks to communicate it.

Original examples, conditional on the implementation:

- Button 'Submit' -> 'Save changes' when the action saves an edit.
- No matches: 'No reports match these filters.' Add 'Clear filters' only when that action exists.
- Empty collection: 'No reports yet.' Add creation guidance only for a role that can create reports.
- Form: 'Enter an email address in the format name@example.com.' Keep the actual validation rules; do not imply that format validation proves ownership.
- Queue acknowledgement: 'Your export is queued.' Do not promise an email or download before those behaviors are established.
- Indonesian: 'Data tidak ditemukan' -> 'Tidak ada laporan yang cocok dengan filter ini' for filtered reports; an empty collection needs a different message.

## Implementation review

Preserve translation keys, placeholder names, ICU variables, plural categories, braces, nesting, markup, link destinations, accessible names, and analytics/selectors that depend on string identity. Translate human-readable branch text when requested without changing ICU structure. Prefer localization resources over hardcoded strings when the project already uses them. Do not concatenate fragments that break grammar or plural handling. Keep visible and accessible action names aligned; do not remove information available only to assistive technology.

Review nearby states together so terminology and tone remain consistent. Respect space constraints and truncation at relevant viewport sizes when runtime verification is available. Do not claim that a label fits merely because its character count is short. When only copy is requested, keep the work scoped to strings and necessary consumers; behavior changes require their own requirement and risk analysis.
