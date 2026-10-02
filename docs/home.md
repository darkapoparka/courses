# Home - product blueprint and Apple Music adaptation

Owner: platform UI. Updated 2026-10-02. Status lives only in [tasks.md](tasks.md); this is the screen specification, not a second checklist. `CP-031` through `CP-033` own the first Home slice. [style.md](style.md) governs presentation and [design.md](design.md) owns the full migration map.

## Job and route
Home answers: what can I continue, what is relevant to me, and what can I learn in the time I have? Discover answers: what else could I explore? Keep both, rather than making one busy catalog serve every job.
The personal local-preview Home is `/learn/home`, reached through the visible Home sidebar item. `/learn` remains Discover; its existing query URLs and links still work. `/` and `/screen/*` remain the music reference. No root redirect, new app or loss of the original inventory is part of this change.
The shared sticky search remains visible on Home, including narrow layouts. Home uses the existing sidebar, editorial shelves, covers, creator cards, typography, spacing and persistent resume dock. It is not a dashboard of invented statistics.

## What the saved Apple Music Home actually contains
This describes the repository captures, not a claim about every current Apple Music version or account.
Source `a917d88f-d15a-4f53-92d3-1daecf59d05f` shows Home, a four-visible-card portrait shelf titled Top Picks for You, Recently Played, a Pop shelf beginning below it, the shared library sidebar and floating player. Cards link to stations, artists, albums and playlists; shelves scroll independently.
Source `42098642-4b2d-429d-8fd9-9afc2711c1ed` shows the lower Top 100 shelf, Add to Your Library with a supporting line, and a Concerts card with Set Location and a dismiss action. The 120px Mobbin acquisition footer is not app UI.
The active `HomeView` in `components/music-discovery.tsx` also preserves localized editions and a separate signed-out membership invitation. These source screens remain unchanged. Personalized ordering, ratings and recommendations from Apple's backend are not reproduced or inferred from a screenshot.

| Saved pattern | Useful course equivalent | Decision |
| --- | --- | --- |
| Top Picks for You portrait shelf | Reason-labeled course picks with save, dismiss and restore | First Home slice; explicit local rules, not AI or popularity claims |
| Recently Played | Continue learning and review completed courses | First slice; uses actual open/completion state, not a static list |
| Genre shelves | Chosen interests and creator-follow context | First slice; subjects can be changed through Customize Home |
| Add to Your Library | Saved for later, separate from enrollment | First slice; save never changes course access |
| Top 100 | Editorial learning paths and collections | CP-026; do not invent rankings before real evidence exists |
| Dismissible Concerts prompt | Contextual practice/discussion prompt now; live/cohort sessions later | Local discussion is real preview behavior; real events remain CP-028 |
| Floating player | Existing resume dock, later real lesson player/panels | Dock retained; CP-027 owns media, outline, transcript and resources |
| Signed-out trial invitation | Useful first lesson and interest setup without a purchase claim | No payment or registration wall in the demo |

## Initial screen order and interactions
1. **Home header and shortcuts.** Home title, Customize Home, anchors to continue/picks/short lessons, and a link to Discover. Search is shell-owned, not duplicated or hidden.
2. **Continue learning.** Up to four recently active courses. Each shows course/creator, the actual next accessible lesson, estimated duration and explicit completion progress. Starting a lesson and completing it remain different actions. A fresh browser gets a real free-lesson entry instead of invented progress.
3. **Picks for you.** Portrait artwork, creator, free/sample label, explanation, Save for later and Not now. Prefer followed creators, then chosen subjects, then saved-course subjects, then editorial order. Exclude already started/saved courses and hidden picks. Dismiss is undoable; hidden picks can be restored after reload.
4. **A little learning, right now.** 5/10/15-minute controls and Include completed. List only genuinely open demo lessons within that estimated reading time. An empty 5-minute result offers a recovery action; it does not invent a shorter lesson. Time and completion filters are view-local, not an asserted personal goal or measured study time.
5. **Saved for later.** Actual bookmarks with course links, remove-save control and a link to the searchable Saved collection. No bookmark means no enrollment, access grant or percentage complete.
6. **From creators you follow.** Courses attached to the actual followed creator IDs. With no follows, show clearly labeled demo creators with working profile destinations. Do not invent release dates, subscriber counts or new-course alerts.
7. **Bring your next question.** Open Community with the recent course context. This is a labeled local discussion preview, not an invented live feed. Dismissal persists, has immediate undo and can be reversed in Customize Home.

## Personalization controls and durable behavior
Customize Home is a native modal dialog. It edits subject interests and discussion-card visibility, explains what is local, and supports Save, Cancel, Escape, keyboard focus and focus return. Cancel changes nothing. A changed preference in another tab is a conflict: retain the editing choices and explain how to reopen the current saved version. Failed storage writes keep the dialog/draft and prior saved data.
Use additive `homePreferences` in preview schema v1. Old snapshots without it retain bookmarks, notes, posts, replies, following and completion. Unknown or malformed shapes stay preserved/read-only. Topic IDs and hidden course IDs are validated against the catalog. These preferences never authorize lesson reads.
`lastOpenedAt` is independent of progress `updatedAt`. Opening a lesson updates the former without changing completion. Continue prefers an unfinished last-opened accessible lesson, then the next unfinished accessible lesson. Completing all lessons gives Review course. Completing only a paid sample gives View course and a clear unavailable-remainder message, never a locked-lesson resume link or a false completed course.
Home never reads private note or discussion bodies to generate suggestions, and it never silently imports local activity into an account. Cross-device data, verified identity and real entitlements remain A1 backend work.

## Later Home additions, in dependency order
Learning paths (`CP-026`) should supply ordered next steps, save/edit behavior and completion-aware continuation before their Home shelf is enabled. No dead path cards.
Lesson-player expansion (`CP-027`) should replace the navigation-only dock with actual permitted media and readable outline/transcript/resource panels; do not fake video controls for reading content.
A real community/activity shelf (`CP-016`, `CP-028`) needs course visibility, author identity, moderation, unread semantics and trustworthy timestamps. Real upcoming sessions need an event model, timezone handling, enrollment/access, cancel/reschedule and usable empty states. Neither belongs in the current mock catalog as fake activity.
Progress summaries should use actual recorded completion, not inferred watch time, fabricated streaks, arbitrary scores or public leaderboards. Completion is not proof of learning mastery. Paid recommendations, offers or enrollment calls to action depend on the actual commerce/access integration.

## Acceptance and preservation
Exercise new and returning states through real controls: interest save/cancel/reload; save vs start; hide/undo/restore; next unfinished lesson; completed-course review; paid-sample exhaustion; time filters and empty recovery; follow-to-Home; contextual discussion; concurrent preference edits; storage failure; mobile navigation and sticky search.
Review 320, 390, 768, 1024, 1280 and 1440px. Preserve focus visibility, modal containment, horizontal shelves, scrollable final controls above the resume dock, reduced-motion behavior and normal/reduced-transparency material. Course-only CSS must not alter music CSS or source fixtures.
Use domain tests, the registered Home browser journey and the full platform suite against development and an optimized build. Record exact source/tooling identity and failed runs. A passing route, screenshot or checkbox is not proof of full music UI/UX migration, accessibility certification, real backend integration or release readiness.

## Implementation owners
`app/learn/home/page.tsx` owns the server-rendered route/header. `components/platform/learning-home.tsx` owns local live Home sections. `home-preferences.tsx` owns the modal editor. `lib/platform/home.ts` owns deterministic projections; `preview-state.ts` validates the persisted fields; `lesson-tools.tsx` records actual openings. The existing `EditorialShelf`, cards, shell and CSS module remain shared owners. `scripts/browser_platform_home.py` is registered in the platform runner.
