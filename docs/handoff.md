# Courses — current handoff

Updated 2026-09-20 for the verified session/discovery recovery batch on `J:\courses/main`.

## One checkout, one branch — mandatory

**Only implementation checkout:** `J:\courses`

**Only working branch:** `main`

**Active app:** `J:\courses\apple-music-clone`

The owner explicitly ended the multi-branch/multi-worktree workflow. Do not create, checkout or switch to another branch/worktree for implementation unless the owner later explicitly reverses this rule. Commit coherent verified checkpoints directly to `main` and push normally.

`git worktree list` contains only `J:/courses` on `main`. `J:\courses-astra-preview` is not a Git checkout and must never be used as source. Recovery material under `D:\courses-main-transfer\20260913-retire-preview\` is provenance only.

The canonical isolated QA interpreter is `D:\courses-main-qa\audit-venv\Scripts\python.exe`, verified with Python 3.13.15, Playwright 1.62.0 and Chromium 151.0.7922.34. The canonical browser executable is `D:\courses-main-qa\playwright-browsers\chromium-1234\chrome-win64\chrome.exe`.

## Latest verified implementation checkpoint

The coherent recovery batch is based on `517783a16ec21239e9d9f453cec186baa53de27a` and includes the previously uncommitted discovery, public chrome, hover, artwork and per-history-entry navigation work. The current code additionally preserves Autoplay, queue metadata and guest/member state through sidebar navigation and Back/Forward. The new logout regression and complete queue metadata checks pass. Do not redo or discard these repairs.

Fresh optimized build: `ImPNc1VtUO7uKcvfRUsQv`, in `.qa/build-resume-20260920`.

- 159 desktop states, five responsive states, 218 route checks and 78 interaction regressions passed with zero failures; all 159 exact-size comparisons completed.
- Archive/coverage, TypeScript, optimized build, seven Python QA-tool tests and nine Node cover-integrity tests passed.
- Implementation SHA-256: `0b7c928ef5fdbbd171a3411268a6044d0d05ddaba89f91198d8f8176ae43ff2c`.
- Tooling SHA-256: `0fdf4055cdd3270163fd51c52f2f52728ad4efac5cde0c40f7b4162fff098aa7`.
- Mean MAE: 5.190585576 -> 5.049159017; mean over-20: 5.277333751% -> 5.154771669%. Initial New: 2.526055 MAE / 2.832610% over-20.
- All 28 positive-delta states were reviewed readably against source and the published baseline. Inherited visible defects remain; no acceptance checkbox advanced.

Evidence root: `J:\courses\apple-music-clone\.qa\evidence\resume-20260920`. Successful directories: `optimized-browser-rerun` and `optimized-comparison-rerun`. The [dated recovery review](reference-review/2026-09-20-session-discovery-recovery.md) owns exact changes, results, preserved failures, review findings and next defects. [Latest metrics](reference-review/latest-metrics.json) is copied from this successful candidate, not the failed first capture.

## Servers and storage

Development remains `http://127.0.0.1:6435/`, using `.qa/dev-resume-20260920` in the same app checkout. Final health: HTTP 200, hydrated New -> Search -> browser Back, no page errors or failed requests, and computed player glass `blur(16px) saturate(2)`.

Observed dev ancestry: listener `3272` -> project Next CLI `31016` -> project launch PowerShell `23480` -> Desktop Commander `37992` -> remote CLI `45896` -> command host `38668` -> npx `13608` -> command host `18144` -> user PowerShell `37316` -> Explorer `5684`; its recorded parent `5636` was absent. Never stop the Commander or desktop ancestors. Reinspect PIDs before any action.

The audit listener was `33952`, with exact absolute project CLI and build verified. Its former parent PID `41360` had been reused by a later unrelated process; do not follow or terminate that replacement as an ancestor. After evidence collection only the verified audit listener was stopped. Port 6437 was verified free; the development listener on 6435 remained PID 3272.

The original `.next` and `.parity-evidence` junctions remain D:-backed and unchanged. This batch used ignored J-backed build/evidence directories when D: was nearly full. Last read: J: 23.243 GiB and D: 9.393 GiB free; no cleanup was run. Recheck space rather than deleting anything.

## Honest acceptance status

**UI implemented/renderable: 159 / 159**

**MATCH genuinely signed off: 22 / 159**

**Complete recorded FLOW genuinely signed off: 3 / 58**

Green CI, a rendered fixture, route coverage or a lower residual is not acceptance. Course/community adaptation remains blocked until genuine clone acceptance and explicit owner approval.

## Continue implementation immediately

Do not stop at verification. After preflight on `J:\courses/main`, continue directly into the next substantive 1:1 defect.

Priority unresolved areas:

1. **Initial/current New and its actual artwork** — `e72be564` still blocks Search and several Library journeys. Named/playing New second-release artwork is incorrectly Lover: matching GOLDEN HOUR : Part.5 provider evidence was identified in the dated review, but the attempted mapping write was blocked and did not execute. Respect that safeguard; do not claim the mapping is fixed. Repair actual content ownership rather than hiding it with blur/tint. Initial-New ink, symbols, player details and lower content remain open.
2. **Signed-out Home (`aefa8502`)** — retain the repaired live glows, lawful CTA compensation and scoped player geometry; remaining blockers are heading/sidebar raster, CTA antialiasing and volume/small-symbol contours.
3. **Alpha / New finishing (`54b01eab`)** — retain provider artwork, corrected lower release edition and state-specific glass while refining arrows, live profile/title difference, typography and controls.
4. **Lyrics, expanded menus and queue** — retain the repaired queue/session continuity. Resolve the inherited extra menu-like backplate/edge, exact menu anchors, lyric emphasis/wrapping/fade, rows and separators. Its owner is not yet established; the clean c939c9b8 original does not prove menu pixels in artwork. Never reset unrelated catalog/library/queue state to imitate endpoint stills.
5. **Concert and Replay families** — Search entry is now complete, but later concert/date/filter and Replay/milestone states still require family-wide MATCH review before their journeys can close.
6. **Library-editor snapshot transition** — model the later account/catalog/library change only if frozen evidence supports a real transition.

The exact frozen archive under `apple-music-clone/reference/` remains immutable. Use each original's real 1440×903 or 1440×904 application viewport, excluding only the documented 120px acquisition footer. No screenshot-as-page implementation, invisible hotspots, product masks, resized candidates, forced clicks as FLOW evidence, fixture jumping presented as a flow, course adaptation, deployment, real Apple credentials/payments or copyrighted streaming.
