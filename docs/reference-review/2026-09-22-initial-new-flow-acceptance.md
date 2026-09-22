# Initial New and source-ordered journey acceptance — 2026-09-22

## Scope and authority

This review uses `docs/tasks.md` as the sole acceptance ledger. It accepts exact state `e72be564` after the initial-edition Moana artwork repair and accepts six recorded journeys that already had individually accepted endpoints and registered source-ordered real-control coverage. It does not infer acceptance from aggregate image scores, route reachability or direct fixture navigation.

The application repair is `5b3d98d3398a679af3cbd23b15c455a078f6a2a5`. The clean optimized application tree remains `116ffff29c41915654d1648a3fdd373e41353817`; `116ffff..3d3a624` contains documentation changes only and no `apple-music-clone` source change.

## Exact-state decision

The last concrete `e72be564` blocker was the initial `New This Week` edition's second artwork. The repair replaces the generic `cover-9` fallback with the native provider resource `cover-moana-live-action-soundtrack`, keeps it a real interactive card rather than a screenshot fragment, and preserves the lawful partial continuation beneath the floating player.

Exact source/current/residual review at the 1440×903 application viewport found matching scenario state, strings, layout, feature order, Viral Hits rows, initial lower-release order, Moana artwork identity, player/sidebar material ownership, controls and scroll position. The remaining residual is confined to Windows/Chromium text and SVG antialiasing, translucent-material rasterization and decoder variation; no concrete product mismatch remains.

| Evidence | Candidate | Result for `e72be564` |
| --- | --- | --- |
| Windows optimized full corpus | `.qa/evidence/e72-moana-acceptance-20260921-2248` | MAE `2.418754`; over-20 `2.413175%`; improvement `-0.091107` MAE / `-0.394903` percentage points |
| Clean GitHub Actions corpus | run `35628073726`, artifact `reference-candidate-116ffff29c41915654d1648a3fdd373e41353817` | MAE `2.317295`; over-20 `2.390104%`; 159 desktop, five responsive, 218 routes and 109 interactions passed |
| Current-local focused rerun | `.qa/evidence/e72-focused-current-20260922-074919` | native Moana provider assertion passed against Chromium `151.0.7922.34` |

The immutable source SHA-256 is `a76e7f75d85f3639aa185a215a9d829232fe69d8a4b5f68a4f334520f4b11b03`. The provider record retains its declared asset and content hashes; no reference original, screenshot overlay, guessed color layer or hidden fixture transition was introduced.

## Accepted recorded journeys

Each journey below begins from its recorded first state and uses visible application controls through every saved endpoint. The focused rerun passed all six with no page, console, request or HTTP failure.

| Flow | Recorded sequence | Real-control path |
| --- | --- | --- |
| `FLOW-6c5d545e` — Search | `e72be564 → 035569a0 → 812ba627 → 5b3ec96a` | Open Search, focus the library field, submit the recorded query and reach the recorded empty result state. |
| `FLOW-9decd1cd` — Artists | `e72be564 → 0df0d2a2 → 610af644` | Open Artists from the visible Library navigation, then select the recorded artist. |
| `FLOW-2797b86f` — Albums | `e72be564 → 5d3db7ca` | Open Albums from the visible Library navigation and verify the recorded grid. |
| `FLOW-0e305ee9` — Songs | `e72be564 → 92589389` | Open Songs from the visible Library navigation and verify the eight recorded rows in order. |
| `FLOW-51ec8869` — Music videos | `e72be564 → 4e857921` | Open Music Videos from the visible Library navigation and reach the recorded empty state. |
| `FLOW-b49a8505` — All playlists | `e72be564 → 8a2a4241` | Open All Playlists from the visible Playlists navigation and verify both recorded cards. |

The current-local focused runner passed `7/7`: one native-artwork assertion plus the six complete journeys. The parent Windows corpus passed 107 registered interactions with zero failures, and the clean GitHub corpus passed 109 with zero failures.

## Explicit exclusions

`FLOW-8db5f5fe` — Editing library menus remains open. Its controls are exercised, but the immutable recording changes catalog, account and library snapshots after the first frame while the truthful live controls preserve the starting snapshot. The later endpoints therefore remain visually unverified.

`FLOW-b6295ef8` — Expanding a song remains open. The real `6ac70c34 → c939c9b8` segment passes, but no truthful ordinary control reproduces the recorded `1f9e170c → 6ac70c34` catalog/session transition. No fixture injection or unrelated state replacement is accepted as a substitute.

No other screen or flow is advanced by this review.

## Ledger result

Advance `MATCH-e72be564` and exactly the six flows listed above. The sole live ledger becomes **UI 159/159, MATCH 68/159, FLOW 20/58**.
