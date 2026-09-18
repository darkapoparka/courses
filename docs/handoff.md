# Courses — current handoff

Updated 2026-09-18 for the verified Library-family match batch on `J:\courses/main`.

## One checkout, one branch — mandatory

**Only implementation checkout:** `J:\courses`

**Only working branch:** `main`

**Active app:** `J:\courses\apple-music-clone`

The owner explicitly ended the multi-branch/multi-worktree workflow. Do not create, checkout or switch to another branch/worktree for implementation unless the owner later explicitly reverses this rule. Commit coherent verified checkpoints directly to `main` and push normally.

`git worktree list` contains only `J:/courses` on `main`. Port 6431 remains retired. `J:\courses-astra-preview` is not a Git checkout and must never be used as source. Recovery material under `D:\courses-main-transfer\20260913-retire-preview\` is provenance only.

The canonical isolated QA interpreter is `D:\courses-main-qa\audit-venv\Scripts\python.exe`, verified with Python 3.13.15, Playwright 1.62.0 and Chromium 151.0.7922.34. The canonical browser executable is `D:\courses-main-qa\playwright-browsers\chromium-1234\chrome-win64\chrome.exe`.

## Latest verified implementation checkpoint

The exact candidate was captured from the Library-family working tree on top of `b4df13caf4e62209e6289106a73c35108610f563`. It preserves the accepted All Playlists and Search library-empty screens while completing a coherent Library family rather than isolated fixture compensation.

The owning implementation is `app/library-fidelity.css`, `components/music-library.tsx`, `components/music-context.tsx`, `components/music-menus.tsx`, `components/music-library-menu-icons.tsx` and `components/music-primitives.tsx`. Registered evidence is strengthened in `scripts/browser_library_controls.py` and `scripts/browser_library_flows.py`. `next.config.ts` permits an explicit D:-backed `NEXT_DIST_DIR` for isolated optimized audits.

The repaired surfaces share measured top-bar geometry, sort/menu anchors and materials, source-shaped compact action symbols, correct Recently Added and Made for You empty-state glyphs, and source-supported compact footers. Sorting and pinning now retain ordered screenshots and `steps.jsonl` while exercising real pointer, keyboard, Escape, persistence and state-isolation behavior.

The [dated Library review](reference-review/2026-09-18-library-family-match.md) records exact source/render/difference review, dimensions, hashes, real-control evidence, continuous-flow comparison and the complete regression review. Earlier [Search](reference-review/2026-09-18-search-library-empty-match.md), [All Playlists](reference-review/2026-09-17-all-playlists-match.md) and [Viral Chart](reference-review/2026-09-17-viral-chart-rows-controls.md) reviews remain authoritative for their batches.

Optimized build `tdHorimG6A0m09_NWicfO` captured implementation SHA-256 `b8164a60c5218f2cedc663988e955ecb6f3e6d138eb8207e75e0e4251d8e8b38` and tooling SHA-256 `0f583da39b54419437f3f1ce4cc319cd3e94ea157cb85628dfaada59dff4604d`.

- 159 desktop states, five responsive states, 218 route checks and 69 interaction regressions: zero failures.
- Archive/coverage, typecheck, optimized build, five Python QA-tool tests and nine Node cover-integrity tests passed.
- All 159 exact-size comparisons completed. Corpus mean MAE improved `5.260984609 → 5.256962793`; mean over-20 improved `5.351792008% → 5.350413054%`.
- Thirteen states improved, 142 were unchanged and four small positive-delta states were reviewed source/baseline/current/change without a concrete product regression.
- The previously accepted `8a2a4241` and `5b3ec96a` optimized renders remained byte-identical.
- Fourteen Library MATCH entries and the complete sorting and pinning journeys were genuinely accepted.

New MATCH entries: `bdc69b59`, `0df0d2a2`, `610af644`, `5d3db7ca`, `92589389`, `09b3600e`, `1d016f0f`, `e9bee76d`, `3884ff64`, `06be9f09`, `4e857921`, `0b0e3fbf`, `e379e3fe`, `bde65d33`.

New FLOW entries: `FLOW-c454fe86` and `FLOW-22c4db47`.

Evidence: `D:\courses-main-evidence\library-family-final-full-20260918-041639\`, `D:\courses-main-evidence\library-targeted-final-20260918-040411\`, `D:\courses-main-evidence\library-empty-final-20260918\`, and `D:\courses-main-evidence\library-focused-empty-final-20260918-041444\browser\`.

## Servers and storage

Canonical development preview: `http://127.0.0.1:6435/` from `J:\courses\apple-music-clone`. Listener PID `35932` is the Next child of PID `30304`, launched through project npm PIDs `20080`, `40124`, `27352` and shell PID `38440`; that shell is owned by Desktop Commander runtime PID `6324`. HTTP 200, `[data-reference-ready="true"]`, hydrated `new` scene, non-empty body, absence of a framework error overlay, zero console/request failures and real navigation to Songs were verified.

The optimized audit used port 6437 from isolated build directory `.parity-evidence/library-family-final-build-20260918-041547/.next`. Listener PID `39948` and its complete project-only ancestry were inspected; HTTP, hydration and real navigation passed before the exact listener was stopped. Ports 6431 and 6437 are stopped. Port 3000 was not touched.

Main `.next` and `.parity-evidence` remain D:-backed. Do not delete their backing directories or build simultaneously into a `.next` used by another process. At this checkpoint J: has approximately 34.84 GB free and D: has approximately 5.09 GB free; no cleanup command was run. Keep TEMP/TMP, build scratch and evidence on D: and report further storage pressure instead of deleting user data.

## Honest acceptance status

**UI implemented/renderable: 159 / 159**

**MATCH genuinely signed off: 16 / 159**

**Complete recorded FLOW genuinely signed off: 2 / 58**

Green CI, a rendered fixture, route coverage or a lower residual is not acceptance. Course/community adaptation remains blocked until genuine clone acceptance and explicit owner approval.

## Continue implementation immediately

Do not stop at verification. After preflight on `J:\courses/main`, continue directly into the next substantive 1:1 defect.

Priority unresolved areas:

1. **Search family** — complete `035569a0`, `812ba627`, `4b515439`, `e70094e3`, `bbb92581` and related navigation states through the existing real-control Search journey. The accepted `5b3ec96a` endpoint must remain unchanged.
2. **Signed-out Home (`aefa8502`)** — retain the repaired live glows, lawful CTA compensation and scoped player geometry; remaining blockers are heading/sidebar raster, CTA antialiasing and volume/small-symbol contours.
3. **Shared New/Home discovery** — refine lawful typography, metadata, lower-release artwork, City Chart artwork, player and sidebar without distributing proprietary fonts or compensating through unrelated tint.
4. **Alpha / New finishing (`54b01eab`)** — retain provider artwork, corrected lower release edition and state-specific glass while refining arrows, live profile/title difference, typography and controls.
5. **Lyrics and queue** — retain deterministic live entry while refining lyric fade/blur/scroll and queue artwork, rows, spacing, separators and durations. Never reset unrelated catalog/library/queue state to imitate endpoint stills.
6. **Library-editor snapshot transition** — model the later account/catalog/library change only if frozen evidence supports a real transition.

The exact frozen archive under `apple-music-clone/reference/` remains immutable. Use each original's real 1440×903 or 1440×904 application viewport, excluding only the documented 120px acquisition footer. No screenshot-as-page implementation, invisible hotspots, product masks, resized candidates, forced clicks as FLOW evidence, fixture jumping presented as a flow, course adaptation, deployment, real Apple credentials/payments or copyrighted streaming.
