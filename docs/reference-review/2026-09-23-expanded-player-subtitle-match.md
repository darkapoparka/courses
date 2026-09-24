# Expanded-player subtitle exact-state match — 2026-09-23

## Candidate and scope

This review accepts only `MATCH-b3f29b6f`, the 0:54 expanded song player with lyrics visible. The immutable source is `apple-music-clone/reference/originals/b3f29b6f-5884-493c-bbc2-54f25620d5fb.webp`, SHA-256 `32bc4f61ff463f44c6adb29fb62328f61016dba88e1a25b03e22a71754a8bb1c`. Source, optimized render and residual were inspected at the exact 1440×903 viewport, device scale 1, full viewport crop; only the standard 120px acquisition footer is excluded from pixel diagnostics.

The final candidate is source commit `d71c3c4355d847867fc04aa1f4b69cb8035aba4d` on `main`, application identity `0a6ca47171b3bbc43f8624e12297759ab11f279b2ba16895bed177d64f7837fa`, QA-tooling identity `c04631d37bdcbdec75a09b2a3d5d26d794509a2dfb1062dc06c23029416bde34`, optimized build `PjyQ3GZpF6in3orwLeWc5`. Chromium `151.0.7922.34` on Windows 11 captured the source viewport; the actual subtitle platform font is Arial (`ArialMT`), not a distributed Apple font. Candidate evidence is under `.parity-evidence/full-production-player-meta-clip-scoped-20260923/`.

## Exact-state review

The first candidate showed `love` at the right edge where the reference ends after `in`. At 0:54, a 29px clip reduction now matches that saved subtitle boundary. It is scoped to the default Olivia song alongside the existing sampled ticker offset and interpolates back to the full width by 1:13. The accessible button keeps the full artist/album label, and its duplicate ticker copy is hidden from assistive technology. Reduced-motion preferences disable the ticker and clip transitions.

I inspected the full source, render and residual at readable size. The album artwork and crop, song title, favourite and More controls, seek and volume controls, lyric content/emphasis, and overall layout align. The subtitle now begins and ends at the same visible text as the source. The remaining residual is confined to text rasterization and playback/background material; it shows no additional content or geometry mismatch in this state. The diagnostic MAE is `7.663513`, over-20 is `8.238434%`; compared with the preceding ticker candidate, these improve by `0.011123` MAE and `0.012458` percentage points. Metrics support inspection but do not determine acceptance.

The full optimized candidate rendered 164 states, checked all 218 recorded routes and passed all 116 registered interaction regressions with zero failures. All 159 exact-size comparisons completed. The `expanded-presentation-controls` and continuous `recorded-adding-to-library` interactions passed through controls. For this screen, the capture reports no page errors, failed requests or bad responses. The three adjacent ticker references `c939c9b8`, `ac05c6b8` and `96711b04` and the lyrics-hidden `06a34864` remained pixel-identical to the preceding ticker candidate.

Reviewer: Codex agent in this task; this is not an independent review or owner phase-transition approval. Evidence images: `comparison/b3f29b6f-5884-493c-bbc2-54f25620d5fb-source.png`, `-render.png`, and `-difference.png` in the evidence directory above.

## Ledger result

Advance `MATCH-b3f29b6f` only. The ledger becomes **UI 159/159, MATCH 94/159, FLOW 26/58**. No flow is newly accepted by this exact-state review.
