# Courses — current handoff

Updated 2026-09-15 for the verified lyrics/queue first-entry material and continuity checkpoint on `J:\courses/main`.

## One checkout, one branch — mandatory

**Only implementation checkout:** `J:\courses`

**Only working branch:** `main`

**Active app:** `J:\courses\apple-music-clone`

The owner explicitly ended the multi-branch/multi-worktree workflow. Do not create, checkout, or switch to another branch/worktree for implementation unless the owner later explicitly reverses this rule. Commit coherent verified checkpoints directly to `main` and push normally.

`git worktree list` contains only `J:/courses` on `main`. Port 6431 remains retired. `J:\courses-astra-preview` is not a Git checkout and must never be used as source. Recovery material under `D:\courses-main-transfer\20260913-retire-preview\` is provenance only.

The canonical isolated QA interpreter is `D:\courses-main-qa\audit-venv\Scripts\python.exe`, verified with Python 3.13.15, Playwright 1.62.0 and Chromium 151. Its external `pyvenv.cfg` was repaired on 2026-09-15 after the base interpreter moved to `C:\Program Files\Python313`; the pre-repair config is preserved beside it.

## Latest verified implementation checkpoint

The verified candidate on top of `c60b812` repairs the real-control first entry from `1f9e170c` into lyrics and Up Next without replacing the current catalog, profile, library, artwork, active track or queue merely to imitate unrelated endpoint stills. Floating-player glass now follows any open panel, lyric glass follows the live lyrics panel, and the panel lyric anchor is consistently 191px. The [dated review](reference-review/2026-09-15-lyrics-queue-first-entry.md) records exact source inspection, state ownership, focused controls, measurements and remaining discontinuities.

Optimized build `_Rj431BT_BSpEza9MFldD` captured implementation SHA-256 `4a1df61e1a54d630ef2034c99f5af8b060cdc23df4b86ed1cf27ce79dbc5d5bb` and tooling SHA-256 `cddf78ada6c7a131ca42cd8657aeb113475c8ca08fb6c95349e8774209e80c6f`.

- 159 desktop states, five responsive states, 218 route checks and 59 interaction regressions: zero failures.
- Archive/coverage, typecheck and optimized build passed; five Python QA-tool and nine Node cover-integrity tests also passed.
- All 159 exact-size comparisons completed; every over-20 residual was unchanged. Two unrelated states showed only microscopic MAE capture noise.
- Direct `1f9e170c`, `ee8db412` and `8f029018` renders are unchanged from the preceding verified corpus.
- Continuous lyrics over-20 improved 36.554002% → 36.523933%, while MAE changed 28.132844 → 28.168334; its panel region improved materially.
- Continuous queue MAE improved 28.254887 → 28.007936, while over-20 changed 34.648779% → 34.701150%; its player-region MAE improved materially.
- Close/reopen produces byte-identical first-entry material for both journeys while preserving the live listening signature and eleven-row current queue.
- No MATCH/FLOW acceptance was granted.

Evidence: `D:\courses-main-evidence\lyrics-queue-first-entry-final-20260915-024103\browser\results.json`, `comparison\metrics.json` / `index.html`, both journey directories, and `continuous-metrics.json`. The preceding Alpha evidence remains preserved under `alpha-continuation-final-20260915`.

## Servers and storage

Canonical development preview: `http://127.0.0.1:6435/` from `J:\courses\apple-music-clone`. The optimized audit used `http://127.0.0.1:6437/` from build `_Rj431BT_BSpEza9MFldD`; positively identify freshness before ever reusing or stopping a listener. Port 6431 is retired/stopped. Port 3000 belongs to another project and must not be touched.

Main `.next` and `.parity-evidence` remain D:-backed. Do not delete their backing directories or build simultaneously into a `.next` used by another process. J: is constrained; keep TEMP/TMP and evidence on D:.

## Honest acceptance status

**UI implemented/renderable: 159 / 159**

**MATCH genuinely signed off: 0 / 159**

**Complete recorded FLOW genuinely signed off: 0 / 58**

Green CI, a rendered fixture, route coverage, or a lower residual is not acceptance. Course/community adaptation remains blocked until genuine clone acceptance and explicit owner approval.

## Continue implementation immediately

Do not stop at verification. After preflight on `J:\courses/main`, continue directly into the next substantive 1:1 defect.

Priority unresolved areas:

1. **Alpha / New finishing (`54b01eab`)** — review all five New checkpoints and continue lawful typography/icon geometry, exact glass/arrow material, player geometry, lower releases and the live profile/title difference. Do not undo the repaired provider artwork or continuation without readable counter-evidence.
2. **Library editor snapshot transition** — later checkpoints still diverge because the recording changes account/catalog/library snapshot. Model a transition only if frozen evidence supports it.
3. **Release / City artwork** — middle City Chart lower artwork and incomplete release covers/metadata remain partial. Never paste captured player/interface pixels into artwork.
4. **Shared surfaces** — continue player glass/control geometry, lyrics fade/blur, queue glass/row geometry, dialogs, menus, hover and keyboard-focus states through real controls.
5. **Lyrics / queue remaining discrepancy** — direct fixtures remain useful for exact panel geometry, but the first-entry endpoint snapshots contain unrelated catalog/library/queue changes. Preserve the live transition and do not invent a hidden reset; only model additional state if immutable evidence supports it.

The exact frozen archive under `apple-music-clone/reference/` remains immutable. Use each original's real 1440×903 or 1440×904 application viewport, excluding only the documented 120px acquisition footer. No screenshot-as-page implementation, invisible hotspots, product masks, resized candidates, forced clicks as FLOW evidence, fixture jumping presented as a flow, course adaptation, deployment, real Apple credentials/payments, or copyrighted streaming.
