# Home — course marketplace storefront

## Active owner direction
The latest owner correction on 2026-10-02 is explicit: Home is a marketplace for browsing courses, not a personal learning dashboard. This supersedes the earlier personalized-Home blueprint. Do not reintroduce Continue learning, interest setup, empty saved shelves, time-budget controls or a large resume dock as the Home experience.

The working storefront lives at `/learn/home`; the Courses brand link opens it. `/learn` keeps the existing Discover URLs and `/` plus `/screen/*` keep the music reference. The previous personal screen is preserved at `/learn/library/overview`, linked from My learning. Its stored preferences, completion, notes and other local data are not reset.

## First-screen composition
1. Shared visible search and the existing floating sidebar.
2. A compact browsing headline and immediately visible subject navigation.
3. Two photographic editorial course features with real course destinations.
4. A visible course selection: artwork, subject, title, creator, level, lesson count, duration, price, bookmark and Preview. Do not substitute a progress panel or an onboarding form.
5. Real category/price filters and deterministic sorting. The initial selection includes all five current demo courses; do not hide owned/saved/started items from a marketplace or pretend this small catalog has thousands of offers.

At the current 1440px desktop layout, the editorial features are 245px high and the course grid has five columns; smaller widths use three or two columns. The first course row includes prices without a floating activity panel covering them. Features and subject links scroll on narrow screens; course cards remain a browsable two-column grid. Use existing tokens, restrained red actions and quiet separators rather than a generic dashboard kit.

## Browsing and offer behavior
Subject links retain the price/sort settings. Price choices are All prices, Free and Under EUR 50. Under EUR 50 means strictly below 5000 minor units. Sort options are editorial order, price ascending and shortest first. Query values are validated, URL-addressable and preserved on reload/back navigation. An empty combination offers Browse all courses, not fake catalog entries.
Each offer has a real course detail and creator destination. Bookmarking preserves the existing Saved store and never enrolls, purchases or starts a lesson. A native preview dialog shows public metadata, outcomes, the server-selected introduction of the open sample, and curriculum availability. It supports Escape, a named Close control, focus return, View course and Read free sample. Locked lesson bodies are never serialized for the preview.
The featured photography section and creator directory are merchandising, not fabricated recommendations, bestseller ranks, instructor credentials or activity counts. Avoid false Buy/Checkout buttons while commerce is disconnected. The demo notice states that prices are illustrative and checkout is not connected.

## Artwork
The repeating typographic sample covers have been replaced by locally stored, licensed contextual photography. These are not screenshots of actual paid lessons or portraits/endorsements of the fictional demo instructors. `public/course-art/credits.json` records photographer, source, license, dimensions and SHA-256; `/learn/credits` supplies visible attribution. Images are served locally, with fixed dimensions and bounded WebP bytes; the browser makes no stock-photo service requests.

## Separation from personal learning
My learning keeps completion, continuation, notes and the preserved Learning overview. The storefront has no data-dependent welcome/continue section, Customize Home gate or progress percentage. A returning learner sees the same browseable offers as a fresh browser, with only genuine bookmark state reflected in the card controls. Do not conflate marketplace browsing with a paid entitlement.

## Owners and verification
`app/learn/home/page.tsx` validates route parameters. `marketplace-home.tsx` owns server-side merchandising and explicitly allowed sample introductions. `marketplace-browser.tsx` owns quick previews, bookmarks and sorting interactions. `lib/platform/marketplace.ts` owns pure option parsing, filtering, sorting and artwork lookup. Styling remains in the shared scoped module.
`CP-034` and `CP-035` in the sole `tasks.md` ledger own this correction. Older CP-031–033 retain their historical implementation meaning at the relocated learning destination, not approval of the rejected Home design.
Verify actual course/creator/preview navigation, filtering, browser history, unchanged saved/progress data, unavailable paid lessons, Escape/focus return, all six widths and loaded local art. Preserve the old learning behavior through its relocated real navigation tests instead of deleting its assertions. Shared platform components require the full platform suite and an optimized build; music originals and unrelated dirty work remain unchanged.

## Next work
Expand the real demo catalog only with coherent course details and readable sample content; do not fill shelves with dead offers. Rich course/curriculum actions remain CP-025, learning paths CP-026, meaningful lesson media and panels CP-027. Real accounts, creator authoring, enrollment, checkout and public community retain their backend gates. None is inferred from a polished storefront.
