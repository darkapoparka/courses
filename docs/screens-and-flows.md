# Screen map and user journeys

Status: proposed product map. Routes are target URLs, not existing implementations. Screen IDs group related states; they do not imply a separate route/component for every state. Design approval is pending, and no screen below is claimed as a visually audited Apple Music match.

## Surface boundaries

The product has four surfaces: public discovery/evaluation, authenticated learning, Creator Studio and operator tools. Public course metadata is searchable; paid lesson bodies, transcripts/resources, private notes, learner records and creator finances are not public catalog data.

Desktop/mobile navigation follows `design-system.md`. Auth and hosted payment flows return to a validated internal destination. Browser Back must work; do not model the whole platform through one `?view=` switch or a giant client-side scene component.

## Public and account screens

| ID | Route / surface | Main contents and required states |
| --- | --- | --- |
| DISC-01 | `/` | Visitor editorial discovery; returning learner Continue learning; relevant shelves; loading/empty/error; no invented popularity |
| DISC-02 | `/browse` and `/browse/[category]` | Category collection, level/language/price filters, safe published results, no-results/reset |
| DISC-03 | `/search?q=...` | Query, courses/creators, filters/sort in URL, keyboard results, no query/no results/error |
| COURSE-01 | `/courses/[slug]` | Outcome, creator, offer, curriculum, preview, prerequisites, effort, access/update/support details; new/owned/in-progress/completed/pending/unlisted/suspended |
| COURSE-02 | Preview within COURSE-01 | Intentionally public sample; captions, close/return, media failure; paid next lesson remains locked |
| CREATOR-01 | `/creators/[slug]` | Identity/expertise, courses, follow, space entry; new creator/no courses/restricted state |
| AUTH-01 | `/auth/sign-in` | Email OTP entry, optional configured Google, intent-preserving safe redirect, pending/error/rate limit |
| AUTH-02 | `/auth/verify` | Code verification/resend/expiry; change email; no account enumeration; safe return path |
| LEGAL-01 | `/terms`, `/privacy`, `/refunds`, `/creator-terms` | Actual reviewed policies and dates; placeholders cannot ship as final legal text |
| HELP-01 | `/help` and support contact | Searchable basic help/contact, purchase/access context when authorized, report entry |

Public draft or nonexistent course URLs return an intentional not-found state. Unlisting removes a course from public discovery/new sales but does not by itself remove existing buyers' access. Define the public unlisted-page policy without disclosing draft content.

## Learning, community and purchase screens

| ID | Route / surface | Main contents and required states |
| --- | --- | --- |
| LIB-01 | `/library?tab=courses|saved|spaces` | Owned/free-enrolled courses, progress/resume, bookmarks and joined creator spaces; each tab has honest empty/error states |
| LEARN-01 | `/learn/[courseId]/[lessonId]` | Video/text lesson, curriculum, previous/next, progress; authorized/locked/processing/missing/suspended/token-expired |
| LEARN-02 | Notes section of LEARN-01 | Private notes and optional timecodes; edit/delete/save/retry; other learners and creators cannot read them |
| LEARN-03 | Resources/transcript section of LEARN-01 | Authorized text/downloads/captions; no-resource/error/expired-link states |
| LEARN-04 | Questions section of LEARN-01 | Contextual question, replies, creator identity, report; empty/pending/moderated/permission-denied |
| SOC-01 | `/spaces/[workspaceSlug]` | Creator-scoped posts/announcements and member context; member/nonmember/suspended/no posts |
| SOC-02 | `/spaces/[workspaceSlug]/posts/[postId]` | Thread, replies and report; pending/edit conflict/deleted/moderated |
| REVIEW-01 | Review form on COURSE-01 | Eligible learner review, own edit, report; not eligible/duplicate/pending/error |
| PAY-01 | `/checkout/[offerId]` | Course/creator/price/currency/access summary, required actual terms, create hosted checkout; already owned/stale offer/not sellable |
| PAY-02 | Stripe-hosted Checkout | Payment collection and required authentication; externally hosted, not a custom Apple card-entry clone |
| PAY-03 | `/purchases/[orderId]` | Owner-only confirming/fulfilled/failed/canceled/refunding/refunded/disputed receipt/status; help and course entry |
| SET-01 | `/settings` | Profile/security/preferences, learner and workspace entry points |
| SET-02 | `/settings/purchases` | Own purchase history, receipt links/refund request; empty/error |
| SET-03 | `/settings/privacy` | Data request/export/deletion entry and clear retention explanation; identity verification before sensitive actions |

A course may have many lessons without requiring a wholly different visual layout per lesson type. Paid text and downloads must be locked as rigorously as video. The purchase return URL may identify an order but cannot establish ownership or fulfillment.

## Creator Studio screens

All routes are scoped to a selected workspace and freshly checked membership. Mobile layouts must expose critical information/actions without relying on hover. The same user may belong to multiple workspaces with different permissions.

| ID | Route / surface | Main contents and required states |
| --- | --- | --- |
| STUDIO-01 | `/studio` | Workspace chooser / creator application; learner-to-creator entry; application pending/rejected/approved |
| STUDIO-02 | `/studio/[workspaceId]` | Actionable overview: drafts awaiting work, questions/review status; no fabricated analytics |
| STUDIO-03 | `/studio/[workspaceId]/courses` | Draft/published/unlisted/suspended course list and create draft |
| STUDIO-04 | `/studio/[workspaceId]/courses/[courseId]/details` | Metadata, outcome, prerequisites, level/language, cover, public preview; validation/autosave conflict |
| STUDIO-05 | `/studio/[workspaceId]/courses/[courseId]/curriculum` | Modules/lessons, keyboard reorder, types, availability, completeness; empty/unsaved/conflict |
| STUDIO-06 | Lesson editor under STUDIO-05 | Video direct upload/processing/captions, restricted text editor, resources; invalid file/retry/ready/version history |
| STUDIO-07 | `/studio/[workspaceId]/courses/[courseId]/offer` | One-time/free offer, currency/price/access terms and eligibility; changes cannot rewrite existing order snapshots |
| STUDIO-08 | `/studio/[workspaceId]/courses/[courseId]/preview` | Explicit creator preview banner; public/learner perspective; preview permission does not grant a purchase |
| STUDIO-09 | Course review/publishing panel | Checklist, submit revision, pending review, rejection reasons, publish/unlist, no client-only publish bypass |
| STUDIO-10 | `/studio/[workspaceId]/community` | Own posts/questions/replies and report escalation; not global moderation powers |
| STUDIO-11 | `/studio/[workspaceId]/sales` | Own order summaries, fees/refunds/status; no unrelated creator finances or unnecessary learner PII |
| STUDIO-12 | `/studio/[workspaceId]/settings` | Profile, members/roles, notification settings and provider-hosted payout onboarding/status |

Course editing requires explicit saved, saving, save-failed and conflicting-revision states. Draft changes do not silently replace approved paid content. Payout readiness and course review approval are distinct requirements.

## Operator screens

| ID | Route / surface | Main contents and required states |
| --- | --- | --- |
| OPS-01 | `/ops/reviews` | Creator/course submission queues, inspect revision, approve/reject with reason |
| OPS-02 | `/ops/reports` | Content/review/question reports, evidence access, action, appeal and reporter protection |
| OPS-03 | `/ops/purchases` | Restricted purchase/refund investigation; confirmed actions, provider state, audit log |
| OPS-04 | `/ops/access` | Diagnose grant/payment mismatches; bounded authorized corrections with reasons |
| OPS-05 | `/ops/jobs` | Failed webhook/outbox/media work and safe replay/reconciliation; no arbitrary SQL execution UI |
| OPS-06 | `/ops/audit` | Role-appropriate action history; sensitive fields redacted; no general access to learner private notes |

These may share list/detail templates, but operational actions must be real before a paid launch. Do not substitute 'contact the developer' for all refunds, moderation and entitlement repair.

## Critical journeys

### F-01: discover → buy → learn

Visitor opens category/search, evaluates COURSE-01 and previews a sample. Purchase intent survives sign-in. PAY-01 retrieves a server-authoritative offer and creates or safely reuses an appropriate pending order. Hosted Checkout collects payment. PAY-03 shows confirming until a verified provider event/reconciliation fulfills the order. Only then does Library/LEARN-01 expose paid content. Refresh, delayed payment, duplicate callback, cancellation and an already-owned course have deliberate behavior. Never require a second payment because the webhook is slow.

### F-02: free enrollment and returning learner

An authenticated learner enrolls in a permitted free course through a server operation. The library gains enrollment/access without a fake paid order. Starting the course selects the first available lesson. On return, Continue learning opens the latest appropriate unfinished lesson and saved position, respecting changed course availability. Completing a lesson updates progress and offers the next lesson without unexpectedly autoplaying a different course.

### F-03: creator draft → approved publication

A user creates/applies for a workspace, obtains required role/approval and completes provider onboarding before paid sales. They create a draft, add curriculum and direct-upload media. Browser upload completion is not media readiness; processing/captions/resources must be validated. Preview is private. Submit creates a reviewable revision. Operator approval and publishing checks move the public version into the catalog. A later revision keeps the currently published version stable until approved. Rejection includes actionable reasons.

### F-04: question → response → report

An entitled learner asks a lesson-context question. The creator receives a preference-respecting notification and replies. Learners can report abusive or misleading content. Reports enter an operator queue; hiding/removal and appeal have recorded reasons. Public responses do not expose private notes, email addresses or reporter identity.

### F-05: refund, unlisting and suspension

A learner requests support/refund from their own purchase. An authorized operator follows the reviewed policy and provider workflow. Provider-confirmed changes update financial records and only the related grant. Another active grant still provides access. Ordinary unlisting stops new sales but preserves valid access. A safety/legal suspension follows separate communications/access/refund decisions; show a useful state instead of a broken player.

### F-06: interrupted work

Expired login preserves safe intent but does not submit payments or publish automatically after reauthentication. Upload processing failures can be retried without losing the curriculum. Progress and note save errors are visible and retryable. Studio revision conflicts preserve local input and offer reload/reconcile, not silent last-write-wins data loss.

## Universal state matrix

For every applicable screen review: anonymous; signed in; correct role; wrong role; no data; slow request; recoverable error; offline/interrupted; expired session; stale/conflicting data; suspended entity; keyboard navigation; long content; reduced motion; mobile keyboard/safe areas. Label a state `not applicable` with a reason rather than producing pointless screenshots.

## Reference-to-screen evidence

Do not guess Mobbin IDs for these routes. During REF-001/REF-002, record exact observed source paths and what each contributes. Many music screens will be discarded or grouped as variants. Studio, moderation, offer terms, progress and commerce operations require new course-specific design. A complete route map is not a set of approved wireframes and must never be reported as such.
