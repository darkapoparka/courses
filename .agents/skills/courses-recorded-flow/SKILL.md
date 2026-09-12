---
name: courses-recorded-flow
description: Implement or verify a recorded Apple Music journey in this repository using real controls; not a set of fixture-route checks.
---

# Recorded flow verification

Project-authored workflow. Read the named FLOW entry in `docs/tasks.md` and the entire ordered sequence in `apple-music-clone/reference/originals/flow-screen-map.json`. Follow the root/app preservation and phase contract.

Identify the permitted initial fixture, every intermediate source, required account/catalog/library/playback state and applicable motion assets. Establish the actual server/candidate identity. Initialize once at the allowed start, then use real controls through all recorded actions, including menu/form states, scroll, close/back and resulting persistence.

Record ordered unique screenshots and `steps.jsonl`; revisiting a state must not overwrite earlier evidence. Use each original's exact viewport. Compare continuous checkpoints to both the originals and their direct fixtures. Register any new reusable browser suite in the canonical runner and execute it before reporting coverage.

When source snapshots disagree, investigate the recording and legitimate scenario transition. Do not inject state, force clicks, jump URLs or replace unrelated session data behind a hover/toggle to make the endpoint look right. Diagnostic shortcuts cannot be reused as acceptance evidence.

Report completed actions, missing steps, source/candidate identity, visual residuals, console/resource failures and evidence paths. A partial regression or successful endpoint is not the complete FLOW entry. Update only the existing task when all required behavior and visual evidence justify it; owner transition approval remains separate.

See `docs/screens-and-flows.md`, `docs/development.md` and `docs/quality-and-operations.md` for detailed contracts.
