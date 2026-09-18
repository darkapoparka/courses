# Search family matches and Apple Music search journey

Reviewed on 2026-09-18 from `J:\courses/main`, on top of `dc6df744b0a0d28cd7ed290d81c608df3f7508eb`. This grants six new Search MATCH entries and one complete recorded FLOW. The previously accepted `5b3ec96a` empty-library state is reconfirmed. The immutable reference archive was not changed.

## Candidate and environment

- New MATCH targets: `035569a0`, `812ba627`, `4b515439`, `e70094e3`, `bbb92581` and `f4a8b5dc`.
- Reconfirmed accepted target: `5b3ec96a`.
- Accepted journey: `FLOW-638262c8`, Searching Apple Music.
- Optimized build: `F0KMjIXtaan15z-xzgDqh`.
- Implementation SHA-256: `079156c833d7c5a570194cfe087dd7edc41e4e7682d633fdd640279f9e2e0556`.
- QA-tooling SHA-256: `238539ac80f6664654a6bdcbae57a9fba134cabe03c18fcc5b6ca0106f23e0b0`.
- Windows 11 build 26200; Python 3.13.15; Playwright 1.62.0; Chromium 151.0.7922.34; en-SG, Asia/Singapore, reduced motion and device scale 1.
- Exact optimized evidence: `D:\courses-main-evidence\search-family-final-source-clean-full-20260918-080117\`.
- Focused journey evidence: `D:\courses-main-evidence\search-final-accepted-focused-20260918-075151\browser\`.
- Readable review: `C:\Users\radev\courses-search-final-source-clean-review\`.
- Clear-control parameter sweep: `D:\courses-main-evidence\search-clear-icon-sweep-20260918\`.

## Defects and ownership

The prior Search frames still mixed fixture-owned styling with ordinary live state. The top and bottom toolbar materials, suggestion glass, query focus ring, result-card rail, explicit badge, idle-player material and focused clear control did not consistently survive the same real-control path. The previous clear control was an unfilled generic X rather than the source's compact dark circular control.

The repair moves those facts into live ownership:

- `components/music-search.tsx` exposes live `search-suggestions-open`, `search-at-bottom` and `search-results-catalog` state; observes the real scroll container; shows Clear only while the field is focused; and retains the explicit result badge and submitted-query state.
- `app/capture-content.css` owns the exact search field, focused ring, bottom material, suggestion glass, compact filled clear symbol, query/result spacing and live result-card geometry.
- `app/player-fidelity.css` assigns the ordinary Search player its measured 44% material with `blur(16px) saturate(1.4)`, while the accepted empty-library state keeps its separate owner.
- `app/reference-fidelity.css` moves the result rail from endpoint-only selectors to the live submitted-results state.
- `scripts/browser_library_flows.py` records both archived Search journeys through real controls and asserts geometry, materials, scrolling, suggestions, Clear, result order, explicit badge, Escape focus return and player continuity.
- `scripts/browser-reference.py` verifies that Clear is absent before focus and present only in the appropriate live state.

No screenshot, captured interface pixels, hidden hotspot, product mask, resized candidate, proprietary font or relaxed comparison threshold was introduced.

## Real-control journeys

`recorded-searching-apple-music` begins at the permitted `035569a0` fixture, focuses the real Search field, types `olivia`, opens the live suggestion list and records `4b515439`. Enter submits the real form and records `e70094e3`; the visible Your Library segment then produces the four-row `bbb92581` state. The test also verifies the explicit badge, the five 208px album cards at the measured positions, Escape dismissal with focus return, and an unchanged idle-player signature.

All four continuous screenshots are byte-identical to their corresponding direct candidate fixtures, and each ordered step retains its own image and `steps.jsonl` entry. No direct step URL, state injection or forced click is used as journey evidence. `FLOW-638262c8` is therefore accepted.

`recorded-search` separately traverses New → Search top → Search bottom → Your Library through the visible sidebar, real scroll container and segmented control. Its three Search endpoints are now MATCH-complete and its live screenshots are byte-identical to direct fixtures, but the permitted first frame `e72be564` remains visually incomplete. `FLOW-6c5d545e` therefore remains open for that single external blocker.

## Exact visual and behavioral review

The complete immutable sources, optimized renders, amplified differences, toolbar, content, sidebar and player regions were reviewed at each exact 1440×903 viewport.

Browser assertions prove:

- the Apple Music field is `x=590`, `y=13`, `508×33`, with the leading glyph at `x=602`, `y=22`;
- focused `4b515439` uses the measured ring and shadow, a `13×13` `rgb(121, 121, 127)` circular Clear material, and a centered white `14×14` / `2.8px` X;
- the suggestion material is `rgba(248, 247, 248, 0.75)` with `blur(36px) saturate(1.08)`;
- the bottom state reaches the actual `scrollHeight - clientHeight`, exposes Mandopop and owns its distinct field material;
- the submitted result rail uses a 19px gap and five 208px cards starting at x positions 286, 513, 740, 967 and 1194;
- Your Library results contain the exact four recorded song rows;
- the idle Search player remains `rgba(249, 249, 251, 0.44)` with `blur(16px) saturate(1.4)`;
- the Chinese frame retains its saved locale, category order, strings, sidebar and player state.

Artwork identities, category order, recent cards, top results, submitted results, library rows, localized copy, scroll positions, profile/sidebar state and player continuity match the saved frames. Remaining pixels are lawful Windows text/SVG antialiasing and image-decoder edges without a concrete visible or behavioral discrepancy. The six target MATCH entries are accepted.

## Measurements and corpus review

| State | Prior MAE / over-20 | Final MAE / over-20 |
| --- | ---: | ---: |
| `035569a0` Search top | `5.192895 / 6.807401%` | `4.320887 / 4.740833%` |
| `812ba627` Search bottom | `4.910820 / 6.277609%` | `4.887877 / 6.277224%` |
| `5b3ec96a` empty library | `1.873896 / 1.203088%` | `1.841195 / 1.203088%` |
| `4b515439` focused query | `7.721802 / 9.049849%` | `6.704724 / 6.963440%` |
| `e70094e3` submitted Apple Music results | `7.229142 / 8.450074%` | `7.148837 / 8.437462%` |
| `bbb92581` submitted Library results | `4.084941 / 3.538129%` | `3.996767 / 3.489833%` |
| `f4a8b5dc` Simplified Chinese Search | `6.350066 / 8.168066%` | `5.867411 / 8.128691%` |

Corpus mean improved from `5.256962793` to `5.240636608` MAE and from `5.350413054%` to `5.323660568%` over-20. Seven render hashes changed, all seven improved, 152 states retained both metrics, and the positive-delta union is empty. The accepted All Playlists render remained byte-identical.

Archive integrity, task coverage, typecheck, optimized build, five Python QA-tool tests and nine Node cover-integrity tests passed. The source-clean exact candidate passed 159 desktop states, five responsive states, 218 route checks and 70 registered interaction regressions with zero failures. All 159 exact-size comparisons completed.

## Acceptance boundary

New MATCH entries: `035569a0`, `812ba627`, `4b515439`, `e70094e3`, `bbb92581`, `f4a8b5dc`.

New FLOW entry: `FLOW-638262c8`.

`FLOW-6c5d545e` remains unchecked only because `MATCH-e72be564` is still open. Concert, Replay and other journeys that start from Search remain open until every later archived state in those journeys is also MATCH-complete.

**UI remains 159/159, MATCH becomes 22/159 and FLOW becomes 3/58.**
