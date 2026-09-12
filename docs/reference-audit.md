# Apple Music clone audit — current findings

Updated 2026-09-12. Current verified implementation: `4c8840a0870849e3d9ceedad963f97fe8cdcb8bc` on main. The frozen archive, prior history and pending work found on arrival were preserved.

## Current Home artwork and control findings

The verified batch retains native scrollport width on Windows, renders the Home station's forward frame as art-only SVG beneath real glass, removes Home sidebar colour-compensation gradients and refines artwork-edge handle material. A reproduced 1024px regression hid Next before the final card and placed Previous over the second card; visibility/gutter CSS now follows actual boundaries and the desktop breakpoint. The new registered test traverses/returns at four widths.

Fresh optimized production passed 159 desktop captures, five responsive samples, 218 route checks and 52 regressions, zero failures. Typecheck, build, archive/coverage, five Python and nine Node tests passed. All 159 exact-size comparisons completed: two lower over-20 residuals, 157 unchanged, none higher. Home improved 6.079811%→5.936308%; Alpha's handle-only change improved 9.640319%→9.638858%. Application/QA identities remained stable.

Read `reference-review/2026-09-12-home-artwork-controls.md` for exact identities, full-size source/render/difference observations, continuous controls, preserved failures and storage relocation. `handoff.md` owns current servers and continuation state; `reference-review/latest-metrics.json` is the exact image-free full-corpus report.

Home's continuous scrolled state and its direct fixture agree exactly, but are not exact originals. Live New→Alpha is still 10.697290% different from its original and 1.875461% from its direct fixture. The wrong preceding Alpha artwork, glass/font/icon/player residuals and earlier library/lyrics/queue entry snapshot inconsistencies remain open. No full Home flow or visual sign-off is claimed. Acceptance remains UI 159/159, MATCH 0/159, FLOW 0/58.

## Previous sidebar findings — a30a9ee (historical)

The Alpha sidebar lost its material and changed visible artwork/text after real controls cleared the fixture-routing hint. Material now follows actual carousel/visibility state; the selected row is translucent, the Previous button is outside the sidebar, and native snap padding fixes return navigation at 1264px. New/Home tinted material now leaves with its offscreen artwork. A production declaration-order bug was also corrected and is covered by an exact computed blur/saturation assertion.

The final stable production run passed 159 desktop captures, 5 responsive samples, 218 route checks and 51 interaction regressions, zero failures. Typecheck, build, archive/coverage checks, five Python and nine Node tests passed. All 159 comparisons completed: Alpha's over-20 residual decreased from 9.8659% to 9.6403%; 158 over-20 results were unchanged and none worsened. GitHub run 34680539220 / job 103518256549 passed; the optional strict acceptance gate was skipped.

Read `reference-review/2026-09-12-sidebar-live.md` for stable source hashes, the complete local gallery, 13 continuous observations, preserved failed attempts and relocated evidence storage. `handoff.md` has current server/source ownership; `reference-review/latest-metrics.json` is the image-free full-corpus report.

Acceptance remains UI 159/159, MATCH 0/159 and complete recorded FLOW 0/58. Live New Alpha still differs from its direct fixture by 1.8698% over threshold. Wrong/partial artwork, synthetic glass distribution, typography/icons, arrow material, player details and older library/queue/lyrics entry discrepancies remain open. The added Home test is an authenticated carousel segment, not the complete recorded Home flow.


## Earlier audit — historical checkpoint, not current source

Updated 2026-09-12. Historical verified implementation: `719113ea538ebe8253e63c26b10413c4bf3e8621`. Continue only on `main`. The frozen reference archive, pending implementation batch and earlier main history are preserved; courses/community adaptation remains blocked.

### Historical implementation and verification

Eight library journeys are now registered and actually exercised. Stronger assertions exposed and fixed missing saved-playlist sidebar entries after real navigation. Songs follows the original eight rows and has refined compact-table geometry. Initial album hover is separate from saved favourites and yields to real pointer/keyboard input.

Queue/lyrics corrections cover panel width/gutters, distinct artwork editions, recorded credits/titles, translucent row rules, lyric spacing/fade and first-verse anchoring. The schedule's intermediate regression was inspected and corrected through the exact original's crop, LIVE separator, title sizing and line boxes. No artwork containing copied player-interface pixels was restored.

The final production run passed 159 desktop captures, 5 responsive samples, 218 route checks and 44 interaction regressions with zero failures. Typecheck, optimized build, archive/task checks and five QA-tool unit tests passed. All 159 comparisons completed: 16 improved, 143 unchanged, none increased their over-threshold residual. Application and tooling hashes stayed stable and match the committed batch.

Use `handoff.md` for current source/server identities and `reference-review/2026-09-12-library-panels.md` for measured results, preserved failures and review scope. `reference-review/latest-metrics.json` contains the final image-free full-corpus measurements. The audit below is historical, not the current checkpoint.

### Historical acceptance gaps

The 39 continuous-state captures include first-fixture entry into lyrics and queue. These reveal major catalog/library/queue differences from the saved endpoints despite established-panel checks passing: live residuals are approximately 36.58% and 34.69%, versus approximately 10.13% for the direct fixtures. Do not substitute one category for the other or silently replace session data behind a toggle to manufacture a match.

Partial lower release artwork, sidebar translucency, typography, lyric blur, player/dialog/menu details and album selected-row/overflow/truncation differences remain. Actual platform-font metadata confirms Arial for sampled Windows controls. One lyrics recording was sampled, not the entire motion corpus. Acceptance remains UI 159/159, MATCH 0/159, FLOW 0/58.

## Earlier audit history — through febd7b8

### Phase and repository findings

The required order is **true 1:1 Apple Music clone, then separately authorized courses/community adaptation**. Work only on `main`. The active application is `apple-music-clone/`.

The audit began at local source commit `6ecfb4a`, one commit ahead of `origin/main` (`fac8109`), following fidelity batch `94486db` and the earlier screen-family refinements. That local work was preserved. The old course-plan branch is already in main's ancestry. An additional historical course-implementation branch was inspected read-only and left untouched; it is not the active clone and must not be merged into this phase.

The GitHub default branch is `main`, but the verification workflow still targeted the abandoned course-plan branch. Its latest observed old-branch run, `34529162992`, failed three outdated auth checks. The workflow has been revised for `main`, active documentation changes, read-only task coverage, pinned QA tools, browser checks, and a complete comparison gallery. Green CI is explicitly not acceptance.

Root/app README and agent instructions, the documentation map, and the development runbook contained contradictory paused/prototype/course-first directions. Active entry points now agree on the clone-first phase and point to the same checklist and evidence workflow. The old inventory alias is read-only; acquisition reports must not be regenerated.

### Audit coverage and evidence

The frozen corpus contains 159 unique screens, 58 flows, 218 ordered steps, and 13 available motion assets. The implementation inventory remains 159/159; this is not visual or flow acceptance. The complete baseline suite passed 164 renders, 218 route checks, and 16 interaction regressions before this batch.

A fresh full-corpus comparison exposed a capture-contract error: 147 standard originals have a 903px application viewport, while 12 have 904px. The runner had forced all of them to 903px. Captures now derive their exact viewport from the preserved original and exclude only the 120px acquisition footer. Comparisons reject missing, tampered, or wrong-size images rather than resizing or skipping them.

Canonical output records source/render hashes, implementation and QA identities, viewport, browser, operating system, computed font family, geometry, overflow, and browser/resource failures. Separate output directories preserve baselines and failed attempts. The comparator ranks every screen and generates source/render/difference views, but never ticks MATCH or FLOW.

The first stricter candidate passed all 17 then-registered interaction tests but retained one failed CSS request (`ERR_NO_BUFFER_SPACE`) on `54b01eab`. That run was not promoted to acceptance. Windows capture now defaults to serial execution, records concurrency, and preserves failed runs. Explicit UTF-8 edits also prevent the selector corruption caught in an intermediate harness run. Final candidate results belong in `handoff.md` and the latest metrics checkpoint.

### Source fixes made during this audit

The video timeline was hard-coded at `0:06`, its slider was read-only, seek buttons changed unrelated audio state, and its fullscreen control opened a media picker. `music-video-player.tsx` now owns a bounded silent-preview transport: seek, back/forward ten seconds, elapsed/remaining time, play/pause, volume, actual browser fullscreen, and local-file playback. Keyboard focus is contained and restored to the opener; the background is inert while the video is open. A real artist-page entry test covers these controls, not only the canonical video fixture.

The lyrics-panel discovery rail rendered fractional-width artwork and a 20px gap where the source uses 406×233px cards and an 18px gap. The desktop legacy-panel rule now uses whole-pixel widths and the source gutter. Its regression verifies both the saved state and closing/reopening the panel through live controls after the source ID is cleared. The focused `ee8db412` comparison improved from 11.15% to 10.56% of pixels exceeding a 20-channel-value difference; MAE improved from 8.18 to 7.72. This is a diagnostic improvement, not a MATCH decision.

### Visual review and remaining priorities

Full-size source/render inspection of the lyrics side panel still shows inactive-line blur/fade and line-spacing differences, sidebar/footer alignment differences, and player typography/glass/glyph discrepancies. The saved video frame and controls were also inspected. The all-screen numerical comparison is comprehensive; readable manual visual review of every screen and every motion asset is not yet complete.

Prioritize semantic state/content and geometry before tint-only tuning. The baseline's largest residuals include the lyrics panel, Home/sidebar underlay, queue/autoplay, lower New shelves, and sidebar edit states. Use `latest-metrics.json` once a verified candidate is recorded, and the local gallery for full source/render/difference inspection. Inspect whole screens before narrowing to a crop; shared shell changes must be followed by a full-corpus regression.

Complete real-control journeys remain a separate workstream. Verify every recorded intermediate state and available motion asset, not just the final screen or fixture routes. Source-specific art/scroll variants must remain coherent when source IDs are cleared by user actions. No MATCH or FLOW boxes were checked merely because this audit added tests or produced similarity scores.

The acceptance boundary remains 159 genuinely reviewed MATCH entries, 58 complete FLOW entries, and explicit owner authorization before courses/community adaptation. Current numerical diagnostics and the final test checkpoint are evidence of progress, not a claim that this boundary has been reached.

### Production-only state defect found by full comparison

The first complete production-mode run passed 164 captures, 218 routes, and 18 behavioral tests, but its full comparison revealed `9b43cccb` was at the top of the album article instead of the recorded bottom position. Its pixel residual worsened by 1.50 percentage points despite every existing render test being green. The source and candidate were opened at full size to verify the wrong state.

`AlbumArticle` attempted to scroll during a layout effect before the native dialog's `showModal()` effect made it measurable. Development Strict Mode had obscured that ordering dependency. The initialization now waits for an open, laid-out dialog before applying the recorded scroll. A new regression checks three cold production opens, then enters through the album's real MORE control, scrolls with the keyboard, and closes with Escape. It passes alongside the video and lyrics-layout production regressions. This adds a nineteenth behavioral regression without pretending that nineteen tests equal the 58 complete recorded flows.

### Final measured checkpoint

The final production-mode run at source `febd7b8` passed all 164 captures, all 218 recorded route checks, and all 19 behavioral regressions with zero browser/resource failures. Both application and QA identities stayed unchanged during capture. All 159 exact-size comparisons were completed and retained in `reference-review/latest-metrics.json`, with the full local gallery under `.parity-evidence/audit-2026-09-12/final-comparison/`.

Against the corrected-height baseline, no state's over-threshold pixel residual increased. The lyrics layout improved by 0.5967 percentage points; the video-control render improved by 0.0112 points; the production article returned to its baseline state after the race fix. Readable manual reviews remain narrower than the complete numerical corpus: these results do not constitute 159 visual approvals or 58 complete recorded-flow approvals. See `handoff.md` for the exact tested source and next work.
