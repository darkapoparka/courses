import { crop } from "./music-catalog";
import type { Scene } from "./music-scenes";

/** The captured player states belong to several catalog snapshots. Keep their
 * data and progress explicit rather than guessing from ordinal source indexes. */
export const playerReference: Record<string, Partial<Scene>> = {
  "11803c64": { hero: "listening", favourite: false, librarySeed: "empty" },
  "c98f8b54": { hero: "listening", favourite: false, librarySeed: "empty" },
  "1f9e170c": { hero: "listening", elapsed: 0, favourite: false, librarySeed: "empty" },
  "9fbb38e1": { hero: "listening", favourite: false, librarySeed: "empty" },
  "afd02fa6": { hero: "listening", favourite: false, librarySeed: "empty" },
  "d83e96ba": { hero: "listening", librarySeed: "empty" },
  "ad689c37": { hero: "listening", librarySeed: "empty" },
  "cf59e554": { catalog: "legacy", elapsed: 0 },
  "a229e38a": { catalog: "legacy", elapsed: 0 },
  "6ac70c34": { hero: "listening", favourite: false },
  "c939c9b8": { elapsed: 11, lyricIndex: 0, favourite: false, librarySeed: "empty", playerArt: crop("c939c9b8",144,134,461,462) },
  "b3f29b6f": { elapsed: 54, lyricIndex: 11, librarySeed: "empty", playerArt: crop("b3f29b6f",144,134,461,462) },
  "ac05c6b8": { elapsed: 73, lyricIndex: 15, librarySeed: "empty", playerArt: crop("ac05c6b8",144,134,461,462) },
  "96711b04": { elapsed: 81, lyricIndex: 17, librarySeed: "song", playerArt: crop("96711b04",144,134,461,462) },
  "0c6da10e": { elapsed: 101, lyricIndex: 20, librarySeed: "empty", playerArt: crop("0c6da10e",144,134,461,462) },
  "55ae9e4c": { elapsed: 110, lyricIndex: 23, librarySeed: "empty", playerArt: crop("c939c9b8",144,134,461,462) },
  "67446c83": { elapsed: 141, lyricIndex: 29, librarySeed: "empty", playerArt: crop("c939c9b8",144,134,461,462) },
  "3c1805b6": { elapsed: 151, lyricIndex: 31, librarySeed: "empty", playerArt: crop("c939c9b8",144,134,461,462) },
  "a4d30e7d": { elapsed: 167, lyricIndex: 34, librarySeed: "playlist", favourite: false, playerArt: crop("a4d30e7d",144,134,461,462) },
  "06a34864": { elapsed: 112, lyricIndex: 23, librarySeed: "empty", playerArt: crop("06a34864",461,106,518,519) },
  "ee8db412": { catalog: "legacy", elapsed: 19, lyricIndex: 2 },
  "8f029018": { catalog: "queue", elapsed: 20, queuePreset: true },
  "de48a956": { catalog: "queue", elapsed: 20, queuePreset: true },
  "4811dde3": { catalog: "queue", elapsed: 20, queuePreset: true },
  "e4dad439": { catalog: "legacy", volume: 0.5 },
  "cbbdc344": { catalog: "legacy", volume: 0.05 },
  "95ae6a8f": { catalog: "legacy", volume: 1 },
  "e9bee76d": { track: undefined }, "3884ff64": { track: undefined },
};
