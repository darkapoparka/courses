# Apple Music clone — current handoff

Updated 2026-09-12. Continue only on `main` in `J:\courses-astra-preview\apple-music-clone`. Preserve the complete working tree and frozen `reference/` archive. The next phase is still a faithful Apple Music clone, not courses/community adaptation.

## Verified implementation checkpoint

`719113ea538ebe8253e63c26b10413c4bf3e8621` — `fix(reference): verify library journeys and refine player panels`.

This preserves both previously unpushed commits, `b1b1247` and `51087ec`, and incorporates the five pending application edits plus the previously unregistered library test module. No branches were created or switched, and no original reference bytes were changed. Inspect live Git/GitHub state rather than assuming those older commits remain unpushed.

Read the root/app `AGENTS.md`, `development.md`, `reference-audit.md`, and the existing owning entries in `tasks.md`. The detailed bounded review is `reference-review/2026-09-12-library-panels.md`; the single acceptance checklist remains `tasks.md`.

## Servers

Owner development preview: **`http://127.0.0.1:6431/`**, original listener PID 6880. Leave it running. Port 3000 belongs to another project.

Fresh optimized production audit: **`http://127.0.0.1:6433/`**, verified listener PID 54716. It was started after build `obBeifU7J74d7qmIbjTpb` completed at local machine time 07:28:32 on 2026-09-12. The older listeners on 6432 and 6434 are not evidence of current build freshness; do not use them without independent ownership/freshness verification.

## What changed

The eight library journeys are now registered in the canonical runner and actually exercised. Their stronger assertions exposed and fixed missing Favourite Songs/Emotional Songs sidebar entries after real navigation from New. Songs follows the original eight rows, not the earlier incorrect ten-row test assumption. The compact Songs table now has corrected header sizing, separators, column alignment and artwork inset.

Album hover is separate from saved favourite state. Initial fixture hover yields to real pointer/keyboard input; saving remains filled after pointer exit, and unsaving restores the neutral marker. Existing album/song favourite isolation and mouse-versus-keyboard menu focus are preserved.

The queue and lyrics panel use corrected width/gutters, distinct discovery/queue artwork editions, recorded queue credits/titles, translucent row rules, lyric spacing/fade and first-verse anchoring. Real seeking, Volume toggling and panel reopening are tested. No artwork containing copied player controls was restored.

The schedule's intermediate numerical regression was inspected and corrected: one-pixel artwork crop, LIVE middle-dot separator, station title sizing/line boxes, heading spacing and row geometry. The complete three-step schedule journey uses actual station controls.

## Final local verification

The fresh production run passed **159 desktop captures, 5 responsive samples, 218 recorded route checks and 44 interaction regressions, with zero failures**. Typecheck, optimized build, archive integrity, read-only task coverage and all five QA-tool unit tests passed. Responsive smoke checks and route counts are not visual or complete-flow acceptance.

All 159 states were compared at their actual application viewport: 147 at 1440×903 and 12 at 1440×904, excluding only the documented 120px acquisition footer. Against the preceding full production comparison, 16 states improved, 143 were unchanged and none increased their over-threshold pixel residual.

The browser is Chromium `151.0.7922.34` on the connected Windows machine, scale 1. Actual platform-font metadata confirms Arial for sampled Latin controls; the CSS stack alone is not evidence that SF Pro rendered.

Implementation SHA-256: `14145d001a229ef8ba51a95d49a675ff569c8597872ca515c3bf133e4faea1d1`.
QA-tooling SHA-256: `96c4f6e3aecc5f5fbe05b77632f7be6b70a263f6c88649735d9179b371658af8`.

The captures record HEAD `51087ec` plus these then-uncommitted hashes. That exact application/test batch was subsequently committed as `719113e`; do not rewrite the original capture metadata to pretend it was captured after the commit. Both hashes were stable throughout the run.

## Evidence

All paths below are app-relative under `.parity-evidence/resume-20260912-062030/` and remain local/uncommitted:

- `production-verified/results.json`: final production browser results and candidate identity.
- `production-verified-comparison/index.html` and `metrics.json`: all 159 original/render/difference comparisons.
- `production-verified/journeys/`: continuous real-control screenshots and ordered `steps.jsonl` records.
- `production-verified-journey-comparison/index.html`: continuous-state original/render/difference review, also comparing each live state with its direct fixture.
- `library-baseline/`, `library-sidebar-regression/`, `library-candidate/`, `focused-before/`, `panels-candidate-1/`, `lyrics-candidate-2/`, `focused-final-1/`, `schedule-refinement/`: preserved focused baselines, failed attempts and refinements.
- `production-final/` and its comparison: an intermediate all-green behavioral run that exposed the schedule's small visual regression; it is not the latest candidate.

`docs/reference-review/latest-metrics.json` retains the final image-free full-corpus metrics. Never commit the local image galleries, dependencies, build output or proprietary fonts.

## Acceptance and immediate remaining work

**UI 159/159; MATCH 0/159; complete recorded FLOW 0/58.** No acceptance boxes were checked because a test, route, screenshot or pixel score passed.

The first-fixture journeys `1f9e170c → ee8db412` (lyrics) and `1f9e170c → 8f029018` (queue) now have continuous captures. They expose a major remaining scenario/state discrepancy: the recorded start's listening catalog/library is not the legacy/queue catalog shown at the endpoint. The live endpoint residuals are roughly 36.58% and 34.69%, substantially worse than the approximately 10.13% direct fixtures. Do not conflate reopening an established panel with completing those recorded entry flows, and do not replace session data behind a toggle to manufacture an image.

The eight library journeys now preserve their state through real navigation, but their originals still show typography/sidebar/player differences. Queue/lyrics also retain incomplete lower release artwork and glass/blur differences. A smaller live radio station-menu versus direct-fixture difference remains. The available lyrics motion asset was sampled and reviewed, not the entire motion corpus.

Continue with those scenario transitions and the highest residual states in the current gallery, using the actual originals and real intermediate controls. Resolve visible typography, artwork, sidebar translucency, player/menu/dialog details before advancing MATCH/FLOW. New browser modules must be registered and executed; ordered journey screenshots must not overwrite earlier visits.

## GitHub checkpoint

Push normally on `main`, preserving the existing history. Inspect the actual workflow for the pushed commit: the workflow is named **Clone verification (not acceptance)**. A green GitHub run validates its checks and artifacts, not 159 visual approvals or 58 complete-flow approvals. Do not claim a CI result without observing it. The local results above were completed before the documentation checkpoint and do not substitute for that remote check.
