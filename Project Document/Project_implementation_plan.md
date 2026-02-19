# Project Roadmap: Completion Plan — Superteam Academy

This document outlines the final steps to transition the Superteam Academy from an integrated frontend frame to a fully functional, content-driven learning platform.

## 1. Authentication & Identity (Phase 1)
**Goal**: Secure, wallet-native user sessions and profile persistence.
- **Supabase Integration**: Set up tables for `users`, `activity_log`, and `streaks`.
- **Wallet-Native Auth**: Implement the nonce-signing handshake:
  - Frontend signs a nonce from the backend.
  - Backend verifies and issues a JWT.
- **Account Linking**: Implement Google OAuth linking as per scope.

## 2. Dynamic Content: Sanity CMS (Phase 2)
**Goal**: Replace mock content with the actual curriculum.
- **Sanity Client**: Connect the frontend to the Sanity dataset.
- **GROQ Queries**: Implement fetching for Course Catalog, Module structure, and Lesson content.
- **Markdown Mapping**: Ensure lesson content renders beautifully with syntax highlighting.

## 3. Advanced On-Chain Features (Phase 3)
**Goal**: Automated XP rewards and verifiable credentials.
- **Metaplex Core Lifecycle**: 
  - Automate `issue_credential` when a track is completed.
  - Implement `upgrade_credential` to evolve user NFTs as they gain XP.
- **Leaderboard Indexing**: Integrate Helius DAS API to fetch XP (Token-2022) balances for global rankings.

## 4. Gamification & UX (Phase 4)
**Goal**: Drive engagement through daily interactions.
- **Streak Service**: Implement a Supabase-backed service to track daily activity and show the heatmap calendar.
- **Solana Playground Embedding**: Finalize the iframe integration for the code editor, enabling "Run/Test" functionality.
- **i18n Completion**: Map all UI strings to translation files for PT-BR, ES, and EN.

## 5. Verification & Launch (Phase 5)
- **Production Build**: Local `npm run build` is already passing. Final check on Vercel.
- **Devnet Trial**: End-to-end walk through of the "New User" flow (Course discovery -> Enrollment -> Lesson completion -> XP award -> Metadata update).

## Next Immediate Task
I recommend starting with **Phase 1: Authentication & Identity**, as it creates the necessary database layer for Streaks and Profile features.
