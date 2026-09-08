# Data model and invariants

Status: conceptual design, not an applied schema. Build only the entities needed by the authorized slice. Names below are proposed; actual migrations, indexes, generated types and permission tests must remain the implementation source of truth.

## Domain distinctions

Identity answers who the user is. Workspace membership answers which creator actions they may perform. An offer describes what is currently sold. An order records a specific attempted/completed transaction. An entitlement grant records a source of access. Enrollment records the learning relationship. Progress records learning activity. A saved item is a bookmark. None of these should be collapsed into a single `is_paid` or `is_creator` flag.

A person may learn, create and moderate within different scopes. Do not make 'learner' and 'creator' mutually exclusive account types. Moderator/operator capabilities require explicit scoped assignment and audit.

## Entity groups

| Group | Proposed records | Essential fields / purpose |
| --- | --- | --- |
| Identity | profiles | Auth user ID, display identity, locale, safe public fields; private contact data not exposed by default |
| Creator tenancy | workspaces, workspace_members | Workspace identity/slug/status; user, role, membership status; provider payout account relation kept private |
| Catalog | courses, categories, course_categories | Stable course ID, workspace, slug, catalog state, published revision pointer; category relations |
| Revisions | course_revisions, modules, lessons, lesson_revisions | Stable course/lesson identity, revision identity, ordered curriculum, outcome/prerequisites/content, review status |
| Media | media_assets, lesson_resources | Workspace/lesson relation, provider IDs, processing state, type/size/duration, captions, preview designation, private resource reference |
| Offers | offers | Course, seller workspace, free/one-time type, price in minor units, currency, access terms, active interval/status |
| Purchases | orders, order_items | Buyer, seller, state, immutable commercial snapshot, provider references, totals and timestamps; one item initially |
| Financial adjustments | refunds, financial_entries | Provider-confirmed refund/fee/transfer events and reconciliation references; not a replacement for statutory accounting |
| Access | entitlement_grants | Learner, course or defined future scope, source type/ID, status, valid-from/until, revoke reason |
| Learning relationship | enrollments | Learner/course, start/last activity, relevant course revision context; not the payment ledger |
| Progress | lesson_progress | Learner/stable lesson, saved position, completion state/time, last accepted session/sequence metadata |
| Private study | notes | Author, course/lesson, optional timecode, text, revision/update metadata; author-only |
| Discovery preference | saved_courses, creator_follows | User/course or user/workspace unique relation; not entitlement |
| Discussion | posts, replies | Workspace, optional course/lesson context, author, body, moderation state, parent relation |
| Reviews | course_reviews | Eligible learner/course, rating/text, timestamps/moderation status and eligibility basis |
| Trust operations | reports, moderation_actions, appeals | Reporter/evidence, target and workspace, reason/status, actor/outcome; restricted fields |
| Reliability | provider_events, outbox_jobs, audit_events | Unique event identity, durable processing status, job attempts/leases, attributable actions |

A creator space initially belongs to its workspace; do not create a separate paid-community subscription model. Access to basic course/creator discussion should use the documented enrollment/grant policy. Add an explicit community-membership table only when its independent lifecycle is required, rather than allowing derived and stored memberships to drift.

## Keys and relationships

Use stable opaque IDs for internal relations and unique slugs for public navigation. Slugs may change with redirects; they are not authorization boundaries. Include workspace scope in creator-owned records and verify parent-child relations. Where practical, composite foreign keys such as `(workspace_id, course_id)` and `(course_id, lesson_id)` prevent cross-tenant or cross-course association mistakes at the database layer.

Uniqueness constraints include workspace/user membership, user/course enrollment, user/course bookmark, user/course review, user/lesson progress, provider account mapping, and provider/account/event ID. Provider object IDs should carry their provider/account/environment context where needed. Do not assume IDs from separate connected accounts or environments are interchangeable.

A lesson referenced in progress or notes must retain stable identity across simple title changes/reordering. Revision-specific content can change without replacing that identity. When a lesson is removed from a released curriculum, retain sufficient relationship/history to explain progress and support obligations; no cascade that silently destroys a learner's notes or purchase audit trail.

## Public versus protected data

Separate safe catalog metadata from paid lesson bodies, transcripts, private resource keys, unpublished revision content, financial data and contact details. RLS restricts rows, not arbitrary secrets in otherwise readable columns; use safe projections or separate tables and appropriate column privileges [S09](research.md).

Anonymous users may read approved published metadata and explicitly public previews. Creators may inspect their own drafts but cannot make those drafts anonymously readable by guessing a URL. A creator preview is authorized editor access, not a generally public preview link. Learner notes are not accessible to creators by virtue of owning the course.

Workspace membership is checked against an authoritative record. Never authorize from `user_metadata` or a role selected in a signup form. Avoid broad policies such as 'any authenticated user can read all orders'. Policies need both identity and resource/tenant predicates.

## Access function

Conceptually, `can_access_lesson(user, lesson, now)` requires a permitted course/content state and one of:

1. The exact lesson/version is intentionally published as a public preview.
2. The user has at least one applicable active entitlement grant whose validity interval contains `now`.
3. A separately checked creator/operator preview permission authorizes that inspection context.

These are distinct paths; a creator preview must not create a paid enrollment or appear as buyer activity. Define any free-course access policy explicitly rather than letting all signed-in users read every free draft.

A course purchase grants only the scope advertised. Revoking grant A cannot remove access from still-valid grant B. Enrollment, a bookmarked course, a checkout redirect, a local-storage flag or a client 'completed' event cannot satisfy a paid access check. Course safety suspension may override normal grants according to the reviewed policy; ordinary unlisting does not.

## Money invariants

All monetary amounts use integer minor units with an explicit supported currency and currency-aware formatting. Do not use binary floating-point arithmetic for authoritative prices/fees. Do not assume every currency has two decimals. Store actual provider IDs and confirmed amounts; never infer financial truth from a client-rendered label.

An order snapshots course title/ID, creator/seller identity, offer/price, currency, access terms/version, applicable discounts/tax/fee fields and required consent/policy versions. Later edits to an offer must not rewrite what an earlier buyer purchased. A free enrollment is not a fabricated paid order.

Payment status, refund status, dispute status, transfer/payout status and access status are related but different. Keep their relevant source records and transition reasons. The initial schema may use separate state fields/adjustment tables rather than trying to represent every combination in one enormous enum. Dashboard revenue definitions must specify gross, refunded, fees, transferred and net; they are not interchangeable.

## Publication invariants

A course has stable identity and a pointer to its currently published approved revision. Draft revisions can be edited independently. Publishing requires authorized workspace role, validated content and applicable review/payout eligibility. Use an atomic checked operation to switch the published pointer and catalog state.

Proposed lifecycle: draft → submitted → changes requested or approved → published → unlisted; suspension is a distinct operator-controlled restriction. A new draft may coexist with the last published version. A rejected revision does not delete the previously approved course.

Lesson/media readiness is separate: created → upload authorized → uploading/awaiting ingest → processing → ready or failed → retired. Only verified provider/server processing determines ready. A client may report transfer progress, not grant playback permission or mark processing complete.

## Progress and concurrency

Persist explicit completion separately from resume position. An older progress update must not undo a confirmed completion. A legitimate rewind must be able to lower the resume position; simply taking the maximum timestamp in the video is incorrect. Use bounded playback sessions and monotonically increasing event sequence values within a session, with a documented cross-session precedence rule. Record server receipt/update versions and reject stale conflicting writes as appropriate.

Validate the position against trusted media duration when known and handle content replacement. Progress is a convenience and learner activity record, not proof of professional competence. Define whether completion is explicit, suggested after a threshold, or both; do not claim a certificate merely because a video ended.

Notes and studio edits use optimistic concurrency/version tokens. Preserve local input on conflict; return an actionable stale-revision response instead of silently overwriting another session. Reordering lessons must update an ordered sequence transactionally, with constraints preventing duplicate/conflicting positions within a module/revision.

## Events and outbox

`provider_events` uniquely identifies a provider delivery context, stores verification/receipt and processing state, and retains only the payload/fields needed under the retention policy. Durable receipt and a retryable failure are not the same as completed fulfillment.

Order fulfillment, its grant effect and an outbox event should be applied in one database transaction where possible. The worker claims bounded jobs by lease, supports retry/backoff, and records terminal failures for inspection. Each external side effect has its own idempotency strategy; do not promise exactly-once delivery across vendors.

## Deletion, retention and migration

Soft deletion is not a universal privacy solution. Define retention separately for financial/audit records, account data, private notes, user-generated content and provider payloads. Preserve legally required financial information while minimizing or removing unnecessary personal data according to the reviewed policy. Do not cascade account deletion through immutable purchase/provider history without a retention decision.

Every implemented migration needs constraints, indexes, grants, RLS and positive/negative tests for the affected access model. Use one migration history, reviewed application compatibility and a recovery plan. This document is not permission to execute SQL or modify a connected project.
