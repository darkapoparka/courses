# 2026 tech-stack decision

Research date: **2026-09-08**. Status: **recommended, pending owner approval**. This document authorizes no installs, provider accounts or scaffolding. Primary sources and revalidation requirements are in `research.md`.

## Recommendation

Use **Next.js App Router + React + strict TypeScript**, a bespoke token-based UI using **Tailwind CSS and selected Radix primitives**, **Supabase Postgres/Auth/Storage**, **Stripe Connect + hosted Checkout**, and **Mux Video**. Start with one web application and one relational database. Prefer **Node 24 LTS**, a pinned pnpm version, and Vercel for the first approved deployment.

This is a project-fit judgment, not a claim that Next makes better-looking interfaces or that Svelte is inferior. The course UI can be excellent in either. The accidental prototype does not force us to stay on React: the decision is about a complete public catalog, private learner application, course authoring, transaction processing and ongoing maintenance—not salvaging its scene component.

Next's server/client composition and server endpoints provide a suitable structure for this mix [S01–S02](research.md). My preference is to use that established structure with explicit data/cache boundaries rather than assemble or compare multiple application stacks during launch. This is a qualitative engineering judgment, not a benchmark or a measured developer-productivity result.

## Current stable versus prerelease evidence

| Project | Evidence available on 2026-09-08 | Consequence |
| --- | --- | --- |
| Next.js | Official release page marks **16.3.4** as Latest; released August 31 [S27](research.md) | Use a current patched stable 16.x release after compatibility/advisory verification at bootstrap |
| Svelte | September 1 update reports **Svelte 5.57** [S28](research.md) | Svelte 5 is a serious production candidate; do not confuse it with the Kit prerelease |
| SvelteKit | September update identifies **2.x as stable** and **3.x as release candidate**; lists 2.70.1–2.70.3 patches [S28–S29](research.md) | The conservative Svelte option today is Svelte 5 + current stable Kit 2; evaluate Kit 3 only after an explicit release/risk review |
| TanStack Start | Official overview still labels the product **Release Candidate** [S05](research.md) | Do not make a prerelease framework an unnecessary requirement for paid launch |
| Node.js | Official release table lists **24 as LTS**, **26 as Current**, and **20 as EOL** [S19](research.md) | Prefer supported Node 24 LTS, not simply the highest major or a framework's minimum Node version |

The September 1 Svelte article is evidence of those releases and release channels, not a claim that 5.57.0 or 2.70.3 is the newest patch on every later date. Resolve exact patches from official release/registry metadata when installation is authorized. A release candidate in one project's next major is not evidence that its existing stable release is unsuitable.

## Framework comparison

| Candidate | Relevant capabilities | Project-fit tradeoff | Decision |
| --- | --- | --- | --- |
| **Next.js App Router** | Server rendering, server/client composition, route handlers/actions and React integrations [S01–S02] | Requires explicit authorization on every entry point, careful private caching and small client boundaries | **Recommended for this project** |
| **Svelte 5 + stable SvelteKit 2** | Compiler-based components, full-stack routing, form actions and deployment adapters [S03, S28] | Equally viable for bespoke UI; verify authoring/player integrations and avoid accidentally mixing Kit 2 and Kit 3 conventions | **Closest alternative**; choose before bootstrap if the implementation team prefers Svelte |
| **Nuxt 4 + Vue** | Full-stack Vue application with server-rendered routes [S04, S33] | Strong option for a Vue-oriented team; no specific Vue advantage or team requirement has been established here | Viable, not selected |
| **React Router Framework Mode** | Typed route modules, data loading/actions, code splitting and SSR/SPA/static strategies [S30] | Attractive when the team wants its routing/data conventions and more direct architectural control; no need to introduce a second React framework alongside Next | Credible alternative, not selected |
| **TanStack Start** | Typed router-oriented application with SSR, streaming and server functions [S05] | RC status introduces a risk we do not need merely to make the interface feel modern | Watchlist; reevaluate with a deliberate decision record |
| **Astro** | Content-oriented server rendering and selectively interactive islands [S31] | Excellent candidate for an editorial/content-heavy site; our persistent learner workspace and authoring app are the core product | Do not add a separate marketing framework at launch |
| **Laravel 13 + Inertia** | Server-driven business application with official React/Vue/Svelte starter-kit paths [S32] | Worth choosing for a PHP/Laravel-oriented team; it adds a different server ecosystem to the proposed TypeScript plan | Strong business-app alternative, not selected |

Bracketed IDs link through `research.md`. The capability descriptions come from those primary documents. The selection and tradeoffs are our judgment, not a vendor ranking. This is a comparison of relevant candidates, not a claim to have benchmarked every framework available in 2026.

### Why Next rather than Svelte for this particular product?

The decisive needs are a server-rendered marketplace, an interactive learner workspace, an editor-heavy creator studio, and a carefully controlled server boundary around money and access. Both frameworks can satisfy them. I recommend Next because it gives this plan one consistent React-based implementation path across those surfaces and the selected accessible UI/media integrations, without requiring us to adopt a prerelease or split the application.

Svelte could deliver the same design and domain architecture. SvelteKit can use Supabase, Stripe and Mux; those services are not React-only. Do not reject Svelte on an unsupported claim that it cannot scale or lacks all serious libraries. Conversely, do not choose it on an unsupported promise of automatically perfect performance or fewer bugs.

A framework switch is inexpensive before product code exists and increasingly expensive afterward. Settle D-01 before BOOT-001, then stop reopening it unless a concrete limitation appears. The existing unapproved clone is not evidence for or against either production choice.

### When a comparative spike is justified

Only if the owner remains undecided after this review, authorize a bounded spike with the same catalog payload, one private lesson route and one small editor interaction in each candidate. Compare implementation complexity, accessible interaction, hydration/client payload, private-cache safety and provider integration behavior under the same conditions. Delete neither existing references nor unrelated work. Record results, choose one application stack, and do not maintain dual implementations. No such spike or runtime benchmark has been performed in this planning work.

## Version and dependency policy

The archived app pins Next 16.3.4 / React 19.2.8 / TypeScript 7.0.2 / Tailwind 4.3.3. Those are repository observations, not instructions to copy its lockfile or certification that the dependency combination builds. Resolve current stable packages and peer compatibility during approved bootstrap, check advisories, and record the chosen versions. Use the TypeScript version supported by that toolchain, not a preview selected just for a larger version number.

Use pnpm with a pinned `packageManager` version and one new application lockfile. The product belongs in **`web/`**, consistent with `architecture.md`; it does not exist as a result of this documentation change. Keep `apple-music-clone/` outside the active workspace and deployment root. Never scaffold over it, copy all its dependencies, or silently activate its demo routes.

Use version-matched official framework docs and CLI `--help`. Do not copy Kit 3 examples into Kit 2, old Next synchronous request APIs into current code, or a beta provider API into financial workflows. No canary framework/React features or experimental offline/cache architecture is required for the baseline.

## Tool choices and limits

| Layer | Baseline | Why / constraint |
| --- | --- | --- |
| UI | Custom CSS variables + Tailwind; selected Radix dialogs/menus/tabs | Primitive behavior without a generic dashboard theme; our wrappers own the appearance; test accessibility [S21–S22] |
| Icons/fonts | One licensed icon family; system stack or one licensed font | No redistribution of Apple proprietary fonts; consistent weight and sizing |
| Forms | Native/React forms and boundary validation; Zod proposed | Keep accessible errors and server validation; add a form library only for a demonstrated authoring need |
| Rich text | Restricted structured editor, such as Tiptap, only when needed | Allowlisted content schema and safe rendering; no arbitrary HTML or executable embeds |
| Database | Supabase-hosted Postgres | One relational model for curriculum, orders, grants and workspace membership |
| Auth | Supabase Auth with current SSR integration | One identity system; email OTP first, optional Google; server-verified identity [S08] |
| Schema authority | Versioned SQL migrations + generated TypeScript types | Do not run Prisma, Drizzle and independent SQL migration histories against the same schema |
| Files | Supabase Storage | Public licensed covers; private paid resources; grants/RLS/storage policy and validation [S09] |
| Video | Mux direct uploads, processing events and signed playback | Managed video pipeline; large uploads do not pass through the application server [S15–S16] |
| Payments | Stripe Connect + hosted Checkout | Server-controlled purchase/fulfillment; provider eligibility and merchant responsibilities are separate gates [S11–S14, S34] |
| Search | Postgres indexed full-text/trigram catalog search | Search only safe published fields; dedicated search is a measured scaling decision |
| Jobs | Transactional outbox + bounded authenticated scheduled worker | Durable receipt/retries/leases/dead-letter handling before acknowledgment; see `architecture.md`; no fire-and-forget fulfillment |
| Hosting | Managed Node hosting, Vercel recommended initially | Keep deployment scope, region, spending and public/private configuration explicit; no deployment authorized now |
| Verification | Type check, lint, unit tests, SQL/RLS integration tests, Playwright and accessibility checks | Financial and access failure cases matter as much as happy-path screenshots |
| Email/monitoring | One transactional email provider and one error-monitoring provider chosen at integration | Scrub sensitive data, configure retention/budgets, avoid provisioning unused vendors now |

No provider setup is required to browse references or plan screens. At the UI-only stage, clearly labeled fixtures should run without demanding production credentials. A fixture-backed screen is not a completed database/payment integration.

## Backend, jobs and video alternatives

Neon + a separate auth provider + object storage is a reasonable alternative when independent service selection is important. Our preference for Supabase is consolidation, not a claim that it removes backend engineering or security work. Database grants, RLS, private views, storage policies, session validation and operational tests remain our responsibility.

A custom Nest/Go API, GraphQL gateway or one microservice per feature is not justified by the initial scope. Keep providers behind small server-side adapters and domain services; do not create an abstract framework for hypothetical replacements.

The outbox/worker is a real reliability feature, not a scheduled loop without durable state. It needs transactionally recorded work, atomic claims/leases, backoff, maximum attempts, observable failures, reconciliation and idempotent external effects. If implementing and operating those requirements becomes disproportionate, evaluate one durable-job service through D-12 rather than add multiple queue systems. Managed orchestration would still not make external side effects exactly-once.

Price **Cloudflare Stream against Mux** with representative stored/delivered minutes, resolution, captions, player features and geography [S17–S18]. Neither is assumed universally cheaper. Supabase Storage alone is not a replacement for a managed adaptive-streaming pipeline. Keep video upload and delivery quotas in the pilot before opening unrestricted creator accounts.

## Keep launch small

No global Redux/Zustand by default; URL state for discovery filters, component state for temporary controls, server data for durable records. No universal client query cache, dedicated vector database, LLM gateway, native wrapper, custom transcoder or points economy in the scaffold. Current product scope is one-time course sales, free enrollment, learning and contextual community—not every future learning business model.

Before implementation, revalidate stable release channels, package compatibility/advisories, current auth/caching guidance, Data API exposure/grants, provider availability and current costs. Before live commerce, resolve the actual operating entity, supported markets, merchant/charge model, fees, refunds/tax and provider approval. A modern framework does not answer those business questions.
