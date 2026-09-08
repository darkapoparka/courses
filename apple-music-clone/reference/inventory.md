# Mobbin reference inventory

Source: [Apple Music Web collection](https://mobbin.com/apps/apple-music-web-a579a953-80de-4465-a2a6-99248e5c0e4f/b4378d66-a019-5876-aac6-85e67834d54f/screens)

Captured 2026-09-08 through the authenticated Codex in-app browser.

## Authoritative totals

| Asset type | Collection total | Accessible named set | Local route family |
| --- | ---: | ---: | --- |
| Screens | 159 | 159 IDs enumerated from the lazy-loaded list; representative detail URLs opened | `/screen/<mobbin-id>` |
| Flows | 58 | 3 visible flow records | `/flows/<flow>?step=<n>` |

The visible flow records are:

| Flow | Mobbin flow id | Reference screens | Local step count |
| --- | --- | ---: | ---: |
| Onboarding | `43dfc8c6-15e2-45bc-a706-c12abd7de475` | 10 | 10 |
| Starting a trial | `32937ec7-7be8-411a-bb39-cc45872aba7d` | 10 | 10 |
| New | `bc4b3fa8-4327-4e1a-8d67-a1b88ce4e369` | 5 | 5 |

## Per-screen status contract

Every collected ID is individually represented by a local deep link and a deterministic DOM variant. The generated [exhaustive screen-status ledger](screen-status.md) has one row per ID. `route=mapped` means the route is implemented; `reference=detail-opened` means the Mobbin detail URL was observed as an Apple Music screen in the authenticated browser; `visual=sampled` is reserved for representative IDs reviewed as rendered images during discovery. IDs not marked `visual=sampled` still require exact screenshot comparison before claiming 1:1 acceptance.

| ID | Route | Implementation | Reference |
| --- | --- | --- | --- |
| `c939c9b8-e195-4e43-92a6-b845d0b99243` | `/screen/c939c9b8-e195-4e43-92a6-b845d0b99243` | mapped / sampled | detail-opened |
| `ee8db412-71b0-49a8-a1ab-5d6685153abe` | `/screen/ee8db412-71b0-49a8-a1ab-5d6685153abe` | mapped / sampled | detail-opened |
| `b620e4ab-d6dc-47c9-b704-6cd45cbd714c` | `/screen/b620e4ab-d6dc-47c9-b704-6cd45cbd714c` | mapped / sampled | detail-opened |
| `484851bf-bc23-4088-8a34-4078c4d6b4ff` | `/screen/484851bf-bc23-4088-8a34-4078c4d6b4ff` | mapped / sampled | detail-opened |
| `035569a0-e8da-454e-8bfd-83e7eacfecc5` | `/screen/035569a0-e8da-454e-8bfd-83e7eacfecc5` | mapped / sampled | detail-opened |
| `dcafd99e-94e3-42a1-be31-e02f7e015ecc` | `/screen/dcafd99e-94e3-42a1-be31-e02f7e015ecc` | mapped / sampled | detail-opened |
| `a917d88f-d15a-4f53-92d3-1daecf59d05f` | `/screen/a917d88f-d15a-4f53-92d3-1daecf59d05f` | mapped / sampled | detail-opened |
| `06be9f09-22fe-45fc-93b8-a49214c9f5f5` | `/screen/06be9f09-22fe-45fc-93b8-a49214c9f5f5` | mapped / sampled | detail-opened |

The remaining 151 IDs are kept in `lib/reference.ts` in the exact lazy-list order and are expanded into the generated status ledger. Re-run `pnpm inventory:screen-status` after changing the source inventory.

## Discovery dimensions

- Browser capture surface: approximately `556 × 876` in the Codex in-app browser during the reference pass.
- Embedded Apple Music reference art: approximately `1.60:1` aspect ratio in the Mobbin detail viewer; the original asset pixel dimensions were not exposed by the browser accessibility surface.
- Observed shell: light Apple Music web UI, left navigation rail, persistent bottom player, red trial banner, content rails/tables, search categories, concerts, artist/lyrics screens, account/subscription dialogs, verification, billing, and song context menus.
- Live Apple Music web was used only to supplement current navigation and player semantics. It is not treated as a replacement for this captured Mobbin collection.
