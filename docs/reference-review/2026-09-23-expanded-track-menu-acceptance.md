# Expanded-player track menu exact-state acceptance — 2026-09-23

## Candidate and scope

This review accepts `MATCH-ac05c6b8`, the expanded player with lyrics visible and the track action menu open. The source and optimized candidate were reviewed at the exact 1440×903 desktop viewport using the full-corpus source, render and 4× residual images.

The candidate uses source commit `d71c3c4355d847867fc04aa1f4b69cb8035aba4d`, application identity `85661c42b0fda0181ff648e08e9b880403f31c02e577cb2223d04553cb230669`, QA identity `300a4a68afe9df0de8d8cc983c28e9cd722c83bec3ad7e197976099ac53afc87`, optimized build `zHOP0llQ0Mepv9dKQd5eT`, and Chromium `151.0.7922.34` on Windows 11. Capture time: `2026-09-23T00:48:11.886829Z`. Evidence root: `apple-music-clone/.parity-evidence/full-production-onboarding-final-20260923-040500`.

## Exact-state review

The album-art crop, expanded-player controls, lyric content and line breaks, menu anchor, menu bounds, action order, labels and state-specific icons align with the original. The menu remains anchored above the real More control. It contains Add to Library, Add to Playlist, Play Next, Play Last, Create Station, Undo Favourite, View Credits, Share, Copy Link and Copy Embed Code. The current song remains favourited and outside the library, as in the source.

The diagnostic residual is MAE `6.347597`, over-20 `5.902316%`; the preceding comparison measured only `0.010951` higher MAE and `0.025071` percentage points higher over-20. Readable residual review localizes the visible movement to the active lyric/player material, scrolling metadata raster and small glyph edges. These playback-owned pixels shift during a live preview. The static action menu geometry/content and listening controls show no concrete product mismatch. Metrics are diagnostic; this decision follows the source/current/residual review.

The optimized candidate passed 159 desktop captures, five responsive captures, all 218 route checks and 115 registered interactions with zero failures; all 159 exact-size comparisons completed. The application identity is unchanged from its preceding optimized build. This acceptance advances only `MATCH-ac05c6b8`; it does not accept the related library, playlist or credits flows.
