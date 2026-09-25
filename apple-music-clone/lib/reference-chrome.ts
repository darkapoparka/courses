import { sourceId } from "./music-catalog";

// Favourite Songs navigation presence is separate from profile-name visibility.
// Source-specific entries; additions are checked against the original sidebar pixels.
export const sourcePlaylistNavigation = new Set([
  "fd1c0c71", "03157020",
  "a9992e55", "47a07865", "37575452",
  "cf59e554", "a229e38a", "ee8db412", "8f029018", "de48a956", "4811dde3", "e4dad439", "cbbdc344", "95ae6a8f", "6337700d", "2278b1d0",
  "8a234785", "035569a0", "06be9f09", "09b3600e",
  "0df0d2a2", "1d016f0f", "1e5b4763", "2f5da478",
  "3728aa07", "3884ff64", "42098642", "481cd568", "468b0465", "4b515439", "4e857921", "5044abe5", "50fe374b", "5d3db7ca", "610af644", "67446c83",
  "812ba627", "8a2a4241", "92589389",
  "a573d1ab", "a917d88f", "be864051", "bbb92581", "bc773ae9", "bde65d33",
  "d5173715", "e379e3fe", "e5e8383f", "e70094e3",
  "e757eb0f", "e9bee76d", "f24fda77", "f2e44e3b", "f49fce21",
  "ffc18eb8",
].map(sourceId));

// These direct account snapshots were captured before the personal playlist
// rows were exposed. Keep that source chrome scoped to the immutable fixture;
// continuous navigation still owns and preserves the live session library.
export const sourceSinglePlaylistNavigation = new Set([
  "b2e0f231", "f99d9583", "0da4882b", "8b9e8598", "0260ef9f",
  "5b34ad72", "7437b956", "6436de36", "c0997fe5",
].map(sourceId));
