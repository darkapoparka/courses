# Expanded player exact-state acceptance — 2026-09-21

## Scope and identity

This review accepts `MATCH-c939c9b8` only. It does **not** accept `FLOW-b6295ef8`.

The application repair is published through `4070d2661be4c66ff81af0efc588fd052e19fd00`; the verified docs-triggered final tree is `116ffff29c41915654d1648a3fdd373e41353817`. GitHub Actions run `35628073726` produced retained artifact `reference-candidate-116ffff29c41915654d1648a3fdd373e41353817` (artifact `10654430236`, digest `sha256:51b9cf60137d814fd78ff4894a3ffd4a8f6d16f20523a75f1526d72f7cfd07d1`). The retained source package is artifact `10652434523`, digest `sha256:bbb5bf7c1646c784f0d54c9893240c4c8f2503e24d10c4e0938edb76acf8c6a2`.

## Clean verification

- The frozen archive and every checklist mapping passed.
- TypeScript and the production build passed.
- 159 canonical desktop states and five responsive states rendered successfully.
- All 218 recorded route steps returned their expected states.
- All 109 registered interaction tests passed with zero failures, including `expanded-song-entry`.
- All 159 exact-size source/current comparisons completed successfully.

## Exact-state repair

The repair is isolated to fullscreen song playback. It preserves the accepted compact player and excludes radio fullscreen controls.

- Shuffle, Previous, Play/Pause and Next use source-shaped fullscreen vectors and measured placement/opacity.
- Repeat uses the closer native outline with fullscreen-only scale and position correction.
- The subtitle tracking reproduces the archived hard clipping at `...girl so`.
- The lower-right lyrics toggle uses the source-sized thick rounded outline with filled quotation marks and corrected tint/placement.
- The existing exact artwork, title/artist, active and future lyrics, progress/volume bars, close, favourite and overflow controls remain intact.

## Direct source/current/residual review

The reviewed target is `c939c9b8-e195-4e43-92a6-b845d0b99243` at 1440×903. Source SHA-256 is `82d29beb0d737b673b4b0998d330e8510b04413a6a135a95c6e03ec86aaefa85`; final render SHA-256 is `d848a486a545c208f49d98101eb1699843702a4e004ea54eae960dbcec1d6c04`.

Baseline MAE `5.044421885894754` improves to `4.969747190435175`. Pixels over threshold 20 improve from `3.3111849390919157%` to `3.2547372954349703%`.

Focused regions also improve:

- Subtitle: MAE `18.5478 → 17.5321`; over-20 `21.7294% → 20.6547%`.
- Main transport: MAE `10.3108 → 5.9477`; over-20 `7.9335% → 5.3651%`.
- Repeat: MAE `8.9621 → 5.0819`; over-20 `7.5884% → 4.3659%`.
- Lyrics toggle: MAE `16.1044 → 12.7817`; over-20 `14.7541% → 10.6414%`.

Readable full-frame and 4× source/current/residual inspection found no remaining concrete product mismatch. The residual is broad background/material motion-frame variance plus lawful browser text/SVG antialiasing and tiny edge-raster differences; it is not hidden by exclusions, overlays or screenshot substitution.

## Real-control coverage and flow boundary

The registered `expanded-song-entry` case begins at accepted compact state `6ac70c34`, asserts SmithAlex/profile, legacy catalog and active playback, clicks the visible **Expand stupid song** control, and records `c939c9b8`. It then asserts the expanded ambience, exact track, visible lyrics, playback slider, close control, cleared fixture routing and preserved catalog continuity.

This truthfully proves the video-visible `6ac70c34 → c939c9b8` segment. The frozen three-step journey begins at `1f9e170c`; no visible user action has been established for the dynamic editorial transition `1f9e170c → 6ac70c34`. The regression therefore does not reload fixtures or inject hidden scenario state, and `FLOW-b6295ef8` remains open.

## Acceptance decision

`MATCH-c939c9b8` is accepted. The ledger advances from MATCH 66/159 to MATCH 67/159. UI remains 159/159 and FLOW remains 14/58.
