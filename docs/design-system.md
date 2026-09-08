# Design system and adaptation contract

Status: proposed direction, not approved visual designs. Original references were not rendered during the documentation audit; no values below are claimed as measurements of Apple Music. Read `reference-audit.md` before referencing a source image.

## What we preserve

Preserve the owner's preference for an editorial, content-first music-library experience: strong artwork, clear typography, useful content shelves, compact navigation, purposeful lists and quiet surfaces. Do not replace it with a generic SaaS landing page, a dashboard of white cards, oversized gradients, glowing buttons or arbitrary glass effects.

Apple Music supplies reference patterns, not every required course screen. Our goal is an independent learning product with coherent interaction quality, not a pixel-identical Apple product with changed nouns. Inspect and document the actual reference before deciding which spacing, hierarchy or behavior to carry over.

## Semantic adaptation

| Reference concept | Course equivalent | Important difference |
| --- | --- | --- |
| Album | Course | Needs outcome, prerequisites, level, curriculum, price and access terms |
| Track | Lesson | Ordered learning context, completion and access state; not interchangeable entertainment |
| Artist | Creator | Identity, teaching expertise, course quality and learner support |
| Library | Owned/enrolled courses, saved courses, joined spaces | Saved does not imply paid access; progress is separate from ownership |
| Playlist | Curated collection / future learning path | A collection is not automatically a bundle or purchase |
| Lyrics | Transcript / reading material | Paid transcripts need access control; notes are private learner content |
| Player | Focused lesson workspace | Video, resources, curriculum, speed, captions and progress; no shuffle |
| Follow artist | Follow creator | Explicit notification preferences; not paid enrollment |
| Trial/paywall | Course offer and checkout entry | Our actual commercial terms and hosted payment flow, not copied Apple subscription steps |

## Navigation proposal

Desktop learner shell: a compact left rail with Home, Browse, Search and Library. Library exposes Courses, Saved and Spaces within its own view. Account/settings and a clearly labeled Creator Studio switch are secondary. A creator is still a learner; switching workspaces must not make their purchases disappear.

Mobile learner shell: four labeled destinations—**Home, Search, Library, You**. Search includes category discovery, so a separate Browse tab is unnecessary. Spaces live in Library and are also reachable from creator/course context. This is a proposal for usability testing, not a user-approved final navbar.

Use real navigation links with URL/back/forward behavior. The current active destination is visible without relying only on color. Hide tabs during full-screen media and disruptive account/payment tasks when appropriate; restore the prior context on return. The keyboard, safe-area insets and browser chrome must not cover controls or the last item in a list.

Creator Studio and operator tools use their own task-focused shells. Do not squeeze course authoring, payout settings, moderation and learning into one primary navbar. Mobile Studio supports essential operations and access to all critical fields; clearly disclose any intentionally desktop-oriented advanced workflow instead of silently clipping it.

## Contextual primary action

| Course/user state | Primary action | Supporting action |
| --- | --- | --- |
| Public visitor, paid course not owned | Buy course, with visible price/currency | Preview a sample lesson |
| Signed-in nonbuyer | Buy course | Save / Preview |
| Free course, not enrolled | Enroll free | Preview |
| Active access, not started | Start learning | View curriculum |
| Active access, in progress | Continue: lesson title | View curriculum |
| Completed | Review lessons | Leave/update an eligible review |
| Payment not yet fulfilled | Confirming purchase | Refresh status / Get help, not a second charge |
| Access expired or purchase refunded | Explain access status | View valid offer / Support, as appropriate |
| Course suspended | Explain unavailability without exposing sensitive report details | Support/refund information |

Do not show a generic 'Play course' as the only action on an unowned paid course. Use Play/Pause inside a real lesson or preview. Never autoplay previews with sound. A saved bookmark must not masquerade as enrollment.

## Screen hierarchy

Home opens with an immediately useful action: returning learners see Continue learning before promotional content; visitors see a restrained editorial introduction and relevant course discovery. Keep a few intentional shelves rather than endless duplicated carousels. Shelf headings and See all links explain the selection. Search should be discoverable without consuming the entire mobile hero.

Course detail places the title, creator, concise outcome, offer/access state and primary action together. Put prerequisites, curriculum, effort, language, update date and support expectations where a buyer can inspect them before checkout. Use progressive disclosure for long descriptions, not for hiding commercial terms. Long course titles and multilingual text must fit without shrinking into unreadable captions.

Creator profile emphasizes a real portrait/identity, verifiable expertise, short teaching proposition, courses and relevant community. Do not invent achievements, badges, follower counts or testimonials. Payment-provider verification is not a teaching-quality endorsement.

The lesson workspace emphasizes the lesson itself. Desktop can place video/reading beside a curriculum column, with Resources, Transcript, Notes and Questions below or adjacent. Mobile uses one clear content column and accessible secondary tabs/sections. Never require dragging a tiny pane to access a resource or next lesson.

## Resume bar versus persistent media

For the first release, use a compact **Continue lesson** bar/card only when there is meaningful progress to resume. It is navigation, not an always-running mini-video. Navigating away from the lesson pauses playback and records the latest supported progress update. Returning resumes the correct lesson and position after access is checked.

Do not keep an empty music player on every page. Do not stack a floating purchase CTA, resume bar, cookie banner, video controls and bottom tabs over each other. Within the lesson page, remove redundant global resume controls. Persistent cross-page playback/picture-in-picture is a later feature requiring explicit design, accessibility and device testing.

## Provisional token contract

Token roles must be established before feature-specific CSS: background, surface, elevated surface, text, muted text, border, accent, accent-contrast, success, warning, danger, focus and overlay. Keep one accent family and restrained semantic colors. Initial release is light mode unless dark mode receives its own approved frames and tests.

Use a consistent spacing scale, for example 4/8/12/16/24/32/48px, as a starting proposal; validate it against the inspected references and real content. Use a system font stack or one appropriately licensed family. No redistribution of proprietary Apple font files. Define a small type hierarchy with comfortable reading text; do not reproduce tiny desktop labels on mobile.

Prefer native document scrolling and normal layout constraints over fixed device-sized canvases. Breakpoints follow content fit, not device branding. Test at 375/390px phone widths, a tablet width and 1280/1512px desktop widths, plus zoom/reflow. These are test proposals, not source measurements.

Our preferred primary mobile touch target is at least 44×44 CSS pixels where practical. WCAG 2.2 AA target-size criteria have different minimums/exceptions; do not misstate our design preference as the entire standard [S22](research.md). Visible keyboard focus, semantic controls, readable contrast, captions and reduced-motion behavior are required regardless of visual resemblance to a reference.

## Component contracts

| Component | Required behavior |
| --- | --- |
| CourseCard | One clear detail link; cover/title/creator and concise relevant metadata; access/progress state; independent save button with accessible name; no nested interactive elements |
| CourseShelf | Meaningful heading, See all route, stable layout, keyboard/touch scrolling; no required hover-only navigation |
| CourseOffer | Price/currency, access terms and contextual CTA; pending/error/disabled explanations; no fabricated scarcity |
| CurriculumRow | Module/lesson order, title, duration/type, preview/locked/complete/current state; keyboard navigation |
| CreatorIdentity | Actual name, portrait or intentional initials fallback, evidence-based badges; profile link |
| LessonPlayer | Accessible transport controls, captions, speed, quality/provider errors, retry and token-expiry handling |
| ProgressIndicator | Text alternative, meaningful denominator, not confused with playback loading |
| FormField | Persistent label, help/error association, keyboard input, pending/save feedback, no color-only validation |
| Menu/Dialog/Sheet | Focus management, Escape where appropriate, return focus, safe dismissal, no accidental loss of work |
| Empty/ErrorState | Specific cause and next action, not a generic illustration hiding a broken fetch |
| UploadItem | File identity, progress, processing, ready/failure/retry; readiness comes from server/provider state |
| ModerationNotice | Clear status/reason category, appeal/support path, no exposure of reporter identity |

Use accessible primitives for behavior, but own the visual tokens and composition. Importing a component kit must not redefine the approved product style.

## Content and assets

Reference screenshots remain reference material, never production backgrounds or course covers. Each production asset needs source/owner, usage rights, subject, dimensions, focal point and alt-text/decorative classification. Teacher photographs and credentials must correspond to real consenting people.

Use original course artwork with consistent art direction but enough category distinction to scan. A square catalog cover can echo the music reference; a lesson/video poster is normally a separate landscape asset. Do not crop instructional diagrams or code demonstrations into a square to satisfy a card ratio. Support explicit cover/poster fields and art-directed crops.

Avoid repeating the same stock photograph across unrelated courses, treating generic gradients as finished cover art, or using fake UI/code in educational screenshots. Test fixtures should include fitness, coding and business content with realistic short/long titles, different price states, captions and missing optional artwork. Clearly label fictional demo creators and reviews; never present them as real social proof.

## Design approval and evidence

First produce five course-specific golden screen families: Home, Course detail, Lesson workspace, Creator profile and Studio curriculum editor, each desktop and mobile. Record source references, adaptations, viewport, content assumptions, interaction states and unresolved questions. The owner approves the adapted course designs, not merely the original Apple Music screenshots.

Then specify the rest of the launch screen/state matrix before implementing each corresponding feature. A design tool export or generated mockup is not approval. A static beautiful screen does not prove responsive layout, accessibility, error handling or functional correctness. Keep the visual decision log with the reviewed frames, and record approved changes in `decisions.md`.
