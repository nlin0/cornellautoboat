const fs = require('fs');
const path = require('path');

// We'll use tsx or ts-node to run TypeScript, but for now, let's duplicate the logic
// Or better: use a simpler approach - read the filesystem directly

const MEDIA_BASE_DIR = path.join(__dirname, '../public/about/media');
const OUTPUT_FILE = path.join(__dirname, '../src/app/media/albumsData.json');
const METADATA_FILE = path.join(__dirname, '../src/app/media/albumMetadata.json');

function getImageFiles(dir) {
  if (!fs.existsSync(dir)) {
    return [];
  }

  const files = fs.readdirSync(dir);
  return files
    .filter((file) => {
      const ext = path.extname(file).toLowerCase();
      return ['.jpg', '.jpeg', '.png'].includes(ext);
    })
    .sort()
    .map((file) => {
      const relativePath = path.relative(
        path.join(__dirname, '../public'),
        path.join(dir, file)
      );
      return '/' + relativePath.replace(/\\/g, '/');
    });
}

function generateAlbumId(folderName) {
  return folderName.toLowerCase().replace(/\s+/g, '-');
}

function getPhotoAlbums() {
  if (!fs.existsSync(MEDIA_BASE_DIR)) {
    console.warn(`Media directory not found: ${MEDIA_BASE_DIR}`);
    return [];
  }

  const albumMetadata = JSON.parse(fs.readFileSync(METADATA_FILE, 'utf-8'));
  const albums = [];
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
      continue;
    }

    const metadata = albumMetadata[folderName] || {};

    albums.push({
      id: albumId,
      title: metadata.title || folderName.replace(/\b\w/g, (l) => l.toUpperCase()),
      coverImage: photos[0] || '/clifford2.png',
      description: metadata.description || `Photos from ${folderName}`,
      photos: photos,
      date: metadata.date,
    });
  }

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

function getSlideshowImages() {
  const albums = getPhotoAlbums();
  // Use all photos from all albums for slideshow (will be randomized on client)
  const allPhotos = albums.flatMap(album => album.photos);
  // Return all photos, or at least cover images if no photos
  return allPhotos.length > 0 ? allPhotos : albums.map((album) => album.coverImage);
}

try {
  const albums = getPhotoAlbums();
  const slideshow = getSlideshowImages();
  
  const data = {
    albums,
    slideshow,
    generatedAt: new Date().toISOString()
  };
  
  fs.writeFileSync(OUTPUT_FILE, JSON.stringify(data, null, 2));
  console.log(`✅ Generated albums data: ${albums.length} albums, ${slideshow.length} slideshow images`);
} catch (error) {
  console.error('❌ Error generating albums data:', error);
  process.exit(1);
}

