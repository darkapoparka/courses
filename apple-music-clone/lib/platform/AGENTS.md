# Platform data contract

Follow `../../../docs/architecture.md`. Catalog DTOs are public metadata, not protected content. Lesson bodies belong behind `server-only`; evaluate access before returning them through any route, action, resource or media endpoint.
The current free/sample policy is explicitly a demo policy. localStorage, bookmarks, progress, role strings and success URLs must never grant paid or enrolled access.
Treat persisted browser data as untrusted. Validate versions, IDs, relationships, lengths and dates; preserve unreadable/future data without automatically overwriting it. Additive schema changes need old-state tests and bounded projections. Do not silently turn local notes or posts into account/public content.
Keep stable immutable snapshots for external-store consumers and deterministic hydration. Report storage failures; never turn a failed write into a success message. Local conflict detection is not a transactional backend guarantee.
Every real backend read/write needs verified identity and object-level permission; test cross-user/workspace denial. SQL constraints and migrations own durable invariants. Privileged credentials stay server-only. Candidate providers are not configured integrations.
Pure validation needs domain tests; authorization, persistence and idempotency additionally need real separate-user integration tests. Preserve original demo content and never import the music reference archive into the commercial catalog.
