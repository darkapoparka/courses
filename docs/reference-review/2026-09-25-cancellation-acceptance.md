# 2026-09-25 cancellation screens and continuous journey acceptance

This review accepts the three previously open cancellation states and the complete five-step **Canceling a trial** journey. `docs/tasks.md` remains the sole acceptance ledger.

## Candidate and evidence

- Source commit before publication: `f6b505103c8913b14384b643ddd342d5bb5a6d0e` on `main`.
- Application identity: `64bf728a0a63daf6749212328075f6abb2d23da62cd80e3419e53844cf6ab05b`.
- QA identity: `95ad115354985d5159582599a5be214f6cf1524ddc591553c0771a42f5f7529a`.
- Production build: `ci6-kFunT-wWZ2r-BHxLE`.
- Runtime: `http://127.0.0.1:6535`, Chromium `151.0.7922.34`.
- Exact evidence: `apple-music-clone/.qa/evidence/gpt56-cancellation-full-20260925-2129/{browser,comparison}`.
- Focused journey evidence: `H:\courses-final-parity\cancellation-exact-stage-20260925-201358\.parity-evidence\cancellation-focused-20260925-2020`.
- The 707 staged source files are byte-identical to the working-tree source after normalising only generated `next-env.d.ts` and `tsconfig.json` build-path churn.

## Truthful session repair

The visible **Cancel Free Trial** action now resolves the account session from the compact `SmithAlex`/one-playlist subscription snapshot to the recorded `Alex Smith`/three-playlist cancellation snapshot. The session change is represented directly in scene state; it does not rewrite the user's library, replace playlists, or inject a hidden fixture state.

The resolved account chrome persists through confirmation, result acknowledgement, and the cancelled subscription page. Browser Back to Account Settings restores the earlier compact subscription snapshot. Escape and **Keep Subscription** retain focus and the resolved cancellation chrome without cancelling the preview.

## Exact screen review

All screenshots are native `1440 × 903`, device scale 1. Source, render, and amplified residual were reviewed at full viewport and around the sidebar, account content, dialogs, footer, player, and trial banner.

| Screen | Source SHA-256 | Render SHA-256 | MAE | Pixels over 20 | Decision |
| --- | --- | --- | ---: | ---: | --- |
| `44101453` | `f3aedab17874f2a85aa08d16fdd6f82e145613aa8c60e7e5e91b5de55b7b8d00` | `1460fbe242b09944bc275a1c0ef30891f0d23e609b646e601f2f54e4b23e0a10` | 3.037688 | 2.555756% | Reconfirm accepted start state |
| `c0997fe5` | `bbabd7cd6b357435b02a74fdab4c393c1fb7bbb2687721c7e98ec8c9c9d788ea` | `60e9ad3dd0c5d00235ef909fce0944a7b6835dd4f8864aa050e678f99953b3ac` | 3.388115 | 2.769780% | Reconfirm accepted Manage state |
| `fd1c0c71` | `470e9a1d0ceeb7722324c3dd41a5fd181618e5ecaff46194af59665165a6ff87` | `9f58ce7ad359c3feafe0924eaaf0d544e80fed468e00043e0c857ed14e9ba590` | 3.792389 | 2.637120% | **Accept** |
| `03157020` | `097a402f18a4c9cf9ecfc8a61e6368723934dcaad957e6e04c62d17f0dc426bc` | `4ea5e7b5d717680b757f06b8c01f22c56fa650a73ef1a5263f3924221b185fff` | 3.863071 | 2.886674% | **Accept** |
| `603983c7` | `717d1f34f9a3c7d7a52f4f9d31c1e805d5729e86fc5204ee15a7735c4fc7ac76` | `12a718fa91e62e44de1bcb21869fb3d24ea2f6e4f8f085182e932351c97430d4` | 3.363682 | 3.006645% | **Accept** |

`fd1c0c71` now has the recorded full account name, three playlist rows, dimmed Account Settings underlay, dialog material, Apple Music mark, copy, action geometry, footer and player. `03157020` preserves the still-active subscription details beneath the success acknowledgement and matches its full-name/three-playlist chrome. `603983c7` reveals the cancelled state only after **Done** and the local notice clears; its signed-out trial banner, sidebar, footer and compact player align. Remaining residuals are text/icon antialiasing, blur, and subpixel edge variation rather than a concrete product mismatch.

## Continuous real-control journey

The canonical runner traversed all five checkpoints without URL hopping after the permitted initial state:

1. `44101453` — start at saved Account Settings.
2. `c0997fe5` — use **Manage**.
3. `fd1c0c71` — use **Cancel Free Trial**, resolving the full account session.
4. `03157020` — use **Cancel Subscription** while preserving the subscribed underlay.
5. `603983c7` — use **Done** and wait for the local notice to clear.

Each journey screenshot is byte-identical to the corresponding direct candidate capture. The run also checks Escape focus restoration, **Keep Subscription**, browser Back restoration, exact account/sidebar state, and the absence of page, console, request, or unexpected HTTP errors. No external account, billing provider, or media service is contacted.

## Regression and corpus verification

- TypeScript: passed.
- QA Python tooling: 11 tests passed.
- Frozen archive: 58 flows, 218 steps, 159 identities, 318 image variants.
- Cover integrity: 9 tests passed.
- Full browser run: 159 desktop + 5 responsive states, 218 ordered routes, 128 interaction regressions, 0 failures.
- Candidate identity remained unchanged before and after the complete browser run.
- Exact comparisons: 159/159 completed, 0 functional failures.
- Corpus mean MAE: `4.736102`; mean over-20 share: `4.696375%`.
- Five consecutive focused native-scroll reruns passed after the bounded real-key retry repair.

## Acceptance decision

Accept `MATCH-fd1c0c71`, `MATCH-03157020`, `MATCH-603983c7`, and `FLOW-16a876bc`.

Ledger after this batch: **UI 159/159, MATCH 126/159, FLOW 33/58**. Numerical diagnostics support the review but are not the acceptance basis.
