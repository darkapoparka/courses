# Documentation verification

From the repository root, use the installed Python 3.10+ and Node runtimes:

```text
python -m unittest discover -s scripts -p test_astra_docs.py -v
python scripts/check-astra-docs.py
node apple-music-clone/scripts/check-task-coverage.mjs
```

The documentation validator has no third-party Python dependencies. It checks the active Markdown files' simple local link paths, the restricted name/description skill schema, registered skill names, source-record provenance/status, entry-point size budgets, the preserved generated Next.js block, and the committed frozen-reference/historical-doc Git tree identities. Nine unit cases exercise important parser/metadata boundaries.

It deliberately excludes the live task file and historical review/snapshot prose from new-document link linting. The existing read-only task coverage checker validates the live inventory instead. Historical text is preserved rather than rewritten to satisfy new lint rules.

The GitHub workflow `Astra documentation contract (not clone acceptance)` runs these checks on relevant `main` pushes and pull requests into `main`. Its checkout and Node setup actions reuse the repository's existing pinned action commits. It does not install app dependencies, start a browser, execute provider calls, tick acceptance boxes or modify branch protection. The separate clone runtime workflow also covers main pushes and pull requests into main. Its existing validation and artifact steps remain intact; manual dispatch is still available.

## Main consolidation - 2026-09-12

The current task changes branch ownership, merges the existing completed work and aligns contracts/CI with main. The other session's unfinished work is preserved separately until stable. Run the commands above, compare all checkbox lines and reference hashes against the recovery snapshots, and inspect final main ancestry and remote CI. [The transition record](branch-transition.md) owns exact source/recovery identities.

## Historical local adoption checks - 2026-09-12

The nine documentation unit cases passed with Python 3.13.1. The contract checker passed for 34 active documents, four project skills and ten source records. The existing task checker passed with UI 159/159, MATCH 0/159, FLOW 0/58 and 218 ordered steps; these are inventory counts, not new acceptance. All four skills also passed the installed skill-creator `quick_validate.py` check.

Separate preservation checks confirmed all 378 checkbox lines match the inherited checklist, the reference workflow differs only in the two branch filters, the eleven pending files match their snapshot in both checkouts, and `main` plus the historical course branch remain unchanged. All 577 reference files were SHA-256 checked unchanged after adoption. `git diff --check` passed. Full binary patches, file hashes and original indexes are retained in the local recovery directory recorded in [branch transition](branch-transition.md).

No local app build or browser test was run for that documentation checkpoint. Its copied UI/test batch was later committed and verified by the other session in `4c8840a`, with evidence in `e6a71f7`. Main consolidation retains that evidence. Any newer pending edits require their own verification; results must follow their exact source candidate.

A pass does not verify external URLs, Markdown anchors, arbitrary YAML syntax, model skill-trigger behavior, dirty reference bytes, the live server or visual fidelity. Use the existing archive/browser/comparison checks for their own purposes. Report the actual workflow run and commit when observed; a configured workflow or successful local unit test is not proof that remote CI passed.

See [the Astra guide](README.md), [source register](sources.json) and [quality contract](../quality-and-operations.md).
