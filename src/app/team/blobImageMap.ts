/**
 * Utility to convert local image paths to Vercel Blob Storage URLs
 * Since blob URLs follow a predictable pattern, construct them directly
 * 
 * Format: https://[store-id].public.blob.vercel-storage.com/[path]
 */

// public base vercel blob
const BLOB_STORAGE_BASE_URL = 'https://uk7thkqkj3aqofka.public.blob.vercel-storage.com';

/**
 * ONLY converts paths that start with /team/teamPhotos/ or /about/media/
 * 
 * @param localPath - Local path like "/team/teamPhotos/john_doe.webp"
 * @returns Blob URL if the path matches known blob storage paths, otherwise returns original path
 * 
 * @example
 *   getBlobUrl("/team/teamPhotos/neha_naveen.webp")
 *   Returns: "https://uk7thkqkj3aqofka.public.blob.vercel-storage.com/team/teamPhotos/neha_naveen.webp"
 *   
 *   getBlobUrl("/other/image.png")
 *   Returns: "/other/image.png" (not in blob storage, keep local)
 */
export function getBlobUrl(localPath: string): string {
  if (localPath.startsWith('/team/teamPhotos/') || localPath.startsWith('/about/media/')) {
    // construct blob URL
    const pathWithoutSlash = localPath.startsWith('/') ? localPath.slice(1) : localPath;
    return `${BLOB_STORAGE_BASE_URL}/${pathWithoutSlash}`;
  }

  // For other paths, return local for now
  return localPath;
}
