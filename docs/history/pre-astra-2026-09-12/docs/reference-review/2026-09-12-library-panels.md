# 2026-09-12 bounded library, panel and schedule review

Reviewer: implementation agent, using the connected Windows computer, frozen originals, actual DOM controls and local Chromium captures. This report does not grant MATCH/FLOW acceptance. Owning checklist entries remain in `../tasks.md`.

## Candidate and method

Verified implementation: `719113ea538ebe8253e63c26b10413c4bf3e8621`. Captures were taken at parent HEAD `51087ec` with the then-uncommitted implementation SHA-256 `14145d001a229ef8ba51a95d49a675ff569c8597872ca515c3bf133e4faea1d1` and tooling SHA-256 `96c4f6e3aecc5f5fbe05b77632f7be6b70a263f6c88649735d9179b371658af8`; committing that exact batch does not change those identities.

The optimized build `obBeifU7J74d7qmIbjTpb` was served by a newly started, command-line-verified loopback listener on port 6433. Chromium `151.0.7922.34`, Windows, scale 1, light scheme, en-SG locale and Asia/Singapore timezone were used. All 159 originals retained their exact application viewports: 147 at 1440×903 and 12 at 1440×904. Only the 120px acquisition footer was excluded. No product masks, resized candidates, restored player-interface artwork pixels or proprietary font files were used.

Both implementation/tooling hashes remained stable during the final run. Typecheck, optimized build, archive integrity, task coverage and five QA-tool unit tests passed. The browser run passed 159 desktop states, 5 responsive samples, 218 route checks and 44 interaction regressions with zero failures. These categories are not equivalent to 58 complete accepted journeys.

## Full-corpus comparison

Baseline: `.parity-evidence/continue-20260912/production-final-comparison/metrics.json`.
Final: `.parity-evidence/resume-20260912-062030/production-verified-comparison/metrics.json`.

All 159 states were compared. Sixteen improved, 143 were unchanged and none increased their over-20-channel-value pixel residual. The unweighted mean residual changed from 5.9335% to 5.8893%. These are diagnostics, not percentages of product completion.

| State | Prior full run | Final verified run | Principal change |
| --- | ---: | ---: | --- |
| Lyrics panel `ee8db412` | 11.4444% | 10.1328% | Panel geometry, spacing/fade, text measure and glass |
| Queue `8f029018` | 11.2324% | 10.1328% | Artwork editions, credits, gutters and translucent rows |
| Autoplay `4811dde3` | 11.2289% | 9.9499% | Shared queue/panel corrections |
| Empty queue `de48a956` | 9.6689% | 8.8149% | Shared panel and discovery geometry |
| Songs `92589389` | 2.5800% | 2.2724% | Compact table headings, separators and alignment |
| Schedule `f49fce21` | 5.4672% | 4.8172% | Crop, LIVE separator, typography and line boxes |

## Failures found and fixed, without overwriting their evidence

The initial eight-test library run had seven passes and one incorrect test expectation: Songs contains eight rows, not ten. Inspecting the source and real navigation also exposed missing Favourite Songs/Emotional Songs sidebar entries after leaving New. A stronger Artists assertion reproduced that actual defect before the sidebar fix. All eight registered library journeys then passed in both focused and complete production runs.

The first lyrics styling candidate regressed because a two-pixel text-measure change altered wrapping and shifted the active verse. The next candidate restored the intended text measure and corrected the first-verse anchor through actual lyric-button seeking. The bad candidate remains under `panels-candidate-1/`.

The first complete production run passed all behavior checks but showed the pending schedule increasing its pixel residual by 0.0316 percentage points. Readable original/render inspection exposed a one-pixel crop shift, incorrect LIVE colon instead of the original middle dot, oversized station titles and incorrect line boxes. The final refinement reduced that state's residual by 0.6500 points versus the prior full baseline. The intermediate `production-final/` and comparison remain unchanged.

## Continuous-state evidence and remaining gaps

The final run records 39 continuous states in 20 journey directories, with ordinal screenshot filenames and `steps.jsonl` action/source/render hashes. The eight library journeys are Artists, Albums, Songs, Music Videos, All Playlists, Playlist detail, Adding a suggested song and Favourite Songs. They start at the recorded first fixture and use real controls thereafter. Their resulting states also match the corresponding direct fixtures to below the over-20 diagnostic threshold; this does not remove their visible differences from the originals.

Two newly recorded first-fixture entry paths expose major remaining scenario discrepancies. `1f9e170c → Show lyrics` retains the listening catalog while the saved `ee8db412` endpoint uses the legacy catalog; its live endpoint residual is approximately 36.58%, versus 10.13% for the direct endpoint fixture. `1f9e170c → Up Next` similarly retains different catalog/queue state; the live endpoint residual is approximately 34.69%, versus 10.13% for its direct fixture. These are preserved observations, not approved endpoint matches. Reopening a panel already initialized at its final fixture does not complete either recorded flow.

The three-step radio schedule journey is exercised continuously, including the corrected LIVE label and all 13 entries. Its station-menu intermediate state retains a small live-versus-direct difference (approximately 0.1267% over-threshold pixels), which remains unapproved.

Readable visual review covered the lyrics/queue panel, compact Songs header/rows, album initial outline star, radio schedule and their amplified differences. The saved `ee8db412` motion recording was decoded into five review frames (720×450, 10.15 seconds) to inspect lyric progression; this is not review of the entire motion corpus.

Remaining visible defects include incomplete lower release artwork, lyrics/queue blur and translucency, sidebar shape/underlay, font metrics, player/dialog/menu glyphs and spacing. Chromium's actual font metadata resolves sampled Latin controls to Arial, despite SF Pro appearing in the requested CSS stack. The album also retains selected-row weight, unavailable-row overflow-control and description-truncation differences. These are concrete reasons to leave the owning MATCH and FLOW boxes unchecked.

## Reproduction and durable evidence

Use `../development.md` for the canonical build, browser and comparison commands, always selecting fresh output directories. The final local root is `.parity-evidence/resume-20260912-062030/`: use `production-verified/results.json`, `production-verified-comparison/index.html`, `production-verified/journeys/`, and `production-verified-journey-comparison/index.html`. These paths are relative to the app, not the repository root.

`latest-metrics.json` preserves the final image-free 159-state measurements and source/candidate hashes in Git. The local continuous-state comparison includes original/render/difference views and comparison against direct fixtures; its read-only reproduction helper is retained beside the local evidence. No frozen reference bytes were changed. The local screenshots, QA caches, dependencies and build output are not committed.

Acceptance remains **UI 159/159, MATCH 0/159, FLOW 0/58**. No courses/community adaptation, production deployment or account/payment submission was performed.
