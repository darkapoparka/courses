# Account subscriptions exact-state match — 2026-09-23

## Candidate and exact state

This review accepts only `MATCH-44101453`, the Account Settings screen scrolled to its Subscriptions section. The immutable source is `apple-music-clone/reference/originals/44101453-7009-49f7-bde3-406e3193e96a.webp`, SHA-256 `f3aedab17874f2a85aa08d16fdd6f82e145613aa8c60e7e5e91b5de55b7b8d00`. The optimized browser capture is 1440×903 at device scale 1; the comparison uses the full viewport and excludes the standard 120px acquisition footer.

The capture comes from optimized build `PjyQ3GZpF6in3orwLeWc5`, app identity `0a6ca47171b3bbc43f8624e12297759ab11f279b2ba16895bed177d64f7837fa`, QA identity `6164bae460bbef08f1853a539efd008676a3932091a94f2a84d3848e782e310d`, source commit `d71c3c4355d847867fc04aa1f4b69cb8035aba4d`, on Chromium `151.0.7922.34` and Windows 11. The recorded browser render SHA-256 is `b685ec94027a33d367e39492360d88d2bab4b05a5b736a521c460f266df593f7`.

## Readable source/render/residual review

I reviewed the original and optimized render at native size. The account summary scroll anchor, content-restriction controls, subscription divider and row, sidebar, footer and player align. The profile is `SmithAlex` in both exact-state images. No product geometry, content or state defect remains in this direct fixture. The diagnostic comparison reports MAE `3.057267` and over-20 `2.569906%`; these values support inspection but do not determine acceptance.

Source, candidate and difference images are preserved under `apple-music-clone/.parity-evidence/full-production-queue-entry-rerun-20260923/comparison/` with the `44101453-7009-49f7-bde3-406e3193e96a-` prefix. The report render is re-encoded for readable inspection; the captured browser image and journey step 1 retain the render SHA above.

## Continuous cancellation journey remains open

From the fixture, I used Manage, Cancel Free Trial, Cancel Subscription and Done in the local preview. The flow reaches all five states through real controls; no Apple account or billing service is connected. The saved first two frames show `SmithAlex`, but later originals show `Alex Smith`. The live transition preserves `SmithAlex` and therefore does not reproduce that session change. The 1440×903 journey captures and `steps.jsonl` remain under `apple-music-clone/.parity-evidence/full-production-queue-entry-rerun-20260923/browser/journeys/canceling-a-trial-continuous/`. Keep `FLOW-16a876bc` open until the saved-session discrepancy is explained or resolved through a legitimate recorded action.

The same local account-preservation finding leaves the settings journey open. This review advances the direct screen only.

Reviewer: Codex agent in this task; this is not an independent review or owner phase-transition approval. The ledger advances to **UI 159/159, MATCH 96/159, FLOW 26/58**.
