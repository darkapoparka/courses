<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

## Application-specific contract

Follow `../AGENTS.md`, `../docs/handoff.md` and the relevant `../docs/tasks.md` entries. This is the active clone, not an archived prototype. The authorized target branch is `astra-pro`; never switch the preserved dirty `main` checkout to obtain it. Read the transition procedure first. No courses adaptation before clone acceptance.

Keep `reference/` unchanged. Use the read-only `qa:coverage` command; do not run the historical screen-status generator. Keep local QA and captures in ignored `.qa/` and `.parity-evidence/` directories. Use explicit UTF-8 for Windows file and stdin operations.

## Known regression traps

The `Content` switch in `components/apple-music-app.tsx` identifies the active view. Some similarly named exports in `music-browse.tsx` are not the active album/artist implementation. Trace imports before editing.

Shared material, artwork edition and navigation must follow live state, not the continued presence of `data-source`. After sidebar/carousel changes exercise Volume, Account, Next, Previous, vertical scrolling, return navigation and the existing six-width containment regression. Artwork leaving the viewport must not leave its tint behind.

Inspect optimized production computed blur/saturation, not just development or a non-none filter. This toolchain previously dropped a standard backdrop override when declaration order was reversed. Preserve the reviewed standard-after-prefixed order where both are used. Native dialog initial scrolling also needs cold production verification.

A fixture endpoint and a continuous journey can have different catalogs, account/library snapshots or playback state. Do not silently replace session data behind a hover or panel toggle to manufacture the endpoint image. Retain the discrepancy and investigate the recording/scenario model.

Register new browser suites in `scripts/browser-reference.py` and execute them before reporting coverage. Journey captures require each original's exact viewport, ordered non-overwriting image names and `steps.jsonl` evidence. Chromium platform-font usage, not a CSS family list, identifies the actual rendered font; never copy proprietary font files.

Use `../docs/development.md` for runnable commands and `../docs/quality-and-operations.md` for evidence requirements. A rendered fixture, passing regression or small pixel residual does not independently accept MATCH or FLOW.
