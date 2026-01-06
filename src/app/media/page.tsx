import { getPhotoAlbums, getSlideshowImages } from './getAlbums';
import MediaClient from './MediaClient';

// Server Component fetches data dynamically
export default async function Media() {
  // generate albums data from filesystem
  const photoAlbums = getPhotoAlbums();
  const slideshowImages = getSlideshowImages();

  // pass data to client component
  return <MediaClient photoAlbums={photoAlbums} slideshowImages={slideshowImages} />;
}
