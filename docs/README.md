# Documentation map

Baseline revised 2026-09-08 after the higher-resolution/reference-category update. These are build specifications, not implementation or visual-approval claims. The latest explicit owner instruction controls scope.

## Read for the next task, not every file every time

| Work | Read |
| --- | --- |
| First local session | Root AGENTS, platform, architecture, tasks, handoff |
| Scaffold / ordinary frontend code | Tech stack, coding standards, development, assigned task |
| UI adaptation | Reference audit, design system, screens and flows, relevant original images |
| Database / permissions | Data model, security and trust, architecture |
| Checkout / video | Commerce and video, data model, security and trust |
| Verification / release | Quality and operations, current feature acceptance, decisions |

## Canonical files

| File | Owns |
| --- | --- |
| [platform.md](platform.md) | Purpose, audience, positioning, business boundaries |
| [features.md](features.md) | Milestones, feature acceptance, deferred scope |
| [reference-audit.md](reference-audit.md) | Actual repo findings, new archive coverage, inspection limits |
| [reference-review/ledger.md](reference-review/ledger.md) | Exact image inspection evidence; not a guessed catalog |
| [reference-review/flow-coverage.md](reference-review/flow-coverage.md) | Expanded source-flow to implemented-route mapping, with explicit non-goals/provider boundaries; JSON companion preserves all 218 steps |
| [design-system.md](design-system.md) | Visual hierarchy, components, mobile and asset rules |
| [screens-and-flows.md](screens-and-flows.md) | Routes, states, actions, complete critical journeys |
| [tech-stack.md](tech-stack.md) | Baseline tools, alternatives, dependency policy |
| [architecture.md](architecture.md) | App boundaries, data flow, caching, minimal infrastructure |
| [coding-standards.md](coding-standards.md) | Concrete Next.js, React, TypeScript, SQL, and UI conventions |
| [development.md](development.md) | Bootstrap, commands, environment stages, secrets and fixtures |
| [data-model.md](data-model.md) | Phase-specific tables, constraints, access and state invariants |
| [commerce-and-video.md](commerce-and-video.md) | Paid fulfillment, retries, refunds, ingest and playback |
| [security-and-trust.md](security-and-trust.md) | Permission matrix, abuse/privacy/content controls and launch review |
| [quality-and-operations.md](quality-and-operations.md) | Tests, evidence, failure recovery, costs, deployment gates |
| [tasks.md](tasks.md) | Single execution backlog and completion evidence |
| [decisions.md](decisions.md) | Confirmed direction, recommended defaults, open approvals and changes |
| [handoff.md](handoff.md) | Exact first implementation prompt and stop conditions |
| [research.md](research.md) | Dated primary sources and revalidation limits |

Do not duplicate platform into another PRD or tasks into another TODO document. Actual migrations/types, manifests/lockfiles, and tested code become implementation truth; update the owning specification when intentionally changing its contract.

## Precedence and status

Owner instruction → root AGENTS scope → recorded owner decisions → relevant specification → task execution. A task does not silently override a contract. A proposed default may be adopted by the owner assigning the handoff that explicitly names it; agents should record that instruction rather than demand separate approval of every line.

`READY` means a bounded task is specified, not executed. `REVIEWED` requires the stated evidence. `IMPLEMENTED` requires code. `VERIFIED` requires actual checks. `APPROVED` requires owner evidence. Documents and acquisition manifests do not automatically advance any other status.

The first scaffold needs a stack choice and an implementation assignment, not every legal decision or all 159 screen reviews. The first UI slice needs its relevant references, not all future mockups. Live commerce needs the actual commercial, security, provider, and operational gates.
