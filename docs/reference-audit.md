# Repository and reference audit

Audit date: 2026-09-08. Repository baseline: `0f8e5f89a0320f6f6f557ecb6f30b428594f9c02`; tree `82f5237588ab562eaee494c57cafb778efb49fe8`.

## What was actually inspected

Read through the GitHub connector: root structure/recursive tree, root README, prototype package manifest and agent rules, reference inventory, original acquisition README and verification record, portions of the download/flow manifests, `lib/reference.ts` including its mapping/flows, the opening component implementation, and the independent review.

This was a **repository/source/acquisition-record audit**, not a completed visual audit. The connected Mobbin screen search returned a paid-plan error. The execution environment could not clone from GitHub; its binary fetch could not decode WebP, and web retrieval of the supplied asset URLs did not render the images. No original image or full recording was successfully visually inspected in this session. No application was run, built or tested. No screenshot fidelity or measured design-token claims are made here.

These access limits do not mean the images are missing: the files and their validation records are already in the repository. A local agent can open the saved index without reacquiring the collection.

## Acquisition record, newer than the old inventory

| Artifact | Repository record | Evidence |
| --- | ---: | --- |
| Standalone screens | 159 | `originals/README.md`, `download-manifest.json`, `verification.json` |
| Flow records | 58 | `originals/README.md`, `flow-download-manifest.json` |
| Ordered flow-step images | 218 | `originals/README.md` |
| Valid decoded images | 377 | `verification.json`: no bad images or missing screen IDs reported |
| Animations/recordings | 13 | Five screen animations plus eight flow recordings; valid MP4 headers reported |
| Reference footprint | 28.7 MB | `verification.json` |

These are recorded acquisition/validation results, not checks rerun during this audit. The saved README explicitly says video playback has not been checked in full. The earlier statement that only three flows were collected is superseded; do not repeat it or repeat the download work.

The collection reports an underlying app viewport of 1512×945. Standalone assets are 1440px wide including a Mobbin footer, according to the saved README. Consult `all-image-dimensions.json` and inspect the actual app rectangle before measurement. The old 556×876 in-app browser surface is not proof of a mobile Apple Music layout.

## Concrete source findings

| Finding | Evidence | Consequence |
| --- | --- | --- |
| The implementation preceded product planning | Root README labels it unapproved and paused | Freeze it; do not treat its existence as an approved stack/layout |
| Many IDs are arbitrary repeated layouts | `lib/reference.ts`: `fallbackVariants[index % fallbackVariants.length]` | Route coverage is not reference fidelity; do not reuse this mapping as a screen audit |
| Flow UI covers only three hardcoded examples | `lib/reference.ts` defines onboarding, starting-a-trial and new | This implementation is not the complete 58-flow archive |
| Reference-style artwork is invented | `Art` renders tone classes and a text label in `components/apple-music-app.tsx` | Do not use these gradient fixtures as course asset direction |
| Product UI is concentrated in a large client component | `apple-music-app.tsx` is approximately 46 KB and begins with `use client` | It is an interaction prototype, not the recommended production architecture |
| Agent guidance lacks a product scope contract | Nested AGENTS contains only generated Next.js rules | Add root mode/scope/evidence rules; preserve generated framework guidance |
| Old review already rejects fidelity | `reference/independent-review.md` | Preserve the review as history, but do not follow its old instruction to finish cloning music screens |

The package manifest lists Next 16.3.4, React/React DOM 19.2.8, TypeScript 7.0.2 and Tailwind 4.3.3. These are observed repository pins, not independent certification that the build is correct or every pin is still the latest.

## Correct next reference task

Open `../apple-music-clone/reference/originals/index.html`. First inspect all standalone images and flow sequences as a catalog; classify reusable pattern families and duplicates. Deep-review the families relevant to the planned course screens. Do not rebuild 159 routes or turn all 58 music journeys into course features.

Create a durable per-asset review ledger under `docs/reference-review/` only as actual review occurs. Suggested row: reference file and canonical Mobbin URL; source kind; actual image/app viewport; authentication state; visible subject/layout; interaction/flow step; relevance (`reuse`, `adapt`, `discard`, `needs_new_design`); proposed target screen IDs; reviewer/date; inspection status; notes. Use explicit `NOT_INSPECTED` rather than guessed labels.

A contact sheet is an index, not evidence that every small text/control was inspected. Open relevant originals at readable size. Verify motion by playing applicable recordings. Never remove the watermark from the source file or publish cropped source art as our own.

## Candidate pattern families — not image-verified mappings

The historical metadata/code suggests browsing shelves, search/categories/results, album/playlist detail, artist pages, library/list actions, player/lyrics, account dialogs and purchase/trial flows. These are a starting checklist only; verify every chosen source visually.

Adapt album detail to a course overview and track rows to a curriculum. Adapt artist identity to a creator profile and playlist organization to saved learning collections. Use player/lyrics patterns only where they improve lesson playback/transcripts. Discard shuffle, radio, concert buying, music-specific settings and Apple subscription identity. Create new designs for learning progress, course offers, studio, payouts, moderation, authoring and accessibility/error states that music references cannot define.

## Visual approval gate

Before product component implementation, produce and review course-specific desktop/mobile golden frames for Home, Course detail, Lesson player, Creator profile and Studio curriculum editor. Then resolve the remaining launch screens/states in `screens-and-flows.md`. Evidence must show original/course frame, viewport and what changed for the learning use case.

Do not require irrelevant Apple billing/concert screens to be pixel-cloned before working on course plans. The goal is an approved course UI informed by references, not an Apple reproduction project.

## Rights and preservation

The repository is public at the audit baseline. Possession/download of reference files does not establish redistribution or production-use rights. Review Mobbin/asset terms before expanding public distribution; do not change repository visibility without the owner. Keep references out of the production public directory, bundles, metadata and search indexes. Our app must have its own name, artwork, teacher imagery and appropriately licensed icons/fonts.
