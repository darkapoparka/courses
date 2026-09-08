# Development and environment contract

No commands in this file have been executed for the new application. They describe the approved future workflow. The archive does not need installation to inspect references.

## Bootstrap once, in the right directory

At BOOT-001: inspect the current branch and working tree. Keep unrelated local changes. Read the handoff and confirm the Next baseline named in the implementation assignment. Resolve a supported stable `create-next-app` release, inspect its `--help`, and use its official CLI to create `web/` with TypeScript, App Router, `src/`, Tailwind, ESLint and pnpm. Do not handwrite a fake framework scaffold or run the CLI over `apple-music-clone/`.

Use a supported Node LTS, currently Node 24 in the reviewed release table, and a pinned pnpm version [R08](research.md). Record the exact installed Next/React/TypeScript/Tailwind versions, Node patch, package manager and CLI command in the task evidence. The archived package pins are observations, not a lockfile to reuse.

One active application means no root workspace/Turborepo setup by default. Run app commands from `web/`. Preserve framework-generated agent files; add an entry pointing to the root project rules outside generated markers.

## Stages and credentials

| Stage | What runs | Required configuration |
| --- | --- | --- |
| M0 UI | Explicit public fixtures and licensed sample media | None from Supabase, Stripe or Mux |
| M1 data/auth | Local Supabase or deliberately selected nonproduction project | Supabase URL and publishable key; private admin key only for restricted operations that exist |
| M1 video integration | Mux test/development assets and verified callbacks | Server-side API/signing/webhook credentials scoped to the test environment |
| M2 checkout | Stripe sandbox + Connect test account + webhook forwarding | Server secret and endpoint signing secret; never live credentials |
| Production | Reviewed supported configuration only | Separate database/auth/media/payment credentials, exact domains, email delivery, support and budget setup |

Do not create a generalized runtime adapter framework for fixture/live mode. M0 routes explicitly import fixtures and label the UI as a design preview. When a feature gains a live query, replace that import deliberately; tests may still pass explicit fixtures to views. Missing live configuration must fail clearly, never fall back to fictional data or fake success.

All preview/fixture deployments are non-indexable and non-commercial. A successful `next build` does not make the fixture app production-ready. Remove demo data/claims from release routes and verify the live configuration before release approval.

## Environment names at integration time

Create `web/.env.example` with descriptions, empty/example values, and stage requirements. No real key is committed or pasted into documentation.

| Variable | Exposure / purpose |
| --- | --- |
| `NEXT_PUBLIC_SUPABASE_URL` | Browser-visible project endpoint |
| `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` | Browser-visible publishable credential; requires proper grants/RLS |
| `SUPABASE_SECRET_KEY` | Server-only restricted administrative paths; use the project's actual supported key type |
| `STRIPE_SECRET_KEY` | Server-only, sandbox during development |
| `STRIPE_WEBHOOK_SECRET` | Server-only, specific webhook endpoint/environment |
| `MUX_TOKEN_ID`, `MUX_TOKEN_SECRET` | Server-side media API credentials |
| `MUX_WEBHOOK_SECRET` | Server-only callback verification |
| `MUX_SIGNING_KEY_ID`, `MUX_SIGNING_PRIVATE_KEY` | Server-only signed-playback credentials |
| `APP_URL` | Validated canonical app origin for safe server-generated callbacks/links |

These are proposed application variable names, not a claim every SDK reads them automatically. Read/configure them explicitly and validate at the integration boundary. Do not import a module that demands every future provider secret just to render a public fixture page. Hosting encryption/multiline key formatting and callback URLs must be tested, not guessed.

## Local database and test data

At DB-001, use the official Supabase CLI and its local container prerequisites [R15](research.md). Inspect the installed command help for initialization, start, migration creation/reset and type generation. Run from `web/` so one `supabase/` directory owns the schema.

Use deterministic fictional seed users: learner A, learner B, creator A, creator B and operator; courses in different workspaces; public preview, free and paid/locked lessons; pending/fulfilled/refunded orders when M2 exists. Seed privileged fixtures through test setup, never an application endpoint that lets any user self-assign roles.

A destructive local reset is allowed only against the identified disposable local test database and after checking its URL/context. Never reset/pull/overwrite production data to fix a development issue.

## Command contract after scaffold

BOOT-001 adds and verifies actual package scripts. Until then the following are intended script names, not existing commands:

```sh
cd web
pnpm dev
pnpm typecheck
pnpm lint
pnpm build
```

The test-owning tasks add `pnpm test` and `pnpm test:e2e` when tests exist. Do not use a removed `next lint` convention; configure the installed ESLint tool directly according to current Next guidance. Do not add pass-with-no-tests flags and describe them as coverage.

Use a locked install in CI. Browser tests should start the app deterministically and never depend on live providers. Integration tests target local/staging disposable data. Provider-specific sandbox exercises remain separate documented checks.

## Failure handling and release isolation

Keep raw provider secrets, access tokens, paid transcripts and private note text out of logs. Use safe correlation IDs. If a callback fails, inspect signature, raw body, environment, account mapping and provider event status before changing business logic.

Deploy `web/` only. Preview environments must not contact live checkout/payout endpoints or production auth/data. A cloud connector being connected is not consent to create resources or publish an application. See [quality and operations](quality-and-operations.md) for the release checklist.
