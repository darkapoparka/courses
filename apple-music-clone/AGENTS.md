<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

## Application contract — adaptation authorized 2026-10-02
Follow `../AGENTS.md`. Use only `J:\courses` on `main`; the existing junction may resolve to `L:\PLATFORMS\courses\app`. Keep this application, its lockfile, `/` and `/screen/*`. Build the independent product under `/learn`. The owner's transition supersedes the former all-parity-before-courses gate without accepting unchecked reference states.
Read `../docs/handoff.md`, the relevant `../docs/tasks.md` entries, `../docs/style.md` and `../docs/design.md`. No competing backlog, replacement app, branches, worktrees, cleanup or deletion. Preserve prior dirty work and all reference/evidence assets.

## Ownership and styling
Music: trace the `Content` switch in `components/apple-music-app.tsx`; similarly named modules can be inactive. Courses: `app/learn`, `components/platform`, `lib/platform`. Platform styles are CSS-module scoped; do not add global overrides or repurpose music fixture state.
Sidebar and material must follow actual visible content, not a fixture hint. Keep prefixed backdrop declarations before standard declarations; verify optimized computed values. Preserve native scroll, focus, overlays, responsive containment and the reference archive.

## Boundaries and verification
Server-selected lesson bodies stay in `*.server.ts` with `server-only`; client components receive only safe metadata and IDs. Preview storage never grants enrollment or paid access. Every future protected read/write requires server identity and object-level authorization. See `../docs/architecture.md`.
Run `qa:platform:unit`, typecheck and `scripts/browser-platform.py` for platform changes. Use the isolated QA interpreter and existing browser from `../docs/development.md`. Shared music/global changes also require the full registered reference suite. Neither a passing fixture nor a screenshot grants MATCH/FLOW acceptance.
Before modifying framework code, inspect the installed version and bundled guides. If a bundled guide is absent, record that fact and use current official Next.js documentation plus Context7; do not invent version-matched content or silently upgrade. The attempted installed data-security guide was absent on 2026-10-02.
Use unique ignored `.qa/` evidence/build locations. Never build into a running development output. Do not stop unrelated listeners. Keep all credentials, reference originals, dependency trees, screenshots and generated Next type-path churn out of the implementation commit.
