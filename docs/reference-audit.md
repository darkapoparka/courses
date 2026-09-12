# Reference audit — findings, not acceptance

Updated 2026-09-13 after main implementation `5929190`. [Handoff](handoff.md) owns source, server and publication state; acceptance remains solely in [tasks](tasks.md).

## Latest main discovery and player findings

Implementation `5929190` completes the preserved-preview transfer into `J:\courses` on main. Native New shelf dimensions, caption positions, Coming Soon badges, clean City Charts fragments, panel release coordinates and wide legacy release artwork were corrected. Alpha/player and library-editor material now follow actual controls rather than fixture IDs. Legacy artwork persists through Volume; closing/reopening lyrics does not import captured panel UI into a cover.

The final optimized run passed 159 desktop captures, five responsive samples, 218 route checks and 57 interaction regressions, zero failures. Typecheck/build/archive/coverage, five Python and nine Node tests passed. All 159 comparisons completed: 29 lower over-20 residuals, 130 unchanged, zero higher. Essentials/City Charts improved 10.078058% to 5.507490%; Coming Soon 5.597315% to 3.891042%; legacy New 8.023102% to 6.034207%.

[The dated main review](reference-review/2026-09-13-main-discovery-artwork.md) records exact identities, readable inspections, intermediate failures, the tiny Replay MAE increase, and continuous counter-evidence. [Latest metrics](reference-review/latest-metrics.json) is the final full-corpus report. The first production attempt had seven threshold increases; it was retained and followed by further artwork fixes, not silently promoted to the final candidate.

Live New-to-Alpha remains 10.639766% different from its original and 1.880460% from its direct fixture. First-entry library/lyrics/queue snapshot differences remain unresolved. Corrected legacy fixtures do not justify changing a live session behind a toggle. Full covers/metadata, middle City Charts art, right-edge continuation cards, Alpha underlay, typography/icons and material details still require implementation. No MATCH/FLOW approvals were granted.

## Previous verified Home artwork and controls — historical

Implementation `4c8840a` preserves native Windows scrolling, renders station artwork beneath real glass, and fixes Home Next/Previous boundaries at 1440, 1264, 1024 and 768px. The live sidebar/state repairs from `a30a9ee` and exact optimized blur assertions remain in place.

Its recorded optimized production run passed 159 desktop captures, five responsive samples, 218 route checks and 52 interaction regressions. All 159 comparisons completed: Home d5173715 improved from 6.079811% to 5.936308% over-20 pixels; Alpha from 9.640319% to 9.638858%; 157 unchanged and none worse at that desktop threshold. The [dated Home review](reference-review/2026-09-12-home-artwork-controls.md) preserves exact source/build hashes, observations, failures and storage locations. The [preceding sidebar review](reference-review/2026-09-12-sidebar-live.md) remains historical evidence.

Continuous Home and its direct scrolled fixture agree exactly, but both differ from the original. Live New to Alpha remains 10.697290% different from its original and 1.875461% from its direct fixture; the latter is slightly higher than the earlier 1.8698%. Desktop corpus improvements do not certify continuous-state fidelity.

## Open discrepancy classes

| Class | Evidence and required response |
| --- | --- |
| Wrong or partial artwork | Inspect exact original, edition, crop, previous/next shelf and provider integrity. Do not replace content mistakes with gradients or sampled interface pixels. |
| Live versus fixture state | The recorded New Alpha journey remains 1.875461% over-threshold different from its direct fixture at `4c8840a`. First-entry library/lyrics/queue journeys have older unresolved catalog/account/library snapshot mismatches. Model legitimate transitions; never reset unrelated state behind a control to imitate a later still. |
| Shared material and geometry | Preserve live-state tint removal, hit targets, containment, scroll and optimized blur behavior while refining remaining artwork, material and alignment residuals; do not restore the removed Home compensation gradients. |
| Typography and symbols | The earlier Windows captures sampled Arial in Chromium's actual platform-font data. A CSS SF Pro name is not proof of rendering. Record environment limits and match lawful typography/icon geometry without distributing proprietary fonts. |
| Player and panels | Artwork, text, arrow material, lyric treatment and first-entry versus reopened-panel behavior remain distinct checks. |
| Whole-flow and motion review | A Home carousel segment is not the full six-step flow. Review all recorded intermediate states and applicable available motion assets before signing off. |

## Evidence interpretation

The standard corpus uses 147 application viewports at 1440 by 903 and 12 at 1440 by 904. Exclude only the documented 120px acquisition footer. Preserve originals; do not resize candidates to fit, omit difficult screens, mask product regions or loosen thresholds to produce green results.

The full numerical gallery ranks residuals; it does not replace readable whole-screen review. Crops help diagnosis only after checking the complete state. A shared change needs full-corpus regression inspection, including worsened states, not selected before/after improvements.

A continuous journey starts at the permitted first fixture and then uses real controls. URL jumps, injected state and forced clicks are not acceptance evidence. Direct fixture comparisons and continuous-state comparisons should both be retained, with ordered non-overwriting screenshots.

## Current acceptance boundary

The preserved checklist reports UI 159/159, MATCH 0/159 and FLOW 0/58. No new acceptance is inferred from these historical observations. Where rights, unavailable recordings or differing reference snapshots prevent a justified exact claim, record the precise discrepancy and evidence. Do not invent an approval or silently redefine 1:1; an explicit owner decision is required for any changed acceptance scope.

Earlier detailed observations remain in [library controls](reference-review/2026-09-12-library-controls.md), [library panels](reference-review/2026-09-12-library-panels.md), [sidebar geometry](reference-review/2026-09-12-sidebar.md), [the source ledger](reference-review/ledger.md), and the [pre-Astra audit](history/pre-astra-2026-09-12/docs/reference-audit.md).
