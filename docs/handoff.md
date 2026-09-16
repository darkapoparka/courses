# Courses — current handoff

Updated 2026-09-16 for the verified signed-out Home typography and guest-player control checkpoint on `J:\courses/main`.

## One checkout, one branch — mandatory

**Only implementation checkout:** `J:\courses`

**Only working branch:** `main`

**Active app:** `J:\courses\apple-music-clone`

The owner explicitly ended the multi-branch/multi-worktree workflow. Do not create, checkout or switch to another branch/worktree for implementation unless the owner later explicitly reverses this rule. Commit coherent verified checkpoints directly to `main` and push normally.

`git worktree list` contains only `J:/courses` on `main`. Port 6431 remains retired. `J:\courses-astra-preview` is not a Git checkout and must never be used as source. Recovery material under `D:\courses-main-transfer\20260913-retire-preview\` is provenance only.

The canonical isolated QA interpreter is `D:\courses-main-qa\audit-venv\Scripts\python.exe`, verified with Python 3.13.15, Playwright 1.62.0 and Chromium 151.0.7922.34. The canonical browser executable is `D:\courses-main-qa\playwright-browsers\chromium-1234\chrome-win64\chrome.exe`.

## Latest verified implementation checkpoint

The verified runtime candidate was captured from a one-file implementation working tree on top of `2de2df92ee920eae5bc048e29c5dc111e2287499`. Signed-out Home keeps the repaired live artwork, edge, glows, seam and warm guest-player material while tightening lawful Windows typography and the real SVG controls. The active runtime change is scoped to `.capture-membership` and `.guest-session[data-scene="home"] .floating-player` in `app/reference-fidelity.css`; no other screen family owns these rules.

The brand is slightly larger, offer copy is less bright, and the CTA uses a measured Windows Arial compensation without changing its real button geometry. Shuffle/repeat ink, previous/play/next sizes and optical shifts, queue geometry and the idle Apple mark now follow the frozen frame more closely. The heading and volume path were deliberately left unchanged because tested variants worsened their supported metrics.

The [dated review](reference-review/2026-09-16-signed-out-home-typography-controls.md) records active selectors, focused sweeps, readable source/render/difference review, exact measurements, real-control coverage and remaining blockers. The preceding [release-edition and legacy-player review](reference-review/2026-09-16-release-editions-legacy-player.md) remains the authoritative historical record for that shared discovery batch.

Optimized build `bQVbWY2TQR3lywm6f6X7P` captured implementation SHA-256 `161fcb71b0eef5640fc4bc8b9fcb1afff4f89ea3910dd983785eeb16eebdab9c` and tooling SHA-256 `93e2d205bc23f100bee6d9dfbcef3f5bb644452e395a2e18f98dd55afb3e4aa8`.

- 159 desktop states, five responsive states, 218 route checks and 65 interaction regressions: zero failures.
- Archive/coverage, typecheck and optimized build passed; five Python QA-tool and nine Node cover-integrity tests also passed.
- All 159 exact-size comparisons completed with zero functional failures. Corpus mean MAE changed `5.309224 → 5.309077`; mean over-20 changed `5.379484% → 5.379391%`.
- Signed-out Home `aefa8502` improved `1.946265 → 1.922833` MAE and `1.500200% → 1.485374%` over-20.
- CTA region MAE improved `16.556522 → 13.661545`; the entire guest-player region improved `2.547905 → 2.401105` MAE and `2.068639% → 1.725444%` over-20.
- The other 158 exact-size states retained zero metric delta; no numerical regression was introduced.
- The focused and registered suites passed Sign In/CTA Escape focus return, shuffle/repeat, volume, queue, play/pause continuity and responsive containment. No MATCH or FLOW box was checked.

Evidence: `D:\courses-main-evidence\signedout-home-player-20260916-202908\verification-summary.json`, `browser\results.json`, `comparison\metrics.json` / `index.html`, and the complete source/render/difference gallery. Readable development review is preserved under `C:\Users\radev\dc-review\aefa8502\`; the optimized render is pixel-identical to that reviewed frame.

The previous release/material corpus remains under `D:\courses-main-evidence\release-final-151-20260916-090731\`; focused release controls under `focus-release-20260916-084928`; sidebar evidence under `sidebar-material-final-20260915-044845`; lyrics/queue continuity under `lyrics-queue-first-entry-final-20260915-024103`; and Alpha material evidence under `alpha-continuation-final-20260915`.

## Servers and storage

Canonical development preview: `http://127.0.0.1:6435/` from `J:\courses\apple-music-clone`. The optimized audit used `http://127.0.0.1:6437/` from build `bQVbWY2TQR3lywm6f6X7P` and was stopped after verification; the canonical development preview was restored on 6435. Port 6431 is retired/stopped. Port 3000 belongs to another project and must not be touched.

Main `.next` and `.parity-evidence` remain D:-backed. Do not delete their backing directories or build simultaneously into a `.next` used by another process. At this checkpoint J: had approximately 0.74 GB free; no cleanup command was run. Keep TEMP/TMP, build scratch and evidence on D: and report further storage pressure instead of deleting user data.

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
