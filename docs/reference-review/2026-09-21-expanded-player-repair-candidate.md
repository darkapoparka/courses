# Expanded player repair candidate — 2026-09-21

## Candidate

Application commits:

- `9083b97a26dd7be1db5952d89585becbe4e5c554` — isolate the fullscreen song transport, subtitle clipping, lyrics control, and real compact-to-fullscreen regression.
- `cd2fb041d73babe5353881cf8997a2d399acd355` — return Repeat to the closer native outline with scoped sizing and test a source-tinted quotation bubble.
- `4070d2661be4c66ff81af0efc588fd052e19fd00` — replace the overfilled test bubble with the source-sized thick rounded outline and filled quotation marks found in the retained pixels.

This checkpoint exists to trigger the repository's ordinary clean-checkout verification after the guarded publication commits. It is **not** an acceptance decision and does not change the sole ledger. UI remains 159/159, MATCH remains 66/159, and FLOW remains 14/58 pending fresh source/current/residual review.

## First clean artifact review

Run `35624293745` passed the frozen corpus, TypeScript, production build, 164 captures, all registered real-control checks, and all 159 exact-size comparisons. Its retained artifact measured `c939c9b8` at MAE `4.988379014396457` and `3.275270702596284%` over threshold 20, improving from MAE `5.044421885894754` and `3.3111849390919157%` before the repair.

Direct source/old/new review confirmed that the subtitle endpoint and the main transport shapes moved materially closer. It also showed that the first custom lyrics outline was too large and too thin.

## Second clean artifact review

Run `35626437567` again passed the frozen corpus, TypeScript, production build, all captures and real-control checks, and all 159 comparisons. The retained `c939c9b8` render measured MAE `4.990732281284607` and `3.270579549649317%` over threshold 20. Repeat improved substantially, but direct 4× source/current inspection proved that the experimental solid bubble was structurally wrong even though its tint was close: the source is a thick rounded outline with a transparent interior and filled quotation marks. The third commit corrects that specific structure without reopening the accepted transport and subtitle repairs.

## Isolated product changes

- Song-only fullscreen transport controls use dedicated source-shaped Shuffle, Previous, Play/Pause, and Next vectors. The accepted compact player continues to use the existing shared glyphs.
- Repeat uses the closer existing native vector with fullscreen-only scale and position correction.
- The fullscreen song subtitle uses a small scoped tracking adjustment so its clipped endpoint matches the archived frame.
- The lower-right fullscreen lyrics control uses a source-sized thick rounded speech-bubble outline with filled quote marks, source-like tint, and corrected vertical placement.
- Radio fullscreen controls are explicitly excluded from these song-only selectors.

## Real-control coverage

The new `expanded-song-entry` regression begins at accepted compact-player state `6ac70c34`, clicks the visible **Expand stupid song** control, and records `c939c9b8` while asserting track, lyrics, profile/catalog continuity, playback controls, and cleared fixture routing.

This proves only the video-visible `6ac70c34 → c939c9b8` segment. `FLOW-b6295ef8` remains open because the frozen sequence begins at `1f9e170c`, and no truthful user action has yet been identified for the dynamic editorial transition `1f9e170c → 6ac70c34`. The regression does not fake that transition by reloading fixtures.
