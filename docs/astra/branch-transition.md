# Main consolidation and local workspace

## Current workspace - 2026-09-12

The owner explicitly requested a complete shared `main` in `J:\courses`, superseding the earlier astra-pro-only adoption. The active app remains `J:\courses\apple-music-clone`. On 2026-09-13 the owner further required **one implementation checkout and one working branch only**: `J:\courses` on `main`. Do not create or switch implementation branches/worktrees unless the owner explicitly reverses that rule.

Origin: `https://github.com/darkapoparka/courses.git`. The integration combines:

| Source | Work retained |
| --- | --- |
| `main` at `e6a71f77478585d4dd35d4133d5cb71667d32618` | All preceding clone work, the eleven-file Home artwork/control fix `4c8840a`, and its newer verification review/metrics |
| `astra-pro` at `eae1effd4ae674130af4bd60c1fdcb77585e5b99` | GPT web documentation checkpoint `67a44c4`, Astra guidance, four project skills, validators and local adoption records |
| `astra/implementation` at `8a5c0780c1709d5cda01b925ee98776002d53a3c` | Four superseded course-preview commits, preserved through a history-only merge; their `web/` app and evidence stay available in Git history, without activating a second app |
| `astra/course-platform-plan` at `f80d794` | Already contained in the earlier main history |

The historical course merge deliberately keeps the current active tree. This preserves all four commits (`b731fff`, `9dee4d9`, `14fc434`, `8a5c078`) and their original files as ancestors of main. Inspect them with `git show 8a5c078:web/README.md` or `git log 8a5c078 -- web`; recover specific useful files during an assigned course adaptation. Do not treat superseded `web/` instructions as current rules or deploy that prototype.

## Reconciliation

At the earlier adoption, eleven source/test files were copied from the preview into J:\courses and left pending. The other session subsequently committed those exact files in `4c8840a` and verified them before recording `e6a71f7`. All eleven local copies were compared to main's blobs, allowing an ordinary index-preserving switch into main without discarding any work.

The original `J:\courses-astra-preview` was moved to `codex/preview-preserved-20260912` at the same commit to release main for the primary checkout. Its files, pending edits, dependencies, running previews and evidence were retained. Newer edits appeared there during consolidation; consult [handoff](../handoff.md) for their integration state rather than blindly recopying or clearing that checkout.

A normal merge combines the Astra guidance with newer main evidence. The three overlapping documents - handoff, audit and tasks - retain the concise Astra structure and the newer Home verification results. The authoritative checklist and all original references are preserved. Both CI workflows now cover relevant main pushes and pull requests into main; no existing runtime validation step is removed.

## Recovery material

Before consolidation, `J:\courses\.git\local-adoption\20260912-main\` captured both checkout heads/statuses, indexes, binary patches, explicit pending-file copies and SHA-256 hashes. This is Git metadata, not a second application or committed source. Later source transfers require a fresh stable snapshot if another session continues editing.

The preceding adoption snapshot remains at `J:\courses\.git\local-adoption\20260912-astra\`. It contains the original indexes/patches/files, `manifest.json`, `reconciliation.json`, all 577 reference hashes, verification logs and two parked obsolete draft ledgers. Those untracked draft ledgers were duplicate course planning material; `docs/tasks.md` remains the only active acceptance checklist. Superseded committed documentation is preserved in `docs/history/`.

Previously ignored course evidence, generated `web/` files, dependencies and build directories remain locally. Do not delete ignored outputs just to make the folder appear smaller. Preview evidence includes junctions backed by `D:\courses-storage-relocation\20260912-194335\` and older D: locations recorded in the dated reviews; preserve both the links and their backing data.

## Preview retirement — 2026-09-13

Before retirement, the former preview branch had **0 commits unique versus main**. Its dirty files were compared against main: six were byte-identical and main's differing `browser-reference.py` was the newer copy because it additionally registered discovery-shelf regressions. A binary patch plus both former untracked files were backed up under `D:\courses-main-transfer\20260913-retire-preview\`.

Port 6431 was positively identified as the preview checkout and stopped. `git worktree remove --force` removed the worktree registration, and local branch `codex/preview-preserved-20260912` was deleted. `git worktree list` now contains only `J:/courses` on `main`. Windows could not remove the residual physical `J:\courses-astra-preview` directory, so it has no `.git` metadata and contains `RETIRED_DO_NOT_USE.txt`; never use it for source. The QA interpreter was recreated and verified at `D:\courses-main-qa\audit-venv\Scripts\python.exe`.

## Continuing safely

Use **only** `J:\courses` on `main` for new implementation work. Fetch and inspect status/incoming commits without switching branches. Preserve dirty work already on main, commit coherent verified checkpoints directly to main, and use ordinary non-force pushes. Historical recovery material is not a second product baseline.

Existing preview listeners were left alone. Establish checkout, source/build identity and a free loopback port before runtime checks in the primary checkout. Do not build into a `.next` directory used by another process or assume a historical server PID is still current. [The runbook](../development.md) owns commands; [verification](verification.md) and [handoff](../handoff.md) own actual outcomes.
