# New selection and Replay containment — 2026-09-20

## Scope and provenance

Implementation checkout: `J:\courses`, branch `main`, app `apple-music-clone`. The published parent is `96d17d0a0a551fb81bd58f5032d0a5290df18745`. This review supersedes the incomplete, unpublished `.qa/evidence/new-material-20260920` batch; that evidence and all pre-existing edits were preserved.

The unpublished batch contained five failed desktop captures: `f3fc07c5`, `3fed6760`, `b67b8895`, `18225175`, and `b0caf02f`. Its off-canvas Replay light widened the main scrolling surface. These are application QA failures, not an explanation of a ChatGPT response interruption.

## Implemented changes

- Member current-New selection now has 9px corners and burgundy `rgb(112 36 56)` ink. Guest corners and the live Alpha background remain separately owned. The registered sidebar material test covers the initial and playing member states.
- Replay's decorative light is contained in an inert full-size wrapper. Only its pseudo-element extends outside the viewport; the main content and year menu are not clipped. The mobile rule now styles that pseudo-element, not the containment wrapper.
- The orange and gold light sources were broadened and repositioned after native source/render review exposed a worse intermediate treatment. This remains live CSS, not reference imagery painted over the interface.
- Four Replay artist cards have live ranks, artist names, listening totals, accessible names and keyboard entry. Artwork-only portrait masks exclude the captured rank and caption regions. The corner transition no longer has a hard horizontal seam, and native cards use 264x352 desktop geometry rather than extending a solid background into the source's bottom-edge row.
- Registered Replay regressions cover native text, portrait boundaries, exact card geometry, responsive carousel navigation, artist entry/Back, month/history continuity, and both month states across six widths with year-menu focus return and no horizontal overflow.

## Visual review and remaining defects

The first optimized run (`5dl-mVCjCwZEPpXcwzsFH`) passed 164 captures, 218 route checks and 100 interaction tests, but its full comparison exposed worse Replay lighting and native-card residuals. It is retained under `.qa/evidence/player-glass-resume-20260920/optimized-browser` and `optimized-comparison`; it is not the final publication evidence.

Readable source/render inspections drove a second implementation pass: the native lighting distribution was corrected, mobile paint ownership repaired, and artist-card height corrected. The refined focused dev run passed nine screens and eleven registered interaction cases with stable source hashes.

Initial New `e72be564` is still NOT MATCH-complete. Computed production glass is present (50% background, 16px blur, saturation 2, 635x54 at x526/y833); a missing compiled CSS rule is not the cause. The full artwork used beneath the second initial release is still a fallback that does not reproduce the recorded visible artwork/glass distribution. Preserve the source-owned artwork fragments and distinct release editions; do not substitute a different album, force a catalog reset, or paint a screenshot over the player.

Replay native glyph contours, portrait/caption material transitions, remaining lighting differences, obscured song metadata, gallery continuation and player finishing remain open. Replacing baked labels with native text can increase pixel residual while improving control ownership; that is not permission to mark the screen accepted. No MATCH or FLOW checkbox is advanced in this review.

## Final preserved run and subsequent publication

The final preserved optimized run used build `Tr36t64qQ0oNrD6foZ5Hx` in `.qa/build-replay-light-20260920`; `.qa/evidence/player-glass-resume-20260920/final` records 164 captures, 218 route checks and 100 interactions with zero failures and all 159 comparisons. The next [player-cutout/Replay-control review](2026-09-21-player-cutout-replay-controls.md) supersedes it for the publication candidate and records the additional implementation, full re-verification, visual regressions and remaining blockers.
