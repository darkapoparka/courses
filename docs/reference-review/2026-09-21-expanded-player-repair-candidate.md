# Expanded player repair candidate — 2026-09-21

## Candidate

Application commits:

- `9083b97a26dd7be1db5952d89585becbe4e5c554` — isolate the fullscreen song transport, subtitle clipping, lyrics control, and real compact-to-fullscreen regression.
- `cd2fb041d73babe5353881cf8997a2d399acd355` — replace the remaining outlined lyrics control with the source-shaped filled quotation bubble and return Repeat to the closer native outline with scoped sizing.

This checkpoint exists to trigger the repository's ordinary clean-checkout verification after the guarded publication commits. It is **not** an acceptance decision and does not change the sole ledger. UI remains 159/159, MATCH remains 66/159, and FLOW remains 14/58 pending fresh source/current/residual review.

## First clean artifact review

Run `35624293745` passed the frozen corpus, TypeScript, production build, 164 captures, all registered real-control checks, and all 159 exact-size comparisons. Its retained artifact measured `c939c9b8` at MAE `4.988379014396457` and `3.275270702596284%` over threshold 20, improving from MAE `5.044421885894754` and `3.3111849390919157%` before the repair.

Direct source/old/new review confirmed that the subtitle endpoint and the main transport shapes moved materially closer. It also exposed one concrete blocker that aggregate metrics understated: the lower-right source control is a filled quotation bubble, whereas the first repair still rendered an outlined bubble. That blocker motivated the scoped follow-up rather than premature acceptance.

## Isolated product changes

- Song-only fullscreen transport controls use dedicated source-shaped Shuffle, Previous, Play/Pause, and Next vectors. The accepted compact player continues to use the existing shared glyphs.
- Repeat uses the closer existing native vector with fullscreen-only scale and position correction.
- The fullscreen song subtitle uses a small scoped tracking adjustment so its clipped endpoint matches the archived frame.
- The lower-right fullscreen lyrics control uses a filled quotation-bubble mask with transparent quote cutouts, source-sized placement, and source-like tint.
- Radio fullscreen controls are explicitly excluded from these song-only selectors.

## Real-control coverage

The new `expanded-song-entry` regression begins at accepted compact-player state `6ac70c34`, clicks the visible **Expand stupid song** control, and records `c939c9b8` while asserting track, lyrics, profile/catalog continuity, playback controls, and cleared fixture routing.

This proves only the video-visible `6ac70c34 → c939c9b8` segment. `FLOW-b6295ef8` remains open because the frozen sequence begins at `1f9e170c`, and no truthful user action has yet been identified for the dynamic editorial transition `1f9e170c → 6ac70c34`. The regression does not fake that transition by reloading fixtures.
