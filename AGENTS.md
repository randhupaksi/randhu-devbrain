# DevBrain Repository Instructions

This repository contains a personal developer knowledge layer, not a product application. Read `runtime/session-baseline.md` once if it is not active; do not reload a profile that remains in context. For requested DevBrain maintenance, read only modules/source relevant to the audit or change.

- Keep all changes within this repository. Preserve user changes.
- Do not commit, push, reset, rebase, amend, change Git history, run admin/registry operations, or touch data/production without specific instructions; active user prohibitions still apply.
- Do not change the historical source DOCX unless the user specifically requests source revision.
- Do not put machine paths, credentials, secrets, client data, or project-specific identity in runtime/core.
- Markdown/YAML are the canonical source. The baseline is not a combination of every module. Adapter templates are the installer's loader source.
- Editing UI skill documents does not by itself require running a UI design workflow.
- Installer integration tests must use simulated homes inside `local/`. Do not run the installer against the real home during maintenance without an installation request.
- Content validation: `evaluation/validate-repository.ps1` (YAML parser prerequisites are in `evaluation/README.md`).
- Installer validation: `evaluation/test-installer.ps1`. All fixtures stay in ignored `local/`.
- Report validation actually performed; static checks do not prove that Codex/Claude have run every behavioral scenario.
