import { crop, type Artwork, type Card } from "./music-catalog";

/** These three partial covers have no unobscured full image in the archive.
 * Never paint the captured player or side-panel UI into a card. The underlying
 * fill extends only the observed artwork; the clean fragments retain detail.
 * This is explicitly partial artwork, not a full-cover fidelity approval.
 */
export function partialPanelRelease(prefix: string, index: number, fallback: Card): { card: Card; overlay: Artwork } {
  const x = 286 + index * 212;
  const underPanel = index === 4;
  const art = { ...crop(prefix, x, 759, underPanel ? 16 : 193, underPanel ? 144 : 68), displayRatio: 1, partial: true };
  const playerBand = "linear-gradient(#000 0 51.388889%,transparent 51.388889% 88.888889%,#000 88.888889% 100%)";
  // At the native 193px width, the safe edges meet player x=382 and x=1018.
  // 96 / 193 = 49.740933%; never include pixels from the captured controls.
  const visibleOutsidePlayer = index === 0 ? ",linear-gradient(90deg,#000 0 49.740933%,transparent 49.740933%)" : index === 3 ? ",linear-gradient(90deg,transparent 0 49.740933%,#000 49.740933%)" : "";
  const mask = underPanel ? "linear-gradient(90deg,#000 0 8.290155%,transparent 8.290155%)" : playerBand + visibleOutsidePlayer;
  return { card: { ...fallback, art }, overlay: { ...crop(prefix, x, 759, 193, 144), visibleMask: mask, partial: true } };
}

/** The wide legacy shelf shows the same first four releases as the lyrics
 * recording, but its fifth release varies by captured catalog edition.
 * Reuse clean upper artwork, never the floating player baked into the wide still.
 * Incomplete covers remain explicitly partial after ordinary interactions.
 */
export function partialDiscoveryRelease(prefix: string, index: number, fallback: Card): { card: Card; overlay: Artwork } {
  if (index !== 1 && index !== 2 && index !== 4) throw new RangeError("Unreviewed partial discovery release slot");
  const x = 286 + index * 227;
  const fragment = index === 1 || index === 2
    ? crop("ee8db412", index === 1 ? 498 : 710, 759, 193, 68)
    : crop(prefix, x, 840, 208, 63);
  const art = { ...fragment, displayRatio: 1, partial: true };
  // The wide player covers y=833..887 and x=526..1161. Use y>=888
  // plus the unobstructed left edge of card 2, never player/body glyph pixels.
  const belowPlayer = "linear-gradient(transparent 0 76.190477%,#000 76.190477% 100%)";
  const leftEdge = ",linear-gradient(90deg,#000 0 6.25%,transparent 6.25%)";
  const mask = index === 1 ? belowPlayer + leftEdge : index === 2 ? belowPlayer : undefined;
  return { card: { ...fallback, art }, overlay: { ...crop(prefix, x, 840, 208, 63), visibleMask: mask, partial: true } };
}

const wideLegacySources = new Set([
  "cf59e554", "a229e38a", "6ac70c34", "e4dad439", "cbbdc344", "95ae6a8f",
  "f2e44e3b", "ffc18eb8", "3728aa07", "e5e8383f", "e027fe6d",
]);

/** A panel/expanded-player source has controls at the wide shelf coordinates.
 * Closing it must use the matching legacy shelf, never crop its captured UI. */
export function wideLegacyReleaseSource(prefix?: string): string {
  return prefix && wideLegacySources.has(prefix) ? prefix : "cf59e554";
}
