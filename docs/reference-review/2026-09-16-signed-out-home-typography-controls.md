# Signed-out Home typography and guest-player control review

Reviewed locally on 2026-09-16 in `J:\courses/main`, on top of `2de2df92ee920eae5bc048e29c5dc111e2287499`. This is implementation evidence, not clone acceptance. The immutable reference archive was not changed.

## Candidate and environment

- Implementation SHA-256: `161fcb71b0eef5640fc4bc8b9fcb1afff4f89ea3910dd983785eeb16eebdab9c`.
- QA tooling SHA-256: `93e2d205bc23f100bee6d9dfbcef3f5bb644452e395a2e18f98dd55afb3e4aa8`.
- Optimized build: `bQVbWY2TQR3lywm6f6X7P`, served from this checkout on loopback port 6437 and stopped after verification.
- Windows 11 build 26200; Python 3.13.15; Playwright 1.62.0; Chromium 151.0.7922.34; en-SG, Asia/Singapore, reduced motion and device scale 1.
- Final optimized evidence root: `D:\courses-main-evidence\signedout-home-player-20260916-202908\`.
- Readable source/baseline/candidate crops and focused sweeps: `C:\Users\radev\dc-review\aefa8502\`.
- Reviewer: the implementing agent. No independent reviewer or owner acceptance is asserted.

## Defects and active ownership

The signed-out Home frame already had the correct live marketing artwork, one-pixel content edge, glows, seam and guest-only floating-player material. The remaining readable defects were concentrated in lawful Windows text raster and live SVG contours: the centered brand was slightly undersized, the offer copy was too bright, the CTA label was too narrow and light, disabled shuffle/repeat were too faint, previous/play/next were optically undersized, the queue mark was too wide and gray, and the idle Apple mark was vertically short.

The active owner is `app/reference-fidelity.css`, scoped through `.capture-membership` and `.guest-session[data-scene="home"] .floating-player`. Text remains real DOM, the CTA and profile remain accessible buttons, and every player affordance remains a real button/SVG control. `components/music-player.tsx`, `components/music-primitives.tsx` and `components/music-discovery.tsx` continue to own behavior and semantic structure.

## Implemented repair

The live brand now uses 24.75px; offer-copy opacity is 0.76; and the CTA uses a lawful Windows compensation of 14.6px at weight 600 while preserving its measured 143×35 button box. The guest player now uses 20% disabled shuffle/repeat ink, 18px shuffle, 22px previous/next with opposite one-pixel optical shifts, 27px play, and an opaque 14px queue glyph with a one-pixel shift. The idle Apple mark keeps its reviewed 27px box and gains only `scaleY(1.06)` around its center.

The heading was deliberately left unchanged because every tested top/opacity/weight variant increased its exact region residual. The volume mark was also left unchanged: non-uniform scale variants reduced mean error but worsened high-contrast residuals. No proprietary font, captured label, control pixels, screenshot mask or synthetic player tint was introduced.

## Focused readable verification

Within one unchanged browser page, the combined candidate improved the full 1440×904 frame from `1.946265` to `1.922833` MAE and from `1.500200%` to `1.485374%` over-20. The final optimized render is RGB-pixel-identical to the reviewed development frame despite different PNG encoding.

| Region | Previous MAE / over-20 | Candidate MAE / over-20 |
| --- | ---: | ---: |
| CTA | 16.556522 / 21.214365% | 13.661545 / 20.696039% |
| Entire guest player | 2.547905 / 2.068639% | 2.401105 / 1.725444% |
| Player left controls | 3.160093 / 5.486111% | 2.677778 / 4.041667% |
| Player center | 4.147222 / 2.861111% | 3.999722 / 2.333333% |
| Player right controls | 6.193333 / 9.281250% | 5.506250 / 8.593750% |
| Brand | 7.121242 / 11.484594% | 6.937488 / 11.274510% |
| Offer copy | 11.189164 / 19.034483% | 10.958746 / 19.018809% |

Readable source/render/difference review confirms that artwork, geometry, button ownership and responsive containment remain intact. The candidate moves the CTA and live controls toward the source without hiding the remaining text and symbol contours.

## Real-control and responsive verification

The focused live-control run passed profile Sign In and Try It Free dialog entry, Escape close and focus return; shuffle and repeat toggles; volume open/Escape/focus return; Up Next open/close; and play/pause continuity with the real `stupid song` now-playing state. It also passed 1264×700, 1024×768, 820×900 and 390×844 with the CTA visible, the floating player contained and no horizontal overflow. There were no console errors, failed requests or bad responses.

The registered optimized corpus independently passed the official `signed-out-home-controls` regression and all other suites.

## Full optimized corpus

Archive integrity, checklist coverage, typecheck, the optimized production build, five Python QA-tool tests and nine Node cover-integrity tests passed. The final optimized corpus passed **164 rendered states** (159 desktop plus five responsive), **218 route checks** and **65 interaction regressions**, with zero failures.

All **159 exact-size comparisons** completed with zero functional failures. Against the immediately preceding optimized corpus:

- corpus mean MAE changed `5.309224 → 5.309077` (`-0.000147`);
- mean over-20 residual changed `5.379484% → 5.379391%` (`-0.000093` percentage points);
- `aefa8502` changed `1.946265 → 1.922833` MAE and `1.500200% → 1.485374%` over-20;
- the other 158 exact-size states retained zero metric delta, so no numerical regression was introduced.

Evidence includes `verification-summary.json`, `browser/results.json`, `comparison/metrics.json`, `comparison/index.html` and the complete source/render/difference gallery under the evidence root.

## Remaining visible blockers

The frame still exposes lawful Windows raster differences in the brand, heading, offer copy, CTA and sidebar text. CTA antialiasing is closer but not exact. The volume contour and smaller player/sidebar symbol contours remain readable in the amplified difference. Those are concrete blockers, so the screen is not accepted as MATCH.

## Acceptance boundary

No screenshot is used as a page, no text/button/player pixels are pasted into artwork, no threshold was relaxed and no direct state injection is presented as a flow. The signed-out Home frame is materially closer and regression-covered, but the blockers above remain visible. **UI remains 159/159, MATCH remains 0/159 and FLOW remains 0/58.**
