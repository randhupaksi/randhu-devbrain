# Safety Policy

## Scope

- Change only files needed for the task.
- Do not touch another workspace/project because its name or structure looks similar.
- Respect user changes and a dirty working tree.
- Keep additional changes clearly connected to the outcome and report them. Extra approval is needed only when a change crosses an unapproved high-risk boundary; materiality, file count, or refactor breadth alone is not an approval gate.

## Sensitive areas

These areas need careful impact analysis. Extra approval is needed only for a high-risk action not specifically authorized by the active prompt:

- API contracts, endpoints, payloads, and important response mapping;
- databases, migrations, queries, data models, and tenant isolation;
- authentication, permissions, role access, sessions, payments, and business logic;
- environment variables, credentials, deployment, and production configuration;
- shared/global components or infrastructure with broad blast radius;
- Git history and remote repositories;
- operating-system configuration.

For presentation-only work, preserve business behavior, contracts, validation, authentication, permissions, and data semantics. Change APIs/backends only when they are part of the requirement; contract/environment/consumer analysis does not itself authorize a new capability.

## Data and privacy

- Do not display, copy, log, or commit secrets, tokens, private keys, credentials, or sensitive environment values.
- Use placeholders in examples.
- Use dummy/anonymized data; never use real client/user data in fixtures or documentation.
- Preserve tenant/client isolation and data integrity.
- Do not run migrations, bulk updates/deletes, or production data operations without explicit, specific instructions. Because these affect client/production data, a general request is not sufficient authorization.
- For sensitive endpoints and queries, check server-side authorization, ownership, role, tenant/client isolation, payload validation, and response minimization according to project patterns.
- Do not broaden access, add authentication bypasses, expose internal errors, or hardcode secrets to speed up testing. See `data-and-api-protection.md` for operational detail.

## File deletion

Do not delete a file merely because it appears unused. Check references and explain the reason and impact. Proceed with explicitly requested, reversible deletion. Seek specific confirmation for migrations, data, production secret/configuration, or high-risk/irreversible deletion.

## Git

Read-only Git operations such as `status`, `diff`, and relevant logs are allowed. Do not run `git add`, commit, push, force-push, merge, rebase, amend, reset, or change history without an explicit instruction naming that operation. Requests for a commit message or to “list Git commands” produce text only, even if the output includes `git add`, `git commit`, and `git push`.

For Git command listings, group commands by feature/logical change, use `git add --` with specific files, and write English Conventional Commit messages naming the domain/feature and outcome. Do not use `git add .`, group by page section, or use generic messages such as `update dashboard`. Show one `git push` as text after all commit groups. See `workflows/git-command-listing.md`.

Authorization is per operation: permission to `git add` does not grant permission to commit or push; permission to commit does not grant permission to push. Before executing an authorized operation, inspect the repository, branch, status, staged changes, and file scope to protect unrelated user work.

## System boundary

Do not run administrator commands, elevate privileges, or change Windows Registry, global PATH, services, startup, firewall, security settings, or OS configuration without explicit permission. Prefer local/user-level reversible solutions when needed.

## Stop conditions

Stop and report if:

- the repository, branch, page, or target file is wrong;
- the change no longer has a defensible connection to the requirement, outcome, or project goal;
- a high-risk action is required without specific confirmation (reviewing a sensitive area or making an in-scope low/medium-risk change is not itself an approval gate);
- ambiguity remains after evidence review and changes business outcome, contract, data, security, or an irreversible side effect; decide low-risk details using a defensible assumption;
- a change causes an uncontrolled error/regression;
- client data, production behavior, or security is at risk.

Do not use destructive rollback such as hard reset. Separate your own changes from user changes and ask for direction when safe rollback is unclear.
