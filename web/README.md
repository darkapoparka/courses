# Courses web — Home preview

The active application is this directory, not `apple-music-clone/`. Project contracts and task evidence live in [`../docs/`](../docs/README.md).

## Run locally

Use pnpm **11.24.0**. `package.json` pins Node **24.20.0** through `devEngines.runtime`; pnpm installs and uses that runtime locally without changing the machine's global Node. `.node-version` and `.nvmrc` record the same version.

```sh
cd web
pnpm install --frozen-lockfile
pnpm dev
```

Open **http://127.0.0.1:3100** on the same computer. No environment file, Supabase, Stripe or Mux credentials are required. The server binds to loopback only.

## Review the implemented slice

Home is the only product destination. The Visitor/Learner switch changes an explicit URL fixture, not authentication. The information button explains limitations and opens sample loading, empty and failure states. Course pages, lessons, Search, Library and You are unavailable; there is no checkout, enrollment, saved progress or fake persistence.

- Visitor: `/?sample=visitor`
- Returning learner: `/?sample=learner`
- Empty catalog: `/?sample=learner&state=empty`
- Two-second streamed loading: `/?state=loading`
- Real error boundary exercise: `/?state=error` (Try again retries the failing sample; Return to sample Home clears it)

## Checks

```sh
pnpm typecheck
pnpm lint
pnpm build
pnpm exec playwright install chromium
pnpm test:e2e
```

The browser suite starts the **production build** on port 3101 and stops it afterward; port 3100 remains available for development. It covers 1440px desktop and 390px mobile Chromium, with additional 320/768/1920px, keyboard, reduced-motion, error/loading, navigation, direct 404 recovery and axe checks. Portrait/square aspect ratios and desktop source-derived geometry are checked as well. This is not a pixel-diff against proprietary artwork. Mobile emulation is not real-device Safari/Android acceptance. `pnpm build` must succeed before running the suite.

Current screenshots are saved to `../docs/evidence/ui-001-final/`. Earlier `ui-001/` screenshots are superseded draft evidence, not the current visual direction. They are review evidence, not automatically accepted visual-regression baselines. Local test reports/traces are ignored by Git. No test uses a live backend.

## Assets and boundaries

All names, course descriptions, USD prices and progress values are fictional public fixtures. See [`public/artwork/README.md`](public/artwork/README.md) for original artwork and photo sources. Do not replace these fixture imports with a silent fallback when backend integration begins.

The scaffold was created with the official create-next-app CLI. Keep its generated `AGENTS.md` block intact. `pnpm-workspace.yaml` contains this single app's dependency-build policy only; there is no root workspace, archive dependency or monorepo framework.

Do not deploy this fixture application or activate payments without a separate assignment.

If port 3101 is occupied, set `COURSES_TEST_PORT` to a free port. On this computer an unrelated service uses 3101; the final verification used 3117. In PowerShell: `$env:COURSES_TEST_PORT = "3117"; pnpm test:e2e`. The test server launches Next directly using the pnpm-selected Node runtime and never reuses an existing server. Do not terminate another session's server to free the default test port.
