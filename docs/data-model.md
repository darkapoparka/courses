# Data model — deferred product contracts

This is a proposed logical model for the post-acceptance courses phase, not an installed schema. No database migration is authorized or applied by this documentation revision. The current music preview retains its existing local state.

## Distinct concepts

Identity is a user; a workspace identifies a creator; public course metadata describes an offer; protected lesson content supplies instruction. An order records a purchase attempt and accepted terms. A source-specific course grant is permission. Progress is activity; saving is a bookmark. None of these substitutes for another's authority.

Use SQL migrations, constraints, generated types and real-role tests when implementing an assigned slice. Do not precreate a subscription engine, multi-seller cart, generic offers, revision graph, team permission framework or job/outbox platform.

## Free-alpha records

| Record | Essential contract |
| --- | --- |
| Profiles / workspaces / creator profiles | Private learner data, server-owned workspace authority/status, separate approved public creator projection |
| Categories / courses | Stable identity, public slug and safe metadata, ownership, publication state, edit version and current offer/terms |
| Modules / lessons | Stable ordered curriculum identities; checked course/module relationships and explicit public-preview flag |
| Lesson content / resources | Protected text/transcript/media relation and private resource keys, distinct from public lesson titles |
| Media assets | Owned lesson/workspace binding, environment/provider identity, trusted processing/duration/caption state |
| Course grants | Learner/course plus unique source identity, validity/expiry/revocation and reason; any valid applicable grant can permit access |
| Progress / saved courses | Unique learner/lesson progress with version and separate completion; unique learner/course bookmark |
| Operators / audit events | Private explicit authority and attributable privileged actions; no blanket private-note access or secret payload dumping |

Where rows contain multiple parent identifiers, enforce that the parents actually belong together. A UUID or nested route is not proof of ownership. Public metadata must not carry paid bodies, storage keys, provider secrets or private buyer records.

## Paid-pilot additions

Orders hold one buyer, course and seller plus immutable accepted title/price/currency/terms snapshots and provider/environment references. Payment, refund and dispute facts are distinct, not one overloaded paid boolean. Refund records distinguish requested, pending and confirmed outcomes. Provider-event receipts and required business effects commit atomically with unique provider/environment/account/event context.

Connected-account mappings are private and server-controlled. Notes are author-only with conflict versions and optional timecodes; own notes should remain exportable after course-access loss. Discussion posts are course/lesson scoped, with one reply level initially; parent/context relationships are checked. Reports protect reporter identity and support attributable review.

## Constraints and authorization

Require unique public slugs, parent-scoped curriculum order, learner/lesson progress, learner/course bookmarks, source-specific grants, provider event context and provider session/payment mappings. An order-linked grant must refer to the same buyer/course as its order. Prevent destructive deletion of purchased or referenced learning records without an explicit retention/removal procedure.

Expose only deliberate tables/columns through appropriate grants and row policies. Review views, functions and storage separately. Privileged functions need constrained execution, identity/authority checks and negative tests; routine users cannot invoke financial fulfillment. Do not authorize from user-editable profile metadata. Refresh current vendor guidance when writing actual policies.

## Shared lesson-access decision

Validate lesson/course/media relationships, account/workspace status and content availability. Permit an intentional published public preview, a valid learner grant, or a separately authorized private creator/operator inspection. Creator previews must not create learner grants or progress. Apply the same decision to text, transcripts, signing, captions where private and downloads.

Unlisting stops new sales/enrollment and public previews but preserves valid existing access. Suspension blocks delivery with a support/remedy path. A refund changes only its own grant under the approved policy; another valid grant survives. Tokens already issued may remain valid until expiry, which the integration must document and test.

## Concurrency and state integrity

Draft saves, submission and approval compare an expected edit version. Submissions and published content are creator-locked; unlisting does not unlock purchased content. Bounded operator corrections preserve IDs and atomically record a reason/version. Full live/draft revisioning is a later feature, not an accidental pilot requirement.

Progress saves are versioned and serialized. Resume position may decrease after a deliberate rewind; completion is separate and cannot be undone by an old heartbeat. Conflicts preserve current local position/note text and surface recovery rather than blindly replay an old payload. Periodic saves reduce loss; browser shutdown delivery is not assumed reliable.

Store money in validated currency-aware minor units. Serialize creation/reuse of an active order attempt and keep stable provider idempotency identity across uncertain retries. Provider calls and database writes do not share one transaction; use explicit recovery/reconciliation rather than another blind charge attempt.

Define retention by record type and actual policy/jurisdiction before production. Financial/audit retention and private profile/note deletion are not one blanket cascade or universal soft-delete rule. Each migration needs permissions, constraints, indexes, test impact and compatibility/recovery evidence.
