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


## Profile menu and logout acceptance — 2026-09-25

This section supersedes the earlier `FLOW-079e1da7` diagnosis above. Exact reinspection of the immutable `fc5d84bd` source shows the saved profile-menu frame has **All Playlists only**, not three playlist rows. Opening Account from `e72be564` now resolves only the recorded named-profile/menu chrome and current New editorial provenance; it does not replace library records. Sign Out clears that provenance and restores the signed-out New edition, including the short `I Knew It, I Knew You` title.

### Exact candidate

- Source base: `ce7382ec0ec4ca42b24d2a986fa21585bc9cb5ef`; branch `main`.
- Production build: `GM5iGeaIa4coS6v1WmWtj` at `http://127.0.0.1:6539`.
- Chromium: `151.0.7922.34`; application identity `c62601b051d317dc73e616fb38c7199b7987f9cd84cb5863d0bf17d301d85cf6`; QA identity `9210781b052aed39f6fff8e429acab48fc837d481b445aa493742f5571565c37`.
- Full evidence: `J:\courses\apple-music-clone\.qa\evidence\gpt56-logout-final-20260925-232804`; focused evidence: `apple-music-clone/.qa/evidence/gpt56-profile-focused-20260925-232737`.
- Complete gate: 159 desktop + 5 responsive states, 218 routes, 128 interactions, zero failures; 159 exact comparisons. Corpus mean MAE `4.733041`, mean over-20 `4.693121%`.

### `MATCH-fc5d84bd`

Source SHA-256 `e87f1135e97a8f896869558407a9f4ff635539a0c1f759a840485dd73437fbb4`; render SHA-256 `c380f67f98cbfc29fa7ad59f83182988d39f8085a664a627d8d5025b97b4cc8b`; exact viewport `1440 × 904` at device scale 1; MAE `3.983670`, over-20 `4.045753%`. Readable full-frame and residual review confirms the menu anchor, Help/Settings/Transfer Music/Sign Out rows, one-row playlist chrome, SmithAlex footer, current editorial artwork, player material, clipping and scroll state have no remaining concrete product mismatch. `MATCH-fc5d84bd` is accepted.

### `FLOW-079e1da7`

| Step | Screen | Source SHA-256 | Live render SHA-256 | Visible action |
| ---: | --- | --- | --- | --- |
| 1 | `e72be564` | `a76e7f75d85f3639aa185a215a9d829232fe69d8a4b5f68a4f334520f4b11b03` | `664d7b67be91b5ec6eda76ef706611d5f0a3c31034457b1543dcfb89004e64ee` | Begin at the recorded New screen with the compact account session |
| 2 | `fc5d84bd` | `e87f1135e97a8f896869558407a9f4ff635539a0c1f759a840485dd73437fbb4` | `c7f4960168699bcec5e57aaf9bbb898ec54a992d939d671d628722a3905f9eba` | Open the source-aligned account menu using the profile control |
| 3 | `3731221f` | `d066c557f8a724aa17fbadb401ab564a093ff0cc557762762280dfb4705dd7b9` | `a75a7dc2ec9756b6622398bc8df7c10870ef027c70e7411eecadb97222ef36d3` | Sign Out returns to the same New page in the signed-out session |

The journey starts once at `e72be564`, opens the real Account menu, then invokes the visible Sign Out item. All checkpoints retain the same browser URL, so there is no direct route hopping. The final live `3731221f` frame was reviewed against both the frozen source and direct candidate; repeat-run raster/decode variation remains, but no concrete product mismatch is visible. Profile, playlist, guest/trial, current-release and player state are produced by the continuous session; page, console, request and HTTP error lists are empty. The accepted Alpha sidebar regression confirms profile-menu resolution is scoped to this recording and does not change the accepted Alpha edition. `FLOW-079e1da7` is accepted.

The ledger after these decisions is UI `159/159`, MATCH `127/159`, FLOW `34/58`. `FLOW-c4422161` remains open under its separate Radio/New sidebar chronology issue.
