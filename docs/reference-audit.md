# Apple Music clone audit — current findings

Updated: 2026-09-12. This is the active implementation audit, replacing the older prototype/acquisition assessment. Dated source observations remain in `reference-review/ledger.md`; historical decisions and earlier audits remain in Git history. The frozen `apple-music-clone/reference/` archive is unchanged.

## Phase and repository findings

The required order is **true 1:1 Apple Music clone, then separately authorized courses/community adaptation**. Work only on `main`. The active application is `apple-music-clone/`.

The audit began at local source commit `6ecfb4a`, one commit ahead of `origin/main` (`fac8109`), following fidelity batch `94486db` and the earlier screen-family refinements. That local work was preserved. The old course-plan branch is already in main's ancestry. An additional historical course-implementation branch was inspected read-only and left untouched; it is not the active clone and must not be merged into this phase.

The GitHub default branch is `main`, but the verification workflow still targeted the abandoned course-plan branch. Its latest observed old-branch run, `34529162992`, failed three outdated auth checks. The workflow has been revised for `main`, active documentation changes, read-only task coverage, pinned QA tools, browser checks, and a complete comparison gallery. Green CI is explicitly not acceptance.

Root/app README and agent instructions, the documentation map, and the development runbook contained contradictory paused/prototype/course-first directions. Active entry points now agree on the clone-first phase and point to the same checklist and evidence workflow. The old inventory alias is read-only; acquisition reports must not be regenerated.

## Audit coverage and evidence

The frozen corpus contains 159 unique screens, 58 flows, 218 ordered steps, and 13 available motion assets. The implementation inventory remains 159/159; this is not visual or flow acceptance. The complete baseline suite passed 164 renders, 218 route checks, and 16 interaction regressions before this batch.

A fresh full-corpus comparison exposed a capture-contract error: 147 standard originals have a 903px application viewport, while 12 have 904px. The runner had forced all of them to 903px. Captures now derive their exact viewport from the preserved original and exclude only the 120px acquisition footer. Comparisons reject missing, tampered, or wrong-size images rather than resizing or skipping them.

Canonical output records source/render hashes, implementation and QA identities, viewport, browser, operating system, computed font family, geometry, overflow, and browser/resource failures. Separate output directories preserve baselines and failed attempts. The comparator ranks every screen and generates source/render/difference views, but never ticks MATCH or FLOW.

The first stricter candidate passed all 17 then-registered interaction tests but retained one failed CSS request (`ERR_NO_BUFFER_SPACE`) on `54b01eab`. That run was not promoted to acceptance. Windows capture now defaults to serial execution, records concurrency, and preserves failed runs. Explicit UTF-8 edits also prevent the selector corruption caught in an intermediate harness run. Final candidate results belong in `handoff.md` and the latest metrics checkpoint.

## Source fixes made during this audit

The video timeline was hard-coded at `0:06`, its slider was read-only, seek buttons changed unrelated audio state, and its fullscreen control opened a media picker. `music-video-player.tsx` now owns a bounded silent-preview transport: seek, back/forward ten seconds, elapsed/remaining time, play/pause, volume, actual browser fullscreen, and local-file playback. Keyboard focus is contained and restored to the opener; the background is inert while the video is open. A real artist-page entry test covers these controls, not only the canonical video fixture.

The lyrics-panel discovery rail rendered fractional-width artwork and a 20px gap where the source uses 406×233px cards and an 18px gap. The desktop legacy-panel rule now uses whole-pixel widths and the source gutter. Its regression verifies both the saved state and closing/reopening the panel through live controls after the source ID is cleared. The focused `ee8db412` comparison improved from 11.15% to 10.56% of pixels exceeding a 20-channel-value difference; MAE improved from 8.18 to 7.72. This is a diagnostic improvement, not a MATCH decision.

## Visual review and remaining priorities

Full-size source/render inspection of the lyrics side panel still shows inactive-line blur/fade and line-spacing differences, sidebar/footer alignment differences, and player typography/glass/glyph discrepancies. The saved video frame and controls were also inspected. The all-screen numerical comparison is comprehensive; readable manual visual review of every screen and every motion asset is not yet complete.

Prioritize semantic state/content and geometry before tint-only tuning. The baseline's largest residuals include the lyrics panel, Home/sidebar underlay, queue/autoplay, lower New shelves, and sidebar edit states. Use `latest-metrics.json` once a verified candidate is recorded, and the local gallery for full source/render/difference inspection. Inspect whole screens before narrowing to a crop; shared shell changes must be followed by a full-corpus regression.

Complete real-control journeys remain a separate workstream. Verify every recorded intermediate state and available motion asset, not just the final screen or fixture routes. Source-specific art/scroll variants must remain coherent when source IDs are cleared by user actions. No MATCH or FLOW boxes were checked merely because this audit added tests or produced similarity scores.

The acceptance boundary remains 159 genuinely reviewed MATCH entries, 58 complete FLOW entries, and explicit owner authorization before courses/community adaptation. Current numerical diagnostics and the final test checkpoint are evidence of progress, not a claim that this boundary has been reached.
