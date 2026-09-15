# Signed-out Home and ordinary player geometry review

Reviewed locally on 2026-09-15 in `J:\courses/main`, on top of `c6cf45f8bd9d3db3cc2647f70d459d7faee19fce`. This is implementation evidence, not clone acceptance. The immutable reference archive was not changed.

## Candidate and environment

- Implementation SHA-256: `f64c6c9ce6e4281c682fd396c36f65c76bb4a0d2f3970b4a70cd8b772d7458fe`.
- QA tooling SHA-256: `764d3ccf005256967f96617c4646668c1e026a02ab3d0c11723a18afcf75f99b`.
- Optimized build: `EJ_Dgxkz3BiPF7mKme9XK`, served from this checkout on loopback port 6437 and stopped after verification.
- Windows 11 build 26200; Python 3.13.15; Chromium 151.0.7922.34; en-SG, Asia/Singapore, reduced motion and device scale 1.
- Final optimized evidence root: `D:\courses-main-evidence\guest-player-scoped-final-20260915-065524\`.
- Focused signed-out evidence: `D:\courses-main-evidence\signed-out-home-focus-20260915\`.
- Focused shared-player evidence: `D:\courses-main-evidence\shared-player-focus-20260915\`.
- Reviewer: the implementing agent. No independent reviewer or owner acceptance is asserted.

## Defects and active ownership

Signed-out Home still used a single flat red gradient outside its exact 450px artwork region. Its live brand, heading, copy and trial button were slightly mis-anchored, while the idle player lacked the captured edge, shadow and optical SVG treatment. The active owners were `.capture-membership` and the guest-scoped player rules in `app/reference-fidelity.css`, rendered by `music-discovery.tsx`, `music-player.tsx` and `music-primitives.tsx`.

Ordinary member states shared the correct 635×54 player box but used an overly opaque material and generic icon sizing. The active owner was `.floating-player` plus its transport and utility descendants in `app/player-fidelity.css`. Alpha and open-panel states already had stronger state-specific owners, so the correction had to exclude `.with-player-panel` and preserve Alpha specificity.

Home's top heading also retained a small optical geometry mismatch. The correction is owned by `.capture-home > h1`; the equivalent New adjustment was tested and deliberately rejected because it worsened New's source comparison.

## Implemented repair

Signed-out Home now uses live layered CSS for the one-pixel content edge, top-left and bottom-right marketing glows, vertical tonal falloff and bottom seam. Its existing artwork remains a real image and stays effectively pixel-identical to the source. Live text and CTA geometry were measured at the exact 1440×904 application viewport; no interface pixels were pasted into artwork.

The guest player remains real translucent glass over the red page. Its bottom anchor, warm 50% material, border and shadow now match the captured shell more closely. Transport, Apple, queue and volume symbols remain accessible SVG controls with guest-only optical sizing and offsets. Sign In, Try It Free, Escape focus return, shuffle, repeat, volume, queue, play/pause and four responsive widths are exercised through real controls.

Ordinary member players now use a lighter 74% sampled material with 28px blur and measured transport/utility geometry. Every new rule is scoped below `.floating-player`; an earlier full-corpus run exposed an overly broad selector touching expanded media controls and standalone radio volume controls, so that candidate was rejected and preserved only as counter-evidence. Guest, Alpha and open lyrics/queue panel materials retain separate owners.

Home's heading receives the measured half-pixel optical offset and vertical scale. New retains its preceding heading rule because the same treatment increased its exact comparison residual.

## Verification

Archive integrity, checklist coverage, typecheck, the optimized production build, five Python QA-tool tests and nine cover-integrity tests passed. Focused signed-out Home, Home-carousel, ordinary-player, sidebar-material, library-control and lyrics/queue panel regressions all passed.

The final optimized corpus passed **164 rendered states** (159 desktop plus five responsive), **218 route checks** and **62 interaction regressions**, with zero failures. All **159 exact-size comparisons** completed with zero functional failures. Corpus mean MAE changed by `-0.063303`; mean over-20 residual changed by `-0.068603` percentage points.

| Screen | Previous MAE / over-20 | Candidate MAE / over-20 | Change |
| --- | ---: | ---: | ---: |
| `aefa8502` signed-out Home | 3.424772 / 4.405267% | 1.932716 / 1.502120% | -1.492056 / -2.903147 pp |
| `e72be564` New idle | 5.328036 / 6.563077% | 5.213605 / 6.426572% | -0.114431 / -0.136505 pp |
| `a917d88f` Home idle | 3.777962 / 3.927802% | 3.757432 / 3.900963% | -0.020530 / -0.026840 pp |
| `1f9e170c` New playing | 6.314517 / 7.126784% | 6.257022 / 6.849929% | -0.057495 / -0.276855 pp |

## Full-corpus regression review

MAE improved on 118 states, was identical on 38 and increased on three. Over-20 residual improved on 113, was identical on 39 and increased on seven. Every positive delta was reviewed in source/baseline/current/amplified-difference sheets under the final evidence root.

The two New increases (`fc5d84bd`, `4f611a9e`) are confined to the intentionally changed live player material and symbols; the source still differs because lower release artwork editions are sampled through real glass. Home (`2f5da478`, `d5173715`), radio (`37575452`, `a9992e55`) and concert (`4f237528`) have lower whole-frame MAE with only 0.0034–0.0050 percentage-point threshold crossings around the corrected heading/player. `a4afd6e6` differs by less than one millionth MAE with no changed pixel above five levels. No expanded-control or standalone-radio selector leakage remains.

The accepted evidence includes `verification-summary.json`, `browser/results.json`, all journey `steps.jsonl`, `comparison/metrics.json`, `comparison/index.html`, source/render/difference galleries, `worsened-review.json` and both readable worsened-state contact-sheet families.

## Remaining visible blockers

Signed-out Home is substantially closer, but lawful platform-font rasterization, text/button antialiasing and small idle-symbol contour differences remain readable at high magnification. These are not hidden by captured pixels or proprietary fonts.

New and Home still have source-specific lower release editions, shelf metadata, captions and type geometry outside this batch. Those real artwork differences also alter the colour sampled through the player glass, so they must be repaired at the owning shelves rather than counteracted with a synthetic player tint.

The playing state still retains now-playing title/metadata and lower-content discrepancies. Lyrics and queue panel entry remain deterministic through real controls, but their immutable endpoint stills contain unrelated catalog/library/queue snapshots; no hidden reset was introduced.

## Acceptance boundary

No screenshot is used as a page, no player/sidebar/text pixels are pasted into artwork, no comparison threshold was relaxed and no forced click or state injection is presented as a flow. The corrected states are materially closer and regression-covered, but the concrete blockers above remain visible. **UI remains 159/159, MATCH remains 0/159 and FLOW remains 0/58.**
