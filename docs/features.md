# Feature scope and acceptance

Status: proposed. Screen IDs are defined in `screens-and-flows.md`; execution order is in `tasks.md`. 'Launch' means required before a public paid release, not authorized for implementation now.

| Capability | Launch contract / acceptance | Later, not implicit scope |
| --- | --- | --- |
| Discovery | Curated shelves and category results; only published, permitted catalog items; useful empty states; no fabricated popularity | Learned recommendations, personalized ranking models |
| Search | Course and creator results; query/filter/sort in URL; language, level, topic and paid/free filters; keyboard usable; no private lesson/transcript leakage | Cross-course semantic or transcript search with entitlement filtering |
| Course evaluation | Outcome, creator, level, prerequisites, effort, curriculum, preview, price/currency, access/support/refund terms and last substantive update visible | Complex comparison tools, gifting |
| Creator profile | Original identity/bio/credentials evidence, courses, follow action and community entry; distinguish provider payout verification from educational credibility | Custom domains and creator site builders |
| Identity | Email OTP and optionally Google; safe return path; session expiry/retry; one user may own courses and belong to multiple creator workspaces | Enterprise SSO, native identity bridges |
| Offers and checkout | One course / one creator / one purchase; server-validated price; hosted payment collection; pending, canceled, failed and fulfilled UI | Memberships, bundles, affiliate commissions, multi-seller cart |
| Library | Separate Owned/Enrolled, Saved and Spaces; continue-learning; progress; removed-from-sale course remains usable for existing buyers unless suspended | Offline downloads, shared household accounts |
| Lesson player | Captions, speed, keyboard controls, curriculum, meaningful next action, resources; signed media; text/resource protection; errors/retry | Custom DRM, native offline player, live streaming |
| Progress | Resume position and explicit completion persist per learner/lesson; cross-device reconciliation; retry never loses the confirmed value | Adaptive learning, advanced assessment |
| Notes | Private text notes, optional timecodes, save/retry state; author-only access | Shared notebooks, AI-generated study guides |
| Questions | Lesson/course context, replies, creator response identity, report/moderation; access checked on read/write | Open DMs, anonymous posting, general social network |
| Creator community | Simple creator-scoped posts and replies; members reached from Library/creator pages; access derived from defined enrollment policy | Standalone paid groups, chat channels, points/leaderboards |
| Reviews | One review per eligible learner/course; honest eligibility label; report handling; owner cannot silently delete criticism | Complex review weighting/reputation |
| Creator onboarding | Application/review, workspace membership, provider-hosted payout setup; clear pending/restricted states | Self-serve unrestricted publishing |
| Course studio | Draft metadata, ordered modules/lessons, direct uploads, caption/resource management, preview, explicit publish submission, saved/conflict state | Bulk imports, coauthor royalties, complex quiz builder |
| Creator sales | Own-course order summaries and fee/refund status; no other creator's data or unnecessary learner PII | Predictive revenue tools, external CRM automation |
| Operator tools | Review queues, publish/suspend, reports/appeals, refund requests, entitlement reconciliation, reasoned audit trail | General enterprise backoffice |
| Notifications | Transactional enrollment, account, creator-review and reply notifications; user preferences; no notification spam | Push campaigns, marketing automation |
| Settings and support | Profile, security, notification settings, receipts, data request/deletion entry and help/contact/report paths | Organization billing, white labeling |

## Cross-cutting behavior

Every stateful action needs idle, pending, success and recoverable-error behavior. Prevent duplicate submissions and preserve input. Unauthorized, expired, suspended, empty and offline/interrupted states are part of the spec, not polish tasks after the happy path.

All creator-scoped operations require workspace permission; all paid content requires an active grant or an intentionally public preview. An operator role must not provide casual access to private notes. Search, caches, storage URLs and generated HTML must respect the same boundaries as APIs.

## Key acceptance scenarios

A visitor can browse and preview without forced signup. A signed-in nonbuyer sees the true offer and cannot retrieve the paid lesson body, transcript, media token or resources through another endpoint. A buyer whose payment is still settling sees 'Confirming purchase', not a fake success or a second charge prompt. A verified payment produces exactly one fulfilled order/grant despite duplicate deliveries.

A returning learner resumes on another device. Marking a lesson complete is not undone by an older progress event. A creator can reorder lessons with keyboard controls and receives an honest upload-processing state. Editing published content creates a reviewable revision and preserves stable lesson identity. A suspended creator cannot continue publishing via direct API requests.

An unlisted course remains in a valid buyer's library. A refunded purchase revokes only its associated grant; another active grant remains effective. A question report reaches a real moderation queue with a reason and status. Blank catalog, missing captions, expired media token, upload failure and failed payment all have intentional screens.

## Scope escalation rule

Anything in the 'Later' column requires a task, design states, data/access implications and owner approval before implementation. The mere presence of an extensible entity in `data-model.md` does not authorize the UI or business model that might eventually use it.
