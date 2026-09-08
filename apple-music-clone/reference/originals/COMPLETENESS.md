# Mobbin reference completeness

Verified on 2026-09-08 against all three supplied Apple Music Web collection tabs.

| Reference | Saved and checked |
|---|---|
| Screens | 159 screen IDs, 159 original 1440px images, and 159 newly downloaded 3024px images |
| UI Elements | All 159 unfiltered IDs and all 29 category mappings |
| Flows | All 58 flows with 218 ordered step images and screen relationships |
| Animation and recordings | 5 screen animations and 8 flow recordings |

All UI category media sources match existing screen sources. The 218 flow steps use the same 159 distinct screens. No separate element crop media was exposed in the inspected cards. `ui-elements-manifest.json` preserves the observed mappings; `flow-screen-map.json` preserves step order and local paths.

Luna max downloaded all 159 higher-resolution variants from exact browser-observed srcset URLs. The URLs advertise 3840w, but their actual decoded width is 3024px: 147 files are 3024x2016 and 12 are 3024x2018. The parent independently decoded every file with Pillow and verified SHA256. Existing 390 media files matched their saved hashes; live flow IDs, ordered image URLs and recording URLs matched exactly. All category counts and local file relationships passed, with zero missing references.

Open `index.html` for the original screens/flows gallery and `ui-elements.html` for the category gallery. The category gallery links to the 3024px images. Originals remain preserved.

This archive contains downloaded visual references and available recordings, not application source code or editable components. Source watermarks/footer remain. MP4 headers and source/hash correspondence were checked; full video playback was not checked. Coverage applies to this supplied Mobbin collection, not every possible Apple Music interaction. No application code or Git state was changed during this audit.
