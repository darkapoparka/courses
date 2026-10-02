# Courses — course selling and community, Apple Music-derived design

One active application: `apple-music-clone/`. The owner authorized course adaptation on 2026-10-02. Develop the independent product under `/learn` while preserving the music reference at `/` and `/screen/*`. The remaining reference matches/flows are not falsely accepted or blockers to the new phase.

## Start here
Read [AGENTS.md](AGENTS.md), [the current handoff](docs/handoff.md), [the single task ledger](docs/tasks.md), [the style contract](docs/style.md) and [product design](docs/design.md). The [documentation map](docs/README.md) routes deeper work; [the next-session prompt](docs/next-session.md) names the immediate continuation.

## Workspace and preview
Use only `J:\courses` on `main`, with `apple-music-clone/` as the app. The existing checkout alias currently resolves to `L:\PLATFORMS\courses\app`; do not change that junction or create another checkout. Preserve unfinished work, the reference archive and evidence. No cleanup/deletion commands to reclaim space.
The canonical preview is `http://127.0.0.1:6435/learn`. Inspect an existing listener's ownership before starting another. The app's dev script uses the existing webpack path. From the app directory:

```powershell
npm run dev -- --hostname 127.0.0.1 --port 6435
```

Current courses, notes, progress, saved items and community activity are an explicit local preview. There is no real account, payment, enrollment, public posting or cross-device synchronization. The [architecture](docs/architecture.md) makes the real free-course backend journey the next integrated milestone, not a final bolt-on.

## Verification
Run `npm run qa:platform:unit`, `npm run typecheck` and the isolated Python platform browser suite from the [runbook](docs/development.md). Keep optimized and development outputs separate. Shared music/global changes also require the existing reference corpus.
`qa:archive` and `qa:coverage` remain read-only. The last accepted reference ledger is UI 159/159, MATCH 127/159, FLOW 34/58; use `docs/tasks.md` for exact rows and evidence. Local UI tests, CI and route counts are not automatic visual or commercial acceptance.

## Preservation and release
Keep `reference/`, historical reviews and [recovery provenance](docs/astra/branch-transition.md) intact. Use original/licensed product assets and independent branding; never distribute Apple's fonts or reference artwork as course assets. Do not provision paid services, accept real money, send external notifications or deploy publicly without explicit approval.
