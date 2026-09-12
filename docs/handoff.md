# Apple Music clone — current handoff

Updated 2026-09-12. Work only on `main` in `J:\courses-astra-preview\apple-music-clone`. Preserve the entire working tree and frozen `reference/` archive. No courses/community adaptation or production deployment is authorized.

## Current verified implementation — 4c8840a

`4c8840a0870849e3d9ceedad963f97fe8cdcb8bc` — `fix(reference): preserve artwork and responsive carousel controls`. Preserves all previous main history and finishes/verifies the pending Home station, glass, native-scrollport and carousel-handle edits found on arrival. Publication/CI status is recorded separately; never infer it from a local commit.

A real 1024px Home regression was reproduced and fixed: Next disappeared before the final card, while Previous floated over the second card. Boundary visibility now follows the actual disabled state, and the expanded desktop gutter no longer leaks into narrower layouts. The registered regression traverses and returns at 1440, 1264, 1024 and 768px. The native station artwork supplies the Home glass colour without compensating sidebar gradients; native keyboard/wheel scrolling remains verified.

Fresh production build `pnPB4llWg5W19-hBO2k-t`: 159 desktop captures, 5 responsive samples, 218 route checks, 52 interaction regressions, zero failures. Typecheck, build, archive/coverage, five Python and nine Node tests passed. All 159 exact-size comparisons completed: Home d5173715 improved from 6.079811% to 5.936308% over-20 pixels; Alpha from 9.640319% to 9.638858%; 157 were unchanged, none worsened at that desktop threshold.

Stable implementation SHA-256: `4ea0d14603e0a795f39bffdadb11ac099cc4215c419e848cfef424385dc4a700`. Stable QA SHA-256: `29dc8dda2899d4c3ccac70dfb37919e23063e115955ef67c4ad698a7e558a14f`. Evidence correctly records pre-commit HEAD 289c049 plus these then-uncommitted source hashes; do not rewrite capture history.

Evidence root: `apple-music-clone/.parity-evidence/artwork-implementation-20260912-1950/`. Use `production/results.json`, `production-comparison/index.html` / `metrics.json`, `production/journeys/`, `production-journey-metrics.json`, and `responsive-production/`. Detailed review: `reference-review/2026-09-12-home-artwork-controls.md`. `reference-review/latest-metrics.json` now contains this image-free full-corpus comparison.

Observed running previews: development 127.0.0.1:6431/PID 39192; fresh production audit 127.0.0.1:6432/PID 53704. Both belong to this app. The previous development process disappeared during diagnostics and was restarted after verifying the port was vacant. Port 3000/PID 22308 belongs to the other project and remains untouched. Recheck ownership and freshness before reuse.

J: space was reclaimed by hash-verified relocation, not deletion of work. Five completed audit directories now have D: backing and unchanged J: directory-junction paths. Manifest: `D:\courses-storage-relocation\20260912-194335\manifest.json`. The initial working tree is backed up in the sibling `working-tree-backup` directory. Reclaimed allocation was 3,476,373,504 bytes; J: rose from about 397 MB to 3.87 GB free before the new verification output. Preserve all junctions and their backing storage. Process-local TEMP/TMP use D:\courses-audit-temp.

**Acceptance stays UI 159/159, MATCH 0/159, complete FLOW 0/58.** Continuous Home matches its direct scrolled fixture exactly, but both still differ from the original. Live New→Alpha remains 10.697290% different from its original and 1.875461% from its direct fixture. The wrong preceding Alpha artwork, remaining material/font/icon/player details and first-entry library/queue/lyrics inconsistencies are not fixed. Do not substitute unrelated artwork or invent session transitions. Continue these exact owners in tasks.md.

## Previous verified checkpoint — a30a9ee (historical)

`a30a9eee7d7b3a44874fd2b4364b30648c064455` — `fix(reference): preserve live sidebar material and carousel controls`, pushed normally to `main`. GitHub run **34680539220**, job **103518256549**, completed successfully, including the full browser and comparison stages. The strict clone acceptance gate was skipped, not passed. Earlier `05ee6ec`, `46f9c15`, `719113e`, `51087ec` and `b1b1247` remain in history.

The sidebar regression was real: clearing `data-source` through Volume stripped the Alpha styling and changed artwork/text. New now retains its artwork edition while real carousel state owns the material. The selected row is translucent, Previous is clickable in the gutter, native snap padding fixes the 1264px return, and New/Home tints leave with their offscreen artwork. The production blur override is preserved with standard-after-prefixed declaration order and tested at its exact computed value. Read `reference-review/2026-09-12-sidebar-live.md` before further sidebar work; do not restore fixture-only styling or the weaker blur assertion.

The final stable production run passed **159 desktop captures, 5 responsive samples, 218 route checks and 51 interaction regressions, zero failures**. Typecheck, production build, archive/coverage checks, five Python tests and nine Node tests passed. All 159 comparisons completed: Alpha improved from 9.8659% to 9.6403% over-20 pixels; the other 158 over-20 measurements were unchanged and none worsened.

Application SHA-256: `a69870d6f1255be4c935c9329af8b77693612e6bab77ba30b0385252d86079ee`. QA SHA-256: `90d4bbed39b006c0329b9778e969ac011e3181e7d072cbdc3ed00f3de4bac34f`. They match the committed implementation and stayed stable through the run. Preserve the capture metadata recording the preceding HEAD plus the then-uncommitted hashes.

Current evidence root: `apple-music-clone/.parity-evidence/sidebar-live-20260912-092105/`. Use `production-verified/results.json`, `production-verified-comparison/index.html` / `metrics.json`, and `production-verified-journey-comparison/index.html` / `metrics.json`. Earlier `production-final` is a superseded candidate with a weak compiled-style assertion, not the final result. The reviewed image-free metrics are in `reference-review/latest-metrics.json`.

Development preview remains **127.0.0.1:6431, PID 6880**. Verified production audit is **127.0.0.1:6432, PID 58192**, started after build `x2_WEykdWwFWc7ox6Ou_S`. Port 3000 was untouched. Recheck process ownership and build freshness before reuse; avoid parallel builds into `.next`.

Completed image directories from this session have hash-verified D: backing and unchanged J: junction paths because J: nearly filled. Final backing is `D:\courses-parity-evidence\sidebar-live-20260912-092105`; the review and `evidence-storage*.json` also identify two earlier relocated diagnostic directories. Do not delete the backing storage. No source, reference or prior-session evidence was moved.

**Acceptance remains UI 159/159; MATCH 0/159; full FLOW 0/58.** The New journey traverses all five source checkpoints with real controls, but live Alpha remains 1.8698% different from its direct fixture over threshold because the recorded snapshots are not fully reconciled. The Home test covers an authenticated carousel/scroll segment, not the complete six-step flow. Synthetic glass distribution, wrong/partial preceding artwork, typography/icons, arrow material, player details and the older library/queue/lyrics entry discrepancies remain open. Do not manufacture account/catalog transitions or sign-offs.

## Previous verified checkpoint — 05ee6ec (historical)


`05ee6ecaf7e51419f19906b702cc60de9a6fb08b` — `fix(reference): verify live library controls and exact cover integrity`. This follows the parallel sidebar correction `46f9c15`, preserves `719113e`, `51087ec`, `b1b1247` and earlier history, and was pushed normally to main. GitHub run **34676601632**, job **103507453056**, completed successfully: build, inventory, unit tests, browser controls, all 159 comparisons and artifact retention passed. The optional strict acceptance gate was skipped, not passed.

Read root/app `AGENTS.md`, `development.md`, `reference-audit.md` and the owning entries in `tasks.md`. Detailed current reviews: `reference-review/2026-09-12-library-controls.md` and `reference-review/2026-09-12-sidebar.md`. `tasks.md` remains the only acceptance checklist.

The eight prior library journeys remain registered and passing. Four new cases verify recorded sorting, recorded pinning, recorded library editing and ordinary-navigation preference persistence. Real menu anchors, row hover/focus, scoped Edit visibility and menu glyph/type geometry were corrected. The cover route now accepts the reviewed provider-comment variation while pinning all rendering bytes; no artwork was vendored or original reference changed.

## Verification and servers at 05ee6ec (historical)

Final stable production results: **159 desktop captures, 5 responsive samples, 218 route checks, 48 interaction regressions, zero failures**. Typecheck, optimized build, archive/task checks, five Python unit tests and nine Node integrity tests passed. Eight focused development regressions also passed.

Implementation SHA-256: `85a2b90d3f1aca0dc82a722767985147cfed75b77f4935ee2c73b85206cb7a6b`. QA-tooling SHA-256: `6e7a66c8966f9f96120968cdc5014ce84fd2679d1379c0b959155b8f353e1db4`. Both stayed unchanged during the full run and match the subsequently committed implementation. Keep the original capture's historical HEAD/dirty metadata intact.

Owner development preview: **http://127.0.0.1:6431/**, PID **6880**, left running. Fresh production audit: **http://127.0.0.1:6432/**, PID **22728**, started after the stable build at machine-local 08:43:35; build ID `qfGfPJvufP7yySm1lSZTJ`. Do not infer freshness of other old listeners. Port 3000 belongs to `K:\justfit` and was not touched. Verify identities again before restarting anything.

Final local evidence root: `apple-music-clone/.parity-evidence/controls-20260912-074455/`. Use `production-final/results.json`, `production-final-comparison/index.html` / `metrics.json`, and `production-final-journey-comparison/index.html` / `metrics.json`. The last gallery compares twelve continuous library checkpoints with originals and direct fixtures. Earlier attempts and diagnostics remain separate and unchanged. `reference-review/latest-metrics.json` is the current image-free full-corpus report.

## Acceptance notes at 05ee6ec (historical)

**UI 159/159; MATCH 0/159; complete recorded FLOW 0/58.** The full baseline comparison is mixed: 105 states have lower over-20 residuals, 52 higher and two unchanged. Made for You `e379e3fe`, editor `ffc18eb8` / `3728aa07`, and scrolled Home `d5173715` retain measured regressions documented in the reviews. Fonts, artwork, player/material, dialog and icon details still require correction.

Sorting/pinning continuous states no longer have over-20 differences against their direct fixtures, but originals still differ by approximately 2.27–2.55%, and some direct/live states differ below the threshold. Library editing preserves the initial catalog/account/library snapshot. Its archive switches those snapshots after the first still; the resulting live/source mismatch remains approximately 34.39–34.86%. Inspect the acquisition/recording context before implementing a legitimate transition. Do not replace session data behind a hover to manufacture the later image.

The prior first-fixture lyrics/queue entry mismatch also remains open (roughly 36.58% / 34.69% live/source in that checkpoint), distinct from reopening established panels. Continue with actual first-fixture journeys, not arbitrary fixture stepping. Preserve clean artwork rather than restoring copied player-control pixels.

This checkout was shared by two sessions. The sidebar work was committed separately as `46f9c15` before the library/cover commit; it was not discarded. Avoid simultaneous builds into `.next`. Disk pressure on C: required process-local TEMP/TMP/cache paths under D: during auditing; do not delete unrelated files or silently change machine-wide settings.

## Previous checkpoint — historical context only

The following records the earlier 719113e audit. Its server IDs, hashes, counts and residuals are historical, not the current checkpoint above.

### Implementation

`719113ea538ebe8253e63c26b10413c4bf3e8621` — `fix(reference): verify library journeys and refine player panels`.

This preserves both previously unpushed commits, `b1b1247` and `51087ec`, and incorporates the five pending application edits plus the previously unregistered library test module. No branches were created or switched, and no original reference bytes were changed. Inspect live Git/GitHub state rather than assuming those older commits remain unpushed.

Read the root/app `AGENTS.md`, `development.md`, `reference-audit.md`, and the existing owning entries in `tasks.md`. The detailed bounded review is `reference-review/2026-09-12-library-panels.md`; the single acceptance checklist remains `tasks.md`.

### Servers

Owner development preview: **`http://127.0.0.1:6431/`**, original listener PID 6880. Leave it running. Port 3000 belongs to another project.

Fresh optimized production audit: **`http://127.0.0.1:6433/`**, verified listener PID 54716. It was started after build `obBeifU7J74d7qmIbjTpb` completed at local machine time 07:28:32 on 2026-09-12. The older listeners on 6432 and 6434 are not evidence of current build freshness; do not use them without independent ownership/freshness verification.

### What changed

The eight library journeys are now registered in the canonical runner and actually exercised. Their stronger assertions exposed and fixed missing Favourite Songs/Emotional Songs sidebar entries after real navigation from New. Songs follows the original eight rows, not the earlier incorrect ten-row test assumption. The compact Songs table now has corrected header sizing, separators, column alignment and artwork inset.

Album hover is separate from saved favourite state. Initial fixture hover yields to real pointer/keyboard input; saving remains filled after pointer exit, and unsaving restores the neutral marker. Existing album/song favourite isolation and mouse-versus-keyboard menu focus are preserved.

The queue and lyrics panel use corrected width/gutters, distinct discovery/queue artwork editions, recorded queue credits/titles, translucent row rules, lyric spacing/fade and first-verse anchoring. Real seeking, Volume toggling and panel reopening are tested. No artwork containing copied player controls was restored.

The schedule's intermediate numerical regression was inspected and corrected: one-pixel artwork crop, LIVE middle-dot separator, station title sizing/line boxes, heading spacing and row geometry. The complete three-step schedule journey uses actual station controls.

### Final local verification

The fresh production run passed **159 desktop captures, 5 responsive samples, 218 recorded route checks and 44 interaction regressions, with zero failures**. Typecheck, optimized build, archive integrity, read-only task coverage and all five QA-tool unit tests passed. Responsive smoke checks and route counts are not visual or complete-flow acceptance.

All 159 states were compared at their actual application viewport: 147 at 1440×903 and 12 at 1440×904, excluding only the documented 120px acquisition footer. Against the preceding full production comparison, 16 states improved, 143 were unchanged and none increased their over-threshold pixel residual.

The browser is Chromium `151.0.7922.34` on the connected Windows machine, scale 1. Actual platform-font metadata confirms Arial for sampled Latin controls; the CSS stack alone is not evidence that SF Pro rendered.

Implementation SHA-256: `14145d001a229ef8ba51a95d49a675ff569c8597872ca515c3bf133e4faea1d1`.
QA-tooling SHA-256: `96c4f6e3aecc5f5fbe05b77632f7be6b70a263f6c88649735d9179b371658af8`.

The captures record HEAD `51087ec` plus these then-uncommitted hashes. That exact application/test batch was subsequently committed as `719113e`; do not rewrite the original capture metadata to pretend it was captured after the commit. Both hashes were stable throughout the run.

### Evidence

All paths below are app-relative under `.parity-evidence/resume-20260912-062030/` and remain local/uncommitted:

- `production-verified/results.json`: final production browser results and candidate identity.
- `production-verified-comparison/index.html` and `metrics.json`: all 159 original/render/difference comparisons.
- `production-verified/journeys/`: continuous real-control screenshots and ordered `steps.jsonl` records.
- `production-verified-journey-comparison/index.html`: continuous-state original/render/difference review, also comparing each live state with its direct fixture.
- `library-baseline/`, `library-sidebar-regression/`, `library-candidate/`, `focused-before/`, `panels-candidate-1/`, `lyrics-candidate-2/`, `focused-final-1/`, `schedule-refinement/`: preserved focused baselines, failed attempts and refinements.
- `production-final/` and its comparison: an intermediate all-green behavioral run that exposed the schedule's small visual regression; it is not the latest candidate.

`docs/reference-review/latest-metrics.json` retains the final image-free full-corpus metrics. Never commit the local image galleries, dependencies, build output or proprietary fonts.

### Acceptance and immediate remaining work

**UI 159/159; MATCH 0/159; complete recorded FLOW 0/58.** No acceptance boxes were checked because a test, route, screenshot or pixel score passed.

The first-fixture journeys `1f9e170c → ee8db412` (lyrics) and `1f9e170c → 8f029018` (queue) now have continuous captures. They expose a major remaining scenario/state discrepancy: the recorded start's listening catalog/library is not the legacy/queue catalog shown at the endpoint. The live endpoint residuals are roughly 36.58% and 34.69%, substantially worse than the approximately 10.13% direct fixtures. Do not conflate reopening an established panel with completing those recorded entry flows, and do not replace session data behind a toggle to manufacture an image.

The eight library journeys now preserve their state through real navigation, but their originals still show typography/sidebar/player differences. Queue/lyrics also retain incomplete lower release artwork and glass/blur differences. A smaller live radio station-menu versus direct-fixture difference remains. The available lyrics motion asset was sampled and reviewed, not the entire motion corpus.

Continue with those scenario transitions and the highest residual states in the current gallery, using the actual originals and real intermediate controls. Resolve visible typography, artwork, sidebar translucency, player/menu/dialog details before advancing MATCH/FLOW. New browser modules must be registered and executed; ordered journey screenshots must not overwrite earlier visits.

### GitHub checkpoint

Push normally on `main`, preserving the existing history. Inspect the actual workflow for the pushed commit: the workflow is named **Clone verification (not acceptance)**. A green GitHub run validates its checks and artifacts, not 159 visual approvals or 58 complete-flow approvals. Do not claim a CI result without observing it. The local results above were completed before the documentation checkpoint and do not substitute for that remote check.
