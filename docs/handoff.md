# Courses — current handoff

Updated 2026-09-17 for the verified discovery typography and live-symbol checkpoint on `J:\courses/main`.

## One checkout, one branch — mandatory

**Only implementation checkout:** `J:\courses`

**Only working branch:** `main`

**Active app:** `J:\courses\apple-music-clone`

The owner explicitly ended the multi-branch/multi-worktree workflow. Do not create, checkout or switch to another branch/worktree for implementation unless the owner later explicitly reverses this rule. Commit coherent verified checkpoints directly to `main` and push normally.

`git worktree list` contains only `J:/courses` on `main`. Port 6431 remains retired. `J:\courses-astra-preview` is not a Git checkout and must never be used as source. Recovery material under `D:\courses-main-transfer\20260913-retire-preview\` is provenance only.

The canonical isolated QA interpreter is `D:\courses-main-qa\audit-venv\Scripts\python.exe`, verified with Python 3.13.15, Playwright 1.62.0 and Chromium 151.0.7922.34. The canonical browser executable is `D:\courses-main-qa\playwright-browsers\chromium-1234\chrome-win64\chrome.exe`.

## Latest verified implementation checkpoint

The verified runtime candidate was captured from a coherent shared typography working tree on top of `8d8fa3769a8fd8d6bb866b2311be137f084521a3`. Initial/current/playing New, Viral Chart and named-profile Home retain the repaired artwork editions, state-specific glass and player behavior while tightening lawful Windows text geometry and replacing the viral heading's text star with the existing live SVG glyph.

The active implementation owners are `app/reference-fidelity.css`, `components/music-discovery.tsx` and `components/music-primitives.tsx`. `Section` now supports a real optional glyph and title span; the viral heading remains a real button to the real chart. Scoped English selectors refine the New heading, feature kicker/title/subtitle, viral heading, chart heading and first Home section title without changing signed-out Home or unrelated screen families.

The [dated review](reference-review/2026-09-17-discovery-typography-symbols.md) records the focused sweeps, readable source/render/difference review, exact measurements, ordered real-control evidence and remaining blockers. The preceding [signed-out Home review](reference-review/2026-09-16-signed-out-home-typography-controls.md) and [release-edition review](reference-review/2026-09-16-release-editions-legacy-player.md) remain authoritative for their separate batches.

Optimized build `qX-R8M-kpo89ddKw02fdx` captured implementation SHA-256 `7a1d1b130025bd32bb7e4c2281b15fc4b54942028556462747a492db4ee291c9` and tooling SHA-256 `da997151082fbcde2c2c4e258c00685e34e2545fdb5a0e066a1ce8200d67d1e7`.

- 159 desktop states, five responsive states, 218 route checks and 66 interaction regressions: zero failures.
- Archive/coverage, typecheck and optimized build passed; five Python QA-tool and nine Node cover-integrity tests also passed.
- All 159 exact-size comparisons completed with zero functional failures. Corpus mean MAE changed `5.309077 → 5.263068`; mean over-20 changed `5.379391% → 5.353294%`.
- Viral Chart `8a234785` improved `4.399940 → 3.865631` MAE and `3.885582% → 3.643103%` over-20.
- Initial New `e72be564` improved `4.319364 → 4.113135`; playing New `1f9e170c` improved `4.533112 → 4.282184`; Home `a917d88f` improved `3.877053 → 3.833119` MAE.
- Forty-six states improved in MAE and 105 were byte-identical to the baseline. Eight tiny numerical increases were max-one-channel drift with no pixel changing by more than one and no readable regression.
- The registered `discovery-typography-symbols` journey passed through real New, chart and Home controls with ordered non-overwriting captures. No MATCH or FLOW box was checked.

Evidence: `D:\courses-main-evidence\shared-typography-20260917-013440\verification-summary.json`, `browser\results.json`, `comparison\metrics.json` / `index.html`, `delta-summary.json`, the complete gallery and the worsened-state review. Readable focused review remains under `C:\Users\radev\dc-review\shared-batch-20260916\`.

The previous signed-out Home evidence remains under `D:\courses-main-evidence\signedout-home-player-20260916-202908\`; release/material evidence under `release-final-151-20260916-090731`; lyrics/queue continuity under `lyrics-queue-first-entry-final-20260915-024103`; and Alpha material evidence under `alpha-continuation-final-20260915`.

## Servers and storage

Canonical development preview: `http://127.0.0.1:6435/` from `J:\courses\apple-music-clone`. The optimized audit used `http://127.0.0.1:6437/` from build `qX-R8M-kpo89ddKw02fdx` and was stopped after verification; the canonical development preview was restored on 6435. Port 6431 is retired/stopped. Port 3000 belongs to another project and must not be touched.

Main `.next` and `.parity-evidence` remain D:-backed. Do not delete their backing directories or build simultaneously into a `.next` used by another process. At this checkpoint J: had approximately 39.81 GB free and D: had approximately 9.40 GB free; no cleanup command was run by this agent. Keep TEMP/TMP, build scratch and evidence on D: and report further storage pressure instead of deleting user data.

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
