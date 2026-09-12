# Sidebar live-state and compiled-material review — 2026-09-12

Implementation: `a30a9eee7d7b3a44874fd2b4364b30648c064455`, pushed normally on `main`. This preserves `05ee6ec`, the preceding sidebar/library work, and all earlier main history. No reference, dependency, font or deployment changes were made.

## Reproduced defects and implementation

The Alpha fixture's sidebar material and wide scrollport depended on `data-source`; opening Volume cleared that routing hint, flattened the sidebar and changed the visible catalog artwork/text. `NewView` now retains its initial artwork edition through local controls, and glass/scrollport geometry follow the actual carousel position. The opaque selected New row was replaced with a translucent treatment while artwork is behind it.

The continuous carousel test then exposed a Previous button underneath the sidebar and a return-scroll failure at 1264px. The real button is now in the visible gutter with a tall chevron, and the expanded scrollport has the corresponding native snap padding. The existing six-width containment regression passes without forced clicks or weaker assertions.

A visibility hook now removes the New/Home material tint when its owning rail has scrolled offscreen, restoring it when that artwork returns. This is a bounded state correction, not a claim that the remaining synthetic gradient or preceding artwork is an exact reconstruction.

A production computed-style probe caught the standard blur override being dropped when declared before its prefixed counterpart. The standard declaration is now last. The registered Alpha regression asserts the exact optimized-build value, `blur(18px) saturate(1.15)`, rather than merely checking for a non-empty filter. The earlier all-green run with the weaker assertion is explicitly superseded.

## Final verification identity

Application SHA-256: `a69870d6f1255be4c935c9329af8b77693612e6bab77ba30b0385252d86079ee`.
QA-tooling SHA-256: `90d4bbed39b006c0329b9778e969ac011e3181e7d072cbdc3ed00f3de4bac34f`.
Build ID: `x2_WEykdWwFWc7ox6Ou_S`.

The final canonical production run passed 159 desktop captures, five responsive samples, 218 route checks and 51 interaction regressions, with zero failures. Typecheck, optimized build, archive integrity, task coverage, five Python tests and nine Node integrity tests passed. Application and QA hashes stayed stable through capture and match the committed implementation; historical capture metadata still correctly records `05ee6ec` plus then-uncommitted changes.

All 159 images were compared at their actual viewports: 147 at 1440×903 and 12 at 1440×904. Only the documented 120px acquisition footer was excluded. Against the preceding `controls-20260912-074455` complete comparison, Alpha `54b01eab` improved from 9.8659% to 9.6403% over-20 pixels. The other 158 over-20 measurements were unchanged; none worsened. `a4afd6e6` additionally has a negligible sub-threshold MAE change of −0.000000769. No product region was masked or resized.

## Continuous-state evidence and remaining differences

Three new cases are registered in the canonical runner: Alpha controls, the five-state New sequence plus return, and the authenticated Home carousel/vertical-scroll segment. They are behavioral regressions, not three accepted recorded flows. The Home segment does not replace the complete six-step Home journey starting at New.

The New journey starts at `e72be564`, hovers the real carousel control for `4f611a9e`, advances twice to Alpha, scrolls with the mouse wheel through `8b03c9d0` and `706de500`, returns to the top and uses Previous twice. It never jumps to later fixtures or silently replaces the initial account/catalog snapshot.

| Live checkpoint | Original over-20 residual | Direct-fixture over-20 residual |
| --- | ---: | ---: |
| Initial New `e72be564` | 6.7546% | 0% |
| Hovered New `4f611a9e` | 10.4831% | 4.0867% |
| Live Alpha `54b01eab` | 10.6978% | 1.8698% |
| Scrolled shelves `8b03c9d0` | 10.0745% | 0.0353% |
| Bottom New `706de500` | 5.5943% | 0.0353% |
| Scrolled-carousel Home `d5173715` | 6.0798% | 0% |

The lower New endpoint naturally clamps at the document bottom: the section box reaches y=115.75 rather than the diagnostic target y=113. The screenshot retains this difference; the test waits for the native clamped scroll position instead of injecting a layout offset.

Alpha Volume/Account stress captures intentionally contain controls absent from the closed-control original. Their full-frame residuals are not visual acceptance measures. After Escape, the 918 over-20 pixels versus the initial direct fixture lie in the Account focus treatment at x=14–137, y=847–881; the player's region has no over-20 difference. Keyboard focus was not hidden to manufacture a screenshot.

Remaining: incorrect/partial preceding release artwork; synthetic glass colour distribution and vertical motion while partly visible; typography, icon/avatar details, arrow material, player styling and lower artwork; New's source/direct/live snapshot differences. The old queue/lyrics entry and library-editing snapshot discrepancies remain open. No acceptance counters changed: **UI 159/159; MATCH 0/159; full recorded FLOW 0/58**.

## Evidence and server ownership

App-relative root: `.parity-evidence/sidebar-live-20260912-092105/`. Final evidence is `production-verified/results.json`, `production-verified-comparison/index.html` / `metrics.json`, and `production-verified-journey-comparison/index.html` / `metrics.json`. The journey gallery covers 13 ordered observed states against originals and direct fixtures, with hashes and actions. `compiled-sidebar-current.json` proves the current production material; `verification-compiled.log` and `build-verified-*.json` identify the stable build. Earlier `before/`, `after-state/`, `after-controls/`, `after-scroll/`, `production/` and `production-final/` are preserved diagnostics, not the final candidate.

Production audit PID 58192 on 127.0.0.1:6432 was started after the verified build. Development PID 6880 on 127.0.0.1:6431 was left running. Port 3000 was untouched. Recheck ownership and freshness before future use.

To avoid exhausting J:, this session's completed generated image directories were copied and hash-verified on D:, then exposed at their unchanged original J: paths through directory junctions. Final backing storage is `D:\courses-parity-evidence\sidebar-live-20260912-092105`; two earlier diagnostic directories use `D:\courses-sidebar-audit-temp-20260912-074616\evidence-relocated-sidebar-live-20260912-092105`. `evidence-storage.json` and `evidence-storage-finished.json` record every preserved hash. Do not delete those backing directories. Source, frozen references, previous-session evidence and dependencies were not relocated. No evidence images or junctions are committed.

## GitHub verification

Run **34680539220**, job **103518256549**, completed successfully for `a30a9ee`: locked install, archive/coverage checks, typecheck, build, unit tests, real-control browser suite, all 159 comparisons and evidence retention passed. The optional strict clone acceptance gate was skipped, not passed.
