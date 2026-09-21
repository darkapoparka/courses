# Courses - current handoff

Updated 2026-09-21. Only checkout `J:\courses`, only branch `main`, active app `apple-music-clone`. No course adaptation, replacement app, branch/worktree creation, cleanup or reference-archive mutation.

## Current verified implementation

Read [the Replay and milestone acceptance review](reference-review/2026-09-21-replay-acceptance.md), [the New/charts/Home acceptance review](reference-review/2026-09-21-new-charts-acceptance.md) and the owning rows in `docs/tasks.md`. The verified unpublished Replay batch is on top of `28388bd3a0472d4ac81b2dcfd7fcecd1ecaa2778`; obtain the resulting implementation/publication SHA from Git after committing rather than assuming the capture base remains HEAD.

Replay now uses a contained source-matched ambient field, truthful obscured-song rows instead of invented placeholder metadata, and an artwork-decode gate before milestone journey screenshots are retained. Existing contextual compact-player material, native accessible compact glyphs, native artist cards, milestone/year controls, history restoration, rounded player artwork exclusions, current-New selection, ATEEZ mapping and session continuity remain intact.

Build `iSXqMeYlF6vbOLFZzu1oC` on the verified D-backed `.next` junction passed 159 desktop captures, five responsive captures, all 218 route steps and all 104 interaction regressions with zero failures. TypeScript, seven QA unit tests, nine cover tests, archive and coverage checks passed. All 159 exact-size comparisons completed. Evidence: `apple-music-clone/.qa/evidence/replay-acceptance-20260921-full`; authoritative roots are `optimized-browser`, `optimized-comparison` and `readable-review`.

Mean MAE improves `4.940987 -> 4.938574`; mean over-20 improves `4.968957% -> 4.952968%`. Replay Jul and May materially improve; the other five Replay states are unchanged. The unrelated Search-bottom variance is a reviewed one-pixel card-edge raster change, and all other non-Replay movement is below `0.000003` MAE. `latest-metrics.json` is the numerical snapshot, not acceptance.

## Acceptance and next actual defects

UI 159/159; MATCH 55/159; FLOW 5/58. Exact source/published/current/4? residual review advances all seven Replay/milestone states, and real-control ordered evidence advances Replay monthly and milestone detail. `docs/tasks.md` remains the sole acceptance ledger; the dated Replay review supersedes earlier open blocker notes for those accepted rows.

Initial New `e72be564` remains the concrete New-family blocker. Native-resolution archive review exposes a dark-haired face, pale curved sleeve/object and blue backdrop that the current generic `cover-9` fallback cannot produce. Exact motion-frame extraction found no unobscured frame; whole-corpus occurrence search found only the same card under the same player geometry; the verified kwn provider bytes contradict the exposed source. Do not install a guessed cover, reset the catalog or paint captured player UI over the defect. Preserve the distinct initial and named/playing editions and the current ATEEZ mapping. Once the provider cover is proven and installed through the reviewed cover-resource mechanism, rerun every initial-New-dependent journey and accept each only if every endpoint MATCH is complete.

Replay/milestones are now accepted as a complete family. The two affected frames improve materially, the remaining five are unchanged, all real-control journeys pass, and artwork is decoded before flow screenshots are retained. Do not reopen the family solely for non-zero lawful platform residuals; reopen only for a concrete product mismatch or regression.

The prior lyrics/account-session review identifies still-inconsistent captured session/catalog endpoints. Investigate recordings and flow order rather than renaming a user or replacing queue/library state behind an ordinary control.

## Runtime, identity and preservation

Canonical dev remains `http://127.0.0.1:6435/`; listener PID 16352 was observed at 2026-09-21 04:24. Optimized listener PID 29316 remains on 6437 from the active app and build, observed at 2026-09-21 06:13. These are observations, not authority to stop stale/reused PIDs: inspect commands, paths, creation times and ancestry before any process action; never stop remote-connection ancestors.

QA Python: `D:\courses-main-qa\audit-venv\Scripts\python.exe`. Browser: `D:\courses-main-qa\playwright-browsers\chromium-1234\chrome-win64\chrome.exe` (151.0.7922.34). Last free space: J 2.801 GiB, D 9.387 GiB. No deletion or cleanup was performed.

Generated-only Next type paths were backed up under `.qa/evidence/player-icons-20260921/post-rerun-generated` before normalization. `normalization-receipt-rerun.json` proves the application tree stayed unchanged. No QA/build artifacts, downloaded candidate covers, credentials or fonts belong in Git.

Use coherent verified commits directly on main and ordinary push: `git -c credential.helper= -c credential.helper=manager -c credential.interactive=never push origin main`. Inspect both GitHub workflow results for the exact pushed SHA. Parent CI success does not cover new edits. Do not alter global authentication settings.
