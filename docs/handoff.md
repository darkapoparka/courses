# Courses — current handoff

Updated 2026-09-18 for the verified Search library-empty match on `J:\courses/main`.

## One checkout, one branch — mandatory

**Only implementation checkout:** `J:\courses`

**Only working branch:** `main`

**Active app:** `J:\courses\apple-music-clone`

The owner explicitly ended the multi-branch/multi-worktree workflow. Do not create, checkout or switch to another branch/worktree for implementation unless the owner later explicitly reverses this rule. Commit coherent verified checkpoints directly to `main` and push normally.

`git worktree list` contains only `J:/courses` on `main`. Port 6431 remains retired. `J:\courses-astra-preview` is not a Git checkout and must never be used as source. Recovery material under `D:\courses-main-transfer\20260913-retire-preview\` is provenance only.

The canonical isolated QA interpreter is `D:\courses-main-qa\audit-venv\Scripts\python.exe`, verified with Python 3.13.15, Playwright 1.62.0 and Chromium 151.0.7922.34. The canonical browser executable is `D:\courses-main-qa\playwright-browsers\chromium-1234\chrome-win64\chrome.exe`.

## Latest verified implementation checkpoint

The verified runtime candidate was captured from the Search library-empty working tree on top of `cc4ed594fbc0d57e1bf86befeae94507b5d42e95`. It preserves the accepted All Playlists screen while moving `5b3ec96a` from fixture-specific compensation to live Search state ownership.

The implementation owners are `components/music-search.tsx`, `components/apple-music-app.tsx`, `lib/reference-chrome.ts` and the scoped `.library-search-empty` rules in `app/reference-fidelity.css`. The empty Your Library state now shows only All Playlists, owns exact field/segmented/empty-state geometry, and preserves sidebar, footer and idle-player continuity. `scripts/browser_library_flows.py` traverses all four archived Search steps through real controls, then verifies scope round-trips, suggestions, Escape focus return, Enter submission, results and Clear.

The [dated Search review](reference-review/2026-09-18-search-library-empty-match.md) records source/render/difference review, exact geometry, hashes, real-control evidence, corpus review and acceptance. The preceding [All Playlists review](reference-review/2026-09-17-all-playlists-match.md), [Viral Chart review](reference-review/2026-09-17-viral-chart-rows-controls.md) and earlier reviews remain authoritative for their batches.

Optimized build `2dDDJQCONN7SjE62vhe7p` captured implementation SHA-256 `063592d771133f06810d593cc78698a2f354c1634b4206d99ad98891a626fddb` and tooling SHA-256 `6e0c450aa520aa7169b7b4d76f31c07aec4725b5aab31551b05a7255553d83e8`.

- 159 desktop states, five responsive states, 218 route checks and 67 interaction regressions: zero failures.
- Archive/coverage, typecheck, five Python QA-tool tests and nine Node cover-integrity tests passed.
- All 159 exact-size comparisons completed. Corpus mean MAE improved `5.262081 â†’ 5.260985`; mean over-20 improved `5.352900% â†’ 5.351792%`.
- Search library empty `5b3ec96a` improved `2.036646 â†’ 1.873896` MAE and `1.349898% â†’ 1.203088%` over-20.
- 148 states were byte-identical and eleven render hashes changed. Six positive-delta states were reviewed source/baseline/current/candidate-change; every changed pixel stayed below 20 levels and no concrete regression was found.
- `MATCH-5b3ec96a` is genuinely checked. `FLOW-6c5d545e` stays open because `e72be564`, `035569a0` and `812ba627` are not MATCH-complete.

Evidence: `D:\courses-main-evidence\search-empty-current-full-20260918-001110\verification-summary.json`, `browser\results.json`, `comparison-baseline\metrics.json` / `index.html`, `delta-summary.json`, the complete gallery and `worsened-review-baseline\`.

## Servers and storage

Canonical development preview: `http://127.0.0.1:6435/` from `J:\courses\apple-music-clone`. Listener PID `37312` is the Next child of PID `20764`, launched by project shell PID `15444`; that shell is owned by Desktop Commander PID `23456` (remote relay PID `25040`). HTTP 200, `[data-reference-ready="true"]`, hydrated `new` scene, non-empty body and absence of a framework error overlay were verified. The optimized audit used port 6437 from build `2dDDJQCONN7SjE62vhe7p` and its exact listener was stopped after verification. Ports 6431 and 6437 are stopped; port 3000 was not touched.

Main `.next` and `.parity-evidence` remain D:-backed. Do not delete their backing directories or build simultaneously into a `.next` used by another process. At this checkpoint J: has approximately 35.60 GB free and D: has approximately 7.09 GB free; no cleanup command was run. Keep TEMP/TMP, build scratch and evidence on D: and report further storage pressure instead of deleting user data.

## Honest acceptance status

**UI implemented/renderable: 159 / 159**

**MATCH genuinely signed off: 2 / 159**

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
