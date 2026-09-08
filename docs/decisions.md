# Decision register

Revised 2026-09-08. Confirmed owner direction and recommended implementation defaults are different. No production vendor/account/market approval is implied.

## Owner direction

| ID | Direction | Basis |
| --- | --- | --- |
| C-01 | Independent multi-creator course platform across legitimate subjects | Original request |
| C-02 | Apple Music visual reference, not generic low-quality UI | Supplied collection and updated reference archive |
| C-03 | Inspect and write agent docs now; avoid premature implementation | Original and current request |
| C-04 | Best-fit modern stack, practical architecture, no overengineering | Original stack request and current clarification |

## Recommended build defaults

| ID | Default | Status / consequence |
| --- | --- | --- |
| D-01 | Next.js App Router, React, strict TypeScript | RECOMMENDED; adopted when owner assigns handoff naming this stack; do not reopen during every feature |
| D-02 | Supabase Postgres/Auth/Storage; SQL migrations + generated types | RECOMMENDED; no ORM or second auth provider by default |
| D-03 | One active app in `web/`; preserve archive | RECOMMENDED app path; archive preservation required by current scope |
| D-04 | Custom tokens/Tailwind + selected accessible primitives | RECOMMENDED; no generic visual theme |
| D-05 | Free enrollment + one-time course sales | RECOMMENDED pilot model; subscriptions/bundles later |
| D-06 | One course / one seller per order | RECOMMENDED; no cart, generalized offers or order-items framework |
| D-07 | Stripe Connect + hosted Checkout | RECOMMENDED, business/provider eligibility dependent; charge model still open |
| D-08 | Mux direct upload and signed playback | RECOMMENDED; validate integration/cost before real usage |
| D-09 | Mobile Home / Search / Library / You | PROPOSED DESIGN; validate in first UI slice |
| D-10 | Focused lesson page; pause on leave, resume affordance elsewhere | PROPOSED DESIGN; no persistent multi-route mini-video in pilot |
| D-11 | Curated creator pilot, not unrestricted publishing | RECOMMENDED rollout |
| D-12 | Short atomic webhook handler + provider retries + reconciliation; no custom job framework | REVISED RECOMMENDATION; measured limits/queue trigger in architecture |
| D-13 | Supported Node LTS / pinned pnpm / initially Vercel hosting | RECOMMENDED; no deployment authorized now |
| D-14 | Light first, original/licensed production assets | RECOMMENDED scope; rights required |
| D-15 | One owner per creator workspace; team roles/invites later | NEW RECOMMENDATION; reduces pilot tenancy complexity without mixing creators' data |
| D-16 | Draft editing, locked submission/published content, audited operator corrections | NEW RECOMMENDATION; no full course versioning engine initially |
| D-17 | Explicit fixture UI first, then real free journey, then paid pilot | NEW RECOMMENDATION; no provider credentials needed for M0 |
| D-18 | Notes and lesson questions in paid pilot; spaces/reviews/follows later | REVISED SCOPE; community remains direction, not a first-scaffold dependency |

No default is reported as owner-approved without the actual instruction. Sending the exact handoff is sufficient to adopt its named stack/scope for that slice; do not create a ritual requiring separate approval for routine implementation decisions. Final visual acceptance and release approval remain separate.

## Decisions by the time they are needed

| Gate | Resolve | Does not block |
| --- | --- | --- |
| Before BOOT-001 | Implementation assignment naming/adopting the stack | Already authorized reference/docs work |
| Before each UI family is accepted | Relevant source selection, course layout, responsive behavior and assets | Framework scaffold and unrelated backend design |
| Before paid integration | Actual entity/markets, merchant/charge model, fee/tax/refund/access assumptions and test account configuration | M0 and free alpha |
| Before live paid pilot | Provider eligibility, supported sellers/currencies, final terms/consent, privacy/retention/age policy, rights, support owner, budgets/recovery/security evidence | Sandbox testing |
| Before expanding product | Actual pilot need and scoped feature decision | Existing bounded implementation tasks |

Open specifics include brand/name; operating company and buyer/seller countries; merchant identity and `on_behalf_of`/charge choice; fee and refund/transfer responsibility; access duration and major updates; content-platform/category eligibility; age/child policy; data regions/retention; reference and production asset rights; support/moderation responsibility. Record answers here rather than asking the same questions in every agent session.

## Change history — why the plan got smaller

The planning commits `3bb3a35` and `ef0140d` proposed a broader launch with a durable outbox/leased worker, richer revisioning, team memberships, generic offers/order items, creator spaces and more operator surfaces. Those were proposals, not implemented code.

This revision supersedes those defaults with D-12/D-15–D-18 and the phase-specific data model. It removes speculative implementation work while retaining actual payment/access, content-review, privacy, and recovery requirements. Full reference catalog review and all-page golden mockups are no longer global blockers for a first scaffold or one owner-assigned UI slice.

A future change records date, evidence/owner, problem, selected option, rejected simpler alternative, migration cost and affected docs/tasks. Preserve superseded reasoning in Git history; do not revive it by reading an older branch note out of context.
