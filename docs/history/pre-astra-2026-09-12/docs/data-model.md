# Data model — phase-specific, not a giant initial schema

Proposed logical model. Create tables only in their assigned implementation task. SQL migrations, constraints, generated types, and tests will establish the actual schema. No SQL has been applied by this documentation revision.

## Keep these concepts separate

Identity is a user. A workspace identifies a creator business. Course metadata describes what is taught. An order records an attempted purchase and its original terms. A course grant is permission to learn. Progress is learner activity. Saving is a bookmark. Neither a progress row nor a checkout redirect implies payment or permission.

We do not need generalized offers, order items for a multi-seller cart, a subscription engine, a separate enrollment table, course-version graphs, creator team roles, or an outbox at this stage. Add them only when an implemented feature needs the independent lifecycle.

## M1 records

| Record | Minimum role and invariants |
| --- | --- |
| `profiles` | Own display name, locale and account status; private by default. Auth owns identity and credentials. Do not publicly expose all learner profiles. |
| `workspaces` | Creator owner user ID, status, timestamps; one owner in the pilot. Client cannot change owner/status. |
| `creator_profiles` | Public slug, display name, bio, approved expertise statements, avatar; explicit public projection separate from owner/contact/payment data. |
| `categories` | Small seeded category set; no arbitrary taxonomy-management product. |
| `courses` | Workspace/category, stable ID, unique public slug, title/outcome/prerequisites/level/language, cover, state, edit version, free/paid mode, current amount/currency and terms version. Current offer lives here; orders snapshot it. |
| `modules` | Course relation, title, position; positions unique within course. |
| `lessons` | Stable ID, course/module, title, type, position, duration metadata, explicit preview flag. These are curriculum fields, not paid content. |
| `lesson_content` | One protected content row per lesson: safe Markdown/text, transcript reference and media relation as needed. Never exposed just because lesson titles are public. |
| `media_assets` | Workspace/lesson relationship, provider/environment IDs, processing state, trusted duration, caption readiness; server-controlled provider fields. |
| `lesson_resources` | Exact lesson relation, private storage path, safe display name/type/size, scan/review status; no public permanent paid URL. |
| `course_grants` | Learner/course, source kind (`free` initially, `order` at M2), source key, granted/expiry/revoked timestamps and reason. Access exists if at least one valid grant applies. |
| `lesson_progress` | Unique learner/lesson, position, completion timestamp, version and last activity. Completion is not financial truth. |
| `saved_courses` | Unique learner/course bookmark. Does not grant access. |
| `operators` | Private explicit operator assignment, managed outside ordinary user input. No role derived from editable profile metadata. |
| `audit_events` | Attributable privileged review/access/status action, reason and necessary record IDs; no indiscriminate payload/secret dumping. |

Do not duplicate every course relation in every table unnecessarily. Where a row carries both workspace/course or course/module IDs, enforce the relationship through suitable composite foreign keys or checked atomic functions. IDs supplied by a route are not evidence that the records belong together.

## M2 additions

| Record | Minimum role and invariants |
| --- | --- |
| `connected_accounts` | Private workspace/provider/environment account mapping, unique where applicable, server-confirmed readiness. |
| `orders` | One course and one seller per order; buyer, immutable title/price/currency/terms/fee/tax-consent snapshots as applicable, provider session/payment/account/environment IDs, payment state, refund totals, dispute state, timestamps. No `order_items` until multiple items actually exist. |
| `refunds` | Provider refund identity, order, amount/currency, state and reconciliation timestamp; request/pending/succeeded are distinct. |
| `provider_events` | Unique provider/environment/account/event ID, type, relevant object ID and handled timestamp. Handled receipt and business effects commit together. Not a general job queue. |
| `notes` | Author, lesson, optional timecode, text, edit version, timestamps; author-only reads. Own notes remain available for export after access loss. |
| `discussion_posts` | Course/optional lesson, author, body, optional root-question parent, hidden state; one reply level initially. Parent must belong to the same course/context. |
| `reports` | Reporter, exactly one supported target (course or post), reason/status; keep reporter identity restricted. |

No creator follows, community subscriptions, ratings, team invitations or automatic notification tables in M1/M2. Those belong to later feature assignments.

## Keys, constraints, and indexes

Use opaque stable IDs; slugs are URLs, not permissions. Do not replace lesson IDs when reordering or correcting titles. Prevent hard deletion of records referenced by grants, purchases, progress or notes without an explicit retention/content-removal process.

At minimum enforce: unique public slugs; unique module/lesson positions in their parent; unique learner/lesson progress; unique learner/course bookmark; unique source-specific grant; unique provider event context; unique provider payment/session mapping. An order-linked grant must reference the same buyer/course as its order, enforced by a constrained function or foreign keys, not browser input.

Index actual access paths: course workspace/state/category; ordered curriculum parents; grants by learner/course with validity fields; progress by learner/activity; orders by buyer and seller/date; provider object IDs; posts by course/lesson/date. Add trigram/full-text indexes when search is implemented and inspect representative query plans. Do not create indexes for imagined filters.

## Public/protected boundaries

Public readers may see approved creator profiles, published course metadata and curriculum, and explicit published previews. Paid content, resource keys, private profiles, unpublished drafts, provider mappings and financial records are separate protected data. RLS controls rows; safe column/table boundaries are still required [R06–R07](research.md).

The workspace owner may edit only their own draft records. On submitted/published/unlisted/suspended content, client updates to curriculum, preview flags, media attachments and private content are denied. State changes and owner changes use checked server operations. Operators do not receive blanket access to private notes.

Use grants and RLS together. Prefer invoker semantics; any necessary privileged SQL function has an explicit principal/role contract, fixed search path, restricted EXECUTE grants, and negative tests. A webhook fulfillment function must not be executable by ordinary authenticated users. Avoid recursive policies; test owner/permission lookup helpers through the real API roles.

## Lesson access contract

First verify course/lesson/media relationships and availability. A suspended course or workspace blocks learner delivery even when payment exists. For ordinary unlisting, existing valid grants remain usable but new enrollment/sales/public preview are disabled.

For available content, permit exactly one of: an intentional public preview on a published course; an active course grant for this learner; or a separately authorized creator/operator inspection context. Draft preview must remain private and must not create learner progress, purchase grants, or buyer analytics.

Apply the same rule to text, transcripts, video signing, caption access where private, and downloads. A refund revokes only its own order grant; another valid grant remains. Free enrollment is an idempotent grant operation, not a fabricated zero-value paid order. No separate enrollment state may override grants.

## Money and checkout

Store money as integer minor units with a supported currency. Use currency-aware formatting; do not assume every currency has two decimals. Snapshot the accepted price and terms in the order; later course edits never rewrite prior purchases.

Serialize creation/reuse of an in-flight order for the same buyer/course using a constrained transaction/uniqueness rule. Resolve uncertain external session creation with the same provider idempotency key, not a fresh charge attempt. Record separate payment, refund and dispute facts rather than a single overloaded `is_paid` value.

Keep provider financial state authoritative. Our records support access/support/reconciliation, not a custom banking ledger or replacement for accounting. Exact charge model, fee/tax treatment and refund consequences are decisions before payment implementation/live activation.

## Editing, publication, and progress

Draft saves compare an expected integer edit version. Submission and approval compare that version too; creators cannot change content underneath a review. For the pilot, published content stays locked and there is no parallel live/draft revision model. Bounded operator corrections preserve IDs, check the current version, and write an audit record in the same transaction. Removing substantial purchased content is not a normal edit.

Progress uses an expected version and serialized client saves; older writes fail rather than overwrite newer activity. Resume position may decrease after a deliberate rewind. Completion is stored separately and cannot be undone by an older heartbeat; a reset is a distinct explicit action. Bound positions against trusted duration when available.

On a conflict, keep the active player's position/local note text, refresh the server version and show an appropriate recovery path. Never blindly retry an old payload over newer data. Periodic saves limit loss; browser close events are not a guaranteed final delivery mechanism. No distributed playback-session coordinator is required for the pilot.

## Retention

Define retention by data type. Financial records may require retention while notes/profile data require deletion or minimization; do not apply blanket soft-delete or cascading erasure. Record the actual jurisdiction/policy decision before production. Migrations include grants, RLS, constraints, indexes, seed/test impact and a compatibility/recovery plan.
