# Artist music-video exact-state and flow acceptance — 2026-09-23

## Candidate and scope

This review accepts the saved Artist music-video shelf screen `898ca766-3133-4e02-a186-00d62d3804e4`, the 0:06 video-player screen `a4afd6e6-eddb-4263-b7eb-5be73f8f2b03`, and the complete `FLOW-d3879ab4` journey. The two images were compared with their immutable originals at 1440×903. The source and candidate show matching rail position, artwork, copy, player frame, timeline and transport geometry. The player’s left control is a bare 58px volume slider; the former speaker glyph and shortened track were removed. No concrete product mismatch remains. Remaining residuals are small image-decoder, gradient and platform-raster differences.

The optimized candidate uses source commit `d71c3c4355d847867fc04aa1f4b69cb8035aba4d`, app identity `d67e399a8012c1c79e518bc786c33f36b632f9f621f3f81287628d6a72b8f722` and QA identity `5dddcf2a6a38a17badfd8c6a376ec7ac9038ba77958605f0d8e11f823c350542`. Build: `-oL-_jbOI5C3V7rDnJ11y`; Chromium `151.0.7922.34` on Windows 11. Evidence root: `apple-music-clone/.parity-evidence/full-production-player-controls-20260923-014700`.

## Optimized verification

TypeScript, archive integrity and checklist coverage checks passed. The optimized browser run captured 159 canonical desktop screens and five responsive samples, checked all 218 recorded-flow routes and passed all 114 registered interaction regressions with zero failures. The application and QA identities stayed stable through the run. All 159 exact-size source/render comparisons completed. Full-corpus mean: `4.881004` MAE and `4.838381%` over-20.

## Exact screen states

| MATCH | State | Source SHA-256 | Candidate SHA-256 | MAE | Over-20 |
| --- | --- | --- | --- | ---: | ---: |
| `MATCH-898ca766` | Artist detail, scrolled to Music Videos | `e8ea03ccdb245cb743805ff2479d822db646a10f818273cbca6d682b79749ca2` | `b5dcdd63b4accdcdcd1ce7b259df7ec416958d0f397485a3e265765c50132b58` | `6.396643` | `9.419374%` |
| `MATCH-a4afd6e6` | Silent local video preview at 0:06 | `ef26813920e7415540f51d472169982a190a2b810cf58f2652ffa2ab001499ed` | `0b83a2c73642c08c537c5eaa49f8e221e4e27c0112cd74f98a5d8b1bc4eb0a25` | `2.291938` | `5.208026%` |

The shelf residual is concentrated in the decoded video thumbnails and browser text/artwork edges. The player residual is concentrated in translucent lower-player material and the rendered artwork; the control positions, labels, elapsed time and bare volume slider align with the original. The 0:06 player MAE fell by `0.015133` after aligning the slider, and its over-20 residual fell by `0.007152` percentage points.

## Real-control journey

The recorded journey starts at the Music Videos shelf, hovers Begged (Lyric Video) to expose its controls, and activates Play to open the silent local preview. It advances from 0:00 to the recorded 0:06 state through the visible player transport. It checks that fixture-only source state is cleared, the preview has no media URL, unrelated audio remains paused, and the volume control matches the 58px source track. Ordered screenshots and `steps.jsonl` are under `browser/journeys/d3879ab4-watching-a-music-video/`.

Advance `MATCH-898ca766`, `MATCH-a4afd6e6` and `FLOW-d3879ab4`. With the prior accepted states, the live ledger becomes **UI 159/159, MATCH 80/159, FLOW 24/58**. The comparison metrics are diagnostic evidence; the decision follows readable source/render/residual review and the real-control run.
