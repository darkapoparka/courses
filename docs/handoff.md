# Local agent handoff

The docs are ready to guide a bounded first implementation. Full remote visual review is not complete; the local agent must open the already saved references relevant to its UI task. Do not redownload them, finish the old music clone, or wait for all 159 images before scaffolding.

## Branch and safety

Use `astra/course-platform-plan`, which integrates the updated reference archive and the revised canonical docs. Before switching/pulling, inspect the local working tree and preserve unrelated work. Do not reset or force a branch. Confirm the actual latest remote commit and read root AGENTS. The documentation change itself did not authorize or perform application work.

## First implementation prompt

Send the following when ready to authorize the initial slice:

```text
Work in darkapoparka/courses using the latest astra/course-platform-plan branch. Inspect git status and preserve unrelated local changes before switching or pulling.

I approve Next.js App Router + React + strict TypeScript, Tailwind with custom tokens/selected accessible primitives, and the staged architecture in these docs. Implement only BOOT-001 plus the relevant REF-002 and UI-001: the minimal new web/ scaffold and the learner shell/Home screen. Do not implement the full backlog.

Read AGENTS.md, docs/README.md, docs/platform.md, docs/architecture.md, docs/coding-standards.md, docs/development.md, docs/design-system.md, and the assigned task rows. Use the other docs only when the slice needs them.

Open the saved local index and UI-elements gallery. Inspect the relevant high-resolution Apple Music shell/discovery originals and their useful flow states at readable size. Record exact source paths, app bounds excluding the Mobbin footer, useful tokens and course-specific changes in the reference ledger. Do not infer a screen's identity from the archived prototype's fallback mapping.

Resolve current supported stable CLI/package versions from official sources, inspect CLI help, and use the official create-next-app CLI to initialize web/ with the agreed options. Pin runtime/package manager/dependencies and commit one active lockfile. Preserve all of apple-music-clone/ unchanged and outside the active workspace/deployment root.

Build the first course Home and shared learner shell using explicit public fixtures and original/licensed assets. Make it good at 390px and 1440px with real navigation behavior, useful shelves, accessible controls and the relevant empty/loading/error states. Keep provider SDKs, auth/backend, checkout, creator editor, queues, ORM, global state and unused future folders out of this slice. It must run without Supabase/Stripe/Mux credentials. Label fixture behavior honestly and do not add fake purchase or persistence success.

Run the actual typecheck, lint, build and browser checks appropriate to the slice. Capture desktop/mobile screenshots, inspect them, and record what passed or remains blocked. Update tasks and any intentionally changed contract. Commit only intended files and show me the local run command, screenshots, exact commit and remaining issues.

Stop after this first slice for my visual review. Do not build further screens, provision services, deploy, merge to main, or activate payments.
```

This prompt explicitly adopts the engineering baseline for the named task. It does not approve final brand/assets, every visual proposal, commerce terms, or release. Normal local edits/checks within the slice do not require repeated permission requests.

## After the first review

Fix the owner-reviewed shell/Home before spreading its styling. Then assign UI-002 (course detail/preview), UI-003 (lesson/Library), and UI-004 (search/creator) as small tasks. No requirement to create image-generated mockups for every state before testing a working UI.

Once M0 is accepted, introduce real local/staging data and the free-course journey through the M1 tasks. Configure media only when MEDIA-001 needs it. Add sandbox commerce only after PAY-001's business assumptions are resolved. Do not ask for every vendor credential on the first run.

## Every completion report

State the task, actual changed files/commit, actual commands and results, reference paths/screenshots, limitations, and next task. Distinguish fixture-only UI from live persistence, sandbox checks from live eligibility, and visual review from owner approval. Never claim the architecture or interface is flawless merely because a document or build exists.
