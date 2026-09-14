# Courses — current handoff

Updated 2026-09-14 for the verified Alpha-predecessor and continuous-carousel checkpoint on `J:\courses/main`.

## One checkout, one branch — mandatory

**Only implementation checkout:** `J:\courses`

**Only working branch:** `main`

**Active app:** `J:\courses\apple-music-clone`

The owner explicitly ended the multi-branch/multi-worktree workflow. Do not create, checkout, or switch to another branch/worktree for implementation unless the owner later explicitly reverses this rule. Commit coherent verified checkpoints directly to `main` and push normally.

`git worktree list` now contains only `J:/courses` on `main`. The former local branch `codex/preview-preserved-20260912` was deleted after verifying it had **0 commits unique versus main**. Port 6431 was stopped. `J:\courses-astra-preview` is no longer a Git worktree and has no `.git` metadata; a `RETIRED_DO_NOT_USE.txt` marker remains because Windows could not remove the residual physical directory. Never use it as source.

Recovery backup of the former dirty preview state: `D:\courses-main-transfer\20260913-retire-preview\`. The canonical isolated QA interpreter is now `D:\courses-main-qa\audit-venv\Scripts\python.exe`, verified with Playwright 1.62.0 / Chromium 151.

## Latest verified implementation checkpoint

The verified candidate on top of `5c59b76` removes the direct-fixture-only feature substitution and reconstructs the narrow Viral Hits predecessor boundary using artwork-only regions tied to the actual Alpha carousel position. Direct Alpha and the real New→Alpha journey now use one feature sequence; the real Previous button remains interactive DOM. The [dated review](reference-review/2026-09-14-alpha-edge.md) records exact source inspection, measurements, regression coverage and remaining differences.

Optimized build `sUGR98CAgGW6z2Q02Hqdw` captured implementation SHA-256 `e732b776de08a9dd293e7a0778eff6a8863b00bf337f451b36a634aed1fb2dcf` and tooling SHA-256 `20e7f0c1eff2831f5df7347701e83acffb21ebecdaf91a78c8985d7f9db588eb`; both stayed stable throughout the run.

- 159 desktop states, five responsive states, 218 route checks and 59 interaction regressions: zero failures.
- Typecheck and optimized build passed; archive/coverage, five Python QA-tool and nine Node cover-integrity tests also passed.
- All 159 comparisons completed: one lower over-20 residual, 158 unchanged and zero higher. Direct `54b01eab` improved 9.430371% → 9.066461% over-20 and MAE 6.739608 → 6.454005.
- The continuous New→Alpha checkpoint improved 10.474037% → 9.915329% against the original. Its direct/live gap fell 1.880460% → 0.977375% over-20 without resetting the session.
- No MATCH/FLOW acceptance was granted.

Evidence: `D:\courses-main-evidence\alpha-edge-final-20260914\browser\results.json`, `comparison\metrics.json` / `index.html`, `browser\journeys\new-carousel-sidebar\`, and `alpha-metrics.json`. The subscription/artwork checkpoint remains preserved under `finalization-20260913` as the preceding baseline.

## Servers and storage

Canonical development preview: `http://127.0.0.1:6435/` from `J:\courses`. The fresh optimized audit used `http://127.0.0.1:6437/`; positively identify freshness before reuse. Port 6431 is retired/stopped. Port 3000 belongs to another project and must not be touched.

Main `.next` and `.parity-evidence` remain D:-backed. Do not delete their backing directories or rebuild simultaneously into a `.next` used by another process. J: is space-constrained; prefer process-local D: TEMP/TMP/cache locations.

## Honest acceptance status

**UI implemented/renderable: 159 / 159**

**MATCH genuinely signed off: 0 / 159**

**Complete recorded FLOW genuinely signed off: 0 / 58**

Green CI, a rendered fixture, route coverage, or a lower pixel residual is not acceptance. Course/community adaptation remains blocked until genuine clone acceptance and explicit owner approval.

## Continue implementation immediately

Do not stop at verification. After preflight on `J:\courses/main`, continue directly into the next substantive 1:1 defect.

Priority unresolved areas:

1. **Alpha / New carousel (`54b01eab`)** — the predecessor edge and direct/live sequence are repaired, but sidebar colour distribution, glass/arrow material, typography/icon geometry, right-edge continuation and live profile/title differences remain. Review the complete five-step New journey before any sign-off.
2. **Lyrics / queue first-entry flows** — direct fixtures are much closer than the continuous transitions `1f9e170c → ee8db412` and `1f9e170c → 8f029018`. Investigate the recorded scenario transition rather than silently swapping catalogs/profile/session data.
3. **Library editor snapshot transition** — later checkpoints still diverge substantially because the recording changes account/catalog/library snapshot. Model a transition only if frozen evidence supports it.
4. **Release / City / continuation artwork** — middle City Chart lower artwork, incomplete release covers/metadata, and right-edge continuation cards remain partial. Never paste captured player/interface pixels into artwork.
5. **Typography / icons / player / panels** — platform-font evidence still reports Arial for sampled Windows Chromium controls. Match geometry lawfully; do not copy proprietary Apple fonts. Continue player glass/control geometry, lyrics fade/blur, queue glass, sidebar material, dialogs, menus, hover and focus states through real controls.

The exact frozen archive under `apple-music-clone/reference/` remains immutable. Use each original's real 1440×903 or 1440×904 application viewport, excluding only the documented 120px acquisition footer. No screenshot-as-page implementation, invisible hotspots, product masks, resized candidates, forced clicks as FLOW evidence, fixture jumping presented as a flow, course adaptation, deployment, real Apple credentials/payments, or copyrighted streaming.
