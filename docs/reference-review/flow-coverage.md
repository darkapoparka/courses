# Expanded reference flow coverage

Recorded 2026-09-09. Source authority: `apple-music-clone/reference/originals/flow-screen-map.json`, not the archived prototype. All 58 flows, 218 ordered steps and 159 distinct identities are represented in the companion JSON. This is implementation evidence, not another backlog.

## Reading the statuses

`UI PREVIEW` means an implemented local course interface. `COURSE ADAPTATION` deliberately changes music semantics. `ISOLATED STUDY` is a working `/preview/` pattern demonstration, not a newly adopted live product feature. `NATIVE CONTROL` uses browser media UI. `BUSINESS BOUNDARY` is intentionally unavailable without real providers/business approval. `INTENTIONAL NON-GOAL` is not implemented as music functionality. None means full-image pixel identity, real backend completion, or owner approval.

| # | Saved flow | Course destination / action | Status | Implemented behavior or explicit limit |
| --- | --- | --- | --- | --- |
| 01 | Onboarding | `/auth/sign-in` | UI PREVIEW | Email-shaped input, sample-code entry/confirmation/error/expiry. No account creation. |
| 02 | Starting a trial | `/courses/useful-ai` | BUSINESS BOUNDARY | Offer dialog explicitly prevents checkout/enrollment. A global music trial is not a course product. |
| 03 | New | `/new` | UI PREVIEW | Landscape editorials, compact rows and square discovery shelves. |
| 04 | Chart detail | `/collections/a-little-every-day` | COURSE ADAPTATION | Curated collection/detail and ordered content, without fabricated popularity charts. |
| 05 | Listening to songs | `/learn/useful-ai/lesson-1?sample=learner` | UI PREVIEW | Actual native local-video playback, pause, seeking and browser-tab position retention. |
| 06 | Enabling shuffle | `/learn/useful-ai/lesson-1?sample=learner` | INTENTIONAL NON-GOAL | No lesson shuffle. Curriculum remains ordered; user learning lists can be reordered separately. |
| 07 | Repeating a song | `/learn/useful-ai/lesson-1?sample=learner` | UI PREVIEW | Repeat sample toggles the actual native video loop property. |
| 08 | Expanding a song | `/learn/useful-ai/lesson-1?sample=learner` | COURSE ADAPTATION | Focused media workspace and native fullscreen affordance; no persistent music mini-player. |
| 09 | Favoriting a song | `/courses/useful-ai` | UI PREVIEW | Save/unsave in this browser tab, distinct from enrolled access. |
| 10 | Adding to a library | `/library` | COURSE ADAPTATION | Fixture owned library and actual tab-only Saved are separate. No fake enrollment grant. |
| 11 | Adding to a playlist | `/courses/useful-ai` | UI PREVIEW | More menu adds a sample course to a browser-tab learning list. |
| 12 | Song credits | `/courses/useful-ai` | UI PREVIEW | More > About this sample explains fictional content and asset attribution. |
| 13 | Hiding lyrics | `/learn/useful-ai/lesson-1?sample=learner` | COURSE ADAPTATION | Switch study tabs away from Transcript; keep media context. No karaoke rendering. |
| 14 | Showing lyrics | `/learn/useful-ai/lesson-1?sample=learner` | UI PREVIEW | Readable transcript, active cue and click-to-seek. |
| 15 | Song queue | `/learn/useful-ai/lesson-1?sample=learner` | COURSE ADAPTATION | Curriculum/up-next side panel with current lesson and next/previous links. |
| 16 | Clearing song queue | `/collections/a-little-every-day` | INTENTIONAL NON-GOAL | A purchased curriculum cannot be cleared. User learning lists support removal and confirmed deletion. |
| 17 | Enabling autoplay | `/learn/useful-ai/lesson-1?sample=learner` | INTENTIONAL NON-GOAL | Manual next lesson and repeat are implemented; continuous automatic cross-route playback is not. |
| 18 | Adjusting volume | `/learn/useful-ai/lesson-1?sample=learner` | NATIVE CONTROL | Native browser volume control. The original sample is silent, so audible-volume behavior is not verified. |
| 19 | Album detail | `/courses/useful-ai` | UI PREVIEW | Square cover, adjacent identity/offer/actions and ordered curriculum; visitor/learner/completed/unavailable states. |
| 20 | Album description | `/courses/useful-ai` | UI PREVIEW | More about this course dialog with description, outcomes and prerequisites. |
| 21 | Share an album | `/courses/useful-ai` | UI PREVIEW | Share dialog with a local preview URL and clear loopback limitations. |
| 22 | Copying an album link | `/courses/useful-ai` | UI PREVIEW | Clipboard copy with permission-failure fallback. Link display never pretends to send a message. |
| 23 | Artist detail | `/creators/maya-chen` | UI PREVIEW | Image-led creator identity, description, featured course and preview/course shelves. |
| 24 | Nearby concerts | `/preview/events` | ISOLATED STUDY | Event/location family is demonstrated with conspicuously fictional workshops, not live-class availability. |
| 25 | Marking a song as suggest less | `/for-you` | UI PREVIEW | Explicit subject choices, More > Show less, and restore hidden suggestions. No recommendation service. |
| 26 | Watching a music video | `/previews` | UI PREVIEW | Video-shaped preview gallery leading to the actual original local sample player. |
| 27 | Search | `/search` | UI PREVIEW | Search input, categories, recent queries, remove/clear and reset states. |
| 28 | Searching Apple Music | `/search?q=Maya` | UI PREVIEW | URL-driven course/creator results, subject/level/price/sort filters and empty results. |
| 29 | Concerts | `/preview/events` | ISOLATED STUDY | Event-discovery layout, locations, dates, categories and empty filter state. |
| 30 | Concert detail | `/preview/events/a-better-brief` | ISOLATED STUDY | Date badge, circular image, event details, booking boundary and related events. |
| 31 | Setting a location | `/preview/events` | ISOLATED STUDY | Explicit sample-location selection. No geolocation permission or real location service. |
| 32 | Filtering concerts | `/preview/events?location=Online&month=Sep` | ISOLATED STUDY | Real URL filters over fictional events; clear/reset/no matches. |
| 33 | Replay monthly | `/preview/recap` | ISOLATED STUDY | Monthly tabs, explicitly illustrative activity values and course/milestone shelves. |
| 34 | Milestone detail | `/preview/recap/first-step` | ISOLATED STUDY | Original milestone medallion and detail layout; explicitly not earned or a credential. |
| 35 | Home | `/` | UI PREVIEW | Existing photo-led Home preserved; navigation now opens real implemented course destinations. |
| 36 | Radio | `/preview/channels` | ISOLATED STUDY | Subject-channel tiles, session rows and preview shelves; not a live-radio product. |
| 37 | Listening to a live radio | `/preview/channels/ai-coding` | BUSINESS BOUNDARY | Channel preview opens an on-demand original clip, not a fake live broadcast. |
| 38 | Live radio schedule | `/preview/channels/ai-coding` | ISOLATED STUDY | Day selector and actual changing sample schedule; all availability explicitly fictional. |
| 39 | Recently added | `/library` | UI PREVIEW | Populated/empty sample library, list/grid, sort and search. |
| 40 | Artists | `/creators` | UI PREVIEW | Creator identity grid and detail navigation; fictional identities, no invented credentials. |
| 41 | Albums | `/library` | COURSE ADAPTATION | Square course-cover library and detail, not music albums. |
| 42 | Songs | `/library/lessons` | COURSE ADAPTATION | Compact striped lesson table with course, creator, duration and current destinations. |
| 43 | Sorting songs | `/library/lessons` | UI PREVIEW | Keyboard-accessible sort menu and URL order; course/title/duration choices. |
| 44 | Pinning a song | `/library/lessons?pinned=1` | UI PREVIEW | Pin/unpin and empty/populated tab-only pinned lesson view. |
| 45 | Music videos | `/previews` | UI PREVIEW | Landscape video-thumbnail library with sample-subject filter. |
| 46 | Made for you | `/for-you` | UI PREVIEW | Empty state and explicit-interest course selection, independently from owned/saved courses. |
| 47 | All playlists | `/collections` | UI PREVIEW | Learning-list mosaic grid, new-list dialog and empty list. |
| 48 | Playlist detail | `/collections/a-little-every-day` | UI PREVIEW | List title/description, course rows, edit, reorder, remove and confirmed delete. |
| 49 | Adding a suggested song | `/collections/a-little-every-day` | UI PREVIEW | Add suggested sample course; updates list membership in this tab only. |
| 50 | Favorite songs | `/library?tab=saved` | COURSE ADAPTATION | Saved courses are bookmarks, not favorites-based paid access. |
| 51 | Editing library menus | `/library` | UI PREVIEW | Library navigation Edit/Done, checkboxes and reversible tab-only visibility preferences. |
| 52 | Logging out | `/settings` | BUSINESS BOUNDARY | Return to visitor preview; no real session exists to revoke. Not advertised as an actual sign-out. |
| 53 | Settings | `/settings` | UI PREVIEW | Account-summary/access/preferences sections, profile-edit dialog, caption preference and purchase empty state. |
| 54 | Connected accounts | `/settings` | BUSINESS BOUNDARY | Connected-accounts dialog explains no real accounts; provider linking is disabled. |
| 55 | Turning on content restrictions | `/preview/content` | ISOLATED STUDY | Public sample-code entry, confirmation/error, switch and result filter. Not parental controls or security. |
| 56 | Canceling a trial | `/settings/purchases` | BUSINESS BOUNDARY | No subscription/trial exists to cancel. No fake cancellation, refund, or payment success. |
| 57 | Changing language | `/preview/language` | ISOLATED STUDY | Language selection dialog switches this study between English and Simplified Chinese with real query navigation. |
| 58 | Logging in | `/auth/sign-in` | UI PREVIEW | Email/code interface and recovery; explicit no email, no verified identity, no session, no entitlement. |

## Exact source evidence

Thirty-three high-resolution originals were opened at readable size during this expansion. These are representative states, not a claim that all 159 images or recordings were viewed. Each path below is repository-relative and its bytes remain in the archive. The companion JSON records every ordered flow step and separately flags the images actually inspected in this expansion.

- [`b620e4ab-d6dc-47c9-b704-6cd45cbd714c.webp`](../../apple-music-clone/reference/originals/high-resolution/b620e4ab-d6dc-47c9-b704-6cd45cbd714c.webp)
- [`035569a0-e8da-454e-8bfd-83e7eacfecc5.webp`](../../apple-music-clone/reference/originals/high-resolution/035569a0-e8da-454e-8bfd-83e7eacfecc5.webp)
- [`e70094e3-980e-4ba7-a454-e8dd6ce55ae4.webp`](../../apple-music-clone/reference/originals/high-resolution/e70094e3-980e-4ba7-a454-e8dd6ce55ae4.webp)
- [`484851bf-bc23-4088-8a34-4078c4d6b4ff.webp`](../../apple-music-clone/reference/originals/high-resolution/484851bf-bc23-4088-8a34-4078c4d6b4ff.webp)
- [`c939c9b8-e195-4e43-92a6-b845d0b99243.webp`](../../apple-music-clone/reference/originals/high-resolution/c939c9b8-e195-4e43-92a6-b845d0b99243.webp)
- [`a4afd6e6-eddb-4263-b7eb-5be73f8f2b03.webp`](../../apple-music-clone/reference/originals/high-resolution/a4afd6e6-eddb-4263-b7eb-5be73f8f2b03.webp)
- [`e757eb0f-2d7c-48e6-a37f-54ce600c0a8f.webp`](../../apple-music-clone/reference/originals/high-resolution/e757eb0f-2d7c-48e6-a37f-54ce600c0a8f.webp)
- [`bdc69b59-1062-43ee-91da-589de56512b6.webp`](../../apple-music-clone/reference/originals/high-resolution/bdc69b59-1062-43ee-91da-589de56512b6.webp)
- [`481cd568-59d9-47ab-88fc-ec20f843d9c1.webp`](../../apple-music-clone/reference/originals/high-resolution/481cd568-59d9-47ab-88fc-ec20f843d9c1.webp)
- [`3131018d-35b8-4527-a6fe-384fbe950fe7.webp`](../../apple-music-clone/reference/originals/high-resolution/3131018d-35b8-4527-a6fe-384fbe950fe7.webp)
- [`ac05c6b8-9970-422b-bbc1-3aaff880946c.webp`](../../apple-music-clone/reference/originals/high-resolution/ac05c6b8-9970-422b-bbc1-3aaff880946c.webp)
- [`32515da3-7507-463f-baad-a257cfed078b.webp`](../../apple-music-clone/reference/originals/high-resolution/32515da3-7507-463f-baad-a257cfed078b.webp)
- [`8a2a4241-7833-471f-b5e4-72f89d71412b.webp`](../../apple-music-clone/reference/originals/high-resolution/8a2a4241-7833-471f-b5e4-72f89d71412b.webp)
- [`a573d1ab-e4c7-4f59-beb8-f2e171ba1530.webp`](../../apple-music-clone/reference/originals/high-resolution/a573d1ab-e4c7-4f59-beb8-f2e171ba1530.webp)
- [`92589389-e185-401c-a395-c646b801a0c4.webp`](../../apple-music-clone/reference/originals/high-resolution/92589389-e185-401c-a395-c646b801a0c4.webp)
- [`09b3600e-624d-4fd9-a3dd-625f6c086a37.webp`](../../apple-music-clone/reference/originals/high-resolution/09b3600e-624d-4fd9-a3dd-625f6c086a37.webp)
- [`f2e44e3b-cb93-4607-a0bf-6e38aa56019d.webp`](../../apple-music-clone/reference/originals/high-resolution/f2e44e3b-cb93-4607-a0bf-6e38aa56019d.webp)
- [`ffc18eb8-5cbb-4e01-b066-867308585f5f.webp`](../../apple-music-clone/reference/originals/high-resolution/ffc18eb8-5cbb-4e01-b066-867308585f5f.webp)
- [`4e857921-f588-4920-ad53-634f36389674.webp`](../../apple-music-clone/reference/originals/high-resolution/4e857921-f588-4920-ad53-634f36389674.webp)
- [`dcafd99e-94e3-42a1-be31-e02f7e015ecc.webp`](../../apple-music-clone/reference/originals/high-resolution/dcafd99e-94e3-42a1-be31-e02f7e015ecc.webp)
- [`bd89b0a1-f1ab-499d-8feb-9d0bcbae9f57.webp`](../../apple-music-clone/reference/originals/high-resolution/bd89b0a1-f1ab-499d-8feb-9d0bcbae9f57.webp)
- [`4cb8f3aa-e45c-4482-b47b-7bc395aa4f14.webp`](../../apple-music-clone/reference/originals/high-resolution/4cb8f3aa-e45c-4482-b47b-7bc395aa4f14.webp)
- [`37575452-9dfc-4d5d-a581-cbbcd78b67aa.webp`](../../apple-music-clone/reference/originals/high-resolution/37575452-9dfc-4d5d-a581-cbbcd78b67aa.webp)
- [`18225175-b422-4fbb-8371-eae08bb6c4a8.webp`](../../apple-music-clone/reference/originals/high-resolution/18225175-b422-4fbb-8371-eae08bb6c4a8.webp)
- [`cc18744f-ee47-4062-9927-c85c292c25af.webp`](../../apple-music-clone/reference/originals/high-resolution/cc18744f-ee47-4062-9927-c85c292c25af.webp)
- [`01f96377-a362-452d-9045-449e0916609f.webp`](../../apple-music-clone/reference/originals/high-resolution/01f96377-a362-452d-9045-449e0916609f.webp)
- [`f99d9583-5836-47c5-ae0a-a26ffaf0d1b8.webp`](../../apple-music-clone/reference/originals/high-resolution/f99d9583-5836-47c5-ae0a-a26ffaf0d1b8.webp)
- [`0da4882b-707f-4cbd-aba1-034f3e9f2a90.webp`](../../apple-music-clone/reference/originals/high-resolution/0da4882b-707f-4cbd-aba1-034f3e9f2a90.webp)
- [`f4a8b5dc-6d28-4e7e-ad51-423e571073de.webp`](../../apple-music-clone/reference/originals/high-resolution/f4a8b5dc-6d28-4e7e-ad51-423e571073de.webp)
- [`0b0e3fbf-2dd5-4323-b83d-dc5f65e50b31.webp`](../../apple-music-clone/reference/originals/high-resolution/0b0e3fbf-2dd5-4323-b83d-dc5f65e50b31.webp)
- [`e379e3fe-9298-433a-938a-7cb3b195028b.webp`](../../apple-music-clone/reference/originals/high-resolution/e379e3fe-9298-433a-938a-7cb3b195028b.webp)
- [`bc773ae9-a55f-495b-a49f-d5b683feee73.webp`](../../apple-music-clone/reference/originals/high-resolution/bc773ae9-a55f-495b-a49f-d5b683feee73.webp)
- [`50fe374b-43b5-403d-962e-b072bf58d5e1.webp`](../../apple-music-clone/reference/originals/high-resolution/50fe374b-43b5-403d-962e-b072bf58d5e1.webp)

The attempted path `70566e85-0ab4-4f53-9ca6-7c3e5cb12d3f.webp` failed to resolve and is not counted as viewed. No recording was played in full. No extra reference bytes, proprietary artwork, music or font files were copied into the app.

## Comparison and verification

The full-size originals remain the source for composition, spacing, artwork shape, navigation, dialogs and menus. Course screenshots at 1440px and 390px are in `docs/evidence/ui-platform-expansion/`; `review.html` provides source/app comparisons without adding application routes. The bottom Mobbin footer is outside the app comparison. Our licensed photographs, text, actual navigation, content warnings and non-commercial preview disclosures intentionally differ.

Browser test evidence covers real routes and interactions, not the original Apple site. The status of complete suites and remaining limitations is recorded in `docs/tasks.md`. Payment, live radio, real sessions, global subscription cancellation and authoritative access are not certified by these fixtures.
