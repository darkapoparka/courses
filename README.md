# Courses — Apple Music clone first, Astra-guided engineering

This repository has one active application: `apple-music-clone/`. First finish its saved Apple Music reference screens and recorded interactions to genuine 1:1 fidelity. After acceptance and the owner's explicit go-ahead, evolve that implementation into a course-selling and learning/community platform. A new model or documentation branch is not permission to skip the clone.

## Start here

Read [the working contract](AGENTS.md), [current handoff](docs/handoff.md), [development runbook](docs/development.md), and the relevant entries in [the single acceptance checklist](docs/tasks.md). The [documentation map](docs/README.md) separates current implementation guidance from future product requirements. The [Astra guide](docs/astra/README.md) explains the source register, skills, and task prompts.

## Branch status

`astra-pro` was created from `289c049cc3e198baa762cd89850f744e80e99ff2` on 2026-09-12 for this revision. The connected Windows checkout was not switched: it was on `main` with four modified and two untracked UI files when the remote connection ended. Those unpublished changes are not included merely because the new branch exists. Follow the [preserving transition procedure](docs/astra/branch-transition.md) before adopting it locally.

## Acceptance is not implementation coverage

The recorded checkpoint reports UI 159/159, MATCH 0/159 and complete FLOW 0/58. The archive contains 159 screen identities, 58 flows, 218 ordered steps and 13 available motion assets. These are separate coverage and acceptance dimensions, not a claim that the clone is finished. A documentation revision changes none of those approvals.

## Preview

From the existing app directory, with its locked dependencies installed:

```powershell
$env:REFERENCE_PREVIEW='1'
npm run dev -- --hostname 127.0.0.1 --port 6431
```

Verify process ownership and the actual browser before using `http://127.0.0.1:6431/`. Port 3000 may belong to another application. The preview uses local account, payment and media behavior; no production deployment or Apple integration is authorized.

## Preservation

The original reference archive and dated review evidence remain unchanged. Pre-Astra documentation is retained in [history](docs/history/README.md). Production adaptation will require independent branding and licensed assets, not redistribution of Apple's source imagery or fonts.
