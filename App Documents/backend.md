# backend
- **Purpose**: Notes on backend/on-chain integration points.
- **Scope**: Solana program touchpoints, API boundaries, rent/credential flow.
- **Read when**: Designing progress/XP logic, wiring wallet flows, indexing leaderboards.

## On-chain touchpoints (planned)
- XP: SPL Token-2022 non-transferable mint; balances derive level = floor(sqrt(xp/100)).
- Credentials: Metaplex Bubblegum cNFTs per track; evolve with progress.
- Courses/Enrollments: PDAs for courses and per-learner enrollments; lesson bitmap progress; close enrollment to reclaim rent.
- Achievements: bitmap (256) on Learner PDA.
- Streaks: updated as side-effect of lesson completion.
- Leaderboard: off-chain index via DAS/Helius or custom indexer.

## API boundaries
- Service layer should expose: getXP, getProgress, completeLesson (backend-signed tx), getLeaderboard, getCredentials, getStreak.
- Keep UI decoupled via interface; provide stub implementation until backend ready.

## Data safety
- Do not hardcode RPC keys; use env vars.
- Validate inputs; handle signature generation server-side when added.

## Update rules
- Refresh after any program upgrade or endpoint change.
- Link to specs/IDL when available.
