# Courses — current handoff

Updated 2026-09-18 for the verified initial New/shared discovery progress batch on `J:\courses/main`.

## One checkout, one branch — mandatory

**Only implementation checkout:** `J:\courses`

**Only working branch:** `main`

**Active app:** `J:\courses\apple-music-clone`

The owner explicitly ended the multi-branch/multi-worktree workflow. Do not create, checkout or switch to another branch/worktree for implementation unless the owner later explicitly reverses this rule. Commit coherent verified checkpoints directly to `main` and push normally.

`git worktree list` contains only `J:/courses` on `main`. `J:\courses-astra-preview` is not a Git checkout and must never be used as source. Recovery material under `D:\courses-main-transfer\20260913-retire-preview\` is provenance only.

The canonical isolated QA interpreter is `D:\courses-main-qa\audit-venv\Scripts\python.exe`, verified with Python 3.13.15, Playwright 1.62.0 and Chromium 151.0.7922.34. The canonical browser executable is `D:\courses-main-qa\playwright-browsers\chromium-1234\chrome-win64\chrome.exe`.

## Latest verified implementation checkpoint

The fresh exact candidate was captured from the coherent initial New/shared discovery working tree on top of `bf5736dd7fd63f74a37fadc2ca6e1cbd5cf7a9ef`. It preserves the 22 accepted screens and three accepted journeys while replacing source-conditioned continuation patches with live DOM, state and controls.

The owning implementation is `lib/music-catalog.ts`, `lib/music-scenes.ts`, `components/music-discovery.tsx`, `components/music-browse.tsx`, `components/music-rail.tsx`, `app/reference-fidelity.css` and `app/player-fidelity.css`. Registered evidence is strengthened in the New, discovery, Home and panel browser suites. The [dated New progress review](reference-review/2026-09-18-new-initial-family-progress.md) records exact source/render/difference review, real-control evidence, hashes, full-corpus review and blockers.

Optimized build `Na9JfUh5E21aht9bWlMt1` captured implementation SHA-256 `47bfad7f3c2cc3d51daf783c5b8d30c33d47c4bd932f134bd90c76df6f8a7a98` and tooling SHA-256 `9955dc8c2eb2e022a27084609b88ad25c1a51c8669f871449e4fceddf0a92060`.

- 159 desktop states, five responsive states, 218 route checks and 71 interaction regressions: zero failures.
- Archive/coverage, typecheck, optimized build, five Python QA-tool tests and nine Node cover-integrity tests passed.
- All 159 exact-size comparisons completed. Corpus mean MAE improved `5.240636608 â†’ 5.190585576`; mean over-20 improved `5.323660568% â†’ 5.277333751%`.
- All 159 fresh render hashes differ from the preceding optimized capture; 108 states have lower MAE and 51 higher, while 109 have lower over-20 and 50 higher. The complete positive union and the eight threshold-positive states were reviewed readably without a concrete batch-owned geometry, copy, state, session or control regression.
- Initial New `e72be564` improved `4.113135 â†’ 3.411616` MAE and `4.724529% â†’ 3.943645%` over-20.
- No MATCH or FLOW checkbox advanced. `FLOW-6c5d545e` and other journeys beginning at initial New remain open because `e72be564` is not MATCH-complete.

Evidence: `D:\courses-main-evidence\new-family-optimized-full-20260918-1610\` and focused roots recorded in the dated review.

## Servers and storage

Canonical development preview: `http://127.0.0.1:6435/` from `J:\courses\apple-music-clone`. Final verification found listener PID `37828` with project-only Node/Next/npm/PowerShell ancestry, HTTP 200 and `[data-reference-ready="true"]`; the canonical preview remains running.

The optimized audit ran the exact fresh build on port 6437. Its complete project-only ancestry was inspected before the exact listener was stopped; port 6437 is now free. Current port observations: 6431 `free`, 3000 `free`. No unrelated listener was terminated.

Main `.next` and `.parity-evidence` remain D:-backed. No cleanup command was run. At this checkpoint J: has approximately 32.75 GB free and D: has approximately 2.46 GB free; report storage pressure instead of deleting user data.

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
