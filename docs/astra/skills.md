# Skills — focused, attributable and optional by task

## Project-authored workflows included in this revision

| Skill | Trigger | Not a trigger |
| --- | --- | --- |
| [courses-reference-fidelity](../../.agents/skills/courses-reference-fidelity/SKILL.md) | Implement/review a saved Apple Music screen's visual match | Generic frontend design or a course redesign |
| [courses-recorded-flow](../../.agents/skills/courses-recorded-flow/SKILL.md) | Implement/verify a recorded Apple Music journey through real controls | Loading a set of fixture URLs |
| [courses-openai-guidance](../../.agents/skills/courses-openai-guidance/SKILL.md) | Refresh model, prompt, Codex or skill guidance for this repository | Ordinary UI implementation with no OpenAI question |
| [courses-handoff](../../.agents/skills/courses-handoff/SKILL.md) | Resume or checkpoint existing work with preservation and evidence | Replacing an implementation task with planning documents |

These are original project instructions, not OpenAI-authored official skills or installed plugins. Their repository location follows the reviewed skill-authoring guide. In a client that supports repository skills, verify they are actually discovered; in another environment, open the matching file explicitly. No tool capability or independent reviewer is created by adding a SKILL.md.

Local adoption inspected all four files. The handoff and OpenAI-guidance workflows were explicitly read during adoption. The subsequent main-consolidation task's skill catalog lists all four project skills, establishing discovery in this Codex client. Automatic trigger quality and behavioral evaluations remain untested. Repository `.agents/skills` discovery is documented by [Build skills](https://learn.chatgpt.com/docs/build-skills); if a client has stale instructions after the branch switch, start a fresh task in `J:\courses` or read the relevant files explicitly. Do not install duplicate global copies as a workaround.

## Official skills reviewed or indexed, not bulk-installed

The requested `openai-docs` skill is the main upstream reference for official documentation and model guidance. Its scripts and fallback files are not bundled here, so commands referring to them must not be presented as locally runnable. Inspect a complete pinned distribution, dependencies, license and script behavior before any future installation.

The upstream Playwright skill is CLI-first and its inspected opening uses a Bash wrapper and user-scoped paths. Our existing Windows QA uses isolated Python tooling and repository-specific state/evidence checks. Do not replace those checks or copy incompatible shell paths just to say an official skill was installed.

The upstream GitHub CI skill is useful for failure-context discipline but has its own CLI and approval assumptions. Local adoption verified Git remote access and an authenticated `gh` read of the Astra workflow. Use the actually available authorized tool and the user's current task scope; do not add an unrelated authentication/configuration ritual or ignore real approval boundaries.

The pinned curated catalog also exposes design, goal-setting and other integration-specific skills. They remain discovery candidates, not instructions to install every tool, scaffold another app or introduce Figma/service dependencies absent from the task. See [the source collection](sources.md) for exact review status.

## Skill quality checks

Keep names unique and descriptions specific. Put stable project constraints in AGENTS, repeatable task procedure in a skill, and detailed evidence/commands in the owning document. A source register is not another backlog. Never give a skill a trigger so broad it runs on every edit.

A workflow evaluation should test a positive example, an adjacent task that should not trigger it, its required outputs, and a failure/permission case. The repository's docs validator checks structural consistency, not model routing quality. Do not claim these workflows have been behaviorally evaluated in a client until those runs are observed.
