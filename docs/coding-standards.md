# Coding standards — Next.js / TypeScript / Supabase

Project conventions, not a framework or a checklist to add unused code. Apply the relevant rules to each task. Consult current, version-matched official documentation before using unfamiliar APIs; primary references are in [research](research.md).

## Next.js and React

Keep route files readable: obtain validated route/query inputs, call the feature function, render the view. Use real routes and `Link` for navigation; buttons perform actions. Do not reproduce the archived `?view=` scene router. Route groups organize layouts without inventing separate applications.

Server Components are the default. Add `use client` at the smallest interactive boundary and pass only serializable, safe props. Server-only queries, credentials, signing and authorization helpers import `server-only` where supported. Never pass raw database rows or paid content to a client merely to hide it visually [R01–R04](research.md).

Use the installed Next version's request APIs; in the selected current App Router line, handle async params/searchParams/cookies rather than copying old synchronous examples. Respect generated version-matched agent documentation. No experimental caching/offline feature is needed to build the first slice.

Server Actions and Route Handlers are reachable entry points, not implicitly safe private functions. Validate payload shape and limits, verify identity, authorize the specific object/relationship, then mutate. A layout/proxy check is not enough. Restrict return URLs to approved internal paths and never accept arbitrary redirect destinations.

Use `loading.tsx`, `error.tsx`, and not-found handling where the route benefits. Expected validation/access/conflict errors have an intentional user state; unexpected errors are logged with a correlation ID and safe user message. Do not catch and swallow framework redirect/not-found control flow or return fake success.

Prefer native/React form handling and a small Zod schema for boundaries. Add a form library only when the creator editor actually benefits. Preserve input on error; disable duplicate submission while pending; associate errors with labeled fields. Do not use effects to derive values available during render or to mirror all server data into global state.

## TypeScript and module structure

Use strict TypeScript, typed public function inputs/outputs, `unknown` plus validation at external boundaries, and generated database types. Avoid `any`, unsafe casts, broad non-null assertions and duplicated handwritten database schemas. An exception needs a narrow reason, not a project-wide lint disable.

A small feature may have `view.tsx`, `queries.ts` and `actions.ts`; split when responsibilities genuinely diverge. Do not enforce arbitrary file-count/line-count targets, but split components that mix navigation, checkout, authoring and playback. Keep pure business helpers separately testable.

Use concrete functions such as `getPublicCourse`, `getAuthorizedLesson`, `enrollFreeCourse`, `createCheckout`, `applyPaymentState`. Names are illustrative contracts, not required empty stubs. Do not create `BaseRepository`, generic CRUD services, provider factories, an event dispatcher or a service locator.

Avoid barrel exports that drag server code into client graphs. Keep feature-only components beside the feature; promote something to shared UI after actual reuse or a clear primitive role. One icon family, one date/money strategy, one validation approach.

## Data and transactions

Use a request-scoped Supabase server client with the user's token for routine queries. Never keep a user's cookies/client in a module-global singleton. Keep the privileged client in a separate server-only module and authorize the caller explicitly before using it. Do not authorize from user-editable metadata [R05–R07](research.md).

Select explicit fields; avoid `select('*')` across public/private boundaries. Bound pagination and search input. Let database constraints enforce uniqueness and parent relationships. Do not fetch another user's record and hope the UI filters it later.

Use one SQL migration history and generated types. Create migration files through the installed CLI's documented command. A sequence of SDK calls is not atomic: cross-table grant/payment/publication changes use one constrained SQL function or an explicitly chosen transaction path. No new ORM is needed for that alone.

Every exposed table needs reviewed grants and RLS. Test real `anon` and authenticated role behavior, not only service-key queries. Views/functions/storage require their own permission review. Privileged functions have constrained grants/search paths and must not accept an arbitrary caller-selected owner as authority.

Add a migration only for the current slice. Never precreate subscription, affiliate, chat, workflow or generic entitlement tables. Never run remote schema mutations merely because a connector is available; local/test work and production writes have different authorization.

## UI and content

Use CSS variables for the approved visual tokens and Tailwind for composition. Do not ship a generic component-kit theme. Selected Radix primitives provide behavior, not finished accessibility or our styling [R14](research.md). Test focus, keyboard and screen-reader labels in the composed UI.

Prefer semantic elements. No clickable div wrapped around nested interactive controls. Links and buttons have clear names; icon-only controls need accessible labels. Mobile interactions cannot depend on hover. Reserve media aspect ratios and use responsive images; don't fetch a full-size hero for every thumbnail.

Course text is restricted Markdown/plain text initially, with raw HTML and MDX execution disabled. Sanitize allowed rendering and restrict link/embed schemes. No remote arbitrary code execution, creator-provided scripts, or unreviewed iframe embeds. User-uploaded SVG is not an unrestricted image format.

Use original/licensed imagery and real or clearly fictional fixture identities. Do not copy Apple artwork, Mobbin watermarks, or proprietary font files into product assets. Never invent testimonials, earnings, purchase counts or professional credentials.

## Performance and dependencies

Measure before adding caches or state frameworks. Start with bounded queries, appropriate indexes, selective fields, sensible image sizes and small client boundaries. Parallelize independent reads; avoid serial query waterfalls and N+1 curriculum queries. Do not optimize by bypassing authorization.

Add packages when a task uses them. Commit one active app lockfile; pin runtime/package manager; inspect peer compatibility and advisories. No Redux/Zustand/TanStack Query, rich editor, queue SDK, analytics SDK or second icon kit by default.

## Verification and handoff

Run type/lint/build plus focused tests appropriate to the change. UI changes require browser checks and screenshots; permission changes require negative cross-user/cross-workspace tests; payment changes require sandbox retry/refund evidence. Do not update a screenshot baseline simply to make a failing visual test pass.

Update the owning doc only when a contract changes, and update the assigned task with actual evidence. State blocked checks explicitly. No source images, secrets, generated build outputs, node_modules or unrelated formatting churn in commits.
