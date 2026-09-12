# Official OpenAI source collection

Reviewed 2026-09-12. The machine-readable authority is [sources.json](sources.json). This is a curated working collection, not an exhaustive offline mirror of OpenAI or an assertion that every upstream skill is installed.

| ID | Source | Use and review limit |
| --- | --- | --- |
| OAI-01 | [Latest-model guidance](https://developers.openai.com/api/docs/guides/latest-model) | Current Astra/model migration entry point; recheck API parameters and availability at actual use |
| OAI-02 | [Rethinking skills and prompts for GPT-6 Astra](https://developers.openai.com/blog/rethinking-skills-and-prompts-for-gpt-6-astra) | September 11, 2026 guidance on instruction/skill design |
| OAI-03 | [Docs MCP](https://developers.openai.com/learn/docs-mcp) | Read-only documentation access; existing search/fetch tools verified locally, no installation performed |
| OAI-04 | [AGENTS.md](https://learn.chatgpt.com/docs/agent-configuration/agents-md) | Instruction discovery/scope; root and app files remain concise |
| OAI-05 | [Build skills](https://learn.chatgpt.com/docs/build-skills) | Repository skill layout and metadata; runtime discovery must be verified separately |
| OAI-06 | [Frontend prompting](https://developers.openai.com/api/docs/guides/frontend-prompt) | Reviewed as a GPT-5.5-framed guide; preserve existing designs, do not treat generic defaults as measured Apple CSS |
| OAI-07 | [Official openai-docs skill](https://github.com/openai/skills/blob/49f948faa9258a0c61caceaf225e179651397431/skills/.curated/openai-docs/SKILL.md) | Reviewed documentation/model-source workflow; helper scripts not executed or audited |
| OAI-08 | [Official Playwright skill](https://github.com/openai/skills/blob/49f948faa9258a0c61caceaf225e179651397431/skills/.curated/playwright/SKILL.md) | Header and opening workflow inspected; CLI/Bash prerequisites are not the current Windows Python QA setup |
| OAI-09 | [Official GitHub CI skill](https://github.com/openai/skills/blob/49f948faa9258a0c61caceaf225e179651397431/skills/.curated/gh-fix-ci/SKILL.md) | Skill instructions inspected; helper not installed, executed or audited |
| OAI-10 | [Curated skill catalog](https://github.com/openai/skills/tree/49f948faa9258a0c61caceaf225e179651397431/skills/.curated) | Discovery index only, not a claim of complete skill review |

## Source precedence and provenance

Use fresh official documentation for volatile model/API claims. Preserve an explicitly requested target rather than silently changing it to whatever is newest. Use installed framework documentation for the app's exact version. Use live connected tools for private repository/computer state, not public search or memory.

The inspected upstream `openai/skills` main commit was `49f948faa9258a0c61caceaf225e179651397431`. Pinned links preserve what was reviewed; the original main-branch links remain useful for checking updates. Do not execute a newly fetched helper or installer without reviewing its scope, dependencies, rights and permissions. No upstream license is implied for unrelated reference imagery or fonts.

A website review date is not a claim that its content is immutable or a byte-for-byte snapshot. When current sources fail, identify the exact failure and any dated fallback. Do not stamp every carried-forward link as freshly verified.

Local adoption on 2026-09-12 reopened OAI-01, OAI-02, OAI-04 and OAI-05 in full through the existing Docs MCP. The upstream `main` SHA was rechecked and still matched the pin above. The bundled local OpenAI Docs skill was read in full, and the upstream OAI-07 routing section was inspected; no helper distribution was copied or executed. Other source statuses are inherited from the GPT web checkpoint, not a claim of a new complete review. Project workflows were read explicitly and structurally validated; automatic selection remains untested.

## Refresh procedure

At a model/tool migration, or a scheduled review explicitly requested by the owner, compare the current guide and upstream commit with this register. Identify concrete changed behavior, affected local rules and test cases. Update only relevant documents/skills, retain provenance and run the docs checks plus task-specific regression. Do not blindly sync all upstream instructions, auto-upgrade dependencies, overwrite global configuration or relax acceptance.

A periodic refresh is useful but is not configured by this document. Broad legal, commercial, pricing or framework recommendations require their own current primary sources when that later work is assigned.
