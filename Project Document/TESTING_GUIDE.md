# Testing Guide: Superteam Academy Progress Assessment

This guide provides step-by-step test cases to verify the implementation of **Phase 1 (Authentication)** and **Phase 2 (Sanity CMS Integration)**, aligned with the `main_scope.md`.

---

## 🔐 Phase 1: Authentication & Identity
**Objective:** Verify wallet-native authentication and session management.

### Test Case 1.1: Wallet Login (Nonce Signing)
1. **Action:** Navigate to the landing page and click "Connect Wallet" (or use the header login).
2. **Action:** Choose a Solana wallet (e.g., Phantom, Solflare) from the Jupiter/Solana adapter.
3. **Observation:** A signing request should appear in your wallet asking to sign a "Login to Superteam Academy" message with a unique nonce.
4. **Action:** Sign the message.
5. **Observation:** The page should refresh or update. You should see your wallet address/avatar in the header.
6. **Technical Check:** Inspect `Cookies` in DevTools. You should see a `sb-access-token` or similar JWT session cookie.

### Test Case 1.2: Session Persistence
1. **Action:** After logging in, refresh the page.
2. **Observation:** You should remain authenticated. The "Login" button should still show your profile/wallet.
3. **Action:** Disconnect your wallet.
4. **Observation:** The session should be invalidated, and you should be logged out of the application.

---

## 📚 Phase 2: Sanity CMS Curriculum
**Objective:** Verify that content is dynamically fetched from Sanity and rendered correctly.

### Test Case 2.1: Course Catalog (`/courses`)
1. **Action:** Navigate to `/courses`.
2. **Observation:** Multiple course cards should appear (e.g., "Solana Fundamentals").
3. **Observation:** Verify that titles, descriptions, difficulty badges, and thumbnails are visible. *Note: If Sanity is not configured locally, you will see a fallback empty state.*

### Test Case 2.2: Course Detail Page (`/courses/[slug]`)
1. **Action:** Click on a course card (e.g., "Solana Fundamentals").
2. **Observation:** The header should show the course title and progress.
3. **Observation:** The "Course Content" section (Accordion) should expand to show Modules and Lessons fetched from Sanity.

### Test Case 2.3: Lesson View & Content Rendering
1. **Action:** Click on a lesson (e.g., "What is Solana?").
2. **Observation:** The page should use the resizable split-layout.
3. **Observation:** **Left Panel:** Should display rich text content (headings, paragraphs, code blocks) rendered via Sanity Portable Text.
4. **Observation:** **Right Panel:** Should display the embedded Solana Playground or specific lesson challenge.

---

## ⚡ Integration: On-Chain Flow
**Objective:** Verify the connection between UI actions and Solana transactions.

### Test Case 3.1: Course Enrollment
1. **Action:** On a course detail page, click the enrollment button (if not already enrolled).
2. **Observation:** A wallet transaction should be triggered to initialize an enrollment PDA on Devnet.
3. **Action:** Confirm the transaction.
4. **Observation:** After success, the UI should show an "Enrolled" badge.

### Test Case 3.2: Lesson Completion (Backend Signing)
1. **Action:** Inside a lesson, click "Mark Complete".
2. **Observation:** Your wallet should ask to sign a message/transaction. This triggers a backend co-signing process via the JWT token.
3. **Observation:** Upon success, a "Lesson Completed" signature should be logged in the console, and XP should be updated (simulated for now).

---

## 📋 Summary of Status vs Scope

| Feature (from `main_scope.md`) | Status | Notes |
| :--- | :--- | :--- |
| **Wallet Authentication** | ✅ Done | Using Jupiter Adapter + Supabase Auth. |
| **Sanity CMS Integration** | ✅ Done | Courses, Modules, Lessons fully dynamic. |
| **Rich Content Rendering** | ✅ Done | Portable Text component installed & wired. |
| **Lesson completion flow** | ✅ Done | Secured by backend co-signer API. |
| **Split Layout Lesson View** | ✅ Done | Using Radix Resizable Panels. |
| **XP & Leaderboard** | 🚧 In Progress | Schema ready, logic needs final wiring to Helius. |

---

## 🚀 Next Steps
1.  **Phase 3: Gamification**: Implementing the XP balance fetcher using Helius DAS API and wiring the global Leaderboard.
2.  **Dashboard Refinement**: Connecting the user profile to show real on-chain credentials (evolving NFTs).
