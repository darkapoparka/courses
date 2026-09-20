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
  if (!lyrics) return { ambience: "instrumental", previousLines: 0 };
  for (let index = frames.length - 1; index >= 0; index -= 1) {
    if (elapsed >= frames[index]!.time) return frames[index]!;
  }
  return frames[0]!;
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
