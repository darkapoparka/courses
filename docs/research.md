# Sources, provenance and freshness

## Three kinds of evidence

Repository observations describe the inspected committed/working state. Official documentation describes a product or API at a review time. Project decisions select behavior and scope. Do not present a design proposal as a vendor requirement, a past run as current verification, or a retrieved guide as an installed capability.

The Astra source register is [astra/sources.json](astra/sources.json), with a readable [guide](astra/sources.md). It records reviewed versus merely indexed material, review dates, relevance and an immutable OpenAI skills repository checkpoint. Refresh the exact source before relying on a volatile API, model parameter, price, version, availability or security claim.

## Repository provenance

The documentation transition starts from `289c049cc3e198baa762cd89850f744e80e99ff2`, with GPT web guidance at `67a44c41a43aa0bead23b3e665c844e6403828ba`. The previous docs tree is `3a07bc4fb09b409fa069f68b0a826edccfeceaff`, preserved in [history](history/README.md). The frozen reference tree is `dde330ce23357fda311a21c32b1d23030126765e`. The inherited task-checklist blob was `94a04e21a9bcfc8fa82e37ac5793c6edafa3b733`; local adoption corrects its branch/status framing and adds documentation evidence while preserving the existing IDs, checkboxes and historical evidence.

Dated source observations and candidate comparisons remain in `docs/reference-review/`; current summaries are in the handoff and audit. Reference acquisition counts, implementation coverage, manual visual review, continuous-flow review and owner acceptance are different claims. Do not generalize one reviewed image or sampled recording to the entire corpus.

The earlier disconnected session recorded six pending files. Local inspection found eleven: eight modified and three untracked. They were inspected, snapshotted and hash-verified into `J:\courses` on `astra-pro`, and remain uncommitted. The original preview is unchanged. [The transition record](astra/branch-transition.md) records the exact files, historical course branch, preservation of 577 reference files and local recovery location. No current runtime or visual claim follows from that source transfer.

## OpenAI research boundaries

The current model guide, Astra prompt/skill article, Docs MCP guide, AGENTS guide, skill-authoring guide, frontend-prompt guide and requested `openai-docs` skill were reviewed. The source register distinguishes their purposes. The frontend-prompt guide is explicitly framed for GPT-5.5; its general preservation principles are not a claim of Astra-specific configuration. The September 11 Astra article is separate, newer model-specific guidance.

This is a curated, relevant source collection, not a mirror of all OpenAI documentation or a claim that every catalog skill was reviewed. Project-authored skills are clearly labeled. No upstream helper script, installer, plugin or global configuration was executed merely because a retrieved skill suggested it.

## Deferred vendor references — reopen at implementation

The prior source register remains intact in the historical research file. Useful starting points include Next.js server/client and data-security guides, Supabase SSR and grants/RLS documentation, Stripe webhook/fulfillment/Connect/idempotency documentation, Mux direct-upload/signed-playback documentation, Playwright visual comparison guidance and WCAG 2.2.

- Next.js: https://nextjs.org/docs/app/guides/data-security
- Supabase: https://supabase.com/docs/guides/auth/server-side/creating-a-client and https://supabase.com/docs/guides/api/securing-your-api
- Stripe: https://docs.stripe.com/webhooks and https://docs.stripe.com/checkout/fulfillment
- Mux: https://www.mux.com/docs/guides/upload-files-directly and https://www.mux.com/docs/guides/secure-video-playback
- Playwright: https://playwright.dev/docs/test-snapshots
- Accessibility: https://www.w3.org/TR/WCAG22/

During local adoption on 2026-09-12, the Next.js installation guide, Supabase's Next.js SSR client guide, Stripe's current marketplace guide and Mux's secure-playback guide were reopened for the recommendations in [tech-stack.md](tech-stack.md). Review scope was capability/architecture fit, not SDK installation or provider testing. Supabase's `changelog.md` fetch again returned an internal error; no release-specific Supabase claim is drawn from it. The other carried-forward links above were not all re-reviewed. Revalidate each relevant API, supported runtime, paid plan, country/merchant model, privacy/legal requirement and security advisory at the actual task. No benchmark, exhaustive competitor study, legal review, production eligibility check or new backend integration was completed here.

## 2026-10-02 course adaptation research

Scope: current implementation boundaries and durable design rules, not an exhaustive competitor review or a claim of product superiority. The owner authorized adaptation now. Installed package observations remain Next.js 16.3.4, React 19.2.8, TypeScript 7.0.2 and the existing lockfile; no dependency upgrade was performed.

| Primary source | What was checked | Applied decision and limitation |
| --- | --- | --- |
| [Next.js authentication](https://nextjs.org/docs/app/guides/authentication) and [data security](https://nextjs.org/docs/app/guides/data-security) | Official Next documentation; Context7 `/vercel/next.js` returned the upstream authentication/data-security guides | Central server-only access checks and minimal DTOs; every action/handler independently authorizes. Current demo body selection follows the boundary but is not production authentication. |
| [React useSyncExternalStore](https://react.dev/reference/react/useSyncExternalStore) | Context7 `/reactjs/react.dev`, official upstream reference | Cache immutable snapshots until state changes; deterministic server/hydration snapshot. Existing preview-store behavior retained rather than adding a global-store dependency. |
| [Apple foundations](https://developer.apple.com/design/human-interface-guidelines/foundations), [materials](https://developer.apple.com/design/human-interface-guidelines/materials), [typography](https://developer.apple.com/design/human-interface-guidelines/typography) | Official foundation index and attempted material/type page reads | Material/type pages required JavaScript in the text fetch. Exact tokens in `style.md` come from repository CSS and browser review, NOT a claimed extraction of Apple's private CSS. |
| [W3C WCAG 2.2 target size](https://www.w3.org/WAI/WCAG22/Understanding/target-size-minimum.html) | Official understanding document | AA target size is 24 by 24 CSS pixels with stated exceptions. The platform's 44px primary-control target is a product choice; neither choice alone certifies accessibility. |
| [Skool features](https://www.skool.com/features) | Attempted official feature page; no usable text returned | No pricing, feature inventory or comparative superiority claim is based on this fetch. The product plan is an original hypothesis built from owner goals and local behavior. |

The installed `node_modules/next/dist/docs/01-app/02-guides/data-security.mdx` path was absent when attempted. Context7 and official documentation were used instead; do not claim that an unavailable installed guide was read or that canary documentation is an exact installed-version guarantee. Current server-boundary advice was checked against the working code and tests.
The normal-material and reduced-transparency branches are explicitly emulated separately in browser QA. An initial geometry check observed the opaque fallback; the revised suite controls the media condition rather than weakening the material assertion. Keep those conditions in evidence when comparing screenshots.
Supabase/PostgreSQL/Auth, hosted marketplace checkout and managed private video remain candidate integrations. This session did not verify provider account configuration, commercial eligibility, region/pricing or create a backend. Refresh official docs through Context7 at CP-011 and inspect the intended authorized project before changes. Keep credentials out of reports.

Additional backend source check, 2026-10-02: Context7 `/supabase/supabase` and the official [Next.js SSR guide](https://supabase.com/docs/guides/auth/server-side/nextjs) and [row-level security guide](https://supabase.com/docs/guides/database/postgres/row-level-security) were reviewed. The current guide distinguishes verified `getClaims()` identity from unverified cookie/session contents and a fresh `getUser()` lookup, and describes separate browser/server clients and cookie refresh in Next.js Proxy. RLS ownership checks should target authenticated users and must be tested with actual user sessions; privileged clients can bypass RLS. These are implementation requirements for A1, not claims that the current app authenticates users or that a provider project has been configured. Exact SDK versions, session/revocation policy and the intended project still need verification at CP-011/012.


## Rich creator/category adaptation sources — 2026-10-02
Reviewed the installed Next.js 16.3.4 `node_modules/next/dist/docs/01-app/01-getting-started/05-server-and-client-components.md` boundary guidance (it is present in this session). Context7 `/vercel/next.js` independently returned the server-children/client-slot composition pattern. The editorial shelf receives server-rendered cards as children and owns only scrolling interaction.
Official public cross-checks: [Next server/client composition](https://nextjs.org/docs/app/getting-started/server-and-client-components), [W3C carousel functionality](https://www.w3.org/WAI/tutorials/carousels/functionality/), and [W3C carousel overview](https://www.w3.org/WAI/tutorials/carousels/). Applied native buttons, keyboard operation, no autoplay and a polite navigation status. These reads do not constitute an accessibility audit or a dependency-upgrade recommendation.
The preserved artist source `reference/originals/484851bf-bc23-4088-8a34-4078c4d6b4ff.webp` and active `components/music-artist.tsx` establish the full-width identity hero, catalog, compact rows, about and related-creator patterns. Source photography/music content is not copied into the course product; demo creators use original initials and explicitly fictional profiles. Product screenshots remain separate adaptation evidence, not Apple MATCH acceptance.


### Search and collection control migration — reviewed 2026-10-02
Repository baseline: input existed only on Discover and Search; Courses and creator detail had zero visible search inputs in the live browser. This is a product migration gap, not lost music source. Capture: `.qa/search-ux-20261002-204915/baseline.json` and the matching before images.
Reviewed official [Next useSearchParams](https://nextjs.org/docs/app/api-reference/functions/use-search-params) and [useRouter](https://nextjs.org/docs/app/api-reference/functions/use-router), plus the installed `node_modules/next/dist/docs/01-app/03-api-reference/04-functions/use-search-params.md`. Shared URL-aware search is bounded by Suspense; current installed dependencies remain unchanged. Reviewed [W3C APG combobox](https://www.w3.org/WAI/ARIA/apg/patterns/combobox/) for manual-selection suggestions, input focus, aria-controls/activedescendant, Arrow keys, Enter and Escape. These inform implementation, not an accessibility certification.

## Home adaptation source review - 2026-10-02
Reviewed the actual repository Home originals `a917d88f-d15a-4f53-92d3-1daecf59d05f` and `42098642-4b2d-429d-8fd9-9afc2711c1ed` and the active `HomeView` in `components/music-discovery.tsx`. The observed sections, signed-in/signed-out distinction, and limits are recorded in [home.md](home.md); no current Apple backend or recommendation behavior was inferred from screenshots.
Rechecked official [React external-store hydration guidance](https://react.dev/reference/react/useSyncExternalStore) and [Next server/client boundaries](https://nextjs.org/docs/app/getting-started/server-and-client-components). Home reuses the existing stable preview-store snapshots and deterministic server fallback, keeps interaction in client components and exposes only public metadata. These are scoped documentation checks, not a dependency upgrade or a claim that the live documentation version equals every installed package version.

### Editorial cards - 2026-10-03
Primary visual source: the repository Home capture `a917d88f-d15a-4f53-92d3-1daecf59d05f`; inspected directly, distinct from the New landscape reference. Current modal guidance checked at https://www.w3.org/WAI/ARIA/apg/patterns/dialog-modal/ for focus containment, Escape and focus return. No framework/dependency upgrade or stock-asset acquisition in this slice. Existing locally attributed images remain unchanged.

### 2026-10-03: recovered browser navigation evidence
Context7 `/microsoft/playwright` and official [Python page documentation](https://playwright.dev/python/docs/next/api/class-page) plus [locator guidance](https://playwright.dev/python/docs/locators) were checked for client-navigation assertions. Network-idle alone is not destination readiness. The observed creator test matched a directory-card h3 before the profile arrived; the same clicks now require the expected URL and profile h1, retaining all thumbnail/follow/state assertions. This diagnoses that test failure, not every previous dev failure or the ChatGPT UI error.

## Marketplace discovery — 2026-10-03
The owner requested distinct bestseller/top-course browsing sections and clearer desktop search/filter behavior while keeping the existing course card language. The Library gallery entry for Airbnb describes a destination/date-picker capture, not a full verified desktop marketplace. Its recorded image path was denied by the remote file tool; that image was not inspected or bypassed. Mobbin search returned a paid-plan requirement. Neither source is represented as an inspected complete Airbnb design system.
Official public context checked: https://news.airbnb.com/product-releases/airbnb-2025-summer-release (Explore versus Trips separation) and https://nextjs.org/docs/app/api-reference/functions/use-search-params (server-selected query results with client controls). The installed Next 16.3.4 CSS guide was read. Existing saved Apple Music Home remains the visual source; no Airbnb assets, copied pricing data or private files were imported.
Implementation uses URL-addressable collections and scalar price/level/duration filters, with a clearly disclosed demo bestseller fixture rather than fabricated commercial performance. New original sample readings make every added offer a real navigable preview. User-facing quality remains subject to review, not established by a source name or test count.
