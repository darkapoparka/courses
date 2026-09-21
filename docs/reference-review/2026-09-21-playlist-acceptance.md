# Emotional Songs Playlist acceptance

Updated 2026-09-21. This review advances two exact Playlist states and two complete real-control journeys. The sole ledger becomes **UI 159/159, MATCH 65/159, FLOW 13/58**.

## Candidate and verification

- Full-corpus application checkpoint: `5b3d98d3398a679af3cbd23b15c455a078f6a2a5`.
- GitHub Actions run `35610617012` passed 159 canonical desktop captures, five responsive captures, all 218 archived route steps, 107 registered interaction regressions, TypeScript, production build, QA-tool tests, cover-integrity tests and all 159 exact-size comparisons.
- The Playlist implementation, shared Playlist component and Playlist library controls are unchanged from the focused capture base `8b9f7c4ff8dd1f178f070b13166082ad6fe6a323`; intervening application changes are limited to source-proven initial-New artwork/provider data.
- Exact-state source/render/difference triplets are under `apple-music-clone/.qa/evidence/album-final2-20260921/comparison`.
- Focused ordered evidence is under `apple-music-clone/.qa/evidence/flow-playlist-acceptance-20260921-r2/browser`. Five of five focused cases passed with stable implementation/tooling identity; this decision uses the two Playlist journeys.
- Browser: Chromium 151.0.7922.34 at the source 1440×903 viewport.

## Exact-state review

| Screen | MAE | Over-20 | Decision |
| --- | ---: | ---: | --- |
| `a573d1ab` | `3.445876` | `3.456149%` | Accept initial Emotional Songs state |
| `5044abe5` | `3.499786` | `3.686246%` | Accept four-song vampire mutation |

For `a573d1ab`, source and current agree on artwork/crop, title and owner metadata, update copy, description, controls, three exact song rows, count, Suggested Songs content, sidebar/player state and scroll position.

For `5044abe5`, source and current agree on the added `vampire` row, four-song count and duration, consumed-suggestion removal, remaining suggestion order, artwork, controls, sidebar/player state and scroll position.

The amplified residual follows text, SVG, decoded artwork, one-pixel rules and translucent material edges. It does not expose a missing string, wrong playlist state, wrong artwork identity, displaced product control or incorrect mutation.

## Ordered real-control journeys

`FLOW-c12bd09a` uses the visible Emotional Songs card and records:

`8a2a4241 → a573d1ab`.

`FLOW-14785972` uses the visible Add vampire control and records:

`a573d1ab → 5044abe5`.

Both cases assert the exact rows and state-specific copy before recording the endpoint. No fixture URL is loaded after the permitted initial state, no forced click or injected application state is used, and screenshots are unique and non-overwriting.

## Decision and next target

Accept `MATCH-a573d1ab`, `MATCH-5044abe5`, `FLOW-c12bd09a` and `FLOW-14785972`. No other checkbox advances.

Recompute dependencies from the updated ledger. Chart detail has one unchecked endpoint (`8a234785`) and an existing real-control path (`FLOW-d5d60236`), making it the smallest independent family to review next.
