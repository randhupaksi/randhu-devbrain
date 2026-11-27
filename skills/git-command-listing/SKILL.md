---
name: git-command-listing
description: Inspect a worktree and draft text-only Git add, commit, and push commands grouped by reviewable feature or logical change. Use when the user asks for a split Git command list; a single commit subject or an execution request has a different outcome.
metadata:
  short-description: Draft feature-split Git commands
---

# Git Command Listing

Prepare an accurate, reviewable command list from the current repository state. The deliverable is text; this skill never performs Git mutations.

## Inspect the current state

- Confirm the repository root and inspect the branch/upstream, `git status --short --branch`, staged changes, unstaged changes, and relevant untracked files before proposing paths.
- Read diffs as needed to understand behavior and separate changes. Do not infer file contents or include ignored, unrelated, secret-bearing, or unidentified user changes.
- Preserve the index. A `git commit` includes every currently staged change, not only paths named in the latest `git add`. If unrelated or unidentified files are already staged, call that out and do not present a commit command as isolated from them.
- Do not change files, the index, refs, or history while preparing the list.

## Split changes into commits

- Make each commit one coherent, reviewable outcome, grouped by feature or domain. Split independent features, fixes, refactors, tests, and documentation changes. Do not split merely by page section, folder, or file.
- Keep supporting files with the feature they enable. If separating them would leave a broken or misleading intermediate state, keep them together and briefly explain why.
- A fully staged path should belong to one commit group. Do not repeat the same full file path in multiple `git add` groups; the first stage may consume all of its changes. If independently reviewable hunks in one file truly need separate commits, use `git add -p -- <path>` in the text proposal and explain that the user must select the intended hunks.
- Do not force an arbitrary number of commits or features per commit. Let the actual change boundaries determine the split.

## Write the command list

For every group, show a number and meaningful feature/change name, a short outcome summary, a path-specific `git add --`, and a specific English Conventional Commit subject in `type(scope): outcome` form. Use imperative outcome wording and a scope that names the domain. Follow project-specific commit conventions when present.

Use exact paths from the worktree. Quote paths when needed for the user's shell. Never use `git add .`, `git add -A`, broad wildcards, generic subjects such as `update dashboard`, or a guessed branch/remote. After all commit groups, show one `git push` as text; if the upstream is unknown, say so rather than inventing a remote or branch.

Example shape:

```powershell
# 1. Referral — create shareable invite links
git add -- src/features/referral/InviteForm.tsx src/api/referrals.ts
git commit -m "feat(referral): create shareable invite links"

# 2. Referral — prevent duplicate invitations
git add -- src/features/referral/invite-validation.ts
git commit -m "fix(referral): prevent duplicate invitations"

# Push all completed commits
git push
```

Replace example paths and outcomes with observed changes. If the user asks only for one commit message, provide only the subject and do not activate this broader workflow. If the user explicitly asks to execute Git operations, stop using this listing workflow and apply the separate safety and authorization rules for each operation; skill invocation itself grants no permission.
