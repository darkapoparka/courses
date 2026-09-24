# Account Settings screen and recorded-flow review

Date: 2026-09-23. Review type: direct screenshot acceptance plus real-control journey diagnostics; Codex self-review.

## Candidate and evidence

- Checkout: `J:\courses`, branch `main`, source commit `d71c3c4355d847867fc04aa1f4b69cb8035aba4d`.
- Optimized local candidate: `http://127.0.0.1:6457`, build ID `9trrKgS97OiuUzDZCedaU`.
- Application identity: `19b5a0f2af4f2abfc711a73be3bb16864e1a75a2c15a08b35aec156d8e0b8a06`.
- QA identity: `6164bae460bbef08f1853a539efd008676a3932091a94f2a84d3848e782e310d`.
- Chromium `151.0.7922.34`, Windows 11. The full optimized run rendered 159 desktop and five responsive states, checked 218 route steps and passed 117 interaction regressions with zero failures. The exact-size comparator completed all 159 screens.
- Full-corpus evidence: [browser run](../../apple-music-clone/.qa/evidence/account-profile-gear-final-20260923/browser) and [159-screen comparison gallery](../../apple-music-clone/.qa/evidence/account-profile-gear-final-20260923/comparison-root/comparison/index.html). These paths are junction-backed; preserve their targets.
- The two account flows were registered in `apple-music-clone/scripts/browser_account_session.py` and run through the canonical `browser-reference.py` `run_case` harness. Results are in `browser/targeted-account-flow-results.json`; ordered screenshots and hashes are in each journey's `steps.jsonl` and `comparison.json`.

## `MATCH-481cd568` — Account Settings

Original SHA-256: `e0e185c4f8b40663ef37824489458f5be725578a96cf447e8418fd0c88b19e62`.

Candidate render SHA-256: `c69197bd185b8971777bf3bdb76e6b4b690cc28681ed8395b54c815e41e4a707`. The comparison uses the exact `1440 × 903` viewport and crop `[0, 0, 1440, 903]`; MAE is `4.655360`, and pixels over 20 are `3.777916%`.

The full-size source, render and amplified residual show matching Account Settings title, summary and billing fields, Singapore region, account balance, Account Access teaser, Radio sidebar selection, footer and player. Text wraps and section geometry align. Remaining residuals are small browser text/glyph raster and edge differences; no concrete product mismatch remains in this direct state. `MATCH-481cd568` is checked. This accepts the screenshot state only.

The already accepted `MATCH-44101453` was rechecked in the same fresh corpus at `1440 × 903`; its source/render are aligned and its residual remains text/control raster. Its independent screen acceptance is unchanged.

## `FLOW-079e1da7` — Logging out

The three real-control steps passed: open the permitted `e72be564` initial screen, open Account menu, choose Sign Out, and verify the signed-out New screen with Sign In and no account/library navigation. Browser and page-console checks passed.

The intermediate screenshot is not a visual match. The recorded initial source `e72be564` has one personal playlist, and the live browser retains that state after opening the menu. The saved `fc5d84bd` menu screenshot instead contains three personal playlists. The control does not change playlists, so the live `fc5d84bd` checkpoint has MAE `9.869` and `10.983%` over-20 pixels against that source. The initial and signed-out endpoints are close (MAE `2.380` / `2.748`). Keep the flow open; do not inject unrelated playlist state to manufacture the intermediate screenshot.

## `FLOW-c4422161` — Settings

The five real-control steps passed: begin at the permitted `fc5d84bd` menu, choose Settings, then use the account pane's native wheel scrolling through Account Access, Parental Controls and Subscriptions. Clean/G/G values remain unchanged. Browser and page-console checks passed.

The saved `481cd568` and `1e5b4763` stills highlight Radio. Opening Settings from the recorded `fc5d84bd` state, where New is selected, retains New in the live sidebar. Later saved `01f96377` and `44101453` screenshots highlight New again without an intervening navigation control. The live journey preserves the actual selection and does not toggle it during scrolling. Direct screen `MATCH-481cd568` is accepted separately; keep the complete Settings flow open until this source-state conflict is resolved from evidence.

## Decision and limits

The live ledger is UI `159/159`, MATCH `99/159`, FLOW `26/58`. Both account journeys work through real controls, but neither receives FLOW acceptance because one or more continuous checkpoints visibly disagree with the saved source snapshots. No credentials, payment data, external account changes, or subscription actions were used. No commit or push was made.
