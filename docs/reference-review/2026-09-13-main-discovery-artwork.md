# Main transfer, player state and discovery artwork — 2026-09-13

Implementation: `5929190f0756353765d7296cd0302acade4c295c` on `main` in `J:\courses`. This integrates the seven unfinished preview files and adds measured discovery fixes. The preserved `J:\courses-astra-preview` checkout was not modified; all seven source files still match the transfer manifest hashes.

## Implemented and reproduced

Alpha player glass now follows the visible carousel state, including real carousel entry and Volume/Account controls. Library-editor glass follows the actual Edit/Done state and survives checkbox and Volume interactions. The transferred local SVG tab icon and its registered browser regression pass.

Wide New shelves previously resized 208px artwork to 207.1875px. Their five-column grid now uses native 208px cards and 19px gaps at the recorded viewport. Caption insets restore the following shelves to their measured positions. Coming Soon has the four recorded explicit badges, aligned to the card edge rather than appended beside arbitrary title lengths.

London and Miami retain the full unobstructed 189px upper artwork. The middle city columns remain explicitly partial at the captured player band; no player controls were copied into a cover. Panel releases use the separate 193px / 19px grid, with corrected fragment coordinates and rederived safe masks.

The first complete comparison exposed seven small threshold increases over already-wrong legacy release covers. The follow-up replaces the visible unrelated library artwork with clean fragments from the matching release edition. Full covers and metadata are not claimed verified. A reviewed-source allowlist prevents closing lyrics or an expanded-player view from cropping captured interface pixels at wide-shelf coordinates. Real Volume persistence and close/reopen lyrics behavior are registered and tested.

## Fresh optimized verification

Build `f_UWNMB9ViI8JIPcjYPm4`, completed before the new 6436 listener started. Chromium `151.0.7922.34` on Windows 11, scale 1; 147 viewports at 1440×903 and 12 at 1440×904. Only the original 120px acquisition footer is excluded.

Passed: typecheck, optimized build, archive integrity, read-only task coverage, five Python QA-tool tests, nine Node cover-integrity tests, 159 desktop captures, five responsive samples, 218 route checks and 57 interaction regressions. Final browser failures: zero. All 159 exact-size comparisons completed.

Application SHA-256: `4b0b9408ceb42a71695fd7e6db3faec0e96b8351cc2e0f3910ac7b23759784a1`.
QA SHA-256: `7bc4035c8cc479849555437e6b65fdda4f461da641cd5e2c76a7481866c645d4`.
Both stayed stable throughout the complete capture. Evidence records pre-commit HEAD `c0ce99f` plus the then-uncommitted source hashes; preserve that historical identity rather than retroactively replacing it with `5929190`.

## Full-corpus comparison

Compared with the previous compatible Windows/Chromium Home-artwork candidate: **29 lower over-20 residuals, 130 unchanged, zero higher**. Of the unchanged-threshold states, 129 image hashes are identical; Replay `3fed6760` has six one-level pixel changes and a 0.000000512 MAE increase. Do not describe every image as unchanged or every metric as improved.

| Original | Previous over-20 pixels | Final |
| --- | ---: | ---: |
| Essentials / City Charts `8b03c9d0` | 10.078058% | 5.507490% |
| Coming Soon `706de500` | 5.597315% | 3.891042% |
| Legacy New `cf59e554` | 8.023102% | 6.034207% |
| Library editor `ffc18eb8` | 8.960177% | 6.481840% |
| Hidden navigation editor `3728aa07` | 8.945428% | 6.469011% |
| Post-edit New `e5e8383f` | 7.455934% | 5.503030% |
| Alpha `54b01eab` | 9.638858% | 9.596099% |
| Lyrics `ee8db412` | 10.138351% | 10.104359% |
| Queue `8f029018` | 10.134659% | 9.776978% |

Readable original/render/difference inspections covered the changed discovery shelves, legacy releases and affected panels. All 159 states were measured; this is not a claim that all 159 passed visual acceptance. Typography, player glass and incomplete artwork remain visibly different.

## Continuous behavior and counter-evidence

Legacy release observations before and after Volume are pixel-identical to their direct fixtures. Closing/reopening the established lyrics panel also returns to its direct fixture exactly. The New shelf journey starts at `e72be564`, uses the real wheel, checks geometry/badges, opens/closes Volume and clicks Concerts. No forced clicks, injected state or fixture jumps are used as flow evidence.

Live New→Alpha remains 10.639766% over-threshold different from its original and approximately 1.88046% from its direct fixture. The prior live/direct value was 1.875461%; that comparison did not improve. Continuous Essentials and Coming Soon remain approximately 0.03530% different from their fixtures because the starting session is preserved.

The first-entry lyrics/queue catalog discrepancy remains approximately 36.55831% / 34.66501% from the saved originals. Library editing remains approximately 34.36–34.63% different after its first checkpoint. A cleaner direct fixture does not resolve those recording/session discontinuities. Do not swap catalogs or profiles behind a toggle to manufacture an endpoint.

## Evidence and preservation

App-relative root: `.parity-evidence/main-implementation-20260913/`, backed by `D:\courses-main-evidence\main-implementation-20260913`.

- `production-final/results.json`, `production-final-comparison/index.html` / `metrics.json`: final stable candidate and every original/render/difference pair.
- `production-final/journeys/` and `production-final-journey-metrics.json`: ordered real-control captures, actions and both original/direct comparisons, including unmatched states.
- `transferred-verified/`, `shelves-before/`, `shelves-refined/`, `focused-final/`, `legacy-final-focused/`: transfer verification and intermediate focused observations.
- `shelves-red/`, `panel-width-red/`, `legacy-fragments-red/`: reproduced application failures. `production/` and its comparison retain the superseded candidate with seven threshold increases.
- `transferred-baseline/` preserves the environment failure after build relocation. `panel-grid-diagnostic/` contains a rejected CSS-only sizing diagnostic, not source or flow evidence.
- `verification-final-build.log`, `preview-preservation-check.json`: completed local checks and preserved-preview source hashes.

Transfer backup/manifest: `D:\courses-main-transfer\20260913-000116\manifest.json`. Main `.parity-evidence` and `.next` now have D: backing; preserve both directory junctions. The build backing is `D:\courses-main-build\20260913-000116`, with a sibling `node_modules` junction to the main checkout dependencies. It is required for physical-path Node module resolution. The failed development cache was moved, not silently deleted, to `D:\courses-main-temp\failed-dev-cache-before-module-link-20260913`. No package versions or lockfile were changed.

The original preview and unrelated port 3000 remain untouched. New main previews are development 6435 and optimized audit 6436; recheck ownership before restarting either. The known standalone advisory from the preview-only `next start` path is not deployment approval. Process-local TEMP/TMP use `D:\courses-main-temp`. J: still had only about 844 MB free at the final preservation check; D:-backed build/evidence paths prevent these audits from adding the same pressure there.

## Remaining acceptance work

Alpha's preceding artwork and synthetic sidebar colour distribution remain wrong. Missing right-edge continuation cards, actual font metrics/icons, incomplete release covers/metadata, middle City Charts artwork, player/lyrics glass and the first-entry catalog discrepancies remain open. Actual sampled platform fonts still report Arial; naming SF Pro in CSS is not proof of rendering it. No font files were copied or distributed.

**Acceptance remains UI 159/159, MATCH 0/159, complete FLOW 0/58.** No checkbox was advanced. Continue the existing task owners using the exact originals and continuous state, not course adaptation or a replacement frontend.
