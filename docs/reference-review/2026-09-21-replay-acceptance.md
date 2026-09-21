# Replay and milestone exact-state acceptance ? 2026-09-21

## Decision

The seven Replay/milestone states and both recorded Replay journeys are accepted for the verified candidate. Exact source, previous published candidate, current optimized candidate and amplified residual sheets show no remaining concrete mismatch in strings, state, geometry, artwork identity, material ownership, controls or scroll position. Remaining residual is lawful Windows/Chromium text and SVG antialiasing, live glass/blur rasterization and source-image decoding.

Accepted MATCH states: `f3fc07c5`, `3fed6760`, `b67b8895`, `18225175`, `b0caf02f`, `cc18744f`, `b5d31893`.

Accepted FLOW journeys: `FLOW-d303f5a7` (Replay monthly) and `FLOW-7cb9228f` (milestone detail).

## Candidate and full gates

- Base commit during capture: `28388bd3a0472d4ac81b2dcfd7fcecd1ecaa2778` on `main`.
- Stable implementation SHA-256 during capture: `6bfd18c83b050ec1f29e02fc27820a69d4d53c8ad0c9da0738d575c6f5a93258`.
- Stable tooling SHA-256 during capture: `69b84bbbbfc4627045ae0ae05a2b9640d093ecc387ab09155349404df9274744`.
- Optimized build ID: `iSXqMeYlF6vbOLFZzu1oC`.
- Browser: Chromium `151.0.7922.34` on `Windows-11-10.0.26200-SP0`.
- Evidence root: `apple-music-clone/.qa/evidence/replay-acceptance-20260921-full`.
- Whole corpus: 159 canonical desktop states plus five responsive captures, all pass.
- Route inventory: 218/218 route steps pass.
- Interaction regressions: 104/104 pass.
- Archive: 58 flows, 218 steps, 159 identities and 318 image variants pass integrity checks.
- TypeScript passes. Seven QA-tool unit tests and nine cover-integrity tests pass.
- Exact-size comparison covers all 159 canonical states.

## Exact diagnostics

| Screen | MAE | Over-20 | ? MAE vs published | ? over-20 |
|---|---:|---:|---:|---:|
| `f3fc07c5` | `2.784785` | `3.773276%` | `-0.212034` | `-1.298857 pp` |
| `3fed6760` | `4.938798` | `5.723943%` | `-0.205765` | `-1.276272 pp` |
| `b67b8895` | `5.820547` | `5.528669%` | `+0.000000` | `+0.000000 pp` |
| `18225175` | `3.881297` | `3.640917%` | `+0.000000` | `+0.000000 pp` |
| `b0caf02f` | `5.785063` | `8.287472%` | `+0.000000` | `+0.000000 pp` |
| `cc18744f` | `2.135592` | `1.704846%` | `+0.000000` | `+0.000000 pp` |
| `b5d31893` | `1.824367` | `1.423611%` | `+0.000000` | `+0.000000 pp` |

Corpus mean MAE changes `4.940987 ? 4.938574` and mean over-20 changes `4.968957% ? 4.952968%`.

The intended Replay changes materially improve the two affected states:

- `f3fc07c5`: narrowed/contained ambient owner, `? MAE -0.212034`, `? over-20 -1.298857 pp`.
- `3fed6760`: truthful obscured-row handling plus the only source-exposed rank-9 fragment, `? MAE -0.205765`, `? over-20 -1.276272 pp`.

The other five Replay states are numerically unchanged from the published candidate. Readable review sheets are under `readable-review/`. The unrelated accepted Search-bottom state `812ba627` moves by only `+0.034105` MAE / `+0.032838` over-20 points; previous/current inspection localizes this to one-pixel card-edge rasterization, with no content, state, artwork, geometry or scroll change. Two New states increase by less than `0.000003` MAE and two decrease by less than `0.000001`, all below any product-pixel change.

## Truthful obscured source content

The prior placeholder rows that literally claimed ?Not visible in the saved capture? were removed. The source only exposes the rank, a clipped `hold` fragment, explicit badge and artist/play fragment for the obscured rank-9 entry; the live row now reproduces only that supported evidence. It does not invent a title or hidden metadata.

## Real-control journey evidence

`recorded-replay-monthly` starts at the permitted Search fixture and then uses the visible Replay category, live month control and wheel scrolling. Its first six ordered screenshots exactly follow:

`035569a0 ? f3fc07c5 ? 3fed6760 ? b67b8895 ? 18225175 ? b0caf02f`.

A seventh supplemental screenshot verifies Search navigation and browser Back restore the May URL, year-section scroll position and player state without replacing history.

`recorded-milestone-detail` starts at the permitted milestone-shelf fixture and uses the visible `Your Milestones` control and first milestone card:

`18225175 ? cc18744f ? b5d31893`.

The journey now explicitly decodes all live background artwork before evidence retention. This prevents a transient grey placeholder from being mistaken for the product state; the final optimized journey and direct state both contain the verified green 10,000-minute badge. Ordered screenshots and `steps.jsonl` are under `optimized-browser/journeys/` in the evidence root.

Additional registered regressions pass for year-menu isolation, native artist-card ranks/captions and ambient containment. Back navigation from detail to gallery and Replay, horizontal milestone restoration, month/year state, profile/sidebar/footer continuity and player material are exercised without fixture URL jumps, forced clicks or state injection.

## Acceptance rationale

The current Replay implementation has the source-supported content, exact viewport/scroll anchors, correct album and milestone continuations, native live controls, contained ambient field, contextual player glass over album/milestone/year artwork and truthful obscured metadata. The remaining amplified residual outlines text, SVG and blur edges rather than a concrete missing or incorrect product element. Under the repository acceptance rule, these seven MATCH entries and two FLOW entries are therefore complete.
