# Security, privacy and marketplace trust

Status: design requirements and review gates, not a security certification or legal opinion. Apply the current provider/standards guidance in `research.md` and obtain jurisdiction-specific professional review before paid launch.

## Threat model

Protect against cross-creator data access, paid-content theft through unprotected endpoints, forged purchase success, duplicated/reordered webhooks, client-side role escalation, public cache leakage, malicious uploads/rich text, account takeover, creator fraud, misleading education claims, abusive community content and operational mistakes involving money/access.

The system must work for an honest user and remain safe when request IDs, workspace fields, URLs, JWT metadata, price fields and webhook payloads are deliberately manipulated. 'The button is hidden' is not a security boundary.

## Permission matrix

| Actor | May do | Must not do |
| --- | --- | --- |
| Anonymous visitor | Read approved catalog and explicit public previews | Read drafts, paid bodies/transcripts/resources, orders or private profiles |
| Signed-in nonbuyer | Save/follow, manage own account, initiate an eligible purchase | Grant access, set prices, access paid content merely by knowing IDs |
| Entitled learner | Read permitted content; write own progress/notes; participate where membership allows | Read others' notes/orders; modify curriculum or financial truth |
| Creator editor | Edit permitted workspace drafts, uploads, curriculum and approved discussion actions | Inspect other workspaces, privately read learner notes, change payout ownership without permission |
| Creator owner/finance role | Manage authorized workspace members/profile and permitted finance/onboarding operations | Grant global operator power, access all learner PII or bypass course review |
| Operator | Perform assigned review/support/refund/reconciliation actions with reason/audit | Use a general unrestricted personal-data browser or silently alter financial history |
| Provider webhook worker | Process verified, bound events through narrow server privileges | Accept arbitrary client event claims or expose its credentials |

Implement only the roles needed initially, but preserve the scope distinctions. An operator permission should be explicit; it is not an email-domain check or a public profile badge.

## Authentication and sessions

Use current Supabase SSR guidance and verified identity methods appropriate to the operation [S08](research.md). Do not authorize from an unverified browser session object or user-editable metadata. Role/membership changes and suspension need fresh checks for sensitive actions; stale JWT claims cannot be the only source of truth.

Use HTTPS in deployed environments, secure session handling and allowlisted auth redirects. Avoid account enumeration in OTP/error messages. Add abuse controls for OTP attempts/resends, sign-in, checkout creation, posting and uploads. Require appropriate stronger authentication/reverification for finance and operator actions; define recovery and emergency access procedures without creating shared untracked admin credentials.

Review logout/revocation behavior explicitly. Deleting an account record is not proof that all previously issued tokens stopped working immediately. Sensitive operations should check current account/workspace restrictions in addition to identity.

## Authorization, database and storage

Enable RLS and deliberate grants for exposed data. Policies need ownership/tenant predicates on both readable and writable states. Test INSERT/UPDATE/DELETE as well as SELECT, including attempts to reassign another user's/workspace's IDs. Verify view/function behavior and privileges; do not assume a view or privileged function preserves the caller's row policies [S09–S10](research.md).

Keep privileged service credentials out of browser code, public environment variables, logs and generated assets. A server endpoint using privileged credentials needs its own rigorous authorization because those credentials may bypass RLS. Restrict security-definer execution and search paths; do not add privilege escalation to fix a broken query.

Storage policy must bind the requesting user, target workspace, draft lesson and asset path. Private resources must not become public because a bucket-level setting was convenient. Validate relationship and access again before issuing a signed download/playback URL.

## Web/application controls

Validate all boundary inputs and return minimal data. Protect state-changing requests using the framework's current origin/CSRF protections and appropriate explicit checks for custom endpoints. Sanitize restricted rich-text output, use allowlisted embeds and safe links, and configure an appropriate content security policy for the selected media/payment integrations.

Do not fetch arbitrary creator-supplied URLs from privileged infrastructure without SSRF controls. Do not execute uploaded code. Restrict file types/size, quarantine or scan risky uploads where required, and serve downloadable material with safe content disposition/content type. Prevent secrets from entering fixtures, screenshots and support logs.

Review shared caching, redirects, image proxying, webhook body handling, preview links and metadata generation as potential leakage paths. Paid text/transcripts must not appear in anonymous HTML, search indexes or client data payloads.

## Content quality and creator trust

Use a curated/application-based pilot. Require a clear course outcome, truthful prerequisites, actual instructor identity, rights to the material, sample content and enough quality/support information for a buyer to decide. Teaching credentials, completion claims and testimonials must have evidence. Do not fabricate sales, ratings, urgency, endorsements or expected earnings.

Provider payout verification is a financial onboarding signal, not proof that a creator is qualified to teach fitness, finance or coding. Do not display a generic 'verified expert' badge merely because a payout account was connected.

For fitness/health-adjacent content, require appropriate scope, safety framing and escalation/reporting rules; the platform should not present a course as personalized diagnosis or guaranteed treatment. For investing/crypto/business content, prohibit fraudulent schemes, guaranteed-return claims, deceptive testimonials and illegal financial activity. Legitimate education is not the same as custody, trading execution, signals or regulated individualized advice.

Stripe restricts deceptive/get-rich-quick activities and may require review of third-party content platforms and specific business models [S14](research.md). Validate the actual platform entity, seller categories, countries and offer claims before accepting live payments. A generic disclaimer does not make an otherwise prohibited or misleading offering acceptable.

## Moderation workflow

Provide visible reporting for courses, creator profiles, posts/questions/replies and reviews. Capture target, reason, necessary evidence and status. Protect reporter identity. Use a documented operator queue with triage, action, user communication, appeal and audit; do not rely exclusively on creator self-moderation.

Creators can manage their own discussion within defined rules, but should not silently remove legitimate negative reviews or control global dispute outcomes. Keep enough revision/action history for appeals while minimizing unnecessary retained personal content. Suspensions distinguish affected assets/courses/workspaces/accounts rather than using a single destructive global switch for every issue.

Automated moderation can assist later; it is not a substitute for accountable review. Do not implement an autonomous AI ban/refund system without a separately approved policy and tests.

## Privacy and consumer review gates

Before launch, identify the actual operating entity, markets, seller/merchant arrangement, processors, data regions and retention needs. Produce reviewed terms, privacy notice, creator agreement, refund/support policy and relevant consents. Do not ship boilerplate placeholders as finished legal compliance.

For EU digital content, withdrawal/early-access conditions depend on the circumstances and required consumer consent/acknowledgment; review the specific offer and checkout record rather than assuming all digital purchases are automatically nonrefundable [S24](research.md). Marketplace/seller information requirements must be reviewed for the actual model [S25](research.md).

Implement data request/deletion processes with identity verification, clear status and a retention explanation. Financial/audit records may have separate lawful retention requirements; deletion should remove/minimize data appropriately without falsifying transaction history. Private notes are sensitive learner content and should have restrictive defaults. Avoid collecting detailed health/financial personal information just because the platform contains courses in those categories.

Choose an age policy deliberately. An adults-only pilot is a reasonable proposal to simplify initial safeguards, but it is not approved or a guarantee that an age checkbox resolves obligations. Supporting children needs its own parental/privacy/safety design and review.

## Analytics and communications

Collect only events needed to evaluate learning and reliability, with required disclosure/consent for the selected jurisdictions/tools. Separate transactional messages from marketing. Provide notification preferences and avoid sending private notes or paid content into third-party analytics/email payloads. Scrub error logs and define access/retention for support tools.

## Reference and production asset rights

The source repository is public at the audited baseline and already contains third-party reference assets. Review permission for continued public distribution and production use; downloading an asset does not establish a license. Do not change repository visibility or delete archives without owner authorization.

Keep Mobbin/Apple screenshots, logos, music artwork and proprietary font files out of production assets and bundles. Use references to study layout/behavior, and create an independent product identity with original or properly licensed assets. Preserve reference watermarks and provenance; do not present them as our work.

## Security acceptance gate

No paid launch until adversarial cross-tenant/access tests, webhook forgery/replay tests, storage/media permission checks, private-cache checks, dependency/secret scans, operator authorization/audit review and account/payout recovery procedures pass. Record known residual risks, such as the validity window of already-issued playback tokens. Passing automated tests alone is not evidence of complete security or legal compliance.
