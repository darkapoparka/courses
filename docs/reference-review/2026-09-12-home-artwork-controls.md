# Home artwork and responsive controls — 2026-09-12

Implementation: `4c8840a0870849e3d9ceedad963f97fe8cdcb8bc` on `main`, preserving the pending Home artwork/scrollport work found on top of `289c049`. This is bounded implementation progress, not clone acceptance.

## Implemented and reproduced

The main scrollport no longer loses content width to Windows non-overlay scrollbars. Native keyboard and wheel scrolling remain usable; the six-size regression checks the skip link, PageDown, Control+Home and mouse wheel, and verifies a 548×314 featured image at 1440px.

The Home station now supplies its own art-only SVG forward frame beneath the real glass, based on the frozen Home recording. CardTile/Cards accept keyed artwork content without replacing their buttons. The Home sidebar no longer uses compensating radial-gradient colours; its compiled filter is `blur(18px) saturate(1.6)`. Artwork-edge carousel handles sample the actual content through `blur(12px) saturate(1.1)`. Native station geometry, blur, no embedded screenshot images, vertical scroll/return and Volume persistence are checked.

A new regression reproduced two responsive defects at 1024px: Next was hidden while another card remained, and Previous appeared over the second card. The unconditional scrolled-state hide now applies only to disabled Next; the 253px expanded-gutter positioning stays inside the desktop breakpoint. Real controls now traverse the entire carousel and return at 1440, 1264, 1024 and 768px. This test is registered in the complete runner, not left as a scratch test.

## Fresh production verification

Build `pnPB4llWg5W19-hBO2k-t`, built before the 6432 listener started. Chromium `151.0.7922.34`, Windows 11, device scale 1, each original's exact viewport. The entire run passed: 159 desktop captures, 5 responsive samples, 218 route checks, 52 interaction regressions, zero failures. Typecheck, optimized build, archive integrity, task coverage, five Python tests and nine Node cover-integrity tests also passed.

Implementation SHA-256: `4ea0d14603e0a795f39bffdadb11ac099cc4215c419e848cfef424385dc4a700`.
QA SHA-256: `29dc8dda2899d4c3ccac70dfb37919e23063e115955ef67c4ad698a7e558a14f`.
Both stayed stable throughout capture. Preserve the original evidence metadata: capture occurred at HEAD `289c049` with the implementation uncommitted; the later commit must not be retroactively substituted.

Full comparison against the previous verified Windows/Chromium candidate:

| Original | Previous over-20 pixels | Current | Current MAE |
| --- | ---: | ---: | ---: |
| Home `d5173715` | 6.079811% | 5.936308% | 4.473700 |
| Alpha `54b01eab` | 9.640319% | 9.638858% | 6.839562 |
| Other 157 originals | unchanged | unchanged | unchanged |

Two desktop states improved numerically; 157 were unchanged. No desktop over-20 residual increased. These are full-frame measurements, not product-region masks or sign-offs. The Home source/render/difference and the responsive before/after screenshots were inspected at full size. The remaining glass colour distribution, text, icons, shadows and lower shelves are visibly imperfect.

The continuous Home carousel/vertical-return observations match their direct `d5173715` fixture exactly (MAE 0, over-20 difference 0), while both differ from the original by 5.936308%. Live New→Alpha remains 10.697290% different from its original and 1.875461% from its direct fixture; the latter was 1.8698% in the preceding review, so do not claim every live metric improved. This session does not complete the full six-step Home flow or reconcile recording snapshots.

## Evidence and preserved failures

Root: `apple-music-clone/.parity-evidence/artwork-implementation-20260912-1950/`.

- `production/results.json`, `production-comparison/index.html` and `metrics.json`: complete stable candidate and all 159 source/render/difference triples.
- `production/journeys/`: continuous screenshots and ordered action logs. `production-journey-metrics.json`: 13 New/Home/sidebar observations against originals and direct fixtures.
- `home-boundaries-baseline-2/`: reproduced 1024px application failure. `home-boundaries-fixed/`: corrected four-width run. `responsive-production/`: explicit after-click screenshots and actual button geometry.
- `before/`, `focused-development/`, `verification-build.log`, `summary.json`: initial five-state capture, focused checks, build output and full comparison summary.
- `home-boundaries-before/` retains the connection-refused run. `home-boundaries-baseline/` retains the earlier test synchronization failure; the helper now waits for native scroll and React edge state to agree. It did not weaken the visibility assertion that subsequently exposed the real application defect.

The original development process stopped responding during diagnostics. It was restarted only after checking that 6431 had no listener. Development is 6431/PID 39192; production audit is 6432/PID 53704. Recheck ownership before reuse. Port 3000/PID 22308 belongs to the other project and was untouched.

## Storage and preservation

J: had 396,898,304 free bytes. Five completed clone audit directories were copied to D:, individually SHA-256 checked, rechecked for source changes, and replaced at their original paths by verified directory junctions before duplicate source copies were removed. Reclaimed allocation: 3,476,373,504 bytes. Free immediately after relocation: 3,873,271,808 bytes; new evidence/build activity subsequently consumed space.

Manifest and backing root: `D:\courses-storage-relocation\20260912-194335\manifest.json` and its sibling directories. Relocated audit names: `audit-2026-09-12`, `continue-20260912`, `controls-20260912-074455`, `finalize-20260912`, `resume-20260912-062030`. All original J: paths still resolve. Previously established junctions/targets were preserved.

Initial modified and untracked source files were backed up under `D:\courses-storage-relocation\20260912-194335\working-tree-backup`. No reference archive, dependency tree, unrelated project's files or process was deleted. Process-local TEMP/TMP use `D:\courses-audit-temp`; machine-wide settings were not changed.

## Still open

The Alpha direct fixture still substitutes Viral Chart artwork for the preceding magenta card; the original visible edge has different repeated motifs. No verified complete replacement was established here. Do not label the small handle-material improvement as an artwork repair. Typography, sidebar material distribution, lower release artwork/player glass and the prior library/queue/lyrics first-entry discrepancies remain open.

Acceptance stays **UI 159/159, MATCH 0/159, complete FLOW 0/58**. Continue the existing owners in `tasks.md`; no competing backlog or courses adaptation.
