/** Artwork-only visibility around the archived 635x54 floating player.
 * The one-pixel clearance excludes its border and antialiasing as well as
 * controls/glass. A rectangular hole incorrectly exposed fallback artwork
 * through the live player's rounded corners. Coordinates stay in source space
 * when the card is resized or scrolled; the source UI never moves into view.
 */
export function releaseArtworkMask(cardX: number): string {
  const leftCentre = 553 - cardX;
  const rightCentre = 1134 - cardX;
  const path = `M0 0H208V63H0Z M${leftCentre} -8H${rightCentre}`
    + `a28 28 0 0 1 28 28a28 28 0 0 1 -28 28H${leftCentre}`
    + "a28 28 0 0 1 -28 -28a28 28 0 0 1 28 -28Z";
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 208 63">`
    + `<path fill="white" fill-rule="evenodd" d="${path}"/></svg>`;
  return `url("data:image/svg+xml,${encodeURIComponent(svg)}")`;
}
