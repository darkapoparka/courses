# Reference audit — findings, not acceptance

## 2026-09-25 Connected Accounts and Content Restrictions acceptance

The [account acceptance review](reference-review/2026-09-25-account-connected-restrictions-acceptance.md) accepts exact states `b2e0f231`, `f99d9583`, `0da4882b`, `8b9e8598`, `0260ef9f`, `5b34ad72`, `7437b956`, `6436de36`, and `c0997fe5`, plus continuous real-control journeys `FLOW-d1a98fb1` and `FLOW-29245bc1`. Exact production verification passed 164 browser states, 218 routes, 127 interactions and 159 comparisons with zero failures and stable source identity. Readable full-frame and regional review found only lawful raster, antialiasing, border and blur residuals. Ledger: **UI 159/159, MATCH 122/159, FLOW 31/58**.

## 2026-09-25 expanded live-radio and continuous journey acceptance

The [live-radio review](reference-review/2026-09-25-radio-live-acceptance.md) accepts `MATCH-7bd2ef54` and `FLOW-868aa817`. Exact review confirms the radio-only ambient field, controls and 0.63 volume have no remaining actionable product mismatch. The four-step live path now reproduces the saved one-row launch chrome and three-row selected/playing chrome through visible hover, click and expand controls; the canonical regression also passes lyrics, stop/restart, close and error checks. The stable candidate passed 164 browser states, 218 routes, 124 interactions and all 159 comparisons with zero functional failures. Ledger: **UI 159/159, MATCH 113/159, FLOW 29/58**.

## Latest starting trial checkout matches

The [2026-09-23 trial checkout review](reference-review/2026-09-23-starting-trial-checkout-matches.md) accepts `MATCH-b74d25cb`, `MATCH-94b9d90d`, `MATCH-a728c2af`, `MATCH-06ea37ef`, `MATCH-5175a910`, `MATCH-ecb33359`, and `MATCH-bf099ae2` after exact 1440 × 903 source/render/residual review. The fresh optimized candidate (`yA4L7Jwf1ReiiuJdkX1Fu`, app `6387e08df950ff9012cf82ebc7ab27dee4bcc2cab72b727e2573d8ccbcc56b0c`, QA `18425a67e002b0412ac9b06f91f4051786cf9319e3f09f89767502c1a3513d57`, Chromium `151.0.7922.34`) passed 159 desktop captures, five responsive samples, 218 routes, and 124 interactions with zero failures; all 159 comparisons completed. The ten-step real-control trial path passes, but `FLOW-32937ec7` stays open because its motion clip was not reviewed. Ledger: **UI 159/159, MATCH 110/159, FLOW 26/58**.

## Latest Radio screens and flows

Latest optimized Radio candidate: app identity `bff0cfe37cf1b14489847886ceb6af56309c9739852396a7694d9aaf18c9062d`, QA identity `18425a67e002b0412ac9b06f91f4051786cf9319e3f09f89767502c1a3513d57`, build `IZsXtUJrQtuyr8ypMB7xi`, served on local port 6473 with Chromium `151.0.7922.34`. The fresh full rerun captured 164 states, checked all 218 routes and ran 124 registered interactions with zero failures; all 159 exact-size comparisons completed. Direct Radio matches `37575452` and `f49fce21` and flows `4239264b` and `e7c28ffc` are accepted after exact-state and continuous real-control review. `FLOW-e7c28ffc` retains only All Playlists across New → Radio → Top Stations, matching all saved frames; other New-start library journeys pass with their recorded rows intact. Existing direct Radio accepts remain `4cb8f3aa`, `0920d819`, `a9992e55` and `47a07865`. On `7bd2ef54`, the saved volume at 0.63 matches; keep it open for ambient backdrop and glyph residuals. Keep `868aa817` open because its selected/playing snapshots differ from its continuous session sidebar. [New-to-Radio flow review](reference-review/2026-09-23-radio-entry-flow-acceptance.md), [Radio screen/schedule review](reference-review/2026-09-23-radio-selected-schedule-acceptance.md). Ledger: **UI 159/159, MATCH 112/159, FLOW 28/58**.

## Latest Account Settings and flow findings

The [2026-09-23 Account Settings screen and flow review](reference-review/2026-09-23-account-settings-flow-review.md) accepts direct `MATCH-481cd568` after exact 1440 × 903 source/render/residual review. The Account Settings summary, billing and region fields, Radio selection, Account Access teaser, sidebar, footer and player align; only small raster/edge residuals remain. The new optimized build `9trrKgS97OiuUzDZCedaU` (app `19b5a0f2af4f2abfc711a73be3bb16864e1a75a2c15a08b35aec156d8e0b8a06`, QA `6164bae460bbef08f1853a539efd008676a3932091a94f2a84d3848e782e310d`) passed 164 captures, all 218 route steps and 117 registered interactions; all 159 exact-size comparisons completed. The Settings and Logging out journeys passed their real controls in the canonical runner, but stay open because their intermediate source stills conflict with the actual playlist/sidebar state. Current ledger: **UI 159/159, MATCH 99/159, FLOW 26/58**.

## Account Access and Parental Controls exact-state matches

The [2026-09-23 account access and parental-controls review](reference-review/2026-09-23-account-access-parental-controls-match.md) accepts direct states `MATCH-1e5b4763` and `MATCH-01f96377` after native-size source/render/residual inspection. The 1440 × 903 account-access state preserves the exact copy and line wraps; the parental-controls state matches the rating values, switch/select geometry and All Playlists rail. The current optimized run used build `9trrKgS97OiuUzDZCedaU`, application identity `19b5a0f2af4f2abfc711a73be3bb16864e1a75a2c15a08b35aec156d8e0b8a06`, QA identity `6164bae460bbef08f1853a539efd008676a3932091a94f2a84d3848e782e310d`, and Chromium `151.0.7922.34`; 164 captures, 218 routes and 117 interactions completed with zero failures. These screen reviews do not accept account flows. Current ledger: **UI 159/159, MATCH 99/159, FLOW 26/58**.

## Latest Account Settings subscriptions exact-state match

The [2026-09-23 account subscriptions review](reference-review/2026-09-23-account-subscriptions-match.md) accepts direct `MATCH-44101453`; the fresh optimized comparison reconfirms it at 1440×903 with source SHA `f3aedab17874f2a85aa08d16fdd6f82e145613aa8c60e7e5e91b5de55b7b8d00`, render SHA `b579005f9a9e4da245c84e9cdcd4f26ad3837e852612f3fead10f44ecc917984`, MAE `3.038187` and over-20 `2.558063%`. The restriction values, selected New sidebar, subscription row, footer and player align. `FLOW-16a876bc` remains open because later saved cancellation stills change the profile from `SmithAlex` to `Alex Smith`, while the actual preview preserves its starting identity. Current ledger: **UI 159/159, MATCH 99/159, FLOW 26/58**.

## Queue-panel exact-state match

The [2026-09-23 queue-panel review](reference-review/2026-09-23-queue-panel-match.md) accepts direct fixture `MATCH-8f029018` after readable exact 1440×903 source/render/residual inspection. All 12 queue rows, controls and surrounding New page match. The same review exercised recorded `FLOW-e0a0f93e` from its permitted first screen through the actual Up Next control: the live session preserves 14 tracks and an empty tail row, while the recorded endpoint has a different discovery snapshot and 12-track queue. Keep that flow open; do not reset the current session to mimic the endpoint. The latest candidate has app identity `0a6ca47171b3bbc43f8624e12297759ab11f279b2ba16895bed177d64f7837fa`, QA tooling identity `6164bae460bbef08f1853a539efd008676a3932091a94f2a84d3848e782e310d`, build `PjyQ3GZpF6in3orwLeWc5`. Latest optimized run: 164 captures, 218 routes, 117 interactions; the queue-entry regression passed, one unrelated sidebar timeout passed on isolated retry, and all 159 comparisons completed. The live ledger is **UI 159/159, MATCH 95/159, FLOW 26/58**.

## Latest expanded-player subtitle exact-state match

The [2026-09-23 subtitle review](reference-review/2026-09-23-expanded-player-subtitle-match.md) accepts `MATCH-b3f29b6f` after readable 1440×903 source/render/residual inspection. At 0:54 the metadata ticker now begins with “Rodrigo” and clips after “in,” as in the original; its 29px clip reduction is limited to the default Olivia track and returns to full width by 1:13. The optimized candidate `0a6ca47171b3bbc43f8624e12297759ab11f279b2ba16895bed177d64f7837fa`, QA `c04631d37bdcbdec75a09b2a3d5d26d794509a2dfb1062dc06c23029416bde34`, build `PjyQ3GZpF6in3orwLeWc5`, passed 164 captures, all 218 routes and all 116 interactions with zero failures; all 159 exact-size comparisons completed. The live ledger is **UI 159/159, MATCH 94/159, FLOW 26/58**. This advances one screen only.

## Latest expanded-player menu and Add to Library acceptance

The [2026-09-23 expanded-player menu and Add to Library review](reference-review/2026-09-23-adding-to-library-flow.md) accepts `MATCH-96711b04` and `FLOW-80cc296e`, and rechecks accepted `MATCH-ac05c6b8` after the shared four-pixel menu-position correction. The corrected menu begins at `x=587`, matching the source anchor. The complete `b3f29b6f → ac05c6b8 → 96711b04` sequence passed through visible controls in the optimized 1440×903 desktop browser: start local silent preview, open More at 1:13, select Add to Library and retain the menu through 1:21. The changed menu exposes Pin Song and Delete from Library. That review's candidate passed 164 captures, 218 route checks, 116 interactions and 159 exact-size comparisons with zero failures after visible artwork decoded. At that checkpoint `b3f29b6f` remained independently unchecked; the subtitle review above later accepts it.

## Latest expanded-player track-menu exact-state acceptance

The [2026-09-23 track-menu review](reference-review/2026-09-23-expanded-track-menu-acceptance.md) accepts `MATCH-ac05c6b8` after exact 1440×903 source/render/residual review. Action order, live anchor, lyric content, album crop, current favourite and library state match the original. Residual movement is in the playing preview material and glyph raster; no concrete menu mismatch remains. Candidate app `85661c42b0fda0181ff648e08e9b880403f31c02e577cb2223d04553cb230669`, QA `300a4a68afe9df0de8d8cc983c28e9cd722c83bec3ad7e197976099ac53afc87`, build `zHOP0llQ0Mepv9dKQd5eT`. This accepts only the screen, not its related flows. At that checkpoint the ledger was **UI 159/159, MATCH 92/159, FLOW 25/58**.

## Latest onboarding screen and recorded-flow acceptance

The [2026-09-23 onboarding review](reference-review/2026-09-23-onboarding-acceptance.md) accepts seven exact states (`4a1d7759`, `cd34d1ac`, `eebd5ffb`, `269160a4`, `99af3033`, `dfce44a2`, `51c79ae2`) and the complete ten-step `FLOW-43dfc8c6`. Exact 1440×903 source/render/residual review found matching content, control state and geometry, with only minor text/icon raster and one-to-three pixel edge residuals. All ten live-control captures are byte-identical to their direct candidate captures, and all source hashes match. The optimized candidate passed 159 desktop captures, five responsive captures, 218 route checks and 115 interactions with zero failures; all 159 comparisons completed. Candidate app `85661c42b0fda0181ff648e08e9b880403f31c02e577cb2223d04553cb230669`, QA `300a4a68afe9df0de8d8cc983c28e9cd722c83bec3ad7e197976099ac53afc87`, build `zHOP0llQ0Mepv9dKQd5eT`, Chromium `151.0.7922.34`. Ledger: **UI 159/159, MATCH 91/159, FLOW 25/58**.

## Latest sign-in email form exact-state acceptance

The [2026-09-23 sign-in review](reference-review/2026-09-23-auth-form-acceptance.md) accepts `MATCH-ee751367`, `MATCH-bdc56e10`, `MATCH-3131018d` and `MATCH-417f6129` after exact 1440×903 source/render/residual review. Filled forms now show the source’s small “Email address” caption above the value; both sign-in offer variants were checked against their originals. The optimized candidate passed 159 desktop captures, five responsive samples, 218 route checks and 114 registered interactions with zero failures; all 159 comparisons completed. Candidate: app `85661c42b0fda0181ff648e08e9b880403f31c02e577cb2223d04553cb230669`, QA `5dddcf2a6a38a17badfd8c6a376ec7ac9038ba77958605f0d8e11f823c350542`, build `zHOP0llQ0Mepv9dKQd5eT`, Chromium `151.0.7922.34`. The current ledger is **UI 159/159, MATCH 84/159, FLOW 24/58**.

## Latest Artist music-video exact-state and flow acceptance

The [2026-09-23 Artist video review](reference-review/2026-09-23-artist-video-acceptance.md) accepts `MATCH-898ca766`, `MATCH-a4afd6e6` and the source-ordered `FLOW-d3879ab4` through live hover/play controls. The optimized candidate on source commit `d71c3c4355d847867fc04aa1f4b69cb8035aba4d` passed 164 captures, all 218 routes and 114 interactions with zero failures; all 159 comparisons completed. Candidate identity is app `d67e399a8012c1c79e518bc786c33f36b632f9f621f3f81287628d6a72b8f722`, QA `5dddcf2a6a38a17badfd8c6a376ec7ac9038ba77958605f0d8e11f823c350542`, build `-oL-_jbOI5C3V7rDnJ11y`, Chromium `151.0.7922.34`. The live ledger is **UI 159/159, MATCH 80/159, FLOW 24/58**.

## Latest Artist hero/menu exact-state acceptance

The [2026-09-23 Artist review](reference-review/2026-09-23-artist-hero-menu-acceptance.md) accepts the initial Artist hero and both Artist-menu frames after exact-size source/render/residual review. Candidate identity is `cd66f153e23482511b06ce51655f372769bed6d54de4424c8b4c9e2359bfbe61`; evidence root is `.parity-evidence/full-production-final-normalized-20260923-004700`. The optimized candidate passed 159 desktop states, five responsive states, all 218 routes and all 113 registered interactions with zero failures; all 159 comparisons completed. All three recorded Artist journeys were exercised through visible controls. The three frames now show matching hero composition, menu geometry and persisted state; remaining residuals are video-decoder and lawful platform-raster variation. Ledger: **UI 159/159, MATCH 77/159, FLOW 23/58**. The [2026-09-22 Artist scroll/concert review](reference-review/2026-09-22-artist-scroll-concert-acceptance.md) remains the historical evidence for its original six-state candidate.

The [2026-09-23 lyrics-panel review](reference-review/2026-09-23-lyrics-panel-match.md) accepts `MATCH-ee8db412` after readable exact-size review of its source, optimized render and residual. Its separate live-entry flow remains open because of a recorded catalog/session mismatch. The live ledger is now **UI 159/159, MATCH 78/159, FLOW 23/58**.

## Latest Playlist acceptance

The [Emotional Songs Playlist review](reference-review/2026-09-21-playlist-acceptance.md) accepts the initial and four-song states after exact source/current/residual review, then accepts Playlist detail and Add suggested song through visible real controls. The ledger is **UI 159/159, MATCH 65/159, FLOW 13/58**. The app checkpoint passed the complete clean-checkout corpus; no application or frozen-reference file changes in this acceptance-only batch.


## Latest ready-flow acceptance

The [shuffle, repeat and Favourite Songs review](reference-review/2026-09-21-ready-flow-acceptance.md) registers the two missing compact-player journeys and reconfirms the existing Favourite Songs journey through visible controls. Every endpoint was already MATCH-complete, so no visual acceptance changes. The live ledger becomes **UI 159/159, MATCH 63/159 and FLOW 11/58**. Publication CI must pass the exact pushed SHA; the preceding album clean checkout remains the parent verification baseline.

## Latest album exact-state acceptance

The [album acceptance review](reference-review/2026-09-21-album-acceptance.md) records the current optimized candidate: 159 canonical desktop captures, five responsive captures, 218/218 route steps and 105/105 interaction regressions pass with zero failures. Eight album-detail/editorial MATCH states and three real-control album journeys are accepted. The sole live ledger now reports **UI 159/159, MATCH 63/159 and FLOW 8/58**. Older sections retain their historical candidate scope and do not override checked task rows.


## Latest signup-control follow-up

[Source-supported native-control repairs](reference-review/2026-09-20-signup-control-chrome.md) refine the four signup states, with 98 full-corpus interaction tests passing. The native New review still finds selected-row and glass/underlay differences; acceptance remains 22/159 and 3/58. Older findings keep their original candidate scope.


## Latest player/Replay/release implementation

The [verified checkpoint](reference-review/2026-09-20-player-replay-release-checkpoint.md) supersedes older runtime observations. The ATEEZ release mapping is implemented and real navigation preserves it. Expanded/menu/lyrics, modal, playback, signup, account and Replay changes pass the fresh optimized corpus. Acceptance remains 22/159 and 3/58; remaining visual and session defects are listed explicitly. Earlier sections describe their original candidates.


Updated 2026-09-20 for the verified session/discovery recovery batch. [Handoff](handoff.md) owns source, server and publication state; acceptance remains solely in [tasks](tasks.md).

## Latest session/discovery recovery findings

Autoplay, queue metadata, guest/member session state and per-visit browse positions now survive real navigation. The queue owns its recorded titles, credits, artwork and durations independently of the current route. A reproduced Account -> Sign Out -> Search -> Back bug no longer restores the signed-in interface. The local sign-in and checkout completion paths retain history-entry metadata.

The preserved public/discovery batch, current-New 50% / 16px / saturation-2 player material, compact selection corners and registered controls passed a fresh optimized run: **159 desktop states, five responsive states, 218 routes and 78 interaction tests, zero failures**. All 159 exact-size comparisons completed. Mean MAE improved 5.190585576 -> 5.049159017; mean over-20 improved 5.277333751% -> 5.154771669%. The earlier single ERR_NO_BUFFER_SPACE capture failure remains preserved separately.

The 28 positive-delta states were reviewed as readable source/published-baseline/current triples. No additional batch-owned layout/catalog/control-state regression was found; inherited visual defects remain explicitly documented. No MATCH or FLOW checkbox changed: acceptance remains **22/159 and 3/58**.

The next concrete content defect is the named/playing New second release: the current mapping is still Lover, while the saved artwork evidence matches GOLDEN HOUR : Part.5. Provider metadata and native artwork-fragment evidence were identified, but the attempted mapping write was blocked and was not applied. Do not report it fixed or bypass the safeguard. The initial New edition has a different second card and must not be changed indiscriminately.

Expanded menu states also retain an inherited extra grey backplate/edge, exact menu/lyric geometry and emphasis differences. Its owner is not yet established. The clean c939c9b8 original does not establish UI contamination in its artwork. Trace the live DOM and active styles instead of assuming a cause.

The [dated recovery review](reference-review/2026-09-20-session-discovery-recovery.md) records the exact build, hashes, test results, complete positive-delta review and remaining defects. Evidence is under `J:\courses\apple-music-clone\.qa\evidence\resume-20260920`; [latest metrics](reference-review/latest-metrics.json) comes from the successful optimized rerun.

## Previous initial New/shared discovery progress findings

Initial/current New now owns a live source-backed partial third feature card, a sixteen-row Viral Hits rail with real overflow and playback controls, measured current-New player glass and exact desktop row tracks. The old source-conditioned third-card screenshot/text pseudo-elements are removed. Unknown offscreen metadata remains undisclosed rather than fabricated.

Fresh optimized verification passed 159 desktop states, five responsive states, 218 route checks and 71 interaction regressions with zero failures. All 159 exact-size comparisons completed. Corpus mean improved `5.240636608 â†’ 5.190585576` MAE and `5.323660568% â†’ 5.277333751%` over-20. `e72be564` improved to `3.411616` MAE / `3.943645%` over-20.

The complete positive-delta union and eight threshold-positive lyrics-dialog, concert-calendar, milestone and queue states were reviewed source/baseline/current/difference. Their visible product structure is stable; no new geometry, copy, state, session or control regression was found. Existing New typography, symbols, metadata, lower-shelf/City Chart, player details and Alpha profile/title differences keep every related MATCH/FLOW open.

The [dated review](reference-review/2026-09-18-new-initial-family-progress.md) records exact ownership, dimensions, hashes, real-control evidence, full-corpus review and blockers. The dated review preserves this historical candidate; [latest metrics](reference-review/latest-metrics.json) now records the current recovery batch.

## Previous Search-family screen and journey findings

Six additional Search frames are now accepted through live state ownership rather than endpoint-only compensation: `035569a0`, `812ba627`, `4b515439`, `e70094e3`, `bbb92581` and `f4a8b5dc`. The previously accepted empty-library frame `5b3ec96a` is reconfirmed.

`components/music-search.tsx` now owns suggestion-open, bottom-scroll and submitted-results state; `capture-content.css` owns the measured field, focus ring, suggestion glass, compact filled Clear control, results spacing and rail geometry; `player-fidelity.css` owns the ordinary Search player material; and `reference-fidelity.css` follows live submitted-results state. `recorded-searching-apple-music` traverses focus/type `olivia`, suggestions, Enter submission and Your Library through visible controls. Every continuous checkpoint is byte-identical to its direct candidate fixture, retains ordered screenshots and `steps.jsonl`, and verifies Escape focus return and player continuity.

Fresh source-clean optimized verification passed 159 desktop states, five responsive states, 218 route checks and 70 interaction regressions with zero failures. All 159 exact-size comparisons completed. Corpus mean improved `5.256962793 → 5.240636608` MAE and `5.350413054% → 5.323660568%` over-20. Seven render hashes changed; all seven improved, 152 states retained both metrics and the positive-delta union is empty.

`FLOW-638262c8` is accepted. `FLOW-6c5d545e` remains open only because its permitted initial frame `e72be564` is not MATCH-complete; its three Search endpoints and continuous/direct equivalence are now complete.

The [dated Search-family review](reference-review/2026-09-18-search-family-match.md) records exact ownership, geometry, hashes, readable source/render/difference review, real-control evidence, corpus review and the remaining flow boundary. The dated review preserves this historical candidate; [latest metrics](reference-review/latest-metrics.json) now records the current recovery batch.

## Previous Library-family screen and journey findings

Fourteen coherent Library screens are now accepted through their shared implementation owners rather than isolated fixture patches. The repair covers the compact top bars, Albums height, sort/menu anchors and material, checked-symbol placement, compact action glyph contours, Recently Added and Made for You empty symbols, and source-supported footer state.

The registered Library suites traverse Artists, Albums, Songs, Music Videos, sorting, pinning, playlists, favourites, empty states and persistence through real controls. `FLOW-c454fe86` uses the visible Sort control through initial Songs, the live menu and descending order, then proves keyboard End/Escape and focus return. `FLOW-22c4db47` uses the real row hover, overflow and Pin Song action, then proves unpin and favourite isolation. Ordered screenshots and `steps.jsonl` are retained; no forced clicks, stepwise fixture jumps or state injection are used.

Fresh optimized verification passed 159 desktop states, five responsive states, 218 route checks and 69 interaction regressions with zero failures. All 159 exact-size comparisons completed. Corpus mean MAE improved `5.260984609 → 5.256962793`; mean over-20 improved `5.351792008% → 5.350413054%`. Thirteen states improved, 142 were unchanged and four small positive-delta states were reviewed without a concrete product regression.

Accepted MATCH entries: `bdc69b59`, `0df0d2a2`, `610af644`, `5d3db7ca`, `92589389`, `09b3600e`, `1d016f0f`, `e9bee76d`, `3884ff64`, `06be9f09`, `4e857921`, `0b0e3fbf`, `e379e3fe` and `bde65d33`. The previously accepted `8a2a4241` and `5b3ec96a` optimized renders stayed byte-identical.

The [dated Library review](reference-review/2026-09-18-library-family-match.md) records exact geometry, hashes, source/render/difference review, continuous-flow evidence, regressions and blockers. The dated review preserves this historical candidate; [latest metrics](reference-review/latest-metrics.json) now records the current recovery batch.

## Previous Search library-empty screen-match findings

The saved `5b3ec96a` frame is the empty Your Library scope: one All Playlists sidebar entry, a measured search field and segmented control, a centered search glyph/label, the ordinary footer and an idle player. Those facts now belong to live Search state rather than a source-specific navigation fixture.

`recorded-search` traverses New â†’ Search top â†’ Search bottom â†’ Your Library through visible controls, preserves four ordered captures, verifies scroll reset and player continuity, then exercises scope round-trips, suggestions, Escape focus return, Enter submission, results and Clear. The journey is complete, but FLOW remains open because the first three archived frames are not MATCH-complete.

Fresh optimized verification passed 159 desktop states, five responsive states, 218 route checks and 67 interaction regressions, zero failures. All 159 exact-size comparisons completed. `5b3ec96a` improved `2.036646 â†’ 1.873896` MAE and `1.349898% â†’ 1.203088%` over-20. Corpus mean improved `5.262081 â†’ 5.260985` MAE and `5.352900% â†’ 5.351792%` over-20.

The complete source, render, difference, toolbar, segmented control, empty state, sidebar, footer and player were reviewed at 1440Ã—903. Strings, geometry, state ownership and controls match; remaining pixels are lawful Windows text/SVG raster and tiny image-decoder edges without a concrete visible product discrepancy. `MATCH-5b3ec96a` is checked.

148 states were byte-identical and eleven render hashes changed. Six positive-delta states had no baseline-to-candidate channel difference above 19 and no changed pixel above 20; readable sheets show artwork/player decode-edge variation only. No unintended geometry, copy, state, session or control regression was found.

The [dated review](reference-review/2026-09-18-search-library-empty-match.md) records exact ownership, geometry, hashes, real-control evidence, corpus review and the FLOW blocker. The dated review preserves this historical candidate; [latest metrics](reference-review/latest-metrics.json) now records the current recovery batch.

## Previous All Playlists screen-match findings

The immutable All Playlists frame contains two live playlist cards, no sort control and a small red star after `Favourite Songs`. The implementation now owns those facts through `components/music-library.tsx`, `components/music-browse.tsx` and the narrowly scoped `.library-playlists .card-favourite-star` rule. The star remains live text inside the existing title button; no interface pixels or hidden hit targets are used.

The registered `recorded-all-playlists` case traverses New → All Playlists through the visible sidebar, records both ordered states, checks the exact star box and no-sort state, then hovers/opens Emotional Songs, returns with browser Back, opens Favourite Songs, returns again and proves idle-player continuity. The extra card checks do not convert the archived flow into acceptance because initial New screen `e72be564` remains visibly incomplete.

Fresh optimized verification passed 159 desktop states, five responsive samples, 218 route checks and 66 interaction regressions, zero failures. All 159 exact-size comparisons completed. All Playlists `8a2a4241` improved from `1.589619 / 1.174711%` to `1.554882 / 1.138720%` MAE / over-20.

The complete immutable source, optimized render, amplified difference, card/title, sidebar and player regions were reviewed at the exact 1440 × 903 viewport. Card order, artwork, strings, geometry, scroll, sidebar/profile state and idle player match the saved frame. Remaining pixels are limited to lawful platform text/SVG antialiasing and image decoding without a concrete visible product discrepancy. `MATCH-8a2a4241` is therefore checked.

Corpus mean MAE changed `5.262063176 → 5.262080975`; mean over-20 improved `5.353007481% → 5.352900105%`. 148 states were byte-identical and 11 render hashes changed. Seven positive-delta states were only readable artwork/image decode variation; `e757eb0f` gained the same source-supported Favourite Songs star. No unintended geometry, copy, state, session or control regression was found.

The [dated review](reference-review/2026-09-17-all-playlists-match.md) records exact ownership, geometry, hashes, real-control evidence, corpus review and the reason `FLOW-b49a8505` remains open. The dated review preserves this historical candidate; [latest metrics](reference-review/latest-metrics.json) now records the current recovery batch.

## Previous Viral Chart row and real-control findings


The saved Viral Chart uses a tighter desktop table than the preceding candidate: 39 px artwork, measured column starts, a higher header baseline, inset separators, subtler metadata ink, a smaller dark-red favourite star and different duration/More geometry. These details are now owned by desktop-scoped selectors beneath `.chart-page > .chart-table`; the live `music-chart-schedule.tsx` component and immutable source archive remain unchanged.

The registered `discovery-typography-symbols` case now asserts table/header/row/badge/control geometry and then exercises the chart through real visible controls. It enters through New and the viral heading, plays `drop dead`, round-trips favourite, opens the exact ten-item More menu, verifies Escape focus return, preserves unavailable `Kiss It Better`, navigates to artist and album, returns with browser Back and preserves player continuity. No direct endpoint jump, injected state or force click is used as journey evidence.

Fresh optimized verification passed 159 desktop states, five responsive samples, 218 route checks and 66 interaction regressions, zero failures. All 159 exact-size comparisons completed with zero functional failures. Corpus mean MAE changed `5.263068 → 5.262063` and mean over-20 changed `5.353294% → 5.353007%`.

Viral Chart `8a234785` improved `3.865631 → 3.751661` MAE and `3.643103% → 3.585118%` over-20. 146 states were byte-identical and thirteen render hashes changed. The non-target changes comprise seven max-one-channel variations, one max-two-channel variation and four artwork/video decode variations. All six states with a positive delta in either metric were reviewed source/baseline/current/candidate-change; no concrete artwork identity, geometry, copy, session, state or control regression was found.

The [dated review](reference-review/2026-09-17-viral-chart-rows-controls.md) records exact selectors, geometry, hashes, focused and optimized control evidence, full-corpus review and blockers. The dated review preserves this historical candidate; [latest metrics](reference-review/latest-metrics.json) now records the current recovery batch.

The chart is closer, but lawful heading/table/sidebar typography, SVG contour antialiasing, some row-artwork decoding, player symbols/material and smaller sidebar details remain visible. The batch does not complete any screen or archived journey, so MATCH and FLOW stay open.

## Previous signed-out Home typography and guest-player findings — historical

Signed-out Home retains real marketing artwork, the repaired one-pixel content edge, glows, seam and warm player material. The current batch scopes lawful Windows typography and live-control geometry beneath `.capture-membership` and `.guest-session[data-scene="home"] .floating-player`: brand size, offer-copy opacity, CTA size/weight, shuffle/repeat ink, previous/play/next geometry, queue treatment and the idle Apple mark all move toward the exact immutable frame. Text remains DOM, the CTA/profile remain real accessible buttons and every player affordance remains an SVG/DOM control.

The heading and volume contour were deliberately not changed because tested variants worsened supported metrics. No proprietary Apple font, captured interface pixels, screenshot mask or synthetic player tint was introduced.

Fresh optimized verification passed 159 desktop states, five responsive samples, 218 route checks and 65 interaction regressions, zero failures. All 159 exact-size comparisons completed with zero functional failures. Corpus mean MAE changed `5.309224 → 5.309077` and mean over-20 residual changed `5.379484% → 5.379391%`. `aefa8502` improved `1.946265 → 1.922833` MAE and `1.500200% → 1.485374%` over-20; every other state retained zero metric delta.

The focused and registered suites passed profile/CTA dialog focus return, shuffle/repeat, volume, queue, play/pause continuity and four responsive viewports. The optimized pixels are identical to the readable development candidate. The [dated review](reference-review/2026-09-16-signed-out-home-typography-controls.md) records exact selectors, sweeps, region measurements, evidence paths and blockers. The dated review preserves this historical candidate; [latest metrics](reference-review/latest-metrics.json) now records the current recovery batch.

Lawful text/sidebar raster, CTA antialiasing and remaining volume/small-symbol contours remain visible, so MATCH stays open. The batch does not alter any recorded flow and grants no FLOW acceptance.

## Previous release-edition and legacy-player findings — historical

The initial and current New families use different lower-release orders. The implementation now preserves those exact source-supported editions, including repeated covers, while all five lower fragments are owned by the relevant immutable frame. Three middle fragments are masked to the band below the real player and lawful outer edge; clean full covers remain provider-backed. No captured player, text, button or control pixels were copied into artwork.

Legacy discovery now owns a measured 54% / 16px / 1.8-saturation player material. It is scoped through `.capture-discovery[data-catalog="legacy"]`; current New, Home, panels, expanded media and radio retain separate owners. Navigation editing no longer replaces legacy material with a generic inline style. Duplicate release identities use index-qualified React keys so live controls retain the correct edition.

Fresh optimized verification passed 159 desktop states, five responsive samples, 218 route checks and 65 interaction regressions, zero failures. All 159 exact-size comparisons completed with zero functional failures. Corpus mean MAE changed `5.420352 → 5.309224` and mean over-20 residual changed `5.535588% → 5.379484%`. All 23 directly affected screens improved in both metrics; `e72be564` fell to 4.319364 MAE / 4.819506% over-20 and `1f9e170c` to 4.533112 / 5.175341%.

The union of positive numerical deltas contained 106 states. Every one was reviewed in fourteen source/baseline/current/source-difference/candidate-change sheets. The largest increases were `a4afd6e6` at +0.160269 MAE and `468b0465` at +0.219561 percentage points over-20; no concrete unintended artwork, geometry, copy, state or control regression was found in the readable review.

The [dated review](reference-review/2026-09-16-release-editions-legacy-player.md) records exact hashes, state owners, fragment masks, real-control regressions, full-corpus review and evidence paths. The dated review preserves this historical candidate; [latest metrics](reference-review/latest-metrics.json) now records the current recovery batch. Typography and symbols, remaining metadata/complete covers, City Chart art, Alpha live profile/title differences, now-playing geometry and lyrics/queue details keep MATCH/FLOW open.

## Previous lyrics and queue first-entry findings — historical

The real-control transitions `1f9e170c → ee8db412` and `1f9e170c → 8f029018` apply panel/player glass from the live open-panel state instead of endpoint-only catalog labels. Lyrics use the measured 191px panel anchor. Closing and reopening through the same controls reproduces byte-identical panel material while preserving the current catalog, Top 100 shelves, sidebar, artwork, active `stupid song` track and eleven-row current queue.

The immutable endpoint stills nevertheless contain unrelated discovery, library and queue snapshots. No recorded intermediate step authorizes replacing those domains behind a lyrics or Up Next toggle. The 2026-09-15 optimized checkpoint reconfirmed deterministic close/reopen at 36.520087% over-20 for lyrics and 34.702996% for queue; the journeys remain deliberately different from the direct fixtures rather than manufacturing endpoint parity. The [dated review](reference-review/2026-09-15-lyrics-queue-first-entry.md) preserves that historical checkpoint. The 2026-09-23 [queue-panel review](reference-review/2026-09-23-queue-panel-match.md) records the current direct-screen match and live-entry discrepancy.

## Previous Alpha material and continuation findings — historical

The direct Alpha fixture and continuous New→Alpha journey share one live feature sequence. Clean reviewed Viral Hits provider artwork sits beneath real translucent sidebar glass instead of a compensating magenta gradient. The frozen New Music Daily continuation is represented by a real provider-backed card and enabled Next control. Artwork-only source fragments reconstruct visible predecessor and continuation boundaries while excluding captured arrows.

The current sidebar checkpoint reconfirms that this underlay remains state-owned: direct `54b01eab` improves 7.892134% → 7.881983% and its sidebar edge MAE 4.815290 → 3.974644. Typography, exact material/control geometry, lower artwork and the known live profile/title snapshot remain open. The [Alpha review](reference-review/2026-09-15-alpha-material-continuation.md) preserves its original evidence.

## Previous Alpha predecessor findings — historical

The preceding checkpoint unified the direct and continuous feature sequence and reconstructed the narrow Viral Hits predecessor boundary from three artwork-only regions. It reduced direct Alpha to 9.066461%, continuous Alpha to 9.915329%, and the live/direct gap to 0.977375%. The [predecessor review](reference-review/2026-09-14-alpha-edge.md) preserves that evidence.

## Previous subscription and thumbnail findings — historical

Native Viral Hits crops, clean Shabang hover behavior, subscription wording/spacing and cancellation dialog material were corrected. The live success acknowledgement retains prior details beneath it until Done. Full optimized verification passed 159 desktop states, five responsive samples, 218 route checks and 59 interaction regressions, zero failures. The [dated review](reference-review/2026-09-13-subscription-artwork.md) records the remaining exceptions. No MATCH/FLOW acceptance was granted.

## Previous main discovery and player findings — historical

Implementation `5929190` transferred the preserved preview into `J:\courses/main`. Native New shelf dimensions, captions, Coming Soon badges, clean City Charts fragments, panel release coordinates and wide legacy release artwork were corrected. The optimized run passed 159 desktop captures, five responsive samples, 218 route checks and 57 interaction regressions, zero failures; 29 residuals fell and none rose. [The dated review](reference-review/2026-09-13-main-discovery-artwork.md) preserves exact identities and counter-evidence.

The first-entry lyrics/queue material and deterministic close/reopen behavior are repaired. The underlying endpoint catalog/account/library/queue snapshot differences remain unsupported as live transitions. Full covers/metadata, middle City Charts art, typography/icons and material details still require implementation.

## Previous verified Home artwork and controls — historical

Implementation `4c8840a` preserves native Windows scrolling, renders station artwork beneath real glass, and fixes Home Next/Previous boundaries at 1440, 1264, 1024 and 768px. The current sidebar checkpoint reconfirms that Home underlay remains real artwork-driven glass and improves direct `d5173715` 5.936308% → 5.914467%. The [dated Home review](reference-review/2026-09-12-home-artwork-controls.md) and [preceding sidebar review](reference-review/2026-09-12-sidebar-live.md) preserve exact evidence. No FLOW was accepted.

## Open discrepancy classes

| Class | Evidence and required response |
| --- | --- |
| Wrong or partial artwork | Inspect exact original, edition, crop, adjacent shelf and provider integrity. Do not replace content mistakes with gradients or sampled interface pixels. Initial/current/localized lower-release orders and visible fragments are repaired; remaining captions, complete covers and City Chart artwork are still partial. |
| Live versus fixture state | New→Alpha retains a known profile/title difference. First-entry lyrics/queue preserve and assert their live session, but their saved endpoint stills contain unrelated catalog/library/queue snapshots. Model only source-supported transitions; never reset unrelated state behind a control to imitate a still. |
| Sidebar state ownership | Ordinary, Alpha/Home underlay and dark concert now have separate measured owners. Preserve that separation when changing shared shell material; panel-open selectors must not mutate the left sidebar. |
| Shared material and geometry | Preserve hit targets, containment, scroll, optimized blur, repaired edge/glows and state-specific owners. Shared selectors must remain below the intended `.floating-player` or panel root; do not restore compensation gradients. |
| Typography and symbols | Windows captures sampled Arial in Chromium's actual platform-font data. A CSS SF Pro name is not proof of rendering. Signed-out brand/copy/CTA geometry is closer, but heading/sidebar raster, CTA antialiasing and some icon contours remain visible; match them lawfully without distributing proprietary fonts. |
| Player and panels | Guest, ordinary and legacy-discovery glass now have separate measured owners, and signed-out floating-player SVG geometry remains scoped and regression-covered. Remaining complete artwork/metadata, lyric fade/blur, queue rows and endpoint snapshot discontinuities are separate checks. |
| Whole-flow and motion review | A carousel segment or deterministic two-step control is not automatic FLOW acceptance. Review every recorded intermediate state and applicable motion asset before sign-off. |

## Evidence interpretation

The standard corpus uses 147 application viewports at 1440×903 and 12 at 1440×904. Exclude only the documented 120px acquisition footer. Preserve originals; do not resize candidates, omit difficult screens, mask product regions or loosen thresholds.

The numerical gallery ranks residuals; it does not replace readable whole-frame review. A shared change needs full-corpus regression inspection, including worsened states, not selected before/after crops. Tiny threshold crossings around a corrected edge are reported but are not automatically visual regressions; the source, render, amplified difference and before/after candidate must be read together.

A continuous journey starts at its permitted first fixture and then uses real controls. URL jumps, injected state and forced clicks are not acceptance evidence. Retain both direct-fixture and continuous-state comparisons with ordered non-overwriting captures.

## Current acceptance boundary

The current checklist reports UI 159/159, MATCH 112/159 and FLOW 28/58. No acceptance is inferred from findings alone. Where rights, unavailable recordings or differing snapshots prevent a justified exact claim, record the precise discrepancy and evidence. Do not invent approval or silently redefine 1:1.

Earlier detailed observations remain in [library controls](reference-review/2026-09-12-library-controls.md), [library panels](reference-review/2026-09-12-library-panels.md), [sidebar geometry](reference-review/2026-09-12-sidebar.md), [the source ledger](reference-review/ledger.md), and the [pre-Astra audit](history/pre-astra-2026-09-12/docs/reference-audit.md).
