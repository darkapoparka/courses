# 2026-09-25 expanded live-radio and continuous journey acceptance

This review accepts one exact saved state and one source-ordered real-control journey. `docs/tasks.md` remains the sole acceptance ledger; numerical diagnostics support but do not grant acceptance.

## Candidate and evidence

- Capture-base commit: `267de931edd1a63903e2154badf59f35d3153d36` on `main`.
- Application identity: `8747d93dda352aff05e386802c67b9a015823884bf2ffa5581e6fc4fd1a20b1f`.
- QA-tooling identity: `d3ccd0b86e479daec98eda8632097d0a58846546620beee5e15b70513ab589b7`.
- Optimized build: `.next-radio-exact-20260925-033333`, build ID `VV5EkiHK_-4SZrU7t11DN`.
- Runtime: `http://127.0.0.1:6524`, Chromium `151.0.7922.34`, Windows 11, device scale 1.
- Browser evidence: `apple-music-clone/.qa/evidence/gpt56-radio-resume-prod-20260925-0430/browser`.
- Exact comparison: `apple-music-clone/.qa/evidence/gpt56-radio-resume-prod-20260925-0430/comparison-official-2`.

The candidate identity remained unchanged before and after the complete browser run. It rendered 159 desktop and five responsive states, checked all 218 ordered routes, ran 124 registered real-control regressions, and returned zero failures. All 159 exact-size comparisons completed; corpus mean MAE is `4.742176` and mean over-20 share is `4.711469%`.

## `MATCH-7bd2ef54`

- Viewport: `1440 × 903`.
- Source SHA-256: `577db5e8c73decef8523eb15455148f8d3f1e42aef16d6418391452bb8a3bf99`.
- Render SHA-256: `819a0ded126e67a71f1d4ef771666c26600d3d497d1838f4a723591239fa0e7a`.
- MAE: `4.615950`; over-20 share: `6.477175%`.
- Change from the previous same-browser baseline: `-1.329353` MAE and `-0.856097` percentage points over 20.

Exact-size source/render/residual inspection confirms the centered artwork, metadata, live progress rule, disabled previous/next controls, stop control, 0.63 volume position, close control and lower-right lyrics glyph align. The scoped artwork-derived material now reproduces the broad yellow/green upper field, blue/cyan lower field and dark right edge without changing ordinary expanded-song states. Remaining residual is diffuse blur/noise, image-edge decoding and browser text/glyph raster; no actionable product mismatch remains. `MATCH-7bd2ef54` is accepted.

## `FLOW-868aa817`

The journey starts once at the recorded Radio launch route and then uses only visible controls:

1. `4cb8f3aa`: launch state with only **All Playlists**.
2. Hover **Apple Music Hits** to reach `a9992e55`; the recorded Favourite Songs and Emotional Songs rows appear as the selected Hits edition becomes active.
3. Click the station to reach `47a07865`; playback metadata and the three playlist rows persist.
4. Click **Expand Apple Music Hits** to reach `7bd2ef54` with volume `0.63` and the source radio material.

The four journey captures use the exact saved source hashes. Steps 1, 2 and 4 are pixel-identical to their direct candidate captures; step 3 differs from its direct capture by only `0.201845` MAE with `0%` pixels over 20, caused by the live local preview clock rather than a state or layout change. Source diagnostics for the four steps are respectively `5.237825 / 6.039129%`, `6.130324 / 7.453858%`, `7.706074 / 8.598345%`, and `4.615950 / 6.477175%` MAE/over-20.

The same continuous run toggles lyrics open and closed, stops and restarts the silent local preview, closes the expanded player, preserves the Hits edition, and confirms that no streaming media is used. There were no page errors, console errors, failed requests or unexpected HTTP responses. The former sidebar-snapshot discrepancy is resolved by a visible hover/focus edition transition rather than hidden fixture injection. `FLOW-868aa817` is accepted.

## Decision

Newly accepted: `MATCH-7bd2ef54`, `FLOW-868aa817`.

Ledger after this review: **UI 159/159, MATCH 113/159, FLOW 29/58**.
