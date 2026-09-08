# Courses — agent operating contract

## Current assignment boundary

This repository is in **REFERENCE AUDIT + PRODUCT PLANNING** mode. The owner asked for saved Apple Music references, a course-platform plan and agent documentation—not continued Apple Music implementation. This documentation change does not authorize application implementation, dependency installation, infrastructure creation, paid services or deployment.

The end product is an independent, multi-creator course marketplace and learning application. Apple Music is a UI/interaction reference, not our business model, identity, content library or production codebase.

## Read before work

Read `docs/README.md`, `docs/platform.md`, `docs/decisions.md`, and the relevant row in `docs/tasks.md`. For UI work also read `docs/reference-audit.md`, `docs/design-system.md`, and `docs/screens-and-flows.md`. Read domain/security documents before working on money, access, media or creator data. Do not load every large image/manifest into every context; use the reference index and inspect the relevant family.

## Modes and authorization

| Mode | Allowed | Not authorized by that mode |
| --- | --- | --- |
| REFERENCE_ONLY | Open saved references, inspect images/recordings, classify patterns, document evidence | Implement routes/components, scaffold frameworks, recreate all 159 screens |
| DOCS_ONLY | Research, specifications, task/decision updates, documentation commits | Application/runtime changes, installs, provisioning, deployment |
| DESIGN_ONLY | Only when explicitly requested: original course wireframes/design artifacts and documented states | Backend, billing, migrations, production rollout |
| IMPLEMENT | Only the explicitly authorized task/slice after its dependencies and approvals | Unrelated features, stack switches, bulk rewrites, deployments |

The latest explicit owner instruction determines the task. Do not invent approval or infer permission to implement from a backlog, a generated mockup, a framework boilerplate file, or the phrase 'reference clone'. In a reference-collection request, 'clone the screens' means acquire/organize the reference assets unless the owner explicitly requests a coded reproduction.

## Protected legacy material

`apple-music-clone/` is an **unapproved, frozen prototype plus reference archive**. Do not delete, rename, reformat, upgrade, refactor or extend it in planning tasks. Its nested `AGENTS.md` contains generated Next.js guidance; it is not product authorization. Earlier `reference/inventory.md`, `reference/QA.md`, `reference/screen-status.md` and `reference/independent-review.md` are historical evidence. Their directions to finish an Apple Music clone are not the new roadmap.

The acquisition source of truth is `apple-music-clone/reference/originals/README.md`, its manifests, `verification.json`, and the saved files. A manifest count proves an acquisition record, not individual visual inspection or product approval. Do not treat Mobbin footers/watermarks as app UI. Do not remove watermarks from source references. Never copy reference artwork, Apple branding or proprietary font files into production; document rights for our original/licensed assets.

## Evidence and honesty

Keep these statuses distinct: acquired, decoded, visually inspected, adapted, owner-approved, implemented, tested. Record which exact file/flow/viewport was inspected. A route that resolves is not evidence of screenshot fidelity. Never use modulo/index-based fallback screen mappings as observed facts. Never label invented layouts or fixtures as captured originals. Do not mark a visual task done when image access is blocked; state the specific blocked check and continue independent documentation work.

## Implementation rules, once authorized

The recommended target is one new Next.js application under `web/`; this path does not exist as part of the planning change. The existing clone is not a template to bulk-import. Confirm the recorded stack decision before scaffolding. Consult version-matched official framework/library docs and inspect CLI `--help`; pin versions and commit one lockfile. Preserve framework-generated agent guidance in the new app and add project rules outside generated markers.

Use thin route files, feature modules and server-side authorization. A user can be both a learner and a creator; do not build mutually exclusive account types. Course content, purchase records, entitlements and progress are different concepts. Never derive access from a success URL, browser flag or player state. Do not expose privileged keys or paid transcripts/resources. Do not use real payments, production data or external messages for tests.

Keep rendering/layout, business logic and vendor integrations separate. Do not add a second auth provider, ORM, state library, microservice, queue vendor or framework without a recorded need. No global client-only app, giant all-screen component, invented testimonials, placeholder links presented as working features, or unapproved AI-generated visual style.

## Task and change protocol

Before edits: inspect branch, `git status`, existing files and task dependencies. Do not overwrite unrelated local work. Choose one bounded task and record its ID. Draft a short intended change/check plan. New facts may correct a draft recommendation, but scope/commercial decisions need explicit owner approval.

After edits: inspect the diff; run the checks appropriate to the change; update the task's evidence/status and any changed specification. Never claim a build, browser test, RLS test, migration or webhook verification that was not run. Report blocked checks separately. A feature is done only when its relevant acceptance criteria pass; visual approval and functional correctness are separate gates.

Commit only intended files, with the task ID and purpose. Do not force-push, destroy data, delete reference assets, change repository visibility, merge a planning PR, or deploy without explicit authorization. Documentation changes do not require running the archived prototype.

## Handoff

Every handoff states: active mode; task completed; files/commit; checks actually run; remaining blockers/decisions; exact next task. Use `docs/tasks.md` for work status and `docs/decisions.md` for decisions. Do not create parallel TODO lists or duplicate PRDs that drift.
