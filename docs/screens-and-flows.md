# Screens, routes and user journeys

Updated 2026-09-09. Target product map, not implemented routes. A screen ID groups related states, not a separate component per screenshot. Milestones are in [features](features.md); exact viewed originals are in [the ledger](reference-review/ledger.md). Course designs remain proposals until reviewed.

## Public and learner surfaces

| ID | Route / surface | Main content/action and required states | Stage |
| --- | --- | --- | --- |
| DISC-01 | `/` | Visitor discovery or returning Continue learning; purposeful shelves, empty/loading/error | M0 → M1 |
| DISC-02 | `/browse`, `/browse/[category]` | Category collection and level/language/price filters; no results/reset/error | M0/M1 |
| DISC-03 | `/search?q=...` | Courses/Creators, query/filters in URL; no query, results, no results, loading/error | UI-004 → M1 |
| COURSE-01 | `/courses/[slug]` | Outcome, teacher, price/access, curriculum, prerequisites and effort; locked/free/owned/in-progress/completed/pending/unavailable | M0 → M1/M2 |
| COURSE-02 | Explicit preview in course detail | Intentionally public sample, captions, back/close and retry; next paid lesson stays locked | M0 → M1 |
| CREATOR-01 | `/creators/[slug]` | Genuine identity/expertise and courses; no courses/unavailable | UI-004 → M1 |
| LIB-01 | `/library?tab=courses` or `/library?tab=saved` | Active-access learning versus bookmarks; resume/progress, separate empty/error | M0 → M1 |
| LEARN-01 | `/learn/[courseId]/[lessonId]` | Authorized video/text, curriculum, previous/next/complete; locked, processing, ready, token expiry, error, suspended | M0 → M1 |
| LEARN-02 | Notes within lesson | Private text/timecodes; saving/saved/conflict/retry | M2 |
| LEARN-03 | Resources/transcript within lesson | Authorized text/files/captions; none, loading, expired link, unavailable | M1 |
| LEARN-04 | Questions within lesson | Entitled question/reply/report; no posts, pending, hidden, denied | M2 |
| AUTH-01 | `/auth/sign-in` | Email OTP entry; safe return intent, pending/error/rate limit | M1 |
| AUTH-02 | `/auth/verify` | Code/resend/change email; expired/invalid/rate limit | M1 |
| PAY-01 | Course summary → hosted Checkout | Confirm current price/terms; stale price, already owned, not sellable, cancel | M2 |
| PAY-02 | `/purchases/[orderId]` | Owner-only confirming/fulfilled/failed/refund/dispute; course entry/help/receipt | M2 |
| SET-01 | `/settings` | Safe profile/account/security/preferences and creator entry; actual save/error | M1 essential → M2 |
| SET-02 | `/settings/purchases` | Own history/receipt/support links; empty/error | M2 |
| HELP-01 | `/help` | Real help/support/report path; private purchase context only when authorized | M1 essential → M2 |
| LEGAL-01 | `/terms`, `/privacy`, `/refunds`, `/creator-terms` | Reviewed actual policies/dates; no placeholder legal copy in live commerce | Before live pilot |

No separate offers/checkout-route framework is required. The course action creates/reuses one order and redirects to hosted Checkout. Its return page identifies the authenticated owner's order, not proof of fulfillment.

Public draft/nonexistent URLs return not found without disclosure. Unlisting stops discovery/new sales/free enrollment; existing valid access remains. Suspension overrides delivery with an explanation/support path, not a broken player. Paid text/transcripts/resources receive the same checks as video.

## Creator Studio

A separate focused shell inside the same app. One owner per workspace initially; route parameters do not establish ownership. Mobile critical actions are available without hover. No team settings or elaborate analytics in the pilot.

| ID | Route / surface | Main action/states |
| --- | --- | --- |
| STUDIO-01 | `/studio` | Owned-workspace entry or creator application; pending/rejected/approved |
| STUDIO-02 | `/studio/[workspaceId]/courses` | Create draft; draft/submitted/published/unlisted list; empty/error |
| STUDIO-03 | `/studio/[workspaceId]/courses/[courseId]` | Details/curriculum/pricing tabs; explicit saving/saved/failure, validation/conflict and locked states |
| STUDIO-04 | Lesson editor within STUDIO-03 | Text/video/resources, accessible reorder; upload versus processing/caption readiness, invalid file/retry |
| STUDIO-05 | `/studio/[workspaceId]/courses/[courseId]/preview` | Private creator preview banner; no purchase grant or learner progress |
| STUDIO-06 | Review panel within editor | Submit current version, rejection reasons, publish status/unlist; operator-mediated published corrections |
| STUDIO-07 | `/studio/[workspaceId]/sales` | Own sales/refunds, defined totals/provider links; no other sellers' records |
| STUDIO-08 | `/studio/[workspaceId]/settings` | Public creator profile and hosted payout onboarding/readiness; no KYC documents stored here |
| STUDIO-09 | Course-question view or lesson link | Creator replies to own course questions; empty/pending/hidden; private learner notes unavailable |

Submission locks the reviewed version. Published content stays creator-locked; unlisting is not a path to rewrite purchased lessons. Operator corrections preserve stable IDs, compare edit version and record reasons. Full draft/live revisioning is deferred, not secretly implemented in the editor.

## Operator surface

One restricted `/ops` shell with small review, report and purchase/access sections is sufficient. Show current records, reasons, action confirmation and audit. Provider dashboard links are appropriate for financial operations. No arbitrary SQL console, custom finance ledger or custom jobs/dead-letter dashboard. A bounded reconciliation report and exception list are enough for the pilot.

Operator assignment is explicit; knowing a URL or being a creator is not permission. Protect reporter identity and private notes. Review/reject/hide/suspend/reconcile actions need current authorization and attributable reasons.

## Critical journeys

**F-01 — discover/preview.** Home/search/category → course → public sample → course. Visitor understands outcome, teacher, prerequisites, price and access before signup. Locked content never appears in the preview payload. Source anchors: VIS-02/03/05/06/14.

**F-02 — free enrollment/resume.** Course → sign-in preserving intent → confirm enrollment → idempotent free grant → library/lesson → periodic progress save → leave → resume correct lesson/position. Save is a bookmark, not enrollment. Rewind is preserved and stale updates cannot undo completion. Anchors: VIS-12/13/17 plus original learning design.

**F-03 — buy/learn.** Course accepted terms → sign-in if needed → server-created/reused order → hosted payment → owner-only confirming page → authoritative fulfillment → grant → lesson. Closing the browser cannot prevent fulfillment. Slow callbacks do not trigger another purchase; decline/cancel/stale offer have recovery. Apple billing art is not the payment specification.

**F-04 — draft/publish.** Approved creator → metadata/modules/lessons → direct upload/process/captions/resources → private preview → submit exact version → operator publishes or requests changes. No content changes underneath review. Existing buyers' material is not silently replaced. These are course-specific screens, not supplied Apple creator tools.

**F-05 — questions/support.** Entitled learner asks in lesson context → creator replies. Report when needed → restricted operator triage/hide/action with reason and support/appeal. A private note is never published automatically. In-app state is enough; no realtime/notification pipeline dependency.

**F-06 — refund/suspension.** Own purchase → support/refund request → authorized provider action → provider-confirmed state → source-specific grant change. Pending is not completed; another valid grant survives. Unlisting preserves access; legal/safety suspension uses separate support/remedy handling.

**F-07 — interrupted work.** Expired login preserves safe intent but does not automatically publish/charge. Failed uploads retain curriculum. Save conflicts preserve local input and offer recovery instead of overwriting another session. Expired media links refresh only after authorization.

## Shared states and source use

For applicable families: anonymous/correct owner/wrong owner, empty/slow/error/retry, expired session, stale edit, unavailable course, long text, keyboard/zoom, mobile keyboard/safe areas. Label truly irrelevant states not applicable rather than manufacturing screenshots.

The ledger now supplies actual anchors for all core learner/public pattern families, menus and sign-in. It does not supply final course wireframes, browser behavior or mobile references. Use it with the design-system contracts and verify the current implementation locally. There is no full 159-screen approval requirement before a bounded first UI slice.

M3 spaces/reviews/follows/teams/memberships/live/native/offline flows are intentionally absent from pilot navigation. Add routes only when a feature is promoted. Fixture previews must distinguish unavailable future destinations from working routes and must never simulate a successful purchase or publication.
