# Local adoption of astra-pro

## Adopted workspace — 2026-09-12

Use `J:\courses` on `astra-pro`; the active app is `J:\courses\apple-music-clone`. This replaces the older suggestion to create `D:\courses-astra-pro`. The owner prefers working with branches in the existing J: checkout. No new worktree was created or removed.

Verified origin: `https://github.com/darkapoparka/courses.git`. Fetched `main` and `astra-pro` without pulling or merging. Remote `main` was `289c049cc3e198baa762cd89850f744e80e99ff2`; `astra-pro` was the supplied GPT web checkpoint `67a44c41a43aa0bead23b3e665c844e6403828ba`. The latter descends from that main commit and includes its committed clone implementation.

Before adoption, `J:\courses` was on `astra/implementation` at `8a5c0780c1709d5cda01b925ee98776002d53a3c`, with no staged/tracked modifications and two untracked draft ledgers. Its four unique course-preview commits (`b731fff`, `9dee4d9`, `14fc434`, `8a5c078`) remain on the unchanged local and remote branch. They were not merged into the clone. `astra/course-platform-plan` remains at `f80d794`. Historical course source and tracked evidence can be read with `git show astra/implementation:<path>`.

After snapshotting local work, the existing checkout was switched normally using `git switch --no-overwrite-ignore --track -c astra-pro origin/astra-pro`. This created only the authorized local tracking branch. The original `J:\courses-astra-preview` remains on `main` at `289c049`, with its staged/unstaged/untracked state preserved.

## Pending source reconciled locally, not committed

The current preview contained eight modified and three untracked files, rather than the six files recorded by the disconnected GPT web session. All eleven were inspected, copied into `J:\courses` and SHA-256 verified against both their source and a recovery snapshot. The tracked patch applied cleanly in a read-only `git apply --check`. No staged changes or deletions were present.

Paths below are relative to `apple-music-clone/`:

| Original status | Files |
| --- | --- |
| Modified UI/styles | `app/globals.css`, `app/reference-fidelity.css`, `components/music-browse.tsx`, `components/music-discovery.tsx` |
| New artwork components | `components/station-artwork.module.css`, `components/station-artwork.tsx` |
| Modified QA | `scripts/browser-reference.py`, `scripts/browser_fidelity_regressions.py`, `scripts/browser_live_fidelity.py`, `scripts/browser_sidebar_material.py` |
| New QA | `scripts/browser_home_controls.py` |

This batch replaces synthetic sidebar tint with station artwork behind glass, adjusts scrollport width, and updates Home carousel boundaries and related regression assertions. That describes the diff, not verified behavior. It remains visible as pending work in both checkouts and is excluded from the documentation commit. No application build, browser audit or visual acceptance was claimed for the transfer.

## Recovery and cleanup

The local recovery directory is `J:\courses\.git\local-adoption\20260912-astra\`. It is Git metadata, not another checkout or a file to commit. `manifest.json` records source branches, full SHAs, original statuses and hashes. Each checkout snapshot contains the index, full binary staged/unstaged patches and copies of pending files. `reconciliation.json` records the verified transfer; `reference-files.before.json` records all 577 reference files.

The obsolete, untracked `docs/reference-review/screen-parity.md` and `.json` were removed from active docs by moving them into `parked-drafts/` in that recovery directory after verifying their snapshot hashes. They were a duplicate course-adaptation ledger, not the authoritative clone checklist. No committed historical document or task checkbox was deleted. Superseded guidance remains explicitly inactive in `docs/history/` and in the retained historical branch.

Switching branches revealed 73 previously ignored course-preview evidence files and three generated `web/` files. Those files, dependency caches and build directories were retained in place. The root ignore rules now cover these known historical outputs; they do not hide the eleven pending clone files. No reference images, recordings, evidence junctions, backing storage or original preview files were removed. All 577 reference files were hash-checked unchanged after adoption.

J: had approximately 2.85 GiB free at preflight. Avoid another full checkout or speculative installs. Evidence junctions in the original preview include `D:\courses-storage-relocation\20260912-194335\...`; preserve the actual link and target rather than relying on older path descriptions.

## Continuing and checkpointing

Start by inspecting `git status`, the handoff and the current eleven-file diff in `J:\courses`. Recheck the original snapshot/source if another session has continued; do not blindly recopy or overwrite either side. Continue normal branches in this checkout when explicitly assigned. Retiring the old dirty preview or merging into `main` is separate work requiring an explicit instruction.

The reference CI workflow now includes `astra-pro` in both its push filter and job condition; all existing checks and artifact steps are retained. Verify the copied batch's exact runtime candidate before its first code checkpoint, then inspect that commit's CI. Docs CI and a docs-only commit's clone CI do not certify uncommitted code. See [verification](verification.md) and [handoff](../handoff.md) for actual outcomes.

Ports 6431, 6432 and 6433 were occupied during adoption, but process command lines were unavailable. No existing server was started, stopped, replaced or declared healthy. Before runtime verification, establish checkout/build identity and use a confirmed available loopback port; never build concurrently into another process's `.next` output.
