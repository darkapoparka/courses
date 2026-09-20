import { crop, type Artwork } from "../lib/music-catalog";
import { Art } from "./music-primitives";

const completeFrames: Record<string, string> = {
  opening: "c939c9b8", verse: "b3f29b6f", outro: "a4d30e7d",
};

const highlights: Record<string, string> = {
  walk: "ac05c6b8", bond: "96711b04", dream: "0c6da10e",
};

/** Preserve the recorded album's light animation without importing its menu.
 * Both sampled rectangles stop outside the menu and its shadow. The obscured
 * right edge uses the complete unobscured cover, never captured UI pixels.
 * Feather only the light-animation samples to avoid a rectangular lighting seam;
 * the complete album artwork underneath is never masked. */
export function ExpandedArtwork({ art, label, ambience }: {
  art: Artwork; label: string; ambience?: string;
}) {
  const frame = ambience ? highlights[ambience] : undefined;
  const complete = ambience ? completeFrames[ambience] : undefined;
  if (!frame) return <Art art={complete ? crop(complete, 144, 134, 461, 462) : art} label={label} />;
  return <span className="music-art expanded-artwork" role="img" aria-label={label}
    data-art-source={art.source} data-art-highlight={ambience}>
    <span className="expanded-artwork-base" aria-hidden="true"><Art art={art} label="" /></span>
    <span className="expanded-artwork-top" aria-hidden="true"><Art art={crop(frame, 144, 134, 461, 130)} label="" /></span>
    <span className="expanded-artwork-left" aria-hidden="true"><Art art={crop(frame, 144, 134, 410, 462)} label="" /></span>
  </span>;
}
