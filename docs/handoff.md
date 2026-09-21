# Courses - current handoff

Updated 2026-09-21. Only checkout `J:\courses`, only branch `main`, active app `apple-music-clone`. No course adaptation, replacement app, branch/worktree creation, cleanup or reference-archive mutation.

## Current verified implementation

Read [the contextual player/glyph review](reference-review/2026-09-21-contextual-player-glyphs.md), [the player-cutout and Replay-control review](reference-review/2026-09-21-player-cutout-replay-controls.md) and the owning rows in `docs/tasks.md`. This batch continues parent `1141b6cec0fe8cde3ff3b720f45da0ae005bfa11`; obtain the resulting publication SHA from Git rather than assuming the parent remains HEAD.

Current-New idle transport ink is now contextual instead of a permanently sampled blue tint. Pressed Shuffle/Repeat retain their live accent. Replay uses its own live 50%/16px/saturation-1.4 compact-player material over albums, milestones and year art. Compact Lyrics, Up Next, Volume and muted Volume use native accessible SVG controls distinct from expanded-player glyphs. Existing rounded artwork exclusions, current-New selection, contained Replay ambient owner, native artist cards, ATEEZ mapping and session/history continuity remain intact.

Build `tHwh7uBYrWhqCGATOKcTN` in `.qa/build-player-icons-20260921` passed 159 desktop captures, five responsive captures, all 218 route steps and all 104 interaction regressions with zero failures. The first corpus had one isolated `expanded-flyout-controls` navigation timeout; a focused retry and the clean non-overwriting rerun both passed. TypeScript, seven QA unit tests, nine cover tests, archive and coverage checks passed. All 159 exact-size comparisons completed. Evidence: `apple-music-clone/.qa/evidence/player-icons-20260921`; authoritative browser and comparison roots are `optimized-browser-rerun` and `optimized-comparison-rerun`.

Mean MAE improved `4.949350 -> 4.940987`; mean over-20 improved `4.985895% -> 4.968957%`. Readable review sheets include every priority and worsened state. Thirteen frames had tiny MAE increases, maximum `0.038276`; inspection found intended compact glyph/material changes, lawful raster/decoder movement or pre-existing unrelated defects, not a new content/state/geometry regression. `latest-metrics.json` is the numerical snapshot, not acceptance.

## Acceptance and next actual defects

UI 159/159; MATCH 22/159; FLOW 3/58. No checkbox advanced in this batch. `docs/tasks.md` remains the sole acceptance ledger.

Prioritize initial New `e72be564`. The complete second release artwork beneath the player is still wrong, so the interior glass distribution is wrong even though the lawful visible source fragment and rounded exclusion are preserved. Enlarged raw-band comparison disproved the preserved *Pink Pocket Pistol* candidate; five other researched provider candidates also fail the source strip. Do not install a guessed cover, reset the catalog or paint captured player UI over the defect. Preserve the distinct initial and named/playing editions and the current ATEEZ mapping. Once the provider cover is proven and installed through the reviewed cover-resource mechanism, rerun the seven New-dependent journeys and accept each only if every endpoint MATCH is complete.

Replay controls and material now pass their real journeys, but the family remains open for source-specific ambient light distribution, artist/song content handling, gallery/footer continuation, type/glyph contour and scroll-anchor equivalence. Process the family together; do not infer MATCH/FLOW from the green corpus.

The prior lyrics/account-session review identifies still-inconsistent captured session/catalog endpoints. Investigate recordings and flow order rather than renaming a user or replacing queue/library state behind an ordinary control.

## Runtime, identity and preservation

Canonical dev remains `http://127.0.0.1:6435/`; listener PID 16352 was observed at 2026-09-21 04:24. Optimized listener PID 29316 remains on 6437 from the active app and build, observed at 2026-09-21 06:13. These are observations, not authority to stop stale/reused PIDs: inspect commands, paths, creation times and ancestry before any process action; never stop remote-connection ancestors.

QA Python: `D:\courses-main-qa\audit-venv\Scripts\python.exe`. Browser: `D:\courses-main-qa\playwright-browsers\chromium-1234\chrome-win64\chrome.exe` (151.0.7922.34). Last free space: J 2.801 GiB, D 9.387 GiB. No deletion or cleanup was performed.

Generated-only Next type paths were backed up under `.qa/evidence/player-icons-20260921/post-rerun-generated` before normalization. `normalization-receipt-rerun.json` proves the application tree stayed unchanged. No QA/build artifacts, downloaded candidate covers, credentials or fonts belong in Git.

Use coherent verified commits directly on main and ordinary push: `git -c credential.helper= -c credential.helper=manager -c credential.interactive=never push origin main`. Inspect both GitHub workflow results for the exact pushed SHA. Parent CI success does not cover new edits. Do not alter global authentication settings.
