# Apple Music reference clone

This is the active implementation, not a paused archive or a courses scaffold. The goal is a true 1:1 reconstruction of every saved Apple Music screen and flow before adapting the product into a courses/community platform. Work only on `main` and preserve existing work.

Read [the root agent contract](../AGENTS.md), [the current handoff](../docs/handoff.md), [the runbook](../docs/development.md), and [the single checklist](../docs/tasks.md).

## Run locally

Use the existing locked dependencies. From this directory:

```powershell
$env:REFERENCE_PREVIEW='1'
npm run dev -- --hostname 127.0.0.1 --port 6431
```

Verify the actual browser at `http://127.0.0.1:6431/`; another project may own port 3000. Account, payment, subscription, and playback are explicit local previews. They do not submit credentials, purchase a subscription, or stream Apple media. User-owned local media is supported separately.

## Verify rather than infer completion

`npm run qa:archive` validates the preserved corpus. `npm run qa:coverage` reports implementation, visual-review, and flow-review status independently. `npm run typecheck` and `npm run build` check the application. The runbook supplies isolated Python tooling and exact capture/comparison commands.

The browser runner checks all 159 screen identities, five responsive smoke samples, 218 recorded route steps, and explicit real-control regressions. It uses each source's actual application height, records candidate/browser identity and screenshot hashes, and fails on resource/console problems or source changes during a run. The comparison tool requires the complete exact-size corpus and produces a local source/render/difference gallery.

Use fresh `.parity-evidence/` output directories; never overwrite a baseline with a later attempt. `.qa/` is ignored local scratch work. The npm Python aliases require the QA virtual environment on PATH. Windows capture defaults to one concurrent page to reduce transient browser resource failures on a shared computer; `REFERENCE_CONCURRENCY` accepts 1–4 and is recorded with the run.

`npm run qa:acceptance` is a separate strict phase gate: it must fail while any MATCH or FLOW entry remains unaccepted. Green CI, a screenshot, or a working route is not 1:1 sign-off. The historical `inventory:screen-status` alias now points to the read-only coverage checker; do not execute the old archive-writing generator directly.

## Reference boundaries

Preserve the entire `reference/` directory byte-for-byte, including historical acquisition reports. The authoritative ordered manifest is `reference/originals/flow-screen-map.json`; current progress belongs in `../docs/`, not regenerated archive files.

`/screen/<full-screen-id>` opens a canonical fixture. `/flows/<flow-slug>?step=0` opens an indexed recorded step, not a substitute for completing a journey through real controls. `Shift+R` opens the reference browser and `Shift+M` opens the local-media chooser.

No production deployment or asset/font redistribution is authorized. The future courses/community specifications remain deferred until the clone is genuinely accepted and the owner approves the transition.
