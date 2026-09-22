# Artist scroll and concert exact-state acceptance - 2026-09-22

## Scope and authority

This review uses `docs/tasks.md` as the sole acceptance ledger. It accepts six exact Artist/Concert states after readable source/current/amplified-residual inspection and final optimized real-control verification. It does not accept the initial Artist hero, either Artist-menu state, or any recorded Artist journey that still includes those open frames.

The final candidate identities are:

- application: `8d081b3c021dc59ced983d2fd71ebbcf9a7174e1bf1dae725e4c4ecb4543dc11`
- QA tooling: `e9d473c6228e12920de5e2bf971703fcd5829f36928ab6bd098c946be171c0a0`
- source commit at capture: `4104f02afffd9fa4928ecbd34ffc20a1ed51962f`
- optimized build: `ymsuj4c8fJlYwQKwY-YJC`

Final evidence is under `.parity-evidence/artist-final-serial-20260922-150422`. The candidate identity remained stable from the first capture through the last interaction test.

The preserved `.parity-evidence/artist-final-20260922-145252` run is excluded: its server was started without runtime `REFERENCE_PREVIEW=1`, so reference-asset requests correctly returned 404. A later hero-band experiment with application identity `f17459b76a01eb28c46bdb8a86c757e3ad53dc2e87c80686a93ca7c963ae0791` was also rejected and reverted because it widened the blurred lower-hero band and worsened the two menu frames.

## Final optimized verification

Chromium `151.0.7922.34` at device scale 1 passed:

- 159 canonical desktop states plus five responsive states (`164/164`)
- all 218 recorded route checks (`218/218`)
- all 113 registered interaction regressions (`113/113`)
- all 159 exact-size source/render comparisons
- zero page, console, request, HTTP, route, capture, or interaction failures

The final corpus mean is `4.901258` MAE and `4.922101%` over-20. Against the prior same-machine Artist diagnostic it moved by `+0.004632` MAE and `+0.002596` percentage points. Readable review of the accepted frames and the largest positive-delta frames found no unintended geometry, copy, state, session, or control regression; the movement is confined to artwork/video decoding, gradients, blur, and platform raster variation.

## Accepted exact states

Each accepted frame was reviewed at its immutable 1440 x 903 application viewport. Scenario state, strings, section order, artwork identity and crops, content geometry, sidebar/profile state, floating-player placement, and recorded scroll position match the source.

| MATCH | Saved state | MAE | Over-20 |
| --- | --- | ---: | ---: |
| `MATCH-57f7c08e` | Artist detail - Essential Albums scroll | `4.778823` | `6.633675%` |
| `MATCH-edae3407` | Artist detail - Music Videos scroll | `5.117931` | `6.473022%` |
| `MATCH-c9a554f4` | Artist detail - Nearby Concerts section | `6.878784` | `8.871355%` |
| `MATCH-0c042c32` | Artist detail - About section | `5.737860` | `5.467193%` |
| `MATCH-9105a602` | Nearby Concerts - top | `6.080298` | `5.749585%` |
| `MATCH-653efa95` | Nearby Concerts - scrolled list | `6.814892` | `6.536237%` |

The remaining residual in these six frames is bounded to lawful Windows/Chromium text and SVG antialiasing, translucent-player rasterization, and image-decoder edges without a concrete product mismatch. Numerical similarity alone did not grant acceptance.

## Real-control verification

The registered Artist suite passed all four cases in the final optimized corpus:

- `artist-source-sidebar-chrome`
- `recorded-artist-detail`
- `recorded-nearby-concerts`
- `recorded-artist-suggest-less`

The cases enter through visible controls, traverse the source-ordered scroll positions, open Nearby Concerts, open the live Artist menu, apply Suggest Less, and verify persistent state and source-owned sidebar chrome. Ordered screenshots and `steps.jsonl` are retained under the final evidence root. Direct fixture jumps after initialization, forced clicks, and injected application state are not used as acceptance evidence.

## Explicit exclusions

`MATCH-484851bf` remains open at `5.938018` MAE / `7.734558%` over-20. The lower hero artwork/material band is visibly different from the immutable source.

`MATCH-bc773ae9` remains open at `6.923291` MAE / `9.674542%` over-20, and `MATCH-f24fda77` remains open at `6.415794` MAE / `8.597961%` over-20. Their menu geometry and Suggest Less state work, but both complete frames inherit the open lower-hero mismatch.

`FLOW-98bde04b`, `FLOW-138a3f56`, and `FLOW-bb755884` remain open because each recorded sequence includes at least one of those unmatched frames. No FLOW entry advances in this review.

## Ledger result

Advance exactly the six MATCH entries listed above. The sole live ledger becomes **UI 159/159, MATCH 74/159, FLOW 20/58**.
