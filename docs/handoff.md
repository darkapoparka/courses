# Courses — current handoff

Updated 2026-09-18 for the verified Search-family match batch on `J:\courses/main`.

## One checkout, one branch — mandatory

**Only implementation checkout:** `J:\courses`

**Only working branch:** `main`

**Active app:** `J:\courses\apple-music-clone`

The owner explicitly ended the multi-branch/multi-worktree workflow. Do not create, checkout or switch to another branch/worktree for implementation unless the owner later explicitly reverses this rule. Commit coherent verified checkpoints directly to `main` and push normally.

`git worktree list` contains only `J:/courses` on `main`. `J:\courses-astra-preview` is not a Git checkout and must never be used as source. Recovery material under `D:\courses-main-transfer\20260913-retire-preview\` is provenance only.

The canonical isolated QA interpreter is `D:\courses-main-qa\audit-venv\Scripts\python.exe`, verified with Python 3.13.15, Playwright 1.62.0 and Chromium 151.0.7922.34. The canonical browser executable is `D:\courses-main-qa\playwright-browsers\chromium-1234\chrome-win64\chrome.exe`.

## Latest verified implementation checkpoint

The source-clean exact candidate was captured from the Search-family working tree on top of `dc6df744b0a0d28cd7ed290d81c608df3f7508eb`. It preserves all sixteen previously accepted screens and both accepted Library journeys while completing the remaining Search family through live state ownership.

The owning implementation is `components/music-search.tsx`, `app/capture-content.css`, `app/player-fidelity.css` and `app/reference-fidelity.css`. Registered evidence is strengthened in `scripts/browser_library_flows.py` and `scripts/browser-reference.py`. Search field focus, bottom-scroll state, suggestion glass, submitted results, compact Clear material, result rails and player material now survive the same real-control paths rather than depending on direct fixture selectors.

The [dated Search-family review](reference-review/2026-09-18-search-family-match.md) records exact source/render/difference review, dimensions, hashes, real-control evidence, continuous-flow comparison and the complete regression review. The preceding [Library review](reference-review/2026-09-18-library-family-match.md), [empty Search review](reference-review/2026-09-18-search-library-empty-match.md), [All Playlists review](reference-review/2026-09-17-all-playlists-match.md) and earlier reviews remain authoritative for their batches.

Optimized build `F0KMjIXtaan15z-xzgDqh` captured implementation SHA-256 `079156c833d7c5a570194cfe087dd7edc41e4e7682d633fdd640279f9e2e0556` and tooling SHA-256 `238539ac80f6664654a6bdcbae57a9fba134cabe03c18fcc5b6ca0106f23e0b0` after generated `next-env.d.ts` / `tsconfig.json` build churn was removed.

- 159 desktop states, five responsive states, 218 route checks and 70 interaction regressions: zero failures.
- Archive/coverage, typecheck, optimized build, five Python QA-tool tests and nine Node cover-integrity tests passed.
- All 159 exact-size comparisons completed. Corpus mean MAE improved `5.256962793 → 5.240636608`; mean over-20 improved `5.350413054% → 5.323660568%`.
- Seven render hashes changed, all seven improved, 152 states retained both metrics and the positive-delta union is empty.
- All four `FLOW-638262c8` continuous checkpoints and all Search checkpoints inside `FLOW-6c5d545e` are byte-identical to direct candidate fixtures.
- Six Search MATCH entries and the complete Searching Apple Music journey were genuinely accepted.

New MATCH entries: `035569a0`, `812ba627`, `4b515439`, `e70094e3`, `bbb92581`, `f4a8b5dc`.

New FLOW entry: `FLOW-638262c8`.

`FLOW-6c5d545e` remains open only because its permitted initial New frame `e72be564` is not MATCH-complete.

Evidence: `D:\courses-main-evidence\search-family-final-source-clean-full-20260918-080117\`, `D:\courses-main-evidence\search-final-accepted-focused-20260918-075151\browser\`, and readable review `C:\Users\radev\courses-search-final-source-clean-review\`.

## Servers and storage

Canonical development preview: `http://127.0.0.1:6435/` from `J:\courses\apple-music-clone`. Listener PID `28884` is the Next child of PID `10036`, launched through project command/npm PIDs `14664`, `38124`, `29212` and shell PID `32204`; that shell is owned by Desktop Commander runtime PID `38144` and remote relay PID `35552`. HTTP 200, `[data-reference-ready="true"]`, hydrated `new` scene, non-empty body, absence of a framework error overlay, zero console/request failures and real navigation to Search were verified.

The optimized audit used port 6437 from isolated build directory `.parity-evidence/search-family-final-accepted-build-20260918-0800/.next`. Listener PID `15260` and its complete project-only ancestry were inspected; HTTP and the exact browser corpus passed before the exact listener was stopped. Port 6437 is stopped and port 3000 is unused.

Port 6431 was unexpectedly occupied during final verification by orphan listener PID `39808`, whose served page identifies itself as an unrelated `Shop reference preview`. It was not touched because computer-safety rules prohibit terminating an unrelated project. Do not use that listener as clone evidence; re-inspect it before any future action.

Main `.next` and `.parity-evidence` remain D:-backed. Do not delete their backing directories or build simultaneously into a `.next` used by another process. At this checkpoint J: has approximately 33.66 GB free and D: has approximately 2.93 GB free; no cleanup command was run. Keep TEMP/TMP, build scratch and evidence on D: and report further storage pressure instead of deleting user data.

## Honest acceptance status

**UI implemented/renderable: 159 / 159**

**MATCH genuinely signed off: 22 / 159**

**Complete recorded FLOW genuinely signed off: 3 / 58**

Green CI, a rendered fixture, route coverage or a lower residual is not acceptance. Course/community adaptation remains blocked until genuine clone acceptance and explicit owner approval.

## Continue implementation immediately

Do not stop at verification. After preflight on `J:\courses/main`, continue directly into the next substantive 1:1 defect.

Priority unresolved areas:

1. **Initial New frame and shared New discovery (`e72be564`)** — this one MATCH blocks the otherwise-complete Search journey and several Library/navigation journeys. Preserve live catalog/session continuity while refining lawful typography, metadata, lower-release artwork, City Chart artwork, player and sidebar.
2. **Signed-out Home (`aefa8502`)** — retain the repaired live glows, lawful CTA compensation and scoped player geometry; remaining blockers are heading/sidebar raster, CTA antialiasing and volume/small-symbol contours.
3. **Alpha / New finishing (`54b01eab`)** — retain provider artwork, corrected lower release edition and state-specific glass while refining arrows, live profile/title difference, typography and controls.
4. **Lyrics and queue** — retain deterministic live entry while refining lyric fade/blur/scroll and queue artwork, rows, spacing, separators and durations. Never reset unrelated catalog/library/queue state to imitate endpoint stills.
5. **Concert and Replay families** — Search entry is now complete, but later concert/date/filter and Replay/milestone states still require family-wide MATCH review before their journeys can close.
6. **Library-editor snapshot transition** — model the later account/catalog/library change only if frozen evidence supports a real transition.

The exact frozen archive under `apple-music-clone/reference/` remains immutable. Use each original's real 1440×903 or 1440×904 application viewport, excluding only the documented 120px acquisition footer. No screenshot-as-page implementation, invisible hotspots, product masks, resized candidates, forced clicks as FLOW evidence, fixture jumping presented as a flow, course adaptation, deployment, real Apple credentials/payments or copyrighted streaming.
