# Library family matches and complete song-control journeys

Reviewed on 2026-09-18 from `J:\courses/main`, on top of `b4df13caf4e62209e6289106a73c35108610f563`. This batch accepts fourteen Library screens and two complete recorded journeys. The immutable reference archive was not changed.

## Candidate and environment

- Optimized build ID: `tdHorimG6A0m09_NWicfO`.
- Implementation SHA-256: `b8164a60c5218f2cedc663988e955ecb6f3e6d138eb8207e75e0e4251d8e8b38`.
- QA-tooling SHA-256: `0f583da39b54419437f3f1ce4cc319cd3e94ea157cb85628dfaada59dff4604d`.
- Windows 11 build 26200; Python 3.13.15; Playwright 1.62.0; Chromium 151.0.7922.34; en-SG, Asia/Singapore, reduced motion and device scale 1.
- Optimized evidence: `D:\courses-main-evidence\library-family-final-full-20260918-041639\`.
- Focused evidence: `D:\courses-main-evidence\library-focused-empty-final-20260918-041444\browser\`.
- Targeted readable evidence: `D:\courses-main-evidence\library-targeted-final-20260918-040411\` and `D:\courses-main-evidence\library-empty-final-20260918\`.
- Readable full-corpus change review: `C:\Users\radev\courses-library-final-review-20260918\`.
- Readable continuous-flow review: `C:\Users\radev\courses-library-flow-final-review-20260918\`.

## Defects and ownership

The Library family shared several visible defects rather than fourteen independent problems:

- compact Library headings were vertically and horizontally misaligned, and Albums used the wrong top-bar height;
- the sort control and both captured menus used slightly wrong anchors, material, shadow and checked-state geometry;
- the Songs overflow reused generic symbols whose contours and placement differed from the source;
- Recently Added used the wrong empty-state music symbol and retained a source-absent region row in the footer;
- Made for You used an outline portrait instead of the saved filled person and also retained the extra region row;
- live sorting, pinning and navigation needed stronger evidence for pointer hover, keyboard focus, Escape return, persistence and exact geometry.

The repair is owned by `app/library-fidelity.css`, `components/music-library.tsx`, `components/music-context.tsx`, `components/music-menus.tsx`, `components/music-library-menu-icons.tsx`, `components/music-primitives.tsx`, `scripts/browser_library_controls.py` and `scripts/browser_library_flows.py`.

At the 1440-pixel desktop viewport, the ordinary Library top bar is now `1194×35` at `x=246`; Albums owns the saved `45px` height. The sort button is `36×22` at `x=1386`, `y=6`. The saved sort menu is `176×123` at `x=1243`, `y=14`, and the track menu is `176×244` at `x=625`, `y=287`. Their shadow is scoped to the Library sort/track menus so unrelated dialogs and menus are unchanged. Checked sort glyphs and every compact track-action symbol have measured transforms and strokes.

The Recently Added and Made for You empty icons are live SVG controls at `x=805`, width and height `76`; their recorded top positions are `287.5` and `307.5`. Empty Library states now suppress only the source-absent region row while retaining the legal footer, sidebar, profile and idle player.

No screenshot, captured interface pixels, hidden hotspot, product mask, resized candidate, relaxed comparison threshold or proprietary font file was introduced.

## Accepted screen review

Every target was reviewed as immutable source, optimized render, amplified difference and important regional crops at its exact recorded 1440×903 or 1440×904 application viewport. Strings, card/row ordering, artwork identity and crop, sidebar/profile snapshot, player state, geometry, scroll position, borders, material and controls were checked. Remaining differences are lawful Windows Arial/SVG raster and minor image-decoder edges without a concrete visible product discrepancy.

| Screen | Saved state | Final MAE | Final over-20 | MAE delta | over-20 delta |
| --- | --- | ---: | ---: | ---: | ---: |
| `bdc69b59` | Recently Added empty | 3.130537 | 2.182463% | -0.031792 | -0.024456 pp |
| `0df0d2a2` | Artists — Ariana Grande | 2.282674 | 1.843315% | -0.023495 | -0.011305 pp |
| `610af644` | Artists — Olivia Rodrigo | 2.645224 | 2.299665% | -0.023433 | -0.011382 pp |
| `5d3db7ca` | Albums | 2.900545 | 2.588594% | -0.046791 | -0.022302 pp |
| `92589389` | Songs | 2.741390 | 2.246755% | -0.026897 | -0.010997 pp |
| `09b3600e` | Songs sort menu | 2.939409 | 2.340424% | -0.130692 | -0.024609 pp |
| `1d016f0f` | Songs descending | 2.768953 | 2.275363% | -0.026897 | -0.010997 pp |
| `e9bee76d` | Songs row hover | 2.757479 | 2.243909% | -0.026897 | -0.010997 pp |
| `3884ff64` | Songs track menu | 3.186171 | 2.510536% | -0.189240 | -0.027609 pp |
| `06be9f09` | Songs pinned | 2.863302 | 2.354882% | -0.026896 | -0.011151 pp |
| `4e857921` | Music Videos | 2.184169 | 1.696967% | -0.044385 | -0.017765 pp |
| `0b0e3fbf` | Made for You empty | 2.256193 | 1.581380% | -0.057241 | -0.039990 pp |
| `e379e3fe` | Made for You named profile | 3.037232 | 2.884479% | 0 | 0 pp |
| `bde65d33` | Favourite Songs | 2.931996 | 2.412868% | 0 | 0 pp |

## Complete real-control journeys

`FLOW-c454fe86` starts from the permitted Songs fixture and uses the visible Sort control through all three archived states: initial Songs, open sort menu and descending order. The live captures are byte-identical to their final direct fixtures. The regression also opens the menu from the keyboard, moves focus with End, closes with Escape and verifies focus return.

`FLOW-22c4db47` starts from the permitted Songs fixture, hovers the actual `stupid song` row, opens its real overflow, selects Pin Song and verifies the resulting Pins section. The initial, menu and pinned live captures are byte-identical to their direct fixtures. The intentional pointer-hover capture differs from the direct fixture only below the over-20 threshold (`0%` over-20, maximum channel delta `13`). The regression then unpins through the real menu and proves favourite isolation.

Both journey directories retain ordered, non-overwriting screenshots and `steps.jsonl` with source/render hashes. No forced click, fixture jump between steps or injected state is used as FLOW evidence.

## Full-corpus verification and regression review

Archive integrity, checklist coverage, typecheck, optimized build, five Python QA-tool tests and nine cover-integrity tests passed. The exact candidate rendered 159 desktop states and five responsive states, checked all 218 recorded routes, and passed 69 registered interaction regressions with zero failures. All 159 exact-size comparisons completed.

Corpus mean MAE improved from `5.260984609` to `5.256962793`; mean over-20 improved from `5.351792008%` to `5.350413054%`. Thirteen states improved, 142 were unchanged and four had a positive delta in each metric. Seventeen render hashes changed.

The four positive-delta states were reviewed source/baseline/current/change:

- `afd02fa6`: +0.011768 MAE and +0.000461 pp over-20; only `0.000846%` of baseline-to-current pixels exceeded 20 and the maximum channel change was 21, confined to artwork decoding;
- `f2e44e3b`: +0.000768 MAE and +0.006075 pp; only `0.000231%` of baseline-to-current pixels exceeded 20, with tiny rail-artwork decoder changes and no geometry, copy or state change;
- `dfce44a2`: +0.001884 MAE and +0.000077 pp, maximum channel change 13 and zero baseline-to-current pixels above 20;
- `eebd5ffb`: +0.000982 MAE and +0.000077 pp, maximum channel change 9 and zero baseline-to-current pixels above 20.

Readable review found no unintended artwork identity, layout, copy, session, account, player, sidebar or control regression. The two previously accepted screens, `8a2a4241` and `5b3ec96a`, are byte-identical to their accepted optimized renders.

## Acceptance boundary

Accepted MATCH entries in this batch: `bdc69b59`, `0df0d2a2`, `610af644`, `5d3db7ca`, `92589389`, `09b3600e`, `1d016f0f`, `e9bee76d`, `3884ff64`, `06be9f09`, `4e857921`, `0b0e3fbf`, `e379e3fe` and `bde65d33`.

Accepted FLOW entries: `FLOW-c454fe86` and `FLOW-22c4db47`.

Other related flows remain open: their initial New or Home states (`e72be564` or `a917d88f`) are not MATCH-complete, `e757eb0f` remains incomplete, and the library-editor recording still contains an unsupported catalog/account snapshot transition.

**UI remains 159/159, MATCH becomes 16/159 and FLOW becomes 2/58.**
