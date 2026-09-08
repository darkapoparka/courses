# Architecture — smallest reliable implementation

Recommended baseline, revised 2026-09-08. No application or infrastructure is created by this document. [Decisions](decisions.md) records changes from the earlier, broader proposal.

## Shape

One Next.js application, one Supabase Postgres database, Supabase Auth/Storage, Stripe Connect/Checkout for money, and Mux for video. Public catalog, learner experience, Creator Studio and operator pages are route/layout groups in the same app. No separate API server, monorepo packages, microservices, event bus, or custom worker framework.

The active app belongs in `web/`. The archived `apple-music-clone/` is excluded from its workspace, build, and deployment. Start fresh instead of importing the prototype's scene switcher, fake assets, lockfile, or all-screen client component.

```text
web/
  src/app/                 # Next routes, layouts, route handlers
  src/components/ui/       # only shared accessible primitives we actually use
  src/components/shell/    # learner/studio navigation when implemented
  src/features/
    catalog/               # views + small server query functions
    learning/              # lesson access, player, progress, notes
    studio/                # draft authoring and review submission
    commerce/              # checkout and fulfillment, added at M2
    moderation/            # minimal operator functions, added when needed
  src/lib/
    supabase/              # browser, request-scoped server, restricted admin client
    env.ts                 # staged configuration validation
    money.ts               # currency formatting / validated minor-unit helpers
  public/                  # our public, licensed assets only
  supabase/                # CLI config, SQL migrations, deterministic test seed
  tests/                   # integration/browser tests as slices appear
```

This is a location guide, not a command to create every directory. Add Stripe/Mux helpers at integration time. A feature can start with a view and a server file; it does not need controller/service/repository/interface/factory layers.

## Boundaries

Route/page → small feature function → Supabase or a provider SDK. Validate and authorize in the server function closest to the protected operation; return an explicit, minimal view model. Reuse that function when multiple entry points need the same rule. Ordinary TypeScript functions are enough; no generic repository, dependency injection container, or framework around SDKs.

Server Components read feature functions directly, not our own HTTP API. Server Actions handle first-party form mutations. Route Handlers are for real HTTP needs: provider webhooks, playback/resource authorization, upload authorization, and bounded progress requests. Do not expose a parallel REST endpoint for every Server Action. These Next capabilities and security boundaries are documented in [R01–R04](research.md).

## Rendering, state, and caching

Default pages/layouts to Server Components. Use client components for the player, menu interaction, forms that need local feedback, and temporary state—not for the whole product. Keep filters/sort/query in the URL; keep server records on the server; use local state for temporary interaction. Add a client cache/store only for a demonstrated workflow.

Public catalog reads return approved metadata, not lesson bodies, resource keys, private profiles, or provider credentials. Initially prefer simple correct server rendering. Add public caching only to an explicitly safe query after measuring a need, and invalidate on publication, unlisting, suspension and content changes. Never cache a signed-in response or Set-Cookie response in a shared public cache. Private endpoint responses use private/no-store semantics; do not assume a login check in a parent layout protects data produced by descendants [R02–R05](research.md).

Paid content must be absent—not hidden with CSS—from unauthorized HTML, RSC payloads, JSON, metadata, search results, and preview data. Public previews are intentional lesson-level permissions.

## Auth and database

Use Supabase's current SSR integration with separate browser and request-scoped server clients. Verify identity with the documented token-validation path; use fresh user/account state where required. Cookie refresh/proxy logic is not resource authorization. Ownership and suspension are checked against current database records [R05](research.md).

Use the user's identity/RLS context for routine operations. The restricted admin client is server-only and used only for verified webhook processing or explicitly authorized privileged operations. It is not the default query client.

SQL migrations are the single schema authority; generate TypeScript database types. Do not add an ORM just to wrap every Supabase call. Exposed tables need both appropriate grants and RLS. Separate public metadata from protected content rather than expecting row policies to hide columns. Atomic cross-table changes use a narrowly scoped SQL function with explicit execution grants and tests; do not call several independent REST writes and describe them as a transaction [R06–R07](research.md).

## Current authorization model

One workspace owner per creator in the pilot, stored server-side. That owner can manage their own drafts and view their own sales. A private operator assignment permits named review/support actions. Learners can hold access to courses from many workspaces. Team invitations and a generalized permission engine are not needed now.

One shared lesson-access decision covers video, text, transcripts, and downloads. Inputs are authenticated identity or explicit anonymous preview, course/lesson relationships, content availability, workspace suspension, and active course grants. Bookmarks, progress, email address, checkout URLs, and UI role selection never supply access.

## Publishing without a CMS framework

Use a simple lifecycle: draft → submitted → published; changes requested returns an unpublished submission to draft. Submission locks authoring until the operator decides. Each draft has an integer edit version so concurrent saves and approval cannot race unnoticed.

Published curriculum/content is immutable to the creator during the pilot. An unlisted course remains locked and accessible to valid buyers. Bounded operator-approved corrections preserve stable lesson IDs, record a reason and version, and commit atomically. Destructive content replacement and self-service draft/live versions require a later task; do not implement a generic revision graph now. This deliberately trades some creator flexibility for a much smaller trustworthy pilot.

## Reliable payments without a custom job framework

For the small one-time-purchase pilot, the webhook performs only signature/context checks, any bounded authoritative provider lookup, and one short atomic database operation. That operation records successful event handling, updates the order, and creates/revokes the source-specific grant together. Business effects have unique constraints; duplicates cannot duplicate access.

Return success only after the necessary durable effect succeeds (or a known already-handled/no-op event is safely recognized). Return a retryable failure on transient processing/database failure. Do not insert an event as handled before applying its effect. Keep email, video processing, analytics and unrelated work out of this request. See [commerce and video](commerce-and-video.md).

Stripe generally recommends queue-based handling for scale [R09](research.md). Our narrow synchronous pilot is a deliberate simplification, not a claim that queues are bad. Measure handler duration, concurrency, retry rate, and recovery before live activation. If the handler cannot stay reliably within provider/hosting limits, adopt one managed durable queue with a recorded decision; never quietly add an in-memory task or acknowledge before durable enqueue.

A small reconciliation command calls the same fulfillment functions to compare recent provider payments/refunds with local orders/access. Run it before a paid pilot and daily during the pilot; record the result. Automate that exact bounded function later if needed. No outbox table, lease scheduler, dead-letter dashboard, generalized job DSL, or notification bus in the initial schema.

## Media and files

Authorize direct uploads server-side after ownership/quota checks; the browser sends large videos to Mux, not through Next. Provider events establish ready/failed state. Playback signing follows the same course-access rule as protected text and resources. Use a mature player, not a custom streaming engine [R12–R13](research.md).

Storage covers can be public only when intended and licensed. Paid files stay private with short-lived authorized links. A media identifier is not permission. Separate browser upload completion from processing readiness. Limit uploads before opening creator enrollment.

## Environment and evolution

M0 uses explicit, public fixtures and no provider credentials. M1 introduces actual local/staging identity/data; M2 introduces payment sandbox credentials. No silent fallback from a missing integration to fake success. No production data or live payments in development.

Add complexity only when a current requirement cannot be met simply: dedicated search after measured search problems; a managed queue after duration/volume evidence; versioning after a defined content-update need; native APIs when there is an actual native client. Architecture quality means correct boundaries and replaceable small functions, not anticipating every future business model.
