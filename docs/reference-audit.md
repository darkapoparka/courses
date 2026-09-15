# Reference audit — findings, not acceptance

Updated 2026-09-15 for the verified sidebar-material and signed-out Home repair. [Handoff](handoff.md) owns source, server and publication state; acceptance remains solely in [tasks](tasks.md).

## Latest sidebar-material findings

The ordinary sidebar regression was not caused by a lyrics/queue panel selector or carousel-underlay leakage. Computed styles, real-control panel toggles and Git history identified the active owner as the generic base `.music-sidebar` rule in `app/globals.css`: its flat `#fafafa` surface, weak 5% / 22px shadow and generic active row made the left navigation insufficiently separated after the right panel received distinct glass.

The base ordinary surface now uses the reviewed neutral material, inset edge, broader shadow and measured active row. Alpha and Home retain their state-specific artwork-driven glass, and the dark concert sidebar is pixel-identical to the preceding candidate. Panel opening, closing and reopening cannot mutate unrelated sidebar material; no source-specific colour compensation or captured interface pixels were introduced.

Signed-out Home separately restores the compact icon-only sign-in profile control instead of the unrelated red text pill, and uses a measured 50% warm translucent player over the real red page. The control opens the real sign-in dialog, closes with Escape and returns focus. Its source artwork remains pixel-identical.

Fresh optimized verification passed 159 desktop states, five responsive samples, 218 route checks and 60 interaction regressions, zero failures. All 159 exact-size comparisons completed with zero functional failures. Signed-out Home improved 7.223298% → 4.405267% over-20 and 5.325646 → 3.424772 MAE. Ordinary `e72be564`, `a917d88f` and `1f9e170c` whole-frame MAE each fell by about 0.29. Readable review of every largest positive threshold delta found no visual regression; those changes were confined to sub-pixel crossings around the corrected edge/shadow.

The [dated review](reference-review/2026-09-15-sidebar-material-repair.md) records exact hashes, active selectors, measurements, focused journeys, full-corpus review and evidence paths. [Latest metrics](reference-review/latest-metrics.json) points to this candidate. Typography, player/control geometry, lower shelves/artwork, signed-out marketing glows and the unsupported lyrics/queue endpoint snapshot changes keep MATCH/FLOW open.

## Previous lyrics and queue first-entry findings — historical

The real-control transitions `1f9e170c → ee8db412` and `1f9e170c → 8f029018` apply panel/player glass from the live open-panel state instead of endpoint-only catalog labels. Lyrics use the measured 191px panel anchor. Closing and reopening through the same controls reproduces byte-identical panel material while preserving the current catalog, Top 100 shelves, sidebar, artwork, active `stupid song` track and eleven-row current queue.

The immutable endpoint stills nevertheless contain unrelated discovery, library and queue snapshots. No recorded intermediate step authorizes replacing those domains behind a lyrics or Up Next toggle. The current optimized run reconfirms deterministic close/reopen at 36.520087% over-20 for lyrics and 34.702996% for queue; the journeys remain deliberately different from the direct fixtures rather than manufacturing endpoint parity. The [dated review](reference-review/2026-09-15-lyrics-queue-first-entry.md) preserves the original continuity checkpoint.

## Previous Alpha material and continuation findings — historical

The direct Alpha fixture and continuous New→Alpha journey share one live feature sequence. Clean reviewed Viral Hits provider artwork sits beneath real translucent sidebar glass instead of a compensating magenta gradient. The frozen New Music Daily continuation is represented by a real provider-backed card and enabled Next control. Artwork-only source fragments reconstruct visible predecessor and continuation boundaries while excluding captured arrows.

The current sidebar checkpoint reconfirms that this underlay remains state-owned: direct `54b01eab` improves 7.892134% → 7.881983% and its sidebar edge MAE 4.815290 → 3.974644. Typography, exact material/control geometry, lower artwork and the known live profile/title snapshot remain open. The [Alpha review](reference-review/2026-09-15-alpha-material-continuation.md) preserves its original evidence.

## Previous Alpha predecessor findings — historical

The preceding checkpoint unified the direct and continuous feature sequence and reconstructed the narrow Viral Hits predecessor boundary from three artwork-only regions. It reduced direct Alpha to 9.066461%, continuous Alpha to 9.915329%, and the live/direct gap to 0.977375%. The [predecessor review](reference-review/2026-09-14-alpha-edge.md) preserves that evidence.

## Previous subscription and thumbnail findings — historical

Native Viral Hits crops, clean Shabang hover behavior, subscription wording/spacing and cancellation dialog material were corrected. The live success acknowledgement retains prior details beneath it until Done. Full optimized verification passed 159 desktop states, five responsive samples, 218 route checks and 59 interaction regressions, zero failures. The [dated review](reference-review/2026-09-13-subscription-artwork.md) records the remaining exceptions. No MATCH/FLOW acceptance was granted.

## Previous main discovery and player findings — historical

Implementation `5929190` transferred the preserved preview into `J:\courses/main`. Native New shelf dimensions, captions, Coming Soon badges, clean City Charts fragments, panel release coordinates and wide legacy release artwork were corrected. The optimized run passed 159 desktop captures, five responsive samples, 218 route checks and 57 interaction regressions, zero failures; 29 residuals fell and none rose. [The dated review](reference-review/2026-09-13-main-discovery-artwork.md) preserves exact identities and counter-evidence.

The first-entry lyrics/queue material and deterministic close/reopen behavior are repaired. The underlying endpoint catalog/account/library/queue snapshot differences remain unsupported as live transitions. Full covers/metadata, middle City Charts art, typography/icons and material details still require implementation.

## Previous verified Home artwork and controls — historical

Implementation `4c8840a` preserves native Windows scrolling, renders station artwork beneath real glass, and fixes Home Next/Previous boundaries at 1440, 1264, 1024 and 768px. The current sidebar checkpoint reconfirms that Home underlay remains real artwork-driven glass and improves direct `d5173715` 5.936308% → 5.914467%. The [dated Home review](reference-review/2026-09-12-home-artwork-controls.md) and [preceding sidebar review](reference-review/2026-09-12-sidebar-live.md) preserve exact evidence. No FLOW was accepted.

## Open discrepancy classes

| Class | Evidence and required response |
| --- | --- |
| Wrong or partial artwork | Inspect exact original, edition, crop, adjacent shelf and provider integrity. Do not replace content mistakes with gradients or sampled interface pixels. Alpha's immediate continuation is repaired; lower releases and City Chart artwork remain partial. |
| Live versus fixture state | New→Alpha retains a known profile/title difference. First-entry lyrics/queue preserve and assert their live session, but their saved endpoint stills contain unrelated catalog/library/queue snapshots. Model only source-supported transitions; never reset unrelated state behind a control to imitate a still. |
| Sidebar state ownership | Ordinary, Alpha/Home underlay and dark concert now have separate measured owners. Preserve that separation when changing shared shell material; panel-open selectors must not mutate the left sidebar. |
| Shared material and geometry | Preserve hit targets, containment, scroll, optimized blur and the repaired ordinary edge while refining exact colour distribution and alignment. Do not restore removed compensation gradients. |
| Typography and symbols | Windows captures sampled Arial in Chromium's actual platform-font data. A CSS SF Pro name is not proof of rendering. Match geometry lawfully without distributing proprietary fonts. |
| Player and panels | Signed-out Home opacity and first-entry panel determinism are repaired. Artwork, control/icon geometry, lyric fade/blur, queue rows and source-snapshot discontinuities remain separate checks. |
| Whole-flow and motion review | A carousel segment or deterministic two-step control is not automatic FLOW acceptance. Review every recorded intermediate state and applicable motion asset before sign-off. |

## Evidence interpretation

The standard corpus uses 147 application viewports at 1440×903 and 12 at 1440×904. Exclude only the documented 120px acquisition footer. Preserve originals; do not resize candidates, omit difficult screens, mask product regions or loosen thresholds.

The numerical gallery ranks residuals; it does not replace readable whole-frame review. A shared change needs full-corpus regression inspection, including worsened states, not selected before/after crops. Tiny threshold crossings around a corrected edge are reported but are not automatically visual regressions; the source, render, amplified difference and before/after candidate must be read together.

A continuous journey starts at its permitted first fixture and then uses real controls. URL jumps, injected state and forced clicks are not acceptance evidence. Retain both direct-fixture and continuous-state comparisons with ordered non-overwriting captures.

## Current acceptance boundary

The preserved checklist reports UI 159/159, MATCH 0/159 and FLOW 0/58. No acceptance is inferred from these findings. Where rights, unavailable recordings or differing snapshots prevent a justified exact claim, record the precise discrepancy and evidence. Do not invent approval or silently redefine 1:1.

Earlier detailed observations remain in [library controls](reference-review/2026-09-12-library-controls.md), [library panels](reference-review/2026-09-12-library-panels.md), [sidebar geometry](reference-review/2026-09-12-sidebar.md), [the source ledger](reference-review/ledger.md), and the [pre-Astra audit](history/pre-astra-2026-09-12/docs/reference-audit.md).
