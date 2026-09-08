# 2026 tech-stack decision

Research date: 2026-09-08. Status: **recommended, pending owner approval**. This document authorizes no installs or scaffolding. See primary sources in `research.md`.

## Recommendation

Use **Next.js App Router + React + TypeScript**, a custom token-based UI built with **Tailwind CSS and selected Radix primitives**, **Supabase Postgres/Auth/Storage**, **Stripe Connect + hosted Checkout**, and **Mux Video**. Start as one web application and one relational database, not a microservice system.

This is a project-fit judgment, not a claim that Next makes better-looking interfaces or that Svelte is inferior. The course UI can be excellent in either. The existing accidental prototype does not force us to stay on React; the recommendation stands on the combination of public catalog/SEO, transactional server work, paid video, rich authoring and React-compatible UI/media tools.

## Framework comparison

| Candidate | Relevant strengths | Tradeoff for this project | Decision |
| --- | --- | --- | --- |
| Next.js App Router | Server-rendered catalog; server/client composition; route handlers/actions; React component integrations | Must keep authorization, cache scope and client boundaries explicit | Recommended |
| Svelte 5 + SvelteKit | Compiler-based components; coherent routing/server actions; attractive option for a small team building custom UI | Requires Svelte-specific integration decisions; switching gains are not demonstrated by this prototype | Strong alternative if owner/team prefers it before bootstrap |
| Nuxt 4 + Vue | Full-stack SSR and conventional routing/server structure | No project-specific Vue requirement or integration advantage identified | Viable, not selected |
| TanStack Start | Router-first typed app, SSR/streaming/server functions | Official product page still labels it RC when checked; avoid making a release-candidate framework an unnecessary launch dependency | Reconsider only with a deliberate ADR |

Do not use unsupported benchmark claims such as 'X is always faster' to settle this choice. Compare production-like public catalog, learner player and studio interactions if a framework spike is explicitly approved. Do not maintain two implementations.

## Version policy

Official Next documentation describes the stable 16.3 line and version-matched agent docs. React's current versions page and actual package compatibility must be checked during bootstrap. Node's release table currently lists Node 24 as LTS and Node 26 as Current; prefer Node 24 LTS for the first build, with a pinned supported patch.

The archived app pins Next 16.3.4 / React 19.2.8 / TypeScript 7.0.2 / Tailwind 4.3.3. Treat those as observations, not instructions to copy a lockfile or a promise of latest versions. Resolve current stable packages from the registry at approved bootstrap, verify peer compatibility and advisories, and record the exact versions in the new application's manifest/lockfile. Use the TypeScript version officially supported by the selected stable toolchain; do not reach for previews to satisfy a 'latest' label.

Use pnpm with a pinned `packageManager` version. One new application lockfile. Do not accidentally turn the archived clone into an active workspace. No canary React/framework features, beta auth, experimental offline framework hooks or a mandatory experimental compiler in the launch baseline.

## Tool choices and limits

| Layer | Baseline | Why / constraint |
| --- | --- | --- |
| UI | Custom CSS variables + Tailwind; Radix for dialogs/menus/tabs where useful | Accessibility behavior without inheriting a generic dashboard theme; wrappers own the look |
| Icons/fonts | One licensed icon family; system font stack or one licensed font | No copied Apple proprietary font files; no mixed icon styles |
| Forms | Native/React forms and Zod; add a form library only when the editor warrants it | Shared boundary validation, accessible errors, fewer dependencies |
| Rich text | Restricted structured editor, e.g. Tiptap, only for approved authoring needs | Allowlisted schema; sanitize rendering; no arbitrary HTML/embed execution |
| Database | Supabase-hosted Postgres | Relational orders, grants, lessons and workspace permissions |
| Auth | Supabase Auth with current SSR package | One identity provider/integration; email OTP first, optional Google |
| Database changes | Versioned SQL migrations + generated TypeScript types | One schema authority; do not add Prisma and Drizzle alongside it |
| Files | Supabase Storage for covers/resources; private for paid resources | Explicit storage policies and file validation |
| Video | Mux direct uploads, processing webhooks and signed playback | Managed media pipeline; do not stream large files through the app server |
| Payments | Stripe Connect + hosted Checkout | Marketplace payouts and hosted payment collection; business approval is a separate gate |
| Search | Postgres indexed full-text/trigram search over safe catalog fields | Start simple; evaluate dedicated search only against measured needs |
| Jobs | Transactional outbox + bounded authenticated scheduled worker | Reliable retries without adding a second backend framework or job vendor initially |
| Hosting | Managed Node hosting; Vercel recommended for first deployment | Preview workflows; colocate server/database sensibly; no deployment in this task |
| Testing | Type checking, lint, unit tests, database/RLS tests, Playwright and accessibility checks | Real authorization/payment/media paths plus reference-based visual evidence |
| Monitoring/email | One error-monitoring provider and one transactional email provider selected at integration | Scrub PII; budget/retention configuration; avoid unnecessary vendor setup now |

## Alternatives within the backend/media choice

SvelteKit can use the same Supabase, Stripe and Mux domain architecture. Choosing Next does not make those services React-only.

Neon + an auth provider + object storage is a credible alternative when independent provider choices are valuable; it adds integration ownership we do not currently need. A custom Node/Nest API, GraphQL gateway or separate Go service is not justified by this initial scope. A nonrelational backend would require extra work to preserve our relational payment/access constraints.

Cloudflare Stream is the video alternative to price against Mux using uploaded/stored/delivered minutes, required caption/analytics/player features and target geographies. Do not claim either is always cheaper. Recalculate on current pricing with the pilot's assumptions. Supabase Storage alone is not our video processing/adaptive-streaming strategy.

## Avoid dependency creep

No global Redux/Zustand by default; URL state for filters, local state for interaction, server data for durable records. No TanStack Query everywhere; add it only for a demonstrated client-cache workflow. No vector database, LLM gateway, native wrapper or learning gamification package in the first scaffold.

## Revalidation before implementation

Check official stable framework docs and install commands, package dist-tags/peer requirements, security advisories, provider regional support and prices. Supabase's 2026 changelog includes Data API exposure/grant changes and Node 20 support removal: never rely on old automatic grants or an old runtime. Recheck current authentication/cache guidance. Record the checks and versions in the bootstrap task before implementing a feature.
