# process
- **Purpose**: How we work: workflow, commits, reviews.
- **Read when**: Starting work or before opening PRs.

## Workflow
1) Sync main, run `npm install`, `npm run lint && npm run build` before PR.
2) Small scoped commits; prefer feature branches.
3) Keep stubs behind interfaces; avoid leaking secrets.

## Conventional Commits (spec)
Based on https://www.conventionalcommits.org/en/v1.0.0/
`<type>(optional scope): <short description>`
Types: feat, fix, chore, docs, refactor, test, ci.
- Body: optional details; use for breaking changes or rationale.
- BREAKING CHANGE: start a paragraph with `BREAKING CHANGE:` if applicable.
- Scope: optional, kebab-case (e.g., `feat(auth): ...`).

## Review & verification
- Lint/type/build must pass.
- Include context in PR description (what/why, tests run).
- Note follow-ups or TODOs.

## Agent skills checklist
react-patterns, typescript-expert, api-security-best-practices, test-driven-development, find-bugs, vercel-deployment.
