# Session continuity and discovery recovery

Date: 2026-09-20. Checkout: `J:\courses`; branch: `main`.
Parent: `517783a16ec21239e9d9f453cec186baa53de27a`.
Build: `ImPNc1VtUO7uKcvfRUsQv`, from `.qa/build-resume-20260920`.
Evidence root: `J:\courses\apple-music-clone\.qa\evidence\resume-20260920`.

## Acceptance decision

UI remains 159/159, MATCH 22/159, FLOW 3/58. No acceptance checkbox was changed. This checkpoint preserves and verifies the previously uncommitted discovery/public-chrome/history work and repairs additional session-continuity defects; it is not a completed clone.

## Repairs and owners

- `music-context.tsx` retains the current Autoplay preference through sidebar navigation and browser Back/Forward. Queue IDs and their captured title, credit, artwork and duration overrides now belong to queue state rather than the current route. Removing or clearing an item also removes its override.
- `music-player.tsx` reads queue overrides from the controller. Navigating through Search/New no longer silently replaces the metadata of an unchanged queued item.
- A real Account menu -> Sign Out -> Search -> Back traversal reproduced an incorrect return to the signed-in interface. History now preserves the current guest/member session instead of resurrecting a route's old authentication snapshot. `browser_session_controls.py` registers the passing real-control regression.
- Both local preview completion paths in `music-auth.tsx` retain `history.state`, preserving the history-entry metadata instead of replacing it with an empty object. The existing preview form and checkout suites exercise these paths; no separate new sign-in-history suite was added.
- The current-New closed-panel player uses reviewed 50% material, 16px blur and saturation 2; prefixed-before-standard declaration order is preserved. Current discovery selection corners are 4px, including live carousel underlays. Other page families retain separate material owners.
- The preserved batch includes four pinned provider release covers, a real partial sixth release, transient pointer/focus hover handling, public New/Home chrome, per-visit New/Home scroll and rail restoration, and editorial catalog continuity. These changes were not discarded or recreated in another checkout.
- The browser and comparison runners also accept ignored same-checkout `.qa/evidence` output. Archive protections, viewport requirements, candidate stability, overwrite protection and comparison thresholds remain intact.

## Focused verification

Recovery: 4/4 cases passed. Session/metadata follow-up: 3/3 passed. Combined family check: 9/9 passed, covering Autoplay and full queue metadata, logout history, discovery navigation, lyrics/queue entry, ordinary material and both Alpha/carousel paths. TypeScript and the optimized build passed. Seven Python QA-tool tests and nine Node cover-integrity tests passed.

The first complete optimized run passed all 78 interaction tests and 218 routes but had one failed desktop capture: `484851bf` reported `ERR_NO_BUFFER_SPACE` while loading a stylesheet. Its results and failure remain in `optimized-browser-final`; they were not relabeled as passing. A separate complete rerun is recorded below.

## Concrete remaining defects and the next edit

The named/playing New shelf still uses `libraryCovers[1]` (Lover) in its second position. Its exposed reference fragment is the pink **GOLDEN HOUR : Part.5 - EP** cover. The matching ATEEZ provider image, Apple catalog metadata and native-scale fragment comparison are saved as `golden-hour-provider-candidate.webp`, `golden-hour-provider-metadata.json` and `golden-hour-artwork-proof.png` in the evidence root. The earlier CONFESSIONS II candidate was rejected visually.

The attempted new provider-resource/mapping write was blocked by a tool safety check. A subsequent read confirmed that neither `cover-ateez-golden-hour-five` nor `goldenHourRelease` was added. This is identified work, not implemented work. Do not mistake it for a completed repair or bypass a tool safeguard. The owning code is the `currentReleaseEdition` / `newThisWeek` mapping in `components/music-discovery.tsx`. The existing live initial edition must remain different; its second card is not this pink cover.

Other observed blockers: initial-New selected ink and player material/symbols; captured feature-arrow hover state; Alpha glass distribution and session-specific details; guest Home heading/CTA and illustration-background boundary; Recently Added cumulative row/badge alignment; and the previously documented lyrics/queue endpoint snapshot discontinuities. These are not all reducible to platform font rasterization.

Full frames for the main New variants, signed-out Home and Recently Added were reviewed, together with native-scale player/sidebar/artwork regions. Shared sidebar/player source-versus-published-baseline-versus-current review sheets are retained. The 22 accepted frames were also compared with the recovered September 19 local candidate: 21 were byte-identical, and the remaining Search-library frame had no changed channel over 20. This does not substitute that local candidate for the published baseline or grant new acceptance.

## Execution lessons

The stale development listener was restarted only after exact project ownership checks. Development now uses `.qa/dev-resume-20260920` on J:, not the nearly full D:-backed default build directory. Existing junctions and failed evidence were preserved; no cleanup was performed.

For the optimized audit, a PowerShell `Stop` policy turned the known standalone advisory on native stderr into a terminating error. That failed launch is retained in `optimized.log`. The successful replacement uses `Start-Process` with separate stdout/stderr logs, an explicit working directory and the exact build directory. Capture commands retain native output and explicitly gate on exit status rather than swallowing warnings or claiming that a Ready line proves health.

## Fresh optimized result and identity

The independent rerun in `optimized-browser-rerun` passed **159 desktop captures, five responsive captures, 218 route checks and 78 interaction regressions, with zero failures**. `optimized-comparison-rerun` completed all **159 exact-size comparisons**. Both commands exited 0. No failed capture was substituted or relabeled.

- Implementation SHA-256: `0b7c928ef5fdbbd171a3411268a6044d0d05ddaba89f91198d8f8176ae43ff2c`.
- QA-tooling SHA-256: `0fdf4055cdd3270163fd51c52f2f52728ad4efac5cde0c40f7b4162fff098aa7`.
- Both identities matched before and after capture. Chromium: `151.0.7922.34`; Windows 11 `10.0.26200`; Python `3.13.15`.
- Summary: `verification-summary.json`; full source/render/amplified-difference gallery: `optimized-comparison-rerun/index.html`.
- Corpus mean MAE: **5.190585576 -> 5.049159017**. Mean over-20: **5.277333751% -> 5.154771669%**. 143 states improved MAE; 138 improved over-20. Twenty-eight states increased either diagnostic and were reviewed separately.

| State | MAE before -> after | Over-20 before -> after |
| --- | --- | --- |
| Initial New `e72be564` | 3.411616 -> 2.526055 | 3.943645% -> 2.832610% |
| Public New `3731221f` | 4.096477 -> 2.801523 | 3.713317% -> 3.232820% |
| Named New `4f611a9e` | 3.782705 -> 3.033397 | 4.705303% -> 3.786068% |
| Alpha `54b01eab` | 4.478386 -> 3.786736 | 6.721269% -> 6.473637% |
| Selected New `11803c64` | 3.966289 -> 3.160039 | 4.710302% -> 3.910576% |
| Playing New `1f9e170c` | 3.929321 -> 3.146567 | 4.784899% -> 3.970407% |
| Guest Home `aefa8502` | 1.909288 -> 1.448348 | 1.490981% -> 1.538686% |

These are diagnostics against the previous committed metrics, not acceptance percentages. In particular, Guest Home's lower MAE and higher over-20 are both retained.

## Readable positive-delta review

All 28 positive-union states were opened as native-size SOURCE / published-baseline / current triples. The exact IDs remain in `verification-summary.json`; the baseline images are retained at `D:\courses-main-evidence\new-family-optimized-full-20260918-1610\browser`. Review did not find an additional batch-owned geometry, catalog, control-state or navigation regression. It did confirm substantial inherited defects; this review does not reclassify those as harmless rasterization.

| Reviewed family and IDs | Observation |
| --- | --- |
| Lyrics/queue panels: `ee8db412`, `8f029018`, `4811dde3`, `de48a956` | Baseline/current retain the same rows, queue and panel structure. Source lyric positioning/fade, queue separators, glass and player metadata geometry remain different. |
| Expanded song/player/menu: `96711b04`, `b3f29b6f`, `a4d30e7d`, `0c6da10e`, `ac05c6b8`, `06a34864`, `c939c9b8` | Baseline/current retain layout and captured playback positions. Source lyric emphasis, wrapping, fade, text marquee, glyphs and menu geometry remain incomplete. `96711b04` and `0c6da10e` show an extra grey menu-like backplate/edge already present in the baseline. Its owner is not yet established; the clean `c939c9b8` original does not prove captured menu pixels in the album artwork. |
| Expanded radio/video: `7bd2ef54`, `a4afd6e6` | No new transport state/layout change against baseline; underlying artwork raster varies. Source volume/seek/control geometry remains a concrete finishing task. |
| Album article/artist concerts: `32515da3`, `9b43cccb`, `c9a554f4` | Dialog/scroll/copy and card order stay stable against baseline. Article wrapping, concert row spacing, footer/player styling and artist-page sidebar snapshot differences are inherited blockers. |
| Home variants: `d5173715`, `468b0465`, `2f5da478`, `a917d88f`, `aefa8502` | Carousel order and content remain stable. Member Home retains existing lower-shelf/caption and material differences. Guest Home's extended illustration preserves the note shadow, but its heading/CTA weight and illustration/background boundary still require work. |
| Legacy New, lower discovery, navigation editor: `e027fe6d`, `e5e8383f`, `706de500` | Shared caption/row changes retain catalog and source-supported artwork. Existing sidebar snapshot, footer, partial content and symbol treatment are not complete. |
| Search/Made for You: `4b515439`, `035569a0`, `e379e3fe` | No batch-owned catalog/order/geometry regression against the accepted baseline. Existing platform typography and material differences remain visible and should not be described as byte-identical to the originals. No new acceptance decision was made. |
| Replay milestone shelf: `18225175` | Baseline/current preserve rankings, milestone images and dates. Sidebar playlist/footer snapshot and player material differ from the original and remain open. |

A green interaction run does not certify these unresolved visual details. Next work must target the actual content/state/style owners, then repeat the relevant continuous journeys; do not erase the discrepancies or check MATCH/FLOW from this table.
