# Technology baseline

## Installed clone — repository observations

At the inspected baseline, `apple-music-clone/package.json` specifies Next.js 16.3.4, React and React DOM 19.2.8, TypeScript 7.0.2, and Tailwind/PostCSS 4.3.3. `pnpm-lock.yaml` is the existing dependency authority. These are observed repository versions, not a claim that they are the latest or a new recommendation to install them elsewhere.

Preserve the existing combination during fidelity repairs. Use the locked install procedure in [development](development.md) only when needed. Read the framework-generated instructions and relevant version-matched `node_modules/next/dist/docs/` guides. Resolve unfamiliar APIs against the installed version, not examples recalled from an older release.

QA remains isolated Python/Playwright plus the repository's Node checks. Do not change application dependencies just to take screenshots. The current package scripts, rather than an invented lint/test command, define available checks. No new OpenAI SDK, model setting, backend provider or design-system package is introduced by this revision.

## Agent tooling

The Git branch is named `astra-pro`. Branch naming does not select a ChatGPT model, grant Pro access or configure an API model. [Astra guidance](astra/README.md) separates project instructions, workflow skills, live documentation access and optional client configuration. Consult the current official model guide before any actual model/API migration.

Repository-local skills are instruction files under `.agents/skills/`. Their presence in Git does not prove that a particular client has loaded them; verify discovery in that client. Global settings, connectors and credentials are separate and must not be silently overwritten.

## Deferred product candidates

| Area | Recommendation for later evaluation | Boundary |
| --- | --- | --- |
| Frontend | Continue the existing Next.js / React / TypeScript app | Preserve accepted visual work; no fresh `web/` scaffold |
| Styling | Existing custom CSS/tokens, selected accessible primitives as needed | No generic theme or icon substitution during exact cloning |
| Data / identity / files | Supabase Postgres, Auth and Storage | Not configured; requires current SDK/SSR/grants/RLS review |
| Commerce | Stripe Connect and hosted Checkout | Business model, supported markets and test integration first |
| Media | Managed ingest/playback such as Mux | Validate authorized upload, captions, private playback, cost and limits |
| Hosting | Vercel as an initial candidate | No production deployment authorized |

Revalidate compatibility, supported runtimes, security advisories, pricing and provider eligibility at the actual integration task. Retained vendor references are in [research](research.md); they are not refreshed facts merely because this file was rewritten.

No default requirement for an ORM, global client store, rich editor, queue framework, realtime feed, analytics SDK, vector database, custom transcoder, subscription engine or AI tutor. Record a concrete need, simplest alternative, operational cost and migration impact before adding one.
