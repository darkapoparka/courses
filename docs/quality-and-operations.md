# Quality, evidence and operations

Checks grow with the product. Do not run the archived prototype as a substitute for testing the new app. No application checks have been run by this docs-only revision.

## Layered checks

| Change | Minimum evidence |
| --- | --- |
| Documentation | Internal paths/IDs/decisions consistent; no invented completion; diff restricted to intended docs/reference synchronization |
| Scaffold | Actual version/CLI record, locked install, typecheck, lint, production build, local route smoke check |
| UI | Type/lint/build, relevant browser interactions, desktop/mobile screenshots, keyboard/focus and overflow checks |
| Data/auth | Migrations on disposable local DB, generated types, grants/RLS positive and cross-user/workspace negative tests |
| Media | Owned upload, wrong-owner rejection, verified ready/failed state, private download/signing, expiry/refresh and browser playback |
| Money | Sandbox buy/decline/cancel/delay, concurrent/duplicate/out-of-order events, rollback/replay, refunds and grant reconciliation |
| Release | All required slices, production configuration/rights/policies/support, monitoring/limits, restore and rollback evidence |

Unit tests cover pure access/state/price/progress helpers; integration tests cover actual database constraints/RLS/atomic operations; browser tests cover user journeys. Do not mock away the very authorization or payment state being tested. No arbitrary coverage percentage or snapshot count replaces the critical negative cases.

## Visual acceptance

Use deterministic fixture content, viewport, browser/OS, font availability, motion and loading conditions. Playwright visual comparisons depend on their rendering environment; compare stable baselines rather than screenshots from unrelated systems [R16](research.md).

For each changed family save the source reference path, our course screenshot, viewport, relevant states, and intentional adaptation notes. First verify one screen before applying its components everywhere. Never update baselines solely to silence a regression. A screenshot route existing is not a fidelity check.

Start with 390px mobile and 1440px desktop. Before pilot test 320px, tablet, wide desktop, zoom, long text, mobile keyboard/safe area and actual iOS Safari/Android Chrome. Desktop Chrome emulation alone is not proof of mobile media behavior. Check Back, deep links and refreshing a lesson route.

## Accessibility

Target WCAG 2.2 AA and test actual content/controls, not only a component library claim [R14, R17](research.md). Keyboard navigation, visible focus, meaningful labels, dialog focus/return, error association, contrast, reduced motion, readable zoom and captions are required for the relevant surfaces. Automated checks supplement manual testing; they do not certify the whole product.

## Critical acceptance scenarios

The first free journey: creator A drafts and uploads → operator approves → learner A discovers/enrolls → plays/reads/downloads → leaves/resumes. Learner B and creator B cannot use A's private records or draft media.

The paid journey: pending order → sandbox payment → verified fulfillment → active source grant → playback → confirmed refund → that grant revoked. A concurrent duplicate produces no duplicate grant/charge attempt; a delayed old paid event does not undo the refund. Dropped callbacks are repaired through replay/reconciliation. A forged success URL never grants access.

Progress: rewind can lower resume position; an older write cannot undo completion; a conflict does not erase local notes. Publishing: no draft leak, no editing beneath review, no unlisting-to-edit bypass. Access: protected text/resources/transcripts are tested along with video.

## Operational minimum for the pilot

One named owner monitors failed payments/access, webhook errors, media failures, support and reports. Record safe correlation/event/order IDs, never secrets or private note content. Provider dashboards plus a small app exceptions view are sufficient; no custom observability platform or finance dashboard.

Run the bounded payment/refund/access reconciliation command before launch and daily during the paid pilot. Record date/result and investigate discrepancies. Test callback replay after downtime. Automatic scheduling can be added to the same command later; it is not a job-framework project.

For a payment-without-access incident: inspect owner/order/provider context → confirm current provider state → run the idempotent reconcile function → verify grant and delivery → record support outcome. Never repair by blindly toggling an `is_paid` field. For media failure: verify ownership/provider state/captions, retry a draft safely or issue a reviewed correction; don't expose a paid asset publicly as a workaround.

## Budgets and data recovery

Track stored and delivered video minutes, upload quotas, processing failures, database/storage/egress and provider payment costs. Estimate contribution from actual revenue minus refunds, processor/platform charges, media/storage and support; do not publish a margin based on an unverified vendor price. Set alerts and hard upload limits before opening creator registration.

Document database backup coverage and restore procedure; also document how private storage/media content and provider mappings recover, since database backup alone is not the full product. Perform a test restore in a nonproduction environment and record recovery gaps before live launch. Do not claim a provider tier includes a feature without checking the actual purchased plan.

## Release and rollback

Deploy `web/` only, excluding the archive and local evidence. Keep local, preview/staging and production credentials/data separate. Validate origin/callback configuration, private cache behavior, auth email, legal/support pages and actual course/asset rights. Fixture previews are non-indexable; release routes must use real data and no fake success paths.

Use backward-compatible migrations where possible. An application rollback does not automatically undo database/provider state. Record migration compatibility, restore plan, rollout/rollback steps and known risks for the release. Do not run destructive down migrations against paid records as a routine rollback.

The owner explicitly approves production deployment/live payments. A successful build, a nice mockup, or this documentation commit is not that approval.
