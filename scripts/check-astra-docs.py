#!/usr/bin/env python3
"""Check this repository's active docs and restricted skill metadata, offline.

This is a structural regression check, not a general Markdown/YAML parser,
external-link checker, model-routing evaluation or visual acceptance tool.
"""
from __future__ import annotations

import datetime as dt
import json
from pathlib import Path
import re
import subprocess
import sys
from urllib.parse import unquote, urlsplit

ROOT = Path(__file__).resolve().parents[1]
FROZEN_REFERENCE = "dde330ce23357fda311a21c32b1d23030126765e"
HISTORICAL_DOCS = "3a07bc4fb09b409fa069f68b0a826edccfeceaff"


def parse_skill(text: str, expected_name: str) -> dict[str, str]:
    """Validate the deliberately small name/description-only schema we use."""
    lines = text.splitlines()
    if not lines or lines[0] != "---":
        raise ValueError("skill needs opening frontmatter")
    try:
        end = lines.index("---", 1)
    except ValueError as exc:
        raise ValueError("skill needs closing frontmatter") from exc
    fields: dict[str, str] = {}
    for line in lines[1:end]:
        key, separator, value = line.partition(":")
        if not separator or key not in {"name", "description"} or key in fields:
            raise ValueError("unsupported or duplicate skill metadata")
        fields[key] = value.strip()
    if set(fields) != {"name", "description"}:
        raise ValueError("name and description are required")
    if not re.fullmatch(r"[a-z0-9]+(?:-[a-z0-9]+)*", fields["name"]):
        raise ValueError("skill name must be a plain kebab-case scalar")
    if fields["name"] != expected_name:
        raise ValueError("skill name does not match its directory")
    description = fields["description"]
    if not 20 <= len(description) <= 220 or ": " in description or " #" in description:
        raise ValueError("description must be a short safe plain scalar")
    if len("\n".join(lines[end + 1:]).strip()) < 100:
        raise ValueError("skill needs substantive workflow instructions")
    return fields


def internal_targets(text: str) -> list[str]:
    """Return local paths from simple inline links outside fenced code blocks."""
    text = re.sub(r"(?ms)^```[^\n]*\n.*?^```[^\n]*(?:\n|$)", "", text)
    targets: list[str] = []
    for raw in re.findall(r"(?<!!)\[[^\]\n]+\]\(([^)\n]+)\)", text):
        parsed = urlsplit(raw.strip())
        if parsed.scheme or parsed.netloc or not parsed.path:
            continue
        targets.append(unquote(parsed.path))
    return targets


def validate_source_register(data: dict) -> None:
    if data.get("schema_version") != 1:
        raise ValueError("unsupported source-register schema")
    dt.date.fromisoformat(data["review_date"])
    pin = data["upstream_skills"]["commit"]
    if not re.fullmatch(r"[0-9a-f]{40}", pin):
        raise ValueError("upstream skill commit must be an immutable full SHA")
    ids: set[str] = set()
    for item in data["sources"]:
        if item["id"] in ids:
            raise ValueError("duplicate source ID")
        ids.add(item["id"])
        if item["status"] not in {"reviewed", "partially_reviewed", "indexed"}:
            raise ValueError("invalid source review status")
        dt.date.fromisoformat(item["reviewed_on"])
        parsed = urlsplit(item["url"])
        if parsed.scheme != "https" or parsed.hostname not in {
            "developers.openai.com", "platform.openai.com", "openai.com",
            "learn.chatgpt.com", "github.com",
        }:
            raise ValueError("source must have an official HTTPS URL")
        if parsed.hostname == "github.com" and not parsed.path.startswith(
            f"/openai/skills/blob/{pin}/"
        ) and not parsed.path.startswith(f"/openai/skills/tree/{pin}/"):
            raise ValueError("GitHub skill source must use the recorded upstream pin")
        if not item.get("scope", "").strip():
            raise ValueError("source review scope is required")
    if not ids:
        raise ValueError("empty source register")
    skills = data["project_skills"]
    if not skills or len(skills) != len(set(skills)):
        raise ValueError("project skill names must be present and unique")


def git(*args: str) -> str:
    return subprocess.check_output(
        ["git", *args], cwd=ROOT, text=True, encoding="utf-8", stderr=subprocess.PIPE
    ).strip()


def generated_block(text: str) -> str:
    begin = "<!-- BEGIN:nextjs-agent-rules -->"
    end = "<!-- END:nextjs-agent-rules -->"
    start = text.index(begin)
    finish = text.index(end, start) + len(end)
    return text[start:finish]


def main() -> int:
    registry = json.loads((ROOT / "docs/astra/sources.json").read_text(encoding="utf-8"))
    validate_source_register(registry)
    skills = sorted((ROOT / ".agents/skills").glob("*/SKILL.md"))
    actual_names = {path.parent.name for path in skills}
    if actual_names != set(registry["project_skills"]):
        raise ValueError("skill directories and source register disagree")
    for path in skills:
        parse_skill(path.read_text(encoding="utf-8"), path.parent.name)

    active = [ROOT / name for name in ("AGENTS.md", "CLAUDE.md", "README.md")]
    active += [ROOT / "apple-music-clone" / name for name in ("AGENTS.md", "CLAUDE.md", "README.md")]
    active += [path for path in (ROOT / "docs").glob("*.md") if path.name != "tasks.md"]
    active += list((ROOT / "docs/astra").glob("*.md")) + skills
    active += [ROOT / "docs/history/README.md"]
    checked_links = 0
    for path in sorted(set(active)):
        text = path.read_text(encoding="utf-8")
        for target in internal_targets(text):
            resolved = (path.parent / target).resolve()
            if not resolved.is_relative_to(ROOT.resolve()) or not resolved.exists():
                raise ValueError(f"broken or out-of-repo link: {path.relative_to(ROOT)} -> {target}")
            checked_links += 1
        for forbidden in ("The active app belongs in `web/`", "Deploy `web/` only", "Work only on `main`."):
            if forbidden in text:
                raise ValueError(f"superseded active instruction: {path.relative_to(ROOT)}")

    root_agent = (ROOT / "AGENTS.md").read_text(encoding="utf-8")
    app_agent = (ROOT / "apple-music-clone/AGENTS.md").read_text(encoding="utf-8")
    old_agent = (ROOT / "docs/history/pre-astra-2026-09-12/app-AGENTS.md").read_text(encoding="utf-8")
    if "astra-pro" not in root_agent or "docs/tasks.md" not in root_agent:
        raise ValueError("root contract lacks branch or checklist authority")
    if len(root_agent.encode("utf-8")) > 8192 or len(app_agent.encode("utf-8")) > 10240:
        raise ValueError("agent entry points exceed the project's context budget")
    if generated_block(app_agent) != generated_block(old_agent):
        raise ValueError("generated Next.js instruction block changed")
    if git("rev-parse", "HEAD:apple-music-clone/reference") != FROZEN_REFERENCE:
        raise ValueError("frozen reference Git tree changed")
    if git("rev-parse", "HEAD:docs/history/pre-astra-2026-09-12/docs") != HISTORICAL_DOCS:
        raise ValueError("historical documentation Git tree changed")
    print(json.dumps({
        "active_documents_checked": len(set(active)), "local_link_paths_checked": checked_links,
        "project_skills_checked": len(skills), "source_records_checked": len(registry["sources"]),
        "frozen_reference_git_tree": "unchanged", "historical_docs_git_tree": "unchanged",
        "generated_next_block": "unchanged", "runtime_or_visual_acceptance": False,
        "limits": "No external URL, anchor, model routing, dirty reference bytes or visual review validation.",
    }, indent=2))
    return 0


if __name__ == "__main__":
    try:
        raise SystemExit(main())
    except (OSError, ValueError, KeyError, TypeError, subprocess.CalledProcessError) as exc:
        print(f"Documentation check failed: {exc}", file=sys.stderr)
        raise SystemExit(1) from exc
