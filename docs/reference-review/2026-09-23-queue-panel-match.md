# Queue panel exact-state match and continuous-entry finding — 2026-09-23

## Candidate and exact state

This review accepts only `MATCH-8f029018`, the populated Up Next panel on the New screen. The immutable source is `apple-music-clone/reference/originals/8f029018-9c70-4715-9012-88a8a9d106b2.webp`, SHA-256 `a0c85982987b15f268c584f93251e2cd8aece1a29064193fc0549fe308393119`. The exact comparison uses 1440×903, device scale 1, full application crop; it excludes only the standard 120px acquisition footer.

The optimized source commit is `d71c3c4355d847867fc04aa1f4b69cb8035aba4d` on `main`, application identity `0a6ca47171b3bbc43f8624e12297759ab11f279b2ba16895bed177d64f7837fa`, QA-tooling identity `6164bae460bbef08f1853a539efd008676a3932091a94f2a84d3848e782e310d`, build `PjyQ3GZpF6in3orwLeWc5`. Chromium `151.0.7922.34` on Windows 11 captured from the local optimized preview at `http://127.0.0.1:6450` on 2026-09-23.

## Readable source/render/residual review

I inspected the complete source, optimized render and difference at readable size. The 12 queue songs, order, labels, durations, artwork, panel placement and surrounding New page/player composition match the direct source. No product content or geometry mismatch remains in this exact fixture. The difference is limited to platform glyph raster and playback/material edges. The diagnostic result is MAE `7.238988`, over-20 `9.662775%`; the screen is accepted on the readable exact-state review, not on those values.

Evidence is under `apple-music-clone/.parity-evidence/full-production-queue-entry-rerun-20260923/comparison/`: `8f029018-9c70-4715-9012-88a8a9d106b2-source.png`, `-render.png` and `-difference.png`. Its rendered SHA-256 `7ee33fbc36e517fcdc20d0538c75cebedb62674e0babcf0564322bc4b7d6c732` matches the preceding optimized candidate.

## Continuous real-control transition remains different

I started the recorded `FLOW-e0a0f93e` at its allowed first fixture, `1f9e170c`, and clicked the visible Up Next player control. The URL remained on the start fixture; no endpoint jump or state injection occurred. The ordered 1440×903 captures and `steps.jsonl` are under `apple-music-clone/.parity-evidence/full-production-queue-entry-rerun-20260923/browser/journeys/e0a0f93e-song-queue-entry/`.

That real transition preserves its starting catalog and opens a 14-track continuation plus an empty tail row. The recorded second still and direct `8f029018` fixture instead show a different discovery snapshot and 12 different queue tracks. No recorded action authorizes replacing the catalog or queue behind Up Next. The registered `recorded-song-queue-entry` regression confirms the visible transition and records the observed rows; it does not claim endpoint parity. `FLOW-e0a0f93e` therefore remains open, independently of the accepted direct screen.

## Verification and ledger result

The optimized rerun captured 164 states, checked all 218 route steps and ran 117 interaction regressions. The new queue-entry regression passed. One unrelated full-run sidebar-scroll timeout was preserved; the exact sidebar case passed on an isolated retry. All 159 exact-size comparisons completed.

Reviewer: Codex agent in this task; this is not an independent review or owner phase-transition approval. Advance `MATCH-8f029018` only. The ledger becomes **UI 159/159, MATCH 95/159, FLOW 26/58**.
