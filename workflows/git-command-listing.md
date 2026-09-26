# Git Command Listing Workflow

Use this workflow when Randhu asks to “list Git commands,” “give me Git commands,” “write add/commit/push commands,” or something similar. This means **produce a text command list**, not permission to run `git add`, `git commit`, `git push`, or other Git mutations.

## 1. Inspect read-only

- Check the repository, branch, `git status`, diff, and staged changes when relevant.
- Distinguish active-task changes from unrelated user changes or changes you cannot identify.
- Do not alter the index/staging area or files while preparing the command list.

## 2. Group by logical change

Separate commands by feature, bug fix, refactor, test, documentation, or independent logical change. Each commit group should be explainable and reviewable as one coherent change.

Group by domain/feature rather than page name or technical section. Good examples:

- `attendance` for check-in/check-out flow;
- `attendance-report` for attendance report export;
- `outlet-export` for outlet data export;
- `auth` for login/registration changes;
- `payment` for payment flow.

Avoid overly broad labels such as `dashboard`, `page`, `section`, `misc`, `update`, or a file name unless that is truly the product domain. If splitting would break the code, put all supporting files in one feature commit and briefly explain why.

## 3. Build the command list

For each group, include:

1. A number and readable feature/change name.
2. One sentence summarizing the behavior/outcome that changes.
3. `git add --` with **specific file paths** belonging only to that group.
4. `git commit -m` with a specific English Conventional Commit message.

Use `git add -- <file...>`, not `git add .`, `git add -A`, or a broad wildcard. Do not include unrelated files just to make the whole working tree clean.

Commit subjects should name the type, domain/feature, and outcome. Use specific imperative wording, for example:

```powershell
git commit -m "feat(attendance): add employee check-in and check-out flow"
git commit -m "fix(attendance): prevent duplicate daily check-ins"
git commit -m "feat(outlet-export): export filtered outlet records"
git commit -m "refactor(payment): isolate invoice status mapping"
```

Choose the appropriate commit type: `feat`, `fix`, `refactor`, `test`, `docs`, `perf`, `chore`, or a project-defined type. Avoid subjects such as `update dashboard`, `fix page`, `changes`, or `final update`.

After all commit groups, show one `git push` as text. One push at the end usually sends all new commits. If the branch/upstream is uncertain, state that; do not guess the remote or branch.

## 4. Execution semantics

- “List Git commands” is always text-only, even if the list contains `git add`, `git commit`, and `git push`.
- “Write a commit message” or `commit-msg` is also text-only.
- Permission for one operation does not permit the next. Permission to run `git add` does not permit commit or push; commit permission does not permit push.
- Run a mutating Git command only when the active prompt clearly uses an execution verb and names the authorized operation, such as “run git add and commit” or “run git add, commit, then push.”
- Even when execution is authorized, check status, repository, branch, staged files, and scope first. Do not add unrelated user changes.
- `git push`, remote/history changes, force push, merge, rebase, amend, reset, and destructive operations still require corresponding explicit instructions. A coding request, “finish the task,” or “list commands” is not permission.

## 5. Output format

Use this format when asked for a listing:

```powershell
# 1. Attendance — employee check-in and check-out flow
git add -- src/modules/attendance/AttendanceForm.tsx src/services/attendance.service.ts
git commit -m "feat(attendance): add employee check-in and check-out flow"

# 2. Attendance — prevent duplicate daily check-ins
git add -- src/modules/attendance/attendance.validation.ts src/services/attendance.service.ts
git commit -m "fix(attendance): prevent duplicate daily check-ins"

# Push all completed feature commits
git push
```

Briefly note files that could not be safely grouped, unrelated user changes, missing validation, or an unconfigured upstream. Do not run the listed commands.
