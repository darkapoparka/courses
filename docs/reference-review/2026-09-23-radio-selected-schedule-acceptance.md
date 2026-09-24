# 2026-09-23 Radio selected-screen and schedule acceptance

This review records the latest optimized desktop comparison and the completed real-control schedule journey. `docs/tasks.md` remains the only acceptance ledger.

## Candidate and full-corpus evidence

- Checkout: `J:\courses`, branch `main`, source commit `d71c3c4355d847867fc04aa1f4b69cb8035aba4d`.
- Application identity: `d4f046c77e28aba9cf1183010f0a4bb1619fd5cc62a08e347e6adcaa623ea08d`.
- QA identity: `18425a67e002b0412ac9b06f91f4051786cf9319e3f09f89767502c1a3513d57`.
- Optimized build `iM5JHfKmB6PZH7tPi4r2e`, local preview `http://127.0.0.1:6470`, Chromium `151.0.7922.34`.
- Latest full rerun: 159 desktop and five responsive captures, all 218 recorded route checks, 124 registered interaction regressions, zero failures. All 159 exact-size source comparisons completed.
- Evidence: `apple-music-clone/.qa/evidence/radio-selected-rerun-20260923/{browser,comparison}`. The browser result summary is in `browser/results.json`; the comparison gallery is `comparison/index.html`.

The selected Hits artwork now receives the captured hover tint in its ordinary selected state. The correction reduced the `a9992e55` comparison from MAE 6.596 / 7.979% over 20 to MAE 6.130 / 7.454% over 20. No saved original was modified.

## Exact-state decisions

| Screen | Source SHA-256 | Candidate SHA-256 | MAE | Pixels over 20 | Decision |
| --- | --- | --- | ---: | ---: | --- |
| `37575452` station overflow | `9c00d14393dbd57168c0e7de1d02e94ecbc6bd2b0b9d82abd9ecb04e54507fbd` | `9f29868ceebd71afb730e1b5ee35876da92a214a063df001da3aafc61124b908` | 6.425 | 7.679% | Accept |
| `f49fce21` Hits schedule | `4f4f4013ade571206b744e1ebc931936831db5e2be206cd0d32d11813d1cd3a3` | `3c1137dd1db39cdf505edd52bf0928b6a2e1b4a73c54cfbfc7c7507382e0f862` | 4.354 | 4.737% | Accept |

Readable exact-size comparison confirms the menu placement and its real controls, selected station, all 13 schedule tiles, live label, schedule geometry, sidebar and fixed player. The immutable originals at both `37575452` and `f49fce21` show the same three sidebar rows: All Playlists, Favourite Songs and Emotional Songs. The earlier note claiming those rows were absent from the source was incorrect.

## Recorded schedule flow

`FLOW-4239264b` was traversed continuously from selected Hits using the actual station overflow and View Schedule controls. The runner saved each intermediate browser state and asserted all 13 entries and the LIVE time label. The reviewed journey is `browser/journeys/4239264b-radio-schedule/steps.jsonl`; its screenshots show the selected station, open menu and schedule endpoint in order. All three saved screen states have the same three sidebar rows as the live path, so the journey's previous sidebar-conflict blocker is resolved.

Other Radio work remains open on evidence. `MATCH-7bd2ef54` has a visible expanded-player material residual. `FLOW-e7c28ffc` has two user playlist rows on the live New→Radio path that are absent from its saved one-row snapshots. `FLOW-868aa817` begins with a one-row snapshot, then its selected and playing stills show three rows without a visible control causing that sidebar change. These are separate direct-screen and flow issues; this review does not accept them.

The final corpus rerun completed without failures; a prior attempt with a transient CSS request error and sidebar timeout is preserved separately under `.qa/evidence/radio-selected-optimized-20260923/`. No commit or push was made. The current ledger after these decisions is **UI 159/159, MATCH 112/159, FLOW 27/58**.

## Expanded live-radio player follow-up — 2026-09-23

The saved `7bd2ef54` fixture now carries its captured volume value, `0.63`. The optimized browser accessibility tree reports that exact slider value. A Radio-only blue ambient gradient and tighter warm gradient reduce the broad backdrop difference; transport placement is unchanged. The full optimized candidate is application identity `e6f3fa96f03e64af547036f00292ceb067d2d7cd77911105424f290e17da600e`, build `XflFRjU4_mkgI0lkpWyC9`, at `http://127.0.0.1:6471`.

At 1440 × 903, source SHA `577db5e8c73decef8523eb15455148f8d3f1e42aef16d6418391452bb8a3bf99` and candidate SHA `1ea93b92fceebf159aac778da7bae9d25a0782c356678772bb373e70b8c116cf` compare at MAE `5.939465`, over-20 `7.520533%`. The preceding optimized comparison measured MAE `6.298` and over-20 `9.236%`. This is a measurable improvement, not an acceptance threshold. Readable residual review still finds the ambient background hue/gradient across the outer field and some control-glyph sizing. Keep `MATCH-7bd2ef54` open.

The fresh optimized full run on this candidate passed 164 captures, 218 routes and 124 registered interaction regressions with zero failures; all 159 exact-size comparisons completed. Browser capture and comparison evidence: `apple-music-clone/.qa/evidence/radio-player-backdrop-volume-20260923/{browser,comparison}`. The schedule journey still passes its actual controls; the New→Radio and live-radio saved/live sidebar conflicts remain unchanged. Current ledger: **UI 159/159, MATCH 112/159, FLOW 27/58**.
