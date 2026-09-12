# Commerce, access and media

M1 introduces media/free enrollment; M2 introduces paid commerce. No vendor accounts, uploads, keys or payments were created by this documentation work. Read [data model](data-model.md) for constraints and [decisions](decisions.md) for business gates.

## Business boundary before payment code

One course, one seller, one-time purchase; free enrollment is separate. No cart, subscriptions, bundles, affiliate payouts or internal wallet. Use Connect and hosted Checkout. Choose the actual platform/entity countries, merchant identity, charge model, fee/refund responsibility, tax treatment and supported currency before implementing the financial integration.

Destination charges are a candidate for a platform-branded single-seller marketplace, not a silently approved choice. Direct/indirect charges and `on_behalf_of` affect merchant/funds responsibilities. Connect is not automatic merchant-of-record outsourcing [R11](research.md). Third-party content and sensitive claims require provider eligibility review [R18](research.md).

## Checkout creation contract

The server verifies the learner, course publication/availability, current course price/currency/terms, creator selling readiness and existing access. Compare the accepted offer version; show a changed-price summary rather than silently charging different terms. Validate callback origins.

Create/reuse one appropriate pending order under a buyer/course concurrency constraint. Snapshot the accepted course/seller/price/access/terms and relevant fee/tax consent information. Create hosted Checkout with server-resolved values and a stable provider idempotency key derived from that attempt. Never accept an arbitrary amount or connected account from the browser.

The provider request and the database cannot share one atomic transaction. If session creation succeeds but saving its reference fails, recover using the existing attempt/idempotency identity and reconciliation. Do not immediately create another charge attempt. Reuse an existing active session when appropriate; verify terminal/expired state before replacing it [R20](research.md).

## Fulfillment

The return URL may select an order for an authenticated owner-only status read. It does not prove payment. Display Confirming purchase honestly until an authoritative paid state has been applied. Server reconciliation may accelerate the return path, but browser return is never the only fulfillment mechanism [R10](research.md).

For relevant verified events, obtain the current provider state when needed; match environment, account, order, buyer, course, amount/currency and provider relationships. Session completion alone is not sufficient for a delayed payment. Support only deliberately configured methods and test their actual transitions.

Apply payment/refund state through one constrained database transaction: lock the relevant order; check existing business effect; update authoritative local fields; create or revoke only the order's grant; record the successfully handled provider event. A unique event key prevents duplicate delivery effects, and a unique source grant also protects against different events describing the same purchase. Ordinary users cannot call this privileged function.

Do not mark an event handled before its required effect succeeds. Transient provider/database failures return a retryable error so delivery can retry. Known duplicates/no-ops return success. Deterministic inconsistencies are recorded as exceptions for operator review, not retried forever or converted into access. Nothing else—email, analytics, media processing—belongs inside this transaction/request.

Stripe documents retries, duplicate delivery and non-guaranteed ordering, and recommends asynchronous processing for scale [R09](research.md). The pilot deliberately uses a short bounded handler. Measure it under concurrent/replayed events and provider/hosting limits before live activation. A queue becomes necessary if that boundary cannot be met; choose one managed durable queue, not a custom framework or fire-and-forget promise.

## Payment/access state matrix

| Situation | Financial record | Access/UI |
| --- | --- | --- |
| Session created / payment pending | Pending, not revenue | No paid grant; confirming or continue checkout |
| Authoritatively paid | Preserve provider references/amounts | Idempotent order grant; start learning |
| Declined / expired before payment | Terminal attempt after verification | No grant; deliberate retry allowed |
| Duplicate / stale event | Deduplicate or refresh current state | No duplicate grant or regression |
| Refund requested / pending | Request/pending is not success | Explain actual policy/status; no fictional completed refund |
| Confirmed full refund | Record refund and charge-model adjustments | Revoke this order grant under approved policy; other grants survive |
| Partial refund | Record exact adjustment | No automatic whole-course revocation; apply agreed policy |
| Dispute | Separate current dispute facts | Follow explicit suspension/access policy, not a generic failed flag |
| Course unlisted | Stop new sales | Existing valid access remains |
| Course/workspace suspended | Record support/remedy process | Delivery blocked with explanation even if grant/payment exists |

Late successful events must not resurrect an already refunded grant. Refresh provider state and update under the order lock; keep refunded/disputed facts distinct from original payment success. A course becoming unavailable after payment requires support/remedy handling, not pretending the buyer never paid.

## Operations without a job platform

Provide a bounded, paginated reconciliation command reusing the same domain functions: compare recent provider sessions/payments/refunds against local order/grant state, report exceptions, repair only documented idempotent effects, and record a safe audit result. Run before the pilot and daily during it; name the owner. Test replay after webhook outage. A future scheduled invocation can call that same function.

Use provider receipts and in-app purchase status initially. Do not introduce an outbox/email pipeline just to send a duplicate receipt. Failed essential auth email is a separate production configuration/monitoring issue.

Refunds may initially be performed by authorized operators in Stripe's dashboard, followed by verified webhook/reconciliation updates; document the workflow, transfer reversal and application-fee behavior for the chosen model. Do not build a custom finance ledger/dashboard to recreate the provider [R11](research.md).

## Media ingest

The creator requests upload authorization for an owned editable lesson. Check workspace/course state, file constraints and quota. Create a server-owned media record and expiring provider upload; bind returned provider IDs to that record. The browser uploads directly to Mux, not through Next [R12](research.md).

Track transferring separately from processing. Verified events or authenticated reconciliation establish ready/failed, duration and caption status. The client cannot mark an arbitrary asset ready or attach another creator's asset. Retrying a failed draft upload must not replace a published asset. Record cleanup ownership and retention for abandoned drafts; do not leave unlimited free uploads.

Before publishing, verify required lesson assets are ready, captions are usable and resources have passed the allowed-type/size/review checks. AI-generated captions, when used, need creator review; successful video encoding is not proof that captions are correct.

## Playback and files

The server checks the same lesson access policy for video, paid text, transcript and resources. For Mux signed playback, keep signing keys private and issue only the needed short-lived authorization after that check [R13](research.md). Choose/record token lifetime during integration; long lessons need authorized refresh. Revocation can leave an already-issued token usable until expiry. This is not piracy-proof DRM.

Never put paid tokens/links/transcripts in public caches, static exports, share metadata or analytics. Explicit previews use intentionally public lesson permission, not a hidden URL to the complete paid course. Validate that every file/media ID actually belongs to the requested lesson.

Use a maintained provider-compatible player with captions, speed, keyboard, fullscreen where supported, buffering/retry and clear failure states. Do not autoplay sound. V1 pauses on navigating away and offers a resume destination; a persistent multi-route mini-player is not required.

Progress saves periodically and on useful supported events, using the version/conflict contract in the data model. Do not rely only on browser shutdown delivery. Video position is not proof of learning or access.

Paid resources stay in private storage with authorized expiring download links. Allow only reviewed file types; deliver untrusted archives as attachments on an appropriate storage origin, never execute them in the app. No arbitrary creator HTML/MDX/scripts or unreviewed embeds.

## Required integration evidence

Record sandbox environment/account mapping, SDK/API versions, events subscribed, signature checks, idempotency/concurrency behavior, webhook latency under replay, outage recovery, refunds, cross-tenant upload/token attempts, expired playback refresh and known residual risk. No live selling until those checks and business gates pass.
