# Contextual player ink and native compact glyphs - 2026-09-21

## Implemented ownership

This batch continues the verified `1141b6cec0fe8cde3ff3b720f45da0ae005bfa11` player-cutout/Replay checkpoint on `main` in `J:\courses`; it does not replace its artwork masks, catalog editions, session state or evidence. Both GitHub workflows for that exact parent were successful: reference 35554005174 and documentation 35554005195.

`app/player-fidelity.css` now renders current-New idle transport ink translucently rather than fixing a blue-gray color sampled from one cover. The same live controls therefore respond to actual artwork underneath them, including the named release's pink cover. Unpressed Shuffle/Repeat are lighter; pressed controls retain the live accent after playback starts. Disabled station controls and the separate expanded-player presentation remain separate owners.

Replay's compact player exposes its actual scrolling artwork through 50% background opacity, 16px blur and saturation 1.4 rather than the ordinary member player's 74%/28px material. This is scoped to the live Replay owner, not a screenshot identifier or sampled paint patch. Up Next/lyrics panel material and ordinary Home material still win in their respective states.

`components/compact-player-icons.tsx` supplies native vector bubble/quotation, list, speaker/wave and muted-speaker geometry for the compact player. `music-primitives.tsx` routes explicit compact glyph names; `music-player.tsx` uses them only in compact utilities. Expanded controls retain their prior glyphs. No screenshot, captured control, rasterized label, icon font or proprietary font file was added.

The registered `browser_player_material.py` suite checks contextual idle ink, visible pressed-state feedback across playback, real Replay month/scroll/gallery/history transitions, panel/Home ownership, and compact Lyrics, Up Next, keyboard mute and volume restoration controls across initial New, Search, playing New, Alpha and guest New. The SVG checks prohibit embedded images, text and foreign objects; normal buttons, accessible labels, focus and range inputs remain the controls.

## Final optimized verification

The optimized build is `.qa/build-player-icons-20260921`, build ID `tHwh7uBYrWhqCGATOKcTN`, served from the active checkout on `127.0.0.1:6437` with Chromium `151.0.7922.34`. The authoritative clean rerun is `.qa/evidence/player-icons-20260921/optimized-browser-rerun`:

- 159 desktop application states and five responsive captures passed;
- all 218 recorded route steps passed;
- all 104 registered interaction regressions passed;
- `expanded-flyout-controls`, which had one isolated navigation timeout in the first corpus, passed both a focused retry and the complete clean rerun;
- typecheck, seven QA-tool unit tests, nine cover-integrity tests, archive integrity and coverage inventory passed;
- archive inventory remained 58 flows, 218 steps, 159 identities and 318 source variants.

The clean exact-size comparison is `.qa/evidence/player-icons-20260921/optimized-comparison-rerun`: all 159 states were compared at 1440x903 or 1440x904, excluding only the documented 120px acquisition footer. Mean MAE changed from `4.949350` to `4.940987`; mean over-20 changed from `4.985895%` to `4.968957%`. Of 148 numerically changed frames, 135 improved by MAE and 13 worsened by MAE. These are diagnostics, not acceptance.

The largest intended improvements were Replay's artwork-dependent player surface: `18225175` improved by `0.489137` MAE and `2.026410` over-20 points; `b67b8895` improved by `0.158137` MAE. Initial New improved to `2.509861 / 2.808078%`; named New improved to `2.902010 / 3.149686%`; accepted Search `035569a0` remained complete and improved to `4.194987 / 4.675772%`.

Readable source / published parent / current candidate / amplified-residual sheets are preserved in `.qa/evidence/player-icons-20260921/final-readable-review`. Every worsened-MAE frame was inspected: `3731221f`, `06a34864`, `be864051`, `afd02fa6`, `83bba8fd`, `8b03c9d0`, `cbbdc344`, `e4dad439`, `aefa8502`, `95ae6a8f`, `de48a956`, `4811dde3` and `8f029018`. Their maximum increase was `0.038276` MAE. The changes are confined to the intended native compact glyph/material region, lawful raster/decoder variation, or pre-existing unrelated source-state defects; no new content, geometry, state, queue or navigation regression was found. The accepted Search frame was re-reviewed after the glyph change and remains accepted.

Generated Next type-path churn was backed up under `.qa/evidence/player-icons-20260921/post-rerun-generated` and only `next-env.d.ts`/`tsconfig.json` were normalized. `normalization-receipt-rerun.json` proves the application/component/library tree remained byte-identical (`d2f073a0f3ab10194a01161771eaa8a136a05b5e5dcfeb594dfe86f1a17dcf27`). The captured implementation hash was `a81f0f8de6841f0debebb19877a5f199dce2577f0f5b2a8ff4c8aebe490e6e8b`; the normalized configuration-inclusive hash is `6b9ab62fbbbd2958d11efdd46f90eb9db287b103812281e6e1bd4a98f2a08cc4`; tooling hash is `21904c129eb56accfc6e8c7acae442b17fdc3a4f5524c74bf702d084408826d8`.

## Acceptance boundary and remaining defects

Initial New `e72be564` still has the wrong complete second release artwork beneath the interior player glass. Enlarged inspection of the unoccluded source band disproved the researched *Pink Pocket Pistol* candidate; the other preserved provider candidates also fail the visible source features. No guessed cover was installed. Distinct initial/current release editions and the pinned ATEEZ artwork remain preserved. The exact player, lower shelf, typography and source-state defects therefore keep initial New open.

Replay's live material is materially closer and every recorded Replay control regression passes, but exact-state review still shows source-specific ambient light distribution, type/content and continuation differences. The Replay MATCH and FLOW entries therefore remain open rather than being inferred from the green corpus.

Acceptance remains UI 159/159, MATCH 22/159 and FLOW 3/58 in `docs/tasks.md`. Native controls, lower aggregate residuals, successful routes and this publication do not advance that ledger automatically.
