# Reference audit — findings, not acceptance

Updated 2026-09-17 for the verified All Playlists screen match. [Handoff](handoff.md) owns source, server and publication state; acceptance remains solely in [tasks](tasks.md).

## Latest All Playlists screen-match findings

The immutable All Playlists frame contains two live playlist cards, no sort control and a small red star after `Favourite Songs`. The implementation now owns those facts through `components/music-library.tsx`, `components/music-browse.tsx` and the narrowly scoped `.library-playlists .card-favourite-star` rule. The star remains live text inside the existing title button; no interface pixels or hidden hit targets are used.

The registered `recorded-all-playlists` case traverses New → All Playlists through the visible sidebar, records both ordered states, checks the exact star box and no-sort state, then hovers/opens Emotional Songs, returns with browser Back, opens Favourite Songs, returns again and proves idle-player continuity. The extra card checks do not convert the archived flow into acceptance because initial New screen `e72be564` remains visibly incomplete.

Fresh optimized verification passed 159 desktop states, five responsive samples, 218 route checks and 66 interaction regressions, zero failures. All 159 exact-size comparisons completed. All Playlists `8a2a4241` improved from `1.589619 / 1.174711%` to `1.554882 / 1.138720%` MAE / over-20.

The complete immutable source, optimized render, amplified difference, card/title, sidebar and player regions were reviewed at the exact 1440 × 903 viewport. Card order, artwork, strings, geometry, scroll, sidebar/profile state and idle player match the saved frame. Remaining pixels are limited to lawful platform text/SVG antialiasing and image decoding without a concrete visible product discrepancy. `MATCH-8a2a4241` is therefore checked.

Corpus mean MAE changed `5.262063176 → 5.262080975`; mean over-20 improved `5.353007481% → 5.352900105%`. 148 states were byte-identical and 11 render hashes changed. Seven positive-delta states were only readable artwork/image decode variation; `e757eb0f` gained the same source-supported Favourite Songs star. No unintended geometry, copy, state, session or control regression was found.

The [dated review](reference-review/2026-09-17-all-playlists-match.md) records exact ownership, geometry, hashes, real-control evidence, corpus review and the reason `FLOW-b49a8505` remains open. [Latest metrics](reference-review/latest-metrics.json) points to this candidate.

## Previous Viral Chart row and real-control findings


The saved Viral Chart uses a tighter desktop table than the preceding candidate: 39 px artwork, measured column starts, a higher header baseline, inset separators, subtler metadata ink, a smaller dark-red favourite star and different duration/More geometry. These details are now owned by desktop-scoped selectors beneath `.chart-page > .chart-table`; the live `music-chart-schedule.tsx` component and immutable source archive remain unchanged.

The registered `discovery-typography-symbols` case now asserts table/header/row/badge/control geometry and then exercises the chart through real visible controls. It enters through New and the viral heading, plays `drop dead`, round-trips favourite, opens the exact ten-item More menu, verifies Escape focus return, preserves unavailable `Kiss It Better`, navigates to artist and album, returns with browser Back and preserves player continuity. No direct endpoint jump, injected state or force click is used as journey evidence.

Fresh optimized verification passed 159 desktop states, five responsive samples, 218 route checks and 66 interaction regressions, zero failures. All 159 exact-size comparisons completed with zero functional failures. Corpus mean MAE changed `5.263068 → 5.262063` and mean over-20 changed `5.353294% → 5.353007%`.

Viral Chart `8a234785` improved `3.865631 → 3.751661` MAE and `3.643103% → 3.585118%` over-20. 146 states were byte-identical and thirteen render hashes changed. The non-target changes comprise seven max-one-channel variations, one max-two-channel variation and four artwork/video decode variations. All six states with a positive delta in either metric were reviewed source/baseline/current/candidate-change; no concrete artwork identity, geometry, copy, session, state or control regression was found.

The [dated review](reference-review/2026-09-17-viral-chart-rows-controls.md) records exact selectors, geometry, hashes, focused and optimized control evidence, full-corpus review and blockers. [Latest metrics](reference-review/latest-metrics.json) points to this candidate.

The chart is closer, but lawful heading/table/sidebar typography, SVG contour antialiasing, some row-artwork decoding, player symbols/material and smaller sidebar details remain visible. The batch does not complete any screen or archived journey, so MATCH and FLOW stay open.

## Previous signed-out Home typography and guest-player findings — historical

Signed-out Home retains real marketing artwork, the repaired one-pixel content edge, glows, seam and warm player material. The current batch scopes lawful Windows typography and live-control geometry beneath `.capture-membership` and `.guest-session[data-scene="home"] .floating-player`: brand size, offer-copy opacity, CTA size/weight, shuffle/repeat ink, previous/play/next geometry, queue treatment and the idle Apple mark all move toward the exact immutable frame. Text remains DOM, the CTA/profile remain real accessible buttons and every player affordance remains an SVG/DOM control.

The heading and volume contour were deliberately not changed because tested variants worsened supported metrics. No proprietary Apple font, captured interface pixels, screenshot mask or synthetic player tint was introduced.

Fresh optimized verification passed 159 desktop states, five responsive samples, 218 route checks and 65 interaction regressions, zero failures. All 159 exact-size comparisons completed with zero functional failures. Corpus mean MAE changed `5.309224 → 5.309077` and mean over-20 residual changed `5.379484% → 5.379391%`. `aefa8502` improved `1.946265 → 1.922833` MAE and `1.500200% → 1.485374%` over-20; every other state retained zero metric delta.

The focused and registered suites passed profile/CTA dialog focus return, shuffle/repeat, volume, queue, play/pause continuity and four responsive viewports. The optimized pixels are identical to the readable development candidate. The [dated review](reference-review/2026-09-16-signed-out-home-typography-controls.md) records exact selectors, sweeps, region measurements, evidence paths and blockers. [Latest metrics](reference-review/latest-metrics.json) points to this candidate.

Lawful text/sidebar raster, CTA antialiasing and remaining volume/small-symbol contours remain visible, so MATCH stays open. The batch does not alter any recorded flow and grants no FLOW acceptance.

## Previous release-edition and legacy-player findings — historical

The initial and current New families use different lower-release orders. The implementation now preserves those exact source-supported editions, including repeated covers, while all five lower fragments are owned by the relevant immutable frame. Three middle fragments are masked to the band below the real player and lawful outer edge; clean full covers remain provider-backed. No captured player, text, button or control pixels were copied into artwork.

Legacy discovery now owns a measured 54% / 16px / 1.8-saturation player material. It is scoped through `.capture-discovery[data-catalog="legacy"]`; current New, Home, panels, expanded media and radio retain separate owners. Navigation editing no longer replaces legacy material with a generic inline style. Duplicate release identities use index-qualified React keys so live controls retain the correct edition.

Fresh optimized verification passed 159 desktop states, five responsive samples, 218 route checks and 65 interaction regressions, zero failures. All 159 exact-size comparisons completed with zero functional failures. Corpus mean MAE changed `5.420352 → 5.309224` and mean over-20 residual changed `5.535588% → 5.379484%`. All 23 directly affected screens improved in both metrics; `e72be564` fell to 4.319364 MAE / 4.819506% over-20 and `1f9e170c` to 4.533112 / 5.175341%.

The union of positive numerical deltas contained 106 states. Every one was reviewed in fourteen source/baseline/current/source-difference/candidate-change sheets. The largest increases were `a4afd6e6` at +0.160269 MAE and `468b0465` at +0.219561 percentage points over-20; no concrete unintended artwork, geometry, copy, state or control regression was found in the readable review.

The [dated review](reference-review/2026-09-16-release-editions-legacy-player.md) records exact hashes, state owners, fragment masks, real-control regressions, full-corpus review and evidence paths. [Latest metrics](reference-review/latest-metrics.json) points to this candidate. Typography and symbols, remaining metadata/complete covers, City Chart art, Alpha live profile/title differences, now-playing geometry and lyrics/queue details keep MATCH/FLOW open.

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
| Wrong or partial artwork | Inspect exact original, edition, crop, adjacent shelf and provider integrity. Do not replace content mistakes with gradients or sampled interface pixels. Initial/current/localized lower-release orders and visible fragments are repaired; remaining captions, complete covers and City Chart artwork are still partial. |
| Live versus fixture state | New→Alpha retains a known profile/title difference. First-entry lyrics/queue preserve and assert their live session, but their saved endpoint stills contain unrelated catalog/library/queue snapshots. Model only source-supported transitions; never reset unrelated state behind a control to imitate a still. |
| Sidebar state ownership | Ordinary, Alpha/Home underlay and dark concert now have separate measured owners. Preserve that separation when changing shared shell material; panel-open selectors must not mutate the left sidebar. |
| Shared material and geometry | Preserve hit targets, containment, scroll, optimized blur, repaired edge/glows and state-specific owners. Shared selectors must remain below the intended `.floating-player` or panel root; do not restore compensation gradients. |
| Typography and symbols | Windows captures sampled Arial in Chromium's actual platform-font data. A CSS SF Pro name is not proof of rendering. Signed-out brand/copy/CTA geometry is closer, but heading/sidebar raster, CTA antialiasing and some icon contours remain visible; match them lawfully without distributing proprietary fonts. |
| Player and panels | Guest, ordinary and legacy-discovery glass now have separate measured owners, and signed-out floating-player SVG geometry remains scoped and regression-covered. Remaining complete artwork/metadata, lyric fade/blur, queue rows and endpoint snapshot discontinuities are separate checks. |
| Whole-flow and motion review | A carousel segment or deterministic two-step control is not automatic FLOW acceptance. Review every recorded intermediate state and applicable motion asset before sign-off. |

## Evidence interpretation

The standard corpus uses 147 application viewports at 1440×903 and 12 at 1440×904. Exclude only the documented 120px acquisition footer. Preserve originals; do not resize candidates, omit difficult screens, mask product regions or loosen thresholds.

The numerical gallery ranks residuals; it does not replace readable whole-frame review. A shared change needs full-corpus regression inspection, including worsened states, not selected before/after crops. Tiny threshold crossings around a corrected edge are reported but are not automatically visual regressions; the source, render, amplified difference and before/after candidate must be read together.

A continuous journey starts at its permitted first fixture and then uses real controls. URL jumps, injected state and forced clicks are not acceptance evidence. Retain both direct-fixture and continuous-state comparisons with ordered non-overwriting captures.

## Current acceptance boundary

The preserved checklist reports UI 159/159, MATCH 1/159 and FLOW 0/58. No acceptance is inferred from these findings. Where rights, unavailable recordings or differing snapshots prevent a justified exact claim, record the precise discrepancy and evidence. Do not invent approval or silently redefine 1:1.

Earlier detailed observations remain in [library controls](reference-review/2026-09-12-library-controls.md), [library panels](reference-review/2026-09-12-library-panels.md), [sidebar geometry](reference-review/2026-09-12-sidebar.md), [the source ledger](reference-review/ledger.md), and the [pre-Astra audit](history/pre-astra-2026-09-12/docs/reference-audit.md).
