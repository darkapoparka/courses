# 2026-09-23 Radio screen and recorded-flow review

This review continues the desktop Apple Music reconstruction in `J:\courses` on `main`. It does not grant screen or journey acceptance; `docs/tasks.md` remains the sole acceptance ledger.

## Candidate and evidence

- Source commit: `d71c3c4355d847867fc04aa1f4b69cb8035aba4d`; branch: `main`.
- Working-tree implementation identity: `73ab0d2eeb68f6fa2460e32ba48499af8753f0be98f5cc15a0fa58e7039eeae9`.
- QA tooling identity: `7056809b0420428fe579bdc053bb00731526ccdbe7e11da715b06d668f5ca83b`.
- Runtime: development server `http://127.0.0.1:6435`, Chromium `151.0.7922.34`, source-matched desktop captures at `1440 × 903`.
- Evidence: `apple-music-clone/.parity-evidence/radio-resume-final-20260923/browser/results.json` and its `journeys/` screenshots/`steps.jsonl`. All recorded `sourceSha256` values match the frozen originals.

The Radio work makes the station card react to pointer and keyboard focus, corrects the measured spacing for the scrolled station shelves, removes the duplicate ticker line from the radio player, and exposes the safe local lyrics-unavailable panel through the existing Show/Hide lyrics control. The playback preview remains silent and local.

## Recorded controls exercised

- `FLOW-e7c28ffc`: start at New, use the Radio sidebar button, then scroll with the mouse wheel until Top Stations reaches the recorded position.
- `FLOW-868aa817`: start at Radio, hover Apple Music Hits to reach the selected still, click it to start local silent preview, expand the player, toggle lyrics, stop/restart preview, and close the player.
- `FLOW-4239264b`: start at the selected Hits state, open its overflow menu, choose View Schedule, and verify all 13 schedule entries and the `LIVE · 08:00–10:00` label.

All three control sequences completed without page, console, failed-request or HTTP errors. The supplementary lyrics, stop/restart and close controls also passed. This is development-server verification; it is not an optimized-build result.

## Source-to-candidate diagnostics

Each captured endpoint was compared with the matching original at its exact desktop viewport, cropping only the preserved 120px acquisition footer from the source. The metrics are diagnostic evidence, not acceptance thresholds.

| Screen | Flow step | MAE | Pixels over 20 |
| --- | --- | ---: | ---: |
| `e72be564` | New, first Radio journey step | 2.437 | 2.438% |
| `4cb8f3aa` | Radio entry from New | 5.792 | 6.986% |
| `0920d819` | Radio scrolled to Top Stations | 5.350 | 4.935% |
| `4cb8f3aa` | Live-radio journey start | 5.667 | 6.886% |
| `a9992e55` | Hover-selected Hits state | 7.395 | 9.026% |
| `47a07865` | Hits playback started | 7.314 | 7.856% |
| `7bd2ef54` | Expanded live-radio player | 6.710 | 9.409% |
| `a9992e55` | Schedule journey start | 7.416 | 9.056% |
| `37575452` | Station overflow menu | 7.887 | 9.367% |
| `f49fce21` | Hits schedule | 4.354 | 4.734% |

Readable review confirms the station rows, schedule structure and playback controls are in place. The scrolled shelf spacing is within roughly one pixel of the source. The expanded player still has visible background-material and glyph-raster differences.

## Remaining discrepancies and status

The recorded sidebar snapshots are not the same as the actual live session. Navigating from New exposes Favourite Songs and Emotional Songs in the candidate sidebar while the saved Radio entry still shows only All Playlists. During the live-radio sequence, the candidate retains that one-row sidebar at the hover-selected `a9992e55` step, while that saved still includes the two playlist rows; later playing frames show the playlist rows. The schedule flow likewise retains the live sidebar state when opened, which differs from its saved endpoint. These differences are kept visible rather than hidden by injecting fixture state behind a control.

For those reasons, `MATCH-4cb8f3aa`, `MATCH-0920d819`, `MATCH-a9992e55`, `MATCH-47a07865`, `MATCH-7bd2ef54`, `MATCH-37575452`, `MATCH-f49fce21` and all three Radio FLOW boxes remain unchecked. No ledger counts change: **UI 159/159, MATCH 99/159, FLOW 26/58**.

`npm run typecheck` passed. No full-corpus run or optimized build was performed after these runtime-affecting edits; available space on the evidence/output volumes is below the size needed for a new build. Existing production evidence therefore does not cover this working tree. No reference original, evidence file or junction was removed or rewritten.

## Fresh full-corpus recheck and exact-state ruling — 2026-09-23

After the earlier multi-route dev server became unresponsive, the identified Next dev process was restarted on port `6435`. The frozen reference archive was unchanged. The fresh candidate identity is application `966dcb9462b553347af3bfe62800841d57bb29d8bae72f31ec091732d913ae84`, QA tooling `7056809b0420428fe579bdc053bb00731526ccdbe7e11da715b06d668f5ca83b`; Chromium `151.0.7922.34` on Windows 11. The canonical run passed **159 desktop renders, five responsive renders, 218 route checks and 123 registered interaction regressions**, with zero failures. All 159 direct source/render comparisons completed. Capture and gallery: `.qa/evidence/full-corpus-restart-20260923/{browser,comparison}`.

The fresh `MATCH-0920d819` source and candidate are 1440×903; source SHA `7fb62746e29b71d3db4da21b92830e57a707675e9bf64d49fa579d1fb8bdcaea`, render SHA `f12fdbdd23d3abba43e2d6c83ae08b8293ed0db7985aac86228271e9ed40fbd6`, MAE `5.225354`, over-20 `4.835041%`. Side-by-side and readable residual review confirms the station cards, labels, rail geometry, section spacing, sidebar and compact player align without a concrete product mismatch. The remaining edge/raster difference does not move content or controls. This exact screen is accepted in the ledger.

That ruling is independent of the source-ordered Radio flows. The live New→Radio path retains its two user playlists and therefore does not reproduce saved one-row sidebar frames; the Hits selected/playing, station-menu and schedule frames retain the documented snapshot and expanded-player differences. Those six other Radio MATCH rows and all three Radio FLOW rows stay open. `f49fce21` was specifically rechecked: its candidate keeps Favourite Songs and Emotional Songs while the saved schedule shows only All Playlists.

This is development verification, not optimized production verification. J: has no free space for a supported project-local build output. C-backed output experiments are outside the documented Next project boundary and their post-compile failures are not counted as app production passes or failures. The previous verified optimized checkpoint does not include this working tree. Current ledger: **UI 159/159, MATCH 100/159, FLOW 26/58**.

## Fresh optimized rerun and direct-screen decisions — 2026-09-23

The Radio copy and spacing changes were built and checked on optimized candidate application identity `52f1e8191ab44d90b804ec79e8d2f80e46aa9deea1c532985cf80432764102dc`, QA identity `7056809b0420428fe579bdc053bb00731526ccdbe7e11da715b06d668f5ca83b`, source commit `d71c3c4355d847867fc04aa1f4b69cb8035aba4d`, build `tGxbbXSnpPTMyi86s8LPV`. Chromium `151.0.7922.34` captured all 159 desktop and five responsive states, checked 218 routes, and ran 123 registered interaction regressions with zero failures. All 159 comparisons completed at exact source size. The run and comparisons are in `.qa/evidence/radio-layout-fix-optimized-20260923/{browser,comparison}`; the browser base was `http://127.0.0.1:6459`.

The second `music-section` margin is now 32px, moving the “Latest Episodes” and “Artists Take Over” sections down 4px to the saved layout. The default episode set is restored when no Hits edition is selected; the Hits selected and playing editions retain their own captured episode copy. Readable source/render review confirms each of those conditions. Exact-state diagnostic values are recorded below; they support but do not by themselves grant acceptance.

| Screen | Source SHA-256 | Render SHA-256 | MAE | Pixels over 20 | Decision |
| --- | --- | --- | ---: | ---: | --- |
| `4cb8f3aa` Radio entry | `ae380387e28d490aef23870306b1b95b9fbbac08240f1464a5b87638061f4baf` | `e5e40f4729ba9334892032c23936a0bf2473e6129e5cf2f39ceb03912bf8fc0e` | 6.157 | 7.858% | Accept direct screen |
| `0920d819` scrolled Radio | `7fb62746e29b71d3db4da21b92830e57a707675e9bf64d49fa579d1fb8bdcaea` | `37974122afb8d016c8c3b4ea46dc84dd413b8c955e2a312101f9765e9aa128c3` | 5.214 | 4.842% | Accepted; unchanged geometry |
| `a9992e55` selected Hits | `78418c0722314dfeb1bdcdeddbb54b97cf55e6dd646bd884ef792cd24feb8169` | `8d42da83a7a2f51e5e4cf7258b3f36ab689da67bb10b55e3e6a333248521c657` | 7.773 | 9.737% | Accept direct screen |
| `47a07865` Hits playing | `563735e228756c9ca3cf077a5c24bf7a562ad1b8fb5158b0d8aaaab6369bc6eb` | `73d5d3eae74349596698438e1dabae7a5ef8aed7659a20d42b4e825a3449b22c` | 7.516 | 8.594% | Accept direct screen |
| `7bd2ef54` expanded player | `577db5e8c73decef8523eb15455148f8d3f1e42aef16d6418391452bb8a3bf99` | `5f61c5f501d6c4ba549714960edca40d841462d1897a6cd31d6ae7015e59957c` | 6.678 | 9.457% | Keep open: player material and glyph residuals |
| `37575452` station menu | `9c00d14393dbd57168c0e7de1d02e94ecbc6bd2b0b9d82abd9ecb04e54507fbd` | `86a37d9c0c6778ccef8d50ad04f83bef514181980bf2f8abad9b8f436d49c74c` | 8.064 | 9.983% | Keep open: two extra playlist rows in candidate |
| `f49fce21` schedule | `4f4f4013ade571206b744e1ebc931936831db5e2be206cd0d32d11813d1cd3a3` | `3c1137dd1db39cdf505edd52bf0928b6a2e1b4a73c54cfbfc7c7507382e0f862` | 4.354 | 4.737% | Keep open: two extra playlist rows in candidate |

The schedule's first tile is present: the full-run capture and a fresh 1440px rerender both show all 13 Apple Music Hits artworks. The earlier apparent blank was a transient/inspection mistake, not a confirmed defect. The direct 375 and f49 references each show only All Playlists, while the optimized candidate has Favourite Songs and Emotional Songs as well; those concrete differences remain. The saved Radio-entry fixture has only All Playlists and matches its direct candidate, while the actual New→Radio journey keeps the two user playlists. No state was injected to conceal that live difference.

`MATCH-4cb8f3aa`, `MATCH-a9992e55` and `MATCH-47a07865` are accepted for these exact direct screens. `MATCH-0920d819` remains accepted. `MATCH-7bd2ef54`, `MATCH-37575452`, `MATCH-f49fce21` and all three Radio FLOW entries remain open. The source-ordered journeys were behaviorally exercised on the prior development candidate; this optimized run is full-corpus interaction regression coverage, not a new recorded journey approval. Ledger after these three direct-screen decisions: **UI 159/159, MATCH 103/159, FLOW 26/58**.

## Expanded-radio player geometry follow-up — 2026-09-23

The expanded transport group was 171px wide with 57px columns, while the saved screen spaces the controls at roughly 63px intervals. The volume row also appeared 14px too high. In `app/player-fidelity.css`, the radio-only transport is now 189px wide with 63px columns and begins 3px lower; `.radio-reference .volume-expanded` adds 11px of spacing. On the exact 1440×903 optimized capture, the volume track moved from y=787–790 to y=801–804, matching the source track at y=801–804. The previous/stop/next controls now align horizontally with the source. This does not change song-player layout.

The new optimized candidate uses app identity `4dd271384ca71644242fae7b8b6c0cae93d698c2f6c5ac44ac167fd6ea90d1b1`, QA identity `7056809b0420428fe579bdc053bb00731526ccdbe7e11da715b06d668f5ca83b`, source commit `d71c3c4355d847867fc04aa1f4b69cb8035aba4d`, build `XMBaBs5aMnAgunK64elqr`, and Chromium `151.0.7922.34`. Evidence is under `.qa/evidence/radio-expanded-geometry-recheck-20260923/{browser,comparison}` on local port `6460`; the prior experimental backdrop screenshot is preserved under `.qa/evidence/radio-expanded-player-geometry-20260923/`.

`MATCH-7bd2ef54` remains open. The backdrop retains a clear color/material difference around the outer field, and the source volume thumb is around 63% while the captured candidate state remains 50%; the other exact expanded-song sources use 50%, so no global volume default was changed. The candidate `7bd2ef54` source/render hashes are `577db5e8c73decef8523eb15455148f8d3f1e42aef16d6418391452bb8a3bf99` / `3f849c1654548e7410cff70cbc71fcdc84dc1dc9294fb18907341db7a99c685c`; diagnostics improved from MAE 6.678 / 9.457% over-20 to 6.298 / 9.236%. Metrics are not the acceptance basis; readable review confirms the geometry fix while retaining the visible residuals.

Both full optimized browser runs completed 164 captures, 218/218 routes, and 123 interaction regressions. Each recorded one `sidebar-and-rail-containment` 8-second wait timeout; a same-candidate rerun of that isolated interaction passed. All radio-specific entry, selected/playing, schedule and expanded-player interaction groups passed. Since the isolated pass does not erase the full-suite failure, the latest full verification is recorded with that limitation. There were no failed route checks and all 159 exact-size comparisons completed. The direct-screen acceptance total remains **UI 159/159, MATCH 103/159, FLOW 26/58**.
