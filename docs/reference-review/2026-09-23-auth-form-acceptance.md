# Sign-in email form exact-state acceptance — 2026-09-23

## Candidate and scope

This review accepts four saved email sign-in states: empty email `ee751367`, filled email `bdc56e10`, the legacy sign-in offer `3131018d`, and its filled form `417f6129`. Each source/render/residual comparison uses the reference viewport at 1440×903. The empty form’s privacy copy now follows the same four line breaks as the original. Filled forms render the original small “Email address” caption above the email value, while retaining a single accessible input name. Both offer states show the source copy “Over 100 million songs. All ad-free.” and the “Try It Now” action.

The optimized candidate uses source commit `d71c3c4355d847867fc04aa1f4b69cb8035aba4d`, app identity `85661c42b0fda0181ff648e08e9b880403f31c02e577cb2223d04553cb230669`, QA identity `5dddcf2a6a38a17badfd8c6a376ec7ac9038ba77958605f0d8e11f823c350542`, build `zHOP0llQ0Mepv9dKQd5eT`, and Chromium `151.0.7922.34` on Windows 11. Capture time: `2026-09-23T02:47:31.524377+03:00`. Evidence root: `apple-music-clone/.parity-evidence/full-production-auth-label-clean-20260923-024000`.

## Optimized verification

The run passed 159 desktop captures, five responsive captures, all 218 route checks and all 114 registered interaction regressions with zero failures. All 159 source/candidate comparisons completed at exact source dimensions. Full-corpus mean is `4.871324` MAE and `4.842089%` over-20; the previous diagnostic baseline measured `4.882666` MAE and `4.840119%` over-20. These values are diagnostics, not acceptance thresholds. The increased over-20 mean is 0.001970 percentage points; source/render review found no new product mismatch. The highest unrelated positive deltas include expanded-player dialogs where the preview playhead and lyrics progress naturally between runs, plus existing browser-raster differences; no auth selector touches those screens.

## Exact states

| MATCH | State | MAE | Over-20 |
| --- | --- | ---: | ---: |
| `MATCH-ee751367` | Empty email form | `4.174252` | `3.977713%` |
| `MATCH-bdc56e10` | Filled email form | `4.328299` | `4.132137%` |
| `MATCH-3131018d` | Empty email form with legacy offer | `4.500944` | `4.786745%` |
| `MATCH-417f6129` | Filled email form with legacy offer | `4.661273` | `4.919712%` |

The source and candidate align in dialog bounds, field geometry, heading/subtitle, privacy icon and copy, CTA size, and underlying New shell. Filled states now include the missing caption and preserve the email’s baseline below it. The offer’s title, supporting copy and action match in both legacy states. Remaining difference pixels are concentrated in lawful browser text, icon and artwork decoding/rasterization; no concrete text, state or control mismatch remains in these four frames.

## Interaction and safety review

All registered authentication interaction checks passed, including local form validation, password sign-in, passcode entry and the broader UI suite. This acceptance advances only the four `MATCH` rows; it does not mark an authentication `FLOW` complete. The app remains local-preview only: the captured fixture address/code/password stay local and no Apple account, subscription, payment or media stream is created.

The separate earlier capture at port 6444 lacked `REFERENCE_PREVIEW=1` and returned 404 for local comparison assets. Its partial failure evidence remains preserved. The accepted run uses port 6445 with preview enabled; both its screen and reference-asset routes returned HTTP 200 before capture.

Advance `MATCH-ee751367`, `MATCH-bdc56e10`, `MATCH-3131018d` and `MATCH-417f6129`. The ledger becomes **UI 159/159, MATCH 84/159, FLOW 24/58**. The artifact records exact capture output; the acceptance decision follows the readable source/current/residual review and the real-control regression run.
