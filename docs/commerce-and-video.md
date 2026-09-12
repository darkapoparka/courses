# Commerce, access and video — later integration requirements

These requirements apply only after accepted clone completion and an authorized course-product slice. The current preview must not submit real payments, Apple credentials or subscriptions. No accounts, keys, uploads, database changes or live transactions are created by this document.

## Commercial scope and decisions

Recommend free enrollment plus one-time purchases, one course and one seller per order. Stripe Connect/hosted Checkout and Mux remain candidate integrations, not selected live accounts. Resolve entity/markets, merchant/charge model, seller readiness, fees/taxes/refunds, access terms and provider/category eligibility before payment implementation. Reopen current provider documentation; earlier planning is not a source for today's API or legal eligibility.

## Checkout and uncertain retries

The server verifies learner identity, course availability, current offer/terms, seller readiness and existing access. It resolves amount/currency and provider account from trusted records. A changed offer produces a new confirmation state, not a silent price change. Callback/return origins are constrained.

Create or reuse one appropriate pending order under concurrency protection. Snapshot accepted terms and bind a stable provider idempotency identity to the attempt. The provider request and database update are not a distributed atomic transaction. When a provider session is created but its local write fails, recover the same attempt rather than immediately create another possible charge.

An authenticated order-status page may use a return URL to locate the buyer's order. It must not treat that URL as payment evidence. Show confirming, failed, canceled, unavailable and fulfilled states honestly. Closing the browser must not prevent fulfillment.

## Fulfillment and access

Verify raw-body signature and provider/environment/account context before processing events. Match the authoritative payment object, order, buyer, course, currency and amounts. Delayed payments require actual paid status, not merely a completed checkout session.

Use a constrained atomic database operation to lock the order, recognize prior effects, update financial facts, apply the source-specific grant change and record successful event handling. Unique event context and unique business-effect identity protect against both replayed events and different events describing the same purchase. Do not mark an event handled before its required effect commits.

Transient processing/storage failures remain retryable. Known duplicates/no-ops can succeed. Deterministic inconsistent mappings become attributable exceptions, not fabricated access. Keep email, analytics and unrelated processing outside the short financial transaction. A bounded synchronous pilot handler is a proposal; if verified provider/hosting limits and recovery needs require a managed durable queue, record that decision. No fire-and-forget or in-memory substitute for durability.

Payment pending grants no paid access. Authoritatively paid state creates one grant. Confirmed full refunds revoke that order's grant under the agreed policy; other valid grants remain. Partial refunds and disputes follow explicit policies rather than a generic failure flag. Stale paid events must not resurrect refunded access. Ordinary unlisting preserves valid access; suspension is a separate delivery/remedy decision.

## Recovery and support

Provide a bounded, paginated reconciliation command using the same idempotent domain rules. Test replay after missed callbacks, downtime, duplicates and out-of-order delivery. Name the pilot operator and record prelaunch and daily paid-pilot reconciliation results; no recurring automation is installed by this documentation.

Authorized provider dashboards may handle initial refunds, followed by verified events/reconciliation. Record charge-model transfer/fee behavior before live use. Do not recreate a banking ledger, general job dashboard or arbitrary SQL admin console. Log safe event/order context, not secrets or unnecessary financial payloads.

## Owned media ingest

Authorize an upload only for an owned editable lesson after limits and quota checks. Bind provider/environment IDs to a server-owned media record. Large uploads should go directly to the selected provider rather than through the application server. Distinguish transfer completion from processing readiness. Verified provider events/reconciliation establish ready/failed state, duration and captions; the browser cannot mark another creator's asset ready.

A failed draft retry must not replace a published asset. Review captions and allowed resource types before publication, and define abandoned-upload cleanup/retention ownership. Do not offer unlimited unaudited uploads.

## Protected learning delivery

One server access decision governs video, text, transcripts and files. Signing credentials stay server-side; private links/tokens are issued only after identity, availability, grant and resource-parent checks. Record token lifetime, renewal and revocation window during integration. Signed links are not a promise of piracy-proof DRM.

Keep paid content/tokens out of public caches, share metadata, analytics and unauthenticated payloads. Intentional previews have explicit permission, not merely obscure URLs. Use a maintained player with captions, speed, keyboard/fullscreen where supported, buffering and retry. Do not autoplay sound. The proposed pilot pauses on lesson exit and offers resume elsewhere rather than requiring a global multi-route mini-player.

Resources remain private and are delivered as appropriate authorized downloads. Restrict types, sizes, content rendering and execution; never run uploaded course code or untrusted creator scripts. Save progress periodically with the version/conflict contract, not only on browser close.

## Integration evidence gate

Record actual sandbox accounts, API/SDK versions, subscribed events, signature/context checks, retry/concurrency/out-of-order outcomes, outage recovery, refund behavior, cross-tenant upload/token rejection and expired-token renewal. These tests and the business/security/release gates precede live selling. A provider success response alone is not a complete learning journey.
