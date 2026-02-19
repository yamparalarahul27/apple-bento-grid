# AI Working Context
- **Purpose**: Ground rules for agents working on this repo.
- **Scope**: Coding style, safety, decision defaults.
- **Read when**: Before starting tasks; when unsure about patterns.

## Principles
- Favor minimal fixes; avoid regressions.
- Type-safe TypeScript, no `any`.
- Preserve existing style; align with design tokens.
- Ask before destructive actions or external calls.

## Safety & privacy
- No secrets in code or logs.
- Do not hardcode keys; use env vars.
- Avoid network writes unless requested.

## Working style
- Use Conventional Commits.
- Keep changes scoped; add context in PRs.
- Prefer service interfaces for stubs.

## References
- See `process.md` for workflow, `design-uiux.md` for UI tokens.
