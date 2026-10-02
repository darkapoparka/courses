# Product design — learning and community, one coherent experience

**Latest owner correction:** Home is a course-browsing marketplace, not a personal dashboard. The storefront contract in [home.md](home.md) supersedes the earlier personal Home sections below. The prior personal interface is retained in My learning at `/learn/library/overview`.

Updated 2026-10-02. The owner authorized course adaptation now. This is an independent product specification, not a claim that Apple designed these screens or that the product is already superior to competitors. Status is owned exclusively by `tasks.md`; values and visual regression rules are owned by `style.md`.

## Product quality hypothesis
Make discovery, understanding an offer, learning, practicing and asking for help feel like one continuous journey. Differentiate through useful course information, clear access states, dependable resume, readable content, contextual discussion and coherent editorial presentation—not through fake activity, rewards, testimonials, scarcity or a crowded dashboard. Validate this with real learners and creators before claiming product superiority.

## Adaptation map
| Existing visual pattern | Learning use | Intentionally different semantics |
| --- | --- | --- |
| Floating navigation sidebar | Discover, My learning, Saved, Community | Saved is a bookmark; learning is not a purchase receipt |
| Editorial feature shelf | Curated course themes and creator work | Original/licensed covers, honest labels and real outcomes |
| Album detail + track list | Course offer + ordered curriculum | Prerequisites, effort, access terms, samples and completion replace music metadata |
| Artist identity | Creator profile and teaching catalog | Verifiable identity and attributable work; no invented authority |
| Floating mini-player | Resume the last useful lesson | A navigation dock, not pretend media playback or a purchase banner |
| Expanded player + secondary panel | Focused lesson, outline, transcript/resources | Readable body text, accessible media and stable learning context; no karaoke blur |
| Quiet list rows and separators | Contextual discussions and replies | Real questions, safe content, moderation and permissions before public posting |

## Information architecture
The current product lives at `/learn` within the existing application. Discovery supports shareable query/category URLs. Detail is `/learn/courses/[slug]`; lessons are `/learn/courses/[slug]/lessons/[lessonId]`. Saved and My learning are separate destinations. Community accepts validated course context, so a question can retain the learning it came from. Music remains at `/` and `/screen/*` as a reference rather than being destructively renamed.
Next additions should be creator identity, a creator workspace and protected learner/account areas, not a second app. A future main-product URL migration must preserve old links and reference access deliberately; do not redirect the root merely to hide unfinished reference work.

## Learner journeys and state contracts
Discovery → useful course detail → open sample → legitimate enrollment/purchase → lesson → practice → discussion → return/resume is the core journey. Each step must be usable by keyboard and on narrow screens. Detail must disclose teacher, outcome, prerequisites, language/level, curriculum, estimated effort, price and access/update terms before a real transaction.
Actions reflect real state: open sample, start free demo, enroll, purchase, start, continue or review. Do not show a working Buy action while checkout is disconnected. Show an explicit locked or unavailable state for inaccessible lessons and a useful return path. Invalid course/lesson combinations must not expose another course's content.
Started learning and explicit completion are different. Opening a lesson can record resume but must not mark it completed. Completion is reversible. Saving a course must not silently enroll it. Changes that fail to persist must be reported; note drafts must survive a save conflict or quota failure long enough to copy them.

## Community belongs next to the lesson
A discussion has course context, an attributable author, a meaningful title and useful body. Replies belong to that discussion, not a disconnected global comment stream. Helpful is a reversible personal reaction, not a fabricated count. Preserve line breaks and render untrusted text as text; rich formatting requires a separately reviewed sanitization policy.
The current preview supports original seed prompts, local posts, helpful toggles and local reply threads. Label the difference between a demonstration prompt and genuine activity. Nothing in this preview is sent to another person. Do not imply that local content has been moderated, published or synchronized. Local draft capacity and save failures must be explicit.
The real-community gate includes membership visibility, author/creator/operator permissions, private notes, report/hide/restore, spam controls, rate limits, audit and usable notification preferences. A user must understand what is public, course-only and private before submitting. Add lesson-level context and resolved questions when the server model can enforce them.

## Creator and commerce journeys
The first real creator journey is draft → structured lessons → preview → submit → review → publish. Preserve stable IDs and unfinished input. Display validation at the responsible field. Draft saves need revision checks; conflicts are not last-write-wins surprises. Publication must not make private assets or lesson bodies public accidentally.
The first real learner journey should use free enrollment and a second test account. Only then connect sandbox paid checkout, authoritative fulfillment, refunds and access recovery. A success URL is not proof of payment. Show processing/retry/recovery states rather than a fake success toast. Published changes and unlisting must respect existing learners' access and the declared update policy.

## Layout and interaction acceptance
Preserve editorial hierarchy, neutral surfaces and the floating sidebar from `style.md`. Course offer and lesson reading are different density contexts; do not force a 34px music row into a multi-line curriculum item. Community replies use native disclosure controls and quiet separators, not a new visual system.
A delivered surface includes loading, empty, invalid, denied, storage/network failure, long-content, keyboard and responsive states as applicable. Review zoom, reduced motion/transparency, focus order, labels, announcements and media captions. Automated geometry checks do not replace screen-reader and usability review.
For every slice record entry and exit routes, source of state, allowed transitions, recovery behavior, visual owner and test evidence. Use task IDs and unique evidence paths. The original music corpus keeps its own acceptance ledger; course adaptation screenshots are separate product baselines.

## Near-term validation, not vanity metrics
Observe whether a learner can find a suitable course, distinguish a sample from paid access, start without assistance, return to the right lesson and ask a question with its context intact. Observe whether a creator can publish without losing a draft and understand who can see each item. Measure completion of those tasks, errors and recovery before adding streaks, leaderboards, AI, live events or complex subscriptions.

## Owner clarification: adapt the full interface, do not simplify it away
The owner clarified on 2026-10-02 that the small A0 preview omitted too much of the existing music experience. It is an implementation starting point, not permission to discard the screen/interaction inventory. Keep the music reference intact, evolve the current platform components, and connect equivalent entities with real navigation. Do not create a third application or mechanically relabel playback as learning when the behavior would be false.

| Music family | Course adaptation and owner |
| --- | --- |
| Search, New, editorial shelves | Unified creator/course search, Discover, real Next/Previous and keyboard shelf controls (`CP-021`) |
| Artists and artist detail | Creator directory, following preference, broad identity hero, teaching catalog, open lessons, biography/context and related creators (`CP-022`) |
| Genres | Subject directory and detail with courses, creators and sample lessons (`CP-023`) |
| Albums and tracks | Course offer, ordered curriculum, samples, lesson selection and detail actions; retain rich interaction work (`CP-025`) |
| Playlists and library collections | Learning paths and personal collections; no invented enrollment or automatic completion (`CP-026`) |
| Player, lyrics and queue | Focused lesson media, readable transcript/resources and upcoming lessons; preserve preview/access distinctions (`CP-027`) |
| Radio, schedules and concerts | Consider cohort sessions/events only when real content and useful behavior are available; no dead controls or invented attendance (`CP-028`) |
| Account and billing | Real identity, enrollment, authoring and commerce retain their existing A1/A2 task owners |

Routes now include `/learn/search`, `/learn/creators`, `/learn/creators/[slug]`, `/learn/categories`, `/learn/categories/[slug]`, and `/learn/courses`. Creator IDs are separate from labels; courses point to their creator, and categories connect the relevant creators, lessons and courses. Fictional creators are explicitly labeled, use original typographic portraits, and claim no credentials or popularity. Following is a local preference, not an access grant or subscription.


## Shared controls are part of the migration — 2026-10-02 correction
A destination existing is not proof that its UI/UX has been carried across. The owner identified missing visible search on most course pages. Preserve the original reference, but also implement its useful controls and states in the product; preserving a separate music route alone does not satisfy adaptation.
The course shell owns a visible, sticky search field across discovery, creators, categories, collections, lessons and community. Page-local forms must not leave other surfaces without search. Suggestions support manual keyboard selection, Escape, click and a documented shortcut. Search covers public courses/creators/lesson metadata/categories, with All Courses versus Your Library scope and URL-addressable result types. Private notes/discussions are not indexed. Recents are explicitly local, bounded and removable without clearing other activity.
The Courses, Saved and My learning collections need title/creator filtering, category/free-course filters, deterministic sort, grid/list views and working save controls. Filter/view URLs must survive reload and browser navigation. Empty-filter results are different from an empty collection. Search navigation must honor unsaved-note guards.

| Source interaction family | Course implementation requirement | Owning task |
| --- | --- | --- |
| Search field, suggestions, recents, scoped results | Shared visible search plus courses/creators/lessons/subjects; not just a sidebar link | CP-029 |
| Album/library filters, view switch, save state | Collection filters/sort/grid/list and real local save transitions | CP-030 |
| Artist hierarchy, catalog, follow, contextual actions | Preserve creator identity/detail and add only meaningful actions; not all artist menus are adapted yet | CP-022, CP-025 |
| Album detail, tracks, menus and editorial information | Rich course offer, curriculum, samples and accessible course/lesson actions | CP-025 |
| Playlists and playlist editing | Ordered learning paths and user collections; still separate work | CP-026 |
| Expanded player, queue, lyrics/resources and video | Lesson player, outline, transcript and resource panels with real state; do not fake media | CP-027 |
| Account, preferences and access dialogs | Course identity/preferences/access with truthful preview and real integration boundaries | CP-028, CP-012 |
| Replay, events and radio-style programming | Assess progress, events and scheduled learning; document decisions, do not silently drop families | CP-028 |

These rows describe mapping coverage, not an additional acceptance ledger. `tasks.md` owns status. Match visual density and actual interactions before calling a family migrated; screenshots, route presence and green tests each prove only their stated scope.

## Personal Home is a separate product surface
[home.md](home.md) now owns the exact Home blueprint and the saved source mapping. `/learn/home` prioritizes continuing actual learning; `/learn` remains Discover for open-ended browsing. Both retain the shared visible search and navigation. The new Home entry does not redirect or remove an existing route.
The first Home slice combines completion-aware continuation, portrait picks with visible reasons, interest editing, short-lesson time controls, real saved/followed content and a dismissible contextual discussion prompt. Completion, opening, bookmarking and following remain distinct. On Home the floating resume dock uses the same computed next-step destination as the Continue section; finished samples offer course detail, not locked playback.
Learning paths, real sessions, richer media panels and a permissioned activity feed keep their existing CP task owners. Their presence in the Home plan is not a claim that those integrations are implemented.
