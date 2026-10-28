# CLI host compatibility workflow

Use this workflow when installing, diagnosing, or evaluating DevBrain with Codex CLI or Claude Code CLI. It is maintenance guidance, not part of normal coding-session startup.

## Separate the layers

1. Identify the actual host executable, version, launch mode, working directory, and profile location without printing credentials or full private paths.
2. Separate repository structure checks and simulated installer tests from live host behavior. A valid adapter or successful installer does not prove that a fresh CLI session loaded it.
3. Keep host-managed context separate from DevBrain-selected context:
   - Host discovery may inject global/project instruction files and skill descriptions automatically.
   - DevBrain selects its baseline, task modules, and skill bodies according to the active task.
   - Do not manually rescan a skill directory merely because the host has a skill catalog.
4. Do not assume the two hosts resolve identical filenames, scopes, skill metadata, session continuation, or permission prompts.

## Codex CLI

Codex normally builds an instruction chain at run/session startup from its global AGENTS file and project AGENTS files from the repository root toward the current working directory. A closer instruction file or an override can affect the effective guidance. Confirm the actual loaded sources using host-visible evidence when testing; do not infer them from a prompt that explicitly pasted the same content.

Codex skills are discovered from supported repository/user locations. The host can make skill names and descriptions available before loading a selected skill body. Confirm both discovery and selective body loading when those behaviors are in scope.

## Claude Code CLI

Claude Code loads user instructions and project instructions according to its version and Project instructions setting. In the default AGENTS-compatible mode, project CLAUDE.md files can take precedence over AGENTS.md files; configure or import both only when the project intentionally needs both. A CLAUDE.md file can import AGENTS.md with an @AGENTS.md line. Do not change real user settings just to run a fixture.

Claude's auto memory is additional context, not a replacement for the latest user prompt or current project source of truth. Treat a stale or conflicting note as a reconciliation input; do not rewrite memory during a read-only test.

Claude skills expose descriptions for selection and load full skill content when invoked. Check the selected skill and its references without opening the whole skill tree.

## Session and permission evidence

Test each relevant mode independently: fresh interactive session, one-shot invocation, and resume/continue where the host supports it. A new process may have a fresh conversation context even if a prior session remains on disk. A resumed conversation is not evidence of fresh-session bootstrap discovery.

Record only sanitized evidence: host/version, mode, working-directory-relative fixture, sources reported or observed, selected skill, tool actions, outcome, and validation. If the host cannot show instruction discovery directly, use a controlled synthetic marker and label the result as behavioral evidence rather than a host trace. Do not claim automatic discovery from exit code, CLI availability, or manual context injection alone.

Instruction files influence model behavior; they are not OS-enforced access controls. Keep sandbox and approval behavior under the host's actual permission system. Do not weaken permissions, install a missing CLI, edit global settings, or run high-risk actions to make a compatibility test pass.

When a host is unavailable, finish repository-only checks and simulated installation coverage. Mark live behavior NOT_RUN or BLOCKED with the environment reason; do not claim cross-host parity.
