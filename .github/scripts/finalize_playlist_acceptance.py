from __future__ import annotations

import json
import re
from pathlib import Path
from textwrap import dedent

ROOT = Path(__file__).resolve().parents[2]
TASKS = ROOT / "docs" / "tasks.md"
HANDOFF = ROOT / "docs" / "handoff.md"
AUDIT = ROOT / "docs" / "reference-audit.md"
REVIEW = ROOT / "docs" / "reference-review" / "2026-09-21-playlist-acceptance.md"
METRICS = ROOT / "docs" / "reference-review" / "latest-metrics.json"
REVIEW_LINK = "reference-review/2026-09-21-playlist-acceptance.md"


def replace_once(text: str, old: str, new: str, label: str) -> str:
    count = text.count(old)
    if count != 1:
        raise RuntimeError(f"{label}: expected one literal match, found {count}")
    return text.replace(old, new, 1)


def sub_once(
    text: str,
    pattern: str,
    replacement: str,
    label: str,
    flags: int = 0,
) -> str:
    updated, count = re.subn(
        pattern,
        lambda _match: replacement,
        text,
        count=1,
        flags=flags,
    )
    if count != 1:
        raise RuntimeError(f"{label}: expected one regex match, found {count}")
    return updated


payload = json.loads(METRICS.read_text(encoding="utf-8"))
metrics = {
    prefix: next(
        row for row in payload["screens"] if row["screen"].startswith(prefix)
    )
    for prefix in ("a573d1ab", "5044abe5")
}

tasks = TASKS.read_text(encoding="utf-8")
tasks = sub_once(
    tasks,
    r"(?m)^Updated 2026-09-21 .+$",
    r"Updated 2026-09-21 for the Emotional Songs Playlist exact-state and real-control acceptance review. The full-corpus app checkpoint is `5b3d98d`; the focused Playlist evidence was captured against the unchanged Playlist implementation at `8b9f7c4`. **Only checkout: `J:\courses`; only branch: `main`.** Development remains port 6435.",
    "tasks heading",
)
tasks = sub_once(
    tasks,
    r"(?m)^Implementation checkpoint: .+$",
    "Implementation checkpoint: `5b3d98d` passed 159 desktop states, five responsive states, 218 route checks and 107 registered interaction tests in GitHub Actions run `35610617012`. The focused optimized-listener run passed both Playlist journeys with stable candidate identity, and exact source/current/4× residual review accepts both Emotional Songs states without changing application code. [Acceptance review](reference-review/2026-09-21-playlist-acceptance.md). MATCH is now 65/159 and FLOW is 13/58.",
    "tasks implementation checkpoint",
)
tasks = replace_once(
    tasks,
    "| Exact visual matches genuinely signed off | **63 / 159** |",
    "| Exact visual matches genuinely signed off | **65 / 159** |",
    "MATCH summary",
)
tasks = replace_once(
    tasks,
    "| Full recorded flows genuinely signed off | **11 / 58** |",
    "| Full recorded flows genuinely signed off | **13 / 58** |",
    "FLOW summary",
)
tasks = sub_once(
    tasks,
    r"(?m)^Latest acceptance evidence: .+$",
    "Latest acceptance evidence: [Emotional Songs Playlist exact-state and flow review](reference-review/2026-09-21-playlist-acceptance.md). Two Playlist states and two ordered real-control journeys advance after source/current/residual and live-control review. Current ledger: UI 159/159, MATCH 65/159, FLOW 13/58.",
    "latest acceptance evidence",
)

screen_notes = {
    "a573d1ab": (
        "Exact source/current/4× residual review found the recorded Emotional Songs artwork and crop, title/owner/update copy, description, action controls, three song rows, count, Suggested Songs panel, sidebar/player state and scroll position present and aligned. The remaining residual follows lawful Windows/Chromium text, SVG, decoded-image and translucent-material rasterization."
    ),
    "5044abe5": (
        "Exact source/current/4× residual review found the recorded vampire mutation, four rows, updated count/duration, reordered suggestions, artwork, controls, sidebar/player state and scroll position present and aligned. The remaining residual follows lawful Windows/Chromium text, SVG, decoded-image and translucent-material rasterization."
    ),
}
for screen, note in screen_notes.items():
    old = f"  - [ ] **MATCH-{screen} — Finish and verify the exact screenshot match.**"
    new = (
        f"  - [x] **MATCH-{screen} — Exact screenshot match reviewed and signed off.**\n"
        f"  - 2026-09-21: {note} [Evidence]({REVIEW_LINK})."
    )
    tasks = replace_once(tasks, old, new, f"MATCH-{screen}")

flow_changes = {
    "c12bd09a": (
        "- [ ] **FLOW-c12bd09a — 48. Playlist detail (2 steps).** Complete and verify the recorded journey.",
        "- [x] **FLOW-c12bd09a — 48. Playlist detail (2 steps).** Complete recorded journey reviewed and signed off.\n"
        "  - 2026-09-21: The visible Emotional Songs card opens from All Playlists, preserves the recorded player/sidebar state and reaches `a573d1ab` with the exact three rows and description. Ordered screenshots and `steps.jsonl` are under `apple-music-clone/.qa/evidence/flow-playlist-acceptance-20260921-r2/browser/journeys/c12bd09a-playlist-detail`. [Evidence](reference-review/2026-09-21-playlist-acceptance.md).",
    ),
    "14785972": (
        "- [ ] **FLOW-14785972 — 49. Adding a suggested song (2 steps).** Complete and verify the recorded journey.",
        "- [x] **FLOW-14785972 — 49. Adding a suggested song (2 steps).** Complete recorded journey reviewed and signed off.\n"
        "  - 2026-09-21: The visible Add vampire control mutates the real playlist to four exact rows, updates the count/duration, removes the consumed suggestion and reaches `5044abe5`. Ordered screenshots and `steps.jsonl` are under `apple-music-clone/.qa/evidence/flow-playlist-acceptance-20260921-r2/browser/journeys/14785972-add-suggested-song`. [Evidence](reference-review/2026-09-21-playlist-acceptance.md).",
    ),
}
for flow, (old, new) in flow_changes.items():
    tasks = replace_once(tasks, old, new, f"FLOW-{flow}")

counts = {
    "ui": len(re.findall(r"^\s*- \[x\] \*\*UI-", tasks, re.M)),
    "match": len(re.findall(r"^\s*- \[x\] \*\*MATCH-", tasks, re.M)),
    "flow": len(re.findall(r"^\s*- \[x\] \*\*FLOW-", tasks, re.M)),
}
expected_counts = {"ui": 159, "match": 65, "flow": 13}
if counts != expected_counts:
    raise RuntimeError(f"acceptance counts {counts} != {expected_counts}")
TASKS.write_text(tasks, encoding="utf-8", newline="\n")

review = dedent(
    f"""\
    # Emotional Songs Playlist acceptance

    Updated 2026-09-21. This review advances two exact Playlist states and two complete real-control journeys. The sole ledger becomes **UI 159/159, MATCH 65/159, FLOW 13/58**.

    ## Candidate and verification

    - Full-corpus application checkpoint: `5b3d98d3398a679af3cbd23b15c455a078f6a2a5`.
    - GitHub Actions run `35610617012` passed 159 canonical desktop captures, five responsive captures, all 218 archived route steps, 107 registered interaction regressions, TypeScript, production build, QA-tool tests, cover-integrity tests and all 159 exact-size comparisons.
    - The Playlist implementation, shared Playlist component and Playlist library controls are unchanged from the focused capture base `8b9f7c4ff8dd1f178f070b13166082ad6fe6a323`; intervening application changes are limited to source-proven initial-New artwork/provider data.
    - Exact-state source/render/difference triplets are under `apple-music-clone/.qa/evidence/album-final2-20260921/comparison`.
    - Focused ordered evidence is under `apple-music-clone/.qa/evidence/flow-playlist-acceptance-20260921-r2/browser`. Five of five focused cases passed with stable implementation/tooling identity; this decision uses the two Playlist journeys.
    - Browser: Chromium 151.0.7922.34 at the source 1440×903 viewport.

    ## Exact-state review

    | Screen | MAE | Over-20 | Decision |
    | --- | ---: | ---: | --- |
    | `a573d1ab` | `{metrics['a573d1ab']['mae']:.6f}` | `{metrics['a573d1ab']['over20Percent']:.6f}%` | Accept initial Emotional Songs state |
    | `5044abe5` | `{metrics['5044abe5']['mae']:.6f}` | `{metrics['5044abe5']['over20Percent']:.6f}%` | Accept four-song vampire mutation |

    For `a573d1ab`, source and current agree on artwork/crop, title and owner metadata, update copy, description, controls, three exact song rows, count, Suggested Songs content, sidebar/player state and scroll position.

    For `5044abe5`, source and current agree on the added `vampire` row, four-song count and duration, consumed-suggestion removal, remaining suggestion order, artwork, controls, sidebar/player state and scroll position.

    The amplified residual follows text, SVG, decoded artwork, one-pixel rules and translucent material edges. It does not expose a missing string, wrong playlist state, wrong artwork identity, displaced product control or incorrect mutation.

    ## Ordered real-control journeys

    `FLOW-c12bd09a` uses the visible Emotional Songs card and records:

    `8a2a4241 → a573d1ab`.

    `FLOW-14785972` uses the visible Add vampire control and records:

    `a573d1ab → 5044abe5`.

    Both cases assert the exact rows and state-specific copy before recording the endpoint. No fixture URL is loaded after the permitted initial state, no forced click or injected application state is used, and screenshots are unique and non-overwriting.

    ## Decision and next target

    Accept `MATCH-a573d1ab`, `MATCH-5044abe5`, `FLOW-c12bd09a` and `FLOW-14785972`. No other checkbox advances.

    Recompute dependencies from the updated ledger. Chart detail has one unchecked endpoint (`8a234785`) and an existing real-control path (`FLOW-d5d60236`), making it the smallest independent family to review next.
    """
)
REVIEW.write_text(review, encoding="utf-8", newline="\n")

handoff = HANDOFF.read_text(encoding="utf-8")
marker = "## Current verified implementation\n\n"
if handoff.count(marker) != 1:
    raise RuntimeError("handoff current-implementation marker mismatch")
playlist_intro = (
    "The Emotional Songs Playlist acceptance batch signs off two exact states and two complete real-control journeys on full-corpus checkpoint `5b3d98d3398a679af3cbd23b15c455a078f6a2a5`. The Playlist implementation is unchanged from focused capture base `8b9f7c4`; the parent checkpoint passed the complete 159/5/218/107 clean-checkout verification. [Review](reference-review/2026-09-21-playlist-acceptance.md).\n\n"
)
if playlist_intro not in handoff:
    handoff = handoff.replace(marker, marker + playlist_intro, 1)
handoff = sub_once(
    handoff,
    r"(?m)^UI 159/159; MATCH 63/159; FLOW 11/58\..+$",
    "UI 159/159; MATCH 65/159; FLOW 13/58. The Playlist review advances two MATCH states and the Playlist detail/add-suggested-song journeys; the ready-flow and album decisions remain accepted. `docs/tasks.md` remains the sole acceptance ledger.",
    "handoff ledger",
)
handoff = sub_once(
    handoff,
    r"(?m)^Continue with a dependency report from the unchecked rows in `docs/tasks.md`.*$",
    "Recompute the dependency report from the updated ledger, then review Chart detail: its only unchecked endpoint is `8a234785`, and `FLOW-d5d60236` already has a real-control path. Do not reopen accepted New, Home, Replay, account, trial, album or Playlist states solely because lawful platform residuals are non-zero; reopen only for a concrete product mismatch or regression.",
    "handoff next target",
)
runtime_marker = "## Runtime, identity and preservation\n\n"
local_note = (
    "Remote-machine reconciliation note: Desktop Commander quota ended with a local-only pre-publication edit in `apple-music-clone/scripts/browser_live_fidelity.py`. Current `main` already owns the corresponding Shuffle/Repeat journeys. On the next remote session, fetch first and inspect that single duplicate diff; do not reset, clean or discard unrelated work.\n\n"
)
if local_note not in handoff:
    handoff = replace_once(
        handoff,
        runtime_marker,
        runtime_marker + local_note,
        "handoff runtime marker",
    )
HANDOFF.write_text(handoff, encoding="utf-8", newline="\n")

audit = AUDIT.read_text(encoding="utf-8")
audit_marker = "# Reference audit — findings, not acceptance\n\n"
if audit.count(audit_marker) != 1:
    raise RuntimeError("reference-audit heading mismatch")
audit_section = dedent(
    """\
    ## Latest Playlist acceptance

    The [Emotional Songs Playlist review](reference-review/2026-09-21-playlist-acceptance.md) accepts the initial and four-song states after exact source/current/residual review, then accepts Playlist detail and Add suggested song through visible real controls. The ledger is **UI 159/159, MATCH 65/159, FLOW 13/58**. The app checkpoint passed the complete clean-checkout corpus; no application or frozen-reference file changes in this acceptance-only batch.


    """
)
audit = audit.replace(audit_marker, audit_marker + audit_section, 1)
AUDIT.write_text(audit, encoding="utf-8", newline="\n")

print(json.dumps({"counts": counts, "metrics": metrics}, indent=2))
