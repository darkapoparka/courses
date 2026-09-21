# Album detail and editorial exact-state acceptance — 2026-09-21

## Decision

The eight album-detail/editorial states and all three recorded album journeys are accepted for the verified candidate. Exact source/current/residual review shows no remaining concrete mismatch in strings, state, geometry, artwork identity, unavailable-row behavior, menus, editorial scroll position, controls or focus restoration. Remaining residual is lawful Windows/Chromium text and SVG antialiasing, source-image decoding and live material rasterization.

Accepted MATCH states: `b620e4ab`, `ffd1356a`, `eb489e8d`, `32515da3`, `9b43cccb`, `56c2e39a`, `ef86b595`, `eca1baa1`.

Accepted FLOW journeys: `FLOW-91b7c60d` (album description), `FLOW-1319943e` (share an album) and `FLOW-8c9a97bc` (copying an album link).

## Candidate and full gates

- Base commit during capture: `67486c52d1e5f50fafd911bf9d05d4b0393c9f50` on `main`.
- Stable implementation SHA-256 during capture: `8fff0ea1dbb3869bac20b14562b4a86c617a83a8fb9ca4b08efe3a1d38d0e894`.
- Stable tooling SHA-256 during capture: `aa6eadf9c29e60eea599ee2cf4cabd9da27b93d5d5fd2319acff373b2865802f`.
- Optimized build ID: `3lMCXoU9BTzVFkaF9EZMt`.
- Browser: Chromium `151.0.7922.34` on `Windows-11-10.0.26200-SP0`.
- Evidence root: `apple-music-clone/.qa/evidence/album-final2-20260921`.
- Whole corpus: 159 canonical desktop states plus five responsive captures, all pass.
- Route inventory: 218/218 route steps pass.
- Interaction regressions: 105/105 pass.
- Archive: 58 flows, 218 steps, 159 identities and 318 image variants pass integrity checks.
- TypeScript passes. Seven QA-tool unit tests and nine cover-integrity tests pass.
- Exact-size comparison covers all 159 canonical states.

## Exact diagnostics

| Screen | MAE | Over-20 | Δ MAE vs published | Δ over-20 |
|---|---:|---:|---:|---:|
| `b620e4ab` | `3.511129` | `2.944275%` | `+0.007246` | `+0.008767 pp` |
| `ffd1356a` | `4.221620` | `6.259844%` | `+0.000000` | `+0.000000 pp` |
| `eb489e8d` | `6.601310` | `7.920666%` | `+0.000000` | `+0.000000 pp` |
| `32515da3` | `12.904426` | `9.503584%` | `+0.000000` | `+0.000000 pp` |
| `9b43cccb` | `12.441333` | `9.181817%` | `+0.000000` | `+0.000000 pp` |
| `56c2e39a` | `5.047690` | `4.900640%` | `+0.007233` | `+0.008613 pp` |
| `ef86b595` | `4.274200` | `3.390396%` | `+0.007219` | `+0.008613 pp` |
| `eca1baa1` | `5.504976` | `6.353052%` | `+0.006912` | `+0.008690 pp` |

Corpus mean MAE changes `4.907618 → 4.911074`; mean over-20 changes `4.927650% → 4.931236%`.

The four states containing the shared album summary intentionally replace an invented browser ellipsis with the source-observed hard-clipped live sentence immediately followed by `MORE`. The source/current critical crop now agrees semantically and geometrically; its tiny positive numerical delta is Windows font rasterization around newly truthful text pixels, not a product regression. The other four album states are byte-for-byte unchanged from the published candidate at the comparison level.

Readable source/current/residual sheets are under `readable-review/`. Source/baseline/current/amplified-delta sheets for every materially moved or relevant state are under `worsened-review/`.

## Changed and worsened-state review

The whole-corpus rerun records 35 positive MAE deltas, 10 negative deltas and 114 stable states. Every materially moved frame was reviewed as readable source, previous candidate, current candidate and amplified previous-to-current delta. The largest unrelated movements — `468b0465`, `035569a0`, `edae3407`, `e5e8383f`, `c9a554f4`, `0c042c32`, `c98f8b54`, `11803c64`, `57f7c08e`, `b0caf02f` and `f78d223e` — retain the same strings, active state, layout, scroll position, controls and artwork identity. Their movement follows image, gradient, text and blur edges only and is attributable to repeat-run decoder/raster variance.

No unrelated component changed during the album batch. The browser verifier confirms identical implementation and tooling digests before and after all 164 captures, 218 route checks and 105 interaction regressions.

## Album-state repairs

- Unavailable album rows now omit action buttons rather than exposing impossible overflow controls.
- Real-control coverage asserts exactly four unavailable rows and zero unavailable-row menu buttons.
- The album summary uses source-equivalent clipping with no fabricated ellipsis while retaining responsive one-line containment at 390 × 844.
- Editorial notes open from the visible `MORE` control and preserve the exact initial and end-scroll states.
- Album and share menus retain source geometry, item order, focus modality, dismissal and focus restoration.
- Copy Link writes the album URL without a track parameter and presents the recorded inline `Link Copied` confirmation.

## Real-control journey evidence

`recorded-album-description` starts at the permitted album fixture and then uses the visible `MORE` control plus keyboard scrolling of the live editorial article:

`b620e4ab → 32515da3 → 9b43cccb`.

`recorded-album-share-sheet` uses the visible Share control, checks the complete native-style menu item order, closes with Escape and restores focus:

`b620e4ab → 56c2e39a`.

`recorded-album-copy-link` uses the visible album overflow, chooses `Copy Link`, validates the clipboard URL and inline confirmation, closes with Escape and restores focus:

`b620e4ab → ef86b595 → eca1baa1`.

Each journey contains ordered non-overwriting screenshots and `steps.jsonl` under `browser-rerun/journeys/`. No stepwise fixture URL jumps, forced clicks or state injection are used after the permitted initial state.

## Acceptance rationale

The current album implementation has source-supported content, exact viewport and scroll anchors, truthful unavailable-row controls, correct menus, live editorial content, responsive containment and native real-control transitions. The remaining amplified residual outlines text, SVG, image and blur edges rather than a concrete missing or incorrect product element. Under the repository acceptance rule, these eight MATCH entries and three FLOW entries are complete.
