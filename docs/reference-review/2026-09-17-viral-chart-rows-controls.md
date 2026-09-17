# Viral Chart rows and real-control review

Reviewed locally on 2026-09-17 in `J:\courses/main`, on top of `8aabf6d651852ef467e2d83dbf12c232058963a1`. This is implementation evidence, not clone acceptance. The immutable reference archive was not changed.

## Candidate and environment

- Implementation SHA-256: `0e06ee9cd9a83db22aa3dc3de305e2d484745e3ed076bc0473eb8720e8ec5d81`.
- QA tooling SHA-256: `51589d159f3da5351bddfaff8a3b7c552d5772300900f6957eb938de12c50a91`.
- Optimized build: `34gwP38nRlIk-xYO0T56Z`, served from this checkout on loopback port 6437 and stopped after verification.
- Windows 11 build 26200; Python 3.13.15; Playwright 1.62.0; Chromium 151.0.7922.34; en-SG, Asia/Singapore, reduced motion and device scale 1.
- Final evidence root: `D:\courses-main-evidence\viral-chart-full-20260917-055328\`.
- Focused source-backed evidence: `D:\courses-main-evidence\viral-chart-focused-20260917-054929\` and `D:\courses-main-evidence\viral-chart-source-backed-20260917-055053\`.
- Readable final and worsened-state review: `C:\Users\radev\courses-review\viral-chart-final-optimized\` and `C:\Users\radev\courses-review\viral-chart-full-worsened\`; the worsened-state evidence is also copied under the final evidence root.
- Reviewer: the implementing agent. No independent reviewer or owner acceptance is asserted.

A preliminary optimized process and evidence root from the preceding session served stale compiled CSS despite hashing the newer working tree. That candidate was rejected, its exact project listener was stopped, and none of its measurements were used for this checkpoint.

## Defects and active ownership

The live Viral Chart used the correct songs and broad table structure, but the saved source exposed a tighter table grid, 39 px artwork, different column starts, a higher header baseline, subtler row separators, darker song-title ink, lighter metadata ink, a smaller favourite star, and different duration/More geometry. The existing browser regression opened the chart through the real New-page heading but did not yet prove the row geometry and complete control path.

The implementation owner remains `components/music-chart-schedule.tsx`; this batch changes only its scoped visual rules in `app/reference-fidelity.css`. The regression owner is `scripts/browser_discovery_shelves.py`. No shared table primitive, unrelated screen family or immutable source asset was changed.

## Implemented repair

The chart table now uses a desktop-only scoped column grid, measured 39 px art and 11 px title inset, source-aligned header/metadata baselines, exact title/metadata/More ink, a 17 px More glyph and inset one-pixel rules owned by pseudo-elements. The favourite marker uses the source-supported dark red, 0.95 opacity and 9 px live SVG. The existing 33 px heading and 32.5 px live star remain real DOM/SVG controls.

All selectors stay under `.chart-page > .chart-table` and the desktop breakpoint. No screenshot, captured text, player pixels, mask, resized candidate, hidden hotspot or threshold change was introduced.

## Exact geometry and readable review

The final browser regression asserts the chart at the exact 1440x903 source viewport:

- table `x=286`, `y=97`, width `1116`;
- header height `28` and `translateY(-2px)`;
- visible column starts `292`, `683.90625`, `968.734375` and `1309`;
- first row `y=125`, height `51.5`;
- first artwork `x=292`, `39x39`; title start `x=342`;
- More button `x=1356`, width `28`, with a 17 px glyph;
- inset rules `left=10px`, `right=0`, `bottom=-1px`, height `1px`;
- explicit badge `9x10`, 7 px text, 10 px line-height and 2 px radius;
- bottom visible row `y=846`, height `51.5`.

Readable source/render/amplified-difference review covered the complete optimized frame, heading, header, representative top rows, bottom rows, sidebar and player. The geometry is materially closer. Remaining difference energy is concentrated in lawful platform text/SVG raster, sidebar/player contours and smaller row-artwork decoding details; those remain visible and block MATCH.

## Real-control verification

The strengthened registered `discovery-typography-symbols` case preserves its source-aligned New, chart and Home captures, then re-enters through visible controls and proves the live chart without a direct URL jump, state injection or force click:

1. New navigation and the real `Favourite These Viral Hits` heading open the chart.
2. `drop dead` starts through its visible Play control; Pause, now-playing identity and silent preview behavior are asserted.
3. Favourite and unfavourite round-trip through the actual star control.
4. The actual More menu exposes all ten menu items; Escape closes it and returns focus to More.
5. The unavailable `Kiss It Better` row remains unavailable and does not replace the active player item.
6. Artist and album links navigate to Olivia Rodrigo and `you seem pretty sad for a girl so in love`; browser Back returns to the chart while preserving player continuity.
7. The player pauses through the real Pause control.

The focused development run and final optimized registered run both passed. Ordered journey captures and `steps.jsonl` are preserved under the final browser evidence.

## Exact optimized measurements

Against the pushed `8aabf6d` discovery-typography checkpoint:

- Viral Chart `8a234785` improved from `3.865631` to `3.751661` MAE and from `3.643103%` to `3.585118%` over-20.
- Corpus mean MAE improved from `5.263068` to `5.262063`.
- Corpus mean over-20 improved from `5.353294%` to `5.353007%`.
- Twelve states improved in MAE, one had a tiny MAE increase, four improved over-20 and six had a tiny over-20 increase.
- 146 states are byte-identical to the baseline. Thirteen changed render hashes: the intended Viral Chart repair, seven max-one-channel variations, one max-two-channel variation and four artwork/video decode variations with a maximum channel difference between 8 and 19.

Every state with a positive delta in either metric was reviewed source/baseline/current/candidate-change:

| Screen | Delta MAE | Delta over-20 | Baseline-to-candidate finding |
| --- | ---: | ---: | --- |
| `ffd1356a` | `-0.000951` | `+0.006537%` | album/video artwork decode variation, max channel 15; no geometry, copy, state or control change |
| `3731221f` | `+0.000993` | `+0.003307%` | New feature/row artwork decode variation, max channel 19; no readable UI regression |
| `484851bf` | `-0.006346` | `+0.002307%` | artist hero/card artwork decode variation, max channel 8; no readable UI regression |
| `edae3407` | `-0.001501` | `+0.000538%` | max-one-channel image-edge drift |
| `898ca766` | `-0.001641` | `+0.000231%` | max-one-channel image-edge drift |
| `0c042c32` | `-0.001301` | `+0.000154%` | max-one-channel image-edge drift |

No concrete unintended regression was found in the readable review. Numerical threshold crossings are recorded rather than hidden, but they are not treated as MATCH acceptance.

## Full optimized corpus

Archive integrity, checklist coverage, typecheck, optimized build, five Python QA-tool tests and nine Node cover-integrity tests passed. The final optimized run passed **164 rendered states** (159 desktop plus five responsive), **218 route checks** and **66 interaction regressions**, with zero failures.

All **159 exact-size comparisons** completed with zero functional failures. Evidence includes `verification-summary.json`, `browser/results.json`, `comparison/metrics.json`, `comparison/index.html`, `delta-summary.json`, the complete source/render/difference gallery and `worsened-review/` under the final evidence root.

## Remaining visible blockers

The chart is closer, but the complete readable frame still differs in lawful heading/table/sidebar typography, SVG contour antialiasing, some row artwork/crop decoding, player symbols/material and smaller sidebar details. These are concrete visible blockers. This batch also proves one real chart journey but does not compare every ordered state of any archived flow; it therefore grants no FLOW acceptance.

## Acceptance boundary

No screenshot is used as a page, no text/control pixels are pasted into artwork, no threshold is relaxed, and no direct endpoint sequence is presented as a recorded journey. **UI remains 159/159, MATCH remains 0/159 and FLOW remains 0/58.**
