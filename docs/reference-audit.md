# Repository and visual-reference audit

Updated 2026-09-09. Archive baseline: `849594d4a0cb9a6befc6474019d3bf6e9601740e`. Earlier planning head: `ef0140d7a050210ee1ab889c4dd88bea3ed535e7`. This revision preserves the updated archive unchanged and replaces the broader draft plan with staged build specifications.

## New reference material

| Material | Coverage | Interpretation |
| --- | ---: | --- |
| Unique screen identities | 159 | The high-resolution upload is not another 159 unique screens |
| Original variants | 159 at 1440px width | Preserved alongside the new variants |
| High-resolution variants | 159 at 3024px width | Manifest: 147 at 3024×2016; 12 at 3024×2018 |
| UI-element categories | 29 categories / 53 memberships | Full-screen references, not editable components or isolated crops |
| Flow sequences | 58 / 218 ordered steps | These steps reference the same 159 distinct screen identities |
| Motion assets | 5 screen animations + 8 flow recordings | Full motion playback was not reviewed in this session |

The updated originals README, COMPLETENESS, high-resolution manifest, UI-elements manifest and flow-screen map were read. A read-only metadata calculation independently counted 159 high-resolution entries, 58 flow records, 218 steps and 159 distinct step IDs. The 29/53 category figures and image-size/hash coverage are recorded by the acquisition manifest; this session did not independently rehash all media.

The srcset advertises 3840w, while decoded widths recorded by the acquisition check are 3024px. Use actual file dimensions, not the advertised label. Source footers/watermarks remain intact and are not application UI.

## What was actually viewed

**17 distinct source screens were visually inspected: 16 high-resolution originals and one standard-resolution original.** The images were rendered through the connected image reader at a readable display scale. Coverage includes logged-out and signed-in discovery, Home, album detail, artist detail, category search and query results, empty and populated library, table/pin state, expanded lyrics, video playback, queue, context menu and email sign-in. Exact paths, states and adaptations are in [the ledger](reference-review/ledger.md).

This supersedes the earlier blocked/one-image-only audit. It is still a representative pattern review, not a claim to have viewed all 159 originals or tested every control. The 58 flow names and ordered IDs were inspected as metadata; selected corresponding still states were viewed. None of the 13 recordings was watched in full. No native-mobile Apple references, full app runtime, browser interaction or course-design approval are established by these image reads.

The standard-resolution billing image `06ea37ef-2485-4219-b244-9d56516c2c42.webp` was also independently fetched into memory, fully decoded with Pillow and hash-checked: 26,056 bytes, 1440×1023, Git blob `5ca1ab76686b8f24639182538a05932810bec3f6`, SHA-256 `0fa40975d506bacdc335c0d8d95fa1bfa017394b83c05b5df2d7da5114a03b0b`. Other visual reads are not being presented as independent bulk hash verification.

## Findings that change the course UI

**The references are states, not 159 separate page templates.** The guest New screen has a reduced sidebar and trial banner; the signed-in New screen has library destinations. Our visitor and learner shells should differ by actual access, not by rendering fake private content. We do not need Apple's global-subscription banner in a one-time-course marketplace.

**The detail page is a strong course starting point.** A square cover, adjacent title/creator/description and compact actions lead directly into a legible ordered list. Preserve that hierarchy. Replace music metadata with outcome, level, language, effort and explicit access/price; track rows become modules/lessons with preview/lock/completion. A black primary Play button in the reference is also a reminder not to turn every control into a bright accent button.

**Library empty and populated states are genuinely different.** The empty reference offers one clear browse action. The populated reference uses cover grids with captions, not a generic statistics dashboard. Our library adds resume/progress while separating enrolled courses from bookmarks.

**Playback and study require deliberate adaptation.** The expanded lyrics screen has media left and large blurred text right; use the split idea, but not karaoke blur or giant transcript type. The video screen provides an unobstructed playback surface and seek controls. The queue demonstrates a secondary right panel; our curriculum must not expose meaningless Clear queue or Shuffle actions. The reference's floating player sometimes overlaps content: preserve its restraint, not accidental obstruction.

**Creator identity is more than an avatar card.** The artist reference has a large identity header followed by latest release and content shelves. Adapt to real expertise and courses, but reduce the header on mobile so learners can evaluate actual instruction promptly. Do not infer video motion from a still or invent creator credentials.

**Search has meaningful states.** Browse categories, recent items and typed-query results are separate layouts. Search remains visible above the results. Our result types are Courses and Creators; library-only search and recents persistence are not automatic launch features merely because Apple has them.

## Concrete problems with the old prototype

The source uses `fallbackVariants[index % fallbackVariants.length]`, combines many views in an approximately 46 KB client component, and invents tone/gradient artwork in `Art`. Those are prototype shortcuts, not production architecture or visual evidence.

Direct inspection confirms incorrect explicit mappings too: `06be9f09…` is a Songs table with a pinned item, not an artist page; `a917d88f…` is Home, not concerts; `484851bf…` is artist detail, not simply a loading screen. Do not use `lib/reference.ts` as the source-to-course mapping authority. Its three hardcoded flows are also distinct from the complete 58-flow acquisition archive.

The new product should not bulk-import the old scene switcher, fixtures, assets, dependency lockfile or generated music routes. The archive remains preserved for evidence and visual reference; the active application starts in `web/` only when assigned.

## How an implementation task uses this audit

Read the relevant ledger rows and open the linked originals locally, then implement the course-specific family from [screens and flows](screens-and-flows.md). Record the actual viewport, chosen token values, course screenshot, applicable error/access states and intentional differences. Related high-resolution source files are already present; no repeated acquisition is needed.

Full catalog review is not a prerequisite for the scaffold or first Home slice. Source-selection evidence exists for the main families now; local review verifies the exact state/measurement needed for the current UI change. Creator authoring, publication, commercial access and moderation still require course-specific design rather than an invented claim that Apple supplied them.

## Preservation and limits

Keep original bytes/watermarks, manifests and historical QA untouched. Do not expand source redistribution, change repo visibility, or copy source art/proprietary fonts into production. Use independent branding and licensed/consented content. Possession of a reference is not a production-use license.

No product application, migration, provider account, payment or deployment was created by this work. Architecture and course layouts are recommendations; actual implementation, accessibility, performance and usability remain tasks with their own evidence.
