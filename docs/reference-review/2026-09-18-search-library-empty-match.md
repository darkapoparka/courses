# Search library empty-state match

Reviewed on 2026-09-18 from `J:\courses/main`, on top of `cc4ed594fbc0d57e1bf86befeae94507b5d42e95`. This grants one screen MATCH, not Search-flow acceptance. The immutable reference archive was not changed.

## Candidate and environment

- Target: `5b3ec96a-2ba2-4798-b03e-07e82e3bc7a7`, Search â€” Your Library empty state.
- Optimized build: `2dDDJQCONN7SjE62vhe7p`.
- Implementation SHA-256: `063592d771133f06810d593cc78698a2f354c1634b4206d99ad98891a626fddb`.
- QA-tooling SHA-256: `6e0c450aa520aa7169b7b4d76f31c07aec4725b5aab31551b05a7255553d83e8`.
- Windows 11 build 26200; Python 3.13.15; Playwright 1.62.0; Chromium 151.0.7922.34; en-SG, Asia/Singapore, reduced motion and device scale 1.
- Evidence: `D:\courses-main-evidence\search-empty-current-full-20260918-001110\`.
- Readable review: `C:\Users\radev\courses-review\search-empty-current-full-20260918-001110-baseline\`.

## Defects and ownership

The preceding empty-library fixture still depended on source-specific sidebar navigation and CSS. It showed Favourite Songs and Emotional Songs even though the saved frame exposes only All Playlists, and its field, segmented control, empty glyph and label differed in spacing, ink and vertical position.

The repair moves those facts into live state ownership:

- `components/music-search.tsx` adds `library-search-empty` only for Your Library with an empty query;
- `components/apple-music-app.tsx` hides dynamic playlist entries only in that state;
- `lib/reference-chrome.ts` removes `5b3ec96a` from fixture-owned playlist navigation;
- `app/reference-fidelity.css` scopes field, segmented-control and empty-state geometry beneath `.library-search-empty`;
- `scripts/browser_library_flows.py` owns the complete real-control Search journey and target geometry.

No screenshot, captured control pixels, hidden hotspot, product mask, resized candidate or relaxed threshold was introduced.

## Real-control journey

The registered `recorded-search` case starts from the permitted initial New fixture, opens Search through the visible sidebar, records `035569a0`, scrolls the real main surface and records `812ba627`, then selects Your Library through the sticky control and records `5b3ec96a`. It verifies scroll reset, the All Playlists-only navigation and idle-player continuity; round-trips both scopes; opens and escapes the Olivia suggestions with focus return; submits with Enter; verifies four song rows; and clears back to the empty state. No force click, direct URL jump presented as the journey or state injection is used.

## Exact target review

The immutable source, optimized render, amplified difference, toolbar, segmented control, empty state, sidebar, footer and player were reviewed at 1440Ã—903. Browser assertions prove:

- search field `x=590`, `y=13`, `508Ã—33`, with glyph `x=595`, `y=22`;
- segmented control ending at `x=1418`, `y=12.5`, height `34`, width `187â€“190.5`;
- empty SVG `x=822.005`, `y=323.005`, width `39.99`;
- centered label `y=371.5`, height `22`, width `107â€“112.5`;
- source-supported ink/transforms, All Playlists-only navigation, and preserved sidebar/profile/footer/player state.

Remaining pixels are lawful Windows text/SVG raster and tiny image-decoder edges without a concrete visible product discrepancy. `MATCH-5b3ec96a` is checked.

## Measurements and corpus review

- `5b3ec96a`: `2.036646 â†’ 1.873896` MAE; `1.349898% â†’ 1.203088%` over-20.
- Corpus mean: `5.262081 â†’ 5.260985` MAE; `5.352900% â†’ 5.351792%` over-20.
- 148 states were byte-identical; 11 render hashes changed; eight improved in at least one metric.
- Positive-delta union: `8f029018`, `de48a956`, `2278b1d0`, `1f9e170c`, `e72be564`, `bde65d33`.
- Their maximum baseline-to-candidate channel differences were 19, 18, 17, 19, 9 and 18, with zero changed pixels above 20. Readable sheets show artwork/player decode-edge variation only; no unintended geometry, copy, state, session or control regression.

Archive integrity, coverage, typecheck, five Python QA-tool tests and nine Node cover-integrity tests passed. The exact candidate passed 159 desktop states, five responsive states, 218 route checks and 67 interaction regressions, zero failures. All 159 exact-size comparisons completed.

## Acceptance boundary

`MATCH-5b3ec96a` is accepted; existing `MATCH-8a2a4241` remains accepted. `MATCH-e72be564`, `MATCH-035569a0` and `MATCH-812ba627` remain open, so `FLOW-6c5d545e` remains unchecked despite the complete real-control traversal.

**UI remains 159/159, MATCH becomes 2/159 and FLOW remains 0/58.**
