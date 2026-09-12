# Apple Music reference clone

This is the active application. Reconstruct the saved music interface and recorded flows before any courses/community adaptation. Read [the root contract](../AGENTS.md), [handoff](../docs/handoff.md), [runbook](../docs/development.md) and [single checklist](../docs/tasks.md).

The adopted checkout is `J:\courses` on `astra-pro`. Eleven pending source/test files from the preserved Windows preview were copied here and hash-verified; they remain uncommitted and are not a verified runtime candidate. See [branch transition](../docs/astra/branch-transition.md) before checkpointing them.

## Run

Run from `J:\courses\apple-music-clone` after confirming the port and checkout. An older listener is not evidence that this checkout is running.

```powershell
$env:REFERENCE_PREVIEW='1'
npm run dev -- --hostname 127.0.0.1 --port 6431
```

Use existing locked dependencies. Inspect the listener and actual browser at `http://127.0.0.1:6431/`; do not take another project's port. Local-preview account/payment/playback controls are not real Apple integrations.

## Check

`npm run qa:archive` checks the frozen archive. `npm run qa:coverage` reports separate UI, MATCH and FLOW status. `npm run typecheck` and `npm run build` validate source changes. The runbook supplies isolated Python setup and complete browser/comparison commands. The strict `npm run qa:acceptance` must fail while required acceptance entries remain open.

`/screen/<full-screen-id>` is a canonical fixture. `/flows/<flow-slug>?step=0` is an indexed recorded step, not a completed real-control flow. `Shift+R` opens the reference browser; `Shift+M` opens the local-media chooser.

Preserve `reference/`, including `reference/originals/flow-screen-map.json`. Captures go into fresh local `.parity-evidence/` directories; dependencies, evidence images and `.qa/` remain uncommitted. Do not redistribute proprietary assets/fonts or deploy this reference preview publicly.
