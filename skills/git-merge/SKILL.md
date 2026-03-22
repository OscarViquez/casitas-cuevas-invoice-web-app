---
name: git-merge
description: Guidelines for merging branches and opening pull requests in this project. Use when merging feature branches or creating PRs.
---

# Git Merge / Pull Request

## Branch Naming

```
feat/<short-description>
fix/<short-description>
chore/<short-description>
```

Examples: `feat/invoice-form`, `fix/total-calculation`, `chore/install-deps`

## Workflow

1. Branch off `main` for every change
2. Commit work on the feature branch
3. Open a PR into `main` — never push directly to `main`
4. Merge only when the build passes

## Pull Request Format

**Title:** same convention as commit messages (`feat:`, `fix:`, etc.), max 72 chars

**Body:**
```
## What
Short description of what changed.

## Why
Reason for the change.

## Notes
Anything reviewers should know (edge cases, follow-ups, etc.)
```

## Rules

- Never force-push to `main`
- Resolve conflicts by rebasing the feature branch onto `main`, not the other way around
- Delete the feature branch after merging
- One concern per PR — keep them small and focused
