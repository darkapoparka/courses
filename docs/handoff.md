# Apple Music reference-clone handoff

## Branch and working-tree policy

Work only on `main`. Do not create, checkout, switch to, or work on any other branch unless the owner explicitly reverses this policy. Preserve the current working tree before any Git operation that could replace files. Never reset, discard, or stash-and-forget the active fidelity batch. `apple-music-clone/.qa/` is local QA scratch space and must never be committed.

The active clone lives at `J:\courses-astra-preview\apple-music-clone`. The preserved fidelity batch based on `e166f5b` (`fix(reference): tighten player and radio capture states`) was checkpointed on `main` as `94486db36446c8717e50ccaaff014bdb02054511` (`fix(reference): refine high-residual capture fidelity`) after the complete regression passed. `next-env.d.ts` has no intentional change in that checkpoint. `.qa/` remains untracked.

## Current implementation checkpoint — 2026-09-11

All 159 saved reference UI states are implemented and render through `/screen/<id>`. All 218 recorded flow routes resolve through `/flows/<flow>?step=<n>`. A fresh complete canonical browser suite after the latest visual refinements passed 164 rendered states (159 desktop references plus 5 mobile samples), 218/218 recorded flow routes, and 16/16 interaction journeys with 0 failures.

A real Chromium hydration check on the current working tree passed on 2026-09-11: `http://127.0.0.1:3000/` loaded as the live Apple Music prototype, clicking the Radio navigation control changed the page heading to `Radio`, and the control became `aria-current="page"`.

Strict acceptance remains separate from implementation coverage. `UI-*` means implemented/renderable. A `MATCH-*` box may be checked only after that exact saved screenshot has genuinely passed visual verification. A `FLOW-*` box may be checked only after the complete recorded journey has been exercised end-to-end with the correct states and transitions. Do not infer MATCH/FLOW acceptance from route availability or a green render suite.

## Current visual fidelity measurements

Canonical desktop comparisons use 1440×903 unless the saved reference dictates otherwise. Current difficult-state residuals are:

| Reference | Current >20 threshold | MAE / note |
| --- | ---: | --- |
| `ee8db412` lyrics side panel | 12.28% | MAE 8.96 |
| `54b01eab` frosted sidebar | 11.41% | MAE 7.33 after source inline `blur(18px) saturate(1.15)` |
| `4811dde3` autoplay queue | 11.11% | queue family fidelity pass |
| `d5173715` Home alpha | 10.84% | MAE ~7.80 |
| `8f029018` normal queue | 10.67% | queue family fidelity pass |
| `8b03c9d0` | ~10.18% | measured source state |
| `6ac70c34` | ~10.04% | keep live red Add control beside “stupid song” |
| `ffc18eb8` | ~10.04% | expanded-player/editing state |
| `3728aa07` | ~10.03% | expanded-player/editing state |
| `bc773ae9` | 9.82% | measured source state |
| `898ca766` | 9.81% | artist Singles row uses 207px cards / 20px gaps |
| `7bd2ef54` fullscreen live Radio | 9.44% | MAE 6.64; ambient-color residual, foreground already aligned |
| `32515da3` article | 9.57% | body `letter-spacing: -0.15px` preserves wrapping |
| `9b43cccb` scrolled article | 9.28% | same article typography correction |
| `de48a956` empty queue | 9.10% | queue family fidelity pass |
| `f24fda77` | 8.77% | measured source state |
| `06a34864` | ~4.52% | expanded-player family |
| `c939c9b8` | ~4.19% | canonical fit |

The pending `54b01eab` improvement described in the previous session has now been applied to source and re-captured canonically. Before the source fix, the sidebar computed `backdrop-filter: none` and measured 11.64% / MAE 7.37. The source now uses a reference-specific inline React style; a real browser `getComputedStyle(...).backdropFilter` check returns `blur(18px) saturate(1.15)`, and the canonical result is 11.41% / MAE 7.33.

## Fidelity discoveries that must be preserved

Next/Turbopack has repeatedly dropped external `backdrop-filter` declarations in compiled CSS. Never assume a stylesheet declaration is active: inspect the rendered `getComputedStyle(...).backdropFilter`. Where canonical testing proves glass is needed, use the narrowest reference-specific inline React style rather than painting a screenshot into the UI.

`ee8db412` depends on the correct hidden magenta A-List Pop feature under natural glass, the reference-specific inline backdrop filter, a 10px lyric-panel scroll-anchor adjustment, and source-specific lyric fade/opacities. `d5173715` depends on the correct orange Alex's Station previous card, a warm translucent sidebar, and measured source-specific ambient lobes. `7bd2ef54` already has strongly aligned foreground geometry/artwork; retain the seven-lobe additive ambient-color correction instead of replacing the whole gradient stack or foreground geometry.

Queue states retain the lower-panel color reconstruction, 1px panel-content shift left, ~0.65px artwork vertical correction, and ~3px autoplay-section lift. Article states retain `letter-spacing: -0.15px` on body text. Artist Singles captured states retain 207px cards with 20px gaps. `6ac70c34` retains the red live Add control beside “stupid song.”

## Source of truth and validation

`docs/tasks.md` is the canonical implementation/verification blueprint. Saved source captures are under `apple-music-clone/reference/originals/`. Deterministic states are reproduced by `/screen/<id>` and recorded journeys by `/flows/<flow>?step=<n>`.

For every visual correction: establish the canonical baseline, test the candidate, compare the full-frame >20 threshold and MAE, keep it only if objectively better, then recapture from actual source. After meaningful batches, rerank all 159 references rather than tuning from memory.

The 2026-09-11 checkpoint reran the complete browser/reference suite, all 218 routes, all 16 interaction journeys, real onboarding/login/trial/cancellation/passcode/language browser exercises, `npm run typecheck`, and `npm run build`; those gates passed. Continue to require those checks before later checkpoints. `scripts/verify-replay-credits.mjs` is presently unable to start because this checkout does not install its `@playwright/test` dependency; do not change package dependencies solely to mask that stale runner mismatch. `npm run inventory:screen-status` may rewrite `reference/screen-status.md`; do not commit generated noise accidentally. Run task coverage separately; it validates the ledger but must not tick MATCH/FLOW boxes.

## Immediate continuation

1. Fidelity batch checkpoint `94486db36446c8717e50ccaaff014bdb02054511` is the measured source checkpoint on `main`; keep it available on `origin/main`.
2. Keep `.qa/` untracked and continue immediately into the highest residual references, preferring shared structural/state causes over arbitrary pixel painting.
3. Exercise all 58 recorded flows end-to-end and only then check individual `FLOW-*` boxes with evidence. Check `MATCH-*` only after exact visual acceptance of each reference.
4. Completion requires genuine 159/159 MATCH and 58/58 FLOW acceptance, not merely 159 rendered states and 218 resolvable route snapshots.
