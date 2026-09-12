# Architecture — preserve the working clone, evolve after acceptance

## Current system

There is one active Next.js application under `apple-music-clone/`. Its component switch, scene fixtures, catalogs, shared state and fidelity styles already implement the saved music surfaces. The root contract requires continuing this implementation. Do not scaffold `web/`, replace its router wholesale, or reclassify it as disposable merely because a later architecture would organize routes differently.

The current reference archive is read-only evidence. Fixtures make exact source states addressable; live controls must preserve coherent application state independently of fixture-routing hints. The browser runner and comparator are verification tooling, not part of a future commercial application.

## Current boundaries

The `Content` switch in `components/apple-music-app.tsx` selects the active surface. `music-context.tsx`, `lib/music-scenes.ts` and catalogs coordinate state. Family components own local UI behavior; shared sidebar/player/material changes affect many states. The [runbook](development.md) maps active modules and warns about similarly named inactive exports.

Before a change identify: the rendered owner, state source, affected views, fixture initialization, real-control transition, imported CSS and regression evidence. Keep initial fixture setup separate from ordinary user actions. A Volume or lyrics toggle must not secretly replace account, library, queue or catalog identity just to match a later screenshot.

Prefer bounded shared corrections over copied per-screen forks. Do not introduce a global store, abstraction framework or provider SDK without a current requirement. A larger refactor must preserve the same scene/flow contracts and have before/after evidence; cosmetic cleanup is not a reason to rebuild a working family.

## Evolution gate

After all clone acceptance entries and explicit owner approval, record an adaptation map from the accepted shell/components to course semantics. Establish an original course-design baseline and migrate incrementally within this application. A path rename or routing restructuring needs a deliberate migration plan, not a second abandoned application. Keep the accepted clone checkpoint reproducible in Git and keep reference assets outside any production bundle.

## Deferred course architecture

The recommended product remains one application containing public catalog, learner, creator and operator route/layout areas. Use small feature functions and explicit server/client boundaries, not a separate service fleet, generic repositories, event bus, duplicated API layer or monorepo scaffolding. Supabase, Stripe, Mux and Vercel remain candidate services, not existing integrations.

For integrated course work, require server-side identity and object-level authorization at protected reads and writes. Public view models exclude lesson bodies, private resources, payment data and secrets. Public catalog caching must never expose signed-in or cookie-bearing responses. Use client code for actual interactive needs, not to conceal protected data already delivered to the browser.

One lesson-access rule should govern protected video, text, transcripts and files. Workspace ownership, suspension and source-specific grants are server facts; bookmarks, UI roles, progress and success URLs are not authority. Database constraints and narrow atomic operations enforce cross-record invariants. SQL migrations are the schema authority; add a second ORM/migration framework only for a demonstrated requirement.

Publishing starts with version-checked drafts, locked submissions and creator-locked published content. Bounded operator corrections preserve lesson IDs and an audit trail. Payments require provider verification, idempotency and transactional order/grant effects. Media uses owned direct-upload authorization and private delivery, not a custom streaming engine. Detailed requirements live in [data model](data-model.md) and [commerce/media](commerce-and-video.md).

## Complexity budget

Add infrastructure only against evidence: a managed durable queue when processing/recovery cannot meet bounded request limits; dedicated search when measured database search is inadequate; content versioning when a defined update policy needs it; product AI when an actual learner task, access policy and evaluation justify it. Do not interpret 'best platform' as permission to install every connector or service.
