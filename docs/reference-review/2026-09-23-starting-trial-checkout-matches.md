# Starting a trial checkout screen matches — 2026-09-23

## Candidate

- Checkout: `J:\courses`, branch `main`, commit `d71c3c4355d847867fc04aa1f4b69cb8035aba4d`.
- App identity: `6387e08df950ff9012cf82ebc7ab27dee4bcc2cab72b727e2573d8ccbcc56b0c`.
- QA identity: `18425a67e002b0412ac9b06f91f4051786cf9319e3f09f89767502c1a3513d57`.
- Optimized build: `yA4L7Jwf1ReiiuJdkX1Fu`; local preview: `http://127.0.0.1:6468`; Chromium `151.0.7922.34` on Windows 11.
- Full evidence: `apple-music-clone/.qa/evidence/starting-trial-focus-final-20260923/{browser,comparison}`.

## Screen review

The desktop checkout follows live scroll position through payment, billing, and subscription confirmation. Selecting the local preview card fills its fixed sample values without a false text-entry focus ring. The address suggestion opens while the street field is focused, then closes and releases focus on selection. Confirmation shows the checked subscription card and the original clipped modal frame; the Done action remains reachable by scrolling inside the dialog. Done returns to New without the trial banner, and Home opens with the named profile.

I reviewed the exact 1440 × 903 source, browser render, and amplified residual for each previously open checkout match. The dialog bounds, displayed values, clipping, confirmation state, and action placement align. Remaining differences are small font and icon raster residuals; no concrete geometry, content, or control-state mismatch remains.

| Screen | MAE | Pixels over 20 |
| --- | ---: | ---: |
| `b74d25cb` | 3.18 | 2.01% |
| `94b9d90d` | 2.70 | 1.77% |
| `a728c2af` | 3.15 | 2.23% |
| `06ea37ef` | 3.04 | 2.06% |
| `5175a910` | 3.29 | 2.64% |
| `ecb33359` | 3.01 | 2.34% |
| `bf099ae2` | 3.67 | 3.62% |

The comparison report records each source and render hash. The full optimized run captured all 159 desktop references and five responsive samples, checked 218 flow routes, and passed all 124 interaction regressions with zero failures. TypeScript, the optimized build, and Python syntax compilation passed.

## Trial journey boundary

`recorded-starting-a-trial` traversed all ten steps continuously through visible controls at 1440 × 903, captured each state in order, returned to New, and opened Home. The runner confirmed the local preview issued no non-GET requests. The ordered captures and immutable source hashes are in `apple-music-clone/.qa/evidence/starting-trial-focus-final-20260923/browser/journeys/starting-a-trial-continuous-20260923/`.

`FLOW-32937ec7` stays open because I could not review the recorded motion clip in the Browser session. The stills and real-control journey verify the saved checkpoints and interaction path; they do not establish the clip's motion timing or transitions.

Seven screen tasks are accepted: `MATCH-b74d25cb`, `MATCH-94b9d90d`, `MATCH-a728c2af`, `MATCH-06ea37ef`, `MATCH-5175a910`, `MATCH-ecb33359`, and `MATCH-bf099ae2`. The ledger is UI 159/159, MATCH 110/159, FLOW 26/58. No commit or push was made.
