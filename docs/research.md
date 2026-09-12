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
