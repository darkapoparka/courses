# Platform / product requirements

Status: proposed planning baseline, 2026-09-08. Product name, company, launch countries, prices and commercial terms are undecided. 'Courses' is a repository working label.

## Product thesis

Build a multi-creator marketplace where people discover credible courses, understand what they will learn, buy access, and actually make progress in one coherent learning library. Creators publish and sell courses, help learners and understand results. The interface should feel as considered and content-led as Apple Music, while using learning-specific information and controls.

The owner wants broad eventual coverage: fitness, AI/coding, business, crypto education and other legitimate skills. Model categories generically. For the pilot, recruit a small curated set of creators in two or three categories rather than opening an empty, unmoderated marketplace across every subject. This is a rollout recommendation, not a permanent category restriction.

## People and jobs

| Persona | Main job | Successful outcome |
| --- | --- | --- |
| Visitor | Decide whether a course and instructor fit a real goal | Understand outcome, level, prerequisites, curriculum, evidence, price and access terms before creating an account |
| Learner | Continue learning without friction | Resume the correct lesson, understand progress, access resources, ask a contextual question and finish meaningful work |
| Creator | Publish trustworthy paid instruction | Upload, organize, preview, set an offer, submit for review, publish and receive accurate sales/access information |
| Operator | Keep the marketplace reliable and credible | Review creators/courses, handle reports and refunds, reconcile money/access, investigate incidents and communicate decisions |

One identity may perform multiple roles. Creator membership belongs to a creator workspace, not to an exclusive global 'creator account' type.

## Positioning versus Skool

Do not position the product as 'Skool but with courses' or claim Skool lacks one-time course sales, discovery, video or community. Its official pricing and help documents already describe substantial overlap [S06–S07](research.md).

Our proposed differentiation is a **learning-first cross-creator experience**: editorial discovery; one library across creators; strong course previews; lesson-level questions/notes; transparent prerequisites and updates; credible creator information; and clear progression. Communities support courses instead of replacing the learner's home with a noisy global feed. These are hypotheses to test, not proven superiority.

The defensible work is creator quality, learner outcomes, useful discovery and reliable commerce. Visual polish is necessary but is not a moat by itself.

## Core loops

Learner: discover → evaluate → preview → purchase/enroll → start → practice/ask → resume → complete/review → discover a relevant next course.

Creator: apply → verified workspace/payout onboarding → draft → upload/process → organize/caption → preview → submit → editorial approval → publish → answer questions → improve content.

Operator: review → publish or explain rejection → monitor/report → investigate → act/appeal → reconcile access/payments → improve policy.

## Product and business baseline

Recommend invite/application-based creator onboarding and **one-time course purchases for the first paid release**. One checkout contains one course from one creator. Support free enrollment and an explicit public preview. A saved course is a bookmark, not enrollment or access.

Use entitlement records with source and validity so memberships or bundles can be added without rewriting authorization. Do not launch a global all-access subscription, cross-creator bundles, split instructor royalties, creator SaaS subscriptions or affiliate payouts in the first release. Each requires separate commercial agreements and accounting/operational decisions.

A purchase grants the advertised access terms; do not advertise 'lifetime' by default. Ordinary catalog unlisting stops new sales but preserves existing buyers' access. Safety/legal takedowns have a separate suspension/refund/support process. Course changes must not silently erase progress or remove purchased value.

The platform take rate, refund policy, seller-of-record arrangement, payout responsibility, supported countries/currencies and tax obligations require owner/provider/legal review. No rate in a fixture is a committed business term. Do not activate live payments until the gates in `decisions.md` are resolved.

## First public release

The launch slice includes public discovery/search, creator profiles, course details/previews, authentication, one-time checkout, a unified learner library, accessible lesson playback, progress, private notes, lesson questions, basic creator community posts, a creator studio, and minimal real operator tooling. The studio and operator experience are part of the product, not an afterthought.

Use original or licensed course covers, previews, teacher photos and sample lessons. Never ship Apple music content, Mobbin screenshots, fabricated testimonials, inflated enrollment numbers, guaranteed income claims or invented instructor credentials as platform content.

## Explicit non-goals for the first release

No Apple Music clone as a deliverable; no music playback, shuffle, radio, concerts or duplicated Apple account/billing UI. No native mobile apps, offline paid-video downloads, custom video transcoder, open direct messaging, live streaming infrastructure, points economy, social leaderboards, crypto custody/trading execution or autonomous AI coaching. No generic AI chatbot unless a later approved use case demonstrates value and a safe content/access model.

## Learning content model

A course has an outcome, audience, prerequisites, language, category, level, estimated effort, creator, curriculum and offer. A module contains ordered lessons. Launch lesson types: video, text and downloadable resource. Text/resources must receive the same access protection as video. Draft a lightweight completion action/checklist where appropriate; graded quizzes and assignment review are later features unless promoted deliberately.

Different subjects must work without bespoke software per category. Fitness may use a training demonstration and PDF; AI coding may use code/resources and a project; business may use templates. Do not build a workout tracker, IDE or financial terminal into this product by default.

## Pilot success hypotheses

Before scaling, test with real consenting learners and creators. Suggested pilot: 5–10 creators, 15–30 approved courses, and a small invited learner cohort. These are planning targets, not existing inventory.

Measure time to first useful lesson, seven-day learner return, meaningful lesson completion, purchase-to-first-play conversion, refund/support reasons, creator time to publish, question response time and contribution after variable costs. Define completion as learning progress—not proof of competence or professional certification. Separate preview activity, bot traffic and paid learner activity.

Suggested usability gate: most pilot participants should independently find a suitable course, explain the offer and resume a lesson; any failure that hides price, grants wrong access, loses work or blocks playback is a launch blocker. Avoid declaring product-market fit from vanity pageviews or a polished mockup.

## Approval boundary

The owner has confirmed the platform direction and Apple Music reference preference. The implementation stack, navigation details, pilot size, monetization sequence and exact screens remain proposed. Record approval in `decisions.md`; do not convert this document into an automatic instruction to build.
