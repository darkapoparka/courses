# Library controls and cover integrity review — 2026-09-12

## Bounded implementation, not clone acceptance

This pass continued the existing main checkout and preserved the earlier album/library/panel work. `browser_library_controls.py` is registered in the canonical runner and adds four cases: recorded song sorting, recorded song pinning, recorded library editing, and ordinary-navigation preference persistence. The eight previously registered library journeys remain intact.

The actual Songs sort control had opened its menu 12px too far right and 20px too low. The actual song overflow menu was approximately 156px too far left and 25px too low. Both now anchor to their real controls at the measured desktop coordinates, with existing narrow-viewport clamping retained. Pin-menu coordinates are rounded to prevent the fractional live anchor from diverging from the direct fixture.

The library menu uses corrected width/type sizing and locally drawn action glyphs. Hovering a song row reveals its play indicator without treating a menu's selected target as currently playing. Pointer-dismissed row controls no longer remain painted simply because the opener retains focus; keyboard-visible focus is preserved. The Pins heading uses an upright symbol. Hovering Library reveals its own neutral-colour Edit action rather than every section action, including the unrelated playlist plus control.

All actions use normal DOM controls. Sorting changes the actual row order. Pin/unpin does not alter song favourites. Hidden library sections, sorting and pins persist after ordinary-navigation reload. Fixture previews intentionally retain their existing isolated-storage contract.

## Continuous journeys and the source discontinuity

Sorting exercises all three recorded stills from `92589389` through `09b3600e` to `1d016f0f`. It additionally verifies keyboard opening, radio-item focus, End, Escape and focus restoration. Pinning exercises all four recorded stills, including actual row hover, menu opening and the resulting Pins section, then checks unpin/favourite isolation.

The five library-editor states are exercised continuously from `e72be564`, not by jumping fixture URLs. However, the saved sequence itself changes catalog/account/library snapshots between its first and second images. The first original shows Top 100: Singapore / No Sleep In Paradise, an unnamed avatar and only All Playlists. The second shows Superbloom / the Planet Her editorial card, SmithAlex and saved playlist entries. Hovering Library is not a legitimate action for replacing those session values.

The live journey deliberately preserves the starting snapshot, and the test now asserts that editing does not replace the catalog or playlist state. Before the final scoped-hover refinement, its later full-frame source/live residuals were approximately 34.40–34.88%, versus approximately 29.04–30.89% live/direct residuals. These are substantial unresolved source-scenario differences, not a completed visually faithful flow. Do not manufacture a catalog refresh behind the hover or Edit button to erase them.

## CI cover failure: exact image data, variable provider comment

The actual GitHub runs for `9b9340b` and diagnostic commit `0f81da5` failed because the four clean-cover responses failed whole-file hashes, causing preview HTTP 503 responses. The diagnostic workflow run was `34675163770`; its retained artifact exposed the provider bytes rather than treating the failure as a screenshot mismatch.

Comparing that artifact with Windows responses established that all four WebPs have identical image payloads, dimensions, ICC colour profiles and decoded RGBA data. Only a 26-byte EXIF UserComment identifier differs. Replacing just those 26 local bytes with the observed CI identifier reproduces the actual CI file SHA-256 exactly. The proof hashes and byte-equivalent local samples remain in the ignored evidence directory; no provider image was added to Git.

`lib/cover-integrity.mjs` retains the original full-file hash and adds a narrowly defined content hash. It accepts only the exact reviewed RIFF size, exact EXIF structure and a 26-character uppercase base32 identifier, zeroing that identifier in a copy for hashing. Every other byte remains pinned. The original response bytes are served unchanged. This does not mask image regions, strip arbitrary EXIF, allow orientation changes, alter pixels, or weaken the 159-screen comparison.

Nine synthetic Node tests cover the original encoding, non-mutating validation, identifier-only variation, changed image payloads, changed ICC profiles, EXIF orientation changes, invalid identifiers, RIFF-length changes, truncated/appended data and unapproved content digests. The browser test independently pins all bytes outside the reviewed comment and retains status/header/unknown-resource checks. The workflow runs these tests and retains provider diagnostics on failure.

All four original encodings and the four exact-CI-hash byte-equivalent samples pass the new guard. This local evidence is separate from the GitHub result for the eventual implementation commit; consult the current handoff for the observed remote run.

## Evidence and remaining visual defects

The local evidence root is `apple-music-clone/.parity-evidence/controls-20260912-074455/`. Earlier runs remain unchanged: `before/` records the initial failing anchors; `after-anchors/` preserves the intermediate selector failure; `after-refinement/` verifies the initial four library cases; `production-controls/` and `production-integrity/` are separate complete production candidates, not the final scoped-hover candidate.

`cover-integrity-review.json` records the original/CI/content/pixel/profile hashes. `journey-controls-metrics.json` records all twelve continuous library checkpoints for the earlier candidate, including the large editor snapshot discrepancy. Readable source/render/difference details for `e379e3fe`, `ffc18eb8` and `3884ff64` supplement, but never replace, the unmasked full-frame comparison gallery.

Visual review still shows mismatched actual font metrics, menu shadows and some icon strokes, sidebar/editor label alignment, the Made for You footer divider, player controls/material and incomplete release artwork. The 904px library/editor states regressed slightly under the combined parallel sidebar changes; that counter-evidence is retained, not concealed by successful interaction tests. `reference-review/2026-09-12-sidebar.md` records that independently developed batch.

Acceptance remains **UI 159/159; MATCH 0/159; complete recorded FLOW 0/58**. No checkbox advances merely because a route, real-control assertion, image hash or CI check passes.

## Final verified candidate

Implementation commit: `05ee6ecaf7e51419f19906b702cc60de9a6fb08b`, following and preserving the parallel sidebar commit `46f9c15`. The application and QA identities match the committed working-tree bytes:

- Implementation SHA-256: `85a2b90d3f1aca0dc82a722767985147cfed75b77f4935ee2c73b85206cb7a6b`.
- QA tooling SHA-256: `6e7a66c8966f9f96120968cdc5014ce84fd2679d1379c0b959155b8f353e1db4`.
- Production build ID: `qfGfPJvufP7yySm1lSZTJ`; verified port-6432 listener PID 22728, started after the stable build at machine-local 08:43:35.

The final production run passed 159 desktop captures, five responsive samples, 218 route checks and 48 interaction regressions with zero failures. Both source hashes stayed unchanged throughout. The last focused development run passed eight targeted library/cover/player checks. Typecheck, optimized build, archive/task checks, five Python QA tests and nine Node integrity tests passed.

Final evidence: `production-final/results.json`, `production-final-comparison/index.html` and `metrics.json`, plus `production-final-journey-comparison/index.html` and `metrics.json`, under the evidence root above. The latter compares all twelve continuous sorting/pinning/editor checkpoints with both their originals and direct fixtures. Its gallery links the full application frames and unmasked amplified differences.

After rounding the live pin-menu anchor, the seven sorting/pinning checkpoints have zero pixels exceeding a 20-channel difference against their direct fixtures. Some still have lower-intensity pixel differences; this is not a statement of pixel identity or original-image acceptance. Original/live residuals remain approximately 2.27–2.55%. The editor's later original/live residuals remain 34.39–34.86%, and direct/live residuals 29.03–30.89%, because the catalog/account snapshot discontinuity is preserved honestly.

Against the preceding full Windows baseline, the final combined candidate has 105 lower, two unchanged and 52 higher over-20 residuals. The largest increases remain Made for You `e379e3fe` (+0.06499 percentage points), editor `ffc18eb8` (+0.05654) and `3728aa07` (+0.05539). Scrolled Home `d5173715` rises by 0.03099 points even though its mean absolute error improves. The source/render/difference review does not support dismissing those regressions or checking MATCH/FLOW.

The user's development listener remains on port 6431, PID 6880. Port 3000 belongs to `K:\justfit` and was not touched. Generated evidence, fetched/reconstructed covers, dependency caches, build output and the frozen reference archive were not staged.
