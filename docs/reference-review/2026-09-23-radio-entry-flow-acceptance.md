# 2026-09-23 New-to-Radio flow acceptance

This follow-up reviews `FLOW-e7c28ffc` from the optimized desktop candidate. The source-ordered flow was completed through real controls and all three frames were compared with their saved originals. `docs/tasks.md` remains the sole acceptance ledger.

## Candidate and corpus verification

- Checkout `J:\courses`, branch `main`, source commit `d71c3c4355d847867fc04aa1f4b69cb8035aba4d`.
- Application identity `bff0cfe37cf1b14489847886ceb6af56309c9739852396a7694d9aaf18c9062d`; QA tooling identity `18425a67e002b0412ac9b06f91f4051786cf9319e3f09f89767502c1a3513d57`.
- Optimized build `IZsXtUJrQtuyr8ypMB7xi`, local preview `http://127.0.0.1:6473`, Chromium `151.0.7922.34` on Windows 11.
- The optimized corpus passed 164 renders (159 desktop and five responsive), all 218 route checks, and all 124 registered interactions with zero failures. All 159 exact-size comparisons completed. Evidence: `apple-music-clone/.qa/evidence/radio-entry-sidebar-chrome-20260923/{browser,comparison}`.

## Continuous flow and exact frame review

Starting from saved New state `e72be564`, the browser clicked the visible Radio sidebar control, then used the mouse wheel until Top Stations aligned at the recorded `y=31` position. No fixture route jump or library mutation occurred between steps. The All Playlists row remains the only playlist row throughout this flow, as in each saved frame. Other New-start journeys still expose their recorded Favourite Songs and Emotional Songs rows; the library and its favourites remain intact.

The exact 1440 × 903 source crops and real-control captures in `browser/journeys/e7c28ffc-radio-entry/steps.jsonl` compare as follows. The source crops exclude only the preserved 120px acquisition footer.

| Step | Source | Candidate | MAE | Pixels over 20 |
| --- | --- | --- | ---: | ---: |
| Start at New | `e72be564` | `d869a99e225da8feb503823ac8ad95c11ab698dffc54b6c769ced31404850e8f` | 2.379563 | 2.450858% |
| Click Radio | `4cb8f3aa` | `5b11bd02d010e7741d1ea8e035b092c949aeb199639bfdf5d0d95ef5f980ab32` | 5.237825 | 6.039129% |
| Scroll to Top Stations | `0920d819` | `04b5c7ead60324eb2657abb2e7984e3945a9aec9cdd19dd461912ce5bc81f70a` | 5.192124 | 4.818660% |

Readable source/candidate review confirms the New feature and episode layout, the Radio live-station and episode content, the single-row sidebar, and the scrolled Top Stations geometry and artwork. The full interaction result records `recorded-radio-entry: pass`. The direct New, Radio, and scrolled-Radio images are unchanged from the prior optimized candidate (`delta MAE 0`, `delta over-20 0`); the flow-specific screenshots capture the additional real-control states.

`FLOW-e7c28ffc` is accepted. The separate live-radio flow `FLOW-868aa817` remains open because its saved selected/playing states contain a different playlist snapshot from its continuous live path. `MATCH-7bd2ef54` also remains open for the expanded player's ambient backdrop and glyph residuals. Current ledger: **UI 159/159, MATCH 112/159, FLOW 28/58**.
