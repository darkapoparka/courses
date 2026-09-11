# Documentation map

## Current assignment

Finish the existing Apple Music clone to true 1:1 screen and interaction fidelity. Only then, with owner approval, adapt it into a courses/community product. Work only on `main`; the working app is `apple-music-clone/`, not a new `web/` scaffold.

## Read in this order

| Document | Authority and purpose |
| --- | --- |
| [Root agent contract](../AGENTS.md) | Branch, preservation, phase boundaries, and honest acceptance rules |
| [Handoff](handoff.md) | Actual source checkpoint, running server, evidence, and next work |
| [Development runbook](development.md) | Reproducible setup, capture, comparison, testing, and checkpoint commands |
| [Tasks](tasks.md) | The single 159-screen / 58-flow completion checklist; UI, MATCH, and FLOW are separate |
| [Current audit](reference-audit.md) | Findings, verified scope, residuals, and historical audit context |
| [Source review ledger](reference-review/ledger.md) | Dated source observations, not automatic implementation acceptance |
| [Decisions](decisions.md) | Current owner direction followed by historical decisions |

The source archive and acquisition reports are under `apple-music-clone/reference/`. Preserve them byte-for-byte. Current implementation status belongs in the active documents above, not rewritten acquisition-era reports.

## Deferred courses/community phase

The platform, architecture, data, authoring, media, commerce, security, and component specifications in this folder are retained planning material. They do not authorize course copy, a second app, new providers, production infrastructure, subscriptions, or deployment during clone finalization. Read them only for an explicitly assigned later-phase task.

## Avoid status drift

Do not create another task list or call all implemented routes "done." Update `tasks.md` with reviewed evidence, `reference-audit.md` with findings, and `handoff.md` with the actual tested checkpoint. Keep local screenshots and experiments in ignored `.parity-evidence/` and `.qa/` directories; retain their source/candidate hashes and reproduction commands.
