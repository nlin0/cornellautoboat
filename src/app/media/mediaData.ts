export type PhotoAlbum = {
  id: string;
  title: string;
  coverImage: string;
  description: string;
  photos: string[];
  date?: string;
};

// Load pre-generated data file for consistency between server and client
// This file is generated at build time by scripts/generate-albums-data.js
let photoAlbumsData: PhotoAlbum[] = [];
let slideshowImagesData: string[] = [];

try {
  // Import the generated JSON file (works in both server and client)
  const generatedData = require('./albumsData.json');
  photoAlbumsData = generatedData.albums || [];
  slideshowImagesData = generatedData.slideshow || [];
} catch (e) {
  // Fallback: generate on server side only if file doesn't exist
  // This should only happen in development before first build
  if (typeof window === 'undefined') {
    try {
      const { getPhotoAlbums, getSlideshowImages } = require('./getAlbums');
      photoAlbumsData = getPhotoAlbums();
      slideshowImagesData = getSlideshowImages();
    } catch (err) {
      console.warn('Could not load albums data:', err);
    }
  }
}

// Export the albums - consistent data for both server and client
// This ensures no hydration mismatches
export const photoAlbums: PhotoAlbum[] = photoAlbumsData;
export const slideshowImages: string[] = slideshowImagesData;

