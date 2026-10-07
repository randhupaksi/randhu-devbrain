# DevBrain v2 — Git Commands (Text Only)

Historical command snapshot, not a staging plan for v2.2 or the current worktree. Inspect current Git state before proposing commands. See [the documentation index](README.md) for maintained guidance.

These commands describe the original v2 upgrade snapshot and have not been run here. The conceptual DOCX was revised later, so regenerate any staging list for the current worktree. Ignored `local/` content must not be staged.

One release commit is proposed because the baseline, manifest, adapters, installer, evaluation, and docs reference one another. The branch at report time was `main`, tracking `origin/main`; recheck if conditions change. Ensure the index contains no unrelated work.

```powershell
git status --short
git diff --cached --name-only

$devbrainV2Files = @(
    'AGENTS.md',
    'CHANGELOG.md',
    'CLAUDE.md',
    'README.md',
    'adapters/README.md',
    'adapters/claude-code/CLAUDE.global.template.md',
    'adapters/claude-code/README.md',
    'adapters/claude-code/bootstrap.md',
    'adapters/codex/AGENTS.global.template.md',
    'adapters/codex/README.md',
    'core/00-index.md',
    'core/ai-collaboration.md',
    'core/api-backend-intelligence.md',
    'core/design-system-intelligence.md',
    'core/developer-profile.md',
    'core/engineering-principles.md',
    'core/frontend-and-fullstack.md',
    'core/performance.md',
    'core/ui-ux-principles.md',
    'devbrain.yaml',
    'docs/architecture.md',
    'docs/bootstrap-installation.md',
    'docs/context-precedence.md',
    'docs/english-semantic-audit.md',
    'docs/evaluation-scenarios.md',
    'docs/maintenance.md',
    'docs/source-mapping.md',
    'docs/v2-audit.md',
    'docs/v2-git-commands.md',
    'docs/v2-upgrade-report.md',
    'evaluation/README.md',
    'evaluation/scenarios.yaml',
    'evaluation/test-installer.ps1',
    'evaluation/validate-content.cjs',
    'evaluation/validate-repository.ps1',
    'install/README.md',
    'install/install-bootstrap.ps1',
    'install/update-bootstrap.ps1',
    'project-templates/AGENTS.template.md',
    'project-templates/CLAUDE.template.md',
    'project-templates/PROJECT-API-CONTRACT.template.md',
    'project-templates/PROJECT-CONTEXT.template.md',
    'project-templates/PROJECT-VISUAL-DNA.template.md',
    'prompts/README.md',
    'prompts/commands.yaml',
    'runtime/core-compact.md',
    'runtime/full-context.md',
    'runtime/session-baseline.md',
    'runtime/task-map.md',
    'safety/data-and-api-protection.md',
    'safety/policy.md',
    'safety/risk-model.md',
    'skills/architecture-refactor/SKILL.md',
    'skills/architecture-refactor/references/reference-architecture-profile.md',
    'skills/architecture-refactor/references/safe-migration.md',
    'skills/design-system-architect/SKILL.md',
    'skills/enterprise-ui-ux/SKILL.md',
    'skills/marketing-portfolio-ui-ux/SKILL.md',
    'skills/marketing-portfolio-ui-ux/references/portfolio-patterns.md',
    'source/README.md',
    'workflows/api-feature.md',
    'workflows/git-command-listing.md',
    'workflows/safe-data-migration.md',
    'workflows/safe-refactor.md',
    'workflows/standard-task.md',
    'workflows/ui-foundation-pass.md',
    'workflows/ui-task.md',
    'workflows/verification-reporting.md'
)
git add -- $devbrainV2Files
git diff --cached --stat
git commit -m "feat(devbrain): introduce modular v2 context and portable bootstrap"
git push
```

Permission to display commands is not permission to execute them. No add, commit, or push was performed during the upgrade.
