# Sidebar material and signed-out Home review

Reviewed locally on 2026-09-15 in `J:\courses/main`, on top of `0a983829e5bf5fd66a5d75e4fe3d7859ae81661b`. This is implementation evidence, not clone acceptance. The immutable reference archive was not changed.

## Candidate and environment

- Implementation SHA-256: `fd0de3bc6130daecef3f279801b7d3fb209852e290679f3cd7db912a1940ec9d`.
- QA tooling SHA-256: `058ca23b03e49b12fabec324c437d74aeed6cfd5778d6d7de31dbdc1c89ea350`.
- Optimized build: `HyW8qwIiJlvPv3dZBxWuv`, served from this checkout on loopback port 6437.
- Windows 11 build 26200; Python 3.13.15; Chromium 151.0.7922.34; en-SG, Asia/Singapore, reduced motion and device scale 1.
- Optimized evidence root: `D:\courses-main-evidence\sidebar-material-final-20260915-044845\`.
- Focused evidence root: `D:\courses-main-evidence\sidebar-material-repair-focused-20260915-044308\`.
- Reviewer: the implementing agent. No independent reviewer or owner acceptance is asserted.

## Defect and active ownership

The ordinary left sidebar was still owned by the generic base `.music-sidebar` rule in `app/globals.css`: a flat `#fafafa` surface, weak 5% / 22px shadow and generic active-row fill. That combination had become visibly too flat and insufficiently separated after the right lyrics/queue panel received its own stronger glass treatment. The result made the two sides feel more alike even though no panel-open selector was actually leaking into the sidebar.

Computed-style and history inspection disproved two suspected causes: opening lyrics or Up Next did not mutate the sidebar material, and the carousel-underlay selectors did not leak into ordinary states. Alpha and Home underlay were already correctly owned by their state-specific translucent rules, while the concert detail retained its captured dark selector. The repair therefore changes only the ordinary base material and leaves those distinct state owners intact.

## Implemented repair

The ordinary sidebar now uses the reviewed neutral `rgb(249 249 251)` surface, an inset one-pixel material edge, a broader 12% / 36px exterior shadow, and the measured `rgb(239 238 241)` active-row fill. Its geometry remains 232px wide with 8px left, top and bottom insets; the 904px guest viewport correctly yields an 888px surface rather than hard-coding the 903px viewport's 887px height.

The signed-out Home source exposed a separate footer regression introduced when guest navigation was unified around the red text Sign In pill. Home now restores the compact icon-only profile affordance as real accessible DOM; it opens the existing sign-in dialog, closes with Escape and returns focus. Other guest and acquisition states retain their captured text button.

The signed-out Home player was also much too opaque. A source/render sweep found the captured warm translucent material at `rgb(255 255 243 / 50%)`; the existing 24px blur and 1.4 saturation remain. This uses the real red page beneath the player rather than a source-specific pink fill.

Browser regressions now assert exact ordinary, Alpha-underlay, Home-underlay and dark-concert sidebar ownership; opening, closing and reopening lyrics or Up Next cannot alter the unrelated sidebar; actual artwork remains beneath glass; guest sign-in focus returns; real Previous/Next controls work; and requests, console, hydration and horizontal overflow remain clean.

## Verification

Archive integrity, checklist coverage, typecheck, optimized build, five Python QA-tool tests and nine cover-integrity tests passed. The final focused run passed all six sidebar/player journeys with zero failures.

The fresh optimized corpus passed **164 rendered states** (159 desktop plus five responsive), **218 route checks** and **60 interaction regressions**, with zero failures. All 159 exact-size comparisons completed. Against the preceding pushed baseline, 45 over-20 residuals fell, 15 were numerically identical and 99 moved only by tiny threshold crossings; the largest rise was 0.011689 percentage points. Readable before/after review found no visible regression: the changed pixels were confined to the corrected sidebar edge/shadow, while the summed over-20 delta across the corpus was -2.811052 percentage points and summed MAE delta was -10.690476.

| Screen / region | Previous | Candidate | Change |
| --- | ---: | ---: | ---: |
| `e72be564` whole-frame MAE | 5.617697 | 5.328036 | -0.289660 |
| `e72be564` sidebar MAE | 4.777983 | 3.288301 | -1.489683 |
| `a917d88f` whole-frame MAE | 4.066425 | 3.777962 | -0.288464 |
| `1f9e170c` whole-frame MAE | 6.606871 | 6.314517 | -0.292354 |
| `aefa8502` over-20 | 7.223298% | 4.405267% | -2.818031 pp |
| `aefa8502` whole-frame MAE | 5.325646 | 3.424772 | -1.900873 |
| `aefa8502` footer MAE | 48.647446 | 5.135247 | -43.512199 |
| `54b01eab` over-20 | 7.892134% | 7.881983% | -0.010151 pp |
| `d5173715` over-20 | 5.936308% | 5.914467% | -0.021841 pp |
| `dcafd99e` whole frame | unchanged | unchanged | 0 |

The signed-out Home artwork region is pixel-identical to the immutable source. Its remaining differences are the captured marketing-background edge glows, lawful platform-font geometry/raster and player icon treatment. The ordinary New/Home/player screens still retain typography, player/control, lower-shelf and artwork discrepancies outside the repaired sidebar. Alpha and Home underlay still retain exact glass-distribution and lower-content blockers described in their earlier reviews. The concert screen is intentionally unchanged and remains blocked by whole-frame typography, icon, artwork and content residuals.

The live lyrics and queue journeys remain deterministic after this shell repair. Lyrics open/reopen screenshots are byte-identical at 36.520087% over-20 and 27.884589 MAE; queue open/reopen screenshots are byte-identical at 34.702996% and 28.036701 MAE. Their immutable endpoints still contain unrelated catalog/library/queue snapshots, so no hidden reset or FLOW acceptance was introduced.

Evidence includes `browser/results.json`, all journey `steps.jsonl`, `comparison/metrics.json`, `comparison/index.html`, focused observations, source/render/amplified-difference images and the readable sidebar regression composites beneath the evidence roots.

## Acceptance boundary

No screenshot is used as a page, no captured sidebar/player/control pixels are pasted into artwork, and all journeys use real controls without force-clicking or injected state. The repaired states are materially closer, but the concrete blockers above remain visible. **UI remains 159/159, MATCH remains 0/159 and FLOW remains 0/58.**
