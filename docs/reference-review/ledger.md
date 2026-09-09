# Visual inspection ledger

Reviewed 2026-09-09 by Astra against archive commit `849594d4a0cb9a6befc6474019d3bf6e9601740e`. **17 distinct originals viewed: 16 high-resolution and one standard-resolution.** These are readable still-image observations, not owner approval, pixel-perfect implementation, or verified interactive behavior. High-resolution files were opened through the image reader; the viewer may scale their 3024px source width for display.

## Actual source-to-product mappings

| ID | Exact saved source | Observed state / structure | Course adaptation |
| --- | --- | --- | --- |
| VIS-01 | [06ea37ef-2485-4219-b244-9d56516c2c42.webp](../../apple-music-clone/reference/originals/06ea37ef-2485-4219-b244-9d56516c2c42.webp) | Standard-resolution billing dialog over dimmed shell; internal content is scrolled/clipped | Dialog grouping/scroll containment only. Do not clone card entry; use hosted Checkout. |
| VIS-02 | [b620e4ab-d6dc-47c9-b704-6cd45cbd714c.webp](../../apple-music-clone/reference/originals/high-resolution/b620e4ab-d6dc-47c9-b704-6cd45cbd714c.webp) | Album detail: square cover left, title/artist/description/actions right, ordered rows below; selected red row; black primary Play | COURSE-01: course overview and curriculum. Preserve art/metadata/list hierarchy; add actual offer and lesson availability. |
| VIS-03 | [035569a0-e8da-454e-8bfd-83e7eacfecc5.webp](../../apple-music-clone/reference/originals/high-resolution/035569a0-e8da-454e-8bfd-83e7eacfecc5.webp) | Empty search query, recent items, prominent top search, category-art grid, catalog/library scope | DISC-02/03: browse categories and search entry. Our subject images and labels; do not automatically implement all scope/history features. |
| VIS-04 | [06be9f09-22fe-45fc-93b8-a49214c9f5f5.webp](../../apple-music-clone/reference/originals/high-resolution/06be9f09-22fe-45fc-93b8-a49214c9f5f5.webp) | Songs table with Name/Artist/Album/Time, subtle row bands, sidebar Pins item | Compact list/progress patterns. Not an artist page; do not add a pinning system just to reproduce the reference. |
| VIS-05 | [e72be564-1f7a-4448-9568-f239af3233ed.webp](../../apple-music-clone/reference/originals/high-resolution/e72be564-1f7a-4448-9568-f239af3233ed.webp) | Signed-in New: full library rail, labeled editorial landscape cards, grouped compact rows, further cover shelf | DISC-01 editorial discovery and shell. Group content by useful learner intent, not fake popularity. |
| VIS-06 | [3731221f-497f-40a3-b00a-30abfe3766da.webp](../../apple-music-clone/reference/originals/high-resolution/3731221f-497f-40a3-b00a-30abfe3766da.webp) | Logged-out New: reduced navigation, Sign In, full-width trial banner and player above it | Visitor shell and intent-preserving sign-in. Omit global music-trial banner and stacked fixed controls in our one-time-course model. |
| VIS-07 | [a917d88f-d15a-4f53-92d3-1daecf59d05f.webp](../../apple-music-clone/reference/originals/high-resolution/a917d88f-d15a-4f53-92d3-1daecf59d05f.webp) | Home: tall editorial Top Picks cards, then square Recently Played covers and more shelves | Returning-learner Home: Continue learning before optional discovery; portrait campaigns are not the default shape of every course card. Not concerts. |
| VIS-08 | [484851bf-bc23-4088-8a34-4078c4d6b4ff.webp](../../apple-music-clone/reference/originals/high-resolution/484851bf-bc23-4088-8a34-4078c4d6b4ff.webp) | Artist detail with wide image-led identity header; latest release beside top-song rows, then albums | CREATOR-01: genuine identity/expertise, latest or featured course, course shelf. Mobile needs a smaller header. Motion not established by the still. |
| VIS-09 | [c939c9b8-e195-4e43-92a6-b845d0b99243.webp](../../apple-music-clone/reference/originals/high-resolution/c939c9b8-e195-4e43-92a6-b845d0b99243.webp) | Expanded player replaces shell; cover/controls left, large partially blurred lyrics right; close at upper left | LEARN-01/03: focused media + readable study/transcript panel. No karaoke blur, shuffle or uncontrolled giant text. |
| VIS-10 | [898ca766-3133-4e02-a186-00d62d3804e4.webp](../../apple-music-clone/reference/originals/high-resolution/898ca766-3133-4e02-a186-00d62d3804e4.webp) | Scrolled artist content: landscape video rail above square playlists/releases; play/overflow over thumbnail | Sample lessons/previews with 16:9 thumbnails; retain visible keyboard/mobile actions rather than hover-only controls. |
| VIS-11 | [a4afd6e6-eddb-4263-b7eb-5be73f8f2b03.webp](../../apple-music-clone/reference/originals/high-resolution/a4afd6e6-eddb-4263-b7eb-5be73f8f2b03.webp) | Full video surface with close, timeline, pause, backward/forward seek and fullscreen control | LEARN-01 player focus mode. Add captions/speed/course navigation through a maintained player, not custom media plumbing. |
| VIS-12 | [bdc69b59-1062-43ee-91da-589de56512b6.webp](../../apple-music-clone/reference/originals/high-resolution/bdc69b59-1062-43ee-91da-589de56512b6.webp) | Recently Added empty state: centered symbol, concise explanation and one browse action | LIB-01 empty enrolled/saved tabs, with distinct copy and a working course-discovery destination. |
| VIS-13 | [e757eb0f-2d7c-48e6-a37f-54ce600c0a8f.webp](../../apple-music-clone/reference/originals/high-resolution/e757eb0f-2d7c-48e6-a37f-54ce600c0a8f.webp) | Populated Recently Added: square-cover grid, captions outside art, mixed media and collections | LIB-01: course covers, creator, resume/progress. Do not reproduce Unknown Album fixtures or mix saved items with purchased access. |
| VIS-14 | [e70094e3-980e-4ba7-a454-e8dd6ce55ae4.webp](../../apple-music-clone/reference/originals/high-resolution/e70094e3-980e-4ba7-a454-e8dd6ce55ae4.webp) | Typed-query search: grouped top-result cards, circular artist results, square album shelf; search remains at top | DISC-03: clear Courses/Creators results with bounded URL filters. No private transcript indexing in public results. |
| VIS-15 | [8f029018-9c70-4715-9012-88a8a9d106b2.webp](../../apple-music-clone/reference/originals/high-resolution/8f029018-9c70-4715-9012-88a8a9d106b2.webp) | Up next panel at right; dense rows while main discovery remains visible; active floating player | LEARN-01 curriculum secondary panel. No Clear queue, infinite radio or arbitrary curriculum reorder for learners. |
| VIS-16 | [ac05c6b8-9970-422b-bbc1-3aaff880946c.webp](../../apple-music-clone/reference/originals/high-resolution/ac05c6b8-9970-422b-bbc1-3aaff880946c.webp) | Compact context menu from expanded-player overflow; text actions with trailing icons | Shared menu behavior: save/unsave, course link, report as applicable. No copied radio/embed/playlist feature backlog. |
| VIS-17 | [3131018d-35b8-4527-a6fe-384fbe950fe7.webp](../../apple-music-clone/reference/originals/high-resolution/3131018d-35b8-4527-a6fe-384fbe950fe7.webp) | Centered email continuation dialog, strong heading, one input, explanation and one Continue action | AUTH-01: minimal OTP entry, real label/error/pending/return behavior. Replace Apple legal/brand content with actual product notices. |

All rows are `VISUALLY_INSPECTED`, `NOT_OWNER_APPROVED`, `NOT_IMPLEMENTED`. The other 142 identities are not marked visually reviewed. The original manifests, not this selective ledger, own acquisition inventory.

## File validation actually performed

VIS-01 was separately loaded from the exact immutable raw URL into memory and fully decoded with Pillow. Result: 26,056 bytes, 1440×1023, Git blob SHA-1 `5ca1ab76686b8f24639182538a05932810bec3f6`, SHA-256 `0fa40975d506bacdc335c0d8d95fa1bfa017394b83c05b5df2d7da5114a03b0b`. The Git blob matches the repository record. Do not generalize that one check into bulk verification of the other images.

The high-resolution manifest supplies source dimensions and hashes for VIS-02–17; their successful image rendering is visual evidence. No full high-resolution pixel-by-pixel comparison, contrast measurement or CSS extraction was performed. The apparent dimensions of a scaled tool preview are not CSS pixels.

## Flow evidence

`flow-screen-map.json` was read, including all 58 names and ordered step IDs. Independent metadata counts: 58 flows, 218 steps and 159 distinct IDs. Selected viewed relationships include guest/signed-in discovery; New to album detail; artist content to video; category search to typed results; Recently Added empty/populated; expanded player/context menu. These are corresponding still states, not proof that interactions or animations were played and tested.

No MP4 recording was watched in full. No mobile Apple layout was supplied by these desktop reads. Local UI tasks must verify their own responsive behavior, focus management, deep links and motion using actual course implementations.

## Reuse rules

Open the exact linked source for the assigned screen. Preserve its useful hierarchy and restrained styling; replace music semantics and assets deliberately. Record our implementation tokens and screenshot viewport separately from source observations. Do not reconstruct a whole music feature just because one control appears in an image. The old prototype's screen mapping is not evidence.

## Initial REF-002 / UI-001 review - 2026-09-09 (visual layout superseded below)

Astra reopened the local galleries `apple-music-clone/reference/originals/index.html` and `apple-music-clone/reference/originals/ui-elements.html` in the connected Windows browser during bootstrap, then reopened the following originals at readable size during implementation. These are three already-counted identities, not an expansion of the 17-screen audit. No collection was redownloaded, and no recording playback is claimed.

| Source reopened (repository-relative) | Useful observation | Course implementation |
| --- | --- | --- |
| `apple-music-clone/reference/originals/high-resolution/e72be564-1f7a-4448-9568-f239af3233ed.webp` (VIS-05) | Signed-in discovery: narrow pale rail, quiet selected row, heading aligned with landscape artwork; captions outside art; compact rows and subsequent square shelf | Quiet rail, two labeled editorial selections, square course shelf and compact under-an-hour list. Selection is by learning intent, not fabricated popularity. |
| `apple-music-clone/reference/originals/high-resolution/3731221f-497f-40a3-b00a-30abfe3766da.webp` (VIS-06) | Visitor discovery keeps the same artwork-led canvas but removes private library destinations; player and trial banner are distinct from the gallery's dark footer | Visitor sample contains no progress. No subscription trial, empty player, sign-in simulation or Apple branding. Future navigation is visibly disabled. |
| `apple-music-clone/reference/originals/high-resolution/a917d88f-d15a-4f53-92d3-1daecf59d05f.webp` (VIS-07) | Returning Home changes the active rail row and leads with personal shelves; portrait editorials and square recent covers have distinct roles | Returning sample leads with two Continue learning cards and explicit sample progress. Course cards remain square; no portrait campaign requirement or music-player controls. |

All three originals decode at **3024×2016**. The application occupies roughly the top 1896 source pixels; the bottom approximately 120px is the **Mobbin attribution/footer**, not app navigation. A local pixel check found stable dark footer samples beginning at y=1898/1901/1897 respectively; WebP edge compression means these are sample rows, not exact CSS boundaries. Rail/content relationships, type hierarchy, restrained selected fill and shelf gaps were observed visually, not extracted as Apple CSS.

Implemented course tokens (our choices, not measured Apple tokens): 248px desktop rail with 8px outer inset and 40px content padding at 1440px; 200px rail/28px padding at intermediate desktop widths; mobile shell below 768px with 20px content inset and four equal navigation positions. Canvas `#ffffff`, surface `#f6f6f8`, text `#202023`, muted `#64646b`, accent `#ad372a`, focus `#215bcc`; 12px artwork radius; 4/8/12/16/24/32/40/48 spacing scale. System typography, 36px desktop/32px mobile Home heading, square ordinary course covers, separate landscape editorial composition. Horizontal shelves contain their own overflow.

Intentional differences: independent Courses identity; useful subject/creator/effort/level/sample-price metadata; no fabricated ratings or sales counts; progress separate from access; disabled Resume because lesson routes are not implemented; no fake course-detail links or bookmark persistence. Original SVGs and licensed photographs replace all reference artwork. The source images provide desktop states only; our mobile dock and reflow are a course-design proposal, not a traced mobile Apple screen.

Implementation and screenshots: `web/src/components/shell/learner-shell.tsx`, `web/src/features/home/`, `web/src/components/ui/content-shelf.tsx`, `web/src/app/globals.css`, and [`../evidence/ui-001/`](../evidence/ui-001/). Visitor/learner desktop and mobile, dialog, focus, empty, loading and error evidence are saved there. See `docs/tasks.md` for actual checks and limitations. **Implemented and locally verified; not owner-approved.** The earlier row statuses describe the original documentation audit, not this implementation supplement.

## Current UI-001 fidelity correction - 2026-09-09

The owner requested the Apple Music look be retained rather than redesigned. VIS-05/06/07 were reopened on the connected computer, using the exact three high-resolution paths in the table above. VIS-07 (`apple-music-clone/reference/originals/high-resolution/a917d88f-d15a-4f53-92d3-1daecf59d05f.webp`) is now the primary Home composition: restrained pale rail, plain Home heading, portrait editorial cards with lower captions, then square covers with compact outside captions. Source-derived proportions were compared at a normalized desktop width; no Apple CSS or proprietary font was extracted. The gallery's bottom Mobbin attribution strip is excluded from the app, as are the music player and trial banner.

The actual correction replaces the two landscape banners, extra marketing copy, table-of-contents sidebar, brown accent and boxed Continue cards. At 1440px the rail is 232px wide/inset 8px, artwork begins at x=285, portrait cards are 265px at 3:4, square covers 209px, gaps 19px, Home title 34px and shelf title 16px. Canvas `#ffffff`, rail `#f8f8fa`, selected `#eeeef0`, ink `#202023`, muted `#68686d`, accent `#bb1832`, focus `#0068cf`; editorial radius 10px and square radius 8px. A font-token self-reference was removed; system sans-serif is used without bundled Apple fonts.

Intentional course changes: original/licensed course art instead of music artwork; small sample-view controls instead of authentication; compact learner-only Continue rows with explicitly fictional progress; no actionable course/lesson purchase links because those destinations are unbuilt; no fabricated ratings. The visitor has no progress. Mobile is separately adapted at 390px, with a four-position Home/Search/Library/You dock and contained horizontal shelves. Only Home is active.

Current captures and checks are in [`../evidence/ui-001-final/`](../evidence/ui-001-final/). Older `ui-001/` evidence belongs to the rejected first interpretation and must not be used as the current baseline. No further source identities or recordings were reviewed, and no final visual approval is claimed.

## Final measured comparison - 2026-09-09

Reopened VIS-07 from `apple-music-clone/reference/originals/high-resolution/a917d88f-d15a-4f53-92d3-1daecf59d05f.webp` and the actual loopback development page. For comparison only, the 3024x2016 source was normalized to 1440x960 in the computer's temporary directory; its application area is approximately 1440x903 after excluding the Mobbin footer. No reference image was copied into `web/public/` or added again to Git. This comparison uses image-space measurements, not extracted Apple CSS.

| Anchor at 1440px width, visitor Home | Normalized source, approximate | Final DOM measurement |
| --- | --- | --- |
| First portrait left / top | 285.7 / 135.2px | 285 / 135.1875px |
| Portrait width / height | 265 / 353px | 265 / 353.328125px |
| First square left / top | 285.7 / 571px | 285 / 570.703125px |
| Square width / height | 209 / 209px | 209 / 209px |
| Rail width / outer inset | 232 / 8px | 232 / 8px |

The earlier portrait row began at y=141px, used 266px cards and 20px gaps, and drifted right across the row. Final gaps are 19px; content inset is 37px after the rail, and the source-shaped heading spacing was corrected. The Windows fallback is Arial instead of Segoe UI; no font is bundled. Desktop Home uses 34px type, section headings 16px, and compact captions no longer reserve an unnecessary blank title line. Navigation vertical spacing was compared separately. Native glyph rasterization is still not pixel-identical to the source.

Screenshots: `docs/evidence/ui-001-final/comparison-viewport-desktop.png` is the actual app at 1440x904 for the normalized comparison. The same folder contains full-page and viewport visitor/learner captures at 1440x1000 and 390x844, plus scrolled mobile, dialog, focus, loading, empty and error captures. The full-page mobile screenshots retain the fixed dock at the captured viewport position; separately inspected scrolled viewports establish the actual visible content and bottom clearance.

**Result:** selected layout anchors are source-aligned within the tested 1.5px tolerance. This is not a full-image pixel-diff pass and does not certify a 1:1 clone. Independent course artwork, licensed photos, course metadata, limited navigation, learner-only Continue rows, lack of a music player and the mobile adaptation remain explicit differences. Technical verification and exact source hashes are in the final evidence; owner visual approval is still pending.

## Pixel-region refinement after b731fff — 2026-09-09

Source reopened: `apple-music-clone/reference/originals/high-resolution/a917d88f-d15a-4f53-92d3-1daecf59d05f.webp` (VIS-07), SHA-256 `9df8b2cecbe453a0b53a833daf8929eb42e33927a74909fbe7f1fcbc2b07c6d9`. The original 3024×2016 image was normalized to 1440×960 with Lanczos; comparisons use the top 903px, excluding Mobbin's footer. This adds no reviewed identities and changes no archive bytes.

Current refinement: desktop Home type 32px/40px, shelf type 15.5px/19.2px with calibrated letter spacing/offset, the same Arial system fallback, 38px navigation rhythm, sampled rail `#f9f9fb`, selected `#efeef1`, ink `#202020`. Portraits retain 265px width/19px gaps; square covers retain 209px width but use **18px desktop gaps**, correcting the previous row's accumulating drift. First five square starts are 285, 512, 739, 966 and 1193px. Compact two-line desktop captions retain complete accessible text; mobile titles wrap. The third shelf returns to the reference's approximate y=862 heading region.

A plain Home header replaces the fixture-switch clutter; preview controls remain in the footer. Editorial shading is limited to caption legibility, and redundant large type is removed from two illustrative campaigns. Desktop edge arrows appear on hover/focus rather than permanently in heading rows; mobile/coarse-pointer arrows remain visible. These are rendered course components, not an image placed over the interface.

| Shared region | Before mean absolute RGB error | After error | Scope |
| --- | ---: | ---: | --- |
| Home heading | 13.5037 | 7.4158 | 120×50px region |
| Top Picks heading | 38.3283 | 14.4517 | 156×29px region |
| Search/Home navigation | 15.6695 | 12.3150 | 90×68px region |
| Rail surface and shadow | 1.8470 | 0.8870 | 275×110px region |
| Empty white canvas | 0 | 0 | 330×76px region |

Errors use 0–255 channel levels, not percentages. Exact rectangles and the reproducible calculation are in `docs/evidence/ui-001-fidelity/pixel-measurements.json` and `measure.py`. Do not generalize these selected regions into a whole-screen score. Fonts, icons and compression retain residual differences. Course artwork/branding/content, the unavailable destinations, absent music player and learner-only progress remain intentional differences; mobile still has no source-matched Apple baseline.

Current app captures and logs are in `docs/evidence/ui-001-fidelity/`. The local `review.html` references the original for switch/overlay review at fitted or actual-pixel scale; it is not an app route and includes no duplicated source image. Desktop and mobile/scrolled app captures, plus the overlay itself, were visually inspected. See the task evidence for the actual 24-test run and fixes. Earlier measured sections above describe previous commits, not the latest screenshot set.

## UI-001 artwork and browsing continuation — 2026-09-09

Reopened `apple-music-clone/reference/originals/high-resolution/a917d88f-d15a-4f53-92d3-1daecf59d05f.webp` (VIS-07 Home) and `apple-music-clone/reference/originals/high-resolution/e72be564-1f7a-4448-9568-f239af3233ed.webp` (VIS-05 discovery) through the connected image reader. These are existing reviewed identities, not new catalog coverage. No collection redownload or recording playback.

Preserved the quiet rail, plain Home heading, portrait editorial shelf, square cover shelf, compact outside captions and restrained controls. VIS-05's compact grouped rows inform the under-an-hour shelf. The app keeps the source-shaped desktop measures: 232px rail, 8px inset, first artwork around x=285/y=135, 265px 3:4 editorials, and 209px square covers. The music player, global subscription trial and Mobbin attribution strip are still excluded.

The owner rejected the placeholder-heavy result, so this pass changes the actual course content and browsing rather than reporting another typography similarity score. Licensed photography replaces the repeated geometric sample posters in the active Home. Editorial and course artwork are differentiated; course captions now communicate creator, effort, level and explicitly labeled sample pricing. Course-specific information disclosure, subject links, five subject shelves, and the returning learner's progress are intentional product adaptations, not Apple features or measured pixel equivalence.

All active cover assets are under `web/public/covers/`; `README.md` and `sources.json` identify the original source, license, dimensions and derivative hash. No source/reference image or proprietary font was copied into the application. People in stock photography are not presented as the fictional course creators.

Latest implementation evidence: `docs/evidence/ui-001-home-content/`. Visually inspected full desktop Home, desktop and mobile viewport captures, scrolled mobile content, course-information dialogs and the 320px dialog. Functional/accessibility results are in `docs/tasks.md` and this pass's logs. The previous `ui-001-fidelity/` pixel-region measurements are historical results for a different source revision, not metrics for the current artwork/content. Mobile remains a responsive course adaptation because the inspected references are desktop captures. Owner acceptance is not claimed.
