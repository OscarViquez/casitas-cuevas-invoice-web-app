---
name: git-commit
description: Guidelines for writing and creating git commits in this project. Use when staging and committing changes.
---

# Git Commit

## Commit Message Format

```
<type>: <short summary>

<optional body>
```

**Types:**
- `feat` — new feature
- `fix` — bug fix
- `style` — UI/styling changes only
- `refactor` — code change with no feature or fix
- `chore` — config, deps, tooling

## Rules

- Summary line: max 72 characters, lowercase, no period at the end
- Be specific — describe *what changed*, not "updated files"
- Stage only relevant files — never use `git add .` blindly
- Never skip hooks (`--no-verify`)
- Never amend a commit that has already been pushed

## Examples

```
feat: add invoice item row with qty and price inputs
fix: recalculate totals when item is removed
style: update invoice header layout for print view
chore: install react-hook-form and idb dependencies
```
