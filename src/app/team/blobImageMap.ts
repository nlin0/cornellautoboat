/**
 * Utility to convert local image paths to Vercel Blob Storage URLs
 * Since blob URLs follow a predictable pattern, construct them directly
 * 
 * Format: https://[store-id].public.blob.vercel-storage.com/[path]
 */

// public base vercel blob
const BLOB_STORAGE_BASE_URL = 'https://uk7thkqkj3aqofka.public.blob.vercel-storage.com';

/**
 * ONLY converts paths that start with /team/teamPhotos/ or /media/
 * 
 * @param localPath - Local path like "/team/teamPhotos/john_doe.webp" or "/media/roboboat 25/IMG_5464.JPG.webp"
 * @returns Blob URL if the path matches known blob storage paths, otherwise returns original path
 * 
 * @example
 *   getBlobUrl("/team/teamPhotos/neha_naveen.webp")
 *   Returns: "https://uk7thkqkj3aqofka.public.blob.vercel-storage.com/team/teamPhotos/neha_naveen.webp"
 *   
 *   getBlobUrl("/media/roboboat 25/IMG_5464.JPG.webp")
 *   Returns: "https://uk7thkqkj3aqofka.public.blob.vercel-storage.com/media/roboboat 25/IMG_5464.webp"
 *   
 *   getBlobUrl("/other/image.png")
 *   Returns: "/other/image.png" (not in blob storage, keep local)
 */
export function getBlobUrl(localPath: string): string {
  if (localPath.startsWith('/team/teamPhotos/')) {
    // Normalize path: remove .JPG.webp or .jpg.webp and replace with .webp
    let normalizedPath = localPath.replace(/\.(jpg|jpeg)\.webp$/i, '.webp');
    const pathWithoutSlash = normalizedPath.startsWith('/') ? normalizedPath.slice(1) : normalizedPath;
    return `${BLOB_STORAGE_BASE_URL}/${pathWithoutSlash}`;
  }
  
  if (localPath.startsWith('/media/')) {
    // Normalize path: remove .JPG.webp or .jpg.webp and replace with .webp
    let normalizedPath = localPath.replace(/\.(jpg|jpeg)\.webp$/i, '.webp');
    
    // Try new path first (/media/...), but also support old path (/about/media/...) for migration
    // If blob storage still has old paths, we can check both
    const pathWithoutSlash = normalizedPath.startsWith('/') ? normalizedPath.slice(1) : normalizedPath;
    
    // Use new path structure (media/...)
    return `${BLOB_STORAGE_BASE_URL}/${pathWithoutSlash}`;
  }

  // For other paths, return local for now
  return localPath;
}
