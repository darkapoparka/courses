# 2026-09-25 Connected Accounts and Content Restrictions acceptance

This review accepts nine exact account states and two source-ordered account journeys for the Apple Music reference reconstruction in `J:\courses` on `main`. `docs/tasks.md` remains the sole acceptance ledger; numerical diagnostics support this decision but do not establish it by themselves.

## Exact candidate and evidence

- Source commit base: `6dd6b002a1d398ad690a9b848f7d71a48b2288f4` on `main`.
- Application identity: `1301ea3cd3bbaa962db1a7200b17c54262ebbcd022a124a26428ca90cd821957`.
- QA tooling identity: `77318c488ad06246e487260ffc03e4e29a42b73c0b6eee63c30dbeb54ccc66e9`.
- Production build ID: `ZfQw3V4yLj1m7WAb3uAml`.
- Browser: Chromium `151.0.7922.34`; exact desktop viewport `1440 × 903`; device scale factor `1`.
- Browser and journey evidence: `apple-music-clone/.qa/evidence/gpt56-account-acceptance-final-prod-20260925-162601/browser`.
- Exact-size comparisons: `apple-music-clone/.qa/evidence/gpt56-account-acceptance-final-prod-20260925-162601/comparison`.
- Production preview used for verification: `http://127.0.0.1:6531`.

Because the active `J:` volume had insufficient room for another dependency tree and build, the exact tracked working-tree source was copied without alteration to `H:\courses-final-parity\account-acceptance-final-stage-20260925-162203`. The staging manifest covers 707 tracked application files, 58,405,432 bytes, and aggregate SHA-256 `542206c437d8ea5f6c709f2bcd7c987b7f9e9bc0e5ad8020d0d338d34ed6f98b`. Byte verification before and after the build found no source mismatch and no staging-source mutation. Locked dependencies were installed with pnpm `10.11.0`; no retained output, evidence directory, junction, reference original, or unrelated file was removed or overwritten.

The exact candidate rendered 159 desktop and five responsive states, checked all 218 ordered flow routes, and ran 127 real-control interaction regressions with zero failures. Candidate application and tooling identities were unchanged before and after capture. All 159 exact-size comparisons completed with zero functional failures; corpus mean MAE is `4.729233` and mean over-20 share is `4.699989%`.

## Exact-state findings

| Screen | Source SHA-256 | Render SHA-256 | MAE | Pixels over 20 | Decision |
| --- | --- | --- | ---: | ---: | --- |
| `b2e0f231` | `3eee22d032069f99c66ef25cedb2490a1299256ffe35f49c37f20f0d02c0d8c2` | `c4f8e5c0dec32af2ed32cbbaacdfaab2a291a7e5eeafd14dfa945c9b396121b7` | 2.780803 | 1.917451% | Accept |
| `f99d9583` | `4010034ff8c2b4bb297bfe274539961aa2556bcec81ef9812cf89884d09b61b7` | `6a9bdfccb64387776692c75ff6398cbf52c4fb5ea7ad408245cd59792b623c60` | 3.247366 | 2.057109% | Accept |
| `0da4882b` | `55a4f9f3f98a5b13c575a079d0229a274de9c157e261748417b984290c8b240a` | `a08efe72dc4f3877246b6ad960d8a362833b8c1138719f7bda2a2deae359e9eb` | 3.285541 | 2.102636% | Accept |
| `8b9e8598` | `ad047cf87c64a93e61721e3fd1ece80a573a482f01f895c206c175a684d6d10d` | `187eec41765052d6387992bde7799f3036c067f5e6fac43f17ef4658b0b3ba00` | 2.998008 | 1.844623% | Accept |
| `0260ef9f` | `7d0c2fcdf2ec99584d073039b65845662694e8093ae4cf3581d09766026c01c3` | `f6739977cf366b1f53ce629a6764842bd1ddeba195a2769b3b7e801c4a286d21` | 3.039184 | 1.887228% | Accept |
| `5b34ad72` | `86f42669191e5731c260a8c73afb4aea61bd21fd27dfe58a3d37852b8cd44950` | `3feb359c2123dff13787a9557ec8f5c4ac70bf3a28cf27ffb5c8904c221f378e` | 3.664256 | 2.484388% | Accept |
| `7437b956` | `42c286125eb64d5ba649ed0701c6d8a0e5365bb529c9dffaffd78289a029b9dd` | `4f3c97ed2851cc4b82c1eaef4abc7ce920d5f90fa638f1a18077fa0b693846e9` | 3.101927 | 2.007429% | Accept |
| `6436de36` | `e43c773f913c23092242c0598943651a1bff89a0980201457885b54ba85e94d8` | `ad947b4d4e0691b8674741625ea04c48a6911eb999898d10b088e04a30417559` | 3.811919 | 3.299188% | Accept |
| `c0997fe5` | `bbabd7cd6b357435b02a74fdab4c393c1fb7bbb2687721c7e98ec8c9c9d788ea` | `b9034c6bfff8ea632a08277f677dfcc39e335c2f52841e3c4ec501c5271ab1e4` | 3.388130 | 2.769934% | Accept |

Readable full-frame and regional source/render/residual inspection confirms the Connected Accounts heading, description, divider, sidebar, footer and compact player align. The restriction sequence preserves the recorded parental-controls scroll anchor, modal bounds, close control, passcode boxes and dot state, recovery-email copy and field geometry, completion checkmark, enabled switch, rating values, and fixed footer/player. The subscription state preserves the source artwork, copy, spacing, buttons, one-row playlist chrome, and account identity. Remaining pixels are lawful browser text/glyph rasterization, antialiasing, border edges, and blur noise; no actionable product mismatch remains in these nine direct states.

Accordingly this review accepts:

- `MATCH-b2e0f231`
- `MATCH-f99d9583`
- `MATCH-0da4882b`
- `MATCH-8b9e8598`
- `MATCH-0260ef9f`
- `MATCH-5b34ad72`
- `MATCH-7437b956`
- `MATCH-6436de36`
- `MATCH-c0997fe5`

## Connected Accounts journey

`FLOW-d1a98fb1` starts at saved Account Access state `1e5b4763`, with `SmithAlex`, Radio selected, and the recorded three playlist rows. The visible **Manage Connected Accounts** button opens `b2e0f231`, adds one browser-history entry, exposes the source-owned **All Playlists**-only subpage chrome, and selects New. Browser Back returns to Account Settings, restores the initial three-row sidebar and Radio selection, and preserves the account identity. The journey uses no direct checkpoint URL after its permitted initial state.

## Turning on Content Restrictions journey

`FLOW-29245bc1` traverses all eight saved checkpoints continuously through visible controls:

1. Start at `01f96377` with restrictions off.
2. Click **Content Restrictions** to open `f99d9583`.
3. Enter `1234` to produce `0da4882b`.
4. Click **Continue** to reach confirmation state `8b9e8598`.
5. Re-enter `1234` to produce `0260ef9f`.
6. Continue to recovery-email state `5b34ad72`, retaining `alexsmith@content-mobbin.com`.
7. Submit the recovery email and show `7437b956`.
8. Click **Done** to return to enabled controls at `6436de36`.

The final state restores focus to the switch, reports it checked, retains Music and Podcasts `Clean`, TV shows `G`, Movies `G`, aligns Parental Controls at the recorded top position, and preserves the saved one-row playlist chrome throughout. No checkpoint uses a direct route jump. Both account journeys completed with no page errors, console errors, failed requests, or unexpected HTTP responses.

Accordingly this review accepts `FLOW-d1a98fb1` and `FLOW-29245bc1`.

## Acceptance result

The acceptance ledger advances from **UI 159/159, MATCH 113/159, FLOW 29/58** to **UI 159/159, MATCH 122/159, FLOW 31/58**. This review does not accept the separate cancellation, language-change, settings, logout, or login states and journeys that remain unchecked in `docs/tasks.md`.
