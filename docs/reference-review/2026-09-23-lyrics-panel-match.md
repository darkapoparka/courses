# Lyrics panel exact-state acceptance - 2026-09-23

## Candidate and evidence

This review covers only the saved New lyrics-panel screen `ee8db412-71b0-49a8-a1ab-5d6685153abe`, at its exact 1440 × 903 source viewport. The optimized capture belongs to application identity `cd66f153e23482511b06ce51655f372769bed6d54de4424c8b4c9e2359bfbe61`, QA-tooling identity `2b0b3a544fe6b6186ad398ca42ca96661a8365a7b05cf40816839ddf3749d9f8`, build `GUPYcXwY4mfILxw6rJQMY` and Chromium `151.0.7922.34`. Browser and comparison evidence are under `.parity-evidence/full-production-final-normalized-20260923-004700`.

## Exact-state review

The immutable original, actual optimized render and 4× residual were reviewed at readable size. The drawer, lyric position and emphasis, card rail underneath, sidebar/profile and compact player have matching content, placement, scroll and geometry. No visible product mismatch remains in this direct screen state. The `6.671501` MAE and `9.920173%` over-20 residual is concentrated in the blurred lyric texture, text antialiasing and image-decoder edges; it does not indicate a different screen layout or state.

The optimized interaction suite also passed `lyrics-entry-session-integrity` and `lyrics-anchor-controls`. The separate recorded `FLOW-bc0ba8f1` live entry remains open because its archived catalog/session snapshot differs during the real transition; this exact-state MATCH does not sign off that journey.

## Ledger result

Advance `MATCH-ee8db412` only. The live ledger becomes **UI 159/159, MATCH 78/159, FLOW 23/58**.
