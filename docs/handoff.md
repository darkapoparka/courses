# Courses - current handoff

Updated 2026-09-21. Only checkout `J:\courses`, only branch `main`, active app `apple-music-clone`. No course adaptation, replacement app, branch/worktree creation, cleanup or reference-archive mutation.

## Current verified implementation

Read [the player-cutout and Replay-control review](reference-review/2026-09-21-player-cutout-replay-controls.md) and the owning rows in `docs/tasks.md`. The batch preserves and verifies the earlier [New selection/Replay implementation](reference-review/2026-09-20-new-selection-replay-containment.md). The recorded parent is `96d17d0a0a551fb81bd58f5032d0a5290df18745`; obtain the resulting publication SHA from Git rather than assuming this parent remains HEAD.

New release fragments now use a rounded, geometry-only player exclusion instead of a rectangular gap, with browser alpha checks across six widths. Native Replay ink, July caption alignment and year-control geometry are corrected. The preserved changes provide current-New selection rounding/burgundy ink, contained Replay lighting, and live artist ranks/captions with responsive, keyboard-accessible controls. Distinct release editions, the ATEEZ cover, library/queue/account/history continuity and prior signup/player work remain intact.

Build `lxEtLXp3dE2AqW7J-CY3t` in `.qa/build-new-player-20260921` passed 159 desktop captures, five responsive captures, 218 route checks and 101 interaction cases, with zero failures. All 159 exact-size comparisons completed. Seven QA unit tests, nine cover tests, TypeScript, archive and coverage checks passed. Evidence: `apple-music-clone/.qa/evidence/new-player-20260921`, including ordered journey screenshots/steps and the complete comparison gallery. `latest-metrics.json` is the numerical snapshot, not acceptance.

## Acceptance and next actual defects

UI 159/159; MATCH 22/159; FLOW 3/58. No checkbox advanced in this batch. `docs/tasks.md` remains the sole acceptance ledger. The review explicitly records worsened Replay residuals rather than treating native controls or aggregate diagnostics as sign-off.

Prioritize initial New `e72be564`: its exposed rectangular artwork gaps are fixed, but the complete underlying release artwork and actual interior player glass distribution remain wrong. Existing shader-only probes favored the current 50% background / 16px blur / saturation 2. Do not substitute a guessed album, reset the catalog or paint captured player UI over the defect. Preserve the distinct initial and named/playing release editions.

Replay still needs native artist material/glyph finishing, ambient lighting, obscured song metadata, gallery continuation and player finishing. The prior lyrics/account-session review identifies still-inconsistent captured session/catalog endpoints; investigate those rather than renaming a user or replacing queue/library state behind an ordinary control.

## Runtime, identity and preservation

Canonical dev remains `http://127.0.0.1:6435/`. Last inspected ancestry: listener 16352 -> project Next dev 49760 -> parent 44232. Optimized listener 45936 on 6437 was launched from the active app for the new build. These are observations, not authority to stop stale/reused PIDs: inspect actual commands, paths, creation times and ancestry before any process action; never stop the remote-connection ancestors.

QA Python: `D:\courses-main-qa\audit-venv\Scripts\python.exe`. Browser: `D:\courses-main-qa\playwright-browsers\chromium-1234\chrome-win64\chrome.exe` (151.0.7922.34). Last free space: J 6.432 GiB, D 9.393 GiB. No deletion was performed.

Generated-only Next type paths were backed up before normalization. The application tree and QA hashes are unchanged; `normalization-receipt.json` bridges the captured and normalized configuration-inclusive source identities. No QA/build artifacts, downloaded candidate covers, credentials or fonts belong in Git.

Use coherent verified commits directly on main and ordinary push: `git -c credential.helper= -c credential.helper=manager -c credential.interactive=never push origin main`. Inspect both GitHub workflow results for the actual new SHA. Parent CI success does not cover new edits. Do not alter global authentication settings.
