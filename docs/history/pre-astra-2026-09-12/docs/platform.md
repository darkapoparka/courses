# Platform — product requirements

Working name: Courses. Brand, operating entity, supported markets, prices, and commercial terms are not finalized. This revision specifies a small first product that can grow without building every eventual feature now.

## Product

A marketplace where independent creators sell useful courses and learners discover, evaluate, buy, and continue them in one coherent library. The visual direction is Apple Music's content-first browsing and restrained application chrome, adapted to learning rather than copied as music functionality.

Support legitimate categories generically: fitness, AI/coding, business, finance/crypto education, and other skills. Do not build a separate workout tracker, IDE, trading system, or coaching platform for each category. A course's video, text, and files should be enough for the first release.

## Four jobs

| Person | Primary job | Product must make clear |
| --- | --- | --- |
| Visitor | Find and evaluate instruction | Outcome, teacher, prerequisites, curriculum, sample, language, level, effort, price, access terms |
| Learner | Start and continue learning | Correct next lesson, resume position, progress, resources, private notes, contextual questions |
| Creator | Publish and sell reliable instruction | Draft checklist, upload/processing, preview, review status, price, selling readiness, sales and questions |
| Operator | Protect buyers and keep operations working | Publication review, reports, purchases/access, provider exceptions, reasons and audit |

One person can learn and create. For the pilot, each creator workspace has one owner. Team invitations, granular creator roles, and multiple staff dashboards are deferred; multi-creator marketplace isolation is required now.

## Differentiation hypothesis

Build a learning-first cross-creator experience: high-quality discovery, consistent previews, one library, good lesson navigation, and credible course information. Community should help people learn rather than replace their home with a noisy feed. Test that hypothesis with actual learners; visual polish alone is not proof of product-market fit or superiority.

Do not claim competitors lack all course, payment, video, or community functions. Our advantage must be how well discovery and learning work together, the quality of creators, and dependable service. An exhaustive competitor study has not been completed in this revision.

## First release model

Recommend free enrollment and one-time course purchases. One checkout contains one course from one seller. Save is a bookmark, not enrollment. A verified access grant permits learning; a checkout redirect, progress row, or local flag does not.

Start with a curated creator pilot in two or three categories. The architecture supports more categories, but opening every seller and subject immediately is not a launch requirement. Suggested initial supply is a handful of committed creators and enough real courses to test discovery—not fabricated inventory or enrollment counts.

The public course page should feel like a purposeful course detail page, not a long generic sales funnel: outcome and teacher first, concise offer, strong curriculum, useful preview, then supporting detail. Different access states change the main action: Preview / Enroll free / Buy course / Start learning / Continue / Review lessons.

## Ownership and updates

Advertise explicit access terms, not an undefined promise of lifetime access. Ordinary unlisting stops discovery and new sales while preserving valid buyer access. Safety suspension is a separate operator action with an explanation and support/refund process.

The pilot avoids a full versioned publishing system: creators edit drafts; submission locks the reviewed content; published content is locked against creator edits. Operators may approve bounded corrections using a version check and audit. Substantial replacement and self-service draft/live versioning are deferred until their update policy is designed. Unlisting must never unlock unsafe in-place editing of purchased material.

## Milestones

**M0 — UI review:** a small, functional fixture-backed discovery → course → lesson flow. No real identity, paid access, or backend claims. Its job is to validate the interface quickly.

**M1 — free-course alpha:** real creator drafts, upload, operator review, public catalog, sign-in, enrollment, protected lessons, library, and progress. One complete journey before commerce.

**M2 — controlled paid pilot:** sandbox-verified Connect/Checkout, access fulfillment, refund handling, support operations, private notes, and lesson questions. Production activation happens only after the launch gates; platform-wide community is not a dependency.

**M3 — expansion:** selected features justified by pilot feedback, not an automatic bulk implementation list.

## Explicit non-goals now

No music reproduction, shuffle/radio/concerts, Apple billing clone, global subscription, multi-seller cart, affiliates, memberships, native app, offline paid video, live streaming infrastructure, open direct messages, gamified leaderboard, AI tutor, custom transcoding, or custom workflow engine. No crypto custody, trade execution, guaranteed-income offers, or medical outcome guarantees.

## Success and unresolved business work

Observe whether people can find a suitable course, explain what they are buying, start successfully, and resume without assistance. Measure purchase-to-first-lesson, return learning, completion signals, support/refund reasons, creator time to publish, and variable cost per active learner. Completion is activity, not certification of competence.

Before live selling, resolve merchant/seller identity, entity and countries, tax/invoicing, fee and refund responsibilities, access duration, category/provider eligibility, asset rights, support ownership, and privacy. These block live commerce—not a local UI scaffold. See [decisions](decisions.md).
