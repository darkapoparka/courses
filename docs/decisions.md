# Decision register

Baseline: 2026-09-08. A recommendation is not owner approval. Only an explicit dated instruction/decision changes `PROPOSED` to `OWNER_APPROVED`. Product/legal/provider facts must be revalidated where time-sensitive.

## Confirmed direction from the current request

| ID | Decision | Status / basis |
| --- | --- | --- |
| C-01 | Build toward an independent platform where multiple creators sell courses across legitimate categories | OWNER_DIRECTION — current request |
| C-02 | Use Apple Music Web references as the visual/interaction starting point; avoid generic low-quality UI | OWNER_DIRECTION — supplied collection and explicit preference |
| C-03 | Audit/plan and create agent documentation now, rather than continue premature implementation | OWNER_DIRECTION — current request and root repository pause |
| C-04 | Research and recommend the stack instead of treating Svelte or the accidental prototype as a fixed requirement | OWNER_DIRECTION — current request |

These do not confirm a final brand, exact navbar, color palette, business entity, take rate, launch country or production vendor account.

## Proposed architectural and product decisions

| ID | Recommendation | Status | Rationale / main tradeoff | Gate |
| --- | --- | --- | --- | --- |
| D-01 | Next.js App Router + React + TypeScript | PROPOSED | Strong fit for catalog SSR, rich UI and server integrations; requires disciplined caching/client boundaries; SvelteKit remains a credible alternative | Before bootstrap |
| D-02 | Supabase Postgres/Auth/Storage; SQL migrations/generated types | PROPOSED | One relational/access stack with fewer integrations; requires correct grants/RLS and provider operations | Before DB/Auth work |
| D-03 | One new app under `web/`; freeze existing clone | PROPOSED architecture, freeze required by current scope | Avoid inheriting arbitrary scene code; preserve evidence without deleting prior work | Before bootstrap |
| D-04 | Custom tokens/Tailwind and selected accessible primitives | PROPOSED | Preserve independent Apple-informed styling rather than a generic component-kit theme | Before UI foundation |
| D-05 | One-time course sales plus free enrollment first | PROPOSED | Clear ownership/access and simpler initial accounting; subscription/bundle demand must be validated later | Before offers/data/commerce |
| D-06 | One course/one seller per checkout | PROPOSED | Avoid multi-seller cart/split settlement complexity | Before orders/checkout |
| D-07 | Stripe Connect + hosted Checkout | PROPOSED, eligibility dependent | Managed marketplace/payment collection; responsibilities and countries still require decisions | Before commerce implementation/live gate |
| D-08 | Mux for direct video ingest/signed playback | PROPOSED | Managed media processing/delivery; compare usage cost against Stream | Before media integration |
| D-09 | Mobile Home / Search / Library / You; Spaces in Library | PROPOSED | Four clear destinations with community in learning context; validate with users | Before shell design approval |
| D-10 | Focused lesson page and compact resume navigation, not always-running mini-video | PROPOSED | Less mobile obstruction and implementation risk; continuous playback later if justified | Before player design |
| D-11 | Curated creator pilot before unrestricted publishing | PROPOSED | Test quality, trust and costs with controlled supply | Before pilot recruitment/open onboarding |
| D-12 | Modular monolith with durable outbox/bounded worker | PROPOSED | Reliability without premature microservices/multiple queue vendors | Before asynchronous integration |
| D-13 | Managed hosting, initially Vercel; supported Node LTS | PROPOSED | Straightforward Next deployment/preview operations; region/cost choices still needed | Before deployment |
| D-14 | Light-mode first, original/licensed production assets | PROPOSED design scope; rights required | Focus visual quality before adding themes; references are not shippable assets | Before visual approval/content release |

Do not reopen framework selection on every task once D-01 is approved. A change requires a concrete problem, alternatives, migration cost and owner decision. Do not approve a provider because an API key happens to exist in an environment.

## Business, safety and design decisions still required

| ID | Open question | Recommended starting position | Consequence if unresolved |
| --- | --- | --- | --- |
| O-01 | Product name, identity and original asset direction | Choose one independent brand; do not imitate Apple identity | Final branding/production assets cannot be approved |
| O-02 | Operating entity, initial buyer/seller countries and currencies | Start only where the actual entity/provider setup and support can operate | No live payment/payout activation |
| O-03 | Seller-of-record, charge model, tax/invoicing and payout responsibility | Review destination versus direct charges against the actual business/legal model | Do not hardcode financial liability/settlement assumptions |
| O-04 | Platform fee/pricing and who bears refunds/fees/disputes | Model costs and pilot willingness to pay before choosing a rate | No public committed creator pricing |
| O-05 | Access duration, substantive course updates, refunds and suspension remedies | Transparent course-level terms; ordinary unlisting preserves valid access | No final offer/checkout policy or live sales |
| O-06 | Provider eligibility for third-party creators and sensitive category claims | Obtain required approval and prohibit deceptive/get-rich-quick claims | No unsupported public onboarding/processing promises |
| O-07 | Pilot age policy and any child participation | Adults-only pilot is a proposal; deliberate safeguards for any later minors support | No assumption that an age checkbox equals compliance |
| O-08 | Eligibility and duration of course/creator community access | Initially tie participation to documented valid enrollment/access; saved/followed alone does not qualify | Community access policy/tests incomplete |
| O-09 | Review eligibility and completion semantics | Eligible enrolled learners with a defined participation rule; completion is not a professional qualification | Do not label unearned badges or imply certified competence |
| O-10 | Reference redistribution and production asset rights | Review the existing public archive and licenses; keep all references outside production | Do not expand public distribution or ship reference art |
| O-11 | Golden frames and detailed responsive behavior | Review course-specific desktop/mobile Home, detail, lesson, creator and studio frames first | Product UI is not visually approved |
| O-12 | Support/moderation/operator ownership and response expectations | Assign real accountable roles and runbooks before paid launch | No launch with nobody responsible for refunds/access incidents |
| O-13 | Data regions, retention, processor agreements, consent and account deletion | Review actual jurisdictions/providers and minimize collected data | Privacy/legal launch gate remains open |

These questions are recorded here so they are not repeatedly asked during every agent session. Work may continue on independent reference/documentation tasks while they remain open. Decisions needed for a given slice must be resolved before that slice crosses the corresponding gate.

## Decision record format

For a new or changed decision record: ID, date, owner/evidence, context, options considered, selected choice, status, implications, rejected alternatives, reversibility/migration cost, affected docs/tasks and sources. Link the actual approval rather than inventing it. Keep superseded records with a reason so another agent does not accidentally revive them.

## Evidence at this baseline

Repository/acquisition/source audit and current stack research have been drafted. Saved assets were not visually rendered in this documentation session. No course-specific frame, commercial policy, stack scaffold, provider setup or production implementation has been approved by this change.
