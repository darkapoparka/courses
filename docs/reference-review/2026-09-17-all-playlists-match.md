# All Playlists screen match and live-card review

Reviewed locally on 2026-09-17 in `J:\courses/main`, on top of pushed commit `b08f480d781dca2cf4ab07effb13fafbfba69f3f`. This review accepts one screen MATCH; it does not accept an archived FLOW. The immutable reference archive was not changed.

## Candidate and environment

- Target: `8a2a4241-7833-471f-b5e4-72f89d71412b`, All Playlists — named profile.
- Optimized build: `dFlvWryUZwJWmsR7eTkrO`.
- Implementation SHA-256: `e8da27db78b49e403934367588beb0718596344e68de25c47dd16c09c659c6e6`.
- QA tooling SHA-256: `3901dacf36807efbb46d9328f73c35efa1115b64c17ab66056138001ecdcfe36`.
- Windows 11 build 26200; Python 3.13.15; Playwright 1.62.0; Chromium 151.0.7922.34; `en-SG`, `Asia/Singapore`, reduced motion and device scale 1.
- Full evidence: `D:\courses-main-evidence\all-playlists-full-20260917-204127\`.
- Focused control evidence: `D:\courses-main-evidence\all-playlists-controls-20260917-203652\`.
- Readable source/render/difference review: `C:\Users\radev\courses-review\all-playlists-current\`.
- Reviewer: the implementing agent. No owner approval beyond this evidence-backed checklist update is asserted.

## Defects and ownership

The preceding All Playlists render exposed a sort control that is absent from the immutable source and omitted the small red favourite star after `Favourite Songs`. The grid, two playlist cards, sidebar, idle floating player, card artwork and text were otherwise already source-aligned.

The implementation owners are:

- `components/music-library.tsx` for the playlists-page top bar and sort-control visibility;
- `components/music-browse.tsx` for the live `MediaCard` title and the source-supported favourite-card marker;
- `app/reference-fidelity.css` for the narrowly scoped `.library-playlists .card-favourite-star` geometry and colour;
- `scripts/browser_library_flows.py` for the registered real-control journey and exact marker assertions.

No shared screenshot, captured text/control pixels, mask, hotspot, source asset, comparison threshold or candidate resize was introduced.

## Implemented repair

The playlists page now omits `.library-sort` only for `page === "playlists"`; other library grids retain their existing sorting behavior. The `Favourite Songs` card renders its source-supported star as live text inside the existing title button. Its scoped rule preserves the source box without changing card flow or hit targets.

The optimized target frame resolves to:

- playlist grid `x=246`, `y=0`, width `1194`, height `296.203125`;
- grid columns `207.188 / 207.203 / 207.203 / 207.203 / 207.203 px`, 20 px column gap, 33 px row gap;
- first card `x=286`, `y=9`, width `207.1875`, square artwork, title `y=221.1875`, height `16`;
- second card `x=513.1875`, `y=9`, width `207.203125`, square artwork, title `y=221.203125`, height `16`;
- favourite marker `x=600.578125`, `y=224.203125`, width `9.171875`, height `8`;
- marker style 11 px / 8 px, `rgb(172, 8, 24)`, zero left margin and one-pixel upward translation;
- sidebar `x=8`, `y=8`, `232 × 887`;
- idle player `x=526`, `y=833`, `635 × 54`.

A live SVG alternative, heavier fonts, synthetic shadows, scaling and colour/stroke sweeps were tested. The SVG reduced the marker contour to roughly `7 × 6` and worsened whole-frame metrics. The heavier variants either widened the star or increased threshold residual. They were rejected; the simpler live text glyph is the closest readable candidate.

## Readable screen review

The immutable 1440 × 903 source, optimized render, amplified difference, title/card crop, sidebar crop and player crop were reviewed at readable scale. Visible strings, artwork identity, card order, crop, grid geometry, scroll position, sidebar state, profile state and idle player state match the saved frame. The source-absent sort control is gone, and the favourite star occupies the correct source box.

The remaining pixel energy is confined to platform text/SVG antialiasing and lawful image decoding. It does not expose a concrete visible product discrepancy at normal review scale. This satisfies the project’s screen-level MATCH definition for `8a2a4241`.

Exact target metrics against the pushed Viral Chart baseline:

- MAE `1.589619478 → 1.554882388` (`-0.034737090`);
- over-20 residual `1.174710840% → 1.138719700%` (`-0.035991141` percentage points);
- source SHA-256 `5e2ec0f8ceea49c57a90c514d03211d38c1181ae9dde4d490c708d6864b92ea8`;
- optimized render SHA-256 `fa185e092fa698ef63dc15e92effdc05badf654d27df40dcf46eb1e1c41b7f07`.

## Real-control verification

The registered `recorded-all-playlists` journey starts from the permitted initial New fixture and then uses the visible Playlists navigation to select All Playlists. It captures the two ordered recorded states without overwriting earlier evidence. After the saved All Playlists capture, the strengthened case additionally proves the live cards and return paths:

1. hover the Emotional Songs artwork and expose the real play overlay;
2. open Emotional Songs through its artwork button and verify the playlist heading;
3. return through browser Back and preserve the exact idle-player signature;
4. open Favourite Songs through its title button and verify the favourites scene and heading;
5. return through browser Back, retain the no-sort state and favourite marker, and preserve the player signature again.

There are no force clicks, direct URL jumps presented as the journey, state injections or hidden hotspots. Focused and optimized registered runs both passed.

The archived `FLOW-b49a8505` box remains open. Although its real two-step path and ordered captures pass, its initial `e72be564` New screen still has unresolved visible source differences and is not MATCH-complete. A completed target screen does not by itself grant FLOW acceptance.

## Full optimized corpus

Archive integrity, checklist coverage, TypeScript, optimized build, five Python QA-tool tests and nine Node cover-integrity tests passed. The optimized browser run passed **164 rendered states** (159 desktop plus five responsive), **218 route checks** and **66 interaction regressions**, with zero failures. All **159 exact-size comparisons** completed.

Corpus means changed:

- MAE `5.262063176 → 5.262080975`;
- over-20 residual `5.353007481% → 5.352900105%`.

The slight mean-MAE increase comes from normal image-decoder variation in unrelated artwork states; the over-20 mean improved. Of 159 canonical states, 148 were byte-identical and 11 render hashes changed. The intended All Playlists target improved, `1f9e170c` and `bde65d33` also improved, and every state with any positive numerical delta was reviewed source/baseline/current/candidate-change.

| Screen | Delta MAE | Delta over-20 | Readable finding |
| --- | ---: | ---: | --- |
| `18225175` | `+0.030656189` | `+0.000000%` | max-two-channel milestone artwork decode variation; no changed product geometry or copy |
| `484851bf` | `+0.005960840` | `-0.002307%` | artist hero/release artwork decode variation, max channel 8 |
| `e757eb0f` | `+0.002740095` | `+0.002615%` | intentional source-supported Favourite Songs star now appears in Recently Added; no unrelated change |
| `ffd1356a` | `+0.000951048` | `-0.006537%` | album and video artwork decode variation, max channel 15 |
| `bdc56e10` | `+0.000874400` | `+0.000077%` | dimmed card artwork decode variation under the unchanged sign-in dialog, max channel 9 |
| `de48a956` | `+0.000341711` | `-0.001077%` | feature/row artwork decode variation, max channel 18 |
| `2278b1d0` | `-0.000013074` | `+0.030454%` | related-album/player artwork decode variation, max channel 17; whole-frame MAE still improved |
| `8f029018` | `-0.000015637` | `+0.000385%` | small queue-artwork decode variation, max channel 19; whole-frame MAE still improved |

No concrete unintended artwork identity, geometry, copy, state, session or control regression was found.

## Acceptance and remaining work

`MATCH-8a2a4241` is checked from this evidence. This advances the honest acceptance totals to:

- UI: **159 / 159**;
- MATCH: **1 / 159**;
- FLOW: **0 / 58**.

No other screen or flow is accepted by this batch. The next work should continue with the lowest-residual coherent family or another source-supported shared defect, while preserving the now-matched All Playlists frame and its card/back/player regression.
