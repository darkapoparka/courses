# Documentation map

Baseline: 2026-09-08. These documents describe a proposed product, not a shipped platform or approved set of final visual designs.

| Document | Owns |
| --- | --- |
| [Platform](platform.md) | Product purpose, audience, differentiation, business scope and success hypotheses |
| [Features](features.md) | Launch versus later feature boundaries and user acceptance criteria |
| [Reference audit](reference-audit.md) | Repository findings, acquisition provenance, evidence limitations and reference-review workflow |
| [Design system](design-system.md) | Visual/interaction direction, mobile behavior, component and asset contracts |
| [Screens and flows](screens-and-flows.md) | Route map, required screens/states, navigation and end-to-end journeys |
| [Tech stack](tech-stack.md) | Current framework comparison and recommended tools |
| [Architecture](architecture.md) | Application boundaries, rendering, authorization, APIs and integration ownership |
| [Data model](data-model.md) | Entities, tenant relations, constraints and lifecycle invariants |
| [Commerce and video](commerce-and-video.md) | Checkout, access grants, refunds, media ingest and protected playback |
| [Security and trust](security-and-trust.md) | Permission matrix, moderation, content risk, privacy and launch review gates |
| [Quality and operations](quality-and-operations.md) | Test strategy, visual evidence, accessibility, observability, costs and release checks |
| [Tasks](tasks.md) | The single dependency-ordered execution backlog and work status |
| [Decisions](decisions.md) | Confirmed directions, proposals, unresolved approvals and decision history |
| [Handoff](handoff.md) | Exact safe next local-agent assignment and later bootstrap procedure |
| [Research](research.md) | Primary sources, retrieval date and evidence/revalidation notes |

## Document precedence

Current explicit owner instructions govern scope. `../AGENTS.md` governs the workflow. Confirmed decisions in `decisions.md` govern product/architecture choices. Other documents provide the corresponding specification. A task cannot silently change the specification; record the change and its approval. Historical clone notes are evidence, not the product plan.

## Reading by task

For reference/design work, read the reference audit, design system and screen map. For implementation, add architecture and the relevant feature acceptance criteria. For access, money or media, also read data model, commerce/video and security. For verification/release, read quality/operations. Always read the active task and decision statuses first.

## Status vocabulary

`PROPOSED` is a recommendation. `OWNER_APPROVED` requires a dated owner instruction. `VISUALLY_REVIEWED` requires opening an image, not reading its filename. `IMPLEMENTED` requires code. `VERIFIED` requires recorded checks. No generated artifact or document automatically advances another status.

Do not duplicate these files into another planning folder or create competing `prd.md`/`platform.md` specifications. Extend the file that owns the subject.
