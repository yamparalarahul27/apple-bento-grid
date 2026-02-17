# architecture
- **Purpose**: High-level system map for Superteam Academy (Next.js LMS).
- **Scope**: Frontend app router, services, data flow, on-chain touchpoints.
- **Read when**: Designing features, adding services, integrating on-chain.

## Stack
- Next.js App Router, TypeScript (strict), Tailwind + shadcn/ui (planned), next-intl i18n.
- Wallet: @jup-ag/wallet-adapter (to wire), Solana web3.js.
- CMS: Sanity (schemas pending).
- Analytics: GA4, Hotjar, Sentry (stubs pending).

## Layout
- `src/app/layout.tsx`: global providers, metadata, gradient bg.
- `src/app/page.tsx`: landing hero + sections.
- Future pages: courses, dashboard, profile, leaderboard, settings, certificates.

## Services (planned)
- `LearningProgressService` interface for progress/xp/streak/leaderboard/credentials.
- Adapters: on-chain XP (Token-2022), cNFT display (Bubblegum), leaderboard via DAS/indexer.

## Data flow
- UI -> service hooks -> adapters (on-chain or stubs) -> display components.
- CMS provides course/module/lesson content; local stubs until schema hooked.

## Env/Config
- Vercel deployment, env vars for RPC, analytics keys, CMS.

## Update rules
- Update after adding new pages, providers, or service contracts.
