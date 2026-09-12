import resources from "./cover-resources.json";

/** Clean provider-owned covers observed to match the saved reference artwork.
 * Only fixed public resource URLs are allowed. No image files are redistributed
 * in this repository, and the reference-assets route is preview-only.
 */
export const coverResources = resources;
export type CoverResourceId = keyof typeof coverResources;
export function isCoverResource(id: string): id is CoverResourceId {
  return Object.prototype.hasOwnProperty.call(coverResources, id);
}
