# Documentation verification

From the repository root, use the installed Python 3.10+ and Node runtimes:

```text
python -m unittest discover -s scripts -p test_astra_docs.py -v
python scripts/check-astra-docs.py
node apple-music-clone/scripts/check-task-coverage.mjs
```

The documentation validator has no third-party Python dependencies. It checks the active Markdown files' simple local link paths, the restricted name/description skill schema, registered skill names, source-record provenance/status, entry-point size budgets, the preserved generated Next.js block, and the committed frozen-reference/historical-doc Git tree identities. Nine unit cases exercise important parser/metadata boundaries.

It deliberately excludes the live task file and historical review/snapshot prose from new-document link linting. The existing read-only task coverage checker validates the live inventory instead. Historical text is preserved rather than rewritten to satisfy new lint rules.

The GitHub workflow `Astra documentation contract (not clone acceptance)` runs these checks on relevant `astra-pro` pushes and pull requests. Its checkout and Node setup actions reuse the repository's existing pinned action commits. It does not install app dependencies, start a browser, execute provider calls, tick acceptance boxes or modify branch protection. The original clone runtime workflow remains separate.

A pass does not verify external URLs, Markdown anchors, arbitrary YAML syntax, model skill-trigger behavior, dirty reference bytes, the live server or visual fidelity. Use the existing archive/browser/comparison checks for their own purposes. Report the actual workflow run and commit when observed; a configured workflow or successful local unit test is not proof that remote CI passed.

See [the Astra guide](README.md), [source register](sources.json) and [quality contract](../quality-and-operations.md).
