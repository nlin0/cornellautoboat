/**
 * Utility functions for working with Vercel Blob Storage images
 * 
 * This provides a simple abstraction layer for image URLs.
 * Future engineers can easily understand and maintain this.
 */

/**
 * Base URL for Vercel Blob Storage
 * Update this if you need to change blob storage location
 */
const BLOB_BASE_URL = process.env.NEXT_PUBLIC_BLOB_BASE_URL || '';

/**
 * Converts a local image path to a blob URL
 * 
 * @param localPath - Path like "/team/teamPhotos/name.webp"
 * @returns Blob URL or original path if not migrated yet
 * 
 * @example
 *   getImageUrl("/team/teamPhotos/john.webp")
 *   // Returns: "https://xxx.public.blob.vercel-storage.com/john.webp"
 */
export function getImageUrl(localPath: string): string {
  // If blob base URL is set, construct blob URL
  if (BLOB_BASE_URL) {
    // Extract filename from path
    const fileName = localPath.split('/').pop() || '';
    return `${BLOB_BASE_URL}/${fileName}`;
  }

  // Fallback to local path (for gradual migration)
  return localPath;
}

/**
 * Gets image URL with optional fallback
 * Useful for migration period when some images might not be uploaded yet
 */
export function getImageUrlWithFallback(
  blobPath: string,
  fallbackPath: string
): string {
  if (BLOB_BASE_URL && blobPath) {
    return getImageUrl(blobPath);
  }
  return fallbackPath;
}

