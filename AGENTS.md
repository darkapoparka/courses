# Courses — agent contract

## Active phase: Apple Music fidelity

The owner's assignment is a working true 1:1 clone of every saved Apple Music screen and flow. Course/community adaptation starts only after clone acceptance and a separate explicit assignment. Historical course plans are deferred specifications, not instructions to create another app.

- Work only on `main`. Preserve existing work, avoid destructive Git operations, and never force-push or create/switch branches.
- Continue `apple-music-clone/` in `J:\courses-astra-preview`. Do not scaffold `web/`, replace the frontend, or upgrade the stack instead of fixing fidelity.
- Preserve `apple-music-clone/reference/` byte-for-byte. Images, variants, manifests, recordings, and historical QA are immutable comparison evidence.
- Implement real DOM controls, navigation, forms, menus, playback UI, scroll positions, and intermediate states. No screenshot-as-page, hotspots, arbitrary mappings, or dead controls.
- Keep preview authentication, payment, and playback local and explicit. No real credentials, payment submissions, subscriptions, or copyrighted streaming.
- Do not deploy to production, change visibility, provision paid services, or redistribute proprietary fonts or source assets.

## Canonical documents

Start with this file, `docs/handoff.md`, `docs/development.md`, and the relevant `docs/tasks.md` rows. Preserve and follow the app's generated Next.js instructions. `docs/reference-audit.md` owns current audit findings; `docs/reference-review/ledger.md` preserves source observations.

`docs/tasks.md` is the only completion checklist: 159 UI entries, 159 MATCH entries, and 58 FLOW entries. Do not create a competing backlog. Archive acquisition reports are historical; the course-product specifications remain deferred.

## Session and implementation loop

1. Inspect branch, status, staged/unstaged diffs, HEAD, remotes, and incoming/outgoing commits. Preserve unrelated changes; fetch does not authorize replacing the working tree.
2. Identify the clone's listening process and command line. Port 3000 may belong to another project. Default clone port is 6431 on loopback. Never terminate another app to claim a port.
3. Verify browser hydration, a real navigation click, the rendered screenshot, and browser errors. A listener, HTTP 200, or route count is not working behavior.
4. Open exact saved originals at readable size and read the full flow sequence. Fix wrong state/content, geometry, typography, cropping and interactions before low-impact color tuning.
5. Save a baseline with candidate/environment identity. Make a small source change, repeat the capture, compare, and inspect the diff. Validate actual computed styles when bundling may change CSS.
6. Reach the same state through real UI actions. Do not fix only `/screen/<id>` while live navigation loses the state. Do not use forced clicks, DOM-injected state, or URL jumps as flow evidence.
7. Run focused regressions, then the complete suite after shared changes. Re-rank every reference; do not declare progress from selected improved crops while other states regress.
8. Update the owning task/audit with exact evidence, review the staged diff, and checkpoint coherent tested changes on `main`. Keep `.qa/` and `.parity-evidence/` local and uncommitted.

## Evidence and acceptance

- **UI**: implemented and rendered. It is not a visual match.
- **MATCH**: exact reference/viewport/state compared, residuals inspected at readable scale, and no unresolved visible discrepancy. Record source/candidate hashes, crop, browser, reviewer, and evidence location. Numerical similarity alone never grants approval.
- **FLOW**: one continuous real-control journey through every recorded step, including intermediate forms, menus, scroll and resulting state. Starting at a fixture is allowed; jumping between fixture URLs is only route coverage.
- Responsive checks prove usability, not parity with nonexistent mobile originals. Review the 13 available motion assets where applicable; still screenshots do not verify timing.
- Exclude only documented acquisition footers from comparison; preserve original bytes. Never mask product regions, loosen metrics, or tick boxes to manufacture completion.
- Keep implementation, automated checks, visual review, complete-flow verification, and owner acceptance separate. Course adaptation remains blocked until all 159 MATCH and 58 FLOW entries are genuinely accepted and the owner approves the transition.

## Engineering and handoff

Retain locked versions and read version-matched official/generated framework documentation. Prefer small shared fixes and existing components over framework rewrites, broad refactors, speculative services, or additional apps. New scripts must be reproducible outside one machine's scratch directory and fail honestly.

Before ending, report the actual commit/push state, verified server URL, changed behavior, checks performed, comparison results, and concrete remaining blockers. Never claim tests, visual reviews, integrations, or approvals that were not observed. Keep `docs/handoff.md` current; documentation is not a substitute for implementation.
