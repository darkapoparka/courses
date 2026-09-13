# Courses — current handoff

Updated 2026-09-13 for the verified subscription-journey and native-thumbnail checkpoint on `J:\courses/main`.

## One checkout, one branch — mandatory

**Only implementation checkout:** `J:\courses`

**Only working branch:** `main`

**Active app:** `J:\courses\apple-music-clone`

The owner explicitly ended the multi-branch/multi-worktree workflow. Do not create, checkout, or switch to another branch/worktree for implementation unless the owner later explicitly reverses this rule. Commit coherent verified checkpoints directly to `main` and push normally.

`git worktree list` now contains only `J:/courses` on `main`. The former local branch `codex/preview-preserved-20260912` was deleted after verifying it had **0 commits unique versus main**. Port 6431 was stopped. `J:\courses-astra-preview` is no longer a Git worktree and has no `.git` metadata; a `RETIRED_DO_NOT_USE.txt` marker remains because Windows could not remove the residual physical directory. Never use it as source.

Recovery backup of the former dirty preview state: `D:\courses-main-transfer\20260913-retire-preview\`. The canonical isolated QA interpreter is now `D:\courses-main-qa\audit-venv\Scripts\python.exe`, verified with Playwright 1.62.0 / Chromium 151.

## Latest verified implementation checkpoint

The candidate on top of `1a5c1f9` corrects native Viral Hits thumbnail crops, removes the captured Shabang hover icon from artwork, refines subscription typography/spacing/dialogs, and retains the prior subscription details beneath the cancellation-success acknowledgement. The complete five-step cancellation journey and real artwork controls are registered regressions. The [dated review](reference-review/2026-09-13-subscription-artwork.md) records exact originals, inspection, preserved failures and remaining differences.

Optimized build `myRmhF4WQ4YTIyxskWpDs` captured implementation SHA-256 `29e1f569606a7b875dc855681a9de6ac19e781906712de387cdef14088cd9c5b` and tooling SHA-256 `f92d576d56e6465e8d4a4e5bd0dedb078cd81a7f949dac02309837e1e9a8264c`; both stayed stable throughout the run.

- 159 desktop states, five responsive states, 218 route checks and 59 interaction regressions: zero failures.
- Four additional optimized mobile dialog captures at 360×800 / 390×844 passed.
- Typecheck and optimized build passed; archive/coverage, five Python QA-tool and nine Node cover-integrity tests also passed during the session.
- All 159 comparisons completed: 30 lower over-20 residuals, 126 unchanged, three increases of at most 0.00431 percentage points beneath the queue. The dated review records these and the mixed MAE results.
- The five cancellation steps were traversed through real controls. Three equal their direct fixtures; the two dialogs retain a 0.08544% live/direct difference in sidebar playlist rows. No MATCH/FLOW acceptance was granted.

Evidence: `D:\courses-main-evidence\finalization-20260913\production-verified\results.json`, `comparison-verified\metrics.json` / `index.html`, `journey-comparison-verified\metrics.json`, and `mobile-subscription-verified\results.json`. Earlier sidebar and transport trials were rejected and preserved. `production` and `production-final` are superseded, not the final source. The preceding `dbfe7fe` navigation checkpoint remains the compatible comparison baseline under `main-navigation-20260913/production-full-20260913-022654/comparison-retry`.

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

1. **Alpha / New carousel (`54b01eab`)** — wrong/partial preceding artwork, sidebar colour distribution, glass/arrow/material differences, typography/icon geometry, and live New→Alpha session divergence. Open the saved original at full size before changing code; do not compensate for wrong artwork with gradients.
2. **Lyrics / queue first-entry flows** — direct fixtures are much closer than the continuous transitions `1f9e170c → ee8db412` and `1f9e170c → 8f029018`. Investigate the recorded scenario transition rather than silently swapping catalogs/profile/session data.
3. **Library editor snapshot transition** — later checkpoints still diverge substantially because the recording changes account/catalog/library snapshot. Model a transition only if frozen evidence supports it.
4. **Release / City / continuation artwork** — middle City Chart lower artwork, incomplete release covers/metadata, and right-edge continuation cards remain partial. Never paste captured player/interface pixels into artwork.
5. **Typography / icons / player / panels** — platform-font evidence still reports Arial for sampled Windows Chromium controls. Match geometry lawfully; do not copy proprietary Apple fonts. Continue player glass/control geometry, lyrics fade/blur, queue glass, sidebar material, dialogs, menus, hover and focus states through real controls.

The exact frozen archive under `apple-music-clone/reference/` remains immutable. Use each original's real 1440×903 or 1440×904 application viewport, excluding only the documented 120px acquisition footer. No screenshot-as-page implementation, invisible hotspots, product masks, resized candidates, forced clicks as FLOW evidence, fixture jumping presented as a flow, course adaptation, deployment, real Apple credentials/payments, or copyrighted streaming.
