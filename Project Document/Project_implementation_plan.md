# Project Implementation Plan — Superteam Brazil Academy

This document outlines the systematic implementation roadmap for the Superteam Brazil Academy, transitioning from static UI mocks to a fully functional, on-chain integrated learning platform.

## Current Progress Status
- [x] **Brand Identity**: Typography, colors, and design system foundations.
- [x] **Settings Page**: Full profile, account, and preference management UI.
- [x] **Certificate View**: High-fidelity visual credentials with on-chain metadata.
- [x] **Quick Verification**: Slide-over panel with live Solana Explorer integration.
- [x] **Navigation & Layout**: Branded 404 page, responsive headers, and dashboard thumbnails.

---

## Phase 1: Foundation & Identity (Backend)
*Objective: Set up the core API infrastructure and secure user authentication.*

- [ ] **Infrastructure Setup**
    - [ ] Initialize Node.js/TypeScript backend project.
    - [ ] Configure Supabase/PostgreSQL schema (Users, Streaks, logs).
- [ ] **Secure Authentication**
    - [ ] Implement Nonce-based wallet signature verification.
    - [ ] JWT issuance and refresh logic for secure session management.

## Phase 2: On-Chain Service Layer
*Objective: Enable backend-signed transactions for anti-cheat and automated rewards.*

- [ ] **Anchor Integration**
    - [ ] Build `@coral-xyz/anchor` service layer with rotatable backend signer.
- [ ] **Instruction Handlers**
    - [ ] Implement `complete_lesson` (Bitmap updates).
    - [ ] Implement `reward_xp` (Platform milestones).

## Phase 3: Gamification & Leaderboard
*Objective: Drive user engagement through streaks and competitive indexing.*

- [ ] **Streak Service**
    - [ ] Implement persistence logic for current/longest streaks and activity logs.
- [ ] **Helius Indexer**
    - [ ] Integrate DAS API to fetch XP token balances.
    - [ ] Scheduled jobs to cache global/weekly/monthly rankings.

## Phase 4: Credentials & Metaplex Core
*Objective: Automate the issuance and evolution of soulbound NFT credentials.*

- [ ] **NFT Lifecycle**
    - [ ] Implement `issue_credential` for first-time track completion.
    - [ ] Implement `upgrade_credential` for evolving existing assets.
- [ ] **Achievements**
    - [ ] Logic for claiming specialized achievement badges.

## Phase 5: Production & Distribution
*Objective: Sync frontend, optimize performance, and final handoff.*

- [ ] **Frontend-Backend Sync**
    - [ ] Swap UI stubs for live Backend API calls.
    - [ ] Sanity CMS dynamic content integration.
- [ ] **Final Polish**
    - [ ] Sentry error monitoring and final Devnet verification.
    - [ ] SEO Metadata and Lighthouse performance audits.
