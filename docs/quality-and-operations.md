# Quality, evidence and operations

## Scope checks to the change

| Change | Required evidence |
| --- | --- |
| Docs or skills | Correct paths/authority, valid metadata, preserved historical evidence, no invented completion; run the docs validator when available |
| Local component behavior | Type/build checks as relevant, focused real-control regressions, source/candidate review for affected states |
| Shared shell, styles or state | Stable full-corpus capture/comparison, dependent interaction regressions and review of improvements and regressions |
| Runtime-sensitive layout | Fresh optimized-production checks, cold entry, computed output and process/build identity |
| Future identity/data | Real-role positive and cross-user/workspace negative tests, migrations/constraints/grants/policies and protected payload checks |
| Future payments/media | Provider sandbox, signatures, duplicate/concurrent/out-of-order events, rollback/recovery, authorization and expiry tests |
| Release | Accepted scope, rights, actual configuration, security/privacy/support, recovery, budgets and explicit deployment approval |

Do not run unrelated suites to create ceremony, or omit full regression after a high-blast-radius change. Tests must assert the defect and its important boundaries; a helper file or mocked success is not evidence the behavior works.

## Evidence contract

Record exact source IDs, source/candidate hashes, source commit plus dirty content identity when applicable, QA identity, viewport/crop, browser/OS/scale, actual font usage, actions, console/resource errors, reviewer and evidence location. Use fresh output directories, retain failed attempts and reject captures whose source changed mid-run.

Numerical residuals rank diagnosis, not acceptance. Review whole screens at readable size; inspect crops only in context. Do not overwrite baselines, resize mismatched candidates, mask product content, weaken thresholds or silently skip references. The originals remain byte-identical.

A real-control FLOW needs every recorded step. Existing route checks, responsive samples and interaction-regression totals must be reported separately. An agent's review is not owner approval; a second pass by the same agent is not an independent reviewer. No automation is allowed to tick MATCH/FLOW solely from a score or green CI.

## Current gates

`qa:archive` validates archive integrity; `qa:coverage` checks the single inventory; the browser/comparison tools generate evidence. `qa:acceptance` is intentionally strict and fails until the required review entries are complete. The owner then approves or rejects the phase transition. Current historical totals are in the handoff, not recertified by this document.

The existing reference workflow currently targets `main`. The new documentation workflow targets `astra-pro` guidance changes. Before application implementation is checkpointed on `astra-pro`, enable the unchanged reference verification there and observe the run. A skipped, queued or unavailable check is not passed. No branch-protection policy is assumed.

## Accessibility and usability

Preserve semantic controls, labels, keyboard navigation, visible focus, dialog focus/return, errors, reduced-motion behavior and media controls in current clone work. Check containment at the existing responsive widths. Responsive smoke evidence is not mobile reference parity.

For the later course product, target WCAG 2.2 AA and verify composed behavior, content contrast, zoom, captions, mobile keyboards and actual mobile browsers. Automated checks supplement manual testing; neither a UI library nor this document certifies accessibility.

## Deferred operations

Before real selling, designate an owner for access/payment failures, media processing, support and reports. Use safe correlation/event/order identifiers, not secrets or private note content in logs. Reconciliation reuses the same idempotent fulfillment rules; test retry/replay and downtime recovery. Do not repair incidents by blindly setting an `is_paid` flag or making private media public.

Track actual upload/delivery/storage/payment/support costs and enforce quotas before open creator enrollment. Define database, media, private-file and provider-mapping recovery; test a nonproduction restore. A database backup alone is not a complete product restore. Do not assume an unverified vendor plan includes a feature.

Release only independent licensed assets and real data. Keep preview/staging/production separate. Application rollback does not undo provider or database state; record compatibility and recovery steps. No live payment, production infrastructure or deployment is authorized by a documentation commit.
