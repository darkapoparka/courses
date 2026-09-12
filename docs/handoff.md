# Current handoff — local Astra adoption

Updated 2026-09-12. Task `DOCS-ASTRA-LOCAL`: adopt and reconcile the GPT web documentation and local workflows. The product phase remains Apple Music clone finalization, followed by an explicitly authorized courses adaptation.

## Work here

**`J:\courses` → `astra-pro` → `apple-music-clone/`.** Adopted from `67a44c41a43aa0bead23b3e665c844e6403828ba`, which includes committed `main` at `289c049`. No new worktree, merge to main, dependency upgrade or frontend redesign. The original preview remains on `main`; the four historical course-preview commits remain on `astra/implementation` at `8a5c078`.

Eleven unpublished UI/test files from `J:\courses-astra-preview` were copied here, checked against SHA-256 snapshots and left uncommitted. They cover station artwork, sidebar glass, native scrolling and Home carousel boundaries. They are **not included in the documentation commit or certified by its CI**. Exact filenames, source provenance and recovery paths are in [the transition record](astra/branch-transition.md). Existing work remains recoverable in its original checkout and in `J:\courses\.git\local-adoption\20260912-astra\`.

Root/app instructions, runbook, current branch header, source register and matching project skills are reconciled. Two obsolete untracked parity drafts were parked outside active docs; historical docs, course work, local evidence and reference files were preserved. The existing clone CI now covers `astra-pro` without removing checks.

## Verification of this adoption

Passed: nine documentation unit tests; the contract validator (34 active documents, four skills, ten source records); the existing task coverage checker; all four skill-creator structural validations; and `git diff --check`. Separate checks confirmed all 378 checkbox lines unchanged, all 577 reference files hash-identical, both copies of the eleven pending files equal to their source snapshot, original preview provenance retained, and only two branch-filter changes in the runtime workflow. See [verification](astra/verification.md).

No local application build, browser audit, provider call or visual acceptance was run. Inspect the actual pushed SHA and its CI runs; the final task report records their observed status. Runtime CI on this documentation commit covers committed application code only.

Python 3.13.1 and Node 24.21.0 are available locally; CI uses Node 22. Installed packages match the existing manifest: Next 16.3.4, React 19.2.8, TypeScript 7.0.2 and Tailwind 4.3.3. No install was performed.

## Last recorded runtime evidence — inherited

Implementation `a30a9ee` recorded 159 desktop captures, five responsive samples, 218 route checks and 51 interaction regressions with no failures, plus type/build/archive/coverage and tooling checks. [The dated review](reference-review/2026-09-12-sidebar-live.md) retains exact hashes, failures, residuals and [CI run 34680539220](https://github.com/darkapoparka/courses/actions/runs/34680539220). Those results were not rerun or extended to the pending batch here.

Acceptance remains **UI 159/159, MATCH 0/159, complete FLOW 0/58**. The task IDs, checkboxes and recorded evidence are preserved. Course adaptation and owner acceptance have not occurred.

## Next bounded implementation action

Verify the transferred Home batch for `UI-2f5da478`, `UI-d5173715` and its affected `FLOW-bc2a77fc` states. Inspect the exact originals/recording and current diff, establish a stable optimized candidate, run the existing archive/type/build/tooling checks and full browser/comparison corpus because shared CSS changed, then inspect the source/live/difference images and real carousel/scroll controls. Fix demonstrated regressions within that batch, record its evidence, and checkpoint it separately on `astra-pro`. A carousel segment alone does not accept the entire six-step Home flow.

Runtime ownership is unresolved: ports 6431–6433 were occupied but process command lines could not be read. No listener was changed or declared to serve this checkout. Establish actual ownership before starting a candidate and avoid simultaneous builds into one `.next` directory. Use [the runbook](development.md); do not repeat adoption or scaffold another application.
