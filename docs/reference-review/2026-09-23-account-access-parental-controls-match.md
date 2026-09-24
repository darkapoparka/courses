# Account Access and Parental Controls exact-state review

Date: 2026-09-23. Review type: direct screen-state visual fidelity; Codex self-review.

## Candidate and evidence

- Source checkout: `J:\courses`, branch `main`, commit `d71c3c4355d847867fc04aa1f4b69cb8035aba4d`.
- Optimized local candidate: `http://127.0.0.1:6456`, build ID `2zHldDw1IgV64sTiYieO-`.
- Application identity: `a270ebd43499c1228865dbbe179e342ff35e05ef5d96067a8046c4d793fe52d4`.
- QA tooling identity: `6164bae460bbef08f1853a539efd008676a3932091a94f2a84d3848e782e310d`.
- Browser: Chromium `151.0.7922.34`; platform: Windows 11.
- Exact corpus evidence: `../apple-music-clone/.qa/evidence/account-parental-precise-final-20260923/browser` (raw run) and `../apple-music-clone/.qa/evidence/account-parental-precise-final-20260923/comparison-success` (comparison gallery and `metrics.json`). The raw browser directory is junction-backed; preserve its target.
- The optimized run completed 159 desktop states and five responsive captures, checked 218 route steps, and ran 117 registered interactions with zero failures. The comparison generated all 159 exact-size states. Both reviewed source originals remain unchanged in `apple-music-clone/reference/originals/`.

## MATCH-1e5b4763 — Account Access

Original: `1e5b4763-6664-4fc0-871d-3b7c9a03853e.webp`, SHA-256 `2d600e220f9cbf8b9a88f9ade20e6e90a4f63bef354930373d9afa2f1fc3dbf5`.

Candidate render SHA-256 `e391b60e03c66caa0acd5de8a680608d95c66b7be024f35887d6a818d5d374f0`; viewport and crop `1440 × 903` / `[0, 0, 1440, 903]`. MAE `5.052224`; pixels over 20 `4.585717%`. The account paragraph preserves the original wording and three line wraps; the Connected Accounts text, section divider, parental-controls heading, switch and visible rating control align with the source. Readable full-size source/render/residual review found only small text/glyph raster differences and minor edge residuals, with no remaining concrete product mismatch.

The state was opened in the optimized browser and its accessibility tree showed the expected copy, Clean/G/G selected values, and connected-account, switch and rating controls. No account action or restriction value was changed. This screen review does not accept a recorded flow.

## MATCH-01f96377 — Parental Controls

Original: `01f96377-a362-452d-9045-449e0916609f.webp`, SHA-256 `c71e14ac7111903f6bf9ae443b493c87c1291cbac0fc486415f4804920cac15f`.

Candidate render SHA-256 `8978ec91ad41cfbb52bbab47b860417a69472037d6a625c0806a33626340cf6c`; viewport and crop `1440 × 903` / `[0, 0, 1440, 903]`. MAE `3.151383`; pixels over 20 `2.726098%`. Against the preceding account candidate, MAE improves by `0.445577` and over-20 pixels by `0.415821` percentage points. Full-size source/render/residual review confirms the parental-controls copy, section anchors, switch position, three rating values and select decoration, footer and All Playlists rail. The remaining residual is fine text, icon and browser raster; no concrete product mismatch remains.

## Decision and limits

Checked `MATCH-1e5b4763` and `MATCH-01f96377` in `docs/tasks.md`. Acceptance is limited to these two direct screenshot states. It does not mark account settings, sign-out or cancellation flows complete. No independent reviewer, owner acceptance, commit or push is claimed.
