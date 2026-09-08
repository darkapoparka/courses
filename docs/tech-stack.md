# Technology baseline

Revised 2026-09-08. Recommended engineering baseline for the next implementation assignment, not an installed stack or a claim of universal superiority. The handoff explicitly adopts this baseline when the owner assigns it.

## Choice

**Next.js App Router + React + strict TypeScript**, **Tailwind with our own tokens and selected Radix primitives**, **Supabase Postgres/Auth/Storage**, **Mux Video**, **Stripe Connect + hosted Checkout**. One app under `web/`, supported Node LTS, pinned pnpm, one active lockfile. Vercel is the initial hosting recommendation, not an instruction to deploy.

Next is selected for this specific mix of public catalog pages, authenticated learning, creator authoring, and server-side transaction boundaries. It supplies server/client composition and server endpoints without requiring a separate backend framework [R01–R04](research.md). The visual quality comes from the design and implementation, not the framework name.

Svelte 5 with a current stable SvelteKit is a credible alternative; the same database/payment/media design can work there [R22](research.md). There is no need to benchmark or maintain two versions now. Choose once before the first application scaffold. The accidental Next prototype is not a reason to keep its code or an argument against Svelte.

The earlier broad comparison is preserved in Git history. Nuxt/Vue, React Router, Astro and Laravel are not additional applications to install. This revision prioritizes a concrete build path over repeatedly reopening the framework decision.

## Install by milestone

| When | Add | Do not add yet |
| --- | --- | --- |
| BOOT / M0 | Official Next scaffold, React/TS, Tailwind, lint, a single icon family; only primitives used by the slice | Auth/payment/video SDKs, ORM, editor suite, global state, queue, analytics |
| M1 data/auth | Supabase JS + current SSR package, SQL migrations/types, Zod for actual boundaries | Prisma/Drizzle, GraphQL, separate API service, realtime everywhere |
| M1 media | Mux server SDK/player as needed; storage policies | Custom transcoder, video proxy server, DRM promises |
| M2 commerce | Stripe server SDK and tested Connect/Checkout integration | Multi-seller cart, subscriptions, affiliates, internal wallet |
| Verification | Focused unit tests, database/RLS tests, Playwright; accessibility checks | Empty test infrastructure pretending to be coverage |

Use native/React forms and safe Markdown/plain text initially. A rich editor or form library is a task-level choice only when the actual editor needs it. One selected icon family may be Lucide; confirm its license/package at installation. No generic UI-kit visual theme.

## Versions

The official Next documentation showed 16.3.4 at this review. The Node release table identifies Node 24 as LTS; use a supported patched LTS, not merely the highest major [R04, R08](research.md). Resolve current compatible stable packages and security advisories again at bootstrap. Record exact versions in the manifest/lockfile and task evidence; do not pin fictional or prerelease numbers to look current.

The archive lists Next 16.3.4, React 19.2.8, TypeScript 7.0.2 and Tailwind 4.3.3. Those are repository observations, not a tested combination or instructions to copy its lockfile. Respect the installed framework's generated version-matched docs and inspect CLI help.

## Backend and infrastructure decisions

Supabase consolidates relational data, identity and files. It does not eliminate server authorization, grants/RLS, or operational work. SQL migrations plus generated types are sufficient initially; an ORM is not required to make the architecture respectable.

Use indexed Postgres catalog search before a separate search provider. No vector database, AI service, custom queue framework, or generalized job runner. Minimal payment/media webhooks and a reconciliation command are specified in [architecture](architecture.md). A managed queue is introduced only if the measured handler/recovery requirements demand it.

Mux manages ingest and playback; its current direct-upload and signed-playback workflows are documented [R12–R13](research.md). Cloudflare Stream remains an alternative to price against actual pilot usage; no claim that either is always cheaper. Supabase Storage alone is not our adaptive video pipeline.

Stripe Connect is for marketplace payments, not automatic outsourcing of merchant, tax, refund, or category responsibilities [R11, R18](research.md). Hosted Checkout avoids building a custom card form. Actual charge model and merchant identity are decisions before payment implementation/live selling.

Choose one email provider and one monitoring provider only when integrating them. Provider receipts and in-app status avoid a custom transactional notification system initially; production auth email still needs configured delivery. Never provision a vendor simply because its connector exists.

## Reconsider only for a concrete reason

A dependency or architecture change records: current problem, simplest alternative, added operational cost, migration impact, and the affected task. 'Best practice' or 'future scale' alone is not evidence. No microservices, monorepo tooling, interface layers around every SDK, duplicated migration authorities, or hidden fixture-to-live fallback.
