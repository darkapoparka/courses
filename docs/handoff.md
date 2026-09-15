# Courses — current handoff

Updated 2026-09-15 for the verified sidebar-material and signed-out Home repair on `J:\courses/main`.

## One checkout, one branch — mandatory

**Only implementation checkout:** `J:\courses`

**Only working branch:** `main`

**Active app:** `J:\courses\apple-music-clone`

The owner explicitly ended the multi-branch/multi-worktree workflow. Do not create, checkout or switch to another branch/worktree for implementation unless the owner later explicitly reverses this rule. Commit coherent verified checkpoints directly to `main` and push normally.

`git worktree list` contains only `J:/courses` on `main`. Port 6431 remains retired. `J:\courses-astra-preview` is not a Git checkout and must never be used as source. Recovery material under `D:\courses-main-transfer\20260913-retire-preview\` is provenance only.

The canonical isolated QA interpreter is `D:\courses-main-qa\audit-venv\Scripts\python.exe`, verified with Python 3.13.15, Playwright 1.62.0 and Chromium 151. Its external `pyvenv.cfg` was repaired on 2026-09-15 after the base interpreter moved to `C:\Program Files\Python313`; the pre-repair config is preserved beside it.

## Latest verified implementation checkpoint

The verified candidate on top of `0a983829e5bf5fd66a5d75e4fe3d7859ae81661b` repairs the ordinary sidebar material without flattening Alpha/Home artwork underlay or changing the dark concert variant. The active ordinary owner is the base `.music-sidebar` rule in `app/globals.css`; no panel-open selector or carousel-underlay selector was leaking into ordinary states. The generic flat surface and weak shadow were the actual defect.

The same batch restores signed-out Home's compact icon-only sign-in profile control and measured warm translucent player. The control remains real accessible DOM: click opens the existing sign-in dialog, Escape closes it and focus returns. Other guest/acquisition states retain their captured text Sign In button. The [dated review](reference-review/2026-09-15-sidebar-material-repair.md) records source inspection, active ownership, measurements, controls and remaining blockers.

Optimized build `HyW8qwIiJlvPv3dZBxWuv` captured implementation SHA-256 `fd0de3bc6130daecef3f279801b7d3fb209852e290679f3cd7db912a1940ec9d` and tooling SHA-256 `058ca23b03e49b12fabec324c437d74aeed6cfd5778d6d7de31dbdc1c89ea350`.

- 159 desktop states, five responsive states, 218 route checks and 60 interaction regressions: zero failures.
- Archive/coverage, typecheck and optimized build passed; five Python QA-tool and nine Node cover-integrity tests also passed.
- All 159 exact-size comparisons completed with zero functional failures. Forty-five over-20 residuals fell, 15 were numerically identical and 99 moved only by tiny threshold crossings; readable review found no visual regression. The largest positive threshold delta was 0.011689 percentage points, while summed corpus over-20 changed by -2.811052 percentage points and summed MAE by -10.690476.
- Ordinary sidebar whole-frame MAE improved for `e72be564` 5.617697 → 5.328036, `a917d88f` 4.066425 → 3.777962 and `1f9e170c` 6.606871 → 6.314517.
- Signed-out Home `aefa8502` improved 7.223298% → 4.405267% over-20 and 5.325646 → 3.424772 MAE; its footer MAE improved 48.647446 → 5.135247 and its artwork is pixel-identical to source.
- Direct Alpha `54b01eab` improved 7.892134% → 7.881983%; Home underlay `d5173715` improved 5.936308% → 5.914467%; dark concert `dcafd99e` is pixel-identical to the preceding candidate.
- Lyrics and queue real-control close/reopen remain byte-identical while preserving current session state. Their saved endpoints still contain unrelated snapshot changes, so no FLOW acceptance was granted.
- No MATCH or FLOW box was checked.

Evidence: `D:\courses-main-evidence\sidebar-material-final-20260915-044845\browser\results.json`, `comparison\metrics.json` / `index.html`, all journey directories and readable regression composites; focused evidence is preserved under `D:\courses-main-evidence\sidebar-material-repair-focused-20260915-044308\`.

The preceding lyrics/queue continuity evidence remains preserved under `lyrics-queue-first-entry-final-20260915-024103`; Alpha material evidence remains under `alpha-continuation-final-20260915`.

## Servers and storage

Canonical development preview: `http://127.0.0.1:6435/` from `J:\courses\apple-music-clone`. The optimized audit used `http://127.0.0.1:6437/` from build `HyW8qwIiJlvPv3dZBxWuv` and was stopped after verification. Port 6431 is retired/stopped. Port 3000 belongs to another project and must not be touched.

Main `.next` and `.parity-evidence` remain D:-backed. Do not delete their backing directories or build simultaneously into a `.next` used by another process. J: is constrained; keep TEMP/TMP and evidence on D:.

## Honest acceptance status

**UI implemented/renderable: 159 / 159**

**MATCH genuinely signed off: 0 / 159**

**Complete recorded FLOW genuinely signed off: 0 / 58**

Green CI, a rendered fixture, route coverage or a lower residual is not acceptance. Course/community adaptation remains blocked until genuine clone acceptance and explicit owner approval.

## Continue implementation immediately

Do not stop at verification. After preflight on `J:\courses/main`, continue directly into the next substantive 1:1 defect.

Priority unresolved areas:

1. **Shared lawful typography and symbols** — platform evidence still resolves to Arial on Windows. Refine geometry, weight and wrapping without distributing proprietary Apple fonts.
2. **Player and panels** — continue player dimensions, bottom positioning, control/icon contours, glass, lyrics fade/blur and queue row geometry/artwork. Do not re-couple right-panel state to the repaired left sidebar.
3. **Alpha / New finishing (`54b01eab`)** — retain provider artwork and state-specific glass while refining arrows, player geometry, lower releases and the live profile/title difference.
4. **Release / City artwork** — middle City Chart lower artwork and incomplete release covers/metadata remain partial. Never paste captured interface pixels into artwork.
5. **Library editor snapshot transition** — later checkpoints still diverge because the recording changes account/catalog/library snapshot. Model a transition only if frozen evidence supports it.
6. **Signed-out Home (`aefa8502`)** — retain the repaired footer/player; remaining blockers are the marketing-background edge glows, lawful type geometry/raster and player icon treatment.
7. **Lyrics / queue endpoint discontinuity** — preserve the live transition and never invent a hidden catalog/library/queue reset merely to manufacture an endpoint still.

The exact frozen archive under `apple-music-clone/reference/` remains immutable. Use each original's real 1440×903 or 1440×904 application viewport, excluding only the documented 120px acquisition footer. No screenshot-as-page implementation, invisible hotspots, product masks, resized candidates, forced clicks as FLOW evidence, fixture jumping presented as a flow, course adaptation, deployment, real Apple credentials/payments or copyrighted streaming.
