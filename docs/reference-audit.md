# Reference audit — findings, not acceptance

Updated 2026-09-12 for the Astra documentation transition. This document summarizes existing evidence; no new visual audit was performed during the disconnected documentation session. The candidate and evidence details belong in [handoff](handoff.md), while acceptance remains solely in [tasks](tasks.md).

## What the prior verified candidate established

At implementation `a30a9ee`, the live sidebar/carousel repair survived real controls clearing the fixture hint. Material follows carousel/visibility state; the selected row is translucent, Previous is reachable in the gutter, native snap padding repairs the 1264px return, and offscreen artwork no longer leaves its tint behind. Optimized production has an exact computed blur/saturation assertion.

The recorded run passed 159 desktop captures, five responsive samples, 218 route checks and 51 interaction regressions. All 159 comparisons completed: Alpha's over-20 residual decreased from 9.8659% to 9.6403%; the other 158 over-20 results were unchanged. These diagnostics do not mean that all pixels match. The [dated sidebar-live review](reference-review/2026-09-12-sidebar-live.md) preserves scope, failures and candidate hashes.

## Open discrepancy classes

| Class | Evidence and required response |
| --- | --- |
| Wrong or partial artwork | Inspect exact original, edition, crop, previous/next shelf and provider integrity. Do not replace content mistakes with gradients or sampled interface pixels. |
| Live versus fixture state | The recorded New Alpha journey remained 1.8698% over-threshold different from its direct fixture. First-entry library/lyrics/queue journeys have older unresolved catalog/account/library snapshot mismatches. Model legitimate transitions; never reset unrelated state behind a control to imitate a later still. |
| Shared material and geometry | Preserve live-state tint removal, hit targets, containment, scroll and optimized blur behavior while refining synthetic glass distribution and alignment. |
| Typography and symbols | The earlier Windows captures sampled Arial in Chromium's actual platform-font data. A CSS SF Pro name is not proof of rendering. Record environment limits and match lawful typography/icon geometry without distributing proprietary fonts. |
| Player and panels | Artwork, text, arrow material, lyric treatment and first-entry versus reopened-panel behavior remain distinct checks. |
| Whole-flow and motion review | A Home carousel segment is not the full six-step flow. Review all recorded intermediate states and applicable available motion assets before signing off. |

## Evidence interpretation

The standard corpus uses 147 application viewports at 1440 by 903 and 12 at 1440 by 904. Exclude only the documented 120px acquisition footer. Preserve originals; do not resize candidates to fit, omit difficult screens, mask product regions or loosen thresholds to produce green results.

The full numerical gallery ranks residuals; it does not replace readable whole-screen review. Crops help diagnosis only after checking the complete state. A shared change needs full-corpus regression inspection, including worsened states, not selected before/after improvements.

A continuous journey starts at the permitted first fixture and then uses real controls. URL jumps, injected state and forced clicks are not acceptance evidence. Direct fixture comparisons and continuous-state comparisons should both be retained, with ordered non-overwriting screenshots.

## Current acceptance boundary

The preserved checklist reports UI 159/159, MATCH 0/159 and FLOW 0/58. This rewrite grants no new acceptance. Where rights, unavailable recordings or differing reference snapshots prevent a justified exact claim, record the precise discrepancy and evidence. Do not invent an approval or silently redefine 1:1; an explicit owner decision is required for any changed acceptance scope.

Earlier detailed observations remain in [library controls](reference-review/2026-09-12-library-controls.md), [library panels](reference-review/2026-09-12-library-panels.md), [sidebar geometry](reference-review/2026-09-12-sidebar.md), [the source ledger](reference-review/ledger.md), and the [pre-Astra audit](history/pre-astra-2026-09-12/docs/reference-audit.md).
