# Courses — agent contract

## Start here

Read `docs/README.md`, the assigned row in `docs/tasks.md`, and only the documents listed for that task. `docs/platform.md` owns the product; `docs/architecture.md` owns the implementation shape; `docs/decisions.md` owns decisions. Do not create another PRD, backlog, or competing planning folder.

We are building an independent, multi-creator course marketplace and learning app. Apple Music is the visual reference, not the product, identity, content, or backend. Keep its content-led hierarchy; do not replace it with a generic dashboard theme.

## Scope

The current request authorizes reference inspection and documentation. It does not authorize application changes, deployments, production access, purchases, or infrastructure provisioning. A later instruction to execute a named implementation task authorizes that task's normal edits and local checks; do not ask permission again for every component. Stop at the task boundary, not at every routine step.

`REFERENCE` means inspect/classify existing assets, not build a music clone. `DOCS` means specifications and evidence. `IMPLEMENT` means the explicitly assigned slice. `RELEASE` requires separate explicit approval. A backlog, scaffold, generated framework rule, or mockup is not authorization to implement everything.

## Protected material

Preserve `apple-music-clone/` in full, including the prototype, nested generated AGENTS, manifests, originals, higher-resolution files, and recordings. The future application is `web/`. Do not install, upgrade, rename, refactor, or delete the archive as part of a product task. Never deploy the repository root or copy reference artwork into the production public directory.

## Engineering defaults

Use the recommended Next.js/TypeScript baseline in `docs/tech-stack.md` unless the owner explicitly chooses another stack. One app; one Postgres database; small feature functions; managed auth, video, and payments. No microservices, generic repositories, dependency injection container, custom job framework, speculative tables, or second framework.

Use version-matched official docs and the installed CLI's help. Preserve generated Next.js instructions outside our project rules. Never guess current APIs, package versions, or CLI flags. Pin the actual supported versions and lockfile at bootstrap.

Server-side identity and resource authorization are required at every protected data/mutation boundary. Public metadata is separate from paid content. Payment, access, progress, and bookmarks are not interchangeable. A service credential bypasses ordinary safeguards; keep it server-only and narrowly used. See `docs/coding-standards.md` and the domain contract before touching these paths.

## Work protocol

Inspect branch, working tree, existing code, dependencies, and task acceptance criteria first. Preserve unrelated work. Make one bounded change. Create folders, abstractions, packages, and migrations only when the current slice uses them. Implement the smallest complete behavior, including its failure states.

For UI work, open the relevant saved originals at readable size before choosing a pattern. Record exact source paths and what was adapted. Do not invent a mapping from screen IDs, copy a Mobbin footer, or claim every reference was viewed. Unreviewed course designs are proposals. One good first screen may be implemented for review when the owner assigns that UI task; final mockups for every page are not a prerequisite.

In a bounded fixture preview, activate only implemented destinations/actions. Mark unbuilt navigation or actions explicitly unavailable; do not send users to 404s, create fake-success handlers, or scaffold the rest of the backlog just to populate a navbar. Replace those preview limitations as the owning tasks are implemented.

After work, inspect the diff, run relevant checks, and update the task evidence. Distinguish: documented, visually inspected, implemented, tested, and owner-approved. Never claim tests, images, functionality, or approvals that do not exist. No fake purchase success, invented reviews, dead controls presented as working, or silent production fallback to fixtures.

## Handoff

Report task ID, changed files/commit, actual checks, blockers, and the next bounded task. `docs/handoff.md` contains the initial build prompt. Do not force-push, merge to main, deploy, run live payments, send real messages, or destroy data without explicit authorization.
