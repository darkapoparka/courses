export interface CoverIntegrityResource { bytes: number; sha256: string; contentSha256: string }
export function coverContentSha256(input: Uint8Array): string;
export function isReviewedCover(bytes: Uint8Array, resource: CoverIntegrityResource): boolean;
