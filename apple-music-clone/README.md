# Courses application and preserved music reference

The owner authorized course/community adaptation on 2026-10-02. Keep this application and lockfile; product routes live under `/learn`, music reference routes remain `/` and `/screen/*`. Read [the root contract](../AGENTS.md), [handoff](../docs/handoff.md), [style](../docs/style.md), [design](../docs/design.md) and [single checklist](../docs/tasks.md).

Use only `J:\courses` on `main`. Its existing junction points at the same active source on `L:`; inspect rather than moving it. Preserve prior dirty changes, reference originals and local evidence.

## Preview
From this app directory, first inspect existing port ownership, then use the canonical `http://127.0.0.1:6435/learn` preview. Do not start a duplicate listener or take another project's port.

```powershell
npm run dev -- --hostname 127.0.0.1 --port 6435
npm run qa:platform:unit
npm run typecheck
```

The [runbook](../docs/development.md) supplies the isolated Python/Chromium paths, platform browser command and separate optimized-build procedure. The default `.next` junction is on a full drive; use an existing verified dev output or a unique ignored `.qa/` output, never cleanup/delete commands.

## Verification and boundaries
Platform tests cover original demo metadata, server-selected public lessons, versioned browser storage, community validation, scoped CSS and real-control journeys. The preview is not authentication, enrollment, live community or commerce. A bookmark or browser flag cannot unlock protected content.
`qa:archive` validates immutable source assets; `qa:coverage` reports the separate UI/MATCH/FLOW ledger. Strict `qa:acceptance` still fails while reference acceptance entries remain open. Platform checks do not silently check those entries.
`/screen/<full-screen-id>` is a music fixture and `/flows/<flow-slug>?step=0` an indexed recording step, not proof of a completed continuous journey. Keep all original IDs and evidence. Course screenshots use independent adaptation baselines.
Never commit dependency/build/evidence directories, credentials or proprietary font files. Do not redistribute source music artwork in the course product or deploy this reference preview publicly.
