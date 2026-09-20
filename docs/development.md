# Clone development and verification runbook

## Preflight and ownership

Read the root/app `AGENTS.md`, current handoff and owning task entries. The **only implementation checkout is `J:\courses`**, the **only working branch is `main`**, and the active app is `J:\courses\apple-music-clone`. Do not create or switch branches/worktrees for implementation unless the owner explicitly reverses this rule. Historical recovery material is provenance only. Preserve any dirty work already present on main and continue there.

Inspect branch, HEAD, staged/unstaged diffs, untracked files, worktrees, remotes and incoming/outgoing commits. Fetching is not permission to pull over someone else's work. Do not reset, clean, force-push, stash-and-forget, stage all files indiscriminately, or import the historical course implementation.

Use existing locked dependencies. Only when missing, reproduce the install from the app directory with `npx --yes pnpm@10.11.0 install --frozen-lockfile`. Read relevant installed guides in `node_modules/next/dist/docs/` before framework changes. Do not upgrade packages for a visual repair or install QA packages into the application lockfile.

## Identify and start the correct preview

Check each listener's owner PID, command line and working directory. The canonical main development preview uses 6435. Optimized audits may use a separate verified unused loopback port, but they must run the same `J:\courses` source/build rather than another checkout. The former 6431 preview was retired on 2026-09-13. Port 3000 belongs to another project. Recheck ownership and freshness before stopping anything. From the active app checkout:

```powershell
$env:REFERENCE_PREVIEW='1'
npm run dev -- --hostname 127.0.0.1 --port 6435
```

Open `http://127.0.0.1:6435/`. Verify hydration, a real navigation action, the visible page, console errors and failed assets. HTTP 200 or a listener alone proves neither application health nor fidelity. For an optimized audit, choose a verified unused loopback port while keeping the source checkout on `J:\courses`.

When the default `.next` junction is on a nearly full drive, use the existing `NEXT_DIST_DIR` setting with separate ignored paths inside the same app, such as `.qa/dev-<run>` for development and `.qa/build-<run>` for the optimized candidate. Do not move the checkout, change junctions, share one output directory between dev/build, or delete data. Inspect current storage and the handoff before choosing a path.

## Isolated QA environment

The canonical isolated QA interpreter is `D:/courses-main-qa/audit-venv/Scripts/python.exe`; execute scripts from `J:/courses/apple-music-clone`. It replaces the interpreter that used to live under the retired preview checkout. The original build/evidence junctions are D:-backed; current runs may use ignored same-checkout J-backed paths. Recheck both drives rather than assuming a previous free-space observation is current. Preserve the junctions and the existing external QA environment.

Only recreate this external environment when it is genuinely missing:

```powershell
python -m venv D:\courses-main-qa\audit-venv
D:\courses-main-qa\audit-venv\Scripts\python.exe -m pip install -r scripts/requirements-qa.txt
D:\courses-main-qa\audit-venv\Scripts\python.exe -m playwright install chromium
```

Use explicit UTF-8 when reading/writing Windows text. Before piping Python source through PowerShell, set `$OutputEncoding=[System.Text.UTF8Encoding]::new($false)` and `$env:PYTHONUTF8='1'`, or use ASCII source with Unicode escapes. Do not corrupt fixture strings or selectors through stdin encoding.

## Source checks and fresh capture

From the app directory, for a runtime candidate:

```powershell
npm run qa:archive
npm run qa:coverage
npm run typecheck
npm run build
D:\courses-main-qa\audit-venv\Scripts\python.exe -m unittest discover -s scripts -p test_qa_tools.py
node --test scripts/test_cover_integrity.mjs
$run = Get-Date -Format 'yyyyMMdd-HHmmss'
$env:REFERENCE_URL='http://127.0.0.1:6435'
$env:REFERENCE_OUTPUT=Join-Path (Get-Location) ".parity-evidence/$run/browser"
D:\courses-main-qa\audit-venv\Scripts\python.exe scripts/browser-reference.py
D:\courses-main-qa\audit-venv\Scripts\python.exe scripts/compare-reference.py --input $env:REFERENCE_OUTPUT --output ".parity-evidence/$run/comparison"
```

Use the actual verified server URL, not the example when auditing another listener. Npm's Python aliases require the QA environment on PATH; explicit executable paths avoid that ambiguity. For a baseline diagnostic, add `--baseline <prior-comparison/metrics.json>` to the comparison command. Keep the browser, OS, scale, viewport, content and capture conditions equivalent.

Both runners also accept `.qa/evidence/<unique-run>/browser` and `.qa/evidence/<unique-run>/comparison` inside this same app checkout. This is the supported J-backed fallback when the D-backed `.parity-evidence` directory has insufficient space. Reference-archive exclusion, source identities, exact dimensions, overwrite protection and thresholds remain unchanged.

Never reuse an evidence output directory for a new candidate. The runner covers 159 desktop states, five responsive samples, 218 recorded route steps and registered interaction regressions. It records source/browser/resource identity and rejects source changes during a run. Windows defaults to serial capture; `REFERENCE_CONCURRENCY` supports 1 through 4 and is recorded. Do not increase concurrency to hide resource failures.

Open the resulting source/render/difference gallery at readable size. The standard originals contain 147 application viewports at 1440 by 903 and 12 at 1440 by 904. Only the documented 120px acquisition footer is excluded. Do not edit originals, resize candidates, skip hard states, mask product pixels or relax metrics to pass.

## Production verification

Runtime-affecting changes must be checked against an optimized build, not only `next dev`. Preserve the owner's development preview. Start a separate positively identified clone audit listener on an unused loopback port and set `REFERENCE_URL` accordingly. Compare its command line and creation time with the build ID/time; replacing `.next/BUILD_ID` does not refresh an older process.

Do not build simultaneously into a shared `.next` directory. The existing preview-only `next start` audit path has emitted a standalone-output advisory; it is not a production deployment recipe. Any future deployment must follow current documented standalone packaging and has a separate authorization gate.

On Windows PowerShell, a native stderr advisory can terminate a server launch when `$ErrorActionPreference` is `Stop`. The verified local audit used `Start-Process` with an explicit project working directory and separate stdout/stderr files. Preserve diagnostic stderr, inspect the exit status/listener, and verify HTTP, hydration and real navigation; a printed Ready line alone does not prove that the process stayed alive. Do not hide genuine errors or terminate a reused parent PID.

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

Review explicit file diffs for archive changes, dirty work ownership, secrets, scratch output, stale claims and generated `next-env.d.ts` churn. Stage only the coherent reviewed batch, commit directly on `main`, and push normally. Do not create a temporary implementation branch or worktree. Preserve failed evidence. Update task evidence, audit findings and handoff without converting test counts into acceptance.

Confirm actual GitHub checks for the pushed SHA before saying CI passed. Both workflows cover relevant `main` pushes and pull requests into `main`; manual dispatch remains available. The reference workflow retains archive, coverage, install, typecheck, build, browser, comparison and evidence steps. Documentation checks are separate. A committed candidate's CI cannot certify later dirty changes or grant visual acceptance. No current document promises unconfigured branch protection or automatic approval.