# Course design system and interaction direction

Revised after the 2026-09-09 visual review. Source observations below link to the [17-screen ledger](reference-review/ledger.md). Course layouts/tokens are implementation proposals, not owner-approved final designs or a claim of extracted Apple CSS.

## Preserve the reference character

Use content-led shelves, strong artwork, restrained navigation, readable compact metadata, gentle surface contrast, purposeful type hierarchy and whitespace. Keep captions outside ordinary course artwork. Do not replace this with a generic SaaS dashboard, repeated statistic cards, giant marketing slogans, gradient placeholders or a white box around every section.

Apple's detail page uses a black main Play action and red for identity/selected states. Our default may likewise use a neutral high-contrast primary action with a restrained brand accent. Do not make every button bright red or treat a full red selected row as the only way to show lesson progress.

## Source anchors by family

| Family | Viewed evidence | Preserve | Change for courses |
| --- | --- | --- | --- |
| Visitor discovery | VIS-05/06 | Labeled editorial landscape cards, small content shelves, clear rail | No global subscription banner or empty playback bar; sign-in preserves course intent |
| Returning Home | VIS-07 | Personal content shelves and square recent covers | Continue learning is first; portrait campaigns are optional, not every card |
| Course detail | VIS-02 | Square cover beside identity/actions, ordered content immediately below | Outcomes/prerequisites, price/access, module/lesson status, Preview/Buy/Continue |
| Creator | VIS-08/10 | Image-led identity followed by actual content | Real expertise, courses and useful samples; shorter mobile header |
| Search | VIS-03/14 | Prominent input, category versus results states, distinct result types | Courses and Creators; public-safe fields and purposeful filters |
| Library | VIS-04/12/13 | Quiet empty state, cover grid or compact list | Owned/free-enrolled versus saved, resume/progress, no fake media collections |
| Learning | VIS-09/11/15 | Focused media and optional secondary panel | Readable transcript, curriculum, captions/speed, notes/questions; no karaoke blur/queue controls |
| Dialog/menu | VIS-01/16/17 | Focus isolation, concise action hierarchy, grouped controls | Real authentication/access/error behavior and mobile fit; no Apple billing/legal clone |

## Desktop and mobile layouts

Desktop uses a single quiet learner rail with content beside it. The references allocate roughly a sixth of the width to navigation at their reported desktop viewport and start content with a noticeable inset; preserve the relationship rather than copying a scaled screenshot coordinate. Creator Studio has its own focused layout, not a second app or every creator action in the learner rail.

UI-001 after the owner fidelity correction uses a 232px rail, 8px outer inset and 37px content padding at 1440px, putting the first artwork at x=285. Editorial Home cards are 265px wide at 3:4; ordinary course covers are 209px square with 18px desktop gaps (portrait gaps remain 19px). This follows the normalized reference proportions more closely than the earlier 248px/40px proposal. These are implementation tokens, not extracted Apple CSS or owner-approved final values. Tablet uses a 200px rail and 28px inset; mobile removes the rail. The rail must never squeeze the lesson into an unusable video width; collapse to the mobile layout based on actual fit.

Mobile proposal: Home / Search / Library / You, four equal destinations. Creator entry/settings live under You. No oversized center action or fifth vague destination. A local Home-only preview explicitly marks destinations that are not implemented yet; it does not send users to 404s or fake backend screens.

On lesson routes, desktop can place curriculum beside the video. Mobile stacks media, lesson context/actions, then curriculum/study content. No dock + purchase bar + persistent mini-video stack. V1 pauses when leaving a lesson and provides a compact resume destination elsewhere. Continuous multi-route mini-playback is deferred.

## Page hierarchy

Home: returning learners see Continue learning first; visitors see a modest editorial selection and useful categories. Use a few meaningful shelves rather than repeating every topic. A section action navigates somewhere real; it is not decoration.

Course: outcome/title, teacher, artwork/preview, concise price/access or progress action, then curriculum. Supporting prerequisites, resources, update/access/support details follow. Do not hide the curriculum behind authentication. One obvious main action reflects the actual state: Preview, Enroll free, Buy course, Start learning, Continue or Review lessons.

Creator: identity and substantiated expertise, concise introduction, then courses. Avoid artificial follower counts, fabricated badges/testimonials and a giant image that pushes all useful information off mobile. Studio: save state, draft checklist, curriculum and review status before analytics.

## Tokens and assets

Create semantic variables for canvas, surface, text, muted text, border, accent, danger, focus, spacing, radii and content measures. Initial spacing scale: 4/8/12/16/24/32/40/48. Mobile body text starts at 16px; desktop body 14–16px depending on content; metadata may be smaller only where readable. Heading scale follows the content hierarchy, not marketing display type everywhere.

Ordinary course covers: 1:1 across discovery/library/detail. Lesson video thumbnails and media: 16:9. Editorial landscape and optional 3:4 campaign assets are separate components, not inconsistent course-card shapes. Avoid letterboxing a video frame into a square course cover when a purpose-made cover is available.

Provisional radii: 10–12px for artwork/cards, a larger dialog radius, and pill controls only where appropriate. Keep shadows restrained and test against real imagery. Use a system stack or one licensed font and a single icon family/weight. Do not redistribute Apple's proprietary fonts. Start light-mode; a second theme is not required before the first screen is right.

Check actual contrast and focus visibility; color alone cannot communicate selected, locked or complete. Preferred touch areas are around 44×44 CSS pixels where practical; that preference is not a blanket statement of WCAG's AA minimum [R14, R17](research.md).

## Components, extracted only as used

| Component | Contract |
| --- | --- |
| CourseCard | Artwork, title, creator, one useful metadata line; real link and separate accessible save action, no nested interactive controls |
| ContentShelf | Heading and meaningful destination, responsive list, keyboard access; intentional horizontal shelf without whole-page overflow |
| Curriculum / LessonRow | Ordered module/lesson identity, duration/type, preview/lock/completion and current selection; no shuffle or learner-side destructive reorder |
| CourseAction | State-specific primary action based on server access/payment truth in integrated stages |
| CreatorIdentity | Real name/image/expertise, no invented credentials |
| Dialog / Sheet / Menu | Named heading where applicable, focus/escape/close/return, proper semantics, viewport and keyboard fit |
| FormField / SaveFeedback | Label, description, inline error, saving/saved/failure/conflict; preserve input |
| Empty / Error / Loading | Honest state and clear recovery, properly sized skeletons; no indefinite spinner or fake success |
| Player / StudyPanel | Maintained media engine, captions/speed/keyboard/retry, readable transcript, accessible curriculum and private notes |

A small local fixture/demo route is enough for primitive review. Do not create a separate design-system package, custom media engine or public Storybook deployment as an unassigned foundation project.

## Interaction rules

Use links for destinations and buttons for actions. URL state owns query/filter/sort. Browser Back and direct lesson links work. A bookmark means Save, not purchase, enrollment or offline download. Mobile actions are discoverable without hover.

The billing reference is internally scrolled: its clipped top/bottom content is a captured state, not our initial form layout. Dialogs fit small screens and keyboards; destructive actions are clear and confirmed. Hosted Checkout supplies the payment form, not a copied Apple dialog.

Keep all transcript text readable; optional active-time highlighting must not blur the surrounding material. Do not autoplay sound. Honor reduced motion and avoid ornamental entrance delays. Sticky controls respect safe areas and cannot cover focus, curriculum or supporting content. Long titles, translated labels and zoom are test cases, not afterthoughts.

## Evidence and acceptance

For each family record exact source, course screenshot, viewport, intentional changes and tested states. Use 390px mobile and 1440px desktop first; then 320px, tablet, wide desktop, zoom and actual mobile browsers before pilot. The viewed references are desktop images; our mobile layout is a separate design proposal requiring testing.

Review the first Home/shell before multiplying its components across the platform. Final screenshots are our course-design baselines, not claims of pixel identity to Apple. Original/licensed covers, consented creator imagery and truthful content are required before release; clearly labeled fixtures are acceptable during M0, never invented social proof.

## UI-001 fidelity correction - 2026-09-09

The owner rejected the first interpretation and explicitly asked to retain the Apple Music look. The current Home uses VIS-07 as its primary composition: a plain Home heading, 3:4 editorial shelf, then square artwork with compact captions. The two-banner visitor composition, extra marketing subheadings, sidebar table of contents, brown accent and boxed resume cards were removed. VIS-05/06 continue to inform the shell and discovery density. Visitor and returning fixtures share this Home composition; the returning sample adds compact Continue learning rows first. This is a deliberate course-specific change, not a claim that Apple has these learning states.

The Mobbin footer, Apple identity/artwork/fonts, subscription trial and music player are not copied. Course artwork is original or licensed; captions stay outside ordinary course covers. Sample-state controls and unavailable destinations remain explicitly labeled. Mobile is a course adaptation because the reviewed originals are desktop captures. See the ledger and task evidence; final visual approval is still the owner's decision.

## UI-001 pixel-region refinement — 2026-09-09

The latest source comparison further calibrates desktop Home to 32px type with a 40px line box; shelf headings use 15.5px/19.2px and measured tracking/offset. The single system Arial fallback is retained, not a downloaded proprietary font. Rail/selected surfaces now use sampled `#f9f9fb`/`#efeef1`; ink is `#202020`. Source pixels and native CSS/font pixels are not asserted to be identical.

Ordinary desktop course captions occupy two compact lines: complete title in the DOM with visual ellipsis, then creator and effort. Mobile titles wrap; the full level/creator/effort metadata is also retained in the descriptive title. This prevents longer course names from changing every shelf's vertical rhythm. Editorial captions stay low on the artwork; overlays provide legibility without darkening the whole campaign.

Preview state controls live in the footer, leaving the Home heading uncluttered. Desktop shelf controls sit at the artwork edges, appear on hover or keyboard focus and hide at disabled ends; mobile/coarse-pointer controls remain visible. Enabled controls still accept the first pointer interaction, are reachable by keyboard, and respect reduced motion. These are behavior requirements, not permission to hide a working action from touch users.

The local reference comparison and disclosed region measurements are in `evidence/ui-001-fidelity/`. They show an improvement over b731fff, not a zero-difference whole-image result or owner approval. Do not restore the previous marketing-banner composition or treat the old screenshot sets as the current baseline.
