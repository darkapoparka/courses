# Research and provenance

Retrieved/rechecked **2026-09-08**. Sources are primary vendor/project/standards/regulator material. This is a dated snapshot: refresh versions, prices, regulations and provider eligibility before implementation or launch. Product choices, scope, screen hierarchy and architecture contracts in these docs are our recommendations—not claims made by the sources.

## Primary source register

| ID | Primary source | Used for |
| --- | --- | --- |
| S01 | https://nextjs.org/blog/next-16-3 | Stable 16.3 capabilities and bundled version-matched agent documentation; distinguish opt-in/experimental features |
| S02 | https://nextjs.org/docs/app/getting-started/installation | Supported scaffold and installation guidance; commands not executed in planning |
| S03 | https://svelte.dev/docs/svelte/overview and https://svelte.dev/docs/kit/introduction | Svelte/SvelteKit model and full-stack alternative |
| S04 | https://nuxt.com/docs/4.x/getting-started/introduction | Nuxt full-stack SSR alternative; see S33 for release context |
| S05 | https://tanstack.com/start/latest/docs/framework/react/overview | Router-first model and Release Candidate label observed during research |
| S06 | https://www.skool.com/pricing | Existing competitor scope and advertised pricing; not proof of an all-in transaction cost |
| S07 | https://help.skool.com/article/168-how-to-set-up-one-time-course-purchases | Existing planning source for one-time purchases; do not market that capability as unique |
| S08 | https://supabase.com/docs/guides/auth/server-side/creating-a-client?queryGroups=framework&framework=nextjs | SSR clients, verified identity and session/caching boundaries |
| S09 | https://supabase.com/docs/guides/database/postgres/row-level-security | Database grants, row policies and testing |
| S10 | https://supabase.com/changelog | Revalidation entry point for breaking changes, Data API exposure and supported runtimes; do not infer exact changes from an inaccessible page |
| S11 | https://docs.stripe.com/connect/marketplace | Marketplace/Connect integration model |
| S12 | https://docs.stripe.com/connect/charges | Charge model and responsibility tradeoffs |
| S13 | https://docs.stripe.com/webhooks | Signature verification, durable event handling, retries, duplicate and out-of-order delivery |
| S14 | https://stripe.com/legal/restricted-businesses | Third-party content-platform approval and deceptive/get-rich-quick restrictions; country-specific terms require review |
| S15 | https://www.mux.com/docs/guides/upload-files-directly | Direct media ingest model |
| S16 | https://www.mux.com/docs/guides/secure-video-playback | Signed playback and private signing credentials |
| S17 | https://www.mux.com/pricing | Usage-based video cost inputs; no perpetual fixed-price assumption |
| S18 | https://developers.cloudflare.com/stream/pricing/ | Alternative video pricing model to evaluate |
| S19 | https://nodejs.org/en/about/previous-releases | Node 24 LTS, Node 26 Current, Node 20 EOL at research date |
| S20 | https://react.dev/versions | React release compatibility/version revalidation |
| S21 | https://www.radix-ui.com/primitives/docs/overview/accessibility | Primitive keyboard/focus semantics; application still needs accessibility testing |
| S22 | https://www.w3.org/TR/WCAG22/ | WCAG 2.2; 44px is our preferred touch target, not a blanket AA minimum |
| S23 | https://web.dev/articles/vitals | Core Web Vitals and field-measurement targets; not measured scores for this repository |
| S24 | https://europa.eu/youreurope/citizens/consumers/shopping/returns/index_en.htm | Digital-content withdrawal conditions; professional review needed for actual offers/jurisdictions |
| S25 | https://digital-strategy.ec.europa.eu/en/policies/e-commerce-rules-eu | Seller/offer transparency and digital-commerce review areas |
| S26 | https://svelte.dev/docs/kit/creating-a-project | Official Svelte CLI alternative; not executed |
| S27 | https://github.com/vercel/next.js/releases/tag/v16.3.4 | Official stable release marked Latest; August 31, 2026; inspected September 8 |
| S28 | https://svelte.dev/blog/whats-new-in-svelte-september-2026 | September 1 report: Svelte 5.57, stable Kit 2 patch releases, continued Kit 3 prereleases |
| S29 | https://svelte.dev/blog/sveltekit-3-release-candidate | Svelte team's August 13, 2026 Kit 3 RC announcement |
| S30 | https://reactrouter.com/start/modes | Framework Mode typed route modules/data/actions and SSR/SPA/static strategies |
| S31 | https://docs.astro.build/en/concepts/why-astro/ | Content-focused architecture and selective interactivity; not evidence of a universal performance ranking |
| S32 | https://laravel.com/framework/docs/13.x/starter-kits | Laravel 13 application starter kits and Inertia-based alternatives |
| S33 | https://nuxt.com/blog | Current Nuxt 4 release/security context; roadmap dates are not proof a later major shipped |
| S34 | https://docs.stripe.com/connect/merchant-of-record | Merchant responsibilities and how direct/indirect charges and on_behalf_of affect the arrangement |
| S35 | https://circle.so/platform/courses | Competitor overlap in courses, community and monetization; feature bundling alone is not differentiation |
| S36 | https://www.mux.com/docs/guides/add-autogenerated-captions-and-use-transcripts | Caption/transcript processing lifecycle; readiness must be verified separately |
| S37 | https://www.mux.com/docs/api-reference/video/direct-uploads/create-direct-upload | Current direct-upload API and public/signed playback policy options |

## September 8 review additions — PLAN-002

The existing planning branch was inspected rather than replaced with another documentation folder. Its scope, `web/` target, conservative one-time commerce model and paused implementation remain unchanged.

The stack comparison now separates Svelte 5 from SvelteKit 3 prerelease status and covers React Router Framework Mode, Astro and Laravel/Inertia in addition to Next, SvelteKit, Nuxt and TanStack Start. Next 16.3.4's official release and Node's support table were rechecked. These are documented recommendations and source observations; no framework spike, install, benchmark or production test occurred.

The source register was extended with explicit merchant-of-record and media lifecycle references. A Connect integration is not a merchant-of-record outsourcing service or approval for every category. The correct charge/merchant arrangement must match the actual business and be recorded before live commerce [S34].

## Repository sources

Application/reference audit base: `0f8e5f89a0320f6f6f557ecb6f30b428594f9c02` in `darkapoparka/courses`; root tree `82f5237588ab562eaee494c57cafb778efb49fe8`.

Existing planning commit reviewed: `3bb3a35f4644a376990b099ccc01faf3f30a698f` on `astra/course-platform-plan`. This follow-up extends that work; it does not claim that every pre-existing document was newly authored in the follow-up review.

The root README and `apple-music-clone/reference/originals/README.md` describe completed acquisition. `originals/verification.json` records 159 standalone screens, 58 flows, 377 valid images and 13 video headers. The originals README reports 218 ordered flow-step images. `download-manifest.json`, `flow-download-manifest.json`, `browser-observed-flows.json` and `all-image-dimensions.json` preserve source/provenance information.

`lib/reference.ts` contains explicit and modulo-fallback scene mappings plus three hardcoded implementation flows. These mappings are not reference truth. `components/apple-music-app.tsx` supplies evidence of a large client prototype and generated artwork fixtures. Historical review notes are not a new visual inspection by the author of a later documentation update.

## Evidence limits

Mobbin's connected screen-search tool required a paid plan. Saved WebP/MP4 assets were not successfully rendered in the remote review; public binary retrieval also failed. The archive validation report was read, not rerun. No full per-screen visual classification, recording-playback audit, runtime audit, dependency install, load test or usability study was completed. Exact design measurements, source-screen fidelity and course-design approval remain open.

Documents do not establish an exhaustive market comparison, a live provider quote, a legal/tax opinion or provider approval. 'Recommended' means project fit on available evidence, not universally best or flawless. Sources carried over from the existing planning set should be reopened when their claim is used for implementation; an entry in this register is not a permanent guarantee of current availability or validity.

Do not use a current web image of Apple Music, the archived prototype, or an invented course mockup as evidence that the exact saved Mobbin original was inspected. Preserve original files, watermarks, source identity and the distinction between acquisition, visual review, proposed adaptation and owner approval.
