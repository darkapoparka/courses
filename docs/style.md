# Style contract — preserve the Apple Music-derived character

Updated 2026-10-02. Owner: platform UI. This document governs `/learn`; `design-system.md` retains reference-parity rules. Values below are repository implementation tokens, NOT a claim to possess Apple's private CSS. Current source: `apple-music-clone/components/platform/platform.module.css`; reference provenance: `app/globals.css` plus its fidelity overrides and saved captures.

## What must survive every feature
Content comes first. Retain a bright canvas, dark neutral type, quiet separators, a floating rounded navigation material, restrained crimson actions, cover-led editorial collections and generous space around meaningful content. Community and creator tools should feel like another part of this product, not a separate admin template. Avoid stacked bordered cards, loud gradients behind every section, oversized marketing typography, unnecessary charts and icon-library substitutions.

## Desktop geometry and color tokens
| Contract | Platform value | Meaning |
| --- | --- | --- |
| Canvas / primary text | `#fff` / `#1d1d1f` | Reading surface and principal text |
| Secondary text / separators | `#68686d` / `#e8e8ed` | Supporting labels and quiet structure |
| Action / focus | `#d60025` / `#007aff` | Red for product actions; blue visible keyboard focus |
| Sidebar width / main offset | `232px` / `240px` | Sidebar starts 8px from viewport; do not confuse its width with the content offset |
| Sidebar inset / corner | `8px` / `22px` | Separate navigation surface, not a rectangular full-height rail |
| Main gutters | left `46px`, right `38px` | At the desktop reference width; narrow layouts have explicit overrides |
| Shelf gap / cover corner | `20px` / `9px` | Preserve editorial rhythm and consistent cropping |
| Main title | `34px / 41px`, weight 700, tracking `-0.8px` | Desktop heading, not every card title |
| Section title | `20px / 27px`, weight 650 | Platform adaptation value; not every music source state |
| Primary controls | minimum height `44px`, pill radius | Deliberately larger learning controls, not a claim about reference hit areas |

## Material, not flat gray
Sidebar: `rgb(248 248 250 / 94%)`, blur `16px`, saturation `1.8`, subtle inset outline and diffuse shadow. Resume dock: `rgb(249 249 251 / 93%)`, blur `24px`, saturation `1.5`. The underlying content, opacity, shadow and stacking all affect appearance: a non-`none` filter alone is insufficient evidence.
Keep `-webkit-backdrop-filter` first and the standard `backdrop-filter` second. This project previously had production-only compiled-filter regressions. Check actual optimized computed values and compare the visible surface. Honor reduced-transparency with an opaque fallback and forced-colors with visible boundaries. Never blur text, transcripts or lesson bodies to imitate lyrics.

## Typography and content
Use the existing platform system stack: `-apple-system, BlinkMacSystemFont, "Helvetica Neue", Arial, sans-serif`. Do not download Apple's proprietary fonts. Inspect actual Chromium platform-font metadata when precision matters; CSS family names alone do not identify the rendered font. Platform-dependent glyph rasterization is not permission to ignore geometry.
Use compact metadata (generally 10–13px) and readable primary content (14–16px). Lessons use 16px body text with generous leading and a bounded reading column. Mobile article text currently reduces to 15px. These are reviewable product choices, not an accessibility certificate. Never make essential pricing/access information tiny or low-contrast to fit a screenshot.

## Responsive contracts
At `<=1150px`, gutters become 28px/24px and the catalog becomes three columns. At `<=760px`, the sidebar becomes a 114px top navigation, main offset becomes zero, gutters become 20px, and the catalog becomes two columns. At `<=380px`, gutters become 16px and category cards stack. The rich featured shelf retains 90%-width cards and native horizontal navigation at mobile widths. These are our adaptation breakpoints, not reconstructed Apple mobile screens.
Verify 320, 390, 768, 1024, 1280 and 1440px widths. Test long words, empty states, open replies, focused forms and a visible resume dock. Scroll the actual main scrollport. Never hide overflow to disguise inaccessible content. Ensure the final control can be scrolled clear of the dock; the lesson route hides the dock rather than stacking a second player.

## Components and assets
Use `Cover`, `CourseCard`, `PlatformShell`, existing buttons, fields, navigation and shared CSS-module tokens. Square catalog covers, wider editorial covers and readable lesson content serve different jobs. Current demo covers are original CSS compositions; they are not licensed instructor artwork or evidence of real offerings. Do not reuse `/reference-assets/`, Apple logos, album artwork, copyrighted video or copied font binaries in course UI.
Add a token only after checking existing values. Add a variant to the owning component instead of a screen-specific clone. Keep course CSS scoped: no `:global`, global `body`, `html`, `:root`, or bare universal selectors in the platform stylesheet. Do not modify music capture CSS to style courses. Root resets still affect both surfaces: treat changes there as full-corpus risk.

## Interaction and accessibility
Links navigate; buttons mutate or disclose. Every icon-only action needs an accessible name. Preserve `aria-current`, `aria-pressed`, labels, visible focus, status/error announcements, logical heading order and skip navigation. Prefer native `details`, `select`, `button`, `form` and `dialog` behavior to custom widgets. Maintain keyboard operation and restore focus after overlays.
Keep micro-transitions restrained (150ms default) and honor reduced motion. Do not animate layout to conceal loading or autoplay lesson media. New major touch controls should target at least 44px; WCAG 2.2 AA's minimum target-size criterion is 24 by 24 CSS pixels with specified exceptions, not a universal 44px mandate. Review contrast, zoom/reflow and screen-reader behavior separately.

## Regression gate — no silent baseline updates
Before editing: identify the owning component, capture the relevant state, note viewport/browser/scale, and record the expected change. After editing: test identical state and dimensions, inspect the screenshot at readable size, and exercise the real journey including navigation back to music.
Run `npm run qa:platform:unit`, `npm run typecheck`, and the platform browser suite. Confirm scoped styling, actual shell geometry/material and six-width containment. Verify optimized production separately. Shared music/global changes require the reference suite as well; a platform-only smoke is not full clone regression evidence.
Keep before/after/difference images and reports under a unique ignored `.qa/` directory. Never overwrite earlier evidence. A same-run before/after music screenshot detects cross-route style leakage, not regression against an earlier Git commit. Keep that limitation explicit. Reviewed platform screenshots become independent adaptation baselines; they do not earn Apple MATCH/FLOW acceptance.
If a baseline changes intentionally, record task ID, reason, affected surfaces, before/after evidence and reviewer disposition. Otherwise fix the implementation. Do not relax assertions or replace baselines just because a test failed. No document can guarantee zero future regressions; ownership, automated checks and visual review make regressions detectable and actionable.

## Sources and evidence
Repository: `app/globals.css`, imported fidelity CSS, `components/platform/platform.module.css`, saved reference archive and dated reference reviews. The browser report is the source of observed runtime values.
Official reading checked 2026-10-02: [Apple foundations](https://developer.apple.com/design/human-interface-guidelines/foundations), [materials](https://developer.apple.com/design/human-interface-guidelines/materials), [typography](https://developer.apple.com/design/human-interface-guidelines/typography), [W3C target size](https://www.w3.org/WAI/WCAG22/Understanding/target-size-minimum.html). Apple material/typography pages required JavaScript in the text fetch; exact geometry above comes from this repository, not unverifiable extraction of those pages.

## Rich screen-family continuity
The floating sidebar keeps its 232px/240px/8px/22px material geometry. Explore and Library groups expose Search, Discover, Categories, Community, My learning, Creators, Courses and Saved. At mobile widths, the same destinations scroll horizontally within the existing 114px header; none are removed merely to fit four buttons.
Editorial shelves use native horizontal scrolling and restrained Next/Previous buttons, support keyboard operation and reduced motion, and retain independent scrollports. Creator detail adapts the full-width artist hero, catalog, compact lesson rows, about section and related creator shelf. Category pages use the genre-browsing pattern with real course and creator associations. Reuse CourseCard, Cover and the shared platform tokens; keep current music/global source untouched.
Typography and demo artwork remain independent assets. Initials are intentional original demo portraits, not imported artist photographs. New creator/subject surfaces require six-width checks and real return navigation as well as screenshot review. The preservation map lives in design.md and implementation evidence in tasks.md/handoff.md.


### Persistent search and collection chrome
The shared search toolbar is sticky within the main scrollport (66px desktop, 64px narrow layout). It uses a bounded 560px search group, 44px pill field, quiet borders, 24px blur, restrained labels and a visible Search action. The field remains visible on mobile instead of becoming an unlabeled search icon. Its fallback is a real GET form, not an inert loading rectangle.
Autocomplete is anchored to the field, keyboard-highlighted and constrained to the viewport; input focus stays on the combobox. Clearing text, dismissing suggestions and clearing search history are distinct actions. Collections reuse the existing white canvas, quiet separators and cover components for grid and compact list variants. The toolbar must not cover anchored/focused content: the main scrollport has explicit scroll padding.
The existing sidebar width, offset, material, typography tokens and music CSS remain unchanged. Review suggestions, filtered lists, empty results, long input, narrow screens and an active resume dock. Cold-route compilation is not permission to weaken interaction assertions; wait for the actual destination state.
