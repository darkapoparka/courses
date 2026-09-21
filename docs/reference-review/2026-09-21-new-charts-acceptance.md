# New, charts and Home acceptance review — 2026-09-21

## Scope and authority

This review uses `docs/tasks.md` as the sole acceptance ledger. It reviews the exact immutable source frame, the clean optimized candidate produced from `main` at `537a2c4c9c9e19db304812ebbd257a0d3d6a3c75`, and an amplified absolute residual for every previously open New/charts/Home state in this family. It does not infer acceptance from route coverage or aggregate residual alone.

The optimized build is `.qa/build-player-icons-20260921`, build ID `tHwh7uBYrWhqCGATOKcTN`. The clean browser corpus is `.qa/evidence/player-icons-20260921/optimized-browser-rerun`; comparison output is `.qa/evidence/player-icons-20260921/optimized-comparison-rerun`. The family review sheets are `.qa/evidence/acceptance-review/new-charts` and show exact source, exact current candidate and 4× absolute residual side by side.

That current batch passed 159 desktop captures, five responsive captures, all 218 recorded routes, all 104 registered real-control interaction regressions, typecheck, optimized build, archive integrity, coverage inventory, QA-tool tests and cover-integrity tests. Those gates establish reproducibility and behavior; the per-state visual review below establishes MATCH acceptance.

## Accepted exact states

For each state below, whole-frame and critical-region review found the same strings, scenario/session state, geometry, artwork identity and order, player/sidebar material, control state, continuation, and scroll anchor as the saved source. The visible remainder is confined to lawful Windows/Chromium text and SVG antialiasing, live translucent-material rasterization, or tiny decoder variation; no product-level mismatch remains.

| Screen | State | MAE | >20 pixels | Real-control test | Exact source | Exact candidate |
| --- | --- | ---: | ---: | :---: | --- | --- |
| `1f9e170c` | New — playing stupid song | 3.013102 | 3.297111% | yes | `reference/originals/1f9e170c-8798-46de-90ea-d5236c7f15be.webp` | `.qa/evidence/player-icons-20260921/optimized-browser-rerun/1f9e170c-8798-46de-90ea-d5236c7f15be-1440.png` |
| `3731221f` | New — signed out | 2.788665 | 3.228898% | yes | `reference/originals/3731221f-497f-40a3-b00a-30abfe3766da.webp` | `.qa/evidence/player-icons-20260921/optimized-browser-rerun/3731221f-497f-40a3-b00a-30abfe3766da-1440.png` |
| `a917d88f` | Home — named profile | 3.706253 | 3.948567% | yes | `reference/originals/a917d88f-d15a-4f53-92d3-1daecf59d05f.webp` | `.qa/evidence/player-icons-20260921/optimized-browser-rerun/a917d88f-d15a-4f53-92d3-1daecf59d05f-1440.png` |
| `4f611a9e` | New — named profile | 2.902010 | 3.149686% | yes | `reference/originals/4f611a9e-b39b-4ee5-a6b7-fa10fad5f093.webp` | `.qa/evidence/player-icons-20260921/optimized-browser-rerun/4f611a9e-b39b-4ee5-a6b7-fa10fad5f093-1440.png` |
| `aefa8502` | Home — signed out | 1.449997 | 1.539838% | yes | `reference/originals/aefa8502-aec3-486a-b4f5-5075590500f1.webp` | `.qa/evidence/player-icons-20260921/optimized-browser-rerun/aefa8502-aec3-486a-b4f5-5075590500f1-1440.png` |
| `11803c64` | New — selected stupid song | 3.004145 | 3.097007% | yes | `reference/originals/11803c64-693e-4f2d-8c3e-576691601b2b.webp` | `.qa/evidence/player-icons-20260921/optimized-browser-rerun/11803c64-693e-4f2d-8c3e-576691601b2b-1440.png` |
| `c98f8b54` | New — selected stupid song | 3.145058 | 3.288498% | yes | `reference/originals/c98f8b54-6f64-4fca-883c-fac90f73b848.webp` | `.qa/evidence/player-icons-20260921/optimized-browser-rerun/c98f8b54-6f64-4fca-883c-fac90f73b848-1440.png` |
| `ad689c37` | New — selected Lush Life | 3.153364 | 3.222438% | yes | `reference/originals/ad689c37-d388-40c5-b490-ddf9eb7a9a49.webp` | `.qa/evidence/player-icons-20260921/optimized-browser-rerun/ad689c37-d388-40c5-b490-ddf9eb7a9a49-1440.png` |
| `d83e96ba` | New — playing Lush Life | 3.160767 | 3.228590% | yes | `reference/originals/d83e96ba-2976-4612-9441-f941d67b6f31.webp` | `.qa/evidence/player-icons-20260921/optimized-browser-rerun/d83e96ba-2976-4612-9441-f941d67b6f31-1440.png` |
| `9fbb38e1` | New — playing stupid song | 3.236446 | 3.401701% | yes | `reference/originals/9fbb38e1-269a-431e-8f51-deb9bea70744.webp` | `.qa/evidence/player-icons-20260921/optimized-browser-rerun/9fbb38e1-269a-431e-8f51-deb9bea70744-1440.png` |
| `afd02fa6` | New — playing stupid song | 3.250914 | 3.491294% | yes | `reference/originals/afd02fa6-814c-4e4e-80fe-1e9ba2c6428a.webp` | `.qa/evidence/player-icons-20260921/optimized-browser-rerun/afd02fa6-814c-4e4e-80fe-1e9ba2c6428a-1440.png` |
| `54b01eab` | New — alpha featured cards | 3.743361 | 6.427418% | yes | `reference/originals/54b01eab-e635-4f54-882b-4bc62e7a2a4c.webp` | `.qa/evidence/player-icons-20260921/optimized-browser-rerun/54b01eab-e635-4f54-882b-4bc62e7a2a4c-1440.png` |
| `2f5da478` | Home — named profile | 3.959363 | 4.392842% | no | `reference/originals/2f5da478-5817-4e12-99bd-b2df0355f896.webp` | `.qa/evidence/player-icons-20260921/optimized-browser-rerun/2f5da478-5817-4e12-99bd-b2df0355f896-1440.png` |
| `e5e8383f` | New — superbloom featured cards | 4.106079 | 4.076843% | yes | `reference/originals/e5e8383f-21d7-4eea-873e-25874adfa906.webp` | `.qa/evidence/player-icons-20260921/optimized-browser-rerun/e5e8383f-21d7-4eea-873e-25874adfa906-1440.png` |
| `8b03c9d0` | New — scrolled to essentials | 4.280006 | 5.348606% | yes | `reference/originals/8b03c9d0-a80f-4d27-98c1-ed2ceccc4b1f.webp` | `.qa/evidence/player-icons-20260921/optimized-browser-rerun/8b03c9d0-a80f-4d27-98c1-ed2ceccc4b1f-1440.png` |
| `d5173715` | Home — alpha featured cards | 4.332368 | 5.920004% | yes | `reference/originals/d5173715-ea54-4801-837c-2a40ec9df2af.webp` | `.qa/evidence/player-icons-20260921/optimized-browser-rerun/d5173715-ea54-4801-837c-2a40ec9df2af-1440.png` |
| `706de500` | New — scrolled to coming soon | 4.338826 | 3.903654% | yes | `reference/originals/706de500-7231-4d8d-9820-89fac6c8aaac.webp` | `.qa/evidence/player-icons-20260921/optimized-browser-rerun/706de500-7231-4d8d-9820-89fac6c8aaac-1440.png` |
| `f2e44e3b` | New — superbloom featured cards | 4.369767 | 4.222191% | yes | `reference/originals/f2e44e3b-cb93-4607-a0bf-6e38aa56019d.webp` | `.qa/evidence/player-icons-20260921/optimized-browser-rerun/f2e44e3b-cb93-4607-a0bf-6e38aa56019d-1440.png` |
| `cf59e554` | New — playing stupid song, shuffle on | 4.659890 | 4.791282% | yes | `reference/originals/cf59e554-de37-4e4e-b41f-c5821582c72b.webp` | `.qa/evidence/player-icons-20260921/optimized-browser-rerun/cf59e554-de37-4e4e-b41f-c5821582c72b-1440.png` |
| `468b0465` | Home — Simplified Chinese | 4.675765 | 5.008075% | no | `reference/originals/468b0465-74be-480a-b303-cbbafc496c73.webp` | `.qa/evidence/player-icons-20260921/optimized-browser-rerun/468b0465-74be-480a-b303-cbbafc496c73-1440.png` |
| `a229e38a` | New — playing stupid song, repeat on | 4.770591 | 4.787437% | yes | `reference/originals/a229e38a-189e-417d-89a2-937c80ccb3b5.webp` | `.qa/evidence/player-icons-20260921/optimized-browser-rerun/a229e38a-189e-417d-89a2-937c80ccb3b5-1440.png` |
| `be864051` | New — Simplified Chinese | 5.080787 | 6.108650% | yes | `reference/originals/be864051-c59b-4676-a3c4-643fc136616d.webp` | `.qa/evidence/player-icons-20260921/optimized-browser-rerun/be864051-c59b-4676-a3c4-643fc136616d-1440.png` |
| `3728aa07` | New — edit navigation, superbloom featured cards | 5.848209 | 6.127320% | yes | `reference/originals/3728aa07-f749-4edd-8c9f-f2f606649f04.webp` | `.qa/evidence/player-icons-20260921/optimized-browser-rerun/3728aa07-f749-4edd-8c9f-f2f606649f04-1440.png` |
| `ffc18eb8` | New — edit navigation, superbloom featured cards | 5.861475 | 6.138228% | yes | `reference/originals/ffc18eb8-5cbb-4e01-b066-867308585f5f.webp` | `.qa/evidence/player-icons-20260921/optimized-browser-rerun/ffc18eb8-5cbb-4e01-b066-867308585f5f-1440.png` |
| `e027fe6d` | New — named profile | 6.072504 | 4.715224% | yes | `reference/originals/e027fe6d-4556-4638-9b51-12b4970cd85d.webp` | `.qa/evidence/player-icons-20260921/optimized-browser-rerun/e027fe6d-4556-4638-9b51-12b4970cd85d-1440.png` |
| `6ac70c34` | New — playing stupid song | 6.623775 | 5.534791% | yes | `reference/originals/6ac70c34-9db0-4ca6-9a2d-c6ca902eb663.webp` | `.qa/evidence/player-icons-20260921/optimized-browser-rerun/6ac70c34-9db0-4ca6-9a2d-c6ca902eb663-1440.png` |

The 26 MATCH entries above therefore advance immediately. Their historical notes remain in the ledger as a record of earlier blockers; this dated exact-state review supersedes those earlier open assessments for the current candidate.

## Initial New remains open

`e72be564` is not accepted. The selected sidebar row, live rounded artwork exclusions, player control/material ownership, feature cards, Viral Hits table, and lower-shelf geometry are substantially aligned, but the initial edition's second `New This Week` card still uses the generic `cover-9` fallback. Native-resolution source inspection exposes a dark-haired face, pale curved sleeve/object and blue backdrop that the fallback cannot produce.

The two immutable recordings were sampled at exact seek positions, including the 60 fps transition around the initial frame. They never expose the card unobscured: the initial state appears only with the live floating player already present, while the other recording uses the later ATEEZ edition. A whole-corpus masked occurrence search found only the same card under the same player geometry, not a second clean occurrence. The pinned kwn provider cover was downloaded and verified at its declared byte count and SHA-256, but its pixels contradict the exposed source and it was rejected. Reverse-image probes were non-probative because the crop is dominated by player chrome. No guessed cover, color compensation layer, screenshot card, or false catalog reset was installed.

`MATCH-e72be564` therefore stays open as a concrete group-A defect. It continues to block journeys that require the archived initial New endpoint, but it does not prevent independent family acceptance.

## Ledger result

This review advances MATCH from **22/159** to **48/159**. FLOW remains **3/58** pending ordered real-control journey review; no flow is inferred solely from accepted endpoints.
