# Local-agent handoff

This handoff continues reference/planning work. It does not authorize implementation, dependency installation, cloud setup or deployment. The original prototype remains frozen.

## Branch and workspace safety

Planning branch: `astra/course-platform-plan`. Before changing branches, inspect `git status` and preserve unrelated local work. Fetch the remote branch and inspect its changes; do not reset, clean, stash indiscriminately or overwrite ongoing work. A docs PR being available does not authorize the agent to merge it.

Typical branch discovery commands, only in the correct local repository:

```sh
git status --short
git fetch origin
git branch --all
```

With a clean or deliberately preserved worktree, switch to the existing local planning branch or create a tracking branch for `origin/astra/course-platform-plan` using the appropriate standard Git command. Do not guess that a branch is missing and force-create it over unrelated work.

## Copy this as the next local-agent assignment

```text
Work in the darkapoparka/courses repository. MODE: REFERENCE_ONLY + DOCS_ONLY.

Read AGENTS.md, docs/README.md, docs/platform.md, docs/reference-audit.md,
docs/design-system.md, docs/screens-and-flows.md, docs/decisions.md and the
REF-001/REF-002 rows in docs/tasks.md before editing.

The goal is an independent multi-creator course platform informed by Apple
Music. The existing apple-music-clone is an unapproved frozen prototype.
Do not continue implementing it, initialize web/, install dependencies,
change runtime/source/config files, create services, migrate a database,
deploy, merge branches or generate new product UI as part of this task.

Perform REF-001: inspect the existing local reference library at
apple-music-clone/reference/originals/index.html and its manifests.
The acquisition records already report 159 standalone screens, 58 flows,
218 flow-step images and 13 animations/recordings. Do not redownload the
collection unless a specific recorded file is genuinely missing/corrupt.
File validation and visual inspection must have separate evidence.

Open the actual images at readable size. Catalog standalone screens and
flow sequences, grouping duplicates and variants into meaningful pattern
families. Record the source file and canonical URL, actual image/app bounds,
visible content/state, relevance to our course platform, and inspection
status. Do not derive observations from the prototype's modulo mapping,
filenames, alt text or a tiny contact sheet. Play relevant recordings when
motion/interaction matters. Mark uninspected assets honestly.

Write the actual review ledger and concise family index in
`docs/reference-review/` (create this documentation directory as needed).
Preserve source watermarks and all original files. Do not claim the Mobbin
footer or embedded browser dimensions are part of the app design.

Then perform the documentation portion of REF-002: identify exact inspected
references for discovery, course-detail adaptation, creator profile,
library, lesson/player/transcript and auth patterns. State what to retain,
adapt or discard, and what needs a new course-specific design. Map them to
screen IDs in docs/screens-and-flows.md. Do not implement 159 routes or turn
music-specific radio/shuffle/concert flows into course requirements.

Update docs/tasks.md with the precise evidence and any remaining uninspected
items. Correct draft reference assumptions only when supported by actual
inspection; do not mark owner approval or application verification. Commit
only intended documentation/evidence files on the assigned branch.

Finish with: inspected coverage; strongest patterns to retain; course-only
screens still needing design; files/commit; checks actually performed;
blockers; and the next bounded task. Stop before application implementation.
```

## What follows reference review

The next decision is approving the stack/scope and authorizing course-specific design, not resuming the Apple clone. UX-001 produces five golden screen families—Home, Course detail, Lesson workspace, Creator profile and Studio curriculum editor—at desktop/mobile sizes with their important states. UX-002 fills the other launch workflows before the corresponding features are built.

An approved stack decision alone does not approve a visual layout. An approved mockup alone does not authorize live payments. Record each approval in `decisions.md`; future agents should not repeatedly ask questions that are already answered there.

## Later bootstrap procedure — only after explicit authorization

For BOOT-001, first check current official installation documentation and the package registry, inspect CLI help, and resolve supported stable versions/peer dependencies. Prefer the supported Node LTS specified in the approved stack decision, with a pinned patch and package manager. Do not copy the prototype's version pins simply because they exist.

For the currently recommended Next.js choice, the official scaffold is `create-next-app`; consult its current help/installation guide [S02](research.md) before constructing the exact command. Configure one app in `web/` with TypeScript, App Router, the approved styling setup and selected lint tooling. Record exact installed versions and actual check commands. Do not invent unsupported CLI flags or run the CLI in the archive directory.

Use the equivalent current official `sv create` guidance [S26](research.md) only if the owner explicitly selects SvelteKit instead. Never initialize both alternatives to 'keep options open'. This procedure describes the future authorized task; no scaffold command was executed by the planning change.

After bootstrap, implement the smallest approved free-course vertical slice in task order: creator draft → review/publish → public discovery → free enrollment → protected lesson → progress/resume. Then add and verify the sandbox paid lifecycle. Do not start with all feature folders, production service setup or a 159-screen implementation sprint.

## When something is blocked

For inaccessible images, name the files/actions that failed and leave visual status open; do not invent their contents. For missing integration credentials, continue only the explicitly authorized UI/domain tests or documentation; never fake successful payment/media/backend state. For unresolved business decisions, work on independent tasks without silently choosing commercial obligations.

Do not delete or rebuild prior work as an unrequested cleanup. Report real conflicts and preserve unrelated changes. Completion reports must separate source inspection, design approval, implementation and tests.
