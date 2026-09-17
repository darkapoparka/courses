# Courses — current handoff

Updated 2026-09-17 for the verified Viral Chart row and real-control checkpoint on `J:\courses/main`.

## One checkout, one branch — mandatory

**Only implementation checkout:** `J:\courses`

**Only working branch:** `main`

**Active app:** `J:\courses\apple-music-clone`

The owner explicitly ended the multi-branch/multi-worktree workflow. Do not create, checkout or switch to another branch/worktree for implementation unless the owner later explicitly reverses this rule. Commit coherent verified checkpoints directly to `main` and push normally.

`git worktree list` contains only `J:/courses` on `main`. Port 6431 remains retired. `J:\courses-astra-preview` is not a Git checkout and must never be used as source. Recovery material under `D:\courses-main-transfer\20260913-retire-preview\` is provenance only.

The canonical isolated QA interpreter is `D:\courses-main-qa\audit-venv\Scripts\python.exe`, verified with Python 3.13.15, Playwright 1.62.0 and Chromium 151.0.7922.34. The canonical browser executable is `D:\courses-main-qa\playwright-browsers\chromium-1234\chrome-win64\chrome.exe`.

## Latest verified implementation checkpoint

The verified runtime candidate was captured from a coherent Viral Chart working tree on top of `8aabf6d651852ef467e2d83dbf12c232058963a1`. It retains the preceding discovery typography/live-symbol repair while tightening the real chart table and proving the chart's actual controls.

The active implementation owner is `app/reference-fidelity.css`, scoped beneath `.chart-page > .chart-table` at the desktop breakpoint. `components/music-chart-schedule.tsx` remains the live chart owner and was not rewritten. `scripts/browser_discovery_shelves.py` now asserts exact table/header/row geometry and traverses play, favourite, More/Escape focus return, unavailable playback, artist/album navigation, browser Back and player continuity without fixture jumping, state injection or force clicks.

The [dated Viral Chart review](reference-review/2026-09-17-viral-chart-rows-controls.md) records source/render/difference review, exact geometry, real-control evidence, hashes, optimized corpus and remaining blockers. The preceding [discovery typography review](reference-review/2026-09-17-discovery-typography-symbols.md), [signed-out Home review](reference-review/2026-09-16-signed-out-home-typography-controls.md) and [release-edition review](reference-review/2026-09-16-release-editions-legacy-player.md) remain authoritative for their separate batches.

Optimized build `34gwP38nRlIk-xYO0T56Z` captured implementation SHA-256 `0e06ee9cd9a83db22aa3dc3de305e2d484745e3ed076bc0473eb8720e8ec5d81` and tooling SHA-256 `51589d159f3da5351bddfaff8a3b7c552d5772300900f6957eb938de12c50a91`.

- 159 desktop states, five responsive states, 218 route checks and 66 interaction regressions: zero failures.
- Archive/coverage, typecheck and optimized build passed; five Python QA-tool and nine Node cover-integrity tests also passed.
- All 159 exact-size comparisons completed with zero functional failures. Corpus mean MAE changed `5.263068 → 5.262063`; mean over-20 changed `5.353294% → 5.353007%`.
- Viral Chart `8a234785` improved `3.865631 → 3.751661` MAE and `3.643103% → 3.585118%` over-20.
- 146 states were byte-identical. Thirteen render hashes changed: the intended chart repair, seven max-one-channel variations, one max-two-channel variation and four artwork/video decode variations.
- All six states with a positive delta in either metric were reviewed source/baseline/current/candidate-change; none exposed a readable geometry, copy, state or control regression.
- The strengthened registered journey enters from New through the real chart heading, plays an available row, preserves an unavailable row, round-trips favourite, verifies More/Escape focus, navigates artist/album and returns with player continuity. No MATCH or FLOW box was checked.

Evidence: `D:\courses-main-evidence\viral-chart-full-20260917-055328\verification-summary.json`, `browser\results.json`, `comparison\metrics.json` / `index.html`, `delta-summary.json`, the complete gallery and `worsened-review\`. Focused evidence remains under `viral-chart-focused-20260917-054929` and `viral-chart-source-backed-20260917-055053`.

The previous shared typography evidence remains under `D:\courses-main-evidence\shared-typography-20260917-013440\`; signed-out Home evidence under `signedout-home-player-20260916-202908`; release/material evidence under `release-final-151-20260916-090731`; lyrics/queue continuity under `lyrics-queue-first-entry-final-20260915-024103`; and Alpha material evidence under `alpha-continuation-final-20260915`.

## Servers and storage

Canonical development preview: `http://127.0.0.1:6435/` from `J:\courses\apple-music-clone`. The optimized audit used `http://127.0.0.1:6437/` from build `34gwP38nRlIk-xYO0T56Z` and was stopped after verification; the canonical development preview was restored on 6435. Port 6431 is retired/stopped. Port 3000 belongs to another project and must not be touched.

Main `.next` and `.parity-evidence` remain D:-backed. Do not delete their backing directories or build simultaneously into a `.next` used by another process. At this checkpoint J: had approximately 39.73 GB free and D: had approximately 8.37 GB free; no cleanup command was run by this agent. Keep TEMP/TMP, build scratch and evidence on D: and report further storage pressure instead of deleting user data.

## Honest acceptance status

**UI implemented/renderable: 159 / 159**

**MATCH genuinely signed off: 0 / 159**

**Complete recorded FLOW genuinely signed off: 0 / 58**

Green CI, a rendered fixture, route coverage or a lower residual is not acceptance. Course/community adaptation remains blocked until genuine clone acceptance and explicit owner approval.

## Continue implementation immediately

Do not stop at verification. After preflight on `J:\courses/main`, continue directly into the next substantive 1:1 defect.

Priority unresolved areas:

1. **Lawful typography and symbols** — Windows platform evidence resolves to Arial-family rendering. Refine geometry, weight, wrapping, antialiasing and contours without distributing proprietary Apple fonts.
2. **Remaining release metadata and artwork** — the repaired lower editions still need exact captions, complete covers and City Chart artwork where frozen evidence supports them. Fix owning cards, never compensate with player tint.
3. **Lyrics and queue** — retain deterministic live entry while refining lyric fade/blur/scroll and queue artwork, rows, spacing, separators and durations. Never reset unrelated catalog/library/queue state to imitate endpoint stills.
4. **Alpha / New finishing (`54b01eab`)** — retain provider artwork, corrected lower release edition and state-specific glass while refining arrows, live profile/title difference, typography and controls.
5. **Library-editor snapshot transition** — model the later account/catalog/library change only if frozen evidence supports a real transition.
6. **Signed-out Home (`aefa8502`)** — retain the repaired live glows, lawful CTA compensation and scoped player geometry; remaining blockers are heading/sidebar raster, CTA antialiasing and volume/small-symbol contours.

The exact frozen archive under `apple-music-clone/reference/` remains immutable. Use each original's real 1440×903 or 1440×904 application viewport, excluding only the documented 120px acquisition footer. No screenshot-as-page implementation, invisible hotspots, product masks, resized candidates, forced clicks as FLOW evidence, fixture jumping presented as a flow, course adaptation, deployment, real Apple credentials/payments or copyrighted streaming.
