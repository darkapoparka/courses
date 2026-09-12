# Courses - current handoff

Updated 2026-09-12 for `DOCS-MAIN-CONSOLIDATION`. The owner requested all completed work on main locally and remotely. The phase remains clone finalization, followed by an explicitly assigned courses adaptation.

## Primary checkout

**`J:\courses` -> `main` -> `apple-music-clone/`.** Incorporates Astra checkpoint `eae1eff` (including GPT web `67a44c4`) with the newer main implementation `4c8840a` and evidence `e6a71f7`. The four older course-preview commits are retained in main's history without reactivating `web/`. See [the transition record](astra/branch-transition.md) for exact source heads, recovery directories and reconciliation.

Future work may use bounded feature branches/worktrees; main is the shared baseline. The original preview directory remains on `codex/preview-preserved-20260912` with its evidence and unfinished edits protected. Another session was still editing its player/metadata files during consolidation. Do not overwrite or declare those changes verified from the earlier Home results; recheck their current status before transfer.

## Latest verified application evidence

Implementation `4c8840a0870849e3d9ceedad963f97fe8cdcb8bc` fixes Home station artwork, native glass/scrolling and carousel boundaries, including the reproduced 1024px hidden-Next/misplaced-Previous regression. Its recorded optimized-production run passed 159 desktop captures, five responsive samples, 218 route checks and 52 interaction regressions, plus typecheck/build/archive/coverage, five Python and nine Node tests. This is inherited evidence from the [dated Home review](reference-review/2026-09-12-home-artwork-controls.md), not a new local browser run during the merge.

Home d5173715 improved from 6.079811% to 5.936308% over-20 pixels, Alpha from 9.640319% to 9.638858%, and 157 desktop comparisons were unchanged. Continuous Home equals its direct scrolled fixture but still differs from the original. Live New to Alpha remains 10.697290% from its original and 1.875461% from its fixture. The wrong preceding Alpha artwork, typography/icons, remaining player/material details and first-entry library/lyrics/queue discrepancies remain open.

The review retains application/QA hashes, build identity and historical capture HEAD/dirty metadata. Full local evidence is under `J:\courses-astra-preview\apple-music-clone\.parity-evidence\artwork-implementation-20260912-1950\`; [latest-metrics.json](reference-review/latest-metrics.json) retains the image-free full-corpus comparison. Preserve original metadata and D:-backed junctions. Recheck server ownership/build freshness before reusing the preview's recorded ports 6431/6432.

Observed preceding CI: [main e6a71f7](https://github.com/darkapoparka/courses/actions/runs/34708753639), [Astra docs eae1eff](https://github.com/darkapoparka/courses/actions/runs/34708401549) and [Astra clone eae1eff](https://github.com/darkapoparka/courses/actions/runs/34708401498) completed successfully. Those runs certify their own committed candidates, not the later merge or dirty preview files.

**Acceptance remains UI 159/159, MATCH 0/159, complete FLOW 0/58.** Repository consolidation and green CI grant no new visual acceptance or owner transition approval.

## Consolidation verification

Passed locally: nine documentation unit tests, the contract validator (34 active documents, 87 local link paths, four skills, ten source records), task coverage, handoff-skill structural validation, and whitespace checks. All 378 task checkbox lines and 577 reference-file hashes are unchanged. The generated Next.js block and historical docs tree are intact; the runtime workflow retains every prior verification step. All four source branch heads are now ancestors of main. No application runtime source changed in this merge, so no new local build or visual acceptance is claimed.

The integration commits are `30e5204` (Astra plus newer main) and `fb0059b` (historical course prototype ancestry). Record the final pushed SHA and actual CI outcomes in the task report; configured or queued checks are not passes. Recovery material is in `J:\courses\.git\local-adoption\20260912-main\`.

## Next bounded work

Reconcile the other session's unfinished player/metadata batch once its source is stable, without overwriting either checkout. After that, continue the highest-impact evidenced discrepancy in [the audit](reference-audit.md) and its existing [task entries](tasks.md). Inspect the original and real continuous state, verify the actual optimized candidate, and preserve all recorded failures/residuals. A carousel segment alone does not accept a complete flow.
