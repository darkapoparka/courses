# Chart detail exact-state and flow acceptance — 2026-09-21

## Scope and identity

This review covers `MATCH-8a234785` and `FLOW-d5d60236` only. The verified candidate is `d2dd9e977ec357ee3038c069263b706c9099146b`; no application UI code changed in this acceptance batch. The batch adds a dedicated source-ordered regression and publishes the reviewed evidence already present in the live implementation.

GitHub Actions run `35619076538` produced artifact `reference-candidate-d2dd9e977ec357ee3038c069263b706c9099146b` (artifact `10648925124`, digest `sha256:79d9a24ac8f0160f958ef6a73082aa1db5b62a87da8c2facb8e2bb6fda9e2f2c`).

## Clean verification

- TypeScript and the production build passed.
- The frozen archive and every checklist mapping passed.
- 159 canonical desktop states and five responsive states rendered successfully.
- All 218 recorded route steps returned their expected states.
- All 108 registered interaction tests passed with zero failures, including `recorded-chart-detail`.
- All 159 exact-size source/current comparisons completed successfully.

## Exact Chart state

The reviewed target is `8a234785-f0b4-4200-8f3f-2eecf2b77708` at 1440×903. Source SHA-256 is `4b3cdf25b3e0b13648f856bf6df30bbee66c02f42f459555972f0e67551c0e53`; current render SHA-256 is `10da5dfd16f02a381e2a614e2151a0e2697b57530c74d5d78f2e48ee84cd8680`.

The fresh comparison records MAE `3.5258692732045445` and `3.4275409130060295%` of pixels over threshold 20. The source, current render and residual are byte-stable against the preceding clean checkpoint. Direct review found the same heading, 15-row order, metadata, artwork identities and crops, saved `stupid song` favourite, unavailable `Kiss It Better` row, SmithAlex profile, selected New sidebar state, idle player and visible control geometry. No concrete product mismatch remains. The residual is confined to lawful Linux/Windows browser text and SVG antialiasing, live glass/material raster and image-decoder variation; it is not hidden by exclusions or a screenshot overlay.

## Complete real-control journey

The dedicated evidence records exactly the archived two-step order:

1. `4f611a9e-b39b-4ee5-a6b7-fa10fad5f093` — named-profile New, recorded before interaction.
2. Click the visible **Favourite These Viral Hits** heading control.
3. `8a234785-f0b4-4200-8f3f-2eecf2b77708` — Chart detail at `/?view=chart`.

The case asserts the New scene and SmithAlex profile before the click, then the Chart scene, exact heading, 15 rows, saved favourite, profile continuity and chart URL after the click. It does not load the endpoint directly after the starting fixture or inject hidden scenario state.

## Acceptance decision

`MATCH-8a234785` and `FLOW-d5d60236` are accepted. The ledger advances from MATCH 65/159 and FLOW 13/58 to MATCH 66/159 and FLOW 14/58; UI remains 159/159. Numeric residuals remain diagnostic rather than an automatic acceptance rule.

## Final-tree verification trigger

The guarded one-shot publisher was removed in `2c366834dcd07e0c98aa41e96e97ae61dafc999a`. This metadata-only checkpoint exists to run the repository's normal Clone verification and Astra documentation workflows against the final tree without retaining a write-enabled publication workflow.
