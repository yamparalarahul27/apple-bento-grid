# Scope of Work — Solana Academy LMS

## Project Overview

Build an open-source, interactive learning management system (LMS) for Solana developers — described as "Codecademy meets Cyfrin Updraft" for Solana. The platform features gamified progression, interactive coding challenges, on-chain credentials, and multi-language support targeting the LATAM developer community.

**Delivery:** Pull Request to [github.com/solanabr/superteam-academy](https://github.com/solanabr/superteam-academy) under the `/app` (frontend) and `/backend` directories.

**Timeline:** 9 days from listing.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | React + Next.js 14+ (App Router) |
| Language | TypeScript (strict mode, no `any`) |
| Styling | Tailwind CSS + shadcn/ui + Radix UI |
| CMS | Sanity |
| Auth | Solana Wallet Adapter (Jupiter) + Google Sign-in (GitHub as bonus) |
| Analytics | GA4 + PostHog (heatmaps) + Sentry |
| i18n | PT-BR, ES, EN |
| Code Editor | Embedded Solana Playground (iframe) |
| Deployment | Vercel |
| Backend (optional) | Supabase (with clean abstractions for future on-chain swap) |

---

## On-Chain Architecture (Existing Program)

The on-chain program is already built. The frontend must integrate with it where required and stub where specified.

| Feature | Implementation |
|---|---|
| XP | Soulbound Token-2022 (NonTransferable). Level = `floor(sqrt(xp / 100))` |
| Credentials | Metaplex Core NFTs, soulbound via PermanentFreezeDelegate. One evolving NFT per learning track. |
| Courses | On-chain PDAs with per-learner Enrollment PDAs. Lesson progress via 256-bit bitmap. |
| Achievements | AchievementType + AchievementReceipt PDAs, each backed by a soulbound Metaplex Core NFT. |
| Leaderboard | Off-chain, derived by indexing XP token balances (Helius DAS API or custom indexer). |
| Streaks | Frontend-only (local storage or database). Not tracked on-chain. |

---

## What to Fully Implement (Devnet)

- Wallet authentication (multi-wallet adapter)
- XP balance display from Token-2022 token accounts
- Credential (Metaplex Core NFT) display and verification
- Leaderboard by indexing XP balances
- Course enrollment (learner signs transaction directly — no backend required)

## What to Stub (Clean Abstractions)

- Lesson completion flow (backend-signed transactions)
- Course finalization and credential issuance
- Achievement claiming
- Streak tracking (frontend-only, local storage or DB)

A `LearningProgressService` interface must expose: get progress per user/course, complete a lesson, get XP balance, get streak data, get leaderboard entries (weekly/monthly/all-time), and get credentials for a wallet.

---

## Pages & Features

### 1. Landing Page (`/`)
Hero with CTAs, learning path previews, social proof, platform feature highlights, and footer.

### 2. Course Catalog (`/courses`)
Filterable and searchable course grid. Course cards with thumbnail, title, description, difficulty, duration, and progress %. Curated learning paths.

### 3. Course Detail (`/courses/[slug]`)
Course header, expandable module/lesson list with completion status, progress bar, XP to earn, enrollment CTA, and reviews section.

### 4. Lesson View (`/courses/[slug]/lessons/[id]`)
Split layout (content left, code editor right), resizable. Markdown rendering, previous/next navigation, lesson completion tracking, and expandable hints/solution toggle.

### 5. Code Challenge Interface
Challenge prompt, visible test cases, editable starter code, run button with output display, real-time error messages, success feedback, and XP award.

### 6. User Dashboard (`/dashboard`)
Active courses, XP balance, level progress, streak calendar, recent achievements, recommended courses, and activity feed.

### 7. User Profile (`/profile`, `/profile/[username]`)
Profile header, skill radar chart, achievement badges, on-chain credential display (evolving NFTs), completed courses list, and public/private toggle.

### 8. Leaderboard (`/leaderboard`)
Global XP rankings with weekly/monthly/all-time filters. User cards with rank, avatar, XP, level, and streak. Current user highlighted.

### 9. Settings (`/settings`)
Profile editing, account management (connected wallets, Google/GitHub), preferences (language, theme, notifications), and privacy controls.

### 10. Certificate/Credential View (`/certificates/[id]`)
Visual certificate, on-chain verification link (Solana Explorer), social sharing, downloadable image, and NFT metadata details.

---

## Gamification System

### XP & Leveling
| Action | XP Reward |
|---|---|
| Complete lesson | 10–50 XP (by difficulty) |
| Complete challenge | 25–100 XP |
| Complete course | 500–2,000 XP |
| Daily streak bonus | 10 XP |
| First completion of day | 25 XP |

Level derived as: `Level = floor(sqrt(totalXP / 100))`

### Streaks
Consecutive daily activity tracking with visual calendar. Milestone rewards at 7, 30, and 100 days. Frontend-only feature.

### Achievements
- **Progress:** First Steps, Course Completer, Speed Runner
- **Streaks:** Week Warrior, Monthly Master, Consistency King
- **Skills:** Rust Rookie, Anchor Expert, Full Stack Solana
- **Community:** Helper, First Comment, Top Contributor
- **Special:** Early Adopter, Bug Hunter, Perfect Score

---

## Account Linking

Users can sign up via wallet, Google, or GitHub (bonus). Additional auth methods can be linked post-registration. Wallet linking is required to finalize courses and receive credentials.

---

## CMS (Sanity)

Content structure: Courses → Modules → Lessons (content or challenge type).

Must support: visual editor with markdown/code blocks, media management, draft/publish workflow, and course metadata (difficulty, duration, XP, track).

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

Implement image optimization, code splitting, lazy loading, static generation, and bundle size optimization.

---

## Required Deliverables

- Pull Request to the monorepo with full frontend implementation
- All 10 core pages functional and responsive (light/dark themes)
- Wallet auth, gamification system, code editor integration
- i18n: PT-BR, ES, EN (all UI strings externalized, language switcher in header)
- GA4 custom events, PostHog heatmaps, Sentry error monitoring
- Sanity CMS configured with content schema and sample course
- Live demo on Vercel with preview deployments
- Documentation:
  - `README.md` — Overview, setup, env vars, deployment
  - `ARCHITECTURE.md` — System architecture, component structure, data flow, service interfaces
  - `CMS_GUIDE.md` — Content creation workflow and schema
  - `CUSTOMIZATION.md` — Theme, language, and gamification extension guide

---

## Bonus Deliverables

- Admin dashboard (course management + user analytics)
- E2E tests (Playwright or Cypress) for critical flows
- Community/forum section (discussion threads + Q&A)
- Onboarding flow with skill assessment quiz
- PWA support (installable, offline-capable)
- Advanced gamification (daily challenges, seasonal events)
- CMS course creator dashboard
- Actual Devnet program integration

---

## Evaluation Criteria

| Criteria | Weight |
|---|---|
| Code Quality & Architecture | 25% |
| Feature Completeness | 25% |
| UI/UX Design | 20% |
| Performance | 15% |
| Documentation | 10% |
| Bonus Features | 5% |