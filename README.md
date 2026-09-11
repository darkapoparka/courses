# Courses — Apple Music reference clone first

The active application is `apple-music-clone/`. The current assignment is a true 1:1 working reconstruction of the saved Apple Music reference, **before** adapting it into a courses/community product. Work only on `main`.

Start with [AGENTS.md](AGENTS.md), [the current handoff](docs/handoff.md), [the development runbook](docs/development.md), and [the single screen/flow checklist](docs/tasks.md).

## Acceptance target

The frozen archive contains 159 unique screen identities, 58 recorded flows with 218 ordered steps, standard/high-resolution image variants, and 13 available motion assets. These counts describe reference coverage, not acceptance.

All screen states have implementations. Exact visual matches and complete real-control flow verification remain separate gates. No percentage of resolving routes proves 1:1 fidelity. Course adaptation must wait for genuine 159/159 MATCH, 58/58 FLOW, and owner approval.

## Local preview

From `apple-music-clone/`, use the existing locked dependencies and run:

```powershell
$env:REFERENCE_PREVIEW='1'
npm run dev -- --hostname 127.0.0.1 --port 6431
```

Open `http://127.0.0.1:6431/` and verify the actual browser. Do not assume an existing server on port 3000 belongs to this project. See the runbook for isolated browser tooling, comparison commands, and production-build checks.

## Reference and future product boundaries

Saved evidence lives in `apple-music-clone/reference/originals/`; the local reference index is `index.html`. Preserve the entire `reference/` tree byte-for-byte, including historical QA. Current status belongs in `docs/tasks.md`, `docs/reference-audit.md`, and `docs/handoff.md`.

Account, payment, subscription, and media behavior are local previews, not live Apple integrations. No deployment or production asset redistribution is authorized. The course plans under `docs/` are retained for the later phase; do not scaffold `web/` or replace music semantics before clone acceptance.
