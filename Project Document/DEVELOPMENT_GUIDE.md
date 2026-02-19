# Development Guide

This guide outlines the standard practices for working on the Superteam Brazil Academy project.

## Workflow

1) Always sync with the latest `main` branch.
2) Run `npm install`, `npm run lint`, and `npm run build` locally before pushing or creating a Pull Request.
3) Use small, scoped commits and prefer feature branches for significant changes.
4) Keep service logic behind interfaces to allow for easy mocking and testing.
5) Never commit private keys or sensitive configuration files (e.g., `.env.local`).

## Version Control (Conventional Commits)

We follow the [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/) specification.
Format: `<type>(optional scope): <short description>`

### Common Types:
- `feat`: A new feature
- `fix`: A bug fix
- `docs`: Documentation changes
- `chore`: Maintenance tasks (dependencies, build setup)
- `refactor`: Code changes that neither fix a bug nor add a feature
- `test`: Adding or updating tests
- `ci`: Changes to CI/CD configuration

## Code Standards
- **Style**: Follow the existing design tokens and UI patterns.
- **Safety**: Ensure type safety in TypeScript (avoid `any`).
- **Review**: Provide detailed context in PR descriptions, including screenshots or recordings for UI changes.
