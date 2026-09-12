# Screens and flows — one inventory, two different proofs

## Current reference inventory

The live inventory is [tasks.md](tasks.md). The immutable ordered map is `apple-music-clone/reference/originals/flow-screen-map.json`. The saved corpus has 159 screen identities and 58 recorded flows with 218 ordered steps; 13 motion assets are available. Do not create a second screen list, renumber IDs or infer acceptance from these counts.

`/screen/<full-screen-id>` selects a canonical fixture. `/flows/<flow-slug>?step=0` selects an indexed recorded step. These routes help inspection and repeatable initialization. Resolving all of them demonstrates route/state coverage, not completion of real journeys.

## Screen review contract

Select the exact source and viewport. Reproduce its account/catalog/library/playback state, scroll, open panels, hover/focus and relevant form values. Compare the full application region, excluding only the acquisition footer. Inspect readable residuals, record source/candidate hashes and environment, and keep unresolved discrepancies explicit. The UI checkbox and MATCH checkbox answer different questions.

## Flow review contract

Read the entire recorded order before implementation. Start at the allowed first fixture; then navigate only through real controls for acceptance evidence. Capture every meaningful intermediate state, not just the endpoint. Verify menus/forms, back/close behavior, scrolled positions, persisted choices and resulting state. Include applicable recorded motion rather than assuming stills establish timing.

Use ordered, unique image names and `steps.jsonl`; a revisit must not overwrite an earlier step. Compare live checkpoints with originals and direct fixtures. Do not use injected DOM/application state, forced clicks or URL jumps to claim the sequence succeeded. A focused regression can be useful without completing the whole recorded FLOW entry.

When adjacent source captures differ in account/catalog/library snapshots, investigate the recording and actual intended transition. Do not replace unrelated state behind a toggle or hover. Record the discrepancy and the affected task rather than sign off an invented path.

## Later course journey map — not implemented routes

After clone acceptance and explicit transition, adapt a coherent slice within the existing app. The following are product requirements, not permission to create routes now:

| Journey | Required outcome |
| --- | --- |
| Discover and evaluate | Home/search/category to course and intentional public sample; clear outcome, teacher, prerequisites, curriculum, price and access terms |
| Enroll and resume | Safe sign-in return intent, idempotent free grant, owned library, authorized lesson, saved progress and correct resume |
| Buy and learn | Server-resolved offer, hosted payment, honest confirming state, verified fulfillment and source-specific access; browser return is not payment proof |
| Create and publish | Owned draft, validated upload/processing/captions, private preview, version-locked submission and attributable operator decision |
| Ask and receive support | Entitled lesson questions, creator response, restricted reporting/moderation; private notes are never published or exposed to creators |
| Refund or lose availability | Real provider state, policy-consistent source-grant effect, other valid grants preserved, clear support/remedy path |
| Recover interrupted work | Safe expired-login recovery, retained input/uploads, visible conflicts and authorized media-link refresh without double charges or lost edits |

Public/learner, creator and operator areas belong to one product. A user may learn and create; route parameters or UI role selections do not establish ownership. Later routes need actual Back/deep-link/refresh behavior, not another disconnected fixture showcase.

Future mobile layouts and course-specific authoring/commerce screens are independent design work, not claims of being included in the Apple archive. Keep proposed product journeys separate from the 58 original FLOW acceptance entries.
