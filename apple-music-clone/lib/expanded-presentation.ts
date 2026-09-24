/** Presentation keyframes observed in the frozen song-player timeline.
 * These select the sampled visual states, not a claim of continuous motion
 * parity. Controls must not reset the presentation by clearing a route hint. */
const frames = [
  { time: 0, ambience: "opening", previousLines: 0 },
  { time: 54, ambience: "verse", previousLines: 1 },
  { time: 73, ambience: "walk", previousLines: 0 },
  { time: 81, ambience: "bond", previousLines: 0 },
  { time: 101, ambience: "dream", previousLines: 0 },
  { time: 110, ambience: "bridge", previousLines: 1 },
  { time: 141, ambience: "late", previousLines: 0 },
  { time: 151, ambience: "transition", previousLines: Infinity },
  { time: 167, ambience: "outro", previousLines: 1 },
] as const;

export function expandedPresentation(elapsed: number, lyrics: boolean) {
  if (!lyrics) return { ambience: "instrumental", previousLines: 0, metadataOffset: elapsed >= 112 && elapsed < 141 ? 300 : 0, metadataClipReduction: 0 };
  const metadataFrames = [
    { time: 0, offset: 0, clipReduction: 0 }, { time: 11, offset: 0, clipReduction: 0 },
    { time: 54, offset: 50, clipReduction: 29 }, { time: 73, offset: 403, clipReduction: 0 },
    { time: 81, offset: 0, clipReduction: 0 }, { time: 101, offset: 0, clipReduction: 0 },
    { time: 110, offset: 0, clipReduction: 0 }, { time: 141, offset: 0, clipReduction: 0 },
    { time: 151, offset: 0, clipReduction: 0 }, { time: 167, offset: 0, clipReduction: 0 },
  ] as const;
  let metadataOffset: number = metadataFrames[0].offset;
  let metadataClipReduction: number = metadataFrames[0].clipReduction;
  for (let index = 0; index < metadataFrames.length - 1; index += 1) {
    const from = metadataFrames[index]!;
    const to = metadataFrames[index + 1]!;
    if (elapsed < to.time) {
      const progress = Math.max(0, (elapsed - from.time) / (to.time - from.time));
      metadataOffset = from.offset + (to.offset - from.offset) * progress;
      metadataClipReduction = from.clipReduction + (to.clipReduction - from.clipReduction) * progress;
      break;
    }
    metadataOffset = to.offset;
    metadataClipReduction = to.clipReduction;
  }
  for (let index = frames.length - 1; index >= 0; index -= 1) {
    if (elapsed >= frames[index]!.time) return { ...frames[index]!, metadataOffset, metadataClipReduction };
  }
  return { ...frames[0]!, metadataOffset, metadataClipReduction };
}

/** Line endings visible in c939c9b8, b3f29b6f, ac05c6b8, 96711b04,
 * 0c6da10e and a4d30e7d. Repeated verses keep the same textual layout.
 * These are desktop lyric lines, not forced mobile viewport geometry. */
export const expandedLyricBreaks: Readonly<Record<number, number>> = {
  0: 6, 1: 6, 2: 7,
  7: 7, 8: 7, 10: 7,
  11: 8, 12: 8, 13: 8, 14: 7,
  15: 5, 16: 7, 17: 8, 18: 5, 19: 7,
  20: 9, 21: 7, 22: 7, 23: 5, 24: 7,
  25: 8, 26: 8, 27: 8, 28: 7, 36: 7, 37: 7,
};

/** Observed sung-word emphasis at the saved lyric anchors. There is no
 * word-timing provider; this does not claim word-by-word motion parity. */
export const expandedLyricEmphasis: Readonly<Record<number, number>> = {
  0: 3, 11: 3, 15: 4, 17: 7, 34: 1,
};
