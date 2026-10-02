# Home — course marketplace

## Product direction
Home is the marketplace at `/learn/home`: discover, compare, preview and save courses. Personal progress stays under My learning. Keep the existing Apple Music-derived white canvas, floating sidebar, four portrait features and square course covers. The owner's request for deeper browsing is not permission for another unrelated visual redesign.
The shared search is prominent at the top, including mobile. Its existing suggestions, shortcut, recents, scope and unsaved-note guard remain. Subject navigation and a visible Filters control sit directly below it. Search and filtering are controls, not decorative placeholders.

## Ordered discovery sections
1. Featured courses: the existing four-visible portrait family and original five highlighted course identities, with working paging, preview and save controls.
2. Bestsellers: a clearly labeled **Demo selection**, with the visible explanation that it is not ranked by real sales. This is a merchandising fixture, not a popularity claim. Before real release, populate it from verified eligible sales or rename it; never invent purchases, ratings or reviews.
3. Top courses: explicitly editor-picked courses for practical projects, not highest-rated or algorithmically personalized claims.
4. Start something for free: the four actual free demo courses, each with all three lessons readable.
5. Build your next idea: the three development courses.
6. Explore all courses: the full fifteen-course catalog with prices, level, duration, filtering, sort, preview and save.
7. The existing photography feature, creator shelf and additional browsing destinations remain connected below the catalog.
Each collection has distinct deterministic membership and a working See all destination. Collection routes use `?collection=...`, compose with other filters and survive reload/Back. Do not fill shelves with nonexistent offers.

## Catalog and course identity
The catalog contains fifteen original demo offers across five subjects, three courses per subject. Ten additions each have meaningful metadata, ordered curriculum and an original sample reading; new free courses include all their readings. Paid remainder content is unavailable, not silently delivered to the client.
Original course-cover typography and category motifs are shared by cards, previews, details and learning thumbnails. Existing licensed contextual photographs and their attribution remain; no new instructor identities, endorsements or Apple artwork are implied. Color belongs inside covers, not the page background.

## Filter and preview contracts
Filters use a native modal with price, experience level and estimated course-length fields. Show the matching count before applying. Cancel/Escape leave the URL unchanged and return focus; Apply produces a validated URL. Clear controls and removable active-filter links provide recovery. A collection/subject remains in scope when refining its results.
Search results, collection pages and bookmarks must never grant paid access. Preview state is shared across featured, collection and catalog cards: saving in one updates the others. Sample links open real content; locked rows do not link to protected bodies. Close returns focus to the exact initiating control. Storage failure is visible and preserves previous data.
The initial page is browse-first for both fresh and returning users. Started or saved courses remain discoverable. No progress panels, empty activity shelves or large resume dock cover Home.

## Implementation and acceptance
`merchandising.ts` owns the explicit collection fixtures and their provenance. `marketplace.ts` owns validated query options and combined selection. The existing MarketplaceBrowser owns shared preview/save state; MarketplaceCourseCard, MarketplaceCollections and MarketplaceFilters are its focused collaborators. Server components select permissible sample introductions. The same application and branch remain in use.
Verify section membership, every See all path, Back/reload, combined facets, filter cancellation/counts/empty recovery, cross-shelf bookmarks, new sample and free-course reads, locked bodies, keyboard focus, 320/390px containment and full desktop layouts at 1440/1920px. Keep previous learning, community, search and original music regression checks.
`tasks.md` is the sole status ledger (CP-043–046). Passing tests establish functionality and the recorded visual checks, not user aesthetic approval, production analytics, backend integration or release readiness.
