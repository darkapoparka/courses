# Architecture

Status: proposed, pending stack/scope approval. No application or infrastructure is created by this document. Read `tech-stack.md`, `data-model.md` and `commerce-and-video.md` together.

## Architectural shape

One modular web application, one Postgres database, and managed auth/files/video/payments. Start with a modular monolith: keep feature ownership clear without introducing a network service per domain. Public discovery, private learning, Creator Studio and operator tools are route/layout boundaries within the same product.

The proposed new app lives in `web/`. The archived `apple-music-clone/` remains outside the active app, workspace and deployment root. Do not copy its all-screen component, demo data, music assets, arbitrary screen mappings or lockfile into the new product.

## Target structure — not files to create now

```text
AGENTS.md
docs/
apple-music-clone/          # frozen prototype and reference archive
web/                       # only after BOOT-001 is authorized
  src/app/                 # thin App Router pages, layouts, actions/handlers
  src/components/ui/       # accessible primitives and approved token wrappers
  src/features/
    catalog/
    learning/
    creators/
    commerce/
    community/
    moderation/
  src/lib/
    auth/
    db/
    media/
    payments/
    jobs/
    observability/
  public/                  # only original/licensed public assets
  supabase/migrations/     # one versioned database schema authority
  tests/                   # unit, integration, authorization and browser evidence
```

Use domain-oriented services/repositories inside the owning feature. Do not precreate empty abstraction layers for every possible future provider. Shared utilities should be genuinely shared; do not turn `lib` into an unstructured second application.

## Ownership boundaries

| Domain | Owns | Must not own |
| --- | --- | --- |
| Catalog | Safe published course/creator projections, categories, search, editorial shelves | Private lesson bodies, financial fulfillment |
| Creators | Workspace roles, draft curriculum, revisions, publishing lifecycle | Self-granted payment access or global moderator powers |
| Commerce | Offers, order snapshots, provider integration, refunds, grant sources, reconciliation | UI-driven 'paid' flags or learner progress |
| Learning | Authorized lesson delivery, progress, private notes, resources | Purchase truth or cross-creator publishing |
| Community | Space membership rules, questions, posts, replies, reviews, reports | Private note access or unrestricted direct messages |
| Moderation | Review decisions, content actions, appeals, operator audit | Unrestricted browsing of all learner private data |
| Media adapter | Direct-upload authorization, provider mapping, readiness events, playback signing | Deciding purchase eligibility from a browser-supplied flag |

Learning calls a shared access policy backed by commerce grants and the published-content policy. It does not duplicate payment rules in the player. Catalog search consumes a safe projection, not an unrestricted query across every course/lesson column.

## Rendering and client boundaries

Server-render public course/creator pages for useful first content, metadata and link previews. Cache only explicitly safe published catalog representations, with invalidation on publication, unlisting and relevant changes. Paid lesson text/transcripts/resources must never leak into public HTML, client props, static bundles, preview metadata or search indexes.

Authenticated pages, responses carrying cookies and user-specific access/financial state must not enter shared public caches. Follow current Next.js and Supabase SSR guidance; do not assume a user-specific component is protected merely because its parent checks login [S01, S08](research.md).

Use client components only for interaction that needs them: player, menus, editable forms, local state and selected live updates. Prefer server-side data loading for catalog and authenticated entry points. Keep URL state for search/filter/sort and local component state for temporary controls. Do not make the root layout a giant client component or introduce a global state store for all server data.

Use the current App Router conventions, async request APIs and version-matched framework documentation after bootstrap. No experimental caching/offline features are required for the baseline.

## Request and authorization path

A typical authenticated operation is: validate request shape → verify identity → load current resource/workspace/access facts → authorize the specific action → execute a constrained transaction → produce a minimal response → emit reliable follow-up work when needed.

Identity alone is not permission. Validate both the resource and its parent relationship. A supplied `workspaceId`, `courseId`, `orderId` or upload ID must be bound to authorized data; never trust a hidden field or route nesting. Check fresh workspace membership for sensitive publishing, payout and operator actions, not a user-editable metadata role. Verify provider-account relationships server-side.

Use separate server/browser Supabase clients following the installed SSR integration. Browser access uses publishable credentials and appropriately scoped RLS. Never expose service/secret keys through public environment variables, generated HTML, logs or client bundles [S08–S09](research.md).

## Database access policy

Use SQL migrations as the schema authority and generate application types. Apply least-privilege grants and RLS to exposed tables; grants and row policies are different layers. Protect sensitive columns by table/projection boundaries, not by expecting row policies to hide selected fields. Use security-invoker views where appropriate and verify their effective permissions [S09–S10](research.md).

Routine user-scoped reads/writes should preserve the user's identity/RLS context. Commerce fulfillment, moderation and narrowly scoped operational work may require privileged server paths, but those must perform explicit authorization and audit. Do not use an unrestricted service credential as the default for every route and assume RLS still protects it.

For an atomic operation across several tables, use a reviewed database function or server transaction strategy with restricted privileges. A security-definer function is not a shortcut for fixing permission errors: constrain its schema/search path and execution grants, validate its inputs/principal and test cross-tenant attempts. A server-only webhook fulfillment function must not be callable by ordinary users. Do not expose generic 'run SQL' or arbitrary ownership-change RPCs.

## API/action contracts

Implementation may use Server Actions for first-party mutations and Route Handlers where an HTTP boundary is required. Both need authentication, authorization, validation, rate controls and safe errors. Reuse domain services instead of maintaining different business rules for a form action and its API equivalent.

| Boundary | Contract |
| --- | --- |
| Catalog/search | Only approved published metadata; bounded query/filter/sort/pagination; no paid-content joins |
| Free enrollment | Authenticated, published/free offer, idempotent grant/enrollment creation |
| Checkout creation | Authenticated, server-resolved offer/currency/creator status, pending order and provider idempotency |
| Purchase status | Authenticated owner/operator scope; minimal financial/access status |
| Playback authorization | Active permitted grant or explicit public preview; lesson/version/media ready; short-lived signed response, no shared cache |
| Resource download | Same access policy; validated asset relation; short-lived private URL where needed |
| Progress/notes | Self-owned record and authorized lesson; bounded payload; retry/concurrency contract |
| Creator upload | Current editor permission and own draft lesson; type/size/quota limits; short-lived upload authorization |
| Publishing | Current role, reviewed revision and publish checklist; no direct client status update |
| Provider webhooks | Raw-body signature verification, deduplication, durable event recording, bounded processing/retry |
| Internal job runner | Service-authenticated, no public invocation with an anonymous key; lease-based bounded work and safe retries |

Any internal paths used later must be documented with their actual methods/payload schemas when implemented. Do not introduce a public versioned API merely to satisfy a diagram. Preserve a clean service boundary so a future native app can reuse rules without promising automatic React-to-native UI reuse.

## Durable asynchronous work

Use a transactional outbox for side effects that must survive request failure: enrollment email, moderation notifications, provider reconciliation and media follow-up. Persist the required state/outbox atomically where they share the database. A bounded authenticated scheduled worker claims jobs with a lease, records attempts, retries with backoff and exposes dead-letter failures for operators.

Do not use an unawaited promise or an in-memory timer as reliable payment processing. External systems and the database cannot form one ordinary local transaction; model pending states and reconciliation. Provider event delivery may repeat or arrive out of order; business effects must be idempotent. Keep expensive media work at the media provider, not inside a web request.

A managed workflow/queue service can be adopted later if measured duration, throughput or operational needs exceed the simple worker; record that decision rather than adding several job systems on day one.

## Publication and versioning

Stable course and lesson identities connect purchases, notes and progress. Draft revisions can change metadata/content/order without mutating the currently approved version. Publishing atomically points to a validated approved revision. Existing buyers retain the advertised access, and ordinary catalog unlisting does not revoke it.

Document whether material changes require renewed review, how removed lessons affect progress, and what support/refund policy covers substantial purchased-content changes. Do not silently make course completion jump backward or erase notes when a creator reorders a lesson. The initial implementation may keep revisioning simple, but cannot use uncontrolled in-place edits for all paid content.

## Search, notifications and telemetry

Start with indexed catalog search in Postgres. Searchable fields and result projections are explicit. Later paid transcript/semantic search requires authorization during retrieval, not just filtering a displayed result afterward.

Transactional notifications follow outbox events and recipient preferences; never include paid transcripts, private notes or unnecessary personal details in email. Analytics distinguishes preview, enrolled and paid learning. Do not treat client analytics as payment, authorization or certification truth.

## Configuration and environments

Separate local/development, preview/staging and production data and provider credentials. Hosted payment/video callbacks must point to the correct environment and verify signatures there. Provide an `.env.example` containing names and explanations, never real values, only after implementation starts.

Public catalog/demo UI development should not require production secrets. Integration work needs deliberately configured local/staging services; missing secrets must produce a clear setup error, never silently switch to a fake successful payment/backend. Mock adapters and fixtures belong to explicit test/demo modes and cannot be mistaken for production readiness.

Deploy the product app root only, excluding the archive. Use a supported Node LTS runtime and compatible stable dependencies. Region, backups, provider budgets, live domains and operational ownership are launch decisions, not defaults silently chosen by an agent.
