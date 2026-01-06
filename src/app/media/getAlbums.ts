import fs from 'fs';
import path from 'path';
import type { PhotoAlbum } from './mediaData';
import albumMetadata from './albumMetadata.json';

// only use fs on server side (build time)
const MEDIA_BASE_DIR = path.join(process.cwd(), 'public', 'media');

/**
 * gets all image files from a directory
 */
function getImageFiles(dir: string): string[] {
  if (!fs.existsSync(dir)) {
    return [];
  }

  const files = fs.readdirSync(dir);
  return files
    .filter((file) => {
      const ext = path.extname(file).toLowerCase();
      // PREFER WebP, but also include JPG/JPEG/PNG for backward compatibility
      return ['.webp', '.jpg', '.jpeg', '.png'].includes(ext);
    })
    // sort to prefer WebP files over JPG when both exist
    .sort((a, b) => {
      const extA = path.extname(a).toLowerCase();
      const extB = path.extname(b).toLowerCase();
      const nameA = path.basename(a, extA);
      const nameB = path.basename(b, extB);

      // if same base name, prefer WebP
      if (nameA === nameB) {
        if (extA === '.webp') return -1;
        if (extB === '.webp') return 1;
      }
      return a.localeCompare(b);
    })
    // remove duplicates (if both .jpg and .webp exist, keep only .webp)
    // ! MIGHT NOT NEED THIS ANYMORE IF WE KEEP BLOB STORAGE !
    .filter((file, index, arr) => {
      const ext = path.extname(file).toLowerCase();
      const name = path.basename(file, ext);
      // if this is a JPG/JPEG/PNG, check if a WebP version exists
      if (['.jpg', '.jpeg', '.png'].includes(ext)) {
        return !arr.some(f => {
          const fExt = path.extname(f).toLowerCase();
          const fName = path.basename(f, fExt);
          return fName === name && fExt === '.webp';
        });
      }
      return true;
    })
    .sort() // sort for consistent ordering
    .map((file) => {
      // return path relative to public directory
      const relativePath = path.relative(
        path.join(process.cwd(), 'public'),
        path.join(dir, file)
      );
      let finalPath = '/' + relativePath.replace(/\\/g, '/');

      // normalize .JPG.webp or .jpg.webp to .webp to match blob storage naming
      // cuz blob storage has files as IMG_5464.webp, not IMG_5464.JPG.webp
      finalPath = finalPath.replace(/\.(jpg|jpeg)\.webp$/i, '.webp');

      return finalPath;
    });
}

/**
 * generates a URL-friendly ID from a folder name
 */
function generateAlbumId(folderName: string): string {
  return folderName.toLowerCase().replace(/\s+/g, '-');
}

/**
 * gets the cover image for an album (first image, or specified in metadata)
 */
function getCoverImage(
  albumId: string,
  photos: string[],
  metadata: { title?: string; description?: string; date?: string; coverImage?: string } | undefined
): string {
  // if metadata specifies a cover image, use it
  if (metadata?.coverImage) {
    return metadata.coverImage;
  }
  // otherwise use the first photo
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
  // only run on server side (during build or in API routes)
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
      // skip empty albums
      continue;
    }

    // get metadata from JSON file (can be extended to use database)
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

  // sort albums by date (newest first), then by title
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
 * gets a single album by ID
 */
export function getAlbumById(albumId: string): PhotoAlbum | undefined {
  const albums = getPhotoAlbums();
  return albums.find((album) => album.id === albumId);
}

/**
 * gets slideshow images (can be configured in metadata or use first photo from each album)
 */
export function getSlideshowImages(): string[] {
  const albums = getPhotoAlbums();
  // Use all photos from all albums for slideshow (will be randomized on client)
  const allPhotos = albums.flatMap(album => album.photos);
  // Return all photos, or at least cover images if no photos
  return allPhotos.length > 0 ? allPhotos : albums.map((album) => album.coverImage);
}

