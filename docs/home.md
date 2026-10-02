# Home - course marketplace

## Direction and route
Home is the public browsing surface at `/learn/home`, never the personal learning dashboard. `/learn` remains Discover; `/learn/library/overview` retains personal progress/preferences. The original music application stays at `/` and `/screen/*`. Preserve every existing local saved item, note, progress entry and discussion.

The owner rejected both the earlier dashboard and the flat repeated-stock-photo storefront. A neutral background alone was not enough. The latest composition returns to the saved Apple Music **Home** (`a917d88f-d15a-4f53-92d3-1daecf59d05f`): four portrait cards, a denser square-cover shelf, compact labels, restrained controls, and the floating sidebar. The saved **New** screen has a different two-landscape-card composition; do not conflate the two. This adapts proportions and interaction patterns, not Apple assets or recommendation data.

## Page composition
1. Home title and always-visible shared search. Subject navigation remains URL-addressable.
2. Featured courses: four visible 3:4 portrait jackets on desktop, with native horizontal scrolling, aligned next/previous controls, keyboard access, real offer prices, course links, quick preview and save. Mobile presents one readable poster and a visible continuation edge.
3. Full five-course sample catalog: square covers, real creator links, price, duration, preview, bookmark, price filters and deterministic sort. No invented inventory, ratings, enrollment counts, discounts or bestseller labels.
4. Existing photography spotlight, creator shelf and further browsing destinations remain connected. Personal continuation does not cover the storefront.

## Artwork and surface separation
`CourseArtwork` owns original course jackets. Each course has its own typography, composition and color identity, with selected licensed contextual photography. Jacket titles are actual course titles, not interchangeable motivational slogans. A jacket may contain original typesetting and illustration, just as album artwork does. This is different from placing marketing paragraphs over a page-wide hero panel.
The UI canvas remains opaque white; no cream panels, decorative full-width rules, black subject pills or competing component kit. Color belongs inside covers. Catalog/detail/preview use the same jacket identity. Tiny lesson thumbnails retain visible motifs or photographs without squeezing unreadable cover text into 40px. Discover retains its existing landscape variant; personal learning retains its existing poster variant.
The photo source/license/hash records in `public/course-art/credits.json` and `/learn/credits` remain. No Apple art, proprietary font, instructor portrait, endorsement or purported course footage is imported.

## Working interactions
Subject and price filters preserve shareable query state, sorting, reload and browser history. The marketplace never hides a course because it was saved or started. The initial catalog remains five original demos.
Featured preview and catalog preview open the same native modal and show the same course identity, outcome, public curriculum, price and server-selected sample introduction. Only accessible lesson rows navigate; locked bodies remain server-only. View course, Read free sample and Save are real actions. Close/Escape return focus to the exact initiating card. Native modal focus has explicit forward/reverse boundary wrapping; save failure is visible inside it and preserves prior data.
Desktop quick actions appear on pointer hover or keyboard focus; touch layouts retain visible controls. No decorative play button pretends that reading courses contain video. Aligned shelf paging uses actual card widths, not arbitrary fractional scroll distances.

## Ownership and verification
`marketplace-home.tsx` owns server-selected offers/sample introductions. `marketplace-browser.tsx` owns shared preview/bookmark state. `marketplace-features.tsx` owns the featured composition. `course-artwork.tsx` owns jacket identity and shape. `course-quick-preview.tsx` owns the offer preview. `EditorialShelf` remains the existing shared scrolling owner. No second app or framework upgrade is involved.
CP-039 through CP-041 in `tasks.md` own this batch. Earlier checked tasks are implementation history, not owner design approval. Verify jacket identity across entry/detail/preview, 3:4 versus square geometry, keyboard/touch controls, focus return/trap, saved-state consistency, quota failure, sample access, six widths, existing learning/community journeys and original-source preservation.
Automated and visual checks establish only their reported scope; the user has not aesthetically approved this revision. Keep exact screenshots, source identity and failures in the handoff.

## Remaining product work
Substantive demo catalog expansion, richer course/curriculum actions, learning paths, real lesson media, accounts/authoring/enrollment and commerce retain their existing task owners. Do not manufacture content or add disconnected controls to make the page appear complete.
