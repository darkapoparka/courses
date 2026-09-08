# Tasks — one bounded slice at a time

Updated 2026-09-09. Current mode: reference inspection and documentation. No application task is implemented by this revision. An explicit implementation assignment authorizes its normal edits/checks, not the entire backlog.

Statuses: DOCUMENTED, PARTIAL, READY, TODO, BLOCKED_DECISION, IMPLEMENTED, VERIFIED, OWNER_APPROVED. READY means specified and ready to assign, not executed. Update actual evidence here; do not create a second TODO file.

## Planning and first UI

| ID | Task | Status | Dependencies / acceptance |
| --- | --- | --- | --- |
| PLAN-004 | Refresh reference audit and simplify canonical docs | DOCUMENTED | Updated archive preserved; product, architecture, domain, workflow and build handoff revised without product code or provisioning |
| REF-001 | Catalog-wide visual review | PARTIAL | 17 identities viewed: 16 high-resolution + one standard original; exact ledger rows. Metadata counts for all 58 flows checked. Remaining 142 images and full recording playback are not marked reviewed. |
| REF-002 | Source/state review for the assigned UI family | READY | Use existing ledger anchors; open exact local originals, verify needed measurements/state, record course adaptation. No redownload or prototype-derived guessed mapping. |
| BOOT-001 | Initialize new `web/` application | READY TO ASSIGN | Owner adopts baseline and assigns task; official CLI/help/version record; minimal Next/TS/Tailwind/lint/pnpm; pinned runtime/lockfile; actual type/lint/build/smoke |
| UI-001 | Learner shell and Home | TODO | BOOT-001 + relevant REF-002 (VIS-05/06/07). 390/1440 fixture UI, original/licensed assets, meaningful navigation, loading/empty/error, keyboard/screenshots. Unbuilt destinations clearly unavailable, not 404/fake-success. |
| UI-002 | Course detail and explicit preview | TODO | Reviewed UI-001 direction + VIS-02. Outcome/creator/offer/curriculum; locked/owned/resume variants; no fake checkout; responsive evidence |
| UI-003 | Lesson workspace and Library fixtures | TODO | UI-002 + VIS-09/11/12/13/15. Licensed sample, curriculum/back/next, study states, enrolled vs saved; no backend claims |
| UI-004 | Search/category and creator fixtures | TODO | Reviewed UI-001 + VIS-03/08/10/14. URL search/filter, useful results/empty/error, creator links; no invented popularity |
| SLICE-000 | Accept M0 discover → course → lesson | TODO | UI-001–003. Works locally without provider credentials; actual browser/keyboard evidence and owner review |

The initial handoff assigns only BOOT-001, the relevant REF-002 and UI-001. It does not require every image, all-page mockups, future table scaffolding, or the rest of M0 in one commit. Local reference re-opening is for the actual implementation state, not restarting this audit.

## M1 — real free-course alpha

| ID | Task | Status | Depends on | Acceptance |
| --- | --- | --- | --- | --- |
| DB-001 | Local schema, owner permissions, RLS, seed/types | TODO | BOOT-001 | Only current slice tables; constraints/grants; anonymous/two-learner/two-creator negative tests, not service-key-only queries |
| AUTH-001 | OTP and verified server identity | TODO | DB-001 | Safe return, expiry/resend/rate limits, cookie/private-cache checks; no self-assigned ownership/operator status |
| CAT-001 | Safe real catalog queries | TODO | DB-001, UI-001/002 | Published metadata/creator/curriculum; no paid/draft payload in HTML/RSC/API/search; direct URLs/unavailable states |
| CAT-002 | Real category/search queries | TODO | CAT-001, UI-004 | Bounded indexed queries, pagination, URL filters and honest empty/error |
| STUDIO-001 | Draft metadata/curriculum editor | TODO | DB-001, AUTH-001 | Small tabbed editor, stable lesson IDs, keyboard reorder, version-checked saves; ownership/submitted-lock tests and visual review |
| MEDIA-001 | Direct video ingest/private resources | TODO | STUDIO-001, test setup assigned | Ownership/quota/type checks, verified processing/captions, retries, private storage, wrong-workspace denial |
| PUBLISH-001 | Minimal operator review/locked publishing | TODO | STUDIO-001, MEDIA-001 | Submit exact version; approve/reject reasons; published/unlisted edit lock; atomic audited correction; no CMS revision engine |
| ACCESS-001 | Free grants/shared lesson access | TODO | DB-001, AUTH-001, CAT-001 | Idempotent grant; explicit preview; suspension/unlisting; consistent video/text/transcript/resource protection |
| LEARN-001 | Real lesson/library/progress | TODO | ACCESS-001, MEDIA-001, UI-003 | Resume/rewind/completion/version conflicts, protected payloads and tokens; actual browser/mobile playback evidence |
| SLICE-001 | Complete free-course journey | TODO | PUBLISH-001, LEARN-001, CAT-002 | Test creator publishes, another learner discovers/enrolls/learns/leaves/resumes; adversarial checks recorded |

Curated creator/operator setup can be intentionally small/manual; ownership and review enforcement cannot be pretend. Do not install or provision commerce vendors during DB-001. Only the needed tables from the logical model belong in each migration.

## M2 — commerce and paid-pilot support

| ID | Task | Status | Depends on | Acceptance |
| --- | --- | --- | --- | --- |
| PAY-001 | Business/charge decision and sandbox Connect | BLOCKED_DECISION | Actual entity/model, DB-001 | Merchant/account/country/fee/refund responsibility; selected API model; hosted onboarding/readiness; no live activation |
| PAY-002 | Orders and hosted Checkout | TODO | PAY-001, ACCESS-001 | Server price/terms, immutable snapshots, in-flight concurrency, idempotency and uncertain-session recovery |
| PAY-003 | Atomic webhook fulfillment and reconciliation | TODO | PAY-002 | Signature/environment/account; durable effect before ack; rollback/retry/duplicate/out-of-order tests; measured latency/queue trigger; no custom outbox/worker framework |
| PAY-004 | Refund/dispute/source-grant handling | TODO | PAY-003, approved policy | Current provider state, correct fee/transfer treatment, partial/full distinction, other grants retained; stale paid event cannot restore refunded access |
| LEARN-002 | Private notes | TODO | LEARN-001 | Author-only text/timecode, version conflict/retry, own export after access loss; creator-negative test |
| SOCIAL-001 | Lesson questions/replies/reports | TODO | LEARN-001, reviewed design | Entitled course context, one reply level, creator response, operator hide/report; no realtime/feed/notification bus |
| OPS-001 | Minimal purchase/access/report support | TODO | PAY-004, SOCIAL-001 | Restricted diagnosis/reconcile/provider links, reasons/audit, useful contact path; no finance/SQL/job dashboard clone |
| SETTINGS-001 | Profile/purchases/help/privacy requests | TODO | AUTH-001, PAY-004 | Own receipts/support, safe profile edits, verified data-request workflow and actual policy copy |
| SLICE-002 | Paid lifecycle verification | TODO | PAY-004, LEARN-002, SOCIAL-001, OPS-001 | Sandbox buy→confirm→grant→learn→refund; callback outage/replay, malicious IDs and stale events tested |

Custom email campaigns, creator spaces/reviews/follows and team management are not paid-pilot dependencies. Production auth email delivery and a working support process still are.

## Pilot and release

| ID | Task | Status | Required evidence |
| --- | --- | --- | --- |
| TRUST-001 | Commercial/privacy/asset-rights review | TODO | Actual entity/markets, provider eligibility, merchant/tax/refunds/access, age, retention, rights and support owner |
| QA-001 | Visual/responsive/accessibility acceptance | TODO | Reviewed course screens, 320px/tablet/wide/zoom, keyboard/captions, real iOS/Android checks; residual issues explicit |
| QA-002 | Security/reliability acceptance | TODO | SLICE-002; API/RLS/cache/upload/payment negative tests, secret/dependency review |
| OPS-002 | Monitoring/budgets/restore/recovery | TODO | Quotas/alerts, named operator, daily reconciliation, tested restore and migration-compatible rollback |
| CONTENT-001 | Curated real course supply | TODO | Consent/licensed media/covers, useful curriculum/captions/previews, truthful claims |
| PILOT-001 | Controlled usability/business pilot | TODO | QA-001/002 + OPS-002 + CONTENT-001 + TRUST-001; observe find/evaluate/start/resume/publish and actual costs/support |
| LAUNCH-001 | Production/live-payment release | BLOCKED_DECISION | Required pilot gates and explicit owner approval; separate configuration, no fake data, support/rollback ready |

## Deferred, not scaffold instructions

Memberships, bundles, global subscription, multi-seller carts, affiliates, rich course versioning, teams, spaces/feeds, reviews/follows, live sessions, DMs, assessments, AI tutors, native/offline, dedicated search and managed job infrastructure each need a demonstrated need and a bounded new assignment.

## Evidence format

Record ID; date/assignee; explicit assignment; starting commit; scope; changed files/commit; actual checks/results; source/design evidence; status; blockers; next task. Fixtures are not backend completion, provider sandbox is not live eligibility, and documents are not visual approval. Parallel tasks need nonconflicting file ownership and settled shared contracts.

Historical PLAN-001–003/FOUND/UX/global mockup gates and outbox-oriented tasks remain in Git history. This is the current backlog. UI-001–004 replace the all-page design prerequisite; PAY-003 replaces the earlier custom-worker proposal.
