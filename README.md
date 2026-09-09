# Courses

An independent course marketplace and learning app, using Apple Music Web as a visual reference.

**Current state:** `web/` now contains the expanded local course UI: discovery/search, course and creator pages, Library, learning lists, a real sample lesson player, account-interface states, and isolated additional reference studies. It is a non-commercial fixture preview, not a launched marketplace or live backend. Run `pnpm dev` from `web/` and open http://127.0.0.1:3100. See [application routes and commands](web/README.md), [all 58 reference-flow mappings](docs/reference-review/flow-coverage.md), and [actual task evidence](docs/tasks.md).

Start with [AGENTS.md](AGENTS.md), the [documentation map](docs/README.md), and the [local build handoff](docs/handoff.md). The single active Next.js application is `web/`; the archive remains outside its build.

## References

The archive is in `apple-music-clone/reference/originals/`. Open [screens and flows](apple-music-clone/reference/originals/index.html) or [UI-element categories](apple-music-clone/reference/originals/ui-elements.html) locally.

The current acquisition report records 159 screen IDs at both 1440px and 3024px, 29 UI-element category mappings, 58 flows with 218 steps, and 13 animations/recordings. Categories and flows reuse those screen identities; they are not additional unique product screens. See [archive completeness](apple-music-clone/reference/originals/COMPLETENESS.md) and [our inspection evidence](docs/reference-audit.md).

The old implementation is unapproved and frozen. Its arbitrary screen mappings and placeholder artwork are not the course design specification. Preserve it and the reference archive; neither belongs in the production application.

## Build sequence

First: a small fixture-backed course UI for review, requiring no external credentials. Second: one real free-course journey with identity, authoring, access, and progress. Third: verified sandbox commerce and a controlled paid pilot. Community expansion, subscriptions, native apps, AI tutors, and generalized infrastructure come later, only when assigned.

[Tasks](docs/tasks.md) defines the exact order and acceptance criteria. [Decisions](docs/decisions.md) separates engineering recommendations from unresolved commercial or visual approval. There is no requirement to reproduce every Apple screen before starting the first course slice.
