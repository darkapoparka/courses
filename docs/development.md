# Clone development and verification runbook

## Preflight and ownership

Read the root/app `AGENTS.md`, current handoff and owning task entries. The active app is `apple-music-clone/`; the existing Windows checkout is `J:\courses-astra-preview`. The owner-authorized target is `astra-pro`, but that dirty `main` checkout was not migrated. Follow [branch transition](astra/branch-transition.md), preserving all existing work.

Inspect branch, HEAD, staged/unstaged diffs, untracked files, worktrees, remotes and incoming/outgoing commits. Fetching is not permission to pull over someone else's work. Do not reset, clean, force-push, stash-and-forget, stage all files indiscriminately, or import the historical course implementation.

Use existing locked dependencies. Only when missing, reproduce the install from the app directory with `npx --yes pnpm@10.11.0 install --frozen-lockfile`. Read relevant installed guides in `node_modules/next/dist/docs/` before framework changes. Do not upgrade packages for a visual repair or install QA packages into the application lockfile.

## Identify and start the correct preview

Check each listener's owner PID, command line and working directory. Port 3000 may belong to another project. The established clone preview is loopback 6431; do not terminate another app to take a port. From the correct active app checkout:

```powershell
$env:REFERENCE_PREVIEW='1'
npm run dev -- --hostname 127.0.0.1 --port 6431
```

Open `http://127.0.0.1:6431/`. Verify hydration, a real navigation action, the visible page, console errors and failed assets. HTTP 200 or a listener alone proves neither application health nor fidelity. For a separate worktree, choose a verified unused loopback port rather than replacing the owner's existing preview.

## Isolated QA environment

Only create this environment when it is not already available:

```powershell
python -m venv .qa\audit-venv
.qa\audit-venv\Scripts\python.exe -m pip install -r scripts/requirements-qa.txt
.qa\audit-venv\Scripts\python.exe -m playwright install chromium
```

Use explicit UTF-8 when reading/writing Windows text. Before piping Python source through PowerShell, set `$OutputEncoding=[System.Text.UTF8Encoding]::new($false)` and `$env:PYTHONUTF8='1'`, or use ASCII source with Unicode escapes. Do not corrupt fixture strings or selectors through stdin encoding.

## Source checks and fresh capture

From the app directory, for a runtime candidate:

```powershell
npm run qa:archive
npm run qa:coverage
npm run typecheck
npm run build
.qa\audit-venv\Scripts\python.exe -m unittest discover -s scripts -p test_qa_tools.py
node --test scripts/test_cover_integrity.mjs
$run = Get-Date -Format 'yyyyMMdd-HHmmss'
$env:REFERENCE_URL='http://127.0.0.1:6431'
$env:REFERENCE_OUTPUT=Join-Path (Get-Location) ".parity-evidence/$run/browser"
.qa\audit-venv\Scripts\python.exe scripts/browser-reference.py
.qa\audit-venv\Scripts\python.exe scripts/compare-reference.py --input $env:REFERENCE_OUTPUT --output ".parity-evidence/$run/comparison"
```

Use the actual verified server URL, not the example when auditing another listener. Npm's Python aliases require the QA environment on PATH; explicit executable paths avoid that ambiguity. For a baseline diagnostic, add `--baseline <prior-comparison/metrics.json>` to the comparison command. Keep the browser, OS, scale, viewport, content and capture conditions equivalent.

Never reuse an evidence output directory for a new candidate. The runner covers 159 desktop states, five responsive samples, 218 recorded route steps and registered interaction regressions. It records source/browser/resource identity and rejects source changes during a run. Windows defaults to serial capture; `REFERENCE_CONCURRENCY` supports 1 through 4 and is recorded. Do not increase concurrency to hide resource failures.

Open the resulting source/render/difference gallery at readable size. The standard originals contain 147 application viewports at 1440 by 903 and 12 at 1440 by 904. Only the documented 120px acquisition footer is excluded. Do not edit originals, resize candidates, skip hard states, mask product pixels or relax metrics to pass.

## Production verification

Runtime-affecting changes must be checked against an optimized build, not only `next dev`. Preserve the owner's development preview. Start a separate positively identified clone audit listener on an unused loopback port and set `REFERENCE_URL` accordingly. Compare its command line and creation time with the build ID/time; replacing `.next/BUILD_ID` does not refresh an older process.

Do not build simultaneously into a shared `.next` directory. The existing preview-only `next start` audit path has emitted a standalone-output advisory; it is not a production deployment recipe. Any future deployment must follow current documented standalone packaging and has a separate authorization gate.

The app has had production-only dialog-scroll and compiled backdrop-style defects. Verify cold entry, layout/scroll state and exact computed values in production. A green render assertion may still capture the wrong state.

## Find the active owner

`components/apple-music-app.tsx` and its `Content` switch are authoritative. Trace imports before editing similarly named legacy exports.

| Surface | Active modules |
| --- | --- |
| New / Home | `music-discovery.tsx`, discovery catalogs and imported fidelity styles |
| Album / Artist | `music-album.tsx` / `music-artist.tsx`, not legacy names in `music-browse.tsx` |
| Search / Library / Playlist | `music-search.tsx`, `music-library.tsx`, `music-playlist.tsx` |
| Player / Lyrics / Video | `music-player.tsx`, `music-lyrics.tsx`, `music-video-player.tsx` |
| Radio / Schedule | `music-radio.tsx`, `music-chart-schedule.tsx` |
| Replay / Concerts | `music-replay.tsx`, `music-concerts.tsx` |
| Account / Authentication | `music-account.tsx`, `music-account-dialogs.tsx`, `music-auth.tsx` |
| Shared state / fixtures | `music-context.tsx`, `lib/music-scenes.ts` and relevant catalogs |

Fix semantic state/content, geometry and asset identity before adding per-screen color overrides. Inspect imported and computed CSS. Keep material and artwork behavior coherent when normal actions clear the fixture hint.

## Continuous journeys and regression scope

Read the full recorded sequence. Begin at its allowed first fixture, then use real controls through every step, including forms, menus, scroll and return states. Forced clicks, injected state and URL jumps are diagnostics, not FLOW acceptance. Keep scenario discrepancies visible rather than replacing catalogs or account/library data behind unrelated actions.

Register new suites in `scripts/browser-reference.py` and actually execute them. `browser_live_fidelity.start` selects the original viewport; `record` preserves ordinal image names and `steps.jsonl`. Do not overwrite a revisited state. Use `move_pointer=False` only to retain an intentional real hover. Keep actual `platformFonts` evidence separate from a CSS font-family declaration.

A focused component edit needs focused regressions; a shared shell/state/style change needs the whole corpus and review of both improvements and regressions. Documentation-only changes need document/skill/consistency checks, not fabricated runtime results. `qa:coverage` and `inventory:screen-status` are read-only; never run the historical archive-writing generator. `qa:acceptance` intentionally fails until every required MATCH and FLOW entry is accepted.

## Checkpoint and handoff

Review explicit file diffs for archive changes, dirty work ownership, secrets, scratch output, stale claims and generated `next-env.d.ts` churn. Stage only the coherent reviewed batch, commit on the authorized branch and push normally when authorized. Preserve failed evidence. Update task evidence, audit findings and handoff without converting test counts into acceptance.

Confirm actual GitHub checks for the pushed SHA before saying CI passed. The existing reference workflow is scoped to `main`; the Astra docs workflow verifies documentation. Before the first application-code checkpoint on `astra-pro`, extend the reference workflow to that branch without weakening its checks, and verify the actual run. No current document promises unconfigured branch protection or automatic visual approval.
