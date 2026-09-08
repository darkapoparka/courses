# Quality, verification and operations

Status: proposed acceptance plan. No application build, browser test, visual comparison, database/RLS test or provider integration test was run in the documentation audit. Do not interpret this checklist as completed verification.

## Definition of done

A task is done when its bounded behavior is implemented, applicable specification/decision records are updated, relevant automated and manual checks pass, and evidence is recorded. UI approval, functional verification, security checks and commercial/legal approval are separate gates. A route that loads, a green build or a good-looking static mockup cannot substitute for the others.

For documentation-only work, inspect the diff, paths/links, internal consistency, source attribution and stated evidence limits. Running the archived Apple Music prototype is not required to validate planning documents.

## Verification layers

| Layer | Required evidence once applicable |
| --- | --- |
| Static | Installed-toolchain type check, lint, dependency/secret review and production build; actual commands/results recorded |
| Domain unit tests | Offer/access predicates, source-specific revocation, progress ordering, money/currency formatting, publication transitions |
| Database integration | Constraints, transactions, grants, RLS, views/functions and concurrency against representative roles/tenants |
| Provider integration | Sandbox signed webhooks, duplicate/out-of-order/delayed cases, checkout reconciliation, media readiness and token refresh |
| Browser journeys | Critical learner/creator/operator flows with realistic content and error states, not only the homepage |
| Visual review | Approved course-design frames versus actual matched-viewport output; intentional differences explained |
| Accessibility | Automated checks plus keyboard/focus, screen-reader spot checks, captions, contrast, zoom/reflow and reduced motion |
| Operational rehearsal | Refund/access repair, job replay, incident handling, restore/recovery and rollback compatibility |
| Pilot usability | Real consenting participants finding/buying/resuming/publishing without guided rescue; observed failures recorded |

Use unit tests for business invariants, not brittle snapshots of every markup detail. Visual snapshots must use deterministic fixtures, viewport and font settings. Do not game an image-diff score by hiding difficult content or flattening interactive UI into screenshots.

## Critical adversarial scenarios

| Scenario | Pass condition |
| --- | --- |
| Nonbuyer requests paid media/text/transcript/resource directly | No protected bytes or authorization token leaked |
| Learner changes another user's note/order/progress ID | Read and write denied without cross-user data disclosure |
| Creator substitutes another workspace/course/asset ID | All affected read/mutation paths reject the cross-tenant relation |
| User edits metadata to become creator/operator | No permission escalation |
| Forged webhook or wrong environment/account | Rejected; no financial/access state change |
| Duplicate fulfillment delivery | One business grant/order effect; no duplicate transfer/notification effect |
| Delayed payment / return before webhook | Honest pending UI, eventually reconciled, no forced duplicate payment |
| Refunded purchase but another active grant exists | Only the related grant is revoked; legitimate access remains |
| Offer price changes during checkout | Server detects stale terms and obtains a deliberate decision; no surprise charge |
| Unlisted versus suspended course | Ordinary unlisting preserves valid buyer access; suspension follows explicit policy |
| Paid response accidentally cached | Another user/anonymous client cannot obtain private content/session data |
| Upload completes but provider processing fails | No false ready/publish state; retry preserves the draft |
| Media authorization expires mid-lesson | Authorized refresh or useful recovery, not uncontrolled token leakage |
| Stale progress update follows completion or rewind | Completion is not lost; legitimate latest resume intent is handled correctly |
| Concurrent Studio/notes edits | Conflict is visible and input preserved; no silent destructive overwrite |
| Keyboard-only course discovery and lesson navigation | All essential actions reachable, focus clear, no keyboard trap |

Use two independent learners and at least two workspaces in authorization fixtures. A single happy-path admin account cannot test isolation.

## Visual and responsive gates

First compare against approved course-specific frames, not arbitrary scene mappings from the clone. Reference review must identify actual app bounds and exclude Mobbin footer/chrome from measurements while preserving original source files. Record the source path, viewport, target route/state, screenshot and reviewer.

Proposed coverage: 375/390px mobile, tablet, 1280px and 1512px desktop widths; long titles; empty/full curriculum; free/paid/owned/pending/suspended states; zoom/reflow; software keyboard and safe areas. Test target browsers including mobile Safari and a Chromium browser; the exact supported-version policy is a launch decision based on audience/device evidence.

Do not set a universal 'under 1% screenshot difference' as a definition of UX correctness. Course-specific content/layout adaptations can be intentional. Review hierarchy, typography, spacing, touch behavior, focus and real interactions. Major unexplained mismatches block approval even when the route technically renders.

## Accessibility and performance

Aim for WCAG 2.2 AA with applicable media/text alternatives and manual verification [S22](research.md). Our preferred 44px touch targets are a design choice; the standard's precise criteria and exceptions still need checking. Do not claim compliance from a single automated audit score.

Target field Core Web Vitals at the 75th percentile: LCP at or below 2.5 seconds, INP at or below 200ms and CLS at or below 0.1 [S23](research.md). These are targets, not measurements from this repo. Distinguish public catalog performance from protected player and Studio workflows.

Budget images/fonts and client JavaScript, reserve media/art dimensions, lazy-load noncritical player/editor code, paginate large lists and avoid request waterfalls. Measure on realistic mobile conditions and production-like content before adding speculative caching or complex state libraries.

## Environments and release process

Local/demo mode must be explicit. Staging uses separate database/provider credentials and safe test data. No real payments or production emails for tests. Validate environment-specific webhook secrets, callback URLs, storage policies and signed playback configuration.

Review migrations with schema/permission tests and application compatibility. Keep backups and rehearse a restore appropriate to the selected provider plan. A code rollback does not automatically undo a data migration or provider transaction; define forward fixes and compatible rollout/rollback steps. Never blindly run destructive migrations to make a preview build pass.

Release gates: approved UI/scope; working vertical slices; auth/access/payment/media tests; real operator tools; reviewed legal/provider eligibility; observability/quotas; support ownership; pilot feedback addressed. Deployment and live-payment activation require explicit owner authorization.

## Operational dashboards and alerts

Monitor signed webhook failures/processing delay, stuck purchases, paid-order/grant mismatches, failed/refunded/disputed orders, provider-account restrictions, video processing failures, playback authorization errors, failed outbox jobs and error rates. Alert on meaningful thresholds and route alerts to a named responsible operator selected before launch.

A small operator UI should support bounded replay, reconciliation and investigation with reasons and audit. Never expose arbitrary SQL, signing keys or unrestricted provider payloads to ordinary support roles. Scrub personal data and secrets from logs; document retention and access.

Define runbooks for: payment confirmed but access absent; refund/chargeback handling; incorrect creator association; video outage; compromised creator account; abusive course/report; accidental private cache leak; job backlog; and database restore. Each runbook states verification, safe corrective steps, escalation, user communication and audit requirements.

## Cost model and constraints

Do not choose platform pricing from a competitor headline alone. Model fixed application/database costs, stored/uploaded/delivered video minutes, resolution/features, resource storage/egress, email, monitoring, payment/Connect fees, refunds/disputes, fraud losses and support. Creator payouts are not platform revenue.

Illustrative usage arithmetic only: 1,000 active learners watching 300 minutes each means 300,000 delivered minutes in that period. It is not a provider quote. Insert current actual provider rates, storage assumptions, geography and the approved fee/settlement model before computing margin [S17–S18](research.md).

Set creator upload quotas, abandoned-asset cleanup rules, payment/OTP/post rate controls and spend alerts before broad self-serve access. Track contribution after variable costs and refunds; do not report gross course sales as platform profit.

## Product measurement

Define events with a stable schema and privacy review: course viewed, preview started, checkout initiated, order fulfilled (server-authoritative), first entitled lesson started, lesson completed, course resumed, question asked/replied and creator revision published. Distinguish anonymous previews and test traffic from actual learners.

Pilot metrics and thresholds are hypotheses in `platform.md`. Record observed failure reasons and qualitative usability, not only conversion charts. Do not optimize notifications or streaks to inflate engagement at the expense of learning.

## Evidence record template

For each task record: commit/branch, environment, seed/fixture version, commands and actual results, tested identities/roles, browser/device/viewport, screenshot/video paths, known failures, residual risks and reviewer/approval. If a check is blocked, state why and leave it open. Never replace missing evidence with 'should work', 'pixel-perfect' or 'production-ready'.
