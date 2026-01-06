/**
 * Script to process media images from public/media/
 * 
 *   1. Finds all JPG/JPEG images in public/media/ (recursively)
 *   2. Converts them to WebP format
 *   3. Uploads to Vercel Blob Storage (preserving folder structure)
 *   4. Optionally removes original JPG files after successful upload
 * 
 * PREREQS:
 *   - BLOB_READ_WRITE_TOKEN environment variable must be set (or in .env.local)
 * 
 * USE:
 *   Process all media images
 *      npm run process-media-images
 *   Process and delete original JPG files
 *        npm run process-media-images -- --delete-originals

 */

const { put } = require('@vercel/blob');
const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

// load .env.local file if it exists
const envPath = path.join(__dirname, '..', '.env.local');
if (fs.existsSync(envPath)) {
  const envFile = fs.readFileSync(envPath, 'utf8');
  envFile.split('\n').forEach(line => {
    const trimmedLine = line.trim();
    if (trimmedLine && !trimmedLine.startsWith('#')) {
      const equalIndex = trimmedLine.indexOf('=');
      if (equalIndex > 0) {
        const key = trimmedLine.substring(0, equalIndex).trim();
        const value = trimmedLine.substring(equalIndex + 1).trim();
        const cleanValue = value.replace(/^["']|["']$/g, '');
        if (!process.env[key]) {
          process.env[key] = cleanValue;
        }
      }
    }
  });
}

// configs
const MEDIA_DIR = path.join(__dirname, '..', 'public', 'media');
const BLOB_STORAGE_BASE_URL = 'https://uk7thkqkj3aqofka.public.blob.vercel-storage.com';

// check command line flags
const DELETE_ORIGINALS = process.argv.includes('--delete-originals');

/**
 * finds all image files in a directory (recursive)
 */
function findImageFiles(dir, fileList = []) {
  if (!fs.existsSync(dir)) {
    return fileList;
  }

  const files = fs.readdirSync(dir);

  files.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);

    if (stat.isDirectory()) {
      findImageFiles(filePath, fileList);
    } else {
      const ext = path.extname(file).toLowerCase();
      // ONLY process JPG/JPEG files
      if (['.jpg', '.jpeg'].includes(ext)) {
        fileList.push(filePath);
      }
    }
  });

  return fileList;
}

/**
 * gets the relative path from public/ directory
 */
function getRelativePathFromPublic(filePath) {
  const publicPath = path.join(__dirname, '..', 'public');
  return path.relative(publicPath, filePath).replace(/\\/g, '/');
}

/**
 * processes single image file
 */
async function processImage(filePath, token) {
  const dir = path.dirname(filePath);
  const baseName = path.basename(filePath);
  
  // remove extension (case-insensitive) to get filename without extension
  const fileName = baseName.replace(/\.(jpg|jpeg)$/i, '');
  
  // get relative path from public/ for blob storage
  const relativePath = getRelativePathFromPublic(filePath);
  const blobPathname = relativePath.replace(/\.(jpg|jpeg)$/i, '.webp');
  
  // check if WebP already exists locally
  const webpLocalPath = path.join(dir, `${fileName}.webp`);
  const webpExists = fs.existsSync(webpLocalPath);

  console.log(`\n📸 Processing: ${relativePath}`);

  try {
    // convert JPG to WebP using sharp
    console.log(`   Converting to WebP...`);
    const webpBuffer = await sharp(filePath)
      .webp({ quality: 85 })
      .resize(1920, 1920, {
        fit: 'inside',
        withoutEnlargement: true
      })
      .toBuffer();

    // upload to blob storage
    console.log(`   Uploading to blob storage...`);
    const blob = await put(blobPathname, webpBuffer, {
      access: 'public',
      addRandomSuffix: false,
      token: token,
    });

    console.log(`UPLOADED: ${blob.url}`);

    // save WebP locally (for reference/backup)
    if (!webpExists) {
      fs.writeFileSync(webpLocalPath, webpBuffer);
      console.log(`SAVED local WebP: ${path.relative(process.cwd(), webpLocalPath)}`);
    }

    // delete original JPG (if parameter is set)
    if (DELETE_ORIGINALS) {
      fs.unlinkSync(filePath);
      console.log(`DELETED original: ${path.basename(filePath)}`);
    }

    return {
      success: true,
      originalPath: relativePath,
      blobPath: blobPathname,
      blobUrl: blob.url,
    };
  } catch (error) {
    console.error(`ERROR: processing ${relativePath}:`, error.message);
    return {
      success: false,
      originalPath: relativePath,
      error: error.message,
    };
  }
}

/**
 * Main function to process all media images
 */
async function processAllMediaImages() {
  const token = process.env.BLOB_READ_WRITE_TOKEN;

  if (!token) {
    console.error('ERROR:: BLOB_READ_WRITE_TOKEN environment variable is required');
    console.error('\nTo fix this:');
    console.error('  Set BLOB_READ_WRITE_TOKEN manually in your environment');
    console.error('\nPlease ask teammember if you do not have token');
    process.exit(1);
  }

  if (!fs.existsSync(MEDIA_DIR)) {
    console.error(`ERROR: Media directory not found: ${MEDIA_DIR}`);
    process.exit(1);
  }

  console.log('🔍 Scanning for media images...');
  const imageFiles = findImageFiles(MEDIA_DIR);

  if (imageFiles.length === 0) {
    console.log('No JPG/JPEG images found in media directory.');
    console.log(`   Searched in: ${MEDIA_DIR}`);
    return;
  }

  console.log(`\n📊 Found ${imageFiles.length} image(s) to process`);
  if (DELETE_ORIGINALS) {
    console.log('DELETE_ORIGINALS is enabled - original JPG files will be removed after upload');
  }

  const results = {
    success: [],
    failed: [],
  };

  // process images sequentially to avoid overwhelming the API
  for (let i = 0; i < imageFiles.length; i++) {
    const filePath = imageFiles[i];
    const result = await processImage(filePath, token);
    
    if (result.success) {
      results.success.push(result);
    } else {
      results.failed.push(result);
    }

    // small delay between uploads to be respectful to the API
    if (i < imageFiles.length - 1) {
      await new Promise(resolve => setTimeout(resolve, 500));
    }
  }

  // summary
  console.log('\n' + '='.repeat(60));
  console.log('Processing Summary');
  console.log('='.repeat(60));
  console.log(`Successfully processed: ${results.success.length}`);
  console.log(`Failed: ${results.failed.length}`);
  console.log(`Total: ${imageFiles.length}`);

  if (results.failed.length > 0) {
    console.log('\nFailed images:');
    results.failed.forEach(result => {
      console.log(`   - ${result.originalPath}: ${result.error}`);
    });
  }

  if (results.success.length > 0) {
    console.log('\nNext steps:');
    console.log('  1. Run: npm run generate-albums-data (to update albumsData.json)');
    console.log('  2. The media pages will automatically use blob URLs via getBlobUrl()');
    console.log('  3. Review the changes and commit if everything looks good');
  }

  console.log('\nImages are now in blob storage and will be served from CDN');
  console.log('   Local WebP files are saved for reference but not required for deployment');
}

// run the script
processAllMediaImages().catch(error => {
  console.error('FATAL ERROR:', error);
  process.exit(1);
});

