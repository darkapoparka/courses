# Courses — Apple Music clone first, Astra-guided engineering

This repository has one active application: `apple-music-clone/`. First finish its saved Apple Music reference screens and recorded interactions to genuine 1:1 fidelity. After acceptance and the owner's explicit go-ahead, evolve that implementation into a course-selling and learning/community platform. A new model or documentation branch is not permission to skip the clone.

## Start here

Read [the working contract](AGENTS.md), [current handoff](docs/handoff.md), [development runbook](docs/development.md), and the relevant entries in [the single acceptance checklist](docs/tasks.md). The [documentation map](docs/README.md) separates current implementation guidance from future product requirements. The [Astra guide](docs/astra/README.md) explains the source register, skills, and task prompts.

## Branch status

Use **`J:\courses` on `main`** as the shared baseline. It combines the latest verified clone work with the Astra documentation and project skills. Future work can use bounded `codex/` feature branches or an isolated worktree when useful.

The [transition record](docs/astra/branch-transition.md) identifies the merged histories, preserved older course prototype and any unfinished preview work. The old preview directory retains local evidence and recovery material; it is no longer the primary checkout.

## Acceptance is not implementation coverage

The recorded checkpoint reports UI 159/159, MATCH 0/159 and complete FLOW 0/58. The archive contains 159 screen identities, 58 flows, 218 ordered steps and 13 available motion assets. These are separate coverage and acceptance dimensions, not a claim that the clone is finished. A documentation revision changes none of those approvals.

## Preview

From `J:\courses\apple-music-clone`, with its locked dependencies installed and port 6431 verified free or already owned by this checkout:

```powershell
$env:REFERENCE_PREVIEW='1'
npm run dev -- --hostname 127.0.0.1 --port 6431
```

Verify process ownership and the actual browser before using `http://127.0.0.1:6431/`. Port 3000 may belong to another application. The preview uses local account, payment and media behavior; no production deployment or Apple integration is authorized.

## Preservation

The original reference archive and dated review evidence remain unchanged. Pre-Astra documentation is retained in [history](docs/history/README.md). Production adaptation will require independent branding and licensed assets, not redistribution of Apple's source imagery or fonts.
