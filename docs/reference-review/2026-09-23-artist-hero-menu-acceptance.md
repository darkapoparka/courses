# Artist hero and menu exact-state acceptance - 2026-09-23

## Scope and candidate

This review re-evaluates the three Artist states excluded by the 2026-09-22 Artist review: the initial hero and its two artist-menu states. The lower hero/video band now matches the captured source composition; readable source/render/residual inspection found only decoder-frame variation and Windows/Chromium text, SVG and translucent-material raster variation. The title, Nearby Concerts control, hero crop, menu geometry, labels, Suggest Less state, surrounding page, sidebar and player have no concrete visible mismatch.

The final optimized candidate is on `main` at source commit `d71c3c4355d847867fc04aa1f4b69cb8035aba4d` with application identity `cd66f153e23482511b06ce51655f372769bed6d54de4424c8b4c9e2359bfbe61` and QA-tooling identity `2b0b3a544fe6b6186ad398ca42ca96661a8365a7b05cf40816839ddf3749d9f8`. Optimized build ID: `GUPYcXwY4mfILxw6rJQMY`. Evidence root: `.parity-evidence/full-production-final-normalized-20260923-004700`.

## Optimized verification

Chromium `151.0.7922.34` on Windows 11 passed 159 exact-viewport desktop captures, five responsive captures, all 218 recorded flow routes and all 113 registered interaction regressions. There were zero render, route, request, console, overflow or interaction failures. The application and QA source identities remained stable through the run. All 159 source/render comparisons completed at the immutable source dimensions.

The full-corpus mean is `4.882351` MAE and `4.839265%` over-20, compared with `4.901258` and `4.922101%` in the preceding full-corpus metrics. The changed states were reviewed at readable size; small increases are limited to video/artwork decoding and lawful platform raster differences. No concrete product regression was found.

## Exact Artist states

| MATCH | State | MAE | Over-20 |
| --- | --- | ---: | ---: |
| `MATCH-484851bf` | Initial Olivia Rodrigo artist detail | `5.073868` | `4.522041%` |
| `MATCH-bc773ae9` | Artist overflow menu | `5.597835` | `4.143903%` |
| `MATCH-f24fda77` | Artist overflow after Suggest Less | `5.341295` | `4.108143%` |

The initial state and both menu frames were reviewed against their immutable originals and amplified residuals. Hero controls and artwork are aligned; both menu states retain the recorded position and visible state; player and sidebar placement match. Residual edges follow the video decoder, translucent hero gradient, platform text and SVG rendering. No product geometry, copy, artwork identity, menu-state or control defect remains in these three frames.

## Real-control journeys

The optimized interaction run passed `recorded-artist-detail`, `recorded-nearby-concerts` and `recorded-artist-suggest-less`. Each starts from its permitted initial route, uses the visible control for every transition, verifies the intermediate state and retains ordered screenshots plus `steps.jsonl` under `browser/journeys/`.

- `98bde04b-artist-detail`: all six recorded screens, from New through the artist biography.
- `138a3f56-nearby-concerts`: opens Nearby Concerts from the artist hero and scrolls the live list.
- `bb755884-marking-a-song-as-suggest-less`: opens the artist menu and applies Suggest Less; the state and sidebar update persist.

## Ledger result

Advance exactly `MATCH-484851bf`, `MATCH-bc773ae9`, `MATCH-f24fda77`, `FLOW-98bde04b`, `FLOW-138a3f56` and `FLOW-bb755884`. The live ledger becomes **UI 159/159, MATCH 77/159, FLOW 23/58**. Earlier Artist review text records the prior candidate and remains historical evidence.
