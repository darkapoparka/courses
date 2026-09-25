# 2026-09-25 Changing Language acceptance

This review accepts the Simplified Chinese Account Settings state and the complete five-step Changing Language journey for the Apple Music reference reconstruction in `J:\courses` on `main`. `docs/tasks.md` remains the sole acceptance ledger; numerical diagnostics support this decision but do not establish it by themselves.

## Exact candidate and evidence

- Source commit base: `8fc810bec2daf44354fc3e6207b8d12eda9241d0` on `main`.
- Application identity: `fe02890b898183e3948eaa12aaa05173e0061bb5232741109671cdbde8abfa8f`.
- QA tooling identity: `5a4d314c5efd8382cb386ef77e019b875c145345c6f81f4e058b1f1b58b83c9e`.
- Production build ID: `zGxMyWKjc_OcQviTMYeW9`.
- Browser: Chromium `151.0.7922.34`; exact desktop viewport `1440 x 903`; device scale factor `1`.
- Browser and journey evidence: `H:\courses-final-parity\language-final3-full-20260925-185036\browser`.
- Exact-size comparisons: `H:\courses-final-parity\language-acceptance-final-stage-20260925-174019\.parity-evidence\language-final3-comparison-20260925-190358`.
- Production preview used for verification: `http://127.0.0.1:6534`.

Because the active `J:` volume did not have room for another dependency tree and build, the exact tracked working-tree source was copied without alteration to `H:\courses-final-parity\language-acceptance-final-stage-20260925-174019`. The final staging manifest covers 707 tracked application files, 58,410,820 bytes, and aggregate SHA-256 `df16ffe3effb37484f8033d0cec6d804a452ba655d669a77c1895c28ca00b428`; it reports no missing or mismatched files. No retained output, evidence directory, junction, reference original, or unrelated file was removed or overwritten.

The exact candidate rendered 159 desktop and five responsive states, checked all 218 ordered flow routes, and ran 128 real-control interaction regressions with zero failures. Candidate application and tooling identities were unchanged before and after capture. All 159 exact-size comparisons completed with zero functional failures; corpus mean MAE is `4.725060` and mean over-20 share is `4.698218%`.

## Exact-state findings

| Screen | Source SHA-256 | Render SHA-256 | MAE | Pixels over 20 | Decision |
| --- | --- | --- | ---: | ---: | --- |
| `481cd568` | `e0e185c4f8b40663ef37824489458f5be725578a96cf447e8418fd0c88b19e62` | `c69197bd185b8971777bf3bdb76e6b4b690cc28681ed8395b54c815e41e4a707` | 4.655360 | 3.777916% | Reconfirm accepted English start state |
| `50fe374b` | `287c1d9ff850f5b5cc91ea3fae952032263badc5a5d4f7b2a5d95f7478cfbe0c` | `d1b60c009902da935eddead1a7e1d2d2bd88a7aca03455f5a7baa2f3a06fcffc` | 4.240844 | 3.866433% | Accept |
| `f4a8b5dc` | `83a11f93a5008bc488a75f0d6fad151955241319c88a8f029637aa34fd7a8398` | `d17062868345c3c68df07a7fe0262a82d594c769a4c7e7a5e7e88a58cef52b85` | 5.725734 | 8.058093% | Reconfirm accepted localized Search state |
| `468b0465` | `d4c70af056d30b6c5291cb0f4109e250da4b3a8497dfcdc8325b63e26ba431ab` | `ad4ab1322eba5cc70e2fcfc02d6cab41133394817528e9cd78f176b34ae26318` | 4.535365 | 4.791590% | Reconfirm accepted localized Home state |
| `be864051` | `0a86535163c200834637edc6bb43d895ba51a9adbe4d1acedcba655394fd9882` | `d392c1be0c9b7c69524afadabe97c06a1d43ed8e1c069255673ff856741aab39` | 5.023356 | 6.071198% | Reconfirm accepted localized New state |

Readable full-frame and regional source/render/residual inspection confirms that `50fe374b` preserves the recorded Simplified Chinese sidebar labels and selection, Account Settings title and rule, summary columns, payment and billing copy, country/region, account balance, Account Access section, fixed footer, account identity, compact player, scroll anchor, clipping and spacing. The translated Account Access paragraph now follows the saved line wrapping. Remaining pixels are lawful browser text and icon rasterization, antialiasing, thin-rule edges and material blur; no actionable product mismatch remains.

Accordingly this review accepts `MATCH-50fe374b`.

## Continuous Changing Language journey

`FLOW-59b6cb8b` traverses all five recorded checkpoints through visible controls:

1. Start at the saved English Account Settings state `481cd568`.
2. Use the footer language control to switch to Simplified Chinese and produce `50fe374b` without a direct route jump.
3. Use the translated Search sidebar control to produce `f4a8b5dc`.
4. Use the translated Home sidebar control to produce `468b0465`.
5. Use the translated New sidebar control to produce `be864051`.

Each journey screenshot is byte-identical to the corresponding direct candidate screenshot for this exact source identity. The locale persists through all visible navigation, the browser URL/history changes only through the actual controls, and the session retains the recorded account identity, playlist rows, sidebar state, footer, player and catalog chrome. The journey completed with no page errors, console errors, failed requests or unexpected HTTP responses. The registered `recorded-changing-language-flow` regression passed in the canonical 128-interaction suite.

Accordingly this review accepts `FLOW-59b6cb8b`.

## Acceptance result

The acceptance ledger advances from **UI 159/159, MATCH 122/159, FLOW 31/58** to **UI 159/159, MATCH 123/159, FLOW 32/58**. This review does not accept cancellation, Settings, logout, login or any other still-unchecked state or journey.
