# Research and provenance

Retrieved 2026-09-08. Sources are primary vendor/project/standards/regulator material. This is a dated snapshot: refresh versions, prices, regulations and provider eligibility before implementation or launch. Product choices, scope, screen hierarchy and architecture contracts in these docs are our recommendations—not claims made by the sources.

| ID | Primary source | Used for |
| --- | --- | --- |
| S01 | https://nextjs.org/blog/next-16-3 | Stable 16.3 capabilities and bundled version-matched agent documentation; avoid conflating opt-in/experimental features |
| S02 | https://nextjs.org/docs/app/getting-started/installation | Supported scaffold and current installation guidance |
| S03 | https://svelte.dev/docs/svelte/overview and https://svelte.dev/docs/kit/introduction | Svelte/SvelteKit model and full-stack alternative |
| S04 | https://nuxt.com/docs/4.x/getting-started/introduction | Nuxt full-stack SSR alternative |
| S05 | https://tanstack.com/start/latest and https://tanstack.com/start/latest/docs/framework/react/overview | Router-first model and RC label observed during this research |
| S06 | https://www.skool.com/pricing | Existing competitor scope; do not assume courses/video/live/community are missing |
| S07 | https://help.skool.com/article/168-how-to-set-up-one-time-course-purchases | Skool already supports one-time course purchases; article updated 2025-11-01 |
| S08 | https://supabase.com/docs/guides/auth/server-side/creating-a-client?queryGroups=framework&framework=nextjs | SSR clients, verified identity and session/caching boundaries |
| S09 | https://supabase.com/docs/guides/database/postgres/row-level-security | Database grants, row policies and testing |
| S10 | https://supabase.com/changelog | Current breaking changes; Data API exposure and supported runtime revalidation |
| S11 | https://docs.stripe.com/connect/marketplace | Marketplace/Connect integration model |
| S12 | https://docs.stripe.com/connect/charges | Charge model and responsibility tradeoffs |
| S13 | https://docs.stripe.com/webhooks | Signature verification, retries and event handling |
| S14 | https://stripe.com/legal/restricted-businesses | Content-platform approval and restrictions on deceptive/get-rich-quick offerings; check country-specific terms |
| S15 | https://www.mux.com/docs/guides/upload-files-directly | Direct media ingest model |
| S16 | https://www.mux.com/docs/guides/secure-video-playback | Signed playback and private signing credentials |
| S17 | https://www.mux.com/pricing | Usage-based video cost inputs; no perpetual fixed-price assumption |
| S18 | https://developers.cloudflare.com/stream/pricing/ | Alternative video pricing model to evaluate |
| S19 | https://nodejs.org/en/about/previous-releases | Node 24 LTS versus Node 26 Current at research date |
| S20 | https://react.dev/versions | React release compatibility/version revalidation |
| S21 | https://www.radix-ui.com/primitives/docs/overview/accessibility | Primitive keyboard/focus semantics; application still needs accessibility testing |
| S22 | https://www.w3.org/TR/WCAG22/ | WCAG 2.2 accessibility baseline; 44px is our touch target preference, not a blanket AA requirement |
| S23 | https://web.dev/articles/vitals | Core Web Vitals and field measurement targets |
| S24 | https://europa.eu/youreurope/citizens/consumers/shopping/returns/index_en.htm | Digital-content withdrawal conditions; professional review required for the actual offer/jurisdictions |
| S25 | https://digital-strategy.ec.europa.eu/en/policies/e-commerce-rules-eu | Seller/offer transparency and digital-commerce review areas |
| S26 | https://svelte.dev/docs/kit/creating-a-project | Official Svelte CLI alternative; not executed |

## Repository sources

Audit base commit: `0f8e5f89a0320f6f6f557ecb6f30b428594f9c02` in `darkapoparka/courses`.

The root README and `apple-music-clone/reference/originals/README.md` describe completed acquisition. `originals/verification.json` records 159 standalone screens, 58 flows, 377 valid images and 13 video headers. `download-manifest.json`, `flow-download-manifest.json`, `browser-observed-flows.json` and `all-image-dimensions.json` preserve source/provenance information.

`lib/reference.ts` contains explicit and modulo-fallback scene mappings plus three hardcoded implementation flows. These mappings are not reference truth. `components/apple-music-app.tsx` supplies evidence of a large client prototype and generated artwork fixtures. `reference/independent-review.md` is historical rejection evidence, not a fresh visual review by this documentation author.

## Limitations

Mobbin's connected screen-search tool required a paid plan in this session. Saved WebP/MP4 assets were not successfully rendered here. The archive validation report was read, not rerun. No full per-screen visual classification, recording-playback audit, runtime audit, dependency install, load test or usability study was completed. Consequently exact design measurements, screen fidelity and visual approval remain open.

No exhaustive market comparison, live provider cost quote, legal opinion, tax determination or provider approval has been obtained. 'Recommended' means best fit on the currently available evidence and scope, not universally best or flawless.
