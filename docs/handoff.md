# Courses - current handoff

Updated 2026-09-22. Only checkout `J:\courses`, only branch `main`, active app `apple-music-clone`. No course adaptation, replacement app, branch/worktree creation, cleanup or reference-archive mutation.

## Current verified implementation

The Artist fidelity batch accepts six exact scrolled/concert frames: `57f7c08e`, `edae3407`, `c9a554f4`, `0c042c32`, `9105a602` and `653efa95`. Final evidence root `.parity-evidence/artist-final-serial-20260922-150422` uses application identity `8d081b3c021dc59ced983d2fd71ebbcf9a7174e1bf1dae725e4c4ecb4543dc11`, QA-tooling identity `e9d473c6228e12920de5e2bf971703fcd5829f36928ab6bd098c946be171c0a0`, optimized build `ymsuj4c8fJlYwQKwY-YJC` and Chromium `151.0.7922.34`. The stable candidate passed 159 canonical desktop captures, five responsive captures, all 218 route checks and all 113 registered interactions with zero failures; all 159 exact-size comparisons completed. Corpus mean moved `4.896626 -> 4.901258` MAE and `4.919505% -> 4.922101%` over-20; readable review of the accepted frames and the largest positive-delta frames found only artwork/video decoding, gradient, blur and platform-raster variation. The initial Artist hero and its two menu frames retain a concrete lower-hero artwork/material mismatch, so the Artist detail, Nearby Concerts and Suggest Less journeys remain open. [Review](reference-review/2026-09-22-artist-scroll-concert-acceptance.md).

The initial New acceptance batch signs off exact state `e72be564` and six complete source-ordered journeys: Search, Artists, Albums, Songs, Music videos and All playlists. The native Moana provider removes the last concrete initial-edition artwork defect. The unchanged clean application tree `116ffff29c41915654d1648a3fdd373e41353817` passed 159 canonical desktop states, five responsive states, all 218 route checks and 109 registered interaction tests in GitHub Actions run `35628073726`; all 159 exact-size comparisons completed. A fresh current-local Chromium 151 rerun passed the native-artwork assertion plus all six journeys (`7/7`) with no page, console, request or HTTP failure. [Review](reference-review/2026-09-22-initial-new-flow-acceptance.md).

The expanded song-player acceptance batch signs off exact state `c939c9b8` on final tree `116ffff29c41915654d1648a3fdd373e41353817` (application repair through `4070d2661be4c66ff81af0efc588fd052e19fd00`). GitHub Actions run `35628073726` passed 159 canonical desktop states, five responsive states, all 218 route checks and 109 registered interaction tests with zero failures; all 159 exact-size comparisons also passed. [Review](reference-review/2026-09-21-expanded-player-repair-candidate.md).

The Chart detail acceptance batch signs off exact state `8a234785` and complete real-control `FLOW-d5d60236` on candidate `d2dd9e977ec357ee3038c069263b706c9099146b`. GitHub Actions run `35619076538` passed 159 canonical desktop states, five responsive states, all 218 route checks and 108 registered interaction tests with zero failures; all 159 exact-size comparisons also passed. [Review](reference-review/2026-09-21-chart-detail-acceptance.md).

The Emotional Songs Playlist acceptance batch signs off two exact states and two complete real-control journeys on full-corpus checkpoint `5b3d98d3398a679af3cbd23b15c455a078f6a2a5`. The Playlist implementation is unchanged from focused capture base `8b9f7c4`; the parent checkpoint passed the complete 159/5/218/107 clean-checkout verification. [Review](reference-review/2026-09-21-playlist-acceptance.md).

The flow-only acceptance batch registers source-ordered live-control journeys for Shuffle, Repeat and Favourite Songs on top of published checkpoint `8b9f7c4ff8dd1f178f070b13166082ad6fe6a323`. It changes no application UI and advances no MATCH state. [Review](reference-review/2026-09-21-ready-flow-acceptance.md).

The album-detail/editorial acceptance batch is verified on top of capture base `67486c52d1e5f50fafd911bf9d05d4b0393c9f50`. After publication, use `git rev-parse HEAD` and `git rev-parse origin/main` for the resulting checkpoint rather than treating the capture base as the final commit.

Read [the album acceptance review](reference-review/2026-09-21-album-acceptance.md), [the Replay review](reference-review/2026-09-21-replay-acceptance.md), [the New/charts/Home review](reference-review/2026-09-21-new-charts-acceptance.md), [the subscription artwork review](reference-review/2026-09-13-subscription-artwork.md), [the lyrics/account-session review](reference-review/2026-09-20-expanded-lyrics-account-session.md), and the owning rows in `docs/tasks.md`. Older blocker text is historical when the owning checklist row is now checked.

The album batch removes impossible overflow actions from four unavailable rows, replaces the invented browser ellipsis with source-observed hard clipping before the live `MORE` control, preserves the responsive one-line state, and registers the complete real-control editorial journey. Share and Copy Link retain source geometry, clipboard semantics, dismissal and focus restoration.

Optimized build `3lMCXoU9BTzVFkaF9EZMt` passed 159 canonical desktop captures, five responsive captures, all 218 route steps and all 105 registered interaction regressions with zero failures. Archive integrity reports 58 flows, 218 steps, 159 identities and 318 image variants. TypeScript, seven QA-tool tests and nine cover-integrity tests passed. All 159 exact-size comparisons completed. Evidence root: `apple-music-clone/.qa/evidence/album-final2-20260921`.

The three newly eligible journeys passed a targeted live-control rerun against that unchanged optimized app. Their publication adds two registered player cases, so the clean-checkout interaction total becomes 107; both GitHub workflows must pass for the exact publication SHA.

Corpus mean MAE changed `4.907618 -> 4.911074`; mean over-20 changed `4.927650% -> 4.931236%`. Readable source/current/residual review found no concrete product regression. The small movement is confined to truthful album text/control pixels plus repeat-run image, gradient, blur and antialiasing variance. `latest-metrics.json` is a diagnostic snapshot, not acceptance by itself.

## Acceptance and next work

UI 159/159; MATCH 74/159; FLOW 20/58. Initial New and the six source-ordered journeys above are accepted. The complete three-step expanding-song journey and the snapshot-changing Editing library menus journey remain open. The expanded-player, Chart, Playlist, ready-flow and album decisions remain accepted. `docs/tasks.md` remains the sole acceptance ledger.

Recompute the dependency report from the updated ledger before selecting the next independent family. Do not mark `FLOW-b6295ef8` complete unless `1f9e170c → 6ac70c34 → c939c9b8` is traversed continuously through truthful visible controls; the current regression proves only the real `6ac70c34 → c939c9b8` segment. Do not mark `FLOW-8db5f5fe` complete while its later immutable frames require different catalog, account and library snapshots. Do not reopen accepted states solely because lawful platform residuals are non-zero; reopen only for a concrete product mismatch or regression.

Some lyrics/queue/player and session-dependent captures still require recording-order investigation. Do not rename a user, replace a queue/library/catalog snapshot or inject fixture state behind an ordinary control to manufacture an endpoint.

## Runtime, identity and preservation

Remote-machine reconciliation completed on 2026-09-22. The pre-crash four-file batch was preserved at `apple-music-clone/.qa/recovery-20260922-073423`, compared against `origin/main`, and found to be either already published or superseded by stronger remote assertions. Local `main` was fast-forwarded without losing unrelated work.

Canonical development remains `http://127.0.0.1:6435/`, but no listener was running there when this handoff was updated. The retained final optimized audit listener is `http://127.0.0.1:6439/` (PID 12316, created 2026-09-22 14:57:55 local) from the active checkout and optimized build `ymsuj4c8fJlYwQKwY-YJC`; its reference-asset endpoint returns HTTP 200 `image/webp`. Port 6437 was not listening. These are observations, not authority to stop a reused PID: inspect command line, executable path, creation time and ancestry before any process action.

QA Python: `D:\courses-main-qa\audit-venv\Scripts\python.exe`. Browser: `D:\courses-main-qa\playwright-browsers\chromium-1234\chrome-win64\chrome.exe` (Chromium 151.0.7922.34).

Generated Next type-path churn was normalized only in `next-env.d.ts` and `tsconfig.json`; application/component/test changes were preserved. No `.qa`, build, downloaded candidate, credential, font or reference-original file belongs in Git.

Use coherent verified commits directly on `main` and ordinary push:

`git -c credential.helper= -c credential.helper=manager -c credential.interactive=never push origin main`

Verify both GitHub workflows for the exact pushed SHA. Parent CI success does not cover later dirty changes.
