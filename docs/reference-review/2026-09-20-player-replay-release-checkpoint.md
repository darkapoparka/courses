# Player, Replay and release-artwork implementation checkpoint

Date: 2026-09-20. Checkout: `J:\courses`; branch: `main`.
Parent: `fd39956cbbe33aba62a2b1d19eafa49119b15fe4`.

## Acceptance

UI 159/159, MATCH 22/159, FLOW 3/58. No checkbox advances. This is a verified implementation checkpoint, not a completed clone or a claim that every changed frame has passed visual acceptance.

## Actual repairs

- `music-discovery.tsx` now supplies the full pinned ATEEZ GOLDEN HOUR : Part.5 - EP cover and metadata in the named/playing New second release position instead of Lover. `cover-resources.json` pins its provider bytes and reviewed content digest. The initial New edition is deliberately unchanged; existing artwork-only overlays remain separate from the live player.
- `music-replay.module.css` corrects the live year/share control widths and summary tracking. The preserved Replay batch adds native album/badge geometry, real milestone captions, year-menu keyboard/focus behavior, playlist/footer chrome and per-visit scroll restoration.
- The preserved expanded-player batch removes captured menu contamination, anchors menus to the live More button, updates their height after library mutations, and repairs flyout pointer/keyboard dismissal. Clean artwork and sampled ambience follow playback rather than fixture routing.
- Explicit seek revisions distinguish user seeking from clock ticks. Manually browsed lyrics stay put; seeking resumes following. Selectable word spans preserve desktop line breaks and sung emphasis. The bridge has one visible preceding line and the corrected five-word first line. This is not word-timed motion acceptance.
- Modal gestures now distinguish dragging from clicking the backdrop, preserve drafts, contain keyboard focus and return focus without scrolling. Native dialog-surface outlines are removed without removing control focus rings.
- Silent preview and owned-file completion share the visible Autoplay recommendation catalog. Queue, repeat, stop and playback remain local-only.
- Profile labels and account sidebar state remain session-owned. Signup keeps visible filled password labels, source-formatted dates and a Last Name-based second-step scroll anchor. Public New preserves its partial third editorial card through dialogs and navigation.

## Verification

Fresh optimized build `gLF6tBPHo85e4ter92Rtl` passed 159 desktop captures, five responsive captures, 218 route checks and 97 interaction tests, with zero failures. All 159 exact-size comparisons completed. Browser: `151.0.7922.34`.
Archive and coverage checks, typecheck, production build, seven QA-tool unit tests and nine cover-integrity tests passed. Focused verification passed two New cases plus twelve Replay/auth/lyrics/history cases and fourteen exact desktop captures.
Mean MAE: 5.049159017 -> 4.950875687. Mean over-20: 5.154771669% -> 4.990549245%.
Captured implementation SHA-256: `b7110913c1dc0aff58089ecacff831531060e95b3075251c304ab401418b8080`. QA SHA-256: `03647a2f19405b965a290d2ab635b6335e59fd7826cb147dcac4056e01f89a59`. Both were stable throughout capture.
Evidence: `J:\courses\apple-music-clone\.qa\evidence\publish-20260920`. `optimized-browser` contains exact captures and ordered journey logs; `optimized-comparison` contains all source/render/amplified-difference comparisons; `verification-summary.json` retains every changed and positive-delta ID.

| State | MAE before -> after | Over-20 before -> after |
| --- | --- | --- |
| `e72be564` | 2.526055 -> 2.526055 | 2.832610% -> 2.832610% |
| `4f611a9e` | 3.033397 -> 2.917810 | 3.786068% -> 3.187984% |
| `54b01eab` | 3.786736 -> 3.749476 | 6.473637% -> 6.422265% |
| `1f9e170c` | 3.146567 -> 3.024971 | 3.970407% -> 3.310185% |
| `55ae9e4c` | 8.380026 -> 8.149760 | 9.180740% -> 9.504660% |
| `f3fc07c5` | 5.176904 -> 3.400535 | 6.571565% -> 5.524521% |
| `3fed6760` | 5.383373 -> 4.763106 | 7.603398% -> 6.957888% |
| `cc18744f` | 4.659054 -> 2.146617 | 5.621620% -> 1.720286% |
| `b5d31893` | 2.160964 -> 1.829646 | 1.477769% -> 1.437592% |

## Readable review and remaining work

The exact named-New release reference and saved native provider-fragment proof were opened; the real navigation-return capture now retains the pink provider cover under the live player. Replay May/July, album and milestone shelves, gallery/detail, signup filled/profile steps and the playlist-dialog bridge were reviewed against their originals at native dimensions. The previous expanded/account review remains historical evidence, not acceptance of this final candidate.
Remaining concrete defects are visible: New/Alpha feature-pointer and session/chrome differences; Replay ambient lighting and obscured song metadata, missing gallery continuation, some baked artist-card captions, gallery caption weight/position and player material; signup field corners, select arrows, checkbox/text raster and wrapping; expanded artwork lighting, transport symbols, lyric fade and modal material. These are not all harmless decoder drift.
First-entry lyrics/queue and later account confirmation stills contain different session/catalog snapshots. Real controls preserve current user state rather than resetting it to manufacture endpoint parity. Those FLOWs remain open.
The final counter-evidence review is not a new full 159-screen visual acceptance audit. No all-screen regression-free or 1:1 claim is made from the numerical gate. Continue source/render review and implementation using the single existing tasks ledger.

## Publication preparation

Build-generated next-env.d.ts imports and tsconfig.json type-include paths are preserved in ignored evidence, then restored to their existing canonical values before publication. This changes the configuration-inclusive source digest, not the app/component/library code or QA implementation. Captured hashes above identify the exact browser run; the post-normalization identity is recorded separately.
