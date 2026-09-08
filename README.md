# Courses

Planning repository for an independent multi-creator course marketplace and learning app, using Apple Music Web as a design reference.

**Current stage: references acquired; product/architecture documentation drafted; application implementation paused.** The proposed stack and course-specific UI are recommendations awaiting the owner's approval. No production application has been initialized by this documentation work.

Start with [the agent contract](AGENTS.md), then [the documentation map](docs/README.md). The next local-agent assignment is [reference audit and planning only](docs/handoff.md), not an instruction to resume the clone.

## Existing reference archive

Open [the saved reference index](apple-music-clone/reference/originals/index.html) locally after cloning. The repository's acquisition records report 159 screen images, all 58 flow sequences with 218 ordered step images, and 13 animations/recordings. Source watermarks are preserved. See [capture details](apple-music-clone/reference/originals/README.md), [file validation](apple-music-clone/reference/originals/verification.json), and [this audit's evidence limits](docs/reference-audit.md).

Acquisition is not design approval. Do not redownload everything or build a route for every reference image. Review the reusable patterns and adapt only those appropriate for learning and selling courses.

## Archived prototype

`apple-music-clone/` contains the initial unapproved Next.js implementation and references. Preserve it unchanged. Its fallback screen mappings and invented artwork are not authoritative reference specifications. The original root commit is `0f8e5f89a0320f6f6f557ecb6f30b428594f9c02`.

Only when explicitly asked to inspect the old prototype:

```sh
cd apple-music-clone
pnpm install --frozen-lockfile
pnpm exec next dev --hostname 127.0.0.1 --port 6431
```

Reference browsing and documentation tasks do not require installing or running it. The proposed future product location is `web/`, created only after the planning/design gates are approved.
