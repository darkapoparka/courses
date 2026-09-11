# Apple Music clone — current handoff

Updated 2026-09-12. Work only on `main` in `J:\courses-astra-preview\apple-music-clone`. Preserve existing work and the complete `reference/` tree. Do not scaffold another app, switch branches, reset, discard, force-push, or start courses/community adaptation before genuine clone acceptance and owner authorization.

## Source checkpoint

`febd7b8d8aa3acad9f59c310fed418ba4f396d09` (production article-scroll fix), following `50cba6b8d1b2d7ce18d1bad04dcd75f3540cccd2` — `fix(reference): harden clone audits and repair player fidelity`.

This preserves the previously unpushed source commit `6ecfb4a`, the earlier `94486db` fidelity batch, and the complete main-branch history. The separate historical course-implementation branch was inspected read-only and left untouched. No reference images, recordings, source mappings, or historical acquisition reports were changed. Existing `.qa/` scratch files remain preserved and are now ignored alongside `.parity-evidence/`.

Read `AGENTS.md`, `development.md`, `reference-audit.md`, and the relevant `tasks.md` entries. The active docs now agree on the clone-first phase. The old course plans and source-ledger adaptation column are explicitly deferred, not instructions to replace music behavior.

## Running app and evidence locations

The owner's development preview is **`http://127.0.0.1:6431/`**. Port 3000 belongs to another project and must not be assumed to be this clone or terminated. A separate local production-build audit server was started at `http://127.0.0.1:6432/`; the primary development preview remains 6431.

Local evidence is under `apple-music-clone/.parity-evidence/audit-2026-09-12/`. Keep each run separate: `baseline` is the untouched-source legacy capture; `canonical-baseline` corrects source heights; `baseline-comparison` is the complete source comparison; `candidate` preserves a failed transient-resource attempt. Do not overwrite them or present an intermediate failed suite as green. The runbook documents fresh-output reproduction commands.

## Implemented in this checkpoint

The video player now has functional seeking, bounded skip controls, elapsed/remaining time, play/pause, volume, actual fullscreen, and keyboard/focus containment with focus restored to the real opener. It remains a silent local UI preview unless user-owned local media is selected; no Apple streaming or live account/payment integration is claimed.

The legacy lyrics-panel rail now matches the source's 18px gutter and whole-pixel 406×233 artwork geometry. A regression checks the canonical fixture and closes/reopens the panel through live controls after source identity is cleared. The focused comparison improved from 11.15% to 10.56% over-threshold pixels, but remaining typography, blur, and glass differences prevent visual sign-off.

The QA runner now captures all originals at their actual application heights: 147 at 1440×903, 12 at 1440×904. It records source/candidate hashes, browser/platform, geometry, font family, console/resource errors, and source stability. The full comparison tool rejects missing, altered, or wrong-size captures and creates a reviewable gallery. Windows defaults to serial capture after one observed Chromium resource-allocation failure.

The production audit also uncovered an album-description initialization race: the saved bottom-scroll fixture opened at the top even though the render suite passed. The dialog now waits until it is open and measurable before applying the captured scroll. The new regression repeats cold production opens and exercises the real MORE button, keyboard scrolling, and Escape. Do not replace this production-mode check with a route-presence assertion.

## Final local verification — 2026-09-12

Verified application source: `febd7b8d8aa3acad9f59c310fed418ba4f396d09`. The final run used the optimized production build on loopback port 6432, Chromium `151.0.7922.34`, Windows 11, scale 1, and serial capture.

| Check | Observed result |
| --- | --- |
| Frozen archive integrity | 58 flows, 218 ordered steps, 159 identities, 318 image variants; passed |
| Checklist integrity | All 159 UI/MATCH and 58 FLOW identities/order validated |
| TypeScript and optimized build | Passed after the source fixes |
| QA-tool unit tests | 5 passed |
| Browser captures | 159 desktop + 5 responsive samples passed |
| Recorded flow route checks | 218 passed; route coverage is not complete-flow acceptance |
| Interaction regressions | 19 passed, including video controls, live lyrics geometry, and production article scrolling |
| Browser/resource failures | 0 in the final run |
| Candidate stability | Implementation and QA hashes unchanged throughout capture |
| Exact-size comparisons | All 159 compared; no over-threshold residual increased against the canonical baseline |
| Strict acceptance gate | Correctly rejected the unfinished MATCH/FLOW checklist |

Implementation SHA-256: `c0c028b67a359b9ec6ae1d02c0045820bff9c0425dcb2ab9a903761ca37b3f6c`.

Final browser evidence: `.parity-evidence/audit-2026-09-12/final/`. Full gallery: `.parity-evidence/audit-2026-09-12/final-comparison/index.html`. Durable, image-free metrics: `docs/reference-review/latest-metrics.json` (repository-root relative). The article returned to its baseline 9.2783% residual after fixing the production-only wrong scroll; lyrics improved to 10.5578%; video improved slightly to 5.2051%. These are pixel diagnostics, not completion percentages.

The earlier directory named `verified` is an intermediate 18-test production run that exposed the article-state defect, not the final accepted checkpoint. Preserve it as evidence of why full comparison and state-specific assertions are required.

## Acceptance and next work

The single checklist remains 159/159 implemented UI states, 0/159 signed-off MATCH entries, and 0/58 signed-off complete FLOW entries. The nineteen behavioral regressions are not a replacement for the 58 recorded journeys. No acceptance boxes were artificially advanced.

Start with the highest remaining states in the latest full-corpus metrics and gallery: Home/sidebar translucency, queue/autoplay presentation, lyrics typography/blur, and lower discovery shelves. Inspect complete saved originals and actual renders before modifying the active component. Recheck all 159 after shared changes, then verify the corresponding continuous real-control flows and available recordings. Remaining video/control typography and album-dialog geometry also need visual refinement; corrected behavior is not MATCH acceptance.

Do not restart implementation, change frameworks, import the old courses branch, or substitute course semantics. The clone must be accepted first. Follow the root agent contract and runbook for evidence and subsequent handoffs.

## GitHub verification

The workflow now targets `main`, includes active documentation changes, validates the archive and task inventory, builds with the existing lockfile, runs browser/QA tests, and produces the complete comparison gallery. Its optional strict acceptance gate remains separate. GitHub Actions is the authority for the latest remote run; the local results above do not claim that an unobserved CI run succeeded.

Stage only the intended source/docs/evidence metadata. Never commit `.qa/`, `.parity-evidence/`, dependency caches, generated build output, or proprietary fonts. Preserve and normally push the existing main history; never force-push.
