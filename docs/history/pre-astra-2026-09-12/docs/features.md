# Features and acceptance

Scope is staged. A listed future feature is not permission to scaffold it. Route details live in [screens and flows](screens-and-flows.md); task status lives only in [tasks](tasks.md).

## M0 — reviewable course UI

| Feature | Required acceptance |
| --- | --- |
| Learner shell | Desktop rail and intentional mobile navigation; actual links, browser Back and active state; no giant all-screen component |
| Discovery | Original/licensed fixture covers, small editorial shelves, clear course titles/creator/effort, browse/search entry; honest demo labeling |
| Course detail | Outcome, teacher, price/access summary, curriculum, preview; clear locked/owned/in-progress variants without fake purchase behavior |
| Lesson workspace | One sample video or text lesson, curriculum, previous/next and visible resume/progress fixture states; only licensed public sample media |
| Responsive states | Readable at 390px and 1440px; keyboard focus; loading/empty/error examples for the slice; screenshot evidence |

This milestone must run without Supabase, Stripe, or Mux credentials. Actions either work locally as documented demo behavior or are clearly unavailable; no button claims to buy, persist to a backend, or publish when it does not.

## M1 — real free-course alpha

| Feature | Required acceptance |
| --- | --- |
| Identity | Supabase email OTP, expiry/resend/rate-limit handling, safe return path, verified server identity; one account may learn and create |
| Creator ownership | One owner per workspace; two-creator adversarial tests; client input cannot assign ownership or operator status |
| Draft authoring | Course metadata, modules, stable lesson IDs, simple Markdown/text, files/video, explicit save feedback and conflict handling |
| Publication | Server-controlled draft → submitted → published or changes requested; submitted/published content locked against creator edits; operator reasons recorded |
| Public catalog | Published safe metadata only; useful direct URLs and metadata; drafts/private payloads absent from HTML, RSC, API and search |
| Enrollment | Idempotent free-course grant for authenticated learners; bookmarks never grant access |
| Learning | Server-authorized video/text/resources, accessible controls, next lesson, clear errors; direct resource/token requests cannot bypass access |
| Library/progress | Active-access courses separate from saved items; correct resume position; completion separate from watched position; stale updates handled |
| Minimal operations | Review queue, restricted access diagnosis, basic audit; no requirement for a full admin product |

M1 is done only when a real test creator publishes a course and a different test learner finds, enrolls, learns, leaves, and resumes it. A set of disconnected polished screens is not this milestone.

## M2 — paid pilot

| Feature | Required acceptance |
| --- | --- |
| Connect onboarding | Provider-hosted flow and current selling/payout states; platform business model and supported markets approved |
| Course checkout | Server-resolved price/currency/terms, one pending order safely reused, owner-only status; no client amount or success-URL trust |
| Fulfillment | Verified provider status; short atomic database update; duplicate/concurrent/out-of-order/delayed cases tested; grant source unique |
| Refund/support | Provider-confirmed refund state, correct charge-model handling, source-specific access change, ordinary unlisting distinct from suspension |
| Private notes | Author-only text and optional timecode, explicit save/conflict/retry; neither course owner nor other learners can read notes |
| Lesson questions | One-level course/lesson-scoped questions/replies, creator response, report/hide actions; no realtime infrastructure requirement |
| Buyer/creator operations | Own purchases, receipt/support links; creator's own sales summaries; operator reconciliation and exceptions |
| Trust and operations | Real content/assets, working contact/report paths, privacy/terms, backup/restore evidence, limits, monitoring and named support owner |

Use Stripe receipts and in-app status initially. Custom email campaigns and a notification pipeline are not prerequisites. Production auth email still requires deliberate SMTP/domain/deliverability configuration.

## M3 — separate, optional assignments

Creator spaces/announcements, eligible course reviews, creator follows, team members, subscriptions/bundles, course versioning, assessments, AI study tools, dedicated search, live events, native apps, offline media, and affiliates each need a concrete user need, data/access policy, and bounded task. Promote one at a time.

Reviews must not be fabricated or suppress legitimate criticism; free-course participation is not a verified purchase. Do not use completion badges to imply regulated qualifications.

## Definition of complete

A feature includes its relevant permission checks, real persistence, failure states, accessible interaction, tests, and handoff evidence. Design approval and functional verification are separate. A fixture is marked `UI_ONLY`, not `IMPLEMENTED_BACKEND`. A provider sandbox test is not a live-market eligibility approval.
