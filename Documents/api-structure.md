# api-structure
- **Purpose**: Define service patterns and integration points.
- **Scope**: Service interfaces, mock strategy, external APIs (Solana/DAS/analytics/CMS).
- **Read when**: Adding/updating service calls or mocks.

## Service interface (planned)
```ts
interface LearningProgressService {
  getProgress(userId: string, courseId: string): Promise<Progress>;
  completeLesson(userId: string, courseId: string, lessonIndex: number): Promise<void>;
  getXP(userId: string): Promise<number>;
  getStreak(userId: string): Promise<StreakData>;
  getLeaderboard(timeframe: "weekly" | "monthly" | "alltime"): Promise<LeaderboardEntry[]>;
  getCredentials(wallet: PublicKey): Promise<Credential[]>;
}
```

## Adapters (planned)
- XP: Solana Token-2022 balance lookup.
- Credentials: Bubblegum cNFT metadata fetch.
- Leaderboard: DAS/indexer query.
- Progress/streak/achievements: stub/local until backend ready.

## Mocking
- Provide in-memory/localStorage stub implementation for dev.
- Keep UI consuming the interface; swap adapter later.

## External calls
- Use env-based endpoints/keys; no hardcoded secrets.

## Update rules
- Update when adding a new service method or adapter.
