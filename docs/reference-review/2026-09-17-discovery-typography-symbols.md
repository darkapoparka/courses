# Discovery typography and live-symbol review

Reviewed locally on 2026-09-17 in `J:\courses/main`, on top of `8d8fa3769a8fd8d6bb866b2311be137f084521a3`. This is implementation evidence, not clone acceptance. The immutable reference archive was not changed.

## Candidate and environment

- Implementation SHA-256: `7a1d1b130025bd32bb7e4c2281b15fc4b54942028556462747a492db4ee291c9`.
- QA tooling SHA-256: `da997151082fbcde2c2c4e258c00685e34e2545fdb5a0e066a1ce8200d67d1e7`.
- Optimized build: `qX-R8M-kpo89ddKw02fdx`, served from this checkout on loopback port 6437 and stopped after verification.
- Windows 11 build 26200; Python 3.13.15; Playwright 1.62.0; Chromium 151.0.7922.34; en-SG, Asia/Singapore, reduced motion and device scale 1.
- Final evidence root: `D:\courses-main-evidence\shared-typography-20260917-013440\`.
- Readable development review and focused sweeps: `C:\Users\radev\dc-review\shared-batch-20260916\`.
- Reviewer: the implementing agent. No independent reviewer or owner acceptance is asserted.

## Defects and active ownership

The shared New family still rendered several lawful Windows text contours too wide, low or light: the `New` heading, English feature-card kicker/title/subtitle, the viral-section heading, the Viral Chart heading, and the first Home section heading. The viral-section title also embedded the text character `☆`, which produced the wrong contour and optical spacing compared with the saved live star symbol.

The active owners are `app/reference-fidelity.css`, `components/music-discovery.tsx` and `components/music-primitives.tsx`. `NewView` owns the discovery structure, while `Section` owns the reusable heading/button composition. The chart remains the real `music-chart-schedule.tsx` implementation; no captured heading, text or control pixels were introduced.

## Implemented repair

`Section` now composes optional live `Glyph` content and a real `.section-title-text` span instead of embedding `☆` in the visible string. The viral heading uses the existing star SVG, remains a real button, and still navigates to the real Viral Chart. The chart heading continues to use its live SVG, with scoped size, stroke and optical alignment.

English discovery headings and feature captions use measured Windows compensation for size, width, vertical scale, colour and optical offset. The first Home section title receives a smaller scoped width/offset correction. These selectors are limited to English New/Home and the viral/chart owners; signed-out Home, localized discovery, unrelated sections and controls retain their own reviewed rules.

No proprietary font, captured text, rasterized control, screenshot mask, synthetic artwork tint or invisible hit target was introduced. The headings, captions and navigation remain live DOM; the stars remain live SVG; and the same controls retain hover, keyboard and focus behavior.

## Focused readable and real-control verification

Readable source/baseline/candidate/difference composites were reviewed for `e72be564`, `1f9e170c`, `8a234785` and `a917d88f`, plus a 23-screen discovery contact sheet and six-screen Home family review. Focused parameter sweeps covered New heading geometry, feature kicker/title/subtitle, viral star/title, chart heading and Home section title.

The registered `discovery-typography-symbols` browser case starts at `e72be564`, verifies the computed text/SVG geometry, opens Viral Chart through the real viral-heading control, returns through the real New navigation control, then opens Home through the real Home control. It preserves eight ordered, non-overwriting captures and `steps.jsonl`; no forced click, state injection or fixture jump is presented as the journey.

The focused case passed against the development preview. The final optimized pixels for `e72be564`, `1f9e170c`, `8a234785` and `a917d88f` are byte-identical to the reviewed development candidates.

## Exact optimized measurements

Against the immediately preceding signed-out Home checkpoint:

- Viral Chart `8a234785` improved from `4.399940` to `3.865631` MAE and from `3.885582%` to `3.643103%` over-20.
- Initial New `e72be564` improved from `4.319364` to `4.113135` MAE and from `4.819506%` to `4.724529%` over-20.
- Playing New `1f9e170c` improved from `4.533112` to `4.282184` MAE and from `5.175341%` to `5.058755%` over-20.
- Named-profile Home `a917d88f` improved from `3.877053` to `3.833119` MAE and from `4.030393%` to `4.012551%` over-20.
- The 23-screen discovery family had 21 MAE improvements, two unchanged states and no worsened state in the focused development capture.
- The six-screen Home family had four improvements, two unchanged states and no worsened state.

The full optimized corpus mean changed from `5.309077` to `5.263068` MAE and from `5.379391%` to `5.353294%` over-20. Forty-six states improved in MAE and 105 were byte-identical to the baseline. Eight states had tiny numerical increases; direct baseline-to-candidate inspection found a maximum channel delta of exactly one, zero pixels over two, and zero pixels over twenty in every one. Their readable contact sheet exposes no concrete artwork, geometry, copy, state or control regression.

## Full optimized corpus

Archive integrity, checklist coverage, typecheck, optimized build, five Python QA-tool tests and nine Node cover-integrity tests passed. The final optimized run passed **164 rendered states** (159 desktop plus five responsive), **218 route checks** and **66 interaction regressions**, with zero failures.

All **159 exact-size comparisons** completed with zero functional failures. Evidence includes `verification-summary.json`, `browser/results.json`, `comparison/metrics.json`, `comparison/index.html`, `delta-summary.json`, the complete source/render/difference gallery and the readable worsened-state review under the evidence root.

## Remaining visible blockers

The corrected typography and live stars are materially closer, but the reviewed screens remain visibly incomplete. Initial/playing New still expose sidebar/type raster differences, exact feature and shelf metadata, artwork-edition/crop differences, song-row text and symbol contours, lower-shelf content, and substantial floating-player residual. Viral Chart still exposes lawful title raster, table typography, row copy/artwork and player differences. Home still exposes card/caption editions, lower shelves, sidebar raster and player differences.

The change also improves shared discovery text in lyrics/queue and authentication states because those live states legitimately reuse the same owners. This does not resolve their separate panel, queue, account, catalog or flow discrepancies.

## Acceptance boundary

No screenshot is used as a page, no text/control pixels are pasted into artwork, no threshold was relaxed, and no direct endpoint sequence is presented as a recorded flow. The corrected families are closer and fully regression-covered, but the concrete blockers above remain readable. **UI remains 159/159, MATCH remains 0/159 and FLOW remains 0/58.**
