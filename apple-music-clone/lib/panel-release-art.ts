import { crop, type Artwork, type Card } from "./music-catalog";

/** These three partial covers have no unobscured full image in the archive.
 * Never paint the captured player or side-panel UI into a card. The underlying
 * fill extends only the observed artwork; the clean fragments retain detail.
 * This is explicitly partial artwork, not a full-cover fidelity approval.
 */
export function partialPanelRelease(prefix: string, index: number, fallback: Card): { card: Card; overlay: Artwork } {
  const x = 286 + index * 213;
  const underPanel = index === 4;
  const art = { ...crop(prefix, x, 759, underPanel ? 16 : 193, underPanel ? 144 : 68), displayRatio: 1, partial: true };
  const playerBand = "linear-gradient(#000 0 51.388889%,transparent 51.388889% 88.888889%,#000 88.888889% 100%)";
  const visibleOutsidePlayer = index === 0 ? ",linear-gradient(90deg,#000 0 50.259067%,transparent 50.259067%)" : index === 3 ? ",linear-gradient(90deg,transparent 0 48.186529%,#000 48.186529%)" : "";
  const mask = underPanel ? "linear-gradient(90deg,#000 0 8.290155%,transparent 8.290155%)" : playerBand + visibleOutsidePlayer;
  return { card: { ...fallback, art }, overlay: { ...crop(prefix, x, 759, 193, 144), visibleMask: mask, partial: true } };
}
