# Courses — current handoff

Updated 2026-09-13 after `dbfe7fe9a015dd2525d65da9107c068100ff7e72` — `fix(reference): preserve New artwork through live navigation` — and retirement of the duplicate preview worktree.

## One checkout, one branch — mandatory

**Only implementation checkout:** `J:\courses`

**Only working branch:** `main`

**Active app:** `J:\courses\apple-music-clone`

The owner explicitly ended the multi-branch/multi-worktree workflow. Do not create, checkout, or switch to another branch/worktree for implementation unless the owner later explicitly reverses this rule. Commit coherent verified checkpoints directly to `main` and push normally.

`git worktree list` now contains only `J:/courses` on `main`. The former local branch `codex/preview-preserved-20260912` was deleted after verifying it had **0 commits unique versus main**. Port 6431 was stopped. `J:\courses-astra-preview` is no longer a Git worktree and has no `.git` metadata; a `RETIRED_DO_NOT_USE.txt` marker remains because Windows could not remove the residual physical directory. Never use it as source.

Recovery backup of the former dirty preview state: `D:\courses-main-transfer\20260913-retire-preview\`. The canonical isolated QA interpreter is now `D:\courses-main-qa\audit-venv\Scripts\python.exe`, verified with Playwright 1.62.0 / Chromium 151.

## Latest verified implementation checkpoint

`dbfe7fe` fixes ordinary real-control navigation so `Radio → New` and `Concerts → New` retain the current New release-artwork edition instead of falling back to unrelated generic covers. The regression suite now exercises both transitions through actual sidebar controls.

The exact implementation/tooling content later committed at `dbfe7fe` was captured in fresh optimized production with build ID `oHtHpB5wwKrNHt_n6-S2j`. The capture recorded implementation SHA-256 `e106e5549567d186040b1a359400158bb1c8160024c3026ca121d9c3edc5846d` and tooling SHA-256 `b74ceb4cdd3bd89e4e01c895237ecce2843a3e6f5a0a51464f8967eb31e899fa`; both stayed stable through the run.
Fresh optimized browser verification against that source:

- 159 desktop states
- 5 responsive states
- 218 recorded route checks
- 57 interaction regressions
- 0 failures
- archive integrity passed: 58 flows / 218 steps / 159 identities / 318 image variants
- typecheck and optimized build passed
- 5 Python QA-tool tests passed
- 9 Node cover-integrity tests passed

Fresh all-159 exact-size comparison against the preceding compatible pushed baseline: **7 lower over-20 residuals, 152 unchanged, 0 higher**. The seven improved states are `11803c64`, `c98f8b54`, `1f9e170c`, `9fbb38e1`, `afd02fa6`, `d83e96ba`, and `ad689c37`, each improving by roughly 0.766–0.773 percentage points. `bbb92581` kept the same over-20 percentage with a negligible MAE decrease. No MATCH or FLOW acceptance was granted from these diagnostics.

Evidence root: `D:\courses-main-evidence\main-navigation-20260913\production-full-20260913-022654\`. Browser output is under `browser\`; the successful comparison retry is `comparison-retry\metrics.json` and `comparison-retry\index.html`. The first comparison process hung before creating output and was terminated; its retry completed normally in about 37 seconds.

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
