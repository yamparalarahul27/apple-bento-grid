# Implementation Plan — Solana Academy LMS

This plan outlines the steps to complete the frontend implementation, prioritized to deliver the full visual experience (Part 1) before unifying the logic and backend integration (Part 2).

## Phase 0: Brand Identity Integration (Immediate)
- [x] **Colors**: Radix-based Green and Gray scales implemented in `globals.css` and `tailwind.config.ts`.
- [ ] **Typography**: Configure `tailwind.config.ts` to map Archivo/Inter fonts to specific Brand Kit sizes (96px, 60px, 15px, 13px, etc.).
- [ ] **Typography**: Update `globals.css` base layer to apply these font configurations to standard elements (`h1`-`h6`, `p`, etc.).

---

# Part 1: Frontend Implementation (Visuals & Static UI)

## Phase 1.1: Foundations & Navigation
- [ ] **Navigation**: Update pending links in `Header` and implement `Footer` component.
- [ ] **Wallet UI**: Add `WalletMultiButton` to Header and stylize to match Brand Kit (visual only placement).
- [ ] **Layout**: Ensure global layout matches the design system (font smoothing, background colors).

## Phase 1.2: Core Pages & UI
- [ ] **Landing Page (`/`)**: Replace placeholder with real landing page sections (Hero, Features, Stats) using `lucide-react` icons.
- [ ] **Course Catalog (`/courses`)**: Update `MOCK_DATA` with realistic Solana curriculum. Implement filtering/search UI (local state only).
- [ ] **Dashboard (`/dashboard`)**: Create user dashboard layout. Display enrolled courses, XP balance, and streak calendar using static mock data.
- [ ] **Course Detail (`/courses/[slug]`)**: Build course header, module list, and enrollment CTA UI.

## Phase 1.3: Learning Experience (The "Engine")
- [ ] **Lesson Layout**: Implement `ResizablePanel` for split view (Content vs Editor) in `/courses/[slug]/lessons/[id]`.
- [ ] **Content Rendering**: Integrate `react-markdown` with `remark-gfm` for lesson content display.
- [ ] **Code Editor UI**: Create `CodeEditor` component (Visual wrapper for iframe or editor) with "Run" and "Reset" buttons.
- [ ] **Completion UI**: Create the success state modal with confetti animation and XP reward display.

## Phase 1.4: Gamification & User Profile
- [ ] **Profile Page (`/profile`)**: Build profile UI with skill radar (`recharts`), badges grid, and "Certificates" section.
- [ ] **Leaderboard UI**: Implement leaderboard table with ranking, avatar, and XP columns using mock data.
- [ ] **Certificates (`/certificates/[id]`)**: Create shareable certificate view/card component.

## Phase 1.5: Polish (Frontend)
- [ ] **SEO & Metadata**: Configure `generateMetadata` for all pages.
- [ ] **Performance**: Optimize images (`next/image`) and font loading.
- [ ] **Responsive Check**: Verify mobile layouts for all screens.

---

# Part 2: Backend Wiring & Integration (Logic & State)

## Phase 2.1: Auth & State Setup
- [ ] **Global Wallet Authentication**: Integrate `@solana/wallet-adapter-react` in `layout.tsx` (ConnectionProvider, WalletProvider, WalletModalProvider).
- [ ] **State Management**: Set up Zustand store for user session (`useUserStore`) and learning progress (`useProgressStore`).
- [ ] **API Client**: Create a service layer (`src/lib/services/api.ts`) to interact with the backend (or mock service for MVP).

## Phase 2.2: Data Wiring
- [ ] **Course Data**: Implement dynamic fetching for course details in `/courses/[slug]` using the service layer.
- [ ] **Enrollment Logic**: Connect Enrollment CTA to `LearningProgressService` (stub or wallet signature).
- [ ] **Dashboard Data**: Connect Dashboard components to `useUserStore` and `useProgressStore` for real/stubbed values.

## Phase 2.3: Learning Engine Logic
- [ ] **Lesson Data**: Fetch specific lesson content and code challenge templates via service layer.
- [ ] **Editor Integration**: Implement `postMessage` communication with Solana Playground iframe or execute code logic.
- [ ] **Completion Logic**: Wire "Complete Lesson" button to `completeLesson` service method and update global XP state.

## Phase 2.4: Gamification Logic
- [ ] **Profile Data**: Fetch user profile, skills, and achievements from service.
- [ ] **Leaderboard Data**: Connect leaderboard table to `getLeaderboard` service method (mock or indexed).
- [ ] **On-Chain Check**: Stub credential verification or implement `GetProgramAccounts` check.

## Phase 2.5: End-to-End Testing
- [ ] **Testing**: Verify end-to-end flow: Landing -> Auth -> Enrollment -> Lesson Completion -> XP Update.

---

## Detailed Task Breakdown

### 1. Components to Build
- `CourseCard.tsx` (Refine existing)
- `LessonSidebar.tsx` (Navigation)
- `XPBadge.tsx` (Gamification)
- `WalletMultiButton.tsx` (Styled wrapper)
- `Footer.tsx`

### 2. Services to Implement (Part 2)
```typescript
// Define LearningProgressService interface in src/lib/services/types.ts
```
