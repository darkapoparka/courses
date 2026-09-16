# Lower release editions and legacy player material review

Reviewed locally on 2026-09-16 in `J:\courses/main`, on top of `dda57fac29b21023965393c74c124621fbcbd807`. This is implementation evidence, not clone acceptance. The immutable reference archive was not changed.

## Candidate and environment

- Implementation SHA-256: `5a0967e4ed96be2d048d3e787549f76f102c6f0aa60417c44ce07d559d274b01`.
- QA tooling SHA-256: `93e2d205bc23f100bee6d9dfbcef3f5bb644452e395a2e18f98dd55afb3e4aa8`.
- Optimized build: `iOQ4wINUXolR1BwFqAY4c`, served from this checkout on loopback port 6437 and stopped after verification.
- Windows 11 build 26200; Python 3.13.15; Playwright 1.62.0; Chromium 151.0.7922.34; en-SG, Asia/Singapore, reduced motion and device scale 1.
- Final optimized evidence root: `D:\courses-main-evidence\release-final-151-20260916-090731\`.
- Focused real-control evidence: `D:\courses-main-evidence\focus-release-20260916-084928\`.
- Reviewer: the implementing agent. No independent reviewer or owner acceptance is asserted.

## Defects and active ownership

The initial and current New captures did not share one generic lower-release row. `e72be564` uses the repeated source order `cover-9`, `cover-9`, `cover-5`, a partial `cover-7`, `cover-7`; the named-profile/listening family uses `cover-9`, `cover-1`, `cover-9`, `cover-5`, `cover-7`. Only the outer artwork strips had previously been source-owned, leaving the three covers beneath the floating player on the wrong edition and therefore feeding the wrong colour through real translucent glass.

The fourth initial cover is never unobscured in the immutable frame. Its truthful implementation requires a provider-backed partial underlay plus source-owned lower and right-edge fragments that exclude all player pixels. Repeated cover identities also required stable index-qualified React keys so duplicate catalog cards are not conflated during live navigation and control changes.

Legacy discovery states were still inheriting the ordinary 74% / 28px player glass. Their measured material is more transparent and saturated. Navigation editing could also replace that legacy material with a generic inline style. The active owners are `NewView` in `components/music-discovery.tsx`, `Player` in `components/music-player.tsx`, and the catalog-scoped rule in `app/player-fidelity.css`.

## Implemented repair

`NewView` now selects exact lower-release arrays for the initial, current, localized, panel and legacy editions. All five visible lower fragments are source-owned for the applicable fixture; the three middle masks expose only the band below the live player plus the lawful outer edge where present. Clean full covers remain provider-backed. No player, text, button or captured control pixels are pasted into artwork.

The source identity is retained after real controls clear fixture routing. Duplicate cards use an index-qualified key. The legacy catalog now owns `rgb(249 249 251 / 54%)`, `blur(16px)` and `saturate(1.8)` beneath `.capture-discovery[data-catalog="legacy"]`; open panels, current New, Home, expanded media and radio preserve their independently reviewed material. The navigation editor no longer overwrites legacy glass.

`browser_discovery_shelves.py` now verifies exact initial/current/localized cover orders, every masked artwork fragment, legacy/player material, panel exit/re-entry, and edition persistence through real Volume controls. The registered suite increased from 62 to 65 interaction regressions.

## Verification

Archive integrity, checklist coverage, typecheck, the optimized production build, five Python QA-tool tests and nine Node cover-integrity tests passed. The final optimized corpus passed **164 rendered states** (159 desktop plus five responsive), **218 route checks** and **65 interaction regressions**, with zero failures. Candidate implementation and QA hashes were identical before and after the run.

All **159 exact-size comparisons** completed with zero functional failures. Corpus mean MAE changed from `5.420352` to `5.309224` (`-0.111128`); mean over-20 residual changed from `5.535588%` to `5.379484%` (`-0.156104` percentage points).

Every one of the 23 directly affected states improved in both metrics. Representative results:

| Screen | Previous MAE / over-20 | Candidate MAE / over-20 | Change |
| --- | ---: | ---: | ---: |
| `e72be564` | 5.213605 / 6.426572% | 4.319364 / 4.819506% | -0.894240 / -1.607066 pp |
| `4f611a9e` | 5.399554 / 6.356820% | 4.593030 / 5.285468% | -0.806524 / -1.071352 pp |
| `54b01eab` | 5.754271 / 7.880676% | 5.014292 / 7.157700% | -0.739979 / -0.722976 pp |
| `11803c64` | 6.304601 / 6.833087% | 4.540586 / 5.138581% | -1.764016 / -1.694506 pp |
| `1f9e170c` | 6.257022 / 6.849929% | 4.533112 / 5.175341% | -1.723911 / -1.674588 pp |
| `fc5d84bd` | 6.502876 / 7.189574% | 5.659727 / 6.048734% | -0.843149 / -1.140840 pp |
| `be864051` | 6.454397 / 7.245293% | 5.703245 / 6.760490% | -0.751152 / -0.484804 pp |
| `e027fe6d` | 6.715204 / 6.013135% | 6.383223 / 4.870032% | -0.331981 / -1.143103 pp |

The complete 23-state table is in `verification-summary.json` and `comparison/metrics.json` under the evidence root.

## Full-corpus regression review

MAE improved on 84 states and increased on 75. Over-20 residual improved on 82 states and increased on 77. The union contains 106 states with at least one positive numerical delta. All 106 were reviewed in fourteen source/baseline/current/source-difference/candidate-change contact sheets under `worsened-review/`.

The largest MAE increase was `a4afd6e6` at `+0.160269`, with only `+0.011536` percentage points over-20. The largest over-20 increase was `468b0465` at `+0.219561` percentage points and `+0.140352` MAE. Priority sheets also cover `a917d88f`, `2f5da478`, `d5173715`, search, dialogs, expanded player, radio, Replay and account states. The candidate-change sheets show sparse antialiasing, blur and threshold-edge movement; no concrete unintended artwork, geometry, copy, state or control regression was found.

The accepted evidence includes `verification-summary.json`, `browser/results.json`, all journey `steps.jsonl`, `comparison/metrics.json`, `comparison/index.html`, complete source/render/difference galleries, fourteen all-increase review pages and the priority full-frame sheets.

## Remaining visible blockers

Lower release identity is materially closer, but exact shelf captions, metadata, lawful type raster, some complete cover editions and City Chart artwork still differ. Alpha retains the known live profile/title snapshot difference and still needs control/material finishing.

The current player still has lawful symbol-contour and now-playing typography/geometry discrepancies. Lyrics fade/blur/scroll, queue rows and the unsupported endpoint catalog/library/queue discontinuities remain separate blockers. Signed-out Home retains small text/button raster and idle-symbol differences.

## Acceptance boundary

No screenshot is used as a page, no player/sidebar/text pixels are pasted into artwork, no comparison threshold was relaxed and no forced click or state injection is presented as a flow. The corrected states are materially closer and regression-covered, but the concrete blockers above remain visible. **UI remains 159/159, MATCH remains 0/159 and FLOW remains 0/58.**
