# testing
- **Purpose**: Document testing approach.
- **Read when**: Before merging changes or adding new features.

## Strategy
- Lint/type checks via `npm run lint` and `npm run build`.
- Unit tests TBD (add when services/components stabilize).
- E2E: plan Playwright for critical flows (auth, course view, challenge run) once UI solidifies.

## Manual checks (current)
- Landing page loads without console errors.
- Responsive layout for hero/cards/CTA.

## Update rules
- Update when adding automated tests or new critical flows.
