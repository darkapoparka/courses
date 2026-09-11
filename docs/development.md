# Clone development and verification runbook

## Scope and preflight

The active app is `J:\courses-astra-preview\apple-music-clone`. Work only on `main`. Preserve existing changes and the complete `reference/` archive. Do not scaffold `web/`, adapt course copy, or provision services during clone finalization.

Inspect `git branch --show-current`, `git status --short`, staged/unstaged diffs, HEAD, and `git log --oneline origin/main..main`. Fetching `origin main` is allowed; do not automatically pull, reset, clean, stash, or replace someone else's work. Record the starting commit.

Use the installed locked application dependencies. Only when missing, reproduce the existing install with `npx --yes pnpm@10.11.0 install --frozen-lockfile`. Read relevant version-matched guides in `node_modules/next/dist/docs/` before framework changes.

## Start the correct server

Inspect the listener and its process command line first. Port 3000 may belong to another repository. Do not terminate another application to free a port. The local clone uses loopback port 6431:

```powershell
Set-Location 'J:\courses-astra-preview\apple-music-clone'
$env:REFERENCE_PREVIEW='1'
npm run dev -- --hostname 127.0.0.1 --port 6431
```

Open `http://127.0.0.1:6431/` in the browser. Verify hydration, real navigation, the screenshot, browser errors, and asset requests. A running process or HTTP 200 is not sufficient. Keep the dev server running for the owner when handing off.

## Isolated QA tools

Do not install browser tooling into the application or modify the app lockfile for QA. From the app directory:

```powershell
python -m venv .qa\audit-venv
.qa\audit-venv\Scripts\python.exe -m pip install -r scripts/requirements-qa.txt
.qa\audit-venv\Scripts\python.exe -m playwright install chromium
```

## Capture and compare a fresh candidate

Use explicit UTF-8 for every text-file read and write on Windows. Do not let a default codepage corrupt fixture text or selectors. The npm Python aliases require the QA environment on PATH; the explicit commands below need no activation.

```powershell
npm run qa:archive
npm run qa:coverage
npm run typecheck
npm run build
.qa\audit-venv\Scripts\python.exe -m unittest discover -s scripts -p test_qa_tools.py
$run = Get-Date -Format 'yyyyMMdd-HHmmss'
$env:REFERENCE_URL='http://127.0.0.1:6431'
$env:REFERENCE_OUTPUT=Join-Path (Get-Location) ".parity-evidence/$run/browser"
.qa\audit-venv\Scripts\python.exe scripts/browser-reference.py
.qa\audit-venv\Scripts\python.exe scripts/compare-reference.py --input $env:REFERENCE_OUTPUT --output ".parity-evidence/$run/comparison"
```

For before/after diagnostics, add `--baseline <prior-comparison/metrics.json>` to the comparison command. Keep the same browser, operating system, scale, and capture conditions. Open the generated `index.html` locally and inspect the actual source, render, and amplified differences at readable size. Never substitute a low pixel-error score for a visual review.

The runner covers 159 canonical desktop states, five narrow-width smoke states, every one of the 218 recorded route steps, and explicit interaction regressions. It records browser/source identity, resource and console failures, geometry, overflow, and screenshot hashes. Source changes during a run invalidate that candidate. It refuses to overwrite an evidence directory.

The standard archive contains **147 application viewports at 1440×903 and 12 at 1440×904**. Only the 120px acquisition footer is excluded. Original bytes stay unchanged. Never resize a mismatched candidate, silently skip a missing capture, mask product content, or use the high-resolution image's dimensions as a different layout target.

`qa:coverage` and the legacy `inventory:screen-status` alias are read-only. Do not run the historical `generate-screen-status.mjs` writer against the frozen archive. `qa:acceptance` deliberately fails until every MATCH and FLOW entry is accepted; even then, owner approval is needed before adapting the product.

## Find the active code before editing

The `Content` switch in `components/apple-music-app.tsx` is authoritative. Some legacy modules export similarly named, unused page implementations; do not fix an inactive view.

| Surface | Active owner |
| --- | --- |
| New / Home | `music-discovery.tsx`, discovery catalogs, and imported fidelity styles |
| Album / Artist | `music-album.tsx` / `music-artist.tsx`, not the similarly named exports in `music-browse.tsx` |
| Search / Library / Playlist | `music-search.tsx`, `music-library.tsx`, `music-playlist.tsx` |
| Player / Lyrics / Video | `music-player.tsx`, `music-lyrics.tsx`, `music-video-player.tsx` |
| Radio / Schedule | `music-radio.tsx`, `music-chart-schedule.tsx` |
| Replay / Concerts | `music-replay.tsx`, `music-concerts.tsx` |
| Account / Authentication | `music-account.tsx`, `music-account-dialogs.tsx`, `music-auth.tsx` |
| Shared state / reference fixtures | `music-context.tsx`, `lib/music-scenes.ts`, and the relevant catalog |

Inspect the imported CSS and actual computed styles before adding overrides. Prefer fixing incorrect artwork, viewport, scroll, semantic state or layout over fitting new per-screen gradients. A fixture-only source-ID adjustment must not break the same state reached through live controls.

## Review, checkpoint, and hand off

For a chosen family, read every recorded step, capture the unchanged baseline, implement a bounded fix, inspect before/after evidence, and perform the complete journey with real controls. Fixture URL stepping, forced clicks, injected application state, and successful screenshots are not FLOW acceptance. Review available motion assets where timing matters; still-image and responsive smoke results do not prove motion or mobile reference fidelity.

After shared changes, rerun the whole corpus and check both improvements and regressions. Record exact state IDs, source/candidate hashes, viewport, browser, reviewer, residuals, and evidence location in the owning task/audit. Check `git diff` for accidental archive edits, stale document claims, secret material, scratch files, and generated `next-env.d.ts` dev/build path churn. Stage explicit files, commit on `main`, and push normally when the checkpoint is verified. Never force-push.

CI validates `main` changes, locked dependencies, types/build, the task inventory, browser behavior, and a full comparison gallery. Its green status means those checks passed, not that 159 visual reviews or 58 complete flow sign-offs happened. Update `docs/handoff.md` with the tested source commit, actual server URL, evidence commands, and concrete remaining gaps.

Course/community environments and service integrations remain deferred to a separately authorized phase; this runbook does not bootstrap them.

## Production-mode visual checks are required

Do not verify only `next dev`. This audit found a native-dialog scroll race that appeared in production despite green development captures. After the optimized build, use a separate, verified loopback production server and run the same full browser suite against its `REFERENCE_URL`; preserve the development preview for the owner. The existing CI does this against its isolated production server. Compare every source state afterward: render success alone did not catch the wrong article scroll position.

The current local/CI `next start` audit path emits a standalone-output advisory even though the measured routes and browser checks run. This is a preview-only setup, not a production deployment approval; any deployment work must use the framework's documented standalone entry point and static-asset packaging.
