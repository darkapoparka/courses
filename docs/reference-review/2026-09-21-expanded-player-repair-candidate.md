# Expanded player repair candidate — 2026-09-21

## Candidate

Application commit: `9083b97a26dd7be1db5952d89585becbe4e5c554`.

This checkpoint exists to trigger the repository's ordinary clean-checkout verification after the guarded publication commit. It is **not** an acceptance decision and does not change the sole ledger. UI remains 159/159, MATCH remains 66/159, and FLOW remains 14/58 pending fresh source/current/residual review.

## Isolated product changes

- Song-only fullscreen transport controls use dedicated source-shaped Shuffle, Previous, Play/Pause, Next, and Repeat vectors. The accepted compact player continues to use the existing shared glyphs.
- The fullscreen song subtitle uses a small scoped tracking adjustment so its clipped endpoint matches the archived frame more closely.
- The lower-right fullscreen lyrics control uses a rounded quotation-bubble vector instead of the unrelated square speech glyph.
- Radio fullscreen controls are explicitly excluded from these song-only selectors.

## Real-control coverage

The new `expanded-song-entry` regression begins at accepted compact-player state `6ac70c34`, clicks the visible **Expand stupid song** control, and records `c939c9b8` while asserting track, lyrics, profile/catalog continuity, playback controls, and cleared fixture routing.

This proves only the video-visible `6ac70c34 → c939c9b8` segment. `FLOW-b6295ef8` remains open because the frozen sequence begins at `1f9e170c`, and no truthful user action has yet been identified for the dynamic editorial transition `1f9e170c → 6ac70c34`. The regression does not fake that transition by reloading fixtures.
