# Locally saved Mobbin references

Captured from the requested Apple Music Web collection on 2026-09-08. Open `index.html` to browse the files.

- 159 screen images, named by Mobbin screen ID.
- 5 animations associated with those screens.
- All 58 flow records, with 218 ordered step images under `flows/<flow-id>/`.
- 8 recordings exposed in the flow collection, saved beside their flow steps.
- 377 images decoded successfully; all 13 video files have valid MP4 file-type headers. Video playback has not been checked in full.

These are downloaded Mobbin assets, not screenshots of the local implementation. The source watermarks remain intact. Standalone screen downloads are 1440px wide including Mobbin's footer; the collection reports the underlying application viewport as 1512×945. Consult `all-image-dimensions.json` for actual downloaded dimensions, and do not confuse the footer with application UI.

`download-manifest.json` and `flow-download-manifest.json` record the source URLs, file paths, hashes, and byte counts. `browser-observed-flows.json` preserves observed flow names and step order. `verification.json` records the file validation results. No missing flow screens were found against the displayed per-flow counts.

This completes local reference acquisition. It does not establish clone fidelity; implementation and independent comparison remain pending.
