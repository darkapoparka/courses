# Security, privacy and marketplace trust

Security is part of each slice, not a giant security platform to build first. These are engineering requirements and launch review areas, not a legal opinion or certification.

## Permission matrix

| Actor | Allowed | Explicitly denied |
| --- | --- | --- |
| Anonymous | Published safe catalog/creator metadata and intentional public previews | Drafts, paid content, private profiles, orders, provider mappings |
| Learner | Own profile/bookmarks/progress/notes; authorized course content; own purchase/support state | Other learners' records, self-granted access, creator/provider/operator fields |
| Creator owner | Own workspace drafts, private previews, approved submission, own sales summaries and course questions | Other workspaces, buyer private notes, direct paid-grant writes, self-publication bypass, editing locked published content |
| Operator | Explicit review, report, suspension and support/reconciliation actions with reasons | Unnecessary learner private-note access, arbitrary SQL UI, unlogged privileged changes |
| Verified provider integration | Narrow mapped media/financial state updates | Unverified browser events, arbitrary ownership or role changes |

One user may be learner and creator. Workspace ownership and operator assignment are database facts, not user-editable JWT/profile metadata. Sensitive requests check current account/workspace suspension and authority, not only a possibly old token role.

## Access and data controls

Validate identity, resource ID, parent relationships, payload size/type and authorization at every protected Server Action/Route Handler/data function. UI hiding, middleware/proxy, URL nesting, and a layout redirect are not complete protection [R02–R03](research.md).

Use least-privilege grants plus RLS for exposed tables and storage. Public metadata and paid content are separated. Review views/functions as carefully as tables; privileged credentials/functions require restricted usage and execution grants. Test direct API requests using real anonymous/learner/creator roles, not only service credentials [R06–R07](research.md).

Never expose provider/admin/signing secrets through `NEXT_PUBLIC_`, client props, logs, source maps or screenshots. Avoid shared caching of user/cookie-bearing responses. Use the current Supabase SSR verification/refresh guidance and account for the fact that token verification is not a fresh authorization lookup [R05](research.md).

## Input, upload and abuse limits

Bound search queries, mutation bodies, note/post lengths, upload sizes/duration/count, token issuance and checkout attempts. Add appropriate per-account and network rate controls on auth, uploads, signing and payments; do not claim in-memory limits survive serverless scaling. Use provider protections plus a deliberately selected durable/hosting mechanism when implementing the public endpoint, not an untested blanket rate-limiter package.

Render restricted Markdown/plain text without raw HTML or executable MDX. Reject unsafe URL schemes and unreviewed embeds. Image uploads allow only supported decoded formats; reject unrestricted SVG/HTML. Private PDF/source archives still need allowed-type/size checking and a malware/review process before public creator onboarding. Never run uploaded course code on our server.

Allowlist redirect/callback origins. First-party mutations need appropriate origin/CSRF protections; do not exempt all routes because signed provider webhooks need a different verification path. Webhooks verify raw-body signatures and environment/account mapping.

## Content trust

Use actual creator identity/credentials and licensed assets. No fabricated reviews, counts, certifications or guaranteed-income claims. Broad education categories do not imply permission to sell every claim within them. Review scam/deceptive business claims, unsafe health advice, copyright complaints and provider eligibility; do not turn the platform into financial execution/custody or medical diagnosis software [R18](research.md).

Curated publication review is sufficient initially; there is no need for an AI moderation pipeline. A report produces a real restricted operator record and a reviewable action. Record why content was hidden/suspended and the support/appeal path. Creator ownership does not permit suppressing legitimate criticism or reading private notes.

## Privacy and retention

Collect only what the current product needs. Let the payment provider host identity/KYC and card collection; do not copy identity documents into our storage unnecessarily. Do not include paid lesson content, note bodies or sensitive financial payloads in analytics/session replay. Disable or redact recording on protected surfaces unless deliberately reviewed.

Separate profile/note deletion from retention of necessary financial/audit records. Provide a working verified support process for access, export and deletion requests before live launch; a sophisticated self-service privacy dashboard can come later. Document processors, data regions, retention, breach response, account suspension and support responsibility for the actual operating markets.

An adults-only pilot is a proposal, not a claim that an age checkbox supplies legal compliance. Child participation requires a separate deliberate policy. Health information, learner submissions and private communities may introduce additional data risks; don't collect them opportunistically.

## Commercial/legal launch checks

Resolve actual merchant and seller identity, supported buyer/creator countries, tax/invoice responsibility, payouts, platform fees, refund/access terms, provider restrictions, and consumer notices. Digital-content withdrawal rules can depend on consent and the transaction; do not simply copy a no-refunds banner [R11, R18–R19](research.md). Obtain qualified review for the real entity and launch jurisdictions.

Reference possession does not establish redistribution or product-use rights. Preserve the existing archive, keep it outside production, and do not expand distribution or change repository visibility without the owner. Production uses independent branding/assets/fonts.

## Mandatory adversarial checks

Try learner A reading learner B's notes/orders; creator A attaching creator B's media or editing their course; modifying ownership/status fields directly; reading paid content through HTML/RSC/search/storage/API; forging checkout success; replaying duplicate/late refund/payment events; requesting tokens after grant revocation or suspension; editing a submitted/published lesson via direct API. Every relevant negative case must be tested in its owning task.

Privileged operator actions need a named actor, reason, current authorization and audit. Before live operation, strengthen operator/provider account authentication and document recovery. No destructive remote writes or security promises based only on an apparently working UI.
