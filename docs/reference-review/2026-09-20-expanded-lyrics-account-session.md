> Historical intermediate-stage record. Later bridge/outline and account-seed corrections are verified in [2026-09-20-player-replay-release-checkpoint.md](2026-09-20-player-replay-release-checkpoint.md); the unresolved-state statements below describe that earlier stage.

# Expanded lyrics and account-session progress

Date: 2026-09-20
Checkout: `J:\courses`
Branch: `main`
Parent: `fd39956cbbe33aba62a2b1d19eafa49119b15fe4`
Evidence root: `J:\courses\apple-music-clone\.qa\evidence\finalize-20260920-061009`

## Acceptance decision

This is an implementation checkpoint, not clone acceptance. UI remains 159/159, MATCH 22/159 and FLOW 3/58. No acceptance checkbox advanced. The expanded-player and account families still contain concrete visual discrepancies and recorded-session discontinuities.

## Implementation ownership

The inherited expanded-player batch was preserved and its prior 82-test evidence was matched to its actual source hashes before editing. It removes captured menu contamination from artwork, anchors the real expanded menu above its trigger, recalculates menu geometry after library mutations and resize, and dismisses the playlist flyout when another action receives pointer/focus input. These changes belong to `expanded-artwork.tsx`, `music-menus.tsx`, `music-player.tsx`, `player-reference.ts`, `library-fidelity.css` and `expanded-presentation.ts`.

New substantive repairs in this execution:

- `music-context.tsx` exposes an explicit seek revision. `music-lyrics.tsx` no longer recenters a manually browsed lyric viewport when an ordinary playback tick crosses a timed line. Explicit seeking, a new track and lyric selection resume following. The narrow panel retains its existing behavior.
- `lyric-text.tsx` renders selectable word spans, captured sung/unsung emphasis and source-observed desktop line breaks. `expanded-presentation.ts` owns those word boundaries; `player-fidelity.css` keeps single-line, multiline and active-line spacing distinct. Narrow layouts wrap normally. This is not a claim of word-timed motion parity.
- `expanded-artwork.tsx` selects clean opening/verse/outro artwork by playback position. Art-only highlight fragments remain separate from real menus. Hiding and showing lyrics preserves the playback artwork instead of resetting it to the route's initial frame.
- `music-context.tsx`, `music-scenes.ts` and `apple-music-app.tsx` make the profile label session-owned. Opening subscription management no longer changes SmithAlex to Alex Smith. Account navigation retains its initial sidebar rather than exposing unrelated saved playlists. `reference-chrome.ts` records the observed initial sidebar variants.

The registered expanded and account suites exercise real seeking, manual wheel reading, playback, menu/flyout actions, library mutation, resize, lyrics toggling, Manage, Keep Subscription, confirmation, Escape focus return and browser Back. The existing Autoplay/queue, local-media, radio, library and responsive regressions remain in the full runner.

## Evidence distinctions

The manual-reading regression first failed against the previous implementation, then passed after the explicit-seek repair. The failure and repaired captures are preserved in `manual-before` and `manual-after`. The 19-case focused run, artwork-timeline run and two account-focused cases were separate implementation stages, not one stable combined candidate. The full optimized runs identify their own exact application and tooling hashes.

## Concrete remaining discrepancies and counter-evidence

`55ae9e4c` is not a completed frame. Its playlist-dialog background still exposes an extra earlier lyric line, the current line has an incorrect word break, and the dialog's focus outline and surrounding material differ from the source. The expanded typography improvement increases this frame's whole-image residual. A follow-up lyric-context edit was blocked by the tool safety gate and did not execute. Do not describe this as harmless decoder drift, visual regression-free work or MATCH acceptance.

Native sidebar review also exposed a mistake in the final exploratory account inventory change: the cropped `03157020` source contains both Favourite Songs and Emotional Songs. The added `personalPlaylistsEmpty` seed removes the latter from that initial fixture. The attempted surgical removal of that incorrect seed and its matching test expectation was blocked and did not execute. The current source therefore retains this known visual defect; the account test's empty-personal-playlist expectation is not sufficient source evidence. Keep this frame unchecked. The blocked corrective operation was not retried through an alternate execution path.

The account journey itself contains a separate, genuine snapshot discontinuity. `44101453` and `c0997fe5` show SmithAlex with only All Playlists, while the later confirmation/result stills show Alex Smith and saved playlist navigation. Real Manage/Cancel actions now preserve the current session instead of renaming the user or replacing the library. This preserves behavior but cannot sign off `FLOW-16a876bc`. Opening a fixture with another initial session is not evidence of a continuous account transition.

Other account blockers include the music-note badge, native select arrows, heading and body metrics, footer alignment, button dimensions and the extra subscriptions bottom rule. Other expanded-player blockers include exact transport glyph contours, background lighting, metadata width, lyric fade, dialog outlines and motion timing. The first-entry lyrics/queue catalog discontinuities and New/Alpha defects remain open.

## Readable review

The complete ten-frame expanded family and five account originals were opened, along with corresponding browser frames. Source/baseline/current regional sheets are preserved in `final-readable-review`; this directory belongs to the preceding complete 87-test candidate, before the exploratory inventory seed. The newer inventory candidate needs its own recorded source identity and comparison. Already reviewed byte-identical frames can be reused only after their hashes are confirmed.

The prior 87-test candidate changed 33 render hashes, including three previously accepted states. The changed regions of accepted `4b515439`, `bbb92581` and `e9bee76d` retained recorded geometry and had maximum baseline-to-candidate channel changes of 10, 2 and 3 respectively. Their readable artwork/field crops show no changed content or control state. The other 19 accepted frames retained identical image hashes.

The larger Home `2f5da478` drift is confined to existing artwork regions with unchanged recorded geometry, copy and controls. Its baseline/current maximum channel change is 31; 1,143 pixels exceed 20. This is observed artwork raster variation, not a claim that a specific decoder cause was independently proven. Other reviewed non-target changes are source/thumbnail/edge raster differences; inherited content, menu and material discrepancies remain visible.

No original, reference manifest, image, viewport or comparison threshold was changed. No proprietary fonts, user application data or unrelated projects were deleted. Local-preview authentication, payments and media remain local-only.
