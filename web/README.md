# Courses web — expanded interface preview

The active application is this directory, not `apple-music-clone/`. Canonical product, architecture, decisions and task evidence live in [`../docs/`](../docs/README.md).

## Run locally

Use pnpm **11.24.0** and the pinned app-local Node **24.20.0**. `devEngines.runtime`, `.node-version` and `.nvmrc` record the runtime; pnpm selects it without changing the global Node installation.

```sh
cd web
pnpm install --frozen-lockfile
pnpm dev
```

Open **http://127.0.0.1:3100** on the same computer. The server binds to loopback only. No environment file or Supabase, Stripe or Mux credentials are required.

## Working routes and journeys

| Family | Entry points |
| --- | --- |
| Home and discovery | `/`, `/new`, `/browse`, `/browse/fitness`, `/search?q=Maya`, `/for-you`, `/previews` |
| Course and creator | `/courses/useful-ai`, `/courses/useful-ai?sample=learner`, `/creators`, `/creators/maya-chen` |
| Library and study lists | `/library`, `/library?layout=list`, `/library?tab=saved`, `/library/lessons`, `/collections` |
| Learning workspace | `/learn/useful-ai/lesson-1?sample=learner` or `?sample=visitor` |
| Account interface | `/settings`, `/settings/purchases`, `/auth/sign-in`, `/auth/verify`, `/help` |
| Isolated reference studies | `/preview` links event/location, channel/schedule, recap/milestone, code-entry preferences and language-selection demonstrations |

Navigate search → course → public sample or returning-learner lesson. Save a course and find it in Saved; add it to a list, reorder it, edit the list or delete it with confirmation. The player supports native playback/seeking/captions/fullscreen, speed, repeat, transcript seeking, tab-only notes and position/completion, plus a real public worksheet download. Library lesson sorting/pins, editable navigation, recent queries, explicit subject interests and reversible hidden suggestions work without providers.

## Preview truth and state

All course, creator, account, price, event and recap content is fictional. The original silent 24-second video is shared explicitly across sample courses, not presented as their full lesson content. Media/caption/worksheet provenance is in [`public/sample/README.md`](public/sample/README.md); existing photography credits remain in [`public/covers/README.md`](public/covers/README.md).

State under the `courses-preview:` sessionStorage namespace is kept only in this browser tab. It is not an authenticated account, purchase, enrollment, entitlement, synced progress or private server note. Do not enter sensitive information. Storage failures have explicit feedback rather than fake saves. Missing provider configuration is never silently replaced by a live-looking success.

Sign-in uses a displayed sample code and does not email, verify identity, create a session or grant access. Reports/questions are not sent. Payment, enrollment, linked providers, global music trials/cancellation and live broadcasting remain explicit boundaries. The `/preview/` studies do not adopt live classes, radio, gamification, parental-control security or full-app translation as product features.

## Verification

```sh
pnpm typecheck
pnpm lint
pnpm build
pnpm exec playwright install chromium
pnpm test:e2e
```

Playwright starts the production build and never reuses an existing server. Its default test port is 3101; that port is occupied by an unrelated app on this computer. Use `$env:COURSES_TEST_PORT = "3117"; pnpm test:e2e` in PowerShell. Do not terminate another application's server. Development continues separately on port 3100.

`tests/home.spec.ts`, `tests/flows.spec.ts` and `tests/patterns.spec.ts` exercise actual desktop/mobile routes, interactions, accessibility scans, failures and 320/768/1920px reflow. The native media checks use the actual generated clip. This is Chromium emulation, not real-device Safari/Android acceptance or full-image pixel certification. Actual run counts/results and source hashes are in the task evidence.

Current screenshots and logs: `../docs/evidence/ui-platform-expansion/`. Open its `review.html` locally for source/app comparisons and links to the running routes. The complete original flow inventory and explicit implementation boundaries are in [`../docs/reference-review/flow-coverage.md`](../docs/reference-review/flow-coverage.md), with ordered source identities in its JSON companion. Earlier Home evidence is historical, not silently replaced.

Preserve the generated `AGENTS.md` block. Only used components/features exist; no provider SDKs, ORM, queues, global client store or root monorepo was introduced. Nothing here authorizes pushing, deployment, live data or payments.
