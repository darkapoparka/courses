# Courses - current handoff

Updated 2026-09-21. Only checkout `J:\courses`, only branch `main`, active app `apple-music-clone`. No course adaptation, replacement app, branch/worktree creation, cleanup or reference-archive mutation.

## Current verified implementation

The album-detail/editorial acceptance batch is verified on top of capture base `67486c52d1e5f50fafd911bf9d05d4b0393c9f50`. After publication, use `git rev-parse HEAD` and `git rev-parse origin/main` for the resulting checkpoint rather than treating the capture base as the final commit.

Read [the album acceptance review](reference-review/2026-09-21-album-acceptance.md), [the Replay review](reference-review/2026-09-21-replay-acceptance.md), [the New/charts/Home review](reference-review/2026-09-21-new-charts-acceptance.md), [the subscription artwork review](reference-review/2026-09-13-subscription-artwork.md), [the lyrics/account-session review](reference-review/2026-09-20-expanded-lyrics-account-session.md), and the owning rows in `docs/tasks.md`. Older blocker text is historical when the owning checklist row is now checked.

The album batch removes impossible overflow actions from four unavailable rows, replaces the invented browser ellipsis with source-observed hard clipping before the live `MORE` control, preserves the responsive one-line state, and registers the complete real-control editorial journey. Share and Copy Link retain source geometry, clipboard semantics, dismissal and focus restoration.

Optimized build `3lMCXoU9BTzVFkaF9EZMt` passed 159 canonical desktop captures, five responsive captures, all 218 route steps and all 105 registered interaction regressions with zero failures. Archive integrity reports 58 flows, 218 steps, 159 identities and 318 image variants. TypeScript, seven QA-tool tests and nine cover-integrity tests passed. All 159 exact-size comparisons completed. Evidence root: `apple-music-clone/.qa/evidence/album-final2-20260921`.

Corpus mean MAE changed `4.907618 -> 4.911074`; mean over-20 changed `4.927650% -> 4.931236%`. Readable source/current/residual review found no concrete product regression. The small movement is confined to truthful album text/control pixels plus repeat-run image, gradient, blur and antialiasing variance. `latest-metrics.json` is a diagnostic snapshot, not acceptance by itself.

## Acceptance and next work

UI 159/159; MATCH 63/159; FLOW 8/58. The album review advances eight MATCH states and three complete real-control FLOW journeys. `docs/tasks.md` remains the sole acceptance ledger.

Continue with a dependency report from the unchecked rows in `docs/tasks.md`, the recorded flow map and current metrics. Prioritize independent families with existing real-control regressions and the largest flow-unlock count. Do not reopen accepted New, Home, Replay, account, trial or album states solely because lawful platform residuals are non-zero; reopen only for a concrete product mismatch or regression.

Some lyrics/queue/player and session-dependent captures still require recording-order investigation. Do not rename a user, replace a queue/library/catalog snapshot or inject fixture state behind an ordinary control to manufacture an endpoint.

## Runtime, identity and preservation

Canonical dev is `http://127.0.0.1:6435/` (listener PID 4728 when this handoff was written). The retained optimized listener is on `http://127.0.0.1:6437/` (PID 12600). The album audit listener remains on `http://127.0.0.1:6439/` (PID 17504) from the active app and verified build. These are observations, not authority to stop reused PIDs: inspect command line, executable path, creation time and ancestry before any process action.

QA Python: `D:\courses-main-qa\audit-venv\Scripts\python.exe`. Browser: `D:\courses-main-qa\playwright-browsers\chromium-1234\chrome-win64\chrome.exe` (Chromium 151.0.7922.34).

Generated Next type-path churn was normalized only in `next-env.d.ts` and `tsconfig.json`; application/component/test changes were preserved. No `.qa`, build, downloaded candidate, credential, font or reference-original file belongs in Git.

Use coherent verified commits directly on `main` and ordinary push:

`git -c credential.helper= -c credential.helper=manager -c credential.interactive=never push origin main`

Verify both GitHub workflows for the exact pushed SHA. Parent CI success does not cover later dirty changes.