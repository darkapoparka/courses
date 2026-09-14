# Alpha predecessor and continuous-carousel review

Reviewed locally on 2026-09-14 in `J:\courses/main`, on top of `5c59b76`. This is implementation evidence, not clone acceptance. The immutable reference archive was not changed.

## Candidate and environment

- Implementation SHA-256: `e732b776de08a9dd293e7a0778eff6a8863b00bf337f451b36a634aed1fb2dcf`.
- QA tooling SHA-256: `20e7f0c1eff2831f5df7347701e83acffb21ebecdaf91a78c8985d7f9db588eb`.
- Optimized build: `sUGR98CAgGW6z2Q02Hqdw`, served from this checkout on loopback port 6437.
- Windows 11 build 26200; Python 3.13.1; Chromium 151.0.7922.34; en-SG, Asia/Singapore, reduced motion and device scale 1.
- Evidence root: `D:\courses-main-evidence\alpha-edge-final-20260914\` through the ignored `.parity-evidence` junction.
- Reviewer: the implementing agent. No independent reviewer or owner acceptance is asserted.

## Implemented repair

The direct Alpha fixture previously replaced the card before Alpha with unrelated Viral Chart artwork, while the real New carousel produced a flat pink predecessor. Both paths now retain one coherent feature-card sequence.

When Alpha is the actually visible card, the preceding card renders the narrow Viral Hits boundary present in `54b01eab`. Three artwork-only source regions reconstruct the visible 26px edge while excluding the captured Previous control. The Previous control remains a real button, the overlay is tied to live carousel position rather than `data-source`, and it disappears after navigating away from Alpha.

The existing direct-fixture-only card substitution was removed. The focused regression now verifies the correct source identity in the direct fixture and continuous journey, persistence through Volume/Account controls, and removal after the real Previous action.

## Verification

Archive integrity, checklist coverage, typecheck, optimized build, five Python QA-tool tests and nine cover-integrity tests passed. The focused Alpha and New-carousel cases passed first against development.

The fresh optimized corpus then passed **164 rendered states** (159 desktop plus five responsive), **218 route checks** and **59 interaction regressions**, with zero failures. Candidate implementation and tooling hashes stayed stable from the beginning to the end of the run.

The exact-size comparison against the preceding verified baseline completed all 159 desktop states: **one lower over-20 residual, 158 unchanged and zero higher**. The only changed state was `54b01eab`:

| Comparison | Previous | Candidate | Change |
| --- | ---: | ---: | ---: |
| Direct over-20 | 9.430371% | 9.066461% | -0.363910 pp |
| Direct MAE | 6.739608 | 6.454005 | -0.285603 |
| Continuous over-20 vs source | 10.474037% | 9.915329% | -0.558709 pp |
| Continuous MAE vs source | 7.919306 | 7.498517 | -0.420789 |
| Continuous vs direct over-20 | 1.880460% | 0.977375% | -0.903085 pp |
| Continuous vs direct MAE | 2.312111 | 1.261407 | -1.050704 |

The continuous figures compare the real-control New→Alpha checkpoint with the same original and with its direct fixture. They do not erase the remaining live-session differences.

Evidence: `browser/results.json`, `comparison/metrics.json`, `comparison/index.html`, `browser/journeys/new-carousel-sidebar/`, and `alpha-metrics.json` beneath the evidence root. Superseded exploratory downloads and measurement scripts outside that root are not implementation inputs and are not committed.

## Remaining differences and acceptance

Readable whole-frame review confirms the predecessor motif and boundary now align materially better while the carousel remains live DOM. Remaining differences include sidebar/player material, lawful font metrics and icon contours, right-edge continuation, lower artwork, and the continuous session's profile/title differences. No screenshot is used as a page, and no captured arrow or player pixels were pasted into artwork.

This bounded repair does not establish the complete five-step New journey, any other recorded flow, or exact screen acceptance. **UI remains 159/159, MATCH 0/159 and FLOW 0/58.**
