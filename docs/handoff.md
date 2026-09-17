# Courses — current handoff

Updated 2026-09-17 for the verified All Playlists screen match on `J:\courses/main`.

## One checkout, one branch — mandatory

**Only implementation checkout:** `J:\courses`

**Only working branch:** `main`

**Active app:** `J:\courses\apple-music-clone`

The owner explicitly ended the multi-branch/multi-worktree workflow. Do not create, checkout or switch to another branch/worktree for implementation unless the owner later explicitly reverses this rule. Commit coherent verified checkpoints directly to `main` and push normally.

`git worktree list` contains only `J:/courses` on `main`. Port 6431 remains retired. `J:\courses-astra-preview` is not a Git checkout and must never be used as source. Recovery material under `D:\courses-main-transfer\20260913-retire-preview\` is provenance only.

The canonical isolated QA interpreter is `D:\courses-main-qa\audit-venv\Scripts\python.exe`, verified with Python 3.13.15, Playwright 1.62.0 and Chromium 151.0.7922.34. The canonical browser executable is `D:\courses-main-qa\playwright-browsers\chromium-1234\chrome-win64\chrome.exe`.

## Latest verified implementation checkpoint

The verified runtime candidate was captured from a coherent All Playlists working tree on top of `b08f480d781dca2cf4ab07effb13fafbfba69f3f`. It preserves the Viral Chart repair while finishing the lowest-residual All Playlists screen.

The implementation owners are `components/music-library.tsx`, `components/music-browse.tsx` and the scoped `.library-playlists .card-favourite-star` rule in `app/reference-fidelity.css`. The playlists page no longer exposes the source-absent sort control, and the live Favourite Songs title now includes the source-supported red star. `scripts/browser_library_flows.py` asserts the exact marker box and no-sort state, then exercises both cards, hover overlay, browser Back and idle-player continuity without state injection or force clicks.

The [dated All Playlists review](reference-review/2026-09-17-all-playlists-match.md) records complete source/render/difference review, exact geometry, real-control evidence, hashes, optimized corpus and the acceptance decision. The preceding [Viral Chart review](reference-review/2026-09-17-viral-chart-rows-controls.md), [discovery typography review](reference-review/2026-09-17-discovery-typography-symbols.md), [signed-out Home review](reference-review/2026-09-16-signed-out-home-typography-controls.md) and [release-edition review](reference-review/2026-09-16-release-editions-legacy-player.md) remain authoritative for their separate batches.

Optimized build `dFlvWryUZwJWmsR7eTkrO` captured implementation SHA-256 `e8da27db78b49e403934367588beb0718596344e68de25c47dd16c09c659c6e6` and tooling SHA-256 `3901dacf36807efbb46d9328f73c35efa1115b64c17ab66056138001ecdcfe36`.

- 159 desktop states, five responsive states, 218 route checks and 66 interaction regressions: zero failures.
- Archive/coverage, typecheck and optimized build passed; five Python QA-tool and nine Node cover-integrity tests also passed.
- All 159 exact-size comparisons completed. Corpus mean MAE changed `5.262063176 → 5.262080975`; mean over-20 improved `5.353007481% → 5.352900105%`.
- All Playlists `8a2a4241` improved `1.589619478 → 1.554882388` MAE and `1.174710840% → 1.138719700%` over-20.
- 148 states were byte-identical and eleven render hashes changed. All eight states with a positive delta in either metric were reviewed source/baseline/current/candidate-change; seven were image-decoder variation and `e757eb0f` gained the same source-supported Favourite Songs star.
- `MATCH-8a2a4241` is genuinely checked after full-frame/card/sidebar/player review and real-control verification. `FLOW-b49a8505` stays open because its initial `e72be564` New state is not MATCH-complete.

Evidence: `D:\courses-main-evidence\all-playlists-full-20260917-204127\verification-summary.json`, `browser\results.json`, `comparison\metrics.json` / `index.html`, `delta-summary.json`, the complete gallery and `worsened-review\`. Focused real-control evidence is under `all-playlists-controls-20260917-203652`.

The previous shared typography evidence remains under `D:\courses-main-evidence\shared-typography-20260917-013440\`; signed-out Home evidence under `signedout-home-player-20260916-202908`; release/material evidence under `release-final-151-20260916-090731`; lyrics/queue continuity under `lyrics-queue-first-entry-final-20260915-024103`; and Alpha material evidence under `alpha-continuation-final-20260915`.

## Servers and storage

Canonical development preview: `http://127.0.0.1:6435/` from `J:\courses\apple-music-clone`. Listener PID `34596` is the verified Next child of PID `27224`, launched by project shell PID `12412`; HTTP 200, `[data-reference-ready="true"]`, scene hydration and absence of an error overlay were verified. The optimized audit used `http://127.0.0.1:6437/` from build `dFlvWryUZwJWmsR7eTkrO` and was stopped after verification. Port 6431 is retired/stopped. Port 3000 remains untouched.

Main `.next` and `.parity-evidence` remain D:-backed. Do not delete their backing directories or build simultaneously into a `.next` used by another process. At this checkpoint J: has approximately 35.76 GB free and D: has approximately 8.10 GB free; no cleanup command was run. Keep TEMP/TMP, build scratch and evidence on D: and report further storage pressure instead of deleting user data.

## Honest acceptance status

**UI implemented/renderable: 159 / 159**

**MATCH genuinely signed off: 1 / 159**

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
