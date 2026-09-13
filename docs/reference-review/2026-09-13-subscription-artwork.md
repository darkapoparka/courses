# Subscription journey and native thumbnail review

Reviewed locally on 2026-09-13 in `J:\courses/main`, on top of documentation checkpoint `1a5c1f9`. This is implementation evidence, not clone acceptance. The saved reference archive is unchanged.

## Candidate and environment

- Implementation SHA-256: `29e1f569606a7b875dc855681a9de6ac19e781906712de387cdef14088cd9c5b`.
- QA tooling SHA-256: `f92d576d56e6465e8d4a4e5bd0dedb078cd81a7f949dac02309837e1e9a8264c`.
- Optimized build: `myRmhF4WQ4YTIyxskWpDs`, served from this checkout on loopback port 6437. Development remains on 6435.
- Windows 11 build 26200; isolated Python 3.13.1; canonical Chromium 151.0.7922.34. The run uses en-SG, Asia/Singapore, reduced motion and device scale 1.
- Evidence root: `D:\courses-main-evidence\finalization-20260913\`, exposed through the existing ignored `.parity-evidence` junction. `runtime-verified-identity.json` identifies the final audit process and build.
- Reviewer: the implementing Codex agent. No independent reviewer or owner approval is asserted.

## Implemented changes

`music-catalog.ts` now samples Viral Hits artwork at its native 38px size and integer row anchors. Shabang uses the clean cover exposed in `54b01eab`, rather than including the captured hover icon from `e72be564`. The real song button still renders its hover and playing indicators. The new `viral-artwork-live-controls` regression checks hover, pointer exit, playback indicators, Volume and pause; preview audio stays silent.

The subscription page now uses the saved renewal wording, a filled music symbol, closer heading/body sizes and button spacing. Cancellation confirmation and result dialogs use a lighter backdrop, closer corner/shadow treatment, a filled badge and corrected result heading/checkmark/Done geometry. These rules are scoped to the subscription owner and its two dialogs.

Continuous cancellation previously updated the entire page behind the success dialog immediately. `SubscriptionView` now retains the prior details while the acknowledgement is open; dismissing it reveals the cancelled state. Confirmation still updates local library state. The existing ordinary-preview cancellation test owns reload persistence; frozen-reference sessions intentionally do not write browser storage.

## Recorded journey

The archive lists five stills and zero motion recordings for `FLOW-16a876bc`:

`44101453 → c0997fe5 → fd1c0c71 → 03157020 → 603983c7`.

The registered `recorded-canceling-a-trial` test initializes once at account settings, uses Manage, Cancel Free Trial, Cancel Subscription and Done, then waits for the local notice to clear. It records all five states in order, at 1440×903, without URL jumps or forced clicks. It asserts that the prior details remain beneath the success dialog and that the cancelled state appears after Done.

All five originals were opened at readable size. Development journey evidence is in `cancellation-flow-verified/journeys/canceling-a-trial-continuous/`. The initial underlay failure is preserved in `cancellation-flow-red/`. An intermediate test incorrectly expected frozen-reference sessions to persist across reload; `cancellation-flow-green/` and `cancellation-flow-green-retry/` preserve that failure. The first also hit Windows console encoding while printing the error. The final test respects the existing fixture-isolation contract; the application storage policy was not weakened.

The development journey measured these whole-frame residuals against the same originals, excluding only their 120px acquisition footer:

| State | Previous direct-fixture over-20 | Corrected continuous over-20 |
| --- | ---: | ---: |
| `44101453` | 2.74209% | 2.74209% |
| `c0997fe5` | 3.22674% | 3.05033% |
| `fd1c0c71` | 3.70001% | 2.72787% |
| `03157020` | 4.05939% | 3.03794% |
| `603983c7` | 3.78445% | 3.29419% |

These figures compare a continuous endpoint with an older direct fixture, not two equivalent live journeys. The final optimized direct/continuous comparisons are recorded separately below.

## Final optimized verification

The final `production-verified` run passed 159 desktop captures, five responsive samples, 218 route checks and 59 interaction regressions, with zero failures. Application and tooling hashes stayed unchanged from start to finish. Typecheck and the optimized build passed. The earlier archive/coverage checks, five Python QA-tool tests and nine Node cover-integrity tests also passed during this implementation session. Four additional optimized dialog captures at 360×800 and 390×844 passed in `mobile-subscription-verified`.

`comparison-verified/metrics.json` and its readable gallery contain all 159 exact-size comparisons against the compatible `main-navigation-20260913/production-full-20260913-022654/comparison-retry` baseline. Results: **30 lower over-20 residuals, 126 unchanged, three higher**. Every changed owner was inspected against the originals at readable size, including the amplified residuals. No product pixels were masked, and candidates were not resized.

| Direct fixture | Final over-20 | Change in percentage points | Final MAE |
| --- | ---: | ---: | ---: |
| `e72be564` | 6.56469% | -0.16035 | 5.61770 |
| `54b01eab` | 9.43037% | -0.16573 | 6.73961 |
| `c0997fe5` | 3.05033% | -0.17642 | 3.80235 |
| `fd1c0c71` | 2.70387% | -0.99614 | 3.93364 |
| `03157020` | 3.01403% | -1.04536 | 4.03278 |
| `603983c7` | 3.29419% | -0.49026 | 3.90485 |

The three higher threshold residuals are `8f029018` (+0.00408 percentage points), `4811dde3` (+0.00431) and `de48a956` (+0.00415). Readable source/render review and before/after pixel bounds localize these changes to the narrow third-column artwork and its blur beneath the queue, within x=1134–1222 and y=591–729. Native crop corrections are retained, with these small regressions explicitly unresolved. Account-menu `fc5d84bd` has a lower threshold residual but MAE increases 0.01761 across the corrected Viral Hits artwork. Search `bbb92581` has unchanged threshold residual and a 0.00000538 MAE increase involving two pixels. The batch is not described as universally better.

The final optimized continuous cancellation metrics agree with the development table above. `journey-comparison-verified/metrics.json` records original and direct-fixture comparisons separately. The first, second and fifth live checkpoints equal their direct fixtures exactly. Confirmation and success each differ from their direct fixtures by 0.08544% over-20 / MAE 0.06618, localized to sidebar playlist rows at x=28–154, y=579–633. This remaining live/direct difference is not concealed by replacing session state. These are five traversed checkpoints, not FLOW sign-off.

Do not use the superseded `production` or `production-final` runs as evidence of the final candidate.

## Preserved trials and residuals

A global sidebar material trial improved selected New screens but worsened the over-20 residual on 91 of 159 screens. It was reverted completely. A transport-ink trial was also removed. Their evidence remains in `sidebar-trial-1`, `sidebar-player-trial-2`, `sidebar-artwork-trial-3`, `production` and `comparison`. `cancellation-trial-4` and `production-final` predate the corrected live subscription transition.

Manual in-app checks covered desktop cancellation controls, the result at 390×844 and both dialogs at 360×800. The 360px result remained inside the viewport (336px wide, 12px side margins), with no horizontal document overflow, and retained the prior subscription details underneath. Responsive containment is not mobile visual acceptance. The existing mobile confirmation copy loses a space where a desktop line break is hidden; this remains a small mobile text defect.

Remaining visible subscription differences include font metrics/weight, exact glyph contours, sidebar/player/footer material and small vertical offsets. The saved first two cancellation stills show SmithAlex while later stills show Alex Smith; the current live session is not silently rewritten to imitate that discrepancy. Five ordered rendered states do not establish FLOW acceptance.

Alpha's preceding artwork/continuation remains incomplete. First-entry lyrics/queue and library-editor recordings have unresolved catalog/account snapshot discontinuities. The owner was asked whether unexplained endpoints should be treated as separate reference scenarios or supplied with a complete recording; no scope change is inferred without an answer. Other documented artwork, typography, player and panel discrepancies remain open.

**Acceptance remains UI 159/159, MATCH 0/159, FLOW 0/58.** No checkbox advanced; no course adaptation, deployment, external subscription action or font redistribution occurred.
