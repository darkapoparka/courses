# Courses — current handoff

Updated 2026-09-15 for the verified signed-out Home and ordinary-player geometry checkpoint on `J:\courses/main`.

## One checkout, one branch — mandatory

**Only implementation checkout:** `J:\courses`

**Only working branch:** `main`

**Active app:** `J:\courses\apple-music-clone`

The owner explicitly ended the multi-branch/multi-worktree workflow. Do not create, checkout or switch to another branch/worktree for implementation unless the owner later explicitly reverses this rule. Commit coherent verified checkpoints directly to `main` and push normally.

`git worktree list` contains only `J:/courses` on `main`. Port 6431 remains retired. `J:\courses-astra-preview` is not a Git checkout and must never be used as source. Recovery material under `D:\courses-main-transfer\20260913-retire-preview\` is provenance only.

The canonical isolated QA interpreter is `D:\courses-main-qa\audit-venv\Scripts\python.exe`, verified with Python 3.13.15, Playwright 1.62.0 and Chromium 151. Its external `pyvenv.cfg` was repaired on 2026-09-15 after the base interpreter moved to `C:\Program Files\Python313`; the pre-repair config is preserved beside it.

## Latest verified implementation checkpoint

The verified candidate was captured on top of `c6cf45f8bd9d3db3cc2647f70d459d7faee19fce`. Signed-out Home now owns its live one-pixel edge, marketing glows, tonal falloff, bottom seam, text/CTA anchors and guest-only player symbols. The exact 450px artwork region remains real source artwork and effectively pixel-identical.

Ordinary member players now use the measured lighter sampled glass and optically aligned transport/utility SVGs. Every new geometry rule is scoped beneath `.floating-player`; an earlier full-corpus run exposed leakage into expanded controls and standalone radio volume, so that candidate was rejected and the selectors were narrowed. Guest, Alpha and open lyrics/queue panels retain separate material owners. Home receives its measured heading offset; the equivalent New heading change was tested and rejected.

The [dated review](reference-review/2026-09-15-guest-home-player-geometry.md) records active selectors, exact measurements, rejected counter-evidence, readable regression review and remaining blockers.

Optimized build `EJ_Dgxkz3BiPF7mKme9XK` captured implementation SHA-256 `f64c6c9ce6e4281c682fd396c36f65c76bb4a0d2f3970b4a70cd8b772d7458fe` and tooling SHA-256 `764d3ccf005256967f96617c4646668c1e026a02ab3d0c11723a18afcf75f99b`.

- 159 desktop states, five responsive states, 218 route checks and 62 interaction regressions: zero failures.
- Archive/coverage, typecheck and optimized build passed; five Python QA-tool and nine Node cover-integrity tests also passed.
- All 159 exact-size comparisons completed with zero functional failures. Mean corpus MAE changed by -0.063303 and mean over-20 residual by -0.068603 percentage points.
- Signed-out Home `aefa8502` improved 3.424772 → 1.932716 MAE and 4.405267% → 1.502120% over-20; the source artwork remains effectively pixel-identical.
- New idle `e72be564` improved 5.328036 → 5.213605 MAE and 6.563077% → 6.426572% over-20.
- Home idle `a917d88f` improved 3.777962 → 3.757432 MAE and 3.927802% → 3.900963% over-20.
- New playing `1f9e170c` improved 6.314517 → 6.257022 MAE and 7.126784% → 6.849929% over-20.
- Every one of the eight remaining positive metric deltas was reviewed in source/baseline/current/difference sheets; no expanded-control or radio selector leak remains.
- Lyrics and queue real-control close/reopen remain deterministic and preserve current session state. No MATCH or FLOW box was checked.

Evidence: `D:\courses-main-evidence\guest-player-scoped-final-20260915-065524\verification-summary.json`, `browser\results.json`, `comparison\metrics.json` / `index.html`, all journey directories and worsened-state contact sheets. Focused evidence is preserved under `signed-out-home-focus-20260915` and `shared-player-focus-20260915`.

The preceding sidebar evidence remains preserved under `sidebar-material-final-20260915-044845`; lyrics/queue continuity under `lyrics-queue-first-entry-final-20260915-024103`; Alpha material evidence under `alpha-continuation-final-20260915`.

## Servers and storage

Canonical development preview: `http://127.0.0.1:6435/` from `J:\courses\apple-music-clone`. The optimized audit used `http://127.0.0.1:6437/` from build `EJ_Dgxkz3BiPF7mKme9XK` and was stopped after verification. Port 6431 is retired/stopped. Port 3000 belongs to another project and must not be touched.

Main `.next` and `.parity-evidence` remain D:-backed. Do not delete their backing directories or build simultaneously into a `.next` used by another process. J: is constrained; keep TEMP/TMP and evidence on D:.

## Honest acceptance status

**UI implemented/renderable: 159 / 159**

**MATCH genuinely signed off: 0 / 159**

**Complete recorded FLOW genuinely signed off: 0 / 58**

Green CI, a rendered fixture, route coverage or a lower residual is not acceptance. Course/community adaptation remains blocked until genuine clone acceptance and explicit owner approval.

## Continue implementation immediately

Do not stop at verification. After preflight on `J:\courses/main`, continue directly into the next substantive 1:1 defect.

Priority unresolved areas:

1. **Lower release artwork and metadata** — exact release editions beneath New/Home change both shelves and the real colour sampled through player glass. Repair owning cards rather than adding a compensating player tint.
2. **Lawful typography and symbols** — Windows platform evidence resolves to Arial-family rendering. Refine geometry, weight, wrapping and contours without distributing proprietary Apple fonts.
3. **Lyrics and queue** — retain deterministic live entry while refining lyric fade/blur/scroll and queue row artwork, spacing, separators and durations. Never reset unrelated catalog/library/queue state to imitate endpoint stills.
4. **Alpha / New finishing (`54b01eab`)** — retain provider artwork and state-specific glass while refining arrows, lower releases and the live profile/title difference.
5. **Release / City artwork** — middle City Chart art and incomplete release covers/metadata remain partial. Never paste captured interface pixels into artwork.
6. **Library editor snapshot transition** — model the later account/catalog/library change only if frozen evidence supports a real transition.
7. **Signed-out Home (`aefa8502`)** — retain the repaired live glows/player; remaining blockers are lawful text/button antialiasing and small idle-symbol contour differences.

The exact frozen archive under `apple-music-clone/reference/` remains immutable. Use each original's real 1440×903 or 1440×904 application viewport, excluding only the documented 120px acquisition footer. No screenshot-as-page implementation, invisible hotspots, product masks, resized candidates, forced clicks as FLOW evidence, fixture jumping presented as a flow, course adaptation, deployment, real Apple credentials/payments or copyrighted streaming.
