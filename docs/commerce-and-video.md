# Commerce, access and video delivery

Status: proposed integration design. No accounts, checkout sessions, uploads, keys or infrastructure were created. Commercial eligibility, legal terms and production activation remain explicit launch gates.

## Commercial baseline

Start with free enrollment and one-time course purchases. One order buys one course from one creator. No multi-seller cart, creator subscription, global all-access subscription, cross-creator bundle, affiliate settlement or internal cryptocurrency balance in the first release.

Stripe Connect plus hosted Checkout is recommended for marketplace money movement and payment collection. Connect does not automatically resolve seller-of-record, tax, consumer law, refund liability or platform eligibility. The selected charge model changes responsibility for fees, refunds/disputes and transfers [S11–S14](research.md).

Evaluate destination charges as an initial candidate for a platform-collected, single-creator purchase; do not treat that as approved until the business accepts the corresponding responsibilities and supported account/country setup. Compare direct charges when the actual seller arrangement calls for them. Record the final charge model and refund/transfer/fee behavior in `decisions.md` before implementing its irreversible assumptions.

Provider approval and country-specific restrictions must be checked for this third-party educational content platform. Broad 'business/money-making/crypto' categories cannot be treated as automatic eligibility for every seller or claim. No guaranteed-profit or deceptive get-rich-quick offerings [S14](research.md).

## Checkout creation

An authenticated learner initiates checkout from a current offer. The server validates buyer identity, course publication/suspension, offer type/price/currency, creator account relationship and applicable selling readiness. It checks for existing access and an appropriate in-flight purchase to avoid accidental duplicate charges. A changed offer returns an updated summary for user confirmation rather than silently charging a different amount.

Create a pending order with immutable commercial terms and a stable server-generated request/idempotency identity. Create the provider Checkout Session with the correct connected-account/charge configuration and server-resolved values. Persist the provider relationship. Handle the gap between local transaction and external API success through idempotency and reconciliation; a database transaction cannot atomically commit the provider's external state.

Use provider-hosted payment collection; never store card data or reproduce Apple account/card forms. Validate allowlisted return URLs. Provider metadata helps correlate records but is not a substitute for checking buyer/order/course/account relationships and actual amounts.

## Payment return versus payment truth

The browser return page displays the authenticated user's order status. It may show 'Confirming purchase' and poll/retry an authorized status endpoint. An order ID, Checkout Session ID or `success=true` in a URL is not proof of payment or ownership.

Access is granted only after an authoritative paid/fulfilled condition is established through a verified provider event or authenticated server reconciliation. Some payment methods are asynchronous; session completion alone is not always settled payment. Select supported methods deliberately and follow their actual state transitions. Never show a fake purchased state to hide processing delay.

## Webhook processing

Follow current provider signature guidance and preserve the raw request body for verification [S13](research.md). Reject invalid signatures or wrong-environment/account events. Bound request size, protect secrets and avoid logging sensitive payloads unnecessarily.

Durably record a verified event with a unique provider/account/event key. Either process a small atomic business transaction immediately or enqueue a durable job, then acknowledge according to the provider contract. Do not acknowledge and rely on an unawaited in-memory promise for the only fulfillment attempt.

Events may repeat, arrive late or arrive out of order. Handlers must verify object relations and be idempotent. Query the authoritative current provider object when an event's ordering or fields cannot safely establish the present state. A duplicated 'paid' event must not duplicate access, revenue entries, notifications or transfers.

For fulfillment, atomically update the relevant order state, create the source-specific entitlement grant if absent, establish enrollment as appropriate, and emit the needed outbox notification. Store processing outcome separately from event receipt. Failed jobs retry with backoff and become visible in operator tooling; scheduled reconciliation catches missed events and mismatches.

## Lifecycle matrix

| Situation | Financial behavior | Access/UI behavior |
| --- | --- | --- |
| Pending session | No assumed revenue | Confirming/pending, paid lesson remains locked |
| Definitively paid and fulfilled | Record confirmed provider amounts/references | Create exactly one business grant for that source; show Start learning |
| Failed/canceled before payment | Record terminal attempt; allow a deliberate retry | No paid grant; keep user context |
| Duplicate/out-of-order event | Deduplicate/reconcile, do not regress authoritative state | No duplicate grant or misleading rollback |
| Refund requested | Request is not a completed refund | Explain request status under the actual policy |
| Confirmed full refund | Record refund and any required transfer/application-fee handling for the charge model | Revoke that purchase's grant under the approved policy; other valid grants remain |
| Partial refund | Record exact adjustment | Access effect must be explicitly defined; do not automatically remove the whole course |
| Dispute | Follow provider/business policy, record dispute state | Access suspension/continuation is an explicit documented policy, not guessed from a generic failure |
| Creator/course unlisted | Stop new sales | Existing valid buyer access remains |
| Safety/legal suspension | Escalate support/refund and provider obligations as applicable | Restrict affected content with an explanation and support path |

Do not overwrite past commercial terms when the creator changes a price. Provider fees, refunds and transfer reversals must be reconciled rather than approximated by a single subtraction in the UI. The financial log supports operations but does not replace an accountant or statutory books.

## Creator onboarding and payouts

Use provider-hosted onboarding and status retrieval. Distinguish identity/application review, payout-account connection, selling capability, payout capability, course approval and platform suspension. Completing one is not proof of all others.

Store the account relationship server-side and expose only necessary readiness/status messages. Do not collect sensitive identity documents into our own storage when the provider's hosted flow handles them. Creator payout edits and workspace finance access require stronger permission checks and audit.

The owner must approve supported platform/seller countries, settlement and buyer currencies, platform fee model, refund responsibilities, tax/seller arrangement and support workflow. Do not promise global payouts simply because the application accepts a country field.

## Video ingest

Use Mux direct-upload capability so the browser transfers the video to the media service rather than proxying large files through the application server [S15](research.md). The server first checks editor permission, draft lesson ownership, creator status, file constraints and quota. It creates an expiring upload authorization bound to the relevant media/lesson record.

Track browser transfer progress separately from provider asset processing. Verified provider events update the authoritative mapping, duration/readiness and failure details. Bind every event to the expected account/environment and our media record. The browser cannot mark an arbitrary asset ready or attach another workspace's video.

Allow retry/replacement without deleting the last published version prematurely. Validate caption/transcript availability and permissions before publication. Assets abandoned in drafts need a documented cleanup policy, not silent indefinite storage. Limit upload size/duration/count and protect trial/free accounts from expensive abuse.

## Protected playback

Use private/signed playback for paid video. After verifying identity, grant or preview permission, content state and media readiness, the server returns the minimal short-lived playback authorization. Keep signing credentials server-only. Signed URLs/tokens are a delivery control, not a substitute for entitlement checks [S16](research.md).

Choose token lifetime through an explicit security/usability test; allow authorized refresh for long lessons. A revoked grant cannot necessarily invalidate a token already issued until its validity expires, so document that residual access window. Signed playback is not a guarantee against screen recording or redistribution and must not be marketed as piracy-proof DRM.

Never place paid media authorization in a public cache, static HTML export, analytics event or shareable unauthenticated endpoint. Public previews use explicitly designated assets/content, not a secret URL for the entire paid course. A lesson's thumbnail/poster may be public while its media/transcript/resource remains protected; represent that distinction.

## Player behavior

Provide captions, play/pause, accessible keyboard control, speed, fullscreen where supported, clear buffering/error/retry and appropriate mobile browser behavior. Use a mature provider-compatible player rather than building a custom media engine. Do not autoplay with sound.

V1 pauses on leaving the lesson and offers a resume destination elsewhere; persistent mini-video is not required. Update progress periodically and at supported pause/navigation/visibility events, with retry and a documented stale-update policy. Browser shutdown events are not guaranteed delivery, so do not rely on a single final beacon for all progress.

Video views are not proof of learning, financial settlement or course access. Private notes/timecodes belong to the learner and require their own save/authorization path.

## Files and text

Paid PDFs, templates, source archives, lesson text and transcripts use the same access decision as video. Store private resources in protected storage and issue short-lived download links only after a resource-to-lesson relation check. Validate uploads by actual type/size and scan/restrict risky content according to the trust policy. Do not render arbitrary creator HTML or execute uploaded code on the application origin.

A coding course may offer source files; that is not permission to run untrusted learner/creator code on our servers. Embedded content must be allowlisted and reviewed for privacy and access leakage.

## Cost and observability

Compare Mux and Cloudflare Stream using current ingest/encoding, stored minutes, delivered minutes, resolution/features and expected geography [S17–S18](research.md). No provider is assumed universally cheapest. Instrument upload failures, processing latency, playback authorization failures, provider errors and playback startup/rebuffering where available, while minimizing learner data.

Track paid order → active grant reconciliation separately from video usage. Add budgets/quotas and alerts before opening creator uploads widely. Real provider costs, settlement behavior and test-mode scenarios must be recorded in the corresponding integration task before production activation.
