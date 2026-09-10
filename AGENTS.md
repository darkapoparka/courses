# Courses — agent contract

## Current owner assignment — 2026-09-09

The owner explicitly assigned clone-first implementation: reproduce the saved Apple Music reference in a working app before adapting it to courses. This supersedes the earlier documentation-only/course-adaptation restriction below and in the planning documents.

- Work only on `main`. Do not create, switch to, or use feature/implementation branches for this project unless the owner explicitly reverses this rule. Never force-push.
- Continue the existing Next.js application in `apple-music-clone/`. Its application components, routes, styles, and local test scripts may be edited for this assignment. Do not bootstrap a second frontend or start `web/` during the clone-first phase.
- Preserve `apple-music-clone/reference/` byte-for-byte, including all original images, high-resolution variants, manifests, recordings, and historical QA. These saved files are comparison evidence, not proof of implementation.
- Implement real DOM controls, navigation, scroll behavior, intermediate states, forms, menus and player UI. A full-screen screenshot with hotspots is not a working reconstruction. Do not substitute unrelated CSS-gradient artwork or assign screen variants by array position.
- Local rendering, focused tests, and repeatable reference/browser checks are authorized. Keep implementation, metadata validation, browser verification, visual comparison, and owner approval separate.
- This is a reference preview, not an Apple-connected service. Never collect or submit real Apple credentials or payment data, claim a real subscription/payment succeeded, or claim copyrighted recordings are playable without a media source. Fixture behavior must be explicit in the reference controls/documentation.
- Do not deploy to Production, change visibility, provision paid services, or redistribute proprietary fonts. Serve archived artwork only in local/explicit non-production reference preview; do not put the source archive in a production public directory.

## Canonical documents

Read `docs/README.md`, the relevant row/evidence in `docs/tasks.md`, and documents needed for the assigned behavior. `docs/platform.md` owns the eventual course product; `docs/architecture.md` owns its proposed implementation; `docs/decisions.md` owns decisions. Do not create another PRD, backlog, or competing planning folder. The course bootstrap and product backlog remain deferred while this clone-first assignment is active.

## Screen and flow progress

`docs/tasks.md` is the live clone checklist: one `UI-<source prefix>` and `MATCH-<source prefix>` pair per saved screenshot, and one `FLOW-<flow prefix>` item per recorded journey. Update these existing items as work lands; do not reset checked work or create another backlog. UI means coded/rendering, MATCH requires reviewed source-versus-render evidence, and FLOW requires the real complete interaction sequence. Run `node apple-music-clone/scripts/check-task-coverage.mjs` from the repository root to check coverage and print the three counts. The frozen `reference/screen-status.md` and its generator are historical acquisition records, not the live implementation tracker.

## Engineering defaults

Preserve the existing Next.js/React/TypeScript versions and lockfile for the reference app unless a demonstrated defect requires a deliberate change. Use version-matched official docs and generated Next.js instructions. Never guess current APIs, versions, or CLI flags. Keep one app and focused feature functions rather than introducing another framework or speculative infrastructure.

Inspect branch, working tree, code, dependencies, and acceptance criteria before editing. Preserve unrelated changes and nested generated AGENTS. Implement complete behaviors with useful failure states, not dead controls or fake-success handlers. Authorize server-side resources and mutations when backend work is actually assigned; the reference-preview state is not production authentication or authorization.

## UI and reference protocol

Open the relevant saved originals at readable size before choosing layout, typography, spacing, or artwork crops. Record exact source identities and measurements separately from proposed adaptation. Do not infer screen mappings from array indexes, copy a Mobbin footer into application UI, or claim all references were viewed when they were not.

Use the frozen `reference/originals/flow-screen-map.json` for all 58 flow sequences and 218 steps. A known source without an implemented state must not silently display an unrelated page. Preserve the archive's unknown/unreviewed states honestly until their corresponding behavior is implemented.

Compare browser renders against originals at the correct reference viewport and exclude acquisition footers from application measurements. The saved sources are desktop references; responsive behavior must work but must not be described as matching nonexistent native-mobile originals.

After changes, review the diff, run available checks, and record exact evidence in `docs/tasks.md`. Never claim tests, playback, visuals, provider integration, or approvals that have not been observed. No new planning/handoff documents in place of application work.

## Handoff

Report the actual commit, changed behavior, tests/browser comparisons performed, and remaining unverified states. Do not claim 1:1 completion from route counts or metadata checks. Production and course adaptation require their own explicit assignments after clone acceptance.
