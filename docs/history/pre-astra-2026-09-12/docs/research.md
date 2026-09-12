# Primary sources and evidence

Planning baseline 2026-09-08; visual review and key technical sources rechecked 2026-09-09. Product choices are recommendations, not vendor statements. Refresh versions, security advisories, API details, prices, regions and legal/provider eligibility at the task that uses them. No framework benchmark, exhaustive market study, legal opinion or provider approval was performed.

## Implementation reference register

| ID | Official source | Purpose |
| --- | --- | --- |
| R01 | https://nextjs.org/docs/app/getting-started/server-and-client-components | Server/client composition and small interactive boundaries |
| R02 | https://nextjs.org/docs/app/guides/authentication | Identity/action checks and layout limitations |
| R03 | https://nextjs.org/docs/app/guides/data-security | Server-only data functions, authorization and safe minimal return values |
| R04 | https://nextjs.org/docs/app/getting-started/installation and https://nextjs.org/docs/app/getting-started/mutating-data | Official scaffold and current mutation conventions |
| R05 | https://supabase.com/docs/guides/auth/server-side/creating-a-client | Request-scoped SSR clients, verified identity, refresh/private caching |
| R06 | https://supabase.com/docs/guides/database/postgres/row-level-security | Grants/policies, metadata risk, views and row authorization |
| R07 | https://supabase.com/docs/guides/api/securing-your-api | Exposed schema/table grants and privileged boundaries |
| R08 | https://nodejs.org/en/about/previous-releases | Supported runtime release lines |
| R09 | https://docs.stripe.com/webhooks | Signature verification, retries, duplicate/unordered delivery, queue guidance |
| R10 | https://docs.stripe.com/checkout/fulfillment | Authoritative idempotent fulfillment, webhooks and delayed payment |
| R11 | https://docs.stripe.com/connect/charges and https://docs.stripe.com/connect/merchant-of-record | Charge/refund/funds and merchant responsibility |
| R12 | https://www.mux.com/docs/guides/upload-files-directly | Direct upload and processing model |
| R13 | https://www.mux.com/docs/guides/secure-video-playback | Signed delivery and private signing credentials |
| R14 | https://www.radix-ui.com/primitives/docs/overview/accessibility | Primitive behavior; composed UI still needs testing |
| R15 | https://supabase.com/docs/guides/local-development | Local CLI/database workflow and prerequisites |
| R16 | https://playwright.dev/docs/test-snapshots | Deterministic visual comparisons and environment sensitivity |
| R17 | https://www.w3.org/TR/WCAG22/ | Accessibility criteria; distinguish our preferred touch sizes from formal requirements |
| R18 | https://stripe.com/legal/restricted-businesses | Content-platform/category eligibility and prohibited/deceptive offerings |
| R19 | https://europa.eu/youreurope/citizens/consumers/shopping/returns/index_en.htm | Digital-content withdrawal review area for qualified jurisdiction-specific review |
| R20 | https://docs.stripe.com/api/idempotent_requests | Provider request idempotency and retry constraints |
| R21 | https://nextjs.org/docs/app/guides/backend-for-frontend | Internal data functions versus real HTTP entry points and hosting limits |
| R22 | https://svelte.dev/ and https://svelte.dev/docs/kit/introduction | Credible alternate application stack, not a universal performance ranking |

R01/R03/R05/R08/R09 were reopened during the final review. Next's current docs displayed 16.3.4 and Node's table showed Node 24 as LTS. Those observations do not authorize copying the prototype's entire dependency combination. Resolve supported stable patches/peers again at bootstrap.

Other links are the implementation reference register carried from the planning research and should be reopened when used. Some prior detailed fulfillment content was obtained through search when a variant page did not load; a Supabase changelog fetch also failed. No unverified changelog change is used here as an implementation instruction.

## Project decisions, not source claims

One Next app, small server-only feature functions, SQL migrations without a second ORM authority, one creator owner, locked published content, one-course checkout, fixture-first UI and staged community are scope choices for this pilot. Sources explain capabilities and constraints; they do not prove that these choices are universally best.

Stripe generally recommends asynchronous queue-based handling for scale. The pilot's short atomic handler with retries and reconciliation is a deliberate limited design with measured latency/recovery gates. Add one managed durable queue if those gates cannot be met. No in-memory background task, unsupported exactly-once promise or custom workflow framework is prescribed.

Supabase does not remove backend/security work. Signed playback is not piracy-proof DRM. A Next build does not certify a production marketplace. Our application still owns authorization, accurate purchase/access state, safe content rendering, operational recovery and tested UI.

## Repository provenance

Original source/reference baseline: `0f8e5f89a0320f6f6f557ecb6f30b428594f9c02`. Updated archive commit: `849594d4a0cb9a6befc6474019d3bf6e9601740e`; its complete `apple-music-clone/` tree is `510a7a8131f1aa97dfecc09c09ef9a1575202620`. The documentation branch preserves that subtree byte-for-byte rather than editing the prototype/reference assets.

The original planning commits `3bb3a35` and `ef0140d` remain in history. This revision updates their canonical docs instead of adding a competing plan. Earlier speculative outbox/revision/team/offer structures are explicitly superseded in the decision register.

Updated acquisition metadata was read and flow counts independently calculated: 159 high-resolution entries, 58 flows, 218 steps, 159 distinct screen IDs. UI-elements metadata reports 29 categories and 53 memberships. Bulk image hashes/header checks are the acquisition author's evidence, not a bulk rerun by this review.

## Visual evidence and limits

**17 originals were visually opened: 16 high-resolution variants plus one standard-resolution billing image.** Exact immutable source paths, observed states and course adaptations are in [the ledger](reference-review/ledger.md). The billing file alone was additionally fetched into memory, fully decoded with Pillow, and matched against its Git blob/hash. Do not generalize that check to every file.

All 58 flow names/ordered IDs were read as metadata; selected corresponding still states were viewed. No full MP4 playback, native-mobile reference audit, every-pixel CSS extraction, browser interaction test or complete 159-image review was performed. The other 142 screen identities remain visually unreviewed in this session.

Actual images confirm mistakes in the old prototype's ID mappings, beyond its arbitrary modulo fallback and invented artwork. The image reader now works; earlier inability to view sources is historical, not a reason to send the owner another blocked-audit claim.

No product scaffold, dependency installation, database migration, provider account, real payment, deployment or runtime test of a new app occurred in this documentation work. Course visual approval, business eligibility and production verification remain separate gates.
