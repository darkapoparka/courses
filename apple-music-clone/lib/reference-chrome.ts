import { sourceId } from "./music-catalog";

// Favourite Songs navigation presence is separate from profile-name visibility.
// Source-specific entries; additions are checked against the original sidebar pixels.
export const sourcePlaylistNavigation = new Set([
  "8a234785", "01f96377", "0260ef9f", "035569a0", "06be9f09", "0920d819", "09b3600e",
  "0c042c32", "0da4882b", "0df0d2a2", "1d016f0f", "1e5b4763", "2f5da478",
  "3728aa07", "3884ff64", "42098642", "44101453", "481cd568", "484851bf",
  "4b515439", "4cb8f3aa", "4e857921", "5044abe5", "50fe374b", "57f7c08e",
  "5b34ad72", "5b3ec96a", "5d3db7ca", "610af644", "6436de36", "67446c83",
  "7437b956", "812ba627", "898ca766", "8a2a4241", "8b9e8598", "92589389",
  "a573d1ab", "a917d88f", "b2e0f231", "bbb92581", "bc773ae9", "bde65d33",
  "c0997fe5", "c9a554f4", "d5173715", "e379e3fe", "e5e8383f", "e70094e3",
  "e757eb0f", "e9bee76d", "edae3407", "f24fda77", "f2e44e3b", "f49fce21",
  "f99d9583", "fc5d84bd", "ffc18eb8",
].map(sourceId));
