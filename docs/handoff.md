# Courses — current handoff

Updated 2026-09-13 after implementation `5929190f0756353765d7296cd0302acade4c295c` — `fix(reference): preserve player state and restore discovery artwork`.

## Active checkout and preservation

**`J:\courses` → `main` → `apple-music-clone/`.** The owner approved transferring the pending player/metadata batch here and continuing implementation on main. That transfer is complete. The old `J:\courses-astra-preview` checkout remains preserved on `codex/preview-preserved-20260912`; all seven original pending files still match their transfer hashes. Do not transfer them again or overwrite main with that older checkout.

Transfer backup: `D:\courses-main-transfer\20260913-000116\manifest.json`. Main build/evidence output has D: backing through verified junctions. Keep their targets and the original preview evidence intact. No source archive, dependencies, untracked user work or unrelated application was deleted.

## Current implementation and verification

Alpha player glass follows real carousel state; library-editor glass follows actual Edit/Done state. Both retain their material through local controls. The SVG tab icon is integrated and tested. New shelves use the recorded 208px/19px grid, corrected caption insets and explicit badges. Unobstructed London/Miami artwork is restored. Panel releases use the separate 193px/19px grid and safe fragment coordinates. Wide legacy release fragments no longer substitute unrelated visible library artwork and persist through Volume; closing/reopening lyrics avoids cropping captured panel UI into wide cards.

Fresh optimized build `f_UWNMB9ViI8JIPcjYPm4`: 159 desktop captures, five responsive samples, 218 route checks and **57 interaction regressions, zero failures**. Typecheck, build, archive/coverage, five Python QA-tool tests and nine Node cover-integrity tests passed. All 159 source comparisons completed: **29 lower over-20 residuals, 130 unchanged, zero higher**. One unchanged-threshold Replay image has six one-level pixel differences; this is not a claim that every metric/image is identical or approved.

Largest reviewed improvements include Essentials/City Charts 10.078058%→5.507490%, Coming Soon 5.597315%→3.891042%, legacy New 8.023102%→6.034207%, and the navigation editor 8.960177%→6.481840% over-20 pixels. Read [the dated implementation review](reference-review/2026-09-13-main-discovery-artwork.md) for exact identities, failures, live-state discrepancies and limitations. [Latest metrics](reference-review/latest-metrics.json) contains only the final image-free full-corpus report.

Application SHA-256: `4b0b9408ceb42a71695fd7e6db3faec0e96b8351cc2e0f3910ac7b23759784a1`. QA SHA-256: `7bc4035c8cc479849555437e6b65fdda4f461da641cd5e2c76a7481866c645d4`. Both were stable during capture. The original evidence correctly records HEAD `c0ce99f` plus then-uncommitted hashes; do not rewrite it after the commit.

## Servers and exact evidence

Main development preview: **`http://127.0.0.1:6435/`**. Fresh main optimized audit: **`http://127.0.0.1:6436/`**, started after the build above. Recheck listener command lines and build freshness before reuse. Old 6431/6432 listeners belong to the preserved preview, not this main candidate. Port 3000 belongs to another project and remains untouched.

Evidence: `apple-music-clone/.parity-evidence/main-implementation-20260913/`, backed by `D:\courses-main-evidence\main-implementation-20260913`. Use `production-final/results.json`, `production-final-comparison/index.html` / `metrics.json`, `production-final/journeys/`, and `production-final-journey-metrics.json`. Earlier `production/` is a superseded candidate, not the final result. All failed/intermediate evidence is retained.

`.next` is backed by `D:\courses-main-build\20260913-000116`; its parent `node_modules` junction is needed for physical-path module resolution. TEMP/TMP are process-local under `D:\courses-main-temp`. J: still had only about 844 MB free at the last storage check, so preserve these D:-backed paths. The preview-only standalone advisory is not a production-deployment approval.

## Remaining implementation, not sign-off

**UI 159/159, MATCH 0/159, complete FLOW 0/58.** Course/community adaptation remains blocked pending genuine clone acceptance and explicit owner approval.

Legacy release states after Volume and an established lyrics close/reopen equal their direct fixtures, but their originals still differ. Live New→Alpha remains 10.639766% from its original and 1.880460% from its fixture. First-entry lyrics/queue remain approximately 36.56% / 34.67% different from the originals; library editing remains approximately 34.36–34.63% different after its first checkpoint. Do not replace the starting catalog or profile behind a control to manufacture a match.

Continue the existing owners in [tasks](tasks.md): Alpha preceding artwork/sidebar material; missing right-edge continuation cards; partial release covers/metadata and middle City Charts artwork; actual font/icon/player/lyrics details; legitimate first-entry scenario reconciliation. Platform-font evidence still reports Arial for sampled controls. Do not copy proprietary font files or confuse the 57 behavior regressions with 58 complete recorded-flow acceptances.

## Historical consolidation context

Baseline `c0ce99f` combined Astra guidance `eae1eff` / `67a44c4`, verified Home implementation `4c8840a` and evidence `e6a71f7`. Merge commits `30e5204` and `fb0059b` retained the older course-preview ancestry without reactivating `web/`. See [the transition record](astra/branch-transition.md); recovery material remains in `J:\courses\.git\local-adoption\20260912-main\`.

The previous handoff's unfinished-preview transfer instruction is now satisfied. Earlier Home/sidebar verification and CI remain evidence of their own commits, not substitutes for this candidate. Inspect the actual pushed main SHA and its workflow outcome; publication, local verification, visual acceptance and owner approval remain separate facts.
