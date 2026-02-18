# deployment
- **Purpose**: Vercel/Node setup and env guidance.
- **Read when**: Deploying or updating build settings.

## Commands
- Dev: `npm run dev`
- Lint: `npm run lint`
- Build: `npm run build`

## Vercel
- Framework: Next.js App Router.
- Env vars: RPC endpoint, GA4, Hotjar, Sentry, Sanity keys (set in Vercel dashboard).
- Ensure `NEXT_PUBLIC_` prefix for client-exposed vars.

## Notes
- Keep Next.js patched (avoid CVE blocks); align eslint-config-next version.
- Telemetry: Next.js collects anonymous data; can opt-out via `NEXT_TELEMETRY_DISABLED=1`.

## Update rules
- Update after adding new env vars or changing build/lint requirements.
