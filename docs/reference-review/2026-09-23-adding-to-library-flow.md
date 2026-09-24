# Expanded-player menu and Add to Library acceptance — 2026-09-23

## Candidate and scope

This review accepts `MATCH-96711b04` and `FLOW-80cc296e`, and reconfirms that the shared positioning change does not regress accepted `MATCH-ac05c6b8`. It does not accept the first screen `b3f29b6f`, whose MATCH remains open.

The optimized candidate is source commit `d71c3c4355d847867fc04aa1f4b69cb8035aba4d` on `main`, application identity `d83a210ebdd92e8da351c0f6c4cd6c2b38c3e74d0b2d7ed96d485ab630abd59c`, QA identity `c04631d37bdcbdec75a09b2a3d5d26d794509a2dfb1062dc06c23029416bde34`, build `y8psSBmvFr0vt3L87eX5J`, and Chromium `151.0.7922.34` on Windows 11. Evidence root: `apple-music-clone/.parity-evidence/full-production-stable-art-add-library-20260923`. The optimized candidate served from the active checkout at `http://127.0.0.1:6446` with local reference-preview mode. Canonical images and the recorded-flow captures use exact `1440×903` desktop viewports. The full run passed 164 screen captures (159 desktop and five responsive samples), 218 route checks, all 116 registered interactions and all 159 source/render comparisons with zero failures. Candidate and post-capture identities match.

## Expanded menu screen review

I compared the immutable source, the production render and the readable 4× residual for `96711b04-1b3e-4b9d-acbc-f84a3ee05b47`. The candidate originally set the menu's left edge at the More button center (`x=591`); the source menu begins at approximately `x=587`. The shared expanded-track placement now shifts that anchor left four CSS pixels. Production computed position is `x=587`, and the reviewed source and render align at the menu edge.

The in-library menu shows Pin Song and Delete from Library in the correct order, retains the remaining track actions, and stays anchored above the More control. The album crop, lyric column, player position and controls align. The residual shows small glyph and text raster differences and playback-owned pixels; review found no remaining product mismatch in this screen. The 1440×903 diagnostic metric is MAE `7.458890`, over-20 `6.177864%`, compared with the pre-correction run's MAE `7.683591`, over-20 `6.435031%`. These numbers are diagnostic only. The adjacent accepted `ac05c6b8` state was reviewed in the same source/render/residual gallery and its menu remains aligned after the shared correction.

## Recorded journey

The complete sequence `b3f29b6f → ac05c6b8 → 96711b04` was traversed in the registered `recorded-adding-to-library` journey using real controls. Starting from the allowed captured player state at `0:54`, I clicked Pause and Play to resume the silent local preview, waited for the visible progress control to reach `1:13`, opened More, and selected Add to Library. The open menu changed to Delete from Library and exposed Pin Song while playback reached `1:21`. The run asserted the visible state transition and that the journey issued no non-GET request. It used no account, payment or streaming service.

The recorded captures are `browser/journeys/80cc296e-adding-to-library/01-b3f29b6f-5884-493c-bbc2-54f25620d5fb.png`, `02-ac05c6b8-9970-422b-bbc1-3aaff880946c.png`, and `03-96711b04-1b3e-4b9d-acbc-f84a3ee05b47.png`, each at `1440×903`. Their `steps.jsonl` preserves the real action, URL, viewport, source hash and render hash for every step. The final state uses the source hash `6fc5026e92383165dab3c09f17a98be3e0014e668ec2aef3f29ee406ce90bc48`; all source IDs and hashes match the immutable archive.

The live checklist is now UI `159/159`, MATCH `93/159`, FLOW `26/58`. The flow acceptance and the endpoint screen acceptance are recorded separately in `docs/tasks.md`.
