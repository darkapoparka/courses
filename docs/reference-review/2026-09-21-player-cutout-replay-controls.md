# Player artwork cutouts and Replay controls - 2026-09-21

## Scope and implementation

Only checkout `J:\courses`, branch `main`, app `apple-music-clone`. Published parent: `96d17d0a0a551fb81bd58f5032d0a5290df18745`. This is a verified roll-up of the preserved [New selection/Replay changes](2026-09-20-new-selection-replay-containment.md) and the following implementation, not a claim of completed clone acceptance.

The New release artwork overlay previously removed a rectangular player footprint. This exposed blocks of the fallback cover outside the actual rounded player. `lib/release-artwork-mask.ts` now constructs a geometry-only SVG cutout around the archived capsule, with clearance for its border. `music-discovery.tsx` applies it to the shared current release-fragment owner. The masks remain in source-artwork coordinates when cards resize, scroll or survive navigation. No player screenshot, controls, captured glass, arbitrary painted underlay, catalog reset or album substitution was introduced.

The registered browser suite decodes the actual mask into an alpha canvas and verifies every pixel safely inside the source player is excluded, every safely exterior pixel remains artwork, and the SVG contains only path geometry. A new real-control case covers initial, named, playing and Alpha states across six widths, including Volume open/close and horizontal-overflow checks. The existing release-edition persistence tests use the same geometric verification.

Replay now uses native black heading/empty-caption ink, a corrected July caption baseline without moving its footer, and a source-sized year label/chevron at x1310/y36, 92x35. The existing real year/month/history/queue journey guards those styles and bounds. The preserved batch also supplies 9px current-New selection corners/burgundy ink, contained Replay lighting, native artist ranks/names/minute labels, responsive cards and accessible artist entry.

## Verification

Evidence root: `apple-music-clone/.qa/evidence/new-player-20260921`.

- Optimized build: `lxEtLXp3dE2AqW7J-CY3t`, directory `.qa/build-new-player-20260921`, loopback port 6437.
- Final focused development check: 13 exact-size screens and 16 registered interaction cases, zero failures (`focused-final-dev`).
- Fresh optimized corpus: 159 desktop states plus five responsive states, 218 route checks, 101 interaction cases, zero failures (`optimized-browser/results.json`). Ordered screenshots and `journeys/**/steps.jsonl` are retained.
- All 159 strict comparisons completed at each original's actual 1440x903 or 1440x904 viewport. Only the documented 120px acquisition footer is excluded. Candidates are not resized and product pixels are not masked in the comparison.
- Captured implementation SHA-256: `91d667528864fa4c75bf0fa53b231463f63287722bb6f2f34fc9382a1ad3609c`.
- QA SHA-256: `56ee19842a467faafb860f1fb49655cc3c3b0631d30e99dad2a05e8de6895363`.
- Both hashes were unchanged between 01:58:52 and 02:08:51 UTC during the optimized run.
- TypeScript passed. Seven comparison/tooling unit tests and nine cover-integrity tests passed. Archive validation passed: 58 flows, 218 steps, 159 identities, 318 image variants. Coverage remains UI 159/159, MATCH 22/159, FLOW 3/58.

PowerShell initially treated the unit runner's normal stderr progress dots as a native-command error after the successful corpus/comparison. The seven unit tests were rerun with separate stdout/stderr and an explicit exit-code check; they passed. This shell-wrapper failure is not an application failure, and the corpus evidence was not regenerated or altered.

## Readable residual review

The source, previous published candidate, new optimized candidate and amplified residual are retained in `new-player-review.png`, `named-player-review.png`, `playing-player-review.png`, `selected-sidebar-review.png`, `replay-year-review.png`, `replay-caption-review.png`, `replay-artists-review.png` and `replay-light-review.png`. The full strict comparison gallery retains every unscaled source/render/difference image. Comparison against the published signup baseline is recorded in `verification-summary.json`.

Mean full-frame MAE: 4.950121100 -> 4.949350055. Mean over-20 pixels: 4.989293632% -> 4.985895144%. Of 34 changes exceeding 0.000001 MAE, 26 improve and eight worsen. These numbers are diagnostics, not acceptance.

The principal adverse delta is Replay May `3fed6760` (+0.384195 MAE), where native artist text/material replaces captured labels and the lighting distribution changes. The native cards are functional and responsive, but their portrait-to-caption transition, glyphs and surrounding light are not yet a visual match. The other substantive Replay deltas are `18225175` (+0.027221), `b0caf02f` (+0.018073) and `b67b8895` (+0.017036); their changed pixels are confined to native section-heading ink. Source pixel review supports black ink, but the platform glyph contours/weights remain different. Do not silently call these states improved or accepted.

Four remaining positive deltas are below 0.0005 MAE. `bbb92581` and `bdc56e10` have no before/after pixel differing by more than four channel levels; `bde65d33` has nine such pixels. `ffc18eb8` has 81, confined to the lower release/player region. These small residuals are retained and do not justify acceptance changes.

Initial New `e72be564` improves from 2.526055 to 2.514399 MAE. Its corner-exposure defect is repaired, but its actual interior player glass/underlay still differs. Shader-only probes favored the existing 50% background, 16px blur, saturation 2; no speculative shader change was committed. The initial release's complete underlying artwork remains unresolved. Preserve the distinct initial/current editions and the pinned ATEEZ release; do not manufacture parity by changing unrelated session/catalog state.

No new MATCH or FLOW checkbox is checked. Remaining blockers also include Replay ambient light, obscured song metadata and gallery continuation, player/glyph finishing, and the previously documented lyric/account-session discrepancies. See the existing task rows and source-specific reviews rather than treating a route render as acceptance.

## Preservation and publication identity

Generated type paths were backed up to `pre-build-generated` and `post-build-generated` before canonical normalization. `normalization-receipt.json` proves the application tree did not change: `ad77f11b296e8d54b22dde44954a3ddab1ee6caee5c93e75cfc31cd490d3c92e`. Normalized configuration-inclusive implementation SHA-256: `e8cd1def45d0fad090ad6a6105a6f935cc5881914c83adfd98b7b97336d4883d`. The QA digest is unchanged, and TypeScript passed again after normalization.

Only reviewed source, registered tests, the existing ledger/metrics/handoff and dated review are publication material. No QA captures, build output, dependencies, downloaded candidate artwork, reference originals, credentials or fonts are added to Git. The exact resulting commit, push and Actions statuses must be read from Git/GitHub; the recorded parent and pre-commit capture identity are not assertions about a future SHA.
