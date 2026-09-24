# Onboarding screen and recorded-flow acceptance — 2026-09-23

## Candidate and scope

This review accepts seven saved onboarding states: empty and filled create-account forms (`4a1d7759`, `cd34d1ac`), empty and filled profile forms (`eebd5ffb`, `269160a4`), empty and filled verification forms (`99af3033`, `dfce44a2`), and the initial payment-method preview (`51c79ae2`). It also accepts the complete ten-step `FLOW-43dfc8c6` journey. All comparisons use the immutable originals and exact 1440×903 desktop screenshots.

The optimized candidate uses source commit `d71c3c4355d847867fc04aa1f4b69cb8035aba4d`, application identity `85661c42b0fda0181ff648e08e9b880403f31c02e577cb2223d04553cb230669`, QA-tooling identity `300a4a68afe9df0de8d8cc983c28e9cd722c83bec3ad7e197976099ac53afc87`, build `zHOP0llQ0Mepv9dKQd5eT`, and Chromium `151.0.7922.34` on Windows 11. Capture time: `2026-09-23T00:48:11.886829Z` (`03:48` in Sofia). Evidence root: `apple-music-clone/.parity-evidence/full-production-onboarding-final-20260923-040500`.

## Optimized verification

The production candidate passed 159 desktop captures, five responsive captures, all 218 route checks and all 115 registered interactions with zero failures. All 159 exact-size comparisons completed. The application identity stayed unchanged from the previously built optimized candidate; only browser-test tooling changed for this run. Pixel metrics are diagnostic, not acceptance thresholds.

| MATCH | State | MAE | Over-20 |
| --- | --- | ---: | ---: |
| `MATCH-4a1d7759` | Empty create-account form | `3.685778` | `3.471607%` |
| `MATCH-cd34d1ac` | Filled create-account form | `3.775161` | `3.567891%` |
| `MATCH-eebd5ffb` | Profile form, blank date and unchecked terms | `4.443511` | `4.363080%` |
| `MATCH-269160a4` | Profile form, preview date and checked terms | `4.509908` | `4.408299%` |
| `MATCH-99af3033` | Empty verification form | `3.193054` | `2.789236%` |
| `MATCH-dfce44a2` | Filled code and verification spinner | `3.300559` | `2.826996%` |
| `MATCH-51c79ae2` | Initial payment-method preview | `3.281535` | `2.173542%` |

Readable source/current/residual review confirms matching dialog bounds, form geometry, copy, values, consent state, scroll crop and action placement. Small residuals cluster around text/icon rasterization and one-to-three pixel edges; no control, content or journey-state mismatch remains in these seven captures. The source and candidate originals were kept unchanged.

## Continuous journey and safety

The registered `onboarding-live-controls` case traversed all ten recorded states through real visible controls. It opened Sign In from the guest control, entered the local preview email, continued into account creation, filled the preview form, continued to profile details, entered the preview birth date and checked the local acknowledgements, continued to verification, entered the captured local preview code, observed its verification transition, and reached the payment-method preview. The ordered screenshots and actions are recorded in `browser/journeys/onboarding-live-controls/steps.jsonl`.

All ten journey screenshots are byte-identical to their direct candidate fixture captures at 1440×903. Each recorded source SHA-256 matches the source screenshot hash in the comparison data. The flow stayed on `127.0.0.1:6445`; no non-GET submission was made. Email, password, name, birth date and code are preview fixtures only. No Apple account, payment, subscription or media stream was created.

Advance the seven listed `MATCH` entries and `FLOW-43dfc8c6`. The ledger becomes **UI 159/159, MATCH 91/159, FLOW 25/58**. The acceptance decision follows exact-viewport source/render/residual review and complete ordered live-control evidence; automated routes and pixel scores do not grant it.
