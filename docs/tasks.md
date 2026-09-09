# Tasks — one bounded slice at a time

Updated 2026-09-09. Current mode: BOOT-001 / REF-002 / UI-001 implemented and locally verified; owner visual review pending. An explicit implementation assignment authorizes its normal edits/checks, not the entire backlog.

Statuses: DOCUMENTED, PARTIAL, READY, TODO, BLOCKED_DECISION, IMPLEMENTED, VERIFIED, OWNER_APPROVED. READY means specified and ready to assign, not executed. Update actual evidence here; do not create a second TODO file.

## Planning and first UI

| ID | Task | Status | Dependencies / acceptance |
| --- | --- | --- | --- |
| PLAN-004 | Refresh reference audit and simplify canonical docs | DOCUMENTED | Updated archive preserved; product, architecture, domain, workflow and build handoff revised without product code or provisioning |
| REF-001 | Catalog-wide visual review | PARTIAL | 17 identities viewed: 16 high-resolution + one standard original; exact ledger rows. Metadata counts for all 58 flows checked. Remaining 142 images and full recording playback are not marked reviewed. |
| REF-002 | Source/state review for the assigned UI family | VERIFIED | Use existing ledger anchors; open exact local originals, verify needed measurements/state, record course adaptation. No redownload or prototype-derived guessed mapping. |
| BOOT-001 | Initialize new `web/` application | VERIFIED | Owner adopts baseline and assigns task; official CLI/help/version record; minimal Next/TS/Tailwind/lint/pnpm; pinned runtime/lockfile; actual type/lint/build/smoke |
| UI-001 | Learner shell and Home | VERIFIED | BOOT-001 + relevant REF-002 (VIS-05/06/07). 390/1440 fixture UI, original/licensed assets, meaningful navigation, loading/empty/error, keyboard/screenshots. Unbuilt destinations clearly unavailable, not 404/fake-success. |
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

## BOOT-001 / REF-002 / UI-001 final local evidence - 2026-09-09

Assignment: the owner explicitly approved the baseline and only these three tasks, then corrected the visual direction to closely retain Apple Music's appearance. Work was performed through Remote Desktop Commander on `DESKTOP-LMGQO7V`, Windows 11, in `J:\courses`, branch `astra/implementation`. Starting and freshly fetched documentation baseline: `309ad14e564996fffcf73d7f57aa0d1406d2d550`.

Bootstrap continued the official `create-next-app@16.3.4` scaffold, not a second scaffold: App Router, strict TypeScript, `src/`, Tailwind, ESLint and pnpm, generated `app-tw-empty` template. CLI help and stable package/peer information were inspected during bootstrap; the archive lockfile was not reused. Exact installed pins: Node 24.20.0 (app-scoped, global runtime unchanged), pnpm 11.24.0, Next 16.3.4, React/React DOM 19.2.8, TypeScript 5.9.3, Tailwind 4.3.3, ESLint 9.39.5. `web/pnpm-lock.yaml` is the active app lockfile. The package manifest records all other exact versions.

The first landscape-banner interpretation was rejected and superseded by the portrait Home composition. The earlier claim that another person/session was editing Courses was an unsupported inference and is withdrawn; the owner confirmed no other work on Courses. It is not a blocker. Files were inspected and continued, not reset or stashed. Pre-correction source copies were retained under the computer's temporary `courses-fidelity-verify-20260909/before/` directory.

| Actual final command | Result / evidence |
| --- | --- |
| `pnpm install --frozen-lockfile` | Exit 0; `docs/evidence/ui-001-final/locked-install.txt` |
| `pnpm typecheck` | Exit 0; generated route types + strict TypeScript |
| `pnpm lint` | Exit 0; zero warnings allowed |
| `pnpm build` | Exit 0; production Home, not-found and icon routes only |
| `pnpm audit --json` | Exit 0; zero reported advisories at verification time |
| `pnpm test:e2e` with `COURSES_TEST_PORT=3117` | 20 passed on the production build; `browser-tests.txt` |

The final run is recorded in `docs/evidence/ui-001-final/verification.json`, including commands, exit codes, durations and SHA-256 hashes. Source, test, config, lockfile and asset inputs were unchanged during verification. An initial logging wrapper stopped on Windows console encoding after typecheck; the full final run was repeated successfully with UTF-8 log files, not inferred from the partial run.

Browser evidence covers 1440px desktop and 390px mobile Chromium: visitor/returning state, Back/reload, local images and no external requests, unavailable navigation, course/editorial shelf buttons and keyboard, dialog focus trap/Escape/restoration, empty/error retry and recovery, streamed loading, not-found recovery, axe scans, skip link/focus, reduced motion and 320/768/1920px overflow checks. Selected desktop layout anchors are checked within 1.5px of normalized VIS-07 source measurements. These tests do not assert full-image pixel identity or owner acceptance.

Astra visually opened the saved galleries and VIS-05/06/07 originals; the exact paths, Mobbin-footer exclusion and final measurements are in `reference-review/ledger.md`. Final desktop/mobile visitor, learner, dialog, focus, empty, error and loading captures are under `docs/evidence/ui-001-final/`. Full desktop/mobile images and additional scrolled mobile views were inspected. Older `ui-001/` and `ui-001-correction/` images are retained locally and ignored, not current baselines.

Current limitations: this is not literally pixel-identical to Apple Music. Course branding/artwork/copy, available navigation, learner-only progress, no player/subscription banner, platform-native font rendering and the independently adapted mobile shell differ intentionally. No live identity, course pages, lessons, purchases or persistence are claimed. ESLint 9 is deprecated but retained for the inspected scaffold/plugin compatibility; review its supported upgrade path in a bounded maintenance task. Real-device Safari/Android, complete zoom/screen-reader acceptance and final visual approval remain outstanding.

Changed intended paths: `web/`, root `README.md`, `docs/decisions.md`, `docs/development.md`, `docs/design-system.md`, this task record, the reference ledger and final evidence. This entry belongs to the local implementation commit on `astra/implementation`; the final handoff reports its exact hash. `git diff 309ad14 -- apple-music-clone` was empty. No push, merge, deployment, provider provisioning or payment activation was performed. The development server remains at `http://127.0.0.1:3100`.

Status: technically VERIFIED, NOT_OWNER_APPROVED. Stop here for Home/shell visual review; do not advance UI-002 or the remaining backlog without the next assignment.

## UI-001 measured fidelity refinement — 2026-09-09

Owner assignment: continue working toward a pixel-perfect Apple Music appearance. Starting commit `b731fff9929ecacb1f6043ac0135ed388ef6e87d`, clean `astra/implementation` on `DESKTOP-LMGQO7V`, `J:\courses`. This is refinement of the assigned Home/shell, not authorization for more routes or backend work.

Reopened the exact VIS-07 original and compared it with the live app at 1440×903. Calibrated 45 Home-title and 60 shelf-title render candidates locally; selected the same system Arial family without adding or distributing fonts. Corrected sampled surface colors, navigation rhythm, card shadows, caption baselines/density, and accumulated square-shelf spacing drift. Ordinary covers now start at x=285/512/739/966/1193; the third shelf heading is near y=862 including its text offset. Portrait and first-square anchors retain the existing source-derived tolerance.

Removed fixture controls from the Home header and placed them in the disclosed preview footer; the fixture switches return to the top of Home. Reduced heavy editorial shading and redundant large titles. Desktop shelf arrows appear at artwork edges on hover or keyboard focus, remain visible on touch/mobile, and disappear when disabled at an end. Native disabled semantics remain; unbuilt destinations are still unavailable.

Actual verification: `pnpm typecheck`, `pnpm lint`, and `pnpm build` exited 0. The production browser suite on loopback port 3219 passed **24 tests**, with no retries. The initial run found two pointer-interception failures; a CSS stacking/pointer fix resolved them. A later end-state test waited for an intentionally hidden disabled button; its locator now includes hidden controls solely to verify disabled/invisible semantics. Click assertions were not forced or removed. Final logs are in `docs/evidence/ui-001-fidelity/`.

The suite retains visitor/learner, Back/reload, local-image/no-external-request, empty/error/loading recovery, keyboard, dialog focus, axe, not-found, responsive and reduced-motion checks. It adds all five cover positions, quiet-header/footer controls, selected surface colors, third-shelf position, and edge-control visibility/focus tests. Final source typecheck/lint were rerun after the test-locator change; production source did not change after its final build.

Visually inspected final desktop, mobile visitor/learner, mobile top/middle/bottom, keyboard controls and a source overlay. `docs/evidence/ui-001-fidelity/review.html` is a local-only comparison artifact with Courses/Reference/Overlay and scale controls; its toggles, 100% scale and image rendering were actually opened/tested. It references the preserved original rather than copying reference media into the application. No new source identity, recording playback or native-device acceptance is claimed.

`pixel-measurements.json` and `measure.py` disclose five specific regions and normalization. Mean absolute RGB error fell from 13.5037 to 7.4158 for Home, 38.3283 to 14.4517 for the common shelf heading, 15.6695 to 12.3150 for shared navigation, and 1.8470 to 0.8870 for the rail surface/shadow. The sampled white canvas is unchanged at zero. These are regional measurements, not a whole-screen similarity percentage or an assertion of zero differing pixels.

Residual differences remain: native glyph/icon rasterization; intentional course art, identity, metadata and unavailable destinations; no music player; extra learner progress; and mobile adaptation without a supplied mobile reference. Status: implemented and technically verified, **not a zero-difference image and not owner-approved**. Current evidence supersedes the previous `ui-001-final/` captures without overwriting them. No package, provider, archive, deployment, push or merge changes belong to this refinement.

## UI-001 course browsing and artwork continuation — 2026-09-09

Owner requested continued implementation because the placeholder-heavy Home did not deliver the intended Apple Music-for-courses experience. Continued the existing app on `astra/implementation` from clean commit `9dee4d984dcdd25646ace44103970f17eec79d97`, directly on `DESKTOP-LMGQO7V` in `J:\courses`. No second scaffold, branch reset, stash, or unrelated change.

Implemented a substantive Home pass: licensed photo-led editorial collections, distinct square course covers, 20 explicitly fictional course fixtures across five subjects, useful outcome/effort/level/example-price information, eight cross-subject starter picks, six short-course rows, topic tiles, and five subject shelves. Editorial cards, Browse, topic tiles, and the subject rail now have real Home anchors. Course covers and short-course rows open accessible sample-information disclosures instead of doing nothing. These disclosures are part of Home; no course-detail route, curriculum/player, enrollment, or checkout was implemented. UI-002–004 remain unassigned/TODO.

Continue learning remains first in the returning sample, with fictional progress and an explicit lesson-unavailable notice. No authentication, cookies, storage persistence, purchase success, or access grant is simulated. Shell, fixtures, cards, and Home composition remain server-rendered by default; shelf interaction and Radix Dialog disclosures are small client boundaries. No dependencies or backend integrations were added. The accumulated CSS overrides were replaced by a cohesive responsive stylesheet.

VIS-07 and VIS-05 were reopened at readable size from the exact high-resolution archive paths recorded in the ledger. Twelve new licensed photographs/renders and one derivative of the already credited strength photo are recorded in `web/public/covers/README.md` and `sources.json`, including URLs, dimensions and SHA-256 hashes. The archive and its artwork remain unchanged and outside the application.

Final actual checks: `pnpm install --frozen-lockfile`, `pnpm typecheck`, `pnpm lint`, `pnpm build`, and `pnpm audit --json` all exited 0. `pnpm test:e2e` against the production server with `COURSES_TEST_PORT=3117` passed **32 tests**, with no retries. Current logs, command durations, and before/after input hashes are in `docs/evidence/ui-001-home-content/verification.json`; tested inputs were unchanged during verification.

Coverage includes the earlier visitor/learner, Back/reload, keyboard shelves, disabled future routes, local images/no external requests, empty/loading/error recovery, not-found, reduced-motion, responsive and axe checks. New checks exercise all five editorial subject anchors, topic cards, course-information facts, focus trap/Escape/restoration, free-sample non-enrollment, absence of cookie/local-storage persistence, and a scrollable/dismissible 320px dialog. A missing group role on empty shelf controls was found by axe and fixed. Anchor tests distinguish ordinary alignment from native document-end clamping; screenshots wait for the main-content target below the mobile header before capture normalization. No forced clicks or blanket test skips were added.

Final desktop/mobile Home and information-dialog images were opened and inspected, including 320px dialog and scrolled mobile views. `home-desktop-live.png` / `home-desktop-full-live.png` and `learner-mobile-live.png` / `learner-mobile-shelves-live.png` are separate live-development captures; `visitor-*`, `learner-*`, `course-info-*`, and state captures come from the production browser suite. Previous evidence directories remain historical, not overwritten.

Changed paths: Home feature files, learner shell, shared shelf semantics, global styles, tests, licensed cover assets, the app run guide, this task record, the design system, reference ledger, and this pass's evidence. The final local commit identifies the exact version. `git diff 9dee4d9 -- apple-music-clone web/package.json web/pnpm-lock.yaml` was empty. No push, merge, deployment, provisioning or payment activation. Development remains at `http://127.0.0.1:3100/`.

Status: implemented and technically VERIFIED; owner visual acceptance remains pending. This is a usable fixture-backed Home browsing slice, not a live marketplace or a claim of whole-image pixel identity. Real-device Safari/Android and comprehensive screen-reader/zoom acceptance remain separate QA work. The next assigned feature after Home acceptance is UI-002; it has not been marked complete by these Home disclosures.
