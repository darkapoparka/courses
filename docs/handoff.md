# Courses — current handoff

Updated 2026-09-15 for the verified Alpha material and continuation checkpoint on `J:\courses/main`.

## One checkout, one branch — mandatory

**Only implementation checkout:** `J:\courses`

**Only working branch:** `main`

**Active app:** `J:\courses\apple-music-clone`

The owner explicitly ended the multi-branch/multi-worktree workflow. Do not create, checkout, or switch to another branch/worktree for implementation unless the owner later explicitly reverses this rule. Commit coherent verified checkpoints directly to `main` and push normally.

`git worktree list` contains only `J:/courses` on `main`. Port 6431 remains retired. `J:\courses-astra-preview` is not a Git checkout and must never be used as source. Recovery material under `D:\courses-main-transfer\20260913-retire-preview\` is provenance only.

The canonical isolated QA interpreter is `D:\courses-main-qa\audit-venv\Scripts\python.exe`, verified with Python 3.13.15, Playwright 1.62.0 and Chromium 151. Its external `pyvenv.cfg` was repaired on 2026-09-15 after the base interpreter moved to `C:\Program Files\Python313`; the pre-repair config is preserved beside it.

## Latest verified implementation checkpoint

The verified candidate on top of `a85d2e7` removes Alpha's compensating sidebar gradient, renders reviewed Viral Hits provider artwork beneath real glass, and adds the frozen New Music Daily continuation to the shared direct/live carousel. The real Previous and Next controls remain interactive DOM; artwork-only boundary fragments exclude captured arrow pixels and disappear after navigating away from Alpha. The [dated review](reference-review/2026-09-15-alpha-material-continuation.md) records exact source inspection, measurements, regression coverage and remaining differences.

Optimized build `72IFGgnLim_ncJsIqrg3X` captured implementation SHA-256 `120e15661676c04d7728e0b3f874df987f2914092dd16d9e2e32a07138eb3b7b` and tooling SHA-256 `b5343da4b1cd568edaae4adafb4def6e7aab22c8979e9b1ab020c3669df54e30`.

- 159 desktop states, five responsive states, 218 route checks and 59 interaction regressions: zero failures.
- Archive/coverage, typecheck and optimized build passed; five Python QA-tool and nine Node cover-integrity tests also passed.
- All 159 comparisons completed: one lower over-20 residual, 158 unchanged and zero higher.
- Direct `54b01eab` improved 9.066461% → 7.892134% over-20 and MAE 6.454005 → 5.835315.
- The continuous New→Alpha checkpoint improved 9.915329% → 8.741156% against the original. Its direct/live over-20 gap remains 0.977375%, preserving the known session snapshot difference.
- No MATCH/FLOW acceptance was granted.

Evidence: `D:\courses-main-evidence\alpha-continuation-final-20260915\browser\results.json`, `comparison\metrics.json` / `index.html`, `browser\journeys\new-carousel-sidebar\`, and `candidate-summary.json`. The preceding Alpha-edge evidence remains preserved under `alpha-edge-final-20260914`.

## Servers and storage

Canonical development preview: `http://127.0.0.1:6435/` from `J:\courses\apple-music-clone`. The optimized audit used `http://127.0.0.1:6437/` from build `72IFGgnLim_ncJsIqrg3X`; positively identify freshness before ever reusing or stopping a listener. Port 6431 is retired/stopped. Port 3000 belongs to another project and must not be touched.

Main `.next` and `.parity-evidence` remain D:-backed. Do not delete their backing directories or build simultaneously into a `.next` used by another process. J: is constrained; keep TEMP/TMP and evidence on D:.

## Honest acceptance status

**UI implemented/renderable: 159 / 159**

**MATCH genuinely signed off: 0 / 159**

**Complete recorded FLOW genuinely signed off: 0 / 58**

Green CI, a rendered fixture, route coverage, or a lower residual is not acceptance. Course/community adaptation remains blocked until genuine clone acceptance and explicit owner approval.

## Continue implementation immediately

Do not stop at verification. After preflight on `J:\courses/main`, continue directly into the next substantive 1:1 defect.

Priority unresolved areas:

1. **Lyrics / queue first-entry flows** — direct fixtures are materially closer than the continuous transitions `1f9e170c → ee8db412` and `1f9e170c → 8f029018`. Investigate the recorded scenario transition rather than silently swapping catalog/profile/session data.
2. **Alpha / New finishing (`54b01eab`)** — provider material and right-edge continuation are repaired, but lawful typography/icon geometry, exact glass/arrow material, lower releases/player geometry and live profile/title differences remain. Review all five New checkpoints before any sign-off.
3. **Library editor snapshot transition** — later checkpoints still diverge because the recording changes account/catalog/library snapshot. Model a transition only if frozen evidence supports it.
4. **Release / City artwork** — middle City Chart lower artwork and incomplete release covers/metadata remain partial. Never paste captured player/interface pixels into artwork.
5. **Shared surfaces** — continue player glass/control geometry, lyrics fade/blur, queue glass, dialogs, menus, hover and keyboard-focus states through real controls.

The exact frozen archive under `apple-music-clone/reference/` remains immutable. Use each original's real 1440×903 or 1440×904 application viewport, excluding only the documented 120px acquisition footer. No screenshot-as-page implementation, invisible hotspots, product masks, resized candidates, forced clicks as FLOW evidence, fixture jumping presented as a flow, course adaptation, deployment, real Apple credentials/payments, or copyrighted streaming.
