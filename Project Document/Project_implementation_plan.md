# Project Implementation Plan — Solana Academy LMS

This document outlines the systematic implementation roadmap for the Superteam Brazil Academy, transitioning from static UI mocks to a fully functional, on-chain integrated learning platform.

## Current Progress Status
- [x] **Brand Identity**: Typography, colors, and design system foundations.
- [x] **Core UI Pages**: Landing, Catalog, Detail, Dashboard, Profile, and Leaderboard (Static/Mock).
- [x] **Learning Engine (Visual)**: Split lesson layout and initial code editor iframe integration.

---

## Phase 1: Dynamic UI & Identity Foundations
*Objective: Solidify the user identity and settings framework before wiring backend logic.*

- [ ] **[NEW] Settings Page (`/settings`)**
    - [ ] Profile Editing: UI for name, bio, avatar upload.
    - [ ] Account Management: Wallet linking and OAuth stubs.
    - [ ] Preferences: Language and Theme selectors.
- [ ] **Internationalization (i18n)**
    - [ ] Implement `next-intl` or `next-i18next`.
    - [ ] Move all UI strings to locale files (EN, PT-BR, ES).
- [ ] **Global State**
    - [ ] Set up Zustand store for user session and locale-persistent settings.

## Phase 2: Authentication & Backend Bridge
*Objective: Enable secure user sessions and provide a unified interface for data fetching.*

- [ ] **Wallet Authentication**
    - [ ] Finalize Jupiter Wallet Adapter integration.
    - [ ] Implement backend signature verification (Solana Message Signing).
- [ ] **Service Layer Implementation**
    - [ ] Develop `LearningProgressService` interface.
    - [ ] Create `StubLearningProgressService` for local development.
    - [ ] Integrate service with `/courses`, `/dashboard`, and `/profile`.

## Phase 3: Content & Learning Engine (Dynamic)
*Objective: Connect the LMS to real data sources and enable progress tracking.*

- [ ] **Sanity CMS Integration**
    - [ ] Connect frontend to Sanity Studio.
    - [ ] Replace `MOCK_DATA` in catalog and detail pages with GROQ queries.
- [ ] **Progress Tracking**
    - [ ] Implement lesson completion logic (backend-signed transaction stubs).
    - [ ] Update enrollment state tracking on-chain (Devnet).

## Phase 4: Gamification & On-Chain Rewards
*Objective: Finalize the XP and Credential systems.*

- [ ] **On-Chain Identity**
    - [ ] Fetch XP Balance from Token-2022 accounts.
    - [ ] Fetch Metaplex Core NFTs for credentials and badges.
- [ ] **Gamification Logic**
    - [ ] Implement Streak system (Frontend tracking + backend persistence).
    - [ ] Implement Leaderboard indexing (Derived from on-chain XP balances).

## Phase 5: Production & Distribution
*Objective: Performance optimization and final handoff.*

- [ ] **Analytics & Monitoring**
    - [ ] Integrate GA4, PostHog, and Sentry.
- [ ] **Documentation**
    - [ ] Finalize `README.md`, `ARCHITECTURE.md`, and `CMS_GUIDE.md`.
- [ ] **Final Polish**
    - [ ] SEO Metadata, Page Transitions, and Lighthouse Audits.
