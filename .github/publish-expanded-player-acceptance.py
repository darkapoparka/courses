from pathlib import Path
from textwrap import dedent
import re


def sub_once(pattern: str, replacement: str, text: str, *, flags: int = 0) -> str:
    updated, count = re.subn(pattern, lambda _: replacement, text, count=1, flags=flags)
    if count != 1:
        raise SystemExit(f"Expected exactly one replacement for {pattern!r}; got {count}")
    return updated


tasks_path = Path("docs/tasks.md")
tasks = tasks_path.read_text(encoding="utf-8")

tasks = sub_once(
    r"^Updated 2026-09-21.*$",
    "Updated 2026-09-21 for the expanded song-player exact-state acceptance review. The verified final tree is `116ffff29c41915654d1648a3fdd373e41353817`; the application repair ends at `4070d2661be4c66ff81af0efc588fd052e19fd00`. **Only checkout: `J:\\courses`; only branch: `main`.** Development remains port 6435.",
    tasks,
    flags=re.MULTILINE,
)
tasks = sub_once(
    r"^Implementation checkpoint: .*$",
    "Implementation checkpoint: `116ffff29c41915654d1648a3fdd373e41353817` passed 159 desktop states, five responsive states, 218 route checks and 109 registered interaction tests in GitHub Actions run `35628073726`; all 159 exact-size comparisons passed. Exact source/current/residual review accepts `MATCH-c939c9b8`. The complete three-step expanding flow remains open because only its video-visible `6ac70c34 → c939c9b8` segment is truthfully reproduced by a real control. [Acceptance review](reference-review/2026-09-21-expanded-player-repair-candidate.md). MATCH is now 67/159 and FLOW remains 14/58.",
    tasks,
    flags=re.MULTILINE,
)
if "| Exact visual matches genuinely signed off | **66 / 159** |" not in tasks:
    raise SystemExit("Expected MATCH progress row was not found")
tasks = tasks.replace(
    "| Exact visual matches genuinely signed off | **66 / 159** |",
    "| Exact visual matches genuinely signed off | **67 / 159** |",
    1,
)
tasks = sub_once(
    r"^Latest acceptance evidence: .*$",
    "Latest acceptance evidence: [Expanded player exact-state review](reference-review/2026-09-21-expanded-player-repair-candidate.md). The repaired fullscreen song state advances after clean source/current/residual, route and real-control review. The incomplete first transition keeps the related three-step flow open. Current ledger: UI 159/159, MATCH 67/159, FLOW 14/58.",
    tasks,
    flags=re.MULTILINE,
)

old_match = "  - [ ] **MATCH-c939c9b8 — Finish and verify the exact screenshot match.**"
new_match = (
    "  - [x] **MATCH-c939c9b8 — Finish and verify the exact screenshot match.**\n"
    "  - 2026-09-21: Final tree `116ffff2` passed 164 captures, 218 routes, 109 real-control tests and all 159 exact-size comparisons. Direct source/current/4× residual review verifies the exact artwork, title/artist, active and future lyrics, progress/volume, close/favourite/overflow controls, source-clipped subtitle, repaired transport/Repeat geometry and source-shaped lyrics toggle. MAE improves `5.044422 → 4.969747`; over-20 improves `3.311185% → 3.254737%`. Remaining pixels are lawful background/material, text and SVG raster variation, not a concrete product mismatch. [Evidence](reference-review/2026-09-21-expanded-player-repair-candidate.md)."
)
if tasks.count(old_match) != 1:
    raise SystemExit(f"Expected one unchecked c939 MATCH row; found {tasks.count(old_match)}")
tasks = tasks.replace(old_match, new_match, 1)

old_flow = "- [ ] **FLOW-b6295ef8 — 8. Expanding a song (3 steps).** Complete and verify the recorded journey."
flow_note = "  - 2026-09-21: Registered `expanded-song-entry` starts at accepted state `6ac70c34`, clicks the visible **Expand stupid song** control and reaches accepted `c939c9b8` with listening/profile/catalog continuity asserted. The frozen journey begins at `1f9e170c`; no truthful visible action has been found for `1f9e170c → 6ac70c34`, so this complete-flow checkbox remains open rather than reloading fixtures or injecting hidden state. [Evidence](reference-review/2026-09-21-expanded-player-repair-candidate.md)."
if tasks.count(old_flow) != 1:
    raise SystemExit(f"Expected one open expanding-song FLOW row; found {tasks.count(old_flow)}")
if flow_note in tasks:
    raise SystemExit("Expanding-song flow note already exists")
tasks = tasks.replace(old_flow, old_flow + "\n" + flow_note, 1)

checked_ui = len(re.findall(r"^\s*- \[x\] \*\*UI-", tasks, flags=re.MULTILINE))
checked_match = len(re.findall(r"^\s*- \[x\] \*\*MATCH-", tasks, flags=re.MULTILINE))
checked_flow = len(re.findall(r"^\s*- \[x\] \*\*FLOW-", tasks, flags=re.MULTILINE))
total_match = len(re.findall(r"^\s*- \[[ x]\] \*\*MATCH-", tasks, flags=re.MULTILINE))
total_flow = len(re.findall(r"^\s*- \[[ x]\] \*\*FLOW-", tasks, flags=re.MULTILINE))
assert (checked_ui, checked_match, checked_flow, total_match, total_flow) == (159, 67, 14, 159, 58), (
    checked_ui,
    checked_match,
    checked_flow,
    total_match,
    total_flow,
)
if "- [x] **FLOW-b6295ef8" in tasks:
    raise SystemExit("Expanding-song flow must remain open")
tasks_path.write_text(tasks, encoding="utf-8")

handoff_path = Path("docs/handoff.md")
handoff = handoff_path.read_text(encoding="utf-8")
marker = "## Current verified implementation\n\n"
summary = (
    "The expanded song-player acceptance batch signs off exact state `c939c9b8` on final tree "
    "`116ffff29c41915654d1648a3fdd373e41353817` (application repair through "
    "`4070d2661be4c66ff81af0efc588fd052e19fd00`). GitHub Actions run `35628073726` passed "
    "159 canonical desktop states, five responsive states, all 218 route checks and 109 registered "
    "interaction tests with zero failures; all 159 exact-size comparisons also passed. "
    "[Review](reference-review/2026-09-21-expanded-player-repair-candidate.md).\n\n"
)
if summary not in handoff:
    if marker not in handoff:
        raise SystemExit("Handoff implementation heading not found")
    handoff = handoff.replace(marker, marker + summary, 1)
handoff = sub_once(
    r"^UI 159/159; MATCH 66/159; FLOW 14/58\..*$",
    "UI 159/159; MATCH 67/159; FLOW 14/58. The expanded-player review advances exact state `c939c9b8`; the complete three-step expanding-song journey remains open. The Chart, Playlist, ready-flow and album decisions remain accepted. `docs/tasks.md` remains the sole acceptance ledger.",
    handoff,
    flags=re.MULTILINE,
)
next_marker = "Recompute the dependency report from the updated ledger before selecting the next independent family."
replacement = (
    "Recompute the dependency report from the updated ledger before selecting the next independent family. "
    "Do not mark `FLOW-b6295ef8` complete unless `1f9e170c → 6ac70c34 → c939c9b8` is traversed "
    "continuously through truthful visible controls; the current regression proves only the real "
    "`6ac70c34 → c939c9b8` segment."
)
if next_marker not in handoff:
    raise SystemExit("Handoff next-work marker not found")
handoff = handoff.replace(next_marker, replacement, 1)
handoff_path.write_text(handoff, encoding="utf-8")

review_path = Path("docs/reference-review/2026-09-21-expanded-player-repair-candidate.md")
review = dedent(
    """\
    # Expanded player exact-state acceptance — 2026-09-21

    ## Scope and identity

    This review accepts `MATCH-c939c9b8` only. It does **not** accept `FLOW-b6295ef8`.

    The application repair is published through `4070d2661be4c66ff81af0efc588fd052e19fd00`; the verified docs-triggered final tree is `116ffff29c41915654d1648a3fdd373e41353817`. GitHub Actions run `35628073726` produced retained artifact `reference-candidate-116ffff29c41915654d1648a3fdd373e41353817` (artifact `10654430236`, digest `sha256:51b9cf60137d814fd78ff4894a3ffd4a8f6d16f20523a75f1526d72f7cfd07d1`). The retained source package is artifact `10652434523`, digest `sha256:bbb5bf7c1646c784f0d54c9893240c4c8f2503e24d10c4e0938edb76acf8c6a2`.

    ## Clean verification

    - The frozen archive and every checklist mapping passed.
    - TypeScript and the production build passed.
    - 159 canonical desktop states and five responsive states rendered successfully.
    - All 218 recorded route steps returned their expected states.
    - All 109 registered interaction tests passed with zero failures, including `expanded-song-entry`.
    - All 159 exact-size source/current comparisons completed successfully.

    ## Exact-state repair

    The repair is isolated to fullscreen song playback. It preserves the accepted compact player and excludes radio fullscreen controls.

    - Shuffle, Previous, Play/Pause and Next use source-shaped fullscreen vectors and measured placement/opacity.
    - Repeat uses the closer native outline with fullscreen-only scale and position correction.
    - The subtitle tracking reproduces the archived hard clipping at `...girl so`.
    - The lower-right lyrics toggle uses the source-sized thick rounded outline with filled quotation marks and corrected tint/placement.
    - The existing exact artwork, title/artist, active and future lyrics, progress/volume bars, close, favourite and overflow controls remain intact.

    ## Direct source/current/residual review

    The reviewed target is `c939c9b8-e195-4e43-92a6-b845d0b99243` at 1440×903. Source SHA-256 is `82d29beb0d737b673b4b0998d330e8510b04413a6a135a95c6e03ec86aaefa85`; final render SHA-256 is `d848a486a545c208f49d98101eb1699843702a4e004ea54eae960dbcec1d6c04`.

    Baseline MAE `5.044421885894754` improves to `4.969747190435175`. Pixels over threshold 20 improve from `3.3111849390919157%` to `3.2547372954349703%`.

    Focused regions also improve:

    - Subtitle: MAE `18.5478 → 17.5321`; over-20 `21.7294% → 20.6547%`.
    - Main transport: MAE `10.3108 → 5.9477`; over-20 `7.9335% → 5.3651%`.
    - Repeat: MAE `8.9621 → 5.0819`; over-20 `7.5884% → 4.3659%`.
    - Lyrics toggle: MAE `16.1044 → 12.7817`; over-20 `14.7541% → 10.6414%`.

    Readable full-frame and 4× source/current/residual inspection found no remaining concrete product mismatch. The residual is broad background/material motion-frame variance plus lawful browser text/SVG antialiasing and tiny edge-raster differences; it is not hidden by exclusions, overlays or screenshot substitution.

    ## Real-control coverage and flow boundary

    The registered `expanded-song-entry` case begins at accepted compact state `6ac70c34`, asserts SmithAlex/profile, legacy catalog and active playback, clicks the visible **Expand stupid song** control, and records `c939c9b8`. It then asserts the expanded ambience, exact track, visible lyrics, playback slider, close control, cleared fixture routing and preserved catalog continuity.

    This truthfully proves the video-visible `6ac70c34 → c939c9b8` segment. The frozen three-step journey begins at `1f9e170c`; no visible user action has been established for the dynamic editorial transition `1f9e170c → 6ac70c34`. The regression therefore does not reload fixtures or inject hidden scenario state, and `FLOW-b6295ef8` remains open.

    ## Acceptance decision

    `MATCH-c939c9b8` is accepted. The ledger advances from MATCH 66/159 to MATCH 67/159. UI remains 159/159 and FLOW remains 14/58.
    """
)
review_path.write_text(review, encoding="utf-8")
