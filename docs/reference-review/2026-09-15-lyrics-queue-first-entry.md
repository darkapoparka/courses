# Lyrics and queue first-entry material and continuity review

Reviewed locally on 2026-09-15 in `J:\courses/main`, on top of `c60b812`. This is implementation evidence, not clone acceptance. The immutable reference archive was not changed.

## Candidate and environment

- Implementation SHA-256: `4a1df61e1a54d630ef2034c99f5af8b060cdc23df4b86ed1cf27ce79dbc5d5bb`.
- QA tooling SHA-256: `cddf78ada6c7a131ca42cd8657aeb113475c8ca08fb6c95349e8774209e80c6f`.
- Optimized build: `_Rj431BT_BSpEza9MFldD`, served from this checkout on loopback port 6437.
- Windows 11 build 26200; Python 3.13.15; Chromium 151.0.7922.34; en-SG, Asia/Singapore, reduced motion and device scale 1.
- Evidence root: `D:\courses-main-evidence\lyrics-queue-first-entry-final-20260915-024103\`.
- Reviewer: the implementing agent. No independent reviewer or owner acceptance is asserted.

## Immutable source and state findings

The two recorded journeys begin at `1f9e170c` and use the real player controls to enter lyrics (`ee8db412`) or Up Next (`8f029018`). The saved start shows the current Top 100 listening session, `stupid song`, its current sidebar and releases, and the current queue derived from the visible Viral Hits songs. The two saved endpoint stills contain materially different discovery shelves, library/sidebar entries, artwork and queue snapshots.

No immutable step between those stills documents a catalog, profile, library, release or queue replacement. A lyrics or Up Next toggle therefore cannot lawfully reset those unrelated domains merely to manufacture the endpoint image. The live journeys continue to preserve the start session; the endpoint snapshot discontinuity remains explicit evidence against FLOW acceptance.

## Implemented repair

The active owner is the `components/apple-music-app.tsx` content tree through `music-context.tsx`, `music-player.tsx` and `music-lyrics.tsx`. The floating player and lyrics panel previously applied their recorded glass only when endpoint-specific `scene.catalog` values were present. Real first entry from `1f9e170c` correctly retained the current catalog but consequently fell back to the opaque player and generic lyric material.

The repair makes material follow the live open-panel state rather than fixture IDs or endpoint catalogs:

- any open lyrics or queue panel receives the 38% floating-player glass and production blur/saturation;
- any open lyrics panel receives the reviewed 46% lyric glass and production blur/saturation;
- panel lyrics use the measured 191px first-line anchor in direct, first-entry and reopened states;
- the panel exposes `data-catalog="current"` when no recorded catalog override exists, without mutating the listening session.

No catalog, profile, library, artwork, track, elapsed time or queue substitution was added.

## Real-control regression coverage

The strengthened regressions start from `1f9e170c`, press the actual **Show lyrics** or **Up Next** button, close the panel through the same control, and reopen it. They assert the full listening signature before, during and after the transition: catalog, feature captions, Viral Hits titles, sidebar entries, release artwork identities, player artwork and active track.

Lyrics entry additionally asserts the first verse, 191px active-line anchor, panel glass and identical close/reopen material. Queue entry asserts that the eleven visible queue rows are exactly the current Viral Hits songs after the active track, not the unrelated saved endpoint queue. Ordered non-overwriting captures and `steps.jsonl` are retained for both journeys. The focused five-case panel suite passed in development and against the optimized build.

## Visual measurements

The direct fixtures are byte-for-byte unchanged from the preceding verified corpus:

| Direct fixture | Render SHA-256 | Over-20 | MAE |
| --- | --- | ---: | ---: |
| `ee8db412` | `62d8ec13c5dcebcdf7394a1ec8bcbc476d463bc8471625052f806a17a7477af3` | 10.104359% | 7.156717 |
| `8f029018` | `78b4d136fbaea7ab1f6fc87ed8886384c97fc43ecc42b4ff21bfff7be1442519` | 9.781054% | 7.422585 |

The continuous comparisons remain dominated by the unrelated saved catalog/library/queue discontinuity. The bounded material changes produce mixed whole-frame metrics, so neither journey is presented as matched:

| Continuous endpoint comparison | Previous | Candidate | Change |
| --- | ---: | ---: | ---: |
| Lyrics over-20 | 36.554002% | 36.523933% | -0.030070 pp |
| Lyrics MAE | 28.132844 | 28.168334 | +0.035491 |
| Queue over-20 | 34.648779% | 34.701150% | +0.052372 pp |
| Queue MAE | 28.254887 | 28.007936 | -0.246951 |

Readable region checks isolate the intended repair: the lyrics-panel region improves from MAE 28.026996 to 26.611056 and from 54.548939% to 53.545292% over-20. The queue panel itself is unchanged while the player-region MAE improves from 56.740683 to 47.390704. The lyrics and queue reopened screenshots are byte-identical to their first-entry screenshots, proving deterministic material without a hidden state reset.

## Full verification

Archive integrity, checklist coverage, typecheck, optimized build, five Python QA-tool tests and nine cover-integrity tests passed. The fresh optimized corpus then passed **164 rendered states** (159 desktop plus five responsive), **218 route checks** and **59 interaction regressions**, with zero failures.

All 159 exact-size desktop comparisons completed against the preceding pushed corpus. Every over-20 residual was unchanged. Two unrelated states showed only sub-0.000005 MAE capture noise with no threshold change. The direct start, lyrics and queue fixtures remained unchanged.

Evidence: `browser/results.json`, `browser/journeys/bc0ba8f1-lyrics-entry/`, `browser/journeys/e0a0f93e-queue-entry/`, `comparison/metrics.json`, `comparison/index.html`, and `continuous-metrics.json` beneath the evidence root. Earlier failed and exploratory captures remain separately preserved and were not used as implementation input.

## Remaining differences and acceptance

The saved lyrics endpoint still uses a different discovery/library snapshot and a later lyric position; the saved queue endpoint still uses a different discovery snapshot and queue catalog. Typography, exact player/control geometry, lyrics fade/blur distribution, queue row geometry, lower release artwork and other shared-surface details also remain open.

The application traverses with real controls and preserves legitimate state continuity, but there is no source-supported transition that can reconcile those unrelated snapshots. This bounded repair therefore advances neither exact screen nor complete-flow acceptance. **UI remains 159/159, MATCH 0/159 and FLOW 0/58.**
