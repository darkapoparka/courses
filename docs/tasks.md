# Tasks — single execution backlog

Baseline: 2026-09-08. Active mode: documentation/reference planning. Tasks are not permission to implement. Explicit owner authorization and dependencies are required before changing application code, services or deployment.

## Status vocabulary

`DRAFTED` means a document/recommendation exists, not approved. `RECORDED` means repository evidence was read, not independently rerun. `TODO` means not started. `BLOCKED_APPROVAL` needs an explicit decision. `IN_PROGRESS` requires an assigned bounded task. `VERIFIED` requires recorded checks. No application task is currently marked implemented or verified.

## Planning and reference gates

| ID | Task | Status | Depends on | Acceptance / evidence |
| --- | --- | --- | --- | --- |
| PLAN-001 | Audit repo and acquisition records | RECORDED | Existing main commit | `reference-audit.md` identifies exact inspected files/base commit, archive totals, premature prototype/fallback mappings and visual/runtime limits |
| PLAN-002 | Research current stack and provider constraints | DRAFTED | Product request | `tech-stack.md` and dated primary sources; recommendation versus observed versions/eligibility clearly separated |
| PLAN-003 | Establish product/agent specifications | DRAFTED | PLAN-001, PLAN-002 | Root AGENTS and coherent docs map, scope, design/route/data/access/commerce/test contracts; no application changes |
| REF-001 | Visually catalog the existing saved references | TODO — NEXT LOCAL TASK | PLAN-001 | Open saved index/images; account for 159 screen records, 58 flow records and recorded step sets; ledger separates inspected/duplicate/not relevant/not inspected; no redownload or coded clone |
| REF-002 | Deep-review course-relevant pattern families | TODO | REF-001 | Exact source paths, actual viewport/app bounds, relevant motion/state and adaptation rationale for discovery/detail/creator/library/player/auth patterns; no guessed ID mapping |
| DEC-001 | Approve stack, scope and business assumptions | BLOCKED_APPROVAL | PLAN-002, PLAN-003 | Owner decisions recorded in `decisions.md`; unresolved commercial matters remain explicit, not silently assumed |
| UX-001 | Design five course golden screen families | TODO | REF-002; explicit design authorization | Home, Course detail, Lesson, Creator profile and Studio curriculum editor, desktop/mobile; real course semantics and core states; owner review recorded |
| UX-002 | Complete launch screen/state specifications | TODO | UX-001 | Remaining `screens-and-flows.md` families mapped to reusable components and states; checkout/operator/new course-only screens intentionally designed |
| TRUST-001 | Confirm legal, provider and asset-rights requirements | TODO | Proposed markets/model | Actual entity, markets, age policy, seller/charge model, refunds/tax, Stripe eligibility, reference/production asset rights and operating responsibilities reviewed before live launch |

REF-001/REF-002 produce documentation/evidence, not new product components. A flow catalog can classify irrelevant Apple flows without implementing them. Do not reopen the superseded task of recreating all 159 screens or all 58 music journeys.

## Phase A — approved foundation and free-course vertical slice

| ID | Task | Status | Depends on | Acceptance |
| --- | --- | --- | --- | --- |
| BOOT-001 | Initialize the new `web/` application | TODO | DEC-001, explicit implementation authorization | Current official CLI/help reviewed; stable compatible versions/runtime/package manager pinned; archive unchanged; app root and generated docs configured; actual type/lint/build checks |
| FOUND-001 | Tokens, accessible primitives and learner shell | TODO | BOOT-001, approved UX-001 shell | Approved desktop/mobile hierarchy, real links/back behavior, no generic theme or redundant player; screenshot/keyboard evidence |
| DB-001 | Identity, workspace and permission foundations | TODO | BOOT-001 | Versioned SQL/types; memberships, safe profiles, grants/RLS; adversarial two-tenant tests; no client role escalation |
| AUTH-001 | Email OTP and identity/session flows | TODO | DB-001, approved AUTH screens | Safe return paths, expired/rate-limited states, verified server identity and private caching checks; optional Google only if configured/approved |
| CAT-001 | Catalog/course/creator public projections | TODO | DB-001, approved DISC/COURSE/CREATOR screens | Published-safe metadata, real course fixtures, direct URLs/metadata, draft/suspension protection; no paid text in public payloads |
| CAT-002 | Search and category browsing | TODO | CAT-001 | Indexed bounded search, URL filters, meaningful empty/error states, safe fields only |
| STUDIO-001 | Draft authoring and curriculum | TODO | DB-001, AUTH-001, approved STUDIO screens | Metadata/modules/stable lesson IDs, accessible reorder, restricted text/resources, save/conflict/revision behavior |
| MEDIA-001 | Managed video ingest and private resources | TODO | STUDIO-001, approved provider choice | Direct uploads, server/provider readiness, captions/resources, quotas and retry; cross-workspace asset tests |
| PUBLISH-001 | Course review and publication | TODO | STUDIO-001, MEDIA-001 | Reviewable revision, operator approve/reject reasons, atomic published projection and unlisting policy; no client publish bypass |
| ACCESS-001 | Entitlement policy and free enrollment | TODO | DB-001, CAT-001 | Idempotent free grant/enrollment, explicit public previews, reusable protected-content access checks and negative tests |
| LEARN-001 | Lesson workspace, library and progress | TODO | FOUND-001, ACCESS-001, MEDIA-001, approved LEARN/LIB screens | Video/text/resources protected, resume/completion ordering, owned versus saved distinction, error/expiry/caption/keyboard evidence |
| SLICE-001 | Verify one complete free-course journey | TODO | PUBLISH-001, LEARN-001, CAT-002 | Real test creator publishes one approved course; learner discovers/enrolls/learns/resumes; operator can investigate; entire flow recorded |

Do not implement every table or future feature during BOOT-001. Foundations should support the next vertical slice, not an untested giant scaffold. CAT/STUDIO/LEARN may use explicit fixtures during UI work, but fixtures cannot be reported as backend completion.

## Phase B — verified commerce and learner support

| ID | Task | Status | Depends on | Acceptance |
| --- | --- | --- | --- | --- |
| PAY-001 | Approve/implement sandbox Connect account and charge model | TODO | DEC-001, charge-model decision, DB-001 | Provider/country/role relationships documented; hosted creator onboarding; restricted account states; no live activation |
| PAY-002 | Order snapshots and hosted checkout | TODO | PAY-001, CAT-001, ACCESS-001, approved PAY screens | Server price/currency, existing access/in-flight checks, immutable offer terms, idempotent external creation/recovery |
| PAY-003 | Webhooks, fulfillment, outbox and reconciliation | TODO | PAY-002 | Raw signature verification, duplicate/out-of-order/delayed tests, transactional grant effect, honest pending UI and safe replay |
| PAY-004 | Refunds, disputes and source-specific access changes | TODO | PAY-003, approved policies | Correct charge-model financial adjustments; partial/full distinction; other grants retained; operator reasons/audit |
| LEARN-002 | Private notes and learning resources UX | TODO | LEARN-001 | Author-only notes, timecodes, save/conflict/retry; protected transcript/download tests |
| SOCIAL-001 | Lesson questions and creator space posts | TODO | LEARN-001, DB-001, approved SOC screens | Defined course/space membership, replies, author identity, reports, no note/PII leakage |
| TRUST-002 | Reviews, moderation queues and appeals | TODO | SOCIAL-001, PUBLISH-001 | Review eligibility, no creator suppression of legitimate criticism, scoped operator actions/report privacy/audit |
| OPS-001 | Purchase/access/job operational tooling | TODO | PAY-003, PAY-004 | Safe investigation/reconciliation/replay with role checks and reasons; no arbitrary SQL UI |
| NOTIFY-001 | Transactional communications and preferences | TODO | Outbox foundation, approved provider/policies | Enrollment/review/reply messages, retry/idempotency, privacy scrubbing, preferences; no test messages to real users |
| SETTINGS-001 | Account/purchase/privacy/help flows | TODO | AUTH-001, PAY-004, TRUST-001 | Own receipts/support requests, data-request/deletion workflow and reviewed notices; identity verification where needed |
| SLICE-002 | Verify the full paid-course lifecycle | TODO | PAY-004, LEARN-002, OPS-001 | Sandbox buy→pending→grant→play→resume→refund; replay and malicious ID attempts; recorded browser/database/provider evidence |

## Phase C — pilot and launch readiness

| ID | Task | Status | Depends on | Acceptance |
| --- | --- | --- | --- | --- |
| QA-001 | Responsive/visual/accessibility acceptance | TODO | Launch UI families implemented and approved | Matched course-design evidence, mobile browser/keyboard/caption/zoom checks, documented intentional differences |
| QA-002 | Security and reliability acceptance | TODO | SLICE-002, TRUST-002 | Permission/cache/upload/webhook tests and dependency/secret review; residual risks and failed checks recorded |
| OPS-002 | Monitoring, budgets, backup/recovery and runbooks | TODO | Integration slices | Alert ownership, spend quotas, job/payment reconciliation, tested restore/recovery procedure and rollout compatibility |
| CONTENT-001 | Curated real pilot content | TODO | TRUST-001, publishing workflow | Consenting real creators, licensed assets, truthful offers/credentials, usable previews/captions; no fake social proof |
| PILOT-001 | Invite-only usability and business pilot | TODO | QA-001, QA-002, OPS-002, CONTENT-001, required eligibility | Observe discover/evaluate/buy/resume/publish; collect feedback/actual costs; fix critical failures; no unsupported superiority claims |
| LAUNCH-001 | Explicit release decision | BLOCKED_APPROVAL | Pilot evidence and all launch gates | Owner approves production deployment/live payments; supported markets/policies/support ready; known risks accepted explicitly |

## Deferred backlog — not implementation instructions

Memberships/bundles/global subscriptions, affiliates/multi-seller carts, dedicated search/semantic retrieval, AI study tools, graded assignments/quizzes, live sessions, open messaging, native apps/offline downloads, custom creator domains and complex community gamification require new scoped tasks and decisions. Do not add them opportunistically while working on a launch task.

## Updating a task

Record task ID, authorized scope, assignee, current status, dependency evidence, branch/commit, actual checks, design approval where applicable and next action. Link implementation detail to the document that owns it rather than duplicating requirements here. Multiple agents may work in parallel only on explicitly nonconflicting bounded tasks with shared contracts settled.

A document status can advance independently of implementation. A blocked visual review must not be disguised as acquired/verified, and a dependency-ready task is still not permission to run it without the owner's current assignment.
