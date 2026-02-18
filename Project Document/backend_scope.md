# Backend Scope — Solana Academy LMS

## Overview

This document defines the backend scope for the Solana Academy LMS. The backend serves as the bridge between the frontend, the Sanity CMS, the Solana on-chain program, and third-party services. It handles operations that cannot or should not be executed client-side — primarily backend-signed transactions, user account management, streak/activity persistence, leaderboard indexing, and API orchestration.

**Repo path:** `/backend` inside [github.com/solanabr/superteam-academy](https://github.com/solanabr/superteam-academy)  
**Deployment:** Vercel serverless functions or a dedicated Node.js service (Railway / Fly.io)

---

## Core Responsibilities

The backend is responsible for:

- Signing and submitting on-chain transactions on behalf of learners (lesson completion, XP minting, credential issuance, achievement claiming)
- Managing user accounts and identity linking (wallet ↔ Google ↔ GitHub)
- Persisting off-chain state: streaks, activity logs, user preferences, profile data
- Indexing XP token balances for leaderboard generation
- Exposing a clean REST or tRPC API consumed by the frontend service layer
- Webhooks and event handling from on-chain activity (optional, via Helius)

---

## Tech Stack

| Concern | Technology |
|---|---|
| Runtime | Node.js 20+ |
| Language | TypeScript — strict mode, zero `any` types |
| API Layer | tRPC (preferred for type-safe frontend integration) or REST (Express/Fastify) |
| Database | Supabase (PostgreSQL) — with clean abstractions for future migration |
| ORM | Prisma or Supabase client |
| Auth | JWT + Supabase Auth (wallet signature verification, Google OAuth, GitHub OAuth) |
| Blockchain | `@solana/web3.js`, `@coral-xyz/anchor`, Metaplex JS SDK |
| Indexer | Helius DAS API (XP token balance queries) |
| CMS | Sanity client (server-side GROQ queries where needed) |
| Queue | BullMQ or Supabase Edge Functions (for async transaction submission) |
| Monitoring | Sentry (error tracking) + structured logging (Pino) |
| Deployment | Vercel serverless / Railway / Fly.io |

---

## Project Structure

```
/backend
├── /src
│   ├── /api              # Route handlers or tRPC routers
│   │   ├── /auth         # Auth endpoints (wallet, Google, GitHub)
│   │   ├── /users        # User profile and account management
│   │   ├── /courses      # Course and enrollment endpoints
│   │   ├── /lessons      # Lesson completion, progress
│   │   ├── /leaderboard  # XP indexing and ranking
│   │   ├── /achievements # Achievement management
│   │   └── /credentials  # Credential/NFT queries
│   ├── /services
│   │   ├── /solana       # On-chain interaction service
│   │   ├── /xp           # XP minting and balance queries
│   │   ├── /credentials  # Metaplex Core NFT issuance and updates
│   │   ├── /achievements # Achievement receipt creation
│   │   ├── /streaks      # Streak tracking logic
│   │   ├── /leaderboard  # Helius indexing + ranking
│   │   └── /sanity       # CMS content fetching
│   ├── /lib
│   │   ├── /db           # Supabase/Prisma client and helpers
│   │   ├── /auth         # JWT, wallet signature verification
│   │   ├── /anchor       # Anchor program client setup
│   │   └── /utils        # Shared utilities
│   ├── /jobs             # Background jobs (async tx submission, indexing)
│   ├── /webhooks         # Helius webhook handlers (on-chain events)
│   └── /types            # Shared TypeScript types and interfaces
├── /prisma               # Prisma schema (if using Prisma)
├── .env.example
└── README.md
```

---

## Database Schema

All off-chain state lives in Supabase (PostgreSQL). The schema is designed with clean abstractions so tables can be deprecated as features migrate on-chain.

### `users`
Stores identity and profile data for all authenticated users.

| Column | Type | Notes |
|---|---|---|
| `id` | UUID | Primary key |
| `wallet_address` | VARCHAR | Nullable; linked Solana wallet |
| `google_id` | VARCHAR | Nullable; linked Google account |
| `github_id` | VARCHAR | Nullable; linked GitHub account |
| `username` | VARCHAR | Unique display name |
| `display_name` | VARCHAR | |
| `bio` | TEXT | |
| `avatar_url` | VARCHAR | |
| `social_links` | JSONB | Twitter, GitHub, website, etc. |
| `is_profile_public` | BOOLEAN | Default true |
| `preferred_language` | VARCHAR | `en`, `pt-br`, `es` |
| `preferred_theme` | VARCHAR | `dark`, `light` |
| `created_at` | TIMESTAMP | |
| `updated_at` | TIMESTAMP | |

### `course_progress`
Tracks enrollment and lesson completion state (stubbed; will be replaced by on-chain enrollment PDA reads).

| Column | Type | Notes |
|---|---|---|
| `id` | UUID | Primary key |
| `user_id` | UUID | FK → users |
| `course_id` | VARCHAR | Sanity course slug or on-chain PDA address |
| `enrolled_at` | TIMESTAMP | |
| `completed_at` | TIMESTAMP | Nullable |
| `lessons_completed` | INTEGER | Count |
| `lesson_bitmap` | BIGINT[] | Mirrors on-chain 256-bit bitmap |
| `xp_earned` | INTEGER | XP attributed to this course |

### `activity_log`
Append-only log of all learner activity. Used for streak calculation, leaderboard weighting, and analytics.

| Column | Type | Notes |
|---|---|---|
| `id` | UUID | Primary key |
| `user_id` | UUID | FK → users |
| `event_type` | VARCHAR | `lesson_complete`, `challenge_pass`, `course_complete`, `login` |
| `course_id` | VARCHAR | Nullable |
| `lesson_id` | VARCHAR | Nullable |
| `xp_delta` | INTEGER | XP earned by this event |
| `occurred_at` | TIMESTAMP | |

### `streaks`
Stores current streak and history per user (frontend-managed feature, persisted server-side).

| Column | Type | Notes |
|---|---|---|
| `user_id` | UUID | PK + FK → users |
| `current_streak` | INTEGER | |
| `longest_streak` | INTEGER | |
| `last_active_date` | DATE | |
| `freeze_count` | INTEGER | Bonus: streak freezes remaining |
| `history` | JSONB | Array of `{ date, active }` for calendar view |

### `leaderboard_cache`
Cached snapshot of XP rankings, refreshed on a schedule by the indexer job.

| Column | Type | Notes |
|---|---|---|
| `wallet_address` | VARCHAR | PK |
| `user_id` | UUID | Nullable FK → users |
| `xp_balance` | BIGINT | Latest Token-2022 balance |
| `level` | INTEGER | Derived: `floor(sqrt(xp / 100))` |
| `rank_global` | INTEGER | |
| `rank_weekly` | INTEGER | |
| `rank_monthly` | INTEGER | |
| `last_indexed_at` | TIMESTAMP | |

---

## API Endpoints

### Authentication (`/api/auth`)

| Method | Endpoint | Description |
|---|---|---|
| POST | `/auth/wallet` | Verify wallet signature, issue JWT, create or fetch user |
| POST | `/auth/google` | Exchange Google OAuth token, issue JWT |
| POST | `/auth/github` | Exchange GitHub OAuth token, issue JWT (bonus) |
| POST | `/auth/link/wallet` | Link wallet to existing authenticated account |
| POST | `/auth/link/google` | Link Google to existing authenticated account |
| DELETE | `/auth/unlink/:method` | Unlink an auth method (must have at least one remaining) |
| POST | `/auth/refresh` | Refresh JWT |

**Wallet auth flow:**
1. Frontend requests a nonce for the wallet address
2. User signs the nonce with their wallet
3. Backend verifies the signature using `@solana/web3.js`
4. JWT issued and user record created or retrieved

### Users (`/api/users`)

| Method | Endpoint | Description |
|---|---|---|
| GET | `/users/me` | Get authenticated user's full profile |
| PATCH | `/users/me` | Update profile (name, bio, avatar, social links, preferences) |
| GET | `/users/:username` | Get public profile by username |
| DELETE | `/users/me` | Delete account + export data |

### Courses & Progress (`/api/courses`)

| Method | Endpoint | Description |
|---|---|---|
| GET | `/courses` | List all courses (proxies Sanity, adds user progress overlay) |
| GET | `/courses/:slug` | Course detail with enrollment status and progress |
| POST | `/courses/:slug/enroll` | Record enrollment (on-chain enrollment is signed client-side; this persists off-chain state) |
| GET | `/courses/:slug/progress` | Get lesson completion bitmap for current user |

### Lessons (`/api/lessons`)

| Method | Endpoint | Description |
|---|---|---|
| POST | `/lessons/complete` | Mark lesson complete, award XP, update bitmap, record activity |
| GET | `/lessons/:id/hints` | Fetch lesson hints (from Sanity or DB) |

**Lesson completion flow (backend-signed):**
1. Frontend calls `POST /lessons/complete` with `{ courseId, lessonIndex, walletAddress }`
2. Backend validates the request (JWT auth, not already completed)
3. Backend loads the backend keypair from env and submits the `completeLesson` instruction to the on-chain program
4. On success: updates `course_progress` bitmap, appends to `activity_log`, updates streak, returns XP delta
5. Frontend service layer receives response and updates UI state

### Leaderboard (`/api/leaderboard`)

| Method | Endpoint | Description |
|---|---|---|
| GET | `/leaderboard?timeframe=all-time` | Paginated XP rankings from `leaderboard_cache` |
| GET | `/leaderboard?timeframe=weekly` | Weekly rankings |
| GET | `/leaderboard?timeframe=monthly` | Monthly rankings |
| GET | `/leaderboard/me` | Current user's rank across all timeframes |

### Achievements (`/api/achievements`)

| Method | Endpoint | Description |
|---|---|---|
| GET | `/achievements` | List all achievement types with earned status for current user |
| POST | `/achievements/:type/claim` | Backend signs and submits claim transaction; mints soulbound NFT |

### Credentials (`/api/credentials`)

| Method | Endpoint | Description |
|---|---|---|
| GET | `/credentials/:wallet` | Fetch Metaplex Core NFTs for a wallet via Helius DAS API |
| GET | `/credentials/verify/:mintAddress` | Verify credential authenticity on-chain |

### Streaks (`/api/streaks`)

| Method | Endpoint | Description |
|---|---|---|
| GET | `/streaks/me` | Get current streak, longest streak, and history |
| POST | `/streaks/activity` | Record activity for today (idempotent) |

---

## Service Layer

### `SolanaService`
Wraps all direct on-chain interactions. Uses Anchor client generated from the program IDL.

```typescript
interface SolanaService {
  // Enrollment
  getEnrollmentPDA(wallet: PublicKey, courseId: PublicKey): Promise<EnrollmentAccount | null>

  // Lesson completion (backend-signed)
  completeLesson(wallet: PublicKey, courseId: PublicKey, lessonIndex: number): Promise<TransactionSignature>

  // XP
  getXPBalance(wallet: PublicKey): Promise<number>

  // Credentials
  finalizeCourse(wallet: PublicKey, courseId: PublicKey): Promise<TransactionSignature>
  getCredentialNFTs(wallet: PublicKey): Promise<CredentialNFT[]>

  // Achievements
  claimAchievement(wallet: PublicKey, achievementType: number): Promise<TransactionSignature>
}
```

### `LeaderboardService`
Queries Helius DAS API for Token-2022 XP token holders and ranks them.

```typescript
interface LeaderboardService {
  indexXPBalances(): Promise<void>                                      // Run on schedule
  getLeaderboard(timeframe: 'weekly' | 'monthly' | 'all-time', page: number, pageSize: number): Promise<LeaderboardEntry[]>
  getUserRank(walletAddress: string): Promise<UserRank>
}
```

### `StreakService`
Manages streak state with idempotent daily activity recording.

```typescript
interface StreakService {
  getStreak(userId: string): Promise<StreakData>
  recordActivity(userId: string, date: Date): Promise<StreakData>      // Idempotent per day
  applyFreeze(userId: string): Promise<void>                           // Bonus
  checkMilestone(streak: number): StreakMilestone | null               // 7, 30, 100 days
}
```

### `XPService`
Coordinates XP awarding across on-chain minting and off-chain logging.

```typescript
interface XPService {
  awardXP(wallet: PublicKey, amount: number, reason: XPReason): Promise<void>
  getBalance(wallet: PublicKey): Promise<number>
  deriveLevel(xp: number): number  // floor(sqrt(xp / 100))
}
```

---

## Authentication & Authorization

### Wallet Authentication
- Frontend requests a one-time nonce from the backend
- User signs the nonce message with their Solana wallet
- Backend verifies the signature using `nacl.sign.detached.verify` or `@solana/web3.js`
- JWT (access token + refresh token) issued on success

### OAuth (Google / GitHub)
- Standard OAuth 2.0 authorization code flow
- Backend exchanges code for tokens, retrieves user profile, creates or links account
- Same JWT issued on success

### Authorization
- All protected routes require a valid JWT in the `Authorization: Bearer` header
- Backend-signed transaction routes additionally verify that the `walletAddress` in the request matches the authenticated user's linked wallet
- Role-based access: `learner` (default), `admin` (bonus: course management)

---

## Background Jobs

### XP Leaderboard Indexer
- Runs on a schedule (e.g., every 15 minutes)
- Queries Helius DAS API for all holders of the XP Token-2022 mint
- Computes global, weekly, and monthly rankings
- Upserts results into `leaderboard_cache`

### Streak Reset Job
- Runs daily at midnight UTC
- Checks all users with `last_active_date` > 1 day ago
- Resets `current_streak` to 0 unless a freeze is applied
- Updates `history` for the missed day

### Activity Aggregator (Optional)
- Aggregates `activity_log` into weekly/monthly summaries
- Used to power dashboard activity feeds and admin analytics

---

## On-Chain Integration Points

The backend holds a **backend keypair** (stored securely in environment variables) that signs and submits transactions on behalf of learners for operations that require a trusted authority.

| Operation | Signer | Notes |
|---|---|---|
| Course enrollment | Learner wallet (client-side) | No backend involvement |
| Lesson completion | Backend keypair | Backend validates then signs |
| XP minting | Backend keypair | Via on-chain program instruction |
| Course finalization | Backend keypair | Triggers credential NFT upgrade |
| Achievement claiming | Backend keypair | Mints soulbound achievement NFT |

All transactions are submitted to **Devnet** for MVP. RPC endpoint configurable via env var.

---

## Environment Variables

```env
# Solana
SOLANA_RPC_URL=https://api.devnet.solana.com
BACKEND_KEYPAIR=<base58 or JSON array>
PROGRAM_ID=<on-chain program address>
XP_MINT_ADDRESS=<Token-2022 mint address>

# Database
DATABASE_URL=<Supabase PostgreSQL connection string>
SUPABASE_URL=<project URL>
SUPABASE_SERVICE_ROLE_KEY=<service role key>

# Auth
JWT_SECRET=<random secret>
JWT_REFRESH_SECRET=<random secret>
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
GITHUB_CLIENT_ID=
GITHUB_CLIENT_SECRET=

# Indexer
HELIUS_API_KEY=<Helius API key>

# CMS
SANITY_PROJECT_ID=
SANITY_DATASET=production
SANITY_API_TOKEN=

# Monitoring
SENTRY_DSN=
```

---

## Security Considerations

- Backend keypair must never be exposed to the client — stored in server-only env vars
- All wallet signature verifications must happen server-side before issuing JWTs
- Rate limiting on auth endpoints (wallet nonce, OAuth) to prevent abuse
- Input validation and sanitization on all endpoints (Zod schemas)
- CORS restricted to frontend origin
- Lesson completion endpoint is idempotent — double submissions must not double-award XP
- Supabase Row Level Security (RLS) enabled for all user-scoped tables

---

## What to Fully Implement

- Wallet signature auth + JWT issuance
- Google OAuth + account linking
- User profile CRUD
- Lesson completion endpoint (backend-signed transaction to on-chain program)
- Streak tracking (record activity, calculate streak, detect milestones)
- Leaderboard indexer (Helius DAS API → `leaderboard_cache` → ranked API response)
- Credential fetching via Helius DAS API

## What to Stub

- Course finalization + credential NFT upgrade (clean interface, returns mock response)
- Achievement claiming (clean interface, logs intent, returns mock success)
- XP minting (log intended mint, return current balance — on-chain call wired later)
- GitHub OAuth (bonus feature, stub with `501 Not Implemented` response)

---

## Required Deliverables

- All API endpoints functional and documented
- Supabase schema with migrations checked into repo
- Backend keypair transaction signing working on Devnet for lesson completion
- Leaderboard indexer running and populating cache
- Streak service with daily reset job
- Auth: wallet + Google sign-in working end-to-end
- Sentry error monitoring integrated
- `.env.example` with all required variables documented
- `README.md` — local setup, env vars, running jobs, deploying

## Bonus Deliverables

- GitHub OAuth
- Admin API routes (list users, view course analytics, manage content)
- Helius webhook handler for real-time on-chain event processing
- E2E tests (Vitest or Jest) covering auth flow, lesson completion, leaderboard
- OpenAPI / tRPC schema auto-generated and published

---

## Out of Scope (Backend)

- On-chain program development (program already exists in `/onchain-academy`)
- Frontend UI (see `Frontend_Scope.md`)
- Course content creation (mock content provided via Sanity)
- Sanity Studio configuration (see `CMS_GUIDE.md`)