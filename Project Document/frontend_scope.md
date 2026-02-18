# Frontend Scope — Solana Academy LMS

## Overview

This document defines the frontend scope for the Solana Academy LMS. The frontend is a Next.js 14+ application delivering an interactive, gamified learning experience for Solana developers — with wallet-native auth, on-chain credential display, a code editor, and full i18n support for PT-BR, ES, and EN.

**Repo path:** `/app` inside [github.com/solanabr/superteam-academy](https://github.com/solanabr/superteam-academy)  
**Deployment:** Vercel (with preview deployments per PR)

---

## Current Implementation Status (Draft)

**Phase 0: Brand Identity Integration**
- [x] **Colors**: Radix-based Green and Gray scales implemented in `globals.css` and `tailwind.config.ts`.
- [ ] **Typography**: Archivo/Inter fonts configured, but specific Brand Kit sizes (96px, 60px, 15px, 13px, etc.) not yet mapped in Tailwind theme.

**Completed:**
- [x] Project Structure (Next.js 14+, Tailwind, shadcn/ui configured)
- [x] Basic Layout (`Header`, `ThemeProvider` for Dark Mode)
- [x] Course Catalog UI (`/courses` with mock data)
- [x] Routing Structure for Courses/Lessons
- [x] Design System baseline (`src/app/design-system`, fonts configured)

**In Progress / Pending:**
- [ ] **Authentication**: Wallet Adapter not yet integrated globally.
- [ ] **Landing Page**: Currently a placeholder.
- [ ] **Lesson Interface**: Basic routing exists, but content/editor view needs implementation.
- [ ] **Backend Integration**: Service layer for progress/XP is missing.
- [ ] **Profile/Settings**: Pages not yet created.


---

## Tech Stack

| Concern | Technology |
|---|---|
| Framework | Next.js 14+ (App Router, SSG/SSR where appropriate) |
| Language | TypeScript — strict mode, zero `any` types |
| Styling | Tailwind CSS with custom design tokens (dark mode primary) |
| UI Components | shadcn/ui + Radix UI primitives |
| CMS Client | Sanity (content fetching, GROQ queries) |
| Auth | Solana Wallet Adapter (Jupiter) + Google Sign-in + GitHub Sign-in (bonus) |
| Analytics | GA4 (custom events) + PostHog (heatmaps) + Sentry (error monitoring) |
| i18n | next-intl or next-i18next — PT-BR, ES, EN from day one |
| Code Editor | Embedded Solana Playground via iframe (`beta.solpg.io`) |
| State Management | React Context / Zustand (for auth, XP, streak state) |
| Blockchain | `@solana/web3.js`, `@solana/wallet-adapter-react`, Metaplex JS SDK |
| Data Fetching | SWR or TanStack Query |

---

## Design Principles

- **Dark mode primary** — light mode as secondary option, toggled via settings
- **Developer-focused aesthetic** — clean, minimal, terminal-inspired accents
- **Mobile-responsive** — all pages functional on mobile; code editor degrades gracefully
- **Accessible** — Lighthouse Accessibility target 95+; ARIA labels, keyboard nav, focus management
- **Performance-first** — image optimization, lazy loading, code splitting, static generation where possible

---

## Application Structure

```
/app
├── (marketing)
│   └── /                        # Landing page
├── (auth)
│   └── /login                   # Auth entry point
├── (platform)
│   ├── /courses                 # Course catalog
│   ├── /courses/[slug]          # Course detail
│   ├── /courses/[slug]/lessons/[id]  # Lesson view + code editor
│   ├── /dashboard               # User dashboard
│   ├── /leaderboard             # Global XP leaderboard
│   ├── /profile                 # Own profile
│   ├── /profile/[username]      # Public profile
│   ├── /certificates/[id]       # Credential/certificate view
│   └── /settings                # Account settings
├── /components                  # Shared UI components
├── /lib
│   ├── /services                # Service layer (on-chain + stubbed)
│   ├── /hooks                   # Custom React hooks
│   ├── /utils                   # Helpers and formatters
│   └── /constants               # Config, XP tables, achievement definitions
├── /messages                    # i18n string files (en.json, pt-br.json, es.json)
└── /public                      # Static assets
```

---

## Pages

### 1. Landing Page (`/`)

**Purpose:** Convert visitors to sign-ups.

**Sections:**
- Hero with headline, subheadline, primary CTAs (Sign Up, Explore Courses)
- Learning path previews with visual progression indicators
- Social proof — testimonials, partner logos, completion stats
- Platform feature highlights (on-chain credentials, gamification, i18n, open-source)
- Footer — links, socials, newsletter signup

**Implementation notes:**
- Statically generated (SSG)
- Optimized images via `next/image`
- All copy externalized to i18n message files

---

### 2. Course Catalog (`/courses`)

**Purpose:** Discoverable entry point to all available courses and learning paths.

**Features:**
- Filterable course grid (difficulty, topic, duration)
- Curated learning paths (e.g., "Solana Fundamentals", "DeFi Developer")
- Course cards: thumbnail, title, description, difficulty badge, duration, progress %
- Full-text search (client-side or Sanity-powered)
- Skeleton loaders during fetch

**Data source:** Sanity CMS (courses, metadata, thumbnails)

---

### 3. Course Detail (`/courses/[slug]`)

**Purpose:** Course overview and enrollment entry point.

**Features:**
- Course header: title, description, instructor, duration, difficulty
- Expandable module/lesson list with completion status indicators
- Progress bar and total XP earnable
- Enrollment CTA — triggers on-chain `enroll` transaction (learner signs directly)
- Reviews section (static for MVP)

**On-chain integration:**
- Enrollment: call `enroll` instruction; learner wallet signs
- Read enrollment PDA to display current progress state

---

### 4. Lesson View (`/courses/[slug]/lessons/[id]`)

**Purpose:** Core learning experience.

**Layout:** Resizable split — content panel (left) + code editor (right)

**Content panel:**
- Markdown rendering with syntax highlighting (rehype/remark)
- Lesson type: `content` (reading/video) or `challenge` (interactive coding)
- Previous/Next navigation
- Module overview sidebar (collapsible)
- Expandable hints and solution toggle
- Lesson completion button with auto-save progress

**Code editor panel (challenge lessons):**
- Embedded Solana Playground (`beta.solpg.io`) via iframe
- Rust / TypeScript / JSON support
- Syntax highlighting + basic autocompletion
- Run button → output display
- Pass/fail test case indicators
- Real-time error messages
- Success state → triggers XP award and lesson complete

**Stubbed:** Lesson completion calls `LearningProgressService.completeLesson()` — backend-signed transaction stubbed, swappable later.

---

### 5. User Dashboard (`/dashboard`)

**Purpose:** Learner's home base for tracking progress and activity.

**Sections:**
- Active courses with completion % and "Continue" CTA (links to next incomplete lesson)
- XP balance + level progress bar + rank
- Streak tracker with calendar visualization (frontend-managed, local storage or DB)
- Recent achievements and badge previews
- Recommended next courses (based on current track or completion)
- Recent activity feed (lesson completions, XP earned, achievements)

**Data:**
- XP balance from Token-2022 on-chain account (real)
- Streaks from `LearningProgressService.getStreakData()` (frontend-managed)
- Course progress from enrollment PDAs (real) and local stub fallback

---

### 6. User Profile (`/profile`, `/profile/[username]`)

**Purpose:** Public and private learner profile showcasing skills and credentials.

**Sections:**
- Profile header: avatar, display name, bio, social links, join date
- Skill radar chart: Rust, Anchor, Frontend, Security, DeFi, Tooling
- Achievement badge showcase (grid of earned badges)
- On-chain credential display: evolving Metaplex Core NFTs with track, level, courses completed, verification link
- Completed courses list
- Public/private visibility toggle (in own profile only)

**On-chain integration:**
- Fetch Metaplex Core NFTs from wallet (Helius DAS API or `@metaplex-foundation/mpl-core`)
- Display NFT attributes: track, level, courses completed, total XP
- Link to Solana Explorer for on-chain verification

---

### 7. Leaderboard (`/leaderboard`)

**Purpose:** Community ranking by XP.

**Features:**
- Global XP rankings (derived by indexing Token-2022 balances)
- Weekly / monthly / all-time filter
- Filter by course/track (bonus)
- User cards: rank, avatar, display name, XP, level, streak
- Current authenticated user highlighted regardless of rank

**Data source:** Off-chain indexer (`LearningProgressService.getLeaderboard(timeframe)`) using Helius DAS API or custom indexer — returns sorted list of wallets by XP token balance.

---

### 8. Settings (`/settings`)

**Purpose:** Account management and preferences.

**Sections:**
- Profile editing: name, bio, avatar upload, social links
- Account: connected wallets, linked Google/GitHub accounts
- Preferences: language selector (PT-BR / ES / EN), theme toggle (dark/light), notification preferences
- Privacy: profile visibility toggle, data export option

---

### 9. Certificate/Credential View (`/certificates/[id]`)

**Purpose:** Shareable, verifiable proof of course completion.

**Features:**
- Visual certificate card: course name, recipient name, completion date
- On-chain verification link (Solana Explorer, using NFT mint address)
- Social sharing buttons (Twitter/X, LinkedIn, copy link)
- Downloadable certificate image (canvas or `html2canvas`)
- NFT metadata panel: mint address, attributes, ownership proof

**On-chain integration:**
- Fetch Metaplex Core NFT by mint address
- Display live on-chain attributes

---

## Service Layer

All on-chain interactions are abstracted behind a service interface. This allows local/stub implementations to be swapped for on-chain calls without touching UI components.

### `LearningProgressService`

```typescript
interface LearningProgressService {
  // Progress
  getCourseProgress(wallet: PublicKey, courseId: string): Promise<CourseProgress>
  completeLesson(wallet: PublicKey, courseId: string, lessonIndex: number): Promise<void> // stubbed

  // XP & Levels
  getXPBalance(wallet: PublicKey): Promise<number>
  getLevel(xp: number): number // pure: floor(sqrt(xp / 100))

  // Streaks (frontend-managed)
  getStreakData(userId: string): Promise<StreakData>
  recordActivity(userId: string): Promise<void>

  // Leaderboard (off-chain indexer)
  getLeaderboard(timeframe: 'weekly' | 'monthly' | 'all-time'): Promise<LeaderboardEntry[]>

  // Credentials
  getCredentials(wallet: PublicKey): Promise<Credential[]>

  // Achievements
  getAchievements(wallet: PublicKey): Promise<Achievement[]>
  claimAchievement(wallet: PublicKey, achievementType: number): Promise<void> // stubbed
}
```

Implementations:
- `OnChainLearningProgressService` — live Devnet calls (use for XP balance, credentials, enrollment)
- `LocalLearningProgressService` — local storage / Supabase stub (use for lesson completion, streaks, achievements)

---

## Authentication & Account Linking

| Method | Status |
|---|---|
| Solana Wallet (Jupiter Adapter) | Required |
| Google Sign-in | Required |
| GitHub Sign-in | Bonus |

Users can sign up with any method. Additional methods can be linked later in Settings. **Wallet linking is required to finalize courses and receive on-chain credentials.**

Auth state is managed globally (Context or Zustand). Wallet state uses `@solana/wallet-adapter-react`.

---

## Gamification — Frontend Responsibilities

### XP Display
- Read Token-2022 soulbound token balance from on-chain account
- Derive level: `Level = Math.floor(Math.sqrt(xp / 100))`
- Show animated XP gain after lesson/challenge completion
- Progress bar toward next level

### Streak Tracking (Frontend-Only)
- Record daily activity on any lesson or challenge completion
- Persist streak state in local storage or Supabase
- Visual streak calendar (GitHub contribution-style heatmap)
- Milestone alerts at 7, 30, and 100 consecutive days
- Streak freeze mechanic (bonus)

### Achievements
- Badge grid rendered from `AchievementType` definitions
- Earned badges show NFT-backed state; unearned show locked state
- `claimAchievement()` stubbed — will call on-chain program later
- Achievement unlock toasts/modals with XP reward display

### XP Reward Events (to emit to GA4 + PostHog)
| Event | XP |
|---|---|
| Lesson complete | 10–50 XP |
| Challenge complete | 25–100 XP |
| Course complete | 500–2,000 XP |
| Daily streak bonus | 10 XP |
| First completion of the day | 25 XP |

---

## Internationalization (i18n)

- Languages: **PT-BR**, **ES**, **EN** (all three from day one)
- All UI strings externalized to `/messages/{locale}.json` — no hardcoded copy in components
- Language switcher in header and in Settings
- Course content remains in original language (no translation required)
- Use `next-intl` or `next-i18next` for routing and message resolution
- RTL not required

---

## Analytics

| Tool | Purpose |
|---|---|
| GA4 | Page views, custom events (lesson complete, enrollment, XP gain, wallet connect) |
| PostHog | Session recording, heatmaps, funnel analysis |
| Sentry | Frontend error monitoring, performance tracing |

Custom GA4 events to implement: `wallet_connected`, `course_enrolled`, `lesson_completed`, `challenge_passed`, `xp_earned`, `achievement_unlocked`, `credential_viewed`.

---

## Code Editor Integration

- Embed Solana Playground (`beta.solpg.io`) via iframe for challenge lessons
- Must support: Rust, TypeScript, JSON
- Communicate pass/fail state via `postMessage` or iframe URL params
- Show test case results in UI alongside the iframe
- On pass: trigger lesson completion flow + XP award

---

## Performance Targets

| Metric | Target |
|---|---|
| Lighthouse Performance | 90+ |
| Lighthouse Accessibility | 95+ |
| Lighthouse Best Practices | 95+ |
| Lighthouse SEO | 90+ |
| LCP | < 2.5s |
| FID | < 100ms |
| CLS | < 0.1 |

**Implementation requirements:** `next/image` for all images, dynamic imports for heavy components (code editor, charts), static generation (SSG) for landing/catalog/course detail, ISR for leaderboard and course lists, bundle analysis and tree-shaking.

---

## Theming

- Dark mode is the **primary** theme; light mode is secondary
- All colors must be sourced exclusively from the official **Brand Kit** (`web/Brand Kit' folder in the repo) — no arbitrary or ad-hoc colors
- Custom Tailwind design tokens must map 1:1 to Brand Kit color values: primary, secondary, accent, background, surface, and text colors
- Typography scale, spacing, and border radius should also align with Brand Kit guidelines where specified
- Theme toggle in header and Settings; persisted to local storage
- shadcn/ui components themed via CSS variables, all referencing Brand Kit tokens
- No hardcoded hex values in components — always reference a token (e.g., `text-brand-primary`, `bg-brand-surface`)

---

## Responsive Design

| Breakpoint | Notes |
|---|---|
| Mobile (< 768px) | All pages functional; code editor collapses to tabbed view (content / editor) |
| Tablet (768–1024px) | Split layout at reduced widths |
| Desktop (1024px+) | Full split layout, sidebar nav visible |

---

## Required Deliverables

- All 10 pages fully functional and responsive
- Light and dark themes
- Wallet auth + Google sign-in working
- XP balance and credential display from Devnet
- Course enrollment on-chain transaction
- Gamification UI (XP bar, streak calendar, badges)
- i18n for PT-BR, ES, EN
- GA4 + PostHog + Sentry integrated
- Sanity CMS connected with sample course rendered
- `LearningProgressService` interface with on-chain and stub implementations
- Live Vercel deployment with preview deploys
- `README.md`, `ARCHITECTURE.md`, `CMS_GUIDE.md`, `CUSTOMIZATION.md`

---

## Bonus Deliverables

- GitHub Sign-in
- Admin dashboard (course management + user analytics)
- E2E tests with Playwright or Cypress (cover: wallet connect, enrollment, lesson complete, leaderboard)
- Community/forum section (threads + Q&A)
- Onboarding flow with skill assessment quiz
- PWA support (installable + offline-capable)
- Advanced gamification: daily challenges, seasonal events, streak freeze
- CMS course creator dashboard (in-app, not just Sanity Studio)

---

## Out of Scope (Frontend)

- On-chain program development (program already exists in `/onchain-academy`)
- Backend API development (service layer stubs cover this for MVP)
- Course content creation (mock content provided)
- Indexer infrastructure (Helius DAS API used directly for leaderboard)