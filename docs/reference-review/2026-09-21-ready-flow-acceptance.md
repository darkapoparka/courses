# Shuffle, repeat and Favourite Songs flow acceptance

Updated 2026-09-21. This is a flow-only acceptance review on top of published checkpoint `8b9f7c4ff8dd1f178f070b13166082ad6fe6a323`. It changes no application UI, reference original, catalog, session fixture or MATCH decision.

## Scope and ordered journeys

| Flow | Recorded sequence | Live action |
| --- | --- | --- |
| `FLOW-0bb078b9` — Enabling shuffle | `1f9e170c` → `cf59e554` | Click the visible compact-player Shuffle control; Repeat remains off, playback remains active and the current song/content snapshot is preserved. |
| `FLOW-aa772c0f` — Repeating a song | `1f9e170c` → `a229e38a` | Click the visible compact-player Repeat control; Shuffle remains off, playback remains active and the current song/content snapshot is preserved. |
| `FLOW-6f857f3f` — Favorite songs | `a917d88f` → `bde65d33` | Open Favourite Songs from the visible Playlists navigation and verify the four recorded rows. |

All six referenced endpoint states were already individually MATCH-accepted before this batch. The new work proves source order and control continuity; it does not use `/flows/...` endpoint jumps as journey evidence.

## Verification evidence

The parent clean checkout passed 159 canonical desktop captures, five responsive captures, all 218 archived route steps and 105 registered interaction regressions in GitHub Actions run `35607931228`. The targeted local runner then exercised these three complete journeys against the same optimized app and passed all three; evidence root: `apple-music-clone/.qa/evidence/ready-flow-targeted-20260921-170155`.

A fresh combined local rerun after registering the two player journeys completed all 159 canonical desktop captures plus four responsive captures with no reported failure before the Remote Desktop Commander monthly quota ended the terminal session. Because that interrupted run did not emit a final summary, it is supporting evidence only, not a claimed full-corpus pass. The publication commit must pass both repository workflows in a clean GitHub checkout.

The player cases also round-trip their toggles and assert focus return after the recorded endpoint, so the active-state evidence does not leave hidden state behind for later cases. The existing Favourite Songs case retains its source-ordered initial Home capture and opens the endpoint through the real sidebar control.

## Acceptance decision

Advance exactly `FLOW-0bb078b9`, `FLOW-aa772c0f` and `FLOW-6f857f3f`. No MATCH checkbox changes. The sole live ledger becomes **UI 159/159, MATCH 63/159, FLOW 11/58**.

Publication SHA: pending connector publication. GitHub Actions success for the exact published SHA is required; parent success does not cover later changes.
