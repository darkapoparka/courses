# Features and stage gates

Feature requirements live here; completion status lives only in [tasks.md](tasks.md). A future feature is not an instruction to create it now.

## Stage C — current Apple Music clone

Implement the exact saved screen states and continuous recorded journeys in the existing app. Preserve music semantics, working controls, local-preview safety and immutable originals. Acceptance requires 159 genuine MATCH entries, 58 complete FLOW entries and explicit owner approval before a product transition. Implemented routes, regression counts and a polished subset do not satisfy this gate.

## Stage A0 — authorized course adaptation, after Stage C

Adapt an accepted shell/detail/learning slice with original or licensed fixtures. Discovery, a course detail and a sample lesson must form a coherent navigable journey. Show curriculum, outcome, teacher and distinct preview/owned/locked states without pretending to charge, publish or persist to a backend. Test keyboard, responsive layout, loading/empty/error behavior and source-to-adaptation decisions.

This stage uses the existing application and needs no payment/backend credentials. Create independent course-design baselines, not new claims of pixel identity to Apple. A route redesign or path rename needs a migration decision.

## Stage A1 — real free-course alpha

| Capability | Required outcome |
| --- | --- |
| Identity and ownership | Verified server identity, safe return intent and one creator-owner per workspace; cross-user/workspace requests denied |
| Draft authoring | Stable course/lesson IDs, bounded content, upload/processing/caption states, preserved input and visible save conflicts |
| Publication | Version-checked submission, locked review/published content, attributable operator decision and safe public projections |
| Enrollment | Idempotent free-course grant; bookmarks never grant access |
| Learning | Authorized video, text, transcript and resources, usable controls, failures and expiry recovery |
| Library and progress | Owned access separate from saved items; correct resume, separate completion, stale-write protection |
| Minimal operations | Real review queue and narrow access diagnosis with audit, not a generic admin framework |

The gate is a real test creator publishing a course and another test learner finding, enrolling, learning, leaving and resuming. Disconnected fixture screens or service-key-only tests are insufficient.

## Stage A2 — controlled paid pilot

Require a chosen marketplace payment model and supported test environment, server-priced hosted checkout, authoritative fulfillment, idempotency, concurrent/replayed/out-of-order event handling, recovery and policy-consistent refunds. Buyer and creator views show only their own records. A closing browser or forged success URL cannot determine access.

Private notes remain author-only; lesson questions have course-context permission, creator response and real report/hide behavior. Live release additionally needs actual assets/content, working support, policies, limits, monitoring, restore evidence and explicit owner approval. Provider sandbox success is not live-market eligibility or a legal compliance certificate.

## Stage A3 — separately assigned expansion

Community spaces, reviews/follows, team roles, bundles/subscriptions, versioning, assessments, AI study tools, dedicated search, live events, native apps, offline media and affiliates are optional. Promote only a concrete need with access, data, support and validation requirements; do not precreate their infrastructure.

## Complete means observed

A delivered slice includes appropriate real behavior/persistence, permissions, failure/recovery states, accessible interaction, tests and evidence. Label fixtures as UI-only and sandbox results as sandbox results. Keep design acceptance, backend verification, financial eligibility and release authorization separate.
