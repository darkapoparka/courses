import resources from "./artist-hero-resources.json";

/** Provider-owned motion artwork pinned to the exact reviewed bytes. */
export const artistHeroResources = resources;
export type ArtistHeroResourceId = keyof typeof artistHeroResources;
export function isArtistHeroResource(id: string): id is ArtistHeroResourceId {
  return Object.prototype.hasOwnProperty.call(artistHeroResources, id);
}
