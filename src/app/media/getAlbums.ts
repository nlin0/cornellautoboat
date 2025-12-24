import fs from 'fs';
import path from 'path';
import type { PhotoAlbum } from './mediaData';
import albumMetadata from './albumMetadata.json';

// Only use fs on server side (build time)
const MEDIA_BASE_DIR = path.join(process.cwd(), 'public', 'about', 'media');

/**
 * Gets all image files from a directory
 */
function getImageFiles(dir: string): string[] {
  if (!fs.existsSync(dir)) {
    return [];
  }

  const files = fs.readdirSync(dir);
  return files
    .filter((file) => {
      const ext = path.extname(file).toLowerCase();
      return ['.jpg', '.jpeg', '.png'].includes(ext);
    })
    .sort() // Sort for consistent ordering
    .map((file) => {
      // Return path relative to public directory
      const relativePath = path.relative(
        path.join(process.cwd(), 'public'),
        path.join(dir, file)
      );
      return '/' + relativePath.replace(/\\/g, '/');
    });
}

/**
 * Generates a URL-friendly ID from a folder name
 */
function generateAlbumId(folderName: string): string {
  return folderName.toLowerCase().replace(/\s+/g, '-');
}

/**
 * Gets the cover image for an album (first image, or specified in metadata)
 */
function getCoverImage(
  albumId: string,
  photos: string[],
  metadata: { title?: string; description?: string; date?: string; coverImage?: string } | undefined
): string {
  // If metadata specifies a cover image, use it
  if (metadata?.coverImage) {
    return metadata.coverImage;
  }
  // Otherwise use the first photo
  return photos[0] || '/clifford2.png';
}

/**
 * Dynamically discovers photo albums from the filesystem
 * This function can be called at build time to generate album data
 * 
 * NOTE: This only works on the server/build side, not in the browser
 * 
 * For future admin functionality:
 * - This can be extended to read from a database
 * - Or merge filesystem data with database metadata
 * - Admin can update albumMetadata.json or a database
 * - Admin can upload photos and create albums via API routes
 */
export function getPhotoAlbums(): PhotoAlbum[] {
  // Only run on server side (during build or in API routes)
  if (typeof window !== 'undefined') {
    console.warn('getPhotoAlbums can only be called on the server side');
    return [];
  }

  if (!fs.existsSync(MEDIA_BASE_DIR)) {
    console.warn(`Media directory not found: ${MEDIA_BASE_DIR}`);
    return [];
  }

  const albums: PhotoAlbum[] = [];
  const entries = fs.readdirSync(MEDIA_BASE_DIR, { withFileTypes: true });

  for (const entry of entries) {
    if (!entry.isDirectory()) {
      continue;
    }

    const folderName = entry.name;
    const albumId = generateAlbumId(folderName);
    const albumPath = path.join(MEDIA_BASE_DIR, folderName);
    const photos = getImageFiles(albumPath);

    if (photos.length === 0) {
      // Skip empty albums
      continue;
    }

    // Get metadata from JSON file (can be extended to use database)
    const metadata = albumMetadata[folderName as keyof typeof albumMetadata] || {};

    albums.push({
      id: albumId,
      title: metadata.title || folderName.replace(/\b\w/g, (l) => l.toUpperCase()),
      coverImage: getCoverImage(albumId, photos, metadata),
      description: metadata.description || `Photos from ${folderName}`,
      photos: photos,
      date: metadata.date,
    });
  }

  // Sort albums by date (newest first), then by title
  albums.sort((a, b) => {
    if (a.date && b.date) {
      return b.date.localeCompare(a.date);
    }
    if (a.date) return -1;
    if (b.date) return 1;
    return a.title.localeCompare(b.title);
  });

  return albums;
}

/**
 * Gets a single album by ID
 */
export function getAlbumById(albumId: string): PhotoAlbum | undefined {
  const albums = getPhotoAlbums();
  return albums.find((album) => album.id === albumId);
}

/**
 * Gets slideshow images (can be configured in metadata or use first photo from each album)
 */
export function getSlideshowImages(): string[] {
  const albums = getPhotoAlbums();
  // Use all photos from all albums for slideshow (will be randomized on client)
  const allPhotos = albums.flatMap(album => album.photos);
  // Return all photos, or at least cover images if no photos
  return allPhotos.length > 0 ? allPhotos : albums.map((album) => album.coverImage);
}

