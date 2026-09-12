# Astra engineering guide

This is the development-agent setup for Courses, not an AI feature inside the product. The task remains a true Apple Music clone first, followed by an explicitly authorized course-platform adaptation. The Git branch `astra-pro` does not select a model or change account entitlements.

## What is included

[Sources](sources.md) and [sources.json](sources.json) collect the relevant official guidance with dates and review scope. [Skills](skills.md) distinguishes project-authored workflows from upstream skills that have only been inspected or indexed. [Prompts](prompts.md) provides outcome-focused implementation/review/handoff prompts. [Branch transition](branch-transition.md) preserves the unpublished Windows work during local adoption.

The root `AGENTS.md` contains durable constraints and pointers. Detailed runbook and acceptance rules live in their owning documents. Load a skill only for its matching task. Do not copy every article, model example or provider guide into always-on context.

## Astra-specific conclusions

At the 2026-09-12 review, the official latest-model guide identifies `gpt-6-astra`. It recommends auditing inherited instructions and choosing verification/delegation appropriate to the task. Its migration requirements must be checked before any real API upgrade; a branch name is not an API slug. Source: OAI-01 in the register.

The September 11 Astra article recommends concise, specifically triggered skills and reduced instruction clutter. We apply that through short entry points and four narrow repository workflows rather than bulk-installing a catalog. Source: OAI-02. These are project design choices, not a guarantee of perfect output.

## Tool and configuration boundaries

Use the connected GitHub and authorized computer for their live data/actions. Verify actual browser and command capabilities in each environment. Do not pretend a screenshot, a new skill file or a model name creates a browser tool, subagent, MCP connection or independent reviewer.

OpenAI Docs MCP supplies documentation search/content, not application API execution. In an authorized Codex client, inspect `codex mcp list` first. When setup is explicitly authorized and that server is absent, the documented command is:

```text
codex mcp add openaiDeveloperDocs --url https://developers.openai.com/mcp
```

Check `codex mcp list` and a real docs query afterward. This revision does not execute that command, install a global skill, change `.codex/config.toml`, select Pro settings or provision an OpenAI API key. Existing policy/settings take precedence over examples. See OAI-03 for current setup instructions.

## Working rhythm

For an assigned implementation task, inspect the relevant evidence and existing state, make a bounded change, verify the affected behavior and continue to the next concrete defect while scope and tools allow. Do not replace implementation with repeated planning or request new permission for already-authorized reversible work. Stop at genuine access, destructive-action, financial, rights or phase boundaries, and report the exact blocker.

Use focused tests for local changes and full-corpus regression for shared shell/state/style changes. Record evidence that can disprove the result, including failed attempts and worsened states. A docs validator, CI check or model self-review never grants MATCH/FLOW or owner approval.
